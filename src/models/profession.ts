import { IProfession } from "@/types/professions";
import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface IProfessionDocument extends IProfession, Document {
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

const professionSchema: Schema<IProfessionDocument> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  recommendedStats: { type: String, required: true },
  professionalSkills: { type: Object },
  additionalSkills: { type: Object },
  bonds: { type: Number, required: true },
  rule: { type: RuleSchema },
});

export const Profession: Model<IProfessionDocument> =
  mongoose.models.Profession ||
  mongoose.model<IProfessionDocument>(
    "Profession",
    professionSchema,
    "Professions"
  );
