## JSON with comments and with change values

jsonComm format of data is multiline string format like JSON or YAML but but it have single line and multiline comments. jsonComm object have methods for 

### Examples

jsonComm adds javascript style comments to pure JSON and presents functions for converting to JSON and change any values in jsonComm file.

	//<multiline string of jsonComm file>
	var jComm = '{\
		"aaa": "qwerty",\
		"bbb": 1234 //comment (not pure JSON syntax)\
		,"ccc": true # alternative comment style\
		,"ddd":/*multiline comment*/ null,\
		"ee//e": "example of any symbols in key including inactive comments",\
		"multiline1"/*: 1, - example of multiline comments\
		"multiline2": 2,\
		"multiline3": 3*/ 1,\
		"mayBeAnyStructure":{"a":1,/**/"b":2}
		"lineEnd":"end"\
	}';

### Using of jsonComm functions

	var jsObjWoComm = jsonComm.parse(jComm), //returns JS object (structure)
		jsObjWithComm = jsonComm.parseComm(jComm)
		,jsonString = JSON.stringify(jsObjWoComm)

		//to JSON with key-value comments
		//..."bbb#": "comment (not pure JSON syntax)",
		//  "bbb": 1234, ...
		,jsonStringWithComments = JSON.stringify(jsObjWithComm)
		
		//direct convert to JSON
		,jsonStringDirect = jsonComm.toJson(jComm)
		
		//direct convert to YAML
		,yamlStringDirect = jsonComm.toYaml(jComm)
		
		//direct convert to XML
		,xmlStringDirect = jsonComm.toXml(jComm)

		//change any value of unique key in JSON format (from begin of line)
		,jCommNew = jsonComm.change(jComm, 'multiline1', 'newValue')
		//returns string with saving of all comments and other non-JSON elements
		// with change of value of key in second argument
		
		//group change
		,jCommNew2 = jsonComm.change(jComm, {multiline1:'newValue', ccc: false});
		
		//to jsonComm
		jsObjWithComm['aaa#'] = 'new comment of "aaa" key';
		var jCommNew3 = jsonComm.to(jsObjWithComm);
		//it converts all keys with "#" at ends and which have pairs to lines with comments

### Exceptions

errorParse - exception of parse error of jComm string to some format.

	jsonComm.on('errorParse', function(){console.error('errorParse')}
