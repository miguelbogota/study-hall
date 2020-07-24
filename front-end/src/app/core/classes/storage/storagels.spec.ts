import { TestBed } from '@angular/core/testing';

import { StorageLS } from './storagels';

describe('StorageService', () => {
  let service: StorageLS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageLS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
