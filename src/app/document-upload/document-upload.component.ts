import {Component, Input, OnInit} from '@angular/core';
import {Costumer} from '../../../api/Costumer';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Api} from '../../../api/api';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  @Input()
  costumer$: Costumer;

  @Input()
  voranmeldung$: KurzArbeitVoranmeldung;

  sanitizerVoranmeldungsPdf;
  sanitizerOrganigramPdf;

  constructor(private http: HttpClient,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sanitizerVoranmeldungsPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.voranmeldung$.asPdf+"#view=fit&toolbar=0&navpanes=0");
    this.sanitizerOrganigramPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.voranmeldung$.organigramm+"#view=fit&toolbar=0&navpanes=0");
  }

  antragUpload(files: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload =  () => {
      this.voranmeldung$.asPdf = reader.result;
      this.http.put<KurzArbeitVoranmeldung>(Api.KURZARBEIT_VORANMELDUNG+"/"+this.voranmeldung$.id, this.voranmeldung$).subscribe(anfrage => {
        console.log("work");
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  organigramUpload(files: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload =  () => {
      this.voranmeldung$.organigramm = reader.result;
      this.http.put<KurzArbeitVoranmeldung>(Api.KURZARBEIT_VORANMELDUNG+"/"+this.voranmeldung$.id, this.voranmeldung$).subscribe(anfrage => {
        console.log("work");
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  test() {
    window.open(this.voranmeldung$.asPdf, '_blank');
  }
}
