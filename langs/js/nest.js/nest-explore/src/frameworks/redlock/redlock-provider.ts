import * as Redlock from 'redlock';
import { REDIS } from '../redis-cluster/constant';

export const RedLockProvider = {
  provide: Redlock,
  useFactory: client => {
    return new Redlock(
      // you should have one client for each independent redis node
      // or cluster
      [client],
      {
        // the expected clock drift; for more details
        // see http://redis.io/topics/distlock
        driftFactor: 0.1, // time in ms

        // the max number of times Redlock will attempt
        // to lock a resource before erroring
        retryCount: 60,

        // the time in ms between attempts
        retryDelay: 100, // time in ms

        // the max time in ms randomly added to retries
        // to improve performance under high contention
        // see https://www.awsarchitectureblog.com/2015/03/backoff.html
        retryJitter: 20, // time in ms
      },
    );
  },
  inject: [REDIS],
};
