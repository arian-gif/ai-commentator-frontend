import React, { useCallback, useState } from 'react';
import { Upload, Video, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface VideoUploaderProps {
  onVideoSelect: (file: File) => void;
  selectedVideo: File | null;
  onRemoveVideo: () => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  onVideoSelect,
  selectedVideo,
  onRemoveVideo
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        onVideoSelect(file);
      }
    }
  }, [onVideoSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('video/')) {
        onVideoSelect(file);
      }
    }
  }, [onVideoSelect]);

  if (selectedVideo) {
    return (
      <Card className="p-6 card-shadow border-2 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Video className="h-8 w-8 text-primary animate-bounce-sports" />
            <div>
              <p className="font-semibold text-foreground">{selectedVideo.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRemoveVideo}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={`p-8 border-2 border-dashed transition-all duration-300 cursor-pointer card-shadow hover:border-primary/50 ${
        dragActive ? 'border-primary bg-primary/5 animate-pulse-glow' : 'border-muted-foreground/25'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Upload className={`h-16 w-16 ${dragActive ? 'text-primary animate-bounce-sports' : 'text-muted-foreground'}`} />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground">
            Upload Your Sports Video
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Drag and drop your video here, or click to browse. 
            Perfect for highlights, plays, and sports moments!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="sports" className="relative overflow-hidden">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            Choose Video File
          </Button>
          <div className="text-xs text-muted-foreground self-center">
            MP4, MOV, AVI up to 100MB
          </div>
        </div>
      </div>
    </Card>
  );
};