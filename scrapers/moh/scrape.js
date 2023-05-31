const axios = require("axios");
const { Region, City, Opportunity } = require("../../models");

const parseRegion = (region) => {
  return {
    name_en: region.Name,
    name_ar: region.NameAr,
  };
};

const parseCity = (city, regions, regionsInDB) => {
  return {
    name_en: city.Name,
    name_ar: city.NameAr,
    region_id: regionsInDB.find(
      (regionInDB) =>
        regionInDB.name_en ==
        regions.find((region) => region.Id == city.RegionId)?.Name
    )?.id,
    latitude: city.Latitude,
    longitude: city.Longitude,
  };
};

const parseOpportunity = (opportunity, cities, citiesInDB) => {
  return {
    source_id: opportunity.Id,
    source: "MOH",
    title: opportunity.Name,
    city_id: citiesInDB.find(
      (cityInDB) =>
        cityInDB.name_en ==
        cities.find((city) => city.Id == opportunity.CityId)?.Name
    )?.id,
    description: opportunity.Description,
    start_date: new Date(opportunity.StartDate),
    end_date: new Date(opportunity.EndDate),
    department_name_en: opportunity.DepartmentName,
    department_name_ar: opportunity.DepartmentNameAr,
    location: opportunity.Location,
    accepted_volunteers: opportunity.AcceptedVolunteers,
    required_volunteers: opportunity.RequiredVolunteers,
    is_invitation_full: opportunity.IsInvitationsFull,
    event_leader_name: opportunity.EventLeadName,
    event_leader_phone: opportunity.EventLeadMobile,
    event_leader_email: opportunity.EventLeadEmail,
    type_ar: opportunity.TypeEn,
    type_en: opportunity.TypeAr,
    category_en: opportunity.CategoryName,
    category_ar: opportunity.CategoryNameAr,
    gender: opportunity.EventGenderArName,
  };
};

const scrape = async () => {
  try {
    console.log("Started scraping regions");
    const regions = (
      await axios.get(
        "https://volunteer.srca.org.sa/api/utils/regionsRegistration/read"
      )
    ).data;

    console.log("Started seeding regions");
    const regionsInDB = [];
    for (const region of regions.map(parseRegion)) {
      let regionInDB = await Region.query().findOne(region).skipUndefined();
      if (!regionInDB) {
        regionInDB = await Region.query().insertGraph(region);
        console.log(`New Region ${region.name_en}`);
      }
      regionsInDB.push(regionInDB);
    }
    console.log("Finished seeding regions");

    console.log("Started scraping cities");
    const cities = (
      await axios.get(
        "https://volunteer.srca.org.sa/api/utils/citiesRegistration/read"
      )
    ).data;

    console.log("Started seeding cities");
    const citiesInDB = [];
    for (const city of cities.map((city) =>
      parseCity(city, regions, regionsInDB)
    )) {
      let cityInDB = await City.query()
        .findOne({
          name_en: city.name_en,
          name_ar: city.name_ar,
        })
        .skipUndefined();
      if (!cityInDB) {
        cityInDB = await City.query().insertGraph(city);
        console.log(`New city ${city.name_en}`);
      }
      citiesInDB.push(cityInDB);
    }

    console.log("Finished seeding cities");

    console.log("Started scraping opportunitis");
    const opportunities = (
      await axios.get(
        "https://volunteer.srca.org.sa/api/utils/home/events/privateEventsbyPageWithRegionsCitiesSQL/1/-1/0/0/0/99999999"
      )
    ).data;

    console.log("Started seeding opportunities");
    const opportunitiesInDB = [];
    for (const opportunity of opportunities.map((opportunity) =>
      parseOpportunity(opportunity, cities, citiesInDB)
    )) {
      let opportunityInDB = await Opportunity.query()
        .findOne(opportunity)
        .skipUndefined();
      if (!opportunityInDB) {
        opportunityInDB = await Opportunity.query().insertGraph(opportunity);
        console.log(`New opportunitiy ${opportunity.title}`);
      }
      opportunitiesInDB.push(opportunityInDB);
    }

    console.log("Finished seeding opportunities");
    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

module.exports = {
  scrape,
  parseOpportunity,
  parseRegion,
  parseCity,
};
