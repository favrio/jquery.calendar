; (function (root, factory) {
    if (typeof define === "function" && (define.amd || define.cmd)) {
        define(function (require, exports, module) {
            return factory(root);
        });
    } else {
        factory(root);
    }
})(window, function (root) {

    var defaults = {
        
    };

    jQuery.fn.extend({
        calendar: function (options) {
            var opts = $.extend({}, defaults, options);
            console.log(opts);
        }
    });

});