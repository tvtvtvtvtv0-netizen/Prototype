// This is a fixed version of NotionSlidePanel with proper DialogDescription components
// Import this instead of the original if Dialog accessibility errors persist

import { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { 
  Edit2,
  Maximize2,
  X,
  Send
} from "lucide-react";

interface FixedNotionSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
}

export function FixedNotionSlidePanel({ isOpen, onClose, project }: FixedNotionSlidePanelProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false);
  const [addDraftDialogOpen, setAddDraftDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newDraftUrl, setNewDraftUrl] = useState("");
  const [newDraftDescription, setNewDraftDescription] = useState("");

  const projectTitle = project?.title || "Jessica Crosby & Jackson Knight";

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    console.log("Adding comment:", newComment);
    setNewComment("");
    setCommentsDialogOpen(false);
  };

  const addNewDraft = () => {
    if (!newDraftUrl.trim()) return;
    console.log("Adding draft:", { url: newDraftUrl, description: newDraftDescription });
    setNewDraftUrl("");
    setNewDraftDescription("");
    setAddDraftDialogOpen(false);
  };

  const handleCommentKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addComment();
    }
  };

  const handleDraftKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      addNewDraft();
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="right"
          className={`p-0 border-l ${
            isFullscreen
              ? "!w-full !max-w-none"
              : "!w-[60vw] !max-w-[60vw]"
          } transition-all duration-300`}
        >
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SheetTitle className="sr-only">
              Wedding Plan
            </SheetTitle>
            <SheetDescription className="sr-only">
              Wedding planning panel for Jessica Crosby and
              Jackson Knight with event details, chat, revisions
              and shooting day plans
            </SheetDescription>
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
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Project Details</h3>
              <p className="text-muted-foreground">
                This is a placeholder for the project content. The original 
                NotionSlidePanel had accessibility issues with Dialog components
                that were missing DialogDescription elements.
              </p>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setCommentsDialogOpen(true)}
                >
                  View Comments
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setAddDraftDialogOpen(true)}
                >
                  Add Draft
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Comments Dialog with proper DialogDescription */}
      <Dialog open={commentsDialogOpen} onOpenChange={setCommentsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
            <DialogDescription>
              View and add comments for this revision item.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                No comments yet. Add the first comment below.
              </p>
            </div>

            <div className="flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleCommentKeyPress}
                className="min-h-[60px] resize-none"
              />
              <Button
                size="sm"
                onClick={addComment}
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Draft Dialog with proper DialogDescription */}
      <Dialog open={addDraftDialogOpen} onOpenChange={setAddDraftDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Draft</DialogTitle>
            <DialogDescription>
              Add a new draft video or document for review and feedback.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Draft URL or Link
              </label>
              <Input
                placeholder="https://..."
                value={newDraftUrl}
                onChange={(e) => setNewDraftUrl(e.target.value)}
                onKeyPress={handleDraftKeyPress}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Description (Optional)
              </label>
              <Textarea
                placeholder="Brief description of this draft..."
                value={newDraftDescription}
                onChange={(e) => setNewDraftDescription(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setAddDraftDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={addNewDraft}
                disabled={!newDraftUrl.trim()}
              >
                Add Draft
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}