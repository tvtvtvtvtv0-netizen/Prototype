import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Filter, X, Heart, Building2, Camera, Video, Flag, Users, Film, Image, Package, MapPin, CalendarClock } from 'lucide-react';

interface FilterPanelProps {
  // Type filters
  selectedTypes: string[];
  selectedPriorities: string[];
  selectedAssignees: string[];
  selectedFormats: string[];
  selectedPackages: string[];
  selectedVenues: string[];
  selectedDeadlineFilter: string;
  
  // Control function
  onOpenFilters: () => void;
  
  // Remove individual filters
  onRemoveType?: (type: string) => void;
  onRemovePriority?: (priority: string) => void;
  onRemoveAssignee?: (assignee: string) => void;
  onRemoveFormat?: (format: string) => void;
  onRemovePackage?: (pkg: string) => void;
  onRemoveVenue?: (venue: string) => void;
  onRemoveDeadlineFilter?: () => void;
}

export function FilterPanel({
  selectedTypes,
  selectedPriorities,
  selectedAssignees,
  selectedFormats,
  selectedPackages,
  selectedVenues,
  selectedDeadlineFilter,
  onOpenFilters,
  onRemoveType,
  onRemovePriority,
  onRemoveAssignee,
  onRemoveFormat,
  onRemovePackage,
  onRemoveVenue,
  onRemoveDeadlineFilter
}: FilterPanelProps) {
  const totalActiveFilters = selectedTypes.length + selectedPriorities.length + 
                            selectedAssignees.length + selectedFormats.length + 
                            selectedPackages.length + selectedVenues.length + 
                            (selectedDeadlineFilter ? 1 : 0);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'wedding': return <Heart className="h-3 w-3" />;
      case 'corporate': return <Building2 className="h-3 w-3" />;
      case 'engagement': return <Camera className="h-3 w-3" />;
      default: return <Video className="h-3 w-3" />;
    }
  };

  const getFormatIcon = (format: string) => {
    return format === 'video' ? <Film className="h-3 w-3" /> : <Image className="h-3 w-3" />;
  };

  const getDeadlineLabel = (filter: string) => {
    const options: Record<string, string> = {
      'overdue': 'Overdue',
      '1': 'Next 1 day',
      '3': 'Next 3 days',
      '7': 'Next week',
      '14': 'Next 2 weeks',
      '30': 'Next month'
    };
    return options[filter] || filter;
  };

  return (
    <div className="flex items-start gap-2 flex-1 min-w-0">
      <Button variant="outline" size="sm" className="gap-2 flex-shrink-0" onClick={onOpenFilters}>
        <Filter className="h-4 w-4" />
        Filters
        {totalActiveFilters > 0 && (
          <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
            {totalActiveFilters}
          </Badge>
        )}
      </Button>

      {/* Active Filters */}
      <div className="flex items-start gap-1.5 flex-wrap min-w-0 max-w-full">
        {/* Type Filters */}
        {selectedTypes.map((type) => (
          <Badge
            key={`type-${type}`}
            variant="secondary"
            className="h-6 px-2 text-xs gap-1 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 flex-shrink-0"
          >
            {getTypeIcon(type)}
            <span className="capitalize">{type}</span>
            {onRemoveType && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveType(type);
                }}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </Badge>
        ))}

        {/* Priority Filters */}
        {selectedPriorities.map((priority) => (
          <Badge
            key={`priority-${priority}`}
            variant="secondary"
            className={`h-6 px-2 text-xs gap-1 flex-shrink-0 border ${
              priority === 'high' 
                ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                : priority === 'medium'
                ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
                : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
            }`}
          >
            <Flag className="h-3 w-3" />
            <span className="capitalize">{priority}</span>
            {onRemovePriority && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemovePriority(priority);
                }}
                className={`ml-1 rounded-full p-0.5 ${
                  priority === 'high' 
                    ? 'hover:bg-red-200'
                    : priority === 'medium'
                    ? 'hover:bg-yellow-200'
                    : 'hover:bg-green-200'
                }`}
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </Badge>
        ))}

        {/* Assignee Filters */}
        {selectedAssignees.map((assignee) => (
          <Badge
            key={`assignee-${assignee}`}
            variant="secondary"
            className="h-6 px-2 text-xs gap-1 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 flex-shrink-0"
          >
            <div className="h-3 w-3 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-medium">
              {assignee.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="max-w-[80px] truncate">{assignee}</span>
            {onRemoveAssignee && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveAssignee(assignee);
                }}
                className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </Badge>
        ))}

        {/* Format Filters */}
        {selectedFormats.map((format) => (
          <Badge
            key={`format-${format}`}
            variant="secondary"
            className="h-6 px-2 text-xs gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 flex-shrink-0"
          >
            {getFormatIcon(format)}
            <span className="capitalize">{format}</span>
            {onRemoveFormat && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFormat(format);
                }}
                className="ml-1 hover:bg-indigo-200 rounded-full p-0.5"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </Badge>
        ))}

        {/* Package Filters */}
        {selectedPackages.map((pkg) => (
          <Badge
            key={`package-${pkg}`}
            variant="secondary"
            className="h-6 px-2 text-xs gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 flex-shrink-0"
          >
            <Package className="h-3 w-3" />
            <span className="max-w-[100px] truncate">{pkg}</span>
            {onRemovePackage && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemovePackage(pkg);
                }}
                className="ml-1 hover:bg-emerald-200 rounded-full p-0.5"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </Badge>
        ))}

        {/* Venue Filters */}
        {selectedVenues.map((venue) => (
          <Badge
            key={`venue-${venue}`}
            variant="secondary"
            className="h-6 px-2 text-xs gap-1 bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 flex-shrink-0"
          >
            <MapPin className="h-3 w-3" />
            <span className="max-w-[100px] truncate">{venue}</span>
            {onRemoveVenue && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveVenue(venue);
                }}
                className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </Badge>
        ))}

        {/* Deadline Filter */}
        {selectedDeadlineFilter && (
          <Badge
            variant="secondary"
            className={`h-6 px-2 text-xs gap-1 flex-shrink-0 border ${
              selectedDeadlineFilter === 'overdue'
                ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            {selectedDeadlineFilter === 'overdue' ? (
              <div className="w-3 h-3 rounded-full bg-red-500" />
            ) : (
              <CalendarClock className="h-3 w-3" />
            )}
            <span>{getDeadlineLabel(selectedDeadlineFilter)}</span>
            {onRemoveDeadlineFilter && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveDeadlineFilter();
                }}
                className={`ml-1 rounded-full p-0.5 ${
                  selectedDeadlineFilter === 'overdue'
                    ? 'hover:bg-red-200'
                    : 'hover:bg-gray-200'
                }`}
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </Badge>
        )}
      </div>
    </div>
  );
}