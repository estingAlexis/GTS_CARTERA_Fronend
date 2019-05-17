import { Directive, OnInit, Input, ElementRef } from "@angular/core";
import "bootstrap-progressbar/bootstrap-progressbar.min.js";
declare var $: any;
@Directive({
  selector: "[saProgressbar]"
})
export class ProgressbarDirective implements OnInit {
  @Input() saProgressbar: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    $(this.el.nativeElement).progressbar(
      this.saProgressbar || {
        display_text: "fill"
      }
    );
  }
}
