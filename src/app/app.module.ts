import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatStepperModule,
  MatRadioModule, MatInputModule, MatTabsModule
} from '@angular/material';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { KurzArbeitVoranmeldungListComponent } from './kurz-arbeit-voranmeldung-list/kurz-arbeit-voranmeldung-list.component';
import { AnfrageProgressComponent } from './anfrage-progress/anfrage-progress.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {AngularFontAwesomeModule} from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent,
    KurzArbeitVoranmeldungListComponent,
    AnfrageProgressComponent,
    DocumentUploadComponent,
    CustomerViewComponent
  ],
  imports: [
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
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
