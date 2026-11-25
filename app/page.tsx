"use client";

import { useMemo, useState } from "react";
import { Activity, ArrowDown, ArrowUpRight, AudioLines, BookOpen, Bot, BriefcaseBusiness, Check, ChevronDown, CircleHelp, Code2, Compass, FileText, Film, Globe2, Image as ImageIcon, Layers3, Menu, Mic2, MoreHorizontal, Music2, Plus, Search, Send, Settings2, ShieldCheck, Sparkles, Trophy, WandSparkles, X } from "lucide-react";
import { getModeReply, type Mode } from "@/lib/kosi-engine";

const modes: { id: Mode; name: string; desc: string; icon: typeof Sparkles; tint: string; tag?: string }[] = [
  { id: "chat", name: "Kosi Chat", desc: "Think, ask and explore", icon: Bot, tint: "mint" },
  { id: "research", name: "Deep Research", desc: "Investigate with structure", icon: Search, tint: "blue", tag: "FOCUS" },
  { id: "sports", name: "Sports Desk", desc: "Stats, form and match insight", icon: Trophy, tint: "gold", tag: "LIVE DATA READY" },
  { id: "video", name: "Video Studio", desc: "Turn ideas into motion", icon: Film, tint: "pink", tag: "CREATE" },
  { id: "image", name: "Image Studio", desc: "Shape a visual direction", icon: ImageIcon, tint: "violet" },
  { id: "voice", name: "Voice Room", desc: "Speak, listen and transcribe", icon: AudioLines, tint: "cyan" },
  { id: "code", name: "Code Companion", desc: "Build and debug", icon: Code2, tint: "blue" },
  { id: "study", name: "Study Room", desc: "Learn at your own pace", icon: BookOpen, tint: "mint" },
  { id: "writer", name: "Writing Desk", desc: "Make every word count", icon: FileText, tint: "pink" },
  { id: "business", name: "Business Lab", desc: "Plan your next move", icon: BriefcaseBusiness, tint: "gold" },
  { id: "documents", name: "Documents", desc: "Understand your files", icon: Layers3, tint: "cyan" },
  { id: "music", name: "Music Room", desc: "Develop original sound", icon: Music2, tint: "violet" },
  { id: "slides", name: "Slides", desc: "Present ideas beautifully", icon: WandSparkles, tint: "blue" },
];

const starters = [
  { label: "Explore an idea", prompt: "Help me turn a rough idea into a clear plan.", icon: Compass },
  { label: "Research a topic", prompt: "Help me build a research plan for a topic.", icon: Globe2 },
  { label: "Create something", prompt: "Help me create a strong creative brief.", icon: WandSparkles },
];

