import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConcertData } from '../models/concert-data';
import { concertData } from '../data/concert-data';

@Injectable({
    providedIn: 'root'
})
export class ConcertsService {
    private _concerts: BehaviorSubject<ConcertData[]> = new BehaviorSubject<ConcertData[]>([]);
    public concerts$: Observable<ConcertData[]> = this._concerts.asObservable();

    constructor() { }

    getAll() {
        return new Observable(observer => {
            setTimeout(() => {
                var concerts = concertData;
                this._concerts.next(concerts);
                observer.next(concerts);
                observer.complete();
            }, 2000);

        });
    }
}
