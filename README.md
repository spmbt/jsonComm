## JSON with comments and change values

***jsonComm format of data*** is multiline string format like JSON or YAML but it have single line and multiline comments.

***jsonComm object*** contains methods for 

* convert data to JSON string without comments
* convert to JSON with comments added before associated key-value pairs
* change of values of unique keys
* convert jsonComm string from/to Yaml or XML.

[Screenshots of test]((http://spmbt.github.io/jsonComm/); [test page]((http://spmbt.github.io/jsonComm/TEST/jsonCommTest.js).

### Examples

jsonComm adds javascript style comments to pure JSON and presents functions for converting to JSON and change any values in jsonComm file.

```javascript
//<multiline string of jsonComm file>
var jComm = '//first line\n\
\n\
	{"aaa": "qwerty",//00\n\
	"bbb": 1234 //comment (not pure JSON syntax)\n\
	,"ccc": true # alternative comment style\n\
	,"dd\\"d":/*multiline\\" comm\\ent*/ /*comm2\\*/null,\n\
	"ee//e": "example of any symbols in key including inactive comments",\n\
	"multiline1"/*: 1, //- example of multiline comments\n\
	"multiline2": 2,\n\
	"multiline3":= 1234,*/:[36.8,false/*,34*/,\n\
		"/**/",[1,2,3,4,[//56789\n\
		5,6,[[/*0*/7,{"x":/*xx*/"x"}],8]],{}]  ],\n\
	"mayBeAnyStructure":{"a":1/**/,"b":2},\n\
"lineEnd\\\\":"end"\n\
}//after json\n  \n /*2*/  ';

	//NOTE for this string: any single backslash will be incorrect example
	//  because it will be shielding symbol for next and have sense
	//  for "\n" or as trailing symbol for this multiline notation
```

Test this string in browser: [jsonCommTest.js](http://spmbt.github.io/jsonComm/TEST/jsonCommTest.js]) (results will be printed in console).

### Using of jsonComm functions

```javascript
var jsonWoComm = jsonComm.unComment(jComm), //returns JSON string (not guarantees)
	jsonWithComm = jsonComm.comm2json(jComm)
	,jsonString = JSON.stringify(JSON.parse(jsonWoComm))
	
	//to JSON with key-value comments
	//..."bbb#": "comment (not pure JSON syntax)",
	//  "bbb": 1234, ...
	,jsonCommChecked = JSON.stringify(JSON.parse(jsObjWithComm))
	
	//direct convert to YAML (TODO)
	,yamlStringDirect = jsonComm.toYaml(jComm)
	
	//direct convert to XML (TODO)
	,xmlStringDirect = jsonComm.toXml(jComm)
	
	//change any value of unique key in JSON format (from begin of line)
	,jCommChanged = jsonComm.change(jComm, {multiline1: 'newValue'})
	//returns string with saving of all comments and other non-JSON elements
	// with change of value of key in second argument
	
	//group change
	,jCommChanged2 = jsonComm.change(jComm, {multiline1:'newValue', ccc: false});
	
	//to jsonComm (TODO)
	jsObjWithComm['aaa#'] = 'new comment of "aaa" key';
	var jCommNew3 = jsonComm.to(jsObjWithComm);
	//it converts all keys with "#" at ends and which have pairs to lines with comments
```

#### Simple conversion in JSON w/o jsonComm object (< 1Kbytes)

```javascript
jComm.replace(/(?:(?:((?:\{|,)\s*)(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*(\s*"(?:\\"|[^\r\n"])*"\s*)(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*(\s*:\s*)(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*(\s*(?:[0-9.eE+-]+|true|false|null|"(?:\\"|[^\r\n"])*"|(?!:\{|:\[))\s*)(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*(\s*(?:\}|(?!,))\s*)?)+?|(?:((?:\[|,)\s*)(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*(\s*(?:[0-9.eE+-]+|true|false|null|"(?:\\"|[^\r\n"])*"|(?!:\{|:\[))\s*)(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*(\s*(?:\]|(?!,))\s*)?)+?|(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*\s*)/g,'$1$2$3$4$5$6$7$8$9$10$11$12$13$14');
```
	

### Exceptions

errorParse - (TODO) exception of parse error of jComm string to some format.

	jsonComm.on('errorParse', function(){console.error('errorParse')}

## How to use it in NodeJS (Gruntfile.js etc...)

```javascript
var configFile = fs.readFileSync('config/config.js').toString('utf-8');
config = JSON.parse(configFile.replace(/(?:(?:((?:\{|,)\s*)(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*(\s*"(?:\\"|[^\r\n"])*"\s*)(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*(\s*:\s*)(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*(\s*(?:[0-9.eE+-]+|true|false|null|"(?:\\"|[^\r\n"])*"|(?!:\{|:\[))\s*)(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*(\s*(?:\}|(?!,))\s*)?)+?|(?:((?:\[|,)\s*)(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*(\s*(?:[0-9.eE+-]+|true|false|null|"(?:\\"|[^\r\n"])*"|(?!:\{|:\[))\s*)(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*(\s*(?:\]|(?!,))\s*)?)+?|(?:(?:\s*(?:\/\/|#)[^\r\n]*(\r?\n|$))*(?:\s*\/\*\*\/|\s*\/\*(?:[\s\S]?(?!\*\/))+.{3})*)*\s*)/g,'$1$2$3$4$5$6$7$8$9$10$11$12$13$14') );
//... use config object if not need to change file config.js.
```

If it need to change, use 2 functions, .unComment and .change in jsonComm object.

```javascript
config = JSON.parse(jsonComm.unComment(fs.readFileSync('config/config.json',{encoding:'utf-8'})));
//... calc changes ...
var changes = {version: newVersion}; //for example
fs.writeFileSync('config/config.js', jsonComm.change(config, changes));
```

### \*You may contribute *todos* and new parts of jsonComm lib\*

(subj)

### Publications

* [Commentable JSON](http://habrahabr.ru/post/247473/) (ru), 2015-01-08.