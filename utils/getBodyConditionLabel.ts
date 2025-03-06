import { bodyConditionMap } from "@/types";

export const getBodyConditionLabel = (bodyCondition: number | string) => {
  const numericValue = Number(bodyCondition);

  if (!isNaN(numericValue)) {
    return bodyConditionMap[numericValue];
  }
  return bodyCondition;
}
