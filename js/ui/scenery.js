import {ITEMS} from '../../data/items.js';
import {drawCharacter,equipmentOf} from './characterRenderer.js';
export const FACILITY_POS={strength:[.22,.43],agility:[.37,.35],attack:[.68,.35],defense:[.82,.45],endurance:[.18,.71],vitality:[.37,.76],magic:[.65,.73],charisma:[.83,.70]};
const TAU=Math.PI*2,cache=new Map();
function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return(seed>>>0)/4294967296;};}
function polygon(c,pts,fill,stroke=null,width=1){c.beginPath();c.moveTo(...pts[0]);pts.slice(1).forEach(p=>c.lineTo(...p));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
function ellipse(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill();}
function gradient(c,x,y,x2,y2,colors){const g=c.createLinearGradient(x,y,x2,y2);colors.forEach((color,i)=>g.addColorStop(i/(colors.length-1),color));return g;}
function line(c,pts,color,width=2){c.beginPath();c.moveTo(...pts[0]);pts.slice(1).forEach(p=>c.lineTo(...p));c.strokeStyle=color;c.lineWidth=width;c.stroke();}
function glow(c,x,y,r,color){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'#00000000');ellipse(c,x,y,r,r,g);}
function cached(key,w,h,render){if(cache.has(key))return cache.get(key);const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.scale(w/1600,h/900);render(ctx);if(cache.size>6)cache.delete(cache.keys().next().value);cache.set(key,canvas);return canvas;}
function pine(c,x,y,size,color){c.fillStyle='#211f1d';c.fillRect(x-size*.045,y-size*.2,size*.09,size*.3);for(let i=0;i<4;i++){const yy=y-size+i*size*.2,ww=size*(.21+i*.11);polygon(c,[[x,yy],[x-ww,yy+size*.4],[x+ww,yy+size*.4]],color);line(c,[[x,yy+size*.05],[x+ww*.7,yy+size*.32]],'#ffffff05',1);}}
function mountain(c,points,fill,highlight){polygon(c,points,fill);for(let i=1;i<points.length-1;i+=2)polygon(c,[points[i],points[i+1],[points[i][0]-40,points[i][1]+120]],highlight);}
function stones(c,x,y,w,h,rand,color='#ffffff0a'){for(let i=0;i<w*h/130;i++){const xx=x+rand()*w,yy=y+rand()*h;c.fillStyle=i%3===0?'#060b0b20':color;c.fillRect(xx,yy,2+rand()*4,1+rand()*2);}}
function wall(c,x,y,w,h){c.fillStyle=gradient(c,x,y,x,y+h,['#a58d65','#6f6650','#514f41']);c.fillRect(x,y,w,h);c.strokeStyle='#322f29';c.lineWidth=1.3;for(let row=0;row<Math.ceil(h/16);row++)for(let col=0;col<w/36;col++){const xx=x+col*36-(row%2?18:0);c.strokeRect(xx,y+row*16,36,16);}c.fillStyle='#b6a077';c.fillRect(x-2,y-4,w+4,7);for(let j=0;j<w;j+=27)c.fillRect(x+j,y-15,18,15);}
function house(c,x,y,w,h,roof='#655649',level=1){
 c.save();c.translate(x,y);
 ellipse(c,12,10,w*.68,22,'#080e0d55');
 const depth=w*.27;
 polygon(c,[[-w/2,0],[w/2,0],[w/2,-h],[-w/2,-h]],gradient(c,0,-h,0,0,['#b69c72','#89704f','#574c38']),'#302e25',2);
 polygon(c,[[w/2,0],[w/2+depth,-depth*.5],[w/2+depth,-h-depth*.5],[w/2,-h]],'#5e5540','#302e25',2);
 for(let i=0;i<4;i++)line(c,[[-w/2,-h+i*h/4],[w/2,-h+i*h/4]],'#423e2d40',1);
 for(const xx of [-w*.4,w*.4]){c.fillStyle='#493c2c';c.fillRect(xx-4,-h,8,h);line(c,[[xx-2,-h],[xx-2,0]],'#b7955b',1);}
 const apex=[0,-h-w*.37];
 polygon(c,[[-w*.64,-h+6],apex,[w*.66,-h+6]],gradient(c,0,-h-w*.4,0,-h,[roof,'#302f2c']),'#202421',3);
 polygon(c,[apex,[depth,-h-w*.37-depth*.5],[w*.66+depth,-h-depth*.5+6],[w*.66,-h+6]],roof,'#292c26',2);
 for(let j=0;j<5;j++){const yy=-h-w*.31+j*w*.075;const spread=(j+1)*w*.11;line(c,[[-spread,yy],[spread,yy]],'#c5b07a25',2);}
 for(let j=0;j<7;j++)line(c,[[w*.65+j*depth/6,-h+5-j*depth/12],[j*depth/6,-h-w*.37-j*depth/12]],'#bda37422',1);
 c.fillStyle='#2a2d24';c.beginPath();c.roundRect(-w*.12,-h*.65,w*.24,h*.65,[w*.12,w*.12,0,0]);c.fill();
 c.fillStyle='#8d6638';c.fillRect(-w*.1,-h*.5,w*.2,h*.5);line(c,[[0,-h*.5],[0,0]],'#31271e',2);ellipse(c,w*.055,-h*.22,2,2,'#d9ae5e');
 for(const xx of [-w*.31,w*.3]){c.fillStyle='#2c352c';c.fillRect(xx-9,-h*.68,18,23);c.fillStyle='#e9bb62';c.fillRect(xx-6,-h*.65,12,17);line(c,[[xx,-h*.66],[xx,-h*.4]],'#5b492b',2);line(c,[[xx-8,-h*.54],[xx+8,-h*.54]],'#5b492b',2);}
 if(level>1){line(c,[[-w*.4,-h*.9],[w*.4,-h*.9]],'#c3a25d',3);for(let i=0;i<level;i++)ellipse(c,-(level-1)*7+i*14,-h*.82,2.5,2.5,'#d6b363');}
 c.restore();
}
function tent(c,x,y,w,color){ellipse(c,x+7,y+7,w*.65,19,'#09100d50');polygon(c,[[x-w*.6,y],[x,y-w*.85],[x+w*.6,y]],gradient(c,x-w*.5,y-w*.6,x+w*.5,y,[color,'#584c3a']),'#302e25',2);polygon(c,[[x,y-w*.85],[x+w*.6,y],[x+w*.8,y-18],[x+w*.22,y-w*.9]],color,'#302e25',2);polygon(c,[[x-w*.15,y],[x,y-w*.5],[x+w*.15,y]],'#292c24');line(c,[[x,y-w*.9],[x,y+4]],'#b5aa84',3);line(c,[[x-w*.5,y-8],[x-w*.7,y+9]],'#a4a18a',1);}
function barrel(c,x,y,scale=1){c.save();c.translate(x,y);c.scale(scale,scale);c.fillStyle=gradient(c,-13,0,13,0,['#4d3826','#a47b42','#5d432b']);c.beginPath();c.roundRect(-13,-29,26,30,6);c.fill();ellipse(c,0,-28,12,4,'#b08a50');for(const yy of [-22,-7]){c.fillStyle='#444e45';c.fillRect(-13,yy,26,4);line(c,[[-12,yy],[12,yy]],'#889180',1);}line(c,[[0,-24],[0,-9]],'#4b362a',1);c.restore();}
function target(c,x,y,size=1){c.save();c.translate(x,y);c.scale(size,size);line(c,[[-11,0],[0,-55],[12,0]],'#6c4c2e',7);for(let i=4;i>=1;i--)ellipse(c,0,-45,i*7,i*8,['','#923b2b','#d1b778','#69452e','#a1854e'][i]);line(c,[[4,-47],[31,-66]],'#bfab7d',2);polygon(c,[[31,-66],[24,-64],[28,-60]],'#798b87');c.restore();}
function banner(c,x,y,color,time,scale=1){c.save();c.translate(x,y);c.scale(scale,scale);line(c,[[0,0],[0,100]],'#58442d',5);line(c,[[-4,3],[43,3]],'#c3a66b',3);const wind=Math.sin(time*1.8+x)*4;polygon(c,[[3,5],[43,7+wind],[40,70+wind],[24,83],[4,70]],gradient(c,2,0,45,0,[color,'#29262a']), '#221f1c',1);line(c,[[8,10],[8,66],[24,77],[35,67]],'#d7b77890',1);polygon(c,[[24,24],[31,38],[24,51],[17,38]],'#d2b073');c.restore();}
function torch(c,x,y,time,scale=1){c.save();c.translate(x,y);c.scale(scale,scale);glow(c,0,-21,62,'#f1a44428');line(c,[[0,4],[0,-20]],'#332b20',6);line(c,[[-9,-18],[9,-18]],'#8e7751',3);const flick=Math.sin(time*11+x)*3;polygon(c,[[-7,-19],[-9,-29],[0,-48-flick],[5,-31],[9,-26],[6,-18]],'#d88332');polygon(c,[[-4,-20],[-4,-31],[1,-40-flick],[5,-26],[3,-20]],'#f6cf68');ellipse(c,0,-25,2,5,'#fff4c6');c.restore();}
function baseBackdrop(c,s){
 const random=rng(7284);c.fillStyle=gradient(c,0,0,0,900,['#243e4a','#9b9b7b','#b49a66']);c.fillRect(0,0,1600,900);
 glow(c,1200,115,340,'#f0c47855');ellipse(c,1200,112,46,46,'#eadbaa');
 mountain(c,[[0,210],[130,95],[290,190],[480,62],[670,177],[830,85],[1000,218],[1220,74],[1450,171],[1600,93],[1600,360],[0,360]],'#42595a','#607172');
 mountain(c,[[0,260],[180,185],[310,243],[580,139],[740,243],[940,163],[1080,246],[1300,165],[1510,239],[1600,184],[1600,420],[0,420]],'#354e46','#4b6050');
 for(let i=0;i<90;i++){const x=i*19,y=262+Math.sin(i*3.5)*26;pine(c,x,y,40+random()*67,'#263e35');}
 polygon(c,[[0,302],[420,258],[1040,258],[1600,330],[1600,900],[0,900]],gradient(c,0,300,0,900,['#69704a','#646340','#35472e']));
 // Irregular courtyard, paths and sunlit earth, bounded by masonry.
 ellipse(c,817,579,647,264,gradient(c,0,330,0,845,['#9c8a59','#a58b55','#72673e']));
 c.save();c.strokeStyle='#b5a16b70';c.lineWidth=45;c.lineCap='round';c.beginPath();c.moveTo(820,875);c.bezierCurveTo(850,700,746,493,815,283);c.stroke();c.beginPath();c.moveTo(180,588);c.bezierCurveTo(539,491,1061,483,1430,588);c.stroke();c.restore();
 stones(c,80,310,1440,590,random,'#d2b67b30');
 for(let i=0;i<200;i++){const x=random()*1600,y=370+random()*520;if(x<180||x>1440){line(c,[[x,y],[x+random()*6-3,y-7-random()*8]],'#82936555',1);}}
 wall(c,185,307,1220,43);
 for(const x of [176,1379]){house(c,x,355,53,91,'#56605b',s.housing);}
 // Main lodge, flags and a stone arch at the back of the camp.
 house(c,787,331,220,105,'#596762',s.housing);
 c.fillStyle='#443a2c';c.fillRect(768,178,12,43);c.fillStyle='#c5a56a';c.fillRect(760,176,27,5);
 for(let i=0;i<5;i++)ellipse(c,775+Math.sin(i*3)*5,162-i*10,8+i*5,7+i*3,`rgba(180,182,158,${.13-i*.018})`);
 for(const [key,[px,py]]of Object.entries(FACILITY_POS)){
  const x=px*1600,y=py*900,level=s.buildings[key];
  ellipse(c,x+12,y+27,100,38,'#2c372040');
  if(key==='strength'){
   house(c,x-17,y-8,130,73,'#7e5140',level);c.fillStyle='#3b352c';c.fillRect(x-72,y-79,29,58);c.fillStyle='#ed9a48';c.fillRect(x-66,y-64,17,21);glow(c,x-56,y-53,45,'#ff9c392d');
   polygon(c,[[x+29,y+20],[x+72,y+20],[x+83,y+10],[x+34,y+9],[x+18,y+13]],'#91a29b','#28332c',2);polygon(c,[[x+41,y+19],[x+61,y+19],[x+57,y+37],[x+38,y+37]],'#4d5d54');barrel(c,x-75,y+27,.7);
  }else if(key==='agility'){
   tent(c,x-13,y-7,96,'#73764c');for(let i=0;i<4;i++){const xx=x-78+i*46;line(c,[[xx,y+37],[xx,y-4]],'#695137',8);line(c,[[xx-10,y-3],[xx+11,y-3]],'#bda370',4);}line(c,[[x-78,y+10],[x+60,y+10]],'#baa880',2);
  }else if(key==='attack'){
   house(c,x+18,y-12,125,64,'#6c5d43',level);target(c,x-67,y+31,.75);target(c,x+3,y+34,.9);barrel(c,x+85,y+20,.8);
  }else if(key==='defense'){
   house(c,x,y,143,89,'#505e5e',level);for(let i=0;i<3;i++){const xx=x-62+i*54;line(c,[[xx,y+29],[xx,y-6]],'#6a5034',6);polygon(c,[[xx-15,y-9],[xx+15,y-9],[xx+12,y+15],[xx,y+25],[xx-12,y+15]],i%2?'#7e6650':'#687d78','#b6a073',2);}
  }else if(key==='endurance'){
   c.strokeStyle='#c3ac76';c.lineWidth=7;c.beginPath();c.ellipse(x,y,113,43,-.15,0,TAU);c.stroke();c.strokeStyle='#7c6e43';c.lineWidth=2;c.beginPath();c.ellipse(x,y,95,32,-.15,0,TAU);c.stroke();for(let j=0;j<3;j++){const xx=x-62+j*60;line(c,[[xx,y+26],[xx,y+2],[xx+34,y-4],[xx+34,y+20]],'#5f4930',7);}barrel(c,x-91,y-23,.8);
  }else if(key==='vitality'){
   tent(c,x,y-1,122,'#bcb68a');c.fillStyle='#658b6a';c.fillRect(x-8,y-74,18,39);c.fillRect(x-19,y-64,40,17);for(let j=0;j<4;j++){const xx=x-83+j*52;ellipse(c,xx,y+20,14,6,'#4e4731');for(let k=0;k<5;k++)ellipse(c,xx+k*3-6,y+7-k%2*4,5,10,k%2?'#7b9860':'#537f54');}
  }else if(key==='magic'){
   house(c,x,y-4,132,118,'#415e6b',level);polygon(c,[[x-20,y-148],[x,y-205],[x+25,y-148],[x,y-124]],gradient(c,x-20,y-200,x+25,y-130,['#a1e6e4','#3f8399','#245363']),'#162d36',3);line(c,[[x,y-197],[x,y-135]],'#cffcf0',1.5);
   c.strokeStyle='#64afa588';c.lineWidth=2;c.beginPath();c.ellipse(x,y+21,95,27,0,0,TAU);c.stroke();for(let i=0;i<8;i++){const a=i*TAU/8;line(c,[[x+Math.cos(a)*86,y+21+Math.sin(a)*23],[x+Math.cos(a)*98,y+21+Math.sin(a)*29]],'#a4c6a4',2);}
  }else{
   house(c,x-2,y-12,142,82,'#825e4e',level);polygon(c,[[x-63,y+10],[x+54,y+10],[x+73,y+24],[x-81,y+24]],'#756342','#453d2d',2);c.fillStyle='#574b32';c.fillRect(x-15,y-25,32,42);polygon(c,[[x-20,y-25],[x+18,y-27],[x+25,y-20],[x-18,y-17]],'#c1ab74');
  }
  if(level>1){for(let j=0;j<level-1;j++){ellipse(c,x-22+j*14,y+43,2.3,2.3,'#dfc377');}}
 }
 // Supplies and amphorae give the empty base the detail of a real place.
 for(const [x,y]of [[624,430],[943,402],[1302,577],[235,571]]){barrel(c,x,y,.85);barrel(c,x+22,y+8,.6);}
 for(let i=0;i<24;i++){const x=i<12?random()*140:1460+random()*160,y=460+random()*500;pine(c,x,y,90+random()*120,i%2?'#243c2c':'#2e4932');}
 c.fillStyle=gradient(c,0,0,0,900,['#07131250','#07131200','#07131200','#071312a0']);c.fillRect(0,0,1600,900);
}
export function drawBase(canvas,s,time){
 const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height,key=`base:${w}:${h}:${s.housing}:${Object.values(s.buildings).join(',')}`;
 c.drawImage(cached(key,w,h,ctx=>baseBackdrop(ctx,s)),0,0);
 c.save();c.scale(w/1600,h/900);
 banner(c,634,275,'#814a36',time,.72);banner(c,967,275,'#814a36',time,.72);
 for(const [xx,yy]of [[276,481],[1315,489],[767,371],[901,371],[555,697],[1212,686]])torch(c,xx,yy,time,.7);
 const mx=FACILITY_POS.magic[0]*1600,my=FACILITY_POS.magic[1]*900;
 glow(c,mx,my-152,64+Math.sin(time*2)*7,'#70d8de24');
 for(let i=0;i<9;i++){const a=time*.5+i*TAU/9;ellipse(c,mx+Math.cos(a)*51,my-150+Math.sin(a)*22,1.4,1.4,'#b4f0df');}
 for(const [key,[px,py]]of Object.entries(FACILITY_POS)){
  const trainees=s.gladiators.filter(g=>g.training===key);trainees.forEach((g,i)=>{const x=px*1600-40+i*29,y=py*900+43;drawCharacter(c,g,x,y,.31,false,time,'train',equipmentOf(g,s.inventory));});
 }
 s.gladiators.filter(g=>!g.training).slice(0,9).forEach((g,i)=>{const x=686+i%4*64+Math.sin(time*.3+i)*14,y=508+Math.floor(i/4)*40;drawCharacter(c,g,x,y,.37,i%2===0,time,g.recovery?'rest':'idle',equipmentOf(g,s.inventory));});
 // Windborne embers and fireflies are deterministic visual effects.
 for(let i=0;i<26;i++){const x=(i*137+time*(7+i%3))%1600,y=390+(i*79%420)+Math.sin(time+i)*12;c.globalAlpha=.15+.2*Math.sin(time*.8+i)**2;ellipse(c,x,y,i%3===0?1.8:1,1,'#f0c672');}c.globalAlpha=1;
 c.restore();
}
function arenaBackdrop(c,type){
 const night=type==='imperial',stone=type==='stone',r=rng(8721);
 c.fillStyle=gradient(c,0,0,0,900,night?['#101b2b','#3d425a','#977355']:stone?['#253d49','#6e8a8a','#a7a188']:['#263e4b','#a4a789','#e0bb76']);c.fillRect(0,0,1600,900);
 glow(c,1187,142,400,night?'#8c9cb92a':'#f0d38c60');ellipse(c,1187,142,night?44:52,night?44:52,night?'#cedbc5':'#f2dca0');
 mountain(c,[[0,299],[150,194],[302,255],[524,146],[700,230],[892,173],[1082,258],[1320,182],[1600,305],[1600,430],[0,430]],night?'#263445':'#6d7b74',night?'#334153':'#8a9180');
 // Cathedral-scale coliseum. Three curved tiers, vaulted arches, masonry and balustrades.
 for(let tier=0;tier<3;tier++){
  const y=210+tier*105;
  c.fillStyle=gradient(c,0,y,0,y+114,[night?'#67716d':'#afa17d',night?'#3c514f':'#6e7560']);c.beginPath();c.moveTo(0,y-35);c.quadraticCurveTo(800,y+50,1600,y-35);c.lineTo(1600,y+104);c.quadraticCurveTo(800,y+170,0,y+104);c.closePath();c.fill();
  for(let i=0;i<18;i++){const x=i*100-45,curve=Math.sin((x+45)/1600*Math.PI)*45;const archY=y+8+curve;
   c.fillStyle=night?'#172f37':'#414f45';c.beginPath();c.roundRect(x+20,archY,48,77,[24,24,0,0]);c.fill();
   c.strokeStyle=night?'#8b908075':'#c9b68a';c.lineWidth=8;c.beginPath();c.roundRect(x+17,archY-3,54,83,[28,28,0,0]);c.stroke();
   c.strokeStyle='#292e2944';c.lineWidth=1;for(let j=0;j<4;j++){c.beginPath();c.moveTo(x+6,archY+j*22);c.lineTo(x+15,archY+j*22);c.stroke();}
   if(tier===1){c.fillStyle='#d4ad6750';c.fillRect(x+37,archY+39,7,12);}
  }
  c.strokeStyle=night?'#b3aa8d':'#e1cba0';c.lineWidth=8;c.beginPath();c.moveTo(0,y+104);c.quadraticCurveTo(800,y+170,1600,y+104);c.stroke();
 }
 // Spectators have heads, tunics and shadowed silhouettes rather than a flat texture.
 for(let row=0;row<4;row++)for(let i=0;i<100;i++){
  const x=i*17+row%2*8,curve=Math.sin(x/1600*Math.PI)*35,y=463+row*13+curve;
  const colors=night?['#7b8376','#8b6d57','#596c72','#a18a68']:['#a8aa8b','#9b6848','#566b67','#c2ae7a'];
  c.fillStyle=colors[(i*7+row)%4];c.beginPath();c.roundRect(x-3,y+3,7,11,[3,3,0,0]);c.fill();ellipse(c,x,y,3.5,4.5,i%5===0?'#b69b72':'#7d806c');
 }
 c.fillStyle=gradient(c,0,530,0,630,night?['#8d8771','#4a564c']:['#c1ac7e','#7e805f']);c.beginPath();c.moveTo(0,518);c.quadraticCurveTo(800,590,1600,518);c.lineTo(1600,620);c.quadraticCurveTo(800,659,0,620);c.closePath();c.fill();
 for(let row=0;row<3;row++)for(let i=0;i<30;i++){const x=i*57-(row%2?25:0),y=530+row*26+Math.sin(x/1600*Math.PI)*40;c.strokeStyle='#333d3355';c.lineWidth=1.5;c.strokeRect(x,y,57,25);line(c,[[x+2,y+1],[x+53,y+1]],'#e7d3a040',1);}
 // Monumental entry gates frame the field and establish depth.
 for(const x of [38,1422]){
  polygon(c,[[x,310],[x+142,310],[x+142,664],[x,647]],gradient(c,x,0,x+142,0,['#6d705b','#a59b76','#454e44']),'#334036',3);
  c.fillStyle='#182b2a';c.beginPath();c.roundRect(x+23,462,96,177,[46,46,0,0]);c.fill();for(let j=0;j<6;j++)line(c,[[x+32+j*15,483],[x+32+j*15,638]],'#4f6457',5);
  line(c,[[x+20,573],[x+120,573]],'#72806a',6);c.fillStyle='#afa17a';c.fillRect(x-8,303,159,17);
  for(let j=0;j<5;j++){c.fillRect(x+j*32-3,286,23,23);}
 }
 c.fillStyle=gradient(c,0,618,0,900,night?['#827557','#a18c60','#4d4d37']:['#b9a070','#d4b67d','#877647']);c.beginPath();c.moveTo(0,642);c.quadraticCurveTo(800,694,1600,642);c.lineTo(1600,900);c.lineTo(0,900);c.closePath();c.fill();
 ellipse(c,800,781,668,99,'#dbbc7d16');c.strokeStyle='#d8bf8870';c.lineWidth=3;c.beginPath();c.ellipse(800,793,650,101,0,0,TAU);c.stroke();
 stones(c,0,661,1600,239,r,night?'#d6bd7930':'#f4d39860');for(let i=0;i<45;i++){const x=r()*1600,y=674+r()*209;line(c,[[x,y],[x+7+r()*12,y-2]],'#6b59372b',1);}
 for(const x of [274,1280]){c.fillStyle='#4b4636';c.fillRect(x-13,618,27,67);ellipse(c,x,618,22,7,'#7a7355');line(c,[[x-15,622],[x+15,622]],'#ad9b69',3);}
 const vignette=c.createRadialGradient(800,540,180,800,520,920);vignette.addColorStop(0,'#00000000');vignette.addColorStop(.65,'#0612140c');vignette.addColorStop(1,'#061214b0');c.fillStyle=vignette;c.fillRect(0,0,1600,900);
}
export function drawArena(canvas,b,time,progress=1,previous=null){
 const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height,type=b.meta.arena||'regional';c.clearRect(0,0,w,h);c.drawImage(cached(`arena:${w}:${h}:${type}`,w,h,ctx=>arenaBackdrop(ctx,type)),0,0);
 c.save();c.scale(w/1600,h/900);
 banner(c,193,315,type==='imperial'?'#735174':'#a2643f',time,1.15);banner(c,1362,315,type==='imperial'?'#735174':'#a2643f',time,1.15);
 torch(c,274,630,time,1.3);torch(c,1280,630,time,1.3);
 const positions=b.fighters.map((f,i)=>{const before=previous?.[i]??f.pos;return before+(f.pos-before)*Math.min(1,progress*2.8);});
 const px=pos=>190+pos/10*1220;
 // One logical turn drives both motion interpolation and the visual effect timeline.
 b.fighters.forEach((f,i)=>{
  const x=px(positions[i]),y=808;
  if(f.buffs.guard||f.buffs.shield){c.strokeStyle=f.buffs.shield?'#91c7df90':'#e4c16d60';c.lineWidth=3;c.beginPath();c.ellipse(x,y-144,66,150,0,0,TAU);c.stroke();glow(c,x,y-100,120,f.buffs.shield?'#81bedb12':'#e0c8770d');}
  drawCharacter(c,f,x,y,1.54,i===1,time,b.result||progress<.85?f.animation:'idle',f.gear);
  if(f.buffs.burn){glow(c,x,y-25,65,'#e6a44c20');for(let j=0;j<5;j++)ellipse(c,x+Math.sin(time*3+j)*28,y-30-(time*30+j*17)%80,2,3,'#e8ab65');}
 });
 const e=b.lastEvent;
 if(e&&progress<1){
  const x1=px(positions[e.actor]),x2=px(positions[1-e.actor]),impact=Math.sin(Math.PI*progress);
  if(e.action==='spell'){
   const spell=ITEMS[e.spell],self=spell&&!spell.range,flame=spell?.effect==='burn',healing=['heal','energy'].includes(spell?.effect);
   const xx=self?x1:x1+(x2-x1)*Math.min(1,progress*1.5),yy=self?663:640-Math.sin(progress*Math.PI)*45;
   if(self){
    c.strokeStyle=healing?'#c6df8ba0':'#8cdddfaa';c.lineWidth=3;c.beginPath();c.ellipse(xx,yy+92,54+impact*20,16,0,0,TAU);c.stroke();
    for(let j=0;j<8;j++){const a=j*TAU/8+progress*2;ellipse(c,xx+Math.cos(a)*45,yy+65-progress*100+j%3*12,2,3,healing?'#e9efac':'#a7e9e5');}
    glow(c,xx,yy,100,healing?'#abc96b25':'#6fcfdf25');
   }else{
    glow(c,xx,yy,80,flame?'#efaf4545':'#77d9ee45');c.strokeStyle=flame?'#f7c676':'#a6e5e6';c.lineWidth=3;c.beginPath();c.moveTo(xx-(x2>x1?1:-1)*50,yy+3);c.lineTo(xx,yy);c.stroke();
    if(spell?.effect==='slow')polygon(c,[[xx,yy-18],[xx+9,yy],[xx,yy+18],[xx-9,yy]],'#c9fff5','#77bccf',2);
    else ellipse(c,xx,yy,10+impact*3,10,gradient(c,xx-10,yy,xx+10,yy,flame?['#fffbd3','#ffd573','#cf6635']:['#f4fff1','#8fe8df','#2b8faf']));
   }
  }
  if(e.action==='rapid'||e.action==='normal'||e.action==='power'){
   c.save();c.translate((x1+x2)*.5,653);c.rotate(e.actor?-.4:.4);c.strokeStyle=`rgba(247,226,174,${impact*.7})`;c.lineWidth=e.action==='power'?8:4;c.beginPath();c.arc(0,0,e.action==='power'?84:61,-1.8,-.05);c.stroke();c.restore();
  }
  if(e.damage){
   const tx=x2+Math.sin(progress*5)*4,ty=484-progress*63;c.globalAlpha=Math.min(1,(1-progress)*2);c.font='bold 40px Georgia';c.textAlign='center';c.lineWidth=5;c.strokeStyle='#251c18';c.strokeText(`−${e.damage}`,tx,ty);c.fillStyle=e.damage>=25?'#ffd07b':'#fff1cf';c.fillText(`−${e.damage}`,tx,ty);c.globalAlpha=1;
   if(progress<.5){for(let i=0;i<8;i++){const a=i*TAU/8,d=progress*95;line(c,[[x2+Math.cos(a)*d,654+Math.sin(a)*d],[x2+Math.cos(a)*(d+9),654+Math.sin(a)*(d+9)]],'#f9d28290',2);}}
  }
 }
 for(let i=0;i<27;i++){const xx=(i*127+time*9)%1600,yy=710+i*13%157;ellipse(c,xx,yy+Math.sin(time+i)*7,i%4===0?2:1,1,'#f5cf9025');}
 c.restore();
}
export function drawMenu(canvas,b,time){drawArena(canvas,b,time,1);const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;c.fillStyle=gradient(c,0,0,w,0,['#081012f5','#081012e0','#08101230','#08101212']);c.fillRect(0,0,w,h);c.fillStyle=gradient(c,0,0,0,h,['#02080950','#02080900','#020809a0']);c.fillRect(0,0,w,h);}
export function drawFacility(canvas,s,stat,time){
 const c=canvas.getContext('2d'),[px,py]=FACILITY_POS[stat],key=`base:1600:900:${s.housing}:${Object.values(s.buildings).join(',')}`;
 const image=cached(key,1600,900,ctx=>baseBackdrop(ctx,s));
 c.clearRect(0,0,canvas.width,canvas.height);c.drawImage(image,px*1600-155,py*900-220,330,270,0,0,canvas.width,canvas.height);
 c.fillStyle=gradient(c,0,0,0,canvas.height,['#16262310','#16262300','#162623cc']);c.fillRect(0,0,canvas.width,canvas.height);
 if(stat==='magic')glow(c,canvas.width*.46,canvas.height*.1,38+Math.sin(time*2)*4,'#98dfe521');
}
