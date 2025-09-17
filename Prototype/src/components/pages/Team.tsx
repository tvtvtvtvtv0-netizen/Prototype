import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { toast } from "sonner@2.0.3";
import { Toaster } from '../ui/sonner';
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  UserCheck,
  Camera,
  Crown,
  Upload,
  Mail,
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Operator' | 'Editor' | 'Staff';
  description: string;
  avatar?: string;
  joinDate: string;
}

const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@314collective.com',
    role: 'Owner',
    description: 'Founder and studio director. Leads all projects and company development.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@314collective.com',
    role: 'Editor',
    description: 'Lead video editor with cinematography experience. Specializes in wedding films.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=128&h=128&fit=crop&crop=face',
    joinDate: '2023-02-20'
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    email: 'mike@314collective.com',
    role: 'Operator',
    description: 'Professional videographer focused on wedding and corporate filming.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
    joinDate: '2023-03-10'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@clientcompany.com',
    role: 'Staff',
    description: 'Project coordinator and client relationship manager. Ensures smooth operations.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&crop=face',
    joinDate: '2023-06-01'
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david@314collective.com',
    role: 'Editor',
    description: 'Junior editor specializing in color correction and sound design.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face',
    joinDate: '2023-04-15'
  },
  {
    id: '6',
    name: 'Maria Garcia',
    email: 'maria@314collective.com',
    role: 'Operator',
    description: 'Second camera operator and photographer. Works with drones and specialized equipment.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=128&h=128&fit=crop&crop=face',
    joinDate: '2023-07-20'
  }
];

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'Owner':
      return Crown;
    case 'Editor':
      return Edit;
    case 'Operator':
      return Camera;
    case 'Staff':
      return Users;
    default:
      return UserCheck;
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Owner':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Editor':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Operator':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Staff':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};



