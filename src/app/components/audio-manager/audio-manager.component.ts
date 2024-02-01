import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-audio-manager',
    templateUrl: './audio-manager.component.html',
    styleUrls: ['./audio-manager.component.scss'],
})
export class AudioManagerComponent {
    @Output() public currentTimeChange = new EventEmitter<number>();

    @ViewChild('audio') private audioRef!: ElementRef<HTMLAudioElement>;

    public timeUpdateHandler(): void {
        this.currentTimeChange.emit(this.audioRef.nativeElement.currentTime);
    }

    public goForward(): void {
        this.audioRef.nativeElement.currentTime = this.audioRef.nativeElement.currentTime + 10;
    }
}
