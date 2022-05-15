import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';  //asenkron işlemler için.
import { Weapon } from './weapon';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  //The heroes web API expects a special header in HTTP save requests.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private weaponsUrl = 'api/weapons';  // URL to web api


  constructor(private http: HttpClient,
    private messageService: MessageService) { }

    private log(message: string) {
      this.messageService.add(`WeaponService: ${message}`);
    }

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/** GET weapons from the server */
getWeapons(): Observable<Weapon[]> {
  return this.http.get<Weapon[]>(this.weaponsUrl)
    .pipe(
      tap(_ => this.log('fetched weapons')),
      catchError(this.handleError<Weapon[]>('getWeapons', []))
    );
}

}
