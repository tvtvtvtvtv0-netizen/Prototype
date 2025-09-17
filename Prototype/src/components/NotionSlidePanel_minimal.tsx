// Accessible NotionSlidePanel using proper Dialog structure
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog@1.1.6";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden@1.1.1";
import { Button } from "./ui/button";
import { Edit2, Maximize2, X } from "lucide-react";
import { cn } from "./ui/utils";

interface NotionSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
}

export function NotionSlidePanel({ isOpen, onClose, project }: NotionSlidePanelProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const projectTitle = project?.title || "Jessica Crosby & Jackson Knight";

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[100] bg-black/50"
        />
        <Dialog.Content
          className={cn(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-[101] flex flex-col shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full border-l",
            isFullscreen
              ? "w-full max-w-none"
              : "w-[60vw] max-w-[60vw]"
          )}
        >
          <VisuallyHidden.Root>
            <Dialog.Title>
              Project Details: {projectTitle}
            </Dialog.Title>
            <Dialog.Description>
              Project management panel with event details, chat, revisions and shooting day plans for {projectTitle}
            </Dialog.Description>
          </VisuallyHidden.Root>

          {/* Header */}
          <div className="px-6 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium">
                  {projectTitle}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={toggleFullscreen}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Tab Navigation */}
            <div className="border-b px-6">
              <nav className="flex space-x-6">
                {['Event Details', 'Chat', 'Revision / Draft', 'Shooting Day'].map((tab) => (
                  <button
                    key={tab}
                    className="border-b-2 border-transparent py-3 px-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border data-[state=active]:border-primary data-[state=active]:text-foreground"
                    data-state={tab === 'Event Details' ? 'active' : 'inactive'}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Event Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Client</label>
                        <p className="mt-1">{project?.client || 'Jessica Crosby'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Date</label>
                        <p className="mt-1">{project?.date || 'Jun 21, 2025'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Location</label>
                        <p className="mt-1">{project?.location || 'Riverside Chapel'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Budget</label>
                        <p className="mt-1">{project?.budget || '$8,500'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Package</label>
                        <p className="mt-1">{project?.package || 'Standard Package'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Assignee</label>
                        <p className="mt-1">{project?.assignee || 'Emily Davis'}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Description</label>
                      <p className="mt-1 text-sm">{project?.description || 'Beautiful outdoor ceremony with reception'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}