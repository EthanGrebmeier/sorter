import { Component, OnInit } from '@angular/core';
import { SendDataService } from '../send-data.service';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent implements OnInit {

  constructor(private sendData: SendDataService) {
    this.sendData.sendData$.subscribe((data) => {
      this.comparisons = data; 
    })
   }

  ngOnInit(): void {
  }

  public comparisons: number; 

}
