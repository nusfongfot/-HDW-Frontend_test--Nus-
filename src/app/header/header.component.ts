import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  @Output("toggle")navToggle = new EventEmitter();
  @Output()sayHi = new EventEmitter<String>();

  demoMailNoti = 50;
  demoNoti = 9;

  constructor() { }

  ngOnInit(): void {
  }

  onClickNavToggle(){
    this.navToggle.emit();
    this.sayHi.emit("Nus");
  }

}
