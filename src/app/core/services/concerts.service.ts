import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Concert } from '../models/concert.model';

interface CrudConcerts {
    getAll(): Observable<Concert[]>;
    getConcert(id: number): Observable<Concert>;
    addConcert(concert: Concert): Observable<Concert>;
    updateConcert(concert: Concert): Observable<Concert>;
    deleteConcert(id: number): Observable<void>;
}
@Injectable({
    providedIn: 'root'
})
export class ConcertsService implements CrudConcerts {
    private _concerts: BehaviorSubject<Concert[]> = new BehaviorSubject<Concert[]>([]);
    public concerts$: Observable<Concert[]> = this._concerts.asObservable();
    public id = 50;      // There are 50 concerts in the initial list
    private min = 0;     // Var for min delay in loading data
    private max = 2000;  // Var for max delay in loading data

    constructor(private http: HttpClient) { }

    /**
     * Return an observable with a list of all the concerts.
     * @returns Observable<Concert[]> 
     */
    public getAll(): Observable<Concert[]> {
        return this.http.get<Concert[]>(`${environment.BASE_URL}/concerts`).pipe(tap(res => {
            this._concerts.next(res);
        }));
    }

    /**
     * Returns an observable with the concert with the id passed as a parameter.
     * @param id Concert id
     * @returns Observable<Concert>
     */
    public getConcert(id: number): Observable<Concert> {
        return this.http.get<Concert>(`${environment.BASE_URL}/concerts/${id}`);
    }

    /**
     * Create a new concert
     * @param concert Concert with the data to create
     * @returns Observable<Concert>
     */
    public addConcert(concert: Concert): Observable<Concert> {
        return this.http.post<Concert>(`${environment.BASE_URL}/concerts`, concert).pipe(tap(_ => {
            this.getAll().subscribe();
        }));
    }

    /**
     * Update concert data
     * @param concert Concert with the data to update
     * @returns Observable<Concert>
     */
    public updateConcert(concert: Concert): Observable<Concert> {
        return this.http.put<Concert>(`${environment.BASE_URL}/concerts/${concert.id}`, concert).pipe(tap(_ => {
            this.getAll().subscribe();
        }));
    }

    /**
     * Delete the concert with the id passed as a parameter
     * @param id Concert id
     * @returns Observable<Concert>
     */
    public deleteConcert(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.BASE_URL}/concerts/${id}`).pipe(tap(_ => {
            this.getAll().subscribe();
        }));
    }
}


/**
 * Class for exception for concert not found
 */
export class ConcertNotFoundException extends Error {
    // . declare any additional properties or methods .
}

/**
 * Generate a random number between the two numbers passed as parameters
 * @param min Min value
 * @param max Max value
 * @returns number
 */
function randomNum(min: number, max: number): number {
    const time = (Math.floor(Math.random() * (max - min) + min));
    console.log("Delay: ", time);
    return time;
}
