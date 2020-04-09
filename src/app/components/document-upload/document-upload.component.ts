import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {KurzArbeitVoranmeldung, kurzArbeitVoranmeldung_is_DECLINED} from '../../model/api/KurzArbeitVoranmeldung';
import {Api} from '../../model/Api';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {MessageViewComponent} from '../message-view/message-view.component';
import {Message} from '../../model/api/Message';
import {MatTabChangeEvent} from '@angular/material';
import {KurzArbeitVoranmeldungService} from '../../services/kurzArbeitVoranmeldung/kurz-arbeit-voranmeldung.service';
import {SessionService} from '../../services/session/session.service';

const DOCUMENT_TAB_INDEX: number = 4;

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  @ViewChild('messageView') private messageView: MessageViewComponent;

  @Input()
  readonly: boolean;

  showMessagesTab = true;

  sanitizerVoranmeldungsPdf;
  sanitizerOrganigramPdf;

  @Output()
  getDocumentCreated = new EventEmitter<KurzArbeitVoranmeldung>();

  constructor(private session: SessionService,
              public kurzArbeitVoranmeldungService: KurzArbeitVoranmeldungService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (typeof this.session.kurzArbeitVoranmeldung.asPdf === 'string') {
      this.sanitizerVoranmeldungsPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.session.kurzArbeitVoranmeldung.asPdf);
    }
    if (typeof this.session.kurzArbeitVoranmeldung.organigramm === 'string') {
      this.sanitizerOrganigramPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.session.kurzArbeitVoranmeldung.organigramm);
    }
  }

  antragUpload(files: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload =  () => {
      this.session.kurzArbeitVoranmeldung.pdfName = files[0].name;
      this.session.kurzArbeitVoranmeldung.asPdf = reader.result;
      this.session.updateKurzArbeitVoranmeldung((item) => {
        if (typeof this.session.kurzArbeitVoranmeldung.asPdf === 'string') {
          this.sanitizerVoranmeldungsPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.session.kurzArbeitVoranmeldung.asPdf);
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
      this.session.kurzArbeitVoranmeldung.organigrammName = files[0].name;
      this.session.kurzArbeitVoranmeldung.organigramm = reader.result;
      this.session.updateKurzArbeitVoranmeldung((item) => {
        if (typeof this.session.kurzArbeitVoranmeldung.organigramm === 'string') {
          this.sanitizerOrganigramPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.session.kurzArbeitVoranmeldung.organigramm);
        }
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  test() {
    const {asPdf} = this.session.kurzArbeitVoranmeldung;
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
    this.getDocumentCreated.emit(this.session.kurzArbeitVoranmeldung);
  }

  newMessage() {
    this.messageView.reload();
  }

  setMessage($event: Message[]) {
    this.showMessagesTab = $event.length > 0;
  }

  tabChange($event: MatTabChangeEvent) {
    if ($event.index === DOCUMENT_TAB_INDEX) {
      this.messageView.setMessageReaded();
    }
  }

  is_DECLINED() {
    return kurzArbeitVoranmeldung_is_DECLINED(this.session.kurzArbeitVoranmeldung.status.id);
  }
}
