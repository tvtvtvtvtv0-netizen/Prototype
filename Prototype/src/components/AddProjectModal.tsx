import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Eye, EyeOff, Calendar as CalendarIcon, Camera, Video, Plus } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: any) => void;
}

export function AddProjectModal({ isOpen, onClose, onAddProject }: AddProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo');
  
  const [parameterVisibility, setParameterVisibility] = useState({
    // General Info
    projectName: true,
    eventDate: true,
    clientName: true,
    clientEmail: true,
    clientPhone: true,
    // Brand
    photoBrand: true,
    videoBrand: true,
    // Package & Services
    package: true,
    deliverables: true,
    addOns: true,
    retouchingLevel: true,
    musicChoice: true,
    // Venue & Team
    venue: true,
    photographers: true,
    videographers: true,
    editors: true,
    // Deadlines & Budget
    editorDueDate: true,
    finalDeliveryDate: true,
    budget: true,
    notes: true,
    // Additional Parameters
    clientWishes: true,
    equipment: true,
    specialRequirements: true,
    backupPlan: true,
    weatherPlan: true,
    revisionRounds: true,
    postProduction: true,
    deliveryFormat: true,
    videoFiles: true,
    photoFiles: true,
  });

  const [formData, setFormData] = useState({
    projectName: 'Molly & Cooper Wedding',
    eventDate: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    photoBrand: '',
    videoBrand: '',
    package: '',
    deliverables: [] as string[],
    addOns: [] as string[],
    retouchingLevel: '',
    musicChoice: '',
    venue: '',
    photographers: [] as string[],
    videographers: [] as string[],
    editors: [] as string[],
    editorDueDate: '',
    finalDeliveryDate: '',
    budget: '',
    notes: '',
    clientWishes: '',
    equipment: '',
    specialRequirements: '',
    backupPlan: '',
    weatherPlan: '',
    revisionRounds: '',
    postProduction: '',
    deliveryFormat: '',
    videoFiles: false,
    photoFiles: false,
  });

  const toggleParameterVisibility = (param: keyof typeof parameterVisibility) => {
    setParameterVisibility(prev => ({
      ...prev,
      [param]: !prev[param]
    }));
  };

  // Static data for dropdowns
  const brands = ['Luxury Wedding Co.', 'Modern Events', 'Classic Celebrations', 'Elegant Affairs'];
  const packages = ['Basic Package', 'Premium Package', 'Luxury Package', 'Custom Package'];
  const deliverables = ['Raw Footage', 'Edited Video', 'Highlights Reel', 'Full Documentary', 'Social Media Clips'];
  const addOns = ['Drone Footage', 'Same Day Edit', 'Photo Slideshow', 'Live Streaming', 'Additional Cameras'];
  const retouchingLevels = ['Basic', 'Advanced', 'Skin Retouch', 'Full Editorial'];
  const musicChoices = ['Provided by Client', 'Editor\'s Choice'];
  const venues = ['Beach Resort', 'Mountain Lodge', 'City Hall', 'Garden Venue', 'Historic Mansion'];
  
  const photographers = [
    { id: 'MG', name: 'Maria Garcia', avatar: 'MG' },
    { id: 'JW', name: 'James Wilson', avatar: 'JW' },
    { id: 'ST', name: 'Sarah Thompson', avatar: 'ST' },
    { id: 'AC', name: 'Alex Chen', avatar: 'AC' }
  ];
  
  const videographers = [
    { id: 'ED', name: 'Emma Davis', avatar: 'ED' },
    { id: 'OS', name: 'Oliver Smith', avatar: 'OS' },
    { id: 'LW', name: 'Lisa Wang', avatar: 'LW' }
  ];
  
  const editors = [
    { id: 'SC', name: 'Sarah Chen', avatar: 'SC' },
    { id: 'OS', name: 'Oliver Smith', avatar: 'OS' }
  ];

  const handleCreateProject = (type: 'photo' | 'video') => {
    // Check if required fields are filled
    if (!formData.projectName.trim() || !formData.eventDate) {
      return; // Don't create if required fields are empty
    }

    const baseProject = {
      title: formData.projectName,
      client: formData.clientName,
      date: formData.eventDate,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      budget: formData.budget,
      status: 'Scheduled',
      notes: formData.notes
    };

    if (type === 'photo') {
      const photoProject = {
        ...baseProject,
        id: `photo-${Date.now()}`,
        type: 'Photo',
        brand: formData.photoBrand,
        package: formData.package,
        deliverables: formData.deliverables,
        addOns: formData.addOns,
        photographers: formData.photographers,
        editors: formData.editors,
        retouchingLevel: formData.retouchingLevel,
        equipment: formData.equipment,
        specialRequirements: formData.specialRequirements,
        backupPlan: formData.backupPlan,
        weatherPlan: formData.weatherPlan,
        revisionRounds: formData.revisionRounds,
        photoFiles: formData.photoFiles
      };
      onAddProject(photoProject);
    } else if (type === 'video') {
      const videoProject = {
        ...baseProject,
        id: `video-${Date.now()}`,
        type: 'Video',
        brand: formData.videoBrand,
        package: formData.package,
        deliverables: formData.deliverables,
        addOns: formData.addOns,
        videographers: formData.videographers,
        editors: formData.editors,
        musicChoice: formData.musicChoice,
        postProduction: formData.postProduction,
        deliveryFormat: formData.deliveryFormat,
        videoFiles: formData.videoFiles
      };
      onAddProject(videoProject);
    }

    // Close modal after creating project
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const isRequiredFieldsFilled = formData.projectName.trim() && formData.eventDate;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="!w-[60vw] !max-w-[60vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Create New Project</SheetTitle>
        </SheetHeader>
        
        <form className="space-y-3 p-4">
          {/* General Info Section */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
              General Info
            </h3>
            
            <div className="space-y-4">
              {/* Project Name and Event Date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName" className="text-sm font-medium text-gray-700">
                    Project Name *
                  </Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                    placeholder="Enter project name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="eventDate" className="text-sm font-medium text-gray-700">
                    Event Date *
                  </Label>
                  <div className="relative">
                    <Input
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => handleInputChange('eventDate', e.target.value)}
                      className="pl-10 cursor-pointer"
                      onClick={() => {
                        const input = document.getElementById('eventDate') as HTMLInputElement;
                        if (input) {
                          input.showPicker();
                        }
                      }}
                    />
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Client Contact Information */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="clientName" className="text-sm font-medium text-gray-700">
                      Client Name
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleParameterVisibility('clientName')}
                      className="h-5 w-5 p-0"
                    >
                      {parameterVisibility.clientName ? (
                        <Eye className="h-3 w-3 text-gray-500" />
                      ) : (
                        <EyeOff className="h-3 w-3 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    placeholder="Enter client name"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="clientEmail" className="text-sm font-medium text-gray-700">
                      Client Email
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleParameterVisibility('clientEmail')}
                      className="h-5 w-5 p-0"
                    >
                      {parameterVisibility.clientEmail ? (
                        <Eye className="h-3 w-3 text-gray-500" />
                      ) : (
                        <EyeOff className="h-3 w-3 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                    placeholder="Enter client email"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="clientPhone" className="text-sm font-medium text-gray-700">
                      Client Phone
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleParameterVisibility('clientPhone')}
                      className="h-5 w-5 p-0"
                    >
                      {parameterVisibility.clientPhone ? (
                        <Eye className="h-3 w-3 text-gray-500" />
                      ) : (
                        <EyeOff className="h-3 w-3 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  <Input
                    id="clientPhone"
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                    placeholder="Enter client phone"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project Type Selection */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
              Project Type
            </h3>
            
            <div className="flex gap-3 bg-gray-200 p-2 rounded-lg">
              <button
                type="button"
                className="flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-all rounded-lg bg-transparent text-gray-600 hover:text-gray-900"
                onClick={() => handleCreateProject('photo')}
                disabled={!isRequiredFieldsFilled}
              >
                <Camera className="h-4 w-4" />
                Create Photo Project
              </button>
              <button
                type="button"
                className="flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-all rounded-lg bg-transparent text-gray-600 hover:text-gray-900"
                onClick={() => handleCreateProject('video')}
                disabled={!isRequiredFieldsFilled}
              >
                <Video className="h-4 w-4" />
                Create Video Project
              </button>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white pt-6 border-t flex justify-end space-x-3 p-6 -mx-6 -mb-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}