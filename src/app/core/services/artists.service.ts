import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artist } from '../models/artist.model';
import { artistsData } from '../data/artist-data';

@Injectable({
    providedIn: 'root'
})
export class ArtistsService {
    private _artists: BehaviorSubject<Artist[]> = new BehaviorSubject<Artist[]>([]);
    public artists$: Observable<Artist[]> = this._artists.asObservable();

    constructor() { }

    /**
    * Return an observable with a list of all the artists.
    * @returns Observable<Artist[]>
    */
    public getAll(): Observable<Artist[]> {
        return new Observable(observer => {
            setTimeout(() => {
                var artists: Artist[] = artistsData;
                this._artists.next(artists);
                observer.next(artists);
                observer.complete();
            }, 1000);
        })
    }

    /**
* Return an observable with a list of the availables artists.
* @returns Observable<Artist[]>
*/
    public getAvailables(): Observable<Artist[]> {
        return new Observable(observer => {
            setTimeout(() => {
                var artists: Artist[] = artistsData.filter(artist => artist.available == true);
                this._artists.next(artists);
                observer.next(artists);
                observer.complete();
            }, 1000);
        })
    }

}



