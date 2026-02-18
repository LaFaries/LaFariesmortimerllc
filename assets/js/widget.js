<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>LaFaries Chat Widget</title>
<style>
  /* ── LAUNCHER BUTTON ── */
  #lf-launcher {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    filter: drop-shadow(0 8px 24px rgba(0,0,0,0.28));
    transition: transform .2s ease;
  }
  #lf-launcher:hover { transform: scale(1.04); }
  #lf-launcher .avatar-wrap {
    width: 90px; height: 90px;
    border-radius: 50%; overflow: hidden;
    border: 3px solid #c9a84c;
    background: #1a1a2e;
  }
  #lf-launcher .avatar-wrap img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: top center;
  }
  #lf-launcher .bubble-tab {
    margin-top: -6px;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    color: #c9a84c;
    font-size: 12px; font-weight: 700;
    padding: 7px 16px; border-radius: 20px;
    border: 1.5px solid #c9a84c; white-space: nowrap;
    box-shadow: 0 4px 12px rgba(0,0,0,.3);
  }
  #lf-launcher::before {
    content: '';
    position: absolute; top: -6px; left: -6px;
    width: 102px; height: 102px; border-radius: 50%;
    border: 2px solid rgba(201,168,76,.5);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    70% { transform: scale(1.15); opacity: 0; }
    100% { transform: scale(1.15); opacity: 0; }
  }

  /* ── CHAT PANEL ── */
  #lf-panel {
    position: fixed; bottom: 160px; right: 28px;
    width: 370px; max-height: 560px;
    border-radius: 20px; overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,.35);
    z-index: 9998; display: none; flex-direction: column;
    border: 1px solid rgba(201,168,76,.3);
    animation: slideUp .3s ease;
  }
  #lf-panel.open { display: flex; }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .lf-header {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    padding: 16px 18px; display: flex; align-items: center; gap: 12px;
    border-bottom: 1px solid rgba(201,168,76,.25);
  }
  .lf-header .h-avatar {
    width: 48px; height: 48px; border-radius: 50%;
    overflow: hidden; border: 2px solid #c9a84c; flex-shrink: 0;
  }
  .lf-header .h-avatar img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
  .lf-header .h-name { color: #c9a84c; font-weight: 700; font-size: 15px; }
  .lf-header .h-status {
    color: rgba(255,255,255,.65); font-size: 11px; margin-top: 2px;
    display: flex; align-items: center; gap: 5px;
  }
  .lf-header .h-status::before {
    content: ''; width: 7px; height: 7px; border-radius: 50%;
    background: #4caf50; display: inline-block;
  }
  .lf-header .h-close { color: rgba(255,255,255,.5); font-size: 20px; cursor: pointer; margin-left:auto; transition: color .2s; }
  .lf-header .h-close:hover { color: #c9a84c; }
  .lf-messages {
    flex: 1; overflow-y: auto; padding: 18px 16px;
    display: flex; flex-direction: column; gap: 12px;
    background: #0d0d1a; max-height: 360px;
  }
  .msg { display: flex; gap: 8px; align-items: flex-end; max-width: 88%; }
  .msg.bot { align-self: flex-start; }
  .msg.user { align-self: flex-end; flex-direction: row-reverse; }
  .msg .m-avatar { width: 28px; height: 28px; border-radius: 50%; overflow: hidden; border: 1.5px solid #c9a84c; flex-shrink: 0; }
  .msg .m-avatar img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .msg .bubble { padding: 10px 14px; border-radius: 16px; font-size: 13.5px; line-height: 1.5; }
  .msg.bot .bubble { background: #1e1e3a; color: #e8e8f0; border-bottom-left-radius: 4px; border: 1px solid rgba(201,168,76,.15); }
  .msg.user .bubble { background: linear-gradient(135deg, #c9a84c, #b8932a); color: #fff; border-bottom-right-radius: 4px; }
  .quick-chips { display: flex; flex-wrap: wrap; gap: 7px; padding: 10px 16px 14px; background: #0d0d1a; }
  .chip {
    background: transparent; border: 1.5px solid rgba(201,168,76,.5);
    color: #c9a84c; border-radius: 20px; padding: 6px 13px;
    font-size: 12px; cursor: pointer; transition: all .2s; font-family: inherit;
  }
  .chip:hover { background: #c9a84c; color: #1a1a2e; font-weight: 600; }
  .typing-indicator { display: flex; gap: 4px; align-items: center; padding: 10px 14px; background: #1e1e3a; border-radius: 16px; border-bottom-left-radius: 4px; width: fit-content; }
  .typing-indicator span { width: 7px; height: 7px; border-radius: 50%; background: #c9a84c; animation: bounce 1.2s infinite; }
  .typing-indicator span:nth-child(2) { animation-delay: .2s; }
  .typing-indicator span:nth-child(3) { animation-delay: .4s; }
  @keyframes bounce { 0%,60%,100% { transform: translateY(0); opacity:.6; } 30% { transform: translateY(-6px); opacity:1; } }
  .lf-input-area { background: #12122a; border-top: 1px solid rgba(201,168,76,.2); padding: 12px 14px; display: flex; gap: 10px; align-items: center; }
  .lf-input-area input { flex: 1; background: #1e1e3a; border: 1px solid rgba(201,168,76,.25); border-radius: 24px; padding: 10px 16px; color: #e8e8f0; font-size: 13.5px; font-family: inherit; outline: none; transition: border-color .2s; }
  .lf-input-area input::placeholder { color: rgba(255,255,255,.3); }
  .lf-input-area input:focus { border-color: #c9a84c; }
  .lf-send { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #c9a84c, #b8932a); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform .2s; }
  .lf-send:hover { transform: scale(1.08); }
  .lf-send svg { width: 18px; height: 18px; fill: #fff; }
  .lf-footer { background: #0d0d1a; text-align: center; padding: 6px; font-size: 10px; color: rgba(255,255,255,.25); }
  .lf-footer a { color: rgba(201,168,76,.5); text-decoration: none; }
</style>
</head>
<body>

<div id="lf-launcher" onclick="toggleChat()">
  <div class="avatar-wrap">
    <img src="/assets/img/lafaries-avatar.jpg" alt="LaFaries"/>
  </div>
  <div class="bubble-tab">👋 Hi, I'm LaFaries — Let's Chat!</div>
</div>

<div id="lf-panel">
  <div class="lf-header">
    <div class="h-avatar"><img src="/assets/img/lafaries-avatar.jpg" alt="LaFaries"/></div>
    <div style="flex:1">
      <div class="h-name">LaFaries</div>
      <div class="h-status">Online · LaFaries Mortimer LLC</div>
    </div>
    <div class="h-close" onclick="toggleChat()">✕</div>
  </div>
  <div class="lf-messages" id="lf-messages"></div>
  <div class="quick-chips" id="quick-chips">
    <button class="chip" onclick="sendChip('Tell me about LAAP Suite')">📋 LAAP Suite</button>
    <button class="chip" onclick="sendChip('What are your AI Agent services?')">🤖 AI Agents</button>
    <button class="chip" onclick="sendChip('What free tools do you offer?')">🆓 Free Tools</button>
    <button class="chip" onclick="sendChip('I want to book a call')">📅 Book a Call</button>
  </div>
  <div class="lf-input-area">
    <input type="text" id="lf-input" placeholder="Ask me anything…" onkeydown="if(event.key==='Enter') sendMessage()"/>
    <button class="lf-send" onclick="sendMessage()">
      <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
    </button>
  </div>
  <div class="lf-footer">Powered by <a href="https://lafariesmortimerllc.com">LaFaries Mortimer LLC</a></div>
</div>

<script>
const SYSTEM_PROMPT = `You are LaFaries, the friendly AI assistant for LaFaries Mortimer LLC — an Administrative & IT Services company based in Miami, FL providing virtual support nationwide.

COMPANY INFO:
LaFaries Mortimer LLC specializes in business formation, compliance systems, administrative automation, AI-powered support, custom websites, and ongoing IT/admin management. Mission: Organize businesses with clarity, credibility, and automated systems.

SERVICES & PRICING:

1. LAAP Suite™ - $79/month (promo, normally $99)
   - Complete business operating system
   - Guided 10-step formation wizard
   - Automated filings & documentation
   - Compliance tracking (all 50 states)
   - Annual maintenance & renewals
   - Document & record management
   - AI-assisted guidance
   URL: lafariesmortimerllc.com/laap

2. AI Agent Services - Custom quote
   - 24/7 automated customer support
   - Answer calls automatically
   - Follow up on leads
   - Guide customers through processes
   - Schedule appointments
   - Professional representation
   URL: lafariesmortimerllc.com/contact

3. Custom Websites - Custom quote
   - Strategic website design
   - Custom layout & branding
   - Mobile-optimized responsive design
   - Integrated with LAAP Suite (optional)
   - Hosted & maintained
   - SEO-friendly
   URL: lafariesmortimerllc.com/contact

4. Managed Support - Custom quote
   - Administrative support
   - IT setup & troubleshooting
   - AI agent deployment
   - Ongoing guidance & maintenance
   URL: lafariesmortimerllc.com/contact

5. Free Tools - $0
   - Invoice Generator, Business Name Checker
   - LLC Operating Agreement template
   - Meeting Minutes Maker, EIN Checklist
   - Legacy & Family Tools (desktop app)
   - Tutorial library with PDF/Word downloads
   - Family tree builder, legacy letter generator
   URL: lafariesmortimerllc.com/apps or /free

CONTACT:
Location: Miami, FL (virtual support)
Email: support@lafariesmortimerllc.com
Response time: 24-48 hours
Book a call: lafariesmortimerllc.com/contact

TONE & STYLE:
- Keep replies concise: 2-4 sentences maximum
- Be warm, confident, and professional
- Always guide visitors toward booking a call or the right service page
- For detailed pricing on custom services, invite them to book a call
- Emphasize that LAAP Suite is currently $79/month (promo price)
- Highlight that free tools are available with no account required`;

let history = [];

function toggleChat() {
  const panel = document.getElementById('lf-panel');
  const isOpen = panel.classList.toggle('open');
  if (isOpen && history.length === 0) {
    addMsg('bot', "Hi! I'm <strong>LaFaries</strong>, your virtual assistant for LaFaries Mortimer LLC. Whether it's the LAAP Suite™, AI Agents, free tools, or booking a call — I'm here to help! 👇");
  }
}

function addMsg(role, html) {
  const c = document.getElementById('lf-messages');
  const d = document.createElement('div');
  d.className = `msg ${role}`;
  d.innerHTML = role === 'bot'
    ? `<div class="m-avatar"><img src="/assets/img/lafaries-avatar.jpg"/></div><div class="bubble">${html}</div>`
    : `<div class="bubble">${html}</div>`;
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
}

function showTyping() {
  const c = document.getElementById('lf-messages');
  const d = document.createElement('div');
  d.className = 'msg bot'; d.id = 'typing-msg';
  d.innerHTML = `<div class="m-avatar"><img src="/assets/img/lafaries-avatar.jpg"/></div><div class="typing-indicator"><span></span><span></span><span></span></div>`;
  c.appendChild(d); c.scrollTop = c.scrollHeight;
}

function removeTyping() { document.getElementById('typing-msg')?.remove(); }

async function sendMessage() {
  const inp = document.getElementById('lf-input');
  const text = inp.value.trim(); if (!text) return;
  inp.value = ''; doSend(text);
}

function sendChip(text) {
  document.getElementById('quick-chips').style.display = 'none';
  doSend(text);
}

async function doSend(text) {
  addMsg('user', text);
  history.push({ role: 'user', content: text });
  showTyping();
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: history
      })
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text || "Sorry, try again!";
    removeTyping();
    addMsg('bot', reply.replace(/\n/g,'<br>'));
    history.push({ role: 'assistant', content: reply });
  } catch(e) {
    removeTyping();
    addMsg('bot', "I'm having a moment — please visit <a href='https://lafariesmortimerllc.com/contact' style='color:#c9a84c'>our contact page</a>!");
  }
}
</script>
</body>
</html>
