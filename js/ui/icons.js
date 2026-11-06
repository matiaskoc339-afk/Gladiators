const paths={
 base:'M3 11 12 3l9 8M5 10v11h14V10M9 21v-8h6v8M9 7h6',
 gladiators:'M8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0M3 22v-3c0-5 18-5 18 0v3M5 12l-3 4M19 12l3 4',
 market:'M12 3v18M8 21h8M3 7h18M5 7l-4 8h8L5 7Zm14 0-4 8h8l-4-8Z',
 training:'m4 3 17 17M3 5l2-2 5 3-4 4-3-5Zm12 11 3-3 4 4-3 3-4-4ZM15 3l6 6M18 2l4 4M4 21l8-8',
 shops:'M3 9 5 3h14l2 6M3 9c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0M4 12v10h16V12M9 22v-7h6v7',
 inventory:'M3 7h18v14H3V7Zm0 0 3-4h12l3 4M3 12h18M10 10h4v5h-4v-5Z',
 arena:'m4 2 15 17m-1-1 3-3M2 4l3-2 5 7-2 2-6-7ZM20 2 5 19m1-1-3-3M22 4l-3-2-5 7 2 2 6-7ZM3 20l2 2M19 22l2-2',
 tournaments:'M7 3h10v7c0 7-10 7-10 0V3Zm0 2H3v4c0 3 4 4 5 4m9-8h4v4c0 3-4 4-5 4M12 16v5M7 22h10',
 history:'M5 3h13v19H5V3Zm-2 0h2M8 7h7M8 11h7M8 15h7M8 19h4',
 save:'M3 3h15l3 3v15H3V3Zm4 0v7h10V3M7 21v-7h10v7M13 4v4',
 options:'m10 2-1 4-3-1-3 5 3 2-3 3 3 5 4-1 2 3 4-1 1-4 3 1 3-5-3-2 3-3-3-5-4 1-2-3-4 1Zm-2 10a4 4 0 1 0 8 0 4 4 0 0 0-8 0',
 fullscreen:'M3 9V3h6M15 3h6v6M21 15v6h-6M9 21H3v-6',
 strength:'m3 9 3-3 3 3-3 3-3-3Zm12 9 3-3 3 3-3 3-3-3ZM6 9l12 9M1 11l5-5M18 20l5-5',
 agility:'m2 18 6-9 5 5 9-11M15 3h7v7M3 22h5',
 attack:'M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm5 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0M12 1v7M16 12h7',
 defense:'m12 2 9 4v7c0 5-9 9-9 9s-9-4-9-9V6l9-4ZM12 6v12M7 9h10',
 vitality:'M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z',
 endurance:'M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm9-6v6l4 3M10 1h4',
 magic:'m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7ZM3 3l2 2M19 3l2 2M3 19l2 2',
 charisma:'M3 9h18M6 9V5l6-3 6 3v4M5 11v8M10 11v8M15 11v8M20 11v8M3 22h19',
 gold:'M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm4 0 5-5 5 5-5 5-5-5Z',
 sun:'M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0M12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2'
};
export function glyph(name,size=24){return `<svg class="glyph" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.magic}"/></svg>`;}
export function itemArt(item){
 const metal=item.price>400?'#dae3e5':'#a3b1b2',gold=item.price>300?'#e3b969':'#a38752';let art='';
 if(item.category==='weapon'){
  const type=item.type;
  if(type==='bow'||type==='crossbow')art=`<path d="M20 10Q76 40 20 75" fill="none" stroke="#38261d" stroke-width="11"/><path d="M20 10Q76 40 20 75" fill="none" stroke="${gold}" stroke-width="5"/><path d="M20 10 30 43 20 75" fill="none" stroke="#e9ddbd" stroke-width="1.5"/><path d="m10 53 52-29m-8-2 9 1-4 9" stroke="${metal}" stroke-width="3" fill="none"/>${type==='crossbow'?'<path d="m26 68 22-45" stroke="#73472a" stroke-width="9"/>':''}`;
  else if(type==='spear')art=`<g transform="rotate(28 42 44)"><path d="M42 85V18" stroke="#2d2921" stroke-width="8"/><path d="M42 85V18" stroke="#a47b48" stroke-width="4"/><path d="m42 2-12 23 12 13 12-13Z" fill="${metal}" stroke="#263137" stroke-width="3"/><path d="M42 7v24M38 38h9m-9 5h9" stroke="${gold}" stroke-width="2"/></g>`;
  else if(type==='staff')art=`<path d="m29 76 18-59" stroke="#3e281e" stroke-width="10"/><path d="m29 76 18-59" stroke="#99744b" stroke-width="5"/><path d="m37 15 13-10 10 16-16 12Z" fill="#75d5dd" stroke="${gold}" stroke-width="3"/><path d="m49 9-3 17 10-6Z" fill="#d2ffff"/><path d="m39 35 13 4M36 44l12 4" stroke="${gold}" stroke-width="3"/>`;
  else if(type==='axe'||type==='mace')art=`<g transform="rotate(30 42 44)"><path d="M42 78V16" stroke="#34251f" stroke-width="10"/><path d="M42 78V16" stroke="#926039" stroke-width="5"/>${type==='axe'?`<path d="M42 18 17 8Q4 32 18 45l24-14 15 6Q68 24 56 11Z" fill="${metal}" stroke="#263137" stroke-width="3"/><path d="M17 12Q10 29 20 40" fill="none" stroke="#edf5ed" stroke-width="3"/>`:`<path d="m29 9 9-6h13l8 8v23l-10 8H36l-9-8Z" fill="${metal}" stroke="#263137" stroke-width="3"/><path d="M35 10v24m12-27v31" stroke="${gold}" stroke-width="4"/>`}<path d="M39 51h7m-7 7h7m-7 7h7" stroke="${gold}" stroke-width="2"/></g>`;
  else {const tip=type==='dagger'?24:item.twoHanded?2:8,wide=item.twoHanded?9:item.id==='rapier'?3:5;art=`<g transform="rotate(35 42 44)"><path d="M${44-wide} 55V${tip+10}l${wide}-${10} ${wide} 10v${45-tip}Z" fill="${metal}" stroke="#263137" stroke-width="3"/><path d="m44 ${tip+5}-1 ${48-tip}" stroke="#f6f8e3" stroke-width="2"/><path d="M29 55h31l-3 5H31Z" fill="${gold}" stroke="#3d2c21" stroke-width="2"/><path d="M40 61h9v16h-9Z" fill="#75432a" stroke="#34251f" stroke-width="2"/><path d="M39 79h12" stroke="${gold}" stroke-width="5"/>${type==='spear'?`<path d="M44 60v25" stroke="#7d5432" stroke-width="5"/>`:''}</g>`;}
 }else if(item.category==='scroll')art=`<path d="M21 16h41v48H22Z" fill="#c9ac73" stroke="#4d3528" stroke-width="3"/><path d="M21 16c-9-8-18 4-10 11h11m40 36c11 6 10 16 0 16H25c-9 0-12-14-3-16" fill="#e6ce93" stroke="#62452b" stroke-width="3"/><path d="m42 29 4 9 9 4-9 4-4 9-4-9-9-4 9-4Z" fill="#577a8a"/><path d="M27 58h26M31 21h23" stroke="#8e764c" stroke-width="2"/><circle cx="56" cy="63" r="9" fill="#8b3d32" stroke="${gold}" stroke-width="2"/>`;
 else{
  if(item.slot==='head')art=`<path d="M19 51V31C19 5 65 5 65 31v20l-15 16V42H34v25Z" fill="${metal}" stroke="#273137" stroke-width="3"/><path d="M42 8v36M20 35h44" stroke="${gold}" stroke-width="5"/><path d="M28 44h7m15 0h8" stroke="#17232a" stroke-width="5"/><path d="M37 9Q32-5 52 4l9 10-15-4" fill="#8c4735"/>`;
  else if(item.slot==='chest')art=`<path d="M29 12 16 17 9 35l13 4 3 30 17 10 18-10 4-30 13-4-8-18-14-5-13 9Z" fill="${metal}" stroke="#283137" stroke-width="3"/><path d="M42 23v44m-17-8 17 8 18-8M27 42l15 6 16-6" stroke="${gold}" stroke-width="3"/><path d="m20 21 10-4 3 17-13 3Z" fill="#dbe2d7" opacity=".6"/>`;
  else if(item.slot==='offhand')art=`<path d="m42 6 27 11-3 34c-1 12-24 28-24 28S19 63 18 51l-3-34Z" fill="#4c696e" stroke="#b79b61" stroke-width="5"/><path d="M42 15v51M24 30h36" stroke="${gold}" stroke-width="6"/><circle cx="42" cy="34" r="8" fill="${metal}" stroke="#263137" stroke-width="2"/>`;
  else if(item.slot==='feet')art=`<path d="M27 10h24l-2 37 16 14v12H17V62l10-13Z" fill="#73503b" stroke="#302720" stroke-width="3"/><path d="M26 15h25l-1 10H27Zm0 28h24v10H25Z" fill="${metal}" stroke="${gold}" stroke-width="2"/><path d="M18 64h46" stroke="#b2945a" stroke-width="4"/>`;
  else if(item.slot==='hands')art=`<path d="m18 63 5-22 2-22c1-6 8-6 8 0v16-23c0-7 9-7 9 0v23-26c0-6 8-6 8 0v26-20c0-5 8-5 8 0v27l9-9c6-4 10 2 6 7L57 65l-2 12H23Z" fill="${metal}" stroke="#2c3537" stroke-width="3"/><path d="M23 59h33v12H22Z" fill="#735340" stroke="${gold}" stroke-width="3"/><path d="M29 41h25" stroke="${gold}" stroke-width="3"/>`;
  else art=`<path d="M21 9c-8 38 50 38 42 0" fill="none" stroke="${gold}" stroke-width="3"/><path d="m42 34 15 17-15 26-15-26Z" fill="#4b9a9c" stroke="${gold}" stroke-width="4"/><path d="m42 42 5 10-5 12-6-12Z" fill="#b2ece4"/>`;
 }
 return `<svg class="item-art" viewBox="0 0 84 88" aria-hidden="true">${art}</svg>`;
}
