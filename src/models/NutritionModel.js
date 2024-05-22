import mongoose from 'mongoose';

const nutritionDataSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: String, required: true },
  calories: { type: Number, required: true },
  fat_total_g: { type: Number, required: true },
  fat_saturated_g: { type: Number, required: true },
  protein_g: { type: Number, required: true },
  sodium_mg: { type: Number, required: true },
  potassium_mg: { type: Number, required: true },
  cholesterol_mg: { type: Number, required: true },
  carbohydrates_total_g: { type: Number, required: true },
  fiber_g: { type: Number, required: true },
  sugar_g: { type: Number, required: true },
  mealType: { type: String, required: true },
});

const NutritionData = mongoose.models.NutritionData || mongoose.model('NutritionData', nutritionDataSchema);

export default NutritionData;