const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export function Team() {
  const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers);

  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isMemberSettingsOpen, setIsMemberSettingsOpen] = useState(false);
  
  // New member form states
  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    email: '',
    role: '',
    avatar: '',
    canEditProjects: true,
    canManageTeam: false,
    viewAllProjects: true,
    emailNotifications: true,
    projectUpdates: true,
    deadlineReminders: true
  });

  const filteredMembers = members.filter(member => {
    const matchesRole = roleFilter === 'All' || member.role === roleFilter;
    
    return matchesRole;
  }).sort((a, b) => {
    // Owner always first
    if (a.role === 'Owner' && b.role !== 'Owner') return -1;
    if (b.role === 'Owner' && a.role !== 'Owner') return 1;
    // Others alphabetically
    return a.name.localeCompare(b.name);
  });





  const handleDeleteMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleOpenMemberSettings = (member: TeamMember) => {
    setSelectedMember(member);
    setIsMemberSettingsOpen(true);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to your file storage service
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewMemberForm(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const sendInvitationEmail = async (email: string, name: string, role: string) => {
    // Mock email sending - in real app, this would be an API call
    console.log(`Sending invitation to ${email} for ${name} as ${role}`);
    // You would implement actual email service here
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleCreateMember = async () => {
    if (!newMemberForm.name || !newMemberForm.email || !newMemberForm.role) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      toast.loading('Sending invitation...', { id: 'create-member' });
      
      // Send invitation email
      await sendInvitationEmail(newMemberForm.email, newMemberForm.name, newMemberForm.role);
      
      // Create new member
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: newMemberForm.name,
        email: newMemberForm.email,
        role: newMemberForm.role as TeamMember['role'],
        description: `New ${newMemberForm.role.toLowerCase()} member`,
        avatar: newMemberForm.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face`,
        joinDate: new Date().toISOString().split('T')[0]
      };

      setMembers(prev => [...prev, newMember]);
      
      // Reset form
      setNewMemberForm({
        name: '',
        email: '',
        role: '',
        avatar: '',
        canEditProjects: true,
        canManageTeam: false,
        viewAllProjects: true,
        emailNotifications: true,
        projectUpdates: true,
        deadlineReminders: true
      });
      
      setIsAddMemberOpen(false);
      toast.success(`Invitation sent to ${newMemberForm.email}`, { id: 'create-member' });
    } catch (error) {
      console.error('Failed to create member:', error);
      toast.error('Failed to send invitation', { id: 'create-member' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Team</h1>
          <p className="text-muted-foreground">
            Manage editors, operators and team members
          </p>
        </div>
        
        <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Invite a new member to your video production team. An invitation will be sent to their email.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <h3 className="font-medium">Basic Information</h3>
                
                {/* Avatar Upload */}
                <div className="space-y-2">
                  <Label>Profile Photo</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={newMemberForm.avatar} alt="Preview" />
                      <AvatarFallback>
                        {newMemberForm.name ? newMemberForm.name.split(' ').map(n => n[0]).join('') : 'UP'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <Label htmlFor="avatar-upload" className="cursor-pointer">
                        <Button variant="outline" className="gap-2" asChild>
                          <div>
                            <Upload className="h-4 w-4" />
                            Upload Photo
                          </div>
                        </Button>
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended: Square image, at least 128x128px
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter member's name"
                      value={newMemberForm.name}
                      onChange={(e) => setNewMemberForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select 
                      value={newMemberForm.role} 
                      onValueChange={(value) => setNewMemberForm(prev => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Editor">Editor</SelectItem>
                        <SelectItem value="Operator">Operator</SelectItem>
                        <SelectItem value="Staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    Email Address
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter email address"
                    value={newMemberForm.email}
                    onChange={(e) => setNewMemberForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    An invitation email will be sent to this address
                  </p>
                </div>
              </div>

              {/* Permissions Section */}
              <div className="space-y-4">
                <h3 className="font-medium">Permissions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm">Can edit projects</span>
                      <p className="text-xs text-muted-foreground">Allows editing project details and status</p>
                    </div>
                    <Switch 
                      checked={newMemberForm.canEditProjects}
                      onCheckedChange={(checked) => setNewMemberForm(prev => ({ ...prev, canEditProjects: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm">Can manage team</span>
                      <p className="text-xs text-muted-foreground">Allows adding and managing team members</p>
                    </div>
                    <Switch 
                      checked={newMemberForm.canManageTeam}
                      onCheckedChange={(checked) => setNewMemberForm(prev => ({ ...prev, canManageTeam: checked }))}
                    />
                  </div>
                </div>
              </div>

              {/* Project Access Section (only for Editors and Operators) */}
              {(newMemberForm.role === 'Editor' || newMemberForm.role === 'Operator') && (
                <div className="space-y-4">
                  <h3 className="font-medium">Project Access</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm">View all projects</span>
                      <p className="text-xs text-muted-foreground">
                        When enabled, can see all studio projects. When disabled, can only see assigned projects.
                      </p>
                    </div>
                    <Switch 
                      checked={newMemberForm.viewAllProjects}
                      onCheckedChange={(checked) => setNewMemberForm(prev => ({ ...prev, viewAllProjects: checked }))}
                    />
                  </div>
                </div>
              )}

              {/* Notification Settings Section */}
              <div className="space-y-4">
                <h3 className="font-medium">Notification Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm">Email notifications</span>
                      <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={newMemberForm.emailNotifications}
                      onCheckedChange={(checked) => setNewMemberForm(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm">Project updates</span>
                      <p className="text-xs text-muted-foreground">Get notified about project changes</p>
                    </div>
                    <Switch 
                      checked={newMemberForm.projectUpdates}
                      onCheckedChange={(checked) => setNewMemberForm(prev => ({ ...prev, projectUpdates: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm">Deadline reminders</span>
                      <p className="text-xs text-muted-foreground">Receive deadline and schedule reminders</p>
                    </div>
                    <Switch 
                      checked={newMemberForm.deadlineReminders}
                      onCheckedChange={(checked) => setNewMemberForm(prev => ({ ...prev, deadlineReminders: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateMember}
                  disabled={!newMemberForm.name || !newMemberForm.email || !newMemberForm.role}
                  className="gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Send Invitation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>



      {/* Filters */}
      <div className="flex justify-end">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Roles</SelectItem>
            <SelectItem value="Owner">Owner</SelectItem>
            <SelectItem value="Editor">Editors</SelectItem>
            <SelectItem value="Operator">Operators</SelectItem>
            <SelectItem value="Staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Team Members Content */}
      <div>
          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => {
              const RoleIcon = getRoleIcon(member.role);
              
              return (
                <Card key={member.id} className="hover:shadow-lg transition-all duration-200 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Header image */}
                    <div className="relative h-60 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80 hover:bg-white/90">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenMemberSettings(member)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Member Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDeleteMember(member.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 space-y-3">
                      {/* Name and role */}
                      <div className="space-y-2">
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <div className="flex items-center gap-2">
                          <RoleIcon className="h-4 w-4" />
                          <Badge variant="outline" className={getRoleColor(member.role)}>
                            {member.role}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {member.description}
                      </p>
                      
                      {/* Join date */}
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          Joined {formatDate(member.joinDate)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {filteredMembers.length === 0 && (
            <div className="text-center py-12 col-span-full">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No team members found</h3>
              <p className="text-muted-foreground">
                {roleFilter !== 'All' 
                  ? 'Try adjusting your filters'
                  : 'Start by adding your first team member'
                }
              </p>
            </div>
          )}
      </div>

      {/* Member Settings Dialog */}
      <Dialog open={isMemberSettingsOpen} onOpenChange={setIsMemberSettingsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Member Settings</DialogTitle>
            <DialogDescription>
              Configure settings for {selectedMember?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMember && (
            <div className="space-y-6 py-4">
              {/* Member Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                  <AvatarFallback>
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedMember.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                  <Badge variant="outline" className={getRoleColor(selectedMember.role)}>
                    {selectedMember.role}
                  </Badge>
                </div>
              </div>

              {/* Settings Options */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Can edit projects</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Can manage team</span>
                      <Switch />
                    </div>
                  </div>
                </div>

                {(selectedMember.role === 'Editor' || selectedMember.role === 'Operator') && (
                  <div className="space-y-2">
                    <Label>Project Access</Label>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">View all projects</span>
                        <p className="text-xs text-muted-foreground">When enabled, can see all studio projects. When disabled, can only see assigned projects.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Notification Settings</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email notifications</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Project updates</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Deadline reminders</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>


              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsMemberSettingsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsMemberSettingsOpen(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}