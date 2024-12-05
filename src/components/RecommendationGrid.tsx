import RecommendationCard from "./RecommendationCard";
import LoadingCard from "./LoadingCard";
import type { Recommendation } from "@/lib/api";

interface RecommendationGridProps {
  recommendations: Recommendation[];
  isLoading: boolean;
}

const RecommendationGrid = ({ recommendations, isLoading }: RecommendationGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((recommendation) => (
        <RecommendationCard key={recommendation.id} recommendation={recommendation} />
      ))}
    </div>
  );
};

export default RecommendationGrid;