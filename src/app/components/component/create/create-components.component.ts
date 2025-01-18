import {Component} from '@angular/core';
import {
  Case,
  CaseSidepanel,
  ComponentType,
  CPU, CPUCooler, Fan, GPU,
  GPUMemoryGeneration, Memory,
  MemoryGeneration, Motherboard,
  MotherboardChipset,
  MotherboardFormFactor, PSU,
  PSUFormFactor,
  Socket,
  Storage,
  StorageFormFactor,
  StorageInterface,
  StorageType,
  WIFI
} from '../../../model/component.model';
import {ComponentsService} from '../../../services/components.service';
import {UserType} from '../../../model/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-components.component.html',
  styleUrls: ['./create-components.component.css'],
})
export class CreateComponentsComponent {
  errorMessage: string = "Drag and drop an image here or click to select. 64KB JPEG/PNG only.";
  isDragOver = false;
  imagePreviewUrl: string | null = null;

  constructor(public componentService: ComponentsService, private router: Router,) {}
  valueStorage = {
    name: "",
    quantityStock: 0,
    price: 0.00,
    reorderQuantity: 0,
    image: "",
    type: ComponentType.CASE,
    casSidepanel: CaseSidepanel.FULL,
    color: "",
    motherboardFormFactor: MotherboardFormFactor.ATX,
    maxCoolerHeight: 0,
    maxCardLength: 0,
    fans80: 0,
    fans120: 0,
    fans140: 0,
    usb2Port: 0,
    usb3Gen1Port: 0,
    usb3Gen2Port: 0,
    usb3Gen2x2Port: 0,
    usbTypeCPort: 0,
    driveBays35: 0,
    driveBays25: 0,
    compatiblePSUFormFactors: [] as PSUFormFactor[],
    clock: 0,
    boostClock: 0,
    tdp: 0,
    cores: 0,
    threads: 0,
    socket: Socket.AM5,
    l2Cache: 0,
    l3Cache: 0,
    iGPU: false,
    maxMemory: 0,
    fanRPM: 0,
    noise: 0,
    height: 0,
    sockets: [] as Socket[],
    isFanless: false,
    isWatercooled: false,
    size: 0,
    airflow: 0,
    rgbPresent: false,
    pwm4PinPresent: false,
    dc3PinPresent: false,
    splitterPresent: false,
    memory: 0,
    gpuMemoryGeneration: GPUMemoryGeneration.GDDR7,
    length: 0,
    hdmiPorts: 0,
    dpPorts: 0,
    usbCPorts: 0,
    slots: 0,
    speed: 4800,
    memoryGeneration: MemoryGeneration.DDR5,
    modules: 0,
    latency: 0,
    voltage: 0,
    hasHeatSpreaders: false,
    motherboardChipset: MotherboardChipset.X670E,
    memorySlots: 0,
    memorySpeeds: [] as number[],
    pciex16: 0,
    pciex8: 0,
    pciex4: 0,
    pciex1: 0,
    storageFormFactors: [] as StorageFormFactor[],
    m2slots: 0,
    sata: 0,
    usb2Header: 0,
    usb3Gen1Header: 0,
    usb3Gen2Header: 0,
    usb3Gen2x2Header: 0,
    usbTypeCHeader: 0,
    pwmHeader: 0,
    rgbHeader: 0,
    wifi: WIFI.WIFI7,
    raidSupported: false,
    wattage: 0,
    efficiency: 0,
    psuFormFactor: PSUFormFactor.ATX3,
    pcie6Pins: 0,
    eps8Pins: 0,
    sataConnectors: 0,
    molex4Pins: 0,
    hpr12vPresent: false,
    modular: false,
    storageType: StorageType.SSD,
    capacity: 0,
    storageInterface: StorageInterface.M2,
    storageformFactor: StorageFormFactor.M2280,
    read: 0,
    write: 0,
    withHeatSink: false,
    feedbackMessage: "",
  }
  inputValue: string = '';
  inputValue2: string = '';
  suggestions: any[] = [];
  suggestions2: any[] = [];

