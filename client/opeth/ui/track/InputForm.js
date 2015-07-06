goog.provide('opeth.ui.track.InputForm');

goog.require('goog.ui.Component');
goog.require('opeth.ui.track.Renderer');

goog.require('goog.events');
goog.require('goog.events.EventTarget');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
opeth.ui.track.InputForm = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(opeth.ui.track.InputForm, goog.ui.Component, goog.events.EventTarget);

opeth.ui.track.InputForm.prototype.band_ = null;
opeth.ui.track.InputForm.prototype.album_ = null;

opeth.ui.track.InputForm.prototype.setBand_ = function(band) {
    this.band_ = band;
};

opeth.ui.track.InputForm.prototype.setAlbum_ = function(album) {
    this.album_ = album;
};

/**
 * @override
 */
opeth.ui.track.InputForm.prototype.createDom = function() {
    this.decorateInternal(this.getDomHelper().createDom(goog.dom.TagName.FORM));
};

/**
 * @override
 */
opeth.ui.track.InputForm.prototype.decorateInternal = function(element) {
    opeth.ui.track.InputForm.superClass_.decorateInternal.call(this, element);
    goog.dom.classlist.add(element, goog.getCssName("form-inline"));
};

/**
 * @override
 */
opeth.ui.track.InputForm.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    // Stop Submit from being fired
    this.getHandler().listen(element_, goog.events.EventType.SUBMIT, function(event) {
        event.preventDefault();
    });

    console.log("Inside track InputForm");

    var formGroup_ = this.getDomHelper().createDom(goog.dom.TagName.DIV);
    goog.dom.classlist.add(formGroup_, goog.getCssName("form-group"));
    this.getDomHelper().appendChild(element_, formGroup_);

    var formLabel_ = this.getDomHelper().createDom(goog.dom.TagName.LABEL);
    formLabel_.setAttribute("for", "inputTrack");
    formLabel_.textContent = "Track";
    this.getDomHelper().appendChild(formGroup_, formLabel_);

    var formInput_ = this.getDomHelper().createDom(goog.dom.TagName.INPUT);
    goog.dom.classlist.add(formInput_, goog.getCssName("form-control"));
    formInput_.setAttribute("type", "text");
    formInput_.setAttribute("id", "inputTrack");
    formInput_.setAttribute("placeholder", "Track Name");
    this.getDomHelper().appendChild(formGroup_, formInput_);

    var formButton_ = this.getDomHelper().createDom(goog.dom.TagName.BUTTON);
    goog.dom.classlist.add(formButton_, goog.getCssName("btn"));
    goog.dom.classlist.add(formButton_, goog.getCssName("btn-default"));
    formButton_.setAttribute("type", "submit");
    formButton_.textContent = "Add Track";
    this.getDomHelper().appendChild(element_, formButton_);

    this.getHandler().listen(formButton_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();
        this.addTrack_(this.band_.getId(), this.album_.getId(), formInput_.value);
    });
    
};

opeth.ui.track.InputForm.prototype.addTrack_ = function(bandId, albumId, trackName) {

    var track_ = new opeth.data.model.Track();
    track_.setName(trackName);

    opeth.GLOBALS.API_CLIENT.dispatchRequest(
        opeth.data.request.Track.create(bandId, albumId, track_),
        goog.bind(function(response) {
            console.log("Track Added");
            this.eventDispatcher_(track_);
        }, this),
        goog.bind(function(response) {
            console.log("Fail");
        }, this));

};

opeth.ui.track.InputForm.prototype.eventDispatcher_ = function(track_) {
    this.dispatchEvent({
        type: "track_input",
        target: track_
    });
    console.log("inside eventDispatcher");
};