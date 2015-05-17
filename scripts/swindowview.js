'use strict';

function SWindowView(name) {
	var _name = name;
	var _divId = '#' + name;
	var _listeners = [];
	
	var _updatableProperties = {
		content : { value : '', hasChanged : false, updater : contentUpdater },
		top : { value : 0, hasChanged : false, updater : modelUpdaterInterface },
		left : { value : 0, hasChanged : false, updater : modelUpdaterInterface },
		width : { value : '100%', hasChanged : false, updater : modelUpdaterInterface },
		height : { value : '100%', hasChanged : false, updater : modelUpdaterInterface },
		zIndex : { value : 1, hasChanged : false, updater : modelUpdaterInterface },
	};
	
	return {
		name : function() {
			return _name;
		},
		
		divId : function() {
			return _divId;	
		},
		
		observers : function() {
			return _listeners;
		},
		
		updatableProperties : function() {
			return _updatableProperties;
		},
		
		content : function() {
			return _updatableProperties.content.value;
		},
		
		top : function() {
			return _updatableProperties.top.value;
		},
		
		left : function() {
			return _updatableProperties.left.value;
		},
		
		width : function() {
			return _updatableProperties.width.value;
		},
		
		height : function() {
			return _updatableProperties.height.value;
		},
		
		zIndex : function() {
			return _updatableProperties.zIndex.value;
		},
		
		addListener : function(observer) {
			_listeners.push(observer);
		},
		
		clearListeners : function() {
			_listeners = [];
		},

		notifyListeners : function(modelUpdater) {
			var i;
			for (i in _listeners) {
				_listeners[i].notify(this, modelUpdater); 
			}
		},
		
		setZIndex : function(zindex) {
			_updatableProperties.zIndex.value = zindex;
		},
		
		bringWindowToFront : function(event) {
			this.notifyListeners(bringToFrontUpdater());
		},
	}
}

function modelUpdaterInterface() {
	return {
		update : function(model, view, controller) {
			// do some updating
		}
	}
}

function contentUpdater() {
	return {
		update : function(model, view, controller) {
			model.content = view.content;
		}
	}
}

function bringToFrontUpdater() {
	return {
		update : function(model, view, controller) {
			var i;
			var currentModel;
			var currentView;
			
			var frontIndex = 3; // TODO should be controller.getFrontIndex()
			var allWindowNames = controller.getAllWindowNames();
			for(i in allWindowNames) {
				currentModel = controller.getModelByName(allWindowNames[i]);
				currentView = controller.getViewByName(allWindowNames[i]);
				if (currentModel === model) {
					$(view.divId()).css('z-index',frontIndex); 
				} else {
					$(view.divId()).css('z-index',0);
				}
			}
		}
	}
}