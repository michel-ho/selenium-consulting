import {Api} from './Api';
import * as faker from 'faker';
import {HttpClient} from '@angular/common/http';
import {KurzArbeitVoranmeldung, StatusEnum} from './api/KurzArbeitVoranmeldung';
import {Costumer} from './api/Costumer';
faker.locale = 'de';

export function generateKurzArbeitVoranmeldung(http: HttpClient, kantonId: number, kantonAmtsstelle: string, anz: number) {
  let anfrage = new KurzArbeitVoranmeldung();
  let costumer = new Costumer();
  for (let i = 0; i < anz; i++) {
    anfrage.arbeitgeber = faker.company.companyName();
    anfrage.branche = faker.company.bs();
    anfrage.kantonaleAmtsstelle =  kantonAmtsstelle;
    anfrage.kantonId = kantonId;
    anfrage.telefon = faker.phone.phoneNumber();
    anfrage.email = faker.internet.email();
    anfrage.sachbearbeiter = faker.name.findName();
    anfrage.branche = faker.name.findName();
    anfrage.status = StatusEnum.DOCUMENT_UPLOAD;
    anfrage.gueltigkeitsBereicht = 'betriebsabteilung';
    anfrage.abteilungsName = 'Abreilung '.concat(faker.company.bs());
    anfrage.grundSchliessung = 'Corona';
    anfrage.bestandInsgesamt = faker.random.number({min: 100, max: 10000});
    anfrage.bestandGekuendigt = faker.random.number({min: 0, max: anfrage.bestandInsgesamt});
    anfrage.bestandAbruf = faker.random.number({min: 0, max: (anfrage.bestandInsgesamt - anfrage.bestandGekuendigt)});
    anfrage.betroffeneAnzMitarbeiter = faker.random.number(
        {min: 0, max: (anfrage.bestandInsgesamt - anfrage.bestandGekuendigt - anfrage.bestandAbruf)}
      );
    anfrage.dauerVon = '20.03.2020';
    anfrage.dauerBis = '20.06.2020';
    anfrage.prozAusfall = faker.random.number({min: 5, max: 100});
    anfrage.arbeitslosenkasse = 'Arbeitslosenkasse';
    anfrage.ausgleichskasse = 'Alv';
    anfrage.ortDatum = faker.address.city().concat(' 04.04.2020');
    costumer.pin = faker.random.uuid();
    costumer.name = anfrage.arbeitgeber;
    http.post<Costumer>(Api.API + Api.COSTUMER, costumer).subscribe(
      costumerNew => {
        costumer = costumerNew;
        anfrage.costumerId = costumer.id;
        http.post<KurzArbeitVoranmeldung>(Api.API + Api.KURZARBEIT_VORANMELDUNG, anfrage).subscribe(
          anfrageNew => {
            anfrage = anfrageNew;
          } ,
          err => console.error('Anfrage post fail: ' + err));
      } ,
      err => console.error('Costumer post fail: ' + err));
  }
}
