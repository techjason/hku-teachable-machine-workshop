"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface MCQQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface MCQQuizProps {
  questions: MCQQuestion[];
}

export function MCQQuiz({ questions }: MCQQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
  };

  return (
    <div className="space-y-6 my-6">
      {questions.map((question, qIndex) => (
        <div
          key={qIndex}
          className="pt-0 p-4 border rounded-lg dark:border-gray-700"
        >
          <p className="font-medium mb-3 dark:text-gray-100">
            {question.question}
          </p>
          <div className="space-y-2">
            {question.options.map((option, oIndex) => (
              <label
                key={oIndex}
                className={`block p-3 border rounded cursor-pointer 
                  hover:bg-gray-50 dark:hover:bg-gray-800 
                  ${
                    selectedAnswers[qIndex] === oIndex
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                      : "border-gray-200 dark:border-gray-700"
                  } 
                  ${
                    showResults
                      ? oIndex === question.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                        : selectedAnswers[qIndex] === oIndex
                        ? "border-red-500 bg-red-50 dark:bg-red-900/30"
                        : ""
                      : ""
                  }
                  dark:text-gray-100`}
              >
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  className="hidden"
                  checked={selectedAnswers[qIndex] === oIndex}
                  onChange={() => handleAnswerSelect(qIndex, oIndex)}
                  disabled={showResults}
                />
                {option}
              </label>
            ))}
          </div>
          {showResults && question.explanation && (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {question.explanation}
            </p>
          )}
        </div>
      ))}
      <div className="flex gap-4">
        {!showResults ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswers.includes(-1)}
          >
            Check Answers
          </Button>
        ) : (
          <Button onClick={handleReset}>Try Again</Button>
        )}
      </div>
    </div>
  );
}
