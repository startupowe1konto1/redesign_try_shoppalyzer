import { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile: File | null;
}

export const FileUpload = ({ onFileSelect, onFileRemove, selectedFile }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && isValidFile(file)) {
      onFileSelect(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      onFileSelect(file);
    }
  };

  const isValidFile = (file: File): boolean => {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (!validTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx|xls)$/i)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file",
        variant: "destructive",
      });
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full">
      {selectedFile ? (
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onFileRemove}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`p-8 border-2 border-dashed rounded-lg transition-all duration-smooth cursor-pointer group ${
            isDragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50 hover:bg-muted/20'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className={`p-3 rounded-lg transition-colors duration-smooth ${
              isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted group-hover:bg-primary/10'
            }`}>
              <Upload className="h-8 w-8" />
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">
                Drop your file here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports CSV, XLS, and XLSX files up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileInput}
        className="hidden"
      />
    </Card>
  );
};