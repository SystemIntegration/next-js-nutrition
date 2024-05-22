import { connect } from '@/dbConfig/dbConfig';
import Food from '@/models/NutritionModel';

connect();
console.log("fetch connected successfully");



export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('userEmail');
    const filterDate = searchParams.get('filterDate');

    const foods = await Food.find({
      userId: userEmail,
      date: { $regex: filterDate, $options: 'i' },
    });

    return new Response(JSON.stringify(foods), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}