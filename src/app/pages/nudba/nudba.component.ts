import {Component} from '@angular/core';
import {NudbaService} from './nudba.service';

@Component({
    selector: 'app-nudba',
    templateUrl: './nudba.component.html',
    styleUrls: ['./nudba.component.scss'],
})
export class NudbaComponent {
    public highlightedFaraazIndex: number | null = null;
    public highlightedTokenIndex: number | null = null;

    public constructor(public nudbaService: NudbaService) {}

    public tokenMouseEnterHandler(faraazIndex: number, tokenIndex: number): void {
        this.highlightedFaraazIndex = faraazIndex;
        this.highlightedTokenIndex = tokenIndex;
    }

    public tokenMouseLeaveHandler(): void {
        this.highlightedFaraazIndex = null;
        this.highlightedTokenIndex = null;
    }
}
