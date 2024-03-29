import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AudioManagerModule} from './components/audio-manager/audio-manager.module';
import {HeaderModule} from './components/header/header.module';

import {HomeModule} from './pages/home/home.module';
import {DuaModule} from './pages/dua/dua.module';

import {PipesModule} from './pipes/pipes.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, AudioManagerModule, HeaderModule, HomeModule, DuaModule, PipesModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
