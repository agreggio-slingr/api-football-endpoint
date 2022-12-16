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
    		return app.endpoint.apifootball.get(path, body, callbackData, callbacks);
    	case 'post':
    		return app.endpoint.apifootball.post(path, body, callbackData, callbacks);
    	case 'delete':
    		return app.endpoint.apifootball.delete(path, body, callbackData, callbacks);
    	case 'put':
    		return app.endpoint.apifootball.put(path, body, callbackData, callbacks);
    	// case 'connect':
    	// 	return app.endpoint.apifootball.connect(path, body, callbackData, callbacks);
    	case 'head':
    		return app.endpoint.apifootball.head(path, body, callbackData, callbacks);
    	case 'options':
    		return app.endpoint.apifootball.options(path, body, callbackData, callbacks);
    	case 'patch':
    		return app.endpoint.apifootball.patch(path, body, callbackData, callbacks);
    	case 'trace':
    		return app.endpoint.apifootball.trace(path, body, callbackData, callbacks);
		case 'SUM':
			return app.endpoint.apifootball.sum(1, 2);
    	default:
            return null;
    }

};