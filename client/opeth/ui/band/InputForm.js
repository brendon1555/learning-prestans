goog.provide('opeth.ui.band.InputForm');

goog.require('goog.ui.Component');
goog.require('opeth.ui.band.Renderer');

goog.require('goog.events');
goog.require('goog.events.EventTarget');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
opeth.ui.band.InputForm = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(opeth.ui.band.InputForm, goog.ui.Component, goog.events.EventTarget);

/**
 * @override
 */
opeth.ui.band.InputForm.prototype.createDom = function() {
    this.decorateInternal(this.getDomHelper().createDom(goog.dom.TagName.FORM));
};

/**
 * @override
 */
opeth.ui.band.InputForm.prototype.decorateInternal = function(element) {
    opeth.ui.band.InputForm.superClass_.decorateInternal.call(this, element);
    goog.dom.classlist.add(element, goog.getCssName("form-inline"));
};

/**
 * @override
 */
opeth.ui.band.InputForm.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    // Stop Submit from being fired
    this.getHandler().listen(element_, goog.events.EventType.SUBMIT, function(event) {
        event.preventDefault();
    });

    console.log("Inside band InputForm");

    var formGroup_ = this.getDomHelper().createDom(goog.dom.TagName.DIV);
    goog.dom.classlist.add(formGroup_, goog.getCssName("form-group"));
    this.getDomHelper().appendChild(element_, formGroup_);

    var formLabel_ = this.getDomHelper().createDom(goog.dom.TagName.LABEL);
    formLabel_.setAttribute("for", "inputBand");
    this.getDomHelper().appendChild(formGroup_, formLabel_);

    var formLabelText_ = this.getDomHelper().createTextNode("Band");
    this.getDomHelper().appendChild(formLabel_, formLabelText_);

    var formInput_ = this.getDomHelper().createDom(goog.dom.TagName.INPUT);
    goog.dom.classlist.add(formInput_, goog.getCssName("form-control"));
    formInput_.setAttribute("type", "text");
    formInput_.setAttribute("id", "inputBand");
    formInput_.setAttribute("placeholder", "Band Name");
    this.getDomHelper().appendChild(formGroup_, formInput_);

    var formButton_ = this.getDomHelper().createDom(goog.dom.TagName.BUTTON);
    goog.dom.classlist.add(formButton_, goog.getCssName("btn"));
    goog.dom.classlist.add(formButton_, goog.getCssName("btn-default"));
    formButton_.setAttribute("type", "submit");
    this.getDomHelper().appendChild(element_, formButton_);

    var formButtonText_ = this.getDomHelper().createTextNode("Add Band");
    this.getDomHelper().appendChild(formButton_, formButtonText_);

    this.getHandler().listen(formButton_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();
        this.addBand_(formInput_.value);
    });
    
};

opeth.ui.band.InputForm.prototype.addBand_ = function(bandName) {

    var band_ = new opeth.data.model.Band();
    band_.setName(bandName);

    opeth.GLOBALS.API_CLIENT.dispatchRequest(
        opeth.data.request.Band.create(band_),
        goog.bind(function(response) {
            console.log("Band Added");
            this.eventDispatcher_(band_);
        }, this),
        goog.bind(function(response) {
            console.log("Fail");
        }, this));

};

opeth.ui.band.InputForm.prototype.eventDispatcher_ = function(band_) {
    this.dispatchEvent({
        type: "band_input",
        target: band_
    });
    console.log("inside eventDispatcher");
};