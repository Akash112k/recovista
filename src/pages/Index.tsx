import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecommendations, MODELS, type RecommendationModel } from "@/lib/api";
import UserInput from "@/components/UserInput";
import RecommendationGrid from "@/components/RecommendationGrid";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [userId, setUserId] = useState<string>("");
  const [activeModel, setActiveModel] = useState<RecommendationModel>(MODELS[0]);
  const { toast } = useToast();

  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: ["recommendations", userId, activeModel],
    queryFn: async () => {
      if (!userId) return [];
      return fetchRecommendations(userId, activeModel);
    },
    enabled: !!userId,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to fetch recommendations. Please try again.",
          variant: "destructive",
        });
      },
    },
  });

  const handleSubmit = (newUserId: string) => {
    setUserId(newUserId);
  };

  return (
    <div className="container py-8 mx-auto min-h-screen">
      <div className="max-w-6xl mx-auto">
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
          <div className="mt-8">
            <Tabs defaultValue={MODELS[0]} onValueChange={(value) => setActiveModel(value as RecommendationModel)}>
              <TabsList className="w-full flex flex-wrap justify-start gap-2">
                {MODELS.map((model) => (
                  <TabsTrigger key={model} value={model} className="flex-shrink-0">
                    {model}
                  </TabsTrigger>
                ))}
              </TabsList>
              {MODELS.map((model) => (
                <TabsContent key={model} value={model}>
                  <RecommendationGrid
                    recommendations={recommendations}
                    isLoading={isLoading}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;