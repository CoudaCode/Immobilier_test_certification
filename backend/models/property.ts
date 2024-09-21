import { Document, Schema, model } from "mongoose";

interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
}

const PropertySchema = new Schema<IProperty>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Property = model("Property", PropertySchema);
export { IProperty, Property };
