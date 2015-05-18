'use strict';

// <div id="testingElements">
// 	<div id="menu">
// 		<div class="menu-item" id="menu-item1">item 1</div>
// 		<div class="menu-item" id="menu-item2">item 2</div>
// 		<div class="menu-item" id="menu-item3">item 3</div>
// 	</div>
// 	<div class="content-window" id="content-item1">content for item 1</div>
// 	<div class="content-window" id="content-item2">content for item 2</div>
// 	<div class="content-window" id="content-item3">content for item 3</div>
// </div>


var createTestFixture = function(windowNames) {
    var i;
    $('body').append('<div id="testingElements"></div>');
    for (i in windowNames) {
    	$('#testingElements').append('<div class="content-window" id="' + windowNames[i] + '">content for item ' + i + '</div>');
    }
}

var createTestEnvironment = function(windowNames) {
	var testController = SWindowController(windowNames);
	testController.populateAllWindows();
	return testController;
}

var removeTestFixture = function() {
    $('#testingElements').remove();
}