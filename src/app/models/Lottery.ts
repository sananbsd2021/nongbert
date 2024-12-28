// models/Lottery.ts

import mongoose, { Schema, model, models } from 'mongoose';

// สร้าง Schema สำหรับบันทึกข้อมูลหวย
const LotterySchema = new Schema({
  number: { type: String, required: true }, // ตัวเลขที่แทง
  price: { type: Number, required: true },  // จำนวนเงิน
  createdAt: { type: Date, default: Date.now }, // วันที่แทง
});

// ตรวจสอบว่ามีโมเดลอยู่แล้วหรือไม่
const Lottery = models.Lottery || model('Lottery', LotterySchema);

export default Lottery;
