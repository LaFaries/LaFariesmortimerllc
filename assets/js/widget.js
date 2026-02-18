/* ================================================
   LAFARIES AI CHAT WIDGET
   Load this on any page with:
   <script src="/assets/js/widget.js"></script>
   ================================================ */

(function () {

  /* ── Inject CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    #lf-launcher{
      position:fixed;bottom:28px;right:28px;
      z-index:99999;display:flex;flex-direction:column;
      align-items:center;cursor:pointer;
      filter:drop-shadow(0 8px 24px rgba(0,0,0,.32));
      transition:transform .2s ease;
      font-family:"Inter",system-ui;
    }
    #lf-launcher:hover{transform:scale(1.04);}
    #lf-launcher .lf-av-wrap{
      width:88px;height:88px;border-radius:50%;overflow:hidden;
      border:3px solid #DAB85C;background:#1a1a2e;
    }
    #lf-launcher .lf-av-wrap img{
      width:100%;height:100%;
      object-fit:cover;object-position:top center;
    }
    #lf-launcher .lf-bubble-tab{
      margin-top:-6px;
      background:linear-gradient(135deg,#1a1a2e,#16213e);
      color:#DAB85C;font-size:11.5px;font-weight:700;
      letter-spacing:.4px;padding:7px 15px;border-radius:20px;
      border:1.5px solid #DAB85C;white-space:nowrap;
      box-shadow:0 4px 14px rgba(0,0,0,.35);
    }
    #lf-launcher::before{
      content:'';position:absolute;top:-6px;left:-6px;
      width:100px;height:100px;border-radius:50%;
      border:2px solid rgba(218,184,92,.45);
      animation:lf-pulse 2.2s infinite;
    }
    @keyframes lf-pulse{
      0%{transform:scale(1);opacity:1;}
      70%{transform:scale(1.16);opacity:0;}
      100%{transform:scale(1.16);opacity:0;}
    }
    #lf-panel{
      position:fixed;bottom:158px;right:28px;
      width:368px;border-radius:22px;overflow:hidden;
      box-shadow:0 24px 70px rgba(0,0,0,.4);
      z-index:99998;display:none;flex-direction:column;
      border:1px solid rgba(218,184,92,.3);
      font-family:"Inter",system-ui;
    }
    #lf-panel.lf-open{display:flex;animation:lf-slideUp .3s ease;}
    @keyframes lf-slideUp{
      from{opacity:0;transform:translateY(18px);}
      to{opacity:1;transform:translateY(0);}
    }
    .lf-hdr{
      background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);
      padding:15px 17px;display:flex;align-items:center;gap:11px;
      border-bottom:1px solid rgba(218,184,92,.2);
    }
    .lf-hdr-av{
      width:46px;height:46px;border-radius:50%;overflow:hidden;
      border:2px solid #DAB85C;flex-shrink:0;
    }
    .lf-hdr-av img{width:100%;height:100%;object-fit:cover;object-position:top center;}
    .lf-hdr-name{color:#DAB85C;font-weight:700;font-size:14.5px;}
    .lf-hdr-status{
      color:rgba(255,255,255,.6);font-size:11px;margin-top:2px;
      display:flex;align-items:center;gap:5px;
    }
    .lf-hdr-status::before{
      content:'';width:7px;height:7px;border-radius:50%;
      background:#4caf50;display:inline-block;
    }
    .lf-hdr-close{
      color:rgba(255,255,255,.45);font-size:19px;
      cursor:pointer;margin-left:auto;line-height:1;
      transition:color .2s;
    }
    .lf-hdr-close:hover{color:#DAB85C;}
    .lf-msgs{
      flex:1;overflow-y:auto;padding:16px 15px;
      display:flex;flex-direction:column;gap:11px;
      background:#0d0d1a;max-height:350px;
    }
    .lf-msgs::-webkit-scrollbar{width:3px;}
    .lf-msgs::-webkit-scrollbar-thumb{background:rgba(218,184,92,.25);border-radius:4px;}
    .lf-msg{display:flex;gap:8px;align-items:flex-end;max-width:90%;}
    .lf-msg.lf-bot{align-self:flex-start;}
    .lf-msg.lf-user{align-self:flex-end;flex-direction:row-reverse;}
    .lf-msg-av{
      width:27px;height:27px;border-radius:50%;overflow:hidden;
      border:1.5px solid #DAB85C;flex-shrink:0;
    }
    .lf-msg-av img{width:100%;height:100%;object-fit:cover;object-position:top;}
    .lf-bbl{padding:9px 13px;border-radius:16px;font-size:13px;line-height:1.55;}
    .lf-bot .lf-bbl{
      background:#1e1e3a;color:#e8e8f0;
      border-bottom-left-radius:4px;
      border:1px solid rgba(218,184,92,.12);
    }
    .lf-user .lf-bbl{
      background:linear-gradient(135deg,#DAB85C,#b8932a);
      color:#fff;border-bottom-right-radius:4px;
    }
    .lf-chips{
      display:flex;flex-wrap:wrap;gap:7px;
      padding:10px 15px 13px;background:#0d0d1a;
    }
    .lf-chip{
      background:transparent;border:1.5px solid rgba(218,184,92,.45);
      color:#DAB85C;border-radius:20px;padding:6px 12px;
      font-size:11.5px;cursor:pointer;transition:all .2s;
    }
    .lf-chip:hover{background:#DAB85C;color:#1a1a2e;font-weight:600;}
    .lf-typing{
      display:flex;gap:4px;align-items:center;
      padding:9px 13px;background:#1e1e3a;
      border-radius:16px;border-bottom-left-radius:4px;
      width:fit-content;border:1px solid rgba(218,184,92,.12);
    }
    .lf-typing span{
      width:6px;height:6px;border-radius:50%;
      background:#DAB85C;animation:lf-bounce 1.2s infinite;
    }
    .lf-typing span:nth-child(2){animation-delay:.2s;}
    .lf-typing span:nth-child(3){animation-delay:.4s;}
    @keyframes lf-bounce{
      0%,60%,100%{transform:translateY(0);opacity:.5;}
      30%{transform:translateY(-5px);opacity:1;}
    }
    .lf-input-row{
      background:#12122a;border-top:1px solid rgba(218,184,92,.18);
      padding:11px 13px;display:flex;gap:9px;align-items:center;
    }
    .lf-input-row input{
      flex:1;background:#1e1e3a;
      border:1px solid rgba(218,184,92,.22);border-radius:22px;
      padding:9px 15px;color:#e8e8f0;font-size:13px;
      outline:none;transition:border-color .2s;
    }
    .lf-input-row input::placeholder{color:rgba(255,255,255,.28);}
    .lf-input-row input:focus{border-color:#DAB85C;}
    .lf-send-btn{
      width:38px;height:38px;border-radius:50%;
      background:linear-gradient(135deg,#DAB85C,#b8932a);
      border:none;cursor:pointer;display:flex;
      align-items:center;justify-content:center;flex-shrink:0;
      transition:transform .2s,box-shadow .2s;
    }
    .lf-send-btn:hover{transform:scale(1.09);box-shadow:0 4px 14px rgba(218,184,92,.4);}
    .lf-send-btn svg{width:17px;height:17px;fill:#fff;}
    .lf-widget-footer{
      background:#0d0d1a;text-align:center;padding:5px;
      font-size:10px;color:rgba(255,255,255,.22);
    }
    .lf-widget-footer a{color:rgba(218,184,92,.45);text-decoration:none;}
  `;
  document.head.appendChild(style);

  /* ── Inject HTML ── */
  const html = `
    <div id="lf-launcher" onclick="lfToggle()">
      <div class="lf-av-wrap">
        <img src="/assets/img/lafaries-avatar.jpg" alt="LaFaries"/>
      </div>
      <div class="lf-bubble-tab">&#x1F44B; Hi, I'm LaFaries — Let's Chat!</div>
    </div>

    <div id="lf-panel">
      <div class="lf-hdr">
        <div class="lf-hdr-av">
          <img src="/assets/img/lafaries-avatar.jpg" alt="LaFaries"/>
        </div>
        <div>
          <div class="lf-hdr-name">LaFaries</div>
          <div class="lf-hdr-status">Online · LaFaries Mortimer LLC</div>
        </div>
        <div class="lf-hdr-close" onclick="lfToggle()">&#x2715;</div>
      </div>
      <div class="lf-msgs" id="lf-msgs"></div>
      <div class="lf-chips" id="lf-chips">
        <button class="lf-chip" onclick="lfChip('Tell me about LAAP Suite')">&#x1F4CB; LAAP Suite</button>
        <button class="lf-chip" onclick="lfChip('What are your AI Agent services?')">&#x1F916; AI Agents</button>
        <button class="lf-chip" onclick="lfChip('What free tools do you offer?')">&#x1F193; Free Tools</button>
        <button class="lf-chip" onclick="lfChip('I want to book a call')">&#x1F4C5; Book a Call</button>
      </div>
      <div class="lf-input-row">
        <input type="text" id="lf-input" placeholder="Ask me anything…"
          onkeydown="if(event.key==='Enter') lfSend()"/>
        <button class="lf-send-btn" onclick="lfSend()">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
      <div class="lf-widget-footer">
        Powered by <a href="https://lafariesmortimerllc.com">LaFaries Mortimer LLC</a> · AI Assistant
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);

  /* ── Widget Logic ── */
  const LF_SYSTEM = `You are LaFaries, the friendly AI assistant for LaFaries Mortimer LLC — an Administrative & IT Services company based in Miami, FL (virtual support).

You help visitors with:
1. LAAP Suite™ — All-in-one business operating system: automated filings, formation, compliance, documentation, yearly renewals. Page: lafariesmortimerllc.com/laap
2. AI Agent Services — 24/7 AI that answers calls, follows up leads, and guides customers automatically. Page: lafariesmortimerllc.com/contact
3. Free Tools — Free tutorials (no account needed) and DIY professional templates. Page: lafariesmortimerllc.com/free
4. Book a Call — Free consultation. Page: lafariesmortimerllc.com/contact

Guidelines:
- Keep replies concise: 2–4 sentences max.
- Be warm, confident, and professional — like a trusted business advisor.
- Always guide visitors toward booking a call or the right service page.
- For pricing questions, say plans vary and invite them to book a call for details.
- If asked who you are, say you're LaFaries, the AI assistant for LaFaries Mortimer LLC.`;

  let lfHistory = [];
  let lfOpen = false;

  window.lfToggle = function () {
    lfOpen = !lfOpen;
    const panel = document.getElementById('lf-panel');
    if (lfOpen) {
      panel.classList.add('lf-open');
      if (lfHistory.length === 0) lfWelcome();
    } else {
      panel.classList.remove('lf-open');
    }
  };

  function lfWelcome() {
    lfAddMsg('bot', "Hi! I'm <strong>LaFaries</strong> — your virtual assistant for LaFaries Mortimer LLC. I can help with LAAP Suite™, AI Agents, free tools, or getting you booked for a call. What can I help you with today? 👇");
  }

  function lfAddMsg(role, html) {
    const c = document.getElementById('lf-msgs');
    const d = document.createElement('div');
    d.className = `lf-msg lf-${role}`;
    if (role === 'bot') {
      d.innerHTML = `<div class="lf-msg-av"><img src="/assets/img/lafaries-avatar.jpg" alt="LaFaries"/></div><div class="lf-bbl">${html}</div>`;
    } else {
      d.innerHTML = `<div class="lf-bbl">${html}</div>`;
    }
    c.appendChild(d);
    c.scrollTop = c.scrollHeight;
  }

  function lfShowTyping() {
    const c = document.getElementById('lf-msgs');
    const d = document.createElement('div');
    d.className = 'lf-msg lf-bot';
    d.id = 'lf-typing';
    d.innerHTML = `<div class="lf-msg-av"><img src="/assets/img/lafaries-avatar.jpg" alt="LaFaries"/></div><div class="lf-typing"><span></span><span></span><span></span></div>`;
    c.appendChild(d);
    c.scrollTop = c.scrollHeight;
  }

  function lfRemoveTyping() {
    document.getElementById('lf-typing')?.remove();
  }

  window.lfSend = function () {
    const inp = document.getElementById('lf-input');
    const text = inp.value.trim();
    if (!text) return;
    inp.value = '';
    lfDoSend(text);
  };

  window.lfChip = function (text) {
    document.getElementById('lf-chips').style.display = 'none';
    lfDoSend(text);
  };

  async function lfDoSend(text) {
    lfAddMsg('user', text);
    lfHistory.push({ role: 'user', content: text });
    lfShowTyping();
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: LF_SYSTEM,
          messages: lfHistory
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I hit a snag — please try again!";
      lfRemoveTyping();
      lfAddMsg('bot', reply.replace(/\n/g, '<br>'));
      lfHistory.push({ role: 'assistant', content: reply });
    } catch (e) {
      lfRemoveTyping();
      lfAddMsg('bot', "I'm having a moment! Please visit <a href='https://lafariesmortimerllc.com/contact' style='color:#DAB85C'>our contact page</a> directly.");
    }
  }

})();
