import React, { useState } from 'react';
import { SportsHeader } from '../components/SportsHeader';
import { VideoUploader } from '../components/VideoUploader';
import { CommentaryDisplay } from '../components/CommentaryDisplay';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Zap, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroBackground from '../assets/sports-hero-bg.jpg';

const backUrl= 'http://localhost:8000/upload/'

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [commentary, setCommentary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateCommentary = async () => {
  if (!selectedVideo) {
    toast({
      title: "No Video Selected",
      description: "Please upload a video first before generating commentary.",
      variant: "destructive",
    });
    return;
  }

  setIsGenerating(true);

  try {
    const formData = new FormData();
    formData.append("file", selectedVideo);

    const response = await fetch(backUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Error uploading video:", response.statusText);
      throw new Error("Failed to generate commentary.");
    }

    const data = await response.json();
    setCommentary(data.commentary);
    console.log("Generated Commentary:", data.commentary);

    toast({
      title: "Commentary Generated!",
      description: "Your AI sports commentary is ready to view!",
    });
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Something went wrong while generating commentary.",
      variant: "destructive",
    });
  } finally {
    setIsGenerating(false);
  }
};


  const handleVideoSelect = (file: File) => {
    setSelectedVideo(file);
    setCommentary(''); // Clear previous commentary
    toast({
      title: "Video Uploaded!",
      description: `${file.name} is ready for commentary generation.`,
    });
  };

  const handleRemoveVideo = () => {
    setSelectedVideo(null);
    setCommentary('');
  };

  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(16, 24, 40, 0.95), rgba(16, 24, 40, 0.95)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <SportsHeader />
          
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Video Upload Section */}
            <Card className="p-8 card-shadow backdrop-blur-sm bg-card/90">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-foreground flex items-center justify-center space-x-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <span>Step 1: Upload Your Video</span>
                  </h3>
                  <p className="text-muted-foreground">
                    Choose your favorite sports moment and let AI create the perfect commentary
                  </p>
                </div>
                
                <VideoUploader
                  onVideoSelect={handleVideoSelect}
                  selectedVideo={selectedVideo}
                  onRemoveVideo={handleRemoveVideo}
                />
              </div>
            </Card>

            {/* Generate Button */}
            {selectedVideo && (
              <div className="text-center animate-slide-up">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={generateCommentary}
                  disabled={isGenerating}
                  className="text-xl px-12 py-6 font-black tracking-wider"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-3"></div>
                      GENERATING MAGIC...
                    </>
                  ) : (
                    <>
                      <Zap className="h-6 w-6 mr-3" />
                      GENERATE EPIC COMMENTARY
                    </>
                  )}
                </Button>
              </div>
            )}
            
            {/* Commentary Display */}
            <Card className="p-8 card-shadow backdrop-blur-sm bg-card/90">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-foreground flex items-center justify-center space-x-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <span>Step 2: Listen to Your Audio</span>
                  </h3>
                  <p className="text-muted-foreground">
                    AI-generated sports commentary audio ready to play
                  </p>
                </div>
                
                <CommentaryDisplay 
                  commentary={commentary}
                  isGenerating={isGenerating}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
