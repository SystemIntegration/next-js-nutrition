import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import User from '@/models/userModel';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password,age,weight,height,gender } = reqBody;
        console.log("-------",reqBody);


          // Add validation for gender field
          const validGenders = ["male", "female", "other"];
          if (!validGenders.includes(gender.toLowerCase())) {
              return NextResponse.json({ error: "Invalid gender value" }, { status: 400 });
          }

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "user already exist" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            gender,
            age,
            weight,
            height
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

            // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User registered Successfully",
            success: true,
            savedUser
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// const data=await getData();
// console.log("Here is your data------>",data)



// async function getData(){
//     const res=await fetch("http://localhost:3000/api/posts",{cache:"no-store"});
//     if(!res.ok){
//       return notFound();
//     }
//     return res.json();
//   }