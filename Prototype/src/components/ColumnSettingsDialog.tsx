import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Palette,
  Eye,
  EyeOff,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Video,
  Camera,
  Heart,
  Building2,
  Flag,
  Film,
  Image,
  Package,
  CalendarClock,
  User,
  UserCheck
} from 'lucide-react';

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

interface ColumnSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  columnTitle: string;
  columnColor: string;
  displaySettings: ColumnDisplaySettings;
  onUpdateColumn: (title: string, color: string) => void;
  onUpdateGlobalSettings: (settings: ColumnDisplaySettings) => void;
}

const colorOptions = [
  { name: 'Gray', value: 'bg-gray-100', cardColor: 'bg-gray-50', preview: 'bg-gray-400' },
  { name: 'Red', value: 'bg-red-100', cardColor: 'bg-red-50', preview: 'bg-red-400' },
  { name: 'Orange', value: 'bg-orange-100', cardColor: 'bg-orange-50', preview: 'bg-orange-400' },
  { name: 'Amber', value: 'bg-amber-100', cardColor: 'bg-amber-50', preview: 'bg-amber-400' },
  { name: 'Yellow', value: 'bg-yellow-100', cardColor: 'bg-yellow-50', preview: 'bg-yellow-400' },
  { name: 'Lime', value: 'bg-lime-100', cardColor: 'bg-lime-50', preview: 'bg-lime-400' },
  { name: 'Green', value: 'bg-green-100', cardColor: 'bg-green-50', preview: 'bg-green-400' },
  { name: 'Emerald', value: 'bg-emerald-100', cardColor: 'bg-emerald-50', preview: 'bg-emerald-400' },
  { name: 'Teal', value: 'bg-teal-100', cardColor: 'bg-teal-50', preview: 'bg-teal-400' },
  { name: 'Cyan', value: 'bg-cyan-100', cardColor: 'bg-cyan-50', preview: 'bg-cyan-400' },
  { name: 'Sky', value: 'bg-sky-100', cardColor: 'bg-sky-50', preview: 'bg-sky-400' },
  { name: 'Blue', value: 'bg-blue-100', cardColor: 'bg-blue-50', preview: 'bg-blue-400' },
  { name: 'Indigo', value: 'bg-indigo-100', cardColor: 'bg-indigo-50', preview: 'bg-indigo-400' },
  { name: 'Violet', value: 'bg-violet-100', cardColor: 'bg-violet-50', preview: 'bg-violet-400' },
  { name: 'Purple', value: 'bg-purple-100', cardColor: 'bg-purple-50', preview: 'bg-purple-400' },
  { name: 'Fuchsia', value: 'bg-fuchsia-100', cardColor: 'bg-fuchsia-50', preview: 'bg-fuchsia-400' },
  { name: 'Pink', value: 'bg-pink-100', cardColor: 'bg-pink-50', preview: 'bg-pink-400' },
  { name: 'Rose', value: 'bg-rose-100', cardColor: 'bg-rose-50', preview: 'bg-rose-400' },
  { name: 'Stone', value: 'bg-stone-100', cardColor: 'bg-stone-50', preview: 'bg-stone-400' },
  { name: 'Slate', value: 'bg-slate-100', cardColor: 'bg-slate-50', preview: 'bg-slate-400' },
];

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

