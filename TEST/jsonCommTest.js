(function(w){
	//performance.now polyfill; usage: :window.perfNow()
	var perfNow = function(){return +new Date()};
	if(w['performance'])
		for(var perf in {now:1, webkitNow:2, msNow:3, mozNow:4, oNow:5})
			if(w['performance'][perf]){
				perfNow = function(){return w['performance'][perf]()};
				break;}
	//benchmark: {p: period [ms], f, context, arg0, arg1}
	w['bench'] = function(h){
		h = h ||{f:'eval'};
		h.context = h.context || w;
		if(typeof h.f =='string')
			h.f = h.context[h.f];
		h.p = h.p || 450; //check period [ms]
		h.out = h.f.call(h.context, h.arg0, h.arg1);
		h.out = h.f.call(h.context, h.arg0, h.arg1);
		var t = perfNow()
			,cnt =0;
		while((h.t = perfNow() - t) < h.p){
			h.out = h.f.call(h.context, h.arg0, h.arg1);
			cnt++;
		}
		h.mark = h.t / cnt;
		h.markU = h.mark *1000|0;
		h.count = cnt;
		return h; // {out: value, mark, markU: in mks, count: times}
	};
})((function(){return this})());

//=======================================================
var jComm = '//first line\n\
\n\
	{"aaa": "qwerty",//00\n\
	"bbb": 1234 //comment (not pure JSON syntax)\n\
	,"ccc": true # alternative comment style\n\
	,"dd\\"d":/*multiline\\" comm\\ent*/ /*comm2\\*/null,\n\
	"ee//e": "example of any symbols in key including inactive comments",\n\
	"jsonComm":/*is*/"data format",/*which contains*///comments\n\
	"multiline1" /*: 1, //- example of multiline comments\n\
	"multiline2": 2,\n\
	"multiline3":= 1234,*/ :[36.8,false/*,34*/,\n\
		"/**/",[1,2,3,4,[//56789\n\
		5,6,[[/*0*/7,{"x":/*xx*/"x"}],8]],{}]  ],\n\
	"mayBeAnyStructure":{"a":1/**/,"b":2},\n\
 "lineEnd\\\\" \n\
 :"end"\n\
}//after json\n  \n /*2*/  ';

	//NOTE for this string: any single backslash will be incorrect example
	//  because it will be shielding symbol for next and have sense
	//  for "\n" or as trailing symbol for this multiline notation

var jsonWoComm = bench({context: jsonComm, f:'unComment', arg0: jComm}) //returns JSON string (not guarantees)

,jsonWithComm = bench({context: jsonComm, f:'comm2json', arg0: jComm})

,jsonString = JSON.stringify(JSON.parse(jsonWoComm.out))

//to JSON with key-value comments
//..."bbb#": "comment (not pure JSON syntax)",
//  "bbb": 1234, ...
,jsObjWithComm = JSON.parse(jsonWithComm.out)
,jsonCommChecked = JSON.stringify(jsObjWithComm)

//direct convert to YAML
,yamlStringDirect = jsonComm.toYaml && jsonComm.toYaml(jComm)

//direct convert to XML
,xmlStringDirect = jsonComm.toXml && jsonComm.toXml(jComm)

//change any value of unique key in JSON format (from begin of line)
,jCommChanges = { //list of changes
	aaa:'changed value \\"'
	,bbb: -1.94E38
	,multiline1: {newKey:'newValue'}
	,ccc: false
	,'lineEnd\\':{newLineEnd:'new end'}
	,x:639
}
,jCommChanged = bench({context: jsonComm, f:'change', arg0: jComm, arg1: jCommChanges});
//returns string with saving of all comments and other non-JSON elements
// with change of value of key in second argument

//to jsonComm
jsObjWithComm['aaa#'] = 'new comment of "aaa" key';
var jCommNew = jsonComm.to && jsonComm.to(jsObjWithComm);
//it converts all keys with "#" at ends and which have pairs to lines with comments

