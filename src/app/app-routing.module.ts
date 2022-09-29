import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },  {
    path: 'sidemenu',
    loadChildren: () => import('./common/sidemenu/sidemenu.module').then( m => m.SidemenuPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./common/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./common/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
