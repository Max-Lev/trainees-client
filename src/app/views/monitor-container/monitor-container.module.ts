import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorContainerComponent } from './monitor-container.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: MonitorContainerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonitorContainerComponent]
})
export class MonitorContainerModule { }
