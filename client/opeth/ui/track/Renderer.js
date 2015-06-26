goog.provide('opeth.ui.track.Renderer');

goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
opeth.ui.track.Renderer = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(opeth.ui.track.Renderer, goog.ui.Component);

/**
 * @override
 */
opeth.ui.track.Renderer.prototype.createDom = function() {
    this.decorateInternal(this.getDomHelper().createDom(goog.dom.TagName.DIV));
};

/**
 * @override
 */
opeth.ui.track.Renderer.prototype.decorateInternal = function(element) {
    opeth.ui.track.Renderer.superClass_.decorateInternal.call(this, element);
    goog.dom.classlist.add(element, goog.getCssName("col-md-4"));
};

/**
 * @override
 */
opeth.ui.track.Renderer.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    console.log("Inside Track renderer");

    var heading_ = this.getDomHelper().createDom(goog.dom.TagName.H1);
    var headingText_ = this.getDomHelper().createTextNode("Tracks");
    this.getDomHelper().appendChild(heading_, headingText_);
    this.getDomHelper().appendChild(element_, heading_);
};