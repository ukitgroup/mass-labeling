const Site = require('../../models/site');
const User = require('../../models/user');
const Task = require('../../models/task');


const diffs = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const router = require('express').Router();


router.get('/markup', async (req, res, next) => {
	try {
		const users = await User.find();

		await Promise.all(users.map(async (curUser) => {
			curUser.markupCount = await Task.countByUserId(curUser.id, true);
		}));

		res.render('stat/markup', { users });
	} catch (err) {
		next(err);
	}
});

router.get('/abnormal(/:diff)?', async (req, res, next) => {
	try {
		const diff = Number(req.params.diff);

		if (! diff) {
			res.render('stat/abnormal', { diffs, diff });
			return;
		}

		const users = await User.find();
		users.forEach((curUser) => {
			curUser.id = String(curUser.id);
			curUser.abnormalCount = 0;
		});
		const usersMap = users.reduce((o, curUser) => {
			o[curUser.id] = curUser;
			o[curUser.id] = curUser;
			return o;
		}, {});

		const answers = await Task.find({
			answer: { $ne: 0 },
		});
		answers.forEach((item) => {
			item.siteId = String(item.siteId);
			item.userId = String(item.userId);
		});
		const answersMap = answers.reduce((o, item) => {
			o[item.siteId] = o[item.siteId] || [];
			o[item.siteId].push(item);
			return o;
		}, {});

		const siteIds = (await Site.distinct('_id', {
			...Site.filter.allowedStatuses,
			...Site.filter.allowedDatasets,
		})).map(siteId => String(siteId));

		siteIds.forEach((siteId) => {
			const siteAnswers = answersMap[siteId];
			if (! siteAnswers) return;

			const avg = siteAnswers.reduce((sum, item) => sum + item.answer, 0) / siteAnswers.length;

			siteAnswers.forEach((item) => {
				if (item.answer >= avg - diff && item.answer <= avg + diff) return;

				usersMap[item.userId].abnormalCount++;
			});
		});

		res.render('stat/abnormal', { diffs, diff, users });
	} catch (err) {
		next(err);
	}
});

router.get('/abnormal-local(/:diff)?', async (req, res, next) => {
	try {
		const diff = Number(req.params.diff);

		if (! diff) {
			res.render('stat/abnormal-local', { diffs, diff });
			return;
		}

		const users = await User.find();
		users.forEach((curUser) => {
			curUser.id = String(curUser.id);
			curUser.abnormalCount = 0;
		});

		const answers = await Task.find({
			answer: { $ne: 0 },
		});
		answers.forEach((item) => {
			item.siteId = String(item.siteId);
			item.userId = String(item.userId);
		});
		const answersMap = answers.reduce((o, item) => {
			const id = `${item.siteId}_${item.userId}`;
			o[id] = o[id] || [];
			o[id].push(item);
			return o;
		}, {});

		const siteIds = (await Site.distinct('_id', {
			...Site.filter.allowedStatuses,
			...Site.filter.allowedDatasets,
		})).map(siteId => String(siteId));

		siteIds.forEach((siteId) => {
			users.forEach((curUser) => {
				const siteUserAnswers = answersMap[`${siteId}_${curUser.id}`];
				if (! siteUserAnswers) return;

				const avg = siteUserAnswers.reduce((sum, item) => sum + item.answer, 0) / siteUserAnswers.length;

				siteUserAnswers.forEach((item) => {
					if (item.answer >= avg - diff && item.answer <= avg + diff) return;

					curUser.abnormalCount++;
				});
			});
		});

		res.render('stat/abnormal-local', { diffs, diff, users });
	} catch (err) {
		next(err);
	}
});


module.exports = router;
