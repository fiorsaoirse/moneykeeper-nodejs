-- CREATE TABLE moneykeeper.users
-- (
--     id serial NOT NULL,
--     login text NOT NULL,
--     password text NOT NULL,
--     email text NOT NULL,
--     PRIMARY KEY (id),
--     UNIQUE (login),
--     UNIQUE (email)
-- );

-- CREATE TABLE moneykeeper.boards
-- (
--     id serial NOT NULL,
--     name text NOT NULL,
--     "public" boolean NOT NULL DEFAULT false,
--     PRIMARY KEY (id)
-- );


-- CREATE TABLE moneykeeper.roles
-- (
--     id serial NOT NULL,
--     code text NOT NULL UNIQUE,
--     name text NOT NULL,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE moneykeeper.board_users
-- (
--     id serial NOT NULL,
--     board_id integer NOT NULL REFERENCES moneykeeper.boards ON DELETE CASCADE,
--     user_id integer NOT NULL REFERENCES moneykeeper.users ON DELETE RESTRICT,
--     role_id integer NOT NULL REFERENCES moneykeeper.roles ON DELETE RESTRICT,
--     PRIMARY KEY (id)
-- );

CREATE TABLE moneykeeper.purhcases
(
    id serial NOT NULL PRIMARY KEY,
    name text NOT NULL,
    created integer NOT NULL
);