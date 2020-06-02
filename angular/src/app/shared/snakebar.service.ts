import { Injectable, Component, Inject } from '@angular/core';
import { MatSnackBarRef, MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  snackBarRef: MatSnackBarRef<any>;
  constructor(private snackBar: MatSnackBar) { }

  openMySnackBar(message: string, action?: string) {
    // this.snackBarRef = this.snackBar.open(message, action, {
    //   duration: 2000,
    // });
    const configs: MatSnackBarConfig<any> = {
      panelClass: ['customClass'],
      data: message,
    };

    this.snackBarRef = this.snackBar.openFromComponent(MessageComponent, configs);
  }

  openSnackBar(message: string, action = 'close') {
    this.snackBarRef = this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  afterDismissed = () => this.snackBarRef.afterDismissed();
  onAction = () => this.snackBarRef.onAction();
  dismiss = () => this.snackBarRef.dismiss();
}


@Component({
  selector: 'app-snack-bar',
  template: `
  <div class="row">
    <p>{{ data }}</p>
    <mat-spinner color="warn" class="custom-spinner" diameter="27"></mat-spinner>
  </div>`,
  styles: [`
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `]
})
export class MessageComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
