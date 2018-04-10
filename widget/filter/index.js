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

const scrollFunc = function (evt) {
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
  // 类型
  var myScroll_1 = new IScroll('#scroll-inner-1', scrollOptions),
    // 品牌
    myScroll_2 = new IScroll('#scroll-inner-2', scrollOptions),
    // 价格
    myScroll_3 = new IScroll('#scroll-inner-3', scrollOptions),
    // 更多
    myScroll_4 = new IScroll('#scroll-inner-4', scrollOptions),

    // 更多
    myScroll_4_1 = new IScroll('#scroll-inner-4-1', scrollOptions),

    // 更多
    myScroll_4_2 = new IScroll('#scroll-inner-4-2', scrollOptions),

    // 更多
    myScroll_4_3 = new IScroll('#scroll-inner-4-3', scrollOptions),

    // 更多
    myScroll_4_4 = new IScroll('#scroll-inner-4-4', scrollOptions);

  let isShowHotBrandList = false;

  var _ = {

    init: function () {
      var self = this;
      self.filter();
      self.pageEvent();
      this.letterBoxTouchMove();
      this.hotBrandClick();
      self.moreChoiceClick();
      self.filterMoreContentClick();
      self.filterMoreContentBack();
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
        $('html').addClass('show-mask');
        // $('.js_container').addClass('filter-fixed');
        $(this).css({
          'position': 'fixed',
          'top': '0'
        });

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
        var conFilter = $(this).find('.js_con-filter').children('.js_con-filter-wrapper')[index];
        $(conFilter).removeClass('hide').siblings('.js_con-filter-wrapper').addClass('hide')

        self.scrollRefresh();
      })
    },

    /**
     * 滑动字母索引
     */
    letterBoxTouchMove: function () {
      $('.js_con-filter').on('touchmove', '.js_letter_list', function (e) {
        let letterList = $('.js_container').find('.js_letter_list')[0];
        letterList.addEventListener('touchmove', function (e) {
          e.returnValue = true;
        }, false);
        // e.cancelBubble = true;
        // e.stopPropagation();
        // e.preventDefault();

        // 禁用默认事件 滑动
        // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        // 禁用鼠标滚动事件
        // disabledMouseWheel();
        // document.addEventListener('mousewheel', function (e) { e.preventDefault(); }, false);

        $(this).css({ 'background': 'rgb(238,238,238)' });
        // let letter = $(e.target).text();
        let moveEndX = e.originalEvent.changedTouches[0].clientX,
          moveEndY = e.originalEvent.changedTouches[0].clientY;
        let index = parseInt((moveEndY - 48) / 13.88);
        let letter_text = $(this).find('li').eq(index).text();
        let selector = '#letter_' + (letter_text === '#' ? '0' : letter_text.toLowerCase());
        myScroll_2.scrollToElement(selector, null, true, -48, null);
      });

      $('.js_con-filter').on('touchend', '.js_letter_list', function (e) {
        $(this).css({ 'background': '#fff' });
      });
    },

    /**
     * 热门品牌点击
     */
    hotBrandClick: function () {
      let self = this;
      $('.js_container').on('click touchend', '.js_hot_brand .title', function (e) {
        if (!isShowHotBrandList) {
          isShowHotBrandList = true;
          $(this).next().show();
          $(this).addClass('show');
        } else {
          isShowHotBrandList = false;
          $(this).next().hide();
          $(this).removeClass('show');
        }
      })
    },

    /**
     * 更多筛选
     */
    moreChoiceClick: function () {
      var self = this;
      $('.js_container').on('click', '#filter-more li', function (e) {
        if ($(this).hasClass('filter_more-item-type1')) {
          if($(e.target).hasClass('choice-box')) {
            $(e.target).addClass('choice-box-active').siblings().removeClass('choice-box-active');
          }
        } else {
          var moreTargetIDSelector = '#' + $(this).find('a').data('click-from');
          $(moreTargetIDSelector).removeClass('hide').animate({ 'left': '0' }, 300);
          $('.js_container').find('#filter-more').animate({ 'left': '-100%' }, 300);
        }
      });
    },

    /**
     * 更多筛选 内容
     */
    filterMoreContentClick: function () {
      var self = this;
      $('.js_container').on('click', '.js_filter-more-content li', function (e) {
        $(this).addClass('selected').siblings().removeClass('selected');
        var selectedText = $(this).text();
        var targetSelector = $(this).closest('.js_filter-more-content').attr('id');
        $('.js_container').find('#filter-more [data-click-from=' + targetSelector +'] .choice').text(selectedText);
        $('.js_container').find('#filter-more').animate({ 'left': '0' }, 300);
        $(this).closest('.js_filter-more-content').animate({'left':'100%'},300);
      })
    },
    filterMoreContentBack: function () {
      $('.js_container').on('click', '.js_filter-more-content .btn-back-wrapper a', function (e) {
        $('.js_container').find('#filter-more').animate({ 'left': '0' }, 300);
        $(this).closest('.js_filter-more-content').animate({'left':'100%'},300);
      });
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
        $('html').removeClass('show-mask');

        $('.js_filter').attr('style', '');

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