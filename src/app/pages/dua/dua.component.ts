import {Component, OnDestroy, OnInit} from '@angular/core';
import {DuaService} from './dua.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {DuaRouteData} from '../../types/dua-route-data.type';

@Component({
    selector: 'app-dua',
    templateUrl: './dua.component.html',
    styleUrls: ['./dua.component.scss'],
})
export class DuaComponent implements OnInit, OnDestroy {
    public highlightedFaraazIndex: number | null = null;
    public highlightedTokenIndex: number | null = null;

    private activatedRouteDataSubscription?: Subscription;

    public constructor(public duaService: DuaService, public activatedRoute: ActivatedRoute) {}

    public ngOnInit(): void {
        this.activatedRouteDataSubscription = this.activatedRoute.data.subscribe(async (data) => {
            await this.duaService.loadDua((data as DuaRouteData).jsonFilename);
        });
    }

    public ngOnDestroy(): void {
        this.activatedRouteDataSubscription?.unsubscribe();
    }

    public tokenMouseEnterHandler(faraazIndex: number, tokenIndex: number): void {
        this.highlightedFaraazIndex = faraazIndex;
        this.highlightedTokenIndex = tokenIndex;
    }

    public tokenMouseLeaveHandler(): void {
        this.highlightedFaraazIndex = null;
        this.highlightedTokenIndex = null;
    }
}
