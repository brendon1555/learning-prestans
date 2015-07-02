goog.provide('opeth.ui.track.Renderer');

goog.require('goog.ui.Component');
goog.require('opeth.ui.track.InputForm');
goog.require('opeth.data.request.Track');

goog.require('goog.events');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
opeth.ui.track.Renderer = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(opeth.ui.track.Renderer, goog.ui.Component);


opeth.ui.track.Renderer.prototype.tbody_ = null;
opeth.ui.track.Renderer.prototype.selectedTrack_ = null;
opeth.ui.track.Renderer.prototype.selectedTrackCell_ = null;
opeth.ui.track.Renderer.prototype.band_ = 5629499534213120;
opeth.ui.track.Renderer.prototype.album_ = 5418393301680128;
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
    console.log("Inside enterDocument");
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    console.log("Inside Track renderer");

    var heading_ = this.getDomHelper().createDom(goog.dom.TagName.H1);
    heading_.textContent = "Tracks";
    this.getDomHelper().appendChild(element_, heading_);


    var InputForm_ = new opeth.ui.track.InputForm(this.getDomHelper());
    InputForm_.render(element_);

    goog.events.listen(InputForm_, "track_input", goog.bind(this.fetchAll_, this, this.band_, this.album_));


    var table_ = this.getDomHelper().createDom(goog.dom.TagName.TABLE);
    goog.dom.classlist.add(table_, goog.getCssName("table"));
    goog.dom.classlist.add(table_, goog.getCssName("table-hover"));
    this.getDomHelper().appendChild(element_, table_);

    this.tbody_ = this.getDomHelper().createDom(goog.dom.TagName.TBODY);
    this.getDomHelper().appendChild(table_, this.tbody_);

    this.fetchAll_(this.band_, this.album_);
};

opeth.ui.track.Renderer.prototype.fetchAll_ = function(bandId, albumId) {
    console.log("Inside fetchAll");
    opeth.GLOBALS.API_CLIENT.dispatchRequest(
        opeth.data.request.Track.fetchAll(bandId, albumId),
        goog.bind(function(response) {
            console.log(response.getUnpackedBody());
            this.setModel(response.getUnpackedBody());
            this.renderTracks_();
        }, this),
        goog.bind(function(response) {
            console.log("Fail fetchAll");
        }, this));
};


opeth.ui.track.Renderer.prototype.createTrackCell_ = function(track) {
    console.log("Inside createTrackCell");
    var tableRow_ = this.getDomHelper().createDom(goog.dom.TagName.TR);

    var tableCell_ = this.getDomHelper().createDom(goog.dom.TagName.TD);
    tableCell_.setAttribute("id", track.getId());
    tableCell_.textContent = track.getName();
    this.getDomHelper().appendChild(tableRow_, tableCell_);

    var tableButtonCell_ = this.getDomHelper().createDom(goog.dom.TagName.TD);
    this.getDomHelper().appendChild(tableRow_, tableButtonCell_);

    var tableCellButton_ = this.getDomHelper().createDom(goog.dom.TagName.BUTTON);
    goog.dom.classlist.add(tableCellButton_, goog.getCssName("close"));
    tableCellButton_.setAttribute("type", "button");
    tableCellButton_.setAttribute("aria-label", "Close");
    this.getDomHelper().appendChild(tableButtonCell_, tableCellButton_);

    var tableCellButtonSpan_ = this.getDomHelper().createDom(goog.dom.TagName.SPAN);
    tableCellButtonSpan_.setAttribute("aria-hiddem", "true");
    tableCellButtonSpan_.textContent = "×";
    this.getDomHelper().appendChild(tableCellButton_, tableCellButtonSpan_);

    this.getHandler().listen(tableCellButtonSpan_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();
        console.log(track.getId());
        opeth.GLOBALS.API_CLIENT.dispatchRequest(
            opeth.data.request.Track.delete(this.band_, this.album_, track.getId()),
            goog.bind(function(response) {
                console.log("Track Deleted");
                if(this.selectedTrack_.getId() == track.getId())
                    this.selectedTrack_ = null;
                this.fetchAll_(this.band_, this.album_);
            }, this),
            goog.bind(function(response) {
                console.log("Fail delete");
            }, this));

    });
    this.getHandler().listen(tableCell_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();

        this.selectTrack_(tableRow_, track);
    });

    return tableRow_;
};


opeth.ui.track.Renderer.prototype.renderTracks_ = function() {
    console.log("Inside renderTracks");
    this.getDomHelper().removeChildren(this.tbody_);

    var tracks_ = (this.getModel());

    if(goog.isNull(this.selectedTrack_))
            this.selectedTrack_ = tracks_.objectAtIndex(0);

    goog.iter.forEach(tracks_, function(track) {
        var tr_ = this.createTrackCell_(track);
        this.getDomHelper().appendChild(this.tbody_, tr_);

        if(this.selectedTrack_.getId() == track.getId())
            this.selectTrack_(tr_, track);

    }, this);
};

opeth.ui.track.Renderer.prototype.selectTrack_ = function(trackCell, track) {
    console.log("Inside selectTrack");
    if(goog.isDefAndNotNull(this.selectedTrackCell_))
        goog.dom.classlist.remove(this.selectedTrackCell_, goog.getCssName("success"));
    this.selectedTrackCell_ = trackCell;
    goog.dom.classlist.add(this.selectedTrackCell_, goog.getCssName("success"));

    this.selectedTrack_ = track;
};