import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  @Input() activeSection: string = '';
  isCollapsed: boolean = true;
  constructor() { }

  ngOnInit() {
    
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

}
