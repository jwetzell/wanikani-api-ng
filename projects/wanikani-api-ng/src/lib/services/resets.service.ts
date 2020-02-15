import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResetCollection } from '../models/reset/reset-collection.model';
import { Observable } from 'rxjs';
import { Reset } from '../models/reset/reset.model';

@Injectable()
export class ResetsService {

  public baseUrl = 'https://api.wanikani.com/v2/resets';
  public apiRevision = '20170710'

  private getHeaders = new HttpHeaders({
    'Wanikani-Revision': this.apiRevision
  });

  constructor(private http: HttpClient) { }

  /**
   * Return the collection of all resets
   * @param page Optional page for getting the next page from a paginated response
   */
  public getAllResets(page?: string): Observable<ResetCollection> {
    const url = !!page ? page: this.baseUrl;
    
    return this.http.get<ResetCollection>(url, { headers: this.getHeaders});
  }

  /**
   * Get a specific reset by id
   * @param id number identifier of reset to get
   */
  public getReset(id: number): Observable<Reset> {
    return this.http.get<Reset>(`${this.baseUrl}/${id}`, {headers: this.getHeaders});
  }

}