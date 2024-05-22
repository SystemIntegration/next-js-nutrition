
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';


export async function GET(request: NextRequest) {
    try {
        await connect(); // Connect to MongoDB
        const users = await User.find(); 
        return new NextResponse(JSON.stringify(users),{status:200});
    } catch (error:any) {
        return NextResponse.json("Error in fetching data" + error , { status: 500 });
    }
}