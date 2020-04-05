export class Statistik {
  id:  number = null;
  kanton: string = null;
  voranmeldungen: number = null;
  betroffeneAnzMitarbeiter: number = null;
  bestandGekuendigt: number = null;
  perDay: {};// { [date: string]: number; };

  constructor(id: number, kanton: string) {
    this.id = id;
    this.kanton = kanton
    this.voranmeldungen = 0;
    this.betroffeneAnzMitarbeiter = 0;
    this.bestandGekuendigt = 0;
    this.perDay = {};
  }
}
