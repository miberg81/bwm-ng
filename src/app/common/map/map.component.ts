import { Component, Input } from '@angular/core';
import { MapService } from './map.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  isLocationError = false;

  @Input() location: string;

  lat: number;
  lng: number;

  constructor(private mapService: MapService,
              private ref: ChangeDetectorRef) { }

  // is called when "map-ready" event is fired
  mapReadyHandler() {

    const currentLocation = this.location;

    // randomnly generate location error
    /*
    if (Math.round(Math.random() * 10) > 5 ) {
      currentLocation = 'wrongLocation';
    }*/

    this.mapService.getGeoLocation(currentLocation).subscribe(
      (coordinates) => {
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
      // notify angular that changed were made to value so it should update DOM
      this.ref.detectChanges();
    }, (error) => {
        this.isLocationError = true;
    });
  }
}
