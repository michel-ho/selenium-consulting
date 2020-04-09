import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../../model/api/Message';
import {KurzArbeitVoranmeldung} from '../../model/api/KurzArbeitVoranmeldung';
import {Costumer} from '../../model/api/Costumer';
import {Api} from '../../model/Api';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {SessionService} from '../../services/session/session.service';
import {MessageService} from '../../services/message/message.service';

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
  readonly: Boolean = true;

  @Output() getMessageSendet = new EventEmitter<boolean>();

  constructor(private session: SessionService,
              private messageService: MessageService,
              ) { }

  ngOnInit() {
  }

  send() {
    this.message.voranmeldungId = this.voranmeldung.id;
    this.message.toCostumer = !this.session.costumerView;
    this.messageService.add(this.message).then(
      message => {
        this.message = new Message();
        this.successFullsended = true;
        this.getMessageSendet.emit(true);
        setTimeout(() => {
          this.successFullsended = false; }, 5000);
      });
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
