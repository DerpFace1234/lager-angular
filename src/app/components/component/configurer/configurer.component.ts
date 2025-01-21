import {Component} from "@angular/core";
import {ComponentsService} from '../../../services/components.service';
import {Router} from '@angular/router';
import {
  Case,
  ComponentType,
  CPU,
  CPUCooler,
  Fan,
  GPU,
  Memory,
  MemoryGeneration,
  Motherboard,
  PSU,
  PSUFormFactor,
  Storage,
  StorageFormFactor,
  StorageInterface,
} from '../../../model/component.model';
import {ShoppingService} from '../../../services/shopping.service';

@Component({
    selector: 'app-configurer',
    templateUrl: './configurer.component.html',
    styleUrls: ['./configurer.component.css']
})
export class ConfigurerComponent{

  constructor(public componentsService: ComponentsService, private router: Router, public shoppingService: ShoppingService){}
  pickedCPU: CPU | null = null;
  pickedCPUCooler: CPUCooler | null = null;
  pickedMotherboard: Motherboard | null = null;
  pickedMemories: Memory[] | null = null;
  pickedGPUs: GPU[] | null = null;
  pickedStorages: Storage[] | null = null;
  pickedM2: Storage[] | null = null;
  pickedSATA: Storage[] | null = null;
  pickedPSU: PSU | null = null;
  pickedCase: Case | null = null;
  pickedFans: Fan[] | null = null;
  picked80F: Fan[] | null = null;
  picked120F: Fan[] | null = null;
  picked140F: Fan[] | null = null;
  fans80: number | null = null;
  fans120: number | null = null;
  fans140: number | null = null;
  memSlots: number = 0;
  compatibilityErrors: string[] = [];
  warnings: string[] = [];
  total:number = 0.00;

  ngOnInit(){
    this.getAllComponents();
    this.calculateMemorySlots();
    this.calculateWattage();
    this.calculateFanSlots();
    this.calculateTotal();
    this.checkCompatibility();
    this.compatibilityErrors.forEach(item => {console.log(item)})
    this.warnings.forEach(item => {console.log(item)})
  }

