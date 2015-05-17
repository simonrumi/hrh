/*global describe, it */
'use strict';

(function () {
    // from http://eclipsesource.com/blogs/2014/03/27/mocks-in-jasmine-tests/
    var mock = function (contructor, name) {
        var keys = [];
        var key;
        var spyObj = {};
        for (key in contructor.prototype) {
            keys.push(key);
        }
        if (keys.length > 0) {
            spyObj = jasmine.createSpyObj(name || 'mock', keys)
        }
        return spyObj;
    }
    // example
    //var element = mock($);
    
    var createTestFixture = function() {
         $('body').append('<div id="testingElements">'
            +'<div id="menu">'
                +'<div class="menu-item" id="menu-item1">item 1</div>'
                +'<div class="menu-item" id="menu-item2">item 2</div>'
                +'<div class="menu-item" id="menu-item3">item 3</div>'
            +'</div>'
            +'<div class="content-window" id="content-item1">content for item 1</div>'
            +'<div class="content-window" id="content-item2">content for item 2</div>'
            +'<div class="content-window" id="content-item3">content for item 3</div>'
            +'</div>');
    }
    
    var removeTestFixture = function() {
        $('#testingElements').remove();
    }
    
    describe('Testing SWindowModel', function() {
        var model = SWindowModel('testModel');
        
        it('should have the correct name attribute', function () {
            expect(model.name()).toBe('testModel');
        });
        
        it('should be able to set & get the content', function () {
            model.content('Test Content');
            expect(model.content()).toBe('Test Content');
        });
    });
    
    describe('Testing SWindowView', function() {
    	
        var view = SWindowView('testWindow');
    	
    	var observerObj = {
            isNotified : false, 
    		notify : function (modelUpdater) {
    			this.isNotified = true;
    		}
    	}
        
        it('should set the default properties', function () {
        	var i;
        	var j;
        	var propertyObj;
        	
        	expect(view.name()).toBe('testWindow');
        	expect(view.divId()).toBe('#testWindow');
            expect(view.observers()).toEqual(new Array());
        	expect(view.updatableProperties()).toBeDefined();
        	for (i in view.updatableProperties()) {
        		propertyObj = view.updatableProperties[i];
        		for (j in propertyObj) {
        			expect(propertyObj[j]).toBeDefined();
        		}
        	}
            expect(view.content()).toBeDefined();
            expect(view.top()).toEqual(0);
            expect(view.left()).toEqual(0);
            expect(view.width()).toEqual('100%');
            expect(view.height()).toEqual('100%');
            expect(view.zIndex()).toEqual(1);
        });
        
        it('should be able to register a listener', function () {
        	view.addListener(observerObj);
        	expect(view.observers().length).toEqual(1);
        });
        
        it('should be able to notify a listener', function () {
        	view.notifyListeners(contentUpdater);
            expect(observerObj.isNotified).toBe(true);
        });
        
        it('should be able to clear all listeners', function () {
            view.clearListeners();
            expect(view.observers.length).toEqual(0);
        });
        
        it('should be able to set the z-index of an element', function () {
            view.setZIndex(3);
            expect(view.zIndex()).toEqual(3);
        });
        
        describe('Testing SWindowView handling DOM events', function() {
            var spyEvent;
            
            beforeEach(function() {
                createTestFixture();
            });
        
            it('should invoke sWindowClick()', function() {
                spyOn($('.content-window'), 'click');
                $('#content-item2').trigger('click');
                
                expect(sWindowClick()).toHaveBeenCalled();
            });
            
            afterEach(function() {
                removeTestFixture();
            })
        });
        
        
    });

    describe('Testing SWindowController', function() {
        
        it('should populate all windows', function() {
            
            var windowNames = ['test-item1', 'test-item2', 'test-item3'];
            
            SWindowController.populateAllWindows(windowNames);
            var allWindowNames = SWindowController.getWindowNames();
            
            expect(SWindowController.getModelByName('test-item1')).toBeDefined();
            expect(SWindowController.getModelByName('test-item2')).toBeDefined();
            expect(SWindowController.getModelByName('test-item3')).toBeDefined();
        });
    });
})();
