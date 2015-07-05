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

	// 初始配置
	var defaults = {
		cellSize: 42,
		wrapClass: "calendar"
	};

	// 元素引用，期望多个日历公用一套Dom
	var $cWrap,
		$cHead,
		$cmain,
		$cFoot;

	// 月份天数索引表
	var monthsIndex = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// 工具函数

	/**
	 * 根据月份和年计算当月天数
	 * @param  {Number} year  年
	 * @param  {Number} month 月，从0开始
	 * @return {Number}       该年该月的天数
	 */
	function calculateDays(year, month) {
		var days = monthsIndex[month];
		if (month === 1 && isLeapYear(year)) {
			days = 29;
		}
		return days;
	}

	/**
	 * 日历格子生成器
	 * @param  {Number} size 需要生成的格子数量
	 * @return {String}      格子列表字html符串
	 */
	function cellBuilder(size) {
		var rt = "<ul>",
			i,
			isLast;
		for (i = 0; i < size; i++) {
			isLast = (i + 1) % 7;
			isLastClass = isLast ? "'" : " last'";
			rt += "<li class='day" + isLastClass + "></li>";
		}
		rt += "</ul>";
		return rt;
	}

	/**
	 * 日历定位设置
	 * @param {jQuery Object} $el 需要设置定位的元素
	 * @param {Number} x   X坐标，基于整个页面
	 * @param {Number} y   y坐标，基于整个页面
	 */
	function setPosi($el, x, y) {
		$el.css({
			left: x || 0,
			top: y || 0
		});
	}

	/**
	 * 判断是不是闰年
	 * @param  {Number}  year 年份
	 * @return {Boolean}      是或者不是闰年
	 */
	function isLeapYear(year) {
		return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
	}

	/**
	 * 一位数补齐，小于2位的自动补齐为2位
	 * @param  {Number} n 任意数字
	 * @return {String}   补齐后的数字字符串
	 */
	function getTwoBit(n) {
		return (n > 9 ? "" : "0") + n
	}

	/*
	 * 日期对象转成字符串
	 * @param  {Date} new Date()
	 * @split  {String} "-" 或 "/"
	 * @return {String} "2014-12-31"
	 */
	function date2Str(date, split) {
		split = split || "-";
		var y = date.getFullYear();
		var m = getTwoBit(date.getMonth() + 1);
		var d = getTwoBit(date.getDate());
		return [y, m, d].join(split);
	}

	/**
	 * 字符串转Date对象
	 * @param  {String} str 日期字符串
	 * @return {Date}     日期对象
	 */
	function str2Date(str) {
		var reDate = /^\d{4}\-\d{1,2}\-\d{1,2}/;
		if (reDate.test(str)) {
			str = str.replace(/-/g, "/");
			/* 
			直接通过"-"在日期构造器里面使用，会出现兼容性问题
			http://my.oschina.net/epstar/blog/289949
			http://www.cnblogs.com/snandy/p/3992443.html
			*/
		}
		return new Date(str);
	}

	function fillCell($el, year, month) {
		var days = calculateDays(year, month);
		var monthStartDay = new Date(year + "/" + month + "/01");
		var startDay = monthStartDay.getDay();
		var $lis = $el.find("li:gt(" + (startDay - 1) + ")"); // gt匹配所有大于给定索引值的元素，所以-1
		$lis.each(function(index) {
			if (index < days) {
				$(this).text(index + 1).data("day", index + 1);
			} else {
				$(this).text("").removeData("day");
			}
		});

	}


	jQuery.fn.extend({
		calendar: function(options) {
			var opts = $.extend({}, defaults, options);
			var $input = $(this);
			var offset = $input.offset();

			// 初始元素 
			$cWrap = $("<div class='" + opts.wrapClass + "'></div>");
			$cHead = $(
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
			$cmain = $("<div class='main'></div>");
			$cFoot = $("<div class='foot'></div>");

			// 填充日历格子，数量可控 
			var cellStr = cellBuilder(opts.cellSize);
			$cmain.html(cellStr);

			var handles = {
				show: function(ev) {
					$cWrap.fadeIn(200);
					fillCell($cmain, 2015, 7);
					return false;
				},
				hide: function() {
					$cWrap.fadeOut(200);
					return false;
				}
			}

			// 组合Calendar，并隐藏放到body下
			$cWrap.append($cHead, $cmain, $cFoot).hide().appendTo("body");
			// 设置日历的定位
			setPosi($cWrap, opts.x || offset.left, opts.y || offset.top + $input.outerHeight());



			// 事件绑定
			$input.on("click focus", handles.show);
			$(document).on("click", function(ev) {
				if (!$(ev.target).closest("." + opts.wrapClass).length) {
					handles.hide();
				}
			});
			$cWrap.on("click", ".day", function() {
				var day = $(this).data("day");
				console.log(day);
			});

		}
	});

});