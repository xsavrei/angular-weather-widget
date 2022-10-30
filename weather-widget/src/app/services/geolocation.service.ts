import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  /* https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition */
  private readonly options = {
    maximumAge: 300000,
    timeout: 10000, /* in milliseconds */
    enableHighAccuracy: true
  }

  constructor() { }

  getLocationOnce(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {

      if (!navigator.geolocation) {
        console.error('Geolocation is not supported for this Browser/OS.');
        reject('Geolocation is not supported for this Browser/OS.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          console.log('geolocation', position.coords);
          resolve(position);
        },
        error => {
          console.error('Error getting geolocation data', error);
        },
        this.options);
    });
  }
}
