/**
 * Copyright 2014, Anomaly Software
 */
goog.provide('opeth.ui.Renderer');

goog.require('goog.dom.classlist');
goog.require('goog.ui.Component');

goog.require('opeth');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @suppress {undefinedVars}
 */
opeth.ui.Renderer = function() {

};
goog.inherits(opeth.ui.Renderer, goog.ui.Component);

opeth.ui.Renderer.prototype.canDecorate = function() { 
    return true;
};

opeth.ui.Renderer.prototype.enterDocument = function() {

    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    console.log("i am here");

};


opeth.ui.Renderer.prototype.exitDocument = function() {
    goog.base(this, 'exitDocument');
};

/**
 * Start the application
 */
goog.events.listen(window, goog.events.EventType.LOAD, function(){
    
    var appUI_ = new opeth.ui.Renderer();

    goog.dom.removeChildren(document.body);
    appUI_.decorate(document.body);
});