import { TestBed, inject } from '@angular/core/testing';

import { SprintsService } from './sprints.service';

describe('SprintsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprintsService]
    });
  });

  it('should be created', inject([SprintsService], (service: SprintsService) => {
    expect(service).toBeTruthy();
  }));
});
