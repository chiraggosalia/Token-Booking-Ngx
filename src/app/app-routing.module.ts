import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {path: '', redirectTo: 'base', pathMatch: 'full'},
  {
    path: 'base', loadChildren: () => import('./baselayout/base-layout.module')
      .then(m => m.BaseLayoutModule),
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module')
      .then(m => m.NgxAuthModule),
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
