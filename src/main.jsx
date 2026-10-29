import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, Heart, Sparkles, Volume2, VolumeX, Pause, Play, RotateCcw, X, Gift, Sun, Flower2, Moon, Star } from 'lucide-react';
import './styles.css';
import { GojoArt, Momo } from './AnimeArt';
import './anime.css';

const wishes = [
  { icon: Sun, title: 'A little more sunshine', text: 'May happiness find you in the small things — a beautiful morning, a favourite song, an unexpected smile.', color: 'peach' },
  { icon: Flower2, title: 'Room to bloom', text: 'May you grow in your own time, follow what makes you feel alive, and discover wonderful new beginnings.', color: 'sage' },
  { icon: Moon, title: 'Dreams without limits', text: 'May the wishes you whisper to the stars become the moments you get to live. Keep a little room for magic.', color: 'lavender' },
];

function Botanical({ className = '' }) {
  return <svg className={className} viewBox="0 0 300 430" fill="none" aria-hidden="true"><g stroke="#78866c" strokeWidth="1.8"><path d="M140 430C154 350 103 272 153 170S202 70 175 15M143 353C91 335 65 304 59 265M145 303C200 285 242 247 249 210M139 251C89 241 62 214 54 181M156 163C214 145 232 106 230 76"/><path d="M114 322C66 330 41 300 59 265c35 8 53 24 55 57Z" fill="#a1ae8a"/><path d="M162 292c3-43 39-63 70-57-5 35-36 56-70 57Z" fill="#bac3a3"/><path d="M124 241c-37 6-65-16-70-60 36 2 66 22 70 60Z" fill="#c5ccb3"/><path d="M178 151c4-35 23-59 52-75 12 37-17 66-52 75Z" fill="#a1ae8a"/></g><g transform="translate(158 99)"><g fill="#e5aaa9" stroke="#bc6c77" strokeWidth="1"><ellipse rx="23" ry="43" transform="rotate(-12) translate(0 -27)"/><ellipse rx="23" ry="43" transform="rotate(60) translate(0 -27)"/><ellipse rx="23" ry="43" transform="rotate(132) translate(0 -27)"/><ellipse rx="23" ry="43" transform="rotate(204) translate(0 -27)"/><ellipse rx="23" ry="43" transform="rotate(276) translate(0 -27)"/></g><circle r="20" fill="#c79859"/><circle r="11" fill="#825345"/><g fill="#f2d295"><circle cx="-6" cy="-5" r="2"/><circle cx="7" cy="4" r="2"/><circle cx="-3" cy="7" r="2"/><circle cx="6" cy="-7" r="2"/></g></g><g transform="translate(51 188) scale(.57)"><g fill="#f2d4c5" stroke="#d4a28d"><ellipse rx="22" ry="40" transform="translate(0 -25)"/><ellipse rx="22" ry="40" transform="rotate(72) translate(0 -25)"/><ellipse rx="22" ry="40" transform="rotate(144) translate(0 -25)"/><ellipse rx="22" ry="40" transform="rotate(216) translate(0 -25)"/><ellipse rx="22" ry="40" transform="rotate(288) translate(0 -25)"/></g><circle r="17" fill="#bb8c48"/></g></svg>;
}

