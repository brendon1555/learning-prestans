goog.provide('opeth.ui.album.InputForm');

goog.require('goog.ui.Component');
goog.require('opeth.ui.album.Renderer');

goog.require('goog.events');
goog.require('goog.events.EventTarget');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
opeth.ui.album.InputForm = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(opeth.ui.album.InputForm, goog.ui.Component, goog.events.EventTarget);

opeth.ui.album.InputForm.prototype.band_ = null;

opeth.ui.album.InputForm.prototype.setBand_ = function(band) {
    this.band_ = band;
};
/**
 * @override
 */
opeth.ui.album.InputForm.prototype.createDom = function() {
    this.decorateInternal(this.getDomHelper().createDom(goog.dom.TagName.FORM));
};

/**
 * @override
 */
opeth.ui.album.InputForm.prototype.decorateInternal = function(element) {
    opeth.ui.album.InputForm.superClass_.decorateInternal.call(this, element);
    goog.dom.classlist.add(element, goog.getCssName("form-inline"));
};

/**
 * @override
 */
opeth.ui.album.InputForm.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    // Stop Submit from being fired
    this.getHandler().listen(element_, goog.events.EventType.SUBMIT, function(event) {
        event.preventDefault();
    });

    console.log("Inside album InputForm");

    var formGroup_ = this.getDomHelper().createDom(goog.dom.TagName.DIV);
    goog.dom.classlist.add(formGroup_, goog.getCssName("form-group"));
    this.getDomHelper().appendChild(element_, formGroup_);

    var formLabel_ = this.getDomHelper().createDom(goog.dom.TagName.LABEL);
    formLabel_.setAttribute("for", "inputAlbum");
    formLabel_.textContent = "Album";
    this.getDomHelper().appendChild(formGroup_, formLabel_);

    var formInput_ = this.getDomHelper().createDom(goog.dom.TagName.INPUT);
    goog.dom.classlist.add(formInput_, goog.getCssName("form-control"));
    formInput_.setAttribute("type", "text");
    formInput_.setAttribute("id", "inputAlbum");
    formInput_.setAttribute("placeholder", "Album Name");
    this.getDomHelper().appendChild(formGroup_, formInput_);

    var formButton_ = this.getDomHelper().createDom(goog.dom.TagName.BUTTON);
    goog.dom.classlist.add(formButton_, goog.getCssName("btn"));
    goog.dom.classlist.add(formButton_, goog.getCssName("btn-default"));
    formButton_.setAttribute("type", "submit");
    formButton_.textContent = "Add Album";
    formButton_.setAttribute("disabled", "disabled");
    this.getDomHelper().appendChild(element_, formButton_);

    this.getHandler().listen(formInput_, goog.events.EventType.INPUT, function(event) {
        if(formInput_.value == "") {
            formButton_.setAttribute("disabled", "disabled");
        }
        else {
            formButton_.removeAttribute("disabled");
        };
    });

    this.getHandler().listen(formButton_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();
        this.addAlbum_(this.band_.getId(), formInput_.value);
    });
    
};

opeth.ui.album.InputForm.prototype.addAlbum_ = function(bandId, albumName) {

    var album_ = new opeth.data.model.Album();
    album_.setName(albumName);

    opeth.GLOBALS.API_CLIENT.dispatchRequest(
        opeth.data.request.Album.create(bandId, album_),
        goog.bind(function(response) {
            console.log("Album Added");
            this.eventDispatcher_(album_);
        }, this),
        goog.bind(function(response) {
            console.log("Fail");
        }, this));

};

opeth.ui.album.InputForm.prototype.eventDispatcher_ = function(album_) {
    this.dispatchEvent({
        type: "album_input",
        target: album_
    });
    console.log("inside eventDispatcher");
};