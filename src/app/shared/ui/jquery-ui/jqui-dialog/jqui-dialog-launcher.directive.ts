import {Directive, HostListener, ElementRef, Input} from '@angular/core';
declare var $: any;
@Directive({
  selector: '[saJquiDialogLauncher]'
})
export class JquiDialogLauncher {
  @Input() saJquiDialogLauncher: any;

  @HostListener('click', ['$event']) onClick(e) {
    $( this.saJquiDialogLauncher ).dialog( "open" );
  }

  constructor(private el: ElementRef) { }

}
