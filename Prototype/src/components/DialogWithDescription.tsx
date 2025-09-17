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
import { X, Send } from "lucide-react";

interface DialogWithDescriptionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function DialogWithDescription({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  children 
}: DialogWithDescriptionProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

// Comments Dialog Component
interface CommentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  revisionTitle?: string;
  comments: Array<{
    id: string;
    author: string;
    message: string;
    timestamp: string;
    isOwn?: boolean;
  }>;
  newComment: string;
  onNewCommentChange: (value: string) => void;
  onAddComment: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export function CommentsDialog({
  open,
  onOpenChange,
  revisionTitle = "Revision Item",
  comments,
  newComment,
  onNewCommentChange,
  onAddComment,
  onKeyPress,
  scrollRef
}: CommentsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
          <DialogDescription>
            View and add comments for this revision item: {revisionTitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Comments List */}
          <div ref={scrollRef} className="max-h-60 overflow-y-auto space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`flex gap-3 ${
                  comment.isOwn ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    comment.isOwn
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium">
                      {comment.author}
                    </span>
                    <span className="text-xs opacity-70">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm">{comment.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="flex gap-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => onNewCommentChange(e.target.value)}
              onKeyPress={onKeyPress}
              className="min-h-[60px] resize-none"
            />
            <Button
              size="sm"
              onClick={onAddComment}
              disabled={!newComment.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Add Draft Dialog Component
interface AddDraftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  draftUrl: string;
  onDraftUrlChange: (value: string) => void;
  draftDescription: string;
  onDraftDescriptionChange: (value: string) => void;
  onAddDraft: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export function AddDraftDialog({
  open,
  onOpenChange,
  draftUrl,
  onDraftUrlChange,
  draftDescription,
  onDraftDescriptionChange,
  onAddDraft,
  onKeyPress
}: AddDraftDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              value={draftUrl}
              onChange={(e) => onDraftUrlChange(e.target.value)}
              onKeyPress={onKeyPress}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              Description (Optional)
            </label>
            <Textarea
              placeholder="Brief description of this draft..."
              value={draftDescription}
              onChange={(e) => onDraftDescriptionChange(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={onAddDraft}
              disabled={!draftUrl.trim()}
            >
              Add Draft
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}