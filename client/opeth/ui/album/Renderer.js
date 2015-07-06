goog.provide('opeth.ui.album.Renderer');

goog.require('goog.ui.Component');
goog.require('opeth.ui.album.InputForm');
goog.require('opeth.data.request.Album');

goog.require('goog.events');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
opeth.ui.album.Renderer = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(opeth.ui.album.Renderer, goog.ui.Component);

opeth.ui.album.Renderer.prototype.InputForm_ = null;
opeth.ui.album.Renderer.prototype.tbody_ = null;
opeth.ui.album.Renderer.prototype.selectedAlbum_ = null;
opeth.ui.album.Renderer.prototype.selectedAlbumCell_ = null;
opeth.ui.album.Renderer.prototype.selectedBand_ = null;

/**
 * @enum {string}
 */
opeth.ui.album.Renderer.EventType = {
    SELECTED: goog.events.getUniqueId('opeth')
};

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
    console.log("Inside enterDocument");
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    console.log("Inside Album renderer");

    var heading_ = this.getDomHelper().createDom(goog.dom.TagName.H1);
    heading_.textContent = "Albums";
    this.getDomHelper().appendChild(element_, heading_);

    this.InputForm_ = new opeth.ui.album.InputForm(this.getDomHelper());
    this.InputForm_.render(element_);

    goog.events.listen(this.InputForm_, "album_input", goog.bind(this.fetchAll_, this, this.selectedBand_));

    var table_ = this.getDomHelper().createDom(goog.dom.TagName.TABLE);
    goog.dom.classlist.add(table_, goog.getCssName("table"));
    goog.dom.classlist.add(table_, goog.getCssName("table-hover"));
    this.getDomHelper().appendChild(element_, table_);

    this.tbody_ = this.getDomHelper().createDom(goog.dom.TagName.TBODY);
    this.getDomHelper().appendChild(table_, this.tbody_);


    var loading_ = this.getDomHelper().createDom(goog.dom.TagName.P);
    loading_.textContent = "Loading...";
    this.getDomHelper().appendChild(this.tbody_, loading_);

    //this.fetchAll_(this.band_);
};
opeth.ui.album.Renderer.prototype.fetchAll_ = function() {
    console.log("Inside fetchAll");
    console.log(this.selectedBand_);
    this.InputForm_.setBand_(this.selectedBand_);
    this.selectedAlbum_ = null;
    opeth.GLOBALS.API_CLIENT.dispatchRequest(
        opeth.data.request.Album.fetchAll(this.selectedBand_.getId()),
        goog.bind(function(response) {
            console.log(response.getUnpackedBody());
            this.setModel(response.getUnpackedBody());
            this.renderAlbums_();
        }, this),
        goog.bind(function(response) {
            console.log("Fail fetchAll");
        }, this));
};


opeth.ui.album.Renderer.prototype.createAlbumCell_ = function(album) {
    console.log("Inside createAlbumCell");
    var tableRow_ = this.getDomHelper().createDom(goog.dom.TagName.TR);

    var tableCell_ = this.getDomHelper().createDom(goog.dom.TagName.TD);
    tableCell_.setAttribute("id", album.getId());
    tableCell_.textContent = album.getName();
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
        console.log(album.getId());
        opeth.GLOBALS.API_CLIENT.dispatchRequest(
            opeth.data.request.Album.delete(this.selectedBand_.getId(), album.getId()),
            goog.bind(function(response) {
                console.log("Album Deleted");
                if(this.selectedAlbum_.getId() == album.getId())
                    this.selectedAlbum_ = null;
                this.fetchAll_();
            }, this),
            goog.bind(function(response) {
                console.log("Fail delete");
            }, this));

    });
    this.getHandler().listen(tableCell_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();
        console.log("Clicked " + album.getName());
        this.selectAlbum_(tableRow_, album);
    });

    return tableRow_;
};


opeth.ui.album.Renderer.prototype.renderAlbums_ = function() {
    console.log("Inside renderAlbums");
    this.getDomHelper().removeChildren(this.tbody_);

    var albums_ = (this.getModel());

    if(albums_.isEmpty()) {
        var fallback_ = this.getDomHelper().createDom(goog.dom.TagName.P);
        fallback_.textContent = "No Albums";
        this.getDomHelper().appendChild(this.tbody_, fallback_);
    }
    else {
        if(goog.isNull(this.selectedAlbum_))
                this.selectedAlbum_ = albums_.objectAtIndex(0);

        goog.iter.forEach(albums_, function(album) {
            var tr_ = this.createAlbumCell_(album);
            this.getDomHelper().appendChild(this.tbody_, tr_);

            if(this.selectedAlbum_.getId() == album.getId())
                this.selectAlbum_(tr_, album);

        }, this);
    };
};

opeth.ui.album.Renderer.prototype.selectAlbum_ = function(albumCell, album) {
    console.log("Inside selectAlbum");
    if(goog.isDefAndNotNull(this.selectedAlbumCell_))
        goog.dom.classlist.remove(this.selectedAlbumCell_, goog.getCssName("success"));
    this.selectedAlbumCell_ = albumCell;
    goog.dom.classlist.add(this.selectedAlbumCell_, goog.getCssName("success"));

    this.selectedAlbum_ = album;

    this.dispatchEvent(new opeth.ui.album.Renderer.SelectedEvent(
        opeth.ui.album.Renderer.EventType.SELECTED,
        this.selectedBand_,
        album,
        this)
    );
};

opeth.ui.album.Renderer.prototype.setBand_ = function(band) {
    this.selectedBand_ = band;
};

/**
 * @constructor
 * @extends {goog.events.Event}
 * @param {!string} type
 * @param {!opeth.data.model.Band} band
 * @param {!opeth.data.model.Album} album
 * @param {goog.ui.Component=} opt_target
 */
opeth.ui.album.Renderer.SelectedEvent = function(type, band, album, opt_target) {
    goog.events.Event.call(this, type, opt_target);
    console.log("Inside Click Dispatch");
    /**
     * @type {!opeth.data.model.Album}
     * @private
     */
    this.album_ = album;
    this.band_ = band;
};
goog.inherits(opeth.ui.album.Renderer.SelectedEvent, goog.events.Event);

/**
 * @return {!opeth.data.model.Album}
 */
opeth.ui.album.Renderer.SelectedEvent.prototype.getAlbum = function() {
    return this.album_;
};

/**
 * @return {!opeth.data.model.Band}
 */
opeth.ui.album.Renderer.SelectedEvent.prototype.getBand = function() {
    return this.band_;
};