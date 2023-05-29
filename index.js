const { User, Region } = require("./models/index.js");

const main = async () => {
  const randomNumber = Math.floor(Math.random() * 1231231);
  const user1 = await User.query().insertGraph({
    telegram_user_id: randomNumber,
    username: "user 1",
    name: "user1",
    chat_id: randomNumber,
  });
  console.log(`Created: ${JSON.stringify(user1)}`);

  const region1 = await Region.query().insertGraph({
    name: `Central region ${randomNumber}`,
  });
  console.log(`Created: ${JSON.stringify(region1)}`);

  const location1 = await region1.$relatedQuery("locations").insert({
    name: `Riyadh ${randomNumber}`,
    region: region1,
  });

  const opportunity1 = await location1.$relatedQuery("opportunities").insert({
    source: "MOH",
    source_id: "2334",
    title: "aaaaa",
  });

  // await user1.$relatedQuery("locations").relate(location1);
  await opportunity1.$relatedQuery("users").relate(user1);
  console.log(`Created: ${JSON.stringify(location1)}`);
  return;
};

main();
