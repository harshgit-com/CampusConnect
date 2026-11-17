import { useMemo, useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Bookmark, BookOpen,
  CalendarDays, Check, ChevronDown, ChevronRight, CircleHelp, Compass, FileText,
  Filter, GraduationCap, Hash, Home, Layers3, Menu, MessageCircle, MoreHorizontal,
  Plus, Search, Settings2, Sparkles, Users, X, Zap
} from 'lucide-react'

const nav = [
  { label: 'Overview', icon: Home },
  { label: 'Discover', icon: Compass },
  { label: 'Notes library', icon: BookOpen, count: '12' },
  { label: 'Notice board', icon: Bell },
  { label: 'Study groups', icon: Users },
  { label: 'Doubt hub', icon: CircleHelp },
]
const notes = [
  { title: 'Engineering Mathematics — Calculus', subject: 'Mathematics', type: 'PDF', pages: 24, author: 'Aarav Mehta', initials: 'AM', color: 'peach', tag: 'Popular' },
  { title: 'Data Structures & Algorithms', subject: 'Computer Science', type: 'PDF', pages: 38, author: 'Riya Shah', initials: 'RS', color: 'lilac', tag: 'New' },
  { title: 'Physics: Waves & Optics', subject: 'Physics', type: 'PDF', pages: 19, author: 'Kabir Nair', initials: 'KN', color: 'mint', tag: 'Top rated' },
]
const events = [
  { day: '21', month: 'NOV', title: 'Design & Build Hackathon', meta: 'Innovation Lab · 10:00 AM', tag: 'Competition' },
  { day: '24', month: 'NOV', title: 'The Startup Mixer', meta: 'Auditorium B · 4:30 PM', tag: 'Networking' },
  { day: '28', month: 'NOV', title: 'Open Mic Fridays', meta: 'Student Commons · 6:00 PM', tag: 'Culture' },
]
const groups = [
  { name: 'The Builders Club', topic: 'Startups · Product · Ideas', members: '128 members', initials: 'BC', color: 'orange' },
  { name: 'DSA & Problem Solving', topic: 'Coding · Interview prep', members: '86 members', initials: 'DS', color: 'blue' },
  { name: 'Creative Collective', topic: 'Design · Film · Photography', members: '64 members', initials: 'CC', color: 'purple' },
]
const notices = [
  { title: 'End-semester examination timetable released', by: 'Academic updates', time: '2 hours ago', kind: 'Academic', pinned: true },
  { title: 'Library extended hours during exam week', by: 'Campus community', time: 'Yesterday', kind: 'Campus', pinned: false },
  { title: 'Applications open for student innovation grants', by: 'Opportunities', time: 'Yesterday', kind: 'Opportunity', pinned: false },
]

