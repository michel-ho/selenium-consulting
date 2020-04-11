import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatStepperModule,
  MatRadioModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatTableModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatPaginatorIntl,
  MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE
} from '@angular/material';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KurzArbeitVoranmeldungListComponent } from './components/kurz-arbeit-voranmeldung-list/kurz-arbeit-voranmeldung-list.component';
import { AnfrageProgressComponent } from './components/anfrage-progress/anfrage-progress.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { CustomerViewComponent } from './components/customer-view/customer-view.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { MessageViewComponent } from './components/message-view/message-view.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import {CdkTableModule} from '@angular/cdk/table';
import { FragenComponent } from './components/fragen/fragen.component';
import { AbrechnungsformComponent } from './components/abrechnungsform/abrechnungsform.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import { StatisticChartComponent } from './components/statistic-chart/statistic-chart.component';
import {PaginationKurzarbeit} from './components/kurz-arbeit-voranmeldung-list/PaginationKurzarbeit';
import { KantonAuswahlComponent } from './components/kanton-auswahl/kanton-auswahl.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent,
    KurzArbeitVoranmeldungListComponent,
    AnfrageProgressComponent,
    DocumentUploadComponent,
    CustomerViewComponent,
    MessageViewComponent,
    MessageFormComponent,
    StatisticComponent,
    FragenComponent,
    AbrechnungsformComponent,
    StatisticChartComponent,
    KantonAuswahlComponent,
  ],
  imports: [
    ReactiveFormsModule,
    NgApexchartsModule,
    BrowserModule,
    MatInputModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatStepperModule,
    MatRadioModule,
    NgxExtendedPdfViewerModule,
    MatTabsModule,
    AngularFontAwesomeModule,
    MatCardModule,
    CdkTableModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory, // exported factory function needed for AoT compilation
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: PaginationKurzarbeit
    },
    {provide: MAT_DATE_LOCALE, useValue: 'de'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
