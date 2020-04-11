import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Kanton} from '../../model/api/Kanton';
import {KurzArbeitVoranmeldung, StatusEnum} from '../../model/api/KurzArbeitVoranmeldung';
import {Api} from '../../model/Api';
import * as faker from 'faker';
import {Costumer} from '../../model/api/Costumer';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {generateKurzArbeitVoranmeldung} from '../../model/generator';
import {Arbeitslosenkasse} from '../../model/api/Arbeitslosenkasse';
import {Observable} from 'rxjs';
import {SessionService} from '../../services/session/session.service';
import {KurzArbeitVoranmeldungService} from '../../services/kurzArbeitVoranmeldung/kurz-arbeit-voranmeldung.service';
import {CostumerService} from '../../services/costumer/costumer.service';
import {TranslateService} from '@ngx-translate/core';
faker.locale = 'de';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input()
  readonly: Boolean = false;

  @Output() getFormCreated = new EventEmitter<{voranmeldung: KurzArbeitVoranmeldung, costumer: Costumer}>();

  constructor(private costumerService: CostumerService,
              private kurzArbeitVoranmeldungService: KurzArbeitVoranmeldungService,
              private session: SessionService,
              private translate: TranslateService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  sendAndCreatePdf() {
    // generateKurzArbeitVoranmeldung(this.http, 1, 'Zürich', 10);
    if (!this.session.costumerVonVoranmeldung) {
      this.session.costumerVonVoranmeldung = new Costumer();
    }
    if (!this.session.costumerVonVoranmeldung.pin) {
      this.session.costumerVonVoranmeldung.pin = faker.random.uuid();
    }
    if (!this.session.costumerVonVoranmeldung.name) {
      this.session.costumerVonVoranmeldung.name = this.session.kurzArbeitVoranmeldung.arbeitgeber;
    }

    this.session.kurzArbeitVoranmeldung.kantonId = this.session.kanton.id;
    if (this.session.costumerVonVoranmeldung.id) {

      this.session.kurzArbeitVoranmeldung.costumerId = this.session.costumerVonVoranmeldung.id;
      this.session.kurzArbeitVoranmeldung.status = StatusEnum.DOCUMENT_UPLOAD;
      this.kurzArbeitVoranmeldungService.add(this.session.kurzArbeitVoranmeldung).then(
        anfrage => {
          this.session.kurzArbeitVoranmeldung = anfrage;
          this.createPDF();
        } ,
        err => console.error('Anfrage post fail: ' + err));
    } else {
      this.costumerService.add(this.session.costumerVonVoranmeldung).then(
        costumer => {
          this.session.costumerVonVoranmeldung = costumer;
          this.session.kurzArbeitVoranmeldung.costumerId = this.session.costumerVonVoranmeldung.id;
          this.session.kurzArbeitVoranmeldung.status = StatusEnum.DOCUMENT_UPLOAD;
          this.kurzArbeitVoranmeldungService.add(this.session.kurzArbeitVoranmeldung).then(
            anfrage => {
              this.session.kurzArbeitVoranmeldung = anfrage;
              this.createPDF();
            } ,
            err => console.error('Anfrage post fail: ' + err));
        } ,
        err => console.error('Costumer post fail: ' + err));
    }
  }

  public async createPDF() {
    const pages = 2;
    const canvasOption = {scrollX: 0, scrollY: -window.scrollY, allowTaint: true};
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    for (let page = 1; page <= pages; page++) {
      const pagedata = document.getElementById('page'.concat(page.toString()));
      pagedata.style.borderColor = 'white';
      await new Promise((resolve) => {
        html2canvas(pagedata, canvasOption).then((canvas) => {
          if (page > 1) {
            pdf.addPage();
          }
          pagedata.style.borderColor = 'grey';
          const contentDataURL = canvas.toDataURL('image/png');
          pdf.addImage(contentDataURL, 'JPEG', 0, 0, canvas.width * 0.2, canvas.height * 0.2, 'a' + page, 'FAST');
          resolve();
        });
      });
    }

    this.getFormCreated.emit({voranmeldung: this.session.kurzArbeitVoranmeldung, costumer: this.session.costumerVonVoranmeldung});
    pdf.save(this.translate.instant('form.pdfName')); // Generated PDF
  }
}