  onMemoryGenChange(memoryGeneration: MemoryGeneration): void{
    this.valueStorage.memoryGeneration = memoryGeneration;
    const a =  this.componentService.memSpeedMap.get(memoryGeneration);
    if(a){
      this.valueStorage.speed = a[0];
    }
  }
  onSocketChange(socket: Socket): void{
    this.valueStorage.socket = socket;
    const a = this.componentService.chipsetMap.get(socket);
    const b = this.componentService.socketMemMap.get(socket);
    if(a){
      this.valueStorage.motherboardChipset = a[0];
    }
    if(b){
      this.valueStorage.memoryGeneration = b[0];
    }
  }
  onStorageTypeChange(type: StorageType): void{
    this.valueStorage.storageType = type;
    const a = this.componentService.storageInterfaceMap.get(type);
    const b = this.componentService.storageFormMap.get(type);
    if(a){
      this.valueStorage.storageInterface = a[0];
    }
    if(b){
      this.valueStorage.storageformFactor = b[0];
    }
  }

  onSubmit(form: any): void{
    if(form.valid){
      this.valueStorage.feedbackMessage = "";
      if(this.valueStorage.type === ComponentType.CASE){
        const comp: Case = new Case(this.valueStorage.name, this.valueStorage.quantityStock, this.valueStorage.price, this.valueStorage.reorderQuantity,
          this.valueStorage.image, this.valueStorage.type, this.valueStorage.casSidepanel, this.valueStorage.color,
          this.valueStorage.motherboardFormFactor, this.valueStorage.maxCoolerHeight, this.valueStorage.maxCardLength, this.valueStorage.fans80,
          this.valueStorage.fans120, this.valueStorage.fans140, this.valueStorage.usb2Port, this.valueStorage.usb3Gen1Port,
          this.valueStorage.usb3Gen2Port, this.valueStorage.usb3Gen2x2Port, this.valueStorage.usbTypeCPort,
          this.valueStorage.driveBays35, this.valueStorage.driveBays25, this.valueStorage.compatiblePSUFormFactors);

        this.componentService.createCase(comp).subscribe(
          response => this.handleCreation(response, form),
          error => this.handleError(error)
        );
      } else if(this.valueStorage.type === ComponentType.CPU){
        const comp: CPU = new CPU(this.valueStorage.name, this.valueStorage.quantityStock, this.valueStorage.price, this.valueStorage.reorderQuantity,
          this.valueStorage.image, this.valueStorage.type, this.valueStorage.clock, this.valueStorage.boostClock,
          this.valueStorage.tdp, this.valueStorage.cores, this.valueStorage.threads,
          this.valueStorage.socket, this.valueStorage.l2Cache, this.valueStorage.l3Cache,
          this.valueStorage.iGPU, this.valueStorage.maxMemory);

        this.componentService.createCPU(comp).subscribe(
          response => this.handleCreation(response, form),
          error => this.handleError(error)
        );
      } else if(this.valueStorage.type === ComponentType.CPUCOOLER){
        const comp: CPUCooler = new CPUCooler(this.valueStorage.name, this.valueStorage.quantityStock, this.valueStorage.price, this.valueStorage.reorderQuantity,
          this.valueStorage.image, this.valueStorage.type, this.valueStorage.fanRPM, this.valueStorage.noise,
          this.valueStorage.color, this.valueStorage.height, this.valueStorage.sockets,
          this.valueStorage.isFanless, this.valueStorage.isWatercooled);

        this.componentService.createCPUCooler(comp).subscribe(
          response => this.handleCreation(response, form),
          error => this.handleError(error)
        );
      } else if(this.valueStorage.type === ComponentType.FAN){
        const comp: Fan = new Fan(this.valueStorage.name, this.valueStorage.quantityStock, this.valueStorage.price, this.valueStorage.reorderQuantity,
          this.valueStorage.image, this.valueStorage.type, this.valueStorage.size, this.valueStorage.fanRPM,
          this.valueStorage.airflow, this.valueStorage.noise, this.valueStorage.rgbPresent,
          this.valueStorage.pwm4PinPresent, this.valueStorage.dc3PinPresent, this.valueStorage.splitterPresent,
          this.valueStorage.color);

        this.componentService.createFan(comp).subscribe(
          response => this.handleCreation(response, form),
          error => this.handleError(error)
        );
      } else if(this.valueStorage.type === ComponentType.GPU){
        const comp: GPU = new  GPU(this.valueStorage.name, this.valueStorage.quantityStock, this.valueStorage.price, this.valueStorage.reorderQuantity,
          this.valueStorage.image, this.valueStorage.type, this.valueStorage.memory, this.valueStorage.gpuMemoryGeneration,
          this.valueStorage.clock, this.valueStorage.boostClock, this.valueStorage.color, this.valueStorage.length,
          this.valueStorage.tdp, this.valueStorage.hdmiPorts, this.valueStorage.dpPorts,
          this.valueStorage.usbCPorts, this.valueStorage.slots);

        this.componentService.createGPU(comp).subscribe(
          response => this.handleCreation(response, form),
          error => this.handleError(error)
        );
      } else if(this.valueStorage.type === ComponentType.MEMORY){
        const comp: Memory = new Memory(this.valueStorage.name, this.valueStorage.quantityStock, this.valueStorage.price, this.valueStorage.reorderQuantity,
          this.valueStorage.image, this.valueStorage.type, this.valueStorage.memory, this.valueStorage.speed, this.valueStorage.memoryGeneration,
          this.valueStorage.modules, this.valueStorage.color, this.valueStorage.latency,
          this.valueStorage.voltage, this.valueStorage.hasHeatSpreaders);

        this.componentService.createMemory(comp).subscribe(
          response => this.handleCreation(response, form),
          error => this.handleError(error)
        );
      } else if(this.valueStorage.type === ComponentType.MOTHERBOARD){
        const comp: Motherboard = new Motherboard(this.valueStorage.name, this.valueStorage.quantityStock, this.valueStorage.price, this.valueStorage.reorderQuantity,
          this.valueStorage.image, this.valueStorage.type, this.valueStorage.socket, this.valueStorage.motherboardFormFactor, this.valueStorage.motherboardChipset,
          this.valueStorage.memoryGeneration, this.valueStorage.memorySlots, this.valueStorage.memorySpeeds, this.valueStorage.pciex16, this.valueStorage.pciex8,
          this.valueStorage.pciex4, this.valueStorage.pciex1, this.valueStorage.storageFormFactors, this.valueStorage.m2slots, this.valueStorage.sata,
          this.valueStorage.usb2Header, this.valueStorage.usb3Gen1Header, this.valueStorage.usb3Gen2Header, this.valueStorage.usb3Gen2x2Header,
          this.valueStorage.usbTypeCHeader, this.valueStorage.pwmHeader, this.valueStorage.rgbHeader, this.valueStorage.wifi, this.valueStorage.raidSupported);

        this.componentService.createMotherboard(comp).subscribe(
          response => this.handleCreation(response, form),
          error => this.handleError(error)
        );
      } else if(this.valueStorage.type === ComponentType.PSU){
        const comp: PSU = new PSU(this.valueStorage.name, this.valueStorage.quantityStock, this.valueStorage.price, this.valueStorage.reorderQuantity,
          this.valueStorage.image, this.valueStorage.type, this.valueStorage.wattage, this.valueStorage.efficiency,
          this.valueStorage.psuFormFactor, this.valueStorage.pcie6Pins, this.valueStorage.eps8Pins, this.valueStorage.sataConnectors, this.valueStorage.molex4Pins,
          this.valueStorage.hpr12vPresent, this.valueStorage.modular, this.valueStorage.color);

        this.componentService.createPSU(comp).subscribe(
          response => this.handleCreation(response, form),
          error => this.handleError(error)
        );
      } else if(this.valueStorage.type === ComponentType.STORAGE){
        const comp: Storage = new Storage(this.valueStorage.name, this.valueStorage.quantityStock, this.valueStorage.price, this.valueStorage.reorderQuantity,
          this.valueStorage.image, this.valueStorage.type, this.valueStorage.storageType, this.valueStorage.capacity,
          this.valueStorage.storageInterface, this.valueStorage.storageformFactor, this.valueStorage.read, this.valueStorage.write, this.valueStorage.withHeatSink);

        this.componentService.createStorage(comp).subscribe(
          response => this.handleCreation(response, form),
          error => this.handleError(error)
        );
      }
    } else{
      this.valueStorage.feedbackMessage = "Please fill in all fields."
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      });
    }
  }
  toPageBlank(nav: string){
    this.router.navigate([nav]);
  }
  private handleCreation(response: any, form: any): void {
    this.generateImagePreview(null);
    this.valueStorage.name = "";
    this.valueStorage.quantityStock = 0;
    this.valueStorage.price = 0.00;
    this.valueStorage.reorderQuantity = 0;
    this.valueStorage.image = "";
    this.valueStorage.casSidepanel = CaseSidepanel.MESH;
    this.valueStorage.color = "";
    this.valueStorage.motherboardFormFactor = MotherboardFormFactor.ATX;
    this.valueStorage.maxCardLength = 0;
    this.valueStorage.usb3Gen1Port = 0;
    this.valueStorage.usb3Gen2Port = 0;
    this.valueStorage.usb3Gen2x2Port = 0;
    this.valueStorage.usbTypeCPort = 0;
    this.valueStorage.driveBays35 = 0;
    this.valueStorage.driveBays25 = 0;
    this.valueStorage.compatiblePSUFormFactors = [];
    this.valueStorage.clock = 0;
    this.valueStorage.boostClock = 0;
    this.valueStorage.tdp = 0;
    this.valueStorage.cores = 0;
    this.valueStorage.threads = 0;
    this.valueStorage.socket = Socket.AM5;
    this.valueStorage.l2Cache = 0;
    this.valueStorage.l3Cache = 0;
    this.valueStorage.iGPU = false;
    this.valueStorage.maxMemory = 0;
    this.valueStorage.fanRPM = 0;
    this.valueStorage.noise = 0;
    this.valueStorage.height = 0;
    this.valueStorage.sockets = [];
    this.valueStorage.isFanless = false;
    this.valueStorage.isWatercooled = false;
    this.valueStorage.size = 0;
    this.valueStorage.airflow = 0;
    this.valueStorage.rgbPresent = false;
    this.valueStorage.pwm4PinPresent = false;
    this.valueStorage.dc3PinPresent = false;
    this.valueStorage.splitterPresent = false;
    this.valueStorage.memory = 0;
    this.valueStorage.gpuMemoryGeneration = GPUMemoryGeneration.GDDR6X;
    this.valueStorage.length = 0;
    this.valueStorage.hdmiPorts = 0;
    this.valueStorage.dpPorts = 0;
    this.valueStorage.usbCPorts = 0;
    this.valueStorage.slots = 0;
    this.valueStorage.speed = 0;
    this.valueStorage.memoryGeneration = MemoryGeneration.DDR5;
    this.valueStorage.modules = 0;
    this.valueStorage.latency = 0;
    this.valueStorage.voltage = 0;
    this.valueStorage.hasHeatSpreaders = false;
    this.valueStorage.motherboardChipset = MotherboardChipset.X670E;
    this.valueStorage.memorySlots = 0;
    this.valueStorage.memorySpeeds = [];
    this.valueStorage.pciex16 = 0;
    this.valueStorage.pciex8 = 0;
    this.valueStorage.pciex4 = 0;
    this.valueStorage.pciex1 = 0;
    this.valueStorage.storageFormFactors = [];
    this.valueStorage.sata = 0;
    this.valueStorage.usb2Header = 0;
    this.valueStorage.usb3Gen1Header = 0;
    this.valueStorage.usb3Gen2Header = 0;
    this.valueStorage.usb3Gen2x2Header = 0;
    this.valueStorage.usbTypeCHeader = 0;
    this.valueStorage.rgbHeader = 0;
    this.valueStorage.pwmHeader = 0;
    this.valueStorage.wifi = WIFI.WIFI6E;
    this.valueStorage.raidSupported = false;
    this.valueStorage.wattage = 0;
    this.valueStorage.efficiency = 0;
    this.valueStorage.psuFormFactor = PSUFormFactor.ATX3;
    this.valueStorage.pcie6Pins = 0;
    this.valueStorage.eps8Pins = 0;
    this.valueStorage.sataConnectors = 0;
    this.valueStorage.molex4Pins = 0;
    this.valueStorage.hpr12vPresent = false;
    this.valueStorage.modular = false;
    this.valueStorage.storageType = StorageType.SSD;
    this.valueStorage.capacity = 0;
    this.valueStorage.storageInterface = StorageInterface.M2;
    this.valueStorage.storageformFactor = StorageFormFactor.M2280;
    this.valueStorage.withHeatSink = false;
    this.valueStorage.feedbackMessage = "";
    this.componentService.triggerRefreshUserList();
    Object.values(form.controls).forEach((control: any) => {
      control.markAsUntouched();
    });
    this.valueStorage.feedbackMessage = "Component successfully created!"
  }
  private handleError(error: any): void {
    console.error("Error creating component", error);
    this.valueStorage.feedbackMessage = "Error creating component." + error;
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
            this.valueStorage.image = btoa(String.fromCharCode(...new Uint8Array(reader.result)));
            console.log('Image as Base64:', this.valueStorage.image);
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
    this.errorMessage = "Drag and drop an image here or click to select. 64KB JPEG/PNG only."
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

  protected readonly ComponentType = ComponentType;
}
