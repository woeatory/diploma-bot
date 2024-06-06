/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('Dictionaries').insert([
    {
      title: 'my dictionary',
      language: 'English',
      owner_id: '6965493277',
      words: {
        nocturnal: 'active mainly during the night',
        prolific: 'producing a large amount of something',
        relapse: 'the return of an illness after a period of improvement ',
      },
    },
    {
      title: 'woeatory dictionary',
      language: 'English',
      owner_id: '399951367',
      words: {
        nocturnal: 'active mainly during the night',
        prolific: 'producing a large amount of something',
        relapse: 'the return of an illness after a period of improvement ',
        'start off': 'a start given to contestant',
        pursue:
          'to follow and try to catch or capture (someone or something) for usually a long distance or time',
        thrive: 'to grow or develop successfully',
        curiosity:
          'the desire to learn or know more about something or someone',
        thorough: 'including every possible part or detail',
        proficiencies: 'навички',
        fame: 'the condition of being known or recognized by many people',
        ubiquitous: 'seeming to be seen everywhere',
        ambiguity:
          'something that does not have a single clear meaning : something that is ambiguous',
      },
    },
  ]);
}
