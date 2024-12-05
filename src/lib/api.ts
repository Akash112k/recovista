export interface Recommendation {
  id: string;
  title: string;
  description: string;
  score: number;
  model: string;
}

export const MODELS = [
  "Neural Collaborative Filtering",
  "Graph Neural Networks",
  "Word2Vec",
  "Youtube Recommendation",
  "Hybrid"
] as const;

export type RecommendationModel = typeof MODELS[number];

export const fetchRecommendations = async (userId: string, model: RecommendationModel): Promise<Recommendation[]> => {
  // Simulated API call - replace with actual endpoint
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return Array.from({ length: 6 }, (_, i) => ({
    id: `${i}`,
    title: `${model} Recommendation ${i + 1}`,
    description: `This is a personalized recommendation for user ${userId} using ${model}`,
    score: Math.round((Math.random() * 100)) / 100,
    model,
  }));
};