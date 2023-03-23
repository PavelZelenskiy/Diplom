const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["breakfast", "dinner", "evening meal"],
    },
    description: {
      type: String,
      required: true,
    },
    ingridients: {
      type: String,
      required: true,
    },
    cooking: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Recipe', schema)