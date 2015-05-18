'use strict';

$(document).ready(function() {
	// QQQ Temp way for keeping a list of the windows to generate
	var windowNames = ['content-item1', 'content-item2', 'content-item3'];
	var controller = SWindowController(windowNames);
	controller.populateAllWindows();
	
	$('.content-window').on('click', function(event) {
		var currentView;
		
		console.log('event.target id is ' + event.target.id); 
		currentView = controller.getViewByName(event.target.id);
		currentView.bringWindowToFront();
	});
});