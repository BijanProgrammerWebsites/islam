import {Injectable} from '@angular/core';
import {Dua} from '../../types/dua.type';
import {RawDua} from '../../types/raw-dua.type';
import {Faraaz} from '../../types/faraaz.type';

@Injectable({
    providedIn: 'root',
})
export class NudbaService {
    public dua: Dua = [];

    public constructor() {
        this.loadDua().then();
    }

    private async loadDua(): Promise<void> {
        const response = await fetch('assets/dua/nudba.json');
        const rawDua: RawDua = await response.json();

        this.dua = [];
        rawDua.forEach((items) => {
            const faraaz: Faraaz = {arabicTokens: [], persianTokens: []};

            items.forEach((item) => {
                faraaz.arabicTokens.push(item.arabic);
                faraaz.persianTokens.push(item.persian);
            });

            this.dua.push(faraaz);
        });
    }
}
