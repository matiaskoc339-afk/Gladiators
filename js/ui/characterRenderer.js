import {ITEMS,UNARMED} from '../../data/items.js';
export function equipmentOf(g,inventory=[]){return Object.fromEntries(Object.entries(g.equipment).map(([slot,id])=>[slot,ITEMS[inventory.find(u=>u.id===id)?.itemId]||ITEMS[id]||null]));}
function shape(c,fill,draw){c.beginPath();draw();c.fillStyle=fill;c.fill();c.stroke();}
function limb(c,x,y,x2,y2,color,width){c.strokeStyle='#30291f';c.lineWidth=width+5;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();c.strokeStyle=color;c.lineWidth=width;c.stroke();c.strokeStyle='#30291f';c.lineWidth=2.5;}
export function drawCharacter(c,g,x,y,scale=1,flip=false,time=0,pose='idle',gear=null){
 if(!g)return;const a=g.appearance,eq=gear||g.gear||equipmentOf(g),weapon=eq.weapon||UNARMED;
 c.save();c.translate(x,y);c.scale(flip?-scale:scale,scale);c.lineJoin='round';c.lineCap='round';c.lineWidth=2.5;c.strokeStyle='#30291f';
 c.fillStyle='#30291f25';c.beginPath();c.ellipse(0,0,35,7,0,0,Math.PI*2);c.fill();
 const wave=Math.sin(time*6),bob=pose==='walk'?Math.abs(wave)*4:Math.sin(time*2)*1.5;
 if(pose==='defeat'){c.translate(0,-12);c.rotate(-1.25);c.globalAlpha=.8;}
 if(pose==='hit')c.rotate(Math.sin(time*23)*.025);
 c.translate(0,-bob);
 const leg=pose==='walk'?wave*13:pose==='train'?Math.sin(time*5)*7:0;
 limb(c,-12,-53,-17+leg,-16,a.skin,16);limb(c,12,-53,19-leg,-16,a.skin,16);
 shape(c,eq.feet?'#76684e':'#4a3b2d',()=>{c.roundRect(-29+leg,-18,25,17,5);});shape(c,eq.feet?'#76684e':'#4a3b2d',()=>c.roundRect(7-leg,-18,27,17,5));
 shape(c,eq.chest?'#8d9b98':a.tunic,()=>{c.moveTo(-25,-108);c.quadraticCurveTo(0,-123,25,-107);c.lineTo(21,-54);c.quadraticCurveTo(0,-43,-23,-54);c.closePath();});
 c.fillStyle=eq.chest?'#c1c9ba':'#ffffff20';c.fillRect(-18,-102,11,39);
 c.strokeStyle='#4b4536';if(eq.chest){for(let i=0;i<3;i++){c.beginPath();c.moveTo(-20,-75+i*8);c.lineTo(20,-75+i*8);c.stroke();}}
 c.fillStyle='#52392a';c.fillRect(-25,-58,49,9);c.fillStyle='#d1aa57';c.fillRect(-5,-58,11,9);c.strokeStyle='#30291f';
 let handX=40,handY=-75;
 if(pose==='attack'){handX=70+Math.sin(time*16)*8;handY=-95;}
 if(pose==='cast'){handX=50;handY=-112;}
 if(pose==='defend'){handX=20;handY=-106;}
 if(pose==='celebrate'){handX=32;handY=-156+wave*3;}
 if(pose==='rest'){handX=27;handY=-64;}
 if(pose==='train'){handX=30;handY=-95+wave*20;}
 limb(c,23,-101,handX,handY,a.skin,13);
 limb(c,-22,-99,-35,-66+(pose==='walk'?wave*7:0),a.skin,13);
 if(eq.offhand){shape(c,'#7d6845',()=>{c.moveTo(-49,-92);c.lineTo(-20,-92);c.lineTo(-22,-61);c.quadraticCurveTo(-35,-43,-48,-63);c.closePath();});c.fillStyle='#c6ad73';c.beginPath();c.arc(-35,-76,5,0,Math.PI*2);c.fill();}
 c.save();c.translate(handX,handY);if(pose==='attack')c.rotate(.85);else c.rotate(.13);
 if(weapon.type==='bow'||weapon.type==='crossbow'){
  c.strokeStyle='#4c3320';c.lineWidth=5;c.beginPath();c.moveTo(4,-46);c.quadraticCurveTo(42,0,4,44);c.stroke();c.lineWidth=1;c.strokeStyle='#dfd3ad';c.beginPath();c.moveTo(4,-46);c.lineTo(4,44);c.stroke();c.strokeStyle='#30291f';
 }else if(weapon.type!=='fist'){
  const length=weapon.type==='spear'?90:weapon.type==='dagger'?27:weapon.type==='staff'?72:52;
  limb(c,0,9,0,-length,weapon.type==='staff'||weapon.type==='spear'?'#825c34':'#b8cac6',weapon.type==='staff'?7:weapon.type==='mace'?8:6);
  if(['sword','dagger'].includes(weapon.type)){shape(c,'#d2dfd8',()=>{c.moveTo(-4,-12);c.lineTo(-4,-length);c.lineTo(0,-length-10);c.lineTo(5,-length);c.lineTo(5,-12);c.closePath();});c.fillStyle='#d1aa57';c.fillRect(-11,-14,23,5);}
  if(weapon.type==='axe'){shape(c,'#bac8bd',()=>{c.moveTo(-1,-length);c.lineTo(19,-length-4);c.quadraticCurveTo(30,-length+13,15,-length+23);c.lineTo(-1,-length+15);c.closePath();});}
  if(weapon.type==='mace')shape(c,'#8c9897',()=>c.roundRect(-11,-length-7,24,25,5));
  if(weapon.type==='staff'){c.fillStyle='#b0b6db';c.shadowColor='#91b5fa';c.shadowBlur=12;c.beginPath();c.arc(0,-length-5,8,0,Math.PI*2);c.fill();c.shadowBlur=0;}
  if(weapon.type==='spear')shape(c,'#b7cfcb',()=>{c.moveTo(-7,-length+8);c.lineTo(0,-length-17);c.lineTo(7,-length+8);c.closePath();});
 }
 c.restore();
 c.fillStyle=eq.hands?'#756f58':a.skin;c.beginPath();c.arc(handX,handY,8,0,Math.PI*2);c.fill();c.stroke();
 // Oversized face, ears and distinct hair silhouettes: original vector artwork.
 c.fillStyle=a.skin;c.beginPath();c.ellipse(-29,-134,7,10,-.15,0,Math.PI*2);c.fill();c.stroke();
 shape(c,a.skin,()=>{c.moveTo(-27,-155);c.bezierCurveTo(-35,-182,31,-185,31,-151);c.lineTo(32,-125);c.quadraticCurveTo(26,-106,4,-108);c.quadraticCurveTo(-28,-108,-28,-133);c.closePath();});
 c.fillStyle='#ffffff18';c.beginPath();c.ellipse(-13,-146,10,18,0,0,Math.PI*2);c.fill();
 shape(c,a.hair,()=>{c.moveTo(-28,-140);c.lineTo(-31,-157);c.quadraticCurveTo(-33,-179,-7,-179);if(a.style===1){c.lineTo(-2,-194);c.lineTo(6,-181);c.lineTo(16,-192);c.lineTo(21,-177);}else if(a.style===2){c.quadraticCurveTo(35,-189,33,-155);}else{c.quadraticCurveTo(31,-183,32,-154);}c.lineTo(23,-151);c.lineTo(19,-166);c.quadraticCurveTo(-5,-153,-21,-162);c.lineTo(-23,-139);c.closePath();});
 if(a.style===3){c.fillStyle=a.hair;c.beginPath();c.ellipse(-30,-134,10,23,.2,0,Math.PI*2);c.fill();}
 if(eq.head){shape(c,'#99a5a0',()=>{c.moveTo(-32,-155);c.quadraticCurveTo(-30,-188,0,-189);c.quadraticCurveTo(29,-184,34,-154);c.closePath();});c.fillStyle='#cfb466';c.fillRect(-32,-158,67,7);}
 c.fillStyle='#fff5d7';c.beginPath();c.ellipse(-3,-141,7,8,0,0,Math.PI*2);c.ellipse(20,-141,6,8,0,0,Math.PI*2);c.fill();
 c.fillStyle='#2b2926';c.beginPath();c.arc(0,-140,3.3,0,Math.PI*2);c.arc(23,-140,3.1,0,Math.PI*2);c.fill();
 c.lineWidth=3;c.beginPath();c.moveTo(-10,-153);c.lineTo(4,-151+(a.face===1?3:0));c.moveTo(15,-151);c.lineTo(27,-153);c.stroke();
 shape(c,a.skin,()=>{c.moveTo(9,-141);c.lineTo(15,-128);c.lineTo(8,-127);});
 if(a.beard){shape(c,a.hair,()=>{c.moveTo(-22,-126);c.quadraticCurveTo(3,-110,29,-126);c.lineTo(24,-109);c.quadraticCurveTo(4,-95,-18,-112);c.closePath();});}
 c.strokeStyle=a.beard?'#e9b68b':'#633c2d';c.lineWidth=2;c.beginPath();c.moveTo(0,-119);c.quadraticCurveTo(11,-115+(pose==='celebrate'?5:0),20,-120);c.stroke();
 if(eq.accessory){c.fillStyle='#e5be57';c.beginPath();c.arc(0,-97,4,0,Math.PI*2);c.fill();}
 if(pose==='cast'){for(let i=0;i<4;i++){c.fillStyle=`rgba(135,184,236,${.8-i*.15})`;c.beginPath();c.arc(handX+Math.sin(time*5+i)*14,handY-23-i*7,4-i*.5,0,Math.PI*2);c.fill();}}
 c.restore();
}
export function portraitCanvas(canvas,g,inventory,time=0,pose='idle'){
 const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;c.clearRect(0,0,w,h);const gradient=c.createRadialGradient(w/2,h*.5,10,w/2,h*.5,w*.65);gradient.addColorStop(0,'#d9bc7a33');gradient.addColorStop(1,'#d9bc7a00');c.fillStyle=gradient;c.fillRect(0,0,w,h);drawCharacter(c,g,w/2,h-10,Math.min(w/110,(h-10)/200),false,time,pose,equipmentOf(g,inventory));
}
