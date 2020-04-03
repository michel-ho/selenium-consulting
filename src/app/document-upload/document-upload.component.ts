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

  constructor(private http: HttpClient,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sanitizerVoranmeldungsPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.voranmeldung$.asPdf);

    console.log(this.voranmeldung$.asPdf);
    console.log(this.sanitizerVoranmeldungsPdf);
  }

  antragUpload(files: FileList) {
    this.saveAsBase64(files[0], this.voranmeldung$.asPdf);
  }
  organigramUpload(files: FileList) {
    this.saveAsBase64(files[0], this.voranmeldung$.organigramm);
  }

  saveAsBase64(file, target: string | ArrayBuffer ) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =  () => {
      target = reader.result;
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
