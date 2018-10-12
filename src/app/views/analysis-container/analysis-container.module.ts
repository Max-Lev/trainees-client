import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisContainerComponent } from './analysis-container.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AnalysisContainerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnalysisContainerComponent]
})
export class AnalysisContainerModule { }
