import {Route} from '@angular/router';

import {DuaRouteData} from '../types/dua-route-data.type';
import {DuaComponent} from '../pages/dua/dua.component';

const pathToTitleMap: Map<string, string> = new Map([
    ['mafatih312', 'دعای ندبه'],
    ['mafatih39', 'زیارت امام زمان (عج) در روز جمعه'],
]);

const duaRoutes: (Route & {data: DuaRouteData})[] = [...pathToTitleMap.entries()].map(([path, title]) => ({
    path,
    title,
    component: DuaComponent,
    data: {
        jsonFilename: `${path}.json`,
    },
}));

export {duaRoutes};
