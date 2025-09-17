import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
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
import { Checkbox } from "./ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { CommentsDialog, AddDraftDialog } from "./DialogWithDescription";
import { DatePicker } from "./DatePicker";
import {
  Edit2,
  Maximize2,
  X,
  Calendar as CalendarIcon,
  MessageCircle,
  FileText,
  Camera,
  Menu,
  Check,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  GripVertical,
  Plus,
  Trash2,
  Palette,
  Send,
  User,
  MessageSquare,
  Clock,
  AlertCircle,
  Flame,
  Video,
} from "lucide-react";
import { UploadedFilesSimple } from './UploadedFilesSimple';

// Color options for statuses
const colorOptions = [
  {
    name: "Default",
    bg: "bg-gray-100",
    text: "text-gray-800",
    value: "gray",
  },
  {
    name: "Gray",
    bg: "bg-gray-100",
    text: "text-gray-800",
    value: "gray",
  },
  {
    name: "Brown",
    bg: "bg-amber-100",
    text: "text-amber-800",
    value: "brown",
  },
  {
    name: "Orange",
    bg: "bg-orange-100",
    text: "text-orange-800",
    value: "orange",
  },
  {
    name: "Yellow",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    value: "yellow",
  },
  {
    name: "Green",
    bg: "bg-green-100",
    text: "text-green-800",
    value: "green",
  },
  {
    name: "Blue",
    bg: "bg-blue-100",
    text: "text-blue-800",
    value: "blue",
  },
  {
    name: "Purple",
    bg: "bg-purple-100",
    text: "text-purple-800",
    value: "purple",
  },
  {
    name: "Pink",
    bg: "bg-pink-100",
    text: "text-pink-800",
    value: "pink",
  },
  {
    name: "Red",
    bg: "bg-red-100",
    text: "text-red-800",
    value: "red",
  },
];

// Initial status options with their colors
const initialStatusOptions = [
  { id: "1", value: "shot", label: "Shot", colorValue: "blue" },
  {
    id: "2",
    value: "uploaded",
    label: "Uploaded",
    colorValue: "blue",
  },
  {
    id: "3",
    value: "editing",
    label: "Editing",
    colorValue: "blue",
  },
  {
    id: "4",
    value: "draft-ready",
    label: "Draft Ready to Watch",
    colorValue: "blue",
  },
  {
    id: "5",
    value: "re-edits",
    label: "Re-edits",
    colorValue: "pink",
  },
  {
    id: "6",
    value: "ready-download",
    label: "Ready for Download Link",
    colorValue: "green",
  },
  {
    id: "7",
    value: "send-client",
    label: "Send to Client",
    colorValue: "purple",
  },
  {
    id: "8",
    value: "awaiting-approval",
    label: "Awaiting Client Approval",
    colorValue: "purple",
  },
  {
    id: "9",
    value: "final-edits",
    label: "Final Edits",
    colorValue: "pink",
  },
  {
    id: "10",
    value: "waiting-invoice",
    label: "Waiting for Invoice",
    colorValue: "pink",
  },
  {
    id: "11",
    value: "completed",
    label: "Completed",
    colorValue: "yellow",
  },
  {
    id: "12",
    value: "upload-youtube",
    label: "Upload to Youtube/Drive",
    colorValue: "yellow",
  },
  {
    id: "13",
    value: "waiting-photos",
    label: "Waiting on Photos",
    colorValue: "yellow",
  },
];

// Chat messages type
interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isOwn?: boolean;
}

// Initial chat messages
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
    sender: "Florist",
    message: "Bridal bouquet is ready, delivering at 2:00 PM",
    timestamp: "11:20 AM",
    isOwn: false,
  },
  {
    id: "4",
    sender: "Editor",
    message:
      "Received all the raw files. Will start editing tonight and have the first draft ready by tomorrow evening.",
    timestamp: "2:15 PM",
    isOwn: false,
  },
  {
    id: "5",
    sender: "You",
    message:
      "Great! Please make sure to highlight the ceremony and reception moments",
    timestamp: "2:18 PM",
    isOwn: true,
  },
];

// Revision comment type
interface RevisionComment {
  id: string;
  author: string;
  message: string;
  timestamp: string;
  isOwn?: boolean;
}

// Revision items type
interface RevisionItem {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  isDone: boolean;
  hasComment: boolean;
  commentCount: number;
  timestamp: string;
  assignee?: string;
  comments: RevisionComment[];
}

// Initial revision items
const initialRevisionItems: RevisionItem[] = [
  {
    id: "1",
    title: "Color grading adjustments",
    description:
      "Adjust warm tones in ceremony shots, enhance golden hour lighting",
    priority: "high",
    isDone: false,
    hasComment: true,
    commentCount: 3,
    timestamp: "2 hours ago",
    assignee: "Editor",
    comments: [
      {
        id: "c1-1",
        author: "You",
        message:
          "The ceremony shots look a bit too cool-toned. Can you warm them up?",
        timestamp: "3 hours ago",
        isOwn: true,
      },
      {
        id: "c1-2",
        author: "Editor",
        message:
          "Sure! I'll adjust the temperature and add some warmth to the highlights.",
        timestamp: "2 hours ago",
        isOwn: false,
      },
      {
        id: "c1-3",
        author: "Editor",
        message:
          "Updated the color grading. Please check the latest draft.",
        timestamp: "1 hour ago",
        isOwn: false,
      },
    ],
  },
  {
    id: "2",
    title: "Remove background distraction",
    description:
      "Edit out the photographer in the background during first dance",
    priority: "medium",
    isDone: true,
    hasComment: true,
    commentCount: 1,
    timestamp: "1 day ago",
    assignee: "Editor",
    comments: [
      {
        id: "c2-1",
        author: "Editor",
        message:
          "Successfully removed the background photographer. The shot looks clean now.",
        timestamp: "1 day ago",
        isOwn: false,
      },
    ],
  },
  {
    id: "3",
    title: "Audio sync correction",
    description:
      "Fix audio sync issues during vows - about 0.5 seconds delay",
    priority: "high",
    isDone: false,
    hasComment: false,
    commentCount: 0,
    timestamp: "3 hours ago",
    assignee: "Audio Editor",
    comments: [],
  },
  {
    id: "4",
    title: "Add transition effects",
    description:
      "Smooth transitions between reception and ceremony footage",
    priority: "low",
    isDone: true,
    hasComment: true,
    commentCount: 2,
    timestamp: "2 days ago",
    assignee: "Editor",
    comments: [
      {
        id: "c4-1",
        author: "You",
        message:
          "The transitions between scenes feel a bit abrupt. Can you smooth them out?",
        timestamp: "2 days ago",
        isOwn: true,
      },
      {
        id: "c4-2",
        author: "Editor",
        message:
          "Added crossfade transitions between ceremony and reception. Much smoother now!",
        timestamp: "2 days ago",
        isOwn: false,
      },
    ],
  },
  {
    id: "5",
    title: "Crop group photo",
    description:
      "Crop family group photo to remove empty space on the right",
    priority: "medium",
    isDone: false,
    hasComment: false,
    commentCount: 0,
    timestamp: "1 hour ago",
    assignee: "Photo Editor",
    comments: [],
  },
];

// Initial photo revision items
const initialPhotoRevisionItems: RevisionItem[] = [
  {
    id: "p1",
    title: "Retouch skin imperfections",
    description:
      "Remove blemishes and smooth skin in close-up portraits",
    priority: "high",
    isDone: false,
    hasComment: true,
    commentCount: 2,
    timestamp: "3 hours ago",
    assignee: "Photo Editor",
    comments: [
      {
        id: "pc1-1",
        author: "You",
        message:
          "The bride's close-up shots need some skin retouching. Can you smooth out the blemishes?",
        timestamp: "4 hours ago",
        isOwn: true,
      },
      {
        id: "pc1-2",
        author: "Photo Editor",
        message:
          "I'll work on the skin retouching while keeping it natural looking.",
        timestamp: "3 hours ago",
        isOwn: false,
      },
    ],
  },
  {
    id: "p2",
    title: "Adjust exposure in group photos",
    description:
      "Brighten faces in the family group photo where some are in shadow",
    priority: "medium",
    isDone: true,
    hasComment: true,
    commentCount: 1,
    timestamp: "1 day ago",
    assignee: "Photo Editor",
    comments: [
      {
        id: "pc2-1",
        author: "Photo Editor",
        message:
          "Fixed the exposure in the group photo. All faces are now properly lit.",
        timestamp: "1 day ago",
        isOwn: false,
      },
    ],
  },
  {
    id: "p3",
    title: "Remove photobomber from ceremony shots",
    description:
      "Edit out the person who walked into the background during vows",
    priority: "high",
    isDone: false,
    hasComment: false,
    commentCount: 0,
    timestamp: "2 hours ago",
    assignee: "Photo Editor",
    comments: [],
  },
  {
    id: "p4",
    title: "Enhance golden hour lighting",
    description:
      "Boost the warm tones in the outdoor ceremony photos",
    priority: "low",
    isDone: true,
    hasComment: false,
    commentCount: 0,
    timestamp: "2 days ago",
    assignee: "Photo Editor",
    comments: [],
  },
  {
    id: "p5",
    title: "Crop reception dance photos",
    description:
      "Remove empty space and focus on the dancing couple",
    priority: "medium",
    isDone: false,
    hasComment: false,
    commentCount: 0,
    timestamp: "1 hour ago",
    assignee: "Photo Editor",
    comments: [],
  },
];

