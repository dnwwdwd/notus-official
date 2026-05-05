// site-v1.jsx — "Atelier Dark"
// Warm dark editorial marketing page for Notus.
// Hero: large editorial type + a live AI diff demo running on a mini canvas.
// Sections: hero, capability strip, three feature blocks with macOS-windowed UI shots,
// flow diagram, download/install, footer.

// Read user-supplied image overrides from window.__v1Images (set by the host page)
const useImageSlot = (slotKey) => {
  const [src, setSrc] = React.useState(() => (window.__v1Images || {})[slotKey] || null);
  React.useEffect(() => {
    const h = (e) => {
      if (e.data?.type === '__v1_images_changed') {
        setSrc((window.__v1Images || {})[slotKey] || null);
      }
    };
    window.addEventListener('message', h);
    return () => window.removeEventListener('message', h);
  }, [slotKey]);
  return src;
};
window.useImageSlot = useImageSlot;

const V1 = () => {
  // Palette (V1 — warm dark)
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
    cream: '#FAF9F5',
  };

  const Section = ({ children, style }) => (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px', ...style }}>
      {children}
    </section>
  );

  // ----- Hero AI diff demo -----
  // Looping animation: types original text → user prompt → AI proposes diff → applies.
  const HeroDemo = () => {
    const customImg = useImageSlot('hero');
    const SCRIPT = [
      { type: 'idle',   ms: 800,  block2: '第一种是互斥锁，简单可靠。' },
      { type: 'prompt', ms: 1800, block2: '第一种是互斥锁，简单可靠。',
        prompt: '@b2 扩写第二段，参考我的风格' },
      { type: 'thinking', ms: 1500, block2: '第一种是互斥锁，简单可靠。',
        prompt: '@b2 扩写第二段，参考我的风格' },
      { type: 'diff', ms: 3500, block2: '第一种是互斥锁，简单可靠。',
        prompt: '@b2 扩写第二段，参考我的风格' },
      { type: 'applied', ms: 2400,
        block2: '第一种是互斥锁。当缓存失效时，只允许第一个请求查询数据库并回写缓存，其他请求等待或快速失败。',
        prompt: '@b2 扩写第二段，参考我的风格' },
    ];

    const [step, setStep] = React.useState(0);
    React.useEffect(() => {
      const t = setTimeout(() => setStep((step + 1) % SCRIPT.length), SCRIPT[step].ms);
      return () => clearTimeout(t);
    }, [step]);
    const s = SCRIPT[step];

    // Typewriter for prompt (only animate during 'prompt' step)
    const promptDisplayed = useTypewriter(
      s.type === 'prompt' || s.type === 'thinking' || s.type === 'diff' || s.type === 'applied' ? s.prompt || '' : '',
      28, 0, [step]
    );

    // After all hooks, swap to user-supplied image if provided.
    if (customImg) {
      return (
        <div style={{
          background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 12,
          boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,137,110,0.05)',
          overflow: 'hidden', aspectRatio: '16/10',
        }}>
          <img src={customImg} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
        </div>
      );
    }

    const block2Style = {
      fontSize: 14, lineHeight: 1.7, padding: '10px 14px', borderRadius: 6,
      borderLeft: `3px solid ${
        s.type === 'thinking' ? C.accent :
        s.type === 'diff' || s.type === 'applied' ? '#FBBF24' : 'transparent'
      }`,
      background: s.type === 'diff' || s.type === 'applied' ? '#3D3520' : 'transparent',
      transition: 'all 280ms ease',
      animation: s.type === 'thinking' ? 'pulseLeft 1.2s ease infinite' : 'none',
      color: C.text, fontFamily: 'var(--font-editor)',
    };

    return (
      <div style={{
        background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 12,
        boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,137,110,0.05)',
        overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1.55fr 1fr',
      }}>
        {/* Canvas side */}
        <div style={{ padding: '20px 24px 24px', borderRight: `1px solid ${C.lineSub}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
            paddingBottom: 12, borderBottom: `1px solid ${C.lineSub}` }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }}/>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }}/>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }}/>
            </div>
            <div style={{ fontSize: 12, color: C.text3, fontFamily: 'var(--font-mono)' }}>
              缓存击穿三种解法.md
            </div>
            <div style={{ flex: 1 }}/>
            <div style={{ fontSize: 10, color: C.text3, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent,
                animation: 'pulse 1.5s infinite' }}/>
              AI 创作中
            </div>
          </div>

          <div style={{ fontFamily: 'var(--font-editor)', fontSize: 24, fontWeight: 700,
            color: C.text, marginBottom: 18 }}>
            缓存击穿三种解法
          </div>

          <div style={{ ...block2Style, color: C.text2, marginBottom: 6, borderLeft: '3px solid transparent', background: 'transparent' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C.text3, marginRight: 8 }}>b1</span>
            缓存击穿是指热点 key 在某一刻失效，大量请求同时穿透到数据库。
          </div>

          <div style={block2Style}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C.text3, marginRight: 8 }}>b2</span>
            {(s.type === 'diff' || s.type === 'applied') && (
              <span style={{
                background: '#3D3520', color: '#FBBF24', padding: '1px 6px',
                borderRadius: 3, fontSize: 9, fontWeight: 600, marginRight: 8,
                border: '1px solid rgba(251,191,36,0.3)',
              }}>已修改</span>
            )}
            {s.block2}
          </div>

          <div style={{ ...block2Style, color: C.text2, marginTop: 6, borderLeft: '3px solid transparent', background: 'transparent' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C.text3, marginRight: 8 }}>b3</span>
            第二种是逻辑过期……
          </div>
        </div>

        {/* AI panel side */}
        <div style={{ padding: '20px 22px', background: '#1A1311',
          display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NotusLogo size={16} color={C.accent}/>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>AI 协作</span>
            <div style={{ flex: 1 }}/>
            <span style={{ fontSize: 10, color: C.text3 }}>风格：自动匹配</span>
          </div>

          <div style={{ flex: 1, fontSize: 12 }}>
            {/* User prompt */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12,
              opacity: promptDisplayed ? 1 : 0, transition: 'opacity 200ms' }}>
              <div style={{ background: C.bg3, borderRadius: 8, padding: '8px 12px',
                fontSize: 11.5, maxWidth: '85%', color: C.text }}>
                {promptDisplayed}
                {s.type === 'prompt' && (
                  <span style={{ display: 'inline-block', width: 1.5, height: 12,
                    background: C.accent, marginLeft: 2, animation: 'blink 1s step-end infinite' }}/>
                )}
              </div>
            </div>

            {(s.type === 'thinking' || s.type === 'diff' || s.type === 'applied') && (
              <>
                <div style={{ fontSize: 10, color: C.text2, marginBottom: 6,
                  display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span>✨</span>Notus
                </div>
                <div style={{ fontSize: 11, color: C.text2, marginBottom: 10, lineHeight: 1.6 }}>
                  {s.type === 'thinking' ? (
                    <>正在检索风格样本
                      <span style={{ animation: 'blink 1s step-end infinite' }}>…</span>
                    </>
                  ) : s.type === 'diff' ? (
                    <>已检索 3 篇风格样本，提议如下修改：</>
                  ) : (
                    <span style={{ color: '#4ADE80' }}>✓ 已应用到 b2，源文件同步更新。</span>
                  )}
                </div>

                {s.type === 'diff' && (
                  <div style={{
                    background: '#1C1917',
                    border: `1px solid rgba(212,137,110,0.3)`,
                    borderRadius: 8, padding: 12,
                    animation: 'slideIn 250ms ease',
                  }}>
                    <div style={{ fontSize: 10, marginBottom: 8, display: 'flex',
                      gap: 6, alignItems: 'center', color: C.text }}>
                      🤖 <span style={{ fontWeight: 500 }}>操作预览</span>
                      <span style={{ background: '#3D2E27', color: C.accent,
                        padding: '1px 6px', borderRadius: 8, fontSize: 9 }}>块 #b2</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, lineHeight: 1.55 }}>
                      <div style={{ background: '#3D2020', color: '#F87171',
                        padding: '3px 8px', borderRadius: 3, marginBottom: 3,
                        textDecoration: 'line-through' }}>
                        − 第一种是互斥锁，简单可靠。
                      </div>
                      <div style={{ background: '#1A3326', color: '#4ADE80',
                        padding: '3px 8px', borderRadius: 3 }}>
                        + 第一种是互斥锁。当缓存失效时，只允许…
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 10, justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 4,
                        border: `1px solid ${C.line}`, color: C.text2 }}>取消</span>
                      <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 4,
                        background: C.accent, color: '#1A1311', fontWeight: 600 }}>应用修改</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div style={{ borderTop: `1px solid ${C.lineSub}`, paddingTop: 10,
            display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ flex: 1, fontSize: 10, color: C.text3, fontFamily: 'var(--font-mono)' }}>
              @ 引用块号
            </div>
            <span style={{ width: 22, height: 22, borderRadius: '50%', background: C.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1311',
              fontSize: 11, fontWeight: 700 }}>↑</span>
          </div>
        </div>
      </div>
    );
  };

  // ----- Capability strip -----
  const CapStrip = () => (
    <Section style={{ marginTop: 100, paddingTop: 40, paddingBottom: 40,
      borderTop: `1px solid ${C.lineSub}`, borderBottom: `1px solid ${C.lineSub}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }}>
        {[
          { n: '块级', l: 'Block ID + str_replace 精准修改' },
          { n: '混合', l: '向量 + FTS5 + RRF 检索' },
          { n: '私有', l: '懒猫微服本地部署' },
          { n: '风格', l: '历史文章作为 few-shot 样本' },
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

  // ----- Feature row (alternating macOS shots) -----
  const FeatureRow = ({ idx, title, sub, body, points, mini, slot, dark = true, reverse = false }) => {
    const customImg = useImageSlot(slot);
    return (
    <Section style={{ marginTop: 120 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80,
        alignItems: 'center', direction: reverse ? 'rtl' : 'ltr' }}>
        <div style={{ direction: 'ltr' }}>
          <div style={{ fontSize: 11, color: C.accent, fontFamily: 'var(--font-mono)',
            letterSpacing: 2, marginBottom: 14, textTransform: 'uppercase' }}>
            {String(idx).padStart(2, '0')} / {title.tag}
          </div>
          <h2 style={{ fontFamily: 'var(--font-editor)', fontSize: 44, fontWeight: 700,
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
        <div style={{ direction: 'ltr' }}>
          <MacWindow>
            {customImg ? (
              <img src={customImg} alt={title.main} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
            ) : mini}
          </MacWindow>
        </div>
      </div>
    </Section>
    );
  };

  // ----- macOS window wrapper -----
  const MacWindow = ({ children, height = 420 }) => (
    <div style={{
      borderRadius: 12, overflow: 'hidden',
      border: `1px solid ${C.line}`,
      background: C.bg2,
      boxShadow: '0 40px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,137,110,0.06)',
    }}>
      <div style={{ height: 30, background: C.bg3, borderBottom: `1px solid ${C.lineSub}`,
        display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }}/>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }}/>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }}/>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 11, color: C.text3,
          fontFamily: 'var(--font-mono)' }}>notus.local</div>
      </div>
      <div style={{ height, background: C.bg }}>{children}</div>
    </div>
  );

  // ----- Flow diagram -----
  const FlowSection = () => (
    <Section style={{ marginTop: 140 }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{ fontSize: 11, color: C.accent, fontFamily: 'var(--font-mono)',
          letterSpacing: 2, marginBottom: 14, textTransform: 'uppercase' }}>
          04 / WORKFLOW
        </div>
        <h2 style={{ fontFamily: 'var(--font-editor)', fontSize: 44, fontWeight: 700,
          color: C.text, lineHeight: 1.15, margin: 0, letterSpacing: -1, maxWidth: 720, marginInline: 'auto' }}>
          一篇 Markdown，
          <span style={{ color: C.accent, fontStyle: 'italic', fontWeight: 500 }}>四步完成</span>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        position: 'relative' }}>
        {[
          { n: '01', t: '导入', d: '拖拽文件夹或 ZIP，本地索引开始建立。' },
          { n: '02', t: '检索', d: '混合检索 + RRF 融合，从历史中精准取材。' },
          { n: '03', t: '协作', d: '画布上以块为单位，AI 提议 diff，你按需应用。' },
          { n: '04', t: '落盘', d: 'MD 文件本地同步，索引增量更新。' },
        ].map((x, i, a) => (
          <div key={i} style={{ padding: '0 24px', borderRight: i < a.length - 1 ? `1px solid ${C.lineSub}` : 'none' }}>
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

  // ----- Install / Download -----
  const InstallSection = () => (
    <Section style={{ marginTop: 160 }}>
      <div style={{
        background: 'radial-gradient(ellipse at top right, rgba(212,137,110,0.12), transparent 60%), ' + C.bg2,
        border: `1px solid ${C.line}`, borderRadius: 16, padding: 64,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 11, color: C.accent, fontFamily: 'var(--font-mono)',
            letterSpacing: 2, marginBottom: 14, textTransform: 'uppercase' }}>
            05 / INSTALL
          </div>
          <h2 style={{ fontFamily: 'var(--font-editor)', fontSize: 40, fontWeight: 700,
            color: C.text, lineHeight: 1.2, margin: '0 0 20px', letterSpacing: -0.5 }}>
            部署在你自己的<br/>
            <span style={{ color: C.accent, fontStyle: 'italic', fontWeight: 500 }}>懒猫微服</span> 上。
          </h2>
          <p style={{ fontSize: 15, color: C.text2, lineHeight: 1.7, margin: '0 0 28px' }}>
            数据存放在本地 NAS，模型 API Key 由你掌握，索引随文件实时更新。
            没有账号体系、没有云服务、没有第三方读取。
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="https://github.com/dnwwdwd/Notus" style={{
              background: C.accent, color: '#1A1311', padding: '14px 24px',
              borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span>↓</span> 下载 .lpk 安装包
            </a>
            <a href="https://github.com/dnwwdwd/Notus" style={{
              border: `1px solid ${C.line}`, color: C.text, padding: '14px 24px',
              borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              GitHub →
            </a>
          </div>
        </div>
        <div style={{ background: '#0F0D0C', borderRadius: 10, padding: 24,
          border: `1px solid ${C.lineSub}`, fontFamily: 'var(--font-mono)', fontSize: 13,
          lineHeight: 1.8 }}>
          <div style={{ color: C.text3, marginBottom: 8 }}># 1. 安装到懒猫微服</div>
          <div style={{ color: C.text }}>
            <span style={{ color: C.accent }}>$</span> lzc install notus.lpk
          </div>
          <div style={{ color: C.text3, marginTop: 16, marginBottom: 8 }}># 2. 配置 LLM &amp; Embedding</div>
          <div style={{ color: C.text }}>
            <span style={{ color: C.accent }}>$</span> open https://notus.lzc.app/setup
          </div>
          <div style={{ color: C.text3, marginTop: 16, marginBottom: 8 }}># 3. 导入你的 Markdown</div>
          <div style={{ color: C.text }}>
            <span style={{ color: C.accent }}>$</span> drop ./my-notes
          </div>
          <div style={{ color: '#4ADE80', marginTop: 16 }}>✓ 索引完成 · 128 篇 · 1.4k 块</div>
        </div>
      </div>
    </Section>
  );

  // ----- Footer -----
  const Footer = () => (
    <footer style={{ marginTop: 140, borderTop: `1px solid ${C.lineSub}`,
      padding: '56px 0 64px' }}>
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <NotusLogo size={28} color={C.accent}/>
              <span style={{ fontFamily: 'var(--font-editor)', fontSize: 22, fontWeight: 700, color: C.text }}>
                Notus
              </span>
            </div>
            <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: 320, margin: 0 }}>
              私有化个人知识库与 AI 写作协作工具。<br/>
              你的文章，你的风格，你的硬盘。
            </p>
          </div>
          {[
            { h: '产品', items: [
              { l: 'GitHub', href: 'https://github.com/dnwwdwd/Notus' },
              { l: '下载 .lpk', href: 'https://github.com/dnwwdwd/Notus/releases' },
              { l: '更新日志', href: 'https://github.com/dnwwdwd/Notus' },
            ]},
            { h: '作者', items: [
              { l: '个人博客', href: 'https://blog.hejiajun.icu' },
              { l: 'X / Twitter', href: 'https://x.com/C1ownhjj' },
            ]},
            { h: '相关', items: [
              { l: '懒猫微服', href: '#' },
              { l: 'Tiptap', href: '#' },
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
                      textDecoration: 'none', borderBottom: `1px solid transparent` }}>
                      {it.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.lineSub}`,
          display: 'flex', justifyContent: 'space-between', fontSize: 11,
          color: C.text3, fontFamily: 'var(--font-mono)' }}>
          <span>© 2026 NOTUS · MIT LICENSED</span>
          <span>BUILT FOR LAZYCAT MICROSERVICE</span>
        </div>
      </Section>
    </footer>
  );

  // ----- TopNav -----
  const TopNav = () => (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(28,25,23,0.85)', backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${C.lineSub}`,
    }}>
      <Section style={{ display: 'flex', alignItems: 'center', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <NotusLogo size={24} color={C.accent}/>
          <span style={{ fontFamily: 'var(--font-editor)', fontSize: 20, fontWeight: 700,
            color: C.text, letterSpacing: -0.3 }}>Notus</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C.text3,
            border: `1px solid ${C.lineSub}`, padding: '2px 6px', borderRadius: 3,
            marginLeft: 6 }}>v2.0</span>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 32 }}>
          {['特性', '工作流', '安装'].map(t => (
            <a key={t} href="#" style={{ fontSize: 13, color: C.text2, textDecoration: 'none' }}>{t}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="https://github.com/dnwwdwd/Notus" style={{
            fontSize: 13, color: C.text2, textDecoration: 'none', padding: '8px 14px' }}>
            GitHub
          </a>
          <a href="https://github.com/dnwwdwd/Notus/releases" style={{
            background: C.accent, color: '#1A1311', padding: '8px 16px',
            borderRadius: 5, fontSize: 13, fontWeight: 600, textDecoration: 'none',
          }}>下载</a>
        </div>
      </Section>
    </nav>
  );

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-ui)',
      minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulseLeft { 0%,100%{border-left-color:${C.accent};opacity:1} 50%{opacity:0.5} }
        @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatGrain {
          0% { transform: translate(0,0) }
          100% { transform: translate(-40px,-40px) }
        }
        a:hover { color: ${C.accent} !important; }
      `}</style>

      <TopNav/>

      {/* HERO */}
      <Section style={{ paddingTop: 88, paddingBottom: 80, position: 'relative' }}>
        {/* subtle texture */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage:
            `radial-gradient(circle at 20% 30%, ${C.accent} 0, transparent 50%),
             radial-gradient(circle at 80% 80%, ${C.accent} 0, transparent 50%)` }}/>

        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.1fr', gap: 64,
          alignItems: 'center', position: 'relative' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(212,137,110,0.08)', border: `1px solid rgba(212,137,110,0.25)`,
              padding: '6px 12px', borderRadius: 99, fontSize: 11, color: C.accent,
              fontFamily: 'var(--font-mono)', marginBottom: 28, letterSpacing: 0.5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent,
                animation: 'pulse 1.5s infinite' }}/>
              私有部署 · 数据自主
            </div>
            <h1 style={{ fontFamily: 'var(--font-editor)', fontSize: 80, fontWeight: 700,
              color: C.text, lineHeight: 1.0, margin: 0, letterSpacing: -2.5 }}>
              你的文章，<br/>
              <span style={{ color: C.accent, fontStyle: 'italic', fontWeight: 500 }}>是 AI 的</span><br/>
              <span style={{ color: C.accent, fontStyle: 'italic', fontWeight: 500 }}>记忆。</span>
            </h1>
            <p style={{ fontSize: 18, color: C.text2, lineHeight: 1.65,
              marginTop: 32, marginBottom: 36, maxWidth: 460 }}>
              Notus 是一款运行在懒猫微服上的私有化知识库与 AI 写作协作工具。在画布上与 AI 共同创作，让历史成为记忆，让风格成为模板。
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <a href="https://github.com/dnwwdwd/Notus/releases" style={{
                background: C.accent, color: '#1A1311', padding: '14px 24px',
                borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>下载 .lpk 安装包 →</a>
              <a href="https://github.com/dnwwdwd/Notus" style={{
                color: C.text, padding: '14px 18px', fontSize: 14, textDecoration: 'none',
              }}>在 GitHub 查看 →</a>
            </div>
            <div style={{ display: 'flex', gap: 28, marginTop: 48, fontSize: 12, color: C.text3,
              fontFamily: 'var(--font-mono)' }}>
              <span>★ 开源 / MIT</span>
              <span>· Markdown 原生</span>
              <span>· 无云依赖</span>
            </div>
          </div>
          <HeroDemo/>
        </div>
      </Section>

      <CapStrip/>

      <FeatureRow
        idx={1}
        title={{ tag: 'EDITOR', main: '所见即所得，', accent: '像 Typora 一样轻。' }}
        body="文件树 + TOC 共用 Sidebar，标题点击跳转、滚动高亮。AST 实时解析，保存自动触发增量索引——没有云端，没有上传等待。"
        points={[
          { k: 'Tiptap 双向转换', v: 'Markdown 即文档，文档即 Markdown。' },
          { k: '增量索引', v: 'hash 比对，未变化跳过。' },
          { k: '行号跳转', v: 'URL #L24-L28，目标行高亮 3s 淡出。' },
        ]}
        mini={<MiniNotus variant="editor" dark={true}/>}
        slot="feature1"
      />

      <FeatureRow
        idx={2}
        title={{ tag: 'KNOWLEDGE', main: '严格 RAG，', accent: '不命中就说不知道。' }}
        body="混合检索（向量 + FTS5）通过 RRF 融合再重排序，命中阈值之下直接拒答，杜绝幻觉。每条引用附带文件名 + heading 路径 + 行号，点击即跳。"
        points={[
          { k: '双引擎检索', v: '向量召回语义，FTS5 召回精确匹配。' },
          { k: 'Reciprocal Rank Fusion', v: '融合排序后再交给重排器。' },
          { k: '可信引用', v: 'SourceCard 直达原文行号高亮。' },
        ]}
        mini={<MiniNotus variant="knowledge" dark={true}/>}
        slot="feature2"
        reverse
      />

      <FeatureRow
        idx={3}
        title={{ tag: 'CANVAS', main: '块级协作，', accent: 'AI 不重写全文。' }}
        body="文章被解析为带 Block ID 的块。AI 通过 str_replace 精准定位，old 字段二次校验防错。所有修改走 diff 预览，你点击应用才落地——这是一种新的写作合约。"
        points={[
          { k: '9 个 Agent 工具', v: 'draft / expand / shrink / polish / insert…' },
          { k: 'diff 预览', v: '红绿对照，可保留撤销。' },
          { k: '风格 few-shot', v: '自动语义匹配你的历史文章作为样本。' },
        ]}
        mini={<MiniNotus variant="canvas-diff" dark={true}/>}
        slot="feature3"
      />

      <FlowSection/>
      <InstallSection/>
      <Footer/>
    </div>
  );
};

window.V1 = V1;
