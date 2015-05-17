'use strict';

function SWindowView(name) {
	var _name = name;
	var _divId = '#' + name;
	var _observers = [];
	
	var _updatableProperties = {
		content : { value : '', hasChanged : false, updater : contentUpdater },
		top : { value : 0, hasChanged : false, updater : modelUpdaterInterface },
		left : { value : 0, hasChanged : false, updater : modelUpdaterInterface },
		width : { value : '100%', hasChanged : false, updater : modelUpdaterInterface },
		height : { value : '100%', hasChanged : false, updater : modelUpdaterInterface },
		zIndex : { value : 1, hasChanged : false, updater : modelUpdaterInterface },
	};
	
	return {
		name : function () {
			return _name;
		},
		
		divId : function () {
			return _divId;	
		},
		
		observers : function () {
			return _observers;
		},
		
		updatableProperties : function () {
			return _updatableProperties;
		},
		
		content : function () {
			return _updatableProperties.content.value;
		},
		
		top : function () {
			return _updatableProperties.top.value;
		},
		
		left : function () {
			return _updatableProperties.left.value;
		},
		
		width : function () {
			return _updatableProperties.width.value;
		},
		
		height : function () {
			return _updatableProperties.height.value;
		},
		
		zIndex : function () {
			return _updatableProperties.zIndex.value;
		},
		
		addListener : function(observer) {
			_observers.push(observer);
		},
		
		clearListeners : function() {
			_observers = [];
		},

		notifyListeners : function (modelUpdater) {
			var i;
			for (i in _observers) {
				_observers[i].notify(this, modelUpdater); 
			}
		},
		
		setZIndex : function (zindex) {
			_updatableProperties.zIndex.value = zindex;
		},
	}
}

function modelUpdaterInterface() {
	return {
		update : function(model, newData) {
			// do some updating
		}
	}
}

function contentUpdater() {
	return {
		update : function(model, newData) {
			model.content = newData;
		}
	}
}