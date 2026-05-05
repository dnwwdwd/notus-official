import { useState, useEffect } from 'react';
import { NotusLogo, useTypewriter, MiniNotus } from './shared';
import { useMediaQuery, usePlatform } from './hooks';
import { DOWNLOADS } from './downloads';

const C = {
  bg: '#1C1917',
  bg2: '#211E1C',
  bg3: '#2E2A27',
  line: '#3D3835',
  lineSub: '#332F2C',
  text: '#EDE8E3',
  text2: '#A69E95',
  text3: '#7A7269',
  accent: '#D4896E',
  accentDeep: '#C15F3C',
};

const scrollTo = (id) => (e) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Section = ({ children, style, id }) => (
  <section id={id} className="section" style={{ maxWidth: 1280, margin: '0 auto', scrollMarginTop: 80, ...style }}>
    {children}
  </section>
);

const MacWindow = ({ children, height = 420 }) => (
  <div style={{
    borderRadius: 12, overflow: 'hidden',
    border: '1px solid #D0CCC7',
    background: '#FAF9F6',
    boxShadow: '0 40px 80px rgba(0,0,0,0.32), 0 0 0 1px rgba(212,137,110,0.06)',
  }}>
    <div style={{ height: 30, background: '#F0EDE8', borderBottom: '1px solid #E0DCD7',
      display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
      <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }}/>
      <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }}/>
      <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }}/>
    </div>
    <div style={{ height, background: '#FAF9F6' }}>{children}</div>
  </div>
);

