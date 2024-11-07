import { useState } from 'react';
import { Send, Save, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface HistoryEntry {
  prompt: string;
  response: string;
  timestamp: string;
}

const Prompt = () => {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      // Simula uma resposta do GPT
      const newEntry: HistoryEntry = {
        prompt: prompt.trim(),
        response: "Analyzing your request... Here's what I found in the selected area...",
        timestamp: new Date().toISOString(),
      };

      setHistory(prev => [newEntry, ...prev]);
      setPrompt('');
      toast.success('Analysis completed!');
    } catch (error) {
      toast.error('Failed to process request');
      console.error('Error processing request:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex-1 overflow-auto mb-4">
        {history.map((entry, i) => (
          <div key={i} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-sm text-gray-600">You:</p>
            <p className="mb-2">{entry.prompt}</p>
            <p className="font-medium text-sm text-gray-600">Assistant:</p>
            <p>{entry.response}</p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask about GIS data or request analysis..."
          className="min-h-[100px]"
        />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" type="button">
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" type="button">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
          <Button type="submit">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Prompt;