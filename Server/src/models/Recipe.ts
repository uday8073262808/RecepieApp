//Recipe.ts





import mongoose, { Schema } from "mongoose";





export interface IRecipe extends Document {
  title: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;

}



const RecipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IRecipe>('Recipe', RecipeSchema);