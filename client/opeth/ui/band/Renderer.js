goog.provide('opeth.ui.band.Renderer');

goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
opeth.ui.band.Renderer = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(opeth.ui.band.Renderer, goog.ui.Component);

/**
 * @override
 */
opeth.ui.band.Renderer.prototype.createDom = function() {
    this.decorateInternal(this.getDomHelper().createDom(goog.dom.TagName.DIV));
};

/**
 * @override
 */
opeth.ui.band.Renderer.prototype.decorateInternal = function(element) {
    opeth.ui.band.Renderer.superClass_.decorateInternal.call(this, element);
    goog.dom.classlist.add(element, goog.getCssName("col-md-4"));
};

/**
 * @override
 */
opeth.ui.band.Renderer.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    console.log("Inside Band renderer");

    var heading_ = this.getDomHelper().createDom(goog.dom.TagName.H1);
    var headingText_ = this.getDomHelper().createTextNode("Bands");
    this.getDomHelper().appendChild(heading_, headingText_);
    this.getDomHelper().appendChild(element_, heading_);

    var table_ = this.getDomHelper().createDom(goog.dom.TagName.TABLE);
    goog.dom.classlist.add(table_, goog.getCssName("table"));
    goog.dom.classlist.add(table_, goog.getCssName("table-hover"));
    var tableRow_ = this.getDomHelper().createDom(goog.dom.TagName.TR);
    goog.dom.classlist.add(tableRow_, goog.getCssName("success"));
    var tableCell_ = this.getDomHelper().createDom(goog.dom.TagName.TD);
    var tableCellText_ = this.getDomHelper().createTextNode("Opeth");

    this.getDomHelper().appendChild(element_, table_);
    this.getDomHelper().appendChild(table_, tableRow_);
    this.getDomHelper().appendChild(tableRow_, tableCell_);
    this.getDomHelper().appendChild(tableCell_, tableCellText_);
};