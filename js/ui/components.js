import {glyph,itemArt} from './icons.js';
import {STATS,ICONS,statThreshold,RULES} from '../../data/rules.js';
import {TRAITS} from '../../data/personalities.js';
import {ITEMS,SLOTS,missingRequirements} from '../../data/items.js';
import {esc,money} from '../utils.js';
export const crest=`<svg class="crest" viewBox="0 0 64 72" aria-hidden="true"><path d="M10 5h44v40L32 65 10 45Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 12h32v30L32 56 16 42Z" fill="currentColor" opacity=".09"/><path d="m23 24 20 20m-2-22L21 44m-1-22 5 5m14 14 5 5m-3-24-5 5M25 41l-5 5" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="15" r="2" fill="currentColor"/></svg>`;
export const btn=(text,action,attrs='',cls='')=>`<button class="btn ${cls}" data-action="${action}" ${attrs}>${text}</button>`;
export const tag=(text,cls='')=>`<span class="tag ${cls}">${esc(text)}</span>`;
export const portrait=(g,cls='',width=180,height=205)=>`<canvas class="portrait ${cls}" data-character="${esc(g.id)}" width="${width}" height="${height}" aria-label="Retrato de ${esc(g.name)}"></canvas>`;
export const traits=g=>g.traits.map(t=>tag(TRAITS[t].name)).join('');
export const statGrid=(g,progress=false)=>`<div class="stats-grid">${Object.entries(STATS).map(([key,label])=>`<div class="attribute"><span>${glyph(key,16)} ${label}</span><strong>${g.stats[key]}</strong>${progress?`<div class="meter tiny"><i style="width:${Math.min(100,g.statXP[key]/statThreshold(g.stats[key])*100)}%"></i></div><small>${Math.floor(g.statXP[key])} / ${statThreshold(g.stats[key])} XP</small>`:''}</div>`).join('')}</div>`;
export const empty=(title,description,action='market',label='Visitar el mercado')=>`<div class="empty"><span class="empty-symbol">♜</span><h2>${esc(title)}</h2><p>${esc(description)}</p>${btn(label,'navigate',`data-page="${action}"`,'primary')}</div>`;
export const sectionHeading=(eyebrow,title,description='',action='')=>`<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1>${description?`<p class="lead">${description}</p>`:''}</div>${action}</div>`;
export function selectGladiator(s,ui,label='Gladiador seleccionado'){return `<label class="select-label">${label}<select id="gladiator-select" ${!s.gladiators.length?'disabled':''}>${s.gladiators.length?s.gladiators.map(g=>`<option value="${esc(g.id)}" ${ui.selected===g.id?'selected':''}>${esc(g.name)} · nivel ${g.level}</option>`).join(''):'<option>Adquiere un contrato en el mercado</option>'}</select></label>`;}
export const status=g=>g.recovery?`Recuperación · ${g.recovery} d` : g.training?`Entrena ${STATS[g.training].toLowerCase()}`:g.health<.65||g.condition<60?'Necesita descanso':'Disponible';
export const requirements=(g,item)=>Object.entries(item.requirements).map(([k,n])=>`<span class="requirement ${g?(g.stats[k]<n?'unmet':'met'):''}">${STATS[k]} ${n}${g?` / ${g.stats[k]}`:''}</span>`).join('')||'<span class="requirement">Sin requisitos</span>';
export const itemSymbol=item=>itemArt(item);
export function itemDetails(item){return item.category==='weapon'?`${item.damage} daño · alcance ${item.minRange}–${item.range}<br>${item.energy} energía · velocidad ${item.speed}${item.twoHanded?' · dos manos':''}${item.effect==='pierce'?'<br>Penetra parte de la armadura':''}`:item.category==='scroll'?`${item.mana} maná · alcance ${item.range||'propio'} · recarga ${item.cooldown} t<br>${esc(item.description)}`:`${item.protection} protección · ${item.weight} peso<br>${SLOTS[item.slot]}${item.weight?' · +'+Math.round(item.weight*2.5)+' % coste de energía':''}`;}
export const gold=n=>`<span class="coin">${glyph('gold',17)}</span> ${money(n)}`;
export const progressBar=(label,value,max,cls='')=>`<div class="resource ${cls}"><div><span>${label}</span><strong>${Math.ceil(value)} / ${max}</strong></div><div class="meter"><i style="width:${Math.max(0,Math.min(100,value/max*100))}%"></i></div></div>`;
export const missing=(g,item)=>missingRequirements(g,item).length>0;

export const weaponTypeName = type => ({sword:'Espada',dagger:'Daga',axe:'Hacha',mace:'Maza',spear:'Lanza',staff:'Bastón',bow:'Arco',crossbow:'Ballesta',fist:'Puños'}[type]||'Arma');
