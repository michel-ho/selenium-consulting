export class KurzArbeitVoranmeldung {
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
  status: number = null;
  asPdf: string | ArrayBuffer;
  organigramm: string | ArrayBuffer;
}


