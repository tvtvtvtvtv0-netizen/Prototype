import { useState, useMemo } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  MapPin,
  Globe,
  Video,
  Users,
  Phone,
  Mail,
  Camera,
  ExternalLink,
  Plus,
  Instagram,
  Building,
  Filter
} from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  type: string;
  location: string;
  city: string;
  address: string;
  image: string;
  website?: string;
  mapLink: string;
  droneApproved: boolean;
  description: string;
  shootCount: number;
  capacity: number;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  features: string[];
  restrictions?: string[];
  bestSeasons: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
  };
  recentWeddings: string[];
  otherNotes?: string;
}

const venues: Venue[] = [
  {
    id: '1',
    name: 'The Oaks Wedding Venue',
    type: 'Elegant Estate',
    location: 'Anderson, SC',
    city: 'Anderson',
    address: '325 Huitt Rd, Anderson, SC 29626',
    image: 'https://images.unsplash.com/photo-1719786624996-2616492705bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwdmVudWUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTgwODAxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    website: 'theoaksweddingvenue.com/#/HOME',
    mapLink: 'https://maps.google.com/the-oaks-venue',
    droneApproved: true,
    description: 'Elegant indoor and outdoor venue with beautiful oak trees and sophisticated interior spaces perfect for weddings and special events.',
    shootCount: 47,
    capacity: 250,
    contact: {
      name: 'Event Coordinator',
      phone: '(864) 293-3606',
      email: 'theoaksweddingvenue@gmail.com'
    },
    features: ['Oak Tree Ceremony Site', 'Elegant Reception Hall', 'Bridal Suite', 'Groom\'s Room', 'Full Bar Service'],
    restrictions: ['Weather backup available', 'No outside catering'],
    bestSeasons: ['Spring', 'Summer', 'Fall'],
    socialMedia: {
      instagram: 'https://www.instagram.com/theoaksweddingvenue/'
    },
    recentWeddings: ['Abigail & Andrew Rabon, 5/27/23, IIV film'],
    otherNotes: 'Empty'
  },
  {
    id: '2',
    name: 'Grand Palace Ballroom',
    type: 'Indoor Luxury',
    location: 'Downtown, Manhattan',
    city: 'New York',
    address: '123 Park Avenue, New York, NY 10001',
    image: 'https://images.unsplash.com/photo-1617946547241-bf4802025570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZ2FyZGVuJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc1ODAxMTg1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    website: 'grandpalaceballroom.com',
    mapLink: 'https://maps.google.com/palace-ballroom',
    droneApproved: false,
    description: 'Elegant crystal chandeliers, marble floors, and gold accents create a luxurious atmosphere perfect for sophisticated weddings and corporate events.',
    shootCount: 32,
    capacity: 300,
    contact: {
      name: 'Maria Rodriguez',
      phone: '+1 (212) 555-0123',
      email: 'events@grandpalaceballroom.com'
    },
    features: ['Crystal Chandeliers', 'Marble Dance Floor', 'Bridal Suite', 'Valet Parking', 'Full Catering Kitchen'],
    restrictions: ['No outdoor drone footage', 'No confetti or rice throwing'],
    bestSeasons: ['Fall', 'Winter', 'Spring'],
    socialMedia: {
      instagram: 'https://www.instagram.com/grandpalace/'
    },
    recentWeddings: ['Sarah & Michael Chen, 3/15/23, 314 Collective'],
    otherNotes: 'Prefer advance booking for lighting setup'
  },
  {
    id: '3',
    name: 'Rosewood Gardens',
    type: 'Outdoor Garden',
    location: 'Long Island, NY',
    city: 'Long Island',
    address: '456 Garden Way, Long Island, NY 11001',
    image: 'https://images.unsplash.com/photo-1646842678072-e9f2024149d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHdlZGRpbmclMjB2ZW51ZSUyMHN1bnNldHxlbnwxfHx8fDE3NTgxMTEzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    website: 'rosewoodgardens.com',
    mapLink: 'https://maps.google.com/rosewood-gardens',
    droneApproved: true,
    description: 'Beautiful botanical gardens with century-old oak trees, rose arbors, and a charming gazebo overlooking a pristine lake.',
    shootCount: 28,
    capacity: 150,
    contact: {
      name: 'David Chen',
      phone: '+1 (516) 555-0187',
      email: 'bookings@rosewoodgardens.com'
    },
    features: ['Lake View', 'Rose Garden', 'Vintage Gazebo', 'Fairy Light Canopy', 'Outdoor Bar'],
    restrictions: ['Weather dependent', 'No loud music after 9 PM'],
    bestSeasons: ['Spring', 'Summer', 'Early Fall'],
    socialMedia: {
      instagram: 'https://www.instagram.com/rosewoodgardens/'
    },
    recentWeddings: ['Emma & James Wilson, 6/10/23, Skyline Media'],
    otherNotes: 'Best for natural lighting'
  },
  {
    id: '4',
    name: 'Sunset Beach Club',
    type: 'Beachfront',
    location: 'Hamptons, NY',
    city: 'Hamptons',
    address: '789 Ocean Drive, Hamptons, NY 11937',
    image: 'https://images.unsplash.com/photo-1639135688894-aa8ece34d7a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMG1hbnNpb24lMjB3ZWRkaW5nJTIwdmVudWV8ZW58MXx8fHwxNzU4MTExMzE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    website: 'sunsetbeachclub.com',
    mapLink: 'https://maps.google.com/sunset-beach-club',
    droneApproved: true,
    description: 'Breathtaking oceanfront venue with white sand beaches, panoramic sunset views, and elegant beachside pavilions.',
    shootCount: 35,
    capacity: 200,
    contact: {
      name: 'Sarah Williams',
      phone: '+1 (631) 555-0245',
      email: 'events@sunsetbeachclub.com'
    },
    features: ['Ocean Views', 'Private Beach', 'Sunset Deck', 'Beach Ceremony Setup', 'Waterfront Reception'],
    restrictions: ['Weather dependent', 'No glass containers on beach', 'Tide schedule considerations'],
    bestSeasons: ['Late Spring', 'Summer', 'Early Fall'],
    socialMedia: {
      instagram: 'https://www.instagram.com/sunsetbeachclub/'
    },
    recentWeddings: ['Jessica & Robert Brown, 7/22/23, Coastal Films'],
    otherNotes: 'Golden hour timing crucial'
  },
  {
    id: '5',
    name: 'Heritage Manor',
    type: 'Historic Estate',
    location: 'Hudson Valley, NY',
    city: 'Hudson Valley',
    address: '101 Manor Lane, Hudson Valley, NY 12534',
    image: 'https://images.unsplash.com/photo-1747762315292-1518fc21ac0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByb29mdG9wJTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc1ODExMTMxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    website: 'heritagemanor.com',
    mapLink: 'https://maps.google.com/heritage-manor',
    droneApproved: true,
    description: 'A restored 1800s mansion featuring grand staircases, period furnishings, and manicured grounds perfect for timeless elegance.',
    shootCount: 39,
    capacity: 120,
    contact: {
      name: 'Robert Thompson',
      phone: '+1 (845) 555-0156',
      email: 'bookings@heritagemanor.com'
    },
    features: ['Grand Staircase', 'Library Room', 'Vintage Furniture', 'Historic Gardens', 'Original Hardwood Floors'],
    restrictions: ['No stiletto heels on hardwood', 'Limited electrical capacity'],
    bestSeasons: ['Spring', 'Summer', 'Fall'],
    socialMedia: {
      instagram: 'https://www.instagram.com/heritagemanor/'
    },
    recentWeddings: ['Victoria & Charles Davis, 9/14/23, Classic Weddings'],
    otherNotes: 'Historical preservation requirements'
  },
  {
    id: '6',
    name: 'SkyLine Rooftop',
    type: 'Urban Rooftop',
    location: 'Brooklyn Heights, NY',
    city: 'Brooklyn',
    address: '222 Heights Blvd, Brooklyn, NY 11201',
    image: 'https://images.unsplash.com/photo-1673203537406-c1afac5ddab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lcnklMjB2aW5leWFyZCUyMHdlZGRpbmclMjB2ZW51ZXxlbnwxfHx8fDE3NTgxMTEzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    website: 'skylinerooftop.com',
    mapLink: 'https://maps.google.com/skyline-rooftop',
    droneApproved: false,
    description: 'Modern rooftop venue with panoramic Manhattan skyline views, contemporary design, and state-of-the-art lighting systems.',
    shootCount: 22,
    capacity: 180,
    contact: {
      name: 'Alex Kim',
      phone: '+1 (718) 555-0289',
      email: 'events@skylinerooftop.com'
    },
    features: ['City Skyline Views', 'LED Lighting System', 'Glass Walls', 'Outdoor Terrace', 'Modern Bar'],
    restrictions: ['No drones due to airspace', 'Wind considerations', 'Weather backup required'],
    bestSeasons: ['Late Spring', 'Summer', 'Early Fall'],
    socialMedia: {
      instagram: 'https://www.instagram.com/skylinerooftop/'
    },
    recentWeddings: ['Amanda & Kevin Lee, 8/05/23, Urban Lens'],
    otherNotes: 'Best for city skyline shots'
  }
];

export function Venues() {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(venues.map(venue => venue.city))];
    return uniqueCities.sort();
  }, []);

  const filteredVenues = useMemo(() => {
    if (selectedCity === 'all') {
      return venues;
    }
    return venues.filter(venue => venue.city === selectedCity);
  }, [selectedCity]);

  const handleVenueClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setIsDialogOpen(true);
  };

  const handleLinkClick = (url: string) => {
    window.open(url.startsWith('http') ? url : `https://${url}`, '_blank');
  };

  const InfoRow = ({ icon: Icon, label, value, isLink = false, linkUrl = "" }: {
    icon: any;
    label: string;
    value: string;
    isLink?: boolean;
    linkUrl?: string;
  }) => (
    <div className="flex items-center gap-4 py-3 min-w-0 w-full">
      <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      <span className="text-sm text-muted-foreground w-72 flex-shrink-0">{label}</span>
      <div className="flex-1 min-w-0 pr-4">
        {isLink ? (
          <button
            onClick={() => handleLinkClick(linkUrl)}
            className="text-sm text-primary hover:underline text-left truncate w-full block max-w-full"
          >
            {value}
          </button>
        ) : (
          <span className="text-sm truncate block max-w-full">{value}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Venues</h1>
        <p className="text-muted-foreground">
          Our trusted venue partners with complete location details and shooting guidelines
        </p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Venues Grid - 6 columns */}
      <div className="grid grid-cols-6 gap-4">
        {filteredVenues.map((venue) => (
          <Card 
            key={venue.id} 
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 group"
            onClick={() => handleVenueClick(venue)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <ImageWithFallback
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {venue.droneApproved && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-500/90 text-white text-xs">
                    <Video className="h-3 w-3 mr-1" />
                    Video
                  </Badge>
                </div>
              )}
            </div>
            
            <CardContent className="p-3">
              <div className="space-y-1">
                <h3 className="font-medium text-sm line-clamp-1">{venue.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{venue.address}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Venue Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[1400px] w-[90vw] max-h-[90vh] overflow-y-auto overflow-x-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedVenue?.name}</DialogTitle>
            <DialogDescription>
              Detailed venue information and shooting guidelines
            </DialogDescription>
          </DialogHeader>

          {selectedVenue && (
            <div className="space-y-6 w-full overflow-hidden">
              {/* Hero Image */}
              <div className="relative aspect-[16/6] rounded-lg overflow-hidden w-full">
                <ImageWithFallback
                  src={selectedVenue.image}
                  alt={selectedVenue.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Venue Information */}
              <Card className="w-full">
                <CardContent className="p-6">
                  <div className="space-y-0 divide-y w-full overflow-hidden">
                    <InfoRow 
                      icon={Building} 
                      label="Address" 
                      value={selectedVenue.address} 
                    />
                    
                    <InfoRow 
                      icon={Phone} 
                      label="Venue Contact (Ph...)" 
                      value={selectedVenue.contact.phone} 
                    />
                    
                    <InfoRow 
                      icon={Mail} 
                      label="Venue Contact (Em...)" 
                      value={selectedVenue.contact.email} 
                    />
                    
                    <InfoRow 
                      icon={Globe} 
                      label="Venue Website" 
                      value={selectedVenue.website || ''} 
                      isLink={true}
                      linkUrl={selectedVenue.website || ''}
                    />
                    
                    <InfoRow 
                      icon={MapPin} 
                      label="Location" 
                      value={selectedVenue.location} 
                    />
                    
                    <InfoRow 
                      icon={Camera} 
                      label="Weddings at This V..." 
                      value={selectedVenue.recentWeddings.join(', ')} 
                    />
                    
                    {selectedVenue.socialMedia?.instagram && (
                      <InfoRow 
                        icon={Instagram} 
                        label="Social Media" 
                        value={selectedVenue.socialMedia.instagram} 
                        isLink={true}
                        linkUrl={selectedVenue.socialMedia.instagram}
                      />
                    )}
                    
                    <InfoRow 
                      icon={Building} 
                      label="Other Notes" 
                      value={selectedVenue.otherNotes || 'Empty'} 
                    />
                    
                    {/* Add Property Button */}
                    <div className="flex items-center gap-4 py-3 min-w-0 w-full">
                      <Plus className="h-4 w-4 text-muted-foreground" />
                      <Button variant="ghost" className="text-sm text-muted-foreground p-0 h-auto">
                        Add a property
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information Cards */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Features */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">Features & Amenities</h3>
                    <div className="space-y-2">
                      {selectedVenue.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Shooting Information */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">Shooting Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Capacity:</span>
                        <span className="text-sm">up to {selectedVenue.capacity} guests</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Video Approved:</span>
                        <Badge className={selectedVenue.droneApproved ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                          {selectedVenue.droneApproved ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Shoots Completed:</span>
                        <span className="text-sm">{selectedVenue.shootCount}</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <h4 className="font-medium mb-2">Best Seasons</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedVenue.bestSeasons.map((season) => (
                          <Badge key={season} variant="secondary" className="text-xs">
                            {season}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Restrictions */}
              {selectedVenue.restrictions && selectedVenue.restrictions.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4 text-orange-600">Restrictions & Important Notes</h3>
                    <div className="space-y-2">
                      {selectedVenue.restrictions.map((restriction, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-orange-600">{restriction}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}