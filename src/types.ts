import { Session } from 'express-session';

export type AppSession = Session & {
  userId: string | number;
};
