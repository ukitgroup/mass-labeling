class HTTPError extends Error {
	constructor(message = 'Unknown Error', status = 500) {
		super(message);
		this.status = status;
	}

	static factory(defaultMessage, status) {
		return class extends this {
			constructor(message = defaultMessage) {
				super(message, status);
			}
		};
	}
}


module.exports = {
	HTTPError,
	ForbiddenError: HTTPError.factory('Forbidden', 403),
	NotFoundError: HTTPError.factory('Not Found', 404),
};
