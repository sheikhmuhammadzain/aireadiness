import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAssessmentStore } from '@/store/assessment';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AssessmentQuestion } from '@/types/assessment';

export const Assessment = () => {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    questions,
    answers,
    isComplete,
    setAnswer,
    nextQuestion,
    previousQuestion,
    resetAssessment
  } = useAssessmentStore();

  useEffect(() => {
    if (isComplete) {
      navigate('/results');
    }
  }, [isComplete, navigate]);

  const progress = ((Object.keys(answers).length) / questions.length) * 100;
  const question = questions[currentQuestionIndex];
  const currentAnswer = answers[question?.id];

  const handleAnswer = (value: number) => {
    if (!question) return;
    setAnswer(question.id, value);
    nextQuestion();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to restart the assessment? All progress will be lost.')) {
      resetAssessment();
    }
  };

  if (!question) {
    return (
      <div className="max-w-3xl mx-auto">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Questions Available</AlertTitle>
          <AlertDescription>
            Please complete your organization profile first.
          </AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => navigate('/profile')}>
          Go to Profile
        </Button>
      </div>
    );
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const remainingQuestions = questions.length - Object.keys(answers).length;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Readiness Assessment</h1>
        <p className="text-muted-foreground">
          Answer the following questions to evaluate your organization's AI readiness
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {Object.keys(answers).length > 0 && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Assessment in Progress</AlertTitle>
          <AlertDescription>
            You can return to this assessment later. Your progress is automatically saved.
            {remainingQuestions > 0 && (
              <span className="block mt-2">
                {remainingQuestions} question{remainingQuestions > 1 ? 's' : ''} remaining
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {question.domain.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <CardTitle className="text-xl">{question.text}</CardTitle>
          <CardDescription>
            Select the option that best describes your organization's current state
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {question.options.map((option) => (
              <Button
                key={option.value}
                variant={currentAnswer === option.value ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-start"
                onClick={() => handleAnswer(option.value)}
              >
                <div className="font-semibold">{option.label}</div>
                <div className="text-sm text-muted-foreground text-left mt-1">
                  {option.description}
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => previousQuestion()}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-destructive hover:text-destructive"
            >
              Reset
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={() => nextQuestion()}
            disabled={!currentAnswer}
          >
            {isLastQuestion ? 'Finish' : 'Skip'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}; 