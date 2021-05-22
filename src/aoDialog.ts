class aoDialog {
    dialogEl: HTMLElement | null | undefined;
    focusableElments: NodeListOf<Element> | undefined;
    focusableArr: string[] | undefined;
    firstElm: HTMLElement | undefined;
    lastElm: HTMLElement | undefined;
    el: string | undefined | null;
    

    constructor(el: string) {
        this.el = el;
        this.dialogEl = <HTMLElement | undefined>document.querySelector(el);
        this.initiateDialog();
    }


    closeDialog() {
        //this.dialogEl?.removeEventListener('keydown',(e:KeyboardEvent)=>{},true);
        this.dialogEl?.removeEventListener('keydown', this.keyDownListener ,true);
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
                this.closeDialog();
                break;
            default:
                break;
        }

    }

    initiateDialog() {
        this.focusableElments = this.dialogEl?.querySelectorAll('a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"], iframe, embed');
        this.focusableArr = Array.prototype.slice.call(this.focusableElments);
        this.firstElm = <HTMLElement><unknown>this.focusableArr[0];
        this.lastElm = <HTMLElement><unknown>this.focusableArr[this.focusableArr.length - 1];

        this.dialogEl?.addEventListener('keydown', this.keyDownListener ,true);
    }


}
