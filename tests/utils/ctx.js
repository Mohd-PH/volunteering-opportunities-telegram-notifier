const { faker } = require("@faker-js/faker");

module.exports = () => {
  return {
    reply: jest.fn(async (message, options) => {}),
    editMessageText: jest.fn(async (message) => {}),
    editMessageReplyMarkup: jest.fn(async (markup) => {}),
    message: {
      from: {
        first_name: faker.person.firstName(),
        username: faker.internet.userName(),
        id: faker.number.int({
          min: 1,
          max: 2000,
        }),
      },
      chat: {
        id: faker.number.int({
          min: 1,
          max: 2000,
        }),
      },
    },
  };
};
