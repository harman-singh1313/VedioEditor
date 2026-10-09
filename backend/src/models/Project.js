const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "short-film",
        "long-form",
        "color-grading",
        "hero-video",
        "other-edits",
        // "blogs",
      ],
    },

    videos: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
        posterUrl: {
          type: String,
          default: "",
        },
        posterPublicId: {
          type: String,
          default: "",
        },
      },
    ],
    coverImages: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("project", projectSchema);
