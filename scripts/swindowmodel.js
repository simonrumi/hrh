'use strict';

function SWindowModel(name) {
	var _name = name;
	var _content = '';
	
	return {
		name : function () {
			return _name
		},
		
		content : function (newContent) {
			if (newContent) {
				_content = newContent;
			} else {
				return _content
			}
		},	
	}
}