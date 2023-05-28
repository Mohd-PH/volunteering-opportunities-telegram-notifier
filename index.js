const { User } = require("./models/index.js");

const main = async () => {
  const user1 = await User.query().insertGraph({
    name: "user1",
    chat_id: Math.floor(Math.random() * 1231231),
  });

  console.log(`Created: ${JSON.stringify(user1)}`);
  return;
};

main();
