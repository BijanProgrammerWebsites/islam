import {Component} from '@angular/core';
import {NudbaService} from './nudba.service';

@Component({
    selector: 'app-nudba',
    templateUrl: './nudba.component.html',
    styleUrls: ['./nudba.component.scss'],
})
export class NudbaComponent {
    public highlightedIndex: number | null = null;

    public constructor(public nudbaService: NudbaService) {}

    public tokenMouseEnterHandler(index: number): void {
        this.highlightedIndex = index;
    }

    public tokenMouseLeaveHandler(): void {
        this.highlightedIndex = null;
    }
}
