class aoDialog {
    dialogEl: HTMLElement | null | undefined;
    focusableElments: NodeListOf<Element> | undefined;
    excludeElements: NodeListOf<Element> | undefined;
    focusableArr: string[] | undefined;
    firstElm: HTMLElement | undefined;
    lastElm: HTMLElement | undefined;
    

    constructor(el: string) {        
        this.dialogEl = <HTMLElement | undefined>document.querySelector(el);
        this.initiateDialog();
    }

    notIn(arr:string[]){
        return function(item:string){
            return arr.indexOf(item) < 0;
        }
    }

    closeDialog() {        
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
        this.focusableElments = this.dialogEl?.querySelectorAll('a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"],iframe, embed');
        this.excludeElements = this.dialogEl?.querySelectorAll('[aria-hidden="true"], [aria-hidden="true"] *');
        let excludeArr = Array.prototype.slice.call(this.excludeElements);
        let focusableArr = Array.prototype.slice.call(this.focusableElments);
        focusableArr = focusableArr.filter(this.notIn(excludeArr));
        this.firstElm = <HTMLElement><unknown> focusableArr[0];
        this.lastElm = <HTMLElement><unknown> focusableArr[focusableArr.length - 1];
        this.dialogEl?.addEventListener('keydown', this.keyDownListener ,true);

        setTimeout(()=>{this.firstElm?.focus()},500)
    }


}
