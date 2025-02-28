import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import useAssessmentStore from '@/store/assessment';
import { 
  WarningCircle, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  ArrowCounterClockwise, 
  Buildings,
  CaretRight,
  Lightning,
  CircleNotch
} from '@phosphor-icons/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';

const Assessment = () => {
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
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isComplete) {
      setIsLoading(true);
      setTimeout(() => {
        navigate('/results');
      }, 800);
    }
  }, [isComplete, navigate]);

  const progress = ((Object.keys(answers).length) / questions.length) * 100;
  const question = questions[currentQuestionIndex];
  const currentAnswer = answers[question?.id];

  const handleAnswer = (value) => {
    if (!question) return;
    setAnswer(question.id, value);
    
    // Add small delay before advancing to next question for better UX
    setTimeout(() => {
      nextQuestion();
    }, 300);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to restart the assessment? All progress will be lost.')) {
      resetAssessment();
    }
  };

  if (!question) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-background via-slate-50/30 to-primary/5 dark:via-slate-950/30 dark:to-primary/10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6 text-center"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted/80 shadow-inner">
            <Buildings className="h-12 w-12 text-primary" weight="duotone" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">No Assessment Available</h2>
          <p className="text-muted-foreground">
            Please complete your organization profile first to generate a customized assessment.
          </p>
          <Button 
            className="mt-6 w-full sm:w-auto relative overflow-hidden group" 
            onClick={() => navigate('/profile')}
            size="lg"
          >
            <span className="relative z-10 flex items-center">
              Set Up Organization Profile
              <CaretRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </Button>
        </motion.div>
      </div>
    );
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const remainingQuestions = questions.length - Object.keys(answers).length;
  const answeredQuestions = Object.keys(answers).length;

  // Get domain color based on category
  const getDomainColor = (domain) => {
    const domainColors = {
      data_management: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      technology: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
      talent: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      strategy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300", 
      governance: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
      operations: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300"
    };
    
    return domainColors[domain] || "bg-primary/10 text-primary";
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-slate-50/30 to-primary/5 dark:via-slate-950/30 dark:to-primary/10 pt-8 pb-16">
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <CircleNotch className="h-12 w-12 text-primary animate-spin mx-auto" weight="bold" />
            <p className="text-xl font-medium">Generating your results...</p>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 sm:mb-12 lg:mb-14 text-center space-y-3"
        >
          <div className="inline-flex items-center justify-center mb-2">
            <Lightning weight="duotone" className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              AI Readiness Assessment
            </h1>
          </div>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Answer the following questions to evaluate your organization's AI readiness and receive a personalized implementation roadmap.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10 lg:mb-12 max-w-3xl mx-auto"
        >
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary/50 backdrop-blur-sm">
            <Progress value={progress} className="h-full transition-all duration-300 ease-out bg-gradient-to-r from-primary to-primary/80" />
          </div>
          
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            {remainingQuestions > 0 ? (
              <span className="text-muted-foreground">
                {remainingQuestions} question{remainingQuestions !== 1 ? 's' : ''} remaining
              </span>
            ) : (
              <span className="flex items-center text-green-600 dark:text-green-500 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                <CheckCircle className="mr-1.5 h-4 w-4" weight="fill" />
                All questions answered
              </span>
            )}
          </div>
        </motion.div>

        {Object.keys(answers).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Alert className="mb-8 lg:mb-10 max-w-3xl mx-auto bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 shadow-md rounded-xl backdrop-blur-sm">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" weight="duotone" />
                <div className="ml-3">
                  <AlertTitle className="text-base font-medium text-blue-800 dark:text-blue-300">Assessment in Progress</AlertTitle>
                  <AlertDescription className="text-sm mt-1 text-blue-700/80 dark:text-blue-400/80">
                    Your progress is automatically saved. You can return to this assessment at any time.
                    {remainingQuestions > 0 && (
                      <div className="mt-2 text-xs font-medium">
                        {answeredQuestions > 0 && (
                          <span className="text-green-600 dark:text-green-500">
                            {answeredQuestions} answered • 
                          </span>
                        )}
                        <span className="ml-1">
                          {remainingQuestions} question{remainingQuestions > 1 ? 's' : ''} remaining
                        </span>
                      </div>
                    )}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border shadow-xl bg-card/95 backdrop-blur-sm rounded-xl overflow-hidden transition-all hover:shadow-2xl max-w-3xl mx-auto">
              <CardHeader className="space-y-4 p-8 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className={`text-sm px-4 py-1.5 rounded-full w-fit font-medium ${getDomainColor(question.domain)}`}>
                    {question.domain.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className="bg-secondary/60 dark:bg-secondary/30 text-secondary-foreground px-3 py-1 rounded-full text-sm hidden sm:block">
                    {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
                <CardTitle className="text-xl lg:text-2xl leading-tight">{question.text}</CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Select the option that best describes your organization's current state
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8 pt-6">
                <div className="grid gap-4">
                  {question.options.map((option, index) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Button
                        variant={currentAnswer === option.value ? "default" : "outline"}
                        className={`h-auto p-5 flex flex-col items-start w-full text-left rounded-xl transition-all duration-300 ${
                          currentAnswer === option.value 
                            ? "border-primary bg-primary/95 text-primary-foreground ring-2 ring-primary/20 ring-offset-2 transform scale-[1.02] shadow-lg" 
                            : "hover:border-primary/30 hover:bg-primary/5 hover:shadow-md hover:transform hover:scale-[1.01]"
                        }`}
                        onClick={() => handleAnswer(option.value)}
                      >
                        <div className="flex items-center w-full mb-3">
                          <div className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full ${
                            currentAnswer === option.value 
                              ? "bg-white/20 text-white" 
                              : "bg-primary/10 text-primary"
                          } mr-3`}>
                            {index + 1}
                          </div>
                          <div className="font-semibold text-base sm:text-lg flex-1">{option.label}</div>
                        </div>
                        <div className={`text-sm sm:text-base mt-1 ${currentAnswer === option.value ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                          {option.description}
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row gap-4 p-8 pt-4 border-t bg-secondary/10">
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => previousQuestion()}
                    disabled={currentQuestionIndex === 0}
                    className="flex-1 sm:flex-none text-sm"
                    size="lg"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleReset}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-1 sm:flex-none text-sm"
                    size="lg"
                  >
                    <ArrowCounterClockwise className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
                <Button
                  variant={currentAnswer ? "default" : "outline"}
                  onClick={() => nextQuestion()}
                  disabled={!currentAnswer}
                  className={`w-full sm:w-auto text-sm group relative overflow-hidden ${
                    currentAnswer ? "bg-gradient-to-r from-primary to-primary/90" : ""
                  }`}
                  size="lg"
                >
                  <span className="relative z-10 flex items-center">
                    {isLastQuestion ? 'Finish Assessment' : 'Skip Question'}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  {currentAnswer && (
                    <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
          
        {currentQuestionIndex > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p>
              Need help? <a href="#" className="text-primary hover:underline">View assessment guide</a> or <a href="#" className="text-primary hover:underline">contact support</a>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Assessment;