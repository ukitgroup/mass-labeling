class HTTPError extends Error {
	constructor(message = 'Unknown Error', status = 500) {
		super(message);
		this.name = this.constructor.name;
		this.status = status;
	}

	static factory(className, defaultMessage, status) {
		return {
			[className]: class extends this {
				constructor(message = defaultMessage) {
					super(message, status);
				}
			},
		}[className];
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
	ForbiddenError: HTTPError.factory('ForbiddenError', 'Forbidden', 403),
	NotFoundError: HTTPError.factory('NotFoundError', 'Not Found', 404),
};
