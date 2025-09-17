import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Palette, 
  Video, 
  Camera, 
  FileText, 
  Briefcase,
  Settings,
  Scissors,
  Paintbrush,
  Plus,
  Upload,
  Music,
  ExternalLink,
  Trash2,
  Edit,
  Package,
  Tag,
  Clock,
  PlusCircle
} from 'lucide-react';

export function ImportantInfo() {
  const [rulesActiveTab, setRulesActiveTab] = useState('general');
  const [notes, setNotes] = useState('');
  const [musicLinks, setMusicLinks] = useState<string[]>([]);
  
  // Team Rules states with default priority rules
  const [teamRules, setTeamRules] = useState({
    general: '',
    videographers: '',
    photographers: '',
    videoEditors: `# Project Priority System for Video Editors

The priority system determines the order in which you should process video projects. All projects are assigned one of four priority levels, each with specific visual indicators and processing rules.

## Priority Levels and Visual Indicators

🔥 **Normal Priority** (Gray flame icon)
• Visual: Gray flame icon
• Processing Rule: Work on these projects in standard queue order (first-in, first-out)

🟢 **Medium Priority** (Green "MED" badge)
• Visual: Green badge with "MED" text
• Processing Rule: Process these projects with priority over Normal projects

🟠 **High Priority** (Orange "HIGH" badge)
• Visual: Orange badge with "HIGH" text
• Processing Rule: Process these projects with priority over both Medium and Normal projects

🔴 **Urgent Priority** (Red "URG" badge)
• Visual: Red badge with "URG" text
• Processing Rule: Process these projects immediately - highest priority over all other levels

## Processing Queue Rules

When multiple projects are in your queue, always follow this priority order:

1. **Urgent** (Red "URG") - Process immediately
2. **High** (Orange "HIGH") - Process before Medium and Normal
3. **Medium** (Green "MED") - Process before Normal
4. **Normal** (Gray flame) - Process in standard order

Within the same priority level, process projects in chronological order (earliest deadline first).`,
    photoEditors: `# Project Priority System for Photo Editors

The priority system determines the order in which you should process photo projects. All projects are assigned one of four priority levels, each with specific visual indicators and processing rules.

## Priority Levels and Visual Indicators

🔥 **Normal Priority** (Gray flame icon)
• Visual: Gray flame icon
• Processing Rule: Work on these projects in standard queue order (first-in, first-out)

🟢 **Medium Priority** (Green "MED" badge)
• Visual: Green badge with "MED" text
• Processing Rule: Process these projects with priority over Normal projects

🟠 **High Priority** (Orange "HIGH" badge)
• Visual: Orange badge with "HIGH" text
• Processing Rule: Process these projects with priority over both Medium and Normal projects

🔴 **Urgent Priority** (Red "URG" badge)
• Visual: Red badge with "URG" text
• Processing Rule: Process these projects immediately - highest priority over all other levels

## Processing Queue Rules

When multiple projects are in your queue, always follow this priority order:

1. **Urgent** (Red "URG") - Process immediately
2. **High** (Orange "HIGH") - Process before Medium and Normal
3. **Medium** (Green "MED") - Process before Normal
4. **Normal** (Gray flame) - Process in standard order

Within the same priority level, process projects in chronological order (earliest deadline first).`
  });
  
  // Offer Catalog states
  const [photoSupport, setPhotoSupport] = useState(false);
  const [videoSupport, setVideoSupport] = useState(true);
  const [brands, setBrands] = useState(['314 Collective', 'Premium Weddings']);
  const [addOns, setAddOns] = useState(['Drone', 'Extra Camera', 'Same Day Edit']);
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Wedding Basic',
      description: 'Standard wedding coverage',
      deliverables: '5-7 min highlight, raw footage',
      addons: 'Drone available',
      active: true
    },
    {
      id: 2,
      name: 'Corporate Premium',
      description: 'Full corporate event coverage',
      deliverables: '10-15 min final edit, interviews',
      addons: 'Multi-cam, livestream',
      active: true
    }
  ]);
  const [deliverables, setDeliverables] = useState([
    {
      id: 1,
      name: 'Wedding Highlight',
      category: 'Video',
      defaultDuration: '5-7 minutes',
      notes: 'Cinematic style with music'
    },
    {
      id: 2,
      name: 'Corporate Interview',
      category: 'Video',
      defaultDuration: '3-5 minutes',
      notes: 'Professional setup with branding'
    },
    {
      id: 3,
      name: 'Portrait Session',
      category: 'Photo',
      defaultDuration: '2-3 hours',
      notes: '50-100 edited photos'
    }
  ]);

  const handleAddMusicLink = () => {
    const url = prompt('Enter music library or playlist URL:');
    if (url && url.trim()) {
      setMusicLinks(prev => [...prev, url.trim()]);
    }
  };

  const handleRemoveMusicLink = (index: number) => {
    setMusicLinks(prev => prev.filter((_, i) => i !== index));
  };

  // Offer Catalog handlers
  const handleAddBrand = () => {
    const brand = prompt('Enter brand name:');
    if (brand && brand.trim()) {
      setBrands(prev => [...prev, brand.trim()]);
    }
  };

  const handleRemoveBrand = (index: number) => {
    setBrands(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddAddOn = () => {
    const addOn = prompt('Enter add-on name:');
    if (addOn && addOn.trim()) {
      setAddOns(prev => [...prev, addOn.trim()]);
    }
  };

  const handleRemoveAddOn = (index: number) => {
    setAddOns(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddPackage = () => {
    // TODO: Open dialog to add package
    console.log('Add package dialog');
  };

  const handleAddDeliverable = () => {
    // TODO: Open dialog to add deliverable
    console.log('Add deliverable dialog');
  };

  const handleRulesChange = (role: string, value: string) => {
    setTeamRules(prev => ({
      ...prev,
      [role]: value
    }));
  };

  const handleSaveRules = () => {
    console.log('Saving rules for', rulesActiveTab, ':', teamRules[rulesActiveTab as keyof typeof teamRules]);
    // TODO: Save to backend
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Important Info</h1>
      </div>

      <Tabs defaultValue="brand-kit" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="brand-kit" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Brand Kit
          </TabsTrigger>
          <TabsTrigger value="offer-catalog" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Offer Catalog
          </TabsTrigger>
          <TabsTrigger value="team-rules" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Team Rules
          </TabsTrigger>
        </TabsList>

        {/* Brand Kit Tab */}
        <TabsContent value="brand-kit" className="space-y-6">
          {/* Color Grading & LUTs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Color Grading & LUTs
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Upload
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-12 border border-dashed rounded-lg text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Add your color grading examples and LUT files</p>
              </div>
            </CardContent>
          </Card>

          {/* Video Style Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Style Examples
                </div>
                <Button variant="outline" size="sm" onClick={() => {}}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Link
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-12 border border-dashed rounded-lg text-center">
                <Video className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Upload example videos showcasing your style</p>
              </div>
            </CardContent>
          </Card>

          {/* Music Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Music Sources
                </div>
                <Button variant="outline" size="sm" onClick={handleAddMusicLink}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Link
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {musicLinks.length > 0 ? (
                <div className="space-y-3">
                  {musicLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 text-sm hover:text-primary transition-colors truncate"
                      >
                        {link}
                      </a>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveMusicLink(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 border border-dashed rounded-lg text-center">
                  <Music className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Add music libraries or playlists (e.g. MusicBed)</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lightroom Presets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Lightroom Presets
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Upload
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-12 border border-dashed rounded-lg text-center">
                <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Upload your Lightroom presets (.lrtemplate, .xmp files)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Organize by style: Wedding, Portrait, Corporate, etc.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Album Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Paintbrush className="w-5 h-5" />
                  Album Examples
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Example
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-12 border border-dashed rounded-lg text-center">
                <Paintbrush className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Upload example album layouts and designs</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Include various styles: Classic, Modern, Artistic spreads
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write notes about your editing style…"
                className="min-h-[120px] resize-none"
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Offer Catalog Tab */}
        <TabsContent value="offer-catalog" className="space-y-6">
          {/* Packages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Packages
                </div>
                <Button variant="outline" size="sm" onClick={handleAddPackage}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Package
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Deliverables</TableHead>
                      <TableHead>Add-ons</TableHead>
                      <TableHead>Active</TableHead>
                      <TableHead className="w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell>{pkg.name}</TableCell>
                        <TableCell className="text-muted-foreground">{pkg.description}</TableCell>
                        <TableCell>{pkg.deliverables}</TableCell>
                        <TableCell>{pkg.addons}</TableCell>
                        <TableCell>
                          <Badge variant={pkg.active ? "default" : "secondary"}>
                            {pkg.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Media Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Media Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="photo" 
                      checked={photoSupport}
                      onCheckedChange={(checked) => setPhotoSupport(checked as boolean)}
                    />
                    <label htmlFor="photo" className="cursor-pointer">Photo</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="video" 
                      checked={videoSupport}
                      onCheckedChange={(checked) => setVideoSupport(checked as boolean)}
                    />
                    <label htmlFor="video" className="cursor-pointer">Video</label>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Select media types you support</p>
              </div>
            </CardContent>
          </Card>

          {/* Brands */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Brands
                </div>
                <Button variant="outline" size="sm" onClick={handleAddBrand}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Brand
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {brand}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveBrand(index)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deliverables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Deliverables
                </div>
                <Button variant="outline" size="sm" onClick={handleAddDeliverable}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Deliverable
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Default Duration</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliverables.map((deliverable) => (
                      <TableRow key={deliverable.id}>
                        <TableCell>{deliverable.name}</TableCell>
                        <TableCell>
                          <Badge variant={deliverable.category === 'Video' ? 'default' : 'secondary'}>
                            {deliverable.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{deliverable.defaultDuration}</TableCell>
                        <TableCell className="text-muted-foreground">{deliverable.notes}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Add-ons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5" />
                  Add-ons
                </div>
                <Button variant="outline" size="sm" onClick={handleAddAddOn}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Add-on
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {addOns.map((addOn, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{addOn}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleRemoveAddOn(index)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Rules Tab */}
        <TabsContent value="team-rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Team Guidelines & Procedures
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Role Tabs */}
              <Tabs value={rulesActiveTab} onValueChange={setRulesActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="general" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="videographers" className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Videographers
                  </TabsTrigger>
                  <TabsTrigger value="photographers" className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Photographers
                  </TabsTrigger>
                  <TabsTrigger value="videoEditors" className="flex items-center gap-2">
                    <Scissors className="w-4 h-4" />
                    Video Editors
                  </TabsTrigger>
                  <TabsTrigger value="photoEditors" className="flex items-center gap-2">
                    <Paintbrush className="w-4 h-4" />
                    Photo Editors
                  </TabsTrigger>
                </TabsList>

                {/* Rich Text Editor for each role */}
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-background min-h-[400px]">
                    <Textarea
                      value={teamRules[rulesActiveTab as keyof typeof teamRules]}
                      onChange={(e) => handleRulesChange(rulesActiveTab, e.target.value)}
                      placeholder="Write guidelines and procedures for this role…"
                      className="min-h-[350px] resize-none border-none bg-transparent p-0 text-base leading-relaxed focus:ring-0 focus:ring-offset-0"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveRules} className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Save Rules
                    </Button>
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}