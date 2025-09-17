export interface ProjectModalState {
  // General Info
  projectName: string;
  eventDate: Date | null;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;

  // Validation and creation states
  isGeneralValid: boolean;
  isCreatingPhoto: boolean;
  isCreatingVideo: boolean;

  // Creation results
  photoCreated: boolean;
  videoCreated: boolean;
  photoId?: string;
  videoId?: string;

  // UI state
  activeTab: "photo" | "video" | null;
}

export interface PhotoCardData {
  photoStatus: "Uploading" | "Editing" | "Retouching" | "Delivered";
  editorDueDate?: Date;
  finalDeliveryDate?: Date;
  shootingStyle?: string;
  editingStyle?: string;
  rawDelivery: boolean;
  retouchingLevel?: "Basic" | "Standard" | "Premium";
  deliverables: string[];
  assignedPhotographers: string[];
  assignedEditors: string[];
  notes?: string;
}

export interface VideoCardData {
  videoStatus: "Editing" | "Review" | "Revision" | "Delivered";
  editorDueDate?: Date;
  finalDeliveryDate?: Date;
  shootingStyle?: string;
  resolution?: "1080p" | "4K" | "8K";
  frameRate?: "24fps" | "30fps" | "60fps" | "120fps";
  multiCamSetup: boolean;
  multiCamCount?: number;
  audioSources: string[];
  deliverables: string[];
  assignedVideographers: string[];
  assignedEditors: string[];
  notes?: string;
}

export interface CreateProjectRequest {
  type: "photo" | "video";
  status: "Scheduled";
  projectName: string;
  eventDate: Date;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
}

export interface CreateProjectResponse {
  id: string;
  type: "photo" | "video";
  status: string;
  projectName: string;
  eventDate: Date;
  createdAt: Date;
  createdBy: string;
}
