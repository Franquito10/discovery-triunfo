import { useState, useEffect, useRef } from "react";
const logoSrc = "/logo-blanco.webp";


// ─── DATA ────────────────────────────────────────────────────────────
const AREAS = [
  {
    id: "direccion",
    name: "Dirección / Presidencia",
    icon: "◆",
    color: "#00D67E",
    isTop: true,
    questions: [
      "¿Cómo debería sentirse la experiencia ideal para quien elige Triunfo?",
      "¿Cuál es el mayor obstáculo hoy para avanzar hacia una estrategia centrada en el cliente?",
      "Si mañana pudiera resolverse un solo problema que afecta al cliente, ¿cuál sería?"
    ],
    findings: [
      "Visión clara del destino estratégico, con oportunidad de fortalecer las capacidades estructurales para sostenerla y escalarla.",
      "Voluntad de transformación presente en todas las áreas — no es un problema de convicción, es de habilitación.",
      "Necesidad de evolución incremental: valor medible cada trimestre, no promesas a largo plazo."
    ],
    opportunities: [
      "Decisiones basadas en datos reales y trazables",
      "Evolución incremental con resultados visibles cada 3-6 meses",
      "Capacidad institucional de decidir con información consolidada"
    ],
    docs: ["Resumen ejecutivo", "Roadmap estratégico", "Escenarios de evolución"]
  },
  {
    id: "operaciones",
    name: "Operación & IT",
    icon: "⚙",
    color: "#3B82F6",
    questions: [
      "¿Qué herramientas se utilizan hoy para gestionar la experiencia del cliente?",
      "¿Es posible ver el historial completo de un cliente en un solo lugar?",
      "¿Qué necesidades del negocio hoy no están habilitadas por el modelo tecnológico vigente?"
    ],
    findings: [
      "Convivencia de dos arquitecturas (GAUS y TriunfoNet) que cumplen su función actual, con oportunidad de integración progresiva.",
      "Conocimiento crítico del core concentrado en pocas personas — riesgo operativo identificado y abordable.",
      "Enfoque correcto de evolución incremental, no big bang. Las bases están, las conexiones faltan."
    ],
    opportunities: [
      "Priorización más clara entre mantenimiento y evolución",
      "Reducción de urgencias reactivas mediante estabilización",
      "Separación progresiva de capacidades vía APIs y servicios"
    ],
    docs: ["Diagnóstico tecnológico", "Mapa de sistemas", "Lineamientos de modernización"]
  },
  {
    id: "comercial",
    name: "Comercial",
    icon: "◈",
    color: "#F59E0B",
    questions: [
      "¿Qué iniciativas encontraron límites en la capacidad actual de los sistemas?",
      "¿Qué canal digital se beneficiaría más de ser fortalecido o unificado?",
      "¿Qué mejoras en la plataforma ayudarían a reducir la gestión manual de cotizaciones?"
    ],
    findings: [
      "Demanda real del mercado y voluntad comercial de expandir, con oportunidad de habilitar herramientas digitales que acompañen.",
      "Otros Riesgos representa una oportunidad concreta: 1.500 cotizaciones mensuales gestionadas por email, con potencial de conversión significativamente mayor según benchmarks del sector.",
      "El canal PAS necesita estabilidad como prioridad — cada interrupción del sistema es una oportunidad que se cierra en otra compañía."
    ],
    opportunities: [
      "Cotizadores digitales que industrialicen la conversión en Otros Riesgos",
      "Carrito de compras con débito único para habilitar cross-selling real",
      "Dashboard de gestión para el PAS: cartera, pipeline, conversión"
    ],
    docs: ["Diagnóstico comercial", "Análisis de conversión", "Propuesta de habilitación"]
  },
  {
    id: "proyectos",
    name: "Proyectos & Innovación",
    icon: "✦",
    color: "#8B5CF6",
    questions: [
      "¿Qué procesos hoy dependen de gestión manual que podrían evolucionar?",
      "¿Dónde se percibe mayor fricción cuando una iniciativa necesita interactuar con los sistemas actuales?",
      "¿Qué capacidades transversales harían posible escalar las mejoras que ya funcionan?"
    ],
    findings: [
      "Avances reales en automatización (RPA con 14 bots operativos) y analítica (Qlik) que demuestran capacidad de ejecución.",
      "Las iniciativas funcionan bien en su ámbito, pero encuentran límites al necesitar interactuar con el core — no por falta de voluntad, sino de interfaces.",
      "Wise opera como sistema de ticketing, no como CRM — la organización necesita una vista 360° del cliente que hoy no existe."
    ],
    opportunities: [
      "Capacidades transversales: CRM, gobierno de datos, motor de notificaciones",
      "Mayor autonomía para innovar sin depender de modificaciones al core",
      "Escalar lo que ya funciona (RPA, BI) hacia procesos de mayor impacto"
    ],
    docs: ["Diagnóstico de proyectos", "Mapa de capacidades", "Propuesta de plataforma"]
  },
  {
    id: "tecnica",
    name: "Técnica & Reaseguros",
    icon: "◇",
    color: "#EF4444",
    questions: [
      "¿En qué parte del proceso de suscripción se concentra hoy la mayor gestión manual?",
      "¿Qué información necesaria para decisiones técnicas hoy depende de consolidación manual?",
      "¿Dónde se percibe mayor oportunidad de mejorar la trazabilidad del proceso?"
    ],
    findings: [
      "Accidentes Personales como caso testigo: proceso completo por email y Excel, con oportunidad clara de digitalización.",
      "Reaseguro opera con herramientas que cumplen su función pero limitan la trazabilidad y velocidad de respuesta.",
      "Conversión del 10% en cotizaciones manuales — no es un problema de producto ni de demanda, es de proceso."
    ],
    opportunities: [
      "Industrializar la conversión: de 10% manual a 30-40% con flujo digital",
      "Trazabilidad formal en suscripción y reaseguro",
      "Liberar tiempo técnico de gestión operativa para análisis estratégico"
    ],
    docs: ["Diagnóstico técnico", "Mapa de procesos de suscripción", "Propuesta de automatización"]
  },
  {
    id: "marketing",
    name: "Estrategia & Marketing",
    icon: "◉",
    color: "#EC4899",
    questions: [
      "¿Qué consultas llegan hoy a Atención al Cliente como consecuencia de procesos previos?",
      "¿En qué momento del journey del cliente se percibe mayor fricción?",
      "¿Qué información del cliente sería necesaria para personalizar la experiencia?"
    ],
    findings: [
      "163.000 contactos mensuales en Atención al Cliente — el 80% corresponde a consecuencias de procesos previos, no a consultas comerciales.",
      "El 90% de los siniestros se gestionan por teléfono. El cliente busca lo digital pero el sistema actual no se lo ofrece.",
      "48% de los clientes ya están en canales digitales (ZDC), pero las herramientas actuales no resuelven sus necesidades principales."
    ],
    opportunities: [
      "Reducción significativa de contactos evitables mediante autogestión y visibilidad",
      "CRM corporativo con vista 360° del cliente — hoy inexistente",
      "Campañas y comunicaciones personalizadas basadas en datos reales"
    ],
    docs: ["Diagnóstico de experiencia", "Mapa de journey del cliente", "Propuesta CRM"]
  },
];

