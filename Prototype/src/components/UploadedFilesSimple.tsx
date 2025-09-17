import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, Plus } from 'lucide-react';

export function UploadedFilesSimple() {
  return (
    <div className="p-4 space-y-3">
      {/* Single compact line for uploads */}
      <div className="flex items-center justify-between p-2 border rounded-lg bg-gray-50">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-600" />
          <span className="text-sm">Загрузки</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            3/3
          </Badge>
          <Button 
            size="sm" 
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => {
              // TODO: Add upload functionality
              console.log('Add new upload');
            }}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}