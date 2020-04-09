import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Kanton} from '../../model/api/Kanton';
import {Observable} from 'rxjs';
import {KurzArbeitVoranmeldung} from '../../model/api/KurzArbeitVoranmeldung';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Api} from '../../model/Api';
import {Costumer} from '../../model/api/Costumer';
import {Message} from '../../model/api/Message';
import {DomSanitizer} from '@angular/platform-browser';
import {SessionService} from '../../services/session/session.service';
import {MessageService} from '../../services/message/message.service';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit, OnChanges {
  @Input() voranmeldung: KurzArbeitVoranmeldung;

  @Output() getMessageLoaded = new EventEmitter<Message[]>();

  messages$: Message[];

  unreadedMessages = 0;

  constructor(private session: SessionService,
              private messageService: MessageService,
              public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.reload();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reload();
  }

  reload() {
    if (this.voranmeldung && this.voranmeldung.id) {
      this.messageService.loadWithKurzarbeitVoranmeldung(this.voranmeldung.id).then(list => {
        this.messages$ = list;
        this.unreadedMessages = this.messages$.filter(message => this.erhalten(message) === true && message.readed === false).length;
        this.getMessageLoaded.emit(list);
      });
    }
  }

  setMessageReaded() {
    if (this.unreadedMessages > 0) {
      this.messages$.forEach(message => {
        if (this.erhalten(message) === true) {
          message.readed = true;
        }
      });
      this.unreadedMessages = 0;
    }
  }

  erhalten(message: Message) {
    if (message) {
      if ((message.toCostumer === true && this.session.costumerView === true) ||
          (!message.toCostumer === true && this.session.costumerView === false)) {
        return true;
      } else {
        return false;
      }
    }
  }

  openAnhang(anhang: string) {
    // @ts-ignore
    console.log(anhang);
    window.open(anhang, '_blank');
  }

  getSaveAnhang(anhang: string) {
      return this.sanitizer.bypassSecurityTrustUrl(anhang);
  }
}
