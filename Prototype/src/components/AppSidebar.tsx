import * as React from "react";
import {
  Calendar,
  ChevronUp,
  FolderKanban,
  BarChart3,
  Users,
  InfoIcon,
  MapPin,
  Archive,
  Bell,
  Settings,
  User2,
  LogOut,
  ChevronRight,
  Plus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

// This is sample data.
const data = {
  user: {
    name: "Alex Johnson",
    email: "alex@314collective.com",
    avatar: "/avatars/alex-johnson.jpg",
  },
  navMain: [
    {
      title: "Projects",
      url: "/projects",
      icon: FolderKanban,
      isActive: true,
      isMain: true,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Team",
      url: "/team",
      icon: Users,
    },
    {
      title: "Important Info",
      url: "/info",
      icon: InfoIcon,
    },
    {
      title: "Venues",
      url: "/venues",
      icon: MapPin,
    },
    {
      title: "Archive",
      url: "/archive",
      icon: Archive,
    },

  ],
  navSecondary: [
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
      badge: "3",
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (url: string) => void;
  currentPath?: string;
  onNotificationClick?: () => void;
  onAddProject?: () => void;
}

export function AppSidebar({ onNavigate, currentPath = "/projects", onNotificationClick, onAddProject, ...props }: AppSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <FolderKanban className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    314 Collective
                  </span>
                  <span className="truncate text-xs">Video Production</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Create Project Button */}
            <div className="px-2 pb-2">
              <Button 
                size="sm" 
                className="w-full justify-start gap-2 h-8"
                onClick={onAddProject}
              >
                <Plus className="size-4" />
                <span>New Project</span>
              </Button>
            </div>
            
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    isActive={currentPath === item.url}
                    className={item.isMain ? "font-semibold" : ""}
                    onClick={() => onNavigate?.(item.url)}
                  >
                    <item.icon className={item.isMain ? "size-5" : "size-4"} />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="ml-auto h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.isMain && state === "expanded" && (
                      <ChevronRight className="ml-auto size-4 opacity-60" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Spacer to push footer items to bottom */}
        <div className="flex-1" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    isActive={currentPath === item.url}
                    onClick={() => {
                      if (item.title === 'Notifications') {
                        onNotificationClick?.();
                      } else {
                        onNavigate?.(item.url);
                      }
                    }}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant="destructive" 
                        className="ml-auto h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <div className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <User2 className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {data.user.name}
                    </span>
                    <span className="truncate text-xs">
                      {data.user.email}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <User2 className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="size-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}