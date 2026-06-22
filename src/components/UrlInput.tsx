import { useState } from 'react';
import { Globe, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface UrlInputProps {
  urls: string[];
  onUrlAdd: (url: string) => void;
  onUrlRemove: (index: number) => void;
}

export const UrlInput = ({ urls, onUrlAdd, onUrlRemove }: UrlInputProps) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const { toast } = useToast();

  const isValidUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleAddUrl = () => {
    if (!currentUrl.trim()) return;
    
    if (!isValidUrl(currentUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    if (urls.includes(currentUrl)) {
      toast({
        title: "Duplicate URL",
        description: "This URL has already been added",
        variant: "destructive",
      });
      return;
    }

    onUrlAdd(currentUrl);
    setCurrentUrl('');
    
    toast({
      title: "URL added",
      description: "The URL has been added to your list",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddUrl();
    }
  };

  return (
    <Card className="w-full p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-muted rounded-lg">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Add Product URLs</h3>
            <p className="text-sm text-muted-foreground">
              Enter URLs to product pages or product listings
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://example.com/products"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            onClick={handleAddUrl}
            disabled={!currentUrl.trim()}
            className="shrink-0"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        {urls.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              Added URLs ({urls.length})
            </p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {urls.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg group"
                >
                  <p className="text-sm text-foreground truncate flex-1 mr-2">
                    {url}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUrlRemove(index)}
                    className="h-6 w-6 p-0 opacity-60 group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};