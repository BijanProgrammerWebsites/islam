import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
    @ViewChild('dua') public duaElementRef!: ElementRef<HTMLDivElement>;

    public currentTime: number = 0;

    public highlightedFaraazIndex: number | null = null;
    public highlightedTokenIndex: number | null = null;

    private activatedRouteDataSubscription?: Subscription;

    public constructor(public duaService: DuaService, public activatedRoute: ActivatedRoute) {}

    private get faraazes(): HTMLDivElement[] {
        const duaElement = this.duaElementRef.nativeElement;
        const faraazNodeList = duaElement.querySelectorAll<HTMLDivElement>('.faraaz');
        return Array.from(faraazNodeList);
    }

    public ngOnInit(): void {
        this.activatedRouteDataSubscription = this.activatedRoute.data.subscribe(async (data) => {
            await this.duaService.loadDua((data as DuaRouteData).jsonFilename);
        });
    }

    public ngOnDestroy(): void {
        this.activatedRouteDataSubscription?.unsubscribe();
    }

    @HostListener('window:keydown.PageUp', ['$event'])
    public pageUpKeyHandler(event: KeyboardEvent): void {
        event.preventDefault();
        this.goToPreviousFaraaz();
    }

    @HostListener('window:keydown.PageDown', ['$event'])
    public pageDownKeyHandler(event: KeyboardEvent): void {
        event.preventDefault();
        this.goToNextFaraaz();
    }

    public currentTimeChangeHandler(currentTime: number): void {
        this.currentTime = currentTime;
        this.goToPlayingFaraaz();
    }

    public tokenMouseEnterHandler(faraazIndex: number, tokenIndex: number): void {
        this.highlightedFaraazIndex = faraazIndex;
        this.highlightedTokenIndex = tokenIndex;
    }

    public tokenMouseLeaveHandler(): void {
        this.highlightedFaraazIndex = null;
        this.highlightedTokenIndex = null;
    }

    private goToPlayingFaraaz(): void {
        const index = this.findPlayingFaraazIndex();
        const faraaz = this.faraazes[index];

        if (!faraaz) {
            return;
        }

        window.scrollTo({top: faraaz.offsetTop});
    }

    private goToPreviousFaraaz(): void {
        const nearestIndex = this.findNearestFaraazIndex();

        if (window.scrollY > this.faraazes[nearestIndex].offsetTop) {
            window.scrollTo({top: this.faraazes[nearestIndex].offsetTop});
        } else if (nearestIndex - 1 >= 0) {
            window.scrollTo({top: this.faraazes[nearestIndex - 1].offsetTop});
        } else {
            window.scrollTo({top: 0});
        }
    }

    private goToNextFaraaz(): void {
        const nearestIndex = this.findNearestFaraazIndex();

        if (window.scrollY < this.faraazes[nearestIndex].offsetTop) {
            window.scrollTo({top: this.faraazes[nearestIndex].offsetTop});
        } else if (nearestIndex + 1 < this.faraazes.length) {
            window.scrollTo({top: this.faraazes[nearestIndex + 1].offsetTop});
        } else {
            window.scrollTo({top: document.body.scrollHeight});
        }
    }

    private findPlayingFaraazIndex(): number {
        if (!this.duaService.dua) {
            return -1;
        }

        return this.duaService.dua.faraazes.findIndex((faraaz) => {
            return faraaz.arabicTokens.some((token) => {
                if (!token.start || !token.end) {
                    return false;
                }

                return token.start <= this.currentTime && this.currentTime <= token.end;
            });
        });
    }

    private findNearestFaraazIndex(): number {
        let nearestElementIndex = 0;
        let minimumDistance = Number.MAX_VALUE;

        for (let i = 0; i < this.faraazes.length; i++) {
            const distance = Math.abs(this.faraazes[i].offsetTop - window.scrollY);

            if (minimumDistance > distance) {
                minimumDistance = distance;
                nearestElementIndex = i;
            }
        }

        return nearestElementIndex;
    }
}
