import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    // TODO: add auth guards
    canActivate: [AuthGuard],
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
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        // TODO: remove later
        path: '',
        pathMatch: 'full',
        redirectTo: '/groups'
      }
    ]
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
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
