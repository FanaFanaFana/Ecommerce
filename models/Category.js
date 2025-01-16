import mongoose, { model, Schema, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // Optional field for a category image
  parentCategory: { type: mongoose.Types.ObjectId, ref: 'Category' }, // For nested categories
}, {
  timestamps: true,
});

export const Category = models.Category || model('Category', CategorySchema);