  getAllComponents(): void{
    this.pickedCPU = this.componentsService.getComponentFromLS("cpu");
    this.pickedCPUCooler = this.componentsService.getComponentFromLS("cpu-cooler");
    this.pickedMotherboard = this.componentsService.getComponentFromLS("motherboard");
    this.pickedMemories = this.componentsService.getComponentFromLS("memories");
    this.pickedGPUs = this.componentsService.getComponentFromLS("gpus");
    this.pickedStorages = this.componentsService.getComponentFromLS("storages");
    this.pickedPSU = this.componentsService.getComponentFromLS("psu");
    this.pickedCase = this.componentsService.getComponentFromLS("case");
    this.pickedFans = this.componentsService.getComponentFromLS("fans");

    if(this.pickedStorages){
      for(const element of this.pickedStorages) {
        if (element.storageInterface === StorageInterface.SATA) {
          if (!this.pickedSATA) {
            this.pickedSATA = [];
          }
          this.pickedSATA.push(element);
        } else {
          if (!this.pickedM2) {
            this.pickedM2 = [];
          }
          this.pickedM2.push(element);
        }
      }
    }

    if(this.pickedFans){
      for(const element of this.pickedFans) {
        if (element.size === 120) {
          if (!this.picked120F) {
            this.picked120F = [];
          }
          this.picked120F.push(element);
        } else if (element.size === 140) {
          if (!this.picked140F) {
            this.picked140F = [];
          }
          this.picked140F.push(element);
        } else if (element.size === 80) {
          if (!this.picked80F) {
            this.picked80F = [];
          }
          this.picked80F.push(element);
        }
      }
    }
  }
  removeComponent(type:ComponentType, int:StorageInterface, fanSize:number, i:number): void{
    if(type === ComponentType.CPU){
      this.pickedCPU = null;
      this.componentsService.removeComponentFromLS("cpu");

    } else if(type === ComponentType.CPUCOOLER){
      this.pickedCPUCooler = null;
      this.componentsService.removeComponentFromLS("cpu-cooler");

    } else if(type === ComponentType.MOTHERBOARD) {
      this.pickedMotherboard = null;
      this.componentsService.removeComponentFromLS("motherboard");

    } else if(type === ComponentType.MEMORY) {
      let filteredList = this.pickedMemories?.filter((_, index) => index !== i) ?? [];
      filteredList.length === 0 ? this.pickedMemories = null : this.pickedMemories = filteredList;
      this.componentsService.storeComponentInLS("memories", this.pickedMemories);

    } else if(type === ComponentType.GPU) {
      let filteredList = this.pickedGPUs?.filter((_, index) => index !== i) ?? [];
      filteredList.length === 0 ? this.pickedGPUs = null : this.pickedGPUs = filteredList;
      this.componentsService.storeComponentInLS("gpus", this.pickedGPUs);

    } else if(type === ComponentType.STORAGE) {
      let array: Storage[] = [];
      let generic: boolean = false;
      if(fanSize === -2){
        this.pickedStorages = this.pickedStorages?.filter((_, index) => index !== i) ?? [];
        this.pickedStorages?.length === 0?this.pickedStorages = null:0;
        generic = true;
      } else if(int === StorageInterface.SATA){
          this.pickedSATA = this.pickedSATA?.filter((_, index) => index !== i) ?? [];
      } else if(int === StorageInterface.M2){
          this.pickedM2 = this.pickedM2?.filter((_, index) => index !== i) ?? [];
      }

      if(!generic){
        if(this.pickedSATA){this.pickedSATA.length === 0 ? this.pickedSATA = null : array.push(...this.pickedSATA);}
        if(this.pickedM2){this.pickedM2.length === 0 ? this.pickedM2 = null : array.push(...this.pickedM2);}
        array.length === 0 ? this.pickedStorages = null : this.pickedStorages = array;
      }
      this.componentsService.storeComponentInLS("storages", this.pickedStorages);

    } else if(type === ComponentType.PSU) {
      this.pickedPSU = null;
      this.componentsService.removeComponentFromLS("psu");

    } else if(type === ComponentType.FAN) {
      let array: Fan[] = [];
      let generic: boolean = false;
      if(fanSize === 80){
        this.picked80F = this.picked80F?.filter((_, index) => index !== i) ?? [];
      } else if(fanSize === 120){
        this.picked120F = this.picked120F?.filter((_, index) => index !== i) ?? [];
      } else if(fanSize === 140){
        this.picked140F = this.picked140F?.filter((_, index) => index !== i) ?? [];
      } else if(fanSize === -2){
        this.pickedFans = this.pickedFans?.filter((_, index) => index !== i) ?? [];
        this.pickedFans?.length === 0?this.pickedFans = null:0;
        generic = true;
      }
      if(!generic){
        if(this.picked80F){this.picked80F.length === 0 ? this.picked80F = null : array.push(...this.picked80F);}
        if(this.picked120F){this.picked120F.length === 0 ? this.picked120F = null : array.push(...this.picked120F);}
        if(this.picked140F){this.picked140F.length === 0 ? this.picked140F = null : array.push(...this.picked140F);}
        array.length === 0 ? this.pickedFans = null : this.pickedFans = array;
      }
      this.componentsService.storeComponentInLS("fans", this.pickedFans);

    } else if(type === ComponentType.CASE) {
      this.pickedCase = null;
      this.componentsService.removeComponentFromLS("case");
    }

    this.calculateMemorySlots();
    this.calculateWattage();
    this.calculateFanSlots();
    this.calculateTotal();
    this.checkCompatibility();
  }
  toPage(page:string, type:string, variant:string){
    this.router.navigate([page, type, variant]);
  }

