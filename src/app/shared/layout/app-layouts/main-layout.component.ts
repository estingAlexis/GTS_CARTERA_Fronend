import { Component, OnInit } from "@angular/core";
import { routerTransition } from "@app/shared/utils/animations";
import { SnotifyService } from "ng-snotify";
import { LayoutService } from "@app/core/services";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styles: [],
  animations: [routerTransition]
})
export class MainLayoutComponent implements OnInit {
  constructor(
    private snotifyService: SnotifyService,
    private _LayoutService: LayoutService) {}

  ngOnInit() {
    this.onMenuOnTop();
    // this.snotifyService.success('Correctamente', 'Actualizado');
  }

  onMenuOnTop() {
    this._LayoutService.onMenuOnTop()
  }

  getState(outlet) {
    if(!outlet.activatedRoute) return;
    let ss = outlet.activatedRoute.snapshot;

    // return unique string that is used as state identifier in router animation
    return (
      outlet.activatedRouteData.state ||
      (ss.url.length
        ? ss.url[0].path
        : ss.parent.url.length
          ? ss.parent.url[0].path
          : null)
    );
  }
}
