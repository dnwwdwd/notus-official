import { NotusLogo } from './shared';

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

const RELEASES = [
  {
    version: 'v1.0',
    date: '2026-05-01',
    label: '初次发布',
    summary: 'Notus 正式公开发布。核心功能全部就绪：本地运行、WYSIWYG 编辑器、精准知识库检索、AI 创作画布。',
    groups: [
      {
        name: '编辑器',
        icon: '✏️',
        items: [
          { title: 'WYSIWYG Markdown 编辑', desc: '基于 Tiptap 实现所见即所得与原生 Markdown 双向转换，光标稳定，复制粘贴干净。' },
          { title: '文件树 + TOC 联动', desc: '单侧边栏同时承载文件树与文章目录，滚动自动高亮当前章节，URL #Lxx 精准定位。' },
          { title: '增量索引', desc: '每次保存后自动比对文件 hash，仅对有变更的块重新建立向量与全文索引，后台无感知运行。' },
        ],
      },
      {
        name: '知识库',
        icon: '🔍',
        items: [
          { title: '精准检索（向量 + FTS5）', desc: '同时运行语义向量召回与 FTS5 精确匹配，通过 Reciprocal Rank Fusion 融合排序后再重排。' },
          { title: '严格 RAG', desc: '命中分数低于阈值时直接回复"笔记中没有相关内容"，杜绝模型幻觉，确保每个答案都有据可查。' },
          { title: '可信引用', desc: '每条 AI 回答下方附带 SourceCard，显示文件名、章节路径与精确行号，点击即跳原文并高亮 3 秒。' },
        ],
      },
      {
        name: '创作画布',
        icon: '🎨',
        items: [
          { title: '块级 AI 协作', desc: '文章被解析为带 Block ID 的独立块。AI 通过 str_replace 精准定位修改目标，old 字段二次校验防止误操作。' },
          { title: 'Diff 预览与应用', desc: '所有 AI 提议的改动以红（删除）绿（新增）对照展示，你确认后才会写入文件，完全掌控每一处变更。' },
          { title: '风格 few-shot', desc: '在创作前自动从历史文章中语义匹配风格相近的片段作为 few-shot 样本，生成结果贴近你自己的写法。' },
          { title: '9 个 Agent 工具', desc: 'draft（起草）/ expand（扩写）/ shrink（精简）/ polish（润色）/ insert（插入）等，覆盖写作全流程。' },
        ],
      },
      {
        name: '本地优先',
        icon: '🔒',
        items: [
          { title: '全本地存储', desc: '所有笔记、向量索引、全文索引均存放在你指定的本地目录。SQLite 是唯一的数据层，无任何云端同步。' },
          { title: '无账号体系', desc: '没有注册、没有登录、没有第三方 OAuth。打开即用，数据不离本机。' },
          { title: '模型 API Key 自持', desc: '支持配置任意兼容 OpenAI 格式的 LLM 与 Embedding 端点，API Key 仅存在于本地配置文件中。' },
        ],
      },
    ],
  },
];

