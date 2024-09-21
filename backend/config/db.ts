import { connect } from "mongoose";
import { inProduction } from "./env";
export const connectDb = async () => {
  const secret = process.env.mongo_uri;
  console.log("secret");
  if (!secret) throw new Error("verifié url mongo");
  await connect(secret, {
    dbName: inProduction ? "Immobilier" : "Immobilier_test",
  });
};
