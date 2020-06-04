import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SendDataService } from '../send-data.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  form: FormGroup;
  sorts = [];

  constructor(private formBuilder: FormBuilder, private sendData: SendDataService) {
    this.form = this.formBuilder.group({
      sorts: []
    });
    this.sorts = [{index: '1', sort: 'Bubble' }, 
    {index: '2', sort: 'Selection'}, 
    {index: '3', sort: 'Insertion'}]

    this.sendData.sendDataMethod(this.comparisons)
   }

  ngOnInit(): void {
    for(let i = 0; i < 100; i++){
      this.elements.push({
        value: Math.floor(Math.random() * Math.floor(3000)),
        index: this.elements.length});
    }

    this.width = this.updateWidth();
    
  }

  elements: Array<any> = [];
  selectedElementOne: number;
  selectedElementTwo: number;
  width: number;

  sortedIndex: number;

  sortInProgress: boolean = false;

  public comparisons: number = 0;

  


  addElement(): void {
    this.elements.push({
      value: Math.floor(Math.random() * Math.floor(3000)),
      index: this.elements.length});
      
    this.width = this.updateWidth();
  }

  removeElement(): void {
    this.elements.pop();
    this.width = this.updateWidth();
    console.log(this.elements);
  }

  shuffleElements(){
    this.elements = [];
    for(let i = 0; i < 100; i++){
      this.elements.push({
        value: Math.floor(Math.random() * Math.floor(3000)),
        index: this.elements.length});
        
      
    }
    this.resetComparisons();
    this.sortedIndex = -1;
    this.width = this.updateWidth();
    this.selectedElementOne = -1;
    this.selectedElementTwo = -1;

  }

  /*
  sortElements(): void {
    this.elements = this.elements.sort( (a, b) => {
      return a-b;
    }


    );
  }
  */

  sort(){
    let sort = this.form.getRawValue().sorts
    this.resetComparisons();
    this.sortInProgress = true;
    if(sort == "Bubble"){
      return this.bubbleSort();
    }
    if(sort == "Selection"){
      return this.selectionSort();
    }
    if(sort == "Insertion"){
      return this.insertionSort();
    }
  }

  bubbleSort(){
    for (let i = 0; i < this.elements.length - 1; i++){
      
      for (let j = 0; j < this.elements.length - i - 1; j++){
        setTimeout(()=>{
          
          this.selectedElementTwo = j;
          
          if (this.elements[j].value > this.elements[j+1].value){
            let swap = this.elements[j];
            this.elements[j] = this.elements[j+1];
            this.elements[j].index = j;
            swap.index = -j+1; 
            this.elements[j+1] = swap;
          }
          this.updateComparisons()
          this.sortedIndex = this.sortedIndex + (this.sortedIndex - i);
          if(i == this.elements.length - 2){
            console.log(this.elements);
            this.sortedIndex -= 2;
            this.selectedElementOne = 4000;
            this.selectedElementTwo = 4000;
            this.sortInProgress = false;
          }
        })
        
      }

    }
  }

  selectionSort(){
    this.resetComparisons();
    for(let i = 0; i < this.elements.length; i++){
        
      setTimeout(() =>{
        console.log(i);
        this.sortedIndex = i;
        let min = i;
        for(let j = i+1; j < this.elements.length; j++){
          this.updateComparisons();
          if(this.elements[j].value < this.elements[min].value){
            min = j;
          }
        }

        let swap = this.elements[min];
        
        this.selectedElementOne = swap.index; 

        this.elements[min] = this.elements[i];
        this.elements[min].index = min;
        this.elements[i] = swap;
        this.elements[i].index = i;
      }, i * 60)

      
  }
  setTimeout( ()=> {
    this.sortInProgress = false;
    this.selectedElementTwo = -1;
    this.selectedElementOne = -1;
  },this.elements.length * 60)
}

  insertionSort(){
    this.resetComparisons();
    for(let i=1; i < this.elements.length; i++){
      
      let swap = this.elements[i];
      let j = i-1; 
      this.updateComparisons

      setTimeout( () => {
        while (j >= 0 && this.elements[j].value > swap.value){
          this.sortedIndex = i;
          this.updateComparisons();
  
          
  
          this.elements[j+1] = this.elements[j];
          this.elements[j+1].index += 1; 
          
          j -= 1;
            
        }

        this.selectedElementTwo = j;
        this.elements[j+1] = swap;
        
      }, i * 60)

    }
    setTimeout( ()=> {
      this.sortInProgress = false;
      this.selectedElementTwo = -1;
      this.selectedElementOne = -1;
    },this.elements.length * 60)
  }



  rectangleClass(element){
    let style = {
      height: (element.value / 66) + 2 + 'vh', 
      width: this.width + 'vw',
      background: this.colorPicker(element)
    }

    return style
  }

  colorPicker(num){
    
    if (num.index == this.selectedElementOne){
      return 'red';
    }
    if (num.index == this.selectedElementTwo){
      return 'yellow';
    }
    
    if (num.index <= this.sortedIndex){
      return '#7C77B9';
    }
    return '#8FBFE0';
    
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

  updateComparisons(){
    this.comparisons += 1;
    this.sendData.sendDataMethod(this.comparisons);
  }

  resetComparisons(){
    this.comparisons = 0;
    this.sendData.sendDataMethod(this.comparisons);
  }
}
