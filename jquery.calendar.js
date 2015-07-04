; (function (root, factory) {
    if (typeof define === "function" && (define.amd || define.cmd)) {
        define(function (require, exports, module) {
            return factory(root);
        });
    } else {
        factory(root);
    }
})(window, function (root) {

    jQuery.fn.extend({
        calendar: function () {
            
        }
    });

});