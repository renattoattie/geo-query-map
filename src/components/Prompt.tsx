import { useState } from 'react';
import { Send, Save, Star, Loader, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HistoryEntry {
  prompt: string;
  response: string;
  timestamp: string;
}

const Prompt = () => {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }
  };

  const showHelp = () => {
    toast.info(
      "Como usar: Digite sua pergunta sobre a área do mapa selecionada e clique em Enviar. Use os botões para salvar ou favoritar análises importantes.",
      { duration: 5000 }
    );
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
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" type="button">
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Salvar prompt</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" type="button">
                  <Star className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Adicionar aos favoritos</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={showHelp}>
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ajuda</TooltipContent>
            </Tooltip>
          </div>
          
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? (
              <Loader className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            {isProcessing ? "Processando..." : "Enviar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Prompt;