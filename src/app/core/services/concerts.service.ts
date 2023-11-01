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
    deleteConcert(id: number): Observable<Concert>;
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
        console.log("Entra en createConcert(concert: Concert)");
        return new Observable<Concert>(observer => {
            setTimeout(() => {
                var _concerts = [...this._concerts.value];
                concert.id = ++this.id;
                _concerts.push(concert);
                this._concerts.next(_concerts);
                observer.next(concert);
            }, randomNum(this.min, this.max));
        });
    }

    /**
     * Update concert data
     * @param concert Concert with the data to update
     * @returns Observable<Concert>
     */
    public updateConcert(concert: Concert): Observable<Concert> {
        console.log("Entra en updateConcert(cncert: Concert)");
        return new Observable(observer => {
            setTimeout(() => {
                var _concerts = [...this._concerts.value];
                var index = _concerts.findIndex(u => u.id == concert.id);
                if (index < 0)
                    observer.error(new ConcertNotFoundException());
                else {
                    // TODO esto hay que quitarlo, es para que no se borre la imagen al hacer update
                    concert.image = _concerts[index].image;
                    _concerts[index] = concert;
                    observer.next(concert);
                    this._concerts.next(_concerts);
                }
                observer.complete();
            }, randomNum(this.min, this.max));
        });
    }

    /**
     * Delete the concert with the id passed as a parameter
     * @param id Concert id
     * @returns Observable<Concert>
     */
    public deleteConcert(id: number): Observable<Concert> {
        console.log("Entra en deleteConcert(id: number)");
        return new Observable(observer => {
            setTimeout(() => {
                var _concerts = [...this._concerts.value];
                var index = _concerts.findIndex(con => con.id == id);
                if (index < 0)
                    observer.error(new ConcertNotFoundException());
                else {
                    var removedConcert = _concerts[index];
                    _concerts = [..._concerts.slice(0, index), ..._concerts.slice(index + 1)];
                    this._concerts.next(_concerts);
                    observer.next(removedConcert);
                }
                observer.complete();
            }, randomNum(this.min, this.max));
        });
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
