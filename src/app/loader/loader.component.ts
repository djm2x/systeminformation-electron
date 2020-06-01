import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { LoaderInterceptor } from './loader-interceptor';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {

  constructor(public loader: LoaderService) { }

  ngOnInit() {
    // this.loader.isLoading.subscribe(
    //   r => {
    //     console.log('loader = ', r);
    //   },
    //   e => console.log(e)
    // );
  }
}
