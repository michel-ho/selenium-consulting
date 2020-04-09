import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {KantonService} from '../../services/kanton/kanton.service';
import {Kanton} from '../../model/api/Kanton';
import {SessionService} from '../../services/session/session.service';

@Component({
  selector: 'app-kanton-auswahl',
  templateUrl: './kanton-auswahl.component.html',
  styleUrls: ['./kanton-auswahl.component.scss']
})
export class KantonAuswahlComponent implements OnInit {

  @Output() kantonSelected = new EventEmitter<Kanton>();

  constructor(private kantonService: KantonService,
              private session: SessionService,) { }

  ngOnInit() {
  }

  setSelectedKanton(kanton: Kanton) {
    this.session.setKanton(kanton);
    this.kantonSelected.emit(kanton);
  }

}
