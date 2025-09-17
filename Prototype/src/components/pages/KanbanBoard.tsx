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

interface ColumnDisplaySettings {
  showTitle: boolean;
  showDescription: boolean;
  showClient: boolean;
  showDate: boolean;
  showLocation: boolean;
  showBudget: boolean;
  showAssignee: boolean;
  showPriority: boolean;
  showType: boolean;
  showFormat: boolean;
  showPackage: boolean;
  showVenue: boolean;
  showDeadline: boolean;
  showProductionStyle: boolean;
  showComments: boolean;
  // Crew settings
  showPhotographerAvatar: boolean;
  showPhotographerName: boolean;
  showVideographerAvatar: boolean;
  showVideographerName: boolean;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  cardColor: string;
  projects: ProjectCard[];
  displaySettings?: ColumnDisplaySettings;
}

const defaultDisplaySettings: ColumnDisplaySettings = {
  showTitle: true,
  showDescription: true,
  showClient: true,
  showDate: true,
  showLocation: true,
  showBudget: true,
  showAssignee: true,
  showPriority: true,
  showType: true,
  showFormat: true,
  showPackage: false,
  showVenue: false,
  showDeadline: false,
  showProductionStyle: true,
  showComments: true,
  showPhotographerAvatar: true,
  showPhotographerName: true,
  showVideographerAvatar: true,
  showVideographerName: true,
};

