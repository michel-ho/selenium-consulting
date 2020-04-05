import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Form} from '@angular/forms/src/directives/form_interface';
import {FormComponent} from './form/form.component';
import {HomeComponent} from './home/home.component';
import {AnfrageProgressComponent} from './anfrage-progress/anfrage-progress.component';
import {KurzArbeitVoranmeldung} from '../../api/kurzArbeitVoranmeldung';
import {Costumer} from '../../api/Costumer';
import {CustomerViewComponent} from './customer-view/customer-view.component';
import {StatisticComponent} from './statistic/statistic.component';

const routes: Routes = [
  { path: 'anfrage', component: AnfrageProgressComponent},
  { path: 'anfrage/:id', component: AnfrageProgressComponent},
  { path: 'costumer', component: CustomerViewComponent},
  { path: 'statistic', component: StatisticComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