  calculateMemorySlots(): void {
    if (this.pickedMotherboard) {
      if (this.pickedMemories) {
        this.memSlots = this.pickedMotherboard.memorySlots;
        for (const element of this.pickedMemories) {
          if (element.modules > 1) {
            this.memSlots -= element.modules - 1;
          }
        }
      } else {
        this.memSlots = this.pickedMotherboard.memorySlots;
      }
    }
  }
  calculateWattage(): void{
    let wattage = 0;
    if(this.pickedCPU){ wattage += this.pickedCPU.tdp; }
    if(this.pickedCPUCooler){ this.pickedCPUCooler.watercooled? wattage += 10 : (!this.pickedCPUCooler.fanless ? wattage += 5 : 0); }
    if(this.pickedMotherboard){ wattage += 50; }
    if(this.pickedMemories){ for(let i=0; i<this.pickedMemories.length; i++){ wattage += this.pickedMemories[i].modules * 5;  } }
    if(this.pickedGPUs){ for(let i=0; i<this.pickedGPUs.length ; i++){ wattage += this.pickedGPUs[i].tdp; } }
    if(this.pickedFans){ wattage += this.pickedFans.length*3; }
    if(this.pickedStorages){ wattage += this.pickedStorages.length*8; }
    this.componentsService.estimatedWattage = Math.ceil(wattage*1.25);
  }
  calculateFanSlots(): void{
    if(this.pickedCase){
      this.fans80 = this.pickedCase.fans80;
      this.fans120 = this.pickedCase.fans120;
      this.fans140 = this.pickedCase.fans140;

      if(this.pickedCPUCooler?.watercooled){
        if(this.pickedCPUCooler.height%120 === 0){
          this.fans120 -= this.pickedCPUCooler.height/120;
        } else if(this.pickedCPUCooler.height%140 === 0){
          this.fans140 -= this.pickedCPUCooler.height/140;
        } else if(this.pickedCPUCooler.height%80 === 0){
          this.fans80 -= this.pickedCPUCooler.height/80;
        }
      }
    }
  }
  checkCompatibility(): void {
    this.compatibilityErrors = [];
    this.warnings = [];
    this.checkCPU();
    this.checkCPUCooler();
    this.checkMotherboard();
    this.checkMemory();
    this.checkCase();
    this.checkPSU();
    console.log("ti", this.picked80F && this.fans80 && (this.picked80F.length > this.fans80))
    console.log("hi", this.picked80F && this.fans80)
    console.log((this.picked80F??[]).length > (this.fans80??0));
  }

