import {
  MatSnackBar,
  MatSnackBarDismiss,
  MatSnackBarConfig
} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor(private matSnackBar: MatSnackBar) {}

  public notify(params: {
    message: string;
    action?: string;
    config?: MatSnackBarConfig;
  }): Observable<MatSnackBarDismiss> {
    const { message, action, config } = params;
    return this.matSnackBar
      .open(message, action || 'Ok', { ...config, duration: 1000 })
      .afterDismissed();
  }
}
