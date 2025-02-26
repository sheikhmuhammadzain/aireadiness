import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAssessmentStore } from '@/store/assessment';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-3xl">
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
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-3xl">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">AI Readiness Assessment</h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Answer the following questions to evaluate your organization's AI readiness
          </p>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 sm:h-3" />
        </div>

        {Object.keys(answers).length > 0 && (
          <Alert className="mb-6 sm:mb-8">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <div>
              <AlertTitle className="text-sm sm:text-base">Assessment in Progress</AlertTitle>
              <AlertDescription className="text-xs sm:text-sm">
                You can return to this assessment later. Your progress is automatically saved.
                {remainingQuestions > 0 && (
                  <span className="block mt-2">
                    {remainingQuestions} question{remainingQuestions > 1 ? 's' : ''} remaining
                  </span>
                )}
              </AlertDescription>
            </div>
          </Alert>
        )}

        <Card className="border shadow-sm">
          <CardHeader className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                {question.domain.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">{question.text}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Select the option that best describes your organization's current state
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid gap-3 sm:gap-4">
              {question.options.map((option) => (
                <Button
                  key={option.value}
                  variant={currentAnswer === option.value ? "default" : "outline"}
                  className="h-auto p-4 sm:p-5 flex flex-col items-start w-full text-left transition-colors"
                  onClick={() => handleAnswer(option.value)}
                >
                  <div className="font-semibold text-sm sm:text-base">{option.label}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                    {option.description}
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between">
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => previousQuestion()}
                disabled={currentQuestionIndex === 0}
                className="flex-1 sm:flex-none"
              >
                Previous
              </Button>
              <Button
                variant="ghost"
                onClick={handleReset}
                className="text-destructive hover:text-destructive flex-1 sm:flex-none"
              >
                Reset
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => nextQuestion()}
              disabled={!currentAnswer}
              className="w-full sm:w-auto"
            >
              {isLastQuestion ? 'Finish' : 'Skip'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};