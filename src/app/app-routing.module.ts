import {NgModule} from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';

import {DuaRouteData} from './types/dua-route-data.type';

import {HomeComponent} from './pages/home/home.component';
import {DuaComponent} from './pages/dua/dua.component';

const duas: (Route & {data: DuaRouteData})[] = [
    {path: 'nudba', title: 'دعای ندبه', data: {jsonFilename: 'nudba.json'}},
];

const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'dua', children: duas.map((x) => ({...x, component: DuaComponent}))},
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
