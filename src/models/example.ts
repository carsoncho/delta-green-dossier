import mongoose, { Schema, Document, Model } from "mongoose";

interface IExample extends Document {
  name: string;
  age: number;
  occupation: string;
}

const exampleSchema: Schema<IExample> = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  occupation: { type: String, required: true },
});

const Example: Model<IExample> =
  mongoose.models.Example ||
  mongoose.model<IExample>("Example", exampleSchema, "Example");

export default Example;
