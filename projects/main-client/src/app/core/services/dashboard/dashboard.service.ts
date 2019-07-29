import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../../models/user';
import { Observable, from } from 'rxjs';
import { Dashboard, DashboardWidgetTypes } from '../../../models/dashboard';
import { Collections } from '../../collections';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private db: AngularFirestore) {}

  /**
   * Returns the collection for the dashboard for the given user
   */
  private getDashboardDoc(params: { user: User }) {
    const { user } = params;
    return this.db
      .collection(Collections.Users)
      .doc(user.uid)
      .collection(Collections.UsersDashboard)
      .doc<Dashboard>('dashboard');
  }
  /**
   * Returns the dashboard for the current user
   */
  public get(params: { user: User }): Observable<Dashboard> {
    return this.getDashboardDoc(params).valueChanges();
  }

  /**
   * Creates the default dashboard for a user
   */
  public create(params: { user: User }): Observable<Dashboard> {
    const createdOn = new Date();
    const dashboard: Dashboard = {
      widgets: [
        {
          type: DashboardWidgetTypes.CREATE_ACTIONS,
          createdOn
        },
        {
          type: DashboardWidgetTypes.STUDY_ACTIONS,
          createdOn
        }
      ]
    };
    return from(this.getDashboardDoc(params).set(dashboard)).pipe(
      map(() => dashboard)
    );
  }

  public update(params: {
    user: User;
    dashboard: Partial<Dashboard>;
  }): Observable<void> {
    const { dashboard } = params;
    return from(this.getDashboardDoc(params).update(dashboard));
  }
}
