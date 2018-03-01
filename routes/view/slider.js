const Slider = require('../../model/slider');


const router = require('express').Router();


router.get('/', async (req, res) => {
	res.render('slider/stub');
});

router.get('/:name', async (req, res, next) => {
	try {
		const items = await Slider.getAllByName(req.params.name);

		res.render('slider/slider', {
			layout: false,
			items: await Slider.serializeAll(items),
		});
	} catch (err) {
		next(err);
	}
});


module.exports = router;
