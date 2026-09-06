(function () {
  "use strict";

  (function initDiagLightningNoise() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var a = document.getElementById("nexus-diag-turb-a");
    var b = document.getElementById("nexus-diag-turb-b");
    if (!a || !b) return;
    window.setInterval(function () {
      var s = String(1 + ((Math.random() * 997) | 0));
      a.setAttribute("seed", s);
      b.setAttribute("seed", s);
    }, 320);
  })();

  (function initScrollProgress() {
    var fill = document.getElementById("scroll-progress-fill");
    if (!fill) return;

    function update() {
      var docEl = document.documentElement;
      var body = document.body;
      var scrollTop = window.scrollY != null ? window.scrollY : docEl.scrollTop;
      var scrollHeight = Math.max(body.scrollHeight, docEl.scrollHeight);
      var viewH = window.innerHeight;
      var track = scrollHeight - viewH;
      var p = track <= 0 ? 0 : (scrollTop / track) * 100;
      if (p < 0) p = 0;
      if (p > 100) p = 100;
      fill.style.width = p + "%";
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", update);
    } else {
      update();
    }
  })();

  (function initOfferModal() {
    var showOfferPopup = true;
    var offerEndDate = "2026-05-31T23:59:59";
    var OFFER_SESSION_KEY = "nds_offer_popup_dismissed";
    var OFFER_DELAY_MS = 8000;
    /** WhatsApp: country code + number, no + (edit to your number) */
    var WHATSAPP_E164 = "306936732844";

    var modal = document.getElementById("offer-modal");
    if (!modal || !showOfferPopup) return;

    var end = new Date(offerEndDate);
    if (isNaN(end.getTime()) || new Date() > end) return;

    var dismissed = false;
    try {
      dismissed = sessionStorage.getItem(OFFER_SESSION_KEY) === "1";
    } catch (e) {}
    if (dismissed) return;

    var backdrop = document.getElementById("offer-modal-backdrop");
    var btnClose = document.getElementById("offer-modal-close");
    var btnPrimary = document.getElementById("offer-modal-primary");
    var btnDismiss = document.getElementById("offer-modal-dismiss");
    var contactSection = document.getElementById("contact");
    var messageTa = document.getElementById("contact-message");
    var formPanel = document.querySelector(".contact-form-panel");

    var OFFER_FORM_MESSAGE =
      "I'm interested in the €250 website offer.\nMy business is:\nMy needs are:\nPreferred contact method:\n";
    var WHATSAPP_TEXT = "Hi, I'm interested in the €250 website offer. My business is:";

    var openTimer = null;
    var prevActive = null;

    function dismissSession() {
      try {
        sessionStorage.setItem(OFFER_SESSION_KEY, "1");
      } catch (err) {}
    }

    function closeModal(restoreFocus) {
      modal.classList.remove("offer-modal--visible");
      document.body.classList.remove("offer-modal-open");
      modal.setAttribute("aria-hidden", "true");
      modal.setAttribute("hidden", "");
      if (restoreFocus !== false && prevActive && typeof prevActive.focus === "function") {
        try {
          prevActive.focus();
        } catch (err2) {}
      }
      prevActive = null;
    }

    function openModal() {
      prevActive = document.activeElement;
      modal.removeAttribute("hidden");
      modal.setAttribute("aria-hidden", "false");
      modal.classList.add("offer-modal--visible");
      document.body.classList.add("offer-modal-open");
      window.setTimeout(function () {
        if (btnPrimary && typeof btnPrimary.focus === "function") btnPrimary.focus();
      }, 80);
    }

    function onBackdropOrDismiss() {
      dismissSession();
      closeModal(true);
    }

    function onPrimaryClick() {
      dismissSession();
      closeModal(false);

      if (messageTa) messageTa.value = OFFER_FORM_MESSAGE;

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      var waUrl =
        "https://wa.me/" + WHATSAPP_E164 + "?text=" + encodeURIComponent(WHATSAPP_TEXT);
      window.open(waUrl, "_blank", "noopener,noreferrer");

      window.setTimeout(function () {
        if (messageTa && typeof messageTa.focus === "function") {
          messageTa.focus();
          try {
            messageTa.setSelectionRange(0, 0);
          } catch (err3) {}
        }
        if (formPanel) {
          formPanel.classList.add("contact-form-panel--offer-highlight");
          window.setTimeout(function () {
            formPanel.classList.remove("contact-form-panel--offer-highlight");
          }, 2600);
        }
      }, 650);
    }

    openTimer = window.setTimeout(openModal, OFFER_DELAY_MS);

    if (btnClose) btnClose.addEventListener("click", onBackdropOrDismiss);
    if (backdrop) backdrop.addEventListener("click", onBackdropOrDismiss);
    if (btnDismiss) btnDismiss.addEventListener("click", onBackdropOrDismiss);
    if (btnPrimary) btnPrimary.addEventListener("click", onPrimaryClick);

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!modal.classList.contains("offer-modal--visible")) return;
      onBackdropOrDismiss();
    });
  })();

  var translations = {
    en: {
      meta_title: "Nexus Dev Studio | Web Development Agency",
      meta_desc:
        "Nexus Dev Studio — Custom websites, applications and digital solutions built for performance.",
      lang_switch_aria: "Language",
      sr_brand: "Nexus Dev Studio — Home",
      nav_home: "Home",
      nav_services: "Services",
      nav_why: "Why Us",
      nav_work: "Work",
      nav_about: "About",
      nav_faq: "FAQ",
      nav_contact: "Contact",
      nav_builder: "Build",
      nav_menu: "Menu",
      nav_primary_aria: "Primary",
      hero_eyebrow: "Digital excellence",
      hero_title_sr: "Nexus Dev Studio — ",
      hero_title: "You imagine it. We build it.",
      hero_title_line1: "You imagine it.",
      hero_title_line2: "We build it.",
      hero_desc:
        "Custom websites, applications and digital solutions built for performance.",
      hero_btn_start: "Start Your Project",
      hero_btn_work: "View Our Work",
      hero_scroll: "Scroll",
      hero_badge: "⚡ Fast Delivery Available",
      build_intro_init: "Initializing project...",
      build_intro_line1: "> creating project...",
      build_intro_line2: "> installing dependencies...",
      build_intro_line3: "> building UI...",
      build_intro_line4: "> launching experience...",
      audience_label: "Ideal partners",
      audience_title: "Who We Work With",
      audience_lead:
        "Targeted solutions for teams that want clarity, speed, and measurable growth online.",
      audience_1_title: "Small Businesses",
      audience_1_desc: "Perfect for businesses that want to build a strong online presence",
      audience_2_title: "Restaurants & Cafés",
      audience_2_desc: "Websites with booking systems and menu integration",
      audience_3_title: "Booking-Based Businesses",
      audience_3_desc: "Automated appointment systems for salons, services, and more",
      audience_4_title: "E-commerce Stores",
      audience_4_desc: "Online shops designed to increase sales",
      audience_5_title: "Freelancers & Professionals",
      audience_5_desc: "Personal websites to showcase services and attract clients",
      benefits_label: "Deliverables",
      benefits_title: "What You Get",
      benefits_lead: "Everything you need to launch with confidence and scale without friction.",
      benefit_1_title: "Modern Design",
      benefit_1_desc: "Polished visuals and UX that reflect your brand and build instant trust.",
      benefit_2_title: "Fast Performance",
      benefit_2_desc: "Lean code and smart assets for snappy load times and better engagement.",
      benefit_3_title: "Mobile Optimized",
      benefit_3_desc: "Flawless layouts on phones and tablets where most of your traffic lives.",
      benefit_4_title: "SEO Friendly",
      benefit_4_desc: "Clean structure and metadata so search engines can understand your offer.",
      benefit_5_title: "Easy to Manage",
      benefit_5_desc: "Simple workflows so your team can update content without developer help.",
      benefit_6_title: "Scalable Solutions",
      benefit_6_desc: "Architecture that grows with traffic, features, and new business goals.",
      urgency_label: "Momentum",
      urgency_title: "Why Your Business Needs This Now",
      urgency_lead: "The window for standing out online is narrowing. Here is what is at stake.",
      urgency_1_title: "Your customers are already searching online",
      urgency_1_desc:
        "If you are not visible with clarity and credibility, you are losing leads to competitors who are.",
      urgency_2_title: "Your competitors are investing in digital presence",
      urgency_2_desc:
        "Modern sites and funnels are no longer optional in most industries—they are the baseline.",
      urgency_3_title: "First impressions are now digital",
      urgency_3_desc: "Most people will meet your brand through a screen first. Make that moment count.",
      promise_label: "Commitment",
      promise_title: "Our Promise",
      promise_lead: "Clear standards you can expect from kickoff through launch and beyond.",
      promise_1_title: "Fast Delivery",
      promise_1_desc: "We deliver projects quickly without compromising quality",
      promise_2_title: "Custom Solutions",
      promise_2_desc: "Every project is tailored to your business needs",
      promise_3_title: "Ongoing Support",
      promise_3_desc: "We support you even after launch",
      hero_trust_1: " Projects Delivered",
      hero_trust_2: " Client Satisfaction",
      hero_trust_3: "Fast Delivery",
      services_label: "What we do",
      services_title: "Services",
      services_lead: "End-to-end web solutions engineered for speed, clarity, and conversion.",
      service_badge_popular: "Most Popular",
      service_badge_demand: "High Demand",
      service_badge_revenue: "Revenue Focused",
      service_web_dev_title: "Web Development",
      service_web_dev_desc:
        "High-performance websites designed to convert visitors into paying clients",
      service_web_app_title: "Web Applications",
      service_web_app_desc: "Custom-built platforms tailored to scale with your business",
      service_booking_title: "Booking Systems",
      service_booking_desc: "Automated booking solutions that save time and increase revenue",
      service_ecom_title: "E-Commerce",
      service_ecom_desc: "Conversion-focused online stores built to maximize sales",
      service_learn_more: "Learn more",
      aria_service_web_dev: "Web Development — Learn more",
      aria_service_web_app: "Web Applications — Learn more",
      aria_service_booking: "Booking Systems — Learn more",
      aria_service_ecom: "E-Commerce — Learn more",
      why_label: "Our edge",
      why_title: "Why Choose Us",
      why_cred: "Trusted by businesses for modern, high-performance digital solutions.",
      why_stat_projects: "Projects Completed",
      why_stat_satisfaction: "Client Satisfaction",
      why_stat_support: "Support",
      why_card_1_title: "Fast turnaround",
      why_card_1_text:
        "Realistic timelines and clear milestones so you ship on schedule without skipping review, QA, or polish.",
      why_card_2_title: "Modern stack",
      why_card_2_text:
        "Built with current frameworks and patterns so your product stays fast, secure, and straightforward to maintain and extend.",
      why_card_3_title: "Responsive everywhere",
      why_card_3_text:
        "Layouts and performance tuned for real devices and networks, not a desktop site awkwardly squeezed onto mobile.",
      why_card_4_title: "Growth-focused",
      why_card_4_text:
        "We optimize for outcomes that matter to your business: leads, conversions, and revenue, not vanity traffic alone.",
      portfolio_label: "Selected work",
      portfolio_title: "Portfolio",
      portfolio_lead:
        "A continuous stream of client work, crafted for performance, clarity, and conversion.",
      portfolio_mock_label: "Live preview",
      portfolio_mock_sub:
        "Desktop and mobile frames — hover to focus, click to open the live site.",
      portfolio_mock_hint: "Click anywhere on the mockup to open the live site.",
      portfolio_mock_aria: "Open live project preview in a new tab",
      portfolio_region_aria: "Featured projects",
      pf_view_project: "View project",
      pf_tag_business: "Business Website",
      pf_tag_booking: "Booking Platform",
      pf_tag_mobile: "Mobile App",
      pf_tag_education: "Education Website",
      pf_tag_streaming: "Streaming Platform",
      pf_1_title: "Galika Me Style",
      pf_1_meta: "German & English language school",
      pf_2_title: "Angel Nails",
      pf_2_meta: "Nail salon — Agioi Anargyroi",
      pf_3_title: "Oikodomika",
      pf_3_meta: "Building materials & local trade",
      pf_4_title: "GR VIP TV",
      pf_4_meta: "IPTV streaming experience",
      pf_5_title: "BuildArt",
      pf_5_meta: "Construction & design presence",
      aria_pf_1: "Galika Me Style, view project",
      aria_pf_2: "Angel Nails, view project",
      aria_pf_3: "Oikodomika, view project",
      aria_pf_4: "GR VIP TV, view project",
      aria_pf_5: "BuildArt, view project",
      builder_label: "Configurator",
      builder_title: "Build Your Project",
      builder_lead: "Customize your solution in real-time.",
      builder_step_tag_1: "Step 1",
      builder_step_tag_2: "Step 2",
      builder_step_tag_3: "Step 3",
      builder_step_3_live: "Live price",
      builder_ai_optimize: "Optimizing your project...",
      builder_ai_calc: "Calculating best setup...",
      builder_compile_lbl: "Compiling...",
      builder_compile_done: "✓ Done",
      builder_live_label: "Live estimate",
      builder_live_total: "Live total",
      builder_ind_1: "Type",
      builder_ind_2: "Features",
      builder_ind_3: "Delivery",
      builder_ind_4: "Estimate",
      builder_step_1_title: "Project type",
      builder_addons_title: "Features",
      builder_flip_hint: "Tap to see what it is",
      builder_step_2_title: "Choose features",
      builder_step_1_hint: "Pick one package — price updates live.",
      builder_step_2_hint: "Toggle what you need — pricing updates instantly.",
      builder_step_3_title: "Delivery & support",
      builder_step_3_hint: "Choose a delivery tier. Maintenance is optional.",
      builder_step_4_title: "Your estimate",
      builder_sub_delivery: "Delivery speed",
      builder_sub_maint: "Ongoing",
      builder_pt_landing_t: "Landing Page",
      builder_pt_landing_d: "High-impact single page for campaigns and launches.",
      builder_pt_landing_p: "€175",
      builder_pt_landing_s: "One-page site",
      builder_pt_biz_t: "Business Website",
      builder_pt_biz_d: "Full site structure for credibility and conversions.",
      builder_pt_biz_p: "€275",
      builder_pt_biz_s: "Full website",
      builder_pt_ecom_t: "E-commerce",
      builder_pt_ecom_d: "Catalogue, checkout, and storefront polish.",
      builder_pt_ecom_p: "€750",
      builder_pt_ecom_s: "Online store",
      builder_pt_book_t: "Booking Platform",
      builder_pt_book_d: "Scheduling-first experience for services and venues.",
      builder_pt_book_p: "€550",
      builder_pt_book_s: "Appointments online",
      builder_pt_rent_t: "Rent a service",
      builder_pt_rent_d: "Lightweight page to sell or rent your service online.",
      builder_pt_rent_p: "€50",
      builder_pt_rent_s: "Service rental",
      builder_pt_webmob_t: "Web & Mobile App",
      builder_pt_webmob_d: "Full-stack web plus native or cross-platform mobile.",
      builder_pt_webmob_p: "€1,550",
      builder_pt_webmob_s: "Web + app",
      builder_pt_mobile_native_t: "Mobile app",
      builder_pt_mobile_native_d: "iOS & Android experience built around your product.",
      builder_pt_mobile_native_p: "€455",
      builder_pt_mobile_native_s: "iOS & Android",
      builder_ft_book_t: "Booking System",
      builder_ft_book_d: "Reservations, calendars, and availability rules.",
      builder_ft_book_p: "+€150",
      builder_ft_book_s: "Calendar bookings",
      builder_ft_i18n_t: "Multi-language",
      builder_ft_i18n_d: "Localized content and routing strategy.",
      builder_ft_i18n_p: "+€120",
      builder_ft_i18n_s: "More languages",
      builder_ft_seo_t: "SEO Optimization",
      builder_ft_seo_d: "Structure, metadata, and discoverability.",
      builder_ft_seo_p: "+€100",
      builder_ft_seo_s: "Search visibility",
      builder_ft_mo_t: "Animations",
      builder_ft_mo_d: "Motion design that elevates without noise.",
      builder_ft_ad_t: "Admin Dashboard",
      builder_ft_ad_d: "Management UI for content, orders, or users.",
      builder_ft_ad_p: "+€200",
      builder_ft_ad_s: "Manage panel",
      builder_ft_backend_t: "Backend system",
      builder_ft_backend_d: "APIs, database, and server logic behind your product.",
      builder_ft_backend_p: "+€75",
      builder_ft_backend_s: "Server logic",
      builder_ft_loyalty_t: "Loyalty program",
      builder_ft_loyalty_d: "Rewards, tiers, and retention for returning customers.",
      builder_ft_loyalty_p: "+€55",
      builder_ft_loyalty_s: "Rewards system",
      builder_ft_domain_t: "Custom domain name",
      builder_ft_domain_d: "Connect your brand to a professional URL.",
      builder_ft_domain_p: "+€25",
      builder_ft_domain_s: "Your URL",
      builder_dl_std_t: "Standard Delivery",
      builder_dl_std_d: "Included. Balanced timeline with full QA.",
      builder_dl_fast_t: "Fast Delivery",
      builder_dl_fast_d: "Accelerated schedule (+€150).",
      builder_maint_t: "Monthly Maintenance",
      builder_maint_d: "Updates, monitoring, and small fixes — €20/month.",
      builder_next: "Next",
      builder_back: "Back",
      builder_your_setup: "Your setup",
      builder_sum_line_project: "Project type",
      builder_sum_line_features: "Features",
      builder_sum_features_none: "None",
      builder_sum_line_delivery: "Delivery",
      builder_sum_line_maint: "Maintenance",
      builder_sum_onetime: "One-time estimate",
      builder_sum_total_label: "Total",
      builder_sum_maint_label: "Maintenance",
      builder_sum_maint_val: "+ €20/month",
      builder_disclaimer:
        "This is an estimated cost. Final pricing depends on project scope.",
      builder_cta: "Start This Project",
      builder_cta_send: "Send this setup",
      builder_sum_included: "Included",
      builder_sum_fast_fee: "Fast delivery",
      builder_wa_msg:
        "Hi, I want this project:\nType: {type}\nFeatures: {features}\nEstimated price: {price}",
      builder_preview_title: "Live preview",
      builder_preview_url_landing: "landing.yoursite.com",
      builder_preview_url_business: "yoursite.com",
      builder_preview_url_ecommerce: "shop.yoursite.com",
      builder_preview_url_booking: "book.yoursite.com",
      builder_preview_url_rent_service: "rent.yoursite.com",
      builder_preview_url_web_mobile: "yoursite.com · web + app",
      builder_preview_url_mobile_native: "install.app / preview",
      builder_preview_pick: "Select a project type to preview",
      builder_business_label: "Your business name",
      builder_business_label_yours: "Your Business Name",
      builder_business_ph: "e.g. Aurora Coffee",
      builder_business_ph_yours: "e.g. Maria Beauty Salon",
      builder_wizard_title: "Build your website",
      builder_wizard_lead: "Shape your brand, look, and services.",
      builder_step_style: "Look & feel",
      builder_style_group_aria: "Visual style",
      builder_style_minimal: "Minimal",
      builder_style_luxury: "Luxury",
      builder_style_bold: "Bold",
      builder_logo_label: "Your logo",
      builder_logo_btn: "Upload image",
      builder_logo_clear: "Remove",
      builder_logo_hint: "PNG or JPG. Stored in this session only.",
      builder_services_label: "Services you offer",
      builder_svc_haircuts: "Haircuts",
      builder_svc_haircuts_d: "Cuts & styling",
      builder_svc_plumbing: "Plumbing",
      builder_svc_plumbing_d: "Repairs & installs",
      builder_svc_legal: "Legal Services",
      builder_svc_legal_d: "Contracts & counsel",
      builder_svc_booking: "Booking",
      builder_svc_booking_d: "Appointments online",
      builder_svc_shop: "Online Shop",
      builder_svc_shop_d: "Sell products",
      builder_progress_0: "Setting things up...",
      builder_progress_25: "Building your website...",
      builder_progress_50: "Your website is almost ready",
      builder_progress_80: "Your website is ready to launch",
      builder_launch_site: "Launch My Website",
      builder_launch_msg:
        "Hi, I want this website:\nBusiness name: {name}\nStyle: {style}\nServices: {services}",
      builder_launch_msg_project: "Project estimate: {type} ({price})",
      builder_preview_brand_ph: "Your brand",
      builder_preview_kicker: "Welcome to {name}",
      builder_preview_headline: "{name} — online",
      builder_preview_sub: "Trusted by customers who expect excellence.",
      builder_preview_cta: "Book {name}",
      builder_preview_rent_cta: "Rent with {name}",
      builder_preview_app_title: "{name}",
      builder_preview_app_sub: "Your space",
      builder_wa_business: "Business: {name}",
      builder_rebuilding: "Rebuilding…",
      builder_preview_layout: "Layout",
      builder_preview_theme: "Theme",
      builder_preview_layout_aria: "Preview layout",
      builder_preview_theme_aria: "Preview color theme",
      builder_layout_stack: "Stack",
      builder_layout_split: "Split",
      builder_layout_magazine: "Magazine",
      builder_theme_violet: "Violet theme",
      builder_theme_ocean: "Ocean theme",
      builder_theme_sunset: "Sunset theme",
      builder_theme_forest: "Forest theme",
      builder_preview_shop: "Shop",
      builder_preview_book: "Book",
      builder_preview_seo_badge: "SEO",
      builder_ctx_idle: "Looks like you're building something...",
      builder_ctx_nice: "Nice choice.",
      builder_ctx_pricing: "This could work well for your business.",
      faq_label: "Common questions",
      faq_title: "FAQ",
      faq_lead: "Straight answers about pricing, timelines, and how we work together.",
      faq_region_aria: "Frequently asked questions",
      faq_q_1: "How much does a website cost?",
      faq_a_1:
        "The cost depends on the complexity and features of your project. We offer flexible solutions tailored to your needs and budget, ensuring high quality without unnecessary expenses.",
      faq_q_2: "How long does it take to build a project?",
      faq_a_2:
        "Most projects are completed within 1–3 weeks depending on the scope. We focus on fast delivery without compromising quality.",
      faq_q_3: "Do you offer custom solutions?",
      faq_a_3:
        "Yes, every project is fully customized based on your business goals. We do not use generic templates.",
      faq_q_4: "Can I update my website myself?",
      faq_a_4:
        "Yes, we can provide easy-to-use systems so you can manage your content without technical knowledge.",
      faq_q_5: "Do you provide support after launch?",
      faq_a_5:
        "Absolutely. We offer ongoing support and maintenance to ensure your website performs at its best.",
      faq_q_6: "Do you work with small businesses?",
      faq_a_6:
        "Yes, we specialize in helping both small and large businesses build a strong digital presence at an affordable cost.",
      faq_q_7: "Do I need to pay upfront?",
      faq_a_7:
        "We usually start with a small initial deposit, and the remaining amount is completed upon delivery. This ensures transparency and trust throughout the process.",
      faq_q_8: "Can you redesign my existing website?",
      faq_a_8:
        "Yes, we can redesign and upgrade your current website to improve performance, design, and user experience.",
      faq_q_9: "Will my website be fast and optimized?",
      faq_a_9:
        "Absolutely. All our websites are built with performance in mind, ensuring fast loading speeds and a smooth user experience.",
      faq_q_10: "Will my website work on mobile devices?",
      faq_a_10:
        "Yes, every project is fully responsive and optimized for all devices including smartphones and tablets.",
      faq_q_11: "Do I need technical knowledge?",
      faq_a_11:
        "No, we handle everything for you. You don’t need any technical experience to get started.",
      faq_q_12: "Can you integrate booking systems or e-commerce features?",
      faq_a_12:
        "Yes, we specialize in building booking systems, e-commerce platforms, and custom functionality based on your needs.",
      faq_q_13: "Why should I choose Nexus Dev Studio?",
      faq_a_13:
        "We focus on modern design, performance, and real business results. Our goal is to create digital solutions that actually help your business grow.",
      faq_q_14: "What makes your services different?",
      faq_a_14:
        "We combine design, development, and strategy to deliver complete solutions, not just websites.",
      faq_q_15: "How do I get started?",
      faq_a_15:
        "Simply contact us and we’ll guide you through the process step by step, from idea to launch.",
      contact_label: "CONTACT",
      contact_title: "Let’s Build Something Great",
      contact_lead:
        "Tell us about your project and we’ll help you turn your idea into a modern digital experience.",
      contact_detail_email_label: "Email",
      contact_detail_phone_label: "Phone",
      contact_detail_loc_label: "Location",
      contact_detail_loc_value: "Greece",
      contact_whatsapp: "Chat on WhatsApp",
      contact_f_name: "Name",
      contact_f_email: "Email",
      contact_f_phone: "Phone",
      contact_f_message: "Message",
      contact_ph_name: "Your name",
      contact_ph_email: "you@company.com",
      contact_ph_phone: "+1 123 456 7890",
      contact_ph_message:
        "Tell us about your goals, timeline, and anything we should know.",
      contact_phone_hint: "We may contact you faster via phone",
      contact_btn_send: "Send Message",
      contact_btn_sending: "Sending...",
      contact_status_ok: "Your message has been sent successfully.",
      contact_status_fail:
        "Something went wrong. Please try again.",
      contact_err_required: "This field is required.",
      contact_err_email: "Please enter a valid email address.",
      contact_err_phone:
        "Please enter a valid phone number (digits, +, spaces, dashes).",
      about_label: "WHO WE ARE",
      about_heading: "Founder of Nexus Dev Studio",
      about_name: "Charalampos Christopoulos",
      about_role: "Founder & Web Developer at Nexus Dev Studio",
      about_p1:
        "Nexus Dev Studio was founded by Charalampos Christopoulos with a clear vision: to help small and large businesses modernize their presence through high-quality websites, web applications, booking systems, and e-commerce solutions at an affordable cost.",
      about_p2:
        "The mission is to make digital transformation accessible to everyone, not just large companies with big budgets. Every business deserves a strong, modern, and professional online presence that helps it grow, stand out, and compete in today’s market.",
      about_p3:
        "Nexus Dev Studio focuses on building digital solutions that are clean, effective, visually powerful, and designed to support real business growth. From small local businesses to larger companies, the goal is to create tools that improve visibility, strengthen brand image, and make each business more dynamic in its industry.",
      about_p4:
        "The vision is to combine modern design, performance, and practical functionality so businesses can move forward with confidence. Every project is built with attention to detail, long-term value, and a strong understanding of what makes a digital presence truly effective.",
      about_quote:
        "“My goal is to help businesses of every size step into the future with a powerful digital presence at a fair and accessible cost.”",
      about_float_build: "Build",
      about_float_ship: "Ship",
      cta_title: "Ready to build your project?",
      cta_lead: "Tell us your vision, we’ll shape it into something remarkable.",
      cta_urgency: "Limited spots available for new projects this month.",
      cta_btn: "Get Started",
      cta_note: "Free initial estimate — no obligation",
      cta_trust_aria: "Why work with us",
      cta_trust_1: "Fast delivery",
      cta_trust_2: "Affordable pricing",
      cta_trust_3: "Support after delivery",
      footer_tagline: "Premium web experiences, delivered.",
      footer_legal: "Legal",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_services: "Services",
      footer_contact: "Contact",
      footer_svc_web: "Web Development",
      footer_svc_app: "Web Applications",
      footer_svc_book: "Booking Systems",
      footer_svc_ecom: "E-Commerce",
      footer_copyright_rest: " Nexus Dev Studio. All rights reserved.",
      social_links_aria: "Social links",
      social_twitter: "Twitter",
      social_linkedin: "LinkedIn",
      social_github: "GitHub",
      cookie_aria_banner: "Cookie consent",
      cookie_banner_text:
        "We use cookies to improve your experience, analyze traffic, and enhance performance.",
      cookie_accept: "Accept All",
      cookie_reject: "Reject Non-Essential",
      cookie_manage: "Manage Preferences",
      cookie_modal_title: "Cookie preferences",
      cookie_modal_intro:
        "Choose which optional cookie categories you allow. Necessary cookies are always active.",
      cookie_cat_necessary: "Necessary",
      cookie_always_on: "Always on",
      cookie_cat_necessary_desc:
        "Required for the site to function and cannot be disabled.",
      cookie_cat_analytics: "Analytics",
      cookie_cat_analytics_desc:
        "Help us understand how visitors use the site.",
      cookie_cat_marketing: "Marketing",
      cookie_cat_marketing_desc:
        "Used for relevant messaging and measuring campaigns where applicable.",
      cookie_save: "Save preferences",
      cookie_close: "Close",
      cookie_aria_modal: "Cookie preferences",
      cookie_close_aria: "Close dialog",
    },
    gr: {
      meta_title: "Nexus Dev Studio | Πρακτορείο Ανάπτυξης Ιστού",
      meta_desc:
        "Nexus Dev Studio — Προσαρμοσμένες ιστοσελίδες, εφαρμογές και ψηφιακές λύσεις με έμφαση στην απόδοση.",
      lang_switch_aria: "Γλώσσα",
      sr_brand: "Nexus Dev Studio — Αρχική",
      nav_home: "Αρχική",
      nav_services: "Υπηρεσίες",
      nav_why: "Γιατί εμάς",
      nav_work: "Έργα",
      nav_about: "Σχετικά",
      nav_faq: "FAQ",
      nav_contact: "Επικοινωνία",
      nav_builder: "Χτίσε το",
      nav_menu: "Μενού",
      nav_primary_aria: "Κύρια πλοήγηση",
      hero_eyebrow: "Ψηφιακή αριστεία",
      hero_title_sr: "Nexus Dev Studio — ",
      hero_title: "Εσύ το φαντάζεσαι. Εμείς το χτίζουμε.",
      hero_title_line1: "Εσύ το φαντάζεσαι.",
      hero_title_line2: "Εμείς το χτίζουμε.",
      hero_desc:
        "Προσαρμοσμένες ιστοσελίδες, εφαρμογές και ψηφιακές λύσεις σχεδιασμένες για απόδοση.",
      hero_btn_start: "Ξεκινήστε το project σας",
      hero_btn_work: "Δείτε τη δουλειά μας",
      hero_scroll: "Κύλιση",
      hero_badge: "⚡ Γρήγορη παράδοση διαθέσιμη",
      build_intro_init: "Αρχικοποίηση project...",
      build_intro_line1: "> δημιουργία project...",
      build_intro_line2: "> εγκατάσταση dependencies...",
      build_intro_line3: "> build UI...",
      build_intro_line4: "> εκκίνηση εμπειρίας...",
      audience_label: "Ιδανικοί συνεργάτες",
      audience_title: "Με ποιους δουλεύουμε",
      audience_lead:
        "Στοχευμένες λύσεις για ομάδες που θέλουν σαφήνεια, ταχύτητα και μετρήσιμη ανάπτυξη online.",
      audience_1_title: "Μικρές επιχειρήσεις",
      audience_1_desc: "Ιδανικό για επιχειρήσεις που θέλουν ισχυρή online παρουσία",
      audience_2_title: "Εστιατόρια & καφέ",
      audience_2_desc: "Ιστοσελίδες με συστήματα κρατήσεων και ενσωμάτωση μενού",
      audience_3_title: "Επιχειρήσεις με ραντεβού",
      audience_3_desc: "Αυτοματοποιημένα ραντεβού για κομμωτήρια, υπηρεσίες και άλλα",
      audience_4_title: "E-commerce καταστήματα",
      audience_4_desc: "Online shops σχεδιασμένα για αύξηση πωλήσεων",
      audience_5_title: "Freelancers & επαγγελματίες",
      audience_5_desc: "Προσωπικές ιστοσελίδες για προβολή υπηρεσιών και νέους πελάτες",
      benefits_label: "Παραδοτέα",
      benefits_title: "Τι παίρνετε",
      benefits_lead: "Όλα όσα χρειάζεστε για launch με σιγουριά και κλιμάκωση χωρίς τριβές.",
      benefit_1_title: "Σύγχρονο design",
      benefit_1_desc: "Κομψά visuals και UX που ενισχύουν την εμπιστοσύνη στο brand σας.",
      benefit_2_title: "Γρήγορη απόδοση",
      benefit_2_desc: "Καθαρός κώδικας και βελτιστοποιημένα assets για γρήγορο loading.",
      benefit_3_title: "Βελτιστοποιημένο για mobile",
      benefit_3_desc: "Flawless layouts σε κινητά και tablets όπου βρίσκεται το μεγαλύτερο traffic.",
      benefit_4_title: "SEO friendly",
      benefit_4_desc: "Καθαρή δομή και metadata ώστε οι μηχανές αναζήτησης να κατανοούν την προσφορά σας.",
      benefit_5_title: "Εύκολη διαχείριση",
      benefit_5_desc: "Απλά workflows ώστε η ομάδα σας να ενημερώνει περιεχόμενο χωρίς dev.",
      benefit_6_title: "Κλιμακώσιμες λύσεις",
      benefit_6_desc: "Αρχιτεκτονική που μεγαλώνει με traffic, features και νέους στόχους.",
      urgency_label: "Ώρα για δράση",
      urgency_title: "Γιατί να το κάνετε τώρα",
      urgency_lead: "Το παράθυρο για να ξεχωρίσετε online στενεύει. Τι διακυβεύεται.",
      urgency_1_title: "Οι πελάτες σας ήδη ψάχνουν online",
      urgency_1_desc:
        "Αν δεν είστε ορατοί με σαφήνεια και αξιοπιστία, χάνετε leads υπέρ ανταγωνιστών.",
      urgency_2_title: "Οι ανταγωνιστές επενδύουν στην ψηφιακή παρουσία",
      urgency_2_desc:
        "Σύγχρονες ιστοσελίδες και funnels δεν είναι πολυτέλεια σε πολλούς κλάδους, είναι το ελάχιστο.",
      urgency_3_title: "Οι πρώτες εντυπώσεις είναι πλέον ψηφιακές",
      urgency_3_desc:
        "Οι περισσότεροι θα γνωρίσουν το brand σας πρώτα από μια οθόνη. Αξιοποιήστε τη στιγμή.",
      promise_label: "Δέσμευση",
      promise_title: "Η υπόσχεσή μας",
      promise_lead: "Σαφή πρότυπα από το kickoff και μετά το launch.",
      promise_1_title: "Γρήγορη παράδοση",
      promise_1_desc: "Παραδίδουμε γρήγορα χωρίς να θυσιάζουμε ποιότητα",
      promise_2_title: "Προσαρμοσμένες λύσεις",
      promise_2_desc: "Κάθε project είναι χτισμένο στις ανάγκες της επιχείρησής σας",
      promise_3_title: "Συνεχής υποστήριξη",
      promise_3_desc: "Είμαστε δίπλα σας και μετά το launch",
      hero_trust_1: " Ολοκληρωμένα έργα",
      hero_trust_2: " Ικανοποίηση πελατών",
      hero_trust_3: "Γρήγορη παράδοση",
      services_label: "Τι κάνουμε",
      services_title: "Υπηρεσίες",
      services_lead:
        "Ολοκληρωμένες web λύσεις με στόχο την ταχύτητα, τη σαφήνεια και τις μετατροπές.",
      service_badge_popular: "Δημοφιλές",
      service_badge_demand: "Υψηλή ζήτηση",
      service_badge_revenue: "Εστίαση σε έσοδα",
      service_web_dev_title: "Ανάπτυξη ιστοσελίδων",
      service_web_dev_desc:
        "Υψηλής απόδοσης ιστοσελίδες που μετατρέπουν επισκέπτες σε πληρώνοντες πελάτες",
      service_web_app_title: "Web εφαρμογές",
      service_web_app_desc:
        "Προσαρμοσμένες πλατφόρμες που κλιμακώνονται μαζί με την επιχείρησή σας",
      service_booking_title: "Συστήματα κρατήσεων",
      service_booking_desc:
        "Αυτοματοποιημένες λύσεις κρατήσεων που εξοικονομούν χρόνο και αυξάνουν τα έσοδα",
      service_ecom_title: "E-Commerce",
      service_ecom_desc:
        "Ηλεκτρονικά καταστήματα με έμφαση στις μετατροπές και τις πωλήσεις",
      service_learn_more: "Μάθετε περισσότερα",
      aria_service_web_dev: "Ανάπτυξη ιστοσελίδων — Μάθετε περισσότερα",
      aria_service_web_app: "Web εφαρμογές — Μάθετε περισσότερα",
      aria_service_booking: "Συστήματα κρατήσεων — Μάθετε περισσότερα",
      aria_service_ecom: "E-Commerce — Μάθετε περισσότερα",
      why_label: "Το πλεονέκτημά μας",
      why_title: "Γιατί να μας επιλέξετε",
      why_cred:
        "Εμπιστοσύνη από επιχειρήσεις για σύγχρονες, υψηλής απόδοσης ψηφιακές λύσεις.",
      why_stat_projects: "Ολοκληρωμένα έργα",
      why_stat_satisfaction: "Ικανοποίηση πελατών",
      why_stat_support: "Υποστήριξη",
      why_card_1_title: "Γρήγορη υλοποίηση",
      why_card_1_text:
        "Ρεαλιστικά χρονοδιαγράμματα και σαφή ορόσημα ώστε να παραδίδετε στην ώρα σας χωρίς να θυσιάζετε έλεγχο ποιότητας ή λεπτομέρειας.",
      why_card_2_title: "Σύγχρονο stack",
      why_card_2_text:
        "Χτίζουμε με τρέχοντα frameworks και πρακτικές ώστε το προϊόν σας να παραμένει γρήγορο, ασφαλές και εύκολο στη συντήρηση και επέκταση.",
      why_card_3_title: "Responsive παντού",
      why_card_3_text:
        "Layouts και απόδοση ρυθμισμένα για πραγματικές συσκευές και δίκτυα, όχι desktop ιστοσελίδα «στριμωγμένη» στο κινητό.",
      why_card_4_title: "Εστίαση στην ανάπτυξη",
      why_card_4_text:
        "Βελτιστοποιούμε για αποτελέσματα που μετράνε: leads, μετατροπές και έσοδα, όχι μόνο επισκεψιμότητα.",
      portfolio_label: "Επιλεγμένα έργα",
      portfolio_title: "Portfolio",
      portfolio_lead:
        "Συνεχής ροή έργων πελατών, φτιαγμένη για απόδοση, σαφήνεια και μετατροπές.",
      portfolio_mock_label: "Ζωντανή προεπισκόπηση",
      portfolio_mock_sub:
        "Πλαίσια desktop και mobile — hover για εστίαση, κλικ για άνοιγμα του live site.",
      portfolio_mock_hint: "Κλικ στο mockup για να ανοίξει το live site.",
      portfolio_mock_aria: "Άνοιγμα ζωντανής προεπισκόπησης project σε νέα καρτέλα",
      portfolio_region_aria: "Επιλεγμένα έργα",
      pf_view_project: "Προβολή έργου",
      pf_tag_business: "Επιχειρηματική ιστοσελίδα",
      pf_tag_booking: "Πλατφόρμα κρατήσεων",
      pf_tag_mobile: "Εφαρμογή κινητού",
      pf_tag_education: "Εκπαιδευτική ιστοσελίδα",
      pf_tag_streaming: "Πλατφόρμα streaming",
      pf_1_title: "Galika Me Style",
      pf_1_meta: "Σχολή Γερμανικών & Αγγλικών",
      pf_2_title: "Angel Nails",
      pf_2_meta: "Νυχιών — Άγιοι Ανάργυροι",
      pf_3_title: "Oikodomika",
      pf_3_meta: "Οικοδομικά υλικά & τοπικό εμπόριο",
      pf_4_title: "GR VIP TV",
      pf_4_meta: "IPTV streaming εμπειρία",
      pf_5_title: "BuildArt",
      pf_5_meta: "Κατασκευές & design παρουσία",
      aria_pf_1: "Galika Me Style, προβολή έργου",
      aria_pf_2: "Angel Nails, προβολή έργου",
      aria_pf_3: "Oikodomika, προβολή έργου",
      aria_pf_4: "GR VIP TV, προβολή έργου",
      aria_pf_5: "BuildArt, προβολή έργου",
      builder_label: "Ρυθμιστής project",
      builder_title: "Χτίστε το project σας",
      builder_lead: "Προσαρμόστε τη λύση σας σε πραγματικό χρόνο.",
      builder_step_tag_1: "Βήμα 1",
      builder_step_tag_2: "Βήμα 2",
      builder_step_tag_3: "Βήμα 3",
      builder_step_3_live: "Ζωντανή τιμή",
      builder_ai_optimize: "Βελτιστοποίηση project...",
      builder_ai_calc: "Υπολογισμός βέλτιστης ρύθμισης...",
      builder_compile_lbl: "Μεταγλώττιση...",
      builder_compile_done: "✓ Έτοιμο",
      builder_live_label: "Ζωντανή εκτίμηση",
      builder_live_total: "Σύνολο live",
      builder_ind_1: "Τύπος",
      builder_ind_2: "Λειτουργίες",
      builder_ind_3: "Παράδοση",
      builder_ind_4: "Εκτίμηση",
      builder_step_1_title: "Τύπος project",
      builder_addons_title: "Λειτουργίες",
      builder_flip_hint: "Πατά για να δεις τι είναι",
      builder_step_2_title: "Επιλέξτε λειτουργίες",
      builder_step_1_hint: "Διάλεξε ένα πακέτο — η τιμή ενημερώνεται ζωντανά.",
      builder_step_2_hint: "Ενεργοποιήστε ό,τι χρειάζεστε — η τιμή ενημερώνεται αμέσως.",
      builder_step_3_title: "Παράδοση & υποστήριξη",
      builder_step_3_hint: "Επιλέξτε ρυθμό παράδοσης. Η συντήρηση είναι προαιρετική.",
      builder_step_4_title: "Η εκτίμησή σας",
      builder_sub_delivery: "Ταχύτητα παράδοσης",
      builder_sub_maint: "Συνεχής",
      builder_pt_landing_t: "Landing Page",
      builder_pt_landing_d: "Μονής σελίδας πρόταση για καμπάνιες και launches.",
      builder_pt_landing_p: "€175",
      builder_pt_landing_s: "Μονή σελίδα",
      builder_pt_biz_t: "Επιχειρηματική ιστοσελίδα",
      builder_pt_biz_d: "Πλήρης δομή για αξιοπιστία και μετατροπές.",
      builder_pt_biz_p: "€275",
      builder_pt_biz_s: "Πλήρες site",
      builder_pt_ecom_t: "E-commerce",
      builder_pt_ecom_d: "Κατάλογος, checkout και storefront.",
      builder_pt_ecom_p: "€750",
      builder_pt_ecom_s: "Online κατάστημα",
      builder_pt_book_t: "Πλατφόρμα κρατήσεων",
      builder_pt_book_d: "Εμπειρία με επίκεντρο το ραντεβού.",
      builder_pt_book_p: "€550",
      builder_pt_book_s: "Ραντεβού online",
      builder_pt_rent_t: "Ενοικίαση υπηρεσίας",
      builder_pt_rent_d: "Ελαφριά σελίδα για να πουλάτε ή ενοικιάζετε την υπηρεσία σας online.",
      builder_pt_rent_p: "€50",
      builder_pt_rent_s: "Ελαφριά σελίδα",
      builder_pt_webmob_t: "Web & εφαρμογή κινητού",
      builder_pt_webmob_d: "Πλήρες web stack συν native ή cross-platform mobile.",
      builder_pt_webmob_p: "€1.550",
      builder_pt_webmob_s: "Web + app",
      builder_pt_mobile_native_t: "Εφαρμογή κινητού",
      builder_pt_mobile_native_d: "Εμπειρία iOS & Android γύρω από το προϊόν σας.",
      builder_pt_mobile_native_p: "€455",
      builder_pt_mobile_native_s: "iOS & Android",
      builder_ft_book_t: "Σύστημα κρατήσεων",
      builder_ft_book_d: "Ραντεβού, ημερολόγια και διαθεσιμότητα.",
      builder_ft_book_p: "+€150",
      builder_ft_book_s: "Κρατήσεις",
      builder_ft_i18n_t: "Πολυγλωσσία",
      builder_ft_i18n_d: "Περιεχόμενο και routing ανά γλώσσα.",
      builder_ft_i18n_p: "+€120",
      builder_ft_i18n_s: "Περισσότερες γλώσσες",
      builder_ft_seo_t: "SEO",
      builder_ft_seo_d: "Δομή, metadata και ορατότητα.",
      builder_ft_seo_p: "+€100",
      builder_ft_seo_s: "Ορατότητα Google",
      builder_ft_mo_t: "Animations",
      builder_ft_mo_d: "Κίνηση που αναβαθμίζει χωρίς θόρυβο.",
      builder_ft_ad_t: "Admin dashboard",
      builder_ft_ad_d: "Διαχείριση περιεχομένου, παραγγελιών ή χρηστών.",
      builder_ft_ad_p: "+€200",
      builder_ft_ad_s: "Πίνακας διαχείρισης",
      builder_ft_backend_t: "Backend σύστημα",
      builder_ft_backend_d: "APIs, βάση και server λογική πίσω από το προϊόν σας.",
      builder_ft_backend_p: "+€75",
      builder_ft_backend_s: "Λογική server",
      builder_ft_loyalty_t: "Πρόγραμμα επιβράβευσης",
      builder_ft_loyalty_d: "Ανταμοιβές, επίπεδα και διατήρηση πελατών.",
      builder_ft_loyalty_p: "+€55",
      builder_ft_loyalty_s: "Επιβραβεύσεις",
      builder_ft_domain_t: "Προσαρμοσμένο domain",
      builder_ft_domain_d: "Συνδέστε το brand σας με επαγγελματικό URL.",
      builder_ft_domain_p: "+€25",
      builder_ft_domain_s: "Το δικό σου URL",
      builder_dl_std_t: "Κανονική παράδοση",
      builder_dl_std_d: "Συμπεριλαμβάνεται. Ισορροπημένο χρονοδιάγραμμα και QA.",
      builder_dl_fast_t: "Γρήγορη παράδοση",
      builder_dl_fast_d: "Επιταχυνμένο πρόγραμμα (+€150).",
      builder_maint_t: "Μηνιαία συντήρηση",
      builder_maint_d: "Ενημερώσεις, monitoring και μικρές διορθώσεις — €20/μήνα.",
      builder_next: "Επόμενο",
      builder_back: "Πίσω",
      builder_your_setup: "Το setup σας",
      builder_sum_line_project: "Τύπος project",
      builder_sum_line_features: "Λειτουργίες",
      builder_sum_features_none: "Καμία",
      builder_sum_line_delivery: "Παράδοση",
      builder_sum_line_maint: "Συντήρηση",
      builder_sum_onetime: "Εφάπαξ εκτίμηση",
      builder_sum_total_label: "Σύνολο",
      builder_sum_maint_label: "Συντήρηση",
      builder_sum_maint_val: "+ €20/μήνα",
      builder_disclaimer:
        "Πρόκειται για εκτιμώμενο κόστος. Η τελική τιμή εξαρτάται από το scope.",
      builder_cta: "Ξεκινήστε αυτό το project",
      builder_cta_send: "Στείλτε αυτό το setup",
      builder_sum_included: "Συμπεριλαμβάνεται",
      builder_sum_fast_fee: "Γρήγορη παράδοση",
      builder_wa_msg:
        "Γεια σας, θέλω αυτό το project:\nΤύπος: {type}\nΛειτουργίες: {features}\nΕκτιμώμενη τιμή: {price}",
      builder_preview_title: "Ζωντανή προεπισκόπηση",
      builder_preview_url_landing: "landing.yoursite.com",
      builder_preview_url_business: "yoursite.com",
      builder_preview_url_ecommerce: "shop.yoursite.com",
      builder_preview_url_booking: "book.yoursite.com",
      builder_preview_url_rent_service: "rent.yoursite.com",
      builder_preview_url_web_mobile: "yoursite.com · web + app",
      builder_preview_url_mobile_native: "install.app / preview",
      builder_preview_pick: "Επιλέξτε τύπο project για προεπισκόπηση",
      builder_business_label: "Όνομα επιχείρησης",
      builder_business_label_yours: "Όνομα επιχείρησης",
      builder_business_ph: "π.χ. Aurora Coffee",
      builder_business_ph_yours: "π.χ. Maria Beauty Salon",
      builder_wizard_title: "Χτίστε την ιστοσελίδα σας",
      builder_wizard_lead: "Δώστε μορφή στο brand, το στυλ και τις υπηρεσίες.",
      builder_step_style: "Εμφάνιση & αίσθηση",
      builder_style_group_aria: "Οπτικό στυλ",
      builder_style_minimal: "Minimal",
      builder_style_luxury: "Πολυτέλεια",
      builder_style_bold: "Τολμηρό",
      builder_logo_label: "Το λογότυπό σας",
      builder_logo_btn: "Ανέβασμα εικόνας",
      builder_logo_clear: "Αφαίρεση",
      builder_logo_hint: "PNG ή JPG. Μόνο για αυτή τη συνεδρία.",
      builder_services_label: "Υπηρεσίες που προσφέρετε",
      builder_svc_haircuts: "Κουρέματα",
      builder_svc_haircuts_d: "Κοπές & styling",
      builder_svc_plumbing: "Υδραυλικά",
      builder_svc_plumbing_d: "Επισκευές & εγκαταστάσεις",
      builder_svc_legal: "Νομικές υπηρεσίες",
      builder_svc_legal_d: "Συμβόλαια & συμβουλές",
      builder_svc_booking: "Κρατήσεις",
      builder_svc_booking_d: "Ραντεβού online",
      builder_svc_shop: "Online κατάστημα",
      builder_svc_shop_d: "Πώληση προϊόντων",
      builder_progress_0: "Γίνεται η ρύθμιση...",
      builder_progress_25: "Χτίζουμε την ιστοσελίδα σας...",
      builder_progress_50: "Η ιστοσελίδα σας σχεδόν έτοιμη",
      builder_progress_80: "Η ιστοσελίδα σας είναι έτοιμη για launch",
      builder_launch_site: "Ξεκινήστε την ιστοσελίδα μου",
      builder_launch_msg:
        "Γεια σας, θέλω αυτή την ιστοσελίδα:\nΌνομα επιχείρησης: {name}\nΣτυλ: {style}\nΥπηρεσίες: {services}",
      builder_launch_msg_project: "Εκτίμηση project: {type} ({price})",
      builder_preview_brand_ph: "Το brand σας",
      builder_preview_kicker: "Καλώς ήρθατε στο {name}",
      builder_preview_headline: "{name} — online",
      builder_preview_sub: "Εμπειρίες που ανήκουν σε εσάς.",
      builder_preview_cta: "Κράτηση με {name}",
      builder_preview_rent_cta: "Ενοικίαση με {name}",
      builder_preview_app_title: "{name}",
      builder_preview_app_sub: "Ο χώρος σας",
      builder_wa_business: "Επιχείρηση: {name}",
      builder_rebuilding: "Επαναδόμηση…",
      builder_preview_layout: "Διάταξη",
      builder_preview_theme: "Θέμα",
      builder_preview_layout_aria: "Διάταξη προεπισκόπησης",
      builder_preview_theme_aria: "Χρωματικό θέμα προεπισκόπησης",
      builder_layout_stack: "Στήλη",
      builder_layout_split: "Διχοτόμηση",
      builder_layout_magazine: "Περιοδικό",
      builder_theme_violet: "Θέμα βιολετί",
      builder_theme_ocean: "Θέμα ωκεανός",
      builder_theme_sunset: "Θέμα ηλιοβασίλεμα",
      builder_theme_forest: "Θέμα δάσος",
      builder_preview_shop: "Κατάστημα",
      builder_preview_book: "Κράτηση",
      builder_preview_seo_badge: "SEO",
      builder_ctx_idle: "Φαίνεται ότι χτίζετε κάτι...",
      builder_ctx_nice: "Εξαιρετική επιλογή.",
      builder_ctx_pricing: "Θα μπορούσε να δουλέψει καλά για την επιχείρησή σας.",
      faq_label: "Συχνές ερωτήσεις",
      faq_title: "FAQ",
      faq_lead: "Σαφείς απαντήσεις για κόστος, χρονοδιαγράμματα και τον τρόπο που συνεργαζόμαστε.",
      faq_region_aria: "Συχνές ερωτήσεις",
      faq_q_1: "Πόσο κοστίζει μια ιστοσελίδα;",
      faq_a_1:
        "Το κόστος εξαρτάται από την πολυπλοκότητα και τις λειτουργίες του project σας. Προσφέρουμε ευέλικτες λύσεις προσαρμοσμένες στις ανάγκες και τον προϋπολογισμό σας, με υψηλή ποιότητα χωρίς περιττά έξοδα.",
      faq_q_2: "Πόσο διαρκεί η υλοποίηση ενός project;",
      faq_a_2:
        "Τα περισσότερα projects ολοκληρώνονται εντός 1–3 εβδομάδων ανάλογα με το scope. Εστιάζουμε σε γρήγορη παράδοση χωρίς συμβιβασμούς στην ποιότητα.",
      faq_q_3: "Προσφέρετε προσαρμοσμένες λύσεις;",
      faq_a_3:
        "Ναι, κάθε project είναι πλήρως customized με βάση τους επιχειρηματικούς σας στόχους. Δεν χρησιμοποιούμε γενικά templates.",
      faq_q_4: "Μπορώ να ενημερώνω την ιστοσελίδα μου μόνος/μόνη μου;",
      faq_a_4:
        "Ναι, μπορούμε να σας παρέχουμε εύχρηστα συστήματα ώστε να διαχειρίζεστε το περιεχόμενό σας χωρίς τεχνικές γνώσεις.",
      faq_q_5: "Παρέχετε υποστήριξη μετά το launch;",
      faq_a_5:
        "Απολύτως. Προσφέρουμε συνεχή υποστήριξη και συντήρηση ώστε η ιστοσελίδα σας να αποδίδει στο μέγιστο.",
      faq_q_6: "Δουλεύετε με μικρές επιχειρήσεις;",
      faq_a_6:
        "Ναι, ειδικευόμαστε στο να βοηθάμε μικρές και μεγάλες επιχειρήσεις να χτίσουν ισχυρή ψηφιακή παρουσία σε προσιτό κόστος.",
      faq_q_7: "Πρέπει να πληρώσω όλο το ποσό εξαρχής;",
      faq_a_7:
        "Συνήθως ξεκινάμε με μια μικρή προκαταβολή και το υπόλοιπο ολοκληρώνεται κατά την παράδοση. Έτσι διασφαλίζουμε διαφάνεια και εμπιστοσύνη σε όλη τη διαδικασία.",
      faq_q_8: "Μπορείτε να ανασχεδιάσετε την υπάρχουσα ιστοσελίδα μου;",
      faq_a_8:
        "Ναι, μπορούμε να ανασχεδιάσουμε και να αναβαθμίσουμε την τρέχουσα ιστοσελίδα σας για καλύτερη απόδοση, design και εμπειρία χρήστη.",
      faq_q_9: "Θα είναι η ιστοσελίδα μου γρήγορη και βελτιστοποιημένη;",
      faq_a_9:
        "Απολύτως. Όλες οι ιστοσελίδες μας χτίζονται με έμφαση στην απόδοση, γρήγορα loading και ομαλή εμπειρία χρήστη.",
      faq_q_10: "Θα λειτουργεί η ιστοσελίδα μου σε κινητά;",
      faq_a_10:
        "Ναι, κάθε project είναι πλήρως responsive και βελτιστοποιημένο για όλες τις συσκευές, συμπεριλαμβανομένων smartphones και tablets.",
      faq_q_11: "Χρειάζομαι τεχνικές γνώσεις;",
      faq_a_11:
        "Όχι, αναλαμβάνουμε εμείς τα πάντα. Δεν χρειάζεστε τεχνική εμπειρία για να ξεκινήσετε.",
      faq_q_12: "Μπορείτε να ενσωματώσετε κρατήσεις ή e-commerce;",
      faq_a_12:
        "Ναι, ειδικευόμαστε σε συστήματα κρατήσεων, e-commerce πλατφόρμες και custom λειτουργίες σύμφωνα με τις ανάγκες σας.",
      faq_q_13: "Γιατί να επιλέξω τη Nexus Dev Studio;",
      faq_a_13:
        "Εστιάζουμε σε σύγχρονο design, απόδοση και πραγματικά επιχειρηματικά αποτελέσματα. Στόχος μας είναι ψηφιακές λύσεις που βοηθούν την επιχείρησή σας να αναπτυχθεί.",
      faq_q_14: "Τι κάνει τις υπηρεσίες σας διαφορετικές;",
      faq_a_14:
        "Συνδυάζουμε design, ανάπτυξη και στρατηγική για ολοκληρωμένες λύσεις, όχι απλώς ιστοσελίδες.",
      faq_q_15: "Πώς ξεκινώ;",
      faq_a_15:
        "Απλά επικοινωνήστε μαζί μας και θα σας καθοδηγήσουμε βήμα-βήμα, από την ιδέα έως το launch.",
      contact_label: "ΕΠΙΚΟΙΝΩΝΙΑ",
      contact_title: "Ας δημιουργήσουμε κάτι σπουδαίο μαζί",
      contact_lead:
        "Πείτε μας για το project σας και θα σας βοηθήσουμε να μετατρέψετε την ιδέα σας σε μια σύγχρονη ψηφιακή εμπειρία.",
      contact_detail_email_label: "Email",
      contact_detail_phone_label: "Τηλέφωνο",
      contact_detail_loc_label: "Τοποθεσία",
      contact_detail_loc_value: "Ελλάδα",
      contact_whatsapp: "Συνομιλία στο WhatsApp",
      contact_f_name: "Όνομα",
      contact_f_email: "Email",
      contact_f_phone: "ΤΗΛΕΦΩΝΟ",
      contact_f_message: "Μήνυμα",
      contact_ph_name: "Το όνομά σας",
      contact_ph_email: "you@company.com",
      contact_ph_phone: "+30 69XXXXXXXX",
      contact_ph_message:
        "Πείτε μας για τους στόχους σας, τον χρόνο και οτιδήποτε άλλο πρέπει να γνωρίζουμε.",
      contact_phone_hint: "Μπορούμε να επικοινωνήσουμε πιο γρήγορα τηλεφωνικά",
      contact_btn_send: "Αποστολή μηνύματος",
      contact_btn_sending: "Αποστολή...",
      contact_status_ok: "Το μήνυμά σας στάλθηκε επιτυχώς.",
      contact_status_fail:
        "Κάτι πήγε στραβά. Δοκιμάστε ξανά.",
      contact_err_required: "Το πεδίο είναι υποχρεωτικό.",
      contact_err_email: "Εισάγετε έγκυρη διεύθυνση email.",
      contact_err_phone:
        "Εισάγετε έγκυρο αριθμό τηλεφώνου (ψηφία, +, κενά, παύλες).",
      about_label: "ΠΟΙΟΙ ΕΙΜΑΣΤΕ",
      about_heading: "Ιδρυτής της Nexus Dev Studio",
      about_name: "Χαράλαμπος Χριστόπουλος",
      about_role: "Ιδρυτής & Web Developer στη Nexus Dev Studio",
      about_p1:
        "Η Nexus Dev Studio ιδρύθηκε από τον Χαράλαμπο Χριστόπουλο με σαφή όραμα: να βοηθήσει μικρές και μεγάλες επιχειρήσεις να εκσυγχρονίσουν την παρουσία τους μέσω ποιοτικών ιστοσελίδων, web εφαρμογών, συστημάτων κρατήσεων και e-commerce λύσεων σε προσιτό κόστος.",
      about_p2:
        "Η αποστολή είναι να γίνει η ψηφιακή μετάβαση προσβάσιμη σε όλους, όχι μόνο σε μεγάλες εταιρείες με μεγάλα budgets. Κάθε επιχείρηση αξίζει μια ισχυρή, σύγχρονη και επαγγελματική online παρουσία που τη βοηθά να αναπτυχθεί, να ξεχωρίζει και να ανταγωνίζεται στη σημερινή αγορά.",
      about_p3:
        "Η Nexus Dev Studio εστιάζει σε ψηφιακές λύσεις καθαρές, αποτελεσματικές, οπτικά δυνατές και σχεδιασμένες για πραγματική επιχειρηματική ανάπτυξη. Από μικρές τοπικές επιχειρήσεις έως μεγαλύτερες εταιρείες, ο στόχος είναι εργαλεία που βελτιώνουν την ορατότητα, ενισχύουν την εικόνα της μάρκας και κάνουν κάθε επιχείρηση πιο δυναμική στον κλάδο της.",
      about_p4:
        "Το όραμα είναι να συνδυάζουμε σύγχρονο design, απόδοση και πρακτική λειτουργικότητα ώστε οι επιχειρήσεις να προχωρούν με σιγουριά. Κάθε project χτίζεται με προσοχή στη λεπτομέρεια, μακροπρόθεσμη αξία και βαθιά κατανόηση του τι κάνει μια ψηφιακή παρουσία πραγματικά αποτελεσματική.",
      about_quote:
        "«Στόχος μου είναι να βοηθήσω επιχειρήσεις κάθε μεγέθους να βαδίσουν στο μέλλον με ισχυρή ψηφιακή παρουσία, σε δίκαιο και προσιτό κόστος.»",
      about_float_build: "Build",
      about_float_ship: "Ship",
      cta_title: "Έτοιμοι να απογειώσουμε την επιχείρησή σας;",
      cta_lead:
        "Αποκτήστε μια σύγχρονη, γρήγορη και αποδοτική ψηφιακή παρουσία που θα σας φέρει περισσότερους πελάτες.",
      cta_urgency: "Διαθέσιμες θέσεις για νέα projects αυτόν τον μήνα",
      cta_btn: "Ξεκινήστε τώρα",
      cta_note: "Δωρεάν αρχική εκτίμηση – χωρίς καμία υποχρέωση",
      cta_trust_aria: "Γιατί να συνεργαστείτε μαζί μας",
      cta_trust_1: "Γρήγορη παράδοση",
      cta_trust_2: "Προσιτές τιμές",
      cta_trust_3: "Υποστήριξη μετά την παράδοση",
      footer_tagline: "Premium web εμπειρίες, με παράδοση.",
      footer_legal: "Νομικά",
      footer_privacy: "Πολιτική Απορρήτου",
      footer_terms: "Όροι Χρήσης",
      footer_services: "Υπηρεσίες",
      footer_contact: "Επικοινωνία",
      footer_svc_web: "Ανάπτυξη ιστοσελίδων",
      footer_svc_app: "Web εφαρμογές",
      footer_svc_book: "Συστήματα κρατήσεων",
      footer_svc_ecom: "E-Commerce",
      footer_copyright_rest: " Nexus Dev Studio. Όλα τα δικαιώματα διατηρούνται.",
      social_links_aria: "Κοινωνικά δίκτυα",
      social_twitter: "Twitter",
      social_linkedin: "LinkedIn",
      social_github: "GitHub",
      cookie_aria_banner: "Συγκατάθεση cookies",
      cookie_banner_text:
        "Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας, να αναλύσουμε την επισκεψιμότητα και την απόδοση.",
      cookie_accept: "Αποδοχή όλων",
      cookie_reject: "Απόρριψη μη απαραίτητων",
      cookie_manage: "Διαχείριση προτιμήσεων",
      cookie_modal_title: "Προτιμήσεις cookies",
      cookie_modal_intro:
        "Επιλέξτε ποιες προαιρετικές κατηγορίες cookies επιτρέπετε. Τα αναγκαία cookies είναι πάντα ενεργά.",
      cookie_cat_necessary: "Αναγκαία",
      cookie_always_on: "Πάντα ενεργά",
      cookie_cat_necessary_desc:
        "Απαραίτητα για τη λειτουργία του site και δεν απενεργοποιούνται.",
      cookie_cat_analytics: "Αναλυτικά",
      cookie_cat_analytics_desc:
        "Μας βοηθούν να κατανοήσουμε πώς οι επισκέπτες χρησιμοποιούν το site.",
      cookie_cat_marketing: "Marketing",
      cookie_cat_marketing_desc:
        "Για σχετικές επικοινωνίες και μέτρηση καμπανιών όπου εφαρμόζεται.",
      cookie_save: "Αποθήκευση προτιμήσεων",
      cookie_close: "Κλείσιμο",
      cookie_aria_modal: "Προτιμήσεις cookies",
      cookie_close_aria: "Κλείσιμο διαλόγου",
    },
  };

  /* ---------- Build intro overlay (terminal → glitch → hero) ---------- */
  (function initLoadOverlay() {
    var overlay = document.getElementById("load-overlay");
    if (!overlay) return;

    function tk(key) {
      var l = document.documentElement.getAttribute("data-lang") || "en";
      var pack = translations[l];
      return pack && pack[key] ? pack[key] : translations.en[key] || "";
    }

    var prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var loadEventDone = false;
    var buildDone = false;
    var dismissed = false;

    function tryDismiss() {
      if (dismissed || !loadEventDone || !buildDone) return;
      dismissed = true;
      overlay.setAttribute("aria-busy", "false");

      var finished = function () {
        overlay.hidden = true;
        overlay.setAttribute("aria-hidden", "true");
        try {
          document.documentElement.setAttribute("data-build-intro", "1");
        } catch (e) {}
        try {
          document.dispatchEvent(new CustomEvent("nds:hero-ready", { bubbles: true }));
        } catch (e) {}
      };

      var t = window.setTimeout(finished, 900);

      function onTransitionEnd(e) {
        if (e.propertyName !== "opacity") return;
        overlay.removeEventListener("transitionend", onTransitionEnd);
        window.clearTimeout(t);
        finished();
      }

      overlay.addEventListener("transitionend", onTransitionEnd);
      overlay.classList.add("load-overlay--exiting");
    }

    window.addEventListener("load", function () {
      loadEventDone = true;
      tryDismiss();
    });

    function runBuildIntro() {
      if (prefersReduced) {
        buildDone = true;
        tryDismiss();
        return;
      }

      var buildRoot = document.getElementById("build-intro");
      var initPhase = document.getElementById("build-intro-init");
      var termPhase = document.getElementById("build-intro-terminal");
      var out = document.getElementById("build-intro-out");

      if (!buildRoot || !initPhase || !termPhase || !out) {
        buildDone = true;
        tryDismiss();
        return;
      }

      var LINE_KEYS = [
        "build_intro_line1",
        "build_intro_line2",
        "build_intro_line3",
        "build_intro_line4",
      ];

      var CHAR_MS = 12;
      var LINE_GAP_MS = 80;
      var INIT_PHASE_MS = 1000;
      var GLITCH_MS = 260;

      var timers = [];
      function schedule(fn, ms) {
        timers.push(window.setTimeout(fn, ms));
      }

      var lineIndex = 0;

      function typeLine(str, container, done) {
        var textSpan = document.createElement("span");
        var cur = document.createElement("span");
        cur.className = "build-intro__cursor build-intro__cursor--term";
        container.appendChild(textSpan);
        container.appendChild(cur);
        var chars = Array.from(str);
        var i = 0;
        function tick() {
          if (i >= chars.length) {
            cur.remove();
            if (done) done();
            return;
          }
          textSpan.textContent += chars[i];
          i++;
          schedule(tick, CHAR_MS);
        }
        tick();
      }

      function runNextLine() {
        if (lineIndex >= LINE_KEYS.length) {
          buildRoot.classList.add("build-intro--glitch");
          overlay.classList.add("load-overlay--glitch");
          schedule(function () {
            var flash = buildRoot.querySelector(".build-intro__flash");
            if (flash) flash.classList.add("build-intro__flash--on");
          }, Math.floor(GLITCH_MS * 0.3));
          schedule(function () {
            buildDone = true;
            tryDismiss();
          }, GLITCH_MS + 180);
          return;
        }
        var lineDiv = document.createElement("div");
        lineDiv.className = "build-intro__term-line";
        out.appendChild(lineDiv);
        typeLine(tk(LINE_KEYS[lineIndex]), lineDiv, function () {
          lineIndex++;
          schedule(runNextLine, LINE_GAP_MS);
        });
      }

      schedule(function () {
        initPhase.setAttribute("hidden", "");
        termPhase.removeAttribute("hidden");
        lineIndex = 0;
        out.innerHTML = "";
        runNextLine();
      }, INIT_PHASE_MS);
    }

    runBuildIntro();
  })();

  /* ---------- Cinematic hero (load sequence + parallax) ---------- */
  (function initHeroCinematic() {
    var hero = document.querySelector(".hero--cinematic");
    if (!hero) return;

    function tk(key) {
      var l = document.documentElement.getAttribute("data-lang") || "en";
      var pack = translations[l];
      return pack && pack[key] ? pack[key] : translations.en[key] || "";
    }

    var prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var brandEl = document.getElementById("hero-cine-brand");
    var typeTarget = document.getElementById("hero-type-target");
    var lineB = document.getElementById("hero-title-line-b");
    var parallaxRoot = document.getElementById("hero-parallax-root");
    var particlesEl = document.getElementById("hero-particles");
    var sequenceStarted = false;
    var timers = [];

    function clearTimers() {
      timers.forEach(function (id) {
        window.clearTimeout(id);
      });
      timers = [];
    }

    function schedule(fn, ms) {
      timers.push(window.setTimeout(fn, ms));
    }

    function buildParticles() {
      if (!particlesEl || prefersReduced) return;
      particlesEl.innerHTML = "";
      var n = 28;
      for (var i = 0; i < n; i++) {
        var d = document.createElement("span");
        d.className = "hero-particle";
        d.style.left = 8 + Math.random() * 84 + "%";
        d.style.top = 6 + Math.random() * 88 + "%";
        d.style.setProperty("--p-delay", (Math.random() * 8).toFixed(2) + "s");
        d.style.setProperty("--p-dur", (14 + Math.random() * 10).toFixed(2) + "s");
        d.style.setProperty("--p-size", (1.2 + Math.random() * 2.2).toFixed(2) + "px");
        particlesEl.appendChild(d);
      }
    }

    function setParallax(x, y) {
      if (!parallaxRoot || prefersReduced) return;
      var nx = (x - 0.5) * 2;
      var ny = (y - 0.5) * 2;
      parallaxRoot.style.setProperty("--hero-px", (nx * 12).toFixed(3) + "px");
      parallaxRoot.style.setProperty("--hero-py", (ny * 10).toFixed(3) + "px");
    }

    var parallaxRaf = null;
    var ptX = 0.5;
    var ptY = 0.5;
    var tgtX = 0.5;
    var tgtY = 0.5;

    function onParallaxFrame() {
      parallaxRaf = null;
      ptX += (tgtX - ptX) * 0.08;
      ptY += (tgtY - ptY) * 0.08;
      setParallax(ptX, ptY);
      if (Math.abs(tgtX - ptX) > 0.002 || Math.abs(tgtY - ptY) > 0.002) {
        parallaxRaf = window.requestAnimationFrame(onParallaxFrame);
      }
    }

    function bindParallax() {
      if (!parallaxRoot || prefersReduced) return;
      hero.addEventListener(
        "mousemove",
        function (e) {
          var r = hero.getBoundingClientRect();
          tgtX = (e.clientX - r.left) / r.width;
          tgtY = (e.clientY - r.top) / r.height;
          if (!parallaxRaf) parallaxRaf = window.requestAnimationFrame(onParallaxFrame);
        },
        { passive: true }
      );
      hero.addEventListener(
        "mouseleave",
        function () {
          tgtX = 0.5;
          tgtY = 0.5;
          if (!parallaxRaf) parallaxRaf = window.requestAnimationFrame(onParallaxFrame);
        },
        { passive: true }
      );
    }

    function typeLine1(done) {
      if (!typeTarget) {
        if (done) done();
        return;
      }
      var full = tk("hero_title_line1");
      var chars = Array.from(full);
      typeTarget.textContent = "";
      var i = 0;
      var postBuildHero = document.documentElement.getAttribute("data-build-intro") === "1";
      var step = prefersReduced ? 0 : postBuildHero ? 26 : 38;

      function tick() {
        if (i >= chars.length) {
          if (done) done();
          return;
        }
        typeTarget.textContent += chars[i];
        i++;
        schedule(tick, step);
      }
      tick();
    }

    function showInstant() {
      hero.classList.add("hero--cinematic-ready");
      hero.classList.add("hero--cinematic-instant");
      hero.classList.add("hero--stage-bg");
      if (typeTarget) typeTarget.textContent = tk("hero_title_line1");
      if (lineB) lineB.classList.add("is-in");
      var titleVis = hero.querySelector(".hero-cine--title");
      if (titleVis) titleVis.classList.add("is-in");
      var visCaret = hero.querySelector(".hero-title-visual");
      if (visCaret) visCaret.classList.add("hero--caret-off");
      hero.querySelectorAll(".hero-cine").forEach(function (el) {
        el.classList.add("is-in");
      });
      if (brandEl) brandEl.classList.add("hero-brand--energy");
    }

    function runSequence() {
      if (sequenceStarted || prefersReduced) return;
      sequenceStarted = true;
      clearTimers();

      var postBuild = document.documentElement.getAttribute("data-build-intro") === "1";
      if (postBuild) hero.classList.add("hero--post-build");

      var tBrand = postBuild ? 260 : 520;
      var tTitleStart = postBuild ? 520 : 980;
      var a = postBuild ? 400 : 680;
      var b = a + (postBuild ? 400 : 520);
      var c = b + (postBuild ? 300 : 420);
      var d = c + (postBuild ? 260 : 360);
      var e = d + (postBuild ? 220 : 300);
      var f = e + (postBuild ? 200 : 280);

      hero.classList.add("hero--cinematic-ready");
      schedule(function () {
        hero.classList.add("hero--stage-bg");
      }, 40);

      schedule(function () {
        if (brandEl) {
          brandEl.classList.add("is-in");
          brandEl.classList.add("hero-brand--energy");
        }
      }, tBrand);

      schedule(function () {
        var titleVis = hero.querySelector(".hero-cine--title");
        if (titleVis) titleVis.classList.add("is-in");
        typeLine1(function () {
          schedule(function () {
            if (lineB) lineB.classList.add("is-in");
            var vis = hero.querySelector(".hero-title-visual");
            if (vis) vis.classList.add("hero--caret-off");
          }, a);
          schedule(function () {
            hero.querySelectorAll(".hero-cine--eyebrow, .hero-cine--badge").forEach(function (el) {
              el.classList.add("is-in");
            });
          }, b);
          schedule(function () {
            var descEl = hero.querySelector(".hero-cine--desc");
            if (descEl) descEl.classList.add("is-in");
          }, c);
          schedule(function () {
            var act = document.getElementById("hero-cine-actions");
            if (act) act.classList.add("is-in");
          }, d);
          schedule(function () {
            var tr = hero.querySelector(".hero-cine--trust");
            if (tr) tr.classList.add("is-in");
          }, e);
          schedule(function () {
            var sc = hero.querySelector(".hero-cine--scroll");
            if (sc) sc.classList.add("is-in");
          }, f);
        });
      }, tTitleStart);
    }

    bindParallax();
    buildParticles();

    if (prefersReduced) {
      showInstant();
      return;
    }

    function startWhenReady() {
      if (sequenceStarted) return;
      runSequence();
    }

    var overlay = document.getElementById("load-overlay");
    if (!overlay || overlay.hidden) {
      schedule(startWhenReady, 120);
    } else {
      document.addEventListener(
        "nds:hero-ready",
        function () {
          schedule(startWhenReady, 180);
        },
        { once: true }
      );
    }

    schedule(function () {
      if (!sequenceStarted) startWhenReady();
    }, 5200);

    window.ndsHeroCinematicRefresh = function () {
      if (typeTarget) typeTarget.textContent = tk("hero_title_line1");
    };
  })();

  function setLanguage(lang) {
    var t = translations[lang];
    if (!t) return;

    document.documentElement.lang = lang === "gr" ? "el" : "en";
    document.documentElement.setAttribute("data-lang", lang);

    var titleEl = document.querySelector("title");
    var metaDesc = document.querySelector('meta[name="description"]');
    if (titleEl && t.meta_title) titleEl.textContent = t.meta_title;
    if (metaDesc && t.meta_desc) metaDesc.setAttribute("content", t.meta_desc);

    document.body.classList.add("is-lang-switching");

    window.requestAnimationFrame(function () {
      document.querySelectorAll("[data-key]").forEach(function (el) {
        var key = el.getAttribute("data-key");
        if (key && translations[lang][key] !== undefined) {
          el.textContent = translations[lang][key];
        }
      });

      document.querySelectorAll("[data-aria-key]").forEach(function (el) {
        var key = el.getAttribute("data-aria-key");
        if (key && translations[lang][key] !== undefined) {
          el.setAttribute("aria-label", translations[lang][key]);
        }
      });

      document.querySelectorAll("[data-placeholder-key]").forEach(function (el) {
        var pkey = el.getAttribute("data-placeholder-key");
        if (pkey && translations[lang][pkey] !== undefined) {
          el.setAttribute("placeholder", translations[lang][pkey]);
        }
      });

      document.querySelectorAll(".lang-switch-btn").forEach(function (btn) {
        var bLang = btn.getAttribute("data-lang");
        var active = bLang === lang;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });

      try {
        localStorage.setItem("language", lang);
      } catch (e) {}

      window.setTimeout(function () {
        document.body.classList.remove("is-lang-switching");
        if (typeof window.ndsProjectBuilderRefresh === "function") {
          window.ndsProjectBuilderRefresh();
        }
        if (typeof window.ndsHeroCinematicRefresh === "function") {
          window.ndsHeroCinematicRefresh();
        }
        if (typeof window.ndsContextToastRefresh === "function") {
          window.ndsContextToastRefresh();
        }
      }, 200);
    });
  }

  function initLanguage() {
    var saved = null;
    try {
      saved = localStorage.getItem("language");
    } catch (e) {}
    var initial = saved === "gr" || saved === "en" ? saved : "en";
    setLanguage(initial);

    var switchRoot = document.querySelector(".lang-switch");
    if (!switchRoot) return;

    switchRoot.querySelectorAll(".lang-switch-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = btn.getAttribute("data-lang");
        if (next === "en" || next === "gr") setLanguage(next);
      });
    });
  }

  /** Set true to log nav clicks, scroll math, and flash a border on the target section. */
  var DEBUG_NAV = false;

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav-toggle");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  initLanguage();

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- In-page hash navigation (single capture listener, no duplicates) ---------- */

  var SECTION_IDS = [
    "home",
    "audience",
    "services",
    "what-you-get",
    "why-now",
    "work",
    "promise",
    "project-builder",
    "faq",
    "contact",
    "cta",
  ];
  var NAV_OFFSET = 90;
  var NAV_DURATION_MS = 600;

  var glassBreakOverlay = document.getElementById("nds-glass-break");
  var prefersGlassReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function buildGlassShards(overlay) {
    var cols = 8;
    var rows = 5;
    overlay.innerHTML = "";
    overlay.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";
    overlay.style.gridTemplateRows = "repeat(" + rows + ", 1fr)";
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var d = document.createElement("div");
        d.className = "nds-glass-break__shard";
        d.style.setProperty("--tx", (Math.random() - 0.5) * 300 + "px");
        d.style.setProperty("--ty", (Math.random() - 0.5) * 300 + "px");
        d.style.setProperty("--rz", (Math.random() - 0.5) * 72 + "deg");
        d.style.setProperty("--delay", (Math.random() * 0.14).toFixed(3) + "s");
        overlay.appendChild(d);
      }
    }
  }

  function shouldUseGlassBreak(anchor) {
    if (window.NDS_GLASS_BREAK === false) return false;
    if (prefersGlassReduced) return false;
    if (!glassBreakOverlay) return false;
    return !!(anchor.closest && anchor.closest(".nav-list"));
  }

  function runGlassBreakThenScroll(targetEl) {
    buildGlassShards(glassBreakOverlay);
    glassBreakOverlay.hidden = false;
    glassBreakOverlay.removeAttribute("hidden");
    glassBreakOverlay.setAttribute("aria-hidden", "false");
    glassBreakOverlay.classList.remove("nds-glass-break--fadeout");
    glassBreakOverlay.classList.remove("nds-glass-break--playing");

    requestAnimationFrame(function () {
      glassBreakOverlay.classList.add("nds-glass-break--visible");
      requestAnimationFrame(function () {
        glassBreakOverlay.classList.add("nds-glass-break--playing");
      });
    });

    window.setTimeout(function () {
      var y = scrollToTargetTop(targetEl);
      animateScrollTo(y);
    }, 200);

    window.setTimeout(function () {
      glassBreakOverlay.classList.add("nds-glass-break--fadeout");
    }, 620);

    window.setTimeout(function () {
      glassBreakOverlay.classList.remove(
        "nds-glass-break--visible",
        "nds-glass-break--playing",
        "nds-glass-break--fadeout"
      );
      glassBreakOverlay.innerHTML = "";
      glassBreakOverlay.hidden = true;
      glassBreakOverlay.setAttribute("aria-hidden", "true");
    }, 1100);
  }

  function logNav() {
    if (!DEBUG_NAV || !window.console) return;
    var links = document.querySelectorAll(".nav-list a[href^='#']");
    console.log("[nav] .nav-list link count:", links.length);
    links.forEach(function (a) {
      console.log("[nav] navbar href:", a.getAttribute("href"));
    });
    SECTION_IDS.forEach(function (id) {
      var el = document.getElementById(id);
      console.log("[nav] section #" + id + ":", el ? "found in DOM" : "MISSING");
    });
  }

  function getScrollY() {
    return window.pageYOffset != null ? window.pageYOffset : document.documentElement.scrollTop || 0;
  }

  function setScrollY(y) {
    y = Math.max(0, y);
    window.scrollTo(0, y);
    var se = document.scrollingElement || document.documentElement;
    if (se) se.scrollTop = y;
    if (document.body) document.body.scrollTop = y;
  }

  function scrollToTargetTop(target) {
    var top = target.getBoundingClientRect().top + getScrollY() - NAV_OFFSET;
    top = Math.max(0, top);
    return top;
  }

  function animateScrollTo(targetY, done) {
    var startY = getScrollY();
    var delta = targetY - startY;
    if (Math.abs(delta) < 0.5) {
      if (done) done();
      return;
    }
    var t0 = null;
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    function frame(now) {
      if (t0 === null) t0 = now;
      var elapsed = now - t0;
      var t = Math.min(elapsed / NAV_DURATION_MS, 1);
      var y = startY + delta * easeOutCubic(t);
      setScrollY(y);
      if (t < 1) {
        requestAnimationFrame(frame);
      } else if (done) {
        done();
      }
    }
    requestAnimationFrame(frame);
  }

  function onDocumentClickCapture(e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;

    var href = a.getAttribute("href");
    if (!href || href === "#" || href.length < 2) return;

    var id = href.slice(1);
    var target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    if (DEBUG_NAV && window.console) {
      console.log("[nav] click intercepted", href, a);
    }

    if (header && header.contains(a) && nav && navToggle) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }

    var top = scrollToTargetTop(target);

    if (DEBUG_NAV && window.console) {
      console.log("[nav] calculated scroll top:", top, "target:", target);
    }

    if (DEBUG_NAV) {
      target.style.outline = "3px solid lime";
      target.style.outlineOffset = "2px";
      window.setTimeout(function () {
        target.style.outline = "";
        target.style.outlineOffset = "";
      }, 2000);
    }

    if (shouldUseGlassBreak(a)) {
      runGlassBreakThenScroll(target);
      return;
    }

    /* Πάντα ομαλό scroll στα μενού (όχι άμεσο άλμα), ακόμα κι αν το OS έχει reduce motion */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        top = scrollToTargetTop(target);
        if (DEBUG_NAV && window.console) {
          console.log("[nav] after layout, scroll top:", top);
        }
        animateScrollTo(top);
      });
    });
  }

  document.addEventListener("click", onDocumentClickCapture, true);
  logNav();

  /* ---------- Scroll reveal (unchanged) ---------- */

  var prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced) {
    var revealEls = document.querySelectorAll("[data-reveal]");
    if (revealEls.length && "IntersectionObserver" in window) {
      revealEls.forEach(function (el) {
        var stagger = 0;
        var grid = el.closest(".services-grid, .why-grid, .why-stats");
        var head = el.closest(".section-head");
        var cta = el.closest(".cta-inner");
        var footer = el.closest(".footer-grid");
        var hero = el.closest(".hero-inner");
        var faqAcc = el.closest(".faq-accordion");
        var audienceG = el.closest(".audience-grid");
        var benefitsG = el.closest(".benefits-grid");
        var urgencyG = el.closest(".urgency-grid");
        var promiseG = el.closest(".promise-grid");
        var contactG = el.closest(".contact-grid");
        if (grid) {
          var inGrid = Array.prototype.slice.call(grid.querySelectorAll("[data-reveal]"));
          stagger = Math.min(inGrid.indexOf(el), 5);
        } else if (head) {
          var inHead = Array.prototype.slice.call(head.querySelectorAll("[data-reveal]"));
          stagger = Math.min(inHead.indexOf(el), 4);
        } else if (cta) {
          var inCta = Array.prototype.slice.call(cta.querySelectorAll("[data-reveal]"));
          stagger = Math.min(inCta.indexOf(el), 5);
        } else if (footer) {
          var inFoot = Array.prototype.slice.call(footer.querySelectorAll("[data-reveal]"));
          stagger = Math.min(inFoot.indexOf(el), 3);
        } else if (hero) {
          var inHero = Array.prototype.slice.call(hero.querySelectorAll("[data-reveal]"));
          stagger = Math.min(inHero.indexOf(el), 6);
        } else if (faqAcc) {
          var inFaq = Array.prototype.slice.call(faqAcc.querySelectorAll("[data-reveal]"));
          stagger = Math.min(inFaq.indexOf(el), 14);
        } else if (audienceG) {
          var inAud = Array.prototype.slice.call(audienceG.querySelectorAll("[data-reveal]"));
          stagger = Math.min(inAud.indexOf(el), 5);
        } else if (benefitsG) {
          var inBen = Array.prototype.slice.call(benefitsG.querySelectorAll("[data-reveal]"));
          stagger = Math.min(inBen.indexOf(el), 6);
        } else if (urgencyG) {
          var inUrg = Array.prototype.slice.call(urgencyG.querySelectorAll("[data-reveal]"));
          stagger = Math.min(inUrg.indexOf(el), 3);
        } else if (promiseG) {
          var inPro = Array.prototype.slice.call(promiseG.querySelectorAll("[data-reveal]"));
          stagger = Math.min(inPro.indexOf(el), 3);
        } else if (contactG) {
          var inContact = Array.prototype.slice.call(
            contactG.querySelectorAll("[data-reveal]")
          );
          stagger = Math.min(inContact.indexOf(el), 3);
        } else if (el.closest(".builder-wrap")) {
          var inBuild = Array.prototype.slice.call(
            el.closest(".builder-wrap").querySelectorAll("[data-reveal]")
          );
          stagger = Math.min(inBuild.indexOf(el), 2);
        }
        el.style.setProperty("--stagger", String(stagger));
      });

      var sweepSections = document.querySelectorAll(".section.reveal--sweep");
      var sweepRevealSet = new WeakSet();
      sweepSections.forEach(function (sec) {
        sec.querySelectorAll("[data-reveal]").forEach(function (node) {
          sweepRevealSet.add(node);
        });
      });

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
      );

      revealEls.forEach(function (el) {
        if (sweepRevealSet.has(el)) return;
        observer.observe(el);
      });

      if (sweepSections.length) {
        var sweepObs = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;
              var sec = entry.target;
              sec.classList.add("is-sweep-visible");
              sweepObs.unobserve(sec);
              var inner = sec.querySelectorAll("[data-reveal]");
              inner.forEach(function (node, i) {
                var delay = Math.min(i * 42, 900);
                setTimeout(function () {
                  node.classList.add("is-visible");
                }, delay);
              });
            });
          },
          { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
        );
        sweepSections.forEach(function (sec) {
          sweepObs.observe(sec);
        });
      }
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
      document.querySelectorAll(".section.reveal--sweep").forEach(function (sec) {
        sec.classList.add("is-sweep-visible");
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
    document.querySelectorAll(".section.reveal--sweep").forEach(function (sec) {
      sec.classList.add("is-sweep-visible");
    });
  }

  /* ---------- FAQ accordion (single open, smooth height) ---------- */
  (function initFAQAccordion() {
    var root = document.querySelector(".faq-accordion");
    if (!root) return;
    var items = root.querySelectorAll(".faq-item");

    items.forEach(function (item) {
      var btn = item.querySelector(".faq-trigger");
      var panel = item.querySelector(".faq-panel-wrap");
      if (!btn || !panel) return;

      btn.addEventListener("click", function () {
        var wasOpen = item.classList.contains("is-open");

        items.forEach(function (other) {
          other.classList.remove("is-open");
          var ob = other.querySelector(".faq-trigger");
          var op = other.querySelector(".faq-panel-wrap");
          if (ob) ob.setAttribute("aria-expanded", "false");
          if (op) op.setAttribute("aria-hidden", "true");
        });

        if (!wasOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          panel.setAttribute("aria-hidden", "false");
        }
      });
    });
  })();

  /* ---------- Why stats: count-up when in view ---------- */
  (function initWhyStatCounters() {
    var nums = document.querySelectorAll(".why-stat-num[data-count-to]");
    if (!nums.length) return;

    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function setFinalValues() {
      nums.forEach(function (el) {
        var t = el.getAttribute("data-count-to");
        if (t != null && t !== "") el.textContent = t;
      });
    }

    if (reduced) {
      setFinalValues();
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setFinalValues();
      return;
    }

    var statsRoot = document.querySelector("#why-us") || document.querySelector(".why-stats");
    if (!statsRoot) {
      setFinalValues();
      return;
    }

    var done = false;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateCount(el, target, durationMs) {
      var startTime = null;
      function frame(now) {
        if (startTime === null) startTime = now;
        var p = Math.min((now - startTime) / durationMs, 1);
        var v = Math.round(easeOutCubic(p) * target);
        el.textContent = String(v);
        if (p < 1) {
          requestAnimationFrame(frame);
        } else {
          el.textContent = String(target);
        }
      }
      requestAnimationFrame(frame);
    }

    function runCountUp() {
      if (done) return;
      done = true;
      if (observer) {
        observer.disconnect();
      }

      nums.forEach(function (el, i) {
        var raw = el.getAttribute("data-count-to");
        var target = raw != null ? parseInt(raw, 10) : NaN;
        if (isNaN(target)) return;
        el.textContent = "0";
        window.setTimeout(function () {
          animateCount(el, target, 1400);
        }, i * 110);
      });
    }

    /* threshold 0 + generous rootMargin: small pills were never reaching 12% visible with -10% bottom inset */
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) runCountUp();
        });
      },
      { root: null, rootMargin: "80px 0px 80px 0px", threshold: 0 }
    );

    observer.observe(statsRoot);

    /* If the section is already in view on load, IO sometimes misses the first frame */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (done) return;
        var r = statsRoot.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight;
        if (r.bottom > 32 && r.top < vh - 32) {
          runCountUp();
        }
      });
    });
  })();

  /* ---------- Portfolio marquee (JS — continuous horizontal loop; CSS animation alone is often blocked) ---------- */
  (function initPortfolioMarquee() {
    var track = document.querySelector(".portfolio-marquee-track");
    var showcase = document.querySelector(".portfolio-showcase");
    if (!track || !showcase) return;

    var reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    var halfW = 0;
    var x = 0;
    var last = performance.now();
    var paused = false;
    var loopMs = 130000;

    function measure() {
      var w = track.scrollWidth;
      halfW = w > 0 ? w / 2 : 0;
    }

    track.style.animation = "none";

    function tick(now) {
      if (halfW <= 0) {
        measure();
      }
      if (halfW > 0) {
        var dt = Math.min(Math.max(now - last, 0), 48);
        last = now;
        if (!paused) {
          x -= (halfW / loopMs) * dt;
          while (x <= -halfW) {
            x += halfW;
          }
        }
        track.style.transform = "translate3d(" + x + "px,0,0)";
      } else {
        last = now;
      }
      requestAnimationFrame(tick);
    }

    showcase.addEventListener("mouseenter", function () {
      paused = true;
    });
    showcase.addEventListener("mouseleave", function () {
      paused = false;
    });

    window.addEventListener("load", function () {
      measure();
    });

    if (typeof ResizeObserver !== "undefined") {
      var ro = new ResizeObserver(function () {
        measure();
      });
      ro.observe(track);
    }

    last = performance.now();
    requestAnimationFrame(tick);
  })();

  /* ---------- Project builder (live configurator) ---------- */
  (function initProjectBuilder() {
    var root = document.getElementById("project-builder");
    if (!root) return;

    /** Same E.164 as offer modal / contact (country code + number, no +) */
    var WHATSAPP_E164 = "306936732844";

    var state = {
      project: null,
      features: [],
      layout: "stack",
      palette: "violet",
    };

    var PROJECT_PRICES = {
      landing: 175,
      business: 275,
      ecommerce: 750,
      booking: 550,
      rent_service: 50,
      web_mobile: 1550,
      mobile_native: 455,
    };

    var FEATURE_ORDER = ["booking_sys", "admin", "seo", "i18n", "backend", "loyalty", "domain"];

    var FEATURE_PRICES = {
      booking_sys: 150,
      admin: 200,
      seo: 100,
      i18n: 120,
      backend: 75,
      loyalty: 55,
      domain: 25,
    };

    function tk(key) {
      var l = document.documentElement.getAttribute("data-lang") || "en";
      var pack = translations[l];
      return pack && pack[key] ? pack[key] : translations.en[key] || "";
    }

    function projectTitleKey(slug) {
      var m = {
        landing: "builder_pt_landing_t",
        business: "builder_pt_biz_t",
        ecommerce: "builder_pt_ecom_t",
        booking: "builder_pt_book_t",
        rent_service: "builder_pt_rent_t",
        web_mobile: "builder_pt_webmob_t",
        mobile_native: "builder_pt_mobile_native_t",
      };
      return m[slug] || "builder_pt_landing_t";
    }

    function featureTitleKey(slug) {
      var m = {
        booking_sys: "builder_ft_book_t",
        admin: "builder_ft_ad_t",
        seo: "builder_ft_seo_t",
        i18n: "builder_ft_i18n_t",
        backend: "builder_ft_backend_t",
        loyalty: "builder_ft_loyalty_t",
        domain: "builder_ft_domain_t",
      };
      return m[slug] || slug;
    }

    function formatEuro(n) {
      return "€" + Math.round(n).toLocaleString("de-DE");
    }

    var liveEl = document.getElementById("builder-live-total");
    var summaryTotalEl = document.getElementById("builder-summary-total");
    var liveBarEl = document.getElementById("builder-live-bar");
    var summaryList = document.getElementById("builder-summary-lines");
    var ctaBtn = document.getElementById("builder-cta");

    var previewViewport = document.getElementById("builder-preview-viewport");
    var previewBody = document.getElementById("builder-preview-body");
    var previewEmpty = document.getElementById("builder-preview-empty");
    var previewRebuild = document.getElementById("builder-preview-rebuild");
    var previewRebuildTimer = null;
    var prefersReducedPreview =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var businessInput = document.getElementById("builder-business-name");
    var BUSINESS_SESSION_KEY = "nds_builder_business";
    var WIZARD_SESSION_KEY = "nds_builder_wizard_json";
    var logoInput = document.getElementById("builder-logo-input");
    var logoClearBtn = document.getElementById("builder-logo-clear");
    var logoThumb = document.getElementById("builder-logo-thumb");
    var logoThumbWrap = document.getElementById("builder-logo-thumb-wrap");

    var wizardStyle = null;
    var wizardServices = [];
    var logoObjectUrl = null;
    var morphDebounce = null;

    var SERVICE_ICONS = {
      haircuts:
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 4h3l2 16h2L15 4h3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      plumbing:
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 3v4M10 21V7M6 3v4M18 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>',
      legal:
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3 4 7v5c0 5 4 9 8 11 4-2 8-6 8-11V7l-8-4Z" stroke-linejoin="round"/></svg>',
      booking:
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round"/></svg>',
      shop:
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6Z" stroke-linejoin="round"/><path d="M3 6h18M16 10a4 4 0 1 1-8 0" stroke-linecap="round"/></svg>',
    };

    function saveWizardSession() {
      try {
        sessionStorage.setItem(
          WIZARD_SESSION_KEY,
          JSON.stringify({ style: wizardStyle, services: wizardServices })
        );
      } catch (e) {}
    }

    function loadWizardSession() {
      try {
        var raw = sessionStorage.getItem(WIZARD_SESSION_KEY);
        if (!raw) return;
        var o = JSON.parse(raw);
        if (o.style === "minimal" || o.style === "luxury" || o.style === "bold") {
          wizardStyle = o.style;
        }
        if (Array.isArray(o.services)) {
          wizardServices = o.services.filter(function (id) {
            return SERVICE_ICONS[id];
          });
        }
      } catch (e) {}
    }

    function syncStyleButtonsUi() {
      root.querySelectorAll(".builder-style-btn[data-wizard-style]").forEach(function (b) {
        var on = wizardStyle && b.getAttribute("data-wizard-style") === wizardStyle;
        b.classList.toggle("is-selected", !!on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }

    function syncServiceChipsUi() {
      root.querySelectorAll(".builder-service-chip[data-service]").forEach(function (chip) {
        var id = chip.getAttribute("data-service");
        var on = wizardServices.indexOf(id) >= 0;
        chip.classList.toggle("is-selected", on);
        chip.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }

    function hasWizardEngagement() {
      var n = businessInput ? sanitizeBusinessName(businessInput.value) : "";
      if (n.length > 0) return true;
      if (wizardStyle) return true;
      if (logoObjectUrl) return true;
      if (wizardServices.length > 0) return true;
      return false;
    }

    function getEffectiveProject() {
      if (state.project) return state.project;
      if (hasWizardEngagement()) return "business";
      return null;
    }

    function maybeAutoSelectBusiness() {
      if (state.project) return;
      if (!hasWizardEngagement()) return;
      state.project = "business";
      root.querySelectorAll(".builder-tile[data-project]").forEach(function (x) {
        var on = x.getAttribute("data-project") === "business";
        x.classList.toggle("is-selected", on);
        x.classList.toggle("is-flipped", on);
      });
      refreshSummary();
      syncAmount();
      updateCta();
    }

    function computeWizardProgress() {
      var pct = 0;
      var n = businessInput ? sanitizeBusinessName(businessInput.value) : "";
      if (n.length > 0) pct += 25;
      if (wizardStyle) pct += 25;
      if (logoObjectUrl) pct += 25;
      if (wizardServices.length > 0) pct += 25;
      return pct;
    }

    function updateProgressUi() {
      var pct = computeWizardProgress();
      var fill = document.getElementById("builder-progress-fill");
      var pctEl = document.getElementById("builder-progress-pct");
      var msgEl = document.getElementById("builder-progress-msg");
      if (fill) fill.style.width = pct + "%";
      if (pctEl) pctEl.textContent = pct + "%";
      if (msgEl) {
        var key = "builder_progress_0";
        if (pct >= 80) key = "builder_progress_80";
        else if (pct >= 50) key = "builder_progress_50";
        else if (pct >= 25) key = "builder_progress_25";
        msgEl.textContent = tk(key);
      }
    }

    function schedulePreviewMorph() {
      if (prefersReducedPreview) return;
      if (morphDebounce) clearTimeout(morphDebounce);
      morphDebounce = setTimeout(function () {
        var site = document.getElementById("builder-preview-root");
        if (!site) return;
        site.classList.remove("builder-preview-morph");
        void site.offsetWidth;
        site.classList.add("builder-preview-morph");
        window.setTimeout(function () {
          site.classList.remove("builder-preview-morph");
        }, 420);
      }, 90);
    }

    function renderPreviewServices() {
      var grid = document.getElementById("preview-services-grid");
      if (!grid) return;
      grid.innerHTML = "";
      wizardServices.forEach(function (id) {
        var ico = SERVICE_ICONS[id];
        if (!ico) return;
        var card = document.createElement("div");
        card.className = "builder-preview-svc-card builder-preview-svc-card--live";
        var title = tk("builder_svc_" + id);
        var desc = tk("builder_svc_" + id + "_d");
        card.innerHTML =
          '<span class="builder-preview-svc-ico">' +
          ico +
          "</span>" +
          '<span class="builder-preview-svc-t">' +
          title +
          "</span>" +
          '<span class="builder-preview-svc-d">' +
          desc +
          "</span>";
        grid.appendChild(card);
      });
      if (wizardServices.length === 0) {
        for (var i = 0; i < 3; i++) {
          var ph = document.createElement("div");
          ph.className = "builder-preview-svc-card builder-preview-svc-card--ph";
          ph.setAttribute("aria-hidden", "true");
          grid.appendChild(ph);
        }
      }
    }

    function applyLogoToPreview() {
      var lockup = root.querySelector(".builder-preview-brand-lockup");
      var brandEl = document.getElementById("preview-brand-name");
      var navImg = document.getElementById("preview-logo-nav");
      var heroImg = document.getElementById("preview-logo-hero");
      var footImg = document.getElementById("preview-logo-footer");
      var heroWrap = document.getElementById("preview-hero-logo-wrap");
      if (logoObjectUrl) {
        if (lockup) lockup.classList.add("has-logo");
        if (brandEl) brandEl.hidden = true;
        [navImg, heroImg, footImg].forEach(function (im) {
          if (!im) return;
          im.src = logoObjectUrl;
          im.removeAttribute("hidden");
        });
        if (heroWrap) heroWrap.hidden = false;
      } else {
        if (lockup) lockup.classList.remove("has-logo");
        if (brandEl) brandEl.hidden = false;
        [navImg, heroImg, footImg].forEach(function (im) {
          if (!im) return;
          im.removeAttribute("src");
          im.setAttribute("hidden", "");
        });
        if (heroWrap) heroWrap.hidden = true;
      }
    }

    function sanitizeBusinessName(raw) {
      if (raw == null) return "";
      var s = String(raw).replace(/[\u0000-\u001F\u007F]/g, "").trim();
      if (s.length > 48) s = s.slice(0, 48);
      return s;
    }

    function domainFromBusinessName(name) {
      if (!name) return "";
      var slug = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      if (!slug) return "brand.com";
      if (slug.length > 22) slug = slug.slice(0, 22).replace(/-+$/g, "");
      return slug + ".com";
    }

    function displayBrandName(name) {
      return name || tk("builder_preview_brand_ph");
    }

    function previewTpl(key, name) {
      return tk(key).replace(/\{name\}/g, displayBrandName(name));
    }

    function previewUrlBar() {
      var bn = businessInput ? sanitizeBusinessName(businessInput.value) : "";
      if (bn) return domainFromBusinessName(bn);
      var eff = getEffectiveProject();
      if (!eff) return "yoursite.com";
      return previewUrlForProject(eff);
    }

    function applyPersonalizedPreview() {
      var name = businessInput ? sanitizeBusinessName(businessInput.value) : "";
      var brandEl = document.getElementById("preview-brand-name");
      var kickerEl = document.getElementById("preview-kicker");
      var headEl = document.getElementById("preview-headline");
      var subEl = document.getElementById("preview-sub");
      var ctaTextEl = document.getElementById("preview-cta-text");
      var rentCtaEl = document.getElementById("preview-rent-cta");
      var appH1 = document.getElementById("preview-app-h1");
      var appSub = document.getElementById("preview-app-sub");
      var urlEl = document.getElementById("builder-preview-url");
      var footerLogoText = document.getElementById("preview-footer-logo-text");

      if (previewViewport) {
        if (wizardStyle) previewViewport.setAttribute("data-wizard-style", wizardStyle);
        else previewViewport.removeAttribute("data-wizard-style");
      }

      if (brandEl) brandEl.textContent = displayBrandName(name);
      if (kickerEl) kickerEl.textContent = previewTpl("builder_preview_kicker", name);
      if (headEl) headEl.textContent = previewTpl("builder_preview_headline", name);
      if (subEl) subEl.textContent = previewTpl("builder_preview_sub", name);
      if (ctaTextEl) ctaTextEl.textContent = previewTpl("builder_preview_cta", name);
      if (rentCtaEl) rentCtaEl.textContent = previewTpl("builder_preview_rent_cta", name);
      if (appH1) appH1.textContent = previewTpl("builder_preview_app_title", name);
      if (appSub) appSub.textContent = previewTpl("builder_preview_app_sub", name);
      if (footerLogoText) footerLogoText.textContent = displayBrandName(name);
      applyLogoToPreview();
      renderPreviewServices();
      if (urlEl) urlEl.textContent = previewUrlBar();
      schedulePreviewMorph();
    }

    var displayAmount = 0;
    var animRaf = null;
    var pulseTimer = null;
    var builderAudioCtx = null;
    var prefersReducedBuilder =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var aiFeedbackTimers = { t1: null, t2: null };
    var aiMsgFlip = false;

    function computeOneTime() {
      if (!state.project) return 0;
      var total = PROJECT_PRICES[state.project] || 0;
      state.features.forEach(function (f) {
        total += FEATURE_PRICES[f] || 0;
      });
      return total;
    }

    function setAmountDisplay(n) {
      var s = formatEuro(n);
      if (liveEl) liveEl.textContent = s;
      if (summaryTotalEl) summaryTotalEl.textContent = s;
    }

    function triggerPricePulse() {
      if (!liveEl || !liveBarEl) return;
      liveEl.classList.remove("builder-live-amount--pulse");
      liveBarEl.classList.remove("builder-live-bar--pulse");
      void liveEl.offsetWidth;
      liveEl.classList.add("builder-live-amount--pulse");
      liveBarEl.classList.add("builder-live-bar--pulse");
      if (pulseTimer) clearTimeout(pulseTimer);
      pulseTimer = window.setTimeout(function () {
        liveEl.classList.remove("builder-live-amount--pulse");
        liveBarEl.classList.remove("builder-live-bar--pulse");
      }, 650);
    }

    function playSelectTick() {
      if (window.NDS_BUILDER_SOUND === false) return;
      try {
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        var Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        if (!builderAudioCtx) builderAudioCtx = new Ctx();
        var ctx = builderAudioCtx;
        if (ctx.state === "suspended") ctx.resume();
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = 880;
        gain.gain.value = 0.0001;
        gain.gain.exponentialRampToValueAtTime(0.018, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.07);
      } catch (e) {}
    }

    function runSignalPing(fromEl) {
      var fxRoot = document.getElementById("nds-builder-fx-root");
      if (!fxRoot || !fromEl || !liveEl || prefersReducedBuilder) return;
      var r1 = fromEl.getBoundingClientRect();
      var r2 = liveEl.getBoundingClientRect();
      var x1 = r1.left + r1.width / 2;
      var y1 = r1.top + r1.height / 2;
      var x2 = r2.left + r2.width / 2;
      var y2 = r2.top + r2.height / 2;
      var dx = x2 - x1;
      var dy = y2 - y1;
      var dot = document.createElement("span");
      dot.className = "nds-builder-ping";
      dot.setAttribute("aria-hidden", "true");
      fxRoot.appendChild(dot);
      dot.style.left = x1 + "px";
      dot.style.top = y1 + "px";
      var anim = dot.animate(
        [
          {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 1,
            filter: "blur(0px)",
          },
          {
            transform: "translate(calc(-50% + " + dx + "px), calc(-50% + " + dy + "px)) scale(0.4)",
            opacity: 0.75,
            filter: "blur(0.3px)",
          },
        ],
        { duration: 500, easing: "cubic-bezier(0.33, 0, 0.2, 1)" }
      );
      anim.onfinish = function () {
        if (dot.parentNode) dot.parentNode.removeChild(dot);
      };
    }

    function showAiFeedback() {
      var el = document.getElementById("builder-ai-hud");
      if (!el || prefersReducedBuilder) return;
      if (aiFeedbackTimers.t1) clearTimeout(aiFeedbackTimers.t1);
      if (aiFeedbackTimers.t2) clearTimeout(aiFeedbackTimers.t2);
      aiMsgFlip = !aiMsgFlip;
      var key = aiMsgFlip ? "builder_ai_optimize" : "builder_ai_calc";
      el.textContent = tk(key);
      el.hidden = false;
      el.classList.remove("builder-ai-hud--out");
      requestAnimationFrame(function () {
        el.classList.add("builder-ai-hud--visible");
      });
      aiFeedbackTimers.t1 = window.setTimeout(function () {
        el.classList.add("builder-ai-hud--out");
        aiFeedbackTimers.t2 = window.setTimeout(function () {
          el.hidden = true;
          el.classList.remove("builder-ai-hud--visible", "builder-ai-hud--out");
        }, 380);
      }, 1000);
    }

    function showCompileMini() {
      var wrap = document.getElementById("builder-compile-hud");
      var fill = document.getElementById("builder-compile-hud-fill");
      var lbl = document.getElementById("builder-compile-hud-label");
      if (!wrap || !fill || !lbl || prefersReducedBuilder) return;
      wrap.hidden = false;
      wrap.classList.remove("builder-compile-hud--done");
      lbl.textContent = tk("builder_compile_lbl");
      fill.style.transition = "none";
      fill.style.width = "0%";
      void fill.offsetWidth;
      fill.style.transition = "width 0.42s cubic-bezier(0.33, 0.9, 0.2, 1)";
      requestAnimationFrame(function () {
        fill.style.width = "100%";
      });
      window.setTimeout(function () {
        wrap.classList.add("builder-compile-hud--done");
        lbl.textContent = tk("builder_compile_done");
      }, 480);
      window.setTimeout(function () {
        wrap.hidden = true;
        fill.style.width = "0%";
      }, 900);
    }

    function runSelectionWtf(fromEl) {
      runSignalPing(fromEl);
      showAiFeedback();
      showCompileMini();
    }

    function animateTo(target) {
      var start = displayAmount;
      if (Math.round(target) !== Math.round(start)) triggerPricePulse();
      var dur = 480;
      var t0 = performance.now();
      if (animRaf) cancelAnimationFrame(animRaf);
      function easeOut(t) {
        return 1 - Math.pow(1 - t, 3);
      }
      function frame(now) {
        var u = Math.min((now - t0) / dur, 1);
        displayAmount = Math.round(start + (target - start) * easeOut(u));
        setAmountDisplay(displayAmount);
        if (u < 1) animRaf = requestAnimationFrame(frame);
      }
      animRaf = requestAnimationFrame(frame);
    }

    function syncAmount() {
      animateTo(computeOneTime());
    }

    function refreshSummary() {
      if (!summaryList) return;
      summaryList.innerHTML = "";

      function addLine(left, right) {
        var li = document.createElement("li");
        var a = document.createElement("span");
        a.textContent = left;
        var b = document.createElement("span");
        b.textContent = right;
        li.appendChild(a);
        li.appendChild(b);
        summaryList.appendChild(li);
      }

      if (!state.project) {
        addLine(tk("builder_sum_line_project"), "—");
        addLine(tk("builder_sum_line_features"), "—");
        return;
      }

      addLine(tk("builder_sum_line_project"), tk(projectTitleKey(state.project)));

      var featNames = FEATURE_ORDER.filter(function (f) {
        return state.features.indexOf(f) >= 0;
      }).map(function (f) {
        return tk(featureTitleKey(f));
      });
      addLine(
        tk("builder_sum_line_features"),
        featNames.length ? featNames.join(", ") : tk("builder_sum_features_none")
      );
    }

    function updateCta() {
      if (!ctaBtn) return;
      ctaBtn.disabled = !state.project;
    }

    function triggerPreviewRebuild() {
      if (!previewViewport || !previewRebuild || prefersReducedPreview) return;
      previewRebuild.hidden = false;
      previewViewport.classList.add("is-rebuilding");
      if (previewRebuildTimer) clearTimeout(previewRebuildTimer);
      previewRebuildTimer = window.setTimeout(function () {
        previewRebuild.hidden = true;
        previewViewport.classList.remove("is-rebuilding");
      }, 620);
    }

    function previewUrlForProject(slug) {
      var k = "builder_preview_url_" + slug;
      var s = tk(k);
      return s && s !== k ? s : "yoursite.com";
    }

    function renderPreview() {
      if (!previewViewport || !previewBody || !previewEmpty) return;

      var eff = getEffectiveProject();

      previewViewport.setAttribute("data-layout", state.layout);
      previewViewport.setAttribute("data-palette", state.palette);
      previewViewport.setAttribute("data-project", eff || "");

      var chromeApp = root.querySelector(".builder-preview-chrome-app");

      if (!eff) {
        previewEmpty.hidden = false;
        previewBody.hidden = true;
        if (chromeApp) chromeApp.hidden = true;
        previewViewport.removeAttribute("data-project");
        applyPersonalizedPreview();
        return;
      }

      previewEmpty.hidden = true;
      previewBody.hidden = false;

      previewBody.className = "builder-preview-body";
      previewBody.classList.add("site--project-" + eff);
      state.features.forEach(function (f) {
        previewBody.classList.add("site--feat-" + f);
      });
      if (chromeApp) {
        var showMobileChrome = eff === "mobile_native" || eff === "web_mobile";
        chromeApp.hidden = !showMobileChrome;
      }
      applyPersonalizedPreview();
    }

    function onPreviewStateChange() {
      renderPreview();
      triggerPreviewRebuild();
    }

    root.querySelectorAll(".builder-tile[data-project]").forEach(function (tile) {
      tile.addEventListener("click", function () {
        var p = tile.getAttribute("data-project");
        state.project = p;
        root.querySelectorAll(".builder-tile[data-project]").forEach(function (x) {
          var on = x.getAttribute("data-project") === p;
          x.classList.toggle("is-selected", on);
          x.classList.toggle("is-flipped", on);
        });
        playSelectTick();
        runSelectionWtf(tile);
        refreshSummary();
        syncAmount();
        updateCta();
        onPreviewStateChange();
      });
    });

    root.querySelectorAll(".builder-tile--toggle[data-feature]").forEach(function (tile) {
      tile.addEventListener("click", function () {
        var f = tile.getAttribute("data-feature");
        tile.classList.toggle("is-selected");
        tile.classList.toggle("is-flipped", tile.classList.contains("is-selected"));
        if (tile.classList.contains("is-selected")) {
          if (state.features.indexOf(f) < 0) state.features.push(f);
          try {
            window.dispatchEvent(
              new CustomEvent("nds-builder-context", { detail: { kind: "feature" } })
            );
          } catch (err) {}
        } else {
          state.features = state.features.filter(function (x) {
            return x !== f;
          });
        }
        playSelectTick();
        runSelectionWtf(tile);
        refreshSummary();
        syncAmount();
        onPreviewStateChange();
      });
    });

    root.querySelectorAll("[data-preview-layout]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lay = btn.getAttribute("data-preview-layout");
        if (!lay) return;
        state.layout = lay;
        root.querySelectorAll("[data-preview-layout]").forEach(function (b) {
          var on = b.getAttribute("data-preview-layout") === lay;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        onPreviewStateChange();
      });
    });

    root.querySelectorAll("[data-preview-palette]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var pal = btn.getAttribute("data-preview-palette");
        if (!pal) return;
        state.palette = pal;
        root.querySelectorAll("[data-preview-palette]").forEach(function (b) {
          var on = b.getAttribute("data-preview-palette") === pal;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        onPreviewStateChange();
      });
    });

    function buildWhatsAppMessage() {
      var typeStr = state.project ? tk(projectTitleKey(state.project)) : "—";
      var featStr = FEATURE_ORDER.filter(function (f) {
        return state.features.indexOf(f) >= 0;
      })
        .map(function (f) {
          return tk(featureTitleKey(f));
        })
        .join(", ");
      if (!featStr) featStr = tk("builder_sum_features_none");
      var priceStr = formatEuro(computeOneTime());
      var tpl = tk("builder_wa_msg");
      var msg = tpl
        .replace("{type}", typeStr)
        .replace("{features}", featStr)
        .replace("{price}", priceStr);
      var bn = businessInput ? sanitizeBusinessName(businessInput.value) : "";
      if (bn) {
        msg += "\n" + tk("builder_wa_business").replace("{name}", bn);
      }
      return msg;
    }

    function buildLaunchMessage() {
      var typeStr = state.project ? tk(projectTitleKey(state.project)) : "—";
      var featStr = FEATURE_ORDER.filter(function (f) {
        return state.features.indexOf(f) >= 0;
      })
        .map(function (f) {
          return tk(featureTitleKey(f));
        })
        .join(", ");
      if (!featStr) featStr = tk("builder_sum_features_none");
      return tk("builder_wa_msg")
        .replace("{type}", typeStr)
        .replace("{features}", featStr)
        .replace("{price}", formatEuro(computeOneTime()));
    }

    if (ctaBtn) {
      ctaBtn.addEventListener("click", function () {
        if (!state.project) return;
        var msg = buildLaunchMessage();
        var url =
          "https://wa.me/" + WHATSAPP_E164 + "?text=" + encodeURIComponent(msg);
        try {
          sessionStorage.setItem("nds_contact_prefill", msg);
        } catch (e) {}
        window.open(url, "_blank", "noopener,noreferrer");
        var contactSection = document.getElementById("contact");
        var messageTa = document.getElementById("contact-message");
        var formPanel = document.querySelector(".contact-form-panel");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        window.setTimeout(function () {
          if (messageTa) {
            messageTa.value = msg;
            try {
              messageTa.focus();
            } catch (err2) {}
          }
          if (formPanel) {
            formPanel.classList.add("contact-form-panel--offer-highlight");
            window.setTimeout(function () {
              formPanel.classList.remove("contact-form-panel--offer-highlight");
            }, 2600);
          }
        }, 450);
      });
    }

    window.ndsProjectBuilderRefresh = function () {
      refreshSummary();
      syncAmount();
      updateProgressUi();
      renderPreview();
    };

    root.querySelectorAll(".builder-style-btn[data-wizard-style]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var s = btn.getAttribute("data-wizard-style");
        if (!s) return;
        wizardStyle = s;
        syncStyleButtonsUi();
        saveWizardSession();
        maybeAutoSelectBusiness();
        updateProgressUi();
        onPreviewStateChange();
      });
    });

    root.querySelectorAll(".builder-service-chip[data-service]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var id = chip.getAttribute("data-service");
        if (!id) return;
        var ix = wizardServices.indexOf(id);
        if (ix >= 0) wizardServices.splice(ix, 1);
        else wizardServices.push(id);
        syncServiceChipsUi();
        saveWizardSession();
        maybeAutoSelectBusiness();
        updateProgressUi();
        onPreviewStateChange();
      });
    });

    function clearWizardLogo() {
      if (logoObjectUrl) {
        try {
          URL.revokeObjectURL(logoObjectUrl);
        } catch (e) {}
        logoObjectUrl = null;
      }
      if (logoInput) logoInput.value = "";
      if (logoThumb) logoThumb.removeAttribute("src");
      if (logoThumbWrap) logoThumbWrap.hidden = true;
      if (logoClearBtn) logoClearBtn.hidden = true;
      updateProgressUi();
      onPreviewStateChange();
    }

    if (logoInput) {
      logoInput.addEventListener("change", function () {
        var f = logoInput.files && logoInput.files[0];
        if (!f) return;
        if (f.size > 2.8 * 1024 * 1024) return;
        if (logoObjectUrl) {
          try {
            URL.revokeObjectURL(logoObjectUrl);
          } catch (e2) {}
        }
        logoObjectUrl = URL.createObjectURL(f);
        if (logoThumb) {
          logoThumb.src = logoObjectUrl;
          logoThumb.alt = "";
        }
        if (logoThumbWrap) logoThumbWrap.hidden = false;
        if (logoClearBtn) logoClearBtn.hidden = false;
        maybeAutoSelectBusiness();
        updateProgressUi();
        onPreviewStateChange();
      });
    }

    if (logoClearBtn) {
      logoClearBtn.addEventListener("click", function () {
        clearWizardLogo();
      });
    }

    try {
      var savedBiz = sessionStorage.getItem(BUSINESS_SESSION_KEY);
      if (savedBiz && businessInput) businessInput.value = savedBiz;
    } catch (errBiz) {}

    loadWizardSession();
    syncStyleButtonsUi();
    syncServiceChipsUi();
    maybeAutoSelectBusiness();

    if (businessInput) {
      businessInput.addEventListener("input", function () {
        try {
          sessionStorage.setItem(BUSINESS_SESSION_KEY, businessInput.value);
        } catch (errS) {}
        maybeAutoSelectBusiness();
        updateProgressUi();
        renderPreview();
        updateCta();
      });
    }

    refreshSummary();
    syncAmount();
    updateProgressUi();
    updateCta();
    renderPreview();
  })();

  /* ---------- Portfolio device mockups (scaled iframes + 3D tilt) ---------- */
  (function initDeviceShowcase() {
    var link = document.querySelector(".device-showcase__link");
    if (!link) return;

    var url = link.getAttribute("href") || link.getAttribute("data-project-url");
    if (url) {
      link.querySelectorAll(".device-iframe").forEach(function (iframe) {
        iframe.setAttribute("src", url);
      });
    }

    function fitWrap(wrap) {
      var fitW = parseFloat(wrap.getAttribute("data-fit-width")) || 1440;
      var fitH = parseFloat(wrap.getAttribute("data-fit-height")) || 900;
      var rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      /* Scale by width so the site renders at a real desktop/mobile viewport */
      var scale = rect.width / fitW;
      wrap.style.setProperty("--fit-w", fitW + "px");
      wrap.style.setProperty("--fit-h", fitH + "px");
      wrap.style.setProperty("--fit-scale", String(scale));
    }

    function fitAll() {
      link.querySelectorAll("[data-iframe-fit]").forEach(fitWrap);
    }

    fitAll();
    window.addEventListener("resize", fitAll, { passive: true });

    if (typeof ResizeObserver !== "undefined") {
      var ro = new ResizeObserver(fitAll);
      link.querySelectorAll("[data-iframe-fit]").forEach(function (wrap) {
        ro.observe(wrap);
      });
    }

    /* Re-fit after iframe paint (layout can settle late) */
    link.querySelectorAll(".device-iframe").forEach(function (iframe) {
      iframe.addEventListener("load", fitAll, { once: true });
    });
    requestAnimationFrame(fitAll);

    var tilt = link.querySelector("[data-device-tilt]");
    if (!tilt) return;

    var prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    var maxDeg = 6.5;

    function onMove(e) {
      var r = tilt.getBoundingClientRect();
      var mx = (e.clientX - r.left) / r.width - 0.5;
      var my = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.setProperty("--tilt-x", (my * -maxDeg * 0.65).toFixed(3) + "deg");
      tilt.style.setProperty("--tilt-y", (mx * maxDeg).toFixed(3) + "deg");
    }

    function onLeave() {
      tilt.style.setProperty("--tilt-x", "0deg");
      tilt.style.setProperty("--tilt-y", "0deg");
    }

    link.addEventListener("mousemove", onMove, { passive: true });
    link.addEventListener("mouseleave", onLeave, { passive: true });
  })();

  /* ---------- Contact form (EmailJS) ---------- */
  (function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var EMAILJS_PUBLIC_KEY = "4PnKlD2n4A_EGMXfl";
    var EMAILJS_SERVICE_ID = "service_ylwrobl";
    /** Add {{phone}} to your EmailJS template (same service). */
    var EMAILJS_TEMPLATE_ID = "template_lcge277";

    var nameInput = document.getElementById("contact-name");
    var emailInput = document.getElementById("contact-email");
    var phoneInput = document.getElementById("phone");
    var messageInput = document.getElementById("contact-message");
    try {
      var prefill = sessionStorage.getItem("nds_contact_prefill");
      if (prefill && messageInput && !messageInput.value.trim()) {
        messageInput.value = prefill;
        sessionStorage.removeItem("nds_contact_prefill");
      }
    } catch (err) {}

    var nameMsg = document.getElementById("contact-name-msg");
    var emailMsg = document.getElementById("contact-email-msg");
    var phoneMsg = document.getElementById("contact-phone-msg");
    var messageMsg = document.getElementById("contact-message-msg");
    var btn = document.getElementById("contact-submit");
    var statusOk = document.getElementById("contact-status-success");
    var statusErr = document.getElementById("contact-status-error");

    function t(key) {
      var l = document.documentElement.getAttribute("data-lang") || "en";
      var pack = translations[l];
      return pack && pack[key] ? pack[key] : translations.en[key] || "";
    }

    function validateEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    function validatePhone(v) {
      if (v == null || !String(v).trim()) return true;
      var s = String(v).trim();
      if (!/^[0-9+\-\s()]+$/.test(s)) return false;
      var digits = s.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }

    function clearFieldErrors() {
      [nameMsg, emailMsg, phoneMsg, messageMsg].forEach(function (m) {
        if (m) m.textContent = "";
      });
      form.querySelectorAll(".contact-field").forEach(function (field) {
        field.classList.remove("contact-field--error");
      });
    }

    function hideGlobalStatus() {
      if (statusOk) statusOk.hidden = true;
      if (statusErr) statusErr.hidden = true;
    }

    function setLoading(loading) {
      if (!btn) return;
      btn.disabled = !!loading;
      btn.classList.toggle("is-loading", !!loading);
      var loadEl = btn.querySelector(".btn-contact-loading");
      if (loadEl) {
        if (loading) loadEl.removeAttribute("hidden");
        else loadEl.setAttribute("hidden", "");
      }
    }

    [nameInput, emailInput, phoneInput, messageInput].forEach(function (input) {
      if (!input) return;
      input.addEventListener("input", function () {
        clearFieldErrors();
        hideGlobalStatus();
      });
    });

    var emailjsClient = window.emailjs;
    if (emailjsClient && typeof emailjsClient.init === "function") {
      try {
        emailjsClient.init({ publicKey: EMAILJS_PUBLIC_KEY });
      } catch (err) {}
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearFieldErrors();
      hideGlobalStatus();

      var name = nameInput ? nameInput.value.trim() : "";
      var email = emailInput ? emailInput.value.trim() : "";
      var phone = phoneInput ? phoneInput.value.trim() : "";
      var message = messageInput ? messageInput.value.trim() : "";
      var ok = true;

      if (!name) {
        ok = false;
        if (nameMsg) nameMsg.textContent = t("contact_err_required");
        var nf = nameInput && nameInput.closest(".contact-field");
        if (nf) nf.classList.add("contact-field--error");
      }
      if (!email) {
        ok = false;
        if (emailMsg) emailMsg.textContent = t("contact_err_required");
        var ef = emailInput && emailInput.closest(".contact-field");
        if (ef) ef.classList.add("contact-field--error");
      } else if (!validateEmail(email)) {
        ok = false;
        if (emailMsg) emailMsg.textContent = t("contact_err_email");
        var ef2 = emailInput && emailInput.closest(".contact-field");
        if (ef2) ef2.classList.add("contact-field--error");
      }
      if (phone && !validatePhone(phone)) {
        ok = false;
        if (phoneMsg) phoneMsg.textContent = t("contact_err_phone");
        var pf = phoneInput && phoneInput.closest(".contact-field");
        if (pf) pf.classList.add("contact-field--error");
      }
      if (!message) {
        ok = false;
        if (messageMsg) messageMsg.textContent = t("contact_err_required");
        var mf = messageInput && messageInput.closest(".contact-field");
        if (mf) mf.classList.add("contact-field--error");
      }

      if (!ok) return;

      if (!emailjsClient || typeof emailjsClient.send !== "function") {
        if (statusErr) {
          statusErr.textContent = t("contact_status_fail");
          statusErr.hidden = false;
        }
        return;
      }

      setLoading(true);

      var params = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        reply_to: email,
        from_name: name,
      };

      emailjsClient
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
        .then(function () {
          if (statusOk) {
            statusOk.textContent = t("contact_status_ok");
            statusOk.hidden = false;
          }
          form.reset();
          clearFieldErrors();
        })
        .catch(function () {
          if (statusErr) {
            statusErr.textContent = t("contact_status_fail");
            statusErr.hidden = false;
          }
        })
        .finally(function () {
          setLoading(false);
        });
    });
  })();

  /* ---------- Cursor glow (fine pointer; smooth lerp; skip if reduced motion) ---------- */
  (function initCursorGlow() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (window.matchMedia && !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    var el = document.createElement("div");
    el.className = "cursor-glow";
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);

    var targetX = window.innerWidth * 0.5;
    var targetY = window.innerHeight * 0.42;
    var x = targetX;
    var y = targetY;
    var rafId = null;
    var hasMoved = false;

    function setTransform(px, py) {
      el.style.transform =
        "translate3d(" + px + "px," + py + "px,0) translate(-50%,-50%)";
    }

    function tick() {
      rafId = null;
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      setTransform(x, y);
      var dx = targetX - x;
      var dy = targetY - y;
      if (dx * dx + dy * dy > 0.2) {
        rafId = window.requestAnimationFrame(tick);
      }
    }

    function scheduleTick() {
      if (rafId == null) rafId = window.requestAnimationFrame(tick);
    }

    document.addEventListener(
      "mousemove",
      function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!hasMoved) {
          hasMoved = true;
          x = targetX;
          y = targetY;
          setTransform(x, y);
        }
        el.classList.add("cursor-glow--active");
        scheduleTick();
      },
      { passive: true }
    );

    document.documentElement.addEventListener("mouseleave", function () {
      el.classList.remove("cursor-glow--active");
    });

    setTransform(x, y);
  })();

  /* ---------- Cookie consent (GDPR) ---------- */
  (function initCookieConsent() {
    var STORAGE_KEY = "nds_cookie_consent_v1";
    var banner = document.getElementById("cookie-consent");
    var modal = document.getElementById("cookie-modal");
    if (!banner || !modal) return;

    var acceptBtn = document.getElementById("cookie-accept");
    var rejectBtn = document.getElementById("cookie-reject");
    var manageBtn = document.getElementById("cookie-manage");
    var backdrop = document.getElementById("cookie-modal-backdrop");
    var saveBtn = document.getElementById("cookie-save");
    var cancelBtn = document.getElementById("cookie-modal-cancel");
    var cbAnalytics = document.getElementById("cookie-analytics");
    var cbMarketing = document.getElementById("cookie-marketing");

    function readStored() {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        var o = JSON.parse(raw);
        if (!o || typeof o !== "object") return null;
        return {
          necessary: true,
          analytics: !!o.analytics,
          marketing: !!o.marketing,
        };
      } catch (e) {
        return null;
      }
    }

    function writeStored(prefs) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            necessary: true,
            analytics: !!prefs.analytics,
            marketing: !!prefs.marketing,
            version: 1,
            ts: Date.now(),
          })
        );
      } catch (e) {}
    }

    function applyGlobal(prefs) {
      window.ndsCookieConsent = prefs;
      try {
        window.dispatchEvent(new CustomEvent("nds:cookie-consent", { detail: prefs }));
      } catch (e) {}
    }

    function hideBanner() {
      banner.classList.remove("cookie-consent--visible");
      banner.setAttribute("aria-hidden", "true");
      window.setTimeout(function () {
        banner.hidden = true;
      }, 400);
    }

    function showBanner() {
      banner.hidden = false;
      banner.setAttribute("aria-hidden", "false");
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          banner.classList.add("cookie-consent--visible");
        });
      });
    }

    function openModal() {
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("cookie-modal-open");
      var s = readStored();
      if (cbAnalytics) cbAnalytics.checked = s ? s.analytics : false;
      if (cbMarketing) cbMarketing.checked = s ? s.marketing : false;
      window.requestAnimationFrame(function () {
        modal.classList.add("cookie-modal--visible");
        var toFocus = cbAnalytics || saveBtn;
        if (toFocus) toFocus.focus();
      });
    }

    function closeModal() {
      if (!modal.classList.contains("cookie-modal--visible")) return;
      modal.classList.remove("cookie-modal--visible");
      document.body.classList.remove("cookie-modal-open");
      window.setTimeout(function () {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
      }, 320);
    }

    function savePrefs(prefs) {
      writeStored(prefs);
      applyGlobal(prefs);
      var wasModal = modal.classList.contains("cookie-modal--visible");
      if (wasModal) closeModal();
      hideBanner();
    }

    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        savePrefs({ analytics: true, marketing: true });
      });
    }
    if (rejectBtn) {
      rejectBtn.addEventListener("click", function () {
        savePrefs({ analytics: false, marketing: false });
      });
    }
    if (manageBtn) {
      manageBtn.addEventListener("click", function () {
        openModal();
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        savePrefs({
          analytics: cbAnalytics ? cbAnalytics.checked : false,
          marketing: cbMarketing ? cbMarketing.checked : false,
        });
      });
    }
    if (backdrop) {
      backdrop.addEventListener("click", closeModal);
    }
    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      e.preventDefault();
      closeModal();
    });

    var existing = readStored();
    if (existing) {
      applyGlobal(existing);
    } else {
      window.setTimeout(showBanner, 650);
    }

    window.ndsGetCookieConsent = readStored;
    window.ndsOpenCookiePreferences = openModal;
  })();

  /* ---------- Contextual reactive messages (builder) ---------- */
  (function initBuilderContextToast() {
    var toast = document.getElementById("nds-context-toast");
    if (!toast) return;

    var builder = document.getElementById("project-builder");
    var hideTimer = null;
    var hideAfterVisibleTimer = null;
    var currentKey = null;
    var idleTimer = null;
    var lastIdleAt = -Infinity;
    var IDLE_MS = 4200;
    var IDLE_COOLDOWN_MS = 52000;
    var builderIntersecting = false;
    var pricingShown = false;

    function ctxTk(key) {
      var l = document.documentElement.getAttribute("data-lang") || "en";
      var pack = translations[l];
      return pack && pack[key] ? pack[key] : translations.en[key] || "";
    }

    function hideToast() {
      toast.classList.remove("nds-context-toast--visible");
      if (hideAfterVisibleTimer) clearTimeout(hideAfterVisibleTimer);
      hideAfterVisibleTimer = window.setTimeout(function () {
        toast.hidden = true;
        toast.setAttribute("hidden", "");
        currentKey = null;
      }, 420);
    }

    function showToast(key, durationMs) {
      clearIdleSchedule();
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        durationMs = Math.min(durationMs || 4000, 2800);
      } else {
        durationMs = durationMs || 4400;
      }
      currentKey = key;
      toast.textContent = ctxTk(key);
      toast.hidden = false;
      toast.removeAttribute("hidden");
      if (hideTimer) clearTimeout(hideTimer);
      if (hideAfterVisibleTimer) clearTimeout(hideAfterVisibleTimer);
      requestAnimationFrame(function () {
        toast.classList.add("nds-context-toast--visible");
      });
      hideTimer = window.setTimeout(function () {
        hideToast();
      }, durationMs);
    }

    function clearIdleSchedule() {
      if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
      }
    }

    function scheduleIdle() {
      clearIdleSchedule();
      if (!builder || !builderIntersecting) return;
      if (document.hidden) return;
      idleTimer = window.setTimeout(function () {
        idleTimer = null;
        if (!builderIntersecting || document.hidden) return;
        if (lastIdleAt !== -Infinity && Date.now() - lastIdleAt < IDLE_COOLDOWN_MS) return;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        lastIdleAt = Date.now();
        showToast("builder_ctx_idle", 5200);
      }, IDLE_MS);
    }

    function onBuilderPointerActivity(e) {
      if (!builder || !builder.contains(e.target)) return;
      clearIdleSchedule();
      scheduleIdle();
    }

    ["pointerdown", "pointermove", "keydown", "touchstart"].forEach(function (ev) {
      document.addEventListener(ev, onBuilderPointerActivity, { passive: true });
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearIdleSchedule();
      else scheduleIdle();
    });

    if (builder && "IntersectionObserver" in window) {
      var ioBuilder = new IntersectionObserver(
        function (entries) {
          var e = entries[0];
          builderIntersecting = e.isIntersecting && e.intersectionRatio > 0.08;
          if (builderIntersecting) scheduleIdle();
          else clearIdleSchedule();
        },
        { root: null, rootMargin: "0px 0px -8% 0px", threshold: [0, 0.1, 0.2] }
      );
      ioBuilder.observe(builder);
    }

    var pricingTarget = document.querySelector(".builder-configurator-side");
    if (pricingTarget && "IntersectionObserver" in window) {
      var ioPrice = new IntersectionObserver(
        function (entries) {
          if (pricingShown) return;
          var e = entries[0];
          if (!e.isIntersecting || e.intersectionRatio < 0.18) return;
          pricingShown = true;
          showToast("builder_ctx_pricing", 5600);
        },
        { root: null, rootMargin: "-6% 0px -10% 0px", threshold: [0.15, 0.25, 0.4] }
      );
      ioPrice.observe(pricingTarget);
    }

    window.addEventListener(
      "nds-builder-context",
      function (ev) {
        if (!ev.detail || ev.detail.kind !== "feature") return;
        showToast("builder_ctx_nice", 3400);
      }
    );

    window.ndsContextToastRefresh = function () {
      if (!currentKey || !toast.classList.contains("nds-context-toast--visible")) return;
      toast.textContent = ctxTk(currentKey);
    };
  })();
})();
