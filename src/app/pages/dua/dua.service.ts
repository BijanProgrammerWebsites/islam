import {Injectable} from '@angular/core';
import {Dua} from '../../types/dua.type';
import {RawDua} from '../../types/raw-dua.type';
import {Faraaz} from '../../types/faraaz.type';
import {Token} from '../../types/token.type';

@Injectable({
    providedIn: 'root',
})
export class DuaService {
    public dua: Dua | null = null;

    public async loadDua(jsonFilename: string): Promise<void> {
        const response = await fetch(`assets/dua/${jsonFilename}`);
        const rawDua: RawDua = await response.json();

        this.dua = {audioSource: rawDua.audioSource, faraazes: []};
        rawDua.faraazes.forEach((items) => {
            const faraaz: Faraaz = {arabicTokens: [], persianTokens: []};

            items.forEach((item) => {
                const common: Omit<Token, 'text'> = {
                    isFromQuran: !!item.isFromQuran,
                    start: item.timestamps?.[0],
                    end: item.timestamps?.[1],
                };

                faraaz.arabicTokens.push({...common, text: item.arabic});
                faraaz.persianTokens.push({...common, text: item.persian});
            });

            this.dua?.faraazes.push(faraaz);
        });
    }
}
