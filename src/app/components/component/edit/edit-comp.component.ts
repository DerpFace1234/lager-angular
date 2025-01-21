import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ComponentsService} from '../../../services/components.service';
import {
  Case,
  Components,
  ComponentType,
  CPU,
  CPUCooler,
  Fan,
  GPU,
  Memory,
  Motherboard,
  PSU,
  Storage
} from '../../../model/component.model';
import {UserType} from '../../../model/user.model';
import {LoginService} from '../../../services/login.service';

@Component({
  selector: 'app-edit-comp',
  templateUrl: './edit-comp.component.html',
  styleUrls: ['./edit-comp.component.css']
})
export class EditCompComponent {

  constructor(private route: ActivatedRoute, private router: Router, public componentsService: ComponentsService, public loginService: LoginService) {}
  id!: number;

  editCase: any = null;
  editCPU: any = null;
  editCPUCooler: any = null;
  editFan: any = null;
  editGPU: any = null;
  editMemory: any = null;
  editMotherboard: any = null;
  editPSU: any = null;
  editStorage: any = null;

  errorMessage: string = "Drag and drop an image here or click to select. 64KB JPEG/PNG only.";
  image: string = "";
  imagePreviewUrl: string = "";
  isDragOver:boolean = false;
  inputValue:string = '';
  inputValue2:string = '';
  suggestions: any[] = [];
  suggestions2: any[] = [];

  ngOnInit(): void {
    this.loginService.handleStuff().then(item => {
      if(this.loginService.userType !== UserType.ADMIN){
        this.loginService.errorMessage = "Admin Privileges required."
        this.loginService.showLogin();
      }
    });
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadCaseById(this.id);
    this.loadCPUById(this.id);
    this.loadCPUCoolerById(this.id);
    this.loadFanById(this.id);
    this.loadGPUById(this.id);
    this.loadMemoryById(this.id);
    this.loadMotherboardById(this.id);
    this.loadPSUById(this.id);
    this.loadStorageById(this.id);
  }
  loadImage(variables: Components) {
    if(variables){
      this.image = variables.image;
      this.imagePreviewUrl = `data:image/png;base64,${variables.image}`;
    }
  }
  loadCaseById(id: number) {
    this.componentsService.getCaseById(id).subscribe((data: Case) => {
      this.editCase = data;
      this.loadImage(this.editCase);
    }, (error) => {
      console.error('Failed to fetch cases:', error);
    });
  }
  loadCPUById(id: number) {
    this.componentsService.getCPUById(id).subscribe((data: CPU) => {
      this.editCPU = data;
      this.loadImage(this.editCPU);
    }, (error) => {
      console.error('Failed to fetch cpus:', error);
    });
  }
  loadCPUCoolerById(id: number) {
    this.componentsService.getCPUCoolerById(id).subscribe((data: CPUCooler) => {
      this.editCPUCooler = data;
      this.loadImage(this.editCPUCooler);
    }, (error) => {
      console.error('Failed to fetch coolers:', error);
    });
  }
  loadFanById(id: number) {
    this.componentsService.getFanById(id).subscribe((data: Fan) => {
      this.editFan = data;
      this.loadImage(this.editFan);
    }, (error) => {
      console.error('Failed to fetch fans:', error);
    });
  }
  loadGPUById(id: number) {
    this.componentsService.getGPUById(id).subscribe((data: GPU) => {
      this.editGPU = data;
      this.loadImage(this.editGPU);
    }, (error) => {
      console.error('Failed to fetch gpus:', error);
    });
  }
  loadMemoryById(id: number) {
    this.componentsService.getMemoryById(id).subscribe((data: Memory) => {
      this.editMemory = data;
      this.loadImage(this.editMemory);
    }, (error) => {
      console.error('Failed to fetch memories:', error);
    });
  }
  loadMotherboardById(id: number) {
    this.componentsService.getMotherboardById(id).subscribe((data: Motherboard) => {
      this.editMotherboard = data;
      this.loadImage(this.editMotherboard);
    }, (error) => {
      console.error('Failed to fetch motherboards:', error);
    });
  }
  loadPSUById(id: number) {
    this.componentsService.getPSUById(id).subscribe((data: PSU) => {
      this.editPSU = data;
      this.loadImage(this.editPSU);
    }, (error) => {
      console.error('Failed to fetch psus:', error);
    });
  }
  loadStorageById(id: number) {
    this.componentsService.getStorageById(id).subscribe((data: Storage) => {
      this.editStorage = data;
      this.loadImage(this.editStorage);
    }, (error) => {
      console.error('Failed to fetch storages:', error);
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }
  processFile(file: File): void {
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

  delete(): void {
    this.image = "";
    this.imagePreviewUrl = "";
    this.errorMessage = "Drag and drop an image here or click to select. 64KB JPEG/PNG only."
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

    if (files && files.length > 0) {
      this.processFile(files[0]);
    } else {
      this.errorMessage = 'No files were dropped.';
    }
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
  closeOverlay(): void {
    this.toPage('/comp-list');
  }
  toPage(nav: string){
    this.router.navigate([nav]);
  }

  protected readonly ComponentType = ComponentType;
  protected readonly UserType = UserType;
}
