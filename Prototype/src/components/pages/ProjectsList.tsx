import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Search, 
  Plus, 
  Calendar, 
  MapPin, 
  Users, 
  VideoIcon,
  Camera,
  Film,
  Heart,
  Building2,
  Briefcase
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  client: string;
  type: 'wedding' | 'corporate' | 'engagement' | 'other';
  status: 'planning' | 'shooting' | 'editing' | 'review' | 'completed';
  date: string;
  location: string;
  budget: string;
  description: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Jessica & Jackson Wedding',
    client: 'Jessica Crosby & Jackson Knight',
    type: 'wedding',
    status: 'editing',
    date: 'June 21, 2025',
    location: 'Riverside Chapel',
    budget: '$8,500',
    description: 'Beautiful outdoor ceremony with reception at vineyard'
  },
  {
    id: '2',
    title: 'TechCorp Annual Meeting',
    client: 'TechCorp Industries',
    type: 'corporate',
    status: 'completed',
    date: 'June 15, 2025',
    location: 'Convention Center',
    budget: '$12,000',
    description: 'Corporate annual meeting with keynote speakers'
  },
  {
    id: '3',
    title: 'Sarah & Mike Engagement',
    client: 'Sarah Johnson & Mike Chen',
    type: 'engagement',
    status: 'shooting',
    date: 'June 28, 2025',
    location: 'Central Park',
    budget: '$2,500',
    description: 'Romantic engagement session at sunset'
  },
  {
    id: '4',
    title: 'Emma & David Wedding',
    client: 'Emma Wilson & David Brown',
    type: 'wedding',
    status: 'planning',
    date: 'July 12, 2025',
    location: 'Beachside Resort',
    budget: '$15,000',
    description: 'Destination wedding with beach ceremony'
  },
  {
    id: '5',
    title: 'StartupXYZ Product Launch',
    client: 'StartupXYZ',
    type: 'corporate',
    status: 'review',
    date: 'June 30, 2025',
    location: 'Tech Hub',
    budget: '$8,000',
    description: 'Product launch event with demo presentations'
  },
];

const getStatusColor = (status: string) => {
  const colors = {
    planning: 'bg-gray-100 text-gray-800',
    shooting: 'bg-blue-100 text-blue-800',
    editing: 'bg-yellow-100 text-yellow-800',
    review: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
  };
  return colors[status as keyof typeof colors] || colors.planning;
};

const getTypeIcon = (type: string) => {
  const icons = {
    wedding: Heart,
    corporate: Building2,
    engagement: Camera,
    other: VideoIcon,
  };
  const Icon = icons[type as keyof typeof icons] || VideoIcon;
  return <Icon className="h-4 w-4" />;
};

export function ProjectsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && !['completed'].includes(project.status);
    if (activeTab === 'completed') return matchesSearch && project.status === 'completed';
    
    return matchesSearch && project.type === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Manage your video production projects
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-fit">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="wedding">Weddings</TabsTrigger>
          <TabsTrigger value="corporate">Corporate</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <VideoIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {searchQuery ? 'Try adjusting your search terms.' : 'Create your first project to get started.'}
                </p>
                {!searchQuery && (
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(project.type)}
                        <Badge variant="secondary" className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.client}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{project.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{project.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium">{project.budget}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Team assigned</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}