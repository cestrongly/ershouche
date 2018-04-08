'use strict';
import './../../widget/base/index.scss'
import './../../widget/header/index.scss'
import './../../widget/filter/index.scss'
import './../../widget/infolist/index.scss'
import './../../asset/iconfont/iconfont.css'
import './index.scss'

import $ from './../../asset/js/jquery-3.2.1.min'
import filter from './../../widget/filter/index.js'

let Page = function () {
    let isAddStickyStyle = false;
    let isRemoveStickyStyle = false;
    let _page = {
        init: function () {
            this.onScorll();
            this.setSticky();
            filter.init();
        },
        setSticky: function () {
            let scrollTop = $(document).scrollTop();
            if (scrollTop > 99) {
                if (!isAddStickyStyle) {
                    isAddStickyStyle = true;
                    isRemoveStickyStyle = false;
                    $('.js_container').addClass('filter-fixed');
                    let _animate = $('.js_container').find('.js_filter');
                    _animate.addClass('animate');
                    setTimeout(function () {
                        _animate.removeClass('animate');
                    }, 100);
                }
            } else {
                if (!isRemoveStickyStyle) {
                    $('.js_container').removeClass('filter-fixed');
                    isAddStickyStyle = false;
                    isRemoveStickyStyle = true;
                }
            }
        },
        onScorll: function () {
            var self = this;
            $(document).scroll(function (e) {
                self.setSticky();
            });
        }

    };

    return {
        init: _page.init.bind(_page)
    }
}();

$(function () {
    Page.init();
});
