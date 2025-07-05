import React from 'react';
import { Zap, Trophy, Mic } from 'lucide-react';

export const SportsHeader: React.FC = () => {
  return (
    <div className="text-center space-y-6 py-12">
      <div className="flex justify-center items-center space-x-3 animate-slide-up">
        <Trophy className="h-10 w-10 text-primary animate-bounce-sports" />
        <Zap className="h-8 w-8 text-secondary" />
        <Mic className="h-10 w-10 text-primary animate-bounce-sports" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          AI SPORTS
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
          COMMENTATOR
        </h2>
      </div>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
        Upload your sports videos and get <span className="text-primary font-semibold">epic AI-powered commentary</span> that brings the excitement to life! 
        From game-winning shots to incredible plays - we make every moment legendary.
      </p>
      
      <div className="flex justify-center space-x-8 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>AI-Powered</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-secondary rounded-full"></div>
          <span>Instant Results</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>Epic Commentary</span>
        </div>
      </div>
    </div>
  );
};