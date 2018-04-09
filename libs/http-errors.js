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

	static from(src = {}) {
		const err = new this(src.message, src.status);
		err.columnNumber = src.columnNumber;
		err.fileName = src.fileName;
		err.lineNumber = src.lineNumber;
		err.stack = src.stack;
		return err;
	}
}


module.exports = {
	HTTPError,
	ForbiddenError: HTTPError.factory('Forbidden', 403),
	NotFoundError: HTTPError.factory('Not Found', 404),
};
