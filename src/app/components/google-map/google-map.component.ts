// app.component.ts
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'google-map-component',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent {
  title = 'angular-google-map-search';

  @ViewChild('search')
   searchElementRef!: ElementRef;
  @ViewChild(GoogleMap)
   map!: GoogleMap;

   zoom: number = 12;
   center!: google.maps.LatLngLiteral;
   options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    fullscreenControl: false,
    disableDoubleClickZoom: false,
  };
   latitude?: any;
   longitude?: any;
   username: any = '';
   markerPosition: any = { lat: 20.967778, lng: -89.62166 };

   markerOptions: object = {
    draggable: true
  };

  constructor(private ngZone: NgZone) {

  }

  ngOnInit() {
    //INITIAL CORDS ON THE MAP (MÉRIDA YUC)
    this.center = {
      lat: 20.967778,
      lng: -89.62166,
    };
  }

  ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    // Align search box to center

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: any = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        console.log({ place }, place.geometry.location?.lat());

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.markerPosition = { lat: this.latitude, lng: this.longitude }
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
      });
    });
  }


  markerDragEnd($event: any):void {
    this.latitude = $event.latLng.lat()
    this.longitude = $event.latLng.lng()
  }

  searchByCords(lat: string, lng: string): void {
    this.center = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };

    this.markerPosition = { lat: parseFloat(lat), lng: parseFloat(lng) }
  }

}