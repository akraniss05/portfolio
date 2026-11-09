"use strict";
/* NovaLab Portfolio Builder – local-first editor. Made with 💙 by NyxAtheris */
(function () {
const REPO = "https://github.com/akraniss05/portfolio";
const TYPES = [
 ["hero","✦","Profil / Hero"],["about","☰","Über mich"],["projects","▦","Projekte"],
 ["skills","◇","Skills"],["experience","◷","Erfahrung"],["gallery","▧","Galerie"],
 ["socials","↗","Socials"],["contact","✉","Kontakt"],["quote","❝","Zitat"],["divider","—","Trenner"]
];
const TEMPLATE_DATA = [
 {id:"developer",name:"Nova Developer",title:"Code trifft Kreativität",description:"Für Entwickler, Coding-Projekte und GitHub.",colors:["#a98bff","#151125","#211935"],role:"Full-Stack Developer",summary:"Ich verwandle Ideen in digitale Erlebnisse.",skills:"JavaScript, TypeScript, React, Python, CSS"},
 {id:"creative",name:"Nova Creative",title:"Create something bold",description:"Für Designer, Fotografen und digitale Künstler.",colors:["#f39ac7","#2b122c","#482240"],role:"Creative Designer",summary:"Design ist meine Sprache und Kreativität mein Antrieb.",skills:"Figma, Blender, Branding, Fotografie, Illustration"},
 {id:"gamer",name:"Nova Gamer",title:"Level up your profile",description:"Für Gamer, Server-Teams und Game-Developer.",colors:["#68f0db","#0a2430","#153747"],role:"Gamer & Game Developer",summary:"Gaming, Community und kreative Game-Projekte.",skills:"Minecraft, FiveM, Unity, Lua, Community"},
 {id:"minimal",name:"Nova Minimal",title:"Weniger. Aber besser.",description:"Klares Portfolio für Jobs und Bewerbungen.",colors:["#9b8060","#f2efe7","#e7e2d8"],role:"Designer & Developer",summary:"Klar im Denken, fokussiert im Machen.",skills:"Strategie, Kommunikation, Webdesign, Teamwork"},
 {id:"music",name:"Nova Music",title:"Make some noise",description:"Für Producer, DJs und Musiker.",colors:["#f3a1e9","#251238","#3d224e"],role:"Music Producer",summary:"Beats, Sounds und Ideen, die bewegen.",skills:"FL Studio, Mixing, Mastering, Sound Design"},
 {id:"futuristic",name:"Nova Futuristic",title:"Beyond the ordinary",description:"Neon, Glow und futuristische Ästhetik.",colors:["#b69aff","#120925","#27144a"],role:"Digital Creator",summary:"Building the future, one project at a time.",skills:"AI, Creative Coding, WebGL, Blender"}
];
const esc = v => String(v == null ? "" : v).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const clamp=(n,min,max)=>Math.max(min,Math.min(max,Number(n)||0));
const hex=(v,f="#ab8afd")=>/^#[0-9a-fA-F]{6}$/.test(String(v))?String(v):f;
const id=()=> "n"+(typeof crypto!=="undefined" && crypto.randomUUID ? crypto.randomUUID().replace(/-/g,"") : Math.random().toString(36).slice(2));
const safeURL=(v)=>{try{const s=String(v||"").trim();if(s.startsWith("#")&&/^#[a-z0-9_-]+$/i.test(s))return s;const u=new URL(s);return ["https:","http:","mailto:"].includes(u.protocol)?esc(s):"#"}catch{return "#"}};
const safeImage=(v)=>{const s=String(v||"");return /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/i.test(s)?s:""};
const copy=v=>JSON.parse(JSON.stringify(v));
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const toast=(msg)=>{const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),3500)};
const blockDefaults = {
 hero:()=>({name:"Dein Name",role:"Digital Creator",description:"Willkommen auf meinem Portfolio. Hier zeige ich meine Projekte und meine Ideen.",avatar:"",button:"Meine Projekte",buttonUrl:"#projects"}),
 about:()=>({title:"Über mich",text:"Hi! Ich bin kreativ, neugierig und liebe es, neue Dinge zu entwickeln. Hier kannst du mehr über mich und meine Geschichte erfahren."}),
 projects:()=>({title:"Meine Projekte",items:[{title:"Mein erstes Projekt",description:"Ein Projekt, auf das ich stolz bin.",url:"https://github.com",image:""},{title:"Ein kreatives Experiment",description:"Neue Ideen ausprobieren und etwas Besonderes schaffen.",url:"",image:""}]}),
 skills:()=>({title:"Meine Skills",items:["HTML","CSS","JavaScript","Design","Blender"]}),
 experience:()=>({title:"Erfahrung & Meilensteine",items:[{date:"2026",title:"Mein nächster Schritt",description:"Neue Fähigkeiten lernen und eigene Projekte umsetzen."}]}),
 gallery:()=>({title:"Meine Galerie",items:[]}),
 socials:()=>({title:"Meine Links",items:[{title:"GitHub",url:"https://github.com"},{title:"Discord Community",url:"https://discord.gg/livery-lab"}]}),
 contact:()=>({title:"Kontakt",text:"Lass uns zusammen etwas Großartiges schaffen.",button:"Auf Discord schreiben",url:"https://discord.gg/livery-lab"}),
 quote:()=>({text:"Everything begins with an idea.",by:"NovaLab"}),
 divider:()=>({})
};
const mkBlock=type=>({id:id(),type,data:blockDefaults[type](),visible:true});
const defaultTheme=t=>({
 accent:t.colors[0],background:t.colors[1],card:t.colors[2],text:t.id==="minimal"?"#201a23":"#f7f2ff",
 muted:t.id==="minimal"?"#635b61":"#c5b6dc",gradientA:t.colors[2],gradientB:t.colors[1],
 angle:135,heroMode:"gradient",heroImage:"",effect:"glow",radius:16,font:"Inter"
});
function newPortfolio(tId="developer",title="Mein Portfolio"){
 const t=TEMPLATE_DATA.find(x=>x.id===tId)||TEMPLATE_DATA[0];
 const blocks=["hero","about","projects","skills","socials","contact"].map(mkBlock);
 const hero=blocks[0].data;hero.role=t.role;hero.description=t.summary;hero.name="Dein Name";
 blocks[3].data.items=t.skills.split(",").map(s=>s.trim());
 if(tId==="music"){blocks.splice(3,0,mkBlock("gallery"))}
 if(tId==="minimal"){blocks.splice(3,0,mkBlock("experience"));blocks[4].data.items=["Kommunikation","Projektmanagement","Webdesign"]}
 return {id:id(),title:String(title).slice(0,80)||"Mein Portfolio",template:tId,created:Date.now(),updated:Date.now(),theme:defaultTheme(t),blocks};
}
function normalizeProject(raw){
 if(!raw||typeof raw!=="object")throw Error("Ungültiges Projektformat");
 const template=TEMPLATE_DATA.find(t=>t.id===raw.template)||TEMPLATE_DATA[0];
 const base=newPortfolio(template.id);
 base.id=id();base.title=String(raw.title||"Importiertes Portfolio").slice(0,80);
 const th=raw.theme||{};const c=base.theme;
 for(const k of ["accent","background","card","text","muted","gradientA","gradientB"])c[k]=hex(th[k],c[k]);
 c.angle=clamp(th.angle,0,360);c.radius=clamp(th.radius,0,35);
 c.heroMode=["gradient","solid","image"].includes(th.heroMode)?th.heroMode:"gradient";
 c.heroImage=safeImage(th.heroImage);c.effect=["none","glow","stars","pulse"].includes(th.effect)?th.effect:"none";
 c.font=["Inter","Georgia","Arial","monospace"].includes(th.font)?th.font:"Inter";
 if(!Array.isArray(raw.blocks))throw Error("Projekt enthält keine Bausteine");
 base.blocks=raw.blocks.slice(0,60).filter(b=>b&&blockDefaults[b.type]).map(b=>{
   const clean=mkBlock(b.type);clean.visible=b.visible!==false;
   const val=b.data&&typeof b.data==="object"?b.data:{};
   for(const k of Object.keys(clean.data)){
     if(typeof clean.data[k]==="string"){clean.data[k]=(k==="avatar"||k==="image")?safeImage(val[k]):String(val[k]||"").slice(0,1200)}
     else if(Array.isArray(clean.data[k]))clean.data[k]=Array.isArray(val[k])?val[k].slice(0,40).map(item=>{
       if(typeof item==="string")return item.slice(0,150);
       const obj={};for(const key of Object.keys(item||{})){obj[key]=key==="image"?safeImage(item[key]):String(item[key]||"").slice(0,800)}return obj;
     }):[];
   }
   return clean;
 });
 if(!base.blocks.length)base.blocks=[mkBlock("hero")];
 return base;
}
let db=null,workspace={projects:[],current:null},page="home",inspector="theme",selected=null,device="desktop",history=[],future=[],uploadTarget=null,saveTimer=null,inFlight=false;
const active=()=>workspace.projects.find(x=>x.id===workspace.current)||workspace.projects[0]||null;
const blockById=bid=>active()?.blocks.find(x=>x.id===bid);
function openDB(){return new Promise((resolve,reject)=>{if(!window.indexedDB){reject(Error("IndexedDB unavailable"));return}const req=indexedDB.open("novalab-portfolios",1);req.onupgradeneeded=()=>req.result.createObjectStore("data");req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
function dbRead(){return new Promise((resolve,reject)=>{const r=db.transaction("data","readonly").objectStore("data").get("workspace");r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function dbWrite(data){return new Promise((resolve,reject)=>{const r=db.transaction("data","readwrite").objectStore("data").put(data,"workspace");r.onsuccess=()=>resolve();r.onerror=()=>reject(r.error)})}
async function initialize(){
 try{db=await openDB();const saved=await dbRead();if(saved&&Array.isArray(saved.projects)){workspace={projects:saved.projects.slice(0,100).map(normalizeRestored),current:saved.current};workspace.projects=workspace.projects.filter(Boolean)}}catch(e){try{const s=localStorage.getItem("novalab-portfolio-backup");if(s){const saved=JSON.parse(s);workspace={projects:saved.projects||[],current:saved.current}}toast("IndexedDB nicht verfügbar – einfache Browserspeicherung aktiv.")}catch{}}
 if(!workspace.projects.length){const p=newPortfolio("developer","Mein erstes Portfolio");workspace.projects=[p];workspace.current=p.id}
 if(!active())workspace.current=workspace.projects[0].id;
 $("#newProjectTemplate").innerHTML=TEMPLATE_DATA.map(t=>'<option value="'+t.id+'">'+esc(t.name)+'</option>').join("");
 bind();renderPage("home");
}
function normalizeRestored(v){try{if(!v||!Array.isArray(v.blocks))return null;return v}catch{return null}}
function persist(){const p=active();if(p)p.updated=Date.now();$("#savedStatus").textContent="◌ Speichert …";clearTimeout(saveTimer);saveTimer=setTimeout(async()=>{try{if(db)await dbWrite(workspace);else localStorage.setItem("novalab-portfolio-backup",JSON.stringify(workspace));$("#savedStatus").textContent="● Lokal gespeichert"}catch(err){$("#savedStatus").textContent="⚠ Nicht gespeichert";toast("Speicher voll – bitte als JSON sichern!")}},450)}
function snapshot(){if(!active())return;history.push(copy(active()));if(history.length>60)history.shift();future=[];updateHistory()}
function updateHistory(){$("#undoBtn").disabled=!history.length;$("#redoBtn").disabled=!future.length}
function restoreProject(snap){const ix=workspace.projects.findIndex(p=>p.id===workspace.current);if(ix>=0)workspace.projects[ix]=snap;selected=null;persist();renderEditor()}
function undo(){if(!history.length)return;future.push(copy(active()));restoreProject(history.pop());updateHistory()}
function redo(){if(!future.length)return;history.push(copy(active()));restoreProject(future.pop());updateHistory()}
function renderPage(p){if(p==="editor"&&!active()){toast("Erstelle zuerst ein Portfolio.");p="home"}page=p;$$(".page").forEach(el=>el.classList.toggle("active",el.id==="page-"+p));$$(".nav-item").forEach(el=>el.classList.toggle("active",el.dataset.page===p));$("#currentPage").textContent=({home:"Übersicht",projects:"Meine Portfolios",templates:"Vorlagen",editor:"Portfolio-Editor",settings:"Einstellungen",help:"Support & Hilfe"})[p]||p;$("#sidebar").classList.remove("open");$("#mobileBackdrop").hidden=true;if(p==="home")renderHome();if(p==="projects")renderProjects();if(p==="templates")renderTemplates();if(p==="editor")renderEditor();scrollTo({top:0,behavior:"instant"})}
function projectCard(p){return '<article class="project-card"><div class="card-cover" style="background:linear-gradient(128deg,'+hex(p.theme?.gradientA)+','+hex(p.theme?.background)+')"><span>PORTFOLIO PROJECT</span><h4>'+esc(p.title)+'</h4></div><div><h3>'+esc(p.title)+'</h3><div class="card-meta">'+new Date(p.updated).toLocaleDateString("de-DE")+' · '+(p.blocks?.length||0)+' Bausteine</div></div><div class="card-actions"><button class="button primary" data-action="open" data-id="'+p.id+'">Bearbeiten</button><button class="button subtle" data-action="duplicate" data-id="'+p.id+'">Kopieren</button><button class="button subtle" data-action="delete" data-id="'+p.id+'" aria-label="Projekt löschen">✕</button></div></article>'}
function renderHome(){const list=[...workspace.projects].sort((a,b)=>b.updated-a.updated);$("#statProjects").textContent=list.length;$("#recentProjects").innerHTML=list.slice(0,3).map(projectCard).join("");$("#homeTemplates").innerHTML=TEMPLATE_DATA.slice(0,3).map(templateCard).join("")}
function renderProjects(){$("#projectList").innerHTML=workspace.projects.length?[...workspace.projects].sort((a,b)=>b.updated-a.updated).map(projectCard).join(""):'<div class="empty-card"><span class="big-glyph">✦</span><h3>Noch keine Projekte</h3><p>Erstelle dein erstes Portfolio mit einer unserer Designvorlagen.</p><button class="button primary" data-action="new">Erstes Portfolio erstellen</button></div>'}
function templateCard(t){return '<article class="template-card"><div class="template-cover" data-template="'+t.id+'"><span>✦ NOVALAB TEMPLATE</span><h4>'+esc(t.name)+'</h4></div><h3>'+esc(t.name)+'</h3><p class="card-description">'+esc(t.description)+'</p><div class="card-actions"><button class="button primary" data-action="from-template" data-template="'+t.id+'">Diese Vorlage nutzen →</button></div></article>'}
function renderTemplates(){$("#allTemplates").innerHTML=TEMPLATE_DATA.map(templateCard).join("")}
function renderEditor(){const p=active();if(!p)return;$("#editProjectTitle").value=p.title;$("#blockPalette").innerHTML=TYPES.map(t=>'<button class="palette-block" data-add="'+t[0]+'" title="'+esc(t[2])+'"><i>'+t[1]+'</i>'+esc(t[2])+'</button>').join("");$("#blockCounter").textContent=p.blocks.length+" Bausteine";$$("[data-device]").forEach(el=>el.classList.toggle("selected",el.dataset.device===device));renderCanvas();renderInspector();updateHistory()}
function backgroundStyle(th){if(th.heroMode==="image"&&safeImage(th.heroImage))return 'background-image:linear-gradient(#09061544,#09061544),url('+safeImage(th.heroImage)+');background-size:cover;background-position:center';if(th.heroMode==="solid")return 'background:'+hex(th.gradientA);return 'background:linear-gradient('+clamp(th.angle,0,360)+'deg,'+hex(th.gradientA)+','+hex(th.gradientB)+')'}
function styleVars(th){const fonts={Inter:"Inter,system-ui,sans-serif",Arial:"Arial,sans-serif",Georgia:"Georgia,serif",monospace:"ui-monospace,monospace"};return '--p-accent:'+hex(th.accent)+';--p-text:'+hex(th.text)+';--p-muted:'+hex(th.muted)+';--p-card:'+hex(th.card)+';--p-radius:'+clamp(th.radius,0,35)+'px;--p-font:'+fonts[th.font||"Inter"]+';--canvas-bg:'+hex(th.background)}
function renderPortfolio(p,editable=false){
 if(!p)return "";
 const blocks=p.blocks.filter(b=>b.visible!==false);
 const hero=blocks.find(b=>b.type==="hero");
 const title=(hero?.data?.name||p.title);
 const nav='<div class="site-nav"><strong>'+esc(title)+'</strong><nav><a href="#about">Über mich</a><a href="#projects">Projekte</a><a href="#contact">Kontakt</a></nav></div>';
 const content=blocks.map((b,i)=>{
 const d=b.data||{},isSelected=editable&&selected===b.id;
 const common=' data-block="'+esc(b.id)+'" data-index="'+i+'" '+(editable?'data-select="'+esc(b.id)+'" draggable="true" tabindex="0" role="button" aria-label="'+esc(b.type)+' bearbeiten"':'');
 const controls=editable?'<div class="editor-block-controls"><button data-op="up" data-bid="'+b.id+'" title="Nach oben">↑</button><button data-op="down" data-bid="'+b.id+'" title="Nach unten">↓</button><button data-op="duplicate" data-bid="'+b.id+'" title="Duplizieren">⧉</button><button data-op="delete" data-bid="'+b.id+'" title="Löschen">✕</button></div>':"";
 if(b.type==="hero"){const image=safeImage(d.avatar);return '<section class="site-hero'+(isSelected?' is-selected':'')+'" data-effect="'+esc(p.theme.effect)+'" style="'+backgroundStyle(p.theme)+'"'+common+'>'+controls+(image?'<img class="avatar" src="'+image+'" alt="Profilbild">':'<div class="avatar-fallback">✦</div>')+'<div class="role">'+esc(d.role)+'</div><h1>'+esc(d.name)+'</h1><p>'+esc(d.description)+'</p>'+(d.button?'<a class="hero-link" href="'+safeURL(d.buttonUrl)+'" '+(editable?'onclick="return false"':'')+'>'+esc(d.button)+'</a>':'')+'</section>'}
 let body="";
 switch(b.type){
 case "about":body='<div class="section-body one"><p>'+esc(d.text).replace(/\n/g,"<br>")+'</p></div>';break;
 case "projects":body='<div class="section-body">'+(d.items||[]).map(it=>'<article class="site-card">'+(safeImage(it.image)?'<img alt="" src="'+safeImage(it.image)+'">':'')+'<h3>'+esc(it.title)+'</h3><p>'+esc(it.description)+'</p>'+(it.url?'<a href="'+safeURL(it.url)+'" '+(editable?'onclick="return false"':'')+' target="_blank" rel="noopener noreferrer">Projekt ansehen ↗</a>':'')+'</article>').join("")+'</div>';break;
 case "skills":body='<div>'+((d.items||[]).map(it=>'<span class="skill-chip">'+esc(it)+'</span>').join("")||'<p>Noch keine Skills eingetragen.</p>')+'</div>';break;
 case "experience":body='<div>'+((d.items||[]).map(it=>'<div class="timeline-item"><small>'+esc(it.date)+'</small><h3>'+esc(it.title)+'</h3><p>'+esc(it.description)+'</p></div>').join("")||'<p>Füge deinen ersten Meilenstein hinzu.</p>')+'</div>';break;
 case "gallery":body='<div class="section-body">'+((d.items||[]).map(it=>'<article class="site-card">'+(safeImage(it.image)?'<img alt="'+esc(it.title)+'" src="'+safeImage(it.image)+'">':'<div style="height:80px;border-radius:9px;background:#ffffff13;display:grid;place-items:center">▧</div>')+'<h3>'+esc(it.title)+'</h3></article>').join("")||'<p>Füge deine ersten Bilder im Editor hinzu.</p>')+'</div>';break;
 case "socials":body='<div class="social-list">'+(d.items||[]).map(it=>'<a href="'+safeURL(it.url)+'" '+(editable?'onclick="return false"':'')+' target="_blank" rel="noopener noreferrer">'+esc(it.title)+' ↗</a>').join("")+'</div>';break;
 case "contact":body='<p>'+esc(d.text)+'</p><a class="hero-link" href="'+safeURL(d.url)+'" '+(editable?'onclick="return false"':'')+' target="_blank" rel="noopener noreferrer">'+esc(d.button)+'</a>';break;
 case "quote":body='<blockquote>'+esc(d.text)+'</blockquote><small>'+esc(d.by)+'</small>';break;
 case "divider":body='<hr class="divider-line">';break;
 }
 const titleText=d.title||({quote:"Zitat",divider:""}[b.type])||"";
 const anchor=b.type==="about"?"about":b.type==="projects"?"projects":b.type==="contact"?"contact":"section-"+i;
 return '<section id="'+anchor+'" class="site-section'+(isSelected?' is-selected':'')+'"'+common+'>'+controls+(titleText?'<h2>'+esc(titleText)+'</h2>':'')+body+'</section>';
 }).join("");
 return '<div class="canvas-site'+(editable?' editor-mode':'')+'" style="'+styleVars(p.theme)+'">'+nav+content+'<div class="site-footer">© '+new Date().getFullYear()+' '+esc(title)+' · Created with NovaLab Portfolio Builder</div></div>';
}
function renderCanvas(){const p=active();if(!p)return;const canvas=$("#portfolioCanvas");canvas.className="portfolio-canvas "+device;canvas.innerHTML=renderPortfolio(p,true);$("#blockCounter").textContent=p.blocks.length+" Bausteine"}
function field(name,value,opt={}){const label=opt.label||name;const type=opt.type||"text";if(type==="textarea")return '<label>'+esc(label)+'<textarea data-field="'+esc(name)+'" rows="4">'+esc(value)+'</textarea></label>';if(type==="select")return '<label>'+esc(label)+'<select data-field="'+esc(name)+'">'+opt.options.map(s=>'<option value="'+esc(s[0])+'"'+(String(value)===s[0]?' selected':'')+'>'+esc(s[1])+'</option>').join("")+'</select></label>';if(type==="upload")return '<label>'+esc(label)+'</label><button class="file-button" type="button" data-upload="'+esc(name)+'">↑ '+(value?"Bild ersetzen":"Eigenes Bild hochladen")+'</button>'+(value?'<button class="button subtle tiny" data-clear-image="'+esc(name)+'">Bild entfernen</button>':'');return '<label>'+esc(label)+'<input type="'+type+'" data-field="'+esc(name)+'" value="'+esc(value)+'" '+(type==="number"?'min="'+(opt.min||0)+'" max="'+(opt.max||360)+'"':'')+'></label>'}
function renderInspector(){const p=active();if(!p)return;const b=blockById(selected);const title=$("#inspectorTitle");const subtitle=$("#inspectorSubtitle");const out=$("#inspectorContent");
 if(b){title.textContent="Baustein bearbeiten";subtitle.textContent=(TYPES.find(t=>t[0]===b.type)||[])[2]||"Element";out.innerHTML=inspectorForBlock(b);return}
 title.textContent=inspector==="details"?"Profilinformationen":inspector==="settings"?"Layout & Effekte":"Design-Einstellungen";subtitle.textContent="Passe dein Portfolio an.";
 if(inspector==="details"){const h=p.blocks.find(b=>b.type==="hero");if(h){out.innerHTML='<p class="help">Bearbeite Namen, Rolle, Beschreibung und Profilbild im Hero-Block.</p><button class="button primary" data-select="'+h.id+'">Hero bearbeiten →</button>'}else out.innerHTML='<button class="button primary" data-add="hero">Hero-Baustein hinzufügen</button>';return}
 let th=p.theme;out.innerHTML=inspector==="settings"?
 '<h4>Layout</h4>'+field("radius",th.radius,{label:"Eckenradius (px)",type:"number",min:0,max:35})+field("font",th.font,{label:"Schriftart",type:"select",options:[["Inter","Modern / Inter"],["Georgia","Elegant / Georgia"],["Arial","Klassisch / Arial"],["monospace","Monospace"]]})+field("effect",th.effect,{label:"Hero-Effekt",type:"select",options:[["none","Keine Animation"],["glow","Soft Glow"],["stars","Sterne"],["pulse","Animierter Verlauf"]]})+
 '<h4>Empfehlung</h4><p class="help">Weniger Animationen verbessern die Performance auf älteren Handys.</p>':
 '<h4>Farben</h4>'+field("accent",th.accent,{label:"Akzentfarbe",type:"color"})+field("background",th.background,{label:"Seitenhintergrund",type:"color"})+field("card",th.card,{label:"Kartenfarbe",type:"color"})+field("text",th.text,{label:"Textfarbe",type:"color"})+field("muted",th.muted,{label:"Sekundärtext",type:"color"})+
 '<h4>Hero-Hintergrund</h4>'+field("heroMode",th.heroMode,{label:"Hintergrundtyp",type:"select",options:[["gradient","Farbverlauf"],["solid","Einfarbig"],["image","Eigenes Bild"]]})+field("gradientA",th.gradientA,{label:"Farbe 1",type:"color"})+field("gradientB",th.gradientB,{label:"Farbe 2",type:"color"})+field("angle",th.angle,{label:"Verlaufwinkel (°)",type:"number",min:0,max:360})+field("heroImage",th.heroImage,{label:"Hintergrundbild",type:"upload"});
}
function inspectorForBlock(b){
 const d=b.data||{};let html='<div class="inspect-actions"><button class="button subtle" data-op="up" data-bid="'+b.id+'">↑</button><button class="button subtle" data-op="down" data-bid="'+b.id+'">↓</button><button class="button subtle" data-op="duplicate" data-bid="'+b.id+'">⧉</button><button class="button subtle danger" data-op="delete" data-bid="'+b.id+'">Löschen</button></div><label><span>Baustein anzeigen</span><input type="checkbox" data-block-visible '+(b.visible!==false?'checked':'')+'></label>';
 const text=(name,label)=>field(name,d[name]||"",{label});const area=(name,label)=>field(name,d[name]||"",{label,type:"textarea"});
 if(b.type==="hero")html+=text("name","Anzeigename")+text("role","Deine Rolle / Tätigkeit")+area("description","Kurzbeschreibung")+field("avatar",d.avatar,{label:"Profilbild",type:"upload"})+text("button","Button-Text")+text("buttonUrl","Button-Link");
 if(b.type==="about")html+=text("title","Überschrift")+area("text","Über mich");
 if(b.type==="contact")html+=text("title","Überschrift")+area("text","Beschreibung")+text("button","Button-Text")+text("url","Kontakt-Link");
 if(b.type==="quote")html+=area("text","Zitat")+text("by","Verfasser");
 if(b.type==="divider")html+='<p class="help">Dieser Baustein erzeugt eine horizontale Trennlinie.</p>';
 if(["skills","projects","experience","gallery","socials"].includes(b.type)){
 html+=text("title","Überschrift")+"<h4>Einträge</h4>";
 (d.items||[]).forEach((item,i)=>{
 html+='<div class="surface-card" style="padding:12px;margin-bottom:9px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><strong style="font-size:11px">Eintrag '+(i+1)+'</strong><button class="button tiny subtle danger" data-remove-item="'+i+'">✕</button></div>';
 if(b.type==="skills")html+='<label>Skill<input data-item-index="'+i+'" data-item-prop="value" value="'+esc(item)+'"></label>';
 else {
 const fields=b.type==="projects"?["title","description","url"]:b.type==="experience"?["date","title","description"]:b.type==="gallery"?["title"]:["title","url"];
 for(const key of fields)html+='<label>'+esc(({title:"Titel",description:"Beschreibung",url:"Link",date:"Datum"})[key]||key)+'<input data-item-index="'+i+'" data-item-prop="'+key+'" value="'+esc(item[key]||"")+'"></label>';
 if(["gallery","projects"].includes(b.type))html+='<button class="file-button" data-upload-item="'+i+'">↑ '+(item.image?"Bild ersetzen":"Bild hinzufügen")+'</button>';
 }
 html+='</div>';
 });
 html+='<button class="button subtle" data-add-item>＋ Eintrag hinzufügen</button>';
 }
 return html;
}
function renderAfterEdit(inspect=false){renderCanvas();if(inspect)renderInspector();persist()}
function setField(name,value){const p=active(),b=blockById(selected);if(b&&Object.prototype.hasOwnProperty.call(b.data,name)){b.data[name]=String(value).slice(0,1200)}else if(Object.prototype.hasOwnProperty.call(p.theme,name)){if(["accent","background","card","text","muted","gradientA","gradientB"].includes(name))p.theme[name]=hex(value,p.theme[name]);else if(["radius","angle"].includes(name))p.theme[name]=clamp(value,0,name==="angle"?360:35);else p.theme[name]=value}renderAfterEdit(false)}
function shiftBlock(bid,delta){const p=active(),i=p.blocks.findIndex(b=>b.id===bid);if(i<0||i+delta<0||i+delta>=p.blocks.length)return;snapshot();const [b]=p.blocks.splice(i,1);p.blocks.splice(i+delta,0,b);renderAfterEdit(true)}
function blockOp(op,bid){const p=active(),i=p.blocks.findIndex(b=>b.id===bid);if(i<0)return;if(op==="up")return shiftBlock(bid,-1);if(op==="down")return shiftBlock(bid,1);snapshot();if(op==="duplicate"){const b=copy(p.blocks[i]);b.id=id();p.blocks.splice(i+1,0,b);selected=b.id}else if(op==="delete"){p.blocks.splice(i,1);selected=null}renderAfterEdit(true)}
function addBlock(type){if(!blockDefaults[type])return;const p=active();snapshot();const b=mkBlock(type);p.blocks.push(b);selected=b.id;renderAfterEdit(true);toast("Baustein hinzugefügt");}
function selectBlock(bid){if(!blockById(bid))return;selected=bid;renderCanvas();renderInspector()}
function itemOp(op,index){const b=blockById(selected);if(!b||!Array.isArray(b.data.items))return;snapshot();if(op==="remove")b.data.items.splice(index,1);else{const val={skills:"Neuer Skill",projects:{title:"Neues Projekt",description:"Beschreibung",url:"",image:""},experience:{date:"2026",title:"Meilenstein",description:"Beschreibung"},gallery:{title:"Mein Bild",image:""},socials:{title:"Neuer Link",url:"https://"}}[b.type];if(val!==undefined)b.data.items.push(copy(val))}renderAfterEdit(true)}
function openCreate(template="developer"){$("#newProjectTemplate").value=template;$("#newProjectName").value="Mein Portfolio";$("#newProjectDialog").showModal();setTimeout(()=>$("#newProjectName").focus(),50)}
function openProject(pid){const p=workspace.projects.find(x=>x.id===pid);if(!p)return;workspace.current=p.id;selected=null;history=[];future=[];inspector="theme";renderPage("editor");persist()}
function download(blob,name){const u=URL.createObjectURL(blob);const a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)}
function filename(v){return String(v||"portfolio").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,65)||"portfolio"}
function exportJSON(){const p=active();if(!p){toast("Kein Projekt gefunden");return}download(new Blob([JSON.stringify({format:"novalab-portfolio",version:1,project:p},null,2)],{type:"application/json"}),filename(p.title)+".novalab.json");toast("JSON-Backup gespeichert")}
function exportCSS(){return '*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#100c1e;font-family:system-ui,sans-serif}.canvas-site{width:100%;min-height:100vh;background:var(--canvas-bg);color:var(--p-text);font:16px/1.6 var(--p-font)}.site-nav{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:20px 7%;background:#0002;border-bottom:1px solid #ffffff20}.site-nav strong{font-size:20px}.site-nav nav{display:flex;gap:20px}.site-nav a{font-size:13px;color:var(--p-muted);text-decoration:none}.site-hero{position:relative;padding:95px 8%;text-align:center;background:var(--hero-bg)}.site-hero h1{font-size:clamp(36px,6vw,70px);line-height:1.1;margin:12px 0;color:var(--p-text)}.site-hero p{max-width:660px;margin:15px auto 23px;color:var(--p-muted)}.site-hero .role{font-weight:800;letter-spacing:.14em;color:var(--p-accent);font-size:13px;text-transform:uppercase}.avatar,.avatar-fallback{height:110px;width:110px;object-fit:cover;border-radius:28px;background:#ffffff24;border:3px solid #ffffff40;display:grid;place-items:center;margin:0 auto 17px;font-size:40px}.site-section{max-width:1100px;margin:auto;padding:53px 7%;border-top:1px solid #ffffff15}.site-section h2{font-size:clamp(25px,3vw,34px);margin:0 0 22px}.site-section p{color:var(--p-muted);white-space:normal}.section-body{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:19px}.section-body.one{grid-template-columns:1fr}.site-card{background:var(--p-card);border:1px solid #ffffff20;padding:23px;border-radius:var(--p-radius);min-width:0}.site-card h3{margin:0;font-size:19px}.site-card p{font-size:14px}.site-card img{width:100%;height:220px;object-fit:cover;border-radius:10px;margin-bottom:9px}.site-card a,.site-section a{color:var(--p-accent)}.skill-chip{display:inline-flex;border:1px solid #ffffff32;padding:8px 13px;margin:4px;background:var(--p-card);border-radius:40px;font-size:14px}.site-section blockquote{border-left:4px solid var(--p-accent);padding-left:20px;font-size:25px;margin:0 0 10px}.divider-line{border:0;border-top:1px solid #ffffff33}.social-list{display:flex;gap:10px;flex-wrap:wrap}.social-list a,.hero-link{display:inline-block;padding:11px 17px;border-radius:10px;background:var(--p-accent);color:#190e2b!important;text-decoration:none;font-weight:750}.timeline-item{border-left:3px solid var(--p-accent);padding:0 0 20px 18px}.timeline-item small{color:var(--p-accent)}.site-footer{text-align:center;padding:32px;background:#0002;color:var(--p-muted);font-size:13px}.site-hero[data-effect=glow]{box-shadow:inset 0 0 85px #a783ff24}.site-hero[data-effect=stars]:before{content:"✧  ✦  ✧  ✦  ✧";position:absolute;top:20px;left:15px;right:15px;opacity:.4}.site-hero[data-effect=pulse]{background-size:200% 200%!important;animation:gradient 8s ease-in-out infinite alternate}@keyframes gradient{from{background-position:0 50%}to{background-position:100% 50%}}@media(max-width:640px){.site-nav nav{display:none}.site-hero{padding:65px 7%}.section-body{grid-template-columns:1fr}.site-section{padding:35px 7%}}@media(prefers-reduced-motion:reduce){*{animation:none!important;scroll-behavior:auto!important}}'}
function standaloneHTML(p){const title=esc(p.title);const html=renderPortfolio(p,false);return '<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="'+title+' – erstellt mit NovaLab Portfolio Builder"><title>'+title+'</title><style>'+exportCSS()+'</style></head><body>'+html+'</body></html>'}
function crc32(bytes){let c=0xffffffff;for(const v of bytes){c^=v;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^0xffffffff)>>>0}
function zipFiles(files){const encoder=new TextEncoder();const parts=[],central=[];let offset=0;for(const [filename,content] of files){const name=encoder.encode(filename),data=encoder.encode(content),crc=crc32(data);const local=new Uint8Array(30+name.length);const dv=new DataView(local.buffer);dv.setUint32(0,0x04034b50,true);dv.setUint16(4,20,true);dv.setUint16(6,0x800,true);dv.setUint32(14,crc,true);dv.setUint32(18,data.length,true);dv.setUint32(22,data.length,true);dv.setUint16(26,name.length,true);local.set(name,30);parts.push(local,data);const cen=new Uint8Array(46+name.length);const cv=new DataView(cen.buffer);cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0x800,true);cv.setUint32(16,crc,true);cv.setUint32(20,data.length,true);cv.setUint32(24,data.length,true);cv.setUint16(28,name.length,true);cv.setUint32(42,offset,true);cen.set(name,46);central.push(cen);offset+=local.length+data.length}const centralLength=central.reduce((n,a)=>n+a.length,0);const end=new Uint8Array(22);const e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,centralLength,true);e.setUint32(16,offset,true);return new Blob([...parts,...central,end],{type:"application/zip"})}
function exportHTML(){const p=active();if(!p){toast("Kein Portfolio verfügbar");return}const readme="NovaLab Portfolio Builder – Website-Export\n\n1. ZIP entpacken.\n2. index.html im Browser öffnen.\n3. Optional: index.html in ein eigenes GitHub-Repository hochladen und GitHub Pages konfigurieren.\n\nAlle im Portfolio verwendeten hochgeladenen Bilder sind direkt in der HTML-Datei eingebettet.\nErstellt mit NovaLab Portfolio Builder · "+REPO+"\n";download(zipFiles([["index.html",standaloneHTML(p)],["README.txt",readme]]),filename(p.title)+"-website.zip");toast("Website-ZIP erstellt")}
async function importFile(file){if(!file)return;if(file.size>20*1024*1024){toast("Datei zu groß (max. 20 MB)");return}try{const input=JSON.parse(await file.text());const project=normalizeProject(input.project||input);workspace.projects.push(project);workspace.current=project.id;history=[];future=[];selected=null;persist();renderPage("editor");toast("Projekt importiert")}catch(e){toast("Import fehlgeschlagen: "+e.message)}}
function fileToImage(file){return new Promise((resolve,reject)=>{if(!file||!["image/jpeg","image/png","image/webp"].includes(file.type)){reject(Error("Bitte PNG, JPG oder WebP verwenden."));return}if(file.size>8*1024*1024){reject(Error("Bild zu groß (max. 8 MB)."));return}const reader=new FileReader();reader.onerror=()=>reject(Error("Bild konnte nicht gelesen werden."));reader.onload=()=>{const image=new Image();image.onerror=()=>reject(Error("Bild ist beschädigt."));image.onload=()=>{try{const max=1400,scale=Math.min(1,max/Math.max(image.width,image.height));const canvas=document.createElement("canvas");canvas.width=Math.max(1,Math.round(image.width*scale));canvas.height=Math.max(1,Math.round(image.height*scale));canvas.getContext("2d").drawImage(image,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL("image/webp",.8))}catch(e){reject(e)}};image.src=reader.result};reader.readAsDataURL(file)})}
async function receiveImage(file){if(!uploadTarget)return;try{const image=await fileToImage(file);snapshot();const p=active();if(uploadTarget.type==="theme")p.theme[uploadTarget.field]=image;else{const b=blockById(uploadTarget.bid);if(!b)return;if(uploadTarget.type==="item"){if(b.data.items[uploadTarget.index])b.data.items[uploadTarget.index].image=image}else b.data[uploadTarget.field]=image}renderAfterEdit(true);toast("Bild eingefügt")}catch(e){toast(e.message)}finally{uploadTarget=null;$("#imageUpload").value=""}}
function openPreview(){const p=active();if(!p)return;$("#fullPreview").innerHTML=renderPortfolio(p,false);$("#previewDialog").showModal()}
function bind(){
 document.addEventListener("click",ev=>{
 const btn=ev.target.closest("button,[data-page],[data-select]");if(!btn)return;
 if(btn.hasAttribute("data-close")){btn.closest("dialog")?.close();return}
 if(btn.dataset.page){renderPage(btn.dataset.page);return}
 if(btn.dataset.device){device=btn.dataset.device;renderCanvas();$$("[data-device]").forEach(el=>el.classList.toggle("selected",el.dataset.device===device));return}
 if(btn.dataset.inspector){inspector=btn.dataset.inspector;selected=null;renderCanvas();renderInspector();return}
 if(btn.dataset.select){selectBlock(btn.dataset.select);return}
 if(btn.dataset.add){addBlock(btn.dataset.add);return}
 if(btn.dataset.op){blockOp(btn.dataset.op,btn.dataset.bid);return}
 if(btn.hasAttribute("data-remove-item")){itemOp("remove",+btn.dataset.removeItem);return}
 if(btn.hasAttribute("data-add-item")){itemOp("add",0);return}
 if(btn.dataset.upload){uploadTarget=selected?{type:"block",bid:selected,field:btn.dataset.upload}:{type:"theme",field:btn.dataset.upload};$("#imageUpload").click();return}
 if(btn.hasAttribute("data-upload-item")){uploadTarget={type:"item",bid:selected,index:+btn.dataset.uploadItem};$("#imageUpload").click();return}
 if(btn.dataset.clearImage){snapshot();if(selected)blockById(selected).data[btn.dataset.clearImage]="";else active().theme[btn.dataset.clearImage]="";renderAfterEdit(true);return}
 const act=btn.dataset.action;if(!act)return;
 if(act==="new")return openCreate();
 if(act==="from-template")return openCreate(btn.dataset.template);
 if(act==="open")return openProject(btn.dataset.id);
 if(act==="duplicate"){const p=workspace.projects.find(x=>x.id===btn.dataset.id);if(!p)return;const cp=copy(p);cp.id=id();cp.title=p.title+" (Kopie)";cp.created=Date.now();cp.updated=Date.now();workspace.projects.push(cp);persist();renderPage(page);toast("Portfolio dupliziert");return}
 if(act==="delete"){if(!confirm("Dieses Portfolio wirklich löschen? Sichere es vorher als JSON."))return;workspace.projects=workspace.projects.filter(x=>x.id!==btn.dataset.id);if(workspace.current===btn.dataset.id)workspace.current=workspace.projects[0]?.id||null;persist();renderPage("projects");return}
 if(act==="import")return $("#projectImport").click();
 if(act==="export-json")return exportJSON();
 if(act==="export-html")return exportHTML();
 });
 $("#createProjectForm").addEventListener("submit",ev=>{ev.preventDefault();const title=$("#newProjectName").value.trim();if(!title)return;const p=newPortfolio($("#newProjectTemplate").value,title);workspace.projects.push(p);workspace.current=p.id;history=[];future=[];selected=null;inspector="theme";$("#newProjectDialog").close();persist();renderPage("editor");toast("Neues Portfolio erstellt")});
 $("#editProjectTitle").addEventListener("change",ev=>{const p=active(),title=ev.target.value.trim();if(!title){ev.target.value=p.title;return}snapshot();p.title=title.slice(0,80);persist()});
 $("#projectImport").addEventListener("change",ev=>{importFile(ev.target.files[0]);ev.target.value=""});
 $("#imageUpload").addEventListener("change",ev=>receiveImage(ev.target.files[0]));
 $("#quickPreview").addEventListener("click",openPreview);$("#previewFullscreen").addEventListener("click",openPreview);
 $("#undoBtn").addEventListener("click",undo);$("#redoBtn").addEventListener("click",redo);
 $("#menuToggle").addEventListener("click",()=>{$("#sidebar").classList.add("open");$("#mobileBackdrop").hidden=false});
 $("#mobileBackdrop").addEventListener("click",()=>{$("#sidebar").classList.remove("open");$("#mobileBackdrop").hidden=true});
 $("#newProjectBtn").addEventListener("click",()=>openCreate());
 const inspectorEl=$("#inspectorContent");inspectorEl.addEventListener("focusin",ev=>{if(ev.target.matches("[data-field],[data-item-index]")){if(!ev.target.dataset.snapshotted){snapshot();ev.target.dataset.snapshotted="true"}}});
 inspectorEl.addEventListener("input",onField);inspectorEl.addEventListener("change",onField);
 inspectorEl.addEventListener("change",ev=>{if(ev.target.matches("[data-block-visible]")){snapshot();blockById(selected).visible=ev.target.checked;renderAfterEdit(true)}});
 let dragging=null;
 $("#portfolioCanvas").addEventListener("dragstart",ev=>{const section=ev.target.closest("[data-block]");if(!section)return;dragging=section.dataset.block;ev.dataTransfer.effectAllowed="move";ev.dataTransfer.setData("text/plain",dragging)});
 $("#portfolioCanvas").addEventListener("dragover",ev=>{if(ev.target.closest("[data-block]"))ev.preventDefault()});
 $("#portfolioCanvas").addEventListener("drop",ev=>{const target=ev.target.closest("[data-block]");if(!target||!dragging)return;ev.preventDefault();const p=active(),a=p.blocks.findIndex(b=>b.id===dragging),b=p.blocks.findIndex(bl=>bl.id===target.dataset.block);if(a<0||b<0||a===b)return;snapshot();const [moved]=p.blocks.splice(a,1);p.blocks.splice(b,0,moved);renderAfterEdit(true);dragging=null});
 $("#portfolioCanvas").addEventListener("dragend",()=>{dragging=null});
 document.addEventListener("keydown",ev=>{const editable=ev.target.matches("input,textarea,select")||ev.target.isContentEditable;if((ev.ctrlKey||ev.metaKey)&&!editable){if(ev.key.toLowerCase()==="z"){ev.preventDefault();ev.shiftKey?redo():undo()}else if(ev.key.toLowerCase()==="y"){ev.preventDefault();redo()}}if(ev.key==="Escape"){$("#sidebar").classList.remove("open");$("#mobileBackdrop").hidden=true}});
}
function onField(ev){
 const e=ev.target,b=blockById(selected);
 if(e.matches("[data-field]"))setField(e.dataset.field,e.value);
 else if(e.matches("[data-item-index]")&&b){const index=+e.dataset.itemIndex,key=e.dataset.itemProp;if(!b.data.items[index]&&b.data.items[index]!=="")return;if(key==="value")b.data.items[index]=e.value.slice(0,150);else b.data.items[index][key]=e.value.slice(0,800);renderAfterEdit(false)}
}
initialize().catch(e=>{console.error(e);toast("Startfehler – bitte Seite neu laden")});
})();