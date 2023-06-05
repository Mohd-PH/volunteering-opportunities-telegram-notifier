const compose_opportunitiy_message = require("../../bot/compose_opportunitiy_message");
const faker = require("../utils/faker");

describe("Opportunity message composer", () => {
  test("It composes the message for moh", () => {
    const city = faker.city(1);
    const opportunity = faker.opportunity(1, { city, source: "MOH" });

    expect(compose_opportunitiy_message(opportunity)).toBe(
      [
        `فرصة تطوعية جديدة`,
        `منصة التطوع الصحي`,
        `المدينة: ${opportunity.city.name_ar}`,
        `جهة التطوع: ${opportunity.department_name_ar}`,
        `عنوان الفرصة: ${opportunity.title}`,
        `شرح الفرصة: ${opportunity.description}`,
        `عدد المقبولين: ${opportunity.accepted_volunteers}/${opportunity.required_volunteers}`,
        `جنس المتطوعين المطلوب: ${opportunity.gender}`,
        `التاريخ: ${new Date(opportunity.start_date)
          .toJSON()
          .slice(0, 10)} إلى ${new Date(opportunity.end_date)
          .toJSON()
          .slice(0, 10)}`,
        `المشرف: ${opportunity.event_leader_name}`,
        `رقم التواصل مع المشرف: ${opportunity.event_leader_phone}`,
        `رابط الفرصة: https://volunteer.srca.org.sa/#!/ar/PrivateEventsInfoDetails/${opportunity.source_id}`,
      ].join("\n")
    );
  });

  test("It composes the message for srca", () => {
    const city = faker.city(1);
    const opportunity = faker.opportunity(1, { city, source: "SRCA" });

    expect(compose_opportunitiy_message(opportunity)).toBe(
      [
        `فرصة تطوعية جديدة`,
        `الهلال الأحمر`,
        `المدينة: ${opportunity.city.name_ar}`,
        `جهة التطوع: ${opportunity.department_name_ar}`,
        `عنوان الفرصة: ${opportunity.title}`,
        `شرح الفرصة: ${opportunity.description}`,
        `عدد المقبولين: ${opportunity.accepted_volunteers}/${opportunity.required_volunteers}`,
        `جنس المتطوعين المطلوب: ${opportunity.gender}`,
        `التاريخ: ${new Date(opportunity.start_date)
          .toJSON()
          .slice(0, 10)} إلى ${new Date(opportunity.end_date)
          .toJSON()
          .slice(0, 10)}`,
        `المشرف: ${opportunity.event_leader_name}`,
        `رقم التواصل مع المشرف: ${opportunity.event_leader_phone}`,
        `رابط الفرصة: https://srcavolunteer.srca.org.sa/#!/ar/EventsInfoDetails/${opportunity.source_id}`,
      ].join("\n")
    );
  });

  test("It composes the message if some data is messing", () => {
    const city = faker.city(1);
    const opportunity = faker.opportunity(1, {
      city,
      source: "SRCA",
      description: null,
      accepted_volunteers: null,
    });

    expect(compose_opportunitiy_message(opportunity)).toBe(
      [
        `فرصة تطوعية جديدة`,
        `الهلال الأحمر`,
        `المدينة: ${opportunity.city.name_ar}`,
        `جهة التطوع: ${opportunity.department_name_ar}`,
        `عنوان الفرصة: ${opportunity.title}`,
        `جنس المتطوعين المطلوب: ${opportunity.gender}`,
        `التاريخ: ${new Date(opportunity.start_date)
          .toJSON()
          .slice(0, 10)} إلى ${new Date(opportunity.end_date)
          .toJSON()
          .slice(0, 10)}`,
        `المشرف: ${opportunity.event_leader_name}`,
        `رقم التواصل مع المشرف: ${opportunity.event_leader_phone}`,
        `رابط الفرصة: https://srcavolunteer.srca.org.sa/#!/ar/EventsInfoDetails/${opportunity.source_id}`,
      ].join("\n")
    );
  });
});