const initialData: KanbanColumn[] = [
  {
    id: 'scheduled',
    title: 'Scheduled',
    color: 'bg-gray-100',
    cardColor: 'bg-gray-50',
    displaySettings: { ...defaultDisplaySettings },
    projects: [
      {
        id: '1',
        title: 'Emma & David Wedding',
        client: 'Emma Wilson',
        type: 'wedding',
        date: 'Jul 12, 2025',
        location: 'Beachside Resort',
        budget: '$15,000',
        assignee: 'Alex Johnson',
        priority: 'high',
        description: 'Destination wedding with beach ceremony',
        format: 'video',
        package: 'Premium Package',
        venue: 'Beachside Resort',
        deadline: '2025-07-10T00:00:00Z',
        productionStyle: 'highlight',
        comments: 3,
        unreadComments: true,
        shootingCrew: {
          photographer: {
            name: 'Maria Garcia',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=64&h=64&fit=crop&crop=face'
          },
          videographer: {
            name: 'James Wilson',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
          }
        }
      },
      {
        id: '2',
        title: 'TechStart Product Launch',
        client: 'TechStart Inc',
        type: 'corporate',
        date: 'Jul 20, 2025',
        location: 'Convention Center',
        budget: '$8,000',
        assignee: 'Sarah Chen',
        priority: 'medium',
        description: 'Product launch event with demos',
        format: 'video',
        package: 'Corporate Package',
        venue: 'Convention Center',
        deadline: '2025-07-18T00:00:00Z',
        productionStyle: 'teaser',
        comments: 1,
        unreadComments: false,
        shootingCrew: {
          videographer: {
            name: 'Alex Chen',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
          }
        }
      },
      {
        id: '3',
        title: 'Summer Festival Coverage',
        client: 'City Events',
        type: 'corporate',
        date: 'Aug 5, 2025',
        location: 'Central Park',
        budget: '$5,500',
        assignee: 'Mike Rodriguez',
        priority: 'normal',
        description: 'Multi-day outdoor festival documentation',
        format: 'video',
        package: 'Event Package',
        venue: 'Central Park',
        deadline: '2025-08-01T00:00:00Z',
        productionStyle: 'documentary',
        comments: 0,
        unreadComments: false
      }
    ]
  },
  {
    id: 'shot',
    title: 'Shot',
    color: 'bg-indigo-100',
    cardColor: 'bg-indigo-50',
    displaySettings: { ...defaultDisplaySettings },
    projects: [
      {
        id: '4',
        title: 'Lisa & Tom Wedding',
        client: 'Lisa Chang',
        type: 'wedding',
        date: 'Jul 2, 2025',
        location: 'Mountain Lodge',
        budget: '$18,000',
        assignee: 'Alex Johnson',
        priority: 'urgent',
        description: 'Mountain wedding with scenic views',
        format: 'video',
        package: 'Premium Package',
        venue: 'Mountain Lodge',
        deadline: '2025-06-30T00:00:00Z',
        productionStyle: 'ceremony',
        comments: 4,
        unreadComments: true,
        shootingCrew: {
          photographer: {
            name: 'Oliver Smith',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
          },
          videographer: {
            name: 'Emma Davis',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face'
          }
        }
      },
      {
        id: '5',
        title: 'Corporate Headshots',
        client: 'Goldman Associates',
        type: 'corporate',
        date: 'Jun 15, 2025',
        location: 'Downtown Office',
        budget: '$3,500',
        assignee: 'Mike Rodriguez',
        priority: 'normal',
        description: 'Executive team headshots for website',
        format: 'photo',
        package: 'Corporate Photo Package',
        venue: 'Downtown Office',
        deadline: '2025-06-20T00:00:00Z',
        productionStyle: 'documentary',
        comments: 2,
        unreadComments: false,
        shootingCrew: {
          photographer: {
            name: 'Sarah Thompson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=64&h=64&fit=crop&crop=face'
          }
        }
      }
    ]
  },
  {
    id: 'uploaded',
    title: 'Uploaded',
    color: 'bg-blue-100',
    cardColor: 'bg-blue-50',
    displaySettings: { ...defaultDisplaySettings },
    projects: [
      {
        id: '6',
        title: 'Sarah & Mike Engagement',
        client: 'Sarah Johnson',
        type: 'engagement',
        date: 'Jun 28, 2025',
        location: 'Central Park',
        budget: '$2,500',
        assignee: 'Mike Rodriguez',
        priority: 'normal',
        description: 'Romantic engagement session at sunset',
        format: 'photo',
        package: 'Engagement Package',
        venue: 'Central Park',
        deadline: '2025-06-30T00:00:00Z',
        productionStyle: 'first-look',
        comments: 1,
        unreadComments: false,
        shootingCrew: {
          photographer: {
            name: 'Jessica Lee',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face'
          }
        }
      }
    ]
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    color: 'bg-yellow-100',
    cardColor: 'bg-yellow-50',
    displaySettings: { ...defaultDisplaySettings },
    projects: [
      {
        id: '10',
        title: 'Anna & Jake Wedding',
        client: 'Anna Smith',
        type: 'wedding',
        date: 'Jun 25, 2025',
        location: 'Garden Venue',
        budget: '$12,000',
        assignee: 'David Kim',
        priority: 'high',
        description: 'Garden wedding with drone shots',
        format: 'video',
        package: 'Deluxe Package',
        venue: 'Garden Venue',
        deadline: '2025-06-23T00:00:00Z',
        productionStyle: 'ceremony',
        comments: 5,
        unreadComments: true,
        shootingCrew: {
          photographer: {
            name: 'Emma Davis',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face'
          },
          videographer: {
            name: 'Marcus Thompson',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face'
          }
        }
      }
    ]
  },
  {
    id: 'readyreview',
    title: 'Ready for Review',
    color: 'bg-orange-100',
    cardColor: 'bg-orange-50',
    displaySettings: { ...defaultDisplaySettings },
    projects: [
      {
        id: '13',
        title: 'Rachel & Chris Wedding',
        client: 'Rachel Martinez',
        type: 'wedding',
        date: 'May 15, 2025',
        location: 'Vineyard Estate',
        budget: '$20,000',
        assignee: 'Alex Johnson',
        priority: 'high',
        description: 'Luxury vineyard wedding with sunset ceremony',
        format: 'video',
        package: 'Luxury Package',
        venue: 'Vineyard Estate',
        deadline: '2025-05-25T00:00:00Z',
        productionStyle: 'highlight',
        comments: 2,
        unreadComments: false,
        shootingCrew: {
          photographer: {
            name: 'Maria Garcia',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=64&h=64&fit=crop&crop=face'
          },
          videographer: {
            name: 'Oliver Smith',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
          }
        }
      }
    ]
  },
  {
    id: 'revisions',
    title: 'Revisions',
    color: 'bg-purple-100',
    cardColor: 'bg-purple-50',
    displaySettings: { ...defaultDisplaySettings },
    projects: [
      {
        id: '17',
        title: 'Michael & Jennifer Wedding',
        client: 'Jennifer Adams',
        type: 'wedding',
        date: 'Apr 28, 2025',
        location: 'Historic Chapel',
        budget: '$14,000',
        assignee: 'David Kim',
        priority: 'urgent',
        description: 'Traditional chapel wedding with vintage style',
        format: 'video',
        package: 'Classic Package',
        venue: 'Historic Chapel',
        deadline: '2025-05-05T00:00:00Z',
        productionStyle: 'ceremony',
        comments: 8,
        unreadComments: true,
        shootingCrew: {
          photographer: {
            name: 'Sarah Thompson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=64&h=64&fit=crop&crop=face'
          },
          videographer: {
            name: 'Alex Chen',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
          }
        }
      }
    ]
  },
  {
    id: 'senttoclient',
    title: 'Sent to Client',
    color: 'bg-pink-100',
    cardColor: 'bg-pink-50',
    displaySettings: { ...defaultDisplaySettings },
    projects: [
      {
        id: '20',
        title: 'Healthcare Summit 2025',
        client: 'Medical Associates',
        type: 'corporate',
        date: 'Apr 12, 2025',
        location: 'Convention Hall',
        budget: '$9,500',
        assignee: 'Alex Johnson',
        priority: 'normal',
        description: 'Medical conference with panel discussions',
        format: 'video',
        package: 'Conference Package',
        venue: 'Convention Hall',
        deadline: '2025-04-20T00:00:00Z',
        productionStyle: 'documentary',
        comments: 1,
        unreadComments: false,
        shootingCrew: {
          videographer: {
            name: 'Marcus Thompson',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face'
          }
        }
      }
    ]
  },
  {
    id: 'approved',
    title: 'Approved',
    color: 'bg-green-100',
    cardColor: 'bg-green-50',
    displaySettings: { ...defaultDisplaySettings },
    projects: [
      {
        id: '23',
        title: 'Daniel & Sophie Wedding',
        client: 'Sophie Brown',
        type: 'wedding',
        date: 'Mar 25, 2025',
        location: 'Country Club',
        budget: '$13,500',
        assignee: 'David Kim',
        priority: 'normal',
        description: 'Elegant country club wedding with golf course views',
        format: 'video',
        package: 'Deluxe Package',
        venue: 'Country Club',
        deadline: '2025-04-01T00:00:00Z',
        productionStyle: 'ceremony',
        comments: 0,
        unreadComments: false,
        shootingCrew: {
          photographer: {
            name: 'Maria Garcia',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=64&h=64&fit=crop&crop=face'
          },
          videographer: {
            name: 'Alex Chen',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
          }
        }
      }
    ]
  }
];

