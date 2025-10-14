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
      data: Buffer,
      contentType: String,
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

// Add indexes for faster queries
projectSchema.index({ created_at: -1 }); // Index for sorting by creation date
projectSchema.index({ featured: 1 }); // Index for filtering featured projects
projectSchema.index({ category_id: 1 }); // Index for filtering by category
projectSchema.index({ tags: 1 }); // Index for searching by tags

export default mongoose.model('Project', projectSchema, 'projects');