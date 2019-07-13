import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { NetworkAwarePreloadingStrategy } from './core/preloading-strategy';

const routes: Routes = [
  Shell.childRoutes([{ path: 'about', loadChildren: 'app/about/about.module#AboutModule' }]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NetworkAwarePreloadingStrategy })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
