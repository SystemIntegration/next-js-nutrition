import { NextRequest, NextResponse } from 'next/server';
import NutritionData from '@/models/NutritionModel';
import { connect } from '@/dbConfig/dbConfig';
import mongoose from 'mongoose';

await connect();
  
export async function DELETE(req: NextRequest, { params }: { params: { itemId: string } }) {
  try {
    
    

    const { itemId } = params;

    if (!mongoose.isValidObjectId(itemId)) {
      return NextResponse.json({ error: 'Invalid itemId format' }, { status: 400 });
    }

    const deletedItem = await NutritionData.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ error: 'An error occurred while deleting the item' }, { status: 500 });
  }
}