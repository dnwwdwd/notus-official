// site-v2.jsx — "Letterpress Light" — cream/serif editorial direction

const V2 = () => {
  const C = {
    bg: '#FAF9F5', bg2: '#F0EDE6', line: '#D8D4CB', lineSub: '#E8E5DE',
    text: '#1A1311', text2: '#6B6158', text3: '#9C9489',
    accent: '#C15F3C', accentSub: '#FBEEE8', cream: '#FFFDF7', ink: '#28201D',
  };
  const Section = ({ children, style, ...r }) => (
    <section style={{ maxWidth: 1240, margin: '0 auto', padding: '0 56px', ...style }} {...r}>{children}</section>
  );

  const TopNav = () => (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,249,245,0.85)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${C.lineSub}` }}>
      <Section style={{ display: 'flex', alignItems: 'center', height: 68 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <NotusLogo size={26} color={C.accent}/>
          <span style={{ fontFamily: 'var(--font-editor)', fontSize: 22, fontWeight: 700, color: C.ink, letterSpacing: -0.4 }}>Notus</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: C.text3, letterSpacing: 1, marginLeft: 4, marginTop: 6 }}>EST. 2026</span>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 36 }}>
          {[['编辑器','#editor'],['知识库','#knowledge'],['创作画布','#canvas'],['安装','#install']].map(([t,h]) => (
            <a key={t} href={h} style={{ fontSize: 14, color: C.text, textDecoration: 'none', fontFamily: 'var(--font-editor)' }}>{t}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="https://github.com/dnwwdwd/Notus" style={{ fontSize: 13, color: C.text2, textDecoration: 'none' }}>GitHub ↗</a>
          <a href="https://github.com/dnwwdwd/Notus/releases" style={{ background: C.ink, color: C.cream, padding: '9px 18px', fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: 'var(--font-editor)' }}>下载安装包</a>
        </div>
      </Section>
    </nav>
  );

  const Hero = () => {
    const essay = '缓存的本质，是用空间换时间。在选型时，我们应当先回答几个问题：数据是否容忍短暂不一致？写入与读取的比例如何？';
    const typed = useTypewriter(essay, 28, 800, []);
    return (
      <Section style={{ paddingTop: 72, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start', marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C.accent, letterSpacing: 2, marginBottom: 16 }}>VOL.01 — 私有化 AI 写作伙伴</div>
            <h1 style={{ fontFamily: 'var(--font-editor)', fontSize: 110, fontWeight: 700, color: C.ink, lineHeight: 0.92, margin: 0, letterSpacing: -3.5 }}>
              写作，<br/>
              <span style={{ fontStyle: 'italic', fontWeight: 500 }}>但</span><br/>
              <span style={{ color: C.accent }}>不被</span><br/>
              <span style={{ color: C.accent, fontStyle: 'italic', fontWeight: 500 }}>取代。</span>
            </h1>
          </div>
          <div style={{ paddingTop: 60, maxWidth: 460 }}>
            <p style={{ fontFamily: 'var(--font-editor)', fontSize: 19, color: C.text, lineHeight: 1.65, margin: 0 }}>
              <span style={{ background: C.accentSub, padding: '0 4px' }}>Notus</span> 是一款部署在你<i>懒猫微服</i>上的私有化知识库与 AI 协作工具。让你的历史文章成为 AI 的记忆——在画布上以<b>块</b>为单位与它共同写作。
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 14, alignItems: 'center' }}>
              <a href="https://github.com/dnwwdwd/Notus/releases" style={{ background: C.accent, color: '#fff', padding: '14px 22px', fontSize: 14, fontWeight: 600, textDecoration: 'none', borderRadius: 4 }}>↓ 下载 .lpk</a>
              <a href="https://github.com/dnwwdwd/Notus" style={{ color: C.ink, fontSize: 14, textDecoration: 'underline', textDecorationStyle: 'wavy', textDecorationColor: C.accent, textUnderlineOffset: 6 }}>在 GitHub 上查看 →</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 56, background: C.cream, border: `1px solid ${C.line}`, borderRadius: 6, boxShadow: '0 30px 60px rgba(40,32,29,0.07)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.3fr 1fr' }}>
          <div style={{ padding: '40px 48px', borderRight: `1px solid ${C.lineSub}`, position: 'relative' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C.text3, letterSpacing: 1.5, marginBottom: 8 }}>缓存击穿三种解法.md · 块 b1</div>
            <h3 style={{ fontFamily: 'var(--font-editor)', fontSize: 32, fontWeight: 700, color: C.ink, margin: '0 0 24px', letterSpacing: -0.5 }}>缓存击穿三种解法</h3>
            <p style={{ fontFamily: 'var(--font-editor)', fontSize: 17, lineHeight: 1.85, color: C.text, margin: 0, minHeight: 90 }}>
              {typed}
              <span style={{ display: 'inline-block', width: 2, height: 18, background: C.accent, marginLeft: 2, verticalAlign: -3, animation: typed.length < essay.length ? 'blink 1s step-end infinite' : 'none', opacity: typed.length < essay.length ? 1 : 0, transition: 'opacity 300ms' }}/>
            </p>
            <div style={{ marginTop: 28, padding: '14px 16px', background: '#FFF8C5', borderLeft: `3px solid ${C.accent}`, borderRadius: 2, fontFamily: 'var(--font-editor)', fontSize: 16, lineHeight: 1.8, color: C.text }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: C.text3 }}>b2</span>
                <span style={{ background: '#FFE69C', color: '#9B7020', padding: '1px 7px', borderRadius: 99, fontSize: 9, fontWeight: 600 }}>已修改 · 待应用</span>
              </div>
              第一种是<b>互斥锁</b>。当缓存失效时，只允许第一个请求查询数据库并回写缓存，其他请求在毫秒级别等待或快速失败。这是最直接、也最容易理解的方案。
            </div>
            <div style={{ marginTop: 18, fontFamily: 'var(--font-editor)', fontSize: 17, lineHeight: 1.85, color: C.text2 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C.text3, marginRight: 8 }}>b3</span>第二种是逻辑过期……
            </div>
            <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'var(--font-mono)', fontSize: 9, color: C.text3, letterSpacing: 1.5 }}>FOLIO 01</div>
          </div>
          <div style={{ padding: 32, background: C.bg2, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <NotusLogo size={20} color={C.accent}/>
              <span style={{ fontFamily: 'var(--font-editor)', fontSize: 15, fontWeight: 600 }}>Notus AI · 在边注里</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { k2: '风格匹配', v: '已检索 3 篇风格样本：《Redis 深入》《缓存系列总论》《分布式踩坑录》' },
                { k2: '提议', v: '改写 b2，使其与你过去的"先观点、再展开、收一句利弊"的写法保持一致。' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: C.text2, lineHeight: 1.65 }}>
                  <span style={{ color: C.accent }}>✦</span>
                  <span><b style={{ color: C.ink, fontWeight: 600 }}>{m.k2}.</b> {m.v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, background: C.cream, border: `1px solid ${C.accentSub}`, borderRadius: 6, padding: 14 }}>
              <div style={{ fontSize: 11, marginBottom: 10, display: 'flex', gap: 6, alignItems: 'center', color: C.text }}>
                <span style={{ color: C.accent }}>🤖</span><span style={{ fontWeight: 600 }}>操作预览</span>
                <span style={{ background: C.accentSub, color: C.accent, padding: '1px 7px', borderRadius: 99, fontSize: 10 }}>块 #b2</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.6 }}>
                <div style={{ background: '#FFE2E0', color: '#D93025', padding: '4px 8px', borderRadius: 3, marginBottom: 3, textDecoration: 'line-through' }}>− 第一种是互斥锁，简单可靠。</div>
                <div style={{ background: '#DAFBE1', color: '#1E8E3E', padding: '4px 8px', borderRadius: 3 }}>+ 第一种是<b>互斥锁</b>。当缓存失效时…</div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 11, padding: '5px 12px', borderRadius: 4, border: `1px solid ${C.line}`, color: C.text2 }}>取消</span>
                <span style={{ fontSize: 11, padding: '5px 12px', borderRadius: 4, background: C.accent, color: '#fff', fontWeight: 600 }}>应用修改</span>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 18, right: 24, fontFamily: 'var(--font-mono)', fontSize: 9, color: C.text3, letterSpacing: 1.5 }}>MARGINALIA</div>
          </div>
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 32, fontSize: 11, color: C.text3, fontFamily: 'var(--font-mono)', letterSpacing: 1.5, justifyContent: 'center' }}>
          <span>· MARKDOWN ORIGINAL ·</span><span>· LOCAL FIRST ·</span><span>· OPEN SOURCE / MIT ·</span><span>· NO ACCOUNTS ·</span>
        </div>
      </Section>
    );
  };

  const PullQuote = () => (
    <Section style={{ marginTop: 100, marginBottom: 80 }}>
      <div style={{ borderTop: `2px solid ${C.ink}`, borderBottom: `1px solid ${C.line}`, padding: '56px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 48, alignItems: 'baseline' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C.accent, letterSpacing: 2 }}>论 — 设计原则</div>
          <div style={{ fontFamily: 'var(--font-editor)', fontSize: 44, fontWeight: 500, fontStyle: 'italic', color: C.ink, lineHeight: 1.25, letterSpacing: -0.5 }}>
            「文件优先，块级协作。」<br/>
            <span style={{ fontStyle: 'normal', fontWeight: 400, color: C.text2, fontSize: 36 }}>
              .md 是唯一真相来源；AI 通过 Block ID 精准修改，而不是<span style={{ color: C.accent }}>重写全文</span>。
            </span>
          </div>
        </div>
      </div>
    </Section>
  );

  const PaperWindow = ({ children, height = 440 }) => (
    <div style={{ borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.line}`, background: '#FFFFFF', boxShadow: '0 50px 100px rgba(40,32,29,0.13), 0 0 0 1px rgba(40,32,29,0.04)' }}>
      <div style={{ height: 32, background: C.bg2, borderBottom: `1px solid ${C.lineSub}`, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }}/>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }}/>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }}/>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 11, color: C.text3, fontFamily: 'var(--font-mono)' }}>notus.local</div>
      </div>
      <div style={{ height }}>{children}</div>
    </div>
  );

  const Feature = ({ idx, kicker, title, italic, body, bullets, mini, anchor, reverse }) => (
    <Section style={{ marginTop: 120, scrollMarginTop: 80 }} id={anchor}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 80, alignItems: 'center', direction: reverse ? 'rtl' : 'ltr' }}>
        <div style={{ direction: 'ltr' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', marginBottom: 18 }}>
            <span style={{ fontFamily: 'var(--font-editor)', fontSize: 64, fontWeight: 700, color: C.accent, lineHeight: 1, letterSpacing: -2 }}>{String(idx).padStart(2, '0')}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C.text3, letterSpacing: 2, textTransform: 'uppercase' }}>{kicker}</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-editor)', fontSize: 56, fontWeight: 700, color: C.ink, lineHeight: 1.05, margin: 0, letterSpacing: -1.5 }}>
            {title}<br/><span style={{ fontStyle: 'italic', fontWeight: 500, color: C.accent }}>{italic}</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-editor)', fontSize: 17, color: C.text, lineHeight: 1.75, marginTop: 28, marginBottom: 24, maxWidth: 480 }}>{body}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: `1px solid ${C.lineSub}` }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16, padding: '14px 0', borderBottom: `1px solid ${C.lineSub}`, fontSize: 14, color: C.text2, lineHeight: 1.6 }}>
                <span style={{ color: C.accent, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', paddingTop: 2 }}>{b.k}</span>
                <span style={{ color: C.text }}>{b.v}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ direction: 'ltr' }}><PaperWindow>{mini}</PaperWindow></div>
      </div>
    </Section>
  );

  const Workflow = () => (
    <Section style={{ marginTop: 140 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, borderTop: `2px solid ${C.ink}`, paddingTop: 32 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C.accent, letterSpacing: 2, marginBottom: 12 }}>04 / 工作流</div>
          <h2 style={{ fontFamily: 'var(--font-editor)', fontSize: 56, fontWeight: 700, color: C.ink, lineHeight: 1.05, margin: 0, letterSpacing: -1.5 }}>
            从导入<br/><span style={{ fontStyle: 'italic', color: C.accent, fontWeight: 500 }}>到落盘。</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-editor)', fontSize: 16, color: C.text2, lineHeight: 1.75, marginTop: 20 }}>
            一切都发生在你的硬盘上。索引、检索、生成、应用——四步闭环，没有一次握手是发往陌生服务器的。
          </p>
        </div>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            { t: '导入', d: '拖拽文件夹或 ZIP 到 Sidebar，索引 pipeline 自动启动。', side: 'SSE 进度推送' },
            { t: '检索', d: '混合检索（向量 + FTS5）→ RRF 融合 → 重排序 → 阈值过滤。', side: '严格 RAG' },
            { t: '协作', d: '在画布上以 Block 为单位与 AI 对话。每一处修改都先看 diff。', side: 'str_replace + old' },
            { t: '落盘', d: '应用后立刻同步到 .md 文件，hash 比对触发增量索引。', side: '本地 SQLite' },
          ].map((x, i, a) => (
            <li key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 160px', gap: 24, alignItems: 'baseline', padding: '24px 0', borderBottom: i < a.length - 1 ? `1px solid ${C.lineSub}` : 'none' }}>
              <span style={{ fontFamily: 'var(--font-editor)', fontSize: 36, fontWeight: 700, color: C.text3, fontStyle: 'italic' }}>{String(i + 1).padStart(2, '0')}.</span>
              <div>
                <div style={{ fontFamily: 'var(--font-editor)', fontSize: 28, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{x.t}</div>
                <div style={{ fontSize: 14, color: C.text2, lineHeight: 1.65 }}>{x.d}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C.text3, letterSpacing: 1.5, textTransform: 'uppercase', textAlign: 'right' }}>{x.side}</div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );

  const Install = () => (
    <Section style={{ marginTop: 140, scrollMarginTop: 80 }} id="install">
      <div style={{ background: C.ink, color: C.cream, borderRadius: 8, padding: 64, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, ${C.accent} 0%, transparent 70%)`, opacity: 0.3 }}/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, position: 'relative' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C.accent, letterSpacing: 2, marginBottom: 14 }}>05 / 安装</div>
            <h2 style={{ fontFamily: 'var(--font-editor)', fontSize: 52, fontWeight: 700, lineHeight: 1.05, margin: '0 0 24px', letterSpacing: -1.5 }}>
              三步开始，<br/><span style={{ fontStyle: 'italic', color: C.accent, fontWeight: 500 }}>数据不出家门。</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-editor)', fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: '0 0 32px' }}>
              .lpk 安装包跑在懒猫微服上。MD 文件存放在你指定的本地目录，SQLite 索引仅作为缓存，可随时重建。
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://github.com/dnwwdwd/Notus/releases" style={{ background: C.accent, color: '#fff', padding: '14px 22px', fontSize: 14, fontWeight: 600, textDecoration: 'none', borderRadius: 4 }}>↓ 下载 .lpk</a>
              <a href="https://github.com/dnwwdwd/Notus" style={{ color: C.cream, border: `1px solid rgba(255,253,247,0.3)`, padding: '14px 22px', fontSize: 14, textDecoration: 'none', borderRadius: 4 }}>查看 GitHub</a>
            </div>
          </div>
          <div style={{ background: '#0F0D0C', borderRadius: 6, padding: 20, fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.9, border: '1px solid rgba(255,253,247,0.1)' }}>
            <div style={{ color: C.text3, marginBottom: 6 }}># 一</div>
            <div><span style={{ color: C.accent }}>›</span> lzc install notus.lpk</div>
            <div style={{ color: C.text3, marginTop: 14, marginBottom: 6 }}># 二</div>
            <div><span style={{ color: C.accent }}>›</span> notus setup --llm claude-sonnet</div>
            <div style={{ color: C.text3, marginTop: 14, marginBottom: 6 }}># 三</div>
            <div><span style={{ color: C.accent }}>›</span> notus import ./writings</div>
            <div style={{ color: '#4ADE80', marginTop: 14 }}>✓ 索引完成 · 128 篇 · 1.4k 块</div>
          </div>
        </div>
      </div>
    </Section>
  );

  const Footer = () => (
    <footer style={{ marginTop: 120, borderTop: `2px solid ${C.ink}`, padding: '48px 0 56px' }}>
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, paddingBottom: 36, borderBottom: `1px solid ${C.lineSub}` }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <NotusLogo size={28} color={C.accent}/>
              <span style={{ fontFamily: 'var(--font-editor)', fontSize: 24, fontWeight: 700, color: C.ink }}>Notus</span>
            </div>
            <p style={{ fontFamily: 'var(--font-editor)', fontSize: 14, color: C.text2, lineHeight: 1.7, maxWidth: 320, margin: 0 }}>
              «你的文章，是 AI 的记忆。»<br/>一款部署在懒猫微服上的私有 AI 写作伙伴。
            </p>
          </div>
          {[
            { h: '产品', items: [['GitHub','https://github.com/dnwwdwd/Notus'],['下载 .lpk','https://github.com/dnwwdwd/Notus/releases'],['更新日志','https://github.com/dnwwdwd/Notus']]},
            { h: '作者', items: [['个人博客','https://blog.hejiajun.icu'],['X / Twitter','https://x.com/C1ownhjj']]},
            { h: '相关', items: [['懒猫微服','#'],['Tiptap','#']]},
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>{col.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.items.map(([l, h], j) => (
                  <li key={j}><a href={h} style={{ fontFamily: 'var(--font-editor)', fontSize: 14, color: C.ink, textDecoration: 'none' }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: C.text3, letterSpacing: 1.5, textTransform: 'uppercase' }}>
          <span>© MMXXVI · NOTUS · MIT LICENSED</span>
          <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-editor)', textTransform: 'none', letterSpacing: 0, fontSize: 13, color: C.text2 }}>"Habent sua fata libelli." 书有命运</span>
          <span>BUILT FOR LAZYCAT</span>
        </div>
      </Section>
    </footer>
  );

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-ui)', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      <TopNav/><Hero/><PullQuote/>
      <Feature idx={1} kicker="EDITOR · 编辑" title="Markdown 是文档，" italic="也是文档的家。" anchor="editor"
        body="Tiptap 双向转换给你 Typora 的所见即所得。文件树 + TOC 共用 Sidebar，AST 实时解析高亮当前章节。保存触发增量索引——hash 比对，未变化则跳过。"
        bullets={[{ k: 'WYSIWYG', v: '所见即所得，光标稳定，复制粘贴干净。' },{ k: 'TOC 跳转', v: '滚动高亮当前章节，URL #L24 精准定位。' },{ k: '增量索引', v: '保存即同步，索引在后台无感知更新。' }]}
        mini={<MiniNotus variant="editor" dark={false}/>}/>
      <Feature idx={2} kicker="KNOWLEDGE · 检索" title="不知道的事，" italic="它会说不知道。" anchor="knowledge" reverse
        body="混合检索（向量 + FTS5）通过 Reciprocal Rank Fusion 融合后再交给重排器。命中阈值之下直接拒答，杜绝幻觉。每条引用附带文件名、heading 路径与精确行号。"
        bullets={[{ k: '双引擎', v: '向量召回语义，FTS5 召回精确匹配。' },{ k: 'RRF', v: '互补的两路结果通过倒数排名融合。' },{ k: '可信引用', v: 'SourceCard 直达原文，3 秒高亮淡出。' }]}
        mini={<MiniNotus variant="knowledge" dark={false}/>}/>
      <Feature idx={3} kicker="CANVAS · 共写" title="它写一段，" italic="你点一下应用。" anchor="canvas"
        body="文章被解析为带 Block ID 的块，AI 通过 str_replace 精准定位，old 字段二次校验防错。所有改动走 diff 预览，由你点击应用——它写它的，你改你的。"
        bullets={[{ k: '九工具', v: 'draft / expand / shrink / polish / insert…' },{ k: 'Diff 预览', v: '红绿对照，应用前可撤销。' },{ k: 'Few-shot', v: '历史文章自动作为风格样本。' }]}
        mini={<MiniNotus variant="canvas-diff" dark={false}/>}/>
      <Workflow/><Install/><Footer/>
    </div>
  );
};
window.V2 = V2;
