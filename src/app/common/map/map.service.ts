import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';

@Injectable()
export class MapService {
  private geoCoder;

  // init the cache file of the type object
  private locationCache: any = {};

  constructor(private camelizePipe: CamelizePipe) {}

  /* create a cached value in the format of
    locationCache = {
      'NewYork, TimesSquare': {lat:25, lng: 40},
      'Moscow, GorkiyPark': {lat:455, lng: 540}
      }
    }*/

  // transform normal string to a camelized string
  private camelize(value: string): string {
    return this.camelizePipe.transform(value);
  }

  private cacheLocation(location: string, coordinates: any) {
    this.locationCache[this.camelize(location)] = coordinates;
  }

  private islocationCached(location: string): boolean {
    return this.locationCache[this.camelize(location)];
  }

  private geocodeLocation(location: string): Observable<any> {
    /*create an instance of geoCoder (only once) which will have access
     to google AGM api functionality*/
    if (!this.geoCoder) {
      this.geoCoder = new (<any>window).google.maps.Geocoder();
    }
    return new Observable((observer) => {
      this.geoCoder.geocode({ address: location }, (result, status) => {
        if (status === 'OK') {

          const geometry = result[0].geometry.location;
          const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

          // cache the coordinates first
          this.cacheLocation(location, coordinates);
          // emit info from observable
          observer.next(coordinates);
        } else {
          observer.error('Location could not be geocoded');
        }
      });
    });
  }

  public getGeoLocation(location: string): Observable<any> {
    // create observable because geocoding function are async.

    if (this.islocationCached(location)) {
      // return Observable with 'of' function from rxjs
      return of(this.locationCache[this.camelize(location)]);
    } else {
      return this.geocodeLocation(location);
    }
  }
}
