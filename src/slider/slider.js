/**
 * Created by ASUS on 2016/7/4.
 */

var $ = require('jquery');

var Slider = function(element,options){

	this.options = $.extend({},Slider.default,options);

	this.$element = $(element);
	this.$content = $(".cow_slider_content",this.$element);
	this.$items = this.$content.children();
	this.$navs = $(".cow_slider_nav",this.$element).children();

	this.len = this.$items.length;
	this.index = 0 ;// 当前展示页
	this.sliding = false;

	this.interval = this.autoPlay();

	var reg = window.navigator.userAgent.match(/MSIE\s(\d)/);
	if(reg){
		this.isIE = true;
		this.ieV = reg[1];
	}

	if(this.isIE && this.ieV <9){
		this.$navs.css({
			"background-color":"white"
		});
		console.log("yes");
	}

	this.$navs.on("click",function(e){

		this.$items.finish();

		var index = $(e.target).data("slide-to");
		if(index <this.index)
			return this.slide('prev',$(this.$items.get(index)));
		else if(index > this.index)
			return this.slide('next',$(this.$items.get(index)));
	}.bind(this));

	this.$content.on("mouseenter",function(e){
		this.interval = this.pause();
	}.bind(this));

	this.$content.on("mouseleave",function(e){
		this.interval = this.autoPlay();
	}.bind(this));

}

Slider.default = {
	interval:3000
}

Slider.prototype.pause  = function(){
	this.interval && clearInterval(this.interval);
	return null;
}

Slider.prototype.autoPlay = function(){
	return setInterval(this.next.bind(this),this.options.interval)
}

Slider.prototype.next = function(){
	if(this.sliding) return;
	return this.slide("next");
}

Slider.prototype.prev = function(){
	if(this.sliding) return;
	return this.slide("prev");
}

Slider.prototype.slide = function(type,node){

	var $active = $(".cow_slider_item.active",this.$content)
		,$next = null
		,direction = type == 'next' ? 'left':"right";

	$next = node || this._getNextNode(type,$active);

	if(!$next.length){
		console.error("slider 获取下一页内容失败！")
		return;
	}

	this.sliding = true;

	$next.addClass(type);
	$next[0].offsetWidth;// 因为前后紧跟着设置了两个状态，浏览器为了节约性能会默认最后一个状态，从而导致渐变失败，所以这里调用 offsetWidth 隔开两个状态，从而达到强制设置的效果。
	$active.addClass(direction);
	$next.addClass(direction);

	this._switchActiveState($active,$next,type,direction);
}

Slider.prototype._switchActiveState = function($active,$next,type,direction){

	// 延迟动画结束时间。
	if(!this.isIE || this.ieV>=9){
		var num=0;
		var interval = setInterval(function(){
			num++;
			if(!$active.is(":animated") &&  num %2==0){
				clearInterval(interval);
				$active.removeClass(['active',direction].join(" "));
				$next.removeClass([type,direction].join(" "))
					.addClass("active");
				this.index = this._getNodeIndex($next);
				this.$navs.removeClass("active");
				$(this.$navs.get(this.index)).addClass("active");
				this.sliding = false;
			}
		}.bind(this),300);
	}
	else{
		$active.removeClass(['active',direction].join(" "));
		$next.removeClass([type,direction].join(" "))
			.addClass("active");
		this.index = this._getNodeIndex($next);
		this.$navs.removeClass("active");
		$(this.$navs.get(this.index)).addClass("active");
		this.sliding = false;
	}
}

Slider.prototype._getNodeIndex = function($next){

	this.$items = $next.parent().children('.cow_slider_item');
	return this.$items.index($next);
}

Slider.prototype._getNextNode = function(type,$active){
	var $next = type == 'next' ? $active.next():$active.prev();

	if(!$next.length && this.index == this.len-1){
		$next = $(this.$items[0]);
	}
	else if(!$next.length && this.index == 0){
		$next = $(this.$items[this.len-1]);
	}

	return $next;
}

function Plugin(elements,options){

	return elements.each(function(){
		var $this = $(this);
		var data = $this.data("cow.slider");

		if(!data) $this.data("cow.slider",(data = new Slider(this,options)));
	})
}

Slider.plugin = Plugin;

module.exports = Slider;