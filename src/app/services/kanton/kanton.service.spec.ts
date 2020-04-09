import { TestBed } from '@angular/core/testing';

import { KantonService } from './kanton.service';

describe('KantonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KantonService = TestBed.get(KantonService);
    expect(service).toBeTruthy();
  });
});
