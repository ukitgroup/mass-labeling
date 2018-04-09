/* global describe, it */

const { expect } = require('chai');

const { HTTPError, ForbiddenError, NotFoundError } = require('./http-errors');


describe('HTTPError', () => {
	describe('.constructor()', () => {
		const className = 'HTTPError';
		const defaultMessage = 'Unknown Error';
		const defaultStatus = 500;

		it('constructor(...) should create object instanceof Error', () => {
			const err = new HTTPError();

			expect(err).instanceof(Error);
		});

		it('constructor(...) should set name', () => {
			const err = new HTTPError();

			expect(err).property('name').equal(className);
		});

		it('constructor() should set default message, default status', () => {
			const err = new HTTPError();

			expect(err).property('message').equal(defaultMessage);
			expect(err).property('status').equal(defaultStatus);
		});

		it('constructor(message) should set message, default status', () => {
			const message = 'Custom message';

			const err = new HTTPError(message);

			expect(err).property('message').equal(message);
			expect(err).property('status').equal(defaultStatus);
		});

		it('constructor(message, status) should message, status', () => {
			const message = 'HTTPError custom message';
			const status = 1234;

			const err = new HTTPError(message, status);

			expect(err).property('message').equal(message);
			expect(err).property('status').equal(status);
		});
	});


	describe('.factory()', () => {
		const className = 'MyCustomError';
		const defaultMessage = 'MyCustomError default message';
		const status = 1234;

		const MyCustomError = HTTPError.factory(className, defaultMessage, status);

		it('factory(...) should create class where constructor(...) should create object instanceof HTTPError', () => {
			const err = new MyCustomError();

			expect(err).instanceof(HTTPError);
		});

		it('factory(className, ...) should create class where constructor(...) should set name', () => {
			const err = new MyCustomError();

			expect(err).property('name').equal(className);
		});

		it('factory(className, defaultMessage, status) should create class where constructor() should set default message, status', () => {
			const err = new MyCustomError();

			expect(err).property('message').equal(defaultMessage);
			expect(err).property('status').equal(status);
		});

		it('factory(className, defaultMessage, status) should create class where constructor(message) should set message, status', () => {
			const message = 'MyCustomError custom message';

			const err = new MyCustomError(message);

			expect(err).property('message').equal(message);
			expect(err).property('status').equal(status);
		});
	});


	describe('.from()', () => {
		const defaultMessage = 'Unknown Error';
		const defaultStatus = 500;

		it('from(...) should create object instanceof HTTPError', () => {
			const originalError = new Error();

			const err = HTTPError.from(originalError);

			expect(err).instanceof(HTTPError);
		});

		it('from({}) should set default message, default status', () => {
			const err = HTTPError.from({});

			expect(err).property('message').equal(defaultMessage);
			expect(err).property('status').equal(defaultStatus);
		});

		it('from(error) should copy position fields, stack', () => {
			const originalError = new Error();

			const err = HTTPError.from(originalError);

			expect(err).property('columnNumber').equal(originalError.columnNumber);
			expect(err).property('fileName').equal(originalError.fileName);
			expect(err).property('lineNumber').equal(originalError.lineNumber);
			expect(err).property('stack').equal(originalError.stack);
		});

		it('from(error(message)) should copy message, set default status', () => {
			const originalError = new Error('Error custom message');

			const err = HTTPError.from(originalError);

			expect(err).property('message').equal(originalError.message);
			expect(err).property('status').equal(defaultStatus);
		});

		it('from(error(message, status)) should copy message, status', () => {
			const originalError = new Error('Error custom message');
			originalError.status = 1234;

			const err = HTTPError.from(originalError);

			expect(err).property('message').equal(originalError.message);
			expect(err).property('status').equal(originalError.status);
		});
	});
});


describe('ForbiddenError', () => {
	describe('.constructor()', () => {
		const className = 'ForbiddenError';
		const defaultMessage = 'Forbidden';
		const status = 403;

		it('constructor(...) should create object instanceof HTTPError', () => {
			const err = new ForbiddenError();

			expect(err).instanceof(HTTPError);
		});

		it('constructor(...) should set name', () => {
			const err = new ForbiddenError();

			expect(err).property('name').equal(className);
		});

		it('constructor() should set default message, status', () => {
			const err = new ForbiddenError();

			expect(err).property('message').equal(defaultMessage);
			expect(err).property('status').equal(status);
		});

		it('constructor(message) should set message, status', () => {
			const message = 'ForbiddenError custom message';

			const err = new ForbiddenError(message);

			expect(err).property('message').equal(message);
			expect(err).property('status').equal(status);
		});
	});


	describe('.from()', () => {
		const defaultMessage = 'Forbidden';
		const status = 403;

		it('from(...) should create object instanceof ForbiddenError', () => {
			const originalError = new Error();

			const err = ForbiddenError.from(originalError);

			expect(err).instanceof(ForbiddenError);
		});

		it('from({}) should set default message, status', () => {
			const err = ForbiddenError.from({});

			expect(err).property('message').equal(defaultMessage);
			expect(err).property('status').equal(status);
		});

		it('from(error) should copy position fields, stack', () => {
			const originalError = new Error();

			const err = ForbiddenError.from(originalError);

			expect(err).property('columnNumber').equal(originalError.columnNumber);
			expect(err).property('fileName').equal(originalError.fileName);
			expect(err).property('lineNumber').equal(originalError.lineNumber);
			expect(err).property('stack').equal(originalError.stack);
		});

		it('from(error(message)) should copy message, set status', () => {
			const originalError = new Error('Error custom message');

			const err = ForbiddenError.from(originalError);

			expect(err).property('message').equal(originalError.message);
			expect(err).property('status').equal(status);
		});
	});
});


describe('NotFoundError', () => {
	describe('.constructor()', () => {
		const className = 'NotFoundError';
		const defaultMessage = 'Not Found';
		const status = 404;

		it('constructor(...) should create object instanceof HTTPError', () => {
			const err = new NotFoundError();

			expect(err).instanceof(HTTPError);
		});

		it('constructor(...) should set name', () => {
			const err = new NotFoundError();

			expect(err).property('name').equal(className);
		});

		it('constructor() should set default message, status', () => {
			const err = new NotFoundError();

			expect(err).property('message').equal(defaultMessage);
			expect(err).property('status').equal(status);
		});

		it('constructor(message) should set message, status', () => {
			const message = 'ForbiddenError custom message';

			const err = new NotFoundError(message);

			expect(err).property('message').equal(message);
			expect(err).property('status').equal(status);
		});
	});


	describe('.from()', () => {
		const defaultMessage = 'Not Found';
		const status = 404;

		it('from(...) should create object instanceof ForbiddenError', () => {
			const originalError = new Error();

			const err = NotFoundError.from(originalError);

			expect(err).instanceof(NotFoundError);
		});

		it('from({}) should set default message, status', () => {
			const err = NotFoundError.from({});

			expect(err).property('message').equal(defaultMessage);
			expect(err).property('status').equal(status);
		});

		it('from(error) should copy position fields, stack', () => {
			const originalError = new Error();

			const err = NotFoundError.from(originalError);

			expect(err).property('columnNumber').equal(originalError.columnNumber);
			expect(err).property('fileName').equal(originalError.fileName);
			expect(err).property('lineNumber').equal(originalError.lineNumber);
			expect(err).property('stack').equal(originalError.stack);
		});

		it('from(error(message)) should copy message, set status', () => {
			const originalError = new Error('Error custom message');

			const err = NotFoundError.from(originalError);

			expect(err).property('message').equal(originalError.message);
			expect(err).property('status').equal(status);
		});
	});
});
