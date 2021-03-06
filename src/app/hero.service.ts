import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';  //asenkron işlemler için.
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //The heroes web API expects a special header in HTTP save requests.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private heroesUrl = 'api/heroes';  // URL to web api

  //service in service
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
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

//asenkron!
//adds incoming heroes to the messages property of msgs service. Then you use it from there
/** GET heroes from the server */
getHeroes(): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
}

/** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  //address of the web api:
  const url = `${this.heroesUrl}/${id}`;

  return this.http.get<Hero>(url).pipe(
    // on success never touchs the original value
    tap(_ => this.log(`fetched hero id=${id}`)),
    //on error
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}

/** PUT: update the hero on the server */
updateHero(hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    //on success
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    //on error
    catchError(this.handleError<any>('updateHero'))
  );
}

/** POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    //on success
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    //on error
    catchError(this.handleError<Hero>('addHero'))
  );
}

/** DELETE: delete the hero from the server */
deleteHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  //if exists, send a http request and get the results.
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    //on success
    tap(x => x.length ? //according to its length, found or not found
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
       //on error
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

}
