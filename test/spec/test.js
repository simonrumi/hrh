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
        var testViewName = 'test-item1';
        
        describe('Testing basic properties', function() {  
            var view;
            
            beforeEach(function() {
                view = SWindowView(testViewName);
            });
            
            it('should set the default properties', function () {
                var i;
                var j;
                var propertyObj;
                
                expect(view.name()).toBe(testViewName);
                expect(view.divId()).toBe('#' + testViewName);
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
            
            it('should be able to set the z-index of an element', function () {
                view.setZIndex(3);
                expect(view.zIndex()).toEqual(3);
            });
        });
        
        describe('Testing listener', function() {  
            var view = SWindowView(testViewName);
            
            var observerObj = {
                isNotified : false, 
                notify : function (modelUpdater) {
                    this.isNotified = true;
                }
            }
                
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
        });
          
        describe('Testing SWindowView handling DOM events', function() {            
            var view;
            
            beforeEach(function() {
                var testController;
                var windowNames = [testViewName, 'test-item2', 'test-item3'];
                createTestFixture(windowNames);
                testController = createTestEnvironment(windowNames);
                view = testController.getViewByName(testViewName);
                
                $('#' + testViewName).on('click', function(event) {
                    //var currentView;
                    console.log('event.target id is ' + event.target.id); 
                    // view = testController.getViewByName(event.target.id);
                    view.bringWindowToFront();
                });
            });
        
            it('should invoke bringWindowToFront()', function() {
                spyOn(view, 'bringWindowToFront'); //.andCallThrough();
                $('#' + testViewName).trigger('click');
                
                expect(view.bringWindowToFront).toHaveBeenCalled();
            });
            
            afterEach(function() {
                removeTestFixture();
            });
        });
    });

    describe('Testing SWindowController', function() {
        var testController;
        
        beforeEach(function() {
            var windowNames = ['test-item1', 'test-item2', 'test-item3'];
            createTestFixture(windowNames);
            testController = createTestEnvironment(windowNames);
        });
        
        it('should populate all windows', function() {
            expect(testController.getModelByName('test-item1')).toBeDefined();
            expect(testController.getModelByName('test-item2')).toBeDefined();
            expect(testController.getModelByName('test-item3')).toBeDefined();
        });
        
        afterEach(function() {
            removeTestFixture();
        });
    });
})();
