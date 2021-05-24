class aoFocus {
    focusEl: HTMLElement | null | undefined;
    focusableElments: NodeListOf<Element> | undefined;
    excludeElements: string[] | undefined;
    focusableArr: string[] | undefined;
    firstElm: HTMLElement | undefined;
    lastElm: HTMLElement | undefined;

    constructor(el: string) {
        this.focusEl = <HTMLElement | undefined>document.querySelector(el);
        this.initiateFocus();
    }

    clearFocus() {
        this.focusEl?.removeEventListener('keydown', this.keyDownListener, true);
    }

    addExcludeElements(arr: string[]) {
        this.excludeElements = arr;
    }

    keyDownListener = (e: KeyboardEvent) => {
        let KEY_TAB = "Tab", KEY_ESC = "Escape";
        const BackwardTAB = () => {
            if (document.activeElement == this.firstElm) {
                e.preventDefault();
                this.lastElm?.focus();
            }
        }
        const ForwardTAB = () => {
            if (document.activeElement == this.lastElm) {
                e.preventDefault();
                this.firstElm?.focus();
            }
        }
        switch (e.key) {
            case KEY_TAB:
                if (this.focusableElments?.length == 1) {
                    e.preventDefault();
                    break;
                }
                if (e.shiftKey) {
                    BackwardTAB();
                } else {
                    ForwardTAB();
                }
                break;
            case KEY_ESC:
                this.clearFocus();
                break;
            default:
                break;
        }

    }

    initiateFocus() {
        let notIn = (arr: string[]) => {
            return function (item: string) {
                return arr.indexOf(item) < 0;
            }
        }
        this.focusableElments = this.focusEl?.querySelectorAll('a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"],iframe, embed');
        let excludeElements = this.focusEl?.querySelectorAll('[aria-hidden="true"], [aria-hidden="true"] *');
        let excludeArr = Array.prototype.slice.call(excludeElements);
        if (this.excludeElements?.length) {
            excludeArr = [...this.excludeElements];
        }
        let focusableArr = Array.prototype.slice.call(this.focusableElments);
        focusableArr = focusableArr.filter(notIn(excludeArr));
        this.firstElm = <HTMLElement><unknown>focusableArr[0];
        this.lastElm = <HTMLElement><unknown>focusableArr[focusableArr.length - 1];
        this.focusEl?.addEventListener('keydown', this.keyDownListener, true);
        setTimeout(() => { this.firstElm?.focus() }, 500)
    }


}
