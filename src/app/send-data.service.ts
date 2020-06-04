import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  sendData$: Observable<any>;
  private sendDataSubject = new Subject<any>();

  constructor() { 
    this.sendData$ = this.sendDataSubject.asObservable();
  }

  sendDataMethod(data){
    this.sendDataSubject.next(data); 
  }
}
