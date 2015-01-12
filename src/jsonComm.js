/** JsonComm comments remover in JSON-like structures. Prod version */
(function(global){


/** @constructor */
var JsonComm = function(){
	var ss = '"(?:\\\\"|[^\\r\\n"])*"' //string in quotes
		,sCom = '(?:(?:\\s*(?:\\/\\/|#)[^\\r\\n]*(\\r?\\n|$))*'
				+'(?:\\s*\\/\\*\\*\\/|\\s*\\/\\*(?:[\\s\\S]?(?!\\*\\/))+.{3})*'
			+')*' //comments separated by spaces
		,f = function(sCom){
			var val = sCom +'(\\s*(?:[0-9.eE+-]+|true|false|null|'+ ss +'|(?!:\\{|:\\[))\\s*)';
			return RegExp('(?:'
				+'((?:\\{|,)\\s*)' //$1
				+ sCom +'(\\s*'+ ss +'\\s*)' //$2,3(key) | 2,[3],4(key)
				+ sCom +'(\\s*:\\s*)' //$4,5 | 5,[6],7
				+ val //$6,7 | 8,[9],10
				+ sCom +'(\\s*(?:\\}|(?!,))\\s*)?' //$8,9 | 11,[12],13
			+')+?|(?:'
				+'((?:\\[|,)\\s*)' //$10 | 14
				+ val //$11,12 | 15,[16],17
				+ sCom +'(\\s*(?:\\]|(?!,))\\s*)?' //$13,14 | 18,[19],20
			+')+?|'
				+ sCom +'\\s*' //$15; comments before and after | 21,[22]
			,'g')};
	this._r = f(sCom);
	this._rC = f(sCom.replace('(?:[\\s\\S]?(?!\\*\\/))+.{3}','((?:[\\s\\S]?(?!\\*\\/))+.).{2}') );
	this._rCh = f(sCom.replace(/^\(\?:/,'((?:').replace(/\)\*$/,')*)').replace('(\\r?\\n|$)','\\r?\\n|$') );
};
JsonComm.prototype ={
	unComment: function(jC){ //remove comments but not any syntax analysis for JSON
		return jC.replace(this._r, '$1$2$3$4$5$6$7$8$9$10$11$12$13$14');
	},
	comm2json: function(jC){ //add keyName# keys with comments before keys with comments
		var th = this;
		return jC.replace(this._rC, function(s0){
			var s = '', a = arguments
				,ii = [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 17, 20];
			for(var i in ii)
				a[ii[i]] && (s += a[ii[i]]);
			if(a[4] && (a[2] || a[3] || a[5] || a[6] || a[8] || a[9] || a[11] || a[12]))
				s = s.replace(/("\s*:).*/, '#$1'
					+ th._quotEsc(s0.replace(RegExp('^.|\\s*'+ a[4].replace(/\\/g,'\\\\') +'\\s*:'
							+(a[10] && '|\\s*'+ a[10] +'\\s*') +'|\\s*$', 'g'),''))
						.replace(/\}$/,''))
					+ ((s0.match(/\r?(\n\s*)/) ||[])[0] ||'')
					+ s.replace(/^\{/, ',');
			return s;
		});
	},
	change: function(jC, h){ //change key-values (by keys) from h object in string s
		h = h ||{};
		var th = this
			,h2 ={};
		for(var key in h)
			h2[this._quotEsc(key)] = h[key];
		return jC.replace(this._rCh, function(s0){
			var a = arguments, i, aL;
			if(a[3] && (a[7] || a[7]==='')){ //pair is found
				var h2key = h2[a[3].replace(/^\s*("(?:\\"|[^\r\n"])*")\s*/,'$1')];
				if(h2key !=null){
					if(typeof h2key == 'object' && Object.keys && Object.keys(h2key)){
						var newKey = Object.keys(h2key)[0];
						a[3] = a[3].match(/^(\s*)/)[0] + th._quotEsc(newKey) + a[3].match(/(\s*)$/)[0];
					}
					if(a[7] && a[7] !==''){
						var newVal = typeof h2key !='object' ? h2key
							: newKey !=null && h2key[newKey];
						a[7] = a[7].match(/^(\s*)/)[0]
							+ (typeof newVal =='string'? th._quotEsc(newVal) : newVal) + a[7].match(/(\s*)$/)[0];
					}
					for(s0 ='', i = 1, aL = a.length -2; i < aL; i++)
						s0 += a[i] ||'';
				}}
			return s0;
		});
	},
	_quotEsc: function(s){ //prepare string for overquotting
		return '"'+ s.replace(/"/g,'\\"').replace(/\\(?!")/g,'\\\\')
			.replace(/\r?\n/g,'\\n').replace(/\t/g,'\\t') +'"';
	},
	fromYaml: function(s){ //with exceptions on errors
		;//TODO for free contribution
	},
	fromXml: function(s){ //with exceptions on errors
		;//TODO you may contribute
	},
	toYaml: function(s){ //with exceptions on errors
		;//TODO
	},
	toXml: function(s){ //with exceptions on errors
		;//TODO
	},
	to: function(h){ //hash to jsonComm
		//TODO
		return '--xxx === (you may contribute conversion to jsonComm data) === xxx--';
	}
};
global['jsonComm'] = new JsonComm();


})((function(){return this})());
