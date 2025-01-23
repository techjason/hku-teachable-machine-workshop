"use server";

import { generateObject } from "ai";
import { z } from "zod";
import { azure } from "./azure";

export const markAnswers = async (
  answers: string[],
  questions: string[],
  markScheme: string[],
  marks: number[]
) => {
  console.log(questions, markScheme, marks, answers);
  const { object } = await generateObject({
    model: azure("gpt-4o-mini"),
    output: "array",
    schema: z.object({
      marksAwarded: z.number(),
      feedback: z.string(),
    }),
    prompt: `Mark the following answers. 
    Questions: ${questions.join("\n")}
    Mark Scheme: ${markScheme.join("\n")}
    Marks: ${marks.join("\n")}
    Student Answers: ${answers.join("\n")}
    `,
  });

  return object;
};
