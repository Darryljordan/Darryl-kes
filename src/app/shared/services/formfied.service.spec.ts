import { TestBed } from '@angular/core/testing';

import { FormfiedService } from './formfied.service';

describe('FormfiedService', () => {
  let service: FormfiedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormfiedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
