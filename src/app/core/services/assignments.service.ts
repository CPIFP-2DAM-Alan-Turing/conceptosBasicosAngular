import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assignment } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private _assignments: BehaviorSubject<Assignment[]> = new BehaviorSubject<Assignment[]>([]);
  public assignments$: Observable<Assignment[]> = this._assignments.asObservable();

  constructor(
      private http: HttpClient
  ) { }

    /**
     * Return an observable with a list of all the assignments.
     * @returns Observable<Assignment[]> 
     */
    public getAll(): Observable<Assignment[]> {
        return this.http.get<Assignment[]>(`${environment.BASE_URL}/assignments`).pipe(tap(res => {
            this._assignments.next(res);
        }));
    }

    /**
     * Returns an observable with the assignment with the id passed as a parameter.
     * @param id Assignment id
     * @returns Observable<Assignment>
     */
    public getAssignment(id: number): Observable<Assignment> {
        return this.http.get<Assignment>(`${environment.BASE_URL}/assignments/${id}`);
    }

    /**
     * Create a new assignment
     * @param assignment Assignment with the data to create
     * @returns Observable<Assignment>
     */
    public addAssignment(assignment: Assignment): Observable<Assignment> {
        return this.http.post<Assignment>(`${environment.BASE_URL}/assignments`, assignment).pipe(tap(_ => {
            this.getAll().subscribe();
        }));
    }

    /**
     * Update assignment data
     * @param assignment Assignment with the data to update
     * @returns Observable<Assignment>
     */
    public updateAssignment(assignment: Assignment): Observable<Assignment> {
        return this.http.put<Assignment>(`${environment.BASE_URL}/assignments/${assignment.id}`, assignment).pipe(tap(_ => {
            this.getAll().subscribe();
        }));
    }

    /**
     * Delete the assignment with the id passed as a parameter
     * @param id Assignment id
     * @returns Observable<Assignment>
     */
    public deleteAssignment(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.BASE_URL}/assignments/${id}`).pipe(tap(_ => {
            this.getAll().subscribe();
        }));
    }

}
