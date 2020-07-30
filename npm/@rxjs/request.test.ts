import Axios from 'axios';
import { from, of, merge, concat, empty } from 'rxjs';
import { catchError, map, tap, mergeMap, mergeMapTo, concatMap, concatAll } from 'rxjs/operators';

const post = () => from(Axios.post('http://localhost:3000', {}, { timeout: 2000 }));
const task = () => {
  return of(1).pipe(
    tap(() => {
      console.log('request start');
    }),
    map(x => post().pipe(map(res => res.data))),
    concatAll(),
    catchError((e) => of(e)),
    tap(data => {
      if (data instanceof Error) {
        return console.log('response end', data.message);
      }
      console.log('response end', data);
    }),
    map(x => x instanceof Error ? null : x),
  ).toPromise();
}

(async () => {
  console.log('1', await task());
  console.log('2', await task());
})()
