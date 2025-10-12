import { useState, useEffect } from "react";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  value?: string;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const VoiceInput = ({ onTranscript, value }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [interimTranscript, setInterimTranscript] = useState("");

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        if (interim) {
          setInterimTranscript(interim);
        }
        
        if (final) {
          onTranscript((value || '') + ' ' + final);
          setInterimTranscript('');
        }
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      setRecognition(recognitionInstance);
    }
  }, [onTranscript, value]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      setInterimTranscript('');
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  if (!recognition) return null;

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleListening}
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 z-10",
          isListening && "text-accent"
        )}
      >
        <div className="relative">
          <Mic className={cn("h-5 w-5", isListening && "animate-pulse")} />
          {isListening && (
            <>
              <span className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
              <span className="absolute inset-0 rounded-full bg-accent/30 animate-pulse" />
            </>
          )}
        </div>
      </Button>

      {isListening && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="relative flex flex-col items-center gap-6 p-8 bg-card rounded-2xl border shadow-2xl max-w-md w-full mx-4">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-accent/20 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-accent/30 flex items-center justify-center animate-pulse">
                  <div className="h-16 w-16 rounded-full bg-accent/40 flex items-center justify-center">
                    <Mic className="h-10 w-10 text-accent" />
                  </div>
                </div>
              </div>
              <span className="absolute inset-0 rounded-full bg-accent/10 animate-ping" style={{ animationDuration: '2s' }} />
              <span className="absolute inset-0 rounded-full bg-accent/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Listening...</h3>
              <p className="text-sm text-muted-foreground">Speak clearly into your microphone</p>
            </div>

            {interimTranscript && (
              <div className="w-full p-4 bg-muted rounded-lg min-h-[60px]">
                <p className="text-sm text-center animate-pulse">{interimTranscript}</p>
              </div>
            )}

            <Button onClick={toggleListening} variant="outline" size="lg">
              Stop Listening
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
