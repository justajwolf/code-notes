import {from, of} from 'rxjs';
import {flatMap, catchError, map, reduce} from 'rxjs/operators';
const ob = of([1,2,3], [4,5,6], [7,8,9]).pipe(
  flatMap(x => x),
  map(x => {
    if (x = 5) throw new Error('number:5');
    return x;
  }),
  catchError(e => of(e.message)),
  reduce((acc, v) => (acc.push(v), acc), []),
);
// ob.toPromise().then(x => console.log('promise',x)).catch(err => console.log(err.message));
ob.subscribe({
  next(x) {
    console.log('sub', x);
  },
  error(e) {
    console.log('error', e)
  },
  complete() {
    console.log('finished')
  }
})