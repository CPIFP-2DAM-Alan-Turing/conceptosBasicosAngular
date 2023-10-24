import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { concertsData } from '../data/concert-data';
import { Concert } from '../models/concert.model';

interface CrudConcerts {
    getAll(): Observable<Concert[]>;
    getConcert(id: number): Observable<Concert>;
    createConcert(concert: Concert): Observable<Concert>;
    updateConcert(data: any): Observable<Concert>;
    deleteConcert(id: number): Observable<Concert>;
}
@Injectable({
    providedIn: 'root'
})
export class ConcertsService implements CrudConcerts {
    private _concerts: BehaviorSubject<Concert[]> = new BehaviorSubject<Concert[]>([]);
    public concerts$: Observable<Concert[]> = this._concerts.asObservable();

    constructor() { }

    public getAll(): Observable<Concert[]> {
        return new Observable(observer => {
            setTimeout(() => {
                var concerts = concertsData;
                this._concerts.next(concerts);
                observer.next(concerts);
                observer.complete();
            }, 1000);
        });
    }

    public getConcert(id: number): Observable<Concert> {
        throw new Error('Method not implemented.');
    }
    public createConcert(concert: Concert): Observable<Concert> {
        throw new Error('Method not implemented.');
    }
    public updateConcert(data: any): Observable<Concert> {
        throw new Error('Method not implemented.');
    }
    public deleteConcert(id: number): Observable<Concert> {
        throw new Error('Method not implemented.');
    }
}
