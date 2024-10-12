import mongoose, { Schema, Document, Model, Types, ObjectId } from "mongoose";
import { IAgent, IDisorder, IBond, IStats } from "@/types/agent";

const RuleSchema = new Schema(
  {
    ruleUpdated: {
      type: {
        type: String,
        enum: ["choose", "chooseIfNotOwned"],
        required: true,
      },
      count: { type: Number, required: true },
      text: { type: String, required: true },
    },
  },
  { _id: false }
);

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    base: { type: Number, required: true },
    value: { type: Number, required: true },
    requiresInput: { type: Boolean, required: true },
    inputLabel: String,
    userInput: String,
    bonuses: Number,
  },
  { _id: false }
);

const ProfessionSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  additionalSkills: [SkillSchema],
  professionalSkills: [SkillSchema],
  bonds: { type: Number, required: true },
  recommendedStats: { type: String, required: true },
  rule: RuleSchema,
});

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

const StatsSchema = new Schema<IStats>(
  {
    str: Number,
    con: Number,
    dex: Number,
    int: Number,
    pow: Number,
    cha: Number,
  },
  { _id: false }
);

const BondSchema = new Schema<IBond>(
  {
    bond: { type: String, required: true },
    bondScore: { type: Number, required: true },
  },
  { _id: false }
);

const DisorderSchema = new Schema<IDisorder>(
  {
    name: { type: String, required: true },
    description: String,
    type: {
      type: String,
      enum: ["unnatural", "helplessness", "violence"],
      required: true,
    },
  },
  { _id: false }
);

export type AgentDocument = Document & IAgent;

export const AgentSchema = new Schema<AgentDocument>(
  {
    givenName: { type: String, required: true },
    familyName: { type: String, required: true },
    profession: ProfessionSchema,
    employer: String,
    nationality: String,
    gender: { type: String, enum: ["M", "F"] },
    genderOther: String,
    birthDate: Date,
    education: String,
    physicalDescription: String,
    stats: StatsSchema,
    bonds: [BondSchema],
    motivations: { type: [String], required: true },
    disorders: [DisorderSchema],
    adaptedViolence: Number,
    adaptedHelplessness: Number,
    wounds: String,
    armorAndGear: String,
    weapons: [String],
    personalNotes: String,
    homeDevelopments: String,
    skills: [SkillSchema],
    hasCompletedCreation: { type: Boolean, required: true },
    statGenerationMode: { type: String, enum: ["manual", "point_buy", ""] },
  },
  {
    timestamps: true,
  }
);

export const Agent: Model<AgentDocument> =
  mongoose.models.Agent ||
  mongoose.model<AgentDocument>("Agent", AgentSchema, "Agents");
