import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // TODO: add auth guards
    children: [
      {
        path: 'decks',
        loadChildren: './modules/decks/decks.module#DecksModule'
      },
      {
        path: 'groups',
        loadChildren: './modules/groups/groups.module#GroupsModule'
      },
      {
        path: 'study',
        loadChildren: './modules/study/study.module#StudyModule'
      },
      {
        path: '',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
      }
    ]
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: 'info',
    loadChildren: './modules/info/info.module#InfoModule'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
