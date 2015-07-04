;
(function(root, factory) {
	if (typeof define === "function" && (define.amd || define.cmd)) {
		define(function(require, exports, module) {
			return factory(root, jQuery);
		});
	} else {
		factory(root, jQuery);
	}
})(window, function(root, $) {

	var defaults = {
		cellSize: 42,
		wrapClass: "calendar"
	};

	// 工具函数

	// 日历格子生成器
	function cellBuilder(size) {
		var rt = "<ul>",
			i;
		for (i = 0; i < size; i++) {
			rt += "<li" + (((i + 1) % 7) ? "" : " class='last'") + "></li>";
		}
		rt += "</ul>";
		return rt;
	}

	// 定位设置 
	function setPosi($el, x, y) {
		$el.css({
			left: x || 0,
			top: y || 0
		});
	}


	jQuery.fn.extend({
		calendar: function(options) {
			var opts = $.extend({}, defaults, options);
			var $input = $(this);
			var offset = $input.offset();

			// 初始元素 
			var $cWrap = $("<div class='" + opts.wrapClass + "'></div>");
			var $cHead = $(
				"<div class='head'>\
					<div class='primary'>\
						<span class='year'>2015</span>年\
						<span class='month'>05</span>月\
					</div>\
					<div class='secondary'>\
						<ul class='weeks'>\
							<li>日</li>\
							<li>一</li>\
							<li>二</li>\
							<li>三</li>\
							<li>四</li>\
							<li>五</li>\
							<li>六</li>\
						</ul>\
					</div>\
				</div>"
			);
			var $cmain = $("<div class='main'></div>");
			var $cFoot = $("<div class='foot'></div>");

			// 填充日历格子，数量可控 
			var cellStr = cellBuilder(opts.cellSize);
			$cmain.html(cellStr);

			var handles = {
				show: function(ev) {
					$cWrap.fadeIn(200);
					return false;
				},
				hide: function() {
					$cWrap.fadeOut(200);
					return false;
				}
			}


			$cWrap.append($cHead, $cmain, $cFoot).hide();

			$cWrap.appendTo("body");
			setPosi($cWrap, opts.x || offset.left, opts.y || offset.top + $input.outerHeight());

			$input.on("click focus", handles.show);

			$(document).on("click", function(ev) {
				if (!$(ev.target).closest("." + opts.wrapClass).length) {
					handles.hide();
				}
			});

		}
	});

});