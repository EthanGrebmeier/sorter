import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < 1000; i++){
      this.elements.push(Math.floor(Math.random() * Math.floor(3000)))
    }
    this.width = this.updateWidth();
  }

  elements: Array<number> = [];
  width: number;

  addElement(): void {
    this.elements.push(Math.floor(Math.random() * Math.floor(3000)))
    this.width = this.updateWidth();
  }

  removeElement(): void {
    this.elements.pop();
    this.width = this.updateWidth();
    console.log(this.elements);
  }

  sortElements(): void {
    this.elements = this.elements.sort( (a,b) => {
      return a-b;
    }


    );
  }


  bubbleSort(){
    for (let i = 0; i < this.elements.length; i++){
      setTimeout(() => {
        for (let j = 0; j < this.elements.length - i; j++){
          if (this.elements[j] < this.elements[j-1]){
            let swap = this.elements[j];
            this.elements[j] = this.elements[j-1];
            this.elements[j-1] = swap;
          }
        }
      }, (i/(this.elements.length)) * 1000)
      
    }
  }

  swapBubble(){

  }

  rectangleClass(element){
    let style = {
      height: (element / 65) + 2 + 'vh', 
      width: this.width + 'vw'
    }

    return style
  }

  numberClass(element){
    let style = {
      display: ((this.width > 2.2) ? 'initial' : 'none')
    }

    return style
    
  }

  updateWidth(){
    return (40 / this.elements.length);
  }
}
