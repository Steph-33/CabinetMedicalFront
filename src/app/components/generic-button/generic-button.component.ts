import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.css']
})
export class GenericButtonComponent implements OnInit {

  @Input()
  title!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
