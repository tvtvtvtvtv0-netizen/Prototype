import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  ChevronDown,
  ChevronRight,
  Check,
  FileText,
  Camera,
  Video,
  Headphones,
  Plus
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: 'card' | 'audio' | 'photo';
  status: 'uploaded' | 'processing' | 'ready';
  fileNumbers?: string;
  isChecked?: boolean;
}

const initialUploadedFiles: UploadedFile[] = [
  {
    id: '1',
    name: 'card 1',
    type: 'card',
    status: 'uploaded',
    fileNumbers: '9892-9900',
    isChecked: true
  },
  {
    id: '2',
    name: 'card 2',
    type: 'card',
    status: 'uploaded',
    fileNumbers: 'Empty',
    isChecked: true
  },
  {
    id: '3',
    name: 'audio',
    type: 'audio',
    status: 'uploaded',
    fileNumbers: '000-001, 0095-0097',
    isChecked: true
  }
];

export function UploadedFilesSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(initialUploadedFiles);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'audio':
        return <Headphones className="h-4 w-4 text-purple-600" />;
      case 'photo':
        return <Camera className="h-4 w-4 text-green-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <Badge className="bg-green-100 text-green-800 text-xs">Uploaded</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Processing</Badge>;
      case 'ready':
        return <Badge className="bg-blue-100 text-blue-800 text-xs">Ready</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 text-xs">Unknown</Badge>;
    }
  };

  const toggleFileCheck = (fileId: string) => {
    setUploadedFiles(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { ...file, isChecked: !file.isChecked }
          : file
      )
    );
  };

  const uploadedCount = uploadedFiles.filter(file => file.status === 'uploaded').length;
  const totalCount = uploadedFiles.length;

  return (
    <div className="border rounded-lg bg-white">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-4 h-auto hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Загрузки</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {uploadedCount}/{totalCount}
              </Badge>
            </div>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-3 space-y-2">
            {/* Simple file list */}
            <div className="space-y-1">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between py-1 px-2 hover:bg-gray-50 rounded text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFileCheck(file.id)}
                      className={`flex items-center justify-center w-3.5 h-3.5 rounded border transition-colors ${
                        file.isChecked
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {file.isChecked && <Check className="h-2 w-2" />}
                    </button>
                    <span className="text-gray-700">
                      {file.name} - {file.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {file.fileNumbers}
                  </span>
                </div>
              ))}
            </div>

            {/* Add button */}
            <div className="pt-1 border-t border-gray-100">
              <Button 
                size="sm" 
                variant="ghost" 
                className="w-full justify-start text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => {
                  // TODO: Add upload functionality
                  console.log('Add new upload');
                }}
              >
                <Plus className="h-3 w-3 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}