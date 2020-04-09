import { TestBed } from '@angular/core/testing';

import { ArbeitslosenKasseService } from './arbeitslosen-kasse.service';

describe('ArbeitslosenKasseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArbeitslosenKasseService = TestBed.get(ArbeitslosenKasseService);
    expect(service).toBeTruthy();
  });
});
