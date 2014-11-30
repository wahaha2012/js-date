jsDate
======

jsDate is written in javascript, and it makes javascript date process like [php date function](http://php.net/manual/en/function.date.php "php date").


## How to use

```bash
# for nodejs
$ npm install js-date --save
```

```javascript
//use js-date as module
var jsDate = require("js-date");
```

```html
<!--load js-date as normal script file-->
<script src="./js-date.js"></script>
```

## API

```javascript
// jsDate.date api
jsDate.date([dateFormatString], [dateTimeOffset], [dateTime]);
```



## Example

```javascript
var today=jsDate.date('Y-m-d'),
    nowTime = jsDate.date("Y/m/d H:i:s"),
    yesterday=jsDate.date('Y-m-d','-1day'),
    twoWeeksLater=jsDate.date('Y-m-d','+2week'),
    customTime=jsDate.date('Y/m/d H:i:s',new Date('2012-02-14 15:30:20')),
    customString=jsDate.date('\\\D\\\a\\\y:l',new Date('2012-02-14 15:30:26')),
    constellation=jsDate.date('e');
```

More API please refer to [PHP Date](http://php.net/manual/en/function.date.php "php date")