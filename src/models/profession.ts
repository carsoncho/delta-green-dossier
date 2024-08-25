import { IProfession } from "@/types/professions";
import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

interface IProfessionDocument extends IProfession, Document {
  _id: ObjectId;
}

const RuleSchema = new Schema({
  ruleUpdated: {
    type: {
      type: String,
      enum: ["choose", "chooseIfNotOwned"],
      required: true,
    },
    count: { type: Number, required: true },
    text: { type: String, required: true },
  },
});

export const professionSchema: Schema<IProfessionDocument> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  recommendedStats: { type: String, required: true },
  professionalSkills: { type: Object },
  additionalSkills: { type: Object },
  bonds: { type: Number, required: true },
  rule: { type: RuleSchema },
});

const Professions: Model<IProfessionDocument> =
  mongoose.models.Professions ||
  mongoose.model<IProfessionDocument>(
    "Professions",
    professionSchema,
    "Professions"
  );

export default Professions;
