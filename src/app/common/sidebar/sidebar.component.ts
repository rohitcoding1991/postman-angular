import { Component, OnInit , Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() toggleSection = new EventEmitter<string>(); 


  constructor() { }

  ngOnInit() {
   
    
  }
  toggleCollection(section: string) {
    
    
    this.toggleSection.emit(section);
  }
  toggleenv(section:string){
    this.toggleSection.emit(section);
  }
  toggleapis(section:string){
    this.toggleSection.emit(section);
  }
  mockserv(section:string){
    this.toggleSection.emit(section);
  }
  monitor(section:string){
    this.toggleSection.emit(section);
  }
  flow(section:string){
    this.toggleSection.emit(section);
  }
  history(section:string){
    this.toggleSection.emit(section);
  }


}
