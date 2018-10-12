import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { TraineesModel } from 'src/app/models/trainees.model';

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss']
})
export class DataContainerComponent implements OnInit, AfterViewInit {

  traineesDataSource: TraineesModel[] = [];

  constructor(private apiService: ApiService) {

  };

  ngOnInit() {
    this.getTrainees();
  };

  ngAfterViewInit(): void {

  };

  getTrainees() {
    this.apiService.getTrainees().subscribe((trainees: TraineesModel[]) => {
      console.log(trainees);
      this.traineesDataSource = Object.assign({}, ...trainees);
    });
  };


}
