package io.slingr.api.football.endpoint;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.configurations.Configuration;
import io.slingr.endpoints.exceptions.ErrorCode;
import io.slingr.endpoints.framework.annotations.*;
import io.slingr.endpoints.services.AppLogs;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.utils.Strings;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import io.slingr.endpoints.ws.exchange.WebServiceRequest;
import io.slingr.endpoints.ws.exchange.WebServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.entity.ContentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.slingr.endpoints.exceptions.EndpointException;

import java.util.Random;

/**
 * <p>Sample endpoint
 *
 * <p>Created by lefunes on 01/12/16.
 */
@SlingrEndpoint(name = "apifootball")
public class ApiFootballEndpoint extends HttpEndpoint {
    private static final Logger logger = LoggerFactory.getLogger(ApiFootballEndpoint.class);

//    private static String API_URL = "https://api.football-data.org/v4/competitions/WC";

    @ApplicationLogger
    private AppLogs appLogs;

    @EndpointProperty
    private String baseUrl;

    @EndpointConfiguration
    private Json configuration;

    @Override
    public String getApiUri() {
        return StringUtils.isNotBlank(baseUrl) ? baseUrl : "";
    }

    @Override
    public void endpointStarted() {
        final String headers = configuration.string("defaultHeaders", "");
        try {
            final Json jHeaders = checkHeaders(headers);
            jHeaders.forEachMapString(httpService()::setupDefaultHeader);
        } catch (Exception ex){
            appLogs.error(String.format("Invalid default headers defined for HTTP endpoint. Please check them [%s]", headers));
        }

        httpService().setDefaultEmptyPath(configuration.string("emptyPath", ""));

        httpService().setRememberCookies(Configuration.parseBooleanValue(configuration.string("rememberCookies"), false));

        if(StringUtils.isBlank(baseUrl)){
            httpService().setAllowExternalUrl(true);
        } else {
            httpService().setAllowExternalUrl(Configuration.parseBooleanValue(configuration.string("allowExternalUrl"), false));
        }

        httpService().setFollowRedirects(Configuration.parseBooleanValue(configuration.string("followRedirects"), true));
        httpService().setConnectionTimeout(configuration.integer("connectionTimeout", 5000));
        httpService().setReadTimeout(configuration.integer("readTimeout", 60000));

        final String authType = configuration.string("authType", "");

        if(StringUtils.isNotBlank(authType)) {
            final String username = configuration.string("username", "");
            final String password = configuration.string("password", "");

            if ("basic".equalsIgnoreCase(authType)) {
                httpService().setupBasicAuthentication(username, password);

                logger.info(String.format("Configured HTTP Basic authentication: username [%s] - password [%s]", username, Strings.maskToken(password)));
            } else if ("digest".equalsIgnoreCase(authType)) {
                httpService().setupDigestAuthentication(username, password);

                logger.info(String.format("Configured HTTP Digest authentication: username [%s] - password [%s]", username, Strings.maskToken(password)));
            } else if ("apiToken".equalsIgnoreCase(authType)) {

                final String key = configuration.string("key", "");
                final String value = configuration.string("value", "");

                httpService().setupDefaultHeader(key, value);

                logger.info(String.format("Configured HTTP Api Token authentication: Api Token [%s] ", key));
            } else {
                logger.info("Configured without HTTP authentication");
            }
        }

        logger.info(String.format("Configured HTTP endpoint: baseUrl [%s]", baseUrl));
    }


    /**
     * Converts the string headers representation in a Json map object
     *
     * @param stringHeaders string headers list
     * @return json map object
     */
    private static Json checkHeaders(String stringHeaders) {
        final Json headers = Json.map();
        try {
            if (StringUtils.isNotBlank(stringHeaders)){
                final String[] pairs = StringUtils.split(stringHeaders, ",");
                for (String pair : pairs) {
                    final String[] keyValue = StringUtils.split(pair, "=");

                    headers.set(keyValue[0].trim(), keyValue.length > 1 ? keyValue[1].trim() : true);
                }
            }
        } catch (Exception e) {
            throw EndpointException.permanent(ErrorCode.ARGUMENT, String.format("Default headers [%s] are invalid", stringHeaders));
        }
        return headers;
    }

    @EndpointWebService(path = "/sync")
    public WebServiceResponse optionsLoad(WebServiceRequest request) {
        try {
            Json body = request.getJsonBody();
            Json options = (Json) events().sendSync("webhookSync", body);
            return new WebServiceResponse(options, ContentType.APPLICATION_JSON.toString());
        } catch (ClassCastException cce) {
            appLogs.error("The response to the sync webhook from the listener is not a valid JSON");
        } catch (Exception e) {
            appLogs.error("There was an error processing sync webhook: " + e.getMessage(), e);
        }
        return new WebServiceResponse(Json.map(), ContentType.APPLICATION_JSON.toString());
    }

    @EndpointFunction(name = "randomNumber")
    public Json generateRandomNumber(Json data) {
        if (data == null) {
            data = Json.map();
        }

        Random random = new Random();

        // generate random number
        int bound = !data.isEmpty("bound") ? data.integer("bound") : 10000;
        data.set("number", random.nextInt(bound));

        logger.info(String.format("Function RANDOM NUMBER: [%s]", data.toString()));
        return data;
    }

}
