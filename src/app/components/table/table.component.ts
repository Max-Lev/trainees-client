import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, OnChanges, SimpleChanges, Input, ChangeDetectorRef } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { TraineesModel } from 'src/app/models/trainees.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {

  displayedColumns: string[] = ['Id', 'Name', 'Date', 'Grade', 'Subject'];

  @Input() traineesDataSource: TraineesModel[] = [];

  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private ref: ChangeDetectorRef) { };

  ngOnInit() { };

  ngAfterViewInit(): void {
    this.getSortState();
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.traineesDataSource);
    this.dataSource.sort = this.sort;
  };


  applyFilter(filterValue: string) {
    this.filterById(filterValue);
  };

  filterById(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    const list = this.traineesDataSource.filter((filterItem: TraineesModel) => {
      if (filterItem.Id === Number(filterValue)) {
        return filterItem;
      }
      else if (filterValue === "" || filterValue.length === 0 || null || undefined) {
        return filterItem;
      }
    });
    this.dataSource = new MatTableDataSource(list);
  };

  getSortState() {
    this.sort.sortChange.subscribe((state) => {
      console.log(state)
    });
  };

}
