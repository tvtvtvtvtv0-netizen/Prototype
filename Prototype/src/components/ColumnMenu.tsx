import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-react';

interface ColumnMenuProps {
  onSettingsClick: () => void;
}

export function ColumnMenu({ onSettingsClick }: ColumnMenuProps) {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="h-6 w-6 p-0 hover:bg-white/50"
      onClick={onSettingsClick}
    >
      <MoreHorizontal className="h-3 w-3" />
    </Button>
  );
}