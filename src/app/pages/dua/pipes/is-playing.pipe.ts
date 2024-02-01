import {Pipe, PipeTransform} from '@angular/core';
import {Token} from '../../../types/token.type';

@Pipe({
    name: 'isPlaying',
})
export class IsPlayingPipe implements PipeTransform {
    public transform(token: Token, currentTime?: number): boolean {
        if (!currentTime || !token.start || !token.end) {
            return false;
        }

        return token.start <= currentTime && currentTime <= token.end;
    }
}
