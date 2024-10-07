import mongoose, { Schema, Document, Model, Types, ObjectId } from "mongoose";
import { IAgent, IDisorder } from "@/types/agent";
import { IProfession } from "@/types/professions";

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

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    requiresInput: { type: Boolean, required: true },
    inputLabel: { type: String },
    userInput: { type: String },
  },
  { _id: false }
);

export interface IProfessionDocument extends IProfession, Document {
  _id: ObjectId;
}

const ProfessionSchema: Schema<IProfessionDocument> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  recommendedStats: { type: String, required: true },
  professionalSkills: [SkillSchema],
  additionalSkills: [SkillSchema],
  bonds: { type: Number, required: true },
  rule: { type: RuleSchema },
});

export const Profession: Model<IProfessionDocument> =
  mongoose.models.Profession ||
  mongoose.model<IProfessionDocument>(
    "Profession",
    ProfessionSchema,
    "Professions"
  );

interface DisorderDocument extends IDisorder, Document {}

export const disorderSchema: Schema<DisorderDocument> = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ["unnatural", "helplessness", "violence"],
    required: true,
    trim: true,
  },
});

export const Disorder: Model<DisorderDocument> =
  mongoose.models.Disorder ||
  mongoose.model<DisorderDocument>("Disorder", disorderSchema, "Disorder");

// Merging ITodo interface with mongoose's Document interface to create
// a new interface that represents a todo document in MongoDB
export interface AgentDocument extends IAgent, Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
// Defining a mongoose schema for the todo document, specifying the types
// and constraints

const agentSchema: Schema<AgentDocument> = new Schema(
  {
    givenName: { type: String, required: true, trim: true },
    familyName: { type: String, required: true, trim: true },
    disorders: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disorder" }],
      default: null,
    },
    profession: { type: ProfessionSchema },
    birthDate: { type: Date, default: null },
    education: { type: String, default: null },
    gender: { type: String, default: null },
    genderOther: { type: String },
    physicalDescription: { type: String },
    motivations: { type: [String] },
    skills: { type: [SkillSchema] },
    stats: {
      str: { type: Number, min: 3, max: 18 },
      con: { type: Number, min: 3, max: 18 },
      dex: { type: Number, min: 3, max: 18 },
      int: { type: Number, min: 3, max: 18 },
      pow: { type: Number, min: 3, max: 18 },
      cha: { type: Number, min: 3, max: 18 },
    },
    hasCompletedCreation: { type: Boolean, default: false },
    statGenerationMode: { type: String, enum: ["manual", "point_buy", ""] },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: true,
  }
);

export const Agent: Model<AgentDocument> =
  mongoose.models.Agent ||
  mongoose.model<AgentDocument>("Agent", agentSchema, "Agents");
