export default class Request {
	constructor({
		method,
		url,
		params = {},
		data,
		process = Request.process,
		rootUrl,
	}) {
		return (async () => {
			url = Request.urlParams(url, params, rootUrl);

			let body = null;
			if (data != null) {
				body = JSON.stringify(data);
			}

			return process(url, {
				method,
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body,
			});
		})();
	}


	static async get(url, {
		params,
		process,
	} = {}, rootUrl) {
		return new Request({
			method: 'get',
			url,
			params,
			process,
			rootUrl,
		});
	}

	static async post(url, {
		params,
		data,
		process,
	} = {}, rootUrl) {
		return new Request({
			method: 'post',
			url,
			params,
			data,
			process,
			rootUrl,
		});
	}


	static urlParams(url, params, rootUrl = window.location) {
		return Object.keys(params).reduce((url, key) => {
			url.searchParams.append(key, params[key]);
			return url;
		}, new URL(url, rootUrl)).toString();
	}


	static async process(...args) {
		const response = await fetch(...args);

		// Redirect user to login form if the user is disabled
		if (response.status === 301) {
			window.location = '/';
			return null;
		}

		const [err, result] = await response.json();

		if (err) throw new Error(err);

		return result;
	}
}
