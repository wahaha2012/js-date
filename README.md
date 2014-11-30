jsDate
======

jsDate is written in javascript, and it makes javascript date process like [php date function](http://php.net/manual/en/function.date.php "php date").


## How to use ##

```bash
$ npm install js-date --save
```

```javascript
[window.]jsDate.date([StringFormat], [dateTimeOffset], [dateTime]);
```



###Example###

```javascript
var jsDate = require("js-date");

- var today=jsDate.date('Y-m-d');
- var nowTime = jsDate.date("Y/m/d H:i:s");
- var yesterday=jsDate.date('Y-m-d','-1day');
- var twoWeeksLater=jsDate.date('Y-m-d','+2week');
- var customTime=jsDate.date('Y/m/d H:i:s',new Date('2012-02-14 15:30:20'));
- var customString=jsDate.date('\\\D\\\a\\\y:l',new Date('2012-02-14 15:30:26'));
- var constellation=jsDate.date('e');
```

More API please refer to [PHP Date](http://php.net/manual/en/function.date.php "php date")