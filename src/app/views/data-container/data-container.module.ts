import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataContainerComponent } from './data-container.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
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
  ],
  declarations: [DataContainerComponent]
})
export class DataContainerModule { }
