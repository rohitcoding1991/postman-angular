import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SimpleHttpComponent } from './screens/simple-http/simple-http.component';
import { ScheduleComponent } from './screens/schedule/schedule.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
     {
        path: '',
        component: SimpleHttpComponent
      },
        {
            path: 'schedule',
            component: ScheduleComponent
        }
    ]
  },
  /*{
    path: 'not-found',
    component: NotFoundComponent,
    data: {message: 'Sorry, an error has occured, Requested page not found!'}
  },*/
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
