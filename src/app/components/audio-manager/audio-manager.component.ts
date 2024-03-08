import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-audio-manager',
    templateUrl: './audio-manager.component.html',
    styleUrls: ['./audio-manager.component.scss'],
})
export class AudioManagerComponent {
    @Input() public src?: string;

    @Output() private currentTimeChange = new EventEmitter<number>();

    @ViewChild('audio') private audioRef!: ElementRef<HTMLAudioElement>;

    public timeUpdateHandler(): void {
        this.currentTimeChange.emit(this.audioRef.nativeElement.currentTime);
    }
}
