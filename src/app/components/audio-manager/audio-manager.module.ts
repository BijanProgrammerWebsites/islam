import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AudioManagerComponent} from './audio-manager.component';

@NgModule({
    declarations: [AudioManagerComponent],
    imports: [CommonModule],
    exports: [AudioManagerComponent],
})
export class AudioManagerModule {}
