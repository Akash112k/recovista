import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "@/lib/api";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium">{recommendation.title}</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {Math.round(recommendation.score * 100)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{recommendation.description}</p>
        <div className="mt-4">
          <Badge variant="outline" className="text-xs">
            {recommendation.model}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;