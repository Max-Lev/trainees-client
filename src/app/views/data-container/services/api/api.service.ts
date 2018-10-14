import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';
import { TraineesModel } from 'src/app/models/trainees.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  };

  getTrainees(): Observable<TraineesModel[]> {

    const traineesDataSource: TraineesModel[] = [];

    return Observable.create((obs: Observer<TraineesModel[]>) => {

      this.http.get(environment.apiUrl).subscribe((trainees: TraineesModel[]) => {

        trainees.map((trainee) => { traineesDataSource.push(new TraineesModel(trainee)); });

        obs.next(traineesDataSource);

        return trainees;

      }, (err) => {
        obs.error(err);
        throw new Error(err);
      });
    });
  };

  getID(): Observable<any> {

    return Observable.create((obs: Observer<any>) => {

      this.http.get(`${environment.apiUrl}/GetID`).subscribe((response: any) => {

        obs.next(response);

        return response;

      }, (err) => {
        obs.error(err);
        throw new Error(err);
      });
    });

  };

  saveTrainee(trainee: TraineesModel): Observable<TraineesModel[]> {

    return Observable.create((obs) => {

      this.http.post(`${environment.apiUrl}/Save`, { ...trainee }).subscribe((response) => {

        console.log('saveTrainee response: ', response);

        obs.next(response);

        return response;

      });

    });
    
  };

}
