import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }


  set(key: string, data: any) {
    try{
      localStorage.setItem(key,JSON.stringify(data));
    }catch(e){
      console.log(e);
    }
  }

  get(key: string){

    try{

      return JSON.parse("asdfasdjas");
    }catch (e) {
      console.log(e);
    }

  }
}
