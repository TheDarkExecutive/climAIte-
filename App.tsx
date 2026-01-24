import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Sliders, 
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
  Github,
  User,
  Link as LinkIcon,
  ExternalLink,
  Loader2,
  Brain,
  Database,
  Plus,
  Trash2,
  Bookmark,
  FileText
} from 'lucide-react';

// Mock data for the Knowledge Base
const INITIAL_KNOWLEDGE = [
  { 
    id: 1, 
    title: "Brand Voice Guidelines", 
    content: "Professional yet accessible, focused on sustainability and efficiency. Avoid corporate jargon and use active voice.", 
    category: "Writing Style", 
    platforms: ["ChatGPT", "Claude"],
    active: true,
    updated: "2 hours ago"
  },
  { 
    id: 2, 
    title: "React Project Structure", 
    content: "Always use Functional Components with TypeScript. Prefer Tailwind CSS for styling. Place reusable components in the /components directory.", 
    category: "Coding", 
    platforms: ["Grok", "DeepSeek"],
    active: true,
    updated: "Yesterday"
  },
  { 
    id: 3, 
    title: "Eco-Metrics Logic", 
    content: "Calculations should assume 0.05kg CO2 per 1M tokens optimized. Use the urban tree equivalent formula for impact visualization.", 
    category: "Technical Specs", 
    platforms: ["All Platforms"],
    active: false,
    updated: "3 days ago"
  },
];

