import * as expressSession from 'express-session';

export const SessionMiddleware = expressSession({
  secret: 'keyboardcat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400 * 1000 },
});
