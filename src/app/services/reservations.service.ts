import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  public API_URL = `${environment.apiUrl}`;
  constructor(public httpClient: HttpClient) { }

  public getReservationData(): Observable<any> {    
    return this.httpClient.get(this.API_URL).pipe(
      tap((res) => null),
      catchError((error) => error)
    );
  }
}
