// site-shared.jsx — shared utilities and embedded UI miniatures for Notus marketing site

const useTypewriter = (text, speed = 30, startDelay = 0, deps = []) => {
  const [out, setOut] = React.useState('');
  React.useEffect(() => {
    setOut('');
    let i = 0;
    let timer;
    const start = setTimeout(() => {
      const tick = () => {
        i++;
        setOut(text.slice(0, i));
        if (i < text.length) timer = setTimeout(tick, speed);
      };
      tick();
    }, startDelay);
    return () => { clearTimeout(start); clearTimeout(timer); };
  }, deps);
  return out;
};

// Tiny embedded Notus app preview — used inside macOS windows on the marketing page.
// Static, labelled, just enough to feel like the real product.
const MiniNotus = ({ variant = 'editor', dark = false }) => {
  const bg = dark ? '#1C1917' : '#FAF9F5';
  const sidebarBg = dark ? '#211E1C' : '#EEEBE4';
  const elev = dark ? '#2E2A27' : '#FFFFFF';
  const border = dark ? '#3D3835' : '#D8D4CB';
  const borderSub = dark ? '#332F2C' : '#E8E5DE';
  const text = dark ? '#EDE8E3' : '#1A1311';
  const text2 = dark ? '#A69E95' : '#6B6158';
  const text3 = dark ? '#7A7269' : '#9C9489';
  const accent = dark ? '#D4896E' : '#C15F3C';
  const accentSub = dark ? '#3D2E27' : '#FBEEE8';
  const userBub = dark ? '#2E2A27' : '#F0EDE6';
  const diffMod = dark ? '#3D3520' : '#FFF8C5';
  const diffAdd = dark ? '#1A3326' : '#DAFBE1';
  const diffRem = dark ? '#3D2020' : '#FFE2E0';

  const Top = () => (
    <div style={{ height: 36, background: elev, borderBottom: `1px solid ${borderSub}`,
      display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, fontSize: 11, color: text2,
      flexShrink: 0 }}>
      <NotusLogo size={14} color={accent}/>
      <span style={{ fontWeight: 600, color: text, fontSize: 11 }}>Notus</span>
      <div style={{ display: 'flex', gap: 14, marginLeft: 18 }}>
        {['文件', '知识库', '创作'].map((t, i) => (
          <span key={t} style={{
            color: ((variant === 'editor' || variant === 'split') && i === 0) ||
                   (variant === 'knowledge' && i === 1) ||
                   ((variant === 'canvas' || variant === 'canvas-diff') && i === 2) ? accent : text2,
            fontWeight: 500,
            borderBottom: ((variant === 'editor' || variant === 'split') && i === 0) ||
                   (variant === 'knowledge' && i === 1) ||
                   ((variant === 'canvas' || variant === 'canvas-diff') && i === 2)
              ? `2px solid ${accent}` : '2px solid transparent',
            paddingBottom: 4, marginBottom: -6,
          }}>{t}</span>
        ))}
      </div>
      <div style={{ flex: 1 }}/>
      <span style={{ color: text3 }}>⚙</span>
    </div>
  );

  const Side = ({ items = ['技术文章/', '  缓存系列/', '    性能优化实践.md', '    Redis 深入.md', '随笔/', 'README.md'], active = 2 }) => (
    <div style={{ width: 168, background: sidebarBg, borderRight: `1px solid ${borderSub}`,
      flexShrink: 0, padding: '8px 6px', fontSize: 11 }}>
      <div style={{ display: 'flex', gap: 4, padding: '4px 6px 8px', borderBottom: `1px solid ${borderSub}`, marginBottom: 6 }}>
        <div style={{ width: 22, height: 20, borderRadius: 4, background: dark ? '#2E2A27' : '#FFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>📁</div>
        <div style={{ width: 22, height: 20, borderRadius: 4, color: text3,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>≡</div>
        <div style={{ flex: 1 }}/>
        <span style={{ color: text3 }}>🔍</span>
      </div>
      {items.map((it, i) => (
        <div key={i} style={{
          padding: '4px 6px', borderRadius: 4, color: i === active ? accent : text2,
          background: i === active ? accentSub : 'transparent',
          fontWeight: i === active ? 500 : 400, whiteSpace: 'nowrap', overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {it.startsWith('  ') ? '' : (it.endsWith('/') ? '▾ ' : '📄 ')}{it.trim()}
        </div>
      ))}
    </div>
  );

  if (variant === 'editor' || variant === 'split') {
    return (
      <div style={{ width: '100%', height: '100%', background: bg, color: text,
        display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-ui)' }}>
        <Top/>
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <Side/>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ height: 32, borderBottom: `1px solid ${borderSub}`,
              display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6, fontSize: 11, color: text2 }}>
              {['B', 'I', 'S'].map(t => <span key={t} style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}>{t}</span>)}
              <div style={{ width: 1, height: 14, background: borderSub, margin: '0 4px' }}/>
              <span style={{ padding: '0 8px' }}>H ▾</span>
              <div style={{ width: 1, height: 14, background: borderSub, margin: '0 4px' }}/>
              <span>🔗</span><span>🖼</span>
              <div style={{ flex: 1 }}/>
              <span style={{ background: accent, color: '#fff', padding: '4px 10px',
                borderRadius: 4, fontWeight: 500, fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                ✨ AI 创作
              </span>
            </div>
            {variant === 'split' ? (
              <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
                <div style={{ flex: 1, padding: '24px 32px', borderRight: `1px solid ${border}`,
                  fontFamily: 'var(--font-mono)', fontSize: 11, color: text2, lineHeight: 1.7, overflow: 'hidden' }}>
                  <div style={{ color: text }}># 性能优化实践</div>
                  <div style={{ marginTop: 8 }}>缓存的本质是用空间换时间。</div>
                  <div style={{ marginTop: 8 }}>## 缓存策略</div>
                  <div style={{ marginTop: 8 }}>在选型时，我们需要先回答几个问题：</div>
                  <div>- 数据是否容忍短暂不一致？</div>
                  <div>- 写入频率与读取频率比例？</div>
                </div>
                <div style={{ flex: 1, padding: '24px 32px', fontFamily: 'var(--font-editor)',
                  fontSize: 13, color: text, lineHeight: 1.8, overflow: 'hidden' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: text }}>性能优化实践</div>
                  <div style={{ marginTop: 12 }}>缓存的本质是用空间换时间。</div>
                  <div style={{ marginTop: 14, fontSize: 16, fontWeight: 600 }}>缓存策略</div>
                  <div style={{ marginTop: 8 }}>在选型时，我们需要先回答几个问题：</div>
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, padding: '40px 56px', fontFamily: 'var(--font-editor)',
                fontSize: 14, color: text, lineHeight: 1.85, overflow: 'hidden' }}>
                <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>性能优化实践</div>
                <p>缓存的本质是用空间换时间。在选型时，我们需要先回答几个问题。</p>
                <div style={{ fontSize: 18, fontWeight: 600, marginTop: 18 }}>缓存策略</div>
                <p style={{ marginTop: 8 }}>Redis 的过期策略应当优先选择 LRU 而非 TTL。</p>
                <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 12, color: text2,
                  margin: '14px 0', fontStyle: 'italic' }}>
                  从经验上看，95% 的性能问题在缓存层就能解决。
                </div>
                <div style={{ background: dark ? '#252220' : '#F0EDE6', borderRadius: 6,
                  padding: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: text2 }}>
                  redis.expire(key, 3600);
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'knowledge') {
    return (
      <div style={{ width: '100%', height: '100%', background: bg, color: text,
        display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-ui)' }}>
        <Top/>
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <Side active={-1}/>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ flex: 1, padding: '24px 40px', overflow: 'hidden' }}>
              {/* user msg */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <div style={{ background: userBub, borderRadius: 8, padding: '8px 12px',
                  fontSize: 12, maxWidth: '70%' }}>
                  我之前写的那篇关于 Redis 缓存击穿的文章里，主要的解法是什么？
                </div>
              </div>
              {/* AI msg */}
              <div style={{ fontSize: 11, color: text2, marginBottom: 6, display: 'flex', gap: 6 }}>
                <span>✨</span>Notus
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.7, marginBottom: 12 }}>
                根据你的两篇文章，缓存击穿的处理主要分三类：
                <br/>1. <b>互斥锁</b>：保证只有一个请求查询数据库；
                <br/>2. <b>逻辑过期</b>：物理 key 永不过期，但内嵌过期时间；
                <br/>3. <b>布隆过滤器</b>：拦截不存在的 key 查询。
              </div>
              {/* source cards */}
              {[
                { f: '性能优化实践', p: '缓存策略 › 缓存击穿', q: '热点 key 失效瞬间，大量请求穿透缓存…' },
                { f: 'Redis 深入', p: '高可用 › 击穿与雪崩', q: '互斥锁是最直接的方案，但需要注意…' },
              ].map((s, i) => (
                <div key={i} style={{ background: elev, border: `1px solid ${border}`,
                  borderRadius: 6, padding: 10, marginBottom: 8, fontSize: 11 }}>
                  <div style={{ color: text, fontWeight: 500 }}>📄 {s.f} <span style={{ color: text3, fontWeight: 400 }}>› {s.p}</span></div>
                  <div style={{ color: text3, marginTop: 4, fontSize: 10 }}>"{s.q}"</div>
                </div>
              ))}
            </div>
            {/* input bar */}
            <div style={{ borderTop: `1px solid ${borderSub}`, padding: 12, background: elev,
              display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ height: 28, padding: '0 8px', border: `1px solid ${border}`,
                borderRadius: 4, fontSize: 10, color: text2, display: 'flex', alignItems: 'center' }}>
                claude-sonnet ▾
              </div>
              <div style={{ flex: 1, height: 32, border: `1px solid ${border}`, borderRadius: 6,
                padding: '6px 10px', fontSize: 11, color: text3, background: dark ? '#2E2A27' : '#FFF' }}>
                问点什么…
              </div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12 }}>↑</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'canvas' || variant === 'canvas-diff') {
    const isDiff = variant === 'canvas-diff';
    return (
      <div style={{ width: '100%', height: '100%', background: bg, color: text,
        display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-ui)' }}>
        <Top/>
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <Side active={-1}/>
          {/* canvas */}
          <div style={{ flex: 1.7, padding: '20px 32px', overflow: 'hidden', borderRight: `1px solid ${borderSub}` }}>
            <div style={{ fontFamily: 'var(--font-editor)', fontSize: 22, fontWeight: 700, marginBottom: 14 }}>
              缓存击穿三种解法
            </div>
            <div style={{ fontSize: 12, color: text2, lineHeight: 1.75, marginBottom: 8,
              borderLeft: `3px solid transparent`, paddingLeft: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: text3, marginRight: 6 }}>b1</span>
              缓存击穿是指热点 key 在某一刻失效，大量请求同时穿透到数据库。
            </div>
            <div style={{ fontSize: 12, color: text, lineHeight: 1.75, marginBottom: 8,
              borderLeft: `3px solid ${isDiff ? accent : 'transparent'}`, paddingLeft: 10,
              background: isDiff ? diffMod : 'transparent', padding: isDiff ? '6px 10px' : '0 10px',
              borderRadius: isDiff ? 4 : 0 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: text3, marginRight: 6 }}>b2</span>
              {isDiff && <span style={{ background: dark ? '#3D3520' : '#FFE69C', color: dark ? '#FBBF24' : '#9B7020',
                padding: '1px 5px', borderRadius: 3, fontSize: 9, marginRight: 6, fontWeight: 600 }}>已修改</span>}
              第一种是<b>互斥锁</b>。当缓存失效时，只允许第一个请求查询数据库并回写缓存，其他请求等待或快速失败。优点是实现简单，缺点是会有短暂阻塞。
            </div>
            <div style={{ fontSize: 12, color: text2, lineHeight: 1.75, marginBottom: 8,
              borderLeft: `3px solid transparent`, paddingLeft: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: text3, marginRight: 6 }}>b3</span>
              第二种是逻辑过期……
            </div>
            <div style={{ marginTop: 12, border: `1px dashed ${border}`, borderRadius: 4,
              padding: 8, fontSize: 11, color: text3, textAlign: 'center' }}>
              + 新建块
            </div>
          </div>
          {/* AI panel */}
          <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ fontSize: 10, color: text3, marginBottom: 4 }}>风格来源</div>
            <div style={{ height: 26, border: `1px solid ${border}`, borderRadius: 4, fontSize: 10,
              padding: '0 8px', display: 'flex', alignItems: 'center', color: text2, marginBottom: 12 }}>
              自动匹配（基于历史文章）
            </div>
            <div style={{ flex: 1, fontSize: 11, lineHeight: 1.6, color: text, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                <div style={{ background: userBub, borderRadius: 6, padding: '6px 10px', fontSize: 10, maxWidth: '85%' }}>
                  @b2 扩写第二段，参考我的风格
                </div>
              </div>
              <div style={{ fontSize: 10, color: text2, marginBottom: 4, display: 'flex', gap: 4 }}>
                <span>✨</span>Notus
              </div>
              <div style={{ fontSize: 10, color: text2, marginBottom: 8 }}>
                已检索到 3 篇风格样本，正在改写 b2…
              </div>
              {isDiff && (
                <div style={{ background: dark ? '#1C1917' : '#FAF9F5', border: `1px solid ${accentSub}`,
                  borderRadius: 6, padding: 10 }}>
                  <div style={{ fontSize: 10, marginBottom: 6, display: 'flex', gap: 6, alignItems: 'center' }}>
                    🤖 操作预览
                    <span style={{ background: accentSub, color: accent, padding: '1px 5px',
                      borderRadius: 8, fontSize: 9 }}>块 #b2</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, lineHeight: 1.6 }}>
                    <div style={{ background: diffRem, color: dark ? '#F87171' : '#D93025',
                      padding: '2px 6px', borderRadius: 2, marginBottom: 2,
                      textDecoration: 'line-through' }}>- 第一种是互斥锁，简单可靠。</div>
                    <div style={{ background: diffAdd, color: dark ? '#4ADE80' : '#1E8E3E',
                      padding: '2px 6px', borderRadius: 2 }}>+ 第一种是<b>互斥锁</b>。当缓存失效时，只允许第一个请求查询数据库……</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 10, justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 4,
                      border: `1px solid ${border}`, color: text2 }}>取消</span>
                    <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 4,
                      background: accent, color: '#fff', fontWeight: 500 }}>应用修改</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

Object.assign(window, { useTypewriter, MiniNotus });
