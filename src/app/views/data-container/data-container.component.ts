import { Component, OnInit, AfterViewInit } from '@angular/core';
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
      this.traineesDataSource = trainees.map(trainee => Object.assign({}, trainee));
    });
  };


}
