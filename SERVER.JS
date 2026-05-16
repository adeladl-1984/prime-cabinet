<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
<title>Prime Cabinet AI</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;background:#07080f;color:#c8d0e8;font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
::-webkit-scrollbar{width:3px;height:3px}
::-webkit-scrollbar-thumb{background:#1e2a3a;border-radius:2px}
.card{background:#0c0e1a;border:1px solid #111827;border-radius:14px}
.btn{border:none;border-radius:10px;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:700;transition:opacity .15s,transform .1s}
.btn:hover:not(:disabled){opacity:.85;transform:scale(1.02)}
.btn:disabled{opacity:.45;cursor:not-allowed}
.fade{animation:fadeIn .3s ease}
.spinner{display:inline-block;width:14px;height:14px;border:2px solid #ffffff30;border-top:2px solid #fff;border-radius:50%;animation:spin .7s linear infinite;vertical-align:middle}

/* layout */
#app{display:flex;flex-direction:column;height:100%;max-width:500px;margin:0 auto}
.topbar{background:#0c0e1a;border-bottom:1px solid #111827;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:40}
.brand-icon{width:36px;height:36px;background:linear-gradient(135deg,#f97316,#ea580c);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 0 16px #f9731630}
.brand-name{font-size:14px;font-weight:800;color:#fff;line-height:1}
.brand-sub{font-size:9px;color:#334155;font-family:'JetBrains Mono';letter-spacing:.5px}
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:10px 12px}
.stat-card{background:#0c0e1a;border:1px solid #111827;border-radius:12px;padding:8px 10px}
.stat-label{font-size:9px;color:#334155;font-family:'JetBrains Mono';margin-bottom:2px}
.stat-val{font-size:22px;font-weight:800;line-height:1}
.body{flex:1;overflow-y:auto;padding:0 12px 90px}

/* bottom nav */
.bottomnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:500px;background:#0c0e1a;border-top:1px solid #111827;display:flex;z-index:40}
.nav-btn{flex:1;padding:10px 4px;border:none;background:transparent;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;font-family:'Outfit';font-size:10px;font-weight:600;color:#334155;transition:color .15s}
.nav-btn.active{color:#f97316}
.nav-btn .nav-icon{font-size:18px}

/* lead cards */
.lead-card{background:#0c0e1a;border:1px solid #111827;border-radius:14px;padding:14px;margin-bottom:8px;cursor:pointer;transition:border-color .15s}
.lead-card:hover{border-color:#1e3a5f}
.pill{display:inline-flex;align-items:center;border-radius:20px;padding:2px 10px;font-size:11px;font-weight:700;white-space:nowrap}

/* message cards */
.msg-card{background:#0c0e1a;border:1px solid #111827;border-radius:14px;padding:14px;margin-bottom:10px}
.msg-textarea{width:100%;background:#07080f;border:1px solid #1e2a3a;border-radius:10px;padding:10px;color:#c8d0e8;font-size:13px;line-height:1.6;resize:vertical;outline:none;margin:8px 0}
.msg-textarea:focus{border-color:#f97316}
.channel-btn{flex:1;padding:7px 4px;border-radius:8px;font-size:11px;font-weight:700;border:1px solid #1e2a3a;background:transparent;color:#475569;cursor:pointer;transition:all .15s}
.channel-btn.active{background:#f9731620;border-color:#f97316;color:#f97316}
.rewrite-btn{padding:5px 10px;border-radius:8px;font-size:11px;font-weight:700;border:1px solid #1e2a3a;background:#0c0e1a;color:#6b7280;cursor:pointer;white-space:nowrap;transition:all .15s}
.rewrite-btn:hover{border-color:#a78bfa;color:#a78bfa}

/* modal */
.modal-backdrop{position:fixed;inset:0;background:#000c;z-index:100;display:flex;align-items:flex-end;padding:0}
.modal{background:#0c0e1a;border:1px solid #1e2a3a;border-radius:20px 20px 0 0;width:100%;max-width:500px;margin:0 auto;max-height:90vh;overflow-y:auto;animation:slideUp .3s ease;padding:20px}
.modal-handle{width:40px;height:4px;background:#1e2a3a;border-radius:2px;margin:0 auto 16px}

/* working hours */
.time-input{background:#07080f;border:1px solid #1e2a3a;border-radius:8px;padding:6px 10px;color:#c8d0e8;font-size:13px;width:100px;outline:none}
.day-pill{width:34px;height:34px;border-radius:50%;border:1px solid #1e2a3a;background:transparent;color:#475569;font-size:11px;font-weight:700;cursor:pointer;transition:all .15s}
.day-pill.on{background:#f9731620;border-color:#f97316;color:#f97316}

/* toast */
.toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);border-radius:12px;padding:10px 20px;font-size:13px;font-weight:700;z-index:9999;box-shadow:0 4px 20px #0008;animation:slideUp .3s ease;white-space:nowrap}

/* follow-up badge */
.fu-badge{display:inline-block;background:#1e2a3a;border-radius:6px;padding:2px 8px;font-size:10px;font-family:'JetBrains Mono';color:#6b7280;margin-left:4px}
</style>
</head>
<body>
<div id="app">
  <div class="topbar">
    <div style="display:flex;align-items:center;gap:10px">
      <div class="brand-icon">🪵</div>
      <div>
        <div class="brand-name">Prime Cabinet</div>
        <div class="brand-sub">AI SALES AGENT</div>
      </div>
    </div>
    <button class="btn" id="scanBtn" onclick="triggerScan()"
      style="background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;padding:7px 14px;font-size:12px;display:flex;align-items:center;gap:6px">
      🔄 Scan Now
    </button>
  </div>

  <div class="stats-row">
    <div class="stat-card"><div class="stat-label">LEADS</div><div class="stat-val" id="st-total" style="color:#f97316">0</div></div>
    <div class="stat-card"><div class="stat-label">URGENT</div><div class="stat-val" id="st-urgent" style="color:#ef4444">0</div></div>
    <div class="stat-card"><div class="stat-label">PENDING</div><div class="stat-val" id="st-pending" style="color:#a78bfa">0</div></div>
    <div class="stat-card"><div class="stat-label">WON</div><div class="stat-val" id="st-won" style="color:#4ade80">0</div></div>
  </div>

  <div class="body" id="body"></div>

  <nav class="bottomnav">
    <button class="nav-btn active" id="nav-leads" onclick="setView('leads')"><span class="nav-icon">📋</span>Leads</button>
    <button class="nav-btn" id="nav-messages" onclick="setView('messages')"><span class="nav-icon">💬</span>Messages</button>
    <button class="nav-btn" id="nav-pipeline" onclick="setView('pipeline')"><span class="nav-icon">🔀</span>Pipeline</button>
    <button class="nav-btn" id="nav-settings" onclick="setView('settings')"><span class="nav-icon">⚙️</span>Settings</button>
  </nav>
</div>

<!-- MODAL -->
<div class="modal-backdrop" id="modal" style="display:none" onclick="closeModal(event)">
  <div class="modal" id="modalContent"></div>
</div>

<!-- TOAST -->
<div class="toast" id="toast" style="display:none"></div>

<script>
// ─── CONFIG ───────────────────────────────────────────────────────────────────
const API_URL  = ''; // leave empty for same-origin (Replit), or set your Railway URL
const CLAUDE_KEY = ''; // set in backend env — never put real key here in frontend

// ─── STATE ────────────────────────────────────────────────────────────────────
let state = {
  view: 'leads',
  leads: [],
  messages: [],
  filterStatus: 'All',
  filterLoc: 'All',
  search: '',
  msgTab: 'pending',
  settings: {
    workStart:'08:30', workEnd:'17:00',
    workDays:[1,2,3,4,5],
    satEnabled:true, satStart:'10:00', satEnd:'14:00',
    defaultChannel:'sms',
    followUp1:2, followUp2:5, followUp3:10,
    businessName:'Prime Cabinet & Joinery',
    phone:'0481 352 123',
  },
  scanning: false,
  loading: false,
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const STATUS_COLOR = {
  New:{bg:'#0a1628',border:'#1e40af',text:'#60a5fa'},
  Contacted:{bg:'#1a1200',border:'#b45309',text:'#fbbf24'},
  'Quote Sent':{bg:'#110d28',border:'#7c3aed',text:'#a78bfa'},
  Won:{bg:'#021a0e',border:'#15803d',text:'#4ade80'},
  Lost:{bg:'#1a0a0a',border:'#b91c1c',text:'#f87171'},
};
const URG_COLOR = {Urgent:'#ef4444',Standard:'#f59e0b',Flexible:'#22c55e'};
const TYPE_COLOR = {
  'Kitchen Cabinets':'#f97316','Wardrobe/Closet':'#a855f7','Laundry':'#3b82f6',
  'Bathroom Vanity':'#ec4899','Custom Joinery':'#14b8a6','Pantry':'#eab308',
  'Garage Storage':'#6b7280','Entertainment Unit':'#8b5cf6',
};

const ago = d => {
  if (!d) return '—';
  const s = Math.floor((Date.now()-new Date(d))/1000);
  if (s<60) return 'just now';
  if (s<3600) return Math.floor(s/60)+'m ago';
  if (s<86400) return Math.floor(s/3600)+'h ago';
  return Math.floor(s/86400)+'d ago';
};
const fmtBudget = l => l.budgetMin||l.budgetMax ? `$${(l.budgetMin||0).toLocaleString()}–$${(l.budgetMax||0).toLocaleString()}` : l.budget||'—';
const pill = (label,color) => `<span class="pill" style="background:${color}20;border:1px solid ${color}50;color:${color}">${label}</span>`;
const statusBadge = s => {const c=STATUS_COLOR[s]||STATUS_COLOR.New;return `<span class="pill" style="background:${c.bg};border:1px solid ${c.border};color:${c.text}">${s}</span>`};

function showToast(msg, ok=true) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  t.style.background = ok ? '#15803d' : '#b91c1c';
  t.style.color = '#fff';
  setTimeout(()=>t.style.display='none', 3000);
}

function updateStats() {
  document.getElementById('st-total').textContent  = state.leads.length;
  document.getElementById('st-urgent').textContent = state.leads.filter(l=>l.urgency==='Urgent').length;
  document.getElementById('st-pending').textContent= state.messages.filter(m=>!m.approved&&!m.sent).length;
  document.getElementById('st-won').textContent    = state.leads.filter(l=>l.status==='Won').length;
}

// ─── SEED DATA (used when no backend) ────────────────────────────────────────
function seedData() {
  state.leads = [
    {id:'l1',title:'Full Kitchen Cabinet Renovation',description:'Complete kitchen overhaul, 22 cabinet doors, island bench, soft-close hinges.',location:'Surfers Paradise, Gold Coast',source:'hipages.com.au',sourceUrl:'https://hipages.com.au',contactName:'Sarah Mitchell',phone:'0412 345 678',email:'sarah.m@gmail.com',budgetMin:10000,budgetMax:14000,postedDate:new Date(Date.now()-3600000).toISOString(),projectType:'Kitchen Cabinets',urgency:'Urgent',status:'New',notes:''},
    {id:'l2',title:'Walk-in Wardrobe — New Build',description:'Full walk-in fit-out: drawers, hanging rails, shoe rack, mirror. Timber look.',location:'Robina, Gold Coast',source:'ServiceSeeking',sourceUrl:'https://serviceseeking.com.au',contactName:"James O'Brien",phone:'0423 567 890',email:'james.ob@outlook.com',budgetMin:6000,budgetMax:9000,postedDate:new Date(Date.now()-7200000).toISOString(),projectType:'Wardrobe/Closet',urgency:'Urgent',status:'New',notes:''},
    {id:'l3',title:'Laundry Cabinetry + Benchtop',description:'Overhead cabinets, base units and stone benchtop. Utility sink included.',location:'Broadbeach, Gold Coast',source:'Airtasker',sourceUrl:'https://airtasker.com',contactName:'Not Listed',phone:'Not Listed',email:'Not Listed',budgetMin:2500,budgetMax:4000,postedDate:new Date(Date.now()-86400000).toISOString(),projectType:'Laundry',urgency:'Standard',status:'Contacted',notes:'Called Monday'},
    {id:'l4',title:'Custom Bathroom Vanity',description:'Freestanding vanity 1200mm, white oak veneer, 2 undermount sinks, stone top.',location:'New Farm, Brisbane',source:'Oneflare',sourceUrl:'https://oneflare.com.au',contactName:'David Park',phone:'0401 234 567',email:'d.park@hotmail.com',budgetMin:4500,budgetMax:6500,postedDate:new Date(Date.now()-172800000).toISOString(),projectType:'Bathroom Vanity',urgency:'Standard',status:'Quote Sent',notes:'Quote $5,200 sent'},
    {id:'l5',title:"Butler's Pantry — Full Fit-out",description:'Convert spare room into full butler\'s pantry. Floor to ceiling custom cabinets.',location:'Ipswich, Brisbane',source:'hipages.com.au',sourceUrl:'https://hipages.com.au',contactName:'Karen Russell',phone:'0447 123 456',email:'karen.r@icloud.com',budgetMin:7000,budgetMax:11000,postedDate:new Date(Date.now()-3600000*2).toISOString(),projectType:'Pantry',urgency:'Urgent',status:'New',notes:''},
    {id:'l6',title:'Kitchen Cabinet Door Replacement',description:'Keep carcasses, replace 20 doors. Matte white, soft close, new handles.',location:'Coorparoo, Brisbane',source:'ServiceSeeking',sourceUrl:'https://serviceseeking.com.au',contactName:'Michael Chen',phone:'0401 789 012',email:'mchen.bne@gmail.com',budgetMin:2500,budgetMax:3800,postedDate:new Date(Date.now()-86400000*2).toISOString(),projectType:'Kitchen Cabinets',urgency:'Standard',status:'Won',notes:'Deposit $1,500 received'},
    {id:'l7',title:'Garage Storage Wall System',description:'Wall-to-wall garage storage, 8m run — overhead and floor cabinets.',location:'Helensvale, Gold Coast',source:'Buildi',sourceUrl:'https://buildi.com.au',contactName:'Tony Barbaro',phone:'0418 456 789',email:'tony.b@gmail.com',budgetMin:3500,budgetMax:5500,postedDate:new Date(Date.now()-86400000*3).toISOString(),projectType:'Garage Storage',urgency:'Flexible',status:'New',notes:''},
  ];
  state.messages = state.leads.filter(l=>l.status==='New').map(l=>({
    id:'m'+l.id, leadId:l.id,
    message:`Hi ${l.contactName==='Not Listed'?'there':l.contactName.split(' ')[0]},\n\nWe noticed your ${l.projectType} project in ${l.location.split(',')[0]} and we'd love to help!\n\nAt Prime Cabinet & Joinery, we specialise in custom cabinetry across Gold Coast and Brisbane. We're known for quality finishes and delivering on time.\n\nWe'd love to offer you a FREE measure & quote — no obligation.\n\nWould you be available for a quick chat this week?\n\nCheers,\n${state.settings.businessName}\n📞 ${state.settings.phone}`,
    approved:false, scheduled:false, sent:false, sendAt:null, channel:'sms',
    followUps:[
      {day:2,sent:false,message:`Hi again! Just following up on our message about your ${l.projectType} project. Happy to arrange a free measure & quote at your convenience. — ${state.settings.businessName}`},
      {day:5,sent:false,message:`Hi ${l.contactName==='Not Listed'?'there':l.contactName.split(' ')[0]}, still interested in getting a quote for your ${l.projectType}? We have availability this week. — ${state.settings.businessName}`},
      {day:10,sent:false,message:`Last follow-up — if you're still looking for cabinet work in ${l.location.split(',')[0]}, we'd love to help. Call us anytime on ${state.settings.phone}. — ${state.settings.businessName}`},
    ]
  }));
  updateStats();
}

// ─── API CALLS (with fallback to local state) ─────────────────────────────────
async function apiGet(path) {
  if (!API_URL) return null;
  try { const r = await fetch(API_URL+path); return await r.json(); } catch { return null; }
}
async function apiPost(path, body) {
  if (!API_URL) return null;
  try {
    const r = await fetch(API_URL+path, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    return await r.json();
  } catch { return null; }
}
async function apiPut(path, body) {
  if (!API_URL) return null;
  try {
    const r = await fetch(API_URL+path, {method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    return await r.json();
  } catch { return null; }
}

async function loadData() {
  const leads = await apiGet('/api/leads');
  const msgs  = await apiGet('/api/messages');
  if (leads) state.leads = leads;
  if (msgs)  state.messages = msgs;
  updateStats();
  render();
}

// ─── SCAN ─────────────────────────────────────────────────────────────────────
async function triggerScan() {
  if (state.scanning) return;
  state.scanning = true;
  const btn = document.getElementById('scanBtn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Scanning…';
  showToast('🔍 Scanning platforms…');

  const result = await apiPost('/api/scan', {});
  if (result) {
    await loadData();
    showToast(`✅ Found ${result.newLeads||0} new leads!`);
  } else {
    // demo mode: just add a fake new lead
    const fake = {
      id:'new'+Date.now(), title:'New Cabinet Project — hipages',
      description:'Just found: customer needs kitchen cabinet renovation in Gold Coast.',
      location:'Surfers Paradise, Gold Coast', source:'hipages.com.au',
      contactName:'New Lead', phone:'04XX XXX XXX', email:'Not Listed',
      budgetMin:8000, budgetMax:13000,
      postedDate:new Date().toISOString(), projectType:'Kitchen Cabinets',
      urgency:'Urgent', status:'New', notes:''
    };
    state.leads.unshift(fake);
    showToast('✅ Demo: 1 new lead found!');
    updateStats();
    render();
  }

  state.scanning = false;
  btn.disabled = false;
  btn.innerHTML = '🔄 Scan Now';
}

// ─── ACTIONS ──────────────────────────────────────────────────────────────────
async function approveMsg(id) {
  const msg = state.messages.find(m=>m.id===id);
  if (!msg) return;
  await apiPost(`/api/messages/${id}/approve`, {});
  msg.approved = true;
  updateStats(); render();
  showToast('✅ Approved & queued!');
}

async function saveMsg(id) {
  const ta = document.getElementById('ta-'+id);
  if (!ta) return;
  const msg = state.messages.find(m=>m.id===id);
  if (!msg) return;
  msg.message = ta.value;
  await apiPut(`/api/messages/${id}`, {message:ta.value});
  showToast('💾 Saved');
}

async function rewriteMsg(id, tone) {
  const msg = state.messages.find(m=>m.id===id);
  const lead = state.leads.find(l=>l.id===msg?.leadId);
  if (!msg||!lead) return;

  const ta = document.getElementById('ta-'+id);
  if (ta) { ta.disabled=true; ta.style.opacity='.5'; ta.value='✍️ Rewriting…'; }

  const result = await apiPost(`/api/messages/${id}/rewrite`, {tone});
  if (result?.message) {
    msg.message = result.message;
    if (ta) { ta.value=result.message; }
    showToast(`✅ Rewritten as ${tone}`);
  } else {
    // demo rewrite
    const tones = {
      friendly: `Hey ${lead.contactName==='Not Listed'?'there':lead.contactName.split(' ')[0]}! 👋\n\nSaw your ${lead.projectType} job on ${lead.source} and we'd love to help!\n\nWe do amazing custom cabinetry across GC & Brisbane. Quick free quote?\n\nCheers!\n${state.settings.businessName} 🪵\n📞 ${state.settings.phone}`,
      professional: `Dear ${lead.contactName==='Not Listed'?'Client':lead.contactName.split(' ')[0]},\n\nI am writing regarding your ${lead.projectType} project listed on ${lead.source}.\n\nPrime Cabinet & Joinery has over 10 years of experience delivering premium cabinetry solutions across Gold Coast and Brisbane.\n\nI would welcome the opportunity to provide a complimentary measure and quotation at your earliest convenience.\n\nKind regards,\n${state.settings.businessName}\n${state.settings.phone}`,
      short: `Hi ${lead.contactName==='Not Listed'?'there':lead.contactName.split(' ')[0]}, saw your ${lead.projectType} job. Free quote available — ${state.settings.phone}. — ${state.settings.businessName}`,
      luxury: `Good day ${lead.contactName==='Not Listed'?'':lead.contactName.split(' ')[0]},\n\nYour ${lead.projectType} project caught our attention. We craft bespoke cabinetry for discerning clients across Gold Coast & Brisbane — from concept to flawless installation.\n\nWe'd be honoured to present a complimentary design consultation.\n\n${state.settings.businessName}\n${state.settings.phone}`,
    };
    msg.message = tones[tone]||tones.friendly;
    if (ta) { ta.value=msg.message; }
    showToast(`✅ Rewritten as ${tone}`);
  }

  if (ta) { ta.disabled=false; ta.style.opacity='1'; }
}

async function setChannel(msgId, ch) {
  const msg = state.messages.find(m=>m.id===msgId);
  if (msg) msg.channel = ch;
  ['sms','whatsapp','email','facebook'].forEach(c=>{
    const b = document.getElementById(`ch-${msgId}-${c}`);
    if (b) { b.className='channel-btn'+(c===ch?' active':''); }
  });
}

async function scheduleMsg(id) {
  const msg = state.messages.find(m=>m.id===id);
  if (!msg) return;
  const inp = document.getElementById('sched-'+id);
  const sendAt = inp?.value;
  if (!sendAt) { showToast('Please pick a date/time', false); return; }

  // check working hours
  const dt = new Date(sendAt);
  const hour = dt.getHours(), min = dt.getMinutes();
  const timeNum = hour*100+min;
  const [ws,wm] = state.settings.workStart.split(':').map(Number);
  const [we,wem] = state.settings.workEnd.split(':').map(Number);
  const startNum = ws*100+wm, endNum = we*100+wem;
  const day = dt.getDay(); // 0=Sun,6=Sat
  const workDay = state.settings.workDays.includes(day);
  const satDay  = day===6 && state.settings.satEnabled;

  if (!workDay && !satDay) {
    showToast('⚠️ Outside working days — will queue to next working day', false);
    // Auto-shift to next Monday 8:30
    dt.setDate(dt.getDate()+(day===0?1:day===6?2:1));
    dt.setHours(ws,wm,0,0);
  } else if (timeNum<startNum||timeNum>endNum) {
    showToast('⚠️ Outside working hours — shifted to start of next slot');
    dt.setHours(ws,wm,0,0);
    if (timeNum>endNum) dt.setDate(dt.getDate()+1);
  }

  msg.scheduled = true;
  msg.sendAt = dt.toISOString();
  await apiPost(`/api/messages/${id}/schedule`, {sendAt:msg.sendAt,channel:msg.channel});
  showToast(`📅 Scheduled: ${dt.toLocaleString('en-AU',{weekday:'short',hour:'2-digit',minute:'2-digit'})}`);
  render();
}

async function updateLeadStatus(leadId, status) {
  const lead = state.leads.find(l=>l.id===leadId);
  if (lead) lead.status = status;
  await apiPut(`/api/leads/${leadId}`, {status});
  updateStats(); closeModal();
  showToast(`Status → ${status}`);
}

// ─── VIEW SWITCHING ───────────────────────────────────────────────────────────
function setView(v) {
  state.view = v;
  state.filterStatus = 'All';
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('nav-'+v)?.classList.add('active');
  render();
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function openLeadModal(id) {
  const lead = state.leads.find(l=>l.id===id);
  if (!lead) return;
  const msg = state.messages.find(m=>m.leadId===id);
  const c = STATUS_COLOR[lead.status]||STATUS_COLOR.New;
  const tc = TYPE_COLOR[lead.projectType]||'#888';

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-handle"></div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">
      <span class="pill" style="background:${tc}20;border:1px solid ${tc}50;color:${tc}">${lead.projectType}</span>
      ${statusBadge(lead.status)}
      <span style="font-size:11px;font-weight:700;color:${URG_COLOR[lead.urgency]||'#888'}">● ${lead.urgency}</span>
    </div>
    <div style="font-size:17px;font-weight:800;color:#fff;margin-bottom:4px">${lead.title}</div>
    <div style="font-size:12px;color:#475569;margin-bottom:14px;line-height:1.5">${lead.description}</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
      ${[
        ['📍 Location', lead.location],
        ['🌐 Source', lead.source],
        ['👤 Contact', lead.contactName],
        ['💰 Budget', fmtBudget(lead)],
        ['📞 Phone', `<a href="tel:${lead.phone}" style="color:#60a5fa;text-decoration:none">${lead.phone}</a>`],
        ['📧 Email', lead.email!=='Not Listed'?`<a href="mailto:${lead.email}" style="color:#60a5fa;text-decoration:none">${lead.email}</a>`:'—'],
        ['🕐 Posted', ago(lead.postedDate)],
        ['📝 Notes', lead.notes||'—'],
      ].map(([l,v])=>`
        <div style="background:#07080f;border-radius:10px;padding:10px">
          <div style="font-size:9px;color:#334155;font-family:'JetBrains Mono';margin-bottom:3px">${l}</div>
          <div style="font-size:12px;color:#c8d0e8">${v}</div>
        </div>`).join('')}
    </div>

    <div style="margin-bottom:12px">
      <div style="font-size:10px;color:#334155;font-family:'JetBrains Mono';margin-bottom:6px">UPDATE STATUS</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${['New','Contacted','Quote Sent','Won','Lost'].map(s=>`
          <button class="btn" onclick="updateLeadStatus('${lead.id}','${s}')"
            style="padding:6px 12px;font-size:11px;background:${lead.status===s?STATUS_COLOR[s].bg:'#07080f'};border:1px solid ${STATUS_COLOR[s].border};color:${STATUS_COLOR[s].text}">${s}</button>
        `).join('')}
      </div>
    </div>

    ${msg ? `
      <div style="border-top:1px solid #111827;padding-top:12px;margin-top:4px">
        <div style="font-size:10px;color:#334155;font-family:'JetBrains Mono';margin-bottom:6px">AI MESSAGE READY</div>
        <div style="font-size:12px;color:#4ade80">${msg.approved?'✅ Approved':'⏳ Awaiting approval'} ${msg.sent?'· 📤 Sent':''}</div>
        <button class="btn" onclick="setView('messages');closeModal()"
          style="margin-top:8px;padding:7px 14px;font-size:12px;background:#1e2a3a;border:1px solid #1e3a5f;color:#60a5fa;width:100%">
          View & Approve Message →
        </button>
      </div>` : ''}

    <button class="btn" onclick="closeModal()"
      style="margin-top:12px;width:100%;padding:10px;background:#07080f;border:1px solid #1e2a3a;color:#475569;font-size:13px">
      Close
    </button>
  `;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal(e) {
  if (!e || e.target===document.getElementById('modal')) {
    document.getElementById('modal').style.display='none';
  }
}

// ─── RENDER ───────────────────────────────────────────────────────────────────
function render() {
  const body = document.getElementById('body');

  if (state.view==='leads') renderLeads(body);
  else if (state.view==='messages') renderMessages(body);
  else if (state.view==='pipeline') renderPipeline(body);
  else if (state.view==='settings') renderSettings(body);
}

function renderLeads(body) {
  const filtered = state.leads.filter(l=>{
    if (state.filterStatus!=='All' && l.status!==state.filterStatus) return false;
    if (state.filterLoc!=='All' && !l.location?.toLowerCase().includes(state.filterLoc.toLowerCase())) return false;
    if (state.search && !l.title?.toLowerCase().includes(state.search.toLowerCase()) &&
        !l.contactName?.toLowerCase().includes(state.search.toLowerCase())) return false;
    return true;
  });

  body.innerHTML = `
    <div class="fade">
      <div style="display:flex;gap:6px;padding:10px 0;flex-wrap:wrap">
        <input id="searchInput" value="${state.search}" placeholder="🔍 Search leads…"
          oninput="state.search=this.value;render()"
          style="flex:1;min-width:120px;background:#0c0e1a;border:1px solid #111827;border-radius:10px;padding:7px 12px;font-size:12px;outline:none;color:#c8d0e8"/>
        <select onchange="state.filterStatus=this.value;render()"
          style="background:#0c0e1a;border:1px solid #111827;border-radius:10px;padding:7px 10px;font-size:12px;outline:none;cursor:pointer;color:#c8d0e8">
          ${['All','New','Contacted','Quote Sent','Won','Lost'].map(s=>`<option ${s===state.filterStatus?'selected':''}>${s}</option>`).join('')}
        </select>
        <select onchange="state.filterLoc=this.value;render()"
          style="background:#0c0e1a;border:1px solid #111827;border-radius:10px;padding:7px 10px;font-size:12px;outline:none;cursor:pointer;color:#c8d0e8">
          <option value="All" ${state.filterLoc==='All'?'selected':''}>All</option>
          <option value="Gold Coast" ${state.filterLoc==='Gold Coast'?'selected':''}>Gold Coast</option>
          <option value="Brisbane" ${state.filterLoc==='Brisbane'?'selected':''}>Brisbane</option>
        </select>
      </div>
      ${filtered.length===0?'<div style="text-align:center;padding:60px 0;color:#1e2a3a;font-size:14px">No leads found</div>':''}
      ${filtered.map(l=>{
        const tc = TYPE_COLOR[l.projectType]||'#888';
        return `
          <div class="lead-card" onclick="openLeadModal('${l.id}')">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
              <div style="flex:1;margin-left:8px">
                <div style="font-size:13px;font-weight:700;color:#e2e8f0;line-height:1.3;margin-bottom:3px">${l.title}</div>
                <div style="font-size:11px;color:#475569">📍 ${l.location}</div>
              </div>
              ${statusBadge(l.status)}
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
              ${pill(l.projectType||'Joinery', tc)}
              <span style="font-size:10px;color:${URG_COLOR[l.urgency]||'#888'};font-weight:700">● ${l.urgency}</span>
              <span style="flex:1"></span>
              <span style="font-size:12px;font-weight:800;color:#4ade80;font-family:'JetBrains Mono'">${fmtBudget(l)}</span>
              <span style="font-size:10px;color:#334155;font-family:'JetBrains Mono'">${ago(l.postedDate)}</span>
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

function renderMessages(body) {
  const tabs = [
    ['pending','⏳ Pending', state.messages.filter(m=>!m.approved&&!m.sent)],
    ['approved','✅ Queued',  state.messages.filter(m=>m.approved&&!m.sent)],
    ['sent','📤 Sent',       state.messages.filter(m=>m.sent)],
  ];
  const [,, msgs] = tabs.find(([k])=>k===state.msgTab)||tabs[0];

  body.innerHTML = `
    <div class="fade">
      <div style="display:flex;gap:4px;padding:10px 0">
        ${tabs.map(([k,l,arr])=>`
          <button class="btn" onclick="state.msgTab='${k}';render()"
            style="flex:1;padding:7px 4px;font-size:11px;
              background:${state.msgTab===k?'#1e2a3a':'transparent'};
              border:1px solid ${state.msgTab===k?'#1e3a5f':'#111827'};
              color:${state.msgTab===k?'#fff':'#475569'}">
            ${l} (${arr.length})
          </button>`).join('')}
      </div>

      ${msgs.length===0?'<div style="text-align:center;padding:60px 0;color:#1e2a3a;font-size:14px">No messages</div>':''}

      ${msgs.map(msg=>{
        const lead = state.leads.find(l=>l.id===msg.leadId)||{};
        return `
          <div class="msg-card">
            <!-- header -->
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
              <div>
                <div style="font-size:13px;font-weight:700;color:#e2e8f0">${lead.contactName||'Unknown'}</div>
                <div style="font-size:11px;color:#475569">${lead.title||'Lead'} · ${(lead.location||'').split(',')[0]}</div>
              </div>
              <div style="text-align:right">
                <div style="font-size:12px;font-weight:800;color:#4ade80;font-family:'JetBrains Mono'">${fmtBudget(lead)}</div>
                <div style="font-size:10px;color:#334155">${ago(lead.postedDate)}</div>
              </div>
            </div>

            <!-- channel picker -->
            <div style="display:flex;gap:5px;margin-bottom:8px">
              ${[['sms','📱 SMS'],['whatsapp','💬 WA'],['email','📧 Email'],['facebook','👥 FB']].map(([ch,lbl])=>`
                <button id="ch-${msg.id}-${ch}" class="channel-btn ${(msg.channel||'sms')===ch?'active':''}"
                  onclick="setChannel('${msg.id}','${ch}')">${lbl}</button>
              `).join('')}
            </div>

            <!-- message textarea -->
            <textarea id="ta-${msg.id}" class="msg-textarea" rows="7"
              onchange="saveMsg('${msg.id}')">${msg.message}</textarea>

            <!-- rewrite buttons -->
            <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px">
              <span style="font-size:10px;color:#334155;align-self:center;font-family:'JetBrains Mono'">✍️ Rewrite:</span>
              ${['friendly','professional','short','luxury','commercial'].map(t=>`
                <button class="rewrite-btn" onclick="rewriteMsg('${msg.id}','${t}')">${t}</button>
              `).join('')}
            </div>

            <!-- schedule -->
            ${!msg.approved ? `
              <div style="background:#07080f;border-radius:10px;padding:10px;margin-bottom:10px">
                <div style="font-size:10px;color:#334155;font-family:'JetBrains Mono';margin-bottom:6px">📅 SCHEDULE SEND</div>
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                  <input type="datetime-local" id="sched-${msg.id}"
                    style="background:#0c0e1a;border:1px solid #1e2a3a;border-radius:8px;padding:6px 10px;color:#c8d0e8;font-size:12px;outline:none;flex:1"
                    min="${new Date().toISOString().slice(0,16)}"/>
                  <button class="btn" onclick="scheduleMsg('${msg.id}')"
                    style="padding:7px 14px;font-size:12px;background:#1e2a3a;border:1px solid #1e3a5f;color:#60a5fa">
                    Set Time
                  </button>
                </div>
                <div style="font-size:10px;color:#334155;margin-top:4px">
                  ⏰ Working hours: Mon-Fri ${state.settings.workStart}–${state.settings.workEnd}
                  ${state.settings.satEnabled?`· Sat ${state.settings.satStart}–${state.settings.satEnd}`:''}
                </div>
              </div>

              <button class="btn" onclick="approveMsg('${msg.id}')"
                style="width:100%;padding:11px;font-size:13px;background:linear-gradient(135deg,#15803d,#166534);border:none;color:#fff;letter-spacing:.3px">
                ✅ Approve & Queue
              </button>
            ` : `
              <div style="background:#021a0e;border:1px solid #15803d40;border-radius:10px;padding:10px;margin-bottom:10px">
                <div style="font-size:12px;color:#4ade80;font-weight:700">
                  ✅ Approved${msg.sendAt?` · 📅 ${new Date(msg.sendAt).toLocaleString('en-AU',{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}` :''}
                </div>
                <div style="font-size:11px;color:#334155;margin-top:2px">Channel: ${msg.channel||'sms'}</div>
              </div>
            `}

            <!-- follow-ups -->
            <div style="border-top:1px solid #111827;padding-top:10px;margin-top:4px">
              <div style="font-size:10px;color:#334155;font-family:'JetBrains Mono';margin-bottom:6px">🔁 FOLLOW-UP SCHEDULE</div>
              ${(msg.followUps||[]).map((fu,i)=>`
                <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #0f172a">
                  <span class="fu-badge">Day ${fu.day}</span>
                  <span style="font-size:11px;color:#475569;flex:1">${fu.message.slice(0,55)}…</span>
                  <span style="font-size:10px;color:${fu.sent?'#4ade80':'#334155'}">${fu.sent?'✅ Sent':'⏳'}</span>
                </div>
              `).join('')}
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

function renderPipeline(body) {
  const stages = ['New','Contacted','Quote Sent','Won','Lost'];
  body.innerHTML = `
    <div class="fade" style="padding-top:10px">
      ${stages.map(s=>{
        const c = STATUS_COLOR[s];
        const sLeads = state.leads.filter(l=>l.status===s);
        const value = sLeads.reduce((a,l)=>a+((l.budgetMin||0)+(l.budgetMax||0))/2,0);
        return `
          <div class="card" style="margin-bottom:10px;padding:14px;border-color:${c.border}22">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <span style="font-size:13px;font-weight:800;color:${c.text}">${s}</span>
              <div style="display:flex;gap:8px;align-items:center">
                <span style="font-size:11px;font-weight:800;color:#4ade80;font-family:'JetBrains Mono'">$${value.toLocaleString()}</span>
                <span style="font-size:10px;color:#334155;font-family:'JetBrains Mono'">${sLeads.length} leads</span>
              </div>
            </div>
            ${sLeads.length===0?`<div style="text-align:center;padding:16px 0;color:#1e2a3a;font-size:12px">Empty</div>`:''}
            ${sLeads.map(l=>`
              <div onclick="openLeadModal('${l.id}')" style="background:#07080f;border:1px solid #0f172a;border-radius:10px;padding:10px;margin-bottom:6px;cursor:pointer;transition:border-color .15s"
                onmouseenter="this.style.borderColor='${c.border}'" onmouseleave="this.style.borderColor='#0f172a'">
                <div style="font-size:12px;font-weight:700;color:#e2e8f0;margin-bottom:4px;line-height:1.3">${l.title}</div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:11px;color:#475569">📍 ${(l.location||'').split(',')[0]}</span>
                  <span style="font-size:11px;font-weight:800;color:#4ade80;font-family:'JetBrains Mono'">${fmtBudget(l)}</span>
                </div>
              </div>`).join('')}
          </div>`;
      }).join('')}
    </div>`;
}

function renderSettings(body) {
  const s = state.settings;
  const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  body.innerHTML = `
    <div class="fade" style="padding-top:10px">

      <div class="card" style="padding:16px;margin-bottom:10px">
        <div style="font-size:12px;font-weight:800;color:#fff;margin-bottom:12px">🏢 Business Info</div>
        <label style="font-size:10px;color:#334155;font-family:'JetBrains Mono';display:block;margin-bottom:4px">BUSINESS NAME</label>
        <input value="${s.businessName}" onchange="state.settings.businessName=this.value"
          style="width:100%;background:#07080f;border:1px solid #1e2a3a;border-radius:8px;padding:8px 12px;font-size:13px;outline:none;color:#c8d0e8;margin-bottom:10px"/>
        <label style="font-size:10px;color:#334155;font-family:'JetBrains Mono';display:block;margin-bottom:4px">PHONE NUMBER</label>
        <input value="${s.phone}" onchange="state.settings.phone=this.value"
          style="width:100%;background:#07080f;border:1px solid #1e2a3a;border-radius:8px;padding:8px 12px;font-size:13px;outline:none;color:#c8d0e8"/>
      </div>

      <div class="card" style="padding:16px;margin-bottom:10px">
        <div style="font-size:12px;font-weight:800;color:#fff;margin-bottom:12px">⏰ Working Hours</div>

        <div style="font-size:10px;color:#334155;font-family:'JetBrains Mono';margin-bottom:8px">WORKING DAYS</div>
        <div style="display:flex;gap:6px;margin-bottom:14px">
          ${DAYS.map((d,i)=>`
            <button class="day-pill ${s.workDays.includes(i)?'on':''}" onclick="toggleDay(${i})">${d}</button>
          `).join('')}
        </div>

        <div style="display:flex;gap:10px;margin-bottom:12px">
          <div style="flex:1">
            <div style="font-size:10px;color:#334155;font-family:'JetBrains Mono';margin-bottom:4px">START</div>
            <input type="time" value="${s.workStart}" onchange="state.settings.workStart=this.value"
              class="time-input"/>
          </div>
          <div style="flex:1">
            <div style="font-size:10px;color:#334155;font-family:'JetBrains Mono';margin-bottom:4px">END</div>
            <input type="time" value="${s.workEnd}" onchange="state.settings.workEnd=this.value"
              class="time-input"/>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <button class="day-pill ${s.satEnabled?'on':''}" onclick="state.settings.satEnabled=!state.settings.satEnabled;renderSettings(document.getElementById('body'))" style="width:auto;padding:0 14px;border-radius:8px">Saturday</button>
          ${s.satEnabled?`
            <input type="time" value="${s.satStart}" onchange="state.settings.satStart=this.value" class="time-input"/>
            <span style="color:#334155">–</span>
            <input type="time" value="${s.satEnd}" onchange="state.settings.satEnd=this.value" class="time-input"/>
          `:'<span style="font-size:12px;color:#334155">Disabled</span>'}
        </div>
      </div>

      <div class="card" style="padding:16px;margin-bottom:10px">
        <div style="font-size:12px;font-weight:800;color:#fff;margin-bottom:12px">🔁 Follow-up Timing</div>
        ${[['followUp1','1st follow-up (days)'],['followUp2','2nd follow-up (days)'],['followUp3','3rd follow-up (days)']].map(([k,l])=>`
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <span style="font-size:13px;color:#94a3b8">${l}</span>
            <input type="number" value="${s[k]}" min="1" max="30" onchange="state.settings.${k}=parseInt(this.value)"
              style="width:70px;background:#07080f;border:1px solid #1e2a3a;border-radius:8px;padding:6px 10px;font-size:13px;color:#c8d0e8;outline:none;text-align:center"/>
          </div>
        `).join('')}
      </div>

      <div class="card" style="padding:16px;margin-bottom:10px">
        <div style="font-size:12px;font-weight:800;color:#fff;margin-bottom:12px">📡 Default Channel</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${[['sms','📱 SMS'],['whatsapp','💬 WhatsApp'],['email','📧 Email'],['facebook','👥 Facebook']].map(([ch,lbl])=>`
            <button class="btn" onclick="state.settings.defaultChannel='${ch}';renderSettings(document.getElementById('body'))"
              style="padding:8px 14px;font-size:12px;background:${s.defaultChannel===ch?'#f9731620':'#07080f'};border:1px solid ${s.defaultChannel===ch?'#f97316':'#1e2a3a'};color:${s.defaultChannel===ch?'#f97316':'#475569'}">
              ${lbl}
            </button>
          `).join('')}
        </div>
      </div>

      <button class="btn" onclick="saveSettings()"
        style="width:100%;padding:12px;font-size:14px;background:linear-gradient(135deg,#f97316,#ea580c);border:none;color:#fff;margin-bottom:20px">
        💾 Save Settings
      </button>
    </div>`;
}

function toggleDay(i) {
  const idx = state.settings.workDays.indexOf(i);
  if (idx>=0) state.settings.workDays.splice(idx,1);
  else state.settings.workDays.push(i);
  renderSettings(document.getElementById('body'));
}

async function saveSettings() {
  await apiPut('/api/settings', state.settings);
  showToast('✅ Settings saved');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
seedData();
updateStats();
render();
loadData(); // try to load from backend (no-op if no API_URL)
</script>
</body>
</html>