const getTypeIcon = (type: string) => {
  const icons = {
    wedding: Heart,
    corporate: Building2,
    engagement: Camera,
    other: Video,
    Photo: Camera,
    Video: Video,
  };
  const Icon = icons[type as keyof typeof icons] || Video;
  return <Icon className="h-4 w-4" />;
};

const getCardColor = (type: string, baseColor: string) => {
  if (type === 'Photo') {
    return 'bg-green-50 border-green-200';
  } else if (type === 'Video') {
    return 'bg-blue-50 border-blue-200';
  }
  return baseColor;
};

const getPriorityColor = (priority: string) => {
  const colors = {
    normal: 'bg-slate-500 text-white border-slate-600',
    medium: 'bg-blue-500 text-white border-blue-600',
    high: 'bg-orange-500 text-white border-orange-600', 
    urgent: 'bg-red-500 text-white border-red-600',
  };
  return colors[priority as keyof typeof colors] || colors.normal;
};

const getPriorityBadgeStyles = (priority: 'normal' | 'medium' | 'high' | 'urgent') => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-500 text-white';
    case 'high':
      return 'bg-orange-400 text-white';
    case 'medium':
      return 'bg-green-500 text-white';
    case 'normal':
    default:
      return 'bg-gray-200 text-gray-600';
  }
};

const getPriorityText = (priority: 'normal' | 'medium' | 'high' | 'urgent') => {
  switch (priority) {
    case 'urgent':
      return 'URG';
    case 'high':
      return 'HIGH';
    case 'medium':
      return 'MED';
    case 'normal':
    default:
      return null; // Will show icon instead
  }
};

const getPriorityFlameColor = (priority: string) => {
  const colors = {
    'normal': 'text-gray-500',
    'medium': 'text-yellow-500',
    'high': 'text-orange-500',
    'urgent': 'text-red-500'
  };
  return colors[priority as keyof typeof colors] || 'text-gray-500';
};

const getPriorityIcon = (priority: string) => {
  // For normal priority, show flame icon instead of text
  if (priority === 'normal') {
    return <Flame className={`h-3 w-3 ${getPriorityFlameColor(priority)}`} />;
  }
  // For other priorities, show text badge
  return null;
};

const getProductionStyleShort = (style: string) => {
  const shortLabels = {
    'highlight': 'HL',
    'teaser': 'TZ',
    'documentary': 'DOC',
    'ceremony': 'CER',
    'toasts': 'TST',
    'first-dance': 'FD',
    'first-look': 'FL'
  };
  return shortLabels[style as keyof typeof shortLabels] || style.slice(0, 3).toUpperCase();
};

const getProductionStyleColor = (style: string) => {
  const colors = {
    'highlight': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'teaser': 'bg-purple-100 text-purple-800 border-purple-200',
    'documentary': 'bg-blue-100 text-blue-800 border-blue-200',
    'ceremony': 'bg-pink-100 text-pink-800 border-pink-200',
    'toasts': 'bg-orange-100 text-orange-800 border-orange-200',
    'first-dance': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'first-look': 'bg-indigo-100 text-indigo-800 border-indigo-200'
  };
  return colors[style as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getFormatShort = (format: string) => {
  const shortLabels = {
    'video': 'VID',
    'photo': 'PHOTO'
  };
  return shortLabels[format as keyof typeof shortLabels] || format.toUpperCase();
};

const getFormatColor = (format: string) => {
  const colors = {
    'video': 'bg-green-100 text-green-800 border-green-200',
    'photo': 'bg-indigo-100 text-indigo-800 border-indigo-200'
  };
  return colors[format as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

interface ProjectCardProps {
  project: ProjectCard;
  index: number;
  column: KanbanColumn;
  setSelectedProject: (project: ProjectCard) => void;
  setSelectedTab: (tab: string) => void;
  setIsDetailPanelOpen: (isOpen: boolean) => void;
  updateProjectPriority: (projectId: string, newPriority: 'normal' | 'medium' | 'high' | 'urgent') => void;
}

const DraggableProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  column, 
  setSelectedProject, 
  setSelectedTab, 
  setIsDetailPanelOpen,
  updateProjectPriority
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'project-card',
    item: { 
      id: project.id, 
      index,
      sourceColumn: column.id 
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={drag}
      style={{ opacity }}
      className={`${getCardColor(project.type, column.cardColor)} border rounded-lg p-4 mb-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-300`}
      onClick={() => {
        setSelectedProject(project);
        setSelectedTab('event-details');
        setIsDetailPanelOpen(true);
      }}
    >
      {/* Header with title and type icon */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          {(column.displaySettings?.showTitle ?? defaultDisplaySettings.showTitle) && (
            <h3 className="font-medium truncate pr-2">{project.title}</h3>
          )}
        </div>
        {(column.displaySettings?.showType ?? defaultDisplaySettings.showType) && (
          <div className="flex-shrink-0">
            {getTypeIcon(project.type)}
          </div>
        )}
      </div>

      {/* Description */}
      {(column.displaySettings?.showDescription ?? defaultDisplaySettings.showDescription) && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
      )}

      {/* Main content grid */}
      <div className="space-y-2">
        {/* Client */}
        {(column.displaySettings?.showClient ?? defaultDisplaySettings.showClient) && (
          <div className="flex items-center space-x-2">
            <Users className="h-3 w-3 text-gray-400" />
            <span className="text-sm text-gray-600">{project.client}</span>
          </div>
        )}

        {/* Date */}
        {(column.displaySettings?.showDate ?? defaultDisplaySettings.showDate) && (
          <div className="flex items-center space-x-2">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span className="text-sm text-gray-600">{project.date}</span>
          </div>
        )}

        {/* Location */}
        {(column.displaySettings?.showLocation ?? defaultDisplaySettings.showLocation) && (
          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">{project.location}</span>
          </div>
        )}

        {/* Budget */}
        {(column.displaySettings?.showBudget ?? defaultDisplaySettings.showBudget) && (
          <div className="flex items-center space-x-2">
            <DollarSign className="h-3 w-3 text-gray-400" />
            <span className="text-sm text-gray-600">{project.budget}</span>
          </div>
        )}
      </div>

      {/* Badges section */}
      <div className="flex flex-wrap items-center gap-1 mt-3">
        {/* Format */}
        {(column.displaySettings?.showFormat ?? defaultDisplaySettings.showFormat) && (
          <Badge className={`text-xs px-1.5 py-0.5 border ${getFormatColor(project.format)}`}>
            {getFormatShort(project.format)}
          </Badge>
        )}

        {/* Production Style */}
        {(column.displaySettings?.showProductionStyle ?? defaultDisplaySettings.showProductionStyle) && (
          <Badge className={`text-xs px-1.5 py-0.5 border ${getProductionStyleColor(project.productionStyle)}`}>
            {getProductionStyleShort(project.productionStyle)}
          </Badge>
        )}
      </div>

      {/* Crew section */}
      {((column.displaySettings?.showPhotographerAvatar ?? defaultDisplaySettings.showPhotographerAvatar) ||
        (column.displaySettings?.showVideographerAvatar ?? defaultDisplaySettings.showVideographerAvatar)) && 
        project.shootingCrew && (
        <div className="flex items-center space-x-2 mt-3">
          {project.shootingCrew.photographer && 
           (column.displaySettings?.showPhotographerAvatar ?? defaultDisplaySettings.showPhotographerAvatar) && (
            <div className="flex items-center space-x-1">
              <Camera className="h-3 w-3 text-gray-400" />
              <Avatar className="h-5 w-5">
                <AvatarImage src={project.shootingCrew.photographer.avatar} />
                <AvatarFallback className="text-xs">
                  {project.shootingCrew.photographer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {(column.displaySettings?.showPhotographerName ?? defaultDisplaySettings.showPhotographerName) && (
                <span className="text-xs text-gray-500">{project.shootingCrew.photographer.name}</span>
              )}
            </div>
          )}
          
          {project.shootingCrew.videographer && 
           (column.displaySettings?.showVideographerAvatar ?? defaultDisplaySettings.showVideographerAvatar) && (
            <div className="flex items-center space-x-1">
              <Video className="h-3 w-3 text-gray-400" />
              <Avatar className="h-5 w-5">
                <AvatarImage src={project.shootingCrew.videographer.avatar} />
                <AvatarFallback className="text-xs">
                  {project.shootingCrew.videographer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {(column.displaySettings?.showVideographerName ?? defaultDisplaySettings.showVideographerName) && (
                <span className="text-xs text-gray-500">{project.shootingCrew.videographer.name}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bottom row with chat and priority icons */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
        {/* Chat icon on the left */}
        <div className="flex items-center">
          {project.comments > 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(project);
                setSelectedTab('chat');
                setIsDetailPanelOpen(true);
              }}
              className={`p-1 rounded-sm hover:bg-gray-100 transition-colors duration-150 ${
                project.unreadComments ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <MessageCircle className="h-3.5 w-3.5" />
            </button>
          ) : (
            <div className="w-5 h-5"></div>
          )}
        </div>

        {/* Priority badge on the right */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="hover:opacity-80 transition-opacity duration-150"
              >
                {getPriorityText(project.priority) ? (
                  <Badge className={`text-xs px-2 py-1 font-medium ${getPriorityBadgeStyles(project.priority)}`}>
                    {getPriorityText(project.priority)}
                  </Badge>
                ) : (
                  <div className="p-1 rounded-sm hover:bg-gray-100">
                    <Flame className="h-3.5 w-3.5 text-gray-500" />
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  updateProjectPriority(project.id, 'normal');
                }}
                className="flex items-center space-x-2"
              >
                <Flame className="h-3 w-3 text-gray-500" />
                <span>Normal</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  updateProjectPriority(project.id, 'medium');
                }}
                className="flex items-center space-x-2"
              >
                <Badge className="text-xs px-1.5 py-0.5 bg-green-500 text-white">MED</Badge>
                <span>Medium</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  updateProjectPriority(project.id, 'high');
                }}
                className="flex items-center space-x-2"
              >
                <Badge className="text-xs px-1.5 py-0.5 bg-orange-400 text-white">HIGH</Badge>
                <span>High</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  updateProjectPriority(project.id, 'urgent');
                }}
                className="flex items-center space-x-2"
              >
                <Badge className="text-xs px-1.5 py-0.5 bg-red-500 text-white">URG</Badge>
                <span>Urgent</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

interface DroppableColumnProps {
  column: KanbanColumn;
  index: number;
  moveProject: (projectId: string, fromColumn: string, toColumn: string, toIndex: number) => void;
  setSelectedProject: (project: ProjectCard) => void;
  setSelectedTab: (tab: string) => void;
  setIsDetailPanelOpen: (isOpen: boolean) => void;
  updateProjectPriority: (projectId: string, newPriority: 'normal' | 'medium' | 'high' | 'urgent') => void;
  updateColumnDisplaySettings: (columnId: string, settings: ColumnDisplaySettings) => void;
  filteredProjects: ProjectCard[];
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ 
  column, 
  index, 
  moveProject, 
  setSelectedProject, 
  setSelectedTab, 
  setIsDetailPanelOpen,
  updateProjectPriority,
  updateColumnDisplaySettings,
  filteredProjects
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'project-card',
    drop: (item: { id: string; sourceColumn: string }, monitor) => {
      if (!monitor.didDrop()) {
        moveProject(item.id, item.sourceColumn, column.id, filteredProjects.length);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`flex-shrink-0 w-80 ${column.color} rounded-lg p-4 transition-all duration-200 ${
        isOver ? 'ring-2 ring-blue-300' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-sm font-medium">{column.title}</h2>
          <Badge variant="secondary" className="text-xs">
            {filteredProjects.length}
          </Badge>
        </div>
        
        <ColumnMenu 
          onSettings={() => setIsSettingsOpen(true)}
        />
      </div>

      <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
        {filteredProjects.map((project, projectIndex) => (
          <DraggableProjectCard
            key={project.id}
            project={project}
            index={projectIndex}
            column={column}
            setSelectedProject={setSelectedProject}
            setSelectedTab={setSelectedTab}
            setIsDetailPanelOpen={setIsDetailPanelOpen}
            updateProjectPriority={updateProjectPriority}
          />
        ))}
      </div>

      <ColumnSettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        column={column}
        onSave={(settings) => updateColumnDisplaySettings(column.id, settings)}
      />
    </div>
  );
};

interface KanbanBoardProps {
  onOpenFilters: () => void;
  filterStates: any;
  setFilterStates: any;
  selectedProject: ProjectCard | null;
  setSelectedProject: (project: ProjectCard | null) => void;
  isDetailPanelOpen: boolean;
  setIsDetailPanelOpen: (isOpen: boolean) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  onOpenFilters,
  filterStates,
  setFilterStates,
  selectedProject,
  setSelectedProject,
  isDetailPanelOpen,
  setIsDetailPanelOpen,
  selectedTab,
  setSelectedTab
}) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');

  // Update unique filter values when projects change
  React.useEffect(() => {
    const allProjects = columns.flatMap(col => col.projects);
    
    setFilterStates((prev: any) => ({
      ...prev,
      uniqueTypes: Array.from(new Set(allProjects.map(p => p.type))),
      uniquePriorities: Array.from(new Set(allProjects.map(p => p.priority))),
      uniqueAssignees: Array.from(new Set(allProjects.map(p => p.assignee))),
      uniqueFormats: Array.from(new Set(allProjects.map(p => p.format))),
      uniquePackages: Array.from(new Set(allProjects.map(p => p.package))),
      uniqueVenues: Array.from(new Set(allProjects.map(p => p.venue))),
      uniqueProductionStyles: Array.from(new Set(allProjects.map(p => p.productionStyle))),
    }));
  }, [columns, setFilterStates]);

  const moveProject = (projectId: string, fromColumnId: string, toColumnId: string, toIndex: number) => {
    if (fromColumnId === toColumnId) return;

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Find source and destination columns
      const fromColumn = newColumns.find(col => col.id === fromColumnId);
      const toColumn = newColumns.find(col => col.id === toColumnId);
      
      if (!fromColumn || !toColumn) return prevColumns;
      
      // Find and remove project from source column
      const projectIndex = fromColumn.projects.findIndex(p => p.id === projectId);
      if (projectIndex === -1) return prevColumns;
      
      const [project] = fromColumn.projects.splice(projectIndex, 1);
      
      // Add project to destination column
      toColumn.projects.splice(toIndex, 0, project);
      
      return newColumns;
    });
  };

  const updateProjectPriority = (projectId: string, newPriority: 'normal' | 'medium' | 'high' | 'urgent') => {
    setColumns(prevColumns => {
      return prevColumns.map(column => ({
        ...column,
        projects: column.projects.map(project => 
          project.id === projectId 
            ? { ...project, priority: newPriority }
            : project
        )
      }));
    });
  };

  const updateColumnDisplaySettings = (columnId: string, settings: ColumnDisplaySettings) => {
    setColumns(prevColumns => 
      prevColumns.map(col => 
        col.id === columnId 
          ? { ...col, displaySettings: settings }
          : col
      )
    );
  };

  const filterProjects = (projects: ProjectCard[]) => {
    return projects.filter(project => {
      // Search filter
      if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !project.client.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !project.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Type filter
      if (filterStates.selectedTypes.length > 0 && !filterStates.selectedTypes.includes(project.type)) {
        return false;
      }

      // Priority filter
      if (filterStates.selectedPriorities.length > 0 && !filterStates.selectedPriorities.includes(project.priority)) {
        return false;
      }

      // Assignee filter
      if (filterStates.selectedAssignees.length > 0 && !filterStates.selectedAssignees.includes(project.assignee)) {
        return false;
      }

      // Format filter
      if (filterStates.selectedFormats.length > 0 && !filterStates.selectedFormats.includes(project.format)) {
        return false;
      }

      // Package filter
      if (filterStates.selectedPackages.length > 0 && !filterStates.selectedPackages.includes(project.package)) {
        return false;
      }

      // Venue filter
      if (filterStates.selectedVenues.length > 0 && !filterStates.selectedVenues.includes(project.venue)) {
        return false;
      }

      // Production Style filter
      if (filterStates.selectedProductionStyles.length > 0 && !filterStates.selectedProductionStyles.includes(project.productionStyle)) {
        return false;
      }

      // Deadline filter
      if (filterStates.selectedDeadlineFilter) {
        const projectDate = new Date(project.deadline);
        const now = new Date();
        
        switch (filterStates.selectedDeadlineFilter) {
          case 'overdue':
            if (projectDate >= now) return false;
            break;
          case 'today':
            if (projectDate.toDateString() !== now.toDateString()) return false;
            break;
          case 'this-week':
            const weekFromNow = new Date();
            weekFromNow.setDate(weekFromNow.getDate() + 7);
            if (projectDate < now || projectDate > weekFromNow) return false;
            break;
          case 'this-month':
            if (projectDate.getMonth() !== now.getMonth() || projectDate.getFullYear() !== now.getFullYear()) return false;
            break;
        }
      }

      return true;
    });
  };

  const hasActiveFilters = () => {
    return filterStates.selectedTypes.length > 0 ||
           filterStates.selectedPriorities.length > 0 ||
           filterStates.selectedAssignees.length > 0 ||
           filterStates.selectedFormats.length > 0 ||
           filterStates.selectedPackages.length > 0 ||
           filterStates.selectedVenues.length > 0 ||
           filterStates.selectedProductionStyles.length > 0 ||
           filterStates.selectedDeadlineFilter !== '';
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    count += filterStates.selectedTypes.length;
    count += filterStates.selectedPriorities.length;
    count += filterStates.selectedAssignees.length;
    count += filterStates.selectedFormats.length;
    count += filterStates.selectedPackages.length;
    count += filterStates.selectedVenues.length;
    count += filterStates.selectedProductionStyles.length;
    if (filterStates.selectedDeadlineFilter) count += 1;
    return count;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Search and Filter controls - LEFT SIDE */}
        <div className="flex items-center space-x-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenFilters}
            className={`${
              hasActiveFilters() ? 'bg-blue-50 border-blue-200 text-blue-700' : ''
            }`}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
            {hasActiveFilters() && (
              <Badge className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </div>
        
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex space-x-6 overflow-x-auto pb-4">
          {columns.map((column, index) => {
            const filteredProjects = filterProjects(column.projects);
            
            return (
              <DroppableColumn
                key={column.id}
                column={column}
                index={index}
                moveProject={moveProject}
                setSelectedProject={setSelectedProject}
                setSelectedTab={setSelectedTab}
                setIsDetailPanelOpen={setIsDetailPanelOpen}
                updateProjectPriority={updateProjectPriority}
                updateColumnDisplaySettings={updateColumnDisplaySettings}
                filteredProjects={filteredProjects}
              />
            );
          })}
        </div>
      </div>
    </DndProvider>
  );
};