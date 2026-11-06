import {createGame,mutable} from './gameState.js';
import {saveGame,loadGame,validateSave} from './saveSystem.js';
import {buyGladiator,buyItem,equip,unequip,learn,toggleSpell,sellItem,setTactic} from './economy/management.js';
import {advanceDay,assignTraining,upgrade,recover} from './base/training.js';
import {startDuel,enterTournament,nextRound,settleBattle,abandonTournament} from './competitions/arena.js';
import {stepBattle} from './combat/combatEngine.js';
import {SCREENS,shell,menu} from './ui/screens.js';
import {portraitCanvas} from './ui/characterRenderer.js';
import {drawBase,drawArena} from './ui/scenery.js';
import {createBattle} from './combat/combatEngine.js';
import {playSound} from './ui/audio.js';
const loaded=loadGame();let state=loaded.state;
const ui={started:false,page:'base',selected:state?.gladiators[0]?.id||null,shopCategory:'weapon',paused:false,watchResult:false,menuOptions:false,loadError:loaded.error,saveError:null};
const app=document.querySelector('#app');let lastTick=performance.now(),lastVisual=lastTick,previousPositions=null,animationTime=0,previousFrame=lastTick;
const demo=createGame(),menuBattle=createBattle(demo.market[0],demo.rivals[8],[],{arena:'regional'});menuBattle.fighters[0].pos=1;menuBattle.fighters[1].pos=9;
function toast(text,error=false){const container=document.querySelector('#toasts');while(container.children.length>=3)container.firstElementChild.remove();const el=document.createElement('div');el.className='toast'+(error?' error':'');el.setAttribute('role',error?'alert':'status');el.textContent=text;document.querySelector('#toasts').append(el);setTimeout(()=>el.remove(),error?7500:4200);}
function persist(){if(!state)return;const result=saveGame(state);const was=ui.saveError;ui.saveError=result.ok?null:result.error;if(!result.ok&&!was)toast(result.error,true);}
function render(){if(state&&!state.gladiators.some(g=>g.id===ui.selected))ui.selected=state.gladiators[0]?.id||null;app.innerHTML=ui.started&&state?shell(state,ui,(SCREENS[ui.page]||SCREENS.base)(state,ui)):menu(state,ui);}
function navigate(page){ui.page=page;ui.watchResult=false;render();window.scrollTo({top:0,behavior:'instant'});}
function requireSelected(){if(!ui.selected)throw new Error('Primero adquiere y selecciona un gladiador.');return ui.selected;}
const actions={
 navigate:el=>navigate(el.dataset.page),
 'menu-options':()=>{ui.menuOptions=!ui.menuOptions;render();},
 continue:()=>{if(!state)throw new Error('No hay una partida válida.');ui.started=true;lastTick=performance.now();render();},
 'new-game':()=>{if(state&&!window.confirm('¿Iniciar una nueva partida? Se reemplazará el progreso actual. Exporta una copia desde Opciones para conservarlo.'))return;state=createGame();ui.started=true;ui.page='base';ui.selected=null;ui.loadError=null;ui.watchResult=false;ui.paused=false;persist();render();toast('La Casa de Ceniza abre sus puertas. Tu primera historia espera en el mercado.');},
 'main-menu':()=>{persist();ui.started=false;render();},
 save:()=>{persist();render();if(!ui.saveError)toast('Partida guardada en este navegador.');},
 day:()=>{const summary=advanceDay(state);persist();render();toast(`Día ${state.day}. ${summary.length?summary[0]+(summary.length>1?` Y ${summary.length-1} entrenamientos más.`:''):'La casa se recupera y el mundo sigue adelante.'}`);},
 'buy-gladiator':el=>{const g=buyGladiator(state,el.dataset.id);ui.selected=g.id;persist();render();toast(`${g.name} ya forma parte de tu casa.`);playSound('buy',state.options.sound);},
 profile:el=>{ui.selected=el.dataset.id;navigate('gladiators');},
 facility:el=>{ui.facility=el.dataset.stat;navigate('training');},
 assign:el=>{assignTraining(state,requireSelected(),el.dataset.stat);persist();render();toast(el.dataset.stat?'Entrenamiento asignado. Avanza el día para obtener experiencia.':'Gladiador asignado al descanso.');},
 upgrade:el=>{upgrade(state,el.dataset.stat);persist();render();toast('La ampliación está terminada. Sus beneficios ya están activos.');},
 recover:el=>{recover(state,el.dataset.id);persist();render();toast('Salud, estado y energía restaurados. Listo para volver a la arena.');},
 'shop-tab':el=>{ui.shopCategory=el.dataset.category;render();},
 'buy-item':el=>{buyItem(state,el.dataset.id);persist();render();toast('Objeto comprado. Asígnalo desde el Inventario.');playSound('buy',state.options.sound);},
 equip:el=>{equip(state,requireSelected(),el.dataset.id);persist();render();toast('Equipamiento actualizado.');},
 unequip:el=>{unequip(state,requireSelected(),el.dataset.slot);persist();render();},
 learn:el=>{learn(state,requireSelected(),el.dataset.id);persist();render();toast('Hechizo aprendido. Consulta los conjuros preparados en la ficha.');},
 'toggle-spell':el=>{toggleSpell(state,el.dataset.gladiator,el.dataset.id);persist();render();},
 sell:el=>{sellItem(state,el.dataset.id);persist();render();toast('Objeto vendido.');},
 duel:el=>{startDuel(state,requireSelected(),el.dataset.id);startWatching();},
 tournament:el=>{enterTournament(state,requireSelected(),el.dataset.id);startWatching();},
 'next-round':()=>{nextRound(state);startWatching();},
 'abandon-tournament':()=>{if(window.confirm('¿Retirar al gladiador? No se devuelve la inscripción.')){abandonTournament(state);persist();render();}},
 watch:()=>{ui.page='arena';render();},
 'last-result':()=>{ui.watchResult=true;render();},
 pause:()=>{ui.paused=!ui.paused;lastTick=performance.now();render();},
 speed:el=>{state.options.speed=Number(el.dataset.speed);lastTick=performance.now();persist();render();},
 export:()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`casa-de-ceniza-dia-${state.day}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Copia de la partida exportada.');},
 import:()=>document.querySelector('#import-file').click()
};
function startWatching(){ui.page='arena';ui.watchResult=true;ui.paused=false;lastTick=performance.now();lastVisual=lastTick;previousPositions=null;persist();render();window.scrollTo({top:0,behavior:'instant'});}
app.addEventListener('click',event=>{const el=event.target.closest('[data-action]');if(!el||el.disabled)return;event.preventDefault();try{actions[el.dataset.action]?.(el);}catch(error){toast(error.message,true);}});
app.addEventListener('input',event=>{if(event.target.matches('[data-tactic]'))event.target.closest('label').querySelector('output').textContent=event.target.value;});
app.addEventListener('change',event=>{const el=event.target;try{if(el.id==='gladiator-select'){ui.selected=el.value;render();}else if(el.dataset.tactic){setTactic(state,el.dataset.id,el.dataset.tactic,el.value);persist();}else if(el.id==='reasoning'){state.options.reasoning=el.checked;persist();render();}else if(el.id==='sound'){state.options.sound=el.checked;playSound('buy',el.checked);persist();}}catch(error){toast(error.message,true);render();}});
document.querySelector('#import-file').addEventListener('change',async event=>{const input=event.target,file=input.files[0];if(!file)return;try{if(file.size>4000000)throw new Error('La copia es demasiado grande (máximo 4 MB).');const candidate=validateSave(JSON.parse(await file.text()));if(state&&!window.confirm('¿Reemplazar la partida actual por esta copia?'))return;state=candidate;ui.selected=state.gladiators[0]?.id||null;ui.started=true;ui.page=state.battle&&!state.battle.result?'arena':'base';ui.paused=!!state.battle&&!state.battle.result;ui.watchResult=false;persist();render();toast('Partida importada y validada.');}catch(error){toast(`No se pudo importar la partida. ${error.message}`,true);}finally{input.value='';}});
window.addEventListener('beforeunload',()=>persist());
window.addEventListener('visibilitychange',()=>{if(document.hidden){if(state?.battle&&!state.battle.result){ui.paused=true;render();}persist();}lastTick=performance.now();});
if(state?.battle?.result&&!state.battle.settled){try{settleBattle(state);persist();}catch(error){ui.loadError=error.message;}}
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function frame(now){const elapsed=Math.min(.05,(now-previousFrame)/1000);previousFrame=now;if(!ui.paused)animationTime+=elapsed;
 if(ui.started&&state?.battle&&!state.battle.result&&!ui.paused&&!document.hidden){const interval=1050/state.options.speed;if(now-lastTick>=interval){try{previousPositions=state.battle.fighters.map(f=>f.pos);const event=stepBattle(state.battle);lastVisual=now;lastTick=now;if(state.battle.result){settleBattle(state);ui.watchResult=true;playSound(state.battle.result.winner===0?'win':'hit',state.options.sound);}else if(event)playSound(event.action==='spell'?'magic':event.damage?'hit':'move',state.options.sound);persist();if(ui.page==='arena')render();}catch(error){ui.paused=true;toast('El combate se ha pausado: '+error.message,true);render();}}}
 const t=reducedMotion?0:animationTime;
 if(!ui.started){const canvas=document.querySelector('#menu-canvas');if(canvas)drawArena(canvas,menuBattle,t);}
 else{
  const base=document.querySelector('#base-canvas');if(base)drawBase(base,state,t);
  const canvas=document.querySelector('#combat-canvas');if(canvas&&state.battle)drawArena(canvas,state.battle,t,ui.paused?Math.min(1,(lastTick-lastVisual)/(1050/state.options.speed)):Math.min(1,(now-lastVisual)/(1050/state.options.speed)),previousPositions);
  for(const canvas of document.querySelectorAll('[data-character]')){const id=canvas.dataset.character;const g=[...state.gladiators,...state.market,...state.rivals].find(g=>g.id===id);if(g)portraitCanvas(canvas,g,state.inventory,t,g.training?'train':g.recovery?'rest':'idle');}
 }
 requestAnimationFrame(frame);
}
render();app.dataset.ready='true';requestAnimationFrame(frame);
