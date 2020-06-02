import { Injectable } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    const config = {
      panelClass: ['warn-snackbar'],
      duration: 4500
    };

    this.snackBar.open(message, null, config);
  }

  manageStatusCode(code: number) {
    console.log(code);
    switch (code) {
      case 200: break;
      case 199: this.notifyOk(code, this.listMessage(code)); break;
      case 201: this.notifyOk(code, this.listMessage(code)); break;
      case 204: this.notifyOk(code, this.listMessage(code)); break;
      case 404: this.notifyAlert(code, this.listMessage(code)); break;
      case 401: this.notifyAlert(code, this.listMessage(code)); break;
      case 403: this.notifyAlert(code, this.listMessage(code)); break;
      case 500: this.notifyAlert(code, this.listMessage(code)); break;
      case 250: this.notifyOk(code, this.listMessage(code)); break;
      default: this.notifyOk(code, this.listMessage(code)); break;
    }

  }

  notifyOk(code, message: string) {
    const config = {
      panelClass: ['green-snackbar'],
      duration: 1500,
      // horizontalPosition: this.horizontalPosition,
      // verticalPosition: this.verticalPosition,
    };

    this.snackBar.open(message, null, config);
  }

  notifyAlert(code, message: string) {
    const config = {
      panelClass: ['alert-snackbar'],
      duration: 1500
    };

    this.snackBar.open(message, null, config);
  }

  message(code) {

  }

  listMessage(code): string {
    // source https://github.com/aspnet/AspNetCore/blob/master/src/Http/Http.Abstractions/src/StatusCodes.cs
    const list = [
      { code: 202, message: `${code}: Enregistrement a été bien supprimé`},
      { code: 201, message: `${code}: Enregistrement a été bien ajouté`},
      { code: 204, message: `${code}: Enregistrement a été bien edité`},
      { code: 404, message: `${code}: Chemin non trouvé`},
      { code: 401, message: `${code}: Chemin non autorisé`},
      { code: 403, message: `${code}: Chemin Interdit`},
      { code: 250, message: `${code}: Les enregistrements on été ajoutés`},
      { code: 500, message: `${code}: Impossible d'effectuer cette opération`},
    ];
    const o = list.find(e => e.code === code);
    return o ? o.message : `${code}: erreur inconnue`;
  }
}
