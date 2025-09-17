import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Edit2,
  Maximize2,
  X,
  MessageCircle,
  FileText,
  Camera,
  Send,
  Paperclip,
  Pin,
  AtSign,
  Video,
  Image,
  FileIcon,
  Download,
} from "lucide-react";
import { UploadedFilesSection } from './UploadedFilesSection';

// Enhanced Chat Message type with attachments and mentions
interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isOwn?: boolean;
  isPinned?: boolean;
  mentions?: string[];
  attachments?: {
    type: 'photo' | 'pdf' | 'video';
    name: string;
    url: string;
    size?: string;
  }[];
}

// Initial chat messages with enhanced features
const initialChatMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "Photographer",
    message: "Ready for shooting at 2:30 PM",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    sender: "You",
    message: "Perfect, we'll be waiting at the entrance",
    timestamp: "10:35 AM",
    isOwn: true,
  },
  {
    id: "3",
    sender: "Editor",
    message: "@You Here are the sample shots for approval",
    timestamp: "2:15 PM",
    isOwn: false,
    mentions: ["You"],
    attachments: [
      {
        type: 'photo',
        name: 'ceremony_samples.jpg',
        url: '#',
        size: '2.4 MB'
      }
    ]
  },
  {
    id: "4",
    sender: "Client",
    message: "Love the color grading! Can we get the full album soon?",
    timestamp: "3:20 PM",
    isOwn: false,
    isPinned: true,
  },
];

// Photo revision items
const photoRevisionItems = [
  {
    id: "p1",
    title: "Color correction for bridal portraits",
    description: "Adjust skin tones and white balance in formal portraits",
    priority: "high" as const,
    isDone: false,
    hasComment: true,
    commentCount: 2,
    timestamp: "1 hour ago",
    assignee: "Photo Editor",
    comments: [],
  },
  {
    id: "p2", 
    title: "Remove unwanted objects from ceremony shots",
    description: "Clean up background distractions in key ceremony moments",
    priority: "medium" as const,
    isDone: true,
    hasComment: false,
    commentCount: 0,
    timestamp: "3 hours ago",
    assignee: "Photo Editor",
    comments: [],
  },
  {
    id: "p3",
    title: "Create album layout mockup",
    description: "Design sample spread for client approval",
    priority: "low" as const,
    isDone: false,
    hasComment: true,
    commentCount: 1,
    timestamp: "2 days ago",
    assignee: "Album Designer",
    comments: [],
  },
];

interface NotionSlidePanelEnhancedProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
  defaultTab?: string;
}

export function NotionSlidePanelEnhanced({ 
  isOpen, 
  onClose, 
  project, 
  defaultTab = "project-info" 
}: NotionSlidePanelEnhancedProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const [activeRevisionTab, setActiveRevisionTab] = useState("video");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const projectTitle = project?.title || "Jessica Crosby & Jackson Knight";

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Enhanced chat functions
  const sendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Detect mentions
      const mentions = newMessage.match(/@\w+/g)?.map(m => m.substring(1)) || [];

      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: "You",
        message: newMessage.trim(),
        timestamp: currentTime,
        isOwn: true,
        mentions: mentions.length > 0 ? mentions : undefined,
      };

      setChatMessages((prev) => [...prev, message]);
      setNewMessage("");

      setTimeout(() => {
        if (chatScrollRef.current) {
          chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const togglePin = (messageId: string) => {
    setChatMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isPinned: !msg.isPinned }
          : msg
      )
    );
  };

  const handleAttachmentUpload = () => {
    // Simulate file upload
    console.log("Opening file upload dialog");
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
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
          <SheetTitle className="sr-only">Project Panel</SheetTitle>
          <SheetDescription className="sr-only">
            Project management panel with chat, revisions and details
          </SheetDescription>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium">{projectTitle}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="h-8 w-8 p-0"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        {/* Content with Tabs */}
        <Tabs defaultValue={defaultTab} className="flex flex-col h-full">
          {/* Tab Navigation */}
          <div className="px-6 py-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="project-info" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Project Info
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="revision" className="flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Revisions & Drafts
              </TabsTrigger>
              <TabsTrigger value="shooting-day" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Shooting Day
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Project Info Tab */}
          <TabsContent value="project-info" className="flex-1 px-6 py-4 overflow-y-auto">
            <div className="space-y-6">
              <UploadedFilesSection />
              <div className="p-4 border border-dashed rounded-lg text-center">
                <p className="text-muted-foreground">Project details coming soon</p>
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Chat Tab */}
          <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 py-2 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Project Chat</span>
                {chatMessages.filter(m => m.isPinned).length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {chatMessages.filter(m => m.isPinned).length} pinned
                  </Badge>
                )}
              </div>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
            >
              {chatMessages.map((message) => (
                <div key={message.id} className="group relative">
                  <div className={`flex gap-3 ${message.isOwn ? 'justify-end' : ''}`}>
                    <div className={`max-w-[70%] ${message.isOwn ? 'order-2' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        {message.isPinned && (
                          <Pin className="w-3 h-3 text-blue-500" />
                        )}
                      </div>
                      
                      <div className={`p-3 rounded-lg ${
                        message.isOwn 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      } ${message.isPinned ? 'ring-2 ring-blue-200' : ''}`}>
                        <p className="text-sm">{message.message}</p>
                        
                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.attachments.map((attachment, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 bg-background/20 rounded">
                                {attachment.type === 'photo' && <Image className="w-4 h-4" />}
                                {attachment.type === 'pdf' && <FileIcon className="w-4 h-4" />}
                                {attachment.type === 'video' && <Video className="w-4 h-4" />}
                                <span className="text-xs">{attachment.name}</span>
                                {attachment.size && <span className="text-xs opacity-70">({attachment.size})</span>}
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 ml-auto">
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message actions */}
                    <div className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-start gap-1 mt-6 ${
                      message.isOwn ? 'order-1' : ''
                    }`}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => togglePin(message.id)}
                      >
                        <Pin className={`w-3 h-3 ${message.isPinned ? 'text-blue-500' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="px-6 py-4 border-t bg-background/95">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleAttachmentUpload}
                  className="h-10 w-10 p-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message... Use @name to mention someone"
                    className="pr-12"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                  >
                    <AtSign className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={sendMessage} size="sm" className="h-10">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Revisions & Drafts Tab */}
          <TabsContent value="revision" className="flex-1 flex flex-col overflow-hidden">
            {/* Sub-tabs for Video and Photo */}
            <div className="px-6 py-2 border-b">
              <Tabs value={activeRevisionTab} onValueChange={setActiveRevisionTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="photo" className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Photo
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {activeRevisionTab === "video" && (
                <div className="space-y-4">
                  <div className="text-center p-8 border border-dashed rounded-lg">
                    <Video className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Video revisions and drafts will appear here</p>
                  </div>
                </div>
              )}

              {activeRevisionTab === "photo" && (
                <div className="space-y-4">
                  {photoRevisionItems.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg bg-card">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                        <Badge variant={item.isDone ? "default" : "secondary"} className="ml-2">
                          {item.isDone ? "Done" : "Pending"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Assigned to: {item.assignee}</span>
                        <span>{item.timestamp}</span>
                      </div>
                      
                      {item.hasComment && (
                        <div className="mt-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {item.commentCount} comments
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Shooting Day Tab */}
          <TabsContent value="shooting-day" className="flex-1 px-6 py-4 overflow-y-auto">
            <div className="text-center p-8 border border-dashed rounded-lg">
              <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Shooting day schedule and details coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}