"use client";

import React from "react";
import {
  Mountain,
  Flame,
  Utensils,
  Wifi,
  Activity,
  Navigation,
  Sun,
  Footprints,
  Phone,
  Camera,
  Star,
  Check,
  X,
  Calendar,
  AlertTriangle,
  Folder,
  Loader2,
  Building,
  Eye,
  LogOut,
  Sparkles,
  ShieldCheck,
  CheckSquare,
  Compass,
  Award,
  Trees,
  Heart,
  LucideProps,
} from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, className, ...props }: DynamicIconProps) {
  const normalized = (name || "").toLowerCase().trim();

  switch (normalized) {
    case "helicopter":
    case "copter":
    case "chopper":
    case "🚁":
      return <Navigation className={className} {...props} />;
    case "flame":
    case "hot-spring":
    case "hotspring":
    case "hot springs":
    case "♨️":
      return <Flame className={className} {...props} />;
    case "utensils":
    case "dining":
    case "food":
    case "🍲":
      return <Utensils className={className} {...props} />;
    case "wifi":
    case "internet":
    case "starlink":
    case "📡":
      return <Wifi className={className} {...props} />;
    case "activity":
    case "rescue":
    case "medical":
    case "health":
    case "🧗‍♂️":
    case "🩺":
    case "🫁":
      return <Activity className={className} {...props} />;
    case "mountain":
    case "mountains":
    case "glacier":
    case "peak":
    case "🏔️":
      return <Mountain className={className} {...props} />;
    case "sun":
    case "sunrise":
    case "☀️":
      return <Sun className={className} {...props} />;
    case "footprints":
    case "boots":
    case "trekking":
    case "🥾":
      return <Footprints className={className} {...props} />;
    case "calendar":
    case "season":
    case "🗓️":
      return <Calendar className={className} {...props} />;
    case "phone":
    case "call":
    case "📞":
      return <Phone className={className} {...props} />;
    case "camera":
    case "photo":
    case "📸":
      return <Camera className={className} {...props} />;
    case "star":
    case "rating":
    case "⭐":
      return <Star className={className} {...props} />;
    case "tree":
    case "trees":
    case "forest":
    case "🌲":
      return <Trees className={className} {...props} />;
    case "folder":
    case "file":
    case "📁":
      return <Folder className={className} {...props} />;
    case "building":
    case "castle":
    case "🏰":
      return <Building className={className} {...props} />;
    case "eye":
    case "view":
    case "👁":
      return <Eye className={className} {...props} />;
    case "logout":
    case "exit":
    case "🚪":
      return <LogOut className={className} {...props} />;
    case "sparkles":
    case "party":
    case "🎉":
      return <Sparkles className={className} {...props} />;
    case "warning":
    case "alert":
    case "⚠️":
      return <AlertTriangle className={className} {...props} />;
    default:
      return <Mountain className={className} {...props} />;
  }
}
