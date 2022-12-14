/**
 * This flow step will send generic request.
 *
 * @param {text} baseUrl, This is used to config external URL.
 */
step.generic = function (baseUrl) {

	sys.logs.error('[api-football.step.generic]' + baseUrl);

	return baseUrl;

	// switch (method) {
	// 	case 'get':
	// 		return endpoint._get(options, callbackData, callbacks);
	// 	case 'post':
	// 		return endpoint._post(options, callbackData, callbacks);
	// 	case 'delete':
	// 		return endpoint._delete(options, callbackData, callbacks);
	// 	case 'put':
	// 		return endpoint._put(options, callbackData, callbacks);
	// 	case 'connect':
	// 		return endpoint._connect(options, callbackData, callbacks);
	// 	case 'head':
	// 		return endpoint._head(options, callbackData, callbacks);
	// 	case 'options':
	// 		return endpoint._options(options, callbackData, callbacks);
	// 	case 'patch':
	// 		return endpoint._patch(options, callbackData, callbacks);
	// 	case 'trace':
	// 		return endpoint._trace(options, callbackData, callbacks);
	// 	default:
	// 		sys.logs.error('Invalid method received.');
	// 		break;
	// }

}

var checkHttpOptions = function (url, options, headers) {
	options = options || {};
	if (!!url) {
		if (isObject(url)) {
			// take the 'url' parameter as the options
			options = url || {};
		} else {
			if (!!options.path || !!options.params || !!options.body) {
				// options contains the http package format
				options.path = url;
			} else {
				// create html package
				options = {
					path: url,
					body: options,
					header:headers
				}
			}
		}
	}
	return options;
};

var isObject = function (obj) {
	return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);
