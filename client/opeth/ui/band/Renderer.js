goog.provide('opeth.ui.band.Renderer');

goog.require('goog.ui.Component');
goog.require('opeth.ui.band.InputForm');
goog.require('opeth.data.request.Band');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
opeth.ui.band.Renderer = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(opeth.ui.band.Renderer, goog.ui.Component);


opeth.ui.band.Renderer.prototype.tbody_ = null;
opeth.ui.band.Renderer.prototype.selectedBand_ = null;
opeth.ui.band.Renderer.prototype.selectedBandCell_ = null;
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


    //closure event for adding item
    var InputForm_ = new opeth.ui.band.InputForm(this.getDomHelper());
    InputForm_.render(element_);

    var table_ = this.getDomHelper().createDom(goog.dom.TagName.TABLE);
    goog.dom.classlist.add(table_, goog.getCssName("table"));
    goog.dom.classlist.add(table_, goog.getCssName("table-hover"));
    this.getDomHelper().appendChild(element_, table_);

    this.tbody_ = this.getDomHelper().createDom(goog.dom.TagName.TBODY);
    this.getDomHelper().appendChild(table_, this.tbody_);


    //make function
    opeth.GLOBALS.API_CLIENT.dispatchRequest(
        opeth.data.request.Band.fetchAll(),
        goog.bind(function(response) {
            console.log(response.getUnpackedBody());
            this.setModel(response.getUnpackedBody());
            this.renderBands_();
        }, this),
        goog.bind(function(response) {
            console.log("Fail");
        }, this));
};


opeth.ui.band.Renderer.prototype.createBandCell_ = function(band) {
    var tableRow_ = this.getDomHelper().createDom(goog.dom.TagName.TR);

    var tableCell_ = this.getDomHelper().createDom(goog.dom.TagName.TD);
    tableCell_.setAttribute("id", band.getId());
    this.getDomHelper().appendChild(tableRow_, tableCell_);

    var tableCellText_ = this.getDomHelper().createTextNode(band.getName());
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

    this.getHandler().listen(tableCellButtonText_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();
        this.deleteBand_(band.getId());

        opeth.GLOBALS.API_CLIENT.dispatchRequest(
            opeth.data.request.Band.delete(bandId),
            goog.bind(function(response) {
                console.log("Band Deleted");
                this.renderBands_();
            }, this),
            goog.bind(function(response) {
                console.log("Fail");
            }, this));

    });
    this.getHandler().listen(tableRow_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();

        this.selectBand_(tableRow_, band);
    });

    return tableRow_;
};


opeth.ui.band.Renderer.prototype.renderBands_ = function() {
    console.log(this.tbody_);
    this.getDomHelper().removeChildren(this.tbody_);
    console.log(this.tbody_)

    var bands_ = (this.getModel());

    if(goog.isNull(this.selectedBand_))
            this.selectedBand_ = bands_.objectAtIndex(0);

    goog.iter.forEach(bands_, function(band) {
        var tr_ = this.createBandCell_(band);
        this.getDomHelper().appendChild(this.tbody_, tr_);

        if(this.selectedBand_.getId() == band.getId())
            this.selectBand_(tr_, band);

    }, this);
};

opeth.ui.band.Renderer.prototype.selectBand_ = function(bandCell, band) {
    if(goog.isDefAndNotNull(this.selectedBandCell_))
        goog.dom.classlist.remove(this.selectedBandCell_, goog.getCssName("success"));
    this.selectedBandCell_ = bandCell;
    goog.dom.classlist.add(this.selectedBandCell_, goog.getCssName("success"));

    this.selectedBand_ = band;
};