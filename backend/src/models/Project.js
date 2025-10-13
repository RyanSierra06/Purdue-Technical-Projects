import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      sparse: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    category_id: {
      type: String,
      enum: ['personal-project', 'class-project', 'hackathon', 'other'],
      default: 'other',
    },

    tags: {
      type: [String],
      default: [],
    },

    members: {
      type: [String],
      default: [],
    },

    links: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: ['active', 'completed', 'archived'],
      default: 'active',
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export default mongoose.model('Project', projectSchema, 'projectsSample');