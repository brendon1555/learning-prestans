goog.provide('opeth.ui.album.InputForm');

goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
opeth.ui.album.InputForm = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(opeth.ui.album.InputForm, goog.ui.Component);

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
    this.getDomHelper().appendChild(formGroup_, formLabel_);

    var formLabelText_ = this.getDomHelper().createTextNode("Album");
    this.getDomHelper().appendChild(formLabel_, formLabelText_);

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
    this.getDomHelper().appendChild(element_, formButton_);

    var formButtonText_ = this.getDomHelper().createTextNode("Add Album");
    this.getDomHelper().appendChild(formButton_, formButtonText_);
    
};