import { NextRequest, NextResponse } from 'next/server';
import NutritionData from '@/models/NutritionModel';
import { connect } from '@/dbConfig/dbConfig';

export async function POST(req: NextRequest) {
  try {
    await connect();
    console.log("DB successfully connected");

    const { name, amount, date, calories, fat_total_g, fat_saturated_g, protein_g, sodium_mg, potassium_mg, cholesterol_mg, carbohydrates_total_g, fiber_g, sugar_g, mealType, userId } = await req.json();

    console.log(userId);

    if (!userId) {
      return NextResponse.json({ error: 'Invalid userId format' }, { status: 400 });
    }

    const nutritionData = new NutritionData({
      userId,
      name,
      amount,
      date,
      calories,
      fat_total_g,
      fat_saturated_g,
      protein_g,
      sodium_mg,
      potassium_mg,
      cholesterol_mg,
      carbohydrates_total_g,
      fiber_g,
      sugar_g,
      mealType,
    });

    await nutritionData.save();
    return NextResponse.json({ message: 'Nutrition data saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving nutrition data:', error);
    return NextResponse.json({ error: 'An error occurred while saving nutrition data' }, { status: 500 });
  }
}