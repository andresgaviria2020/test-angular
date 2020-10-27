import { TestBed } from '@angular/core/testing';

import { GuardarQuizService } from './guardar-quiz.service';

describe('GuardarQuizService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardarQuizService = TestBed.get(GuardarQuizService);
    expect(service).toBeTruthy();
  });
});
