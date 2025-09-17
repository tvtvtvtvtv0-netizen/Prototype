import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Users, Heart, Building2, Camera, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

interface Project {
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
  format: 'video' | 'photo' | 'both';
  package: string;
  venue: string;
  deadline: string;
  editorDeadline?: string;
  clientDeadline?: string;
  productionStyle: string;
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

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  
  // Filter states
  const [showPlannedProjects, setShowPlannedProjects] = useState(true);
  const [showEditorDeadlines, setShowEditorDeadlines] = useState(false);
  const [showClientDeadlines, setShowClientDeadlines] = useState(false);
  
  // All projects with different types of deadlines
  const allProjects: Project[] = [
    {
      id: 'w1',
      title: 'Emma & David Wedding',
      client: 'Emma Wilson',
      type: 'wedding',
      date: '2025-07-12',
      location: 'Beachside Resort',
      budget: '$15,000',
      assignee: 'Alex Johnson',
      priority: 'high',
      description: 'Destination wedding with beach ceremony',
      format: 'video',
      package: 'Premium Package',
      venue: 'Beachside Resort',
      deadline: '2025-07-10',
      editorDeadline: '2025-07-20',
      clientDeadline: '2025-07-30',
      productionStyle: 'highlight',
      comments: 3,
      unreadComments: true,
      shootingCrew: {
        photographer: { name: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=64&h=64&fit=crop&crop=face' },
        videographer: { name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face' }
      }
    },
    {
      id: 'w2',
      title: 'Lisa & Tom Wedding',
      client: 'Lisa Chang',
      type: 'wedding',
      date: '2025-06-28',
      location: 'Mountain Lodge',
      budget: '$18,000',
      assignee: 'Alex Johnson',
      priority: 'urgent',
      description: 'Mountain wedding with scenic views',
      format: 'photo',
      package: 'Photography Package',
      venue: 'Mountain Lodge',
      deadline: '2025-06-25',
      editorDeadline: '2025-07-05',
      clientDeadline: '2025-07-15',
      productionStyle: 'ceremony',
      comments: 4,
      unreadComments: true,
      shootingCrew: {
        photographer: { name: 'Oliver Smith', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face' }
      }
    },
    {
      id: 'w3',
      title: 'Rachel & Chris Wedding',
      client: 'Rachel Martinez',
      type: 'wedding',
      date: '2025-05-17',
      location: 'Vineyard Estate',
      budget: '$20,000',
      assignee: 'Alex Johnson',
      priority: 'high',
      description: 'Luxury vineyard wedding with sunset ceremony',
      format: 'both',
      package: 'Full Coverage Package',
      venue: 'Vineyard Estate',
      deadline: '2025-05-15',
      editorDeadline: '2025-05-25',
      clientDeadline: '2025-06-01',
      productionStyle: 'highlight',
      comments: 2,
      unreadComments: false,
      shootingCrew: {
        photographer: { name: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=64&h=64&fit=crop&crop=face' },
        videographer: { name: 'Oliver Smith', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face' }
      }
    },
    {
      id: 'w4',
      title: 'Jennifer & Mark Wedding',
      client: 'Jennifer Brown',
      type: 'wedding',
      date: '2025-08-09',
      location: 'Garden Manor',
      budget: '$22,000',
      assignee: 'Sarah Chen',
      priority: 'medium',
      description: 'Garden wedding with outdoor ceremony',
      format: 'both',
      package: 'Full Coverage Package',
      venue: 'Garden Manor',
      deadline: '2025-08-05',
      editorDeadline: '2025-08-18',
      clientDeadline: '2025-08-28',
      productionStyle: 'romantic',
      comments: 6,
      unreadComments: true,
      shootingCrew: {
        photographer: { name: 'Jessica Lee', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face' },
        videographer: { name: 'Marcus Thompson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face' }
      }
    },
    {
      id: 'w5',
      title: 'Sophia & Daniel Wedding',
      client: 'Sophia Lee',
      type: 'wedding',
      date: '2025-09-20',
      location: 'Historic Cathedral',
      budget: '$25,000',
      assignee: 'David Kim',
      priority: 'high',
      description: 'Traditional cathedral wedding with reception',
      format: 'video',
      package: 'Cinematic Package',
      venue: 'Historic Cathedral',
      deadline: '2025-09-15',
      editorDeadline: '2025-09-30',
      clientDeadline: '2025-10-10',
      productionStyle: 'cinematic',
      comments: 8,
      unreadComments: false,
      shootingCrew: {
        videographer: { name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face' }
      }
    },
    {
      id: 'w6',
      title: 'Michelle & Robert Wedding',
      client: 'Michelle Davis',
      type: 'wedding',
      date: '2025-04-26',
      location: 'Lakeside Pavilion',
      budget: '$16,500',
      assignee: 'Mike Rodriguez',
      priority: 'normal',
      description: 'Lakeside wedding with sunset reception',
      format: 'photo',
      package: 'Photography Package',
      venue: 'Lakeside Pavilion',
      deadline: '2025-04-20',
      editorDeadline: '2025-05-02',
      clientDeadline: '2025-05-12',
      productionStyle: 'natural',
      comments: 3,
      unreadComments: true,
      shootingCrew: {
        photographer: { name: 'Emma Davis', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face' }
      }
    },
    {
      id: 'w7',
      title: 'Anna & Michael Wedding',
      client: 'Anna Rodriguez',
      type: 'wedding',
      date: '2025-10-11',
      location: 'Country Club',
      budget: '$19,000',
      assignee: 'Alex Johnson',
      priority: 'medium',
      description: 'Elegant country club wedding with golf course views',
      format: 'both',
      package: 'Elite Package',
      venue: 'Country Club',
      deadline: '2025-10-05',
      editorDeadline: '2025-10-20',
      clientDeadline: '2025-10-30',
      productionStyle: 'elegant',
      comments: 5,
      unreadComments: false,
      shootingCrew: {
        photographer: { name: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=64&h=64&fit=crop&crop=face' },
        videographer: { name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face' }
      }
    }
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Update currentDate when year or month changes
  const updateCalendarDate = (year: number, month: number) => {
    const newDate = new Date(year, month, 1);
    setCurrentDate(newDate);
  };

  const handleYearChange = (year: string) => {
    const yearNum = parseInt(year);
    setSelectedYear(yearNum);
    updateCalendarDate(yearNum, selectedMonth);
  };

  const handleMonthChange = (month: string) => {
    const monthNum = parseInt(month);
    setSelectedMonth(monthNum);
    updateCalendarDate(selectedYear, monthNum);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    let newMonth = selectedMonth;
    let newYear = selectedYear;
    
    if (direction === 'prev') {
      newMonth = selectedMonth - 1;
      if (newMonth < 0) {
        newMonth = 11;
        newYear = selectedYear - 1;
      }
    } else {
      newMonth = selectedMonth + 1;
      if (newMonth > 11) {
        newMonth = 0;
        newYear = selectedYear + 1;
      }
    }
    
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    updateCalendarDate(newYear, newMonth);
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setCurrentDate(today);
  };

  // Available years for selector
  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 7 }, (_, i) => currentYear - 3 + i);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getProjectsForDate = (date: Date | null) => {
    if (!date) return [];
    
    const dateStr = date.toISOString().split('T')[0];
    const events = [];
    
    allProjects.forEach(project => {
      // Add planned project (shooting date)
      if (showPlannedProjects && project.date === dateStr) {
        events.push({
          ...project,
          eventType: 'planned' as const
        });
      }
      
      // Add editor deadline
      if (showEditorDeadlines && project.editorDeadline === dateStr) {
        events.push({
          ...project,
          eventType: 'editor-deadline' as const
        });
      }
      
      // Add client deadline
      if (showClientDeadlines && project.clientDeadline === dateStr) {
        events.push({
          ...project,
          eventType: 'client-deadline' as const
        });
      }
    });
    
    return events;
  };

  const isWeekend = (date: Date | null) => {
    if (!date) return false;
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  const getTypeColor = (type: Project['type']) => {
    switch (type) {
      case 'wedding': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'corporate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'engagement': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'other': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: Project['type']) => {
    switch (type) {
      case 'wedding': return <Heart className="w-3 h-3" />;
      case 'corporate': return <Building2 className="w-3 h-3" />;
      case 'engagement': return <Camera className="w-3 h-3" />;
      case 'other': return <Video className="w-3 h-3" />;
      default: return <Video className="w-3 h-3" />;
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'normal': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-4">
      {/* Year and Month Selectors */}
      <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Year:</label>
              <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map(year => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Month:</label>
              <Select value={selectedMonth.toString()} onValueChange={handleMonthChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthNames.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Checkboxes */}
          <Card className="p-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="planned"
                  checked={showPlannedProjects}
                  onCheckedChange={setShowPlannedProjects}
                />
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1" />
                <label htmlFor="planned" className="text-sm font-medium">
                  Planned Projects
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="editor"
                  checked={showEditorDeadlines}
                  onCheckedChange={setShowEditorDeadlines}
                />
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1" />
                <label htmlFor="editor" className="text-sm font-medium">
                  Editor Deadlines
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="client"
                  checked={showClientDeadlines}
                  onCheckedChange={setShowClientDeadlines}
                />
                <div className="w-3 h-3 rounded-full bg-red-500 mr-1" />
                <label htmlFor="client" className="text-sm font-medium">
                  Client Deadlines
                </label>
              </div>
            </div>
          </Card>
        </div>

      {/* Calendar Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {monthNames[selectedMonth]} {selectedYear}
              </h2>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {dayNames.map((day, index) => (
              <div key={day} className={`p-3 text-center text-sm font-medium border-b ${
                index === 0 || index === 6 ? 'text-red-600 bg-red-50' : 'text-muted-foreground'
              }`}>
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {days.map((date, index) => {
              const projects = getProjectsForDate(date);
              const hasProjects = projects.length > 0;

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-1 border border-border/50 ${
                    date ? (
                      isWeekend(date) 
                        ? 'bg-red-50/50 hover:bg-red-50/80 transition-colors' 
                        : 'bg-card hover:bg-accent/50 transition-colors'
                    ) : 'bg-muted/30'
                  } ${isToday(date) ? 'ring-2 ring-primary ring-offset-1' : ''}`}
                >
                  {date && (
                    <>
                      {/* Date number */}
                      <div className={`text-sm p-1 ${
                        isToday(date) 
                          ? 'font-semibold text-primary' 
                          : isWeekend(date)
                            ? 'text-red-600 font-medium'
                            : 'text-foreground'
                      }`}>
                        {date.getDate()}
                      </div>

                      {/* Projects */}
                      <div className="space-y-1">
                        {projects.slice(0, 3).map((projectEvent, index) => {
                          const project = projectEvent;
                          const eventType = (project as any).eventType;
                          
                          const getEventTypeColor = (eventType: string) => {
                            switch (eventType) {
                              case 'planned': return 'bg-green-100 text-green-800 border-green-200';
                              case 'editor-deadline': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                              case 'client-deadline': return 'bg-red-100 text-red-800 border-red-200';
                              default: return 'bg-green-100 text-green-800 border-green-200';
                            }
                          };

                          const getEventIcon = (eventType: string) => {
                            switch (eventType) {
                              case 'planned': return <Heart className="w-3 h-3 text-green-600" />;
                              case 'editor-deadline': return <Clock className="w-3 h-3 text-yellow-600" />;
                              case 'client-deadline': return <CalendarIcon className="w-3 h-3 text-red-600" />;
                              default: return <Heart className="w-3 h-3 text-green-600" />;
                            }
                          };

                          return (
                            <TooltipProvider key={`${project.id}-${eventType}-${index}`}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={`text-xs p-2 rounded border cursor-pointer transition-all hover:scale-105 ${getEventTypeColor(eventType)}`}
                                  >
                                    <div className="flex items-center gap-1 mb-1">
                                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(project.priority)}`} />
                                      {getEventIcon(eventType)}
                                      <span className="truncate font-medium text-xs">
                                        {project.title.replace(' Wedding', '')}
                                      </span>
                                    </div>
                                    {/* Event type and format display */}
                                    <div className="text-xs opacity-75 font-medium">
                                      {eventType === 'planned' ? (
                                        project.format === 'video' ? 'Video' : 
                                        project.format === 'photo' ? 'Photo' : 
                                        project.format === 'both' ? 'Photo + Video' : 'Photo + Video'
                                      ) : eventType === 'editor-deadline' ? (
                                        'Editor Deadline'
                                      ) : (
                                        'Client Deadline'
                                      )}
                                    </div>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent 
                                  side="top" 
                                  className="max-w-xs bg-white border border-gray-200 shadow-lg text-gray-900"
                                >
                                  <div className="space-y-2 p-2">
                                    <div className="font-medium text-base">{project.title}</div>
                                    <div className="text-sm space-y-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <Badge variant="outline" className="text-xs capitalize bg-gray-50 text-gray-700 border-gray-300">
                                          {project.type}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs capitalize bg-gray-50 text-gray-700 border-gray-300">
                                          {project.priority} priority
                                        </Badge>
                                        <Badge variant="outline" className="text-xs uppercase bg-gray-50 text-gray-700 border-gray-300">
                                          {project.format}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-1 text-gray-700">
                                        <span className="font-medium">Client:</span>
                                        <span>{project.client}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-gray-700">
                                        <MapPin className="w-3 h-3" />
                                        <span>{project.venue}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-gray-700">
                                        <Users className="w-3 h-3" />
                                        <span>{project.assignee}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-gray-700">
                                        <span className="font-medium">Budget:</span>
                                        <span>{project.budget}</span>
                                      </div>
                                      {eventType === 'planned' && (
                                        <div className="flex items-center gap-1 text-green-600">
                                          <Heart className="w-3 h-3" />
                                          <span>Wedding Day</span>
                                        </div>
                                      )}
                                      {eventType === 'editor-deadline' && (
                                        <div className="flex items-center gap-1 text-yellow-600">
                                          <Clock className="w-3 h-3" />
                                          <span>Editor Deadline</span>
                                        </div>
                                      )}
                                      {eventType === 'client-deadline' && (
                                        <div className="flex items-center gap-1 text-red-600">
                                          <CalendarIcon className="w-3 h-3" />
                                          <span>Client Deadline</span>
                                        </div>
                                      )}
                                      {project.shootingCrew && (
                                        <div className="text-gray-600 mt-2 pt-2 border-t border-gray-200">
                                          <span className="font-medium text-xs">Crew: </span>
                                          <span className="text-xs">
                                            {project.shootingCrew.photographer?.name}
                                            {project.shootingCrew.photographer && project.shootingCrew.videographer && ', '}
                                            {project.shootingCrew.videographer?.name}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          );
                        })}
                        
                        {/* Show "more" indicator if there are additional projects */}
                        {projects.length > 3 && (
                          <div className="text-xs text-muted-foreground text-center py-1">
                            +{projects.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>


    </div>
  );
}