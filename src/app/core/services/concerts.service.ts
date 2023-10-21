import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConcertInfoData } from '../models/concert-info-data.model';
import { concertsData } from '../data/concert-data';
import { Concert } from '../models/concert.model';

@Injectable({
    providedIn: 'root'
})
export class ConcertsService {
    private _concerts: BehaviorSubject<Concert[]> = new BehaviorSubject<Concert[]>([]);
    public concerts$: Observable<Concert[]> = this._concerts.asObservable();

    constructor() { }

    getAll() {
        return new Observable(observer => {
            setTimeout(() => {
                var concerts = concertsData[0].data;
                this._concerts.next(concerts);
                observer.next(concerts);
                observer.complete();
            }, 1000);
        });
    }
}
