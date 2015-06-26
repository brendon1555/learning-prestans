/**
 * Copyright 2014, Anomaly Software
 */
goog.provide('opeth.ui.Renderer');

goog.require('goog.dom.classlist');
goog.require('goog.ui.Component');

goog.require('opeth.ui.band.Renderer');
goog.require('opeth.ui.album.Renderer');
goog.require('opeth.ui.track.Renderer');

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

    console.log(element_);

    var rowDiv_ = this.getDomHelper().createDom(goog.dom.TagName.DIV);
    goog.dom.classlist.add(rowDiv_, goog.getCssName("row"));

    this.getDomHelper().appendChild(element_, rowDiv_);

    var band_ = new opeth.ui.band.Renderer(this.getDomHelper());
    band_.render(rowDiv_);

    var album_ = new opeth.ui.album.Renderer(this.getDomHelper());
    album_.render(rowDiv_);

    var track_ = new opeth.ui.track.Renderer(this.getDomHelper());
    track_.render(rowDiv_);
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