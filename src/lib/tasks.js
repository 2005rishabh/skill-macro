// src/lib/tasks.js

const codingTasks = {
  easy: [
    {
      prompt: "Write a function to reverse a string.",
      constraints: ["Input is a string", "Return the reversed string"],
      expectedFormat: "JavaScript function",
    },
    {
      prompt: "Check if a number is even or odd.",
      constraints: ["Input is an integer"],
      expectedFormat: "JavaScript function",
    },
  ],
  medium: [
    {
      prompt: "Find the first non-repeating character in a string.",
      constraints: ["Case-sensitive", "Return character or null"],
      expectedFormat: "JavaScript function",
    },
    {
      prompt: "Remove duplicates from an array while preserving order.",
      constraints: ["Use JavaScript"],
      expectedFormat: "JavaScript function",
    },
  ],
  hard: [
    {
      prompt: "Implement a function to check if a linked list has a cycle.",
      constraints: ["O(n) time", "O(1) space"],
      expectedFormat: "JavaScript function",
    },
    {
      prompt: "Merge overlapping intervals.",
      constraints: ["Intervals as array of [start, end]"],
      expectedFormat: "JavaScript function",
    },
  ],
};

const communicationTasks = {
  easy: [
    {
      prompt: "Explain what a variable is in programming.",
      constraints: ["30 seconds max"],
      expectedFormat: "Spoken explanation",
    },
  ],
  medium: [
    {
      prompt: "Explain how the internet works to a non-technical person.",
      constraints: ["Clear structure", "No jargon"],
      expectedFormat: "Spoken explanation",
    },
  ],
  hard: [
    {
      prompt: "Explain REST APIs and their importance in system design.",
      constraints: ["Structured", "Examples encouraged"],
      expectedFormat: "Spoken explanation",
    },
  ],
};

const creativityTasks = {
  easy: [
    {
      prompt: "Suggest 3 unique names for a coffee shop.",
      constraints: ["Creative but simple"],
      expectedFormat: "Text ideas",
    },
  ],
  medium: [
    {
      prompt: "Give 3 marketing ideas for a new fitness app.",
      constraints: ["Budget-friendly"],
      expectedFormat: "Text ideas",
    },
  ],
  hard: [
    {
      prompt: "Propose an innovative solution to reduce plastic waste in cities.",
      constraints: ["Practical", "Scalable"],
      expectedFormat: "Text ideas",
    },
  ],
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateTask({ skillType, difficulty = "easy" }) {
  let taskPool;

  switch (skillType) {
    case "coding":
      taskPool = codingTasks[difficulty];
      break;
    case "communication":
      taskPool = communicationTasks[difficulty];
      break;
    case "creativity":
      taskPool = creativityTasks[difficulty];
      break;
    default:
      throw new Error("Invalid skill type");
  }

  if (!taskPool || taskPool.length === 0) {
    throw new Error("No tasks available for this skill/difficulty");
  }

  const task = pickRandom(taskPool);

  return {
    id: crypto.randomUUID(),
    skillType,
    difficulty,
    prompt: task.prompt,
    constraints: task.constraints,
    expectedFormat: task.expectedFormat,
  };
}
