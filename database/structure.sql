CREATE TABLE
  "Dictionaries" (
    "dictionary_id" bigint generated always as identity,
    "name" varchar(64) NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "language" varchar(64) NOT NULL,
    "words" jsonb
  );