function Brand() {
  return <div className="brand"><img className="brand-logo-image" src="/campusconnect-logo.png" alt="CampusConnect" onError={e => { e.currentTarget.style.display = "none" }} /><span>campus<span className="brand-light">connect</span><i>.</i></span></div>
}
function Avatar({ initials = 'HS', color = 'orange', size = '' }) {
  return <div className={`avatar ${color} ${size}`}>{initials}</div>
}
function SectionTitle({ eyebrow, title, action, onAction }) {
  return <div className="section-title"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2></div>{action && <button className="text-action" onClick={onAction}>{action}<ArrowRight size={15}/></button>}</div>
}
function App({ user, onSignOut }) {
  const [active, setActive] = useState('Overview')
  const [query, setQuery] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [joined, setJoined] = useState([])
  const [saved, setSaved] = useState([])
  const [mobileNav, setMobileNav] = useState(false)
  const [toast, setToast] = useState('')
  const [filter, setFilter] = useState('All')
  const [profileOpen, setProfileOpen] = useState(false)

  const filteredNotes = useMemo(() => notes.filter(n => (n.title + n.subject + n.author).toLowerCase().includes(query.toLowerCase())), [query])
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2400) }
  const go = (label) => { setActive(label); setMobileNav(false); setQuery('') }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'mobile-open' : ''}`}>
      <div className="sidebar-top"><Brand/><button className="icon-btn mobile-close" onClick={() => setMobileNav(false)}><X size={18}/></button></div>
      <div className="workspace-label">YOUR WORKSPACE</div>
      <div className="college-switch"><div className="college-emblem">S</div><div><strong>My campus</strong><small>Student workspace</small></div><ChevronDown size={15}/></div>
      <nav className="main-nav">{nav.map(item => <button key={item.label} className={`nav-item ${active === item.label ? 'active' : ''}`} onClick={() => go(item.label)}><item.icon size={18}/><span>{item.label}</span>{item.count && <small>{item.count}</small>}</button>)}</nav>
      <div className="sidebar-bottom">
        <div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={16}/></div><strong>Make campus yours.</strong><p>Find your people. Build something great.</p><button onClick={() => go('Discover')}>Explore community <ArrowUpRight size={14}/></button></div>
        <button className="nav-item" onClick={() => notify('Settings are coming soon.')}><Settings2 size={18}/>Settings</button>
        <div className="user-mini" onClick={() => setProfileOpen(!profileOpen)}><Avatar/><div><strong>{user?.displayName || "Student"}</strong><small>{user?.email || "Student account"}</small></div><MoreHorizontal size={18}/></div>
      </div>
    </aside>
    {mobileNav && <div className="scrim" onClick={() => setMobileNav(false)}/>}
    <main className="main-area">
      <header className="topbar">
        <button className="icon-btn mobile-menu" onClick={() => setMobileNav(true)}><Menu size={20}/></button>
        <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14}/><strong>{active}</strong></div>
        <div className="topbar-right">
          <label className="global-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></label>
          <div className="notification-wrap"><button className={`icon-btn notification-btn ${showNotifications ? 'selected' : ''}`} onClick={() => setShowNotifications(!showNotifications)}><Bell size={18}/><i/></button>
            {showNotifications && <div className="notification-pop"><div className="pop-head"><strong>Notifications</strong><span>Today</span></div><div className="notice-line"><span className="notice-dot"/><div><b>New notes added</b><small>3 new resources in Computer Science</small><time>18 min ago</time></div></div><div className="notice-line"><span className="notice-dot muted"/><div><b>Group invitation</b><small>You were invited to The Builders Club</small><time>1 hour ago</time></div></div><button className="pop-footer" onClick={() => {setShowNotifications(false);go('Notice board')}}>View notice board</button></div>}
          </div>
          <button className="top-avatar" onClick={() => setProfileOpen(!profileOpen)}><Avatar size="small"/></button>
        </div>
      </header>
      {profileOpen && <div className="profile-pop"><strong>{user?.displayName || "Student"}</strong><small>{user?.email}</small><button onClick={() => notify('Profile editing is coming soon.')}>View profile <ArrowRight size={14}/></button><button className="signout-action" onClick={onSignOut}>Sign out <ArrowRight size={14}/></button></div>}
      <div className="page-content">
        {active === 'Overview' ? <Dashboard {...{filteredNotes, joined, setJoined, saved, setSaved, setShowUpload, go, notify, query, user}}/> :
          active === 'Notes library' ? <NotesPage {...{filteredNotes, saved, setSaved, setShowUpload, query, filter, setFilter, notify}}/> :
          active === 'Notice board' ? <NoticePage/> :
          active === 'Study groups' ? <GroupsPage {...{joined,setJoined,notify}}/> :
          active === 'Discover' ? <DiscoverPage {...{go,notify}}/> :
          <ComingPage title={active} notify={notify}/>}
      </div>
      <footer className="footer"><span>© 2026 CampusConnect</span><span>Built for students, by students <span className="footer-heart">✳</span></span><div><a href="#about">About</a><a href="#guidelines">Community guidelines</a><a href="#help">Help</a></div></footer>
    </main>
    {showUpload && <div className="modal-backdrop" onClick={() => setShowUpload(false)}><div className="upload-modal" onClick={e => e.stopPropagation()}><div className="modal-top"><div className="modal-icon"><Plus size={19}/></div><button className="icon-btn" onClick={() => setShowUpload(false)}><X size={18}/></button></div><h2>Share your knowledge.</h2><p>Upload notes or resources that could help someone in your campus community.</p><label className="field-label">Resource title<input placeholder="e.g. Introduction to Algorithms"/></label><label className="field-label">Subject<select><option>Select a subject</option><option>Computer Science</option><option>Mathematics</option><option>Physics</option><option>Other</option></select></label><div className="dropzone"><FileText size={23}/><strong>Choose a file to upload</strong><span>PDF, DOCX or PPTX · Max 20 MB</span><input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={e => e.target.files?.[0] && notify(`${e.target.files[0].name} selected — backend upload will be connected next.`)}/></div><button className="primary-btn full" onClick={() => {setShowUpload(false);notify('Upload flow is ready for backend integration.')}}>Continue <ArrowRight size={16}/></button><small className="modal-footnote">Please share only material you have permission to distribute.</small></div></div>}
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
  </div>
}

function Dashboard({filteredNotes, joined, setJoined, saved, setSaved, setShowUpload, go, notify, query, user}) {
  return <>
    <div className="welcome-row"><div><div className="eyebrow"><span className="live-dot"/> WEDNESDAY, 18 NOVEMBER 2026</div><h1>Your campus,<br/><em>your community.</em></h1><p className="welcome-copy">Good morning, {user?.displayName?.split(" ")[0] || "there"}. Here's what's happening around your campus.</p></div><div className="welcome-actions"><button className="secondary-btn" onClick={() => go('Discover')}><Compass size={16}/> Explore campus</button><button className="primary-btn" onClick={() => setShowUpload(true)}><Plus size={17}/> Share a resource</button></div></div>
    <div className="hero-banner"><div className="hero-copy"><div className="hero-kicker"><Sparkles size={13}/> THE CAMPUSCONNECT COMMUNITY</div><h2>Big things happen<br/>when students <span>connect.</span></h2><p>A space to learn together, share what you know and find the people who get it.</p><button onClick={() => go('Discover')}>Find your community <ArrowRight size={16}/></button></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-glow"/><div className="hero-symbol"><Users size={48}/></div><div className="float-chip chip-one"><span className="chip-dot orange-dot"/> Ideas in motion</div><div className="float-chip chip-two"><span className="chip-dot green-dot"/> Better, together</div><div className="float-chip chip-three"><Zap size={13}/> Your next big thing</div></div><div className="hero-index">01 <span>/ 03</span></div></div>
    <div className="stats-grid"><Stat icon={Users} label="Your community" value="Find your people" note="Across multiple campuses" tone="orange"/><Stat icon={BookOpen} label="Knowledge shared" value="Open library" note="Notes from students" tone="blue"/><Stat icon={Activity} label="Campus pulse" value="Stay in the loop" note="Updates that matter" tone="green"/></div>
    <div className="content-grid">
      <section className="primary-column"><SectionTitle eyebrow="LEARN SOMETHING NEW" title="Fresh from the library" action="Browse all notes" onAction={() => go('Notes library')}/><div className="notes-list">{filteredNotes.map(n => <NoteRow key={n.title} note={n} saved={saved.includes(n.title)} onSave={() => setSaved(s => s.includes(n.title) ? s.filter(x => x !== n.title) : [...s,n.title])}/>)}</div>
      <SectionTitle eyebrow="PEOPLE MAKE THE PLACE" title="Find your circle" action="Explore groups" onAction={() => go('Study groups')}/><div className="group-grid">{groups.slice(0,2).map(g => <GroupCard key={g.name} group={g} joined={joined.includes(g.name)} onJoin={() => setJoined(j => j.includes(g.name) ? j.filter(x=>x!==g.name) : [...j,g.name])}/>)}</div></section>
      <aside className="right-column"><div className="side-section"><SectionTitle eyebrow="DON'T MISS OUT" title="Campus notices" action="See all" onAction={() => go('Notice board')}/><div className="notice-list">{notices.map((n,i)=><div className="notice-item" key={n.title}>{n.pinned && <span className="pin-label">PINNED</span>}<span className="notice-category">{n.kind}</span><strong>{n.title}</strong><small>{n.by} <span>·</span> {n.time}</small>{i===0&&<div className="notice-rule"/>}</div>)}</div></div><div className="side-section events-section"><SectionTitle eyebrow="MARK YOUR CALENDAR" title="Coming up" action="All events" onAction={() => go('Discover')}/>{events.slice(0,2).map(e=><div className="event-row" key={e.title}><div className="event-date"><b>{e.day}</b><small>{e.month}</small></div><div><strong>{e.title}</strong><small>{e.meta}</small><span>{e.tag}</span></div><ChevronRight size={16}/></div>)}</div><div className="quote-card"><div className="quote-mark">“</div><p>Alone we can do so little; together we can do so much.</p><small>— Helen Keller</small></div></aside>
    </div>
  </>
}
function Stat({icon:Icon,label,value,note,tone}) { return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={18}/></div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div><ArrowUpRight className="stat-arrow" size={16}/></div> }
function NoteRow({note,saved,onSave}) { return <div className="note-row"><div className={`file-icon ${note.color}`}><FileText size={20}/><small>{note.type}</small></div><div className="note-info"><strong>{note.title}</strong><span>{note.subject} <i/> {note.pages} pages <i/> <span className="note-tag">{note.tag}</span></span><div className="note-author"><Avatar initials={note.initials} color={note.color} size="tiny"/>{note.author}</div></div><button className={`save-btn ${saved?'saved':''}`} onClick={onSave} aria-label="Save note"><Bookmark size={17}/></button><button className="row-arrow" aria-label="Open note"><ArrowUpRight size={17}/></button></div> }
function GroupCard({group,joined,onJoin}) { return <div className="group-card"><div className={`group-symbol ${group.color}`}>{group.initials}</div><div className="group-card-top"><span className="group-open">OPEN COMMUNITY</span><button className="icon-btn tiny"><MoreHorizontal size={17}/></button></div><strong>{group.name}</strong><p>{group.topic}</p><div className="group-card-bottom"><span><Users size={14}/>{group.members}</span><button className={joined?'joined-btn':'join-btn'} onClick={onJoin}>{joined?<><Check size={13}/> Joined</>:'Join group'}</button></div></div> }
function NotesPage({filteredNotes,saved,setSaved,setShowUpload,query,filter,setFilter,notify}) { return <><div className="page-heading"><div className="eyebrow">KNOWLEDGE, SHARED</div><h1>Notes <em>library.</em></h1><p>Good notes make great semesters. Find your next study resource.</p><button className="primary-btn" onClick={()=>setShowUpload(true)}><Plus size={16}/> Upload notes</button></div><div className="filter-bar"><div className="filter-title"><Filter size={16}/> Filter by</div>{['All','Mathematics','Computer Science','Physics'].map(f=><button key={f} className={filter===f?'filter-active':''} onClick={()=>setFilter(f)}>{f}</button>)}</div><div className="notes-page-list">{filteredNotes.filter(n=>filter==='All'||n.subject===filter).map(n=><NoteRow key={n.title} note={n} saved={saved.includes(n.title)} onSave={()=>setSaved(s=>s.includes(n.title)?s.filter(x=>x!==n.title):[...s,n.title])}/>)}</div>{filteredNotes.length===0&&<div className="empty-state">No resources match that search yet.</div>}</> }
function NoticePage() { return <><div className="page-heading"><div className="eyebrow">WHAT'S HAPPENING</div><h1>Notice <em>board.</em></h1><p>Updates, opportunities and important campus information in one place.</p></div><div className="notice-page-list">{notices.map((n,i)=><article className="notice-large" key={n.title}><div className="notice-large-icon"><Bell size={20}/></div><div><div className="notice-meta">{n.kind} <span>·</span> {n.time} {n.pinned&&<b>PINNED</b>}</div><h3>{n.title}</h3><p>Stay informed and make the most of what's happening in your student community.</p><small>Posted by {n.by}</small></div><ArrowUpRight size={18}/></article>)}</div></> }
function GroupsPage({joined,setJoined,notify}) { return <><div className="page-heading"><div className="eyebrow">BETTER TOGETHER</div><h1>Find your <em>people.</em></h1><p>Communities built around what you're curious about and what you want to create.</p></div><div className="group-grid groups-page">{groups.map(g=><GroupCard key={g.name} group={g} joined={joined.includes(g.name)} onJoin={()=>setJoined(j=>j.includes(g.name)?j.filter(x=>x!==g.name):[...j,g.name])}/>)}</div></> }
function DiscoverPage({go,notify}) { return <><div className="page-heading"><div className="eyebrow">THERE'S MORE OUT THERE</div><h1>Explore <em>what's possible.</em></h1><p>Discover ideas, communities and opportunities across your student network.</p></div><div className="discover-grid">{[{icon:BookOpen,title:'Knowledge exchange',desc:'Find notes, guides and resources shared by students.',target:'Notes library'},{icon:Users,title:'Communities',desc:'Meet people who share your interests and ambitions.',target:'Study groups'},{icon:Bell,title:'Campus updates',desc:'Keep up with notices and opportunities.',target:'Notice board'},{icon:MessageCircle,title:'Ask & learn',desc:'Get unstuck by learning with your peers.',target:'Doubt hub'}].map(c=><button className="discover-card" key={c.title} onClick={()=>go(c.target)}><div><c.icon size={21}/></div><h3>{c.title}</h3><p>{c.desc}</p><span>Explore <ArrowUpRight size={15}/></span></button>)}</div><SectionTitle eyebrow="UP NEXT" title="Campus events"/><div className="event-list">{events.map(e=><div className="event-row" key={e.title}><div className="event-date"><b>{e.day}</b><small>{e.month}</small></div><div><strong>{e.title}</strong><small>{e.meta}</small><span>{e.tag}</span></div><ChevronRight size={16}/></div>)}</div></> }
function ComingPage({title,notify}) { return <div className="coming-state"><div className="coming-icon"><Layers3 size={27}/></div><div className="eyebrow">IN THE WORKS</div><h1>{title}<em>.</em></h1><p>This part of CampusConnect is being shaped with students in mind. We're building it to be genuinely useful, not just another feature.</p><button className="secondary-btn" onClick={()=>notify('Thanks for being part of CampusConnect.')}> <Sparkles size={16}/> Stay in the loop</button></div> }

export default App