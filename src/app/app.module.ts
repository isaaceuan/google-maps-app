import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    GoogleMapsModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
