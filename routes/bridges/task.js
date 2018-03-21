const { ForbiddenError, NotFoundError } = require('../../lib/http-errors');

const Task = require('../../model/task');


module.exports = {
	async id(req, res, next) {
		try {
			req.task = await Task.findById(req.params.taskId);
			if (! req.task) throw new NotFoundError();

			next();
		} catch (err) {
			next(err);
		}
	},

	async owner(req, res, next) {
		try {
			if (! req.task.userId.equals(req.user.id)) throw new ForbiddenError();

			next();
		} catch (err) {
			next(err);
		}
	},
};
