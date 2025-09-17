import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { CalendarIcon, Camera, Video, Loader2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from './ui/utils';
import { toast } from 'sonner';
import type { 
  ProjectModalState, 
  PhotoCardData, 
  VideoCardData, 
  CreateProjectRequest,
  CreateProjectResponse 
} from '../types/project';
import type { ProjectCard } from './pages/KanbanBoard';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: ProjectCard) => void;
}

// Mock API function - replace with real API call
const createProjectCard = async (data: CreateProjectRequest): Promise<CreateProjectResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate occasional failure for testing
  if (Math.random() < 0.1) {
    throw new Error('Failed to create project');
  }
  
  return {
    id: `${data.type}-${Date.now()}`,
    type: data.type,
    status: data.status,
    projectName: data.projectName,
    eventDate: data.eventDate,
    createdAt: new Date(),
    createdBy: 'Current User'
  };
};

export function AddProjectModal({ isOpen, onClose, onAddProject }: AddProjectModalProps) {
  const [state, setState] = useState<ProjectModalState>({
    projectName: '',
    eventDate: null,
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    isGeneralValid: false,
    isCreatingPhoto: false,
    isCreatingVideo: false,
    photoCreated: false,
    videoCreated: false,
    activeTab: null
  });

  const [photoData, setPhotoData] = useState<PhotoCardData>({
    photoStatus: 'Uploading',
    rawDelivery: false,
    deliverables: [],
    assignedPhotographers: [],
    assignedEditors: []
  });

  const [videoData, setVideoData] = useState<VideoCardData>({
    videoStatus: 'Editing',
    multiCamSetup: false,
    audioSources: [],
    deliverables: [],
    assignedVideographers: [],
    assignedEditors: []
  });

  // Validate general info whenever relevant fields change
  useEffect(() => {
    const isValid = !!state.projectName.trim() && !!state.eventDate;
    setState(prev => ({ ...prev, isGeneralValid: isValid }));
  }, [state.projectName, state.eventDate]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setState({
        projectName: '',
        eventDate: null,
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        isGeneralValid: false,
        isCreatingPhoto: false,
        isCreatingVideo: false,
        photoCreated: false,
        videoCreated: false,
        activeTab: null
      });
      setPhotoData({
        photoStatus: 'Uploading',
        rawDelivery: false,
        deliverables: [],
        assignedPhotographers: [],
        assignedEditors: []
      });
      setVideoData({
        videoStatus: 'Editing',
        multiCamSetup: false,
        audioSources: [],
        deliverables: [],
        assignedVideographers: [],
        assignedEditors: []
      });
    }
  }, [isOpen]);

  const handleCreatePhoto = async () => {
    if (!state.isGeneralValid || state.isCreatingPhoto) return;

    setState(prev => ({ ...prev, isCreatingPhoto: true }));
    
    try {
      const response = await createProjectCard({
        type: 'photo',
      status: 'Scheduled',
        projectName: state.projectName,
        eventDate: state.eventDate!,
        clientName: state.clientName,
        clientEmail: state.clientEmail,
        clientPhone: state.clientPhone
      });

      // Create kanban card
      const newProject: ProjectCard = {
        id: response.id,
        title: state.projectName,
        type: 'Photo',
        priority: 'medium',
        status: 'scheduled',
        eventDate: state.eventDate!,
        clientName: state.clientName,
        clientEmail: state.clientEmail,
        clientPhone: state.clientPhone,
        createdAt: response.createdAt,
        createdBy: response.createdBy
      };

      onAddProject(newProject);

      setState(prev => ({
        ...prev,
        photoId: response.id,
        photoCreated: true,
        activeTab: 'photo'
      }));

      toast.success('Photo project created successfully!');
    } catch (error) {
      toast.error('Couldn\'t create photo project, try again');
      console.error('Failed to create photo project:', error);
    } finally {
      setState(prev => ({ ...prev, isCreatingPhoto: false }));
    }
  };

  const handleCreateVideo = async () => {
    if (!state.isGeneralValid || state.isCreatingVideo) return;

    setState(prev => ({ ...prev, isCreatingVideo: true }));
    
    try {
      const response = await createProjectCard({
        type: 'video',
        status: 'Scheduled',
        projectName: state.projectName,
        eventDate: state.eventDate!,
        clientName: state.clientName,
        clientEmail: state.clientEmail,
        clientPhone: state.clientPhone
      });

      // Create kanban card
      const newProject: ProjectCard = {
        id: response.id,
        title: state.projectName,
        type: 'Video',
        priority: 'medium',
        status: 'scheduled',
        eventDate: state.eventDate!,
        clientName: state.clientName,
        clientEmail: state.clientEmail,
        clientPhone: state.clientPhone,
        createdAt: response.createdAt,
        createdBy: response.createdBy
      };

      onAddProject(newProject);

      setState(prev => ({
      ...prev,
        videoId: response.id,
        videoCreated: true,
        activeTab: prev.activeTab ?? 'video'
      }));

      toast.success('Video project created successfully!');
    } catch (error) {
      toast.error('Couldn\'t create video project, try again');
      console.error('Failed to create video project:', error);
    } finally {
      setState(prev => ({ ...prev, isCreatingVideo: false }));
    }
  };

  const renderGeneralInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
          <Label htmlFor="projectName">Project Name *</Label>
                  <Input
                    id="projectName"
            value={state.projectName}
            onChange={(e) => setState(prev => ({ ...prev, projectName: e.target.value }))}
                    placeholder="Enter project name"
            required
                  />
                </div>
                
                <div className="space-y-2">
          <Label>Event Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !state.eventDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {state.eventDate ? format(state.eventDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={state.eventDate}
                onSelect={(date) => setState(prev => ({ ...prev, eventDate: date || null }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
                </div>
              </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Client Information</h3>
        
        <div className="space-y-4">
                <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
              value={state.clientName}
              onChange={(e) => setState(prev => ({ ...prev, clientName: e.target.value }))}
              placeholder="Client full name"
                  />
                </div>

          <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
              <Label htmlFor="clientEmail">Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                value={state.clientEmail}
                onChange={(e) => setState(prev => ({ ...prev, clientEmail: e.target.value }))}
                placeholder="client@example.com"
                  />
                </div>

                <div className="space-y-2">
              <Label htmlFor="clientPhone">Phone</Label>
                  <Input
                    id="clientPhone"
                    type="tel"
                value={state.clientPhone}
                onChange={(e) => setState(prev => ({ ...prev, clientPhone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>

      <div className="flex gap-4 pt-4">
        <Button
          onClick={handleCreatePhoto}
          disabled={!state.isGeneralValid || state.isCreatingPhoto || state.photoCreated}
          className="flex-1"
        >
          {state.isCreatingPhoto && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Camera className="mr-2 h-4 w-4" />
          {state.photoCreated ? 'Photo Project Created' : 'Create Photo Project'}
        </Button>
        
        <Button
          onClick={handleCreateVideo}
          disabled={!state.isGeneralValid || state.isCreatingVideo || state.videoCreated}
          className="flex-1"
          variant="outline"
        >
          {state.isCreatingVideo && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Video className="mr-2 h-4 w-4" />
          {state.videoCreated ? 'Video Project Created' : 'Create Video Project'}
        </Button>
      </div>
    </div>
  );

  const renderPhotoCard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Photo Status</Label>
          <Select 
            value={photoData.photoStatus} 
            onValueChange={(value: any) => setPhotoData(prev => ({ ...prev, photoStatus: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Uploading">Uploading</SelectItem>
              <SelectItem value="Editing">Editing</SelectItem>
              <SelectItem value="Retouching">Retouching</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Retouching Level</Label>
          <Select 
            value={photoData.retouchingLevel} 
            onValueChange={(value: any) => setPhotoData(prev => ({ ...prev, retouchingLevel: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Editor Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !photoData.editorDueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {photoData.editorDueDate ? format(photoData.editorDueDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={photoData.editorDueDate}
                onSelect={(date) => setPhotoData(prev => ({ ...prev, editorDueDate: date }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Final Delivery Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !photoData.finalDeliveryDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {photoData.finalDeliveryDate ? format(photoData.finalDeliveryDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={photoData.finalDeliveryDate}
                onSelect={(date) => setPhotoData(prev => ({ ...prev, finalDeliveryDate: date }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Shooting Style</Label>
          <Input
            value={photoData.shootingStyle || ''}
            onChange={(e) => setPhotoData(prev => ({ ...prev, shootingStyle: e.target.value }))}
            onBlur={() => toast.success('Photo data saved!')}
            placeholder="e.g. Documentary, Portrait"
          />
        </div>

        <div className="space-y-2">
          <Label>Editing Style</Label>
          <Input
            value={photoData.editingStyle || ''}
            onChange={(e) => setPhotoData(prev => ({ ...prev, editingStyle: e.target.value }))}
            onBlur={() => toast.success('Photo data saved!')}
            placeholder="e.g. Natural, Cinematic"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="rawDelivery"
          checked={photoData.rawDelivery}
          onCheckedChange={(checked) => setPhotoData(prev => ({ ...prev, rawDelivery: checked }))}
        />
        <Label htmlFor="rawDelivery">RAW Delivery</Label>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={photoData.notes || ''}
          onChange={(e) => setPhotoData(prev => ({ ...prev, notes: e.target.value }))}
          onBlur={() => toast.success('Photo data saved!')}
          placeholder="Additional notes for photo project..."
          rows={3}
        />
      </div>
    </div>
  );

  const renderVideoCard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Video Status</Label>
          <Select 
            value={videoData.videoStatus} 
            onValueChange={(value: any) => setVideoData(prev => ({ ...prev, videoStatus: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Editing">Editing</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
              <SelectItem value="Revision">Revision</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Resolution</Label>
          <Select 
            value={videoData.resolution} 
            onValueChange={(value: any) => setVideoData(prev => ({ ...prev, resolution: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select resolution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1080p">1080p</SelectItem>
              <SelectItem value="4K">4K</SelectItem>
              <SelectItem value="8K">8K</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Frame Rate</Label>
          <Select 
            value={videoData.frameRate} 
            onValueChange={(value: any) => setVideoData(prev => ({ ...prev, frameRate: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frame rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24fps">24fps</SelectItem>
              <SelectItem value="30fps">30fps</SelectItem>
              <SelectItem value="60fps">60fps</SelectItem>
              <SelectItem value="120fps">120fps</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Shooting Style</Label>
          <Input
            value={videoData.shootingStyle || ''}
            onChange={(e) => setVideoData(prev => ({ ...prev, shootingStyle: e.target.value }))}
            onBlur={() => toast.success('Video data saved!')}
            placeholder="e.g. Cinematic, Documentary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Editor Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !videoData.editorDueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {videoData.editorDueDate ? format(videoData.editorDueDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={videoData.editorDueDate}
                onSelect={(date) => setVideoData(prev => ({ ...prev, editorDueDate: date }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Final Delivery Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !videoData.finalDeliveryDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {videoData.finalDeliveryDate ? format(videoData.finalDeliveryDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={videoData.finalDeliveryDate}
                onSelect={(date) => setVideoData(prev => ({ ...prev, finalDeliveryDate: date }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
            </div>
          </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="multiCamSetup"
            checked={videoData.multiCamSetup}
            onCheckedChange={(checked) => setVideoData(prev => ({ ...prev, multiCamSetup: checked }))}
          />
          <Label htmlFor="multiCamSetup">Multi-Cam Setup</Label>
        </div>

        {videoData.multiCamSetup && (
          <div className="space-y-2">
            <Label>Number of Cameras</Label>
            <Input
              type="number"
              min="2"
              max="10"
              value={videoData.multiCamCount || ''}
              onChange={(e) => setVideoData(prev => ({ ...prev, multiCamCount: parseInt(e.target.value) || undefined }))}
              onBlur={() => toast.success('Video data saved!')}
              placeholder="Enter number of cameras"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={videoData.notes || ''}
          onChange={(e) => setVideoData(prev => ({ ...prev, notes: e.target.value }))}
          onBlur={() => toast.success('Video data saved!')}
          placeholder="Additional notes for video project..."
          rows={3}
        />
      </div>
    </div>
  );

  const showTabs = state.photoCreated || state.videoCreated;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[800px] sm:w-[960px] max-w-none overflow-y-auto p-0">
        <SheetHeader className="p-6">
          <SheetTitle>Create New Project</SheetTitle>
        </SheetHeader>
        <div className="p-6 space-y-6">
          {!showTabs ? (
            renderGeneralInfo()
          ) : (
            <Tabs value={state.activeTab || undefined} onValueChange={(value) => setState(prev => ({ ...prev, activeTab: value as any }))}>
              <TabsList className="grid w-full grid-cols-2">
                {state.photoCreated && (
                  <TabsTrigger value="photo" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Photo
                  </TabsTrigger>
                )}
                {state.videoCreated && (
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Video
                  </TabsTrigger>
                )}
              </TabsList>
              
              {state.photoCreated && (
                <TabsContent value="photo" className="mt-6">
                  {renderPhotoCard()}
                </TabsContent>
              )}
              
              {state.videoCreated && (
                <TabsContent value="video" className="mt-6">
                  {renderVideoCard()}
                </TabsContent>
              )}
            </Tabs>
          )}
        </div>
        <div className="flex justify-end pt-4 border-t p-6 sticky bottom-0 bg-background">
          <Button variant="outline" onClick={onClose}>
            {showTabs ? 'Close' : 'Cancel'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}