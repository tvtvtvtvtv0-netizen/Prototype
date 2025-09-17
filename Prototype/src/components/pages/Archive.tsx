import { useState } from 'react';
import React from 'react';
import { Archive as ArchiveIcon, Search, MapPin, DollarSign, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ArchivedWedding {
  id: string;
  title: string;
  client: string;
  date: string;
  location: string;
  budget: string;
  venue: string;
  priority: 'normal' | 'medium' | 'high' | 'urgent';
  format: 'video' | 'photo';
  package: string;
  completionDate: string;
  finalDelivery: string;
  clientRating?: number;
}

export function Archive() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  // Archived weddings data
  const archivedWeddings: ArchivedWedding[] = [
    // November 2024
    {
      id: '1',
      title: 'Emma & David Wedding',
      client: 'Emma Wilson',
      date: '2024-11-15',
      location: 'Beachside Resort',
      budget: '$15,000',
      venue: 'Beachside Resort',
      priority: 'high',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2024-12-15',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '2',
      title: 'Sophia & Michael Corporate',
      client: 'Sophia Rodriguez',
      date: '2024-11-08',
      location: 'Grand Ballroom',
      budget: '$22,000',
      venue: 'Grand Ballroom',
      priority: 'urgent',
      format: 'video',
      package: 'Corporate Premium',
      completionDate: '2024-12-08',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '3',
      title: 'Alex & Caroline Wedding',
      client: 'Caroline Thompson',
      date: '2024-11-23',
      location: 'Forest Glen',
      budget: '$13,500',
      venue: 'Forest Glen',
      priority: 'high',
      format: 'photo',
      package: 'Deluxe Package',
      completionDate: '2024-12-23',
      finalDelivery: 'Delivered',
      clientRating: 4
    },
    
    // October 2024
    {
      id: '4',
      title: 'Lisa & Tom Wedding',
      client: 'Lisa Chang',
      date: '2024-10-12',
      location: 'Mountain Lodge',
      budget: '$18,000',
      venue: 'Mountain Lodge',
      priority: 'urgent',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2024-11-12',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '5',
      title: 'James & Victoria Wedding',
      client: 'Victoria Lee',
      date: '2024-10-26',
      location: 'Sunset Terrace',
      budget: '$19,500',
      venue: 'Sunset Terrace',
      priority: 'high',
      format: 'video',
      package: 'Luxury Package',
      completionDate: '2024-11-26',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '6',
      title: 'Robert & Sarah Corporate Event',
      client: 'Sarah Johnson',
      date: '2024-10-05',
      location: 'Convention Center',
      budget: '$25,000',
      venue: 'Convention Center',
      priority: 'urgent',
      format: 'video',
      package: 'Corporate Elite',
      completionDate: '2024-11-05',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '7',
      title: 'Anna & Daniel Wedding',
      client: 'Anna Miller',
      date: '2024-10-19',
      location: 'Rose Garden',
      budget: '$16,000',
      venue: 'Rose Garden',
      priority: 'medium',
      format: 'photo',
      package: 'Premium Package',
      completionDate: '2024-11-19',
      finalDelivery: 'Delivered',
      clientRating: 4
    },

    // September 2024
    {
      id: '8',
      title: 'Anna & Jake Wedding',
      client: 'Anna Smith',
      date: '2024-09-14',
      location: 'Garden Venue',
      budget: '$12,000',
      venue: 'Garden Venue',
      priority: 'high',
      format: 'video',
      package: 'Deluxe Package',
      completionDate: '2024-10-14',
      finalDelivery: 'Delivered',
      clientRating: 4
    },
    {
      id: '9',
      title: 'Kevin & Michelle Wedding',
      client: 'Michelle Davis',
      date: '2024-09-07',
      location: 'Oceanview Hotel',
      budget: '$21,000',
      venue: 'Oceanview Hotel',
      priority: 'urgent',
      format: 'video',
      package: 'Luxury Package',
      completionDate: '2024-10-07',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '10',
      title: 'Brian & Jessica Wedding',
      client: 'Jessica Brown',
      date: '2024-09-21',
      location: 'Historic Mansion',
      budget: '$17,500',
      venue: 'Historic Mansion',
      priority: 'high',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2024-10-21',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '11',
      title: 'Mark & Emily Wedding',
      client: 'Emily Wilson',
      date: '2024-09-28',
      location: 'Country Club',
      budget: '$14,500',
      venue: 'Country Club',
      priority: 'medium',
      format: 'photo',
      package: 'Classic Package',
      completionDate: '2024-10-28',
      finalDelivery: 'Delivered',
      clientRating: 4
    },

    // August 2024
    {
      id: '12',
      title: 'Rachel & Chris Wedding',
      client: 'Rachel Martinez',
      date: '2024-08-10',
      location: 'Vineyard Estate',
      budget: '$20,000',
      venue: 'Vineyard Estate',
      priority: 'high',
      format: 'video',
      package: 'Luxury Package',
      completionDate: '2024-09-10',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '13',
      title: 'Steven & Amanda Wedding',
      client: 'Amanda Clark',
      date: '2024-08-17',
      location: 'Beachfront Resort',
      budget: '$18,500',
      venue: 'Beachfront Resort',
      priority: 'urgent',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2024-09-17',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '14',
      title: 'Chris & Nicole Wedding',
      client: 'Nicole White',
      date: '2024-08-24',
      location: 'Alpine Lodge',
      budget: '$16,500',
      venue: 'Alpine Lodge',
      priority: 'high',
      format: 'photo',
      package: 'Deluxe Package',
      completionDate: '2024-09-24',
      finalDelivery: 'Delivered',
      clientRating: 4
    },
    {
      id: '15',
      title: 'David & Lauren Corporate',
      client: 'Lauren Garcia',
      date: '2024-08-03',
      location: 'Business Center',
      budget: '$23,000',
      venue: 'Business Center',
      priority: 'urgent',
      format: 'video',
      package: 'Corporate Premium',
      completionDate: '2024-09-03',
      finalDelivery: 'Delivered',
      clientRating: 5
    },

    // July 2024
    {
      id: '16',
      title: 'Andrew & Stephanie Wedding',
      client: 'Stephanie Moore',
      date: '2024-07-13',
      location: 'Riverside Pavilion',
      budget: '$15,500',
      venue: 'Riverside Pavilion',
      priority: 'high',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2024-08-13',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '17',
      title: 'John & Maria Wedding',
      client: 'Maria Rodriguez',
      date: '2024-07-06',
      location: 'Garden Estate',
      budget: '$19,000',
      venue: 'Garden Estate',
      priority: 'urgent',
      format: 'video',
      package: 'Luxury Package',
      completionDate: '2024-08-06',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '18',
      title: 'Ryan & Ashley Wedding',
      client: 'Ashley Taylor',
      date: '2024-07-20',
      location: 'Lakeside Manor',
      budget: '$17,000',
      venue: 'Lakeside Manor',
      priority: 'high',
      format: 'photo',
      package: 'Premium Package',
      completionDate: '2024-08-20',
      finalDelivery: 'Delivered',
      clientRating: 4
    },
    {
      id: '19',
      title: 'Peter & Rebecca Wedding',
      client: 'Rebecca Adams',
      date: '2024-07-27',
      location: 'Hilltop Venue',
      budget: '$14,000',
      venue: 'Hilltop Venue',
      priority: 'medium',
      format: 'video',
      package: 'Classic Package',
      completionDate: '2024-08-27',
      finalDelivery: 'Delivered',
      clientRating: 4
    },

    // June 2024
    {
      id: '20',
      title: 'Thomas & Jennifer Wedding',
      client: 'Jennifer Lee',
      date: '2024-06-08',
      location: 'Botanical Gardens',
      budget: '$16,000',
      venue: 'Botanical Gardens',
      priority: 'high',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2024-07-08',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '21',
      title: 'Matthew & Samantha Wedding',
      client: 'Samantha Johnson',
      date: '2024-06-15',
      location: 'Heritage Hall',
      budget: '$20,500',
      venue: 'Heritage Hall',
      priority: 'urgent',
      format: 'video',
      package: 'Luxury Package',
      completionDate: '2024-07-15',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '22',
      title: 'Eric & Rachel Wedding',
      client: 'Rachel Green',
      date: '2024-06-22',
      location: 'Seaside Resort',
      budget: '$18,000',
      venue: 'Seaside Resort',
      priority: 'high',
      format: 'photo',
      package: 'Premium Package',
      completionDate: '2024-07-22',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '23',
      title: 'Brandon & Kelly Wedding',
      client: 'Kelly Murphy',
      date: '2024-06-29',
      location: 'Mountain View Lodge',
      budget: '$15,000',
      venue: 'Mountain View Lodge',
      priority: 'medium',
      format: 'video',
      package: 'Deluxe Package',
      completionDate: '2024-07-29',
      finalDelivery: 'Delivered',
      clientRating: 4
    },
    {
      id: '24',
      title: 'Josh & Christine Corporate',
      client: 'Christine Davis',
      date: '2024-06-01',
      location: 'Downtown Conference',
      budget: '$24,000',
      venue: 'Downtown Conference',
      priority: 'urgent',
      format: 'video',
      package: 'Corporate Elite',
      completionDate: '2024-07-01',
      finalDelivery: 'Delivered',
      clientRating: 5
    },

    // May 2024
    {
      id: '25',
      title: 'William & Catherine Wedding',
      client: 'Catherine Brown',
      date: '2024-05-11',
      location: 'Castle Grounds',
      budget: '$22,000',
      venue: 'Castle Grounds',
      priority: 'urgent',
      format: 'video',
      package: 'Luxury Package',
      completionDate: '2024-06-11',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '26',
      title: 'Nicholas & Megan Wedding',
      client: 'Megan Wilson',
      date: '2024-05-18',
      location: 'Garden Terrace',
      budget: '$17,500',
      venue: 'Garden Terrace',
      priority: 'high',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2024-06-18',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '27',
      title: 'Jonathan & Lisa Wedding',
      client: 'Lisa Anderson',
      date: '2024-05-25',
      location: 'Vineyard Hills',
      budget: '$19,000',
      venue: 'Vineyard Hills',
      priority: 'high',
      format: 'photo',
      package: 'Premium Package',
      completionDate: '2024-06-25',
      finalDelivery: 'Delivered',
      clientRating: 4
    },
    {
      id: '28',
      title: 'Tyler & Hannah Wedding',
      client: 'Hannah Miller',
      date: '2024-05-04',
      location: 'Countryside Estate',
      budget: '$14,500',
      venue: 'Countryside Estate',
      priority: 'medium',
      format: 'video',
      package: 'Classic Package',
      completionDate: '2024-06-04',
      finalDelivery: 'Delivered',
      clientRating: 4
    },

    // April 2024
    {
      id: '29',
      title: 'Jacob & Emma Wedding',
      client: 'Emma Clark',
      date: '2024-04-13',
      location: 'Spring Gardens',
      budget: '$16,500',
      venue: 'Spring Gardens',
      priority: 'high',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2024-05-13',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '30',
      title: 'Aaron & Grace Wedding',
      client: 'Grace Taylor',
      date: '2024-04-20',
      location: 'Lakefront Pavilion',
      budget: '$18,500',
      venue: 'Lakefront Pavilion',
      priority: 'urgent',
      format: 'video',
      package: 'Luxury Package',
      completionDate: '2024-05-20',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '31',
      title: 'Noah & Olivia Wedding',
      client: 'Olivia Martinez',
      date: '2024-04-27',
      location: 'Historic Estate',
      budget: '$20,000',
      venue: 'Historic Estate',
      priority: 'high',
      format: 'photo',
      package: 'Luxury Package',
      completionDate: '2024-05-27',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '32',
      title: 'Caleb & Sophia Wedding',
      client: 'Sophia White',
      date: '2024-04-06',
      location: 'Garden Manor',
      budget: '$15,500',
      venue: 'Garden Manor',
      priority: 'medium',
      format: 'video',
      package: 'Deluxe Package',
      completionDate: '2024-05-06',
      finalDelivery: 'Delivered',
      clientRating: 4
    },

    // March 2024
    {
      id: '33',
      title: 'Logan & Isabella Wedding',
      client: 'Isabella Garcia',
      date: '2024-03-16',
      location: 'Ballroom Grande',
      budget: '$21,000',
      venue: 'Ballroom Grande',
      priority: 'urgent',
      format: 'video',
      package: 'Luxury Package',
      completionDate: '2024-04-16',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '34',
      title: 'Hunter & Ava Wedding',
      client: 'Ava Rodriguez',
      date: '2024-03-23',
      location: 'Sunset Manor',
      budget: '$17,000',
      venue: 'Sunset Manor',
      priority: 'high',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2024-04-23',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '35',
      title: 'Ethan & Chloe Wedding',
      client: 'Chloe Johnson',
      date: '2024-03-09',
      location: 'Riverside Chapel',
      budget: '$14,000',
      venue: 'Riverside Chapel',
      priority: 'medium',
      format: 'photo',
      package: 'Classic Package',
      completionDate: '2024-04-09',
      finalDelivery: 'Delivered',
      clientRating: 4
    },
    {
      id: '36',
      title: 'Mason & Lily Wedding',
      client: 'Lily Brown',
      date: '2024-03-30',
      location: 'Mountain Resort',
      budget: '$19,500',
      venue: 'Mountain Resort',
      priority: 'high',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2024-04-30',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '37',
      title: 'Lucas & Madison Corporate',
      client: 'Madison Davis',
      date: '2024-03-02',
      location: 'Corporate Plaza',
      budget: '$25,500',
      venue: 'Corporate Plaza',
      priority: 'urgent',
      format: 'video',
      package: 'Corporate Elite',
      completionDate: '2024-04-02',
      finalDelivery: 'Delivered',
      clientRating: 5
    },

    // 2023 Data
    // December 2023
    {
      id: '38',
      title: 'Michael & Jennifer Wedding',
      client: 'Jennifer Adams',
      date: '2023-12-16',
      location: 'Historic Chapel',
      budget: '$14,000',
      venue: 'Historic Chapel',
      priority: 'urgent',
      format: 'video',
      package: 'Classic Package',
      completionDate: '2024-01-16',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '39',
      title: 'Alexander & Victoria Wedding',
      client: 'Victoria Thompson',
      date: '2023-12-09',
      location: 'Winter Lodge',
      budget: '$18,000',
      venue: 'Winter Lodge',
      priority: 'high',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2024-01-09',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '40',
      title: 'Benjamin & Natalie Wedding',
      client: 'Natalie Wilson',
      date: '2023-12-23',
      location: 'Holiday Manor',
      budget: '$20,000',
      venue: 'Holiday Manor',
      priority: 'urgent',
      format: 'photo',
      package: 'Luxury Package',
      completionDate: '2024-01-23',
      finalDelivery: 'Delivered',
      clientRating: 5
    },

    // November 2023
    {
      id: '41',
      title: 'Daniel & Sarah Wedding',
      client: 'Sarah Martinez',
      date: '2023-11-11',
      location: 'Autumn Gardens',
      budget: '$16,500',
      venue: 'Autumn Gardens',
      priority: 'high',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2023-12-11',
      finalDelivery: 'Delivered',
      clientRating: 4
    },
    {
      id: '42',
      title: 'Samuel & Rachel Wedding',
      client: 'Rachel Green',
      date: '2023-11-18',
      location: 'Countryside Manor',
      budget: '$19,000',
      venue: 'Countryside Manor',
      priority: 'urgent',
      format: 'video',
      package: 'Luxury Package',
      completionDate: '2023-12-18',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '43',
      title: 'Gabriel & Amanda Wedding',
      client: 'Amanda Clark',
      date: '2023-11-25',
      location: 'Harvest Hall',
      budget: '$15,000',
      venue: 'Harvest Hall',
      priority: 'medium',
      format: 'photo',
      package: 'Deluxe Package',
      completionDate: '2023-12-25',
      finalDelivery: 'Delivered',
      clientRating: 4
    },
    {
      id: '44',
      title: 'Owen & Elizabeth Wedding',
      client: 'Elizabeth Lee',
      date: '2023-11-04',
      location: 'Forest Retreat',
      budget: '$17,500',
      venue: 'Forest Retreat',
      priority: 'high',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2023-12-04',
      finalDelivery: 'Delivered',
      clientRating: 5
    },

    // October 2023
    {
      id: '45',
      title: 'Katie & Mark Wedding',
      client: 'Katie Williams',
      date: '2023-10-14',
      location: 'Lakeside Resort',
      budget: '$16,500',
      venue: 'Lakeside Resort',
      priority: 'high',
      format: 'video',
      package: 'Premium Plus Package',
      completionDate: '2023-11-14',
      finalDelivery: 'Delivered',
      clientRating: 4
    },
    {
      id: '46',
      title: 'Ian & Michelle Wedding',
      client: 'Michelle Davis',
      date: '2023-10-21',
      location: 'Ocean Bluff',
      budget: '$21,000',
      venue: 'Ocean Bluff',
      priority: 'urgent',
      format: 'video',
      package: 'Luxury Package',
      completionDate: '2023-11-21',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '47',
      title: 'Carter & Nicole Wedding',
      client: 'Nicole White',
      date: '2023-10-28',
      location: 'Hillside Venue',
      budget: '$18,500',
      venue: 'Hillside Venue',
      priority: 'high',
      format: 'photo',
      package: 'Premium Package',
      completionDate: '2023-11-28',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '48',
      title: 'Wyatt & Jessica Wedding',
      client: 'Jessica Brown',
      date: '2023-10-07',
      location: 'Garden Estate',
      budget: '$14,500',
      venue: 'Garden Estate',
      priority: 'medium',
      format: 'video',
      package: 'Classic Package',
      completionDate: '2023-11-07',
      finalDelivery: 'Delivered',
      clientRating: 4
    },

    // September 2023
    {
      id: '49',
      title: 'Julian & Stephanie Wedding',
      client: 'Stephanie Moore',
      date: '2023-09-09',
      location: 'Vineyard Terrace',
      budget: '$19,500',
      venue: 'Vineyard Terrace',
      priority: 'urgent',
      format: 'video',
      package: 'Luxury Package',
      completionDate: '2023-10-09',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '50',
      title: 'Cooper & Ashley Wedding',
      client: 'Ashley Taylor',
      date: '2023-09-16',
      location: 'Riverside Pavilion',
      budget: '$17,000',
      venue: 'Riverside Pavilion',
      priority: 'high',
      format: 'video',
      package: 'Premium Package',
      completionDate: '2023-10-16',
      finalDelivery: 'Delivered',
      clientRating: 5
    },
    {
      id: '51',
      title: 'Brayden & Megan Wedding',
      client: 'Megan Wilson',
      date: '2023-09-23',
      location: 'Country Club',
      budget: '$16,000',
      venue: 'Country Club',
      priority: 'high',
      format: 'photo',
      package: 'Deluxe Package',
      completionDate: '2023-10-23',
      finalDelivery: 'Delivered',
      clientRating: 4
    },
    {
      id: '52',
      title: 'Hudson & Lauren Wedding',
      client: 'Lauren Garcia',
      date: '2023-09-30',
      location: 'Beach House',
      budget: '$20,500',
      venue: 'Beach House',
      priority: 'urgent',
      format: 'video',
      package: 'Luxury Package',
      completionDate: '2023-10-30',
      finalDelivery: 'Delivered',
      clientRating: 5
    }
  ];

  const filteredWeddings = archivedWeddings.filter(wedding => {
    const matchesSearch = wedding.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wedding.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wedding.venue.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesYear = selectedYear === 'all' || 
                       new Date(wedding.date).getFullYear().toString() === selectedYear;
    
    return matchesSearch && matchesYear;
  });

  // Get unique years from the data
  const availableYears = Array.from(new Set(archivedWeddings.map(wedding => 
    new Date(wedding.date).getFullYear().toString()
  ))).sort((a, b) => parseInt(b) - parseInt(a));

  // Group weddings by month-year
  const groupedWeddings = filteredWeddings.reduce((groups, wedding) => {
    const date = new Date(wedding.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(wedding);
    return groups;
  }, {} as Record<string, ArchivedWedding[]>);

  // Sort months in descending order (most recent first)
  const sortedMonths = Object.keys(groupedWeddings).sort((a, b) => b.localeCompare(a));

  const toggleMonth = (monthYear: string) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(monthYear)) {
      newExpanded.delete(monthYear);
    } else {
      newExpanded.add(monthYear);
    }
    setExpandedMonths(newExpanded);
  };

  const formatMonthYear = (monthYear: string) => {
    const [year, month] = monthYear.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search weddings, clients, venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {availableYears.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Counter */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredWeddings.length} of {archivedWeddings.length} archived weddings
        </div>
      </div>

      {/* Wedding Table */}
      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Package</TableHead>
              <TableHead className="w-[100px]">Budget</TableHead>
              <TableHead className="w-[120px]">Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMonths.map((monthYear) => {
              const monthWeddings = groupedWeddings[monthYear];
              const isExpanded = expandedMonths.has(monthYear);
              
              return (
                <React.Fragment key={monthYear}>
                  {/* Month Header Row */}
                  <TableRow 
                    className="bg-muted/30 hover:bg-muted/50 cursor-pointer border-b-2"
                    onClick={() => toggleMonth(monthYear)}
                  >
                    <TableCell colSpan={7} className="font-medium py-3">
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <span>{formatMonthYear(monthYear)}</span>
                        <Badge variant="secondary" className="ml-2">
                          {monthWeddings.length} project{monthWeddings.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {/* Month Content - conditionally rendered */}
                  {isExpanded && monthWeddings.map((wedding) => (
                    <TableRow key={wedding.id} className="hover:bg-muted/50 cursor-pointer">
                      <TableCell className="font-medium">
                        <div>
                          <p className="font-medium">{wedding.title}</p>
                          <p className="text-sm text-muted-foreground">{wedding.format === 'video' ? 'Video' : 'Photo'}</p>
                        </div>
                      </TableCell>
                      <TableCell>{wedding.client}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(wedding.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 max-w-[180px]">
                          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate text-sm">{wedding.venue}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{wedding.package}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{wedding.budget.replace('$', '')}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(wedding.completionDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {filteredWeddings.length === 0 && (
        <div className="text-center py-12">
          <ArchiveIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No weddings found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? 'Try adjusting your search criteria.' : 'No archived weddings match the selected filters.'}
          </p>
        </div>
      )}
    </div>
  );
}