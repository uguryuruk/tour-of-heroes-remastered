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
  //The weapons web API expects a special header in HTTP save requests.
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

/** GET weapon by id. Will 404 if id not found */
getWeapon(id: number): Observable<Weapon> {
  //address of the web api:
  const url = `${this.weaponsUrl}/${id}`;

  return this.http.get<Weapon>(url).pipe(
    // on success never touchs the original value
    tap(_ => this.log(`fetched weapon id=${id}`)),
    //on error
    catchError(this.handleError<Weapon>(`getWeapon id=${id}`))
  );
}

/** PUT: update the hero on the server */
updateWeapon(weapon: Weapon): Observable<any> {
  return this.http.put(this.weaponsUrl, weapon, this.httpOptions).pipe(
    //on success
    tap(_ => this.log(`updated weapon id=${weapon.id}`)),
    //on error
    catchError(this.handleError<any>('updateWeapon'))
  );
}

/** POST: add a new weapon to the server */
addWeapon(weapon: Weapon): Observable<Weapon> {
  return this.http.post<Weapon>(this.weaponsUrl, weapon, this.httpOptions).pipe(
    //on success
    tap((newWeapon: Weapon) => this.log(`added weapon w/ id=${newWeapon.id}`)),
    //on error
    catchError(this.handleError<Weapon>('addWeapon'))
  );
}

/** DELETE: delete the weapon from the server */
deleteWeapon(id: number): Observable<Weapon> {
  const url = `${this.weaponsUrl}/${id}`;

  return this.http.delete<Weapon>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted weapon id=${id}`)),
    catchError(this.handleError<Weapon>('deleteWeapon'))
  );
}

/* GET weapons whose name contains search term */
searchWeapons(term: string): Observable<Weapon[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  //if exists, send a http request and get the results.
  return this.http.get<Weapon[]>(`${this.weaponsUrl}/?name=${term}`).pipe(
    //on success
    tap(x => x.length ? //according to its length, found or not found
       this.log(`found weapons matching "${term}"`) :
       this.log(`no weapons matching "${term}"`)),
       //on error
    catchError(this.handleError<Weapon[]>('searchWeapons', []))
  );
}


}
