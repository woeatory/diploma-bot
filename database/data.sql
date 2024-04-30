INSERT INTO "Dictionaries" ("name", "language", "words")
VALUES (
  'my_dictionary',
  'english',
  '{
    "apple": "a round fruit with red or green skin and a whitish interior",
    "banana": "a long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe"
  }'::jsonb
);
