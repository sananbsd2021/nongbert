import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILotteryTicket extends Document {
  numbers: number[];
  userId: string;
  createdAt: Date;
}

const LotteryTicketSchema: Schema = new Schema({
  numbers: { type: [Number], required: true },
  userId: { type: String, required: true },
  price:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const LotteryTicket: Model<ILotteryTicket> =
  mongoose.models.LotteryTicket || mongoose.model<ILotteryTicket>('LotteryTicket', LotteryTicketSchema);
