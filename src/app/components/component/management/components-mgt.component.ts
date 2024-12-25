import {Component} from "@angular/core";

@Component({
    selector: 'app-mgt-component',
    templateUrl: './components-mgt.component.html',
    styleUrls: ['./components-mgt.component.css'],
})
export class ComponentsMgtComponent {
  isListVisible: boolean = false;

  onClickPanel(): void{
    this.isListVisible = true;
  }

  onClickClose(): void{
    this.isListVisible = false;
  }
}
