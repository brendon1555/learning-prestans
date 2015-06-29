/*
 * Automatically generated by preplate
 */
goog.provide('opeth.data.model.Track');

goog.require('opeth');

goog.require('goog.json');

goog.require('prestans.types.Model.EventType');
goog.require('prestans.types.Model.AttributeChangedEvent');

goog.require('prestans.types.Model');

goog.require('prestans.types.String');
goog.require('None.Track');

/**
 * @constructor
 * @extends {prestans.types.Model}
 * @param {Object=} opt_json
 * @param {boolean=} opt_minified
*/
opeth.data.model.Track = function(opt_json, opt_minified) {

    //Setup base model
    prestans.types.Model.call(this);

    if(goog.isDef(opt_minified) && goog.isBoolean(opt_minified) && opt_minified && goog.isDefAndNotNull(opt_json)) {
        this.id_ = new prestans.types.String({value: opt_json[opeth.data.model.Track.REWRITE_MAP["id"]], required: false, defaultValue: null, opt_maxLength: null, opt_minLength: null, format: null, choices: null});
        this.name_ = new prestans.types.String({value: opt_json[opeth.data.model.Track.REWRITE_MAP["name"]], required: true, defaultValue: null, opt_maxLength: null, opt_minLength: null, format: null, choices: null});
    }
    else if(goog.isDefAndNotNull(opt_json)) {
        this.id_ = new prestans.types.String({value: opt_json["id"], required: false, defaultValue: null, opt_maxLength: null, opt_minLength: null, format: null, choices: null});
        this.name_ = new prestans.types.String({value: opt_json["name"], required: true, defaultValue: null, opt_maxLength: null, opt_minLength: null, format: null, choices: null});
    }
    else {
        this.id_ = new prestans.types.String({required: false, defaultValue: null, opt_maxLength: null, opt_minLength: null, format: null, choices: null});
        this.name_ = new prestans.types.String({required: true, defaultValue: null, opt_maxLength: null, opt_minLength: null, format: null, choices: null});
    }

    //listen for array events
    
};
goog.inherits(opeth.data.model.Track, prestans.types.Model);

opeth.data.model.Track.Meta = {
    Id: {
        REQUIRED: false,
        DEFAULT: null,
        MAX_LENGTH: null,
        MIN_LENGTH: null,
        FORMAT: null,
        CHOICES: null
    },
    Name: {
        REQUIRED: true,
        DEFAULT: null,
        MAX_LENGTH: null,
        MIN_LENGTH: null,
        FORMAT: null,
        CHOICES: null
    }
};

//Rewrite map
opeth.data.model.Track.REWRITE_MAP = {
    "id": "a",
    "name": "b"
};

//Reverse rewrite map
opeth.data.model.Track.REVERSE_REWRITE_MAP = {
    "a": "id",
    "b": "name"
};

opeth.data.model.Track.prototype.getId = function() {
    return this.id_.getValue();
};

opeth.data.model.Track.prototype.setId = function(value) {
    var previousValue_ = this.id_.getValue();
    var success_ = this.id_.setValue(value);
    this.dispatchAttributeChangedEvent_("id", previousValue_, this.id_.getValue());
    return success_;
};



opeth.data.model.Track.prototype.getName = function() {
    return this.name_.getValue();
};

opeth.data.model.Track.prototype.setName = function(value) {
    var previousValue_ = this.name_.getValue();
    var success_ = this.name_.setValue(value);
    this.dispatchAttributeChangedEvent_("name", previousValue_, this.name_.getValue());
    return success_;
};



opeth.data.model.Track.prototype.setValueForKey = function(key, value) {

    var returnVal_ = null;

    switch(key)
    {
        case "id":
            returnVal_ = this.setId(value);
            break;
        case "name":
            returnVal_ = this.setName(value);
            break;
        default:
            throw "Key: "+key+" not found in model";
    }

    return returnVal_;

};

opeth.data.model.Track.prototype.getValueForKey = function(key) {

    var returnVal_ = null;

    switch(key)
    {
        case "id":
            returnVal_ = this.getId();
            break;
        case "name":
            returnVal_ = this.getName();
            break;
        default:
            throw "Key: "+key+" not found in model";
    }

    return returnVal_;

};

opeth.data.model.Track.prototype.clone = function(opt_filter) {
    var json_ = this.getJSONObject(false, opt_filter);
    return new opeth.data.model.Track(json_, false);
};

/**
 * @param {boolean} minified
 * @param {None.Track=} opt_filter
 */
opeth.data.model.Track.prototype.getJSONObject = function(minified, opt_filter) {

    
    var jsonifiedObject_ = {};
    
    if(goog.isDef(minified) && goog.isBoolean(minified) && minified) {
                if(goog.isDef(opt_filter) && opt_filter.getId())
            jsonifiedObject_[opeth.data.model.Track.REWRITE_MAP["id"]] = this.getId()
        else if(!goog.isDef(opt_filter))
            jsonifiedObject_[opeth.data.model.Track.REWRITE_MAP["id"]] = this.getId()
                    if(goog.isDef(opt_filter) && opt_filter.getName())
            jsonifiedObject_[opeth.data.model.Track.REWRITE_MAP["name"]] = this.getName()
        else if(!goog.isDef(opt_filter))
            jsonifiedObject_[opeth.data.model.Track.REWRITE_MAP["name"]] = this.getName()
            }
    else {
                if(goog.isDef(opt_filter) && opt_filter.getId())
            jsonifiedObject_["id"] = this.getId()
        else if(!goog.isDef(opt_filter))
            jsonifiedObject_["id"] = this.getId()
                    if(goog.isDef(opt_filter) && opt_filter.getName())
            jsonifiedObject_["name"] = this.getName()
        else if(!goog.isDef(opt_filter))
            jsonifiedObject_["name"] = this.getName()
            }

    return jsonifiedObject_;
};

/**
 * @export
 * @param {boolean} minified
 * @param {None.Track=} opt_filter
 */
opeth.data.model.Track.prototype.getJSONString = function(minified, opt_filter) {
    return goog.json.serialize(this.getJSONObject(minified, opt_filter));
};