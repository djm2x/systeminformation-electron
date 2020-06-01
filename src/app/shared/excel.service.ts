import { Article } from 'src/app/myModels/models';
import { Injectable, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs, FileSaverOptions } from 'file-saver';
import { WorkSheet, WorkBook, utils, writeFile } from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  title = 'Excel';
  constructor() { }

  test(epltable: ElementRef) {
    const ws: WorkSheet = utils.table_to_sheet(epltable.nativeElement);
    // const wb: WorkBook = utils.book_new();
    console.log(epltable)
    // ws["!cols"] = this.fitToColumn(epltable.nativeElement);
    const wb: WorkBook = { Sheets: { data: ws }, SheetNames: ['data'], Workbook: { Views: [{ RTL: true }] } };
    // wb.Workbook.Views = [{ RTL: true }];
    utils.book_append_sheet(wb, ws, 'Sheet1');


    writeFile(wb, 'epltable.xlsx');
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    // const worksheet2: XLSX.WorkSheet = XLSX.utils.;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    // worksheet['!cols'] = this.fitToColumn(json);

    worksheet['!cols'] = this.fitToColumn(json);

    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // return
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  fitToColumn(arrayOfArray) {
    // get maximum character of each column
    const header = Object.keys(arrayOfArray[0]); // columns name


    const wscols = [];
    for (let i = 0; i < header.length; i++) {  // columns length added
      wscols.push({ wch: header[i].length + 55 })
    }
    // console.log(arrayOfArray);
    // const columnCount = Object.keys(arrayOfArray[0]).length;
    let some = [];
    let maxes;
    const l = arrayOfArray.map((e, rowIndex) => {

      // const lengthOfWord = (e.map(a2 => {
      //   const length = a2.toString().length;
      //   return length;
      // }));
      // const col = Object.values(e)[columnCount]

      const values = Object.values(e).map(o => o.toString().length); // columns name

      // values.forEach((f, i) => {

      // })

      // some.push(values);
      return { wch: Math.max(...values as any[]) };
    });

    console.log(l);
    console.log(wscols);

    return l;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  ExportTOExcel(data2 = [], filename = 'SheetJS') {

    const data = [
      [{
        Name: 'def',
        RollNo: 102,
        Age: 15
      },
      {
        Name: 'xyz',
        RollNo: 103,
        Age: 20
      }],
      [{
        Name: 'def',
        RollNo: 102,
        Age: 15
      },
      {
        Name: 'xyz',
        RollNo: 103,
        Age: 20
      }],
    ]
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }

  ExportTOExcel2(table: ElementRef) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }

  test106(datasource: { libelle: string, articles: Article[] }[], excelFileName = 'somename') {
    const sheetNames: string[] = datasource.map(e => e.libelle);

    const sheets: { [sheet: string]: XLSX.WorkSheet } = {};

    datasource.map((e, i) => {
      sheets[e.libelle] = XLSX.utils.json_to_sheet(e.articles);
    });

    const workbook: XLSX.WorkBook = {
      SheetNames: sheetNames, // <-- include the sheet names in the array
      Sheets: sheets
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // return
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  // test105(datasource: { libelle: string, articles: Article[] }[], excelFileName = 'somename') {
  //   const sheetNames: XLSX.WorkBook


  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   // worksheet.
  //   const workbook: XLSX.WorkBook = {
  //     SheetNames: ['Sheet', 'JS', 'data'], // <-- include the sheet names in the array
  //     Sheets: {
  //       Sheet: { // <-- each sheet name is a key in the Sheets object
  //         '!ref': 'A1:B2',
  //         A1: { t: 'n', v: 1 },
  //         B2: { t: 'n', v: 4 }
  //       },
  //       JS: { // <-- since "JS" is the second entry in SheetNames, it will be the second tab
  //         '!ref': 'A1:B2',
  //         A2: { t: 's', v: 'Sheet' },
  //         B1: { t: 's', v: 'JS' }
  //       },
  //       data: worksheet
  //     }
  //   };

  //   // const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   // return
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  doExcel(template: ElementRef, fileName = 'data') {


    const blob = new Blob([template.nativeElement],
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });

    const options: FileSaverOptions = {
      autoBom: false
    };

    saveAs(blob, 'test.xls');

    // window.saveAs(blob, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION, options);

  }

  prepareTable() {
    var str = '',
      header = '',
      graphImg;


    header = '\uFEFF<h2 style="text-align:center;">Google</h2>';

    str = '<table border="1">'
      + '<tr><td style="text-align:center" colspan="6">Yahoo</td></tr>'
      + '<tr><td style="font-weight:bold" colspan="6">(2017.03.20)</td></tr>'
      + '<thead>'
      + '    <tr style="background-color:#788496; color: #ffffff">'
      + '      <th scope="col" rowspan="2">'
      + '        <div>Yahoo</div>'
      + '      </th>'
      + '      <th scope="col">'
      + '        <div class="tar">Yahoo(2017-01)</div>'
      + '      </th>'
      + '      <th scope="col" colspan="2">'
      + '        <div class="tar">Yahoo(2016-12)</div>'
      + '      </th>'
      + '      <th scope="col" colspan="2">'
      + '        <div class="tar">Yahoo(2016-12)</div>'
      + '      </th>'
      + '    </tr>'
      + '    <tr style="background-color:#788496; color: #ffffff">'
      + '      <th height="40" align="right">'
      + '        <div>Yahoo</div>'
      + '      </th>'
      + '      <th align="right">'
      + '        <div>Yahoo</div>'
      + '      </th>'
      + '      <th align="right">'
      + '        <div>Yahoo</div>'
      + '      </th>'
      + '      <th align="right">'
      + '        <div>Yahoo</div>'
      + '      </th>'
      + '      <th align="right">'
      + '        <div>Yahoo</div>'
      + '      </th>'
      + '    </tr>'
      + '</thead>'
      + '  <tbody>'

      + '    <tr style="text-align: right">'
      + '      <td style="padding:0 20px 0 0">'
      + '        <div>NAME</div>'
      + '      </td>'
      + '      <td style="width: 150px;">'
      + '        <div>311,210</div>'
      + '      </td>'
      + '      <td style="width: 150px;">'
      + '        <div>311,210</div>'
      + '      </td>'
      + '      <td style="width: 150px;">'
      + '        <div>311,210%</div>'
      + '      </td>'
      + '      <td style="width: 150px;">'
      + '        <div>311,210</div>'
      + '      </td>'
      + '      <td style="width: 150px;">'
      + '        <div>311,210%</div>'
      + '      </td>'
      + '    </tr>';
    +'  </tbody>'
      + '</table>';

    return header + str;
  }



}
