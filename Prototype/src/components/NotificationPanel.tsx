import { useState, useEffect, useRef } from "react";
import { X, Bell, Clock, AlertCircle, CheckCircle, User, Calendar, MessageSquare, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'message';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  avatar?: string;
  projectTitle?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Deadline approaching',
    description: 'Emma & David Wedding editing due tomorrow',
    time: '2 hours ago',
    isRead: false,
    projectTitle: 'Emma & David Smith'
  },
  {
    id: '2',
    type: 'message',
    title: 'New message from client',
    description: 'Sarah Johnson sent feedback on engagement photos',
    time: '4 hours ago',
    isRead: false,
    projectTitle: 'Sarah & Michael Johnson'
  },
  {
    id: '3',
    type: 'success',
    title: 'Project completed',
    description: 'TechCorp Annual Meeting has been delivered',
    time: '1 day ago',
    isRead: true,
    projectTitle: 'TechCorp Annual Meeting'
  },
  {
    id: '4',
    type: 'info',
    title: 'Equipment reminder',
    description: 'Camera lens rental due back Friday',
    time: '1 day ago',
    isRead: true
  },
  {
    id: '5',
    type: 'warning',
    title: 'Schedule conflict',
    description: 'Two events scheduled for same time slot',
    time: '2 days ago',
    isRead: true
  },
  {
    id: '6',
    type: 'message',
    title: 'Team update',
    description: 'Mike Rodriguez updated Anna & Jake Wedding status',
    time: '3 days ago',
    isRead: true,
    projectTitle: 'Anna & Jake Williams'
  }
];

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onMessageClick?: (projectTitle: string) => void;
}

export function NotificationPanel({ isOpen, onClose, onMessageClick }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [sortOrder, setSortOrder] = useState<'newest' | 'unread'>('newest');
  const panelRef = useRef<HTMLDivElement>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notification.id ? { ...notif, isRead: true } : notif
      )
    );

    // If it's a message notification and has a project, navigate to chat
    if (notification.type === 'message' && notification.projectTitle && onMessageClick) {
      onMessageClick(notification.projectTitle);
      onClose();
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getSortedNotifications = () => {
    const notificationsCopy = [...notifications];
    
    switch (sortOrder) {
      case 'unread':
        return notificationsCopy.sort((a, b) => {
          if (a.isRead === b.isRead) {
            // If both have same read status, sort by newest first
            return getTimeValue(a.time) - getTimeValue(b.time);
          }
          return a.isRead ? 1 : -1; // Unread first
        });
      case 'newest':
      default:
        return notificationsCopy.sort((a, b) => getTimeValue(a.time) - getTimeValue(b.time));
    }
  };

  const getTimeValue = (timeStr: string) => {
    // Simple conversion for demonstration - in real app you'd use proper dates
    if (timeStr.includes('hour')) return parseInt(timeStr);
    if (timeStr.includes('day')) return parseInt(timeStr) * 24;
    return 0;
  };

  const toggleSort = () => {
    setSortOrder(prev => prev === 'newest' ? 'unread' : 'newest');
  };

  const getSortIcon = () => {
    switch (sortOrder) {
      case 'unread':
        return <Bell className="h-3 w-3" />;
      case 'newest':
      default:
        return <ArrowUp className="h-3 w-3" />;
    }
  };

  const getSortLabel = () => {
    switch (sortOrder) {
      case 'unread': return 'Unread first';
      case 'newest': return 'Newest first';
      default: return 'Newest first';
    }
  };

  // Handle clicks outside the panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={panelRef} className="fixed left-60 top-0 bottom-0 w-80 bg-white border-r border-border shadow-lg z-50">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={toggleSort}
              title={getSortLabel()}
            >
              {getSortIcon()}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="p-3 border-b border-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>

        {/* Notifications List */}
        <ScrollArea className="flex-1">
          <div className="p-0">
            {getSortedNotifications().map((notification, index) => (
              <div key={notification.id}>
                <div 
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.isRead ? 'bg-blue-50' : ''
                  } ${notification.type === 'message' ? 'hover:bg-blue-100' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className={`text-sm ${!notification.isRead ? 'font-medium' : ''}`}>
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {index < getSortedNotifications().length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full">
            View all notifications
          </Button>
        </div>
      </div>
    </div>
  );
}