  checkCPU(): void {
    if(this.pickedCPU){
      if(this.pickedMotherboard){
        if(this.pickedCPU.socket !== this.pickedMotherboard.socket){this.compatibilityErrors.push("CPU's and Motherboard's Sockets do not match.");}
      }
      if(this.pickedMemories){
        let allMem: number = 0;
        for(let i=0; i<this.pickedMemories?.length; i++){
          allMem += this.pickedMemories[i].memory;
        }
        if(allMem > this.pickedCPU.maxMemory){this.compatibilityErrors.push("Picked Memories cumulative capacity exceeds CPU's supported maximum Memory.");}
      }
      if(!this.pickedCPU.igpu && !this.pickedGPUs){
        {this.warnings.push("CPU does not have onboard graphics, a GPU will be required.");}
      }
    }
  }
  checkCPUCooler(): void{
    if(this.pickedCPUCooler){
      if(this.pickedCPU){
        if(!this.pickedCPUCooler.sockets.includes(this.pickedCPU.socket))
        {this.compatibilityErrors.push("CPU Socket not included in CPU Cooler's supported Sockets.");}
      }
      if(this.pickedCase){
        if(!this.pickedCPUCooler.watercooled && this.pickedCase.maxCoolerHeight < this.pickedCPUCooler.height)
        {this.compatibilityErrors.push("CPU Cooler ("+this.pickedCPUCooler.height+
          "mm) is too tall for the Case's maximum cooler height of "+this.pickedCase.maxCoolerHeight+"mm.");}
      }
      if(this.pickedCPUCooler.watercooled) {
        if((this.fans120 ?? 0) < 0 || (this.fans120 ?? 0) < 0 || (this.fans140 ?? 0) < 0) {
          this.compatibilityErrors.push("Radiator size of CPU Cooler doesn't fit in Case, not enough Fan Slots present.");
        } else {
          this.warnings.push("Radiator size of CPU Cooler may not fit in Case, even though enough fan slots are present.");
        }
      }
      if(this.pickedMemories)
      {this.warnings.push("CPU Cooler may not have enough clearance for selected Memory modules.");}
    }

  }
  checkMotherboard(): void{
    if(this.pickedMotherboard){
      if(this.pickedMemories){
        let totalModules: number = 0;
        let generations: MemoryGeneration[] = [];
        let speeds: number[] = [];
        let wrongSpeeds: number = 0;
        for(const element of this.pickedMemories) {
          totalModules += element.modules;
          if (!generations.includes(element.generation)) {
            generations.push(element.generation);
          }
          if (!speeds.includes(element.speed)) {
            speeds.push(element.speed);}
        }
        if(totalModules > this.pickedMotherboard.memorySlots){this.compatibilityErrors.push("Total Memory Modules exceed Motherboard's Memory Slots.");}
        if(generations.length > 1){this.compatibilityErrors.push("Picked Memories include multiple generations.");}
        else if(generations[0] !== this.pickedMotherboard.memoryGeneration)
        {this.compatibilityErrors.push("Picked Memories generation differs from Motherboard Memory generation.");}

        for(const element of speeds) {
          if (!this.pickedMotherboard.memorySpeeds.includes(element)){
            wrongSpeeds++;
          }
        }
        if(wrongSpeeds > 0)
        {this.compatibilityErrors.push(wrongSpeeds + " of " + this.pickedMemories.length + " Memories run at speeds not supported by the Motherboard.");}
      }

      if(this.pickedSATA){
        if(this.pickedSATA.length > this.pickedMotherboard.sata)
        {this.compatibilityErrors.push("More SATA Drives picked than available SATA Connectors on Motherboard.");}
      }

      if(this.pickedM2){
        if(this.pickedM2.length > this.pickedMotherboard.m2Slots)
        {this.compatibilityErrors.push("More M.2 Drives picked than available M.2 Connectors on Motherboard.");}
        else {
          let forms: StorageFormFactor[] = [];
          let wrongForms: number = 0;
          for(const element of this.pickedM2) {
            if (!forms.includes(element.storageFormFactor)) {
              forms.push(element.storageFormFactor);}
          }
          for(const element of forms) {
            if (!this.pickedMotherboard.storageFormFactors.includes(element)){wrongForms++;}
          }
          if(wrongForms > 0)
          {this.compatibilityErrors.push(wrongForms+" of the "+this.pickedM2.length+" M.2 Drives have form factors unsupported by the Motherboard.")}
        }
      }

      if(this.pickedFans){
        if(this.pickedFans.length > this.pickedMotherboard.pwmHeader)
        {this.warnings.push(this.pickedFans.length+" Fans exceed the Motherboard's "+this.pickedMotherboard.pwmHeader+" PWM Headers. " +
          "A Fan Hub, Daisy Chains or PWM Splitters will be necessary.")}
        let num:number = 0;
        for(const element of this.pickedFans) {
          if (element.rgbPresent){num++;}
        }
        if(num > this.pickedMotherboard.rgbHeader)
        {this.warnings.push(num+" RGB Fans were selected, with only "+this.pickedMotherboard.rgbHeader+" RGB Headers on the Motherboard. " +
          "A Fan Hub, RGB Splitter or similar will be necessary. ")}
      }

      if(this.pickedGPUs){
        if(this.pickedGPUs.length > this.pickedMotherboard.pciex16)
        {this.compatibilityErrors.push(this.pickedGPUs.length+" GPUs were picked for only "+this.pickedMotherboard.pciex16+
          " available PCIex16 Slots of the Motherboard.")}
      }
    }
  }
  checkMemory(): void{
    if(this.pickedMemories){
      let generations: MemoryGeneration[] = [];
      let speeds: number[] = [];
      for(const element of this.pickedMemories) {
        if (!generations.includes(element.generation)) {
          generations.push(element.generation);
        }
        if (!speeds.includes(element.speed)) {
          speeds.push(element.speed);}
      }
      if(generations.length > 1){this.compatibilityErrors.push("Picked Memories include multiple generations.");}
      if(speeds.length > 1){this.warnings.push("Picked Memories include multiple speeds, which may lead to instability.");}
    }
  }
  checkPSU(): void{
    if(this.pickedPSU){
      if(this.pickedCase){
        let forms: PSUFormFactor[] = [];
        for(const element of this.pickedCase.compatiblePSUFormFactors) {
          if (this.pickedPSU.formFactor === element) {
            forms.push(element);
          }
        }
        if(forms.length === 0)
        {this.compatibilityErrors.push("PSU form factor "+this.pickedPSU.formFactor+" not compatible with Case.");}
      }

      if(this.pickedPSU.wattage < this.componentsService.estimatedWattage*0.8)
      {this.compatibilityErrors.push("PSU wattage is too low. Please pick a PSU with somewhere between "
        +this.componentsService.estimatedWattage*0.8+"W and "+this.componentsService.estimatedWattage+"W. ");}
    }

  }
  checkCase(): void{
    if(this.pickedCase){
      if(this.picked80F){
        if(this.picked80F.length > (this.fans80 ?? 0))
        {this.compatibilityErrors.push("More 80mm Fans are selected than there are 80mm Fan slots present in the Case.")}
      }
      if(this.picked120F) {
        console.log("fans120", this.fans120)
        console.log("picked120", this.picked120F.length);
        if (this.picked120F.length > (this.fans120 ?? 0)) {
          this.compatibilityErrors.push("More 120mm Fans are selected than there are 120mm Fan slots present in the Case.")
        }
      }
      if(this.picked140F){
        if(this.picked140F.length > (this.fans140 ?? 0))
        {this.compatibilityErrors.push("More 140mm Fans are selected than there are 140mm Fan slots present in the Case.")}
      }
      if(this.pickedMotherboard){
        if(this.pickedMotherboard.formFactor !== this.pickedCase.motherboardFormFactor)
        {this.compatibilityErrors.push("Motherboard Form Factor "+this.pickedMotherboard.formFactor+
          " doesn't match Case's Form Factor "+this.pickedCase.motherboardFormFactor+".")}
        this.warnings.push("Motherboard Headers and Case Ports may not match, an Adapter may be required.")
      }
      if(this.pickedGPUs){
        let a:number = 0;
        for(const element of this.pickedGPUs) {
          if (element.length > this.pickedCase.maxCardLength) {a++;}
        }
        if(a>0){this.compatibilityErrors.push(a+" of the picked GPUs exceed the Case's maximum card length of "+this.pickedCase.maxCardLength);}
      }
      if(this.pickedMotherboard){
        if(this.pickedSATA){
          if(this.pickedSATA.length > (this.pickedCase.driveBays25 + this.pickedCase.driveBays35))
          {this.warnings.push("More SATA Storages are chosen than there are drive bays in the Case. Other means of securing the drives must be found.");}
        }
      }
    }
  }

