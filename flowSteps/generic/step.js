 /**
 * Sends get request.
 *
 * @param {text} method, This is used to config external URL.
 * @param {text} url, This is used to config external URL.
 * @param {text} body, This is used to send body request.
 * @param {text} callbackData, This is used to send callbackData.
 * @param {text} callbacks, This is used to send callbacks.
 */
step.generic = function (method, url, body, callbackData, callbacks) {

	let options = checkHttpOptions(url, httpOptions);

	sys.logs.debug('[pandadoc.step.generic]' + method + 'from: ' + url);
	
	switch (method) {
		case 'get':
			return endpoint._get(options, callbackData, callbacks);
		case 'post':
			return endpoint._post(options, callbackData, callbacks);
		case 'delete':
			return endpoint._delete(options, callbackData, callbacks);
		case 'put':
			return endpoint._put(options, callbackData, callbacks);
		case 'connect':
			return endpoint._connect(options, callbackData, callbacks);
		case 'head':
			return endpoint._head(options, callbackData, callbacks);
		case 'options':
			return endpoint._options(options, callbackData, callbacks);
		case 'patch':
			return endpoint._patch(options, callbackData, callbacks);
		case 'trace':
			return endpoint._trace(options, callbackData, callbacks);
		default:
			sys.logs.error('Invalid method received.');
			break;
	}

}