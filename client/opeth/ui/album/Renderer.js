goog.provide('opeth.ui.album.Renderer');

goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
opeth.ui.album.Renderer = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(opeth.ui.album.Renderer, goog.ui.Component);

/**
 * @override
 */
opeth.ui.album.Renderer.prototype.createDom = function() {
    this.decorateInternal(this.getDomHelper().createDom(goog.dom.TagName.DIV));
};

/**
 * @override
 */
opeth.ui.album.Renderer.prototype.decorateInternal = function(element) {
    opeth.ui.album.Renderer.superClass_.decorateInternal.call(this, element);
    goog.dom.classlist.add(element, goog.getCssName("col-md-4"));
};

/**
 * @override
 */
opeth.ui.album.Renderer.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    console.log("Inside Album renderer");

    var heading_ = this.getDomHelper().createDom(goog.dom.TagName.H1);
    var headingText_ = this.getDomHelper().createTextNode("Albums");
    this.getDomHelper().appendChild(heading_, headingText_);
    this.getDomHelper().appendChild(element_, heading_);
};