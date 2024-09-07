import mongoose, { Schema, Document, Model, Types, ObjectId } from "mongoose";
import { IAgent, IDisorder } from "@/types/agent";

// Merging ITodo interface with mongoose's Document interface to create
// a new interface that represents a todo document in MongoDB
interface IAgentDocument extends IAgent, Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface IDisorderDocument extends IDisorder, Document {}

// Defining a mongoose schema for the todo document, specifying the types
// and constraints

export const disorderSchema: Schema<IDisorderDocument> = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
});

const agentSchema: Schema<IAgentDocument> = new Schema(
  {
    givenName: { type: String, required: true, trim: true },
    familyName: { type: String, required: true, trim: true },
    disorders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disorder" }],
    profession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professions",
    },
    birthDate: { type: Date },
    education: { type: String },
    gender: { type: String },
    genderOther: { type: String },
    physicalDescription: { type: String },
    motivations: { type: [String] },
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

// Creating a mongoose model for the Agent document
export const Disorder: Model<IDisorderDocument> =
  mongoose.models.Disorder ||
  mongoose.model<IDisorderDocument>("Disorder", disorderSchema, "Disorder");

// Creating a mongoose model for the Agent document
export const Agent: Model<IAgentDocument> =
  mongoose.models.Agent ||
  mongoose.model<IAgentDocument>("Agent", agentSchema, "Agents");
