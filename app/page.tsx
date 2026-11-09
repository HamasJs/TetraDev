import { ArrowUpRight, ArrowDown, Workflow, Globe, Smartphone, BrainCircuit, FileText, PanelsTopLeft, Headset, Check, Mail, MessageCircle, Sparkles } from "lucide-react";
import { getContact, siteConfig } from "./site-config";
import ThemeToggle from "./components/theme-toggle";
import BrandScene from "./components/brand-scene";
const Arrow = () => <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />;
function Contact({ light = false }: { light?: boolean }) {
  const contact = getContact();
  return contact.href ? (
    <a className={`button ${light ? "light" : ""}`} href={contact.href}>
      {contact.label}
      <Arrow />
    </a>
  ) : (
    <span
      className={`button unavailable ${light ? "light" : ""}`}
      aria-disabled="true"
    >
      {contact.label}
      <Arrow />
    </span>
  );
}
function Mark() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <path d="M5 15h32l11 11v9H5zm58 0h32v20H52v-9zM29 47l19-11v38L29 89zm23-11 19 11v42L52 74z" />
    </svg>
  );
}
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header wrap">
        <a href="#" aria-label="TetraDev home" className="brand">
          <img
            src={siteConfig.logo}
            alt="TetraDev · AI Engineering"
            width="210"
            height="56"
          />
        </a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#offer">AI support offer</a>
          <a href="#process">Our process</a>
        </nav>
        <ThemeToggle />
        <div className="header-contact"><Contact /></div>
      </header>
      <main id="main">
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="live-dot" /> TETRADEV / AI & SOFTWARE DEVELOPMENT</p>
            <h1>AI automation.<br />Websites & apps.<br /><em>Built for your business.</em></h1>
            <p className="intro">TetraDev builds AI automations, websites, and applications for businesses and product teams. Tell us what you need to improve or build; we’ll define the scope and develop the solution.</p>
            <div className="hero-actions"><Contact /><a className="text-link" href="#services">Explore our services <ArrowDown size={16} aria-hidden="true" /></a></div>
            <div className="hero-footnote"><span>FOR BUSINESSES, FOUNDERS & PRODUCT TEAMS</span><span>A fixed-scope project, from build to handover</span></div>
          </div>
          <BrandScene />
        </section>
        <div className="principles"><div className="wrap principle-inner"><span>Your idea. <strong>Our engineering.</strong></span><span>AI AUTOMATION <i aria-hidden="true"><Sparkles size={15} /></i></span><span>WEB & APP DEVELOPMENT <i aria-hidden="true"><Sparkles size={15} /></i></span><span>AI ENGINEERING <i aria-hidden="true"><Sparkles size={15} /></i></span></div></div>
        <section id="services" className="section wrap services-section" aria-labelledby="services-title">
          <div className="section-heading"><div><p className="eyebrow">OUR SERVICES</p><h2 id="services-title">What can we build<br /><span>for your business?</span></h2></div><p>Four ways we help you turn a business need<br />into working software.</p></div>
          <div className="services-grid">
            {[
              { number: "01", icon: <Workflow aria-hidden="true" />, title: "AI Automation", description: "Reduce repetitive work by connecting your tools and adding AI to the steps that need it.", examples: "Workflow automation · Document processing · Tool integrations", tone: "blue" },
              { number: "02", icon: <Globe aria-hidden="true" />, title: "Web Development", description: "Build a professional business website or a custom web platform that works across screen sizes.", examples: "Company websites · Customer portals · Web applications", tone: "mint" },
              { number: "03", icon: <Smartphone aria-hidden="true" />, title: "App Development", description: "Turn your product idea into an application with clear user flows and the features your users need.", examples: "Mobile apps · Product interfaces · Backend integration", tone: "coral" },
              { number: "04", icon: <BrainCircuit aria-hidden="true" />, title: "AI Engineering", description: "Add AI features to your product using your business content, data, and existing systems.", examples: "AI assistants · Knowledge search · AI-powered features", tone: "violet" },
            ].map((service) => <article className={`service-card service-${service.tone}`} key={service.title}>
              <div className="service-top"><span className="service-icon" aria-hidden="true">{service.icon}</span><span>{service.number}</span></div>
              <h3>{service.title}</h3><p>{service.description}</p><p className="service-examples">{service.examples}</p>
              <a className="text-link" href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`${service.title} project inquiry`)}`}>Discuss {service.title} <Arrow /></a>
            </article>)}
          </div>
        </section>
        <section id="about" className="capabilities section wrap" aria-labelledby="capabilities-title">
          <div className="section-heading"><div><p className="eyebrow">FEATURED SERVICE / AI SUPPORT ASSISTANTS</p><h2 id="capabilities-title">Give customers answers.<br /><span>Keep your team in control.</span></h2></div><p>TetraDev is your engineering partner.<br />We build, integrate, test, and hand over the assistant.</p></div>
          <div className="capability-grid">
            <article className="capability blue-card"><span className="cap-icon"><FileText size={38} strokeWidth={1.5} aria-hidden="true" /></span><span className="cap-num">01</span><h3>Answers from<br />your help docs</h3><p>The assistant uses a defined set of articles you approve. Each answer links back to its source.</p><span className="cap-tag">YOUR CONTENT. YOUR CONTROL.</span></article>
            <article className="capability mint-card"><span className="cap-icon"><PanelsTopLeft size={38} strokeWidth={1.5} aria-hidden="true" /></span><span className="cap-num">02</span><h3>Support inside<br />your web app</h3><p>Customers ask questions in an agreed part of your existing product. We handle the integration.</p><span className="cap-tag">WHERE YOUR CUSTOMERS ALREADY WORK</span></article>
            <article className="capability coral-card"><span className="cap-icon"><Headset size={38} strokeWidth={1.5} aria-hidden="true" /></span><span className="cap-num">03</span><h3>A clear path<br />to your team</h3><p>When the docs don’t cover a question, the assistant directs the customer to your existing support channel.</p><span className="cap-tag">NO VERIFIED ANSWER? HUMAN HELP.</span></article>
          </div>
        </section>
        <section id="offer" className="offer section">
          <div className="wrap offer-grid">
            <div>
              <p className="eyebrow">02 / WHAT’S INCLUDED</p>
              <h2>
                One assistant.
                <br />
                <span>A complete delivery.</span>
              </h2>
              <p className="offer-intro">
                A fixed-scope engineering project for your existing SaaS product. We agree on the content, integration, and test questions before we build.
              </p>
              <a className="text-link" href="#contact">
                Let’s talk about your product <Arrow />
              </a>
            </div>
            <ul className="deliverables">
              {[
                [
                  "An integrated AI support assistant",
                  "One AI support assistant integrated into an agreed part of your existing web app.",
                ],
                [
                  "Approved content and source links",
                  "Answers grounded in a defined set of approved help articles, with source links.",
                ],
                [
                  "A fallback to human support",
                  "A fallback to your existing support channel when the answer isn’t covered.",
                ],
                [
                  "Deployment, testing, and handover",
                  "Deployment, testing on agreed customer questions, and a handover showing how to refresh the knowledge base.",
                ],
              ].map(([title, body], index) => (
                <li key={title}>
                  <span className="item-number">0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                  <span className="item-plus"><Check size={18} aria-hidden="true" /></span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section id="process" className="section wrap process">
          <div className="section-heading">
            <div>
              <p className="eyebrow">AI SUPPORT / HOW DELIVERY WORKS</p>
              <h2>From your help docs<br /><span>to your live product.</span></h2>
            </div>
            <p>
              After discovery, we send a fixed-scope proposal
              <br />
              with deliverables, a timeline, and a project fee.
            </p>
          </div>
          <div className="steps">
            {[
              [
                "Review your help docs",
                "We look at your help content, recurring questions, and existing support flow to define where the assistant can help.",
              ],
              [
                "Build and test the assistant",
                "We build against the approved articles and test source links, answers, and fallbacks on agreed customer questions.",
              ],
              [
                "Integrate and hand it over",
                "We deploy in the agreed part of your app and show your team how to refresh the knowledge base.",
              ],
            ].map(([title, body], index) => (
              <article key={title}>
                <div className="step-top">
                  <span>0{index + 1}</span>
                  <span>{index === 2 ? <Check size={18} aria-hidden="true" /> : <Arrow />}</span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section wrap">
          <div className="contact-orbit" aria-hidden="true">
            <Mark />
          </div>
          <div className="contact-content">
            <p className="eyebrow">TALK TO TETRADEV</p>
            <h2>
              Tell us what you
              <br />
              want to build.
            </h2>
            <p>
              Share your idea, the problem you want to solve, and the service you’re interested in.
              <br />
              For an AI support assistant, bring your help center link and three recurring customer questions.
            </p>
            <Contact light />
            <div className="contact-details">
              <a href={`mailto:${siteConfig.contactEmail}`}>
                <Mail size={16} aria-hidden="true" /> {siteConfig.contactEmail}
              </a>
              <a href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}>
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp · {siteConfig.whatsappDisplay} <Arrow />
              </a>
            </div>
          </div>
          <span className="contact-coordinate" aria-hidden="true">
            TETRADEV / AI ENGINEERING
          </span>
        </section>
      </main>
      <footer className="wrap footer">
        <a className="footer-brand" href="#">
          TetraDev<span>AI ENGINEERING</span>
        </a>
        <div className="footer-links"><a href="#services">Services</a><a href="#offer">AI support offer</a><a href="#process">Process</a><a href="#contact">Contact</a></div>
        <p>Practical AI. Thoughtfully engineered.</p>
        <span>© {new Date().getFullYear()} TetraDev</span>
      </footer>
    </>
  );
}