const QUICK_WINS = [
  { title: "Estabilizar TriunfoNet", desc: "Disponibilidad en horario comercial como prioridad operativa. Cada interrupción impacta directamente en el negocio.", time: "Meta: 3 meses", icon: "🛡" },
  { title: "Link de Pago Unificado", desc: "Para PAS y clientes. Reduce consultas por pagos no aplicados.", time: "Meta: 6 meses", icon: "🔗" },
  { title: "Estados de Siniestro + Notificaciones", desc: "El cliente ve en qué estado está su trámite. Reduce llamadas por falta de información.", time: "Meta: 9 meses", icon: "🔔" },
  { title: "Documentación de Conocimiento Crítico", desc: "Plan de transferencia para reducir dependencia de personas específicas.", time: "Continuo desde mes 1", icon: "📋" }
];

// ─── COMPONENTS ──────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
    }}>{children}</div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────
export default function DiscoveryPresentation() {
  const [activeArea, setActiveArea] = useState(null);
  const [activeTab, setActiveTab] = useState("escuchamos");
  const [section, setSection] = useState("home");
  // ✅ AGREGAR ESTO
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [section]);

  const area = AREAS.find(a => a.id === activeArea);

  const navItems = [
    { id: "home", label: "Inicio" },
    { id: "organigrama", label: "Discovery por Área" },
    { id: "quickwins", label: "Quick Wins" },
    { id: "transversales", label: "Capacidades Transversales" },
    { id: "vision", label: "Visión" }
  ];

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: "#050F0A",
      color: "#E8F0EC",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { font-family: 'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; }
        ::selection { background: #00D67E33; color: #00D67E; }
        .nav-item { cursor: pointer; padding: 10px 20px; border-radius: 100px; font-size: 13px; font-weight: 500; letter-spacing: 0.5px; transition: all 0.3s; border: 1px solid transparent; color: #7A9B8A; }
        .nav-item:hover { border-color: #00D67E44; color: #B0D4C0; }
        .nav-item.active { background: #00D67E18; border-color: #00D67E44; color: #00D67E; }
        .org-node { cursor: pointer; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); border: 1px solid #1A3D2A; border-radius: 16px; padding: 24px; background: linear-gradient(135deg, #0A1F14 0%, #0D2A1A 100%); position: relative; overflow: hidden; }
        .org-node::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--node-color); opacity: 0; transition: opacity 0.4s; }
        .org-node:hover { border-color: var(--node-color); transform: translateY(-4px); box-shadow: 0 12px 40px -8px var(--node-shadow); }
        .org-node:hover::before { opacity: 1; }
        .org-node.selected { border-color: var(--node-color); background: linear-gradient(135deg, #0A1F14 0%, #0F2E1E 100%); box-shadow: 0 12px 40px -8px var(--node-shadow); }
        .org-node.selected::before { opacity: 1; }
        .tab-btn { cursor: pointer; padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 500; transition: all 0.3s; border: 1px solid #1A3D2A; background: transparent; color: #7A9B8A; }
        .tab-btn:hover { border-color: #00D67E44; color: #B0D4C0; }
        .tab-btn.active { background: #00D67E18; border-color: #00D67E44; color: #00D67E; }
        .doc-btn { cursor: pointer; padding: 12px 18px; border-radius: 10px; font-size: 13px; font-weight: 500; transition: all 0.3s; border: 1px solid #1A3D2A; background: #0A1F14; color: #7A9B8A; display: flex; align-items: center; gap: 10px; }
        .doc-btn:hover { border-color: #00D67E44; color: #00D67E; background: #00D67E08; }
        .qw-card { border: 1px solid #1A3D2A; border-radius: 16px; padding: 28px; background: linear-gradient(135deg, #0A1F14 0%, #0D2A1A 100%); transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .qw-card:hover { border-color: #00D67E44; transform: translateY(-4px); box-shadow: 0 12px 40px -8px #00D67E15; }
        .line-h { height: 1px; background: linear-gradient(to right, transparent, #1A3D2A, transparent); }
        @keyframes pulse-soft { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        .pulse-dot { animation: pulse-soft 3s ease-in-out infinite; }
        /* ── Navbar Mobile (hamburger) ── */
        .nav-burger { display: none; }
        .nav-overlay { display: none; }

        @media (max-width: 900px) {
          .nav-burger { display: inline-flex; align-items: center; justify-content: center; }

          /* en mobile NO wrap: se oculta el nav normal */
          .nav-links { display: none !important; }

          /* dropdown */
          .nav-links.open{
            display: flex !important;
            position: absolute;
            right: 16px;
            top: 58px;
            flex-direction: column;
            gap: 8px;
            padding: 10px;
            border-radius: 14px;
            border: 1px solid #1A3D2A;
            background: rgba(5, 15, 10, 0.92);
            backdrop-filter: blur(18px);
            box-shadow: 0 18px 60px -20px rgba(0,0,0,0.6);
            min-width: 220px;
          }

          .nav-links.open .nav-item{
            width: 100%;
            text-align: left;
            padding: 10px 12px !important;
            border-radius: 12px;
          }

          .nav-overlay{
            display: block;
            position: fixed;
            inset: 0;
            background: transparent;
            z-index: -1; /* queda “detrás” del menú pero tapa el resto para poder cerrar */
          }
        }


        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .areas-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .frentes-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .container { padding: 0 16px !important; }
          .nav { padding: 12px 16px !important; }
          .nav-links { flex-wrap: wrap !important; justify-content: flex-end !important; gap: 6px !important; }
          .nav-item { padding: 8px 14px !important; font-size: 12px !important; }
          .areas-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .vision-grid { grid-template-columns: 1fr !important; }
          .qw-grid { grid-template-columns: 1fr !important; }
          .panel-tabs { flex-wrap: wrap !important; }
          .panel-header { padding: 20px 20px !important; }
          .panel-body { padding: 20px 20px 28px !important; }
          .cap-card-header { padding: 18px 18px !important; }
          .cap-card-body { padding: 18px 18px !important; }
        }
        @media (max-width: 720px) {
          .areas-grid { grid-template-columns: 1fr !important; }
          .home-buttons { flex-direction: column !important; }
          .home-buttons button { width: 100% !important; }
        }
      `}</style>

      {/* ── Background Texture ── */}
      <div style={{ position: "fixed", inset: 0, opacity: 0.03, backgroundImage: "radial-gradient(#00D67E 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "-40%", right: "-20%", width: "80%", height: "80%", background: "radial-gradient(ellipse, #00D67E08 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* ── Navigation ── */}
      <nav className="nav" style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 40px",
        background: "linear-gradient(to bottom, #050F0Aee, #050F0A00)",
        backdropFilter: "blur(20px)"
      }}>
        <div
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
          onClick={() => { setSection("home"); setActiveArea(null); }}
        >
          <img src={logoSrc} alt="Triunfo Seguros" style={{ height: 28, opacity: 0.9 }} />
        </div>

        {/* ✅ Botón hamburger (solo mobile) */}
        <button
          className="nav-burger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Abrir menú"
          style={{
            background: "transparent",
            border: "1px solid #1A3D2A",
            borderRadius: 12,
            padding: "10px 12px",
            cursor: "pointer",
            color: "#B0D4C0"
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* ✅ Links desktop + dropdown mobile */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`} style={{ display: "flex", gap: 4 }}>
          {navItems.map(item => (
            <div
              key={item.id}
              className={`nav-item ${section === item.id ? "active" : ""}`}
              onClick={() => { setSection(item.id); setActiveArea(null); }}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* ✅ Overlay para cerrar (solo cuando está abierto) */}
        {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
      </nav>


      <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

        {/* ═══════════════ HOME ═══════════════ */}
        {section === "home" && (
          <div style={{ minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <FadeIn delay={0.1}>
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 100, border: "1px solid #1A3D2A", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#5A8B6A", marginBottom: 40 }}>
                  Discovery Estratégico · 2025
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: "#E8F0EC",
                maxWidth: 800,
                marginBottom: 32
              }}>
                Hacer visible cómo opera
                <br />
                <span style={{ color: "#00D67E" }}>hoy</span> el sistema
              </h1>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p style={{
                fontSize: 18, lineHeight: 1.7, color: "#7A9B8A", maxWidth: 580, marginBottom: 48
              }}>
                Este Discovery no evalúa personas ni decisiones pasadas.
                Hace visible cómo opera hoy el sistema y qué capacidades
                necesita para el futuro.
              </p>
            </FadeIn>

            <FadeIn delay={0.7}>
              <p style={{ fontSize: 14, color: "#4A7B5A", lineHeight: 1.8, maxWidth: 540, marginBottom: 48 }}>
                Recoge miradas de distintas áreas y momentos de la organización,
                incluyendo referentes que hoy ya no están en funciones activas —
                para asegurar una visión amplia, honesta y no circunstancial.
              </p>
            </FadeIn>

            <FadeIn delay={0.9}>
              <div className="home-buttons" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button onClick={() => setSection("organigrama")} style={{
                  padding: "14px 32px", borderRadius: 12, border: "none",
                  background: "linear-gradient(135deg, #00D67E, #00A86B)", color: "#050F0A",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.3s", letterSpacing: 0.5
                }}>
                  Explorar el Discovery →
                </button>
                <button onClick={() => setSection("quickwins")} style={{
                  padding: "14px 32px", borderRadius: 12,
                  border: "1px solid #1A3D2A", background: "transparent", color: "#7A9B8A",
                  fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.3s"
                }}>
                  Ver Quick Wins
                </button>
                <button onClick={() => setSection("transversales")} style={{
                  padding: "14px 32px", borderRadius: 12,
                  border: "1px solid #8B5CF633", background: "#8B5CF608", color: "#8B5CF6",
                  fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.3s"
                }}>
                  Capacidades Transversales
                </button>
              </div>
            </FadeIn>

            {/* Stats ribbon */}
            <FadeIn delay={1.1}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 60, paddingTop: 32, borderTop: "1px solid #1A3D2A" }}>
                {[
                  { n: "5", label: "Áreas escuchadas" },
                  { n: "163K", label: "Contactos/mes en AC" },
                  { n: "90%", label: "Siniestros por teléfono" },
                  { n: "48%", label: "Clientes ya digitales" }
                ].map((s, i) => (
                  <div key={i} style={{ minWidth: 120 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: "#00D67E" }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: "#5A8B6A", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        )}

        {/* ═══════════════ ORGANIGRAMA ═══════════════ */}
        {section === "organigrama" && (
          <div style={{ paddingTop: 20, paddingBottom: 80 }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, marginBottom: 12 }}>
                  Discovery por Área
                </h2>
                <p style={{ color: "#5A8B6A", fontSize: 15 }}>Cada área contó su realidad. Seleccioná una para explorar.</p>
              </div>
            </FadeIn>

            {/* Top node */}
            <FadeIn delay={0.2}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                <div className={`org-node ${activeArea === "direccion" ? "selected" : ""}`}
                  style={{ "--node-color": AREAS[0].color, "--node-shadow": AREAS[0].color + "25", maxWidth: 360, textAlign: "center" }}
                  onClick={() => { setActiveArea(activeArea === "direccion" ? null : "direccion"); setActiveTab("escuchamos"); }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{AREAS[0].icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#E8F0EC" }}>{AREAS[0].name}</div>
                  <div style={{ fontSize: 11, color: "#5A8B6A", marginTop: 6 }}>Visión estratégica del Discovery</div>
                </div>
              </div>
            </FadeIn>

            {/* Connector line */}
            <FadeIn delay={0.3}>
              <div style={{ display: "flex", justifyContent: "center", height: 40 }}>
                <div style={{ width: 1, height: "100%", background: "linear-gradient(to bottom, #00D67E44, #1A3D2A)" }} />
              </div>
            </FadeIn>

            {/* Horizontal connector */}
            <FadeIn delay={0.35}>
              <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <div className="line-h" />
              </div>
            </FadeIn>

            {/* Area nodes grid — className for responsive */}
            <div className="areas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginTop: 8, maxWidth: 1100, margin: "8px auto 0" }}>
              {AREAS.slice(1).map((a, i) => (
                <FadeIn key={a.id} delay={0.4 + i * 0.1}>
                  <div style={{ display: "flex", justifyContent: "center", height: 24 }}>
                    <div style={{ width: 1, height: "100%", background: "#1A3D2A" }} />
                  </div>
                  <div className={`org-node ${activeArea === a.id ? "selected" : ""}`}
                    style={{ "--node-color": a.color, "--node-shadow": a.color + "25", textAlign: "center" }}
                    onClick={() => { setActiveArea(activeArea === a.id ? null : a.id); setActiveTab("escuchamos"); }}>
                    <div style={{ fontSize: 24, marginBottom: 8, color: a.color }}>{a.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#E8F0EC", lineHeight: 1.3 }}>{a.name}</div>
                    <div style={{ fontSize: 10, color: "#5A8B6A", marginTop: 6, lineHeight: 1.3 }}>Aportes recogidos durante el Discovery</div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* ── Detail Panel ── */}
            {area && (
              <div style={{
                marginTop: 48,
                border: "1px solid " + area.color + "33",
                borderRadius: 20,
                background: "linear-gradient(135deg, #0A1F14 0%, #0D2A1A 100%)",
                overflow: "hidden"
              }}>
                <div className="panel-header" style={{
                  padding: "28px 36px", display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderBottom: "1px solid #1A3D2A",
                  background: `linear-gradient(135deg, ${area.color}08, transparent)`
                }}>
                  <div>
                    <div style={{ fontSize: 12, color: area.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
                      {area.icon} {area.name}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>
                      Síntesis del Discovery para el área
                    </div>
                  </div>
                  <div onClick={() => setActiveArea(null)} style={{
                    width: 36, height: 36, borderRadius: 10, border: "1px solid #1A3D2A",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "#5A8B6A", fontSize: 18
                  }}>×</div>
                </div>

                <div className="panel-tabs" style={{ padding: "20px 36px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    { id: "escuchamos", label: "Qué escuchamos" },
                    { id: "observamos", label: "Qué observamos" },
                    { id: "oportunidades", label: "Qué oportunidades aparecen" },
                    { id: "docs", label: "Material de respaldo" }
                  ].map(tab => (
                    <div key={tab.id} className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                      onClick={() => setActiveTab(tab.id)}>
                      {tab.label}
                    </div>
                  ))}
                </div>

                <div className="panel-body" style={{ padding: "28px 36px 36px" }}>
                  {activeTab === "escuchamos" && (
                    <div>
                      <p style={{ fontSize: 13, color: "#5A8B6A", marginBottom: 20 }}>
                        Preguntas guía del Discovery — formuladas para entender, no para juzgar.
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {area.questions.map((q, i) => (
                          <div key={i} style={{
                            padding: "20px 24px", borderRadius: 12, border: "1px solid #1A3D2A",
                            background: "#050F0A", position: "relative", paddingLeft: 40
                          }}>
                            <div style={{
                              position: "absolute", left: 16, top: 22, width: 12, height: 12,
                              borderRadius: "50%", border: `2px solid ${area.color}`, opacity: 0.5
                            }} />
                            <span style={{
                              fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
                              fontStyle: "italic", color: "#B0D4C0", lineHeight: 1.5
                            }}>
                              "{q}"
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "observamos" && (
                    <div>
                      <p style={{ fontSize: 13, color: "#5A8B6A", marginBottom: 20 }}>
                        Patrones y hallazgos que emergen del Discovery — sin juicio, con contexto.
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {area.findings.map((f, i) => (
                          <div key={i} style={{
                            padding: "20px 24px", borderRadius: 12, border: "1px solid #1A3D2A",
                            background: "#050F0A", display: "flex", gap: 16, alignItems: "flex-start"
                          }}>
                            <div style={{
                              minWidth: 28, height: 28, borderRadius: 8,
                              background: area.color + "18", color: area.color,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 13, fontWeight: 700, marginTop: 2
                            }}>{i + 1}</div>
                            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#B0D4C0" }}>{f}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "oportunidades" && (
                    <div>
                      <p style={{ fontSize: 13, color: "#5A8B6A", marginBottom: 20 }}>
                        Capacidades que se vuelven necesarias — evolución, no revolución.
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {area.opportunities.map((o, i) => (
                          <div key={i} style={{
                            padding: "18px 24px", borderRadius: 12,
                            border: "1px solid " + area.color + "22",
                            background: area.color + "08",
                            display: "flex", gap: 14, alignItems: "center"
                          }}>
                            <div style={{ color: area.color, fontSize: 16 }}>→</div>
                            <p style={{ fontSize: 15, color: "#E8F0EC", lineHeight: 1.5 }}>{o}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "docs" && (
                    <div>
                      <p style={{ fontSize: 13, color: "#5A8B6A", marginBottom: 20 }}>
                        Documentación de respaldo — profundidad disponible, sin obligación de lectura.
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {area.docs.map((d, i) => (
                          <div key={i} className="doc-btn">
                            <span style={{ fontSize: 18 }}>📄</span>
                            <span>{d}</span>
                            <span style={{ marginLeft: "auto", fontSize: 11, opacity: 0.5 }}>PDF</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════ QUICK WINS ═══════════════ */}
        {section === "quickwins" && (
          <div style={{ paddingTop: 20, paddingBottom: 80 }}>
            <FadeIn>
              <div style={{ marginBottom: 48 }}>
                <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 100, border: "1px solid #F59E0B33", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#F59E0B", marginBottom: 16 }}>
                  Impacto inmediato
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, marginBottom: 12 }}>
                  Quick Wins · 0-9 meses
                </h2>
                <p style={{ color: "#5A8B6A", fontSize: 15, maxWidth: 540 }}>
                  Acciones concretas, inversión acotada, resultados visibles en semanas.
                  Cada una resuelve un dolor que apareció en múltiples áreas del Discovery.
                </p>
              </div>
            </FadeIn>

            <div className="qw-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {QUICK_WINS.map((qw, i) => (
                <FadeIn key={i} delay={0.2 + i * 0.15}>
                  <div className="qw-card">
                    <div style={{ fontSize: 32, marginBottom: 16 }}>{qw.icon}</div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: "#E8F0EC" }}>{qw.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: "#7A9B8A", marginBottom: 16 }}>{qw.desc}</p>
                    <div style={{
                      display: "inline-block", padding: "6px 14px", borderRadius: 8,
                      background: "#00D67E12", border: "1px solid #00D67E22",
                      fontSize: 12, color: "#00D67E", fontWeight: 500
                    }}>{qw.time}</div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.8}>
              <div style={{ marginTop: 64, padding: "40px 36px", borderRadius: 20, border: "1px solid #1A3D2A", background: "linear-gradient(135deg, #0A1F14, #0D2A1A)" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, marginBottom: 24 }}>
                  Tres frentes de evolución · 6-36 meses
                </h3>
                <div className="frentes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                  {[
                    { title: "Habilitación Comercial", pct: "30-35%", impact: "↑ 20-30% revenue Otros Riesgos", color: "#F59E0B" },
                    { title: "Experiencia del Cliente", pct: "35-40%", impact: "↓ 50K+ contactos evitables/mes", color: "#3B82F6" },
                    { title: "Modernización Arquitectónica", pct: "25-30%", impact: "Habilita velocidad y sostenibilidad", color: "#8B5CF6" }
                  ].map((f, i) => (
                    <div key={i} style={{ padding: 24, borderRadius: 14, border: `1px solid ${f.color}22`, background: `${f.color}08` }}>
                      <div style={{ fontSize: 11, color: f.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Frente {i + 1}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "#E8F0EC", marginBottom: 12 }}>{f.title}</div>
                      <div style={{ fontSize: 13, color: "#7A9B8A", marginBottom: 8 }}>{f.pct} del presupuesto</div>
                      <div style={{ fontSize: 13, color: f.color, fontWeight: 500 }}>{f.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        )}

        {/* ═══════════════ CAPACIDADES TRANSVERSALES ═══════════════ */}
        {section === "transversales" && (
          <div style={{ paddingTop: 20, paddingBottom: 80 }}>
            <FadeIn>
              <div style={{ marginBottom: 48 }}>
                <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 100, border: "1px solid #8B5CF633", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#8B5CF6", marginBottom: 16 }}>
                  Visión sistémica
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, marginBottom: 16 }}>
                  Capacidades que el Discovery
                  <br />hizo <span style={{ color: "#00D67E" }}>visibles</span>
                </h2>
                <p style={{ color: "#5A8B6A", fontSize: 15, maxWidth: 620, lineHeight: 1.7 }}>
                  Más allá de los dolores específicos por área, el Discovery hizo visibles un conjunto
                  de capacidades transversales que hoy no están plenamente habilitadas y que condicionan
                  la experiencia del cliente, la eficiencia operativa y la capacidad de escalar.
                </p>
              </div>
            </FadeIn>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                {
                  icon: "◎", title: "CRM Corporativo · Vista 360°", color: "#3B82F6",
                  where: "Surgió en Estrategia & Marketing, Proyectos & Innovación, Operación & IT",
                  what: "Hoy no existe una vista unificada del cliente. Cada área ve un fragmento: pólizas, siniestros, pagos, contactos. Wise opera como sistema de ticketing, no como CRM. La consecuencia es que nadie tiene el panorama completo para tomar decisiones ni para personalizar la experiencia.",
                  enables: "Visión integral del cliente, campañas basadas en datos reales, reducción de reprocesos por falta de contexto."
                },
                {
                  icon: "◈", title: "Experiencia Omnicanal", color: "#00D67E",
                  where: "Surgió en Estrategia & Marketing, Comercial, Operación & IT",
                  what: "Los canales existen — web, app, teléfono, email, WhatsApp — pero no conversan entre sí. El cliente que cotiza en la web y llama para preguntar empieza de cero. El PAS no tiene continuidad entre lo que hace online y lo que gestiona por teléfono. No es falta de canales: es falta de integración.",
                  enables: "Continuidad real entre canales, reducción de fricción, experiencia comparable a plataformas digitales modernas."
                },
                {
                  icon: "◇", title: "Motor de Notificaciones y Estados", color: "#F59E0B",
                  where: "Surgió en Estrategia & Marketing, Operación & IT, Comercial",
                  what: "El cliente hoy no sabe en qué estado está su siniestro, su pago o su trámite, salvo que llame. Eso contribuye significativamente al volumen de contactos en Atención al Cliente (163.000/mes). No hay push notifications, no hay seguimiento visible, no hay proactividad informativa.",
                  enables: "Reducción significativa de contactos evitables, experiencia de transparencia, confianza del cliente y del PAS."
                },
                {
                  icon: "✦", title: "Gobierno de Datos", color: "#EC4899",
                  where: "Surgió en todas las áreas del Discovery",
                  what: "Datos dispersos entre sistemas que no comparten un modelo común. Métricas parciales que dependen de consolidación manual. Decisiones que se toman con información incompleta o desactualizada. No es un problema de volumen de datos: es de estructura y accesibilidad.",
                  enables: "KPIs compartidos, trazabilidad real, soporte confiable a decisiones de negocio, base para cualquier iniciativa de automatización."
                },
                {
                  icon: "⚙", title: "Automatización Inteligente", color: "#8B5CF6",
                  where: "Surgió en Proyectos & Innovación, Técnica & Reaseguros, Operación & IT",
                  what: "Ya hay avances reales: 14 bots RPA operativos y Qlik funcionando. Pero escalan hasta donde el core lo permite. La IA no es un punto de partida: es una consecuencia natural de tener datos limpios, procesos trazables y canales integrados. Primero las bases, después la inteligencia.",
                  enables: "Escalar lo que ya funciona, automatizar siniestros simples, liberar tiempo técnico de gestión operativa para análisis estratégico."
                }
              ].map((cap, i) => (
                <FadeIn key={i} delay={0.15 + i * 0.12}>
                  <div style={{
                    border: `1px solid ${cap.color}22`, borderRadius: 20,
                    background: "linear-gradient(135deg, #0A1F14 0%, #0D2A1A 100%)", overflow: "hidden"
                  }}>
                    <div className="cap-card-header" style={{
                      padding: "24px 32px", display: "flex", alignItems: "center", gap: 16,
                      borderBottom: `1px solid ${cap.color}15`,
                      background: `linear-gradient(135deg, ${cap.color}06, transparent)`
                    }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: cap.color + "15", color: cap.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 20, flexShrink: 0
                      }}>{cap.icon}</div>
                      <div>
                        <div style={{ fontSize: 17, fontWeight: 600, color: "#E8F0EC" }}>{cap.title}</div>
                        <div style={{ fontSize: 11, color: "#5A8B6A", marginTop: 3 }}>{cap.where}</div>
                      </div>
                    </div>
                    <div className="cap-card-body" style={{ padding: "24px 32px" }}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 11, color: cap.color, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>
                          Qué observamos
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#B0D4C0" }}>{cap.what}</p>
                      </div>
                      <div style={{
                        padding: "16px 20px", borderRadius: 12,
                        background: cap.color + "08", border: `1px solid ${cap.color}18`
                      }}>
                        <div style={{ fontSize: 11, color: cap.color, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>
                          Qué habilita
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.6, color: "#E8F0EC" }}>{cap.enables}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={1.0}>
              <div style={{
                marginTop: 48, padding: "28px 36px", borderRadius: 16,
                border: "1px solid #1A3D2A",
                background: "linear-gradient(135deg, #0A1F14, #0D2A1A)",
                textAlign: "center"
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 20, fontWeight: 600, color: "#E8F0EC", lineHeight: 1.5
                }}>
                  Estas cinco capacidades no pertenecen a un área.
                  <br />
                  <span style={{ color: "#00D67E" }}>Son la infraestructura invisible que conecta toda la transformación.</span>
                </p>
                <p style={{ fontSize: 13, color: "#5A8B6A", marginTop: 12 }}>
                  Sin ellas, cada iniciativa resuelve un síntoma. Con ellas, el sistema evoluciona.
                </p>
              </div>
            </FadeIn>
          </div>
        )}

        {/* ═══════════════ VISION ═══════════════ */}
        {section === "vision" && (
          <div style={{ paddingTop: 20, paddingBottom: 80 }}>
            <FadeIn>
              <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 100, border: "1px solid #EF444433", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#EF4444", marginBottom: 32, alignSelf: "flex-start" }}>
                  La decisión
                </div>

                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 600, lineHeight: 1.2, marginBottom: 48, maxWidth: 700
                }}>
                  El costo de no actuar es claro
                  <br />y <span style={{ color: "#00D67E" }}>cuantificable</span>.
                </h2>

                <div className="vision-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 800 }}>
                  <div style={{ padding: 32, borderRadius: 16, border: "1px solid #EF444422", background: "#EF444408" }}>
                    <div style={{ fontSize: 12, color: "#EF4444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                      Si no actuamos
                    </div>
                    {["Oportunidades de negocio que se cierran en otra compañía", "Costos operativos crecientes por gestión manual", "Brecha competitiva que se amplía cada trimestre", "Portfolio concentrado = exposición al riesgo"].map((item, i) => (
                      <p key={i} style={{ fontSize: 14, color: "#B0D4C0", lineHeight: 1.6, marginBottom: 10, paddingLeft: 16, borderLeft: "2px solid #EF444433" }}>{item}</p>
                    ))}
                  </div>
                  <div style={{ padding: 32, borderRadius: 16, border: "1px solid #00D67E22", background: "#00D67E08" }}>
                    <div style={{ fontSize: 12, color: "#00D67E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                      Si actuamos ahora
                    </div>
                    {["+20-30% revenue en Otros Riesgos", "-50.000 contactos evitables por mes", "Portfolio diversificado y rentable", "Plataforma preparada para el futuro"].map((item, i) => (
                      <p key={i} style={{ fontSize: 14, color: "#B0D4C0", lineHeight: 1.6, marginBottom: 10, paddingLeft: 16, borderLeft: "2px solid #00D67E33" }}>{item}</p>
                    ))}
                  </div>
                </div>

                <FadeIn delay={0.5}>
                  <div style={{
                    marginTop: 64, padding: "32px 40px", borderRadius: 16,
                    background: "linear-gradient(135deg, #00D67E15, #00D67E08)",
                    border: "1px solid #00D67E22", textAlign: "center"
                  }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: "#E8F0EC"
                    }}>
                      El momento es ahora. La decisión es estratégica.
                    </p>
                    <p style={{ fontSize: 14, color: "#5A8B6A", marginTop: 12 }}>
                      ROI consolidado estimado: 18-24 meses · Primeros resultados visibles en 90 días
                    </p>
                  </div>
                </FadeIn>
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </div>
  );
}
