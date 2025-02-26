export interface Question {
  id: string;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
  category: string;
}

export interface Category {
  id: string;
  name: string;
  weight: number;
}

export interface Assessment {
  currentStep: number;
  answers: Record<string, number>;
  score: number;
}