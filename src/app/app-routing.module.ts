import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Form} from '@angular/forms/src/directives/form_interface';
import {FormComponent} from './components/form/form.component';
import {HomeComponent} from './components/home/home.component';
import {AnfrageProgressComponent} from './components/anfrage-progress/anfrage-progress.component';
import {KurzArbeitVoranmeldung} from './model/api/KurzArbeitVoranmeldung';
import {Costumer} from './model/api/Costumer';
import {CustomerViewComponent} from './components/customer-view/customer-view.component';
import {StatisticComponent} from './components/statistic/statistic.component';

const routes: Routes = [
  { path: 'anfrage', component: AnfrageProgressComponent},
  { path: 'anfrage/:id', component: AnfrageProgressComponent},
  { path: 'costumer', component: CustomerViewComponent},
  { path: 'statistic', component: StatisticComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
