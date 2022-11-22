package io.slingr.api.football.endpoint;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.framework.annotations.*;
import io.slingr.endpoints.services.AppLogs;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.slingr.endpoints.exceptions.EndpointException;

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
    private AppLogs appLogger;

    @EndpointProperty
    private String authenticationMethod;

    @EndpointProperty
    private String clientId;

    @EndpointProperty
    private String clientSecret;

    @EndpointProperty
    private String accessToken;

    @EndpointProperty
    private String refreshToken;

    @EndpointProperty
    private String apiKey;

    @EndpointProperty
    private String instanceUrl;

    @EndpointProperty
    private String webhooksSharedKey;

    @Override
    public String getApiUri() {
        return instanceUrl;
    }

    @Override
    public void endpointStarted() {
        httpService().setAllowExternalUrl(true);
    }

    public ApiFootballEndpoint() {
    }


    @EndpointFunction(name = "_get")
    public Json get(FunctionRequest request) {
        try {
            setRequestHeaders(request);
            return defaultGetRequest(request);
        } catch (EndpointException restException) {
            if (restException.getHttpStatusCode() == 401) {
                setRequestHeaders(request);
                return defaultGetRequest(request);
            } else {
                throw restException;
            }
        }
    }

    @EndpointFunction(name = "_post")
    public Json post(FunctionRequest request) {
        try {
            setRequestHeaders(request);
            return defaultPostRequest(request);
        } catch (EndpointException restException) {
            if (restException.getHttpStatusCode() == 401) {
                setRequestHeaders(request);
                return defaultPostRequest(request);
            } else {
                throw restException;
            }
        }
    }


    private void setRequestHeaders(FunctionRequest request) {
        Json body = request.getJsonParams();
        Json headers = body.json("headers");
        if (headers == null) {
            headers = Json.map();
        }
        if (authenticationMethod.equals("apiKey")) {
            headers.set("Authorization", "API-Key " + apiKey);
        } else {
            headers.set("Authorization", "Bearer " + accessToken);
        }
        headers.set("Content-Type", "application/json");
        if (headers.isEmpty("Accept")) {
            headers.set("Accept", "application/json");
        }
        body.set("headers", headers);
    }


//    @EndpointFunction(name = "_teams")
//    public Json getRequest(FunctionRequest request) {
//
//        Json req = request.getJsonParams();
//        String path = req.string("path");
//        logger.debug(String.format("[GET] request to %s", path));
//
//        return httpService().defaultGetRequest(req);
//
//    }


//    @EndpointFunction(name = "_test")
//    public Json postTest(FunctionRequest request) {
//
//        Json req = request.getJsonParams();
//
//        String text = req.string("text");
//
//        logger.debug(String.format("[GET] request to %s", text));
//
//        return req;
//
//    }



}
