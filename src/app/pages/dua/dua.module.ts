import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AudioManagerModule} from '../../components/audio-manager/audio-manager.module';

import {DuaComponent} from './dua.component';
import {IsPlayingPipe} from './pipes/is-playing.pipe';

@NgModule({
    declarations: [DuaComponent, IsPlayingPipe],
    imports: [CommonModule, AudioManagerModule],
})
export class DuaModule {}
