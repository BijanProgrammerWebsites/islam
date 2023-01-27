import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {duaRoutes} from './data/dua-routes';

import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    ...duaRoutes,
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
