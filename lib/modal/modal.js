/**
 * Created by ASUS on 2016/6/30.
 */
var $ = require('jquery');

var Modal = function(element,options){

	this.$body = $(document.body);
	this.$element = $(element);
	this.isShown = false;
	this.$backdrop = null;
	this.originBodyPaddingRight = null;
}

Modal.prototype.show = function(_relatedTarget){

	if(this.isShown) return;
	this.isShown = true;

	this._addBackdrop();
	this._hideScrollbar();

	this.$backdrop.addClass('in');

	setTimeout(function () {
		this.$element.show(0).addClass('in');
	}.bind(this),100);

}

Modal.prototype._addBackdrop = function(){


	this.$backdrop = $(document.createElement("div"))
		.addClass("cow_modal_backdrop fade")
		.appendTo(this.$body);

	this.$element.on("click.dismiss.cow.modal",function(e){
		if($(e.target).is(this.$element[0])) this.hide();
	}.bind(this));

	// 兼容 IE8 浏览器
	// 在 IE8 模式下。 modal 弹出时，背景聚焦在 backdrop 中，而非 modal 中。
	this.$backdrop.on("click.dismiss.cow.modal",function(e){
		this.hide();
	}.bind(this))
}

Modal.prototype._hideScrollbar = function(){

	this.$body.addClass("cow_modal_open");
	var scrollbarWidth = window.outerHeight > window.innerHeight ? 0 :this._measureScrollbar() ;

	this.originBodyPaddingRight = parseInt((this.$body.css('padding-right') || 0),10);
	this.$body.css('padding-right',this.originBodyPaddingRight + scrollbarWidth);
}

Modal.prototype._measureScrollbar = function(){

	var scrollDiv = document.createElement('div');
	scrollDiv.className = 'cow_modal_measure_scrollbar';
	this.$body.append(scrollDiv);
	var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	this.$body[0].removeChild(scrollDiv);

	return scrollbarWidth;
}

Modal.prototype.hide = function(_relateTarget){

	this.$element
		.removeClass("in")
		.off(".dismiss.cow.modal");

	this.$backdrop
		.removeClass("in")
		.off('.dismiss.cow.modal');

	this.isShown = false;
	this.$element.hide();
	this.$body.removeClass('bt-modal-open');
	this._resetScrollbar();
	this._removeBackdrop();
}

Modal.prototype._resetScrollbar = function(){
	this.$body.css("padding-left",this.originBodyPaddingRight);
}

Modal.prototype._removeBackdrop = function(){
	this.$backdrop && this.$backdrop.remove();
	this.$backdrop = null;
}

Modal.prototype.toggle = function(_relateTarget){
	this.isShown ? this.hide(_relateTarget) : this.show(_relateTarget);
}

Modal.Plugin = function (elements,options,_relatedTarget) {

	return elements.each(function(){
		var $this = $(this);
		var data = $this.data("cow.modal");
		if(!data) $this.data("cow.modal",(data = new Modal(this,options)));

		if(typeof options == 'string') data[options](_relatedTarget);
		else if (options.show)
			data.show(_relatedTarget);
	})
}

$(document.body).on('click.auto-init.cow.modal','[data-toggle="modal"]',function(e){

	var $this = $(this),
		$target = $($this.data('target'));

	var options = $target.data('cow.modal') ? 'toggle' : {show:true};

	if($this.is('a')) e.preventDefault();

	Modal.Plugin($target,options,this);

});

module.exports = Modal