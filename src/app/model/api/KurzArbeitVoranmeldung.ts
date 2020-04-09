import {AbstractApiElement} from './AbstractApiElement';

export class Status extends AbstractApiElement {
  id: number;
  stepIndex: number;
  stepIndexOffice: number;

  constructor(id: number, stepIndex: number, stepIndexOffice: number) {
    super()
    this.id = id;
    this.stepIndex = stepIndex;
    this.stepIndexOffice = stepIndexOffice;
  }
}

export function kurzArbeitVoranmeldung_is_FORM(id: number) {
  return id === StatusEnum.FORM.id;
}
export function kurzArbeitVoranmeldung_is_DOCUMENT_UPLOAD(id: number) {
  return id === StatusEnum.DOCUMENT_UPLOAD.id;
}
export function kurzArbeitVoranmeldung_is_CHECK(id: number) {
  return id === StatusEnum.CHECK.id;
}
export function kurzArbeitVoranmeldung_is_DECLINED(id: number) {
  return id === StatusEnum.DECLINED.id;
}
export function kurzArbeitVoranmeldung_is_APPROVED(id: number) {
  return id === StatusEnum.APPROVED.id;
}


export const StatusEnum = {
  FORM: new Status(0, 0, 0),
  DOCUMENT_UPLOAD: new Status( 1, 1, 1),
  CHECK: new Status( 2, 2, 2),
  DECLINED: new Status( 3, 1, 2),
  APPROVED: new Status( 4, 3, 3),
};

export class KurzArbeitVoranmeldung extends AbstractApiElement {
  id: number = null;
  arbeitgeber: string = null;
  eingangsdatum: number = Date.now();
  branche: string = null;
  sachbearbeiter: string = null;
  telefon: string = null;
  email: string = null;
  kantonaleAmtsstelle: string = null;
  gueltigkeitsBereicht: string = null;
  abteilungsName: string = null;
  grundSchliessung: string = null;
  bestandInsgesamt: number = null;
  bestandGekuendigt: number = null;
  bestandAbruf: number = null;
  betroffeneAnzMitarbeiter: number = null;
  dauerVon: string = null;
  dauerBis: string = null;
  prozAusfall: number = null;
  arbeitslosenkasse: string = null;
  ausgleichskasse: string = null;
  ortDatum: string = null;
  kantonId: number = null;
  costumerId: number = null;
  status: Status = StatusEnum.FORM;
  asPdf: string | ArrayBuffer;
  pdfName: string;
  organigramm: string | ArrayBuffer;
  organigrammName: string | ArrayBuffer;
}

