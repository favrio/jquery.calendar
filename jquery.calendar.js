
; (function (root, factory) {
    if (typeof define === "function" && (define.amd || define.cmd)) {
        define(function (require, exports, module) {
            return factory(root, jQuery);
        });
    } else {
        factory(root, jQuery);
    }
})(window, function (root, $) {

    var defaults = {

    };

    jQuery.fn.extend({
        calendar: function (options) {
            var opts = $.extend({}, defaults, options);
            console.log(opts);
            var $cWrap = $("<div class='calendar'></div>");
            var $cHead = $(
                "<div class='head'>\
                    <div class='primary'>\
                        <span class='year'>2015</span>年\
                        <span class='month'>05</span>月\
                    </div>\
                    <div class='secondary'></div>\
                </div>"
                );
            var $cmain = $("<div class='main'></div>");
            var $cFoot = $("<div class='foot'></div>");
            
            $cWrap.append($cHead, $cmain, $cFoot);
            
            $cWrap.appendTo("body");
        }
    });

});