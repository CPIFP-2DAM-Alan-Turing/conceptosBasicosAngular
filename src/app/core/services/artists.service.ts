import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artist } from '../models/artist.model';
import { artistsData } from '../data/artist-data';

export class ArtistNotFoundException extends Error {
}

@Injectable({
    providedIn: 'root'
})
export class ArtistsService {
    private _artists: BehaviorSubject<Artist[]> = new BehaviorSubject<Artist[]>([]);
    public artists$: Observable<Artist[]> = this._artists.asObservable();
    private id: number = 30; // Maximum Id from artists data list

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

    /**
    * Create a new artist
    * @param artist Artist with the data to create
    * @returns Observable<Artist>
    */
    public addArtist(artist: Artist): Observable<Artist> {
        return new Observable(observer => {
            setTimeout(() => {
                artist.id = ++this.id;
                var _artists = [...this._artists.value];
                _artists.push(artist);
                this._artists.next(_artists);
                observer.next(artist);
                observer.complete();
            }, 1000);
        });
    }


    /**
     * Update artist data
     * @param artist Artist with the data to update
     * @returns Observable<Concert>
     */
    public updateArtist(artist: Artist): Observable<Artist> {
        console.log("updateArtist")
        return new Observable(observer => {
            setTimeout(() => {
                var _artists = [...this._artists.value];
                var index = _artists.findIndex(a => a.id == artist.id);
                if (index < 0)
                    observer.error(new ArtistNotFoundException());
                else {
                    _artists[index] = artist;
                    observer.next(artist);
                    this._artists.next(_artists);
                }
                observer.complete();
            }, 500);
        });
    }

    /**
     * Delete the artist with the id passed as a parameter
     * @param id Artist id
     * @returns Observable<Artist>
     */
    public deleteConcert(id: number)
    //: Observable<void> 
    {
    }
}




