import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from '@progress/kendo-file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelReportService {

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
 
  public exportExcel(jsonData: any[], fileName: string): any {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    return this.saveExcelFile(excelBuffer, fileName);
  }
 
  public saveExcelFile(buffer: any, fileName: string): any {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    return(data);
  }
}
