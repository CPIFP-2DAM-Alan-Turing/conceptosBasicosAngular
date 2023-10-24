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
    public id = 50; // There are 50 concerts in the initial list

    constructor() { }

    public getAll(): Observable<Concert[]> {
        console.log("Entra en getAll()");
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
        console.log("Entra en getConcert(id)");
        return new Observable(observer => {
            setTimeout(() => {
                var concert = this._concerts.value.find(concert => concert.id == id);
                if (concert)
                    observer.next(concert);
                else
                    observer.error(new UserNotFoundException());
                observer.complete();
            }, 1000);
        });
    }
    public createConcert(concert: Concert): Observable<Concert> {
        console.log("Entra en createConcert(concert: Concert)");
        return new Observable<Concert>(observer=>{
            setTimeout(() => {
              var _concerts = [...this._concerts.value];
              concert.id = ++this.id;
              _concerts.push(concert);
              this._concerts.next(_concerts);
              observer.next(concert);
            }, 1000);
          });
    }
    public updateConcert(data: any): Observable<Concert> {
        console.log("Entra en updateConcert(data: any)");
        throw new Error('Method not implemented.');
    }
    public deleteConcert(id: number): Observable<Concert> {
        console.log("Entra en deleteConcert(id: number)");
        throw new Error('Method not implemented.');
    }
}


export class UserNotFoundException extends Error {
    // . declare any additional properties or methods .
}