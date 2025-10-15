import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GuideFeedbackProps {
  guideTitle: string;
  averageRating?: number;
  totalRatings?: number;
}

export const GuideFeedback = ({ guideTitle, averageRating = 4.7, totalRatings = 324 }: GuideFeedbackProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);
  const { toast } = useToast();

  const handleRatingClick = (value: number) => {
    setRating(value);
    setShowFeedbackBox(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production, send to backend
    console.log({
      guideTitle,
      rating,
      feedback
    });

    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve our guides.",
    });

    setHasVoted(true);
    setShowFeedbackBox(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate This Guide</CardTitle>
        <div className="flex items-center gap-2 pt-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({totalRatings} ratings)</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Stars */}
        {!hasVoted && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Your rating:</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingClick(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      value <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Form */}
        {showFeedbackBox && !hasVoted && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="suggestion" className="text-sm font-medium">
                {rating >= 4
                  ? "What did you find most helpful?"
                  : "How can we improve this guide?"}
              </label>
              <Textarea
                id="suggestion"
                placeholder="Share your thoughts and suggestions..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                Submit Feedback
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowFeedbackBox(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {hasVoted && (
          <div className="text-center py-4">
            <p className="text-lg font-medium text-green-600 dark:text-green-400">
              Thank you for your feedback!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Your input helps us create better guides.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
