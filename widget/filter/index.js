'use strict';

import $ from './../../asset/js/jquery-3.2.1.min.js'
import IScroll from './../../asset/js/iscroll/build/iscroll.js'

// const addEvent = (function (window, undefined) {
//   var _eventCompat = function (event) {
//     var type = event.type;
//     if (type == 'DOMMouseScroll' || type == 'mousewheel') {
//       event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
//     }
//     //alert(event.delta);
//     if (event.srcElement && !event.target) {
//       event.target = event.srcElement;
//     }
//     if (!event.preventDefault && event.returnValue !== undefined) {
//       event.preventDefault = function () {
//         event.returnValue = false;
//       };
//     }
//     /* 
//        ......其他一些兼容性处理 */
//     return event;
//   };
//   if (window.addEventListener) {
//     return function (el, type, fn, capture) {
//       if (type === "mousewheel" && document.mozFullScreen !== undefined) {
//         type = "DOMMouseScroll";
//       }
//       el.addEventListener(type, function (event) {
//         fn.call(this, _eventCompat(event));
//       }, capture || false);
//     }
//   } else if (window.attachEvent) {
//     return function (el, type, fn, capture) {
//       el.attachEvent("on" + type, function (event) {
//         event = event || window.event;
//         fn.call(el, _eventCompat(event));
//       });
//     }
//   }
//   return function () { };
// })(window);


const disabledMouseWheel = function () {
  if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
  }//W3C  
  window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome  
}

const scrollFunc = function(evt) {
  evt = evt || window.event;
  if (evt.preventDefault) {
    // Firefox  
    evt.preventDefault();
    evt.stopPropagation();
  } else {
    // IE  
    evt.cancelBubble = true;
    evt.returnValue = false;
  }
  return false;
}

let filter = function () {
  var scrollOptions = {};
  var myScroll_1 = new IScroll('#scroll-inner-1', scrollOptions);
  var myScroll_2 = new IScroll('#scroll-inner-2', scrollOptions);
  var myScroll_3 = new IScroll('#scroll-inner-3', scrollOptions);
  var myScroll_4 = new IScroll('#scroll-inner-4', scrollOptions);

  var _ = {

    init: function () {
      var self = this;
      self.filter();
      self.pageEvent();
    },

    /**
     * 滚动
     */
    scrollRefresh: function () {
      myScroll_1.refresh();
      myScroll_2.refresh();
      myScroll_3.refresh();
      myScroll_4.refresh();
    },

    /**
     * 筛选
     */
    filter: function () {
      var self = this;
      $('.js_filter').on('click', function (e) {
        // 禁用默认事件 滑动
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        // 禁用鼠标滚动事件
        // disabledMouseWheel();
        document.addEventListener('mousewheel', function (e) { e.preventDefault(); }, false);

        $('#mask').show();
        $('.js_container').addClass('filter-fixed');

        var filter = this;
        // 点击目标
        var tag = e.target;
        item = $(tag).closest('.js_nav_filter')
          .find('li').removeClass('active');
        // 找到导航项
        var item = $(tag).closest('.js_nav_filter li');
        // 导航对应的索引
        var index = item.index();

        // 激活当前导航
        item.addClass('active');
        // $(this).find('.js_con-filter').children(".js_con-filter-wrapper").addClass('hide');
        var conFilter = $(this).find('.js_con-filter').children(".js_con-filter-wrapper")[index];
        $(conFilter).removeClass('hide').siblings().addClass('hide')

        self.scrollRefresh();
      })
    },

    /**
     * 页面事件
     */
    pageEvent: function () {
      var self = this;
      $('#mask').on('click', function (e) {
        var mask = this;
        $('.js_con-filter-wrapper').addClass('hide');
        $('.js_nav_filter').find('li').removeClass('active');
        $(mask).hide();

        // 恢复默认事件 滑动
        document.addEventListener('touchmove', function (e) {
          e.returnValue = true;
        }, false);
        // 恢复默认事件 鼠标滚动
        document.addEventListener('mousewheel', function (e) {
          e.returnValue = true;
       }, false);
      });
    }
  }
  return _;
}();

module.exports = filter;