import {ITEMS,UNARMED} from '../../data/items.js';
export function equipmentOf(g,inventory=[]){return Object.fromEntries(Object.entries(g.equipment).map(([slot,id])=>[slot,ITEMS[inventory.find(u=>u.id===id)?.itemId]||ITEMS[id]||null]));}
const TAU=Math.PI*2;
function tint(hex,amount){const n=parseInt(hex.slice(1),16);return `rgb(${[n>>16,(n>>8)&255,n&255].map(v=>Math.max(0,Math.min(255,v+amount))).join(',')})`;}
function grad(c,x,y,w,h,colors){const g=c.createLinearGradient(x,y,w,h);colors.forEach((color,i)=>g.addColorStop(i/(colors.length-1),color));return g;}
function path(c,points,fill,stroke='#1b1919',width=2.5){c.beginPath();points(c);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
function ellipse(c,x,y,rx,ry,fill,stroke=null,width=2){path(c,p=>p.ellipse(x,y,rx,ry,0,0,TAU),fill,stroke,width);}
function line(c,points,color,width=2){path(c,p=>{p.moveTo(...points[0]);for(const point of points.slice(1))p.lineTo(...point);},null,color,width);}
function capsule(c,a,b,r,fill){line(c,[a,b],'#1e1a19',r+5);line(c,[a,b],fill,r);line(c,[[a[0]-r*.18,a[1]],[b[0]-r*.18,b[1]]],'#ffffff13',Math.max(2,r*.22));}
function hand(c,x,y,skin,glove){ellipse(c,x,y,8,9,glove?grad(c,x-5,y-7,x+6,y+7,['#b3b9ac','#5c6662']):skin,'#251e1a');line(c,[[x+2,y-4],[x+4,y+3]],'#2c242470',1.5);}
export function drawWeapon(c,weapon,x,y,angle=0,time=0){
 if(!weapon||weapon.type==='fist')return;
 c.save();c.translate(x,y);c.rotate(angle);c.lineCap='round';c.lineJoin='round';
 const rare=weapon.price>450,metal=grad(c,-10,0,12,0,['#69767c','#d5e3df','#81979b']),gold=rare?'#e4bb6c':'#b49b65';
 const length=weapon.type==='dagger'?40:weapon.type==='spear'?124:weapon.type==='staff'?112:rare?91:74;
 if(weapon.type==='bow'){
  path(c,p=>{p.moveTo(-3,-58);p.bezierCurveTo(43,-47,43,35,-3,50);},null,'#241b16',9);
  path(c,p=>{p.moveTo(-3,-58);p.bezierCurveTo(43,-47,43,35,-3,50);},null,'#a16c3e',5);
  line(c,[[-3,-58],[9,-5],[-3,50]],'#ebd8a8',1.3);line(c,[[-13,8],[50,-22]],'#9a7750',3);
  path(c,p=>{p.moveTo(50,-22);p.lineTo(44,-22);p.lineTo(48,-16);p.closePath();},'#d1d4c1');
 }else if(weapon.type==='crossbow'){
  capsule(c,[0,20],[0,-38],10,'#775037');line(c,[[-31,-26],[0,-39],[34,-24]],'#b19862',6);line(c,[[-31,-26],[0,-10],[34,-24]],'#d7ccab',1.5);line(c,[[0,-47],[0,-8]],'#e2e7d6',3);
 }else if(weapon.type==='staff'){
  path(c,p=>{p.moveTo(-3,24);p.lineTo(-4,-length+14);p.quadraticCurveTo(-23,-length-3,-9,-length-15);p.lineTo(6,-length-22);p.lineTo(17,-length-8);p.lineTo(6,-length+10);p.lineTo(3,24);p.closePath();},grad(c,-8,0,13,0,['#3b2d2a','#ab8150','#65503c']));
  for(let i=0;i<4;i++)line(c,[[-5,-10-i*17],[5,-14-i*17]],gold,2);
  c.shadowColor='#55d6ea';c.shadowBlur=14;path(c,p=>{p.moveTo(-6,-length-8);p.lineTo(3,-length-20);p.lineTo(11,-length-8);p.lineTo(2,-length);p.closePath();},'#7adce8','#d0f6e7',1.5);c.shadowBlur=0;
 }else{
  capsule(c,[0,20],[0,-length+12],weapon.type==='spear'?5:7,'#765037');
  if(weapon.type==='axe'){
   path(c,p=>{p.moveTo(0,-length+5);p.lineTo(-12,-length-5);p.quadraticCurveTo(-42,-length-13,-44,-length-2);p.quadraticCurveTo(-45,-length+22,-30,-length+37);p.lineTo(-5,-length+24);p.lineTo(14,-length+30);p.quadraticCurveTo(26,-length+15,13,-length+6);p.closePath();},metal);
   path(c,p=>{p.moveTo(-42,-length-2);p.quadraticCurveTo(-45,-length+22,-30,-length+34);},null,'#e4efdf',3);
  }else if(weapon.type==='mace'){
   path(c,p=>{p.moveTo(-13,-length-4);p.lineTo(-7,-length-12);p.lineTo(9,-length-12);p.lineTo(17,-length-2);p.lineTo(14,-length+22);p.lineTo(6,-length+29);p.lineTo(-13,-length+23);p.closePath();},metal);
   line(c,[[-7,-length-8],[-6,-length+22]],gold,4);line(c,[[7,-length-8],[8,-length+22]],'#e0e7d4',3);
  }else if(weapon.type==='spear'){
   path(c,p=>{p.moveTo(0,-length-26);p.lineTo(-12,-length+5);p.lineTo(-1,-length+21);p.lineTo(10,-length+3);p.closePath();},metal);line(c,[[0,-length-18],[0,-length+12]],'#e8edda',1.5);line(c,[[-5,-length+22],[5,-length+22]],gold,4);
  }else{
   const width=weapon.twoHanded?10:weapon.type==='dagger'?5:7;
   path(c,p=>{p.moveTo(-width,-16);p.lineTo(-width,-length+8);p.lineTo(0,-length-8);p.lineTo(width,-length+8);p.lineTo(width,-16);p.closePath();},metal);
   line(c,[[0,-length],[0,-19]],'#eef5e4',2);
   path(c,p=>{p.moveTo(-19,-17);p.lineTo(-17,-24);p.lineTo(-7,-21);p.lineTo(8,-21);p.lineTo(18,-25);p.lineTo(21,-17);p.lineTo(8,-13);p.lineTo(-7,-13);p.closePath();},gold);
   for(let i=0;i<4;i++)line(c,[[-3,i*5-6],[4,i*5-8]],'#c4a572',1.4);
   ellipse(c,0,22,7,5,gold,'#30241c');
   if(rare){c.shadowColor='#e7c577';c.shadowBlur=8;line(c,[[-2,-length+20],[-2,-length+44]],'#f4d68b',1.4);c.shadowBlur=0;}
  }
 }
 c.restore();
}
export function drawCharacter(c,g,x,y,scale=1,flip=false,time=0,pose='idle',gear=null){
 if(!g)return;
 const a=g.appearance,eq=gear||g.gear||equipmentOf(g),weapon=eq.weapon||UNARMED;
 c.save();c.translate(x,y);c.scale(flip?-scale:scale,scale);c.lineJoin='round';c.lineCap='round';
 const shadow=c.createRadialGradient(0,0,2,0,0,49);shadow.addColorStop(0,'#130f0cb0');shadow.addColorStop(1,'#130f0c00');ellipse(c,0,0,54,12,shadow);
 c.scale(1+Math.min(.13,Math.max(-.035,(g.stats.strength-8)*.006)),1);
 const wave=Math.sin(time*7),breath=Math.sin(time*2.3+(a.face||0)),walking=pose==='walk',training=pose==='train';
 const pulse=Math.sin(time*14),attack=pose==='attack';
 if(pose==='defeat'){c.translate(-12,-13);c.rotate(-1.27);}
 if(pose==='hit')c.translate(-5-Math.abs(pulse)*4,0);
 const stride=walking?wave*14:training?wave*3:0;
 c.translate(attack?7:0,walking?-Math.abs(wave)*4:breath*.8);
 const skin=grad(c,-35,-170,35,-80,[tint(a.skin,30),a.skin,tint(a.skin,-34)]);
 const cloth=grad(c,-32,-130,32,-56,[tint(a.tunic,18),a.tunic,tint(a.tunic,-38)]);
 const steel=grad(c,-35,-120,35,-60,['#b2c0b9','#62787b','#39484e']);
 const leather=grad(c,-30,-120,35,-60,['#99714a','#674b36','#382c28']);
 // Strong, articulated legs, layered skirt and strapped greaves.
 capsule(c,[-18,-66],[-22-stride,-34],19,skin);capsule(c,[-22-stride,-34],[-25-stride,-9],16,skin);
 capsule(c,[17,-65],[24+stride,-32],20,skin);capsule(c,[24+stride,-32],[26+stride,-8],16,skin);
 for(const [lx,knee]of [[-25-stride,-22-stride],[26+stride,24+stride]]){
  path(c,p=>{p.moveTo(lx-9,-18);p.lineTo(lx+8,-18);p.lineTo(lx+13,-7);p.lineTo(lx+21,-3);p.quadraticCurveTo(lx+21,4,lx+12,5);p.lineTo(lx-12,4);p.lineTo(lx-12,-9);p.closePath();},'#3c302a');
  line(c,[[lx-10,-1],[lx+16,0]],'#ad8b55',2);
  if(eq.feet){path(c,p=>{p.moveTo(knee-9,-41);p.lineTo(knee+10,-41);p.lineTo(lx+8,-16);p.lineTo(lx-9,-13);p.closePath();},steel);line(c,[[knee-9,-36],[knee+10,-36]],'#c9ab70',2);}
  else for(let i=0;i<2;i++)line(c,[[lx-9,-21-i*9],[lx+8,-24-i*9]],'#72523a',3);
 }
 const arcane=['swindler','apprentice','warlock','healer'].includes(g.background);
 if(arcane&&!eq.chest){
  path(c,p=>{p.moveTo(-25,-88);p.lineTo(23,-87);p.quadraticCurveTo(23,-47,38,-21);p.lineTo(22,-13);p.lineTo(4,-19);p.lineTo(-12,-13);p.lineTo(-35,-20);p.quadraticCurveTo(-23,-52,-25,-88);p.closePath();},cloth,'#211d1b',2.5);
  for(let j=0;j<4;j++)path(c,p=>{p.moveTo(-18+j*11,-70);p.quadraticCurveTo(-15+j*12,-40,-21+j*16,-22);},null,j%2?'#c7b77e25':'#111c2150',2);
  line(c,[[-34,-21],[-12,-15],[4,-21],[22,-15],[36,-23]],'#c6ab71',2.5);
 }
 // Back arm and cloak silhouette create depth before the torso.
 let backHand=[-39,-77],frontHand=[47,-78],elbow=[42,-104];
 if(walking){backHand=[-41-wave*10,-78];frontHand=[45+wave*10,-78];}
 if(attack){frontHand=[76+pulse*9,-112];elbow=[51,-115];backHand=[-31,-92];}
 if(pose==='defend'){frontHand=[28,-120];elbow=[40,-107];backHand=[-19,-113];}
 if(pose==='cast'){frontHand=[59,-126+breath*2];elbow=[42,-111];backHand=[-34,-99];}
 if(pose==='celebrate'){frontHand=[39,-184+wave*3];elbow=[45,-153];backHand=[-45,-150];}
 if(pose==='rest'){frontHand=[32,-71];elbow=[39,-93];backHand=[-33,-71];}
 if(training){frontHand=[45,-103+wave*18];elbow=[39,-108];backHand=[-34,-86-wave*15];}
 path(c,p=>{p.moveTo(-29,-135);p.quadraticCurveTo(-48,-109,-39,-56);p.lineTo(-29,-68);p.lineTo(-21,-56);p.lineTo(-8,-126);p.closePath();},tint(a.tunic,-40));
 capsule(c,[-29,-126],[-40,-104],18,skin);capsule(c,[-40,-104],backHand,15,skin);hand(c,...backHand,skin,eq.hands);
 // Fitted breastplate or leather harness, with distinct material tiers.
 path(c,p=>{p.moveTo(-30,-137);p.quadraticCurveTo(-13,-146,2,-141);p.lineTo(27,-134);p.quadraticCurveTo(34,-115,27,-92);p.lineTo(24,-66);p.quadraticCurveTo(0,-55,-26,-67);p.lineTo(-28,-97);p.quadraticCurveTo(-37,-124,-30,-137);p.closePath();},eq.chest?(eq.chest.weight>=2?steel:leather):cloth);
 path(c,p=>{p.moveTo(-22,-130);p.quadraticCurveTo(-13,-139,0,-136);p.lineTo(-4,-72);p.lineTo(-23,-73);p.closePath();},'#ffffff0e',null);
 if(eq.chest?.weight>=2){
  path(c,p=>{p.moveTo(-24,-121);p.quadraticCurveTo(-5,-111,1,-109);p.quadraticCurveTo(16,-111,24,-119);p.lineTo(21,-99);p.lineTo(0,-91);p.lineTo(-25,-100);p.closePath();},steel,'#263237',2);
  for(let j=0;j<3;j++)path(c,p=>{p.moveTo(-24,-93+j*8);p.lineTo(0,-86+j*8);p.lineTo(24,-94+j*8);},null,'#b3b8a45c',2);
  line(c,[[0,-126],[0,-96]],'#d5ba78',2);ellipse(c,0,-118,5,5,'#c4a668','#4c4130',1);
 }else{
  path(c,p=>{p.moveTo(-26,-134);p.lineTo(-18,-137);p.lineTo(24,-83);p.lineTo(23,-72);p.closePath();},'#69442d','#2b211d',1.5);
  for(let i=0;i<4;i++)ellipse(c,-20+i*10,-129+i*13,1.7,1.7,'#be9c61');
  line(c,[[-4,-125],[-4,-79]],'#1f211e50',1.5);
 }
 // Segmented leather apron and bronze belt.
 for(let i=0;i<5;i++){const xx=-28+i*12;path(c,p=>{p.moveTo(xx,-66);p.lineTo(xx+11,-66);p.lineTo(xx+10,-45);p.lineTo(xx+5,-41);p.lineTo(xx,-46);p.closePath();},i%2?'#5a3a28':'#73503a','#251c18',1.5);ellipse(c,xx+5,-48,1.5,1.5,'#b99a5e');}
 path(c,p=>{p.moveTo(-28,-72);p.lineTo(27,-72);p.lineTo(28,-61);p.lineTo(-28,-60);p.closePath();},'#3c3024');path(c,p=>p.rect(-6,-74,14,15),'#c5a366','#3c3024',2);path(c,p=>p.rect(-2,-70,6,7),'#433329',null);
 if(['thief','smuggler','spy','poacher','saboteur'].includes(g.background)&&!eq.chest){
  path(c,p=>{p.moveTo(-22,-131);p.lineTo(22,-128);p.lineTo(12,-108);p.lineTo(-15,-119);p.lineTo(-28,-104);p.lineTo(-31,-120);p.closePath();},tint(a.tunic,30),'#2c2d23',2);
  line(c,[[-17,-124],[7,-114]],'#d6ca9633',1.5);
 }
 // Neck, collar and shoulder armour.
 capsule(c,[-1,-146],[-1,-134],18,skin);line(c,[[-21,-135],[-2,-125],[22,-134]],'#ae935d',4);
 capsule(c,[28,-127],elbow,21,skin);capsule(c,elbow,frontHand,16,skin);
 const shoulderFill=eq.chest?.weight>=2?steel:leather;
 path(c,p=>{p.moveTo(17,-138);p.quadraticCurveTo(35,-143,43,-126);p.lineTo(39,-114);p.lineTo(24,-117);p.closePath();},shoulderFill);line(c,[[24,-134],[37,-129]],'#d5bc8580',2);
 path(c,p=>{p.moveTo(frontHand[0]-9,frontHand[1]-14);p.lineTo(frontHand[0]+7,frontHand[1]-15);p.lineTo(frontHand[0]+10,frontHand[1]-2);p.lineTo(frontHand[0]-7,frontHand[1]+2);p.closePath();},eq.hands?steel:'#60432f');line(c,[[frontHand[0]-7,frontHand[1]-9],[frontHand[0]+7,frontHand[1]-11]],'#ba9d62',2);
 if(eq.offhand){
  c.save();c.translate(backHand[0]+1,backHand[1]+2);c.rotate(pose==='defend'?-.25:.1);
  path(c,p=>{p.moveTo(0,-34);p.lineTo(25,-24);p.lineTo(22,12);p.quadraticCurveTo(18,29,0,38);p.quadraticCurveTo(-19,29,-23,12);p.lineTo(-25,-24);p.closePath();},grad(c,-25,-25,25,25,['#72918d','#354f52','#202f35']),'#b99b60',4);
  line(c,[[0,-28],[0,29]],'#aa8d52',4);line(c,[[-20,-9],[20,-9]],'#aa8d52',4);ellipse(c,0,-8,8,9,steel,'#d0b374',2);c.restore();
 }
 const angle=attack?1.12+Math.sin(time*14)*.22:pose==='celebrate'?-.3:pose==='defend'?.2:-.19;
 drawWeapon(c,weapon,...frontHand,angle,time);hand(c,...frontHand,skin,eq.hands);
 // Sculpted face: compact eyes, jaw, nose planes, brows, scars and beard variants.
 c.save();c.translate(pose==='hit'?-2:0,pose==='rest'?3:0);c.rotate(pose==='rest'?.09:attack?.035:0);
 ellipse(c,-23,-163,6,10,skin,'#33251f');ellipse(c,-24,-162,2,5,tint(a.skin,-28));
 path(c,p=>{p.moveTo(-22,-187);p.quadraticCurveTo(-9,-202,14,-194);p.quadraticCurveTo(29,-187,26,-164);p.lineTo(25,-149);p.lineTo(13,-138);p.quadraticCurveTo(-3,-133,-17,-147);p.lineTo(-23,-167);p.closePath();},grad(c,-25,-189,28,-144,[tint(a.skin,32),a.skin,tint(a.skin,-29)]));
 path(c,p=>{p.moveTo(9,-188);p.lineTo(24,-179);p.lineTo(24,-153);p.lineTo(12,-141);p.lineTo(5,-145);p.lineTo(13,-167);p.closePath();},tint(a.skin,-17),null);
 const hair=a.hair;
 if(a.style===1){path(c,p=>{p.moveTo(-17,-187);p.lineTo(-13,-204);p.lineTo(-5,-201);p.lineTo(0,-214);p.lineTo(10,-205);p.lineTo(19,-207);p.lineTo(23,-192);p.lineTo(12,-190);p.closePath();},grad(c,-15,-210,22,-185,[tint(hair,30),hair,tint(hair,-25)]));}
 else if(a.style===2){path(c,p=>{p.moveTo(-23,-172);p.quadraticCurveTo(-34,-199,-4,-203);p.quadraticCurveTo(24,-209,29,-185);p.lineTo(20,-174);p.lineTo(16,-192);p.quadraticCurveTo(-3,-182,-16,-188);p.lineTo(-16,-166);p.closePath();},grad(c,-23,-200,24,-166,[tint(hair,20),hair,tint(hair,-25)]));for(let i=0;i<3;i++)line(c,[[-14+i*10,-197],[-15+i*10,-187]],tint(hair,30),1.2);}
 else if(a.style===3){path(c,p=>{p.moveTo(-20,-166);p.quadraticCurveTo(-34,-197,-7,-204);p.quadraticCurveTo(31,-211,31,-180);p.lineTo(30,-143);p.lineTo(19,-146);p.lineTo(19,-184);p.lineTo(3,-190);p.lineTo(-14,-181);p.lineTo(-18,-144);p.lineTo(-30,-149);p.closePath();},grad(c,-25,-200,25,-140,[tint(hair,30),hair,tint(hair,-30)]));line(c,[[-24,-174],[-24,-151]],tint(hair,35),2);}
 else{path(c,p=>{p.moveTo(-22,-174);p.quadraticCurveTo(-31,-200,-3,-202);p.quadraticCurveTo(29,-205,29,-181);p.lineTo(20,-184);p.lineTo(13,-192);p.quadraticCurveTo(-2,-183,-14,-188);p.lineTo(-15,-172);p.closePath();},grad(c,-20,-200,25,-175,[tint(hair,30),hair,tint(hair,-25)]));}
 const blink=Math.sin(time*.91+a.face*1.7)>.996;
 const fierce=g.traits.includes('aggressive')||g.traits.includes('impulsive');
 line(c,[[-13,-174],[-3,-172+(fierce?2:0)]],tint(hair,-20),3.5);line(c,[[12,-172],[22,-176+(fierce?3:0)]],tint(hair,-20),3.3);
 if(blink){line(c,[[-11,-167],[-2,-166]],'#39291f',2);line(c,[[13,-166],[21,-167]],'#39291f',2);}
 else{ellipse(c,-6,-166,5,3.3,'#d8d4b9','#36291f',1);ellipse(c,17,-166,4.5,3.1,'#d8d4b9','#36291f',1);ellipse(c,-3,-166,2.2,2.8,'#283638');ellipse(c,19,-166,2,2.7,'#283638');ellipse(c,-2.4,-167,0.7,0.7,'#fffbe0');}
 path(c,p=>{p.moveTo(6,-170);p.lineTo(12,-157);p.lineTo(5,-155);},tint(a.skin,-4),'#714e3b',1.5);line(c,[[5,-158],[10,-159]],tint(a.skin,28),1.4);
 if(a.face===1)line(c,[[-15,-172],[-11,-157]],tint(a.skin,-35),1.4);
 if(a.beard){path(c,p=>{p.moveTo(-18,-157);p.lineTo(-9,-151);p.lineTo(4,-155);p.lineTo(20,-152);p.lineTo(24,-157);p.lineTo(20,-141);p.lineTo(8,-132);p.lineTo(-8,-139);p.closePath();},grad(c,-17,-156,23,-134,[tint(hair,15),hair,tint(hair,-25)]),'#382a22',1.5);for(let i=0;i<5;i++)line(c,[[-8+i*5,-144],[-5+i*4,-138]],tint(hair,25),.9);}
 const mouthY=a.beard?-148:-147;
 path(c,p=>{p.moveTo(0,mouthY);p.quadraticCurveTo(10,mouthY+(pose==='celebrate'?6:1),18,mouthY-2);},null,a.beard?'#d0a47d':'#5d392c',2);
 if(eq.head){
  if(eq.head.weight===0){path(c,p=>{p.moveTo(-27,-150);p.quadraticCurveTo(-40,-202,-10,-210);p.quadraticCurveTo(28,-215,31,-183);p.lineTo(26,-170);p.lineTo(21,-191);p.quadraticCurveTo(-7,-202,-21,-176);p.lineTo(-18,-150);p.closePath();},'#4a4533','#211e1b',3);}
  else{path(c,p=>{p.moveTo(-29,-174);p.lineTo(-26,-194);p.quadraticCurveTo(-12,-215,11,-209);p.quadraticCurveTo(31,-205,32,-176);p.lineTo(23,-171);p.lineTo(21,-187);p.lineTo(-18,-186);p.lineTo(-21,-169);p.closePath();},steel);line(c,[[-27,-181],[30,-181]],'#c0a164',4);path(c,p=>{p.moveTo(3,-207);p.lineTo(8,-208);p.lineTo(10,-159);p.lineTo(3,-157);p.closePath();},'#b8bba4','#3d4440',1.5);if(eq.head.weight>=2){path(c,p=>{p.moveTo(-4,-207);p.quadraticCurveTo(-4,-230,24,-225);p.lineTo(35,-213);p.quadraticCurveTo(10,-221,10,-207);p.closePath();},'#914c3a','#3d2522',2);}}
 }
 if(eq.accessory){line(c,[[-17,-136],[0,-122],[19,-133]],'#c7ad70',1.5);path(c,p=>{p.moveTo(0,-126);p.lineTo(5,-119);p.lineTo(0,-112);p.lineTo(-5,-119);p.closePath();},'#7bc7ca','#d6b56e',1.5);}
 c.restore();
 if(pose==='cast'){
  const orb=grad(c,frontHand[0]-13,frontHand[1]-30,frontHand[0]+17,frontHand[1],['#e0ffff','#70cddc','#267a98']);c.shadowColor='#55d9ef';c.shadowBlur=25;ellipse(c,frontHand[0]+9,frontHand[1]-16,11+Math.sin(time*5)*2,11,orb);c.shadowBlur=0;
  for(let i=0;i<6;i++){const t=time*2+i;ellipse(c,frontHand[0]+Math.cos(t)*25,frontHand[1]-16+Math.sin(t)*21,1.8,1.8,'#b3f3ea');}
 }
 c.restore();
}
export function portraitCanvas(canvas,g,inventory,time=0,pose='idle'){
 const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;c.clearRect(0,0,w,h);
 const halo=c.createRadialGradient(w*.5,h*.45,5,w*.5,h*.52,w*.65);halo.addColorStop(0,'#b8934c22');halo.addColorStop(1,'#5a422500');c.fillStyle=halo;c.fillRect(0,0,w,h);
 c.save();c.strokeStyle='#ad8a4530';c.lineWidth=1;c.beginPath();c.ellipse(w*.5,h*.55,w*.37,h*.4,0,0,TAU);c.stroke();c.restore();
 drawCharacter(c,g,w*.48,h-12,Math.min(w/145,(h-18)/238),false,time,pose,equipmentOf(g,inventory));
}
