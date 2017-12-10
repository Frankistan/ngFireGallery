import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class LocationService {

    private geolocationPosition: Position;
    private address$: BehaviorSubject<string> = new BehaviorSubject("profile.location_not_available");

    constructor(
        private _http: HttpClient,
    ) {
        this.getLocation();
    }

    getLocation() {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.geolocationPosition = position,
                        this._http.get(`http://mas.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=true`).subscribe(res => {
                            if (!res) return;
                            let data: any = res;
                            let address = data.results[1].formatted_address;
                            this.address$.next(address);
                        });
                },
                error => {
                    switch (error.code) {
                        case 1:
                            console.log('Permission Denied');
                            break;
                        case 2:
                            console.log('Position Unavailable');
                            break;
                        case 3:
                            console.log('Timeout');
                            break;
                    }
                }
            );
        };
    }


    get getAddress() {
        return this.address$.asObservable();
    }
}
