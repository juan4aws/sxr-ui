import {Http, RequestOptions, Response, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import {CognitoService} from './cognito.service';

@Injectable()
export class WildRydesService {

    private _API_ROOT = environment.wildRydesAPI;

    currentTickets: any = [
        {
        }
    ];

    constructor ( private http: Http,
                  private cognitoService: CognitoService) {

    }

    /**
     *
     * @returns {Observable<any>}
     */
    getRidesForUser() {
        return this.http.get(this._API_ROOT + 'ratings/demo-ride-id/' + this.cognitoService.currentEmailID)
            .map((res: Response) => res.json());
    }

    updateComment(ride: any, comment: any) {

        const body = {

            'user_id': this.cognitoService.currentEmailID,
            'ride_id': ride.ride_id,
            'comment': comment,
            'rating': ride.rating

        };
        const bodyString = JSON.stringify(body); // Stringify payload
        const headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        const options    = new RequestOptions({ headers: headers }); // Create a request option


        return this.http.post(this._API_ROOT + 'ratings/new', bodyString, options)
            .map((res: Response) => res.json());

    }

    updateRating(ride: any, rating: number) {

        const body = {

            'user_id':  this.cognitoService.currentEmailID,
            'ride_id':  ride.ride_id,
            'comment':  ride.comment,
            'rating':   rating

        };
        const bodyString = JSON.stringify(body); // Stringify payload
        const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        const options       = new RequestOptions({ headers: headers }); // Create a request option


        return this.http.post(this._API_ROOT + 'ratings/new', bodyString, options)
            .map((res: Response) => res.json())

    }

}