function Cake({ blown }) {
  return <div className={`cake-scene ${blown ? 'blown' : ''}`} role="img" aria-label={blown ? 'A blue birthday cake with extinguished candles' : 'A blue birthday cake with five glowing candles'}>
    <div className="cake-orbit orbit-one"/><div className="cake-orbit orbit-two"/>
    <span className="cake-spark spark-one">✦</span><span className="cake-spark spark-two">✧</span><span className="cake-spark spark-three">✦</span>
    <div className="cake"><div className="candles">{[0,1,2,3,4].map(i => <div className="candle" key={i} style={{'--i':i}}><span className="flame"/><span className="wick"/><span className="smoke"/></div>)}</div><div className="cake-top"><div className="icing-drips">{[0,1,2,3,4,5,6].map(i=><i key={i}/>)}</div></div><div className="cake-tier tier-top"><div className="pearls">{Array.from({length:12},(_,i)=><i key={i}/>)}</div><span className="cake-heart">♡</span></div><div className="cake-tier tier-bottom"><div className="swags">{[0,1,2,3,4].map(i=><i key={i}/>)}</div><div className="bottom-pearls">{Array.from({length:17},(_,i)=><i key={i}/>)}</div></div><div className="cake-plate"/><div className="cake-stand"/></div>
    <div className="cake-caption">special-grade birthday cake <Heart size={12}/></div>
  </div>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [momos, setMomos] = useState([]);
  const [blown, setBlown] = useState(false);
  const [burst, setBurst] = useState(0);
  const [gift, setGift] = useState(null);
  const [music, setMusic] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const letter = useRef(null), closeButton = useRef(null), giftTrigger = useRef(null), audio = useRef(null), timer = useRef(null);
  const celebrate = () => setBurst(n => n + 1);
  useEffect(() => { document.documentElement.dataset.motion = reduced ? 'reduced' : 'full'; }, [reduced]);
  useEffect(() => { const query=window.matchMedia('(prefers-reduced-motion: reduce)'); const change=e=>setReduced(e.matches); query.addEventListener('change',change); return ()=>query.removeEventListener('change',change); }, []);
  useEffect(() => { if(!burst) return; const id=setTimeout(()=>setBurst(0),5000); return ()=>clearTimeout(id); }, [burst]);
  useEffect(() => { if(gift!==null) { document.body.style.overflow='hidden'; closeButton.current?.focus(); } else document.body.style.overflow=''; return ()=>{document.body.style.overflow='';}; }, [gift]);
  useEffect(() => () => { clearInterval(timer.current); audio.current?.close(); }, []);
  const toggleMusic = async () => {
    if(music) { clearInterval(timer.current); await audio.current?.suspend(); setMusic(false); return; }
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audio.current ||= new AudioContext(); await audio.current.resume();
      const melody=[261.63,261.63,293.66,261.63,349.23,329.63,261.63,261.63,293.66,261.63,392,349.23,261.63,261.63,523.25,440,349.23,329.63,293.66,466.16,466.16,440,349.23,392,349.23];
      const lengths=[.5,.5,1,1,1,2,.5,.5,1,1,1,2,.5,.5,1,1,1,1,2,.5,.5,1,1,1,2];
      const play=()=>{let time=audio.current.currentTime+.1; melody.forEach((freq,i)=>{const osc=audio.current.createOscillator(),gain=audio.current.createGain(); osc.type='sine';osc.frequency.value=freq; gain.gain.setValueAtTime(0,time); gain.gain.linearRampToValueAtTime(.075,time+.02); gain.gain.exponentialRampToValueAtTime(.001,time+lengths[i]*.48);osc.connect(gain); gain.connect(audio.current.destination);osc.start(time);osc.stop(time+lengths[i]*.5);time+=lengths[i]*.5;});};
      play(); timer.current=setInterval(play,22000);setMusic(true);
    } catch { setMusic(false); }
  };
  const openLetter=()=>{setOpened(true);celebrate();setTimeout(()=>{letter.current?.scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'});letter.current?.focus({preventScroll:true});},100);};
  const closeGift=()=>{setGift(null);giftTrigger.current?.focus();};
  return <>
    <a className="skip-link" href="#main">Skip to birthday card</a>
    <header className="site-header flex items-center justify-between"><a className="wordmark" href="#" aria-label="Birthday card home"><span className="brand-flower">✳</span> limitless wishes<span className="wordmark-dot">.</span></a><div className="flex items-center gap-2"><button className="control" onClick={()=>setReduced(v=>!v)} aria-label={reduced?'Enable animations':'Pause animations'} aria-pressed={reduced}>{reduced?<Play size={15}/>:<Pause size={15}/>}<span className="hidden sm:inline">{reduced?'Motion off':'Motion on'}</span></button><button className={`control ${music?'active':''}`} onClick={toggleMusic} aria-pressed={music} aria-label={music?'Turn music off':'Turn music on'}>{music?<Volume2 size={16}/>:<VolumeX size={16}/>}<span className="hidden sm:inline">{music?'Music on':'Music off'}</span></button></div></header>
    <main id="main">
      <section className="hero relative"><div className="hero-grain" aria-hidden="true"/><div className="hero-stars" aria-hidden="true"/>
        <div className="hero-copy"><div className="eyebrow"><span/> SPECIAL GRADE • BIRTHDAY EDITION <span/></div><p className="script hero-script">Your main-character moment.</p><h1>Happy Birthday,<br/><em>Khadiza Tur Nur</em><span className="title-star" aria-hidden="true">✧</span></h1><p className="hero-description">A new chapter. Limitless possibilities.<br className="hidden sm:block"/> An entire universe of happiness, just for you.</p><button className="primary-button" onClick={openLetter}><Heart size={17}/> Unlock your birthday letter <ArrowRight size={17}/></button><span className="tiny-note">GOJO ENERGY. BIRTHDAY MAGIC. ALL FOR YOU.</span></div>
        <div className="hero-art"><GojoArt/></div>
        <a className="scroll-cue" href="#letter"><span>THERE’S MORE TO UNWRAP</span><ArrowDown size={16}/></a>
      </section>
      <div className="ribbon" aria-hidden="true"><span>Limitless joy</span>✦<span>Main-character energy</span>✦<span>Momos & magic</span>✦<span>Limitless joy</span>✦<span>Main-character energy</span>✦<span>Momos & magic</span></div>
      <section id="letter" className="letter-section section-pad"><div className="section-heading"><span className="eyebrow">01 / A MESSAGE FROM YOUR UNIVERSE</span><h2>A special-grade wish,<br/><em>sealed just for you.</em></h2></div>
        <div className={`envelope ${opened?'is-open':''}`}>
          {!opened ? <button className="envelope-closed" onClick={openLetter} aria-label="Unseal your birthday letter"><span className="envelope-flap"/><span className="envelope-address script">For Khadiza • classified happiness</span><span className="wax-seal"><Heart size={25}/></span><span className="envelope-hint">TAP TO UNLOCK YOUR MESSAGE <ArrowRight size={13}/></span></button> : <article ref={letter} tabIndex={-1} className="letter-paper"><span className="letter-flower" aria-hidden="true">✳</span><p className="script salutation">Dear Khadiza,</p><p>Today is a lovely reminder that the world is a little brighter with you in it.</p><p>On your birthday, may you feel deeply appreciated, gently celebrated, and surrounded by the kind of happiness that stays long after the candles are blown out.</p><p>Here’s to new adventures, quiet moments of peace, unexpected laughter, and the courage to keep becoming exactly who you want to be.</p><p>You don’t have to have it all figured out. Just keep making room for the things that make your heart feel at home.</p><p className="letter-closing">May this next chapter be your most beautiful yet.</p><div className="letter-signature"><span className="script">With so much love</span><Heart size={21}/></div><span className="paper-footer">A BIRTHDAY WISH, JUST FOR YOU</span></article>}
        </div>
      </section>
      <section className="wish-section section-pad" id="wishes"><div className="section-heading"><span className="eyebrow">02 / YOUR NEXT STORY ARC</span><h2>Three wishes.<br/><em>Endless possibilities.</em></h2><p>If this little card could give you anything, it would be these.</p></div><div className="wish-grid grid md:grid-cols-3 gap-5">{wishes.map(({icon:Icon,title,text,color},i)=><article className={`wish-card ${color}`} key={title}><span className="wish-number">0{i+1}</span><div className="wish-icon"><Icon strokeWidth={1}/></div><h3>{title}</h3><p>{text}</p><span className="wish-doodle" aria-hidden="true">✧</span></article>)}</div></section>
      <section className="candle-section section-pad" id="make-a-wish"><div className="candle-art"><Cake blown={blown}/></div><div className="candle-copy"><span className="eyebrow">03 / DOMAIN EXPANSION: BIRTHDAY BLISS</span><h2>Close your eyes.<br/><em>Make a wish.</em></h2><p>Think of something wonderful. Keep it close to your heart.<br/>Now, let’s send that wish out into the universe.</p><button className="primary-button" onClick={()=>{setBlown(v=>!v);if(!blown)celebrate();}}>{blown?<RotateCcw size={17}/>:<Sparkles size={17}/>} {blown?'Light the candles again':'Blow out the candles'}</button><p className="candle-status" role="status">{blown?'Your wish is on its way. May it find you soon. ♡':'Five little flames. One very special wish.'}</p></div></section>
      <section className="momo-section section-pad"><div className="momo-heading"><span className="eyebrow">04 / THE ULTIMATE POWER-UP</span><h2>Infinite wishes.<br/><em>Extra momos.</em></h2><p>Even the strongest sorcerer needs a snack break.<br/>Tap a momo and claim a little birthday happiness.</p><span className="momo-score" role="status">{momos.length===3?'Happiness level: limitless. Another round?':momos.length+' / 3 momos enjoyed • happiness loading…'}</span>{momos.length===3&&<button className="outline-button" onClick={()=>setMomos([])}><RotateCcw size={15}/> Refill the momo plate</button>}</div><div className="momo-platter"><div className="bamboo-lines"/>{[0,1,2].map(i=><button key={i} className={'momo-button momo-'+i+(momos.includes(i)?' is-eaten':'')} aria-label={momos.includes(i)?'Momo '+(i+1)+' enjoyed':'Enjoy momo '+(i+1)} disabled={momos.includes(i)} onClick={()=>{setMomos(v=>[...v,i]);celebrate();}}>{momos.includes(i)?<span className="momo-yum">Yum!<Heart size={23}/></span>:<Momo/>}</button>)}<span className="chilli-dip" aria-hidden="true"/><span className="platter-caption">STEAMED WITH LOVE ♡</span></div></section>
      <section className="surprise-section section-pad"><span className="eyebrow">05 / YOUR BONUS REWARDS</span><h2>Your birthday <em>power-ups.</em></h2><p>Pick a present. There’s a little reminder waiting inside.</p><div className="gift-row flex justify-center">{['rose','gold','green'].map((c,i)=><button key={c} className={`gift-button gift-${c}`} onClick={e=>{giftTrigger.current=e.currentTarget;setGift(i);celebrate();}} aria-label={`Open present ${i+1}`}><span className="present"><span className="bow"/><span className="gift-lid"/><span className="gift-stripe"/><span className="gift-tag">{i+1}</span></span><span className="gift-label">{['A little love','A little courage','Limitless joy'][i]} <ArrowRight size={13}/></span></button>)}</div></section>
      <section className="finale"><span className="finale-star" aria-hidden="true">✦</span><p className="script">Throughout this universe, today is yours.</p><h2>Stay limitless,<br/><em>Khadiza.</em></h2><p>And to a year as wonderful as the wishes you make.</p><button className="outline-button" onClick={celebrate}><Sparkles size={16}/> Unleash birthday energy</button><div className="finale-bottom">HAPPY BIRTHDAY, KHADIZA TUR NUR <Heart size={12}/></div></section>
    </main><footer className="flex items-center justify-between"><span>Made with love • Unofficial anime fan tribute</span><a href="#main">Back to the magic ↑</a></footer>
    {burst>0&&!reduced&&<div key={burst} className="confetti" aria-hidden="true">{Array.from({length:70},(_,i)=><i key={i} style={{'--x':`${(i*37)%100}%`,'--delay':`${(i%9)*.09}s`,'--spin':`${i*53}deg`,'--color':['#64dfff','#9b79ff','#f6e3ac','#b4efff','#e099ff'][i%5],'--drift':`${(i%2?1:-1)*(20+i%70)}px`}}/>)}</div>}
    {burst>0&&<span className="sr-only" role="status">Happy birthday, Khadiza Tur Nur! Sending you a little extra joy.</span>}
    {gift!==null&&<div className="modal-backdrop" onClick={e=>{if(e.target===e.currentTarget)closeGift();}}><div className="gift-modal" role="dialog" aria-modal="true" aria-labelledby="gift-title" onKeyDown={e=>{if(e.key==='Escape')closeGift();if(e.key==='Tab'){e.preventDefault();closeButton.current?.focus();}}}><button ref={closeButton} className="modal-close control" aria-label="Close present" onClick={closeGift}><X size={20}/></button><Gift size={40} strokeWidth={1}/><span className="eyebrow">A REMINDER TO KEEP</span><h2 id="gift-title">{['You are worthy of beautiful things.','Your next chapter is unwritten.','There is joy waiting for you.'][gift]}</h2><p>{['May you receive love freely, celebrate your own small victories, and remember that simply being you is more than enough.','Take the little step. Try the new thing. Let this year surprise you in all the best ways. Your dreams deserve a chance.','In slow mornings and spontaneous adventures. In the people you love and the moments you make your own. May you find it everywhere.'][gift]}</p><span className="script">Keep this one close. ♡</span></div></div>}
  </>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