const HeroDemo = () => {
  const SCRIPT = [
    { type: 'idle',    ms: 800,  block2: '第一种是互斥锁，简单可靠。' },
    { type: 'prompt',  ms: 1800, block2: '第一种是互斥锁，简单可靠。',
      prompt: '@b2 扩写第二段，参考我的风格' },
    { type: 'thinking', ms: 1500, block2: '第一种是互斥锁，简单可靠。',
      prompt: '@b2 扩写第二段，参考我的风格' },
    { type: 'diff',    ms: 3500, block2: '第一种是互斥锁，简单可靠。',
      prompt: '@b2 扩写第二段，参考我的风格' },
    { type: 'applied', ms: 2400,
      block2: '第一种是互斥锁。当缓存失效时，只允许第一个请求查询数据库并回写缓存，其他请求等待或快速失败。',
      prompt: '@b2 扩写第二段，参考我的风格' },
  ];

  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setStep((step + 1) % SCRIPT.length), SCRIPT[step].ms);
    return () => clearTimeout(t);
  }, [step]);
  const s = SCRIPT[step];

  const promptDisplayed = useTypewriter(
    s.type === 'prompt' || s.type === 'thinking' || s.type === 'diff' || s.type === 'applied'
      ? s.prompt || '' : '',
    28, 0, [step]
  );

  const block2Style = {
    fontSize: 14, lineHeight: 1.7, padding: '10px 14px', borderRadius: 6,
    borderLeft: `3px solid ${
      s.type === 'thinking' ? C.accent :
      s.type === 'diff' || s.type === 'applied' ? '#D4896E' : 'transparent'
    }`,
    background: s.type === 'diff' || s.type === 'applied' ? '#FFF3E0' : 'transparent',
    transition: 'all 280ms ease',
    animation: s.type === 'thinking' ? 'pulseLeft 1.2s ease infinite' : 'none',
    color: '#1A1311', fontFamily: 'var(--font-editor)',
  };

  return (
    <div className="hero-demo" style={{
      background: '#FAF9F6', border: '1px solid #D0CCC7', borderRadius: 12,
      boxShadow: '0 30px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(212,137,110,0.08)',
      overflow: 'hidden',
    }}>
      {/* Canvas side */}
      <div style={{ padding: '20px 24px 24px', borderRight: '1px solid #E0DCD7' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
          paddingBottom: 12, borderBottom: '1px solid #E0DCD7' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }}/>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }}/>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }}/>
          </div>
          <div style={{ fontSize: 12, color: '#9C9489', fontFamily: 'var(--font-mono)' }}>
            缓存击穿三种解法.md
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{ fontSize: 10, color: '#9C9489', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent,
              animation: 'pulse 1.5s infinite' }}/>
            AI 创作中
          </div>
        </div>

        <div style={{ fontFamily: 'var(--font-editor)', fontSize: 24, fontWeight: 700,
          color: '#1A1311', marginBottom: 18 }}>
          缓存击穿三种解法
        </div>

        <div style={{ ...block2Style, color: '#6B6158', marginBottom: 6, borderLeft: '3px solid transparent', background: 'transparent' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9C9489', marginRight: 8 }}>b1</span>
          缓存击穿是指热点 key 在某一刻失效，大量请求同时穿透到数据库。
        </div>

        <div style={block2Style}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9C9489', marginRight: 8 }}>b2</span>
          {(s.type === 'diff' || s.type === 'applied') && (
            <span style={{
              background: '#FFE69C', color: '#9B7020', padding: '1px 6px',
              borderRadius: 3, fontSize: 9, fontWeight: 600, marginRight: 8,
            }}>已修改</span>
          )}
          {s.block2}
        </div>

        <div style={{ ...block2Style, color: '#6B6158', marginTop: 6, borderLeft: '3px solid transparent', background: 'transparent' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9C9489', marginRight: 8 }}>b3</span>
          第二种是逻辑过期……
        </div>
      </div>

      {/* AI panel side */}
      <div style={{ padding: '20px 22px', background: '#F0EDE8',
        display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NotusLogo size={16} color={C.accent}/>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1311' }}>AI 协作</span>
          <div style={{ flex: 1 }}/>
          <span style={{ fontSize: 10, color: '#9C9489' }}>风格：自动匹配</span>
        </div>

        <div style={{ flex: 1, fontSize: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12,
            opacity: promptDisplayed ? 1 : 0, transition: 'opacity 200ms' }}>
            <div style={{ background: '#FFFDF7', border: '1px solid #E0DCD7', borderRadius: 8,
              padding: '8px 12px', fontSize: 11.5, maxWidth: '85%', color: '#1A1311' }}>
              {promptDisplayed}
              {s.type === 'prompt' && (
                <span style={{ display: 'inline-block', width: 1.5, height: 12,
                  background: C.accent, marginLeft: 2, animation: 'blink 1s step-end infinite' }}/>
              )}
            </div>
          </div>

          {(s.type === 'thinking' || s.type === 'diff' || s.type === 'applied') && (
            <>
              <div style={{ fontSize: 10, color: '#6B6158', marginBottom: 6,
                display: 'flex', gap: 6, alignItems: 'center' }}>
                <span>✨</span>Notus
              </div>
              <div style={{ fontSize: 11, color: '#6B6158', marginBottom: 10, lineHeight: 1.6 }}>
                {s.type === 'thinking' ? (
                  <>正在检索风格样本
                    <span style={{ animation: 'blink 1s step-end infinite' }}>…</span>
                  </>
                ) : s.type === 'diff' ? (
                  <>已检索 3 篇风格样本，提议如下修改：</>
                ) : (
                  <span style={{ color: '#1E8E3E' }}>✓ 已应用到 b2，源文件同步更新。</span>
                )}
              </div>

              {s.type === 'diff' && (
                <div style={{
                  background: '#FFFDF7',
                  border: '1px solid rgba(212,137,110,0.35)',
                  borderRadius: 8, padding: 12,
                  animation: 'slideIn 250ms ease',
                }}>
                  <div style={{ fontSize: 10, marginBottom: 8, display: 'flex',
                    gap: 6, alignItems: 'center', color: '#1A1311' }}>
                    🤖 <span style={{ fontWeight: 500 }}>操作预览</span>
                    <span style={{ background: '#FBEEE8', color: C.accent,
                      padding: '1px 6px', borderRadius: 8, fontSize: 9 }}>块 #b2</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, lineHeight: 1.55 }}>
                    <div style={{ background: '#FFE2E0', color: '#D93025',
                      padding: '3px 8px', borderRadius: 3, marginBottom: 3,
                      textDecoration: 'line-through' }}>
                      − 第一种是互斥锁，简单可靠。
                    </div>
                    <div style={{ background: '#DAFBE1', color: '#1E8E3E',
                      padding: '3px 8px', borderRadius: 3 }}>
                      + 第一种是互斥锁。当缓存失效时，只允许…
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 10, justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 4,
                      border: '1px solid #D8D4CB', color: '#6B6158' }}>取消</span>
                    <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 4,
                      background: C.accent, color: '#fff', fontWeight: 600 }}>应用修改</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div style={{ borderTop: '1px solid #E0DCD7', paddingTop: 10,
          display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ flex: 1, fontSize: 10, color: '#9C9489', fontFamily: 'var(--font-mono)' }}>
            @ 引用块号
          </div>
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: C.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            fontSize: 11, fontWeight: 700 }}>↑</span>
        </div>
      </div>
    </div>
  );
};

const CapStrip = () => (
  <Section id="features" style={{ marginTop: 100, paddingTop: 40, paddingBottom: 40,
    borderTop: `1px solid ${C.lineSub}`, borderBottom: `1px solid ${C.lineSub}` }}>
    <div className="cap-grid">
      {[
        { n: '块级', l: '只改你指的那段，别处一字不碰' },
        { n: '精准', l: '语义 + 关键词两路搜，换种说法也找得到' },
        { n: '私有', l: '数据全存本地，不传云、不共享' },
        { n: '风格', l: '从你旧文里学，写出来像你自己' },
      ].map((x, i) => (
        <div key={i}>
          <div style={{ fontFamily: 'var(--font-editor)', fontSize: 36, fontWeight: 700,
            color: C.accent, fontStyle: 'italic', marginBottom: 6, letterSpacing: -0.5 }}>
            {x.n}
          </div>
          <div style={{ fontSize: 13, color: C.text2, lineHeight: 1.6 }}>{x.l}</div>
        </div>
      ))}
    </div>
  </Section>
);

const FeatureRow = ({ idx, title, body, points, imgSrc, mini, reverse = false, id }) => (
  <Section id={id} style={{ marginTop: 120 }}>
    <div className={reverse ? 'feature-grid-r' : 'feature-grid'}>
      <div style={{ order: reverse ? 2 : 1 }}>
        <div style={{ fontSize: 11, color: C.accent, fontFamily: 'var(--font-mono)',
          letterSpacing: 2, marginBottom: 14, textTransform: 'uppercase' }}>
          {String(idx).padStart(2, '0')} / {title.tag}
        </div>
        <h2 className="feature-h2" style={{ fontFamily: 'var(--font-editor)', fontSize: 44, fontWeight: 700,
          color: C.text, lineHeight: 1.15, margin: 0, letterSpacing: -1 }}>
          {title.main}
          <br/>
          <span style={{ color: C.accent, fontStyle: 'italic', fontWeight: 500 }}>{title.accent}</span>
        </h2>
        <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.7,
          marginTop: 24, marginBottom: 24, maxWidth: 480 }}>{body}</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex',
          flexDirection: 'column', gap: 12 }}>
          {points.map((p, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, fontSize: 14, color: C.text }}>
              <span style={{ color: C.accent, fontFamily: 'var(--font-mono)', fontSize: 12,
                marginTop: 3 }}>→</span>
              <span><b style={{ fontWeight: 600 }}>{p.k}</b><span style={{ color: C.text2 }}>　{p.v}</span></span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ order: reverse ? 1 : 2 }}>
        <MacWindow>
          {imgSrc ? (
            <img src={imgSrc} alt={title.main}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
          ) : mini}
        </MacWindow>
      </div>
    </div>
  </Section>
);

