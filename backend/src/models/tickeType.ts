import mongoose from "mongoose";

const ticketTypeSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    sold: {
      type: Number,
      default: 0,
      min: 0,
    },

    saleStart: {
      type: Date,
      required: true,
    },

    saleEnd: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TicketType = mongoose.model("TicketType", ticketTypeSchema);

export default TicketType;