import {Component} from '@angular/core';
import {duaRoutes} from '../../data/dua-routes';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public duaRoutes = duaRoutes;
}
