goog.provide('opeth.ui.album.Renderer');

goog.require('goog.ui.Component');
goog.require('opeth.ui.album.InputForm');

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

    var InputForm_ = new opeth.ui.album.InputForm(this.getDomHelper());
    InputForm_.render(element_);

    var table_ = this.getDomHelper().createDom(goog.dom.TagName.TABLE);
    goog.dom.classlist.add(table_, goog.getCssName("table"));
    goog.dom.classlist.add(table_, goog.getCssName("table-hover"));
    this.getDomHelper().appendChild(element_, table_);

    var tbody_ = this.getDomHelper().createDom(goog.dom.TagName.TBODY);
    this.getDomHelper().appendChild(table_, tbody_);

    var tableRow_ = this.getDomHelper().createDom(goog.dom.TagName.TR);
    goog.dom.classlist.add(tableRow_, goog.getCssName("success"));
    this.getDomHelper().appendChild(tbody_, tableRow_);

    var tableCell_ = this.getDomHelper().createDom(goog.dom.TagName.TD);
    this.getDomHelper().appendChild(tableRow_, tableCell_);

    var tableCellText_ = this.getDomHelper().createTextNode("Deliverance");
    this.getDomHelper().appendChild(tableCell_, tableCellText_);

    var tableCellButton_ = this.getDomHelper().createDom(goog.dom.TagName.BUTTON);
    goog.dom.classlist.add(tableCellButton_, goog.getCssName("close"));
    tableCellButton_.setAttribute("type", "button");
    tableCellButton_.setAttribute("aria-label", "Close");
    this.getDomHelper().appendChild(tableCell_, tableCellButton_);

    var tableCellButtonSpan_ = this.getDomHelper().createDom(goog.dom.TagName.SPAN);
    tableCellButtonSpan_.setAttribute("aria-hiddem", "true");
    this.getDomHelper().appendChild(tableCellButton_, tableCellButtonSpan_);

    var tableCellButtonText_ = this.getDomHelper().createTextNode("×");
    this.getDomHelper().appendChild(tableCellButtonSpan_, tableCellButtonText_);
};