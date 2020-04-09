import {Component, Input, OnInit, OnChanges, ViewChild} from '@angular/core';
import {Kanton} from '../../model/api/Kanton';
import {HttpClient} from '@angular/common/http';
import {
  KurzArbeitVoranmeldung,
  kurzArbeitVoranmeldung_is_APPROVED,
  kurzArbeitVoranmeldung_is_CHECK,
  kurzArbeitVoranmeldung_is_DECLINED,
  kurzArbeitVoranmeldung_is_DOCUMENT_UPLOAD,
  kurzArbeitVoranmeldung_is_FORM
} from '../../model/api/KurzArbeitVoranmeldung';
import {Observable} from 'rxjs';
import {Api} from '../../model/Api';
import {Router} from '@angular/router';
import {Costumer} from '../../model/api/Costumer';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {KantonService} from '../../services/kanton/kanton.service';
import {KurzArbeitVoranmeldungService} from '../../services/kurzArbeitVoranmeldung/kurz-arbeit-voranmeldung.service';
import {SessionService} from '../../services/session/session.service';

@Component({
  selector: 'app-kurz-arbeit-voranmeldung-list',
  templateUrl: './kurz-arbeit-voranmeldung-list.component.html',
  styleUrls: ['./kurz-arbeit-voranmeldung-list.component.scss']
})
export class KurzArbeitVoranmeldungListComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() asList = true;
  displayedColumns: string[] = ['id', 'arbeitgeber', 'eingangsdatum', 'branche', 'gueltigkeitsBereicht', 'dauerVon', 'dauerBis'];
  voranmeldungen$: KurzArbeitVoranmeldung[] = this.kurzArbeitVoranmeldungService.items;
  filteredVoranmeldungen$: KurzArbeitVoranmeldung[];
  dataSource: MatTableDataSource<KurzArbeitVoranmeldung> = new MatTableDataSource(this.filteredVoranmeldungen$);
  filterToDone:boolean = false;
  filterToTodo:boolean = false;
  filterToWait:boolean = false;

  constructor(private http: HttpClient,
              private session: SessionService,
              private kantonService: KantonService,
              private kurzArbeitVoranmeldungService: KurzArbeitVoranmeldungService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.load();
  }

  ngOnChanges(changes: any) {
    this.load();
  }

  load() {
    if (this.session.kanton) {
      this.kurzArbeitVoranmeldungService.loadWithKantonId(this.session.kanton.id).then(res => {
        this.voranmeldungen$ = res;
        this.applyFilter();
      });
    }
    if (this.session.costumer) {
      this.kurzArbeitVoranmeldungService.loadWithCostumerId(this.session.costumer.id).then(res => {
        this.voranmeldungen$ = res;
        this.applyFilter();
      });
    }
  }

  open(voranmeldung: KurzArbeitVoranmeldung) {
    this.session.kurzArbeitVoranmeldung = voranmeldung;
    this.router.navigateByUrl('/anfrage', { state: { readonly: true } });
  }

  isDoneClass(voranmeldung: KurzArbeitVoranmeldung) {
    if (kurzArbeitVoranmeldung_is_APPROVED(voranmeldung.status.id)) {
      return true;
    }
    return false;
  }
  isWaitingClass(voranmeldung: KurzArbeitVoranmeldung) {
    if ((this.session.costumerView && kurzArbeitVoranmeldung_is_CHECK(voranmeldung.status.id)) ||
        (!this.session.costumerView && (kurzArbeitVoranmeldung_is_FORM(voranmeldung.status.id) ||
                                kurzArbeitVoranmeldung_is_DOCUMENT_UPLOAD(voranmeldung.status.id) ||
                                kurzArbeitVoranmeldung_is_DECLINED(voranmeldung.status.id)
                                )
        )
      ) {
      return true;
    }
    return false;
  }

  setAsList(b: boolean) {
    this.asList = b;
  }

  isDisplayed(voranmeldung: KurzArbeitVoranmeldung) {
    if (!this.filterToDone &&
        !this.filterToTodo &&
        !this.filterToWait) {
      return true;
    }
    if ((this.isDoneClass(voranmeldung) && this.filterToDone) ||
        (this.isWaitingClass(voranmeldung) && this.filterToWait) ||
        (!this.isWaitingClass(voranmeldung) && !this.isDoneClass(voranmeldung) && this.filterToTodo)) {
      return true;
    }
    return false;
  }

  applyFilter() {
    this.filteredVoranmeldungen$ = this.voranmeldungen$.filter(value => this.isDisplayed(value));
    this.dataSource = new MatTableDataSource(this.filteredVoranmeldungen$);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.firstPage();
  }

  resetFilter() {
    this.filterToTodo = false;
    this.filterToWait = false;
    this.filterToDone = false;
    this.applyFilter();
  }
}
