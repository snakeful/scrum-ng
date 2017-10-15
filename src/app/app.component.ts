import { Component } from '@angular/core';
import { polyfill } from 'mobile-drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _title = 'FUL-SCRUM App';
  private _options: any = {
    timeOut: 2000,
    preventDuplicates: true
  };
  constructor() {
    polyfill({}); // Drag and Drop for mobile devices.
  }

  get title(): string {
    return this._title;
  }

  get options(): any {
    return this._options;
  }
}
