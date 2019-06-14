import { Injectable } from '@angular/core';
import { environment } from 'projects/main-client/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  constructor() {}

  public get() {
    return environment;
  }
}
