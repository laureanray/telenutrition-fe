import { TestBed } from '@angular/core/testing';

import { RndService } from './rnd.service';

describe('RndService', () => {
  let service: RndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
