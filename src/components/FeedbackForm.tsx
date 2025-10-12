import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface FeedbackFormProps {
  type: "helpful" | "not-helpful";
  onClose: () => void;
}

export const FeedbackForm = ({ type, onClose }: FeedbackFormProps) => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve our guides.",
      });
      onClose();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 p-4 bg-muted rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="feedback">
          {type === "helpful" 
            ? "What did you find most helpful?" 
            : "How can we improve this guide?"}
        </Label>
        <Textarea
          id="feedback"
          placeholder="Share your thoughts..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          required
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};