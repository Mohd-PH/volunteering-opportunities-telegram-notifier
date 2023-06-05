const { faker } = require("@faker-js/faker");
module.exports = {
  region: (options = {}) => {
    return Object.assign(
      {
        name_en: faker.word.noun({ length: 3 }),
        name_ar: faker.word.noun({ length: 3 }),
      },
      options
    );
  },
  city: (region_id, options = {}) => {
    return Object.assign(
      {
        name_en: faker.word.noun({ length: 3 }),
        name_ar: faker.word.noun({ length: 3 }),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        region_id,
      },
      options
    );
  },
  opportunity: (city_id, options = {}) => {
    const start_date = options.start_date
      ? options.start_date
      : faker.date.anytime().toISOString();

    const end_date = options.end_date
      ? options.end_date
      : new Date(
          new Date(start_date).valueOf() +
            1000 * 60 * 60 * 24 * faker.number.int({ min: 2, max: 4 })
        ).toISOString();
    const accepted_volunteers = faker.number.int({ min: 1, max: 10 });
    return Object.assign(
      {
        source_id: faker.number.int(),
        source: faker.word.noun({ max: 1 }),
        title: faker.lorem.paragraph(),
        city_id,
        description: faker.lorem.paragraphs(5),
        start_date,
        end_date,
        department_name_en: faker.word.noun({ max: 1 }),
        department_name_ar: faker.word.noun({ max: 1 }),
        location: faker.word.noun({ max: 3 }),
        accepted_volunteers,
        required_volunteers:
          accepted_volunteers + faker.number.int({ min: 1, max: 10 }),
        is_invitation_full: false,
        event_leader_name: faker.person.fullName(),
        event_leader_phone: faker.phone.number("05########"),
        event_leader_email: faker.internet.email(),
        type_ar: faker.word.noun({ max: 1 }),
        type_en: faker.word.noun({ max: 1 }),
        category_en: faker.word.noun({ max: 1 }),
        category_ar: faker.word.noun({ max: 1 }),
        gender: faker.person.gender(),
      },
      options
    );
  },
  user: (options = {}) => {
    return Object.assign(
      {
        telegram_user_id: faker.number
          .int({ min: 3000, max: 10000 })
          .toString(),
        chat_id: faker.number.int({ min: 3000, max: 10000 }).toString(),
        name: faker.person.firstName(),
        username: faker.internet.userName(),
        active: true,
      },
      options
    );
  },
};
