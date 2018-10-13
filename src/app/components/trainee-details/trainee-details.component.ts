import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TraineesModel } from 'src/app/models/trainees.model';

@Component({
  selector: 'app-trainee-details',
  templateUrl: './trainee-details.component.html',
  styleUrls: ['./trainee-details.component.scss']
})
export class TraineeDetailsComponent implements OnInit, OnChanges {

  @Input() traineeDetails: TraineesModel;

  constructor() { }

  ngOnInit() {

  };

  ngOnChanges(): void {
    // console.log(this.traineeDetails)
  };

}
