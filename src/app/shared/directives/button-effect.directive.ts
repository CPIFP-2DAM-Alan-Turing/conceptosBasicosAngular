import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appButtonEffect]'
})
export class ButtonEffectDirective {

    constructor(private el: ElementRef) {
        this.unsetEffect();
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.setEffect();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.unsetEffect();
    }

    private setEffect() {
        this.el.nativeElement.classList.add('effect');
    }

    private unsetEffect() {
        this.el.nativeElement.classList.remove('effect');
    }

}
