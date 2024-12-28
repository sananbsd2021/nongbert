import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongoose';
import History from '@/app/models/History';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newNew = new History(body);
    const savedNew = await newNew.save();
    return NextResponse.json({ success: true, data: savedNew }, { status: 201 });
  } catch (error) {
    console.error('Error creating history:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}


export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const histories = await History.find({});
      return res.status(200).json({ success: true, data: histories });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, description } = req.body;
      const newHistory = new History({ title, description });
      await newHistory.save();
      return res.status(201).json({ success: true, data: newHistory });
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
