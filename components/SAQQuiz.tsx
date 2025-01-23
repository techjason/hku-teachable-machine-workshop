"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "./ui/textarea";
import { markAnswers } from "@/lib/markAnswers";
import { Skeleton } from "./ui/skeleton";

interface Question {
  question: string;
  markScheme: string[];
  marks: number;
}

interface ExamProps {
  questions: Question[];
}

interface MarkingResult {
  marksAwarded: number;
  feedback: string;
}

export function SAQQuiz({ questions = [] }: ExamProps) {
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [markingResults, setMarkingResults] = useState<MarkingResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answers.some((answer) => answer.trim() === "")) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setSubmitted(true);
    setError("");
    setLoading(true);
    try {
      const results = await markAnswers(
        answers,
        questions.map((q) => q.question),
        questions.map((q) => q.markScheme.join("\n")),
        questions.map((q) => q.marks)
      );
      setMarkingResults(results);
    } catch (error) {
      setError("An error occurred while marking your answers.");
      setSubmitted(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mx-auto">
      <Card className="">
        {questions.map((q, index) => (
          <CardContent key={index} className="pt-6 flex flex-col gap-4">
            <Label htmlFor={`question-${index}`} className="">
              {q.question} ({q.marks} marks)
            </Label>
            <Textarea
              id={`question-${index}`}
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              disabled={submitted}
              className=""
              placeholder="Enter your answer here"
            />
            {submitted &&
              (!loading ? (
                <>
                  {markingResults[index] && (
                    <Alert
                      className="mt-2"
                      variant={
                        markingResults[index].marksAwarded === q.marks
                          ? "green"
                          : markingResults[index].marksAwarded === 0
                          ? "destructive"
                          : "yellow"
                      }
                    >
                      <AlertTitle className="font-bold">
                        Your Result: {markingResults[index].marksAwarded}/
                        {q.marks}
                      </AlertTitle>
                      <AlertDescription>
                        <p>{markingResults[index].feedback}</p>
                        <p className="font-bold">Mark Scheme:</p>
                        {q.markScheme.map((mark, i) => (
                          <p key={i}>{mark}</p>
                        ))}
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              ) : (
                <Skeleton className="w-full h-10" />
              ))}
          </CardContent>
        ))}
        {error && (
          <div className="mx-6 mb-4">
            <Alert variant="destructive" className="mx-auto">
              {error}
            </Alert>
          </div>
        )}
        {submitted &&
          (!loading ? (
            <div className="mx-6 mb-4">
              <Alert variant="default">
                <AlertTitle>
                  {(() => {
                    const totalMarks = questions.reduce(
                      (total, q) => total + q.marks,
                      0
                    );
                    const scored = markingResults.reduce(
                      (total, result) => total + result.marksAwarded,
                      0
                    );
                    const percentage = (scored / totalMarks) * 100;

                    if (percentage === 100) return "Perfect Score! 🎉";
                    if (percentage >= 80) return "Excellent Work! 🌟";
                    if (percentage >= 70) return "Great Effort! 👏";
                    if (percentage >= 60) return "Good Progress! 💪";
                    if (percentage >= 50) return "Keep Going! 📚";
                    return "Room for Improvement 💡";
                  })()}
                </AlertTitle>
                <AlertDescription>
                  {`${markingResults.reduce(
                    (total, result) => total + result.marksAwarded,
                    0
                  )}/${questions.reduce(
                    (total, q) => total + q.marks,
                    0
                  )} marks`}
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="mx-6 mb-4">
              <Skeleton className="w-full h-10" />
            </div>
          ))}
        <CardFooter className="flex justify-center">
          <Button type="submit" disabled={submitted} className="w-full">
            {submitted ? "Submitted" : "Submit Answers"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
