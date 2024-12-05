import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecommendations } from "@/lib/api";
import UserInput from "@/components/UserInput";
import RecommendationGrid from "@/components/RecommendationGrid";
import { useToast } from "@/components/ui/use-toast";

const MODELS = ["collaborative", "content-based", "hybrid"];

const Index = () => {
  const [userId, setUserId] = useState<string>("");
  const { toast } = useToast();

  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: ["recommendations", userId],
    queryFn: async () => {
      if (!userId) return [];
      const results = await Promise.all(
        MODELS.map(model => fetchRecommendations(userId, model))
      );
      return results.flat();
    },
    enabled: !!userId,
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to fetch recommendations. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (newUserId: string) => {
    setUserId(newUserId);
  };

  return (
    <div className="container py-8 mx-auto min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Recommendation Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter a user ID to get personalized recommendations
          </p>
        </div>

        <UserInput onSubmit={handleSubmit} isLoading={isLoading} />
        
        {(recommendations.length > 0 || isLoading) && (
          <RecommendationGrid
            recommendations={recommendations}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Index;