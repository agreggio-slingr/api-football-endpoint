/**
 * This flow step will send generic request.
 *
 * @param {object} stepConfig.inputs
 * {text} method, This is used to config method.
 * {text} url, This is used to config external URL.
 * {Array[string]} pathVariables, This is used to config path variables.
 * {Array[string]} headers, This is used to config headers.
 * {Array[string]} params, This is used to config params.
 * {string} body, This is used to send body request.
 * {string} callbackData, This is used to send callback data.
 * {text} callbacks, This is used to send callbacks.
 * {boolean} followRedirects, This is used to config follow redirects.
 * {boolean} download, This is used to config download.
 * {boolean} fullResponse, This is used to config full response.
 * {number} connectionTimeout, Read timeout interval, in milliseconds.
 * {number} readTimeout, Connect timeout interval, in milliseconds.
 * @param {object} stepConfig.context {object} context
 */
step.httpCall = function (stepConfig) {


	eval("var codeObject = {fileDownloaded : function(event, callbackData) {"+stepConfig.inputs.callbackCode+"}};");

	var callbackData = {
		record:stepConfig.inputs.callbackData
	}


	var headers = isObject(stepConfig.inputs.headers) ? stepConfig.inputs.headers : stringToObject(stepConfig.inputs.headers)
	var params = isObject(stepConfig.inputs.params) ? stepConfig.inputs.params : stringToObject(stepConfig.inputs.params)
	var body = isObject(stepConfig.inputs.body) ? stepConfig.inputs.body : JSON.parse(stepConfig.inputs.body);

	var options = {
		path: parse(stepConfig.inputs.url.urlValue, stepConfig.inputs.url.paramsValue),
		params:params,
		headers:headers,
		body: body,
		followRedirects : stepConfig.inputs.followRedirects,
		forceDownload : stepConfig.inputs.download,
		downloadSync : stepConfig.inputs.downloadSync,
		fileName: stepConfig.inputs.fileName,
		fullResponse : stepConfig.inputs.fullResponse,
		connectionTimeout: stepConfig.inputs.connectionTimeout,
		readTimeout: stepConfig.inputs.readTimeout
	}

	switch (stepConfig.inputs.method) {
		case 'get':
			return endpoint._get(options, callbackData, codeObject);
		case 'post':
			return endpoint._post(options, callbackData, codeObject);
		case 'delete':
			return endpoint._delete(options, callbackData, codeObject);
		case 'put':
			return endpoint._put(options, callbackData, codeObject);
		case 'connect':
			return endpoint._connect(options, callbackData, codeObject);
		case 'head':
			return endpoint._head(options, callbackData, codeObject);
		case 'options':
			return endpoint._options(options, callbackData, codeObject);
		case 'patch':
			return endpoint._patch(options, callbackData, codeObject);
		case 'trace':
			return endpoint._trace(options, callbackData, codeObject);
		default:
			return null;
	}

};

var parse = function (url, pathVariables){

	var regex = /{([^}]*)}/g;

	if (!url.match(regex)){
		return url;
	}

	if(!pathVariables){
		sys.logs.error('No path variables have been received and the url contains curly brackets\'{}\'');
		throw new Error('Error please contact support.');
	}

	url = url.replace(regex, function(m, i) {
		return pathVariables[i] ? pathVariables[i] : m;
	})

	return url;
}
var isObject = function (obj) {
	return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);

var stringToObject = function (obj) {
	if (!!obj){
		var keyValue = obj.toString().split(',');
		var parseObj = {};
		for(var i = 0; i < keyValue.length; i++) {
			parseObj[keyValue[i].split('=')[0]] = keyValue[i].split('=')[1]
		}
		return parseObj;
	}
	return null;
};