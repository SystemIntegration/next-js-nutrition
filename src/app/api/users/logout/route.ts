import { NextResponse, NextRequest } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

export async function GET(req: Request) {
  try {
    await connect();
    console.log("popup success");
    

    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('userEmail');
    console.log(userEmail);
    
    
    const user = await User.findOne({ email: userEmail });
    

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

   
    
    return NextResponse.json(user);
    } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // Handle POST requests for logout if needed
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}