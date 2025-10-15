import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GuideFeedbackProps {
  guideTitle: string;
}

export const GuideFeedback = ({ guideTitle }: GuideFeedbackProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);
  const { toast } = useToast();

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleHelpfulClick = (helpful: boolean) => {
    setIsHelpful(helpful);
    setShowFeedbackBox(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production, send to backend
    console.log({
      guideTitle,
      rating,
      isHelpful,
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
        <CardTitle>Was this guide helpful?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Helpful/Not Helpful Buttons */}
        {!hasVoted && (
          <div className="flex gap-4">
            <Button
              variant={isHelpful === true ? "default" : "outline"}
              onClick={() => handleHelpfulClick(true)}
              className="flex-1"
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Helpful
            </Button>
            <Button
              variant={isHelpful === false ? "default" : "outline"}
              onClick={() => handleHelpfulClick(false)}
              className="flex-1"
            >
              <ThumbsDown className="h-4 w-4 mr-2" />
              Not Helpful
            </Button>
          </div>
        )}

        {/* Rating Stars */}
        {!hasVoted && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Rate this guide:</p>
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
                {isHelpful 
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
