import { promises as fsPromises} from 'fs';
async function concatFiles(destination, cb, ...filePaths){

   let contents = '';
      for(const path of filePaths){
        try{
          const content = await fsPromises.readFile(path, 'utf-8');
          contents+=content;
        }catch(err){
         return cb(err);
        }
      }

      fsPromises.writeFile(destination, contents).then(v => console.log('file written'))
      cb(null, contents);
   }

   concatFiles('./final.txt', (err, content) => {
     if(err) console.error(err);
     else console.log({content});
   }, './foo.txt', './bar.txt');