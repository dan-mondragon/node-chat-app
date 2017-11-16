var moment = require('moment');


var createdAt = 1234;
var date = new moment(createdAt);
// date.add(1, 'year').subtract(1,'months');
console.log(date.format('h:mm a'));
