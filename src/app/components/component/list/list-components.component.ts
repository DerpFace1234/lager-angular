import {Component} from '@angular/core';
import {
  Case,
  Components,
  CPU,
  CPUCooler,
  Fan,
  GPU,
  Memory,
  Motherboard,
  PSU,
  Storage,
} from '../../../model/component.model';
import {Subscription} from 'rxjs';
import {ComponentsService} from '../../../services/components.service';
import {UserType} from '../../../model/user.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-components',
  templateUrl: './list-components.component.html',
  styleUrls: ['./list-components.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('300ms ease-in')]),
      transition(':leave', [animate('300ms ease-out')]),
    ])
  ],
})
export class ListComponentsComponent{
  cases: Case[] = [];
  cpus: CPU[] = [];
  cpuCoolers: CPUCooler[] = [];
  fans: Fan[] = [];
  gpus: GPU[] = [];
  memories: Memory[] = [];
  motherboards: Motherboard[] = [];
  psus: PSU[] = [];
  storages: Storage[] = [];
  searchQuery: string = "";
  tabs: {[key: string]: boolean} = {
    types: true,
    attr: true,
  };
  filters: {[key: string]: boolean} = {
    id: false,
    name: false,
    stockQuantity: false,
    price: false,
    reorderQuantity: false,
    displayCases: true,
    displayCPUs: false,
    displayCPUCoolers: false,
    displayFans: false,
    displayGPUs: false,
    displayMemories: false,
    displayMotherboards: false,
    displayPSUs: false,
    displayStorages: false,
  };
  toBeDeleted:{id:number|undefined, name:string} = {
    id: 0,
    name: "",
  };
  image: string = "";

  showDeleteOverlay: boolean = false;
  private subscriptions: Subscription = new Subscription();
  constructor(private router: Router, public componentsService:ComponentsService) {}

  ngOnInit(): void {
    this.loadCases();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadCases() {
    this.componentsService.getCases().subscribe((data: Case[]) => {
      this.cases = data;
    }, (error) => {
      console.error('Failed to fetch cases:', error);
    });
  }
  loadCPUs() {
    this.componentsService.getCPUs().subscribe((data: CPU[]) => {
      this.cpus = data;
    }, (error) => {
      console.error('Failed to fetch cpus:', error);
    });
  }
  loadCPUCoolers() {
    this.componentsService.getCPUCoolers().subscribe((data: CPUCooler[]) => {
      this.cpuCoolers = data;
    }, (error) => {
      console.error('Failed to fetch coolers:', error);
    });
  }
  loadFans() {
    this.componentsService.getFans().subscribe((data: Fan[]) => {
      this.fans = data;
    }, (error) => {
      console.error('Failed to fetch fans:', error);
    });
  }
  loadGPUs() {
    this.componentsService.getGPUs().subscribe((data: GPU[]) => {
      this.gpus = data;
    }, (error) => {
      console.error('Failed to fetch gpus:', error);
    });
  }
  loadMemories() {
    this.componentsService.getMemories().subscribe((data: Memory[]) => {
      this.memories = data;
    }, (error) => {
      console.error('Failed to fetch memories:', error);
    });
  }
  loadMotherboards() {
    this.componentsService.getMotherboards().subscribe((data: Motherboard[]) => {
      this.motherboards = data;
      this.componentsService.storeComponentInLS("motherboard", this.motherboards[1]);
    }, (error) => {
      console.error('Failed to fetch motherboards:', error);
    });
  }
  loadPSUs() {
    this.componentsService.getPSUs().subscribe((data: PSU[]) => {
      this.psus = data;
    }, (error) => {
      console.error('Failed to fetch psus:', error);
    });
  }
  loadStorages() {
    this.componentsService.getStorages().subscribe((data: Storage[]) => {
      this.storages = data;
    }, (error) => {
      console.error('Failed to fetch storages:', error);
    });
  }

  deleteComponent(id: number | undefined){
    this.componentsService.deleteComponent(id).subscribe(
      response => this.componentsService.triggerRefreshUserList(),
      error => console.error("Error deleting component", error)
    );
    this.closeOverlay()
  }
  openDeleteOverlay(id:number|undefined, name:string){
    this.toBeDeleted.id = id;
    this.toBeDeleted.name = name;
    this.showDeleteOverlay = true;
  }
  closeOverlay() {
    this.showDeleteOverlay = false;
  }
  toPage(nav: string, id:number | undefined){
    this.router.navigate([nav, id]);
  }
  toPageBlank(nav: string){
    this.router.navigate([nav]);
  }

  onCheckboxChange(){
    if(this.filters['displayCases']){
      this.loadCases();
    } else {
      this.cases = [];
    }
    if(this.filters['displayCPUs']){
      this.loadCPUs();
    } else {
      this.cpus = [];
    }
    if(this.filters['displayCPUCoolers']){
      this.loadCPUCoolers();
    } else {
      this.cpuCoolers = [];
    }
    if(this.filters['displayFans']){
      this.loadFans();
    } else {
      this.fans = [];
    }
    if(this.filters['displayGPUs']){
      this.loadGPUs();
    } else {
      this.gpus = [];
    }
    if(this.filters['displayMemories']){
      this.loadMemories();
    } else {
      this.memories = [];
    }
    if(this.filters['displayMotherboards']){
      this.loadMotherboards();
    } else {
      this.motherboards = [];
    }
    if(this.filters['displayPSUs']){
      this.loadPSUs();
    } else {
      this.psus = [];
    }
    if(this.filters['displayStorages']){
      this.loadStorages();
    } else {
      this.storages = [];
    }
  }
  get filteredCases(){
    if(this.filters['displayCases']){
      return this.filteredComponents(this.cases);
    } else {
      return this.cases = [];
    }
  }
  get filteredCPUs(){
    if(this.filters['displayCPUs']){
      return this.filteredComponents(this.cpus);
    } else {
      return this.cpus = [];
    }
  }
  get filteredCPUCoolers(){
    if(this.filters['displayCPUCoolers']){
      return this.filteredComponents(this.cpuCoolers);
    } else {
      return []
    }
  }
  get filteredFans(){
    if(this.filters['displayFans']){
      return this.filteredComponents(this.fans);
    } else {
      return []
    }
  }
  get filteredGPUs(){
    if(this.filters['displayGPUs']){
      return this.filteredComponents(this.gpus);
    } else {
      return []
    }
  }
  get filteredMemories(){
    if(this.filters['displayMemories']){
      return this.filteredComponents(this.memories);
    } else {
      return []
    }
  }
  get filteredMotherboards(){
    if(this.filters['displayMotherboards']){
      return this.filteredComponents(this.motherboards);
    } else {
      return []
    }
  }
  get filteredPSUs(){
    if(this.filters['displayPSUs']){
      return this.filteredComponents(this.psus);
    } else {
      return []
    }
  }
  get filteredStorages(){
    if(this.filters['displayStorages']){
      return this.filteredComponents(this.storages);
    } else {
      return []
    }
  }
  filteredComponents<T extends Components>(comps: T[]): T[]{
    return comps.filter(comp => {
      const query = this.searchQuery.toLowerCase();
      const id = comp.id?.toString().includes(query);
      const n = comp.name.toLowerCase().includes(query);
      const qS = comp.quantityStock.toString().includes(query);
      const rQ = comp.reorderQuantity.toString().includes(query);
      const p = comp.price.toString().toLowerCase().includes(query);
      const matchesName = this.filters['name'] && n;
      const matchesID = this.filters['id'] && id;
      const matchesQuantityStock = this.filters['quantityStock'] && qS;
      const matchesReorderQuantity = this.filters['reorderQuantity'] && rQ;
      const matchesPrice = this.filters['price'] && p;

      return (
        (this.filters['name'] || this.filters['id'] || this.filters['n'] || this.filters['qS'] || this.filters['rQ'] || this.filters['p']) ?
          (matchesName || matchesID || matchesQuantityStock || matchesReorderQuantity || matchesPrice) :
          (id || n || qS || rQ || p)
      );
    })
  }

  toggleTypes(): void{
    this.tabs['types'] = !this.tabs['types'];
  }
  toggleAttributes(): void{
    this.tabs['attr'] = !this.tabs['attr'];
  }

  protected readonly UserType = UserType;
    protected readonly Math = Math;
}
