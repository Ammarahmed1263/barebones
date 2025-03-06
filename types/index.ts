export interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string | null;
  age: number | string;
  created_at: any;
  owner_id: string;
  logs_weight: Array<WeightLog>;
  logs_bodycondition: Array<BodyConditionLog>;
  logs_vet_visits: VetVisitLog[] | null;
}

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  full_name?: string | null | undefined;
  avatar_url?: string;
  updated_at?: any;
}

export interface WeightLog {
  id: string;
  pet_id: string;
  weight: any;
  date: string;
}

export const bodyConditionMap: Record<number, string> = {
  1: "Severely Underweight",
  2: "Underweight",
  3: "Slightly Underweight",
  4: "Lean",
  5: "Ideal",
  6: "Slightly Overweight",
  7: "Overweight",
  8: "Obese",
  9: "Severely Obese",
};

export interface BodyConditionLog {
  date: string;
  id: string;
  body_condition: string | number;
  pet_id: string;
}

export type LogType = 'weight' | 'body' | 'vet' | any;

export interface VetVisitLog {
  id: string;
  pet_id: string;
  notes: string | null;
  date: string;
} 