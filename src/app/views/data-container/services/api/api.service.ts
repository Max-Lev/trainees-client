import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TraineesModel } from 'src/app/models/trainees.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  traineesDataSource: TraineesModel[] = [];

  constructor(private http: HttpClient) {

  };

  getTrainees(): Observable<TraineesModel[]> {

    return Observable.create((obs) => {

      this.http.get(environment.apiUrl).subscribe((trainees: TraineesModel[]) => {
        trainees.map((trainee) => {
          this.traineesDataSource.push(new TraineesModel(trainee));
        });

        obs.next(this.traineesDataSource);
        return trainees;

      }, (err) => {
        throw new Error(err);
      });

    });

  };

}
