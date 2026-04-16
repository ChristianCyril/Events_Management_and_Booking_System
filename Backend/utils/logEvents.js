import dayjs from "dayjs";
import { v4 as uuid } from 'uuid';
import fs from 'node:fs'; 
import fsPromises from 'node:fs/promises'; 
import path from "node:path";
const dir = import.meta.dirname;

const logEvents = async(message,filename)=>{
  const dateTime = dayjs().format('YYYY MM DD HH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try{
    if(!fs.existsSync(path.join(dir,'..','logs'))){
      await fsPromises.mkdir(path.join(dir,'..','logs'))   
    }
    await fsPromises.appendFile(path.join(dir,'..','logs',filename),logItem)
  }catch(error){
    console.log(error)
  }
}

export default logEvents