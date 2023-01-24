import { getRestaurantCountByAttribute } from "./yelp-api.service";
import { ILocation, queries } from "../../db";

const locations = [
  "Pittsburgh, PA",
  "New York, NY",
  "Washington D.C.",
  "Los Angeles, CA",
  "Seattle, WA",
  "Chicago, IL",
  "Miami, FL",
  "Philadelphia, PA",
  "Houston, TX",
  "San Francisco, CA",
  "Charlotte, NC",
];
const attributes = ["gender_neutral_restrooms", "wheelchair_accessible"];

export const syncLocationData = async () => {
  const apiTasks: Promise<void>[] = [];
  const dbTasks: Promise<void>[] = [];
  const locationInfoRecords: ILocation[] = [];

  for (const location of locations) {
    for (const attribute of attributes) {
      const count = await getRestaurantCountByAttribute(location, [attribute]);
      locationInfoRecords.push({
        name: location,
        count,
        attributes: [attribute],
      });
    }
  }

  await Promise.all(apiTasks);

  for (const record of locationInfoRecords) {
    dbTasks.push(
      (async () => {
        await queries.saveLocationInfo({
          name: record.name,
          attributes: record.attributes,
          count: record.count,
        });
      })()
    );
  }

  await Promise.all(dbTasks);
};

export const getLocationInfo = async () => {
  const results = await queries.getAllLocationInfo();
  return results.map((r) => ({
    name: r.name,
    attributes: r.attributes,
    count: r.count,
  }));
};
