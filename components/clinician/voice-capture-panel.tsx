'use client';

import React, { useState, useEffect } from 'react';
import { Mic, Square, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { useLanguage } from '@/contexts/language-context';

interface VoiceCapturePanelProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  transcribedText: string;
  onTranscriptionUpdate: (text: string) => void;
}

export function VoiceCapturePanel({
  isRecording,
  onToggleRecording,
  transcribedText,
  onTranscriptionUpdate,
}: VoiceCapturePanelProps) {
  const { t } = useLanguage();
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={`p-6 ${isRecording ? 'ring-2 ring-accent' : ''}`}>
      <h4 className="font-semibold text-foreground mb-4">{t("clinician.voice_capture.title")}</h4>

      {/* Recording Button */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          onClick={onToggleRecording}
          className={`relative w-20 h-20 rounded-full transition-all ${
            isRecording
              ? 'bg-error hover:bg-error/90 shadow-lg'
              : 'bg-primary hover:bg-primary/90'
          }`}
        >
          {isRecording ? (
            <Square className="h-8 w-8" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </Button>

        <div className="text-center">
          {isRecording && (
            <>
              <div className="flex items-center gap-2 justify-center mb-1">
                <div className="h-2 w-2 rounded-full bg-error animate-pulse" />
                <span className="text-sm font-semibold text-error">
                  {t("clinician.voice_capture.recording")}
                </span>
              </div>
              <p className="text-2xl font-bold font-mono text-foreground">
                {formatTime(recordingTime)}
              </p>
            </>
          )}
          {!isRecording && transcribedText && (
            <p className="text-xs text-muted-foreground">
              {t("clinician.voice_capture.continue")}
            </p>
          )}
        </div>
      </div>

      {/* Transcribed Text */}
      {transcribedText && (
        <div className="rounded-lg bg-muted p-3 text-sm text-foreground leading-relaxed">
          {transcribedText}
        </div>
      )}

      {/* Info */}
      <p className="mt-4 text-xs text-muted-foreground text-center">
        {t("clinician.voice_capture.info")}
      </p>
    </Card>
  );
}
