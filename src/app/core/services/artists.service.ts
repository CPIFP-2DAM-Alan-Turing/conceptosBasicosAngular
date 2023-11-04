import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Artist } from '../models/artist.model';
import { artistsData } from '../data/artist-data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class ArtistNotFoundException extends Error {
}

@Injectable({
    providedIn: 'root'
})
export class ArtistsService {
    private _artists: BehaviorSubject<Artist[]> = new BehaviorSubject<Artist[]>([]);
    public artists$: Observable<Artist[]> = this._artists.asObservable();
    private id: number = 30; // Maximum Id from artists data list

    constructor(
        private http: HttpClient
    ) { }

    /**
    * Return an observable with a list of all the artists.
    * @returns Observable<Artist[]>
    */
    public getAll(): Observable<Artist[]> {
        return this.http.get<Artist[]>(`${environment.BASE_URL}/artists`).pipe(tap(res => {
            this._artists.next(res);
        }));
    }

    /**
    * Return an observable with a list of the availables artists.
    * @returns Observable<Artist[]>
    */
    public getAvailables(): Observable<Artist[]> {
        return this.http.get<Artist[]>(`${environment.BASE_URL}/artists?available=true`).pipe(tap(res => {
            this._artists.next(res);
        })
        );
    }

    /**
    * Create a new artist
    * @param artist Artist with the data to create
    * @returns Observable<Artist>
    */
    public addArtist(artist: Artist): Observable<Artist> {
        return this.http.post<Artist>(`${environment.BASE_URL}/artists`, artist).pipe(tap(_ => {
            this.getAll().subscribe();
        }));
    }


    /**
     * Update artist data
     * @param artist Artist with the data to update
     * @returns Observable<Concert>
     */
    public updateArtist(artist: Artist, toggle:boolean): Observable<Artist> {
        return this.http.put<Artist>(`${environment.BASE_URL}/artists/${artist.id}`, artist).pipe(tap(_ => {
            toggle == false ? this.getAll().subscribe() : this.getAvailables().subscribe();
        }));
    }

    /**
     * Delete the artist with the id passed as a parameter
     * @param id Artist id
     * @returns Observable<Artist>
     */
    public deleteArtist(id: number, toggle: boolean): Observable<void> {
        console.log("Toggle: " + toggle);
        return this.http.delete<void>(`${environment.BASE_URL}/artists/${id}`).pipe(tap(_ => {
            toggle == false ? this.getAll().subscribe() : this.getAvailables().subscribe();
        }));
    }
}