export function ColumnSettingsDialog({
  isOpen,
  onClose,
  columnTitle,
  columnColor,
  displaySettings,
  onUpdateColumn,
  onUpdateGlobalSettings
}: ColumnSettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<'column' | 'global'>('column');
  const [title, setTitle] = useState(columnTitle);
  const [selectedColor, setSelectedColor] = useState(columnColor);
  const [settings, setSettings] = useState(displaySettings || defaultDisplaySettings);

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTitle(columnTitle);
      setSelectedColor(columnColor);
      setSettings(displaySettings || defaultDisplaySettings);
      setActiveTab('column');
    }
  }, [isOpen, columnTitle, columnColor, displaySettings]);

  const handleSave = () => {
    if (activeTab === 'column') {
      onUpdateColumn(title, selectedColor);
    } else {
      onUpdateGlobalSettings(settings);
    }
    onClose();
  };

  const updateSetting = (key: keyof ColumnDisplaySettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const cardFields = [
    { key: 'showTitle', label: 'Project Title', icon: Film, description: 'Main project name' },
    { key: 'showDescription', label: 'Description', icon: Film, description: 'Project description' },
    { key: 'showClient', label: 'Client Name', icon: Users, description: 'Client contact person' },
    { key: 'showDate', label: 'Shooting Date', icon: Calendar, description: 'Scheduled date' },
    { key: 'showLocation', label: 'Location', icon: MapPin, description: 'Shooting location' },
    { key: 'showBudget', label: 'Budget', icon: DollarSign, description: 'Project budget' },
    { key: 'showAssignee', label: 'Assignee', icon: User, description: 'Project assignee' },
    { key: 'showPriority', label: 'Priority Badge', icon: Flag, description: 'Priority level' },
    { key: 'showType', label: 'Project Type', icon: Building2, description: 'Wedding/Corporate/etc' },
    { key: 'showFormat', label: 'Format Badge', icon: Video, description: 'Video/Photo format' },
    { key: 'showPackage', label: 'Package', icon: Package, description: 'Service package' },
    { key: 'showVenue', label: 'Venue', icon: Building2, description: 'Event venue' },
    { key: 'showDeadline', label: 'Deadline', icon: CalendarClock, description: 'Project deadline' },
    { key: 'showProductionStyle', label: 'Production Style', icon: Camera, description: 'Style badge' },
    { key: 'showComments', label: 'Comments Count', icon: Film, description: 'Number of comments' },
  ] as const;

  const crewFields = [
    { key: 'showPhotographerAvatar', label: 'Photographer Avatar', icon: Camera, description: 'Show photographer profile picture' },
    { key: 'showPhotographerName', label: 'Photographer Name', icon: UserCheck, description: 'Show photographer name' },
    { key: 'showVideographerAvatar', label: 'Videographer Avatar', icon: Video, description: 'Show videographer profile picture' },
    { key: 'showVideographerName', label: 'Videographer Name', icon: UserCheck, description: 'Show videographer name' },
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure column-specific settings or global display preferences for your project cards.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'column' | 'global')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="column" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Column Settings
            </TabsTrigger>
            <TabsTrigger value="global" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Global Display
            </TabsTrigger>
          </TabsList>

          <TabsContent value="column" className="mt-4">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-3">
                {/* Column Name */}
                <div className="space-y-2">
                  <Label htmlFor="column-name">Column Name</Label>
                  <Input
                    id="column-name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter column name"
                  />
                </div>

                {/* Color Selection */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Column Color
                  </Label>
                  <div className="grid grid-cols-10 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`relative h-6 w-6 rounded-full ${color.preview} border-2 transition-all hover:scale-110 ${
                          selectedColor === color.value 
                            ? 'border-primary shadow-md scale-110' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        title={color.name}
                      >
                        {selectedColor === color.value && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-1.5 w-1.5 bg-white rounded-full shadow-sm" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This will change the color of the current column only
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="global" className="mt-4">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-3 pb-4">
                {/* Card Field Visibility */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Card Field Visibility
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    These settings apply to all columns globally
                  </p>
                  
                  <div className="space-y-1">
                    {cardFields.map((field) => {
                      const Icon = field.icon;
                      return (
                        <div key={field.key} className="flex items-center justify-between p-2 rounded-md border">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium leading-tight">{field.label}</p>
                              <p className="text-xs text-muted-foreground leading-tight">{field.description}</p>
                            </div>
                          </div>
                          <Switch
                            checked={settings?.[field.key] || false}
                            onCheckedChange={(checked) => updateSetting(field.key, checked)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Crew Display Settings */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Shooting Crew Display
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Configure how to display photographer and videographer information
                  </p>
                  
                  <div className="space-y-1">
                    {crewFields.map((field) => {
                      const Icon = field.icon;
                      return (
                        <div key={field.key} className="flex items-center justify-between p-2 rounded-md border">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium leading-tight">{field.label}</p>
                              <p className="text-xs text-muted-foreground leading-tight">{field.description}</p>
                            </div>
                          </div>
                          <Switch
                            checked={settings?.[field.key] || false}
                            onCheckedChange={(checked) => updateSetting(field.key, checked)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Crew Presets */}
                <div className="space-y-2">
                  <Label>Quick Crew Display Presets</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSettings(prev => ({
                        ...prev,
                        showPhotographerAvatar: true,
                        showPhotographerName: true,
                        showVideographerAvatar: true,
                        showVideographerName: true
                      }))}
                      className="justify-start"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Show All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSettings(prev => ({
                        ...prev,
                        showPhotographerAvatar: true,
                        showPhotographerName: false,
                        showVideographerAvatar: true,
                        showVideographerName: false
                      }))}
                      className="justify-start"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Avatars Only
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSettings(prev => ({
                        ...prev,
                        showPhotographerAvatar: false,
                        showPhotographerName: true,
                        showVideographerAvatar: false,
                        showVideographerName: true
                      }))}
                      className="justify-start"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Names Only
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSettings(prev => ({
                        ...prev,
                        showPhotographerAvatar: false,
                        showPhotographerName: false,
                        showVideographerAvatar: false,
                        showVideographerName: false
                      }))}
                      className="justify-start"
                    >
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide All
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t">
          <Badge variant="secondary" className="text-xs">
            {activeTab === 'column' ? 'Changes apply to this column only' : 'Changes apply to all columns'}
          </Badge>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save {activeTab === 'column' ? 'Column' : 'Global'} Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}