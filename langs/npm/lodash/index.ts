import * as _ from "lodash";

const result1 = _.groupBy([], x => x);

const result2 = _.pick({a:1, b:2, c:3}, []);
console.log();