import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DataContainerComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.http.get("https://localhost:5001/api/trainees").subscribe((data) => {
      console.log(data)
    });
  }

  ngOnInit() {
  }

}
