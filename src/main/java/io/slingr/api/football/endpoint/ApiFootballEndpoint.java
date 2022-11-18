package io.slingr.api.football.endpoint;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.framework.annotations.*;
import io.slingr.endpoints.services.AppLogs;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <p>Sample endpoint
 *
 * <p>Created by lefunes on 01/12/16.
 */
@SlingrEndpoint(name = "apifootball")
public class ApiFootballEndpoint extends HttpEndpoint {
    private static final Logger logger = LoggerFactory.getLogger(ApiFootballEndpoint.class);

    private static String API_URL = "https://api.football-data.org/v4/competitions/WC";

    @ApplicationLogger
    private AppLogs appLogger;

    @EndpointProperty
    private String apiKey;

    public ApiFootballEndpoint() {
    }

    @Override
    public String getApiUri() {
        return  API_URL;
    }

    @Override
    public void endpointStarted() {
        this.httpService().setDefaultEmptyPath("");
        this.httpService().setupDefaultHeader("Accept", "application/json");
        this.httpService().setupDefaultHeader("Content-Type", "application/json");
        this.httpService().setupDefaultHeader("X-Auth-Token", apiKey);
    }


    @EndpointFunction(name = "_teams")
    public Json getRequest(FunctionRequest request) {

        Json req = request.getJsonParams();
        String path = req.string("path");
        logger.debug(String.format("[GET] request to %s", path));

        return httpService().defaultGetRequest(req);

    }


    @EndpointFunction(name = "_test")
    public Json postTest(FunctionRequest request) {

        Json req = request.getJsonParams();

        String text = req.string("text");

        logger.debug(String.format("[GET] request to %s", text));

        return req;

    }



}
