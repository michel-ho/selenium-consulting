import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Kanton} from '../../../api/kanton';
import {Observable} from 'rxjs';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Api} from '../../../api/api';
import {Costumer} from '../../../api/Costumer';
import {Message} from '../../../api/Messages';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit, OnChanges {
  @Input() voranmeldung: KurzArbeitVoranmeldung;

  @Input() costumerView: boolean = false;

  messages$: Observable<Message>;

  constructor(private http: HttpClient,
              private router: Router,
              public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.reload();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reload();
  }

  reload() {
    if(this.voranmeldung && this.voranmeldung.id){
      this.messages$ = this.http.get<Message>(Api.MESSAGE + '?voranmeldungId=' + this.voranmeldung.id);
    }
  }

  erhalten(message: Message) {
    if(message) {
      if((message.toCostumer && this.costumerView == true) ||
        (!message.toCostumer && this.costumerView == false)){
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

  getSaveAnhang(anhang: string){
      return this.sanitizer.bypassSecurityTrustUrl(anhang);
  }
}