  addAllToCart(): void{
    this.pickedCPU?this.shoppingService.addToCart(this.pickedCPU):0;
    this.pickedCPUCooler?this.shoppingService.addToCart(this.pickedCPUCooler):0;
    this.pickedMotherboard?this.shoppingService.addToCart(this.pickedMotherboard):0;
    this.pickedMemories?this.pickedMemories.forEach(item => this.shoppingService.addToCart(item)):0;
    this.pickedGPUs?this.pickedGPUs.forEach(item => this.shoppingService.addToCart(item)):0;
    this.pickedStorages?this.pickedStorages.forEach(item => this.shoppingService.addToCart(item)):0;
    this.pickedFans?this.pickedFans.forEach(item => this.shoppingService.addToCart(item)):0;
    this.pickedCase?this.shoppingService.addToCart(this.pickedCase):0;
    this.pickedPSU?this.shoppingService.addToCart(this.pickedPSU):0;
  }
  calculateTotal(): void{
    this.total = 0.00;
    this.pickedCPU?this.total+=this.pickedCPU.price:0;
    this.pickedCPUCooler?this.total+=this.pickedCPUCooler.price:0;
    this.pickedMotherboard?this.total+=this.pickedMotherboard.price:0;
    this.pickedCase?this.total+=this.pickedCase.price:0;
    this.pickedPSU?this.total+=this.pickedPSU.price:0;
    if(this.pickedGPUs){for(let i=0; i<this.pickedGPUs.length;i++){this.total += this.pickedGPUs[i].price}}
    if(this.pickedMemories){for(let i=0; i<this.pickedMemories.length;i++){this.total += this.pickedMemories[i].price}}
    if(this.pickedFans){for(let i=0; i<this.pickedFans.length;i++){this.total += this.pickedFans[i].price}}
    if(this.pickedStorages){for(let i=0; i<this.pickedStorages.length;i++){this.total += this.pickedStorages[i].price}}
  }

  isOverlayVisibleError = false;
  isOverlayVisibleWarn = false;

  showOverlayError(): void {
    this.isOverlayVisibleError = true;
  }

  hideOverlayError(): void {
    this.isOverlayVisibleError = false;
  }

  showOverlayWarn(): void {
    this.isOverlayVisibleError = true;
  }

  hideOverlayWarn(): void {
    this.isOverlayVisibleError = false;
  }

  protected readonly ComponentType = ComponentType;
  protected readonly StorageInterface = StorageInterface;
}
