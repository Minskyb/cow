/**
 * Created by ASUS on 2016/7/7.
 */

var defaultOptions = {
	CIRCLE_TIME:1000
}

var CircleList = function(element,options){

	this.options = defaultOptions;
	this._setOptions(options);


	this.$element = $(element);
	this.$content = this.$element.find(".cow_circle_content",this.$element);

	if(!this.$content){
		console.error("未找到 content 请查阅文档，检查实例格式！");
		return;
	}

	// 把 element 的高度固定为初始高度
	this.$element.css({
		height:this.$content.height() +"px"
	})
	// 获取每一项的高度
	this.itemHeight = this.$content.height()/(this.$content.find(".item").length-this.$content.find(".item.cow_hide").length);

	this.interval && this.pause();
	this._circle();

	this.$element.on("mouseenter",function(e){
		this.interval && this.pause();
	}.bind(this));
	this.$element.on("mouseleave",function(e){
		this._circle();
	}.bind(this));
}

CircleList.prototype._setOptions = function(options){
	this.options = $.extend({},this.options,options);
}

CircleList.prototype._getCss = function(node,attribute){

	var origin = node.css(attribute).match(/(\S+)px/);
	if(origin)
		return parseFloat(origin[1]);
	return 0;
}

/*
*TODO:借用 jquery.animate 动画执行完后的回调函数，实现 list 的自动滚动播放。
* */
CircleList.prototype._circle = function(){
	this.interval = true;
	var originTop = this._getCss(this.$content,"top");
	// 处理暂停后，重新启动因为 top ！= 0 所带来的速度改变情况
	var circleTime = this.options.CIRCLE_TIME*(originTop+this.itemHeight)/this.itemHeight;

	var $next = this.$content.find(".item.cow_hide").first().removeClass("cow_hide");
	this.$content.animate({
		top:-this.itemHeight+"px"
	},circleTime,'linear',function(){
		// 把 item 第一项移动到 list 最末尾并隐藏
		this.$content.find(".item").first().appendTo(this.$content).addClass("cow_hide");
		this.$content.css({
			top:0
		});
		this._circle();
	}.bind(this))
}

CircleList.prototype.pause = function(){
	this.interval = false;
	this.$content.stop();
}

/*
*  TODO:添加新元素，采用 fragment 只需一次 DOM 操作。
* */
CircleList.prototype.addItem = function(data){

	// var fragment = document.createDocumentFragment()
	// 	,newNode = null;

	// data.forEach(function(item){
	// 	newNode = document.createElement("li");
	// 	newNode.appendChild(document.createTextNode(item));
	// 	fragment.appendChild(newNode)
	// })
	//
	// this.$content[0].appendChild(fragment);
}

function Plugin(elements,options){
	return elements.map(function(){
		var $this = $(this);
		var data = $(this).data("cow.circle.list");
		if(!data){
			$this.data("cow.circle.list",(data = new CircleList(this,options)));
		}

		return data;
	});
}

module.exports = Plugin;
