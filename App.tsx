
import React, { useState } from 'react';
import { 
  Settings, 
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
    <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[90vh] max-h-[850px] border border-gray-200">
      {/* Top Header Bar */}
      <div className="h-14 border-b flex items-center justify-between px-6 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#5bb08d] flex items-center justify-center shadow-sm">
            <Leaf className="text-white w-4 h-4" />
          </div>
          <span className="text-gray-900 text-[15px] font-bold tracking-tight">ClimAIte</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="text-[11px] font-bold text-gray-600">Active</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#f9fafb] flex flex-col py-6 shrink-0 border-r border-gray-100">
          <SidebarItem icon={<Sliders size={18} />} label="Control Panel" active={activeView === 'Control Panel'} onClick={() => setActiveView('Control Panel')} />
          <SidebarItem icon={<Coins size={18} />} label="Token Savings" active={activeView === 'Token Savings'} onClick={() => setActiveView('Token Savings')} />
          <SidebarItem icon={<List size={18} />} label="Activity Log" active={activeView === 'Activity Log'} onClick={() => setActiveView('Activity Log')} />
          
          <div className="mt-8 mb-2 px-8 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Help & Info</div>
          <SidebarItem icon={<HelpCircle size={18} />} label="Documentation" active={activeView === 'Documentation'} onClick={() => setActiveView('Documentation')} />
          <SidebarItem icon={<Info size={18} />} label="FAQ & Contact" active={activeView === 'FAQ'} onClick={() => setActiveView('FAQ')} />
          
          <div className="mt-auto p-6 border-t border-gray-200">
            <button className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors text-xs font-bold px-2">
              <LogOut size={18} />
              Log out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-white">
          <div className="px-10 py-8 space-y-10">
            
            {activeView === 'Control Panel' && (
              <>
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Control Panel</h2>
                  <p className="text-sm text-gray-500 mt-1">Configure your optimization constraints and engine behavior.</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <Section title="Constraints" icon={<Maximize2 size={16} />}>
                    <Slider label="Max prompt length" value={maxPromptLength} min={50} max={2000} unit="chars" onChange={setMaxPromptLength} />
                    <Slider label="Min prompt length" value={minPromptLength} min={10} max={100} unit="chars" onChange={setMinPromptLength} />
                    <Slider label="Auto-optimization threshold" value={autoOptimizeThreshold} min={0} max={100} unit="%" onChange={setAutoOptimizeThreshold} />
                    <div className="pt-2">
                      <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                        <span>Aggressiveness level</span>
                        <span className="text-[#5bb08d]">{aggressiveness < 33 ? 'Conservative' : aggressiveness < 66 ? 'Balanced' : 'Aggressive'}</span>
                      </div>
                      <input type="range" className="w-full accent-[#5bb08d] h-1.5 bg-gray-100 rounded-lg cursor-pointer" value={aggressiveness} onChange={(e) => setAggressiveness(parseInt(e.target.value))} />
                    </div>
                  </Section>

                  <Section title="Interface Behavior" icon={<MousePointer size={16} />}>
                    <div className="space-y-4 pt-1">
                      <Toggle label="Auto-optimize on type" active={toggles.autoOptimize} onToggle={() => handleToggle('autoOptimize')} />
                      <Toggle label="Hover to open sidebar" active={toggles.hoverSidebar} onToggle={() => handleToggle('hoverSidebar')} />
                      <Toggle label="Show floating button" active={toggles.floatingButton} onToggle={() => handleToggle('floatingButton')} />
                      <Toggle label="Enable animations" active={toggles.animations} onToggle={() => handleToggle('animations')} />
                    </div>
                  </Section>

                  <Section title="Engine Style" icon={<Sparkles size={16} />}>
                    <div className="space-y-5">
                      <Dropdown label="Optimization style" options={['Concise', 'Balanced', 'Detailed']} value={selectors.style} onChange={(v) => setSelectors(s => ({...s, style: v}))} />
                      <Dropdown label="Target model" options={['ChatGPT', 'Claude', 'Gemini', 'Auto-detect']} value={selectors.model} onChange={(v) => setSelectors(s => ({...s, model: v}))} />
                      <Dropdown label="Tone preservation" options={['Keep original', 'Standardize', 'Friendly', 'Professional']} value={selectors.tone} onChange={(v) => setSelectors(s => ({...s, tone: v}))} />
                    </div>
                  </Section>

                  <Section title="Performance" icon={<Zap size={16} />}>
                    <div className="grid grid-cols-1 gap-6">
                      <NumericInput label="Analysis delay" value={numeric.delay} min={300} max={2000} unit="ms" onChange={(v) => setNumeric(n => ({...n, delay: v}))} />
                      <NumericInput label="Seeds per optimization" value={numeric.seeds} min={1} max={5} unit="seeds" onChange={(v) => setNumeric(n => ({...n, seeds: v}))} />
                      <NumericInput label="Tokens to save threshold" value={numeric.tokens} min={5} max={100} unit="tokens" onChange={(v) => setNumeric(n => ({...n, tokens: v}))} />
                    </div>
                  </Section>

                  <Section title="Enable Rules" icon={<Command size={16} />}>
                    <div className="grid grid-cols-1 gap-3 pt-1">
                      <Checkbox label="Remove polite phrases" checked={rules.polite} onToggle={() => handleRuleToggle('polite')} />
                      <Checkbox label="Add structure suggestions" checked={rules.structure} onToggle={() => handleRuleToggle('structure')} />
                      <Checkbox label="Auto-add examples" checked={rules.examples} onToggle={() => handleRuleToggle('examples')} />
                      <Checkbox label="Format standardization" checked={rules.format} onToggle={() => handleRuleToggle('format')} />
                      <Checkbox label="Redundancy removal" checked={rules.redundancy} onToggle={() => handleRuleToggle('redundancy')} />
                    </div>
                  </Section>

                  <Section title="Suggestion Timing" icon={<AlertCircle size={16} />}>
                    <div className="space-y-3 pt-1">
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
                
                <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                   <button className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">Reset Defaults</button>
                   <button className="px-8 py-2.5 bg-[#5bb08d] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#5bb08d]/20 hover:bg-[#4a9a7a] transition-all transform hover:-translate-y-0.5 active:translate-y-0">Apply Changes</button>
                </div>
              </>
            )}

            {activeView === 'Token Savings' && (
              <>
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Token Savings</h2>
                  <p className="text-sm text-gray-500 mt-1">Real-time usage metrics and environmental impact data.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-[#5bb08d] to-[#4a9a7a] rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12">
                      <TrendingDown size={240} strokeWidth={1} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4 opacity-80 uppercase tracking-widest text-[10px] font-black">
                        <Coins size={14} />
                        Total Efficiency Gain
                      </div>
                      <div className="text-6xl font-black mb-2 tabular-nums">1,248,502</div>
                      <div className="text-sm font-bold text-white/80">Tokens saved since activation</div>
                    </div>
                  </div>

                  <Section title="Immediate Feedback" icon={<Activity size={16} />}>
                    <div className="space-y-6 pt-2">
                      <div>
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-sm font-bold text-gray-700">Current Session Savings</span>
                          <span className="text-2xl font-black text-[#5bb08d]">8,240 <span className="text-xs text-gray-400">tkns</span></span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#5bb08d] w-[65%] rounded-full" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                        <div>
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Last 24h</div>
                          <div className="text-xl font-bold text-gray-800">42.8k</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Last 30d</div>
                          <div className="text-xl font-bold text-gray-800">1.1M</div>
                        </div>
                      </div>
                    </div>
                  </Section>

                  <Section title="Environmental Impact" icon={<Leaf size={16} />}>
                    <div className="flex items-center gap-6 pt-2">
                       <div className="w-20 h-20 rounded-full bg-[#ebf5f1] flex items-center justify-center text-[#5bb08d]">
                          <Leaf size={32} />
                       </div>
                       <div>
                          <div className="text-3xl font-black text-gray-900">12.4 <span className="text-sm font-bold text-gray-400 uppercase">kg CO₂</span></div>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            Equivalent to planting <span className="font-bold text-[#5bb08d]">3.2 urban trees</span>.
                          </p>
                       </div>
                    </div>
                  </Section>

                  <Section title="Optimization Rate" icon={<BarChart3 size={16} />}>
                    <div className="space-y-4 pt-1">
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-semibold text-gray-700">Automation Success Rate</span>
                         <span className="text-sm font-black text-[#5bb08d]">94.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-semibold text-gray-700">Quality Score Preservation</span>
                         <span className="text-sm font-black text-blue-500">99.8%</span>
                      </div>
                    </div>
                  </Section>
                </div>
              </>
            )}

            {activeView === 'Activity Log' && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Activity Log</h2>
                    <p className="text-sm text-gray-500 mt-1">Recent questions and prompts processed through the extension.</p>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search prompts..." 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5bb08d]/20 focus:border-[#5bb08d] transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="grid grid-cols-1 divide-y divide-gray-50">
                    {filteredActivities.length > 0 ? (
                      filteredActivities.map(activity => (
                        <div key={activity.id} className="p-5 hover:bg-gray-50/50 transition-colors group">
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#f0f9f4] flex items-center justify-center text-[#5bb08d] shrink-0">
                               <MessageSquare size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                  <Clock size={10} />
                                  {activity.timestamp}
                                </span>
                                <span className="text-[10px] font-bold text-[#5bb08d] bg-[#ebf5f1] px-2 py-0.5 rounded-full">
                                  {activity.status}
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-relaxed mb-3">
                                {activity.prompt}
                              </p>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500">
                                  <Sparkles size={12} className="text-[#5bb08d]" />
                                  {activity.model}
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5bb08d]">
                                  <TrendingDown size={12} />
                                  Saved {activity.savings} tokens
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                        <Search size={48} className="mb-4" strokeWidth={1} />
                        <p className="font-bold">No prompts found matching your search</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeView === 'Documentation' && (
              <div className="max-w-3xl mx-auto space-y-12 py-4">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-[#ebf5f1] rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                    <Leaf size={40} className="text-[#5bb08d]" />
                  </div>
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight">ClimAIte</h1>
                  <p className="text-xl text-gray-500 font-medium">Sustainable AI Inference via Optimized Prompts</p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Info size={18} className="text-[#5bb08d]" />
                    What is ClimAIte?
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    ClimAIte is a browser extension that reduces wasteful AI inference by helping users write clearer, more efficient prompts. 
                    By optimizing prompts before they are sent, ClimAIte lowers token usage, reduces retries, improves response accuracy, 
                    and minimizes unnecessary compute—contributing to more energy-efficient and sustainable AI usage.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <TrendingDown className="text-[#5bb08d] mb-4" size={24} />
                    <h3 className="font-bold text-gray-900 mb-2">Efficiency First</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Automatically strips redundancy and polite filler, reducing total token consumption by up to 30%.
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <Globe className="text-blue-500 mb-4" size={24} />
                    <h3 className="font-bold text-gray-900 mb-2">Carbon Reduction</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Lower compute cycles lead to direct reductions in data center energy usage and carbon emissions.
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <ShieldCheck className="text-purple-500 mb-4" size={24} />
                    <h3 className="font-bold text-gray-900 mb-2">Local Privacy</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Works locally alongside your browser. Your prompts are analyzed on-device for maximum security.
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <Cpu className="text-orange-500 mb-4" size={24} />
                    <h3 className="font-bold text-gray-900 mb-2">Multi-Platform</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Seamlessly integrates with ChatGPT, Claude, and Gemini without requiring any model modifications.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'FAQ' && (
              <div className="max-w-3xl mx-auto space-y-12 py-4">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Questions & Support</h2>
                  <p className="text-gray-500 mt-2">Everything you need to know about ClimAIte and how to get in touch.</p>
                </div>

                {/* FAQ Section */}
                <div className="space-y-4">
                  {FAQ_DATA.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className={`border rounded-2xl transition-all duration-300 overflow-hidden ${openFaqIndex === idx ? 'bg-gray-50 border-[#5bb08d]/20 ring-1 ring-[#5bb08d]/10' : 'bg-white border-gray-100'}`}
                    >
                      <button 
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left group"
                      >
                        <span className={`font-bold text-[15px] transition-colors ${openFaqIndex === idx ? 'text-[#5bb08d]' : 'text-gray-700 group-hover:text-gray-900'}`}>
                          {faq.question}
                        </span>
                        {openFaqIndex === idx ? (
                          <ChevronUp size={20} className="text-[#5bb08d]" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-400 group-hover:text-gray-600" />
                        )}
                      </button>
                      <div className={`px-6 transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Section */}
                <div className="pt-8 border-t border-gray-100">
                  <h3 className="text-xl font-black text-gray-900 mb-6">Connect with us</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ContactCard 
                      icon={<Mail size={20} />} 
                      title="Support Email" 
                      value="hello@climaite.ai" 
                      link="mailto:hello@climaite.ai"
                    />
                    <ContactCard 
                      icon={<Twitter size={20} />} 
                      title="Twitter / X" 
                      value="@ClimAIteApp" 
                      link="https://twitter.com/climaite"
                    />
                    <ContactCard 
                      icon={<Github size={20} />} 
                      title="Open Source" 
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
const ContactCard: React.FC<{ icon: React.ReactNode; title: string; value: string; link: string }> = ({ icon, title, value, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex flex-col p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-[#5bb08d]/20 transition-all group"
  >
    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5bb08d] mb-4 group-hover:bg-[#ebf5f1] transition-colors">
      {icon}
    </div>
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</span>
    <span className="text-sm font-bold text-gray-800 group-hover:text-[#5bb08d] transition-colors">{value}</span>
  </a>
);

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow h-full">
    <div className="flex items-center gap-2 mb-6">
      <div className="text-[#5bb08d]">{icon}</div>
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">{title}</h3>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-8 py-3 text-[13px] font-bold cursor-pointer transition-all ${
      active 
        ? 'text-[#5bb08d] border-r-[3px] border-[#5bb08d] bg-[#f0f9f4]' 
        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
    }`}
  >
    <div className={active ? 'text-[#5bb08d]' : 'text-gray-400'}>{icon}</div>
    {label}
  </div>
);

const Slider: React.FC<{ label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void }> = ({ label, value, min, max, unit, onChange }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-bold text-gray-500">
      <span>{label}</span>
      <span className="text-gray-900">{value} <span className="text-[10px] text-gray-400 uppercase">{unit}</span></span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      className="w-full accent-[#5bb08d] h-1.5 bg-gray-100 rounded-lg cursor-pointer" 
      value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))} 
    />
  </div>
);

const Toggle: React.FC<{ label: string; active: boolean; onToggle: () => void }> = ({ label, active, onToggle }) => (
  <div className="flex items-center justify-between group cursor-pointer" onClick={onToggle}>
    <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{label}</span>
    <div className={`w-10 h-5.5 rounded-full p-1 transition-all ${active ? 'bg-[#5bb08d]' : 'bg-gray-200'}`}>
      <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-sm transition-transform ${active ? 'translate-x-4.5' : 'translate-x-0'}`} />
    </div>
  </div>
);

const Dropdown: React.FC<{ label: string; options: string[]; value: string; onChange: (v: string) => void }> = ({ label, options, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <select 
        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5bb08d]/20 focus:border-[#5bb08d]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
    </div>
  </div>
);

const NumericInput: React.FC<{ label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void }> = ({ label, value, min, max, unit, onChange }) => (
  <div className="flex items-center justify-between">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 w-32 focus-within:ring-2 focus-within:ring-[#5bb08d]/20 focus-within:border-[#5bb08d]">
      <input 
        type="number" 
        min={min} 
        max={max} 
        className="bg-transparent text-sm font-bold text-gray-900 outline-none w-full text-right"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
      />
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{unit}</span>
    </div>
  </div>
);

const Checkbox: React.FC<{ label: string; checked: boolean; onToggle: () => void }> = ({ label, checked, onToggle }) => (
  <div className="flex items-center gap-3 group cursor-pointer" onClick={onToggle}>
    <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${checked ? 'bg-[#5bb08d] border-[#5bb08d]' : 'bg-white border-gray-200 group-hover:border-gray-300'}`}>
      {checked && <Check className="text-white w-3.5 h-3.5" strokeWidth={4} />}
    </div>
    <span className={`text-sm font-semibold transition-colors ${checked ? 'text-gray-900' : 'text-gray-500'}`}>{label}</span>
  </div>
);

const Radio: React.FC<{ label: string; selected: boolean; onSelect: () => void }> = ({ label, selected, onSelect }) => (
  <div className="flex items-center gap-3 group cursor-pointer" onClick={onSelect}>
    <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${selected ? 'border-[#5bb08d]' : 'border-gray-200 group-hover:border-gray-300'}`}>
      {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#5bb08d] shadow-sm" />}
    </div>
    <span className={`text-sm font-semibold transition-colors ${selected ? 'text-gray-900' : 'text-gray-500'}`}>{label}</span>
  </div>
);

export default App;
