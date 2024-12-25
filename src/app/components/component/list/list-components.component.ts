import {Component, HostListener} from '@angular/core';
import {
  Case,
  CaseSidepanel, Components,
  ComponentType,
  CPU,
  CPUCooler,
  Fan,
  GPU,
  GPUMemoryGeneration,
  Memory,
  MemoryGeneration,
  Motherboard,
  MotherboardChipset,
  MotherboardFormFactor,
  PSU,
  PSUFormFactor,
  Socket,
  Storage,
  StorageFormFactor,
  StorageInterface,
  StorageType,
  WIFI
} from '../../../model/component.model';
import {Subscription} from 'rxjs';
import {ComponentsService} from '../../../services/components.service';
import {Customer, UserType} from '../../../model/user.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
    displayCPUs: true,
    displayCPUCoolers: true,
    displayFans: true,
    displayGPUs: true,
    displayMemories: true,
    displayMotherboards: true,
    displayPSUs: true,
    displayStorages: true,
  };
  toBeDeleted:{id:number|undefined, name:string} = {
    id: 0,
    name: "",
  };
  errorMessage: string = "Drag and drop an image here or click to select. 64KB JPEG/PNG only.";
  image: string = "";
  imagePreviewUrl: string = "";
  isDragOver:boolean = false;
  inputValue:string = '';
  inputValue2:string = '';
  suggestions: any[] = [];
  suggestions2: any[] = [];

  showDeleteOverlay: boolean = false;
  showOverlayEdit: boolean = false;
  showOverlayCase: boolean = false;
  showOverlayCPU: boolean = false;
  showOverlayCPUCooler: boolean = false;
  showOverlayFan: boolean = false;
  showOverlayGPU: boolean = false;
  showOverlayMemory: boolean = false;
  showOverlayMotherboard: boolean = false;
  showOverlayPSU: boolean = false;
  showOverlayStorage: boolean = false;
  private subscriptions: Subscription = new Subscription();
  protected readonly ComponentType = ComponentType;
  constructor(public componentsService:ComponentsService) {}

  editCase: Case = new Case("", 0, 0.00, 0, "", ComponentType.CASE, CaseSidepanel.FULL, "", MotherboardFormFactor.ATX, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, []);
  editCPU: CPU = new CPU("", 0, 0.00, 0, "", ComponentType.CPU, 0, 0, 0, 0, 0, Socket.AM5, 0, 0, false, 0);
  editCPUCooler: CPUCooler = new CPUCooler("", 0, 0.00, 0, "", ComponentType.CPUCOOLER, 0, 0, "", 0, [], false, false);
  editFan: Fan = new Fan("", 0, 0.00, 0, "", ComponentType.FAN, 0, 0, 0, 0, false, false, false, false, "");
  editGPU: GPU = new GPU("", 0, 0.00, 0, "", ComponentType.GPU, 0, GPUMemoryGeneration.GDDR7, 0, 0, "", 0, 0, 0, 0, 0, 0);
  editMemory: Memory = new Memory("", 0, 0.00, 0, "", ComponentType.MEMORY, 0, 0, MemoryGeneration.DDR5, 0, "", 0, 0, false);
  editMotherboard: Motherboard = new Motherboard("", 0, 0.00, 0, "", ComponentType.MOTHERBOARD, Socket.AM5, MotherboardFormFactor.ATX, MotherboardChipset.X670E,
    MemoryGeneration.DDR5, 0, [], 0, 0, 0, 0, [], 0, 0, 0, 0, 0, 0, WIFI.WIFI7, false);
  editPSU: PSU = new PSU("", 0, 0.00, 0, "", ComponentType.PSU, 0, 0, PSUFormFactor.ATX3, 0, 0, 0, 0, false, false, "");
  editStorage: Storage = new Storage("", 0, 0.00, 0, "", ComponentType.STORAGE, StorageType.SSD, 0, StorageInterface.M2, StorageFormFactor.M2280, false);

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }
  processFile(file: File): void {
    console.log(file.size)
    if (file) {
      if (file.size > 64*1024) {
        this.errorMessage = "File size exceeds the 64 KB limit. 64KB and JPEG/PNG.";
      } else if (!this.checkFileType(file)){
        this.errorMessage = "File is not a JPEG or PNG.";
      } else {
        this.errorMessage = "";
        const reader:FileReader = new FileReader();
        reader.onloadend = () => {
          if (reader.result instanceof ArrayBuffer) {
            this.image = btoa(String.fromCharCode(...new Uint8Array(reader.result)));
            console.log('Image as Base64:', this.image);
            this.generateImagePreview(file);
            this.errorMessage = "Drag and drop an image here or click to select. 64KB and JPEG/PNG."
          }
        };
        reader.readAsArrayBuffer(file);
      }
    }
  }
  generateImagePreview(file: File | null): void {
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else{
      this.imagePreviewUrl = "";
    }
  }
  checkFileType(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png'];
    return validTypes.includes(file.type);
  }
  delete(): void {
    this.imagePreviewUrl = "";
    this.errorMessage = "Drag and drop an image here or click to select"
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }
  onDragLeave(): void {
    this.isDragOver = false;
  }
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const files = event.dataTransfer?.files;
    console.log("Files dropped:", files);

    if (files && files.length > 0) {
      this.processFile(files[0]);
    } else {
      this.errorMessage = 'No files were dropped.';
    }
  }

  onInputChange(suggestions: any[], inputValue: string, allVariables: any[], existingVariables: any[]): void {
    if (inputValue.trim() === '') {
      suggestions.length = 0;
      return;
    }
    suggestions.length = 0;
    suggestions.push(...allVariables.filter(item =>
      item.toString().toLowerCase().includes(inputValue.toString().toLowerCase()) && !existingVariables.includes(item)
    ));
  }
  addItem(item: any, existingVariables: any[]): void {
    if (!existingVariables.includes(item)) {
      existingVariables.push(item);
    }
    this.inputValue = '';
    this.inputValue2 = '';
    this.suggestions = [];
    this.suggestions2 = [];
  }
  removeItem(item: any, existingVariables: any[]): void {
    const index = existingVariables.indexOf(item);
    if (index !== -1) {
      existingVariables.splice(index, 1);
    }
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

  saveChanges(type: ComponentType){
    if(type === ComponentType.CASE){
      this.editCase.image = this.image;
      this.componentsService.updateCase(this.editCase.id, this.editCase).subscribe(
        response => this.componentsService.triggerRefreshUserList(),
        error => console.error("Error updating component", error)
      );
      this.editCase.image = "";
    } else if(type === ComponentType.CPU){
      this.editCPU.image = this.image;
      this.componentsService.updateCPU(this.editCPU.id, this.editCPU).subscribe(
        response => this.componentsService.triggerRefreshUserList(),
        error => console.error("Error updating component", error)
      );
      this.editCPU.image = "";
    } else if(type === ComponentType.CPUCOOLER){
      this.editCPUCooler.image = this.image;
      this.componentsService.updateCPUCooler(this.editCPUCooler.id, this.editCPUCooler).subscribe(
        response => this.componentsService.triggerRefreshUserList(),
        error => console.error("Error updating component", error)
      );
      this.editCPUCooler.image = "";
    } else if(type === ComponentType.FAN){
      this.editFan.image = this.image;
      this.componentsService.updateFan(this.editFan.id, this.editFan).subscribe(
        response => this.componentsService.triggerRefreshUserList(),
        error => console.error("Error updating component", error)
      );
      this.editFan.image = "";
    } else if(type === ComponentType.GPU){
      this.editGPU.image = this.image;
      this.componentsService.updateGPU(this.editGPU.id, this.editGPU).subscribe(
        response => this.componentsService.triggerRefreshUserList(),
        error => console.error("Error updating component", error)
      );
      this.editGPU.image = "";
    } else if(type === ComponentType.MEMORY){
      this.editMemory.image = this.image;
      this.componentsService.updateMemory(this.editMemory.id, this.editMemory).subscribe(
        response => this.componentsService.triggerRefreshUserList(),
        error => console.error("Error updating component", error)
      );
      this.editMemory.image = "";
    } else if(type === ComponentType.MOTHERBOARD){
      this.editMotherboard.image = this.image;
      this.componentsService.updateMotherboard(this.editMotherboard.id, this.editMotherboard).subscribe(
        response => this.componentsService.triggerRefreshUserList(),
        error => console.error("Error updating component", error)
      );
      this.editMotherboard.image = "";
    } else if(type === ComponentType.PSU){
      this.editPSU.image = this.image;
      this.componentsService.updatePSU(this.editPSU.id, this.editPSU).subscribe(
        response => this.componentsService.triggerRefreshUserList(),
        error => console.error("Error updating component", error)
      );
      this.editPSU.image = "";
    } else if(type === ComponentType.STORAGE){
      this.editStorage.image = this.image;
      this.componentsService.updateStorage(this.editStorage.id, this.editStorage).subscribe(
        response => this.componentsService.triggerRefreshUserList(),
        error => console.error("Error updating component", error)
      );
      this.editStorage.image = "";
    }

    this.image = "";
    this.imagePreviewUrl = "";
    this.closeOverlay();
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
    this.showOverlayEdit = false;
    this.showDeleteOverlay = false;
    this.showOverlayCase = false;
    this.showOverlayCPU = false;
    this.showOverlayCPUCooler = false;
    this.showOverlayFan = false;
    this.showOverlayGPU = false;
    this.showOverlayMemory = false;
    this.showOverlayMotherboard = false;
    this.showOverlayPSU = false;
    this.showOverlayStorage = false;
  }
  ngOnInit(): void {
    this.loadCases();
    this.loadCPUs();
    this.loadCPUCoolers();
    this.loadFans();
    this.loadGPUs();
    this.loadMemories();
    this.loadMotherboards();
    this.loadPSUs();
    this.loadStorages();

    this.subscriptions.add(
      this.componentsService.refreshUserList$.subscribe(() => {
        this.loadCases();
        this.loadCPUs();
        this.loadCPUCoolers();
        this.loadFans();
        this.loadGPUs();
        this.loadMemories();
        this.loadMotherboards();
        this.loadPSUs();
        this.loadStorages();
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  /*@HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const scrollAmount = 200;

    if (this.scrollContainer) {
      if (event.key === 'ArrowDown') {
        this.scrollContainer.nativeElement.scrollBy({
          top: scrollAmount,
          behavior: 'smooth'
        });
      } else if (event.key === 'ArrowUp') {
        this.scrollContainer.nativeElement.scrollBy({
          top: -scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  }*/
  openEditCase(comp: Case){
    this.editCase = {...comp};
    this.showOverlayEdit = true;
    this.showOverlayCase = true;
  }
  openEditCPU(comp: CPU){
    this.editCPU = {...comp};
    this.showOverlayEdit = true;
    this.showOverlayCPU = true;
  }
  openEditCPUCooler(comp: CPUCooler){
    this.editCPUCooler = {...comp};
    this.showOverlayEdit = true;
    this.showOverlayCPUCooler = true;
  }
  openEditFan(comp: Fan){
    this.editFan = {...comp};
    this.showOverlayEdit = true;
    this.showOverlayFan = true;
  }
  openEditGPU(comp: GPU){
    this.editGPU = {...comp};
    this.showOverlayEdit = true;
    this.showOverlayGPU = true;
  }
  openEditMemory(comp: Memory){
    this.editMemory = {...comp};
    this.showOverlayEdit = true;
    this.showOverlayMemory = true;
  }
  openEditMotherboard(comp: Motherboard){
    this.editMotherboard = {...comp};
    this.showOverlayEdit = true;
    this.showOverlayMotherboard = true;
  }
  openEditPSU(comp: PSU){
    this.editPSU = {...comp};
    this.showOverlayEdit = true;
    this.showOverlayPSU = true;
  }
  openEditStorage(comp: Storage){
    this.editStorage = {...comp};
    this.showOverlayEdit = true;
    this.showOverlayStorage = true;
  }

  get filteredCases(){
    if(this.filters['displayCases']){
      return this.filteredComponents(this.cases);
    } else {
      return []
    }
  }
  get filteredCPUs(){
    if(this.filters['displayCPUs']){
      return this.filteredComponents(this.cpus);
    } else {
      return []
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
}
