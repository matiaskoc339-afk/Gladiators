import {drawCharacter,equipmentOf} from './characterRenderer.js';
export const FACILITY_POS={strength:[.17,.35],agility:[.39,.27],attack:[.63,.27],defense:[.85,.35],endurance:[.17,.79],vitality:[.39,.86],magic:[.63,.86],charisma:[.85,.79]};
function house(c,x,y,w,h,color){c.fillStyle='#1b221b25';c.fillRect(x+7,y+10,w,h);c.fillStyle=color;c.fillRect(x,y,w,h);c.strokeStyle='#3f4433';c.lineWidth=2;c.strokeRect(x,y,w,h);c.fillStyle='#605540';c.beginPath();c.moveTo(x-12,y);c.lineTo(x+w*.5,y-h*.55);c.lineTo(x+w+12,y);c.closePath();c.fill();c.stroke();c.fillStyle='#d1ad64';c.fillRect(x+w*.4,y+h*.45,w*.2,h*.55);}
export function drawBase(canvas,s,time){const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;c.clearRect(0,0,w,h);c.fillStyle='#56634b';c.fillRect(0,0,w,h);
 for(let i=0;i<100;i++){const x=(i*137%w),y=(i*97%h);c.fillStyle=i%3?'#697453':'#4a5b43';c.beginPath();c.ellipse(x,y,20+(i%7)*4,5,0,0,Math.PI*2);c.fill();}
 // A lived-in walled courtyard with a central sand training ring.
 c.fillStyle='#c3b184';c.fillRect(50,26,w-100,14);c.fillRect(24,38,25,h-70);c.fillRect(w-49,38,25,h-70);c.fillRect(50,h-44,w-100,18);
 c.strokeStyle='#665f49';c.lineWidth=2;for(let i=50;i<w-40;i+=32){c.strokeRect(i,26,30,14);c.strokeRect(i,h-44,30,18);}
 for(const [x,y] of [[25,10],[w-73,10],[25,h-66],[w-73,h-66]]){c.fillStyle='#999276';c.fillRect(x,y,48,49);for(let i=0;i<3;i++)c.fillRect(x+i*18,y-7,11,12);}
 c.fillStyle='#b4a078';c.beginPath();c.ellipse(w*.5,h*.55,w*.27,h*.19,0,0,Math.PI*2);c.fill();c.strokeStyle='#d4be8c';c.lineWidth=9;c.stroke();
 c.strokeStyle='#c2ae82';c.lineWidth=26;c.beginPath();c.moveTo(w*.5,35);c.lineTo(w*.5,h-30);c.moveTo(49,h*.55);c.lineTo(w-49,h*.55);c.stroke();
 house(c,w*.42,59,175,59,'#b0a17a');
 c.fillStyle='#4e5a44';c.fillRect(w*.47,48,55,38);c.fillStyle='#dfb967';c.font='bold 15px Georgia';c.textAlign='center';c.fillText('CC',w*.5,73);
 for(const [key,[px,py]]of Object.entries(FACILITY_POS)){const x=px*w,y=py*h,level=s.buildings[key];c.fillStyle='#45503a';c.fillRect(x-69,y-43,138,73);c.strokeStyle=level>1?'#cab074':'#7d8261';c.lineWidth=3;c.strokeRect(x-69,y-43,138,73);
 if(key==='strength'){c.fillStyle='#423d32';c.fillRect(x-27,y-23,55,9);for(const side of [-1,1]){c.fillStyle='#858276';c.fillRect(x+side*23-6,y-36,13,34);}}
 if(key==='agility'){c.strokeStyle='#a6b086';c.lineWidth=5;for(let j=0;j<4;j++){c.beginPath();c.moveTo(x-45+j*30,y-12);c.lineTo(x-45+j*30,y+15);c.stroke();}c.strokeStyle='#ccbb8c';c.beginPath();c.moveTo(x-48,y-12);c.lineTo(x+48,y-12);c.stroke();}
 if(key==='attack'){c.fillStyle='#aa8d5a';c.beginPath();c.arc(x,y-10,27,0,Math.PI*2);c.fill();for(let j=3;j>=1;j--){c.strokeStyle=j%2?'#5e4636':'#d4c9a3';c.lineWidth=5;c.beginPath();c.arc(x,y-10,j*7,0,Math.PI*2);c.stroke();}}
 if(key==='defense'){for(let j=0;j<3;j++){c.fillStyle='#79857d';c.fillRect(x-43+j*30,y-31,22,35);c.fillStyle='#c5ad72';c.fillRect(x-35+j*30,y-28,5,28);}}
 if(key==='endurance'){c.strokeStyle='#b4a377';c.lineWidth=6;c.beginPath();c.ellipse(x,y-8,46,22,0,0,Math.PI*2);c.stroke();}
 if(key==='vitality'){c.fillStyle='#aac4a1';c.fillRect(x-45,y-27,90,31);c.fillStyle='#d9c9a3';c.fillRect(x-44,y-28,20,30);c.fillStyle='#b4cbd2';c.fillRect(x+33,y-34,12,16);}
 if(key==='magic'){c.strokeStyle='#91aaa4';c.lineWidth=2;c.beginPath();c.ellipse(x,y-4,47,23,0,0,Math.PI*2);c.stroke();c.fillStyle=`rgba(140,190,219,${.45+Math.sin(time*2)*.15})`;c.beginPath();c.arc(x,y-19,16+Math.sin(time*2)*3,0,Math.PI*2);c.fill();}
 if(key==='charisma'){c.fillStyle='#9d8858';c.fillRect(x-39,y-10,78,25);c.fillStyle='#5a4e38';c.fillRect(x-21,y-35,42,28);}
 const trainees=s.gladiators.filter(g=>g.training===key);trainees.forEach((g,i)=>drawCharacter(c,g,x-23+i*21,y+27,.32,false,time,'train',equipmentOf(g,s.inventory)));
 }
 const resting=s.gladiators.filter(g=>!g.training);resting.slice(0,6).forEach((g,i)=>drawCharacter(c,g,w*.4+i*42,h*.57+9,.37,i%2===0,time,g.recovery?'rest':'idle',equipmentOf(g,s.inventory)));
 // Torch flames and pennants move without external assets.
 for(const x of [75,w-75]){c.fillStyle='#42392b';c.fillRect(x,h*.54,5,29);c.fillStyle='#e5a550';c.beginPath();c.ellipse(x+2,h*.54-5,6,10+Math.sin(time*8+x)*2,0,0,Math.PI*2);c.fill();}
}
export function drawArena(canvas,b,time,progress=1,previous=null){const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;const imperial=b.meta.arena==='imperial',stone=b.meta.arena==='stone';
 const sky=c.createLinearGradient(0,0,0,h);sky.addColorStop(0,imperial?'#343849':stone?'#535c65':'#81928f');sky.addColorStop(1,'#d0b990');c.fillStyle=sky;c.fillRect(0,0,w,h);
 c.fillStyle='#dcd4b62a';c.beginPath();c.arc(w*.8,64,32,0,Math.PI*2);c.fill();
 c.fillStyle='#5b6059';for(let i=0;i<12;i++){const x=i*100-10;c.fillRect(x,70,80,165);c.fillStyle='#3e4947';c.beginPath();c.roundRect(x+16,97,48,104,[22,22,0,0]);c.fill();c.fillStyle='#5b6059';}
 c.fillStyle='#737563';c.fillRect(0,180,w,67);
 for(let row=0;row<3;row++)for(let i=0;i<60;i++){const x=i*19+row*6,y=184+row*21+Math.sin(time*2+i)*2;c.fillStyle=['#b29d79','#8b5846','#a1a08a','#747c83'][i%4];c.beginPath();c.arc(x,y,5,0,Math.PI*2);c.fill();c.fillRect(x-4,y+4,8,8);}
 c.fillStyle='#9d9477';c.fillRect(0,248,w,42);c.strokeStyle='#6b6958';c.lineWidth=2;for(let x=0;x<w;x+=64)c.strokeRect(x,251,64,35);
 c.fillStyle='#bb9f70';c.fillRect(0,290,w,h-290);c.fillStyle='#cbb483';c.beginPath();c.ellipse(w/2,390,w*.48,58,0,0,Math.PI*2);c.fill();
 for(let i=0;i<35;i++){c.fillStyle='#927c552b';c.fillRect(i*113%w,304+i*31%(h-315),3,2);}
 for(const x of [95,w-95]){c.fillStyle=imperial?'#6c4b72':'#744a3b';c.beginPath();c.moveTo(x-24,80);c.lineTo(x+24,80);c.lineTo(x+24,183+Math.sin(time*2)*3);c.lineTo(x,200);c.lineTo(x-24,183);c.closePath();c.fill();c.fillStyle='#dab76a';c.font='24px Georgia';c.textAlign='center';c.fillText('✦',x,128);}
 const positions=b.fighters.map((f,i)=>{const before=previous?.[i]??f.pos;return before+(f.pos-before)*Math.min(1,progress*1.8);});
 b.fighters.forEach((f,i)=>{const x=115+positions[i]/10*(w-230);drawCharacter(c,f,x,h-47,1.15,i===1,time,f.animation,f.gear);if(Object.keys(f.buffs).length){c.strokeStyle=f.buffs.shield?'#a5c1e7':'#d3bb69';c.lineWidth=2;c.globalAlpha=.6;c.beginPath();c.ellipse(x,h-151,45,99,0,0,Math.PI*2);c.stroke();c.globalAlpha=1;}});
 const e=b.lastEvent;if(e&&progress<1&&e.action==='spell'){const from=115+positions[e.actor]/10*(w-230),to=115+positions[1-e.actor]/10*(w-230),x=from+(to-from)*progress;c.fillStyle='#b8d4e8';c.shadowColor='#8ebdf8';c.shadowBlur=18;c.beginPath();c.arc(x,h-152,8,0,Math.PI*2);c.fill();c.shadowBlur=0;}
 if(e?.damage&&progress<1){const target=1-e.actor,x=115+positions[target]/10*(w-230);c.fillStyle='#fff0c9';c.font='bold 26px Georgia';c.textAlign='center';c.globalAlpha=1-progress;c.fillText(`−${e.damage}`,x,h-230-progress*30);c.globalAlpha=1;}
}
