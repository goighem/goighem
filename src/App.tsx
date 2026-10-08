import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { ProductScene } from './components/3d/ProductScene';
import { animateReveal } from './animations/scrollTimeline';
import { didYouKnow, giftCakes, storyChapters } from './data/products';
import './styles.css';

const chapters = ['Hero', 'The box', 'Bánh cốm', 'Bánh xu xê', 'Ô mai', 'Nón lá', 'Facts'];

function App() {
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [activeCake, setActiveCake] = useState(0);
  const [cakeDirection, setCakeDirection] = useState(1);
  const storyRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max ? Math.min(window.scrollY / max, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const timer = window.setTimeout(() => setLoaded(true), 650);
    return () => { window.removeEventListener('scroll', onScroll); window.clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) animateReveal(entry.target as HTMLElement);
    }), { threshold: 0.18 });
    storyRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [loaded]);

  const active = useMemo(() => Math.min(Math.floor(progress * chapters.length), chapters.length - 1), [progress]);
  const changeCake = (next: number) => {
    setCakeDirection(next > activeCake ? 1 : -1);
    setActiveCake((next + giftCakes.length) % giftCakes.length);
  };

  return (
    <div className="site-shell">
      {!loaded && <div className="loader"><img className="loader-logo" src={`${import.meta.env.BASE_URL}logo-goi-ghem.png`} alt="" /><span>Gói một chút Hà Nội</span></div>}
      <header className="nav">
        <a className="brand" href="#top" aria-label="GÓI GHÉM về đầu trang"><img src={`${import.meta.env.BASE_URL}logo-goi-ghem.png`} alt="GÓI GHÉM" /></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Điều hướng chính">
          <a href="#box-story" onClick={() => setMenuOpen(false)}>The box</a>
          <a href="#banh-com" onClick={() => setMenuOpen(false)}>Bánh cốm</a>
          <a href="#facts" onClick={() => setMenuOpen(false)}>Did you know?</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Liên hệ</a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      <aside className="progress-rail" aria-label="Tiến trình câu chuyện">
        <span>{String(active + 1).padStart(2, '0')}</span><div className="rail"><i style={{ height: `${progress * 100}%` }} /></div><span>07</span>
      </aside>
      <main id="top">
        <section className="hero section-grid" ref={(el) => { storyRefs.current[0] = el; }}>
          <div className="hero-copy">
            <p className="eyebrow">Gói Ghém · Wrapped with care</p>
            <h1>Pack the essence<br /><em>of autumn,</em><br />share the taste.</h1>
            <p className="hero-intro">A small box of Hanoi, gathered from autumn harvests, wedding tables, village workshops and the streets of the Old Quarter.</p>
            <a className="text-link" href="#box-story">Meet the box <ArrowDown size={16} /></a>
          </div>
          <div className="hero-visual">
            <div className="visual-note">THE ART OF<br />GÓI GHÉM <span>— 01</span></div>
            <div
              className={boxOpen ? 'scene-trigger opened' : 'scene-trigger'}
              role="button"
              tabIndex={0}
              aria-label={boxOpen ? 'Hộp quà đã mở, xem các loại bánh' : 'Mở hộp quà GÓI GHÉM'}
              onClick={() => setBoxOpen(true)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setBoxOpen(true);
                }
              }}
            >
              <ProductScene progress={progress} isOpen={boxOpen} cakes={giftCakes} />
              {!boxOpen && <span className="scene-hint">Chạm để mở hộp <ArrowUpRight size={14} /></span>}
            </div>
            {boxOpen && (
              <div className="cake-slideshow" aria-live="polite">
                <div className="slideshow-top"><span>BÊN TRONG HỘP · 01—03</span><button onClick={() => setBoxOpen(false)} aria-label="Đóng hộp"><X size={17} /></button></div>
                <div className="cake-slide-window">
                  <div className="cake-slide" key={giftCakes[activeCake].name} style={{ '--slide-direction': cakeDirection } as React.CSSProperties}>
                    <div className="cake-index">0{activeCake + 1}<small>/03</small></div>
                    <div className={`cake-hero-visual cake-${activeCake}`} style={{ background: giftCakes[activeCake].tone }}><img src={`${import.meta.env.BASE_URL}${giftCakes[activeCake].image}`} alt={giftCakes[activeCake].name} /></div>
                    <div className="cake-copy"><span className="cake-kicker">MỘT MÓN QUÀ NHỎ</span><strong>{giftCakes[activeCake].name}</strong><small>{giftCakes[activeCake].description}</small><em>{giftCakes[activeCake].detail}</em></div>
                  </div>
                </div>
                <div className="cake-controls"><button onClick={() => changeCake(activeCake - 1)} aria-label="Xem bánh trước"><ArrowDown className="arrow-left" size={17} /></button><div className="cake-dots">{giftCakes.map((cake, index) => <button key={cake.name} className={index === activeCake ? 'active' : ''} onClick={() => changeCake(index)} aria-label={`Xem ${cake.name}`} />)}</div><button onClick={() => changeCake(activeCake + 1)} aria-label="Xem bánh tiếp theo"><ArrowDown className="arrow-right" size={17} /></button></div>
              </div>
            )}
          </div>
          <div className="scroll-cue"><span>Scroll to explore</span><ArrowDown size={14} /></div>
        </section>

        <section className="chapter dark chapter-story" id="box-story" ref={(el) => { storyRefs.current[1] = el; }}>
          <div className="chapter-number">01 <span>/ 06</span></div>
          <div className="story-words"><p className="eyebrow light">Your box, in one minute</p><h2>Meet the<br /><em>four things</em><br />inside.</h2><p className="chapter-text">Inside this box you’ll find a soft green-rice cake, a chewy “husband-and-wife” cake, a sour-salty-sweet preserved fruit, and a tiny conical hat.</p><p className="chapter-text">None of them was invented as a souvenir. Each one grew out of a real corner of Hanoi, from weddings and autumn harvests to Tet trays and village workshops.</p><a className="text-link light-link" href="#banh-com">Meet them one by one <ArrowDown size={16} /></a></div>
          <div className="story-stamp">HANOI<br /><strong>GIFT SET</strong><br />01—06</div>
        </section>

        {storyChapters.map((chapter, index) => <section className={`story-chapter ${index % 2 ? 'dark' : ''}`} id={chapter.id} key={chapter.id} ref={(el) => { storyRefs.current[index + 2] = el; }}>
          <div className="story-chapter-inner"><div className="story-chapter-art"><span>0{index + 2}</span><div className="story-orbit"><i /></div><img src={`${import.meta.env.BASE_URL}${chapter.image}`} alt={chapter.title} /></div><article className="story-article"><p className="eyebrow">{chapter.number} / {chapter.subtitle}</p><h2>{chapter.intro}</h2>{chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{chapter.tip && <p className="story-tip">{chapter.tip}</p>}</article></div>
        </section>)}

        <section className="collection dark" id="facts" ref={(el) => { storyRefs.current[6] = el; }}>
          <div className="collection-head"><p className="eyebrow light">06 / Did you know?</p><h2>Small facts.<br /><em>Long memory.</em></h2></div>
          <div className="facts-grid">{didYouKnow.map((fact, index) => <article key={fact}><span>0{index + 1}</span><p>{fact}</p></article>)}</div>
          <div className="box-to-table">
            <div className="table-intro"><p className="eyebrow light">From our box to your table</p><h3>A little Hanoi,<br /><em>wherever you are.</em></h3><p>Open the box slowly. Each piece carries a season, a street and a small gesture of care — made to be shared around your table.</p></div>
            <div className="table-cards">
              <article><span className="table-card-number">01</span><h4>What’s inside</h4><p>Mung bean, coconut, sugar and other ingredients vary by product. Please check the packaging of each item for the complete ingredient and allergen information.</p></article>
              <article><span className="table-card-number">02</span><h4>Keep it well</h4><p>Store in a cool, dry place away from direct sunlight. For the freshest taste, enjoy each product within the best-before date shown on its packaging.</p></article>
              <article><span className="table-card-number">03</span><h4>Taking it with you</h4><p>Customs rules for food differ by country. Please check your destination’s regulations before flying with the box.</p></article>
            </div>
            <div className="our-story"><span className="eyebrow light">Our story</span><p>Gói Ghém began with a simple wish: to wrap the feeling of Hanoi into something you can hold, share and remember. We bring together familiar tastes, village craft and the quiet beauty of giving — wrapped with care, from our home to your table.</p><a href="mailto:hello@goighem.vn">Say hello <ArrowUpRight size={15} /></a></div>
          </div>
        </section>

      </main>
      <footer id="contact">
        <div className="footer-brand"><span>© 2026 GÓI GHÉM</span><small>Wrapped with care · Hanoi, Vietnam</small></div>
        <div className="footer-contact" aria-label="Thông tin liên hệ">
          <a href="https://www.facebook.com/profile.php?id=61595355951820" target="_blank" rel="noreferrer">Facebook: gói ghém</a>
          <a href="https://www.instagram.com/goighem2026/" target="_blank" rel="noreferrer">Instagram: @goighem2026</a>
          <a href="https://www.threads.net/@goighem2026" target="_blank" rel="noreferrer">Threads: @goighem2026</a>
          <a href="tel:+84948045168">Liên hệ: 0948.045.168</a>
        </div>
        <a href="#top">Back to top <ArrowUpRight size={14} /></a>
      </footer>
    </div>
  );
}

export default App;
