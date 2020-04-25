import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignmentCollection } from '../models/assignment/assignment-collection.model';
import { Assignment } from '../models/assignment/assignment.model';
import { AllAssignmentsParams } from '../models/assignment/all-assignments-params.model';
import { appendQueryToUrl } from '../util/query-param';
import { getHeaders, putHeaders } from '../constants';
import { publishReplay, refCount } from 'rxjs/operators';

const baseUrl = 'https://api.wanikani.com/v2/assignments';

@Injectable()
export class AssignmentService {

  private cache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) { }

  /**
   * Get a collection of all assignments
   * @param page Optional page to get assignments from
   * Return the assignment collection as an observable
   */
  public getAllAssignments(params?: AllAssignmentsParams, page?: string): Observable<AssignmentCollection> {
    const url = !!page ? page : appendQueryToUrl(params, baseUrl);
    const key = `ALL_ASSIGNMENTS:${url}`;

    if(!this.cache.has(key)) {
      this.cache.set(key, this.http.get<AssignmentCollection>(url, {headers: getHeaders}).pipe(
          publishReplay(1),
          refCount()
        )
      )
    }
    return <Observable<AssignmentCollection>>this.cache.get(key);
  }

  /**
   * Get a specific assignment by id
   * @param id id of assignment to retrieve
   * Return the assignment as an observable
   */
  public getAssignment(id: number): Observable<Assignment> {
    const key = `ASSIGNMENT:${id}`;

    if(!this.cache.has(key)) {
      this.cache.set(key, this.http.get<Assignment>(`${baseUrl}/${id}`,{ headers: getHeaders }).pipe(
          publishReplay(1),
          refCount()
        )
      );
    }

    return <Observable<Assignment>>this.cache.get(key);
  }

  /**
   * Start a specific assignment by id
   * @param id 
   * Return the started assignment as an observable
   */
  public startAssignment(id: number, req: {started_at?: Date} = {}): Observable<Assignment> {
    return this.http.put<Assignment>(`${baseUrl}/${id}/start`, req, { headers: putHeaders });
  }

  /**
   * Clear all cached observables
   */
  public clearCache() {
    this.cache.clear();
  }

}
