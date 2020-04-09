import { TestBed } from '@angular/core/testing';

import { CostumerService } from './costumer.service';

describe('CostumerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CostumerService = TestBed.get(CostumerService);
    expect(service).toBeTruthy();
  });
});
