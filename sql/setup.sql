DROP TABLE IF EXISTS beers, cubes, movies, machines, albums;

CREATE TABLE beers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  abv TEXT NOT NULL,
  color TEXT
);

CREATE TABLE cubes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  dimensions TEXT NOT NULL,
  price TEXT
);

CREATE TABLE movies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  rating TEXT
);

CREATE TABLE machines (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  type TEXT
);

CREATE TABLE albums (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  genre TEXT
);