import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {ComponentType} from "../../model/component.model";

@Component({
    selector: 'app-second-page',
    templateUrl: './second-page.component.html',
    styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent {
    constructor(private router: Router) {}

    toPage(nav: string, type:string, variant:string){
        this.router.navigate([nav, type, variant]);
    }

    protected readonly ComponentType = ComponentType;
}
