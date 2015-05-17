'use strict';


/*
Concept here is to have Model View Contoller setup, but also using the Observer pattern

The SWindowView can register and notify an observer.
The observer will be the SWindowController.
When the SWindowView is changed it notifies the Controller
...and sends it the appropriate updater, based on the modelUpdaterInterface.
In this way the Controller doesn't need to know what has been updated or how to update it
because the updater will update the correct property of the Model.
*/

var SWindowController = (function() {
	var _group = new SWindowGroup();
	
	var _makeModels = function (windowNames) {
		var i;
		var windowName;
		var windowModel;
		
		for (i in windowNames) {
			windowName = windowNames[i];
			windowModel = SWindowModel(windowName);
			_group.addModel(windowName, windowModel);
		}
	};
	
	var _makeViews = function (windownNames,controller) {
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
		
		populateAllWindows : function(windowNames) {
			_makeModels(windowNames);
			_makeViews(windowNames, this);
		},
		
		notify : function(view, updater) {
			var model = this.getModelByName(view.name());
			updater.update(model, view, this);
		},
	}
})();

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

// QQQ Temp way for keeping a list of the windows to generate
var windowNames = ['content-item1', 'content-item2', 'content-item3'];

// QQQQQQQQQ mid way through making the SWindowGroup & SWindowController

$(document).ready(function() {
	// var allWindowNames;
	SWindowController.populateAllWindows(windowNames);
	// allWindowNames = SWindowController.getWindowNames();
	//
	// $('.content-window').click( function(event) {
	// 	console.log('event.target id is ' + event.target.id); 
	// 	var i;
	// 	var model;
	// 	var view;
	//	
	// 	for(i in allWindowNames) {
	// 		model = SWindowController.getModelByName(allWindowNames[i]);
	// 		view = SWindowController.getViewByName(allWindowNames[i]);
	// 		if (model.name() === event.target.id) {
	// 			$(view.divId()).css('z-index',3);
	// 		} else {
	// 			$(view.divId()).css('z-index',1);
	// 		}
	// 	}
	// });
	
	$('.content-window').click( function(event) {
		var currentView;
		
		console.log('event.target id is ' + event.target.id); 
		currentView = SWindowController.getViewByName(event.target.id);
		currentView.bringWindowToFront();
		
	});
});