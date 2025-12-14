const mongoose = require("mongoose");

const skillAttemptSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        skillType: {
            type: String,
            required: true, // coding | communication | creativity
        },
        taskPrompt: {
            type: String,
            required: true,
        },
        userInput: {
            type: String,
            required: true,
        },
        aiEvaluation: {
            type: Object,
            required: true,
        },

    },
    { timestamps: true }
);

module.exports =
    mongoose.models.SkillAttempt ||
    mongoose.model("SkillAttempt", skillAttemptSchema);
