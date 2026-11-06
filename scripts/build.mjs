import {build} from 'esbuild';
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const output=new URL('../js/game.bundle.js',import.meta.url);
const result=await build({
  absWorkingDir:root,
  entryPoints:['js/main.js'],
  outfile:'js/game.bundle.js',
  bundle:true,
  format:'iife',
  platform:'browser',
  target:'es2022',
  charset:'utf8',
  legalComments:'none',
  write:false,
  banner:{js:'/* Archivo generado desde js/main.js. Para actualizarlo: npm ci && npm run build. */'}
});
const contents=result.outputFiles[0].contents;
if(process.argv.includes('--check')){
  const current=await readFile(output).catch(()=>Buffer.alloc(0));
  if(!current.equals(Buffer.from(contents))){
    console.error('js/game.bundle.js falta o no está actualizado. Ejecuta npm run build.');
    process.exitCode=1;
  }else console.log('Bundle listo para abrir index.html directamente y sincronizado con las fuentes.');
}else{
  await writeFile(output,contents);
  console.log(`Generado js/game.bundle.js (${contents.length} bytes). No se necesita servidor para jugar.`);
}
