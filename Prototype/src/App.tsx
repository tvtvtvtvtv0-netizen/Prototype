import { useState } from 'react';
import { AppSidebar } from './components/AppSidebar';
import { FilterSidebar } from './components/FilterSidebar';
import type { ProjectCard } from './components/pages/KanbanBoard';
import { Dashboard } from './components/pages/Dashboard';
import { KanbanBoard } from './components/pages/KanbanBoard';
import { Team } from './components/pages/Team';
import { Calendar } from './components/pages/Calendar';
import { Archive } from './components/pages/Archive';
import { ImportantInfo } from './components/pages/ImportantInfo';
import { Venues } from './components/pages/Venues';

import { NotificationPanel } from './components/NotificationPanel';
import { NotionSlidePanel } from './components/NotionSlidePanel';
import { AddProjectModal } from './components/AddProjectModal';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from './components/ui/sidebar';
import { Separator } from './components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './components/ui/breadcrumb';

export default function App() {
  const [currentPath, setCurrentPath] = useState('/projects');
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isFilterMode, setIsFilterMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('event-details');
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  
  // Filter states (будут переданы в KanbanBoard)
  const [filterStates, setFilterStates] = useState({
    selectedTypes: [] as string[],
    selectedPriorities: [] as string[],
    selectedAssignees: [] as string[],
    selectedFormats: [] as string[],
    selectedPackages: [] as string[],
    selectedVenues: [] as string[],
    selectedProductionStyles: [] as string[],
    selectedDeadlineFilter: '',
    uniqueTypes: [] as string[],
    uniquePriorities: [] as string[],
    uniqueAssignees: [] as string[],
    uniqueFormats: [] as string[],
    uniquePackages: [] as string[],
    uniqueVenues: [] as string[],
    uniqueProductionStyles: [] as string[]
  });

  const handleNavigate = (url: string) => {
    setCurrentPath(url);
  };

  const handleNotificationClick = () => {
    setIsNotificationPanelOpen(prev => !prev);
  };

  const handleCloseNotificationPanel = () => {
    setIsNotificationPanelOpen(false);
  };

  const handleMessageClick = (projectTitle: string) => {
    // Find project by title and open chat tab
    const mockProject = {
      id: 'mock-project',
      title: projectTitle,
      type: 'Wedding',
      priority: 'medium',
      status: 'draft-ready'
    };
    
    setSelectedProject(mockProject);
    setSelectedTab('chat');
    setIsDetailPanelOpen(true);
    setCurrentPath('/projects'); // Ensure we're on projects page
  };

  const handleOpenFilters = () => {
    setIsFilterMode(true);
  };

  const handleCloseFilters = () => {
    setIsFilterMode(false);
  };

  const handleAddProject = (newProject: ProjectCard) => {
    setProjects(prev => [...prev, newProject]);
    console.log('New project added:', newProject);
  };

  const clearAllFilters = () => {
    setFilterStates(prev => ({
      ...prev,
      selectedTypes: [],
      selectedPriorities: [],
      selectedAssignees: [],
      selectedFormats: [],
      selectedPackages: [],
      selectedVenues: [],
      selectedProductionStyles: [],
      selectedDeadlineFilter: ''
    }));
  };

  const hasActiveFilters = () => {
    return filterStates.selectedTypes.length > 0 ||
           filterStates.selectedPriorities.length > 0 ||
           filterStates.selectedAssignees.length > 0 ||
           filterStates.selectedFormats.length > 0 ||
           filterStates.selectedPackages.length > 0 ||
           filterStates.selectedVenues.length > 0 ||
           filterStates.selectedProductionStyles.length > 0 ||
           filterStates.selectedDeadlineFilter !== '';
  };

  const getCurrentPageTitle = () => {
    const pathTitles: Record<string, string> = {
      '/projects': 'Projects',
      '/dashboard': 'Dashboard',
      '/calendar': 'Calendar',
      '/team': 'Team',
      '/info': 'Important Info',
      '/venues': 'Venues',
      '/archive': 'Archive',

      '/notifications': 'Notifications',
      '/settings': 'Settings',
    };
    return pathTitles[currentPath] || 'Projects';
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/dashboard':
        return <Dashboard />;
      case '/projects':
        return (
          <KanbanBoard 
            onOpenFilters={handleOpenFilters}
            filterStates={filterStates}
            setFilterStates={setFilterStates}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isDetailPanelOpen={isDetailPanelOpen}
            setIsDetailPanelOpen={setIsDetailPanelOpen}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        );
      case '/calendar':
        return <Calendar />;
      case '/team':
        return <Team />;
      case '/info':
        return <ImportantInfo />;
      case '/venues':
        return <Venues />;
      case '/archive':
        return <Archive />;

      case '/notifications':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="mb-2">Notifications</h1>
              <p className="text-muted-foreground">
                Recent updates, messages, and important alerts
              </p>
            </div>
            <div className="p-12 border border-dashed rounded-lg text-center">
              <p className="text-muted-foreground">Notifications center coming soon</p>
            </div>
          </div>
        );
      case '/settings':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="mb-2">Settings</h1>
              <p className="text-muted-foreground">
                Configure your account, company settings, and preferences
              </p>
            </div>
            <div className="p-12 border border-dashed rounded-lg text-center">
              <p className="text-muted-foreground">Settings panel coming soon</p>
            </div>
          </div>
        );
      default:
        return (
          <KanbanBoard 
            onOpenFilters={handleOpenFilters}
            filterStates={filterStates}
            setFilterStates={setFilterStates}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isDetailPanelOpen={isDetailPanelOpen}
            setIsDetailPanelOpen={setIsDetailPanelOpen}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        );
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar 
        onNavigate={handleNavigate}
        currentPath={currentPath}
        onNotificationClick={handleNotificationClick}
        onAddProject={() => setIsAddProjectModalOpen(true)}
      />
      
      <NotificationPanel 
        isOpen={isNotificationPanelOpen}
        onClose={handleCloseNotificationPanel}
        onMessageClick={handleMessageClick}
      />

      <NotionSlidePanel 
        isOpen={isDetailPanelOpen}
        onClose={() => setIsDetailPanelOpen(false)}
        project={selectedProject}
        defaultTab={selectedTab}
      />

      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onAddProject={handleAddProject}
      />
      
      <FilterSidebar
        isOpen={isFilterMode}
        selectedTypes={filterStates.selectedTypes}
        setSelectedTypes={(types) => setFilterStates(prev => ({ ...prev, selectedTypes: types }))}
        uniqueTypes={filterStates.uniqueTypes}
        selectedPriorities={filterStates.selectedPriorities}
        setSelectedPriorities={(priorities) => setFilterStates(prev => ({ ...prev, selectedPriorities: priorities }))}
        uniquePriorities={filterStates.uniquePriorities}
        selectedAssignees={filterStates.selectedAssignees}
        setSelectedAssignees={(assignees) => setFilterStates(prev => ({ ...prev, selectedAssignees: assignees }))}
        uniqueAssignees={filterStates.uniqueAssignees}
        selectedFormats={filterStates.selectedFormats}
        setSelectedFormats={(formats) => setFilterStates(prev => ({ ...prev, selectedFormats: formats }))}
        uniqueFormats={filterStates.uniqueFormats}
        selectedPackages={filterStates.selectedPackages}
        setSelectedPackages={(packages) => setFilterStates(prev => ({ ...prev, selectedPackages: packages }))}
        uniquePackages={filterStates.uniquePackages}
        selectedVenues={filterStates.selectedVenues}
        setSelectedVenues={(venues) => setFilterStates(prev => ({ ...prev, selectedVenues: venues }))}
        uniqueVenues={filterStates.uniqueVenues}
        selectedProductionStyles={filterStates.selectedProductionStyles}
        setSelectedProductionStyles={(styles) => setFilterStates(prev => ({ ...prev, selectedProductionStyles: styles }))}
        uniqueProductionStyles={filterStates.uniqueProductionStyles}
        selectedDeadlineFilter={filterStates.selectedDeadlineFilter}
        setSelectedDeadlineFilter={(filter) => setFilterStates(prev => ({ ...prev, selectedDeadlineFilter: filter }))}
        clearAllFilters={clearAllFilters}
        hasActiveFilters={hasActiveFilters()}
        onClose={handleCloseFilters}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" onClick={() => handleNavigate('/projects')}>
                    314 Collective
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getCurrentPageTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-hidden">
          {renderCurrentPage()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}