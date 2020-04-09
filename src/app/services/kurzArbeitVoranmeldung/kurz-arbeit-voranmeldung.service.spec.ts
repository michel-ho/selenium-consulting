import { TestBed } from '@angular/core/testing';

import { KurzArbeitVoranmeldungService } from './kurz-arbeit-voranmeldung.service';

describe('KurzArbeitVoranmeldungService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KurzArbeitVoranmeldungService = TestBed.get(KurzArbeitVoranmeldungService);
    expect(service).toBeTruthy();
  });
});
