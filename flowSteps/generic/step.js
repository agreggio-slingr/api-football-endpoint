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

    // body = body || {};
	//
    // body = {
    //     path: path,
    //     headers:headers,
    //     params:params
    // };

    switch (method) {
    	case 'get':
    		return app.endpoints.apifootball.get(path, body, callbackData, callbacks);
    	case 'post':
    		return app.endpoints.apifootball.post(path, body, callbackData, callbacks);
    	case 'delete':
    		return app.endpoints.apifootball.delete(path, body, callbackData, callbacks);
    	case 'put':
    		return app.endpoints.apifootball.put(path, body, callbackData, callbacks);
    	// case 'connect':
    	// 	return app.endpoints.apifootball.connect(path, body, callbackData, callbacks);
    	case 'head':
    		return app.endpoints.apifootball.head(path, body, callbackData, callbacks);
    	case 'options':
    		return app.endpoints.apifootball.options(path, body, callbackData, callbacks);
    	case 'patch':
    		return app.endpoints.apifootball.patch(path, body, callbackData, callbacks);
    	case 'trace':
    		return app.endpoints.apifootball.trace(path, body, callbackData, callbacks);
		case 'SUM':
			return app.endpoints.apifootball.sum(1, 2);
    	default:
            return null;
    }

};