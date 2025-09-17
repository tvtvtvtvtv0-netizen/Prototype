import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  X,
  ArrowLeft,
  Heart,
  Building2,
  Users,
  Flag,
  Film,
  Image,
  Package,
  MapPin,
  CalendarClock,
  Camera,
  Video,
  ChevronDown,
  ChevronUp,
  PlayCircle
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';

interface FilterSidebarProps {
  isOpen: boolean;
  // Type filters
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  uniqueTypes: string[];
  
  // Priority filters
  selectedPriorities: string[];
  setSelectedPriorities: (priorities: string[]) => void;
  uniquePriorities: string[];
  
  // Assignee filters
  selectedAssignees: string[];
  setSelectedAssignees: (assignees: string[]) => void;
  uniqueAssignees: string[];
  
  // Format filters
  selectedFormats: string[];
  setSelectedFormats: (formats: string[]) => void;
  uniqueFormats: string[];
  
  // Package filters
  selectedPackages: string[];
  setSelectedPackages: (packages: string[]) => void;
  uniquePackages: string[];
  
  // Venue filters
  selectedVenues: string[];
  setSelectedVenues: (venues: string[]) => void;
  uniqueVenues: string[];
  
  // Production Style filters
  selectedProductionStyles: string[];
  setSelectedProductionStyles: (styles: string[]) => void;
  uniqueProductionStyles: string[];
  
  // Deadline filter
  selectedDeadlineFilter: string;
  setSelectedDeadlineFilter: (filter: string) => void;
  
  // Control functions
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
  onClose: () => void;
}

export function FilterSidebar({
  isOpen,
  selectedTypes,
  setSelectedTypes,
  uniqueTypes,
  selectedPriorities,
  setSelectedPriorities,
  uniquePriorities,
  selectedAssignees,
  setSelectedAssignees,
  uniqueAssignees,
  selectedFormats,
  setSelectedFormats,
  uniqueFormats,
  selectedPackages,
  setSelectedPackages,
  uniquePackages,
  selectedVenues,
  setSelectedVenues,
  uniqueVenues,
  selectedProductionStyles,
  setSelectedProductionStyles,
  uniqueProductionStyles,
  selectedDeadlineFilter,
  setSelectedDeadlineFilter,
  clearAllFilters,
  hasActiveFilters,
  onClose
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleFilter = (value: string, currentFilters: string[], setFilter: (filters: string[]) => void) => {
    if (currentFilters.includes(value)) {
      setFilter(currentFilters.filter(f => f !== value));
    } else {
      setFilter([...currentFilters, value]);
    }
  };

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const renderCollapsibleChips = (
    items: string[], 
    selectedItems: string[], 
    setSelectedItems: (items: string[]) => void, 
    sectionName: string,
    renderChip: (item: string) => React.ReactNode,
    maxVisible: number = 8
  ) => {
    const isExpanded = expandedSections[sectionName];
    const visibleItems = isExpanded ? items : items.slice(0, maxVisible);
    const hasMore = items.length > maxVisible;

    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {visibleItems.map(renderChip)}
        </div>
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection(sectionName)}
            className="h-7 px-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 w-fit"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                +{items.length - maxVisible} more
              </>
            )}
          </Button>
        )}
      </div>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'wedding': return <Heart className="h-3.5 w-3.5" />;
      case 'corporate': return <Building2 className="h-3.5 w-3.5" />;
      case 'engagement': return <Camera className="h-3.5 w-3.5" />;
      default: return <Video className="h-3.5 w-3.5" />;
    }
  };

  const getFormatIcon = (format: string) => {
    return format === 'video' ? <Film className="h-3.5 w-3.5" /> : <Image className="h-3.5 w-3.5" />;
  };

  const getProductionStyleLabel = (style: string) => {
    const labels = {
      'highlight': 'Хайлайт',
      'teaser': 'Тизер',
      'documentary': 'Доку фильм',
      'ceremony': 'Церемония',
      'toasts': 'Тосты',
      'first-dance': 'Первые танцы',
      'first-look': 'Ферст лук'
    };
    return labels[style as keyof typeof labels] || style;
  };

  const getDeadlineOptions = () => [
    { value: 'overdue', label: 'Overdue', color: 'bg-red-500' },
    { value: '1', label: 'Next 1 day' },
    { value: '3', label: 'Next 3 days' },
    { value: '7', label: 'Next week' },
    { value: '14', label: 'Next 2 weeks' },
    { value: '30', label: 'Next month' }
  ];

  const totalActiveFilters = selectedTypes.length + selectedPriorities.length + 
                            selectedAssignees.length + selectedFormats.length + 
                            selectedPackages.length + selectedVenues.length + 
                            selectedProductionStyles.length + 
                            (selectedDeadlineFilter ? 1 : 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[32rem] max-w-[32rem] p-0 border-l bg-white"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Project Filters</SheetTitle>
          <SheetDescription>
            Filter and search your video production projects by type, priority, assignee, and other criteria
          </SheetDescription>
        </SheetHeader>

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 bg-white">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            {totalActiveFilters > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-xs bg-blue-100 text-blue-700 border-blue-200">
                {totalActiveFilters}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Filters Content */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            <div className="space-y-8">
              {/* Type Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Type</h4>
                {renderCollapsibleChips(
                  uniqueTypes,
                  selectedTypes,
                  setSelectedTypes,
                  'types',
                  (type) => (
                    <Badge
                      key={type}
                      variant={selectedTypes.includes(type) ? "default" : "secondary"}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        selectedTypes.includes(type)
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                      }`}
                      onClick={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                    >
                      <div className="flex items-center gap-1.5">
                        {getTypeIcon(type)}
                        <span className="capitalize">{type}</span>
                      </div>
                    </Badge>
                  ),
                  12
                )}
              </div>

              {/* Assignee Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Assignee</h4>
                {renderCollapsibleChips(
                  uniqueAssignees,
                  selectedAssignees,
                  setSelectedAssignees,
                  'assignees',
                  (assignee) => (
                    <Badge
                      key={assignee}
                      variant={selectedAssignees.includes(assignee) ? "default" : "secondary"}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        selectedAssignees.includes(assignee)
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                      }`}
                      onClick={() => toggleFilter(assignee, selectedAssignees, setSelectedAssignees)}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                          {assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span>{assignee}</span>
                      </div>
                    </Badge>
                  ),
                  12
                )}
              </div>

              {/* Venue Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Venue</h4>
                {renderCollapsibleChips(
                  uniqueVenues,
                  selectedVenues,
                  setSelectedVenues,
                  'venues',
                  (venue) => (
                    <Badge
                      key={venue}
                      variant={selectedVenues.includes(venue) ? "default" : "secondary"}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        selectedVenues.includes(venue)
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                      }`}
                      onClick={() => toggleFilter(venue, selectedVenues, setSelectedVenues)}
                    >
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{venue}</span>
                      </div>
                    </Badge>
                  ),
                  12
                )}
              </div>

              {/* Priority Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Priority</h4>
                <div className="flex flex-wrap gap-2">
                  {uniquePriorities.map((priority) => (
                    <Badge
                      key={priority}
                      variant={selectedPriorities.includes(priority) ? "default" : "secondary"}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        selectedPriorities.includes(priority)
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                      }`}
                      onClick={() => toggleFilter(priority, selectedPriorities, setSelectedPriorities)}
                    >
                      <div className="flex items-center gap-1.5">
                        <Flag className="h-3.5 w-3.5" />
                        <span className="capitalize">{priority}</span>
                      </div>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Package Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Package</h4>
                {renderCollapsibleChips(
                  uniquePackages,
                  selectedPackages,
                  setSelectedPackages,
                  'packages',
                  (pkg) => (
                    <Badge
                      key={pkg}
                      variant={selectedPackages.includes(pkg) ? "default" : "secondary"}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        selectedPackages.includes(pkg)
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                      }`}
                      onClick={() => toggleFilter(pkg, selectedPackages, setSelectedPackages)}
                    >
                      <div className="flex items-center gap-1.5">
                        <Package className="h-3.5 w-3.5" />
                        <span>{pkg}</span>
                      </div>
                    </Badge>
                  ),
                  12
                )}
              </div>

              {/* Format Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Format</h4>
                <div className="flex flex-wrap gap-2">
                  {uniqueFormats.map((format) => (
                    <Badge
                      key={format}
                      variant={selectedFormats.includes(format) ? "default" : "secondary"}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        selectedFormats.includes(format)
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                      }`}
                      onClick={() => toggleFilter(format, selectedFormats, setSelectedFormats)}
                    >
                      <div className="flex items-center gap-1.5">
                        {getFormatIcon(format)}
                        <span className="capitalize">{format}</span>
                      </div>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Production Style Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Production Style</h4>
                {renderCollapsibleChips(
                  uniqueProductionStyles,
                  selectedProductionStyles,
                  setSelectedProductionStyles,
                  'production-styles',
                  (style) => (
                    <Badge
                      key={style}
                      variant={selectedProductionStyles.includes(style) ? "default" : "secondary"}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        selectedProductionStyles.includes(style)
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                      }`}
                      onClick={() => toggleFilter(style, selectedProductionStyles, setSelectedProductionStyles)}
                    >
                      <div className="flex items-center gap-1.5">
                        <PlayCircle className="h-3.5 w-3.5" />
                        <span>{getProductionStyleLabel(style)}</span>
                      </div>
                    </Badge>
                  ),
                  12
                )}
              </div>

              {/* Deadline Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Deadline</h4>
                <div className="flex flex-wrap gap-2">
                  {getDeadlineOptions().map((option) => (
                    <Badge
                      key={option.value}
                      variant={selectedDeadlineFilter === option.value ? "default" : "secondary"}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        selectedDeadlineFilter === option.value
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                      }`}
                      onClick={() => setSelectedDeadlineFilter(
                        selectedDeadlineFilter === option.value ? '' : option.value
                      )}
                    >
                      <div className="flex items-center gap-1.5">
                        {option.color ? (
                          <div className={`w-3 h-3 rounded-full ${option.color}`} />
                        ) : (
                          <CalendarClock className="h-3.5 w-3.5" />
                        )}
                        <span>{option.label}</span>
                      </div>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Clear All Button at Bottom */}
        {hasActiveFilters && (
          <div className="border-t p-6 bg-white">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllFilters}
              className="w-full h-9 text-sm bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}