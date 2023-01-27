import {Injectable} from '@angular/core';
import {Dua} from '../../types/dua.type';
import {RawDua} from '../../types/raw-dua.type';
import {Faraaz} from '../../types/faraaz.type';

@Injectable({
    providedIn: 'root',
})
export class DuaService {
    public dua: Dua = [];

    public async loadDua(jsonFilename: string): Promise<void> {
        const response = await fetch(`assets/dua/${jsonFilename}`);
        const rawDua: RawDua = await response.json();

        this.dua = [];
        rawDua.forEach((items) => {
            const faraaz: Faraaz = {arabicTokens: [], persianTokens: []};

            items.forEach((item) => {
                faraaz.arabicTokens.push({text: item.arabic, isFromQuran: !!item.isFromQuran});
                faraaz.persianTokens.push({text: item.persian, isFromQuran: !!item.isFromQuran});
            });

            this.dua.push(faraaz);
        });
    }
}
