const app = require('express')();

require('./boot/mongo')();
require('./boot/express')(app);
require('./boot/passport')(app);
require('./boot/view')(app);
require('./boot/router')(app);

module.exports = app;
