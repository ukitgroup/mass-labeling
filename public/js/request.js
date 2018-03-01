class Request {
	constructor({
		method,
		url,
		params = {},
		data,
	}) {
		return (async () => {
			url = Request.urlParams(url, params);

			let body = null;
			if (data != null) {
				body = JSON.stringify(data);
			}

			return Request.process(url, {
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
	} = {}) {
		return new Request({
			method: 'get',
			url,
			params,
		});
	}

	static async post(url, {
		params,
		data,
	} = {}) {
		return new Request({
			method: 'post',
			url,
			params,
			data,
		});
	}


	static urlParams(url, params) {
		return Object.keys(params).reduce((url, key) => {
			url.searchParams.append(key, params[key]);
			return url;
		}, new URL(url, window.location)).toString();
	}


	static async process(...args) {
		const response = await fetch(...args);

		const [err, result] = await response.json();
		if (err) {
			throw new Error(err);
		}

		return result;
	}
}


window.Request = Request;
