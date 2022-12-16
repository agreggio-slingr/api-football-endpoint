/**
 * This flow step will send generic request.
 *
 * @param {text} method, This is used to config method.
 * @param {object} path, This is used to config external URL.
 * @param {text} headers, This is used to config external URL.
 * @param {text} params, This is used to config external URL.
 * @param {text} body, This is used to send body request.
 * @param {text} callbackData, This is used to send callback data.
 * @param {text} callbacks, This is used to send callbacks.
 */
step.generic = function (method, path, headers,params, body, callbackData, callbacks) {

    body = body || {};

    body = {
        path: path,
        headers:headers,
        params:params
    };

    switch (method) {
    	case 'get':
    		return app.endpoints.apifootball._get(body, callbackData, callbacks);
    	case 'post':
    		return app.endpoints.apifootball._post(body, callbackData, callbacks);
    	case 'delete':
    		return app.endpoints.apifootball._delete(body, callbackData, callbacks);
    	case 'put':
    		return app.endpoints.apifootball._put(body, callbackData, callbacks);
    	// case 'connect':
    	// 	return app.endpoints.apifootball._connect(body, callbackData, callbacks);
    	case 'head':
    		return app.endpoints.apifootball._head(body, callbackData, callbacks);
    	case 'options':
    		return app.endpoints.apifootball._options(body, callbackData, callbacks);
    	case 'patch':
    		return app.endpoints.apifootball._patch(body, callbackData, callbacks);
    	case 'trace':
    		return app.endpoints.apifootball._trace(body, callbackData, callbacks);
    	default:
            return null;
    }

};