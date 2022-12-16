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
    		return endpoint.get(path, body, callbackData, callbacks);
    	case 'post':
    		return endpoint.post(path, body, callbackData, callbacks);
    	case 'delete':
    		return endpoint.delete(path, body, callbackData, callbacks);
    	case 'put':
    		return endpoint.put(path, body, callbackData, callbacks);
    	case 'head':
    		return endpoint.head(path, body, callbackData, callbacks);
    	case 'options':
    		return endpoint.options(path, body, callbackData, callbacks);
    	case 'patch':
    		return endpoint.patch(path, body, callbackData, callbacks);
    	case 'trace':
    		return endpoint.trace(path, body, callbackData, callbacks);
    	default:
            return null;
    }

};