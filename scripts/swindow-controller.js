'use strict';

function SWindowController(windowNames) {
	var _group = new SWindowGroup();
	
	var _makeModels = function () {
		var i;
		var windowName;
		var windowModel;
		
		for (i in windowNames) {
			windowName = windowNames[i];
			windowModel = SWindowModel(windowName);
			_group.addModel(windowName, windowModel);
		}
	};
	
	var _makeViews = function (controller) {
		var i;
		var windowName;
		var windowView;
		
		for (i in windowNames) {
			windowName = windowNames[i];
			windowView = SWindowView(windowName);
			_group.addView(windowName, windowView);
			windowView.addListener(controller);
		}
	};
	
	return {
		getAllWindowNames : function() {
			return _group.getAllWindowNames();
		},
		
		getModelByName : function(name) {
			return _group.getModelByName(name);
		},
		
		getViewByName : function(name) {
			return _group.getViewByName(name);
		},
		
		populateAllWindows : function() {
			_makeModels();
			_makeViews(this);
		},
		
		notify : function(view, updater) {
			var model = this.getModelByName(view.name());
			updater.update(model, view, this);
		},
	}
}

function SWindowGroup() {
	var _allWindows = {
		// windowName: {model: sWindowModel, view: sWindowView},
		// windowName: {model: sWindowModel, view: sWindowView},
		// etc
	};
	return {
		getAllWindowNames : function() {
			var i;
			var windowNames = [];
			
			for(i in _allWindows) {
				windowNames.push(_allWindows[i].model.name());
			}
			return windowNames;
		},
		
		getModelByName : function(name) {
			return _allWindows[name].model;
		},
		
		getViewByName : function(name) {
			return _allWindows[name].view;
		},
		
		addModel : function(name, model) {
			if (_allWindows[name]) {
				_allWindows[name].model = model;
			} else {
				_allWindows[name] = {'model': model};
			}
		},
		
		addView : function(name, view) {
			if (_allWindows[name]) {
				_allWindows[name].view = view;
			} else {
				_allWindows[name] = {'view': view};
			}
		},
	}
};