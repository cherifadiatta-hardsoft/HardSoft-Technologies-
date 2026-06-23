import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatbotWidget() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: isFr ? "Bonjour ! Je suis l'assistant virtuel de HardSoft Technologies. Comment puis-je vous aider aujourd'hui ?" : "Hello! I am the virtual assistant of HardSoft Technologies. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message to UI
    const newMessages: Message[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Format history for the Gemini API (excluding the current user message)
      const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history,
          message: userMessage
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...newMessages, { role: 'model', text: data.text }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...newMessages, { 
        role: 'model', 
        text: isFr 
          ? "Désolé, je rencontre des difficultés techniques. N'hésitez pas à nous contacter via WhatsApp ou notre formulaire." 
          : "Sorry, I'm experiencing technical difficulties. Please feel free to contact us via WhatsApp or our form." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 left-0 w-[320px] sm:w-[360px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden origin-bottom-left flex flex-col h-[450px]"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="text-white font-semibold leading-tight">HardSoft Assistant</h3>
                  <p className="text-indigo-100 text-xs mt-0.5">
                    {isFr ? "Propulsé par Gemini AI" : "Powered by Gemini AI"}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors focus:outline-none"
                aria-label={isFr ? "Fermer le chat" : "Close chat"}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-sm' 
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <Loader2 size={18} className="text-indigo-600 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isFr ? "Posez votre question..." : "Ask your question..."}
                className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-full px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <Send size={18} className="ml-1 -mt-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xl shadow-indigo-600/30 transition-all z-50 relative focus:outline-none"
      >
        {isOpen ? <X size={28} className="transform transition-transform" /> : <Bot size={30} className="group-hover:scale-110 transition-transform" />}
      </button>
    </div>
  );
}
