export class Message {
  id: number = null;
  voranmeldungId: number = null;
  toCostumer: boolean = null;
  date: number = Date.now();
  text: string;
  anhangName: string;
  anhang: string | ArrayBuffer;
}

