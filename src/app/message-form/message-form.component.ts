import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../../../api/Messages';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Costumer} from '../../../api/Costumer';
import {Api} from '../../../api/api';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {
  message = new Message();

  successFullsended = false;

  @Input()
  voranmeldung: KurzArbeitVoranmeldung;

  @Input()
  costumerView: Boolean = false;

  @Output() getMessageSendet = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  send() {
    this.message.voranmeldungId = this.voranmeldung.id;
    this.message.toCostumer = !this.costumerView;
    this.http.post<Message>(Api.MESSAGE, this.message).subscribe(
      message => {
        this.message = new Message();
        this.successFullsended = true;
        this.getMessageSendet.emit(true);
        setTimeout(() => {
          this.successFullsended = false; }, 5000);
      } ,
      err => console.error('Message post fail: ' + err));
  }

  anhangUpload(files: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload =  () => {
      this.message.anhangName = files[0].name;
      this.message.anhang = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  openAnhangAuswahl() {
    document.getElementById('anhangFileInput').click();
  }

  delAnhang() {
    this.message.anhangName = null;
    this.message.anhang = null;
  }
}
