/*
This file simply imports our models and creates an array with a list of
the tables we want to include when we connect to Postgres.
*/

import { Purchase } from '../models/classes/purchase';

export const postgresTables = [ Purchase ];