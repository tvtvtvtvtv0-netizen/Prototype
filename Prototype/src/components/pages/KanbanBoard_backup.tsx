import { useState } from "react";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { FilterPanel } from "../FilterPanel";
import { ColumnMenu } from "../ColumnMenu";
import { ColumnSettingsDialog } from "../ColumnSettingsDialog";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";

import { 
  Plus, 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  Clock,
  Video,
  Camera,
  Heart,
  Building2,
  MoreHorizontal,
  Filter,
  X,
  Flag,
  Film,
  Image,
  Package,
  CalendarClock,
  Zap,
  PlayCircle,
  MessageCircle,
  Flame
} from "lucide-react";

export interface ProjectCard {
  id: string;
  title: string;
  client: string;
  type: 'wedding' | 'corporate' | 'engagement' | 'other';
  date: string;
  location: string;
  budget: string;
  assignee: string;
  priority: 'normal' | 'medium' | 'high' | 'urgent';
  description: string;
  format: 'video' | 'photo';
  package: string;
  venue: string;
  deadline: string; // ISO date string
  productionStyle: 'highlight' | 'teaser' | 'documentary' | 'ceremony' | 'toasts' | 'first-dance' | 'first-look';
  comments: number;
  unreadComments: boolean;
  shootingCrew?: {
    photographer?: {
      name: string;
      avatar?: string;
    };
    videographer?: {
      name: string;
      avatar?: string;
    };
  };
}

// Rest of the interfaces and data...