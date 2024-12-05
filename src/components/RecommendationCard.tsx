import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "@/lib/api";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:translate-y-[-2px] hover:shadow-lg bg-white rounded-lg animate-fade-in">
      <CardHeader className="pb-3 bg-primary/5">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium text-primary">
            {recommendation.title}
          </CardTitle>
          <Badge variant="secondary" className="ml-2 rounded-full px-3">
            {Math.round(recommendation.score * 100)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {recommendation.description}
        </p>
        <div className="mt-4">
          <Badge 
            variant="outline" 
            className="text-xs rounded-full px-3 py-1 bg-primary/5 border-primary/20"
          >
            {recommendation.model}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;