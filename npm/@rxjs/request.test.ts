import Axios from 'axios';
import { from, of, merge, concat, empty, Observable } from 'rxjs';
import { catchError, map, tap, mergeMap, mergeMapTo, concatMap, concatAll } from 'rxjs/operators';

const post = () => from(Axios.post('http://localhost:3000', {}, { timeout: 2000 }));
const log = (request: Observable<any>) => {
  return (source: Observable<any>): Observable<any> => source.pipe(
    tap(() => {
      console.log('request start');
    }),
    map(() => request),
    concatAll(),
    catchError((e) => {
      console.log('response end', e.message);
      throw e;
    }),
    tap(data => {
      console.log('response end', data);
    }),
  )
}
const task = () => {
  return of(1)
  .pipe(
    log(
      post().pipe(map(res => res.data))
    )
  )
  .pipe(catchError((e) => of(null)))
  .toPromise()
}

(async () => {
  console.log('1', await task());
  console.log('2', await task());
})()
