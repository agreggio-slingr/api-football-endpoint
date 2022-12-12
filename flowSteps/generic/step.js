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

	switch (method) {
		case 'get':
			console.log('the season is get')
			return endpoint.get(url, body, callbackData, callbacks);
		case 'post':
			console.log('the season is post')
			break;
		case 'delete':
			console.log('the season is delete')
			break;
		case 'put':
			console.log('the season is put')
			break;
		default:
			console.log('season not defined')
			return endpoint.get(url, body, callbackData, callbacks);
	}

}