import React, { useState } from 'react';
import { 
  HelpCircle, 
  Sliders, 
  List, 
  LogOut, 
  ChevronDown,
  ChevronUp,
  Info,
  Maximize2,
  Zap,
  MousePointer,
  Sparkles,
  Command,
  Check,
  AlertCircle,
  TrendingDown,
  Coins,
  Leaf,
  Activity,
  BarChart3,
  Search,
  MessageSquare,
  Clock,
  ShieldCheck,
  Cpu,
  Globe,
  Mail,
  Twitter,
  Github
} from 'lucide-react';

// Mock data for the activity log
const MOCK_ACTIVITIES = [
  { id: 1, prompt: "Write a professional email to my boss asking for a raise after 2 years of work.", timestamp: "2 mins ago", savings: 42, model: "Claude 3.5", status: "Optimized" },
  { id: 2, prompt: "How do I implement a custom hook in React for handling local storage?", timestamp: "15 mins ago", savings: 128, model: "GPT-4o", status: "Optimized" },
  { id: 3, prompt: "Explain quantum entanglement to a five-year-old using only simple words.", timestamp: "1 hour ago", savings: 85, model: "Gemini Pro", status: "Optimized" },
  { id: 4, prompt: "Create a travel itinerary for a 10-day trip to Japan covering Tokyo and Kyoto.", timestamp: "3 hours ago", savings: 210, model: "GPT-4o", status: "Optimized" },
  { id: 5, prompt: "Refactor this python script to be more efficient and follow PEP 8 guidelines.", timestamp: "Yesterday", savings: 156, model: "Claude 3.5", status: "Optimized" },
  { id: 6, prompt: "What are the best practices for securing a REST API in Node.js?", timestamp: "Yesterday", savings: 94, model: "Gemini Pro", status: "Optimized" },
];

const FAQ_DATA = [
  {
    question: "How does ClimAIte actually save tokens?",
    answer: "ClimAIte uses a specialized optimization engine that identifies linguistic redundancies, unnecessary politeness markers, and structural inefficiencies. It reformulates your prompt into a concise version that preserves 100% of the original intent while using significantly fewer tokens."
  },
  {
    question: "Is my prompt data sent to external servers for optimization?",
    answer: "No. Security and privacy are our core pillars. ClimAIte performs all analysis and optimization locally within your browser. Your raw prompts and optimized versions never leave your local environment until you choose to send them to your preferred AI platform."
  },
  {
    question: "Does it work with all AI models?",
    answer: "ClimAIte is platform-agnostic. While it has specialized modes for models like ChatGPT, Claude, and Gemini to account for their specific tokenization quirks, the general optimization principles work effectively across any LLM."
  },
  {
    question: "How is the CO2 impact calculated?",
    answer: "We use industry-standard estimates for energy consumption per token in large-scale data centers. By tracking the total tokens saved, we calculate the estimated reduction in compute power required, which correlates directly to carbon emissions prevented."
  }
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('Control Panel');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // State for controls
  const [maxPromptLength, setMaxPromptLength] = useState(1000);
  const [minPromptLength, setMinPromptLength] = useState(50);
  const [autoOptimizeThreshold, setAutoOptimizeThreshold] = useState(70);
  const [aggressiveness, setAggressiveness] = useState(50);
  
  const [toggles, setToggles] = useState({
    autoOptimize: true,
    hoverSidebar: false,
    floatingButton: true,
    animations: true
  });

  const [selectors, setSelectors] = useState({
    style: 'Balanced',
    model: 'Auto-detect',
    tone: 'Keep original'
  });

  const [numeric, setNumeric] = useState({
    delay: 500,
    seeds: 3,
    tokens: 20
  });

  const [rules, setRules] = useState({
    polite: true,
    structure: true,
    examples: false,
    format: true,
    redundancy: true
  });

  const [suggestionTiming, setSuggestionTiming] = useState('Only on inefficient prompts');

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRuleToggle = (key: keyof typeof rules) => {
    setRules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredActivities = MOCK_ACTIVITIES.filter(act => 
    act.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-white flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <div className="h-16 border-b flex items-center justify-between px-8 bg-white shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#5bb08d] flex items-center justify-center shadow-lg shadow-[#5bb08d]/20">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 text-lg font-black tracking-tight leading-none">ClimAIte</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Prompt Optimizer</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100">
             <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
             <span className="text-xs font-bold text-gray-600">Engine Active</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 bg-[#f9fafb] flex flex-col py-8 shrink-0 border-r border-gray-100 z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]">
          <div className="px-8 mb-6 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Management</div>
          <SidebarItem icon={<Sliders size={20} />} label="Control Panel" active={activeView === 'Control Panel'} onClick={() => setActiveView('Control Panel')} />
          <SidebarItem icon={<Coins size={20} />} label="Token Savings" active={activeView === 'Token Savings'} onClick={() => setActiveView('Token Savings')} />
          <SidebarItem icon={<List size={20} />} label="Activity Log" active={activeView === 'Activity Log'} onClick={() => setActiveView('Activity Log')} />
          
          <div className="mt-12 mb-6 px-8 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Resources</div>
          <SidebarItem icon={<HelpCircle size={20} />} label="Documentation" active={activeView === 'Documentation'} onClick={() => setActiveView('Documentation')} />
          <SidebarItem icon={<Info size={20} />} label="FAQ & Contact" active={activeView === 'FAQ'} onClick={() => setActiveView('FAQ')} />
          
          <div className="mt-auto px-6 pt-6 border-t border-gray-200/60">
            <button className="w-full flex items-center gap-3 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all px-4 py-3 rounded-xl text-sm font-bold">
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-[#fcfdfe]">
          <div className="max-w-[1600px] w-full mx-auto px-8 md:px-12 lg:px-16 py-12 space-y-12">
            
            {activeView === 'Control Panel' && (
              <>
                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Control Panel</h2>
                    <p className="text-lg text-gray-500">Fine-tune your optimization engine and system behavior.</p>
                  </div>
                  <div className="flex gap-4">
                     <button className="px-6 py-3 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all">Discard</button>
                     <button className="px-10 py-3 bg-[#5bb08d] text-white rounded-xl text-sm font-bold shadow-xl shadow-[#5bb08d]/30 hover:bg-[#4a9a7a] transition-all hover:scale-[1.02] active:scale-[0.98]">Save Configuration</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Section title="Constraints" icon={<Maximize2 size={18} />}>
                    <Slider label="Max prompt length" value={maxPromptLength} min={50} max={2000} unit="chars" onChange={setMaxPromptLength} />
                    <Slider label="Min prompt length" value={minPromptLength} min={10} max={100} unit="chars" onChange={setMinPromptLength} />
                    <Slider label="Auto-optimization threshold" value={autoOptimizeThreshold} min={0} max={100} unit="%" onChange={setAutoOptimizeThreshold} />
                    <div className="pt-2">
                      <div className="flex justify-between text-xs font-bold text-gray-500 mb-3">
                        <span>Aggressiveness level</span>
                        <span className="text-[#5bb08d] font-black">{aggressiveness < 33 ? 'Conservative' : aggressiveness < 66 ? 'Balanced' : 'Aggressive'}</span>
                      </div>
                      <input type="range" className="w-full accent-[#5bb08d] h-2 bg-gray-100 rounded-lg cursor-pointer" value={aggressiveness} onChange={(e) => setAggressiveness(parseInt(e.target.value))} />
                    </div>
                  </Section>

                  <Section title="Interface Behavior" icon={<MousePointer size={18} />}>
                    <div className="space-y-6 pt-1">
                      <Toggle label="Auto-optimize on type" active={toggles.autoOptimize} onToggle={() => handleToggle('autoOptimize')} />
                      <Toggle label="Hover to open sidebar" active={toggles.hoverSidebar} onToggle={() => handleToggle('hoverSidebar')} />
                      <Toggle label="Show floating button" active={toggles.floatingButton} onToggle={() => handleToggle('floatingButton')} />
                      <Toggle label="Enable animations" active={toggles.animations} onToggle={() => handleToggle('animations')} />
                    </div>
                  </Section>

                  <Section title="Engine Style" icon={<Sparkles size={18} />}>
                    <div className="space-y-6">
                      <Dropdown label="Optimization style" options={['Concise', 'Balanced', 'Detailed']} value={selectors.style} onChange={(v) => setSelectors(s => ({...s, style: v}))} />
                      <Dropdown label="Target model" options={['ChatGPT', 'Claude', 'Gemini', 'Auto-detect']} value={selectors.model} onChange={(v) => setSelectors(s => ({...s, model: v}))} />
                      <Dropdown label="Tone preservation" options={['Keep original', 'Standardize', 'Friendly', 'Professional']} value={selectors.tone} onChange={(v) => setSelectors(s => ({...s, tone: v}))} />
                    </div>
                  </Section>

                  <Section title="Performance" icon={<Zap size={18} />}>
                    <div className="grid grid-cols-1 gap-8">
                      <NumericInput label="Analysis delay" value={numeric.delay} min={300} max={2000} unit="ms" onChange={(v) => setNumeric(n => ({...n, delay: v}))} />
                      <NumericInput label="Seeds per optimization" value={numeric.seeds} min={1} max={5} unit="seeds" onChange={(v) => setNumeric(n => ({...n, seeds: v}))} />
                      <NumericInput label="Tokens to save threshold" value={numeric.tokens} min={5} max={100} unit="tokens" onChange={(v) => setNumeric(n => ({...n, tokens: v}))} />
                    </div>
                  </Section>

                  <Section title="Optimization Rules" icon={<Command size={18} />}>
                    <div className="grid grid-cols-1 gap-4 pt-1">
                      <Checkbox label="Remove polite phrases" checked={rules.polite} onToggle={() => handleRuleToggle('polite')} />
                      <Checkbox label="Add structure suggestions" checked={rules.structure} onToggle={() => handleRuleToggle('structure')} />
                      <Checkbox label="Auto-add examples" checked={rules.examples} onToggle={() => handleRuleToggle('examples')} />
                      <Checkbox label="Format standardization" checked={rules.format} onToggle={() => handleRuleToggle('format')} />
                      <Checkbox label="Redundancy removal" checked={rules.redundancy} onToggle={() => handleRuleToggle('redundancy')} />
                    </div>
                  </Section>

                  <Section title="Suggestion Timing" icon={<AlertCircle size={18} />}>
                    <div className="space-y-4 pt-1">
                      {['Always', 'Only when sidebar open', 'Only on inefficient prompts', 'Never (auto-apply only)'].map(option => (
                        <Radio 
                          key={option} 
                          label={option} 
                          selected={suggestionTiming === option} 
                          onSelect={() => setSuggestionTiming(option)} 
                        />
                      ))}
                    </div>
                  </Section>
                </div>
              </>
            )}

            {activeView === 'Token Savings' && (
              <>
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-gray-900 tracking-tight">Token Savings</h2>
                  <p className="text-lg text-gray-500">Analyze your efficiency performance and planetary impact.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="bg-gradient-to-br from-[#5bb08d] to-[#4a9a7a] rounded-3xl p-12 shadow-2xl text-white relative overflow-hidden group">
                    <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:opacity-15 transition-opacity rotate-12 group-hover:rotate-6 duration-700">
                      <TrendingDown size={320} strokeWidth={1} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6 opacity-80 uppercase tracking-[0.3em] text-xs font-black">
                        <Coins size={18} />
                        Lifetime Tokens Saved
                      </div>
                      <div className="text-7xl font-black mb-4 tabular-nums tracking-tighter">1,248,502</div>
                      <div className="text-lg font-bold text-white/80 max-w-xs leading-relaxed">Reducing LLM inference overhead by an average of 24% per prompt.</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    <Section title="Session Velocity" icon={<Activity size={18} />}>
                      <div className="space-y-8 pt-2">
                        <div>
                          <div className="flex justify-between items-end mb-3">
                            <span className="text-sm font-bold text-gray-600">Current Session Savings</span>
                            <span className="text-3xl font-black text-[#5bb08d]">8,240 <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">tokens</span></span>
                          </div>
                          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#5bb08d] to-[#7ed0ae] w-[65%] rounded-full shadow-[0_0_12px_rgba(91,176,141,0.4)]" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                          <div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Last 24 Hours</div>
                            <div className="text-3xl font-black text-gray-800 tracking-tight">42.8k</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Projected Monthly</div>
                            <div className="text-3xl font-black text-gray-800 tracking-tight">1.4M</div>
                          </div>
                        </div>
                      </div>
                    </Section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Section title="Environmental Impact" icon={<Leaf size={18} />}>
                        <div className="flex items-center gap-6 pt-2">
                           <div className="w-20 h-20 rounded-2xl bg-[#ebf5f1] flex items-center justify-center text-[#5bb08d] shadow-inner">
                              <Leaf size={36} />
                           </div>
                           <div>
                              <div className="text-3xl font-black text-gray-900 tracking-tight">12.4 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">kg CO₂</span></div>
                              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                Saved <span className="font-black text-[#5bb08d]">3.2 urban trees'</span> annual carbon capture.
                              </p>
                           </div>
                        </div>
                      </Section>

                      <Section title="System Integrity" icon={<BarChart3 size={18} />}>
                        <div className="space-y-5 pt-1">
                          <div className="flex items-center justify-between">
                             <span className="text-sm font-bold text-gray-600">Optimization Success</span>
                             <span className="text-sm font-black text-[#5bb08d]">94.2%</span>
                          </div>
                          <div className="flex items-center justify-between">
                             <span className="text-sm font-bold text-gray-600">Intent Retention</span>
                             <span className="text-sm font-black text-blue-500">99.8%</span>
                          </div>
                        </div>
                      </Section>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeView === 'Activity Log' && (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Activity Log</h2>
                    <p className="text-lg text-gray-500">Track and review optimized prompt history.</p>
                  </div>
                  <div className="relative w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Filter history..." 
                      className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#5bb08d]/10 focus:border-[#5bb08d] transition-all shadow-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/40">
                  <div className="grid grid-cols-1 divide-y divide-gray-50">
                    {filteredActivities.length > 0 ? (
                      filteredActivities.map(activity => (
                        <div key={activity.id} className="p-8 hover:bg-gray-50/50 transition-all group relative cursor-pointer">
                          <div className="flex gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#f0f9f4] flex items-center justify-center text-[#5bb08d] shrink-0 transition-transform group-hover:scale-105">
                               <MessageSquare size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                  <Clock size={12} />
                                  {activity.timestamp}
                                </span>
                                <span className="text-[10px] font-black text-[#5bb08d] bg-[#ebf5f1] px-3 py-1 rounded-full uppercase tracking-widest">
                                  {activity.status}
                                </span>
                              </div>
                              <p className="text-lg font-bold text-gray-800 line-clamp-1 leading-relaxed mb-4 transition-colors group-hover:text-gray-950">
                                {activity.prompt}
                              </p>
                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-100/60 px-3 py-1.5 rounded-lg">
                                  <Sparkles size={14} className="text-[#5bb08d]" />
                                  {activity.model}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-black text-[#5bb08d]">
                                  <TrendingDown size={14} />
                                  Saved {activity.savings} tokens
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-32 flex flex-col items-center justify-center text-center opacity-30">
                        <Search size={64} className="mb-6" strokeWidth={1} />
                        <p className="text-xl font-black uppercase tracking-widest">No matching prompts</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeView === 'Documentation' && (
              <div className="max-w-4xl mx-auto space-y-16 py-8">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-[#ebf5f1] rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-[#5bb08d]/10">
                    <Leaf size={48} className="text-[#5bb08d]" />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-6xl font-black text-gray-900 tracking-tighter">ClimAIte</h1>
                    <p className="text-2xl text-gray-500 font-medium tracking-tight">Eco-conscious prompt engineering at the edge.</p>
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-12 border border-gray-100 shadow-xl shadow-gray-200/30">
                  <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#5bb08d]/10 flex items-center justify-center">
                      <Info size={20} className="text-[#5bb08d]" />
                    </div>
                    System Overview
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-xl font-medium">
                    ClimAIte is built on the philosophy that the greenest token is the one you never send. By leveraging local NLP optimization, we ensure your intentions reach the model with maximum clarity and minimum waste.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <DocCard icon={<TrendingDown className="text-[#5bb08d]" />} title="Token Efficiency" desc="Advanced heuristics strip linguistic noise while preserving intent, reducing payload size by up to 35%." />
                  <DocCard icon={<Globe className="text-blue-500" />} title="Carbon Metrics" desc="Calculates real-time energy savings based on data center compute profiles and token volume." />
                  <DocCard icon={<ShieldCheck className="text-purple-500" />} title="On-Device Privacy" desc="All analysis happens locally. Your raw prompt data never touches our infrastructure." />
                  <DocCard icon={<Cpu className="text-orange-500" />} title="Platform Native" desc="Designed to integrate invisibly into your favorite LLM workflows without API latency." />
                </div>
              </div>
            )}

            {activeView === 'FAQ' && (
              <div className="max-w-4xl mx-auto space-y-16 py-8">
                <div className="space-y-4">
                  <h2 className="text-5xl font-black text-gray-900 tracking-tight">Help Center</h2>
                  <p className="text-xl text-gray-500 font-medium">Find answers to common questions and technical inquiries.</p>
                </div>

                <div className="space-y-6">
                  {FAQ_DATA.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className={`border-2 rounded-[2rem] transition-all duration-500 overflow-hidden ${openFaqIndex === idx ? 'bg-white border-[#5bb08d]/30 shadow-2xl shadow-[#5bb08d]/10' : 'bg-gray-50/50 border-gray-100'}`}
                    >
                      <button 
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full px-10 py-8 flex items-center justify-between text-left group"
                      >
                        <span className={`text-xl font-black transition-colors ${openFaqIndex === idx ? 'text-[#5bb08d]' : 'text-gray-700 group-hover:text-gray-900'}`}>
                          {faq.question}
                        </span>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openFaqIndex === idx ? 'bg-[#5bb08d] text-white rotate-0' : 'bg-white text-gray-400 rotate-180 shadow-sm'}`}>
                          <ChevronUp size={24} />
                        </div>
                      </button>
                      <div className={`px-10 transition-all duration-500 ease-in-out ${openFaqIndex === idx ? 'max-h-[500px] pb-10 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <p className="text-gray-600 leading-relaxed text-lg font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-16 border-t-2 border-gray-100">
                  <h3 className="text-3xl font-black text-gray-900 mb-10 text-center">Get in Touch</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <ContactCard 
                      icon={<Mail size={24} />} 
                      title="Support" 
                      value="hello@climaite.ai" 
                      link="mailto:hello@climaite.ai"
                    />
                    <ContactCard 
                      icon={<Twitter size={24} />} 
                      title="Twitter / X" 
                      value="@ClimAIteApp" 
                      link="https://twitter.com/climaite"
                    />
                    <ContactCard 
                      icon={<Github size={24} />} 
                      title="Github" 
                      value="ClimAIte-Core" 
                      link="https://github.com/climaite"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const DocCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 shadow-inner">
      {React.cloneElement(icon as React.ReactElement, { size: 28 })}
    </div>
    <h3 className="text-xl font-black text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

const ContactCard: React.FC<{ icon: React.ReactNode; title: string; value: string; link: string }> = ({ icon, title, value, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex flex-col p-8 bg-white border-2 border-gray-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-[#5bb08d]/30 transition-all group items-center text-center"
  >
    <div className="w-16 h-16 rounded-[1.25rem] bg-gray-50 flex items-center justify-center text-[#5bb08d] mb-6 group-hover:bg-[#ebf5f1] transition-colors shadow-inner">
      {icon}
    </div>
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">{title}</span>
    <span className="text-lg font-black text-gray-800 group-hover:text-[#5bb08d] transition-colors tracking-tight">{value}</span>
  </a>
);

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5bb08d] shadow-inner">
        {icon}
      </div>
      <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</h3>
    </div>
    <div className="space-y-8 flex-1">
      {children}
    </div>
  </div>
);

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 px-8 py-4 text-sm font-black cursor-pointer transition-all mx-4 rounded-2xl mb-1 ${
      active 
        ? 'text-[#5bb08d] bg-[#f0f9f4] shadow-sm' 
        : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className={`transition-colors ${active ? 'text-[#5bb08d]' : 'text-gray-300'}`}>{icon}</div>
    {label}
  </div>
);

const Slider: React.FC<{ label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void }> = ({ label, value, min, max, unit, onChange }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-xs font-bold text-gray-500">
      <span className="font-bold">{label}</span>
      <span className="text-gray-950 font-black">{value.toLocaleString()} <span className="text-[9px] text-gray-400 uppercase tracking-widest">{unit}</span></span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      className="w-full accent-[#5bb08d] h-2 bg-gray-100 rounded-lg cursor-pointer transition-all hover:h-2.5" 
      value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))} 
    />
  </div>
);

const Toggle: React.FC<{ label: string; active: boolean; onToggle: () => void }> = ({ label, active, onToggle }) => (
  <div className="flex items-center justify-between group cursor-pointer" onClick={onToggle}>
    <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
    <div className={`w-12 h-6.5 rounded-full p-1 transition-all duration-300 ${active ? 'bg-[#5bb08d]' : 'bg-gray-200'}`}>
      <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transition-transform duration-300 ${active ? 'translate-x-5.5' : 'translate-x-0'}`} />
    </div>
  </div>
);

const Dropdown: React.FC<{ label: string; options: string[]; value: string; onChange: (v: string) => void }> = ({ label, options, value, onChange }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</label>
    <div className="relative">
      <select 
        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-bold text-gray-700 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#5bb08d]/10 focus:border-[#5bb08d] transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
    </div>
  </div>
);

const NumericInput: React.FC<{ label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void }> = ({ label, value, min, max, unit, onChange }) => (
  <div className="flex items-center justify-between">
    <label className="text-sm font-bold text-gray-600">{label}</label>
    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 w-40 focus-within:ring-4 focus-within:ring-[#5bb08d]/10 focus-within:border-[#5bb08d] transition-all">
      <input 
        type="number" 
        min={min} 
        max={max} 
        className="bg-transparent text-sm font-black text-gray-900 outline-none w-full text-right"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
      />
      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{unit}</span>
    </div>
  </div>
);

const Checkbox: React.FC<{ label: string; checked: boolean; onToggle: () => void }> = ({ label, checked, onToggle }) => (
  <div className="flex items-center gap-4 group cursor-pointer py-1" onClick={onToggle}>
    <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${checked ? 'bg-[#5bb08d] border-[#5bb08d] shadow-[0_0_12px_rgba(91,176,141,0.3)]' : 'bg-white border-gray-200 group-hover:border-gray-300'}`}>
      {checked && <Check className="text-white w-4 h-4" strokeWidth={4} />}
    </div>
    <span className={`text-sm font-bold transition-colors ${checked ? 'text-gray-950' : 'text-gray-500'}`}>{label}</span>
  </div>
);

const Radio: React.FC<{ label: string; selected: boolean; onSelect: () => void }> = ({ label, selected, onSelect }) => (
  <div className="flex items-center gap-4 group cursor-pointer py-1" onClick={onSelect}>
    <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${selected ? 'border-[#5bb08d] shadow-[0_0_10px_rgba(91,176,141,0.2)]' : 'border-gray-200 group-hover:border-gray-300'}`}>
      {selected && <div className="w-3 h-3 rounded-full bg-[#5bb08d]" />}
    </div>
    <span className={`text-sm font-bold transition-colors ${selected ? 'text-gray-950' : 'text-gray-500'}`}>{label}</span>
  </div>
);

export default App;