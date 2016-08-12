/**
 * Created by Punk.Li on 2016/8/10.
 */


var $ = require('jquery');

var Dropdown = function(element,options){

    this.$element = $(element);
    this.$dropdownMenu = $(".cow_dropdown_menu",this.$element);
    this.$title = $(".cow_dropdown_title",this.$element);
    this.$value = $(".cow_dropdown_value",this.$element);
    this.isShown = false;

    this.addChooseHandler();
}

Dropdown.prototype.toggle = function(){

    this.isShown = !this.isShown;
    this.isShown ? this._show() : this._hide();
}

Dropdown.prototype._show = function(){
    this.$dropdownMenu.show();
    this.$dropdownMenu.css('z-index',1000);


    document.onclick = function(){
        this.toggle();
    }.bind(this)
}

Dropdown.prototype._hide = function(){
    this.$dropdownMenu.hide();
    this.$dropdownMenu.css('z-index',-1);

    document.onclick = null;
}

Dropdown.prototype.addChooseHandler = function(){
    this.$dropdownMenu.click(function(e){
        var $target = $(e.target);
        this.$title.text($target.text());
        this.$value.val($target.text());
    }.bind(this))
}

function Plugin(elements,options){

    return elements.map(function(){
        var $this =  $(this),data = $this.data("cow.dropdown");

        if(!data) $this.data("cow.dropdown",(data = new Dropdown(this,options)));

        if(typeof options == 'string') data[options]();
        else if (options.toggle)
            data.toggle();

        return data;
    });

}

$(document.body).on('click.auto-init.cow.dropdown','[data-toggle="dropdown"]',function(e){

    var options = {toggle:true};

   Plugin($(this),options);
    e.stopPropagation();
});

module.exports = Plugin;