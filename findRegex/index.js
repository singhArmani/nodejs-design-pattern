/** Observer Pattern: Using event emitter class */
// Using event emitter class instance
import { EventEmitter } from 'events';
import { readFile, readdirSync} from 'fs';

// To get __dirname in ESM (nodejs);
//NOTE: __dirname is only defined in CommonJS module
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


function findRegex(files, regex){

 const emitter = new EventEmitter();

 for(const file of files){
   console.log({file})
   readFile(file, 'utf8', (err, data) => {
     if(err) {
       return emitter.emit('err', error);
     }
     const match = data.match(regex);
     emitter.emit('fileread', file);

     if(match){
       match.forEach(el => emitter.emit('found', file, el));
     }
   });
 }
   return emitter;
}

const files = readdirSync(__dirname, { encoding: 'utf-8'});

findRegex(files, /hello \w+/g)
  .on('fileread', file => console.log(`${file} has been read!`))
  .on('found', (file, el) => console.log(`Match ${el} has been found on file: ${file}`))
  .on('err', err => console.error(`Error occured: ${err}`));

