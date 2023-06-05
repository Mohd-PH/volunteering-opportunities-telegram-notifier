module.exports = (opportunity) => {
  const messageParts = [`فرصة تطوعية جديدة`];

  if (opportunity.source === "MOH") {
    messageParts.push(`منصة التطوع الصحي`);
  } else if (opportunity.source === "SRCA") {
    messageParts.push(`الهلال الأحمر`);
  }

  if (opportunity.city?.name_ar) {
    messageParts.push(`المدينة: ${opportunity.city.name_ar}`);
  }

  if (opportunity.department_name_ar) {
    messageParts.push(`جهة التطوع: ${opportunity.department_name_ar}`);
  }

  if (opportunity.title) {
    messageParts.push(`عنوان الفرصة: ${opportunity.title}`);
  }

  if (opportunity.description) {
    messageParts.push(`شرح الفرصة: ${opportunity.description}`);
  }

  if (opportunity.accepted_volunteers && opportunity.required_volunteers) {
    messageParts.push(
      `عدد المقبولين: ${opportunity.accepted_volunteers}/${opportunity.required_volunteers}`
    );
  }

  if (opportunity.gender) {
    messageParts.push(`جنس المتطوعين المطلوب: ${opportunity.gender}`);
  }

  if (opportunity.start_date && opportunity.end_date) {
    messageParts.push(
      `التاريخ: ${new Date(opportunity.start_date)
        .toJSON()
        .slice(0, 10)} إلى ${new Date(opportunity.end_date)
        .toJSON()
        .slice(0, 10)}`
    );
  }

  if (opportunity.event_leader_name) {
    messageParts.push(`المشرف: ${opportunity.event_leader_name}`);
  }

  if (opportunity.event_leader_phone) {
    messageParts.push(
      `رقم التواصل مع المشرف: ${opportunity.event_leader_phone}`
    );
  }

  if (opportunity.source === "MOH") {
    messageParts.push(
      `رابط الفرصة: https://volunteer.srca.org.sa/#!/ar/PrivateEventsInfoDetails/${opportunity.source_id}`
    );
  } else if (opportunity.source === "SRCA") {
    messageParts.push(
      `رابط الفرصة: https://srcavolunteer.srca.org.sa/#!/ar/EventsInfoDetails/${opportunity.source_id}`
    );
  }

  return messageParts.join("\n");
};
