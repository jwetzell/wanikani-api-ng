import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewCollection } from '../models/review/review-collection.model';
import { Review } from '../models/review/review.model';
import { CreateReviewRequest } from '../models/review/create-review-request.model';
import { CreateReviewResponse } from '../models/review/create-review-response.model';

@Injectable()
export class ReviewsService {
  public baseUrl = 'https://api.wanikani.com/v2/reviews'
  public apiRevision = '20170710'

  private getHeaders = new HttpHeaders({
    'Wanikani-Revision': this.apiRevision
  });

  private postHeaders = new HttpHeaders({
    'Wanikani-Revision': this.apiRevision,
    'Content-Type': 'application/json; charset=utf-8'
  });
  
  constructor(private http: HttpClient) { }

  /**
   * Get a collection of all reviews
   * @param page Optional next page from review response
   */
  public getAllReviews(page?: string): Observable<ReviewCollection> {
    const url = !!page ? page : this.baseUrl;
    return this.http.get<ReviewCollection>(`${url}`, { headers: this.getHeaders });
  }

  /**
   * Get a specific review by id
   * @param id Id of review
   */
  public getReview(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.baseUrl}/${id}`, { headers: this.getHeaders });
  }

  /**
   * Create a new review
   * @param request CreateReviewRequest with assignment to create
   */
  public createReview(request: CreateReviewRequest): Observable<CreateReviewResponse> {
    return this.http.post<CreateReviewResponse>(`${this.baseUrl}`, 
      {'review': request}, 
      {headers: this.postHeaders});
  }
}
