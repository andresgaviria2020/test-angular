import { TestBed } from '@angular/core/testing';

import { ExcelReportService } from './excel-report.service';

describe('ExcelReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelReportService = TestBed.get(ExcelReportService);
    expect(service).toBeTruthy();
  });
});
