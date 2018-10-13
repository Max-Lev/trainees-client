import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs';
import { RouterLinkActive } from '@angular/router';

export interface ExampleTab {
  path: string;
  label: string;
  isActive: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  asyncTabs: Observable<ExampleTab[]>;

  constructor() {
    this.asyncTabs = Observable.create((observer: Observer<ExampleTab[]>) => {
      observer.next([
        { path: '', label: 'Data', isActive: false },
        { path: 'analysis', label: 'Analysis', isActive: false },
        { path: 'monitor', label: 'Monitor', isActive: false },
      ]);
    });
  };

  ngAfterViewInit(): void {

  };


}
