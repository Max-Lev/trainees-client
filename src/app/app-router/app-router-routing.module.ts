import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: 'src/app/views/data-container/data-container.module#DataContainerModule'
  },
  {
    path: 'analysis', loadChildren: 'src/app/views/analysis-container/analysis-container.module#AnalysisContainerModule'
  },
  {
    path: 'monitor', loadChildren: 'src/app/views/monitor-container/monitor-container.module#MonitorContainerModule'
  },
  {
    path: '', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterRoutingModule { }
