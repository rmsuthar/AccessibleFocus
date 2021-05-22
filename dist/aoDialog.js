"use strict";
var aoDialog = /** @class */ (function () {
    function aoDialog(el) {
        var _this = this;
        this.keyDownListener = function (e) {
            var _a;
            var KEY_TAB = "Tab", KEY_ESC = "Escape";
            var BackwardTAB = function () {
                var _a;
                if (document.activeElement == _this.firstElm) {
                    e.preventDefault();
                    (_a = _this.lastElm) === null || _a === void 0 ? void 0 : _a.focus();
                }
            };
            var ForwardTAB = function () {
                var _a;
                if (document.activeElement == _this.lastElm) {
                    e.preventDefault();
                    (_a = _this.firstElm) === null || _a === void 0 ? void 0 : _a.focus();
                }
            };
            switch (e.key) {
                case KEY_TAB:
                    if (((_a = _this.focusableElments) === null || _a === void 0 ? void 0 : _a.length) == 1) {
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
                    _this.closeDialog();
                    break;
                default:
                    break;
            }
        };
        this.el = el;
        this.dialogEl = document.querySelector(el);
        this.initiateDialog();
    }
    aoDialog.prototype.closeDialog = function () {
        var _a;
        //this.dialogEl?.removeEventListener('keydown',(e:KeyboardEvent)=>{},true);
        (_a = this.dialogEl) === null || _a === void 0 ? void 0 : _a.removeEventListener('keydown', this.keyDownListener, true);
    };
    aoDialog.prototype.initiateDialog = function () {
        var _a, _b;
        this.focusableElments = (_a = this.dialogEl) === null || _a === void 0 ? void 0 : _a.querySelectorAll('a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"], iframe, embed');
        this.focusableArr = Array.prototype.slice.call(this.focusableElments);
        this.firstElm = this.focusableArr[0];
        this.lastElm = this.focusableArr[this.focusableArr.length - 1];
        (_b = this.dialogEl) === null || _b === void 0 ? void 0 : _b.addEventListener('keydown', this.keyDownListener, true);
    };
    return aoDialog;
}());
