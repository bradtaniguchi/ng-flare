import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { Injectable } from '@angular/core';
import { GroupFacadeService } from './group-facade.service';

@Injectable({
  providedIn: 'root'
})
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private groupFacade: GroupFacadeService
  ) {}
}
