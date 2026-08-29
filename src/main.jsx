import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Download, Mail, MapPin, Menu, X } from 'lucide-react';
import '../styles.css';

const projects = [
  { number: '01', title: '嵌入式智能终端', type: 'Embedded / Firmware', text: '从底层驱动到功能验证，探索稳定、清晰的软硬件协同。', visual: 'grid-visual' },
  { number: '02', title: 'OpenCV 人脸识别系统', type: 'C++ / Qt / Computer Vision', text: '桌面端视觉应用实践，连接图像处理、界面交互与工程实现。', visual: 'face-visual' },
  { number: '03', title: '下一件作品', type: 'In progress', text: '项目资料整理中，之后会在这里分享过程、技术栈与成果。', visual: 'line-visual' },
];

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return <div className="app">
    <div className="ambient" aria-hidden="true" />
    <header className="nav"><a className="logo" href="#top">LI<span>.</span></a><nav className={menuOpen ? 'open' : ''}><a href="#about" onClick={() => setMenuOpen(false)}>关于我</a><a href="#projects" onClick={() => setMenuOpen(false)}>项目</a><a href="#strengths" onClick={() => setMenuOpen(false)}>能力</a><a href="#contact" onClick={() => setMenuOpen(false)}>联系</a></nav><a className="nav-cta" href="#contact">Let's talk <ArrowUpRight size={15} /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="打开导航">{menuOpen ? <X /> : <Menu />}</button></header>
    <main id="top">
      <section className="hero"><div className="hero-bg"><div className="scanlines" /><div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><span className="hero-code">01 / 2026<br />LIFE IN PROGRESS</span></div><div className="hero-content"><p className="kicker"><i /> ELECTRONICS STUDENT · CHANGSHA</p><h1>把想法<br /><em>做成</em>现实。</h1><p className="hero-copy">我是小李，一名电子信息工程在校大学生。<br />专注嵌入式开发，也在学习如何把复杂的事做得简单。</p><div className="hero-actions"><a className="solid-btn" href="#projects">查看作品 <ArrowUpRight size={16} /></a><a className="outline-btn" href="./简历.pdf" download="小李-简历.pdf"><Download size={15} /> 下载简历</a></div></div><div className="hero-foot"><span>SCROLL TO EXPLORE</span><span>© 2026</span></div></section>
      <section className="about section" id="about"><div className="section-meta"><span>01</span><span>PROFILE</span></div><div className="about-layout"><div className="portrait"><div className="portrait-initials">LW</div><span>电子信息工程 · 本科</span></div><div className="about-text"><p className="eyebrow">A LITTLE ABOUT ME</p><h2>在学习中构建，<br /><strong>在实践中成长。</strong></h2><p className="body-copy">目前就读于中南林业科技大学电子信息工程专业，专业排名前 17%。我喜欢从底层理解系统，也享受把一个想法一步步变成可运行的作品。</p><div className="contact-row"><span><MapPin size={15} /> 长沙 · 中国</span><a href="mailto:nameliwang1@outlook.com"><Mail size={15} /> nameliwang1@outlook.com</a></div></div></div><div className="stats"><div><strong>17%</strong><span>专业排名</span></div><div><strong>03+</strong><span>实践项目</span></div><div><strong>C/C++</strong><span>核心语言</span></div><div><strong>2026</strong><span>持续更新</span></div></div></section>
      <section className="projects section" id="projects"><div className="section-meta"><span>02</span><span>SELECTED WORK</span></div><div className="section-title"><h2>精选项目</h2><p>记录我如何学习、拆解并完成一个工程。</p></div><div className="project-list">{projects.map((project) => <article className="project-card" key={project.number}><div className={`project-visual ${project.visual}`}><span>{project.number}</span><div className="visual-center">{project.visual === 'face-visual' ? '◎' : project.visual === 'grid-visual' ? '01' : '＋'}</div></div><div className="project-info"><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.text}</p><a href="#contact" aria-label={`了解${project.title}`}>了解项目 <ArrowUpRight size={17} /></a></div></article>)}</div></section>
      <section className="strengths section" id="strengths"><div className="section-meta"><span>03</span><span>CAPABILITIES</span></div><div className="section-title"><h2>我的优势</h2><p>保持好奇，持续把基础能力变成实际产出。</p></div><div className="strength-grid"><article><span>01 / BUILD</span><h3>软硬件协同</h3><p>理解 MCU、外设与应用层之间的关系，重视稳定性和可调试性。</p></article><article><span>02 / LEARN</span><h3>快速学习</h3><p>从文档、实验到复盘，建立自己的知识结构，面对新工具保持开放。</p></article><article><span>03 / CARE</span><h3>认真沟通</h3><p>重视记录与表达，让代码、文档和协作都变得更清晰。</p></article></div></section>
      <section className="contact section" id="contact"><div className="contact-inner"><p className="kicker"><i /> 04 / GET IN TOUCH</p><h2>一起做点<br /><em>有意思的事。</em></h2><div className="contact-bottom"><a className="solid-btn" href="mailto:nameliwang1@outlook.com">发一封邮件 <ArrowUpRight size={16} /></a><div><a href="mailto:nameliwang1@outlook.com">nameliwang1@outlook.com</a><a href="tel:17670610270">176 7061 0270</a><span>长沙 · 中国</span></div></div></div></section>
    </main><footer><span>© 2026 LI WANG</span><span>MADE WITH CURIOSITY</span><a href="#top">BACK TO TOP ↑</a></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