const Changelog = () => {
  return (
    <div style={{
      background: C.bg, color: C.text, fontFamily: 'var(--font-ui)',
      minHeight: '100vh', overflowX: 'hidden',
    }}>
      <style>{`
        @media (max-width: 768px) {
          .cl-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .cl-timeline-line { display: none !important; }
          .cl-header h1 { font-size: 48px !important; letter-spacing: -1.5px !important; }
          .cl-section-padding { padding: 0 24px !important; }
          .cl-group-grid { grid-template-columns: 1fr !important; }
          .cl-nav-section { padding: 0 24px !important; }
        }
        @media (max-width: 480px) {
          .cl-header h1 { font-size: 36px !important; }
          .cl-version-badge { font-size: 10px !important; }
        }
        a:hover { color: ${C.accent} !important; }
        a.btn-accent:hover { color: #1A1311 !important; }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(28,25,23,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.lineSub}`,
      }}>
        <div className="cl-nav-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px', display: 'flex', alignItems: 'center', height: 64 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <NotusLogo size={22} color={C.accent}/>
            <span style={{ fontFamily: 'var(--font-editor)', fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: -0.3 }}>Notus</span>
          </a>
          <div style={{ flex: 1 }}/>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <a href="/" style={{ fontSize: 13, color: C.text2, textDecoration: 'none' }}>← 返回官网</a>
            {/* <a className="btn-accent" href="https://github.com/dnwwdwd/Notus/releases" style={{
              background: C.accent, color: '#1A1311', padding: '7px 14px',
              borderRadius: 5, fontSize: 12, fontWeight: 600, textDecoration: 'none',
            }}>下载</a> */}
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="cl-section-padding cl-header" style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 56px 64px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C.accent, letterSpacing: 2, marginBottom: 16, textTransform: 'uppercase' }}>
          CHANGELOG
        </div>
        <h1 style={{ fontFamily: 'var(--font-editor)', fontSize: 64, fontWeight: 700, color: C.text, lineHeight: 1.05, margin: 0, letterSpacing: -2, maxWidth: 640 }}>
          更新日志
          <span style={{ color: C.accent, fontStyle: 'italic', fontWeight: 500 }}>。</span>
        </h1>
        <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.7, marginTop: 20, maxWidth: 560 }}>
          每一个版本的变化都记录在这里。简明扼要，不废话。
        </p>
      </div>

      <div style={{ borderTop: `1px solid ${C.lineSub}` }}/>

      {/* Timeline */}
      <div className="cl-section-padding" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
        {RELEASES.map((release, ri) => (
          <div key={ri} style={{ paddingTop: 64, paddingBottom: 80, borderBottom: `1px solid ${C.lineSub}` }}>
            {/* Release header */}
            <div className="cl-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64, marginBottom: 56 }}>
              {/* Left: version meta */}
              <div style={{ position: 'relative' }}>
                <div className="cl-timeline-line" style={{
                  position: 'absolute', right: -33, top: 8, width: 1, height: '100%',
                  background: `linear-gradient(to bottom, ${C.accent}, transparent)`,
                  opacity: 0.3,
                }}/>
                <div className="cl-version-badge" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(212,137,110,0.1)', border: `1px solid rgba(212,137,110,0.3)`,
                  padding: '6px 14px', borderRadius: 99, marginBottom: 16,
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.accent }}/>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: C.accent, fontWeight: 600 }}>
                    {release.version}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C.text3, marginBottom: 8 }}>
                  {release.date}
                </div>
                <div style={{ fontSize: 12, color: C.text2, background: C.bg3,
                  display: 'inline-block', padding: '3px 10px', borderRadius: 4 }}>
                  {release.label}
                </div>
              </div>
              {/* Right: summary */}
              <div>
                <p style={{ fontFamily: 'var(--font-editor)', fontSize: 20, color: C.text, lineHeight: 1.65, margin: 0 }}>
                  {release.summary}
                </p>
              </div>
            </div>

            {/* Feature groups */}
            <div className="cl-group-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px 48px' }}>
              {release.groups.map((group, gi) => (
                <div key={gi} style={{
                  background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 10, padding: 28,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22,
                    paddingBottom: 16, borderBottom: `1px solid ${C.lineSub}` }}>
                    <span style={{ fontSize: 18 }}>{group.icon}</span>
                    <span style={{ fontFamily: 'var(--font-editor)', fontSize: 17, fontWeight: 700, color: C.text }}>
                      {group.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C.text3,
                      background: C.bg3, padding: '2px 8px', borderRadius: 3, marginLeft: 'auto' }}>
                      {group.items.length} 项
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {group.items.map((item, ii) => (
                      <div key={ii}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                          <span style={{ color: C.accent, fontFamily: 'var(--font-mono)', fontSize: 11 }}>+</span>
                          <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{item.title}</span>
                        </div>
                        <div style={{ fontSize: 13, color: C.text2, lineHeight: 1.65, paddingLeft: 19 }}>
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ padding: '48px 0 56px', borderTop: `1px solid ${C.lineSub}` }}>
        <div className="cl-section-padding" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <NotusLogo size={22} color={C.accent}/>
            <span style={{ fontFamily: 'var(--font-editor)', fontSize: 16, fontWeight: 700, color: C.text }}>Notus</span>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: C.text2 }}>
            <a href="https://github.com/dnwwdwd" style={{ textDecoration: 'none', color: C.text2 }}>GitHub 主页</a>
            <a href="https://github.com/dnwwdwd/Notus" style={{ textDecoration: 'none', color: C.text2 }}>GitHub</a>
            <a href="https://x.com/C1ownhjj" style={{ textDecoration: 'none', color: C.text2 }}>X / Twitter</a>
            {/* <a href="https://github.com/dnwwdwd/Notus/releases" style={{ textDecoration: 'none', color: C.text2 }}>下载</a> */}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C.text3 }}>
            © 2026 NOTUS · MIT LICENSED
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Changelog;
