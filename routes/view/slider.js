const Slider = require('../../models/slider');


const router = require('express').Router();


router.get('/:name/:taskSetId', async (req, res, next) => {
	try {
		const { name, taskSetId } = req.params;

		const items = await Slider.getAllByNameAndTaskSet(name, taskSetId);

		res.render('slider', {
			layout: false,
			items: await Slider.serializeAll(items),
		});
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
