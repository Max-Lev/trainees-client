import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TraineesModel } from 'src/app/models/trainees.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { };

  filterById(filterValue: string, traineesDataSource: TraineesModel[]): MatTableDataSource<TraineesModel> {

    let list = [];

    if (traineesDataSource.length !== 0) {
      list = traineesDataSource.filter((filterItem: TraineesModel) => {
        if (filterItem.id === Number(filterValue)) {
          return filterItem;
        }
        else if (filterValue === "" || undefined) {
          return filterItem;
        }
      });
    };

    const dataSource = new MatTableDataSource(list);
    return dataSource;
  };


}
