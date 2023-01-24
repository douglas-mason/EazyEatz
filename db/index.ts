import mongoose, { Schema } from "mongoose";

export const startDb = async () => {
  try {
    const url = "mongodb://localhost:27017";
    await mongoose.connect(url, { dbName: "nfx-app" });
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("failed to connect to database", error);
  }
};

export const stopDb = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected to database successfully");
  } catch (error) {
    console.error("failed to disconnect to database", error);
  }
};

export interface ILocation {
  name: string;
  attributes: string[];
  count: number;
}

const locationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  attributes: { type: [String], required: true },
  count: { type: Number, required: true },
});

const Location = mongoose.model("location", locationSchema);

const saveLocationInfo = async ({ name, attributes, count }: ILocation) => {
  const results = await Location.updateOne(
    {
      name,
      attributes,
    },
    { count },
    { upsert: true }
  );
  return results.modifiedCount;
};

const getAllLocationInfo = async () => {
  const results = await Location.find({}, {}, { limit: 20 });
  return results;
};

export const queries = {
  saveLocationInfo,
  getAllLocationInfo,
};