interface NotionSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
  defaultTab?: string;
}

export function NotionSlidePanel({ isOpen, onClose, project, defaultTab = "event-details" }: NotionSlidePanelProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [activeSubTab, setActiveSubTab] = useState('video');
  
  // Reset active tab when panel opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);
  
  const [selectedStatus, setSelectedStatus] = useState(
    "waiting-invoice",
  );
  const [statusPopoverOpen, setStatusPopoverOpen] =
    useState(false);
  const [statusOptions, setStatusOptions] = useState(
    initialStatusOptions,
  );
  const [editingStatus, setEditingStatus] = useState<any>(null);
  const [editingLabel, setEditingLabel] = useState("");
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [dragOverIndex, setDragOverIndex] =
    useState<number>(-1);
  const [editPopoverOpen, setEditPopoverOpen] = useState<
    string | null
  >(null);
  const commandListRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [weddingDate, setWeddingDate] = useState<
    Date | undefined
  >(new Date(2025, 5, 21)); // June 21, 2025
  const [editorDueDate, setEditorDueDate] = useState<
    Date | undefined
  >(undefined);
  const [finalDueDate, setFinalDueDate] = useState<
    Date | undefined
  >(new Date(2025, 7, 16)); // August 16, 2025
  const [weddingCalendarOpen, setWeddingCalendarOpen] =
    useState(false);
  const [editorCalendarOpen, setEditorCalendarOpen] =
    useState(false);
  const [finalCalendarOpen, setFinalCalendarOpen] =
    useState(false);

  // Chat state
  const [chatMessages, setChatMessages] = useState<
    ChatMessage[]
  >(initialChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Revision state
  const [revisionItems, setRevisionItems] = useState<
    RevisionItem[]
  >(initialRevisionItems);
  const [photoRevisionItems, setPhotoRevisionItems] = useState<
    RevisionItem[]
  >(initialPhotoRevisionItems);
  const [selectedRevisionId, setSelectedRevisionId] = useState<
    string | null
  >(null);
  const [commentsDialogOpen, setCommentsDialogOpen] =
    useState(false);
  const [newComment, setNewComment] = useState("");
  const commentsScrollRef = useRef<HTMLDivElement>(null);
  
  // Inline comments state
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentPages, setCommentPages] = useState<Record<string, number>>({});

  // File management state
  const [isVideoInfoOpen, setIsVideoInfoOpen] = useState(false);
  const [isPhotoInfoOpen, setIsPhotoInfoOpen] = useState(false);
  
  // Video files data
  const [videoFiles, setVideoFiles] = useState([
    {
      id: 'video-1',
      name: 'Карта памяти 1',
      isUploaded: true,
      isChecked: false,
      fileNumbers: '9892-9900'
    },
    {
      id: 'video-2', 
      name: 'Карта памяти 2',
      isUploaded: true,
      isChecked: false,
      fileNumbers: 'Empty'
    }
  ]);

  // Photo files data
  const [photoFiles, setPhotoFiles] = useState([
    {
      id: 'photo-1',
      name: 'Карта памяти 1',
      isUploaded: true,
      isChecked: true,
      fileNumbers: '000-001, 0095-0097'
    }
  ]);

  // Draft management state
  const [addDraftDialogOpen, setAddDraftDialogOpen] =
    useState(false);
  const [newDraftUrl, setNewDraftUrl] = useState("");
  const [newDraftDescription, setNewDraftDescription] =
    useState("");
  const [resultUrl, setResultUrl] = useState("");

  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return "Select date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to get color classes
  const getStatusColor = (colorValue: string) => {
    const color =
      colorOptions.find((c) => c.value === colorValue) ||
      colorOptions[0];
    return `${color.bg} ${color.text}`;
  };

  // Helper functions for project priority display
  const getPriorityFlameColor = (priority: string) => {
    const colors = {
      'normal': 'text-gray-500',
      'medium': 'text-yellow-500',
      'high': 'text-orange-500',
      'urgent': 'text-red-500'
    };
    return colors[priority as keyof typeof colors] || 'text-gray-500';
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      'normal': 'Normal',
      'medium': 'Medium',
      'high': 'High',
      'urgent': 'Urgent'
    };
    return labels[priority as keyof typeof labels] || 'Normal';
  };

  const getFormatShort = (format: string) => {
    const shortLabels = {
      'video': 'VID',
      'photo': 'PHOTO'
    };
    return shortLabels[format as keyof typeof shortLabels] || format.toUpperCase();
  };

  const getFormatColor = (format: string) => {
    const colors = {
      'video': 'bg-red-100 text-red-800 border-red-200',
      'photo': 'bg-cyan-100 text-cyan-800 border-cyan-200'
    };
    return colors[format as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getProductionStyleShort = (style: string) => {
    const shortLabels = {
      'highlight': 'HL',
      'teaser': 'TZ',
      'documentary': 'DOC',
      'ceremony': 'CER',
      'toasts': 'TST',
      'first-dance': 'FD',
      'first-look': 'FL'
    };
    return shortLabels[style as keyof typeof shortLabels] || style.slice(0, 3).toUpperCase();
  };

  const getProductionStyleColor = (style: string) => {
    const colors = {
      'highlight': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'teaser': 'bg-purple-100 text-purple-800 border-purple-200',
      'documentary': 'bg-blue-100 text-blue-800 border-blue-200',
      'ceremony': 'bg-pink-100 text-pink-800 border-pink-200',
      'toasts': 'bg-orange-100 text-orange-800 border-orange-200',
      'first-dance': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'first-look': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[style as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, status: any) => {
    setDraggedItem(status);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "");

    // Create completely transparent drag image
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.globalAlpha = 0;
      ctx.fillRect(0, 0, 1, 1);
    }
    e.dataTransfer.setDragImage(canvas, 0, 0);

    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  };

  const calculateDragIndex = (mouseY: number) => {
    if (!commandListRef.current) return -1;

    const container = commandListRef.current;
    const items = Array.from(
      container.querySelectorAll("[data-status-id]"),
    );
    const containerRect = container.getBoundingClientRect();

    // If mouse is above container, insert at beginning
    if (mouseY < containerRect.top) {
      return 0;
    }

    // If mouse is below container, insert at end
    if (mouseY > containerRect.bottom) {
      return statusOptions.length;
    }

    // Find insertion point based on mouse position
    let newIndex = statusOptions.length;

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      const rect = item.getBoundingClientRect();
      const itemMiddle = rect.top + rect.height / 2;

      if (mouseY < itemMiddle) {
        newIndex = i;
        break;
      }
    }

    return newIndex;
  };

  const updateDragPosition = (mouseY: number) => {
    if (!isDragging || !draggedItem) return;

    const newIndex = calculateDragIndex(mouseY);

    // Auto-scroll logic
    if (commandListRef.current) {
      const container = commandListRef.current;
      const containerRect = container.getBoundingClientRect();
      const scrollThreshold = 50; // pixels from edge to start scrolling
      const scrollSpeed = 5;

      // Scroll up if mouse is near top
      if (
        mouseY < containerRect.top + scrollThreshold &&
        mouseY > containerRect.top
      ) {
        container.scrollTop = Math.max(
          0,
          container.scrollTop - scrollSpeed,
        );
      }
      // Scroll down if mouse is near bottom
      else if (
        mouseY > containerRect.bottom - scrollThreshold &&
        mouseY < containerRect.bottom
      ) {
        container.scrollTop = Math.min(
          container.scrollHeight - container.clientHeight,
          container.scrollTop + scrollSpeed,
        );
      }
    }

    if (newIndex !== -1 && newIndex !== dragOverIndex) {
      setDragOverIndex(newIndex);

      // Update the array order in real time
      const draggedIndex = statusOptions.findIndex(
        (s) => s.id === draggedItem.id,
      );
      if (draggedIndex !== -1 && draggedIndex !== newIndex) {
        const newOptions = [...statusOptions];
        const [draggedStatus] = newOptions.splice(
          draggedIndex,
          1,
        );

        // Adjust target index if we removed an item before it
        const actualNewIndex =
          newIndex > draggedIndex ? newIndex - 1 : newIndex;
        newOptions.splice(actualNewIndex, 0, draggedStatus);

        setStatusOptions(newOptions);
      }
    }
  };

  // Global drag handlers
  useEffect(() => {
    const handleGlobalDragOver = (e: DragEvent) => {
      if (isDragging && draggedItem) {
        e.preventDefault();
        e.dataTransfer!.dropEffect = "move";
        updateDragPosition(e.clientY);
      }
    };

    const handleGlobalDrop = (e: DragEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    const handleGlobalMouseUp = (e: MouseEvent) => {
      if (isDragging) {
        setDraggedItem(null);
        setDragOverIndex(-1);
        setIsDragging(false);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      }
    };

    if (isDragging) {
      document.addEventListener(
        "dragover",
        handleGlobalDragOver,
      );
      document.addEventListener("drop", handleGlobalDrop);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener(
        "dragover",
        handleGlobalDragOver,
      );
      document.removeEventListener("drop", handleGlobalDrop);
      document.removeEventListener(
        "mouseup",
        handleGlobalMouseUp,
      );
    };
  }, [isDragging, draggedItem, dragOverIndex, statusOptions]);

  const handleDragOver = (e: React.DragEvent) => {
    if (isDragging && draggedItem) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      updateDragPosition(e.clientY);
    }
  };

  // Handle wheel event to ensure scrolling always works
  const handleWheel = (e: React.WheelEvent) => {
    // Always allow wheel events for scrolling - don't preventDefault
    // Just stop propagation to prevent parent handlers
    e.stopPropagation();
  };

  // Handle mouse events in container to allow normal interaction
  const handleContainerMouseMove = (e: React.MouseEvent) => {
    // Don't interfere with normal mouse movement in container
    e.stopPropagation();
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(-1);
    setIsDragging(false);
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  };

  // Handle status actions
  const handleDeleteStatus = (statusId: string) => {
    setStatusOptions((prev) =>
      prev.filter((s) => s.id !== statusId),
    );
    if (
      selectedStatus ===
      statusOptions.find((s) => s.id === statusId)?.value
    ) {
      setSelectedStatus(statusOptions[0]?.value || "");
    }
    setEditPopoverOpen(null);
  };

  const handleOpenEdit = (status: any) => {
    setEditingStatus(status);
    setEditingLabel(status.label);
    setEditPopoverOpen(status.id);
  };

  const handleSaveEdit = () => {
    if (!editingStatus) return;

    setStatusOptions((prev) =>
      prev.map((s) =>
        s.id === editingStatus.id
          ? { ...s, label: editingLabel }
          : s,
      ),
    );
    setEditPopoverOpen(null);
    setEditingStatus(null);
    setEditingLabel("");
  };

  const handleChangeColor = (
    statusId: string,
    colorValue: string,
  ) => {
    setStatusOptions((prev) =>
      prev.map((s) =>
        s.id === statusId ? { ...s, colorValue } : s,
      ),
    );
  };

  const handleAddNewStatus = () => {
    const newStatus = {
      id: Date.now().toString(),
      value: `custom-${Date.now()}`,
      label: "New Status",
      colorValue: "gray",
    };
    setStatusOptions((prev) => [...prev, newStatus]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Chat functions
  const sendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        },
      );

      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: "You",
        message: newMessage.trim(),
        timestamp: currentTime,
        isOwn: true,
      };

      setChatMessages((prev) => [...prev, message]);
      setNewMessage("");

      // Auto scroll to bottom
      setTimeout(() => {
        if (chatScrollRef.current) {
          chatScrollRef.current.scrollTop =
            chatScrollRef.current.scrollHeight;
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

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop =
        chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Revision functions
  const toggleRevisionDone = (id: string) => {
    setRevisionItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isDone: !item.isDone }
          : item,
      ),
    );
  };

  const togglePhotoRevisionDone = (id: string) => {
    setPhotoRevisionItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isDone: !item.isDone }
          : item,
      ),
    );
  };

  const getPriorityColor = (
    priority: RevisionItem["priority"],
  ) => {
    return "border-l-muted-foreground/30 bg-muted/20";
  };

  const getPriorityBadge = (
    priority: RevisionItem["priority"],
  ) => {
    return "bg-muted text-muted-foreground";
  };

  // Comment functions
  const openCommentsDialog = (revisionId: string) => {
    setSelectedRevisionId(revisionId);
    setCommentsDialogOpen(true);
    setNewComment("");
  };

  // Inline comment functions
  const toggleComments = (revisionId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(revisionId)) {
        newSet.delete(revisionId);
      } else {
        newSet.add(revisionId);
        // Initialize page to 1 if not set
        if (!commentPages[revisionId]) {
          setCommentPages(prev => ({ ...prev, [revisionId]: 1 }));
        }
      }
      return newSet;
    });
  };

  const loadMoreComments = (revisionId: string) => {
    setCommentPages(prev => ({
      ...prev,
      [revisionId]: (prev[revisionId] || 1) + 1
    }));
  };

  const addInlineComment = (revisionId: string, message: string) => {
    if (!message.trim()) return;
    
    const newComment = {
      id: `comment-${Date.now()}`,
      author: "You",
      message: message.trim(),
      timestamp: "Just now",
      isOwn: true,
    };

    // Update revision items
    setRevisionItems(prev => prev.map(item => 
      item.id === revisionId 
        ? { 
            ...item, 
            comments: [...(item.comments || []), newComment],
            commentCount: (item.commentCount || 0) + 1,
            hasComment: true
          }
        : item
    ));

    // Update photo revision items
    setPhotoRevisionItems(prev => prev.map(item => 
      item.id === revisionId 
        ? { 
            ...item, 
            comments: [...(item.comments || []), newComment],
            commentCount: (item.commentCount || 0) + 1,
            hasComment: true
          }
        : item
    ));
  };

  // File management functions
  const toggleVideoFileCheck = (fileId: string) => {
    setVideoFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, isChecked: !file.isChecked } : file
    ));
  };

  const togglePhotoFileCheck = (fileId: string) => {
    setPhotoFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, isChecked: !file.isChecked } : file
    ));
  };

  const addVideoFile = () => {
    const newFile = {
      id: `video-${Date.now()}`,
      name: `Карта памяти ${videoFiles.length + 1}`,
      isUploaded: false,
      isChecked: false,
      fileNumbers: ''
    };
    setVideoFiles(prev => [...prev, newFile]);
  };

  const addPhotoFile = () => {
    const newFile = {
      id: `photo-${Date.now()}`,
      name: `Карта памяти ${photoFiles.length + 1}`,
      isUploaded: false,
      isChecked: false,
      fileNumbers: ''
    };
    setPhotoFiles(prev => [...prev, newFile]);
  };

  const closeCommentsDialog = () => {
    setCommentsDialogOpen(false);
    setSelectedRevisionId(null);
    setNewComment("");
  };

  const addComment = () => {
    if (!newComment.trim() || !selectedRevisionId) return;

    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const comment: RevisionComment = {
      id: `c${selectedRevisionId}-${Date.now()}`,
      author: "You",
      message: newComment.trim(),
      timestamp: currentTime,
      isOwn: true,
    };

    setRevisionItems((prev) =>
      prev.map((item) =>
        item.id === selectedRevisionId
          ? {
              ...item,
              comments: [...item.comments, comment],
              commentCount: item.commentCount + 1,
              hasComment: true,
            }
          : item,
      ),
    );

    setNewComment("");

    // Auto scroll to bottom
    setTimeout(() => {
      if (commentsScrollRef.current) {
        commentsScrollRef.current.scrollTop =
          commentsScrollRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleCommentKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addComment();
    }
  };

  const getSelectedRevision = () => {
    return revisionItems.find(
      (item) => item.id === selectedRevisionId,
    );
  };

  // Auto scroll to bottom when comments change
  useEffect(() => {
    if (commentsScrollRef.current) {
      commentsScrollRef.current.scrollTop =
        commentsScrollRef.current.scrollHeight;
    }
  }, [
    revisionItems.find((item) => item.id === selectedRevisionId)
      ?.comments,
  ]);

  // Draft management functions
  const openAddDraftDialog = () => {
    setAddDraftDialogOpen(true);
    setNewDraftUrl("");
    setNewDraftDescription("");
  };

  const closeAddDraftDialog = () => {
    setAddDraftDialogOpen(false);
    setNewDraftUrl("");
    setNewDraftDescription("");
  };

  const addNewDraft = () => {
    if (!newDraftUrl.trim()) return;

    // Here you would typically add the draft to your drafts list
    // For now, we'll just close the dialog
    console.log("New draft added:", {
      url: newDraftUrl,
      description: newDraftDescription,
      timestamp: new Date().toISOString(),
    });

    closeAddDraftDialog();
  };

  const handleDraftKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      addNewDraft();
    }
  };

  const projectTitle = project?.title || "Jessica Crosby & Jackson Knight";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className={`p-0 border-l ${
          isFullscreen
            ? "!w-full !max-w-none"
            : "!w-[60vw] !max-w-[60vw]"
        } transition-all duration-300 [&>button]:hidden`}
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

            <div className="flex items-center gap-3">
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

        {/* Tab Navigation */}
        <div className="flex-1 overflow-hidden">
          <Tabs key={project?.id || 'default'} value={activeTab} onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <TabsList className="w-full h-auto p-1 bg-gray-200 rounded-none border-b">
              <TabsTrigger
                value="event-details"
                className="flex-1 gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <CalendarIcon className="h-4 w-4" />
                Project Info
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="flex-1 gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="revision"
                className="flex-1 gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <FileText className="h-4 w-4" />
                Revision / Draft
              </TabsTrigger>
              <TabsTrigger
                value="shooting"
                className="flex-1 gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Camera className="h-4 w-4" />
                Shooting Day
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              <TabsContent
                value="event-details"
                className="p-6 m-0 h-full"
              >
                <div className="space-y-6">
                  {/* General Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      General Information
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Client */}
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          Client
                        </label>
                        <div className="col-span-2">
                          <p className="text-sm">
                            Jessica Crosby & Jackson Knight's
                            Wedding
                          </p>
                        </div>
                      </div>

                  {/* Wedding Date */}
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Wedding Date
                    </label>
                    <div className="col-span-2">
                      <Popover
                        open={weddingCalendarOpen}
                        onOpenChange={setWeddingCalendarOpen}
                      >
                        <PopoverTrigger asChild>
                          <div
                            className="w-full justify-start h-auto p-2 hover:bg-muted/50 rounded-md border cursor-pointer flex items-center gap-2"
                            onClick={() => {
                              setWeddingCalendarOpen(
                                !weddingCalendarOpen,
                              );
                              setEditorCalendarOpen(false);
                              setFinalCalendarOpen(false);
                            }}
                          >
                            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                            <p className="text-sm">
                              {formatDate(weddingDate)}
                            </p>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <DatePicker
                            selected={weddingDate}
                            onSelect={(date) => {
                              setWeddingDate(date);
                              setWeddingCalendarOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Editor Due Date */}
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Editor Due Date
                    </label>
                    <div className="col-span-2">
                      <Popover
                        open={editorCalendarOpen}
                        onOpenChange={setEditorCalendarOpen}
                      >
                        <PopoverTrigger asChild>
                          <div
                            className="w-full justify-start h-auto p-2 hover:bg-muted/50 rounded-md border cursor-pointer flex items-center gap-2"
                            onClick={() => {
                              setEditorCalendarOpen(
                                !editorCalendarOpen,
                              );
                              setWeddingCalendarOpen(false);
                              setFinalCalendarOpen(false);
                            }}
                          >
                            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                            <p
                              className={`text-sm ${!editorDueDate ? "text-muted-foreground" : ""}`}
                            >
                              {formatDate(editorDueDate)}
                            </p>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <DatePicker
                            selected={editorDueDate}
                            onSelect={(date) => {
                              setEditorDueDate(date);
                              setEditorCalendarOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Status
                    </label>
                    <div className="col-span-2">
                      <Popover
                        open={statusPopoverOpen}
                        onOpenChange={setStatusPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-auto p-0 justify-start hover:bg-transparent"
                          >
                            <Badge
                              variant="secondary"
                              className={`${getStatusColor(statusOptions.find((s) => s.value === selectedStatus)?.colorValue || "gray")} hover:opacity-80 cursor-pointer`}
                            >
                              {statusOptions.find(
                                (s) =>
                                  s.value === selectedStatus,
                              )?.label || "Select Status"}
                              <ChevronDown className="ml-1 h-3 w-3" />
                            </Badge>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-80 p-0"
                          align="start"
                          onPointerDownOutside={(e) => {
                            // Prevent closing when dragging
                            if (isDragging) {
                              e.preventDefault();
                            }
                          }}
                          onEscapeKeyDown={(e) => {
                            // Prevent closing when dragging
                            if (isDragging) {
                              e.preventDefault();
                            }
                          }}
                        >
                          <Command
                            className={`relative overflow-hidden ${isDragging ? "select-none" : ""}`}
                          >
                            <CommandInput placeholder="Select an option or create one" />
                            <div
                              ref={commandListRef}
                              className="max-h-80 overflow-y-auto"
                              onDragOver={handleDragOver}
                              onWheel={handleWheel}
                              onMouseMove={
                                handleContainerMouseMove
                              }
                              style={{
                                // Ensure scrolling is always enabled
                                overflowY: "auto",
                                // Prevent text selection during drag but allow normal interaction
                                userSelect: isDragging
                                  ? "none"
                                  : "auto",
                              }}
                            >
                              <CommandList>
                                <CommandEmpty>
                                  No status found.
                                </CommandEmpty>
                                <CommandGroup className="select-none relative">
                                  {isDragging &&
                                    dragOverIndex >= 0 &&
                                    dragOverIndex <=
                                      statusOptions.length && (
                                      <motion.div
                                        className="absolute left-2 right-2 h-0.5 bg-blue-500 rounded-full z-20"
                                        style={{
                                          top: `${dragOverIndex * 48 + (dragOverIndex === 0 ? 4 : -4)}px`,
                                        }}
                                        initial={{
                                          opacity: 0,
                                          scaleX: 0,
                                        }}
                                        animate={{
                                          opacity: 1,
                                          scaleX: 1,
                                        }}
                                        exit={{
                                          opacity: 0,
                                          scaleX: 0,
                                        }}
                                        transition={{
                                          duration: 0.15,
                                        }}
                                      />
                                    )}
                                  {statusOptions.map(
                                    (status, index) => {
                                      const isCurrentlyDragging =
                                        draggedItem?.id ===
                                        status.id;

                                      return (
                                        <motion.div
                                          key={status.id}
                                          layout
                                          animate={{
                                            opacity:
                                              isCurrentlyDragging
                                                ? 0.4
                                                : 1,
                                            scale:
                                              isCurrentlyDragging
                                                ? 0.96
                                                : 1,
                                          }}
                                          transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 35,
                                            opacity: {
                                              duration: 0.15,
                                            },
                                            scale: {
                                              duration: 0.15,
                                            },
                                          }}
                                        >
                                          <CommandItem
                                            value={status.value}
                                            data-status-id={
                                              status.id
                                            }
                                            onSelect={() => {
                                              if (
                                                !isCurrentlyDragging &&
                                                !isDragging
                                              ) {
                                                setSelectedStatus(
                                                  status.value,
                                                );
                                                setStatusPopoverOpen(
                                                  false,
                                                );
                                              }
                                            }}
                                            className={`group flex items-center gap-2 p-2 rounded-md relative hover:bg-muted/50 ${isCurrentlyDragging ? "cursor-grabbing" : "cursor-default"}`}
                                            style={{
                                              height: "48px",
                                            }}
                                            draggable
                                            onDragStart={(e) =>
                                              handleDragStart(
                                                e,
                                                status,
                                              )
                                            }
                                            onDragEnd={
                                              handleDragEnd
                                            }
                                          >
                                            <div className="flex items-center gap-2 w-full">
                                              <GripVertical
                                                className={`h-4 w-4 text-gray-400 transition-colors ${
                                                  isCurrentlyDragging
                                                    ? "cursor-grabbing text-blue-500"
                                                    : "cursor-grab hover:text-gray-600"
                                                }`}
                                              />
                                              <Badge
                                                variant="secondary"
                                                className={`${getStatusColor(status.colorValue)} text-xs px-2 py-0.5`}
                                              >
                                                {status.label}
                                              </Badge>
                                              {selectedStatus ===
                                                status.value && (
                                                <Check className="h-4 w-4 ml-auto" />
                                              )}
                                              <Popover
                                                open={
                                                  editPopoverOpen ===
                                                  status.id
                                                }
                                                onOpenChange={(
                                                  open,
                                                ) =>
                                                  setEditPopoverOpen(
                                                    open
                                                      ? status.id
                                                      : null,
                                                  )
                                                }
                                              >
                                                <PopoverTrigger
                                                  asChild
                                                >
                                                  <div
                                                    className="h-6 w-6 p-0 ml-auto cursor-pointer hover:bg-muted rounded flex items-center justify-center"
                                                    onClick={(
                                                      e,
                                                    ) => {
                                                      e.stopPropagation();
                                                      handleOpenEdit(
                                                        status,
                                                      );
                                                    }}
                                                  >
                                                    <MoreHorizontal className="h-3 w-3" />
                                                  </div>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                  className="w-72 p-4"
                                                  align="end"
                                                  side="right"
                                                >
                                                  <div className="space-y-4">
                      <UploadedFilesSimple />
                                                    {/* Edit Name */}
                                                    <div className="space-y-2">
                                                      <Input
                                                        value={
                                                          editingLabel
                                                        }
                                                        onChange={(
                                                          e,
                                                        ) =>
                                                          setEditingLabel(
                                                            e
                                                              .target
                                                              .value,
                                                          )
                                                        }
                                                        placeholder="Status name"
                                                        className="w-full"
                                                        onKeyDown={(
                                                          e,
                                                        ) => {
                                                          if (
                                                            e.key ===
                                                            "Enter"
                                                          ) {
                                                            handleSaveEdit();
                                                          }
                                                        }}
                                                        onBlur={
                                                          handleSaveEdit
                                                        }
                                                      />
                                                    </div>

                                                    {/* Delete Button */}
                                                    <Button
                                                      variant="ghost"
                                                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                                      onClick={() =>
                                                        handleDeleteStatus(
                                                          status.id,
                                                        )
                                                      }
                                                    >
                                                      <Trash2 className="h-4 w-4 mr-2" />
                                                      Delete
                                                    </Button>

                                                    {/* Colors */}
                                                    <div className="space-y-3">
                                                      <h4 className="text-sm text-muted-foreground">
                                                        Colors
                                                      </h4>
                                                      <div className="space-y-2">
                                                        {colorOptions.map(
                                                          (
                                                            color,
                                                          ) => (
                                                            <div
                                                              key={
                                                                color.value
                                                              }
                                                              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded"
                                                              onClick={() =>
                                                                handleChangeColor(
                                                                  status.id,
                                                                  color.value,
                                                                )
                                                              }
                                                            >
                                                              <div
                                                                className={`w-4 h-4 rounded ${color.bg} border border-gray-200`}
                                                              ></div>
                                                              <span className="text-sm flex-1">
                                                                {
                                                                  color.name
                                                                }
                                                              </span>
                                                              {status.colorValue ===
                                                                color.value && (
                                                                <Check className="h-4 w-4 text-blue-600" />
                                                              )}
                                                            </div>
                                                          ),
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </PopoverContent>
                                              </Popover>
                                            </div>
                                          </CommandItem>
                                        </motion.div>
                                      );
                                    },
                                  )}
                                  <CommandItem
                                    onSelect={
                                      handleAddNewStatus
                                    }
                                    className="flex items-center gap-2 p-2 text-blue-600 cursor-pointer"
                                  >
                                    <Plus className="h-4 w-4" />
                                    <span>Add New Status</span>
                                  </CommandItem>
                                </CommandGroup>
                              </CommandList>
                            </div>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Brand */}
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Brand
                    </label>
                    <div className="col-span-2">
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-800 hover:bg-orange-100"
                      >
                        314 Collective
                      </Badge>
                    </div>
                  </div>

                  {/* Final Due Date */}
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Final Due Date
                    </label>
                    <div className="col-span-2">
                      <Popover
                        open={finalCalendarOpen}
                        onOpenChange={setFinalCalendarOpen}
                      >
                        <PopoverTrigger asChild>
                          <div
                            className="w-full justify-start h-auto p-2 hover:bg-muted/50 rounded-md border cursor-pointer flex items-center gap-2"
                            onClick={() => {
                              setFinalCalendarOpen(
                                !finalCalendarOpen,
                              );
                              setWeddingCalendarOpen(false);
                              setEditorCalendarOpen(false);
                            }}
                          >
                            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                            <p className="text-sm">
                              {formatDate(finalDueDate)}
                            </p>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <DatePicker
                            selected={finalDueDate}
                            onSelect={(date) => {
                              setFinalDueDate(date);
                              setFinalCalendarOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Packages */}
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Packages
                    </label>
                    <div className="col-span-2 flex gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 hover:bg-green-100"
                      >
                        Deluxe Photo
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-800 hover:bg-orange-100"
                      >
                        Basic Film
                      </Badge>
                    </div>
                  </div>

                  {/* Add-Ons */}
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Add-Ons
                    </label>
                    <div className="col-span-2">
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-800 hover:bg-orange-100"
                      >
                        Engagement Shoot
                      </Badge>
                    </div>
                  </div>

                  {/* Editor Status */}
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Editor Status
                    </label>
                    <div className="col-span-2">
                      <Badge
                        variant="destructive"
                        className="bg-red-100 text-red-800 hover:bg-red-100"
                      >
                        Not Paid
                      </Badge>
                    </div>
                  </div>

                  {/* Invoice # */}
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Invoice #
                    </label>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">
                        Empty
                      </p>
                    </div>
                  </div>

                  {/* Shooter Notes */}
                  <div className="grid grid-cols-3 items-start gap-4">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Shooter Notes
                    </label>
                    <div className="col-span-2">
                      <p className="text-sm leading-relaxed">
                        LOTS of good dancing photos to pick
                        from. Got group photos outside of
                        everyone who went to the same school
                        during the reception. They did a special
                        blessing right before dinner. Got a shot
                        of the rosary on the bouquet. Shots from
                        cocktail hour of them interacting with
                        guests too. Lots of detail shots of
                        reception space. Both bride and groom
                        went to Clemson, so there a shot of
                        their rings together at the beginning of
                        the day. They cried during toasts, got a
                        lot of sweet photos of them looking at
                        each other during toasts. Bride's mom
                        had me take some group photos during
                        reception, so be sure to include those
                        too. - Garrett
                      </p>
                    </div>
                  </div>

                  {/* Client Status */}
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Client Status
                    </label>
                    <div className="col-span-2">
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-800 hover:bg-orange-100"
                      >
                        Final Balance Due
                      </Badge>
                    </div>
                  </div>

                      {/* Editor */}
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <Edit2 className="w-4 h-4" />
                          Editor
                        </label>
                        <div className="col-span-2">
                          <p className="text-sm text-muted-foreground">
                            Empty
                          </p>
                        </div>
                      </div>

                      {/* Project Type */}
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          Project Type
                        </label>
                        <div className="col-span-2">
                          <p className="text-sm">
                            {project?.projectType || 'Photo+Video'}
                          </p>
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          Venue
                        </label>
                        <div className="col-span-2">
                          <p className="text-sm">
                            {project?.venue || 'Huguenot Mill'}
                          </p>
                        </div>
                      </div>

                      {/* Editors */}
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          Editors
                        </label>
                        <div className="col-span-2">
                          <div className="flex flex-wrap gap-1">
                            {(project?.editors || ['David Kim', 'Lisa Rodriguez']).map((name: string) => (
                              <Badge key={name} variant="secondary" className="text-xs">
                                {name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Client Wishes */}
                      <div className="grid grid-cols-3 items-start gap-4">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          Client Wishes
                        </label>
                        <div className="col-span-2">
                          <p className="text-sm">
                            {project?.clientWishes || 'Prefer natural lighting and candid moments'}
                          </p>
                        </div>
                      </div>

                      {/* Backup Plan */}
                      <div className="grid grid-cols-3 items-start gap-4">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          Backup Plan
                        </label>
                        <div className="col-span-2">
                          <p className="text-sm">
                            {project?.backupPlan || 'Indoor ceremony hall available if weather is bad'}
                          </p>
                        </div>
                      </div>

                      {/* Weather Plan */}
                      <div className="grid grid-cols-3 items-start gap-4">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          Weather Plan
                        </label>
                        <div className="col-span-2">
                          <p className="text-sm">
                            {project?.weatherPlan || 'Covered areas available, umbrellas provided'}
                          </p>
                        </div>
                      </div>

                      {/* Revision Rounds */}
                      <div className="grid grid-cols-3 items-start gap-4">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          Revision Rounds
                        </label>
                        <div className="col-span-2">
                          <p className="text-sm">
                            {project?.revisionRounds || '2 rounds included, additional rounds $200 each'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* Video Information Accordion - only show for Video projects */}
                  {project?.type === 'Video' && (
                    <Collapsible open={isVideoInfoOpen} onOpenChange={setIsVideoInfoOpen}>
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Video className="h-5 w-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-blue-900">Video Information</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            2/2
                          </Badge>
                          <ChevronDown className={`h-4 w-4 text-blue-600 transition-transform ${isVideoInfoOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-4">
                      <div className="bg-white rounded-lg border p-4 space-y-4">
                        {/* Video-specific parameters */}
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Videographers
                          </label>
                          <div className="col-span-2">
                            <div className="flex flex-wrap gap-1">
                              {(project?.videographers || ['Mike Chen', 'Sarah Wilson']).map((name: string) => (
                                <Badge key={name} variant="secondary" className="text-xs">
                                  {name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Music Choice
                          </label>
                          <div className="col-span-2">
                            <p className="text-sm">
                              {project?.musicChoice || "Editor's Choice"}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Deliverables
                          </label>
                          <div className="col-span-2">
                            <div className="flex flex-wrap gap-1">
                              {(project?.deliverables || ['Highlight', 'Teaser']).map((item: string) => (
                                <Badge key={item} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Post Production
                          </label>
                          <div className="col-span-2">
                            <p className="text-sm">
                              {project?.postProduction || 'Color grading, audio enhancement, 4K delivery'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Delivery Format
                          </label>
                          <div className="col-span-2">
                            <p className="text-sm">
                              {project?.deliveryFormat || 'MP4, 4K, USB drive + online gallery'}
                            </p>
                          </div>
                        </div>

                        {/* Video Files */}
                        <div className="pt-4 border-t border-blue-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Video className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">Загруженные видео файлы</span>
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                              {videoFiles.filter(f => f.isUploaded).length}/{videoFiles.length}
                            </Badge>
                          </div>
                          <div className="space-y-3">
                            {videoFiles.map((file) => (
                              <div key={file.id} className="space-y-2">
                                {/* Uploaded status */}
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Checkbox checked={file.isUploaded} />
                                    {file.name} - uploaded
                                  </label>
                                  <div className="col-span-2">
                                    <Checkbox 
                                      checked={file.isChecked} 
                                      onCheckedChange={() => toggleVideoFileCheck(file.id)}
                                    />
                                  </div>
                                </div>
                                {/* File numbers */}
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    {file.name} - file #s
                                  </label>
                                  <div className="col-span-2">
                                    <p className="text-sm">
                                      {file.fileNumbers || 'Не указано'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {/* Add button */}
                            <div className="pt-2 border-t border-muted/30">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-xs text-muted-foreground hover:text-foreground"
                                onClick={addVideoFile}
                              >
                                <Plus className="h-3 w-3 mr-2" />
                                Добавить карту памяти
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  )}

                  {/* Photo Information Accordion - only show for Photo projects */}
                  {project?.type === 'Photo' && (
                  <Collapsible open={isPhotoInfoOpen} onOpenChange={setIsPhotoInfoOpen}>
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Camera className="h-5 w-5 text-green-600" />
                          <h3 className="text-lg font-semibold text-green-900">Photo Information</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            1/1
                          </Badge>
                          <ChevronDown className={`h-4 w-4 text-green-600 transition-transform ${isPhotoInfoOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-4">
                      <div className="bg-white rounded-lg border p-4 space-y-4">
                        {/* Photo-specific parameters */}
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            Photographers
                          </label>
                          <div className="col-span-2">
                            <div className="flex flex-wrap gap-1">
                              {(project?.photographers || ['Alex Johnson', 'Emma Davis']).map((name: string) => (
                                <Badge key={name} variant="secondary" className="text-xs">
                                  {name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            Retouching Level
                          </label>
                          <div className="col-span-2">
                            <p className="text-sm">
                              {project?.retouchingLevel || 'Advanced'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            Equipment
                          </label>
                          <div className="col-span-2">
                            <p className="text-sm">
                              {project?.equipment || 'Canon EOS R5, 24-70mm lens, Drone'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            Special Requirements
                          </label>
                          <div className="col-span-2">
                            <p className="text-sm">
                              {project?.specialRequirements || 'Accessibility ramp needed for ceremony'}
                            </p>
                          </div>
                        </div>

                        {/* Photo Files */}
                        <div className="pt-4 border-t border-green-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Camera className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-900">Загруженные фото файлы</span>
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              {photoFiles.filter(f => f.isUploaded).length}/{photoFiles.length}
                            </Badge>
                          </div>
                          <div className="space-y-3">
                            {photoFiles.map((file) => (
                              <div key={file.id} className="space-y-2">
                                {/* Uploaded status */}
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Checkbox checked={file.isUploaded} />
                                    {file.name} - uploaded
                                  </label>
                                  <div className="col-span-2">
                                    <Checkbox 
                                      checked={file.isChecked} 
                                      onCheckedChange={() => togglePhotoFileCheck(file.id)}
                                    />
                                  </div>
                                </div>
                                {/* File numbers */}
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    {file.name} - file #s
                                  </label>
                                  <div className="col-span-2">
                                    <p className="text-sm">
                                      {file.fileNumbers || 'Не указано'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {/* Add button */}
                            <div className="pt-2 border-t border-muted/30">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-xs text-muted-foreground hover:text-foreground"
                                onClick={addPhotoFile}
                              >
                                <Plus className="h-3 w-3 mr-2" />
                                Добавить карту памяти
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value="chat"
                className="p-0 m-0 h-full flex flex-col"
              >
                {/* Chat Header */}
                <div className="px-6 py-4 border-b bg-background/95">
                  <h3 className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Team Chat
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Communicate with your wedding team
                  </p>
                </div>

                {/* Chat Messages Area */}
                <div
                  ref={chatScrollRef}
                  className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
                >
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex-shrink-0 ${message.isOwn ? "order-2" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                            message.isOwn
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {message.isOwn ? (
                            "Y"
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </div>
                      </div>

                      {/* Message Content */}
                      <div
                        className={`flex-1 ${message.isOwn ? "text-right" : ""}`}
                      >
                        <div
                          className={`inline-block max-w-[80%] ${message.isOwn ? "text-right" : "text-left"}`}
                        >
                          {/* Sender name and timestamp */}
                          <div
                            className={`flex items-center gap-2 mb-1 ${message.isOwn ? "flex-row-reverse" : ""}`}
                          >
                            <span className="text-xs text-muted-foreground">
                              {message.sender}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp}
                            </span>
                          </div>

                          {/* Message bubble */}
                          <div
                            className={`p-3 rounded-lg break-words ${
                              message.isOwn
                                ? "bg-primary text-primary-foreground rounded-br-sm"
                                : "bg-muted text-foreground rounded-bl-sm"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">
                              {message.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input Area */}
                <div className="border-t bg-background/95 p-4">
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <Textarea
                        value={newMessage}
                        onChange={(e) =>
                          setNewMessage(e.target.value)
                        }
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        className="min-h-[44px] max-h-32 resize-none bg-background border-border focus:border-primary/50 transition-colors"
                        rows={1}
                      />
                    </div>
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      size="sm"
                      className="h-11 px-4 gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>

                  {/* Helper text */}
                  <p className="text-xs text-muted-foreground mt-2 px-1">
                    Press Enter to send, Shift + Enter for new
                    line
                  </p>
                </div>
              </TabsContent>

              <TabsContent
                value="revision"
                className="p-0 m-0 h-full flex flex-col"
              >
                {/* Revision Header */}
                <div className="px-6 py-4 border-b bg-background/95">
                  <h3 className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Revisions & Drafts
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track editing changes and feedback
                  </p>
                </div>

                {/* Sub-tabs for Video and Photo */}
                <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="flex-1 flex flex-col">
                  <TabsList className="w-full h-auto p-1 bg-gray-200 rounded-none border-b">
                    <TabsTrigger
                      value="video"
                      className="flex-1 gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      <Video className="h-4 w-4" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger
                      value="photo"
                      className="flex-1 gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      <Camera className="h-4 w-4" />
                      Photo
                    </TabsTrigger>
                  </TabsList>

                  {/* Video Content */}
                  <TabsContent value="video" className="p-0 m-0 h-full flex flex-col">
                    {/* Version Links & Actions */}
                    <div className="px-6 py-3 border-b bg-muted/20">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm text-muted-foreground">
                            Versions
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 gap-1.5 text-xs"
                            onClick={openAddDraftDialog}
                          >
                            <Plus className="h-3 w-3" />
                            Add Draft
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <Button
                            variant="link"
                            className="h-auto p-0 text-blue-600 hover:text-blue-700 hover:no-underline"
                          >
                            Draft v3.2
                            <Badge
                              variant="secondary"
                              className="ml-2 text-xs px-1.5 py-0.5 bg-green-100 text-green-800 hover:bg-green-100"
                            >
                              Latest
                            </Badge>
                          </Button>
                          <span className="text-muted-foreground">
                            •
                          </span>
                          <Button
                            variant="link"
                            className="h-auto p-0 text-blue-600 hover:text-blue-700 hover:no-underline"
                          >
                            Draft v3.1
                          </Button>
                          <span className="text-muted-foreground">
                            •
                          </span>
                          <Button
                            variant="link"
                            className="h-auto p-0 text-blue-600 hover:text-blue-700 hover:no-underline"
                          >
                            Draft v3.0
                          </Button>
                          <span className="text-muted-foreground">
                            •
                          </span>
                          <Button
                            variant="link"
                            className="h-auto p-0 text-blue-600 hover:text-blue-700 hover:no-underline"
                          >
                            Draft v2.1
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Result Link */}
                    <div className="px-6 py-3 border-b bg-muted/10">
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">
                          Final Result Link
                        </label>
                        <div className="flex gap-2">
                          <Input
                            value={resultUrl}
                            onChange={(e) =>
                              setResultUrl(e.target.value)
                            }
                            placeholder="https://drive.google.com/..."
                            className="flex-1 h-8 text-sm"
                          />
                          {resultUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 text-xs"
                              onClick={() =>
                                window.open(resultUrl, "_blank")
                              }
                            >
                              Open
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Revision Stats */}
                    <div className="px-6 py-2 border-b bg-muted/10">
                      <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {
                          revisionItems.filter(
                            (item) => item.isDone,
                          ).length
                        }{" "}
                        Done
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {
                          revisionItems.filter(
                            (item) => !item.isDone,
                          ).length
                        }{" "}
                        Pending
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {revisionItems.reduce(
                          (total, item) =>
                            total + item.commentCount,
                          0,
                        )}{" "}
                        Comments
                      </span>
                    </div>
                  </div>
                </div>

                    {/* Revision Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-3">
                      <div className="space-y-2">
                        {revisionItems.map((item) => (
                          <div
                            key={item.id}
                            className={`p-3 rounded-md border-l-2 bg-card hover:bg-muted/30 transition-all duration-150 shadow-sm ${getPriorityColor(
                              item.priority,
                            )} ${item.isDone ? "opacity-60" : ""}`}
                          >
                        {/* Main Row */}
                        <div className="flex items-center gap-3">
                          {/* Done Checkbox */}
                          <div className="flex-shrink-0">
                            <Checkbox
                              checked={item.isDone}
                              onCheckedChange={() =>
                                toggleRevisionDone(item.id)
                              }
                              className="h-4 w-4"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4
                                className={`text-sm ${item.isDone ? "line-through text-muted-foreground" : "text-foreground"}`}
                              >
                                {item.title}
                              </h4>
                              <Badge
                                variant="secondary"
                                className={`text-xs px-1.5 py-0.5 h-5 ${getPriorityBadge(item.priority)}`}
                              >
                                {item.priority}
                              </Badge>
                            </div>

                            {/* Description */}
                            <p
                              className={`text-xs leading-snug ${
                                item.isDone
                                  ? "line-through text-muted-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>

                          {/* Right Side Actions */}
                          <div className="flex-shrink-0 flex items-center gap-2">
                            {/* Comment Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 w-7 p-0 relative ${
                                item.hasComment
                                  ? "text-foreground hover:bg-muted"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                              onClick={() => toggleComments(item.id)}
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                              {item.commentCount > 0 && (
                                <span className="absolute -top-1 -right-1 text-xs bg-muted-foreground text-background rounded-full h-4 w-4 flex items-center justify-center">
                                  {item.commentCount}
                                </span>
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Footer Row */}
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-3">
                            {item.assignee && (
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {item.assignee}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.timestamp}
                            </span>
                          </div>

                          {/* Status Indicator */}
                          <div className="flex items-center gap-1">
                            {item.isDone ? (
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Check className="h-3 w-3" />
                                Done
                              </span>
                            ) : item.priority === "high" ? (
                              <span className="text-foreground flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Urgent
                              </span>
                            ) : (
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Pending
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Inline Comments */}
                        {expandedComments.has(item.id) && (
                          <div className="mt-3 pt-3 border-t border-muted/30">
                            <div className="space-y-3">
                              {/* Comments List */}
                              {item.comments && item.comments.length > 0 && (
                                <div className="space-y-2">
                                  {item.comments
                                    .slice(0, (commentPages[item.id] || 1) * 2)
                                    .map((comment) => (
                                      <div
                                        key={comment.id}
                                        className={`p-2 rounded-md text-xs ${
                                          comment.isOwn
                                            ? "bg-blue-50 border-l-2 border-blue-200"
                                            : "bg-muted/30"
                                        }`}
                                      >
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-medium text-xs">
                                            {comment.author}
                                          </span>
                                          <span className="text-muted-foreground">
                                            {comment.timestamp}
                                          </span>
                                        </div>
                                        <p className="text-xs leading-relaxed">
                                          {comment.message}
                                        </p>
                                      </div>
                                    ))}
                                  
                                  {/* Load More Button */}
                                  {item.comments.length > (commentPages[item.id] || 1) * 2 && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 text-xs text-muted-foreground hover:text-foreground"
                                      onClick={() => loadMoreComments(item.id)}
                                    >
                                      Смотреть все ({item.comments.length} сообщений)
                                    </Button>
                                  )}
                                </div>
                              )}

                              {/* Add Comment Form */}
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Добавить комментарий..."
                                  className="flex-1 h-8 text-xs"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                      addInlineComment(item.id, e.currentTarget.value);
                                      e.currentTarget.value = '';
                                    }
                                  }}
                                />
                                <Button
                                  size="sm"
                                  className="h-8 px-3 text-xs"
                                  onClick={(e) => {
                                    const input = e.currentTarget.parentElement?.querySelector('input');
                                    if (input?.value.trim()) {
                                      addInlineComment(item.id, input.value);
                                      input.value = '';
                                    }
                                  }}
                                >
                                  <Send className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add New Revision */}
                  <div className="mt-4 pt-3 border-t">
                    <Button
                      variant="outline"
                      className="w-full gap-2 h-9 text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add New Revision Request
                    </Button>
                  </div>
                </div>
              </TabsContent>

                  {/* Photo Content */}
                  <TabsContent value="photo" className="p-0 m-0 h-full flex flex-col">
                    {/* Version Links & Actions */}
                    <div className="px-6 py-3 border-b bg-muted/20">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm text-muted-foreground">
                            Photo Versions
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 gap-1.5 text-xs"
                            onClick={openAddDraftDialog}
                          >
                            <Plus className="h-3 w-3" />
                            Add Photo Set
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <Button
                            variant="link"
                            className="h-auto p-0 text-blue-600 hover:text-blue-700 hover:no-underline"
                          >
                            Photo Set v2.1
                            <Badge
                              variant="secondary"
                              className="ml-2 text-xs px-1.5 py-0.5 bg-green-100 text-green-800 hover:bg-green-100"
                            >
                              Latest
                            </Badge>
                          </Button>
                          <span className="text-muted-foreground">
                            •
                          </span>
                          <Button
                            variant="link"
                            className="h-auto p-0 text-blue-600 hover:text-blue-700 hover:no-underline"
                          >
                            Photo Set v2.0
                          </Button>
                          <span className="text-muted-foreground">
                            •
                          </span>
                          <Button
                            variant="link"
                            className="h-auto p-0 text-blue-600 hover:text-blue-700 hover:no-underline"
                          >
                            Photo Set v1.5
                          </Button>
                          <span className="text-muted-foreground">
                            •
                          </span>
                          <Button
                            variant="link"
                            className="h-auto p-0 text-blue-600 hover:text-blue-700 hover:no-underline"
                          >
                            Photo Set v1.0
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Result Link */}
                    <div className="px-6 py-3 border-b bg-muted/10">
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">
                          Final Photo Gallery Link
                        </label>
                        <div className="flex gap-2">
                          <Input
                            value={resultUrl}
                            onChange={(e) =>
                              setResultUrl(e.target.value)
                            }
                            placeholder="https://photos.google.com/..."
                            className="flex-1 h-8 text-sm"
                          />
                          {resultUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 text-xs"
                              onClick={() =>
                                window.open(resultUrl, "_blank")
                              }
                            >
                              Open
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Photo Stats */}
                    <div className="px-6 py-2 border-b bg-muted/10">
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {
                              photoRevisionItems.filter(
                                (item) => item.isDone,
                              ).length
                            }{" "}
                            Done
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {
                              photoRevisionItems.filter(
                                (item) => !item.isDone,
                              ).length
                            }{" "}
                            Pending
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageSquare className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {photoRevisionItems.reduce(
                              (total, item) =>
                                total + item.commentCount,
                              0,
                            )}{" "}
                            Comments
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Photo Revision Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-3">
                      <div className="space-y-2">
                        {photoRevisionItems.map((item) => (
                          <div
                            key={item.id}
                            className={`p-3 rounded-md border-l-2 bg-card hover:bg-muted/30 transition-all duration-150 shadow-sm ${getPriorityColor(
                              item.priority,
                            )} ${item.isDone ? "opacity-60" : ""}`}
                          >
                            {/* Main Row */}
                            <div className="flex items-center gap-3">
                              {/* Done Checkbox */}
                              <div className="flex-shrink-0">
                                <Checkbox
                                  checked={item.isDone}
                                  onCheckedChange={() =>
                                    togglePhotoRevisionDone(item.id)
                                  }
                                  className="h-4 w-4"
                                />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4
                                    className={`text-sm ${item.isDone ? "line-through text-muted-foreground" : "text-foreground"}`}
                                  >
                                    {item.title}
                                  </h4>
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs px-1.5 py-0.5 h-5 ${getPriorityBadge(item.priority)}`}
                                  >
                                    {item.priority}
                                  </Badge>
                                </div>

                                {/* Description */}
                                <p
                                  className={`text-xs leading-snug ${
                                    item.isDone
                                      ? "line-through text-muted-foreground"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {item.description}
                                </p>
                              </div>

                              {/* Right Side Actions */}
                              <div className="flex-shrink-0 flex items-center gap-2">
                                <div className="text-xs text-muted-foreground">
                                  {item.assignee}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {item.timeAgo}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 relative"
                                  onClick={() => toggleComments(item.id)}
                                >
                                  <MessageSquare className="h-3 w-3" />
                                  {item.commentCount > 0 && (
                                    <span className="absolute -top-1 -right-1 text-xs bg-muted-foreground text-background rounded-full h-4 w-4 flex items-center justify-center">
                                      {item.commentCount}
                                    </span>
                                  )}
                                </Button>
                              </div>
                            </div>

                            {/* Inline Comments */}
                            {expandedComments.has(item.id) && (
                              <div className="mt-3 pt-3 border-t border-muted/30">
                                <div className="space-y-3">
                                  {/* Comments List */}
                                  {item.comments && item.comments.length > 0 && (
                                    <div className="space-y-2">
                                      {item.comments
                                        .slice(0, (commentPages[item.id] || 1) * 2)
                                        .map((comment) => (
                                          <div
                                            key={comment.id}
                                            className={`p-2 rounded-md text-xs ${
                                              comment.isOwn
                                                ? "bg-blue-50 border-l-2 border-blue-200"
                                                : "bg-muted/30"
                                            }`}
                                          >
                                            <div className="flex items-center gap-2 mb-1">
                                              <span className="font-medium text-xs">
                                                {comment.author}
                                              </span>
                                              <span className="text-muted-foreground">
                                                {comment.timestamp}
                                              </span>
                                            </div>
                                            <p className="text-xs leading-relaxed">
                                              {comment.message}
                                            </p>
                                          </div>
                                        ))}
                                      
                                      {/* Load More Button */}
                                      {item.comments.length > (commentPages[item.id] || 1) * 2 && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 text-xs text-muted-foreground hover:text-foreground"
                                          onClick={() => loadMoreComments(item.id)}
                                        >
                                          Смотреть все ({item.comments.length} сообщений)
                                        </Button>
                                      )}
                                    </div>
                                  )}

                                  {/* Add Comment Form */}
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Добавить комментарий..."
                                      className="flex-1 h-8 text-xs"
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                          addInlineComment(item.id, e.currentTarget.value);
                                          e.currentTarget.value = '';
                                        }
                                      }}
                                    />
                                    <Button
                                      size="sm"
                                      className="h-8 px-3 text-xs"
                                      onClick={(e) => {
                                        const input = e.currentTarget.parentElement?.querySelector('input');
                                        if (input?.value.trim()) {
                                          addInlineComment(item.id, input.value);
                                          input.value = '';
                                        }
                                      }}
                                    >
                                      <Send className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t">
                        <Button
                          variant="outline"
                          className="w-full gap-2 h-9 text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Add New Photo Revision Request
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent
                value="shooting"
                className="p-6 m-0 h-full"
              >
                <div className="space-y-4">
                  <h3 className="mb-4">Shooting Day</h3>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="mb-2">
                        Shooting Timeline
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>2:00 PM - Bridal prep</span>
                          <span className="text-muted-foreground">
                            30 min
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>2:30 PM - Groom arrival</span>
                          <span className="text-muted-foreground">
                            15 min
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>3:00 PM - Ceremony</span>
                          <span className="text-muted-foreground">
                            45 min
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>4:00 PM - Photo session</span>
                          <span className="text-muted-foreground">
                            60 min
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>5:30 PM - Reception</span>
                          <span className="text-muted-foreground">
                            3 hours
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="mb-2">Equipment</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• 2 Canon EOS R5 cameras</li>
                        <li>• 24-70mm, 85mm lenses</li>
                        <li>• Studio lighting</li>
                        <li>• Drone for aerial shots</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </SheetContent>

      {/* Comments Dialog */}
      <Dialog
        open={commentsDialogOpen}
        onOpenChange={setCommentsDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="flex items-center gap-2 text-left">
              <MessageSquare className="h-5 w-5" />
              Comments
            </DialogTitle>
            {getSelectedRevision() && (
              <div className="text-sm text-muted-foreground text-left mt-2">
                <p className="font-medium text-foreground">
                  {getSelectedRevision()?.title}
                </p>
                <p className="text-xs">
                  {getSelectedRevision()?.description}
                </p>
              </div>
            )}
          </DialogHeader>

          {/* Comments Area */}
          <div className="flex-1 flex flex-col min-h-0">
            {getSelectedRevision()?.comments.length === 0 ? (
              // Empty state
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-sm font-medium mb-2">
                    No comments yet
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Start the conversation by adding a comment
                    below.
                  </p>
                </div>
              </div>
            ) : (
              // Comments list
              <div
                ref={commentsScrollRef}
                className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
              >
                {getSelectedRevision()?.comments.map(
                  (comment) => (
                    <div
                      key={comment.id}
                      className={`flex gap-3 ${comment.isOwn ? "flex-row-reverse" : ""}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex-shrink-0 ${comment.isOwn ? "order-2" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                            comment.isOwn
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {comment.isOwn
                            ? "Y"
                            : comment.author
                                .charAt(0)
                                .toUpperCase()}
                        </div>
                      </div>

                      {/* Comment Content */}
                      <div
                        className={`flex-1 ${comment.isOwn ? "text-right" : ""}`}
                      >
                        <div
                          className={`inline-block max-w-[85%] ${comment.isOwn ? "text-right" : "text-left"}`}
                        >
                          {/* Author and timestamp */}
                          <div
                            className={`flex items-center gap-2 mb-1 ${comment.isOwn ? "flex-row-reverse" : ""}`}
                          >
                            <span className="text-xs font-medium">
                              {comment.author}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {comment.timestamp}
                            </span>
                          </div>

                          {/* Comment bubble */}
                          <div
                            className={`p-3 rounded-lg break-words text-sm leading-relaxed ${
                              comment.isOwn
                                ? "bg-primary text-primary-foreground rounded-br-sm"
                                : "bg-muted text-foreground rounded-bl-sm"
                            }`}
                          >
                            {comment.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}

            {/* Comment Input */}
            <div className="border-t bg-background p-4">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Textarea
                    value={newComment}
                    onChange={(e) =>
                      setNewComment(e.target.value)
                    }
                    onKeyDown={handleCommentKeyPress}
                    placeholder="Add a comment..."
                    className="min-h-[44px] max-h-32 resize-none bg-background border-border focus:border-primary/50 transition-colors"
                    rows={1}
                  />
                </div>
                <Button
                  onClick={addComment}
                  disabled={!newComment.trim()}
                  size="sm"
                  className="h-11 px-4 gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>

              {/* Helper text */}
              <p className="text-xs text-muted-foreground mt-2 px-1">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Draft Dialog */}
      <Dialog
        open={addDraftDialogOpen}
        onOpenChange={setAddDraftDialogOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Draft
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* URL Field */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Draft URL*
              </label>
              <Input
                value={newDraftUrl}
                onChange={(e) => setNewDraftUrl(e.target.value)}
                onKeyDown={handleDraftKeyPress}
                placeholder="https://drive.google.com/..."
                className="w-full"
                autoFocus
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Description (optional)
              </label>
              <Textarea
                value={newDraftDescription}
                onChange={(e) =>
                  setNewDraftDescription(e.target.value)
                }
                onKeyDown={handleDraftKeyPress}
                placeholder="Brief description of changes..."
                className="min-h-[80px] resize-none"
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={closeAddDraftDialog}
                className="px-4"
              >
                Cancel
              </Button>
              <Button
                onClick={addNewDraft}
                disabled={!newDraftUrl.trim()}
                className="px-4 gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Draft
              </Button>
            </div>

            {/* Helper text */}
            <p className="text-xs text-muted-foreground">
              Press Ctrl + Enter to save quickly
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
}