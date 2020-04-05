import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Costumer} from '../../../api/Costumer';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Api} from '../../../api/api';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {MessageViewComponent} from '../message-view/message-view.component';
import {Message} from '../../../api/Messages';


@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  @ViewChild('messageView') private messageView: MessageViewComponent;

  @Input()
  costumer$: Costumer;

  @Input()
  costumerView: Boolean = false;

  @Input()
  voranmeldung$: KurzArbeitVoranmeldung;

  @Input()
  readonly : boolean;

  showForm: boolean;

  sanitizerVoranmeldungsPdf;
  sanitizerOrganigramPdf;

  @Output()
  getDocumentCreated = new EventEmitter<KurzArbeitVoranmeldung>();
  messagesExist: false;

  constructor(private http: HttpClient,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (typeof this.voranmeldung$.asPdf === 'string') {
      this.sanitizerVoranmeldungsPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.voranmeldung$.asPdf);
    }
    if (typeof this.voranmeldung$.organigramm === 'string') {
      this.sanitizerOrganigramPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.voranmeldung$.organigramm);
    }
  }

  antragUpload(files: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload =  () => {
      this.voranmeldung$.pdfName = files[0].name;
      this.voranmeldung$.asPdf = reader.result;
      this.http.put<KurzArbeitVoranmeldung>(Api.API + Api.KURZARBEIT_VORANMELDUNG+"/"+this.voranmeldung$.id, this.voranmeldung$).subscribe(anfrage => {
        if (typeof this.voranmeldung$.organigramm === 'string') {
          this.sanitizerOrganigramPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.voranmeldung$.organigramm);
        }
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  organigramUpload(files: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload =  () => {
      this.voranmeldung$.organigrammName = files[0].name;
      this.voranmeldung$.organigramm = reader.result;
      this.http.put<KurzArbeitVoranmeldung>(Api.API + Api.KURZARBEIT_VORANMELDUNG+"/"+this.voranmeldung$.id, this.voranmeldung$).subscribe(anfrage => {
        if (typeof this.voranmeldung$.organigramm === 'string') {
          this.sanitizerOrganigramPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.voranmeldung$.organigramm);
        }
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  test() {
    const {asPdf} = this.voranmeldung$;
    // @ts-ignore
    window.open(asPdf, '_blank');
  }

  openUploadVoranmeldung() {
    document.getElementById('voranmeldungFileInput').click();
  }

  openUploadOrganigram() {
    document.getElementById('organigrammFileInput').click();
  }

  abschlussDocumentUpload() {
    this.getDocumentCreated.emit(this.voranmeldung$);
  }

  newMessage() {
    this.messageView.reload();
  }

  setMessage($event: Message[]) {
    this.showForm = $event.length > 0;
  }
}
