import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet> <ng-snotify></ng-snotify>',
})
export class AppComponent {
  title = 'sar';
}
