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
    <div className="min-h-screen bg-gray-50">
      <div className="container py-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-primary">
              Recommendation Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Enter a user ID to get personalized recommendations
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <UserInput onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
          
          {(recommendations.length > 0 || isLoading) && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <Tabs 
                defaultValue={MODELS[0]} 
                onValueChange={(value) => setActiveModel(value as RecommendationModel)}
                className="space-y-6"
              >
                <TabsList className="w-full flex flex-wrap justify-start gap-2 p-1 bg-gray-100 rounded-lg">
                  {MODELS.map((model) => (
                    <TabsTrigger 
                      key={model} 
                      value={model} 
                      className="flex-shrink-0 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-2"
                    >
                      {model}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {MODELS.map((model) => (
                  <TabsContent key={model} value={model} className="mt-6">
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
    </div>
  );
};

export default Index;