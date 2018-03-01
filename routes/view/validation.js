const router = require('express').Router();


router.get('/', async (req, res) => {
	res.render('validation', {
		layout: false,
	});
});


module.exports = router;
