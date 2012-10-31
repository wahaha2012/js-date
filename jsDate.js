/**===================jsDate.js========================
*jsDate.js is under the MIT License.
*Version: 1.0.
*Author: wxwdesign.
*Copyright (c) 2012 wxwdesign.com All Right Reserved.
*/
(function(){
	window.jsDate=window.jsDate||{};
	/**like php
	*jsDate.date(format, [dateTimeOffset], [dateTime]);
	*@parameter format: {String}, the format type.
	*@parameter dateTimeOffset: {String}, use string to get date time wanted.
	*@parameter dateTime: {Date Object}, date time to be format, this paramter is optional, not required
	*if parameter dateTime is empty, current time will be used as default
	*-------------use method------------------
	*window.jsDate.date(format)=====>return: {String} formatted date result of current time.
	*window.jsDate.date(format, dateTime)====>return: {String} formatted date result of dateTime
	*window.jsDate.date(format, dateTimeOffset);====>return: {String} formatted date result plus with dateTimeOffset
	*window.jsDate.date(format, dateTimeOffset, dateTime);===>return: {String} formatted date result of dateTime plus with dateTimeOffset
	*window.jsDate.date(dateTimeOffset)===>return: {Date Object} date object of current time plus with dateTimeOffset.
	*window.jsDate.date(dateTimeOffset, dateTime)===>return: {Date Object} date object of dateTime plus with dateTimeOffset.
	*window.jsDate.date(dateTime)====>return: {Date Object} date object of dateTime.
	*window.jsDate.date()===>return: {Date Object} date object of current time
	*/
	window.jsDate.date=function(format, dateTimeOffset, dateTime){
		/**set default return value*/
		var results=[];
		
		/**check parameters*/
		/**window.jsDate.date()*/
		if(typeof format==='undefined'){
			return new Date();
		/**window.jsDate.date(dateTime)*/
		}else if(format.constructor===Date){
			return format;
		}else if(format.constructor!==String){
			return 'parameter error!';
		}
		
		/**window.jsDate.date(format, date) or window.jsDate.date(dateTimeOffset, dateTime)*/
		if(typeof dateTimeOffset==='undefined'){
			dateTimeOffset='';
		}else if(dateTimeOffset.constructor===Date){
			dateTime=dateTimeOffset;
			dateTimeOffset='';
		}else if(dateTimeOffset.constructor!==String){
			dateTimeOffset='';
		}
		
		if(typeof dateTime==='undefined'||dateTime.constructor!==Date){
			dateTime=new Date();
		}
		
		/**window.jsDate.date(dateTimeOffset,[dateTime])*/
		if(/^(\+|\-)?(\d+)(day|week|month|year)$/.test(format)){
			dateTimeOffset=format;
		}
			
		/**calculate datetime*/
		if(dateTimeOffset.match(/^(\+|\-)?(\d+)(day|week|month|year)$/)){
			var y=dateTime.getFullYear(),
				m=dateTime.getMonth(),
				d=dateTime.getDate(),
				operator=RegExp.$1=='-',
				number=parseInt(RegExp.$2,10);
			switch(RegExp.$3){
				case 'day':
					d=operator?d-number:d+number;
				break;
				case 'week':
					d=operator?d-number*7:d+number*7;
				break;
				case 'month':
					m=operator?m-number:m+number;
				break;
				case 'year':
					y=operator?y-number:y+number;
				break;
			}
			
			dateTime=new Date(y,m,d,dateTime.getHours(),dateTime.getMinutes(),dateTime.getSeconds());
			
			/**if no format content, return offset dateTime directly*/
			if(dateTimeOffset===format){return dateTime;}
		}
			
		/**replace characters need to remain in format result*/
		var formats=format.replace(/\\\w/g,'').split(''),
		/**
		*----------------------day------------------------------------*
		*d: get the index of the day in month with prefix character '0'===>return: 01~31
		*D: get the index of the day in week===>return: Mon~Sun
		*j: get the index of the day in month without prefix character '0'===>return: 1~31
		*l: get the full name the day in week===>return:Sunday~Saturday
		*N: get the index of the day in week by number===>return: 1~7(Monday~Sunday)
		*S: get the subfix of the day in month, this parameter can be used together with parameter 'j'===>return: st,nd,rd,th
		*w: get the index of the day in week===>return: 0~6(Sunday~Saturday)
		*z: get the index of the day in year===>return: 0~366
		*C: get chinese constellation name of date===>return: 水瓶~魔羯
		*e: get english constellation name of date===>return: Aquarius~Capricornus
		*----------------------week------------------------------------*
		*W: get the index of the week in year, every week start from monday===>return: 1~52
		*----------------------month------------------------------------*
		*F: get the full name of month===>return: January~December
		*m: get the month with prefix character '0'===>return: 01~12
		*M: get the month by abbreviation in first three characters===>return: Jan~Dec(January~December)
		*n: get the month without prefix character '0'===>return: 1~12
		*t: get days amount of one month===>return: 28~31
		*----------------------year------------------------------------*
		*L: get the year is a leap year or not()===>return: 0(false) or 1(true)
		*Y: get the full name of the year===>return: eg. 1999, 2003
		*y: get name of year in two characters===>return: eg.99 or 03
		*----------------------time------------------------------------*
		*a: get morning or afternoon in lowercase mode===>return: am or pm
		*A: get morning or afternonn in uppercase mode===>return: AM or PM
		*g: get hour without prefix character '0' in 12 hours mode===>return: 1~12
		*G: get hour without prefix character '0' in 24 hours mode===>return: 0~23
		*h: get hour with prefix character '0' in 12 hours mode===>return: 01~12
		*H: get hour with prefix character '0' in 24 hours mode===>return: 00~23
		*i: get minutes with prefix character '0'===>return: 00~59
		*s: get seconds with prefix character '0'===>return: 00~59
		*----------------------time-zone------------------------------------*
		*I: get the date time is Daylight Saving Time(DST) or not===>return: 0(false) or 1(true)
		*O: get hours offset between date time with the Greenwich standard time===>return: eg.+0200
		*----------------------full date time------------------------------------*
		*c: get date time formatted in ISO 8601===>return: eg. 2004-02-12T15:19:21+00:00
		*r: get date time formatted in RFC 822===>return: eg. Thu,21 Dec 2000 16:01:07 +0200
		*U: get seconds from 1970-01-01 00:00:00 GMT===>return: eg.1335412033
		*/
			filter='dDjlNSwzCeWFmMntLYyaAgGhHisIOcrU';
		
		/**save values and places of matched characters*/
		var	mtTemp='', mt={};
		while(mtTemp=format.match(/\\\w/)){
			format=format.replace(/\\\w/,'');
			!mt[mtTemp.index]?mt[mtTemp.index]=[]:'';
			mt[mtTemp.index].push(mtTemp[0]);
		}
			
		/**get format results*/
		for(var i=0,len=formats.length;i<len;i++){
			results.push(mt[i]&&mt[i].join('').replace(/\\/g,''));
			results.push(filter.indexOf(formats[i])>-1?_getResult(formats[i],dateTime):formats[i]);		
		}
			
		return results.join('');
	};
	
	/**
	*_getResult(format, dateTime);
	*@parameter format: String, the format type
	*@parameter dateTime: timestamp, date time to be format
	*/
	function _getResult(format,dateTime){
		/**set default return value*/
		var result='';
		
		switch(format){
			/**-----------------------day-------------------------*/
			/**
			*get the index of the day in month with prefix character '0'
			*return: 01~31
			*/
			case 'd':
				result=dateTime.getDate();
				result=_formatPrefix(result);
			break;
			
			/**
			*get the index of the day in week
			*return: Mon~Sun
			*/
			case 'D':
				result=dateTime.getDay();
				var weekName=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
				result=weekName[result];
			break;
			
			/**
			*get the index of the day in month without prefix character '0'
			*return: 1~31
			*/
			case 'j':
				result=dateTime.getDate();
			break;
			
			/**paramter 'l' is the lowercase of characeter 'L'
			*get the full name the day in week
			*return:Sunday~Saturday
			*/
			case 'l':
				result=dateTime.getDay();
				var weekName=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
				result=weekName[result];
			break;
			
			/**
			*get the index of the day in week by number
			*return: 1~7(Monday~Sunday)
			*/
			case 'N':
				result=dateTime.getDay();
				result=result===0?7:result;
			break;
			
			/**
			*get the subfix of the day in month, this parameter can be used together with parameter 'j'
			*return: st,nd,rd,th
			*/
			case 'S':
				result=dateTime.getDate();
				var lastNumber=parseInt(result.toString().substr(-1),10);
				var subfix=['st','nd','rd'];
				result=lastNumber<4&&lastNumber>0&&(result>13||result<10)?subfix[lastNumber-1]:'th';
			break;
			
			/**
			*get the index of the day in week
			*return: 0~6(Sunday~Saturday)
			*/
			case 'w':
				result=dateTime.getDay();
			break;
			
			/**
			*get the index of the day in year
			*return: 0~366
			*/
			case 'z':
				var m=dateTime.getMonth()+1;
				var d=dateTime.getDate();
				var y=dateTime.getFullYear();
				var z=0;
				for(var i=1;i<m;i++){
					z+=_getMonthDaysNumber(i,y);
				}
				z+=d;
				result=z-1;
			break;
			
			/**
			*get chinese constellation name of the day
			*return:水瓶~魔羯
			*/
			case 'C':
				result=_getHoroscope(dateTime);
			break;
			
			/**
			*get english constellation name of the day
			*return:Aquarius~Capricornus
			*/
			case 'e':
				result=_getHoroscope(dateTime, true);
			break;
			
			/**---------------------week--------------------------*/
			/**
			*get the index of the week in year, every week start from monday
			*return: 1~52
			*/
			case 'W':
				var y=dateTime.getFullYear();
				var fd=new Date(y,0,1);
				var w=fd.getDay();
				w=w===0?7:w;				
				var totalDay=jsDate.date('z',dateTime)+1-(7-w+1);
				result=Math.ceil(totalDay/7);
			break;
			
			/**---------------------month--------------------------*/
			/**
			*get the full name of month
			*return: January~December
			*/
			case 'F':
				var m=['January','February','March','April','May','June','July','August','September','October','November','December'];
				result=m[dateTime.getMonth()];
			break;
			
			/**
			*get the month with prefix character '0'
			*return: 01~12
			*/
			case 'm':
				result=_formatPrefix(dateTime.getMonth()+1);
			break;
			
			/**
			*get the month by abbreviation in first three characters
			*return: Jan~Dec(January~December)
			*/
			case 'M':
				var m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Novr','Dec'];
				result=m[dateTime.getMonth()];
			break;
			
			/**
			*get the month without prefix character '0'
			*return: 1~12
			*/
			case 'n':
				result=dateTime.getMonth()+1;
			break;
			
			/**
			*get days number of the month
			*return: 28~31
			*/
			case 't':
				result=_getMonthDaysNumber(dateTime.getMonth()+1,dateTime.getFullYear());
			break;
			
			/**---------------------year--------------------------*/
			/**
			*get the year is a leap year or not()
			*return: 0(false) or 1(true)
			*/
			case 'L':
				result=_checkLeapYear(dateTime.getFullYear())?1:0;
			break;
			
			/**parameter 'o' in php is ignored in this javascript function*/
			
			/**
			*get the full name of the year
			*return: eg. 1999, 2003
			*/
			case 'Y':
				result=dateTime.getFullYear();
			break;
			
			/**
			*get name of year in two characters
			*return: eg.99 or 03
			*/
			case 'y':
				result=dateTime.getFullYear().toString().substr(-2);
			break;
			
			/**---------------------time--------------------------*/
			/**
			*get morning or afternoon in lowercase mode
			*return: am or pm
			*/
			case 'a':
				result=dateTime.getHours()>11?'pm':'am';
			break;
			
			/**
			*get morning or afternonn in uppercase mode
			*return: AM or PM
			*/
			case 'A':
				result=dateTime.getHours()>11?'PM':'AM';
			break;
			
			/**parameter 'B' in php is ignored in this javascript function*/
			
			/**
			*get hour without prefix character '0' in 12 hours mode
			*return: 1~12
			*/
			case 'g':
				var h=dateTime.getHours();
				result=h!==0?h%12:12;
			break;
			
			/**
			*get hour without prefix character '0' in 24 hours mode
			*return: 0~23
			*/
			case 'G':
				result=dateTime.getHours();
			break;
			
			/**
			*get hour with prefix character '0' in 12 hours mode
			*return: 01~12
			*/
			case 'h':
				result=_formatPrefix(jsDate.date('g',dateTime));
			break;
			
			/**
			*get hour with prefix character '0' in 24 hours mode
			*return: 00~23
			*/
			case 'H':
				result=_formatPrefix(dateTime.getHours());
			break;
			
			/**
			*get minutes with prefix character '0'
			*return: 00~59
			*/
			case 'i':
				result=_formatPrefix(dateTime.getMinutes());
			break;
			
			/**
			*get seconds with prefix character '0'
			*return: 00~59
			*/
			case 's':
				result=_formatPrefix(dateTime.getSeconds());
			break;
			
			/**---------------------time zone--------------------------*/
			/**
			*get time zone signature of date time
			*return: UTC,GMT...
			*parameter 'e' in php is ignored in this javascript function
			*/
			
			/**
			*get the date time is Daylight Saving Time(DST) or not
			*return: 0(false) or 1(true)
			*/
			case 'I':
				var start=new Date(dateTime.getTime());
				start.setMonth(0);
				start.setDate(1);
				start.setSeconds(0);
				start.setMinutes(0);
				start.setHours(0);
				var middle=new Date(start.getTime());
				middle.setMonth(6);
				result=middle.getTimezoneOffset()===start.getTimezoneOffset()?0:1;
			break;
			
			/**
			*get time zone of local time
			*return: EST,MDT...
			*parameter 'T' in php is ignored in this javascript function
			*/
			
			/**
			*get hours offset between date time with the Greenwich standard time
			*return: eg.+0200
			*/
			case 'O':
				result=dateTime.toString().replace(/^.+GMT/,'');
			break;
			
			/**---------------------full date time--------------------------*/
			/**
			*get date time formatted in ISO 8601
			*return: eg. 2004-02-12T15:19:21+00:00
			*/
			case 'c':
				var y=dateTime.getFullYear(),
					m=_formatPrefix(dateTime.getMonth()+1);
					d=_formatPrefix(dateTime.getDate());
					h=_formatPrefix(dateTime.getHours());
					i=_formatPrefix(dateTime.getMinutes());
					s=_formatPrefix(dateTime.getSeconds());
					tz=jsDate.date('O',dateTime);
				result=y+'-'+m+'-'+d+'T'+h+':'+i+':'+s+tz.substr(0,3)+':'+tz.substr(-2);
			break;
			
			/**
			*get date time formatted in RFC 822
			*return: eg. Thu,21 Dec 2000 16:01:07 +0200
			*/
			case 'r':
				var offset=dateTime.getTimezoneOffset();
				var t=new Date(dateTime.getTime()-offset*60*1000);
				var GMTStr=t.toGMTString().replace('GMT','');
				result=GMTStr+jsDate.date('O',dateTime);
			break;
			
			/**
			*get seconds from 1970-01-01 00:00:00 GMT
			*return: eg.1335412033
			*/
			case 'U':
				result=Math.round(dateTime.getTime()/1000);
			break;
			
			default:
				result=format;
			break;
		}
		
		return result;
	}
	
	/**get horoscopes*/
	function _getHoroscope(dateTime,english){
		var horoscopes={
				'水瓶座/Aquarius':[120,218],
				'双鱼座/Pisces':[219,320],
				'白羊座/Aries':[321,419],
				'金牛座/Taurus':[420,5.20],
				'双子座/Gemini':[521,621],
				'巨蟹座/Cancer':[622,722],
				'狮子座/Leo':[723,822],
				'处女座/Virgo':[823,922],
				'天秤座/Libra':[923,1023],
				'天蝎座/Scorpius':[1024, 1122],
				'射手座/Sagittarius':[1123,1221],
				'摩羯座/Capricornus':[1222,119]
			},
			currentHoroscope=[],
			currentDateNumber=(dateTime.getMonth()+1)*100+dateTime.getDate(),
			result='';
				
		for(var key in horoscopes){
			currentHoroscope=horoscopes[key];
			if(currentHoroscope[0]<currentHoroscope[1]){
				if(currentDateNumber>=currentHoroscope[0]&&currentDateNumber<=currentHoroscope[1]){
					result=key;
				}
			}else{
				if(currentDateNumber>=currentHoroscope[0]||currentDateNumber<=currentHoroscope[1]){
					result=key;
				}
			}
		}
		
		result=result.split('/');
		if(english){
			return result[1];
		}else{
			return result[0];
		}
	}
	
	/**
	*_formatPrefix(number, [prefix], [method] )
	*@parameter number: String or Number to be formatted
	*@parameter prefix: String or Number to add to number as prefix, this parameter is optional, if not provide, default value is '0'.
	*@parameter method: String['add','remove'] method to be used for format, this parameter is optional, if not provide, default value is 'add'.
	*return: string formatted
	*eg. 1==>'01', 12==>'12'
	*/
	function _formatPrefix(number,prefix,method){
		if(typeof number==='undefined'||(number.constructor!==Number&&number.constructor!==String)){
			return number;
		}
		if(typeof prefix==='undefined'||(prefix.constructor!==Number&&prefix.constructor!==String)){
			prefix='0';
		}
		if(typeof method==='undefined'||method.constructor!==String){
			method='add';
		}
		
		prefix=prefix.toString();
		method=method.toString();
		number=number.toString();
		var n,result=number;
		if(method==='add'){
			if(prefix==='0'){
				n=parseInt(number,10);
				result=n>9?n.toString():prefix+n.toString();
			}else{
				result=prefix+number;
			}
		}else if(method==='remove'){
			if(prefix==='0'){
				result=parseInt(number,10);
			}else{
				result=number.replace(new RegExp('^'+prefix),'');
			}
		}
		return result;
	}
	
	/**check leap year
	*_checkLeapYear(year);
	*@parameter year: full year name
	*return: true or false
	*/
	function _checkLeapYear(year){
		if(typeof year==='undefined'||(year.constructor!==Number&&year.constructor!==String)){
			return false;
		}
		year=parseInt(year,10);
		return year%100===0&&year%400===0?true:year%4===0;
	}
	
	/**get days of the month
	*_getMonthDaysNumber(month, year);
	*@parameter month: month
	*@parameter year: year
	*/
	function _getMonthDaysNumber(month,year){
		var days=[31,28,31,30,31,30,31,31,30,31,30,31];
		if(typeof month==='undefined'||(month.constructor!==Number&&month.constructor!==String)){
			return 0;
		}
		if(typeof year==='undefined'||(year.constructor!==Number&&year.constructor!==String)){
			return 0;
		}
		month=parseInt(month,10);
		year=parseInt(year,10);
		return month!==2?days[month-1]:(_checkLeapYear(year)?29:28);
	}
})();