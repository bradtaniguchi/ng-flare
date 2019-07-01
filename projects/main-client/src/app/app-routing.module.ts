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
        loadChildren: () =>
          import('./modules/decks/decks.module').then(m => m.DecksModule)
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./modules/groups/groups.module').then(m => m.GroupsModule)
      },
      {
        path: 'study',
        loadChildren: () =>
          import('./modules/study/study.module').then(m => m.StudyModule)
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            m => m.DashboardModule
          )
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
    loadChildren: () =>
      import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'info',
    loadChildren: () =>
      import('./modules/info/info.module').then(m => m.InfoModule)
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
