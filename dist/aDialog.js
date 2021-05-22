"use strict";
function aDialog(el) {
    var dialogEl = document.querySelector(el);
    var focusableEls = dialogEl && dialogEl.querySelectorAll('a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"], iframe, embed');
    var focusableArr = Array.prototype.slice.call(focusableEls);
    var firstElm = focusableArr[0];
    var lastElm = focusableArr[focusableArr.length - 1];
    function notIn(array) {
        return function (item) {
            return array.indexOf(item) < 0;
        };
    }
    setTimeout(function () {
        firstElm.focus();
    }, 500);
    function closeDialog(el) {
        el.onkeydown = null;
        dialogEl = null;
    }
    dialogEl === null || dialogEl === void 0 ? void 0 : dialogEl.addEventListener('keydown', function (e) {
        var KEY_TAB = 9, KEY_ESC = 27;
        function BackwardTAB() {
            if (document.activeElement == firstElm) {
                e.preventDefault();
                lastElm.focus();
            }
        }
        function ForwardTAB() {
            if (document.activeElement == lastElm) {
                e.preventDefault();
                firstElm.focus();
            }
        }
        switch (e.keyCode) {
            case KEY_TAB:
                if (focusableEls && focusableEls.length == 1) {
                    e.preventDefault();
                    break;
                }
                if (e.shiftKey) {
                    BackwardTAB();
                }
                else {
                    ForwardTAB();
                }
                break;
            case KEY_ESC:
                closeDialog(dialogEl);
                break;
            default:
                break;
        }
    });
}
