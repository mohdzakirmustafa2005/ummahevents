'use client';

import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Moon, Loader2 } from 'lucide-react';

import Image from 'next/image';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function generateLogo() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error("API Key missing");
        }

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: "A premium, minimalist professional logo for 'UmmahEvents', an Islamic event ticketing platform. The logo should feature an elegant, stylized crescent moon integrated with a modern ticket or gate shape. Use a sophisticated color palette of gold (#d4af37) and deep charcoal (#1a1a1a). The design should be clean, vector-style, on a solid white background, reflecting luxury and community.",
              },
            ],
          },
        });

        const candidates = response.candidates;
        if (candidates && candidates.length > 0 && candidates[0].content?.parts) {
          for (const part of candidates[0].content.parts) {
            if (part.inlineData) {
              setLogoUrl(`data:image/png;base64,${part.inlineData.data}`);
              setLoading(false);
              return;
            }
          }
        }
        throw new Error("No image generated");
      } catch (err) {
        console.error("Logo generation failed:", err);
        setError(true);
        setLoading(false);
      }
    }

    generateLogo();
  }, []);

  if (loading) {
    return (
      <div className={`${className} bg-[#1a1a1a] rounded-xl flex items-center justify-center animate-pulse`}>
        <Loader2 className="text-[#d4af37] animate-spin" size={20} />
      </div>
    );
  }

  if (error || !logoUrl) {
    return (
      <div className={`${className} bg-[#1a1a1a] rounded-xl flex items-center justify-center`}>
        <Moon className="text-[#d4af37] fill-current" size={20} />
      </div>
    );
  }

  return (
    <div className={`${className} rounded-xl overflow-hidden border border-[#e5e1d8] bg-white relative`}>
      <Image 
        src={logoUrl} 
        alt="UmmahEvents Logo" 
        fill
        className="object-contain p-1"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
