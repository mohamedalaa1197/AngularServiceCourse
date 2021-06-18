import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  log(message: String):void{

    const timeString:String=new Date().toLocaleDateString();
    console.log(`${message} (${timeString})`) ;
  }

  error(message:String):void{
    console.log(`Error ${message}`);

  }
  constructor() { }
}
