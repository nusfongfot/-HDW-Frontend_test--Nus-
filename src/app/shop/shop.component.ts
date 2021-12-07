import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
  })
  export class ShopComponent implements OnInit, AfterViewInit {
  
    constructor() { }
    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }
  
    ngOnInit(): void {
  
    } 
   
    }
  
  
  