const PLATFORMS = [
  { id: 'chatgpt', name: 'ChatGPT', icon: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg', connected: true, lastSync: '10 mins ago' },
  { id: 'claude', name: 'Claude AI', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Claude_AI_logo.png', connected: false, lastSync: '-' },
  { id: 'grok', name: 'Grok (xAI)', icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/X_logo_2023.svg', connected: false, lastSync: '-' },
  { id: 'deepseek', name: 'DeepSeek', icon: 'https://chat.deepseek.com/favicon.svg', connected: true, lastSync: '2 hours ago' },
  { id: 'gemini', name: 'Google Gemini', icon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304731cfa6c02fd.svg', connected: true, lastSync: '1 day ago' },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  
  const [activeView, setActiveView] = useState('Control Panel');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Knowledge Base State
  const [knowledgeItems, setKnowledgeItems] = useState(INITIAL_KNOWLEDGE);
  
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

  const [rules, setRules] = useState({
    polite: true,
    structure: true,
    examples: false,
    format: true,
    redundancy: true
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRuleToggle = (key: keyof typeof rules) => {
    setRules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleKnowledgeActive = (id: number) => {
    setKnowledgeItems(prev => prev.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    ));
  };

  const deleteKnowledgeItem = (id: number) => {
    setKnowledgeItems(prev => prev.filter(item => item.id !== id));
  };

  const simulateLogin = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setUser({
        name: 'Alex Rivera',
        email: 'alex.rivera@design.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
      });
      setIsLoggedIn(true);
      setIsAuthenticating(false);
    }, 1800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const filteredKnowledge = knowledgeItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className="w-full h-screen bg-[#fcfdfe] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#5bb08d]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="max-w-md w-full z-10">
          <div className="text-center mb-10 space-y-4">
            <div className="w-20 h-20 bg-[#5bb08d] rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-[#5bb08d]/30 mb-6">
              <Leaf className="text-white w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">ClimAIte</h1>
            <p className="text-gray-500 font-medium">Eco-conscious prompt engineering. <br/>Save tokens, save the planet.</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">Welcome back</h2>
            <button 
              onClick={simulateLogin}
              disabled={isAuthenticating}
              className="w-full flex items-center justify-center gap-4 bg-white border border-gray-200 hover:border-gray-300 px-6 py-4 rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
            >
              {isAuthenticating ? (
                <Loader2 className="w-5 h-5 animate-spin text-[#5bb08d]" />
              ) : (
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
              )}
              <span className="font-bold text-gray-700">
                {isAuthenticating ? 'Connecting to Google...' : 'Continue with Google'}
              </span>
            </button>
            <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col gap-4">
               <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#5bb08d]/10 flex items-center justify-center text-[#5bb08d]">
                    <ShieldCheck size={14} />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed"><span className="font-bold text-gray-700">Secure Vault:</span> Your knowledge and context are encrypted and synced only across your authorized AI accounts.</p>
               </div>
            </div>
          </div>
          <p className="mt-10 text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Sustainable AI Alliance © 2025</p>
        </div>
      </div>
    );
  }

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
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-sm font-black text-gray-900 leading-none">Good morning, {user?.name.split(' ')[0]}</span>
            <span className="text-[10px] text-[#5bb08d] font-bold uppercase tracking-widest mt-1">Context Memory: Active</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#ebf5f1] overflow-hidden bg-gray-100 flex items-center justify-center shadow-inner">
             <img src={user?.avatar} alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="h-8 w-[1px] bg-gray-100" />
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
          <SidebarItem icon={<Brain size={20} />} label="Knowledge Base" active={activeView === 'Knowledge Base'} onClick={() => setActiveView('Knowledge Base')} />
          
          <div className="mt-12 mb-6 px-8 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Affiliations</div>
          <SidebarItem icon={<LinkIcon size={20} />} label="Connected Accounts" active={activeView === 'Connected Accounts'} onClick={() => setActiveView('Connected Accounts')} />
          <SidebarItem icon={<User size={20} />} label="User Profile" active={activeView === 'Profile'} onClick={() => setActiveView('Profile')} />

          <div className="mt-12 mb-6 px-8 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Resources</div>
          <SidebarItem icon={<HelpCircle size={20} />} label="Documentation" active={activeView === 'Documentation'} onClick={() => setActiveView('Documentation')} />
          <SidebarItem icon={<Info size={20} />} label="FAQ & Support" active={activeView === 'FAQ'} onClick={() => setActiveView('FAQ')} />
          
          <div className="mt-auto px-6 pt-6 border-t border-gray-200/60">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all px-4 py-3 rounded-xl text-sm font-bold">
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
                  </Section>
                  <Section title="Interface Behavior" icon={<MousePointer size={18} />}>
                    <div className="space-y-6 pt-1">
                      <Toggle label="Auto-optimize on type" active={toggles.autoOptimize} onToggle={() => handleToggle('autoOptimize')} />
                      <Toggle label="Show floating button" active={toggles.floatingButton} onToggle={() => handleToggle('floatingButton')} />
                      <Toggle label="Enable animations" active={toggles.animations} onToggle={() => handleToggle('animations')} />
                    </div>
                  </Section>
                  <Section title="Optimization Rules" icon={<Command size={18} />}>
                    <div className="grid grid-cols-1 gap-4 pt-1">
                      <Checkbox label="Remove polite phrases" checked={rules.polite} onToggle={() => handleRuleToggle('polite')} />
                      <Checkbox label="Add structure suggestions" checked={rules.structure} onToggle={() => handleRuleToggle('structure')} />
                      <Checkbox label="Redundancy removal" checked={rules.redundancy} onToggle={() => handleRuleToggle('redundancy')} />
                    </div>
                  </Section>
                </div>
              </>
            )}

            {activeView === 'Knowledge Base' && (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Knowledge Base</h2>
                    <p className="text-lg text-gray-500">Stored context the AI remembers to avoid repetitive instructions.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-80">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search knowledge..." 
                        className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#5bb08d]/10 focus:border-[#5bb08d] transition-all shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3.5 bg-[#5bb08d] text-white rounded-2xl text-sm font-bold shadow-xl shadow-[#5bb08d]/20 hover:bg-[#4a9a7a] transition-all">
                      <Plus size={18} /> Add New
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {filteredKnowledge.length > 0 ? (
                    filteredKnowledge.map(item => (
                      <div key={item.id} className={`bg-white rounded-[2rem] border p-8 transition-all hover:shadow-xl group relative ${item.active ? 'border-[#5bb08d]/30 shadow-sm' : 'border-gray-100 opacity-80'}`}>
                        <div className="flex gap-8">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner transition-colors ${item.active ? 'bg-[#ebf5f1] text-[#5bb08d]' : 'bg-gray-50 text-gray-300'}`}>
                            <Bookmark size={28} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${item.active ? 'bg-[#ebf5f1] text-[#5bb08d]' : 'bg-gray-100 text-gray-400'}`}>
                                  {item.category}
                                </span>
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                                  <Clock size={12} /> {item.updated}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Sync</span>
                                  <div 
                                    onClick={() => toggleKnowledgeActive(item.id)}
                                    className={`w-10 h-5.5 rounded-full p-1 cursor-pointer transition-all duration-300 ${item.active ? 'bg-[#5bb08d]' : 'bg-gray-200'}`}
                                  >
                                    <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-sm transition-transform duration-300 ${item.active ? 'translate-x-4.5' : 'translate-x-0'}`} />
                                  </div>
                                </div>
                                <button onClick={() => deleteKnowledgeItem(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed font-medium mb-6">{item.content}</p>
                            <div className="flex items-center gap-2">
                              {item.platforms.map(p => (
                                <span key={p} className="text-[10px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-32 flex flex-col items-center justify-center text-center opacity-30">
                      <Database size={64} className="mb-6" strokeWidth={1} />
                      <p className="text-xl font-black uppercase tracking-widest">Knowledge Base Empty</p>
                      <p className="text-sm font-medium mt-2">Add information for your AI to remember.</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeView === 'Connected Accounts' && (
              <>
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-gray-900 tracking-tight">Connected Accounts</h2>
                  <p className="text-lg text-gray-500">Manage your affiliations with major AI platforms.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PLATFORMS.map((platform) => (
                    <div key={platform.id} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all group">
                      <div className="flex items-start justify-between mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-3 shadow-inner">
                          <img src={platform.icon} alt={platform.name} className="w-full h-full object-contain grayscale-[0.5] group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${platform.connected ? 'bg-[#ebf5f1] text-[#5bb08d]' : 'bg-gray-100 text-gray-400'}`}>
                          {platform.connected ? 'Connected' : 'Disconnected'}
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-2">{platform.name}</h3>
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-8">
                        <Clock size={12} />
                        Last synced: {platform.lastSync}
                      </div>
                      <div className="space-y-4 pt-6 border-t border-gray-50">
                        <button className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${platform.connected ? 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-500' : 'bg-[#5bb08d] text-white hover:bg-[#4a9a7a] shadow-lg shadow-[#5bb08d]/20'}`}>
                          {platform.connected ? <><LogOut size={16} /> Disconnect</> : <><ExternalLink size={16} /> Connect Account</>}
                        </button>
                      </div>
                    </div>
                  ))}
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
                  <Section title="Environmental Impact" icon={<Leaf size={18} />}>
                      <div className="flex items-center gap-6 pt-2">
                         <div className="w-20 h-20 rounded-2xl bg-[#ebf5f1] flex items-center justify-center text-[#5bb08d] shadow-inner">
                            <Leaf size={36} />
                         </div>
                         <div>
                            <div className="text-3xl font-black text-gray-900 tracking-tight">12.4 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">kg CO₂</span></div>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">Saved <span className="font-black text-[#5bb08d]">3.2 urban trees'</span> annual carbon capture.</p>
                         </div>
                      </div>
                  </Section>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
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
  <div onClick={onClick} className={`flex items-center gap-4 px-8 py-4 text-sm font-black cursor-pointer transition-all mx-4 rounded-2xl mb-1 ${active ? 'text-[#5bb08d] bg-[#f0f9f4] shadow-sm' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}>
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
    <input type="range" min={min} max={max} className="w-full accent-[#5bb08d] h-2 bg-gray-100 rounded-lg cursor-pointer transition-all hover:h-2.5" value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
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

const Checkbox: React.FC<{ label: string; checked: boolean; onToggle: () => void }> = ({ label, checked, onToggle }) => (
  <div className="flex items-center gap-4 group cursor-pointer py-1" onClick={onToggle}>
    <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${checked ? 'bg-[#5bb08d] border-[#5bb08d] shadow-[0_0_12px_rgba(91,176,141,0.3)]' : 'bg-white border-gray-200 group-hover:border-gray-300'}`}>
      {checked && <Check className="text-white w-4 h-4" strokeWidth={4} />}
    </div>
    <span className={`text-sm font-bold transition-colors ${checked ? 'text-gray-950' : 'text-gray-500'}`}>{label}</span>
  </div>
);

export default App;