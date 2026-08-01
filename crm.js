document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. TOAST NOTIFICATION UTILITY
  // ==========================================
  const toast = document.getElementById('toast-message');
  const toastText = document.getElementById('toast-text');

  function showToast(message, isSuccess = true) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    const icon = toast.querySelector('.toast-icon');
    if (icon) {
      icon.style.color = isSuccess ? '#10B981' : '#EF4444';
    }
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ==========================================
  // 2. STICKY NAVBAR SCROLL ACTION
  // ==========================================
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ==========================================
  // 3. MOBILE MENU TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const nav = document.querySelector('.nav');
  const overlay = document.getElementById('nav-overlay');

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.classList.toggle('open');
      nav.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
    });

    if (overlay) {
      overlay.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        nav.classList.remove('open');
        overlay.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    }

    const drawerLinks = nav.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        nav.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileToggle.classList.remove('open');
        nav.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // ==========================================
  // 4. AI EXECUTIVE DASHBOARD SIMULATOR
  // ==========================================
  const qButtons = document.querySelectorAll('.sim-q-btn');
  const responseBox = document.getElementById('ai-response-text');

  const responses = {
    "deals": "<strong>AI Forecast:</strong> 4 enterprise accounts (Acme Corp $1.2M, GlobalLogistics $850k, TechCorp $450k, Apex Health $320k) are at <strong>>90% win probability</strong> with expected close date before end of month.",
    "rep": "<strong>AI Insights:</strong> Sarah Jenkins leads with a <strong>42.8% win rate</strong> this quarter, outperforming average team benchmark by +14.2%. Primary driver: rapid automated initial response time (<8 mins).",
    "contact": "<strong>AI Alert:</strong> 6 high-value accounts have exceeded 30 days without engagement. Top priority: <strong>Industrial Synergy ($650k potential ARR)</strong>. Recommended Action: Trigger automated re-engagement campaign.",
    "risk": "<strong>AI Risk Prediction:</strong> Apex Logistics (Churn Risk: <strong>78%</strong> due to drop in weekly active platform logins). Recommended Action: Schedule CSM Executive Review & issue health check ticket.",
    "revenue": "<strong>AI Revenue Projection:</strong> <strong>$4,850,000 for Q3</strong> (+18.4% YoY growth), backed by 142 active pipeline deals with weighted machine learning conversion modeling."
  };

  qButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const qKey = btn.getAttribute('data-q');
      
      qButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (responseBox && responses[qKey]) {
        responseBox.style.opacity = '0.4';
        setTimeout(() => {
          responseBox.innerHTML = responses[qKey];
          responseBox.style.opacity = '1';
        }, 150);
      }
    });
  });

  // ==========================================
  // 5. ANIMATE PIPELINE BARS ON LOAD
  // ==========================================
  const fills = document.querySelectorAll('.stage-bar-fill');
  fills.forEach(fill => {
    const targetWidth = fill.style.width;
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.width = targetWidth;
    }, 300);
  });

  // ==========================================
  // 6. FAQ ACCORDION TRANSITIONS
  // ==========================================
  const faqHeaders = document.querySelectorAll('.faq-header');
  
  faqHeaders.forEach(headerEl => {
    headerEl.addEventListener('click', () => {
      const faqItem = headerEl.parentElement;
      const faqBody = faqItem.querySelector('.faq-body');
      const isOpen = faqItem.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('open');
        const b = item.querySelector('.faq-body');
        if (b) b.style.height = '0px';
      });

      if (!isOpen && faqBody) {
        faqItem.classList.add('open');
        faqBody.style.height = `${faqBody.scrollHeight}px`;
      }
    });
  });

  // Newsletter Form Handler
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const email = emailInput ? emailInput.value : '';
      showToast(`Successfully subscribed with ${email}! Welcome to VGT AI CRM.`);
      newsletterForm.reset();
    });
  }

  // ==========================================
  // 7. FEATURE SUITE TAB MODULE SWITCHER
  // ==========================================
  const featureTabs = document.querySelectorAll('.feature-nav-tab');
  const stageInfoBadge = document.getElementById('stage-badge-text');
  const stageInfoTitle = document.getElementById('stage-title-text');
  const stageInfoDesc = document.getElementById('stage-desc-text');
  const stageTelemetry = document.getElementById('stage-telemetry-text');
  const stageGrid = document.getElementById('stage-grid-container');

  const moduleData = {
    "lead": {
      badge: "MODULE 01 • LEAD INTELLIGENCE",
      title: "Lead Management",
      desc: "Generate, assign, qualify, and nurture leads automatically with predictive artificial intelligence.",
      telemetry: "<strong>Lead Qualification Speed: &lt;0.5s</strong>Auto-assigned to best-matched sales representative.",
      features: [
        { name: "Lead Capture", status: "Active Stream" },
        { name: "Lead Assignment", status: "Automated Rules" },
        { name: "AI Lead Scoring", status: "Predictive ML" },
        { name: "Duplicate Detection", status: "Real-time Scrub" },
        { name: "Lead Tracking", status: "360° Timeline" },
        { name: "Lead Qualification", status: "AI Criteria" },
        { name: "Follow-up Reminders", status: "Smart Alerts" },
        { name: "Lead Source Analytics", status: "ROI Attribution" },
        { name: "Campaign Attribution", status: "Multi-touch" },
        { name: "Web Form Integration", status: "REST Webhooks" }
      ]
    },
    "contact": {
      badge: "MODULE 02 • CUSTOMER PROFILES",
      title: "Contact Management",
      desc: "Maintain complete, 360-degree customer profiles and communication histories in one centralized cloud database.",
      telemetry: "<strong>Customer Profile Accuracy: 99.8%</strong>Unified email, phone, social, and transaction history.",
      features: [
        { name: "Customer Database", status: "Unified Vault" },
        { name: "Contact History", status: "Full Audit" },
        { name: "Communication Timeline", status: "Live Feed" },
        { name: "Notes & Activities", status: "Team Sync" },
        { name: "File Management", status: "Secure Cloud" },
        { name: "Email Tracking", status: "Open/Click Analytics" },
        { name: "Social Media Links", status: "LinkedIn Auto-sync" },
        { name: "Multiple Contacts", status: "Account Mapping" },
        { name: "Customer Segmentation", status: "Dynamic AI Tags" }
      ]
    },
    "opportunity": {
      badge: "MODULE 03 • PIPELINE VELOCITY",
      title: "Opportunity Management",
      desc: "Track every sales opportunity seamlessly from initial inquiry through quotation and negotiation to closed deal.",
      telemetry: "<strong>Pipeline Win Rate: +38%</strong>AI predicts win probability and alerts closing risk.",
      features: [
        { name: "Sales Pipeline", status: "Visual Board" },
        { name: "Opportunity Tracking", status: "Stage Gate" },
        { name: "Probability Forecasting", status: "Machine Learning" },
        { name: "AI Deal Predictions", status: "Closing Risk Alert" },
        { name: "Quotation Management", status: "1-Click PDF Quote" },
        { name: "Contract Management", status: "E-Signature Ready" },
        { name: "Revenue Forecasting", status: "Weighted Target" },
        { name: "Competitor Analysis", status: "Battlecard Insights" }
      ]
    },
    "automation": {
      badge: "MODULE 04 • WORKFLOW EFFICIENCY",
      title: "Sales Automation",
      desc: "Automate repetitive sales tasks, email sequences, and meeting scheduling so reps focus on closing deals.",
      telemetry: "<strong>Time Saved per Rep: 14 hrs/wk</strong>Manual data entry reduced by 85%.",
      features: [
        { name: "Email Sequences", status: "Multi-drip Campaigns" },
        { name: "Task Automation", status: "Trigger-based" },
        { name: "Meeting Scheduling", status: "Calendar Sync" },
        { name: "Proposal Generation", status: "AI Smart Draft" },
        { name: "Quote Creation", status: "Instant Pricing" },
        { name: "Sales Follow-up", status: "Automated Cadence" },
        { name: "Customer Notifications", status: "Omnichannel" },
        { name: "Workflow Automation", status: "Custom Logic" }
      ]
    },
    "ai_assistant": {
      badge: "MODULE 05 • AUTONOMOUS COMPANION",
      title: "AI Sales Assistant",
      desc: "Your 24/7 intelligent sales companion providing next-best action recommendations and conversation intelligence.",
      telemetry: "<strong>AI Deal Velocity: 2.4x Faster</strong>Generates emails, action plans, and meeting notes in seconds.",
      features: [
        { name: "Suggest Next Best Action", status: "Real-time AI Guidance" },
        { name: "Predict Closing Probability", status: "ML Probability Meter" },
        { name: "Customer Sentiment Analysis", status: "NLP Call/Email Scan" },
        { name: "Upselling Recommendations", status: "Product Match AI" },
        { name: "Cross-Selling Opportunities", status: "Account Expansion" },
        { name: "AI Email Drafting", status: "Context Aware" },
        { name: "AI Meeting Summaries", status: "Auto Transcription" },
        { name: "Conversation Intelligence", status: "Objection Handling" }
      ]
    },
    "service": {
      badge: "MODULE 06 • CUSTOMER SUPPORT",
      title: "Customer Service Management",
      desc: "Deliver exceptional customer support with automated ticketing, SLA tracking, knowledge base, and live AI chatbots.",
      telemetry: "<strong>First Contact Resolution: 84%</strong>AI chatbot answers 45% of support requests automatically.",
      features: [
        { name: "Ticket Management", status: "Omnichannel Desk" },
        { name: "Case Management", status: "Escalation Matrix" },
        { name: "Knowledge Base", status: "Self-Service Portal" },
        { name: "SLA Tracking", status: "Breach Warning" },
        { name: "Customer Feedback", status: "CSAT & NPS Sync" },
        { name: "Live Chat", status: "Agent Console" },
        { name: "AI Chatbot", status: "24/7 Auto Answer" },
        { name: "Omnichannel Support", status: "Email, WhatsApp, Web" }
      ]
    },
    "marketing": {
      badge: "MODULE 07 • CAMPAIGN ROI",
      title: "Marketing Automation",
      desc: "Create targeted multi-channel marketing campaigns, track ROI, and guide prospects along optimized customer journeys.",
      telemetry: "<strong>Campaign Lead Yield: +52%</strong>Automated nurture sequences drive 3x conversion.",
      features: [
        { name: "Email Marketing", status: "Visual Designer" },
        { name: "SMS Campaigns", status: "Instant Delivery" },
        { name: "WhatsApp Integration", status: "Official Business API" },
        { name: "Landing Pages", status: "High Converting" },
        { name: "Marketing Automation", status: "Behavior Triggers" },
        { name: "Campaign Tracking", status: "Real-time Analytics" },
        { name: "ROI Analytics", status: "Cost Per Acquisition" },
        { name: "Customer Journey Mapping", status: "Multi-Touch Attribution" }
      ]
    }
  };

  if (featureTabs.length > 0 && stageGrid) {
    featureTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const modKey = tab.getAttribute('data-module');
        if (!moduleData[modKey]) return;

        featureTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const data = moduleData[modKey];

        // Animate left side info transition
        const stageCard = document.querySelector('.feature-stage-card');
        if (stageCard) stageCard.style.opacity = '0.5';

        setTimeout(() => {
          if (stageInfoBadge) stageInfoBadge.textContent = data.badge;
          if (stageInfoTitle) stageInfoTitle.textContent = data.title;
          if (stageInfoDesc) stageInfoDesc.textContent = data.desc;
          if (stageTelemetry) stageTelemetry.innerHTML = data.telemetry;

          // Build micro feature cards
          let gridHtml = '';
          data.features.forEach(f => {
            gridHtml += `
              <div class="micro-feature-card">
                <div class="micro-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="micro-feature-info">
                  <div class="micro-feature-title">${f.name}</div>
                  <div class="micro-feature-status">${f.status}</div>
                </div>
              </div>
            `;
          });
          stageGrid.innerHTML = gridHtml;

          if (stageCard) stageCard.style.opacity = '1';
        }, 150);
      });
    });
  }

});