export default function Home() {
  const [active, setActive] = useState<Mode>("chat");
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState<{ title: string; body: string; bullets?: string[]; note?: string } | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const current = useMemo(() => modes.find((m) => m.id === active)!, [active]);

  function chooseMode(id: Mode) {
    setActive(id); setAnswer(null); setPrompt(""); setSidebarOpen(false);
  }
  function runPrompt(value = prompt) {
    if (!value.trim()) return;
    setAnswer(getModeReply(active, value));
    setHistory((old) => [value.trim(), ...old.filter((item) => item !== value.trim())].slice(0, 5));
    setPrompt("");
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><span>k</span><i /></div>
          <div className="brand-name">kosi<span>ai</span><small>YOUR INTELLIGENCE SPACE</small></div>
          <button className="icon-btn close-sidebar" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X size={18}/></button>
        </div>
        <button className="new-chat" onClick={() => { chooseMode("chat"); setAnswer(null); }}><Plus size={17}/> New session <span>⌘ K</span></button>
        <div className="side-label">WORKSPACE</div>
        <nav className="side-nav">
          <button className="nav-item active" onClick={() => chooseMode("chat")}><Sparkles size={17}/> Discover <span className="nav-dot"/></button>
          <button className="nav-item" onClick={() => chooseMode("research")}><Search size={17}/> Research</button>
          <button className="nav-item" onClick={() => chooseMode("sports")}><Trophy size={17}/> Sports desk</button>
          <button className="nav-item" onClick={() => chooseMode("video")}><Film size={17}/> Creative studio</button>
        </nav>
        <div className="side-label modes-label">YOUR MODES <button onClick={() => setShowAll(!showAll)}>{showAll ? "LESS" : "ALL"}</button></div>
        <nav className="mode-nav">
          {modes.slice(0, showAll ? modes.length : 7).map((mode) => {
            const Icon = mode.icon;
            return <button key={mode.id} className={`mode-link ${active === mode.id ? "selected" : ""}`} onClick={() => chooseMode(mode.id)}><span className={`mini-icon ${mode.tint}`}><Icon size={15}/></span>{mode.name}</button>;
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="plan-card"><div className="plan-top"><span className="plan-orb"><ShieldCheck size={14}/></span><span>YOUR SPACE</span><span className="plan-status">PREVIEW</span></div><strong>Make room for more.</strong><p>Your AI workspace is taking shape. Connect services when you're ready.</p><button onClick={() => chooseMode("business")}>Explore capabilities <ArrowUpRight size={14}/></button></div>
          <button className="profile-row"><div className="avatar">K</div><div><strong>Kosi AI</strong><small>Personal workspace</small></div><MoreHorizontal size={18}/></button>
        </div>
      </aside>

      {sidebarOpen && <button className="scrim" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"/>}
      <section className="main-area">
        <header className="topbar">
          <div className="crumb"><button className="icon-btn mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={19}/></button><span>Workspace</span><span className="crumb-slash">/</span><strong>{current.name}</strong></div>
          <div className="top-actions"><span className="preview-pill"><i/> LOCAL PREVIEW</span><button className="icon-btn" aria-label="Settings"><Settings2 size={18}/></button><button className="help-btn"><CircleHelp size={16}/> Help</button></div>
        </header>

        <div className="content-wrap">
          <section className="welcome">
            <div className="welcome-copy">
              <div className="eyebrow"><span className="eyebrow-line"/> YOUR SPACE TO THINK BIGGER</div>
              <h1>Make space for<br/><em>what's possible.</em></h1>
              <p>One thoughtful workspace for the things you want to understand, create and make happen.</p>
              <div className="welcome-meta"><span><span className="tiny-star">✳</span> Meet your new thinking partner</span><span className="meta-divider"/> <span>13 specialised modes</span></div>
            </div>
            <div className="orbital-art" aria-hidden="true">
              <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
              <div className="core-glow"/><div className="core-logo">k<span>.</span></div>
              <div className="orbit-chip chip-one"><Sparkles size={14}/></div><div className="orbit-chip chip-two"><Activity size={14}/></div><div className="orbit-chip chip-three"><AudioLines size={14}/></div>
              <div className="art-caption">INTELLIGENCE, IN MOTION <span>✳</span></div>
            </div>
          </section>

          <section className="composer-section">
            <div className="composer-label"><span>START WITH A THOUGHT</span><span className="composer-hint">Kosi is ready when you are <span className="pulse-dot"/></span></div>
            <div className="composer">
              <div className="composer-mode"><span className={`mini-icon ${current.tint}`}><current.icon size={15}/></span><span>{current.name}</span><ChevronDown size={14}/></div>
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); runPrompt(); } }} placeholder={active === "sports" ? "Which match or team should we explore?" : active === "video" ? "Describe the video you want to create..." : "Ask anything, or tell Kosi what you're working on..."} rows={2}/>
              <div className="composer-footer"><div className="composer-tools"><button title="Attach file (coming soon)"><Plus size={17}/><span>Attach</span></button><button title="Voice (coming soon)"><Mic2 size={16}/></button><span className="tool-divider"/><span className="model-label"><span className="model-dot"/> Kosi local engine <ChevronDown size={12}/></span></div><button className="send-btn" onClick={() => runPrompt()} disabled={!prompt.trim()}><span>Send</span><Send size={15}/></button></div>
            </div>
            <div className="privacy-note"><ShieldCheck size={13}/> Your workspace is in preview mode. No external AI service is connected.</div>
          </section>

          {answer ? (
            <section className="response-card">
              <div className="response-head"><div className="response-brand"><div className="response-mark">k.</div><div><strong>Kosi</strong><small>LOCAL ASSISTANT · {current.name.toUpperCase()}</small></div></div><span className="response-tag">PREVIEW RESPONSE</span></div>
              <h2>{answer.title}</h2><p>{answer.body}</p>
              {answer.bullets && <ul>{answer.bullets.map((b) => <li key={b}><Check size={14}/>{b}</li>)}</ul>}
              {answer.note && <div className="response-note"><span>i</span>{answer.note}</div>}
              <div className="response-actions"><button onClick={() => { setPrompt(history[0] || ""); setAnswer(null); }}>Edit prompt</button><button onClick={() => { setAnswer(null); setPrompt(""); }}>New thought <Plus size={14}/></button></div>
            </section>
          ) : (
            <>
              <section className="starter-section"><div className="section-heading"><div><div className="eyebrow small-eyebrow">A LITTLE INSPIRATION</div><h2>Where shall we begin?</h2></div><button className="text-action" onClick={() => setShowAll(true)}>Explore all modes <ArrowUpRight size={14}/></button></div>
                <div className="starter-grid">{starters.map((s) => { const Icon = s.icon; return <button className="starter-card" key={s.label} onClick={() => { setPrompt(s.prompt); }}><span className="starter-icon"><Icon size={17}/></span><span><strong>{s.label}</strong><small>{s.prompt}</small></span><ArrowUpRight size={15} className="starter-arrow"/></button>; })}</div>
              </section>
              <section className="modes-section"><div className="section-heading"><div><div className="eyebrow small-eyebrow">BUILT AROUND YOUR CURIOSITY</div><h2>Find your mode.</h2></div><span className="mode-count">01 — 13 <span>MODES</span></span></div>
                <div className="mode-grid">{modes.slice(0, showAll ? modes.length : 8).map((mode, index) => { const Icon = mode.icon; return <button key={mode.id} className={`mode-card ${active === mode.id ? "mode-card-active" : ""}`} onClick={() => chooseMode(mode.id)}><div className="mode-card-top"><span className={`mode-icon ${mode.tint}`}><Icon size={19}/></span>{mode.tag ? <span className="mode-tag">{mode.tag}</span> : <span className="mode-index">0{index + 1}</span>}</div><strong>{mode.name}</strong><p>{mode.desc}</p><span className="card-arrow"><ArrowUpRight size={15}/></span></button>; })}</div>
                {!showAll && <button className="view-all" onClick={() => setShowAll(true)}>View all 13 modes <ArrowDown size={14}/></button>}
              </section>
            </>
          )}

          {history.length > 0 && <section className="recent-section"><div className="eyebrow small-eyebrow">RECENT THOUGHTS</div><div className="recent-list">{history.slice(0,3).map((item) => <button key={item} onClick={() => setPrompt(item)}><span className="recent-bullet"/><span>{item}</span><ArrowUpRight size={13}/></button>)}</div></section>}
          <footer className="footer"><span>© 2026 KOSI AI</span><span>BUILT FOR CURIOUS MINDS <span className="footer-star">✳</span></span><span>THINK CLEARER. GO FURTHER.</span></footer>
        </div>
      </section>
    </main>
  );
}
