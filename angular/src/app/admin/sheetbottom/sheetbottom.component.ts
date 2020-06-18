import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ElectronService } from '../electron.service';
import { ApiService } from '../api.service';
import { EquipementInfo } from '../models';

@Component({
  selector: 'app-sheetbottom',
  templateUrl: './sheetbottom.component.html',
  styleUrls: ['./sheetbottom.component.scss']
})
export class SheetbottomComponent implements OnInit {
  message = '...';
  constructor(private bottomSheetRef: MatBottomSheetRef<SheetbottomComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  , public service: ElectronService, private api: ApiService
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  post(url, time = 100) {
    console.log(url)
    // this.message = 'Info submitted successfuly';
    // return
    setTimeout(() => {
      const o: EquipementInfo = this.service.o;
      console.log(o);
      if (o.infoSystemeHtml !== '' && o.softwareHtml !== '') {
        o.date = new Date();
        this.api.post(url, o).subscribe(r => {
          console.log('post done', r);
          this.message = 'Info submitted successfuly';
        }, e => {
          this.message = 'Error occur';
        });
      }

    }, time)

  }

}