const FlowSection = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Section id="workflow" style={{ marginTop: 140 }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{ fontSize: 11, color: C.accent, fontFamily: 'var(--font-mono)',
          letterSpacing: 2, marginBottom: 14, textTransform: 'uppercase' }}>
          04 / WORKFLOW
        </div>
        <h2 className="feature-h2" style={{ fontFamily: 'var(--font-editor)', fontSize: 44, fontWeight: 700,
          color: C.text, lineHeight: 1.15, margin: 0, letterSpacing: -1, maxWidth: 720, marginInline: 'auto' }}>
          四步，
          <span style={{ color: C.accent, fontStyle: 'italic', fontWeight: 500 }}>从素材到成文</span>
        </h2>
      </div>
      <div className="flow-grid">
        {[
          { n: '01', t: '导入', d: '拖进来就行。文件夹、ZIP 都行，索引自动在本地建好。' },
          { n: '02', t: '检索', d: '问它问题，它只从你的笔记里找答案。没有就说没有。' },
          { n: '03', t: '协作', d: '选段落、下指令、看 diff、确认。四步改完一段。' },
          { n: '04', t: '落盘', d: '改动立刻存到本地 .md 文件。你的文件就是唯一真相。' },
        ].map((x, i, a) => (
          <div key={i} style={{
            padding: isMobile ? '20px 0' : '0 24px',
            borderRight: !isMobile && i < a.length - 1 ? `1px solid ${C.lineSub}` : 'none',
            borderBottom: isMobile && i < a.length - 1 ? `1px solid ${C.lineSub}` : 'none',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C.text3,
              letterSpacing: 2, marginBottom: 16 }}>{x.n}</div>
            <div style={{ fontFamily: 'var(--font-editor)', fontSize: 24, fontWeight: 700,
              color: C.text, marginBottom: 10 }}>{x.t}</div>
            <div style={{ fontSize: 13, color: C.text2, lineHeight: 1.7 }}>{x.d}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const DownloadSection = () => {
  const platform = usePlatform();
  const primary = platform === 'windows' ? DOWNLOADS.windows : DOWNLOADS.mac;
  const secondary = platform === 'windows' ? DOWNLOADS.mac : DOWNLOADS.windows;

  return (
    <Section id="download" style={{ marginTop: 160 }}>
      <div className="download-card" style={{
        background: `radial-gradient(ellipse at top right, rgba(212,137,110,0.12), transparent 60%), ${C.bg2}`,
        border: `1px solid ${C.line}`, borderRadius: 16,
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      }}>
        <div>
          <div style={{ fontSize: 11, color: C.accent, fontFamily: 'var(--font-mono)',
            letterSpacing: 2, marginBottom: 14, textTransform: 'uppercase' }}>
            05 / DOWNLOAD
          </div>
          <h2 className="feature-h2" style={{ fontFamily: 'var(--font-editor)', fontSize: 40, fontWeight: 700,
            color: C.text, lineHeight: 1.2, margin: '0 0 20px', letterSpacing: -0.5 }}>
            下载即用，<br/>
            <span style={{ color: C.accent, fontStyle: 'italic', fontWeight: 500 }}>数据留在你的硬盘。</span>
          </h2>
          <p style={{ fontSize: 15, color: C.text2, lineHeight: 1.7, margin: '0 0 32px', maxWidth: 520 }}>
            笔记、索引、API Key 全在本机。没有账号、没有云同步、没有后门。
          </p>
          <div className="download-buttons" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={primary.url} style={{
              background: C.accent, color: '#1A1311', padding: '14px 24px',
              borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span>↓</span> 下载 {primary.label}
              <span style={{ fontSize: 11, opacity: 0.7 }}>({primary.size})</span>
            </a>
            <a href={secondary.url} style={{
              border: `1px solid ${C.line}`, color: C.text, padding: '14px 24px',
              borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span>↓</span> {secondary.label}
              <span style={{ fontSize: 11, opacity: 0.6 }}>({secondary.size})</span>
            </a>
          </div>
          <p style={{ fontSize: 12, color: C.text3, marginTop: 20, margin: '20px 0 0' }}>
            当前支持 macOS (Apple Silicon) 和 Windows。
          </p>
        </div>
      </div>
    </Section>
  );
};

const TopNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const platform = usePlatform();
  const primaryDownload = platform === 'windows' ? DOWNLOADS.windows : DOWNLOADS.mac;

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(28,25,23,0.88)', backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${C.lineSub}`,
    }}>
      <Section style={{ display: 'flex', alignItems: 'center', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <NotusLogo size={24} color={C.accent}/>
          <span style={{ fontFamily: 'var(--font-editor)', fontSize: 20, fontWeight: 700,
            color: C.text, letterSpacing: -0.3 }}>Notus</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C.text3,
            border: `1px solid ${C.lineSub}`, padding: '2px 6px', borderRadius: 3,
            marginLeft: 6 }}>v1.0</span>
        </div>

        {!isMobile && (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 32 }}>
            {[
              { label: '特性', target: 'features' },
              { label: '工作流', target: 'workflow' },
              { label: '下载', target: 'download' },
            ].map(({ label, target }) => (
              <a key={label} href={`#${target}`} onClick={scrollTo(target)}
                style={{ fontSize: 13, color: C.text2, textDecoration: 'none', cursor: 'pointer' }}>
                {label}
              </a>
            ))}
          </div>
        )}

        <div style={{ flex: isMobile ? 1 : 'none', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          {!isMobile && (
            <a href="https://github.com/dnwwdwd/Notus" style={{
              fontSize: 13, color: C.text2, textDecoration: 'none', padding: '8px 14px' }}>
              GitHub
            </a>
          )}
          <a className="btn-accent" href={primaryDownload.url} style={{
            background: C.accent, color: '#1A1311', padding: '8px 16px',
            borderRadius: 5, fontSize: 13, fontWeight: 600, textDecoration: 'none',
          }}>下载</a>

          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: 'none', border: 'none', color: C.text, fontSize: 20,
              cursor: 'pointer', padding: '4px 8px',
            }}>
              {menuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>
      </Section>

      {isMobile && menuOpen && (
        <div style={{
          background: 'rgba(28,25,23,0.96)', backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${C.lineSub}`, padding: '16px 20px',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {[
            { label: '特性', target: 'features' },
            { label: '工作流', target: 'workflow' },
            { label: '下载', target: 'download' },
          ].map(({ label, target }) => (
            <a key={label} href={`#${target}`} onClick={(e) => { scrollTo(target)(e); setMenuOpen(false); }}
              style={{ fontSize: 15, color: C.text2, textDecoration: 'none' }}>
              {label}
            </a>
          ))}
          <a href="https://github.com/dnwwdwd/Notus" style={{
            fontSize: 15, color: C.text2, textDecoration: 'none' }}>
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer style={{ marginTop: 140, borderTop: `1px solid ${C.lineSub}`,
    padding: '56px 0 64px' }}>
    <Section>
      <div className="footer-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <NotusLogo size={28} color={C.accent}/>
            <span style={{ fontFamily: 'var(--font-editor)', fontSize: 22, fontWeight: 700, color: C.text }}>
              Notus
            </span>
          </div>
          <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: 320, margin: 0 }}>
            本地知识库 + AI 写作工具。<br/>
            你的笔记，你的风格，你的硬盘。
          </p>
        </div>
        {[
          { h: '产品', items: [
            { l: 'GitHub', href: 'https://github.com/dnwwdwd/Notus' },
            { l: '下载', href: '#download' },
            { l: '更新日志', href: '?page=changelog' },
          ]},
          { h: '作者', items: [
            { l: 'GitHub 主页', href: 'https://github.com/dnwwdwd' },
            { l: 'X / Twitter', href: 'https://x.com/C1ownhjj' },
          ]},
        ].map((col, i) => (
          <div key={i}>
            <div style={{ fontSize: 11, color: C.text3, fontFamily: 'var(--font-mono)',
              letterSpacing: 1.5, marginBottom: 14, textTransform: 'uppercase' }}>
              {col.h}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex',
              flexDirection: 'column', gap: 10 }}>
              {col.items.map((it, j) => (
                <li key={j}>
                  <a href={it.href} style={{ fontSize: 13, color: C.text,
                    textDecoration: 'none', borderBottom: '1px solid transparent' }}>
                    {it.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom" style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.lineSub}`,
        display: 'flex', justifyContent: 'space-between', fontSize: 11,
        color: C.text3, fontFamily: 'var(--font-mono)' }}>
        <span>© 2026 NOTUS · APACHE 2.0 LICENSED</span>
        <span>OPEN SOURCE · LOCAL FIRST</span>
      </div>
    </Section>
  </footer>
);

const SiteV1 = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmall = useMediaQuery('(max-width: 600px)');
  const platform = usePlatform();
  const primaryDownload = platform === 'windows' ? DOWNLOADS.windows : DOWNLOADS.mac;

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-ui)',
      minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulseLeft { 0%,100%{border-left-color:${C.accent};opacity:1} 50%{opacity:0.5} }
        @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        a:hover { color: ${C.accent} !important; }
        a.btn-accent:hover { color: #1A1311 !important; }

        .section { padding: 0 56px; }
        .hero-grid { display:grid; grid-template-columns:0.85fr 1.1fr; gap:64px; align-items:center; position:relative; }
        .hero-demo { display:grid; grid-template-columns:1.55fr 1fr; }
        .cap-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:48px; }
        .feature-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:80px; align-items:center; }
        .feature-grid-r { display:grid; grid-template-columns:1.1fr 1fr; gap:80px; align-items:center; }
        .flow-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr; gap:48px; }
        .download-card { padding:64px; }

        @media (max-width:1024px) {
          .cap-grid { grid-template-columns:repeat(2,1fr); gap:32px; }
          .flow-grid { grid-template-columns:repeat(2,1fr); gap:24px; }
          .feature-grid, .feature-grid-r { gap:48px; }
        }
        @media (max-width:768px) {
          .section { padding:0 20px; }
          .hero-grid { grid-template-columns:1fr; gap:40px; }
          .hero-demo { grid-template-columns:1fr; }
          .hero-demo > div:last-child { border-top:1px solid #E0DCD7; }
          .cap-grid { grid-template-columns:repeat(2,1fr); gap:24px; }
          .feature-grid, .feature-grid-r { grid-template-columns:1fr; gap:32px; }
          .feature-grid > div, .feature-grid-r > div { order:unset !important; }
          .flow-grid { grid-template-columns:1fr; gap:0; }
          .footer-grid { grid-template-columns:1fr; gap:32px; }
          .footer-bottom { flex-direction:column; gap:8px; }
          .download-card { padding:32px 20px; }
          .feature-h2 { font-size:32px !important; }
          .hero-h1 { font-size:44px !important; letter-spacing:-1.5px !important; }
        }
        @media (max-width:480px) {
          .section { padding:0 16px; }
          .cap-grid { grid-template-columns:1fr; }
          .feature-h2 { font-size:28px !important; }
          .hero-h1 { font-size:36px !important; letter-spacing:-1px !important; }
        }
      `}</style>

      <TopNav/>

      {/* HERO */}
      <Section style={{ paddingTop: isMobile ? 48 : 88, paddingBottom: isMobile ? 48 : 80, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage:
            `radial-gradient(circle at 20% 30%, ${C.accent} 0, transparent 50%),
             radial-gradient(circle at 80% 80%, ${C.accent} 0, transparent 50%)` }}/>

        <div className="hero-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(212,137,110,0.08)', border: '1px solid rgba(212,137,110,0.25)',
              padding: '6px 12px', borderRadius: 99, fontSize: 11, color: C.accent,
              fontFamily: 'var(--font-mono)', marginBottom: 28, letterSpacing: 0.5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent,
                animation: 'pulse 1.5s infinite' }}/>
              离线运行 · 数据全在你手里
            </div>
            <h1 className="hero-h1" style={{ fontFamily: 'var(--font-editor)', fontSize: 80, fontWeight: 700,
              color: C.text, lineHeight: 1.0, margin: 0, letterSpacing: -2.5 }}>
              用你写过的东西，<br/>
              <span style={{ color: C.accent, fontStyle: 'italic', fontWeight: 500 }}>喂给 AI。</span>
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 18, color: C.text2, lineHeight: 1.65,
              marginTop: 32, marginBottom: 36, maxWidth: 460 }}>
              本地知识库 + AI 写作工具。把你的笔记变成 AI 能检索的素材库，写新文章时直接调用，风格也能学。
            </p>
            <div className="hero-cta" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <a className="btn-accent" href={primaryDownload.url} style={{
                background: C.accent, color: '#1A1311', padding: '14px 24px',
                borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>↓ 下载 {primaryDownload.label}</a>
              <a href="https://github.com/dnwwdwd/Notus" style={{
                color: C.text, padding: '14px 18px', fontSize: 14, textDecoration: 'none',
              }}>GitHub →</a>
            </div>
            <div style={{ display: 'flex', gap: 28, marginTop: 48, fontSize: 12, color: C.text3,
              fontFamily: 'var(--font-mono)' }}>
              <span>★ 开源 / Apache 2.0</span>
              <span>· Markdown 原生</span>
            </div>
          </div>
          {!isSmall && <HeroDemo/>}
        </div>
      </Section>

      <CapStrip/>

      <FeatureRow
        idx={1}
        id="editor"
        title={{ tag: 'EDITOR', main: '写完就能搜，', accent: '不用额外操作。' }}
        body="保存那一刻，自动拆段建索引。你只管写。"
        points={[
          { k: '所见即所得', v: '直接改正文，不用左右对照。' },
          { k: '大纲导航', v: '标题树实时跟踪，点一下跳到任何位置。' },
          { k: '保存即索引', v: '改了就更新，不用手动同步。' },
        ]}
        imgSrc="/file.png"
        mini={<MiniNotus variant="editor" dark={true}/>}
      />

      <FeatureRow
        idx={2}
        id="knowledge"
        title={{ tag: 'KNOWLEDGE', main: '只用你的笔记回答，', accent: '没有就说没有。' }}
        body="从你的笔记里找答案，找到就给出处，没找到直接告诉你。"
        points={[
          { k: '不瞎编', v: '置信度不够就拒答，不凑数。' },
          { k: '来源可查', v: '每条回答带出处，点一下看原文。' },
          { k: '双路召回', v: '语义 + 全文，换种表述也不漏。' },
        ]}
        imgSrc="/knowledge_base.png"
        mini={<MiniNotus variant="knowledge" dark={true}/>}
        reverse
      />

      <FeatureRow
        idx={3}
        id="canvas"
        title={{ tag: 'CANVAS', main: '你说改哪段就改哪段，', accent: '确认了才动笔。' }}
        body="选中段落交给 AI，看完 diff 再决定要不要。"
        points={[
          { k: '块级改写', v: '只动选中段落，其余不碰。' },
          { k: '先看后用', v: '红删绿增一目了然，确认后才写入。' },
          { k: '学你风格', v: '自动匹配你以前的写法，越用越像你。' },
        ]}
        imgSrc="/canvas.png"
        mini={<MiniNotus variant="canvas-diff" dark={true}/>}
      />

      <FlowSection/>
      <DownloadSection/>
      <Footer/>
    </div>
  );
};

export default SiteV1;
