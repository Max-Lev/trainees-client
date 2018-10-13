import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataContainerComponent } from './data-container.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule, MatInputModule, MatButtonModule, MatSortModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from 'src/app/components/table/table.component';
import { ApiService } from './services/api/api.service';
import { UtilService } from './services/util.service';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '', component: DataContainerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    FormsModule
  ],
  declarations: [
    DataContainerComponent,
    TableComponent
  ],
  providers: [
    ApiService,
    UtilService
  ]
})
export class DataContainerModule { }
