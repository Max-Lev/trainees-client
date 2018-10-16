import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppState } from './reducers';
import { Store } from '@ngrx/store';


export interface NvLinks {
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

  asyncTabs: Observable<NvLinks[]>;

  constructor(private store: Store<AppState>) {
    this.asyncTabs = Observable.create((observer: Observer<NvLinks[]>) => {
      observer.next([
        { path: '', label: 'Data', isActive: false },
        { path: 'analysis', label: 'Analysis', isActive: false },
        { path: 'monitor', label: 'Monitor', isActive: false },
      ]);
    });
  };

  ngAfterViewInit(): void {

  };

  linkActive(link: ActivatedRoute) {
    
  }

}
