/**
 * These scripts are executed inside the app runtime, which means you have access to the
 * Javascript API and all the app data.
 *
 * Everything exposed under 'endpoint' will be available to the user through
 * 'app.endpoints.endpointName'.
 */

endpoint.teams = {};
endpoint.teams.get = function (reqObj) {
    return endpoint.get('/teams', reqObj);
};