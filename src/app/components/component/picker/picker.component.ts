import {Component} from "@angular/core";
import {ComponentsService} from '../../../services/components.service';
import {ActivatedRoute, Router} from '@angular/router';
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
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ShoppingService} from '../../../services/shopping.service';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({opacity: 0})),
      transition(':enter', [animate('300ms ease-in')]),
      transition(':leave', [animate('300ms ease-out')]),
    ])
  ],
})
export class PickerComponent {

  constructor(public componentsService: ComponentsService, private route: ActivatedRoute,
              private router: Router, public shoppingService: ShoppingService) {}

  type: ComponentType | null = null;
  variant: string | null = null;
  CPUs: CPU[] | null = null;
  CPUCoolers: CPUCooler[] | null = null;
  Motherboards: Motherboard[] | null = null;
  Memories: Memory[] | null = null;
  GPUs: GPU[] | null = null;
  Storages: Storage[] | null = null;
  PSUs: PSU[] | null = null;
  Cases: Case[] | null = null;
  Fans: Fan[] | null = null;
  Fans80: Fan[] | null = null;
  Fans120: Fan[] | null = null;
  Fans140: Fan[] | null = null;

  sliderFilters: { [key: string]: number | null } = {}
  socketFilter: { [key: string]: boolean } = {}
  memGenFilter: { [key: string]: boolean } = {}
  memSpeedFilter: {[key: string]: boolean} = {}
  motherboardFormFilter: { [key: string]: boolean } = {}
  motherboardChipsetFilter: { [key: string]: boolean } = {}
  wifiFilter: {[key: string]: boolean} = {}
  storageTypeFilter: {[key: string]: boolean} = {}
  storageFormFilter: { [key: string]: boolean } = {}
  storageInterfaceFilter: { [key: string]: boolean } = {}
  checkboxFilter1: { [key: string]: boolean } = {
    "true": true,
    "false": true,
  }
  checkboxFilter2: { [key: string]: boolean } = {
    "true": true,
    "false": true,
  }
  searchQuery: string = "";
  tabs: { [key: string]: boolean } = {};


  ngOnInit(): void {
    this.loadComponents();

    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') as ComponentType;
      this.variant = params.get('variant')!;
      this.loadComponents();
    });

    /*if(this.type === ComponentType.FAN && this.variant === ''){this.filters['showFan'] = true}
    if(this.type === ComponentType.FAN && this.variant === '80'){this.filters['showFan80'] = true}
    if(this.type === ComponentType.FAN && this.variant === '120'){this.filters['showFan120'] = true}
    if(this.type === ComponentType.FAN && this.variant === '140'){this.filters['showFan140'] = true}
    if(this.type === ComponentType.STORAGE && this.variant === ''){this.filters['showStorage'] = true}
    if(this.type === ComponentType.CASE && this.variant === 'sata'){this.filters['showSATA'] = true}
    if(this.type === ComponentType.CASE && this.variant === 'm2'){this.filters['showM2'] = true}*/

  }

  loadComponents(): void {
    this.prepCPU();
    this.prepCPUCooler();
    this.prepMotherboard();
    this.prepMemory();
    this.prepGPU();
    this.prepStorage();
    this.prepPSU();
    this.prepCase();
    this.prepFan();
  }

  prepCPU(): void {
    if (this.type === ComponentType.CPU) {
      this.componentsService.getCPUs().subscribe((data: CPU[]) => {
        this.CPUs = data;
        this.CPUs.forEach(cpu => {
          this.updateSliderFilters(this.sliderFilters, 'Clock', cpu.clock);
          this.updateSliderFilters(this.sliderFilters, 'Boost', cpu.boostClock);
          this.updateSliderFilters(this.sliderFilters, 'Price', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'Memory', cpu.maxMemory);
          this.updateSliderFilters(this.sliderFilters, 'TDP', cpu.tdp);
          this.updateSliderFilters(this.sliderFilters, 'Cores', cpu.cores);
          this.updateSliderFilters(this.sliderFilters, 'Threads', cpu.threads);
          this.updateSliderFilters(this.sliderFilters, 'L2', cpu.l2Cache);
          this.updateSliderFilters(this.sliderFilters, 'L3', cpu.l3Cache);
          this.updateSliderFilters(this.sliderFilters, 'SelectedClock', cpu.clock);
          this.updateSliderFilters(this.sliderFilters, 'SelectedBoost', cpu.boostClock);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPrice', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'SelectedMemory', cpu.maxMemory);
          this.updateSliderFilters(this.sliderFilters, 'SelectedTDP', cpu.tdp);
          this.updateSliderFilters(this.sliderFilters, 'SelectedCores', cpu.cores);
          this.updateSliderFilters(this.sliderFilters, 'SelectedThreads', cpu.threads);
          this.updateSliderFilters(this.sliderFilters, 'SelectedL2', cpu.l2Cache);
          this.updateSliderFilters(this.sliderFilters, 'SelectedL3', cpu.l3Cache);
        });

        this.initMemoryFilter();
        this.initSocketFilter();

      }, (error) => {
        console.error('Failed to fetch cpus:', error);
      });
    }
  }

  prepCPUCooler(): void {
    if (this.type === ComponentType.CPUCOOLER) {
      this.componentsService.getCPUCoolers().subscribe((data: CPUCooler[]) => {
        this.CPUCoolers = data;
        this.CPUCoolers.forEach(cpu => {
          this.updateSliderFilters(this.sliderFilters, 'RPM', cpu.fanRPM);
          this.updateSliderFilters(this.sliderFilters, 'Height', cpu.height);
          this.updateSliderFilters(this.sliderFilters, 'Price', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'SelectedRPM', cpu.fanRPM);
          this.updateSliderFilters(this.sliderFilters, 'SelectedHeight', cpu.height);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPrice', cpu.price);
        });

        this.initMemoryFilter();
        this.initSocketFilter();
        this.initHeightFilter();

      }, (error) => {
        console.error('Failed to fetch cpu coolers:', error);
      });
    }
  }

  prepMotherboard(): void {
    if (this.type === ComponentType.MOTHERBOARD) {
      this.componentsService.getMotherboards().subscribe((data: Motherboard[]) => {
        this.Motherboards = data;
        this.Motherboards.forEach(cpu => {
          this.updateSliderFilters(this.sliderFilters, 'MemSlots', cpu.memorySlots);
          this.updateSliderFilters(this.sliderFilters, 'Pciex16', cpu.pciex16);
          this.updateSliderFilters(this.sliderFilters, 'Pciex8', cpu.pciex8);
          this.updateSliderFilters(this.sliderFilters, 'Pciex4', cpu.pciex4);
          this.updateSliderFilters(this.sliderFilters, 'Pciex1', cpu.pciex1);
          this.updateSliderFilters(this.sliderFilters, 'Usb2Header', cpu.usb2Header);
          this.updateSliderFilters(this.sliderFilters, 'Usb3Gen1Header', cpu.usb3Gen1Header);
          this.updateSliderFilters(this.sliderFilters, 'Usb3Gen2Header', cpu.usb3Gen2Header);
          this.updateSliderFilters(this.sliderFilters, 'UsbTypeCHeader', cpu.usbTypeCHeader);
          this.updateSliderFilters(this.sliderFilters, 'Usb3Gen2x2Header', cpu.usb3Gen2x2Header);
          this.updateSliderFilters(this.sliderFilters, 'PwmHeader', cpu.pwmHeader);
          this.updateSliderFilters(this.sliderFilters, 'RgbHeader', cpu.rgbHeader);
          this.updateSliderFilters(this.sliderFilters, 'Sata', cpu.sata);
          this.updateSliderFilters(this.sliderFilters, 'M2', cpu.m2Slots);
          this.updateSliderFilters(this.sliderFilters, 'Price', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'SelectedMemSlots', cpu.memorySlots);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPciex16', cpu.pciex16);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPciex8', cpu.pciex8);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPciex4', cpu.pciex4);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPciex1', cpu.pciex1);
          this.updateSliderFilters(this.sliderFilters, 'SelectedUsb2Header', cpu.usb2Header);
          this.updateSliderFilters(this.sliderFilters, 'SelectedUsb3Gen1Header', cpu.usb3Gen1Header);
          this.updateSliderFilters(this.sliderFilters, 'SelectedUsb3Gen2Header', cpu.usb3Gen2Header);
          this.updateSliderFilters(this.sliderFilters, 'SelectedUsbTypeCHeader', cpu.usbTypeCHeader);
          this.updateSliderFilters(this.sliderFilters, 'SelectedUsb3Gen2x2Header', cpu.usb3Gen2x2Header);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPwmHeader', cpu.pwmHeader);
          this.updateSliderFilters(this.sliderFilters, 'SelectedRgbHeader', cpu.rgbHeader);
          this.updateSliderFilters(this.sliderFilters, 'SelectedSata', cpu.sata);
          this.updateSliderFilters(this.sliderFilters, 'SelectedM2', cpu.m2Slots);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPrice', cpu.price);
        });

        this.initMemoryFilter();
        this.initSocketFilter();
        this.initPCIeFilter();
        this.initStorageInterfaceFilter();
        this.initMotherboardFormFilter();
        this.initWifi();
        this.onMoboSocketChange();
      });
    }
  }

  prepMemory(): void {
    if (this.type === ComponentType.MEMORY) {
      this.componentsService.getMemories().subscribe((data: Memory[]) => {
        this.Memories = data;
        this.Memories.forEach(cpu => {
          this.updateSliderFilters(this.sliderFilters, 'Memory', cpu.memory);
          this.updateSliderFilters(this.sliderFilters, 'Price', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'Modules', cpu.modules);
          this.updateSliderFilters(this.sliderFilters, 'CAS', cpu.latency);
          this.updateSliderFilters(this.sliderFilters, 'SelectedMemory', cpu.memory);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPrice', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'SelectedModules', cpu.modules);
          this.updateSliderFilters(this.sliderFilters, 'SelectedCAS', cpu.latency);
        });

        this.initSocketFilter();
        this.initMemoryFilter();
        this.onMemGenChange();
      });
    }
  }

  prepGPU(): void{
    if(this.type === ComponentType.GPU){
      this.componentsService.getGPUs().subscribe((data: GPU[]) => {
        this.GPUs = data;
        this.GPUs.forEach(cpu => {
          this.updateSliderFilters(this.sliderFilters, 'Memory', cpu.memory);
          this.updateSliderFilters(this.sliderFilters, 'Price', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'Clock', cpu.clock);
          this.updateSliderFilters(this.sliderFilters, 'Boost', cpu.boostClock);
          this.updateSliderFilters(this.sliderFilters, 'TDP', cpu.tdp);
          this.updateSliderFilters(this.sliderFilters, 'Length', cpu.length);
          this.updateSliderFilters(this.sliderFilters, 'Slots', cpu.slots);
          this.updateSliderFilters(this.sliderFilters, 'SelectedMemory', cpu.memory);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPrice', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'SelectedClock', cpu.clock);
          this.updateSliderFilters(this.sliderFilters, 'SelectedBoost', cpu.boostClock);
          this.updateSliderFilters(this.sliderFilters, 'SelectedTDP', cpu.tdp);
          this.updateSliderFilters(this.sliderFilters, 'SelectedLength', cpu.length);
          this.updateSliderFilters(this.sliderFilters, 'SelectedSlots', cpu.slots);

          this.initGPULength();
          this.initGPUMem();
        });
      });
    }
  }

  prepStorage(): void{
    if(this.type === ComponentType.STORAGE){
      this.componentsService.getStorages().subscribe((data: Storage[]) => {
        this.Storages = data;
        this.Storages.forEach(cpu => {
          this.updateSliderFilters(this.sliderFilters, 'Capacity', cpu.capacity);
          this.updateSliderFilters(this.sliderFilters, 'Read', cpu.readSpeed);
          this.updateSliderFilters(this.sliderFilters, 'Write', cpu.writeSpeed);
          this.updateSliderFilters(this.sliderFilters, 'Price', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'SelectedCapacity', cpu.capacity);
          this.updateSliderFilters(this.sliderFilters, 'SelectedRead', cpu.readSpeed);
          this.updateSliderFilters(this.sliderFilters, 'SelectedWrite', cpu.writeSpeed);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPrice', cpu.price);

          this.initStorageTypeFilter();
          this.onStorageTypeChange();
          this.initStorageFormFilter();
        });
      });
    }
  }

  prepPSU(): void{
    if(this.type === ComponentType.PSU){
      this.componentsService.getPSUs().subscribe((data: PSU[]) => {
        this.PSUs = data;
        this.PSUs.forEach(cpu => {
          this.updateSliderFilters(this.sliderFilters, 'Wattage', cpu.wattage);
          this.updateSliderFilters(this.sliderFilters, 'Efficiency', cpu.efficiency);
          this.updateSliderFilters(this.sliderFilters, '6Pins', cpu.pcie6Pins);
          this.updateSliderFilters(this.sliderFilters, 'EPS', cpu.eps8Pins);
          this.updateSliderFilters(this.sliderFilters, 'Sata', cpu.sataConnectors);
          this.updateSliderFilters(this.sliderFilters, 'Molex', cpu.molex4Pins);
          this.updateSliderFilters(this.sliderFilters, 'Price', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPrice', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'SelectedWattage', cpu.wattage);
          this.updateSliderFilters(this.sliderFilters, 'SelectedEfficiency', cpu.efficiency);
          this.updateSliderFilters(this.sliderFilters, 'Selected6Pins', cpu.pcie6Pins);
          this.updateSliderFilters(this.sliderFilters, 'SelectedEPS', cpu.eps8Pins);
          this.updateSliderFilters(this.sliderFilters, 'SelectedSata', cpu.sataConnectors);
          this.updateSliderFilters(this.sliderFilters, 'SelectedMolex', cpu.molex4Pins);

          this.initPSUFilter();
        });
      });
    }
  }

  prepCase(): void{
    if(this.type === ComponentType.CASE){
      this.componentsService.getCases().subscribe((data: Case[]) => {
        this.Cases = data;
        this.Cases.forEach(cpu => {
          this.updateSliderFilters(this.sliderFilters, 'CoolerHeight', cpu.maxCoolerHeight);
          this.updateSliderFilters(this.sliderFilters, 'CardLength', cpu.maxCardLength);
          this.updateSliderFilters(this.sliderFilters, 'Price', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPrice', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'SelectedCoolerHeight', cpu.maxCoolerHeight);
          this.updateSliderFilters(this.sliderFilters, 'SelectedCardLength', cpu.maxCardLength);

          this.initGPULength();
          this.initHeightFilter();
          this.initCaseFormFactor();
        });
      });
    }
  }

  prepFan(): void{
    if(this.type === ComponentType.FAN){
      this.componentsService.getFans().subscribe((data: Fan[]) => {
        this.Fans = data;
        this.Fans.forEach(cpu => {
          this.updateSliderFilters(this.sliderFilters, 'RPM', cpu.rpm);
          this.updateSliderFilters(this.sliderFilters, 'Price', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'Airflow', cpu.airflow);
          this.updateSliderFilters(this.sliderFilters, 'Noise', cpu.noise);
          this.updateSliderFilters(this.sliderFilters, 'SelectedPrice', cpu.price);
          this.updateSliderFilters(this.sliderFilters, 'SelectedRPM', cpu.rpm);
          this.updateSliderFilters(this.sliderFilters, 'SelectedAirflow', cpu.airflow);
          this.updateSliderFilters(this.sliderFilters, 'SelectedNoise', cpu.noise);

          this.initFanSize();
        });
      });
    }
  }

  get filteredCPUs() {
    return this.CPUs?.filter(item => {
      return item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        this.socketFilter[item.socket] &&
        item.price >= (this.sliderFilters['minSelectedPrice'] ?? 0.00) && item.price <= (this.sliderFilters['maxSelectedPrice'] ?? Number.MAX_VALUE) &&
        item.clock >= (this.sliderFilters['minSelectedClock'] ?? 0.00) && item.clock <= (this.sliderFilters['maxSelectedClock'] ?? Number.MAX_VALUE) &&
        item.boostClock >= (this.sliderFilters['minSelectedBoost'] ?? 0.00) && item.boostClock <= (this.sliderFilters['maxSelectedBoost'] ?? 0.00) &&
        item.maxMemory >= (this.sliderFilters['minSelectedMemory'] ?? 0.00) && item.maxMemory <= (this.sliderFilters['maxSelectedMemory'] ?? 0.00) &&
        item.tdp >= (this.sliderFilters['minSelectedTDP'] ?? 0.00) && item.tdp <= (this.sliderFilters['maxSelectedTDP'] ?? 0.00) &&
        item.cores >= (this.sliderFilters['minSelectedCores'] ?? 0.00) && item.cores <= (this.sliderFilters['maxSelectedCores'] ?? 0.00) &&
        item.threads >= (this.sliderFilters['minSelectedThreads'] ?? 0.00) && item.threads <= (this.sliderFilters['maxSelectedThreads'] ?? 0.00) &&
        item.l2Cache >= (this.sliderFilters['minSelectedL2'] ?? 0.00) && item.l2Cache <= (this.sliderFilters['maxSelectedL2'] ?? 0.00) &&
        item.l3Cache >= (this.sliderFilters['minSelectedL3'] ?? 0.00) && item.l3Cache <= (this.sliderFilters['maxSelectedL3'] ?? 0.00) &&
        this.checkboxFilter1[item.igpu.toString()]
    }) || []
  }

  get filteredCPUCoolers() {
    return this.CPUCoolers?.filter(item => {
      return item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        Array.from(Object.entries(this.socketFilter)).filter(([, value]) => value)
          .map(([key]) => key).every(requiredSocket => item.sockets.includes(requiredSocket as Socket)) &&
        item.price >= (this.sliderFilters['minSelectedPrice'] ?? 0.00) && item.price <= (this.sliderFilters['maxSelectedPrice'] ?? Number.MAX_VALUE) &&
        item.fanRPM >= (this.sliderFilters['minSelectedRPM'] ?? 0.00) && item.fanRPM <= (this.sliderFilters['maxSelectedRPM'] ?? Number.MAX_VALUE) &&
        (item.height >= (this.sliderFilters['minSelectedHeight'] ?? 0.00) && item.height <= (this.sliderFilters['maxSelectedHeight'] ?? Number.MAX_VALUE)
          || item.watercooled) &&
        this.checkboxFilter1[item.fanless.toString()] &&
        this.checkboxFilter2[item.watercooled.toString()]
    }) || []
  }

  get filteredMotherboards() {
    return this.Motherboards?.filter(item => {
      return item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        item.price >= (this.sliderFilters['minSelectedPrice'] ?? 0.00) && item.price <= (this.sliderFilters['maxSelectedPrice'] ?? Number.MAX_VALUE) &&
        this.socketFilter[item.socket] && this.motherboardChipsetFilter[item.motherboardChipset] &&
        this.motherboardFormFilter[item.formFactor] && this.memGenFilter[item.memoryGeneration] &&
        item.memorySlots >= (this.sliderFilters['minSelectedMemSlots'] ?? 0.00) &&
        item.memorySlots <= (this.sliderFilters['maxSelectedMemSlots'] ?? Number.MAX_VALUE) &&
        item.pciex16 >= (this.sliderFilters['minSelectedPciex16'] ?? 0.00) &&
        item.pciex16 <= (this.sliderFilters['maxSelectedPciex16'] ?? Number.MAX_VALUE) &&
        item.usb2Header >= (this.sliderFilters['minSelectedUsb2Header'] ?? 0.00) &&
        item.usb2Header <= (this.sliderFilters['maxSelectedUsb2Header'] ?? Number.MAX_VALUE) &&
        item.usb3Gen1Header >= (this.sliderFilters['minSelectedUsb3Gen1Header'] ?? 0.00) &&
        item.usb3Gen1Header <= (this.sliderFilters['maxSelectedUsb3Gen1Header'] ?? Number.MAX_VALUE) &&
        item.usb3Gen2Header >= (this.sliderFilters['minSelectedUsb3Gen2Header'] ?? 0.00) &&
        item.usb3Gen2Header <= (this.sliderFilters['maxSelectedUsb3Gen2Header'] ?? Number.MAX_VALUE) &&
        item.usb3Gen2x2Header >= (this.sliderFilters['minSelectedUsb3Gen2x2Header'] ?? 0.00) &&
        item.usb3Gen2x2Header <= (this.sliderFilters['maxSelectedUsb3Gen2x2Header'] ?? Number.MAX_VALUE) &&
        item.sata >= (this.sliderFilters['minSelectedSata'] ?? 0.00) && item.sata <= (this.sliderFilters['maxSelectedSata'] ?? Number.MAX_VALUE) &&
        item.m2Slots >= (this.sliderFilters['minSelectedM2'] ?? 0.00) && item.m2Slots <= (this.sliderFilters['maxSelectedM2'] ?? Number.MAX_VALUE) &&
        this.wifiFilter[item.wifi] && this.checkboxFilter1[item.raidSupported.toString()]

    }) || []
  }

  get filteredMemories() {
    return this.Memories?.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      item.price >= (this.sliderFilters['minSelectedPrice'] ?? 0.00) && item.price <= (this.sliderFilters['maxSelectedPrice'] ?? Number.MAX_VALUE) &&
      this.memGenFilter[item.generation] && this.memSpeedFilter[item.speed.toString()] &&
      item.memory >= (this.sliderFilters['minSelectedMemory'] ?? 0.00) && item.memory <= (this.sliderFilters['maxSelectedMemory'] ?? Number.MAX_VALUE) &&
      item.modules >= (this.sliderFilters['minSelectedModules'] ?? 0.00) && item.modules <= (this.sliderFilters['maxSelectedModules'] ?? Number.MAX_VALUE) &&
      item.latency >= (this.sliderFilters['minSelectedCAS'] ?? 0.00) && item.latency <= (this.sliderFilters['maxSelectedCAS'] ?? Number.MAX_VALUE) &&
      this.checkboxFilter1[item.heatSpreaders.toString()]
    );
  }

  get filteredGPUs(){
    return this.GPUs?.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      this.memGenFilter[item.memoryGeneration] &&
      item.price >= (this.sliderFilters['minSelectedPrice'] ?? 0.00) && item.price <= (this.sliderFilters['maxSelectedPrice'] ?? Number.MAX_VALUE) &&
      item.memory >= (this.sliderFilters['minSelectedMemory'] ?? 0.00) && item.memory <= (this.sliderFilters['maxSelectedMemory'] ?? Number.MAX_VALUE) &&
      item.clock >= (this.sliderFilters['minSelectedClock'] ?? 0.00) && item.clock <= (this.sliderFilters['maxSelectedClock'] ?? Number.MAX_VALUE) &&
      item.boostClock >= (this.sliderFilters['minSelectedBoost'] ?? 0.00) && item.boostClock <= (this.sliderFilters['maxSelectedBoost'] ?? Number.MAX_VALUE) &&
      item.tdp >= (this.sliderFilters['minSelectedTDP'] ?? 0.00) && item.tdp <= (this.sliderFilters['maxSelectedTDP'] ?? Number.MAX_VALUE) &&
      item.slots >= (this.sliderFilters['minSelectedSlots'] ?? 0.00) && item.slots <= (this.sliderFilters['maxSelectedSlots'] ?? Number.MAX_VALUE) &&
      item.length >= (this.sliderFilters['minSelectedLength'] ?? 0.00) && item.length <= (this.sliderFilters['maxSelectedLength'] ?? Number.MAX_VALUE)
    );
  }

  get filteredStorages(){
    return this.Storages?.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      this.storageFormFilter[item.storageFormFactor] && this.storageInterfaceFilter[item.storageInterface] && this.storageTypeFilter[item.storageType] &&
      item.price >= (this.sliderFilters['minSelectedPrice'] ?? 0.00) && item.price <= (this.sliderFilters['maxSelectedPrice'] ?? Number.MAX_VALUE) &&
      item.capacity >= (this.sliderFilters['minSelectedCapacity'] ?? 0.00) && item.capacity <= (this.sliderFilters['maxSelectedCapacity'] ?? Number.MAX_VALUE) &&
      item.readSpeed >= (this.sliderFilters['minSelectedRead'] ?? 0.00) && item.readSpeed <= (this.sliderFilters['maxSelectedRead'] ?? Number.MAX_VALUE) &&
      item.writeSpeed >= (this.sliderFilters['minSelectedWrite'] ?? 0.00) && item.writeSpeed <= (this.sliderFilters['maxSelectedWrite'] ?? Number.MAX_VALUE) &&
      this.checkboxFilter1[item.heatSink.toString()]);
  }

  get filteredPSUs(){
    return this.PSUs?.filter(item => { return item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      item.price >= (this.sliderFilters['minSelectedPrice'] ?? 0.00) && item.price <= (this.sliderFilters['maxSelectedPrice'] ?? Number.MAX_VALUE) &&
      item.wattage >= (this.sliderFilters['minSelectedWattage'] ?? 0.00) && item.wattage <= (this.sliderFilters['maxSelectedWattage'] ?? Number.MAX_VALUE) &&
      item.efficiency >= (this.sliderFilters['minSelectedEfficiency'] ?? 0.00) &&
      item.efficiency <= (this.sliderFilters['maxSelectedEfficiency'] ?? Number.MAX_VALUE) &&
      item.pcie6Pins >= (this.sliderFilters['minSelected6Pins'] ?? 0.00) && item.pcie6Pins <= (this.sliderFilters['maxSelected6Pins'] ?? Number.MAX_VALUE) &&
      item.eps8Pins >= (this.sliderFilters['minSelectedEPS'] ?? 0.00) && item.eps8Pins <= (this.sliderFilters['maxSelectedEPS'] ?? Number.MAX_VALUE) &&
      item.sataConnectors >= (this.sliderFilters['minSelectedSata'] ?? 0.00) && item.sataConnectors <= (this.sliderFilters['maxSelectedSata'] ?? Number.MAX_VALUE) &&
      item.molex4Pins >= (this.sliderFilters['minSelectedMolex'] ?? 0.00) && item.molex4Pins <= (this.sliderFilters['maxSelectedMolex'] ?? Number.MAX_VALUE) &&
      this.storageFormFilter[item.formFactor] && this.checkboxFilter1[item.hpr12vPresent.toString()] && this.checkboxFilter2[item.modular.toString()]
    })
  }

  get filteredCases(){
    return this.Cases?.filter(item => { return item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      this.storageFormFilter[item.motherboardFormFactor] && this.storageTypeFilter[item.casSidepanel] &&
      item.price >= (this.sliderFilters['minSelectedPrice'] ?? 0.00) && item.price <= (this.sliderFilters['maxSelectedPrice'] ?? Number.MAX_VALUE) &&
      item.maxCardLength >= (this.sliderFilters['minSelectedCardLength'] ?? 0.00)
      && item.maxCardLength <= (this.sliderFilters['maxSelectedCardLength'] ?? Number.MAX_VALUE) &&
      item.maxCoolerHeight >= (this.sliderFilters['minSelectedCoolerHeight'] ?? 0.00)
      && item.maxCoolerHeight <= (this.sliderFilters['maxSelectedHeight'] ?? Number.MAX_VALUE)});
  }

  get filteredFans(){
    return this.Fans?.filter(item => {return item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      item.price >= (this.sliderFilters['minSelectedPrice'] ?? 0.00) && item.price <= (this.sliderFilters['maxSelectedPrice'] ?? Number.MAX_VALUE) &&
      item.rpm >= (this.sliderFilters['minSelectedRPM'] ?? 0.00) && item.rpm <= (this.sliderFilters['maxSelectedRPM'] ?? Number.MAX_VALUE) &&
      item.airflow >= (this.sliderFilters['minSelectedAirflow'] ?? 0.00) && item.airflow <= (this.sliderFilters['maxSelectedAirflow'] ?? Number.MAX_VALUE) &&
      item.noise >= (this.sliderFilters['minSelectedNoise'] ?? 0.00) && item.noise <= (this.sliderFilters['maxSelectedNoise'] ?? Number.MAX_VALUE) &&
      this.checkboxFilter1[item.rgbPresent.toString()] && this.storageFormFilter[item.size.toString()]

    })
  }

  initFanSize(): void{
    if(this.type === ComponentType.FAN){
      console.log(this.variant);
      this.storageFormFilter['80'] = false
      this.storageFormFilter['120'] = false
      this.storageFormFilter['140'] = false
      if(this.variant === '80'){
        this.storageFormFilter['80'] = true;
        console.log(80)
      }
      else if(this.variant === '120'){
        this.storageFormFilter['120'] = true
        console.log(120)
      }
      else if(this.variant === '140'){
        this.storageFormFilter['140'] = true
        console.log(140)
      }
      else {
        console.log("else")
        this.storageFormFilter['80'] = true
        this.storageFormFilter['120'] = true
        this.storageFormFilter['140'] = true
      }
    }
  }

  initCaseFormFactor(): void{
    let mobo: Motherboard | null = this.componentsService.getComponentFromLS("motherboard");
    if(mobo){
      Object.values(MotherboardFormFactor).forEach(item => {this.storageFormFilter[item] = false});
      this.storageFormFilter[mobo.formFactor] = true;
    } else {
      Object.values(MotherboardFormFactor).forEach(item => {this.storageFormFilter[item] = true});
    }
    Object.values(CaseSidepanel).forEach(item => {this.storageTypeFilter[item] = true});
  }

  initPSUFilter(): void{
    if(this.componentsService.estimatedWattage <= (this.sliderFilters['maxWattage'] ?? Number.MAX_VALUE) &&
      this.componentsService.estimatedWattage >= (this.sliderFilters['minWattage'] ?? 0.00)){
      this.sliderFilters['minSelectedWattage'] = this.componentsService.estimatedWattage;
    }

    let comp: Case | null = this.componentsService.getComponentFromLS("case");
    if(comp){
      Object.values(PSUFormFactor).forEach(item => {this.storageFormFilter[item] = false});
      comp.compatiblePSUFormFactors.forEach(item => this.storageFormFilter[item] = true);
    } else {
      Object.values(PSUFormFactor).forEach(item => {this.storageFormFilter[item] = true});
    }
  }

  initStorageTypeFilter(): void{
    if(this.variant === 'sata'){
      Object.values(StorageType).forEach(item => this.storageTypeFilter[item] = true);
    } else if(this.variant === 'm2'){
      Object.values(StorageType).forEach(item => this.storageTypeFilter[item] = false);
      this.storageTypeFilter[StorageType.SSD] = true;
    } else {
      Object.values(StorageType).forEach(item => this.storageTypeFilter[item] = true);
    }
  }

  onStorageTypeChange(): Storage[]{
    Object.values(StorageInterface).forEach(item => this.storageInterfaceFilter[item] = false);
    Object.values(StorageFormFactor).forEach(item => this.storageFormFilter[item] = false);
    Object.entries(this.storageTypeFilter).forEach(item => {
      if(this.storageTypeFilter[item[0]]){
        this.componentsService.storageInterfaceMap.get(item[0] as StorageType)?.forEach(val => {this.storageInterfaceFilter[val] = true});
        this.componentsService.storageFormMap.get(item[0] as StorageType)?.forEach(val => {this.storageFormFilter[val] = true});
      }
    });
    return this.filteredStorages || [];
  }

  initStorageFormFilter(): void{
    let mobo: Motherboard | null = this.componentsService.getComponentFromLS("motherboard");
    if(mobo) {
      if(this.variant === 'm2'){
        Object.values(StorageFormFactor).forEach(item => this.storageFormFilter[item] = false);
        Object.values(mobo.storageFormFactors).forEach(item => {
          this.storageFormFilter[item] = true;
        });
      } else if(this.variant === 'sata'){
        Object.values(StorageFormFactor).forEach(item => this.storageFormFilter[item] = false);
        this.storageFormFilter[StorageFormFactor.INCH25] = true;
        this.storageFormFilter[StorageFormFactor.INCH35] = true;
      }
    }
  }

  initMemoryFilter(): void {
    Object.values(MemoryGeneration).forEach(item => {this.memGenFilter[item] = false;});

    let mems: Memory[] | null = this.componentsService.getComponentFromLS("memories");
    let cpu: CPU | null = this.componentsService.getComponentFromLS("cpu");
    let mobo: Motherboard | null = this.componentsService.getComponentFromLS("motherboard");

    if (cpu && this.type !== ComponentType.CPU) {
      this.componentsService.socketMemMap.get(cpu.socket)?.forEach(item => {this.memGenFilter[item] = true;})
      if (cpu.maxMemory <= (this.sliderFilters['maxMemory'] ?? 0.00)) {
        this.sliderFilters['maxSelectedMemory'] = cpu.maxMemory;
      }
    }

    if (mems && this.type !== ComponentType.MEMORY) {
      mems.forEach(item => {this.memGenFilter[item.generation] = true;})
    }

    if(this.type === ComponentType.MEMORY && !cpu && !mobo){
      Object.entries(this.socketFilter).forEach(item => {
        if(this.socketFilter[item[0]]){
          this.componentsService.socketMemMap.get(item[0] as Socket)?.forEach(val => {this.memGenFilter[val] = true});
        }
      });
    }

    if(mobo && this.type !== ComponentType.MOTHERBOARD){
      let a = 0;
      mems?.forEach(item => {a += item.modules});
      if(a < 0){a = mobo.memorySlots}
      if ((mobo.memorySlots - a) <= (this.sliderFilters['maxModules'] ?? 0.00)) {
        this.sliderFilters['maxSelectedModules'] = mobo.memorySlots - a;
      }
      this.memGenFilter[mobo.memoryGeneration] = true;
    }

    if (mems && this.type === ComponentType.MOTHERBOARD) {
      let a = 0;
      mems.forEach(item => {a += item.modules});
      if (a <= (this.sliderFilters['maxMemSlots'] ?? 0.00)) {
        this.sliderFilters['minSelectedMemSlots'] = a;
      }
    }
  }

  initSocketFilter(): void {
    Object.values(Socket).forEach((enumValue) => {this.socketFilter[enumValue] = false;});
    let mobo: Motherboard | null = this.componentsService.getComponentFromLS("motherboard");
    let cpu: CPU | null = this.componentsService.getComponentFromLS("cpu");
    let cpuCooler: CPUCooler | null = this.componentsService.getComponentFromLS("cpu-cooler");
    let mems: Memory[] | null = this.componentsService.getComponentFromLS("memories");

    if (mobo && this.type !== ComponentType.MOTHERBOARD) {
      this.socketFilter[mobo.socket] = true;
    } else if (cpu && this.type !== ComponentType.CPU) {
      this.socketFilter[cpu.socket] = true;
    } else if (mems && this.type !== ComponentType.MEMORY) {
      Object.values(Socket).forEach((value) => {
        this.componentsService.socketMemMap.get(value)?.forEach((item) => {
          this.memGenFilter[item] ? this.socketFilter[value] = true : null;
        })
      })
    } else if (cpuCooler && this.type !== ComponentType.CPUCOOLER) {
      cpuCooler.sockets.forEach(socket => this.socketFilter[socket] = true)
    } else {
      Object.values(Socket).forEach((enumValue) => {this.socketFilter[enumValue] = true;});
    }
  }

  initHeightFilter(): void {
    let comp: Case | null = this.componentsService.getComponentFromLS("case");
    if (comp && this.type !== ComponentType.CASE) {
      if (comp.maxCoolerHeight <= (this.sliderFilters['maxHeight'] ?? Number.MAX_VALUE)) {
        this.sliderFilters['maxSelectedHeight'] = comp.maxCoolerHeight
      }
    }

    let comp2: CPUCooler | null = this.componentsService.getComponentFromLS("cpu-cooler");
    if (comp2 && this.type !== ComponentType.CPUCOOLER) {
      if ((comp2.height >= (this.sliderFilters['minCoolerHeight'] ?? 0.00)) && (comp2.height <= (this.sliderFilters['maxCoolerHeight'] ?? Number.MAX_VALUE))) {
        this.sliderFilters['minSelectedCoolerHeight'] = comp2.height;
        this.sliderFilters['maxSelectedCoolerHeight'] = this.sliderFilters['maxCoolerHeight']
      }
    }
  }

  initPCIeFilter(): void {
    let gpus: GPU[] | null = this.componentsService.getComponentFromLS("gpus");
    if (gpus && this.type !== ComponentType.GPU) {
      if (gpus.length <= (this.sliderFilters['maxPciex16'] ?? 0.00)) {
        this.sliderFilters['minSelectedPciex16'] = gpus.length;
      }
    }
  }

  initStorageInterfaceFilter(): void {
    let comp: Storage[] | null = this.componentsService.getComponentFromLS("storages");
    if (comp && this.type !== ComponentType.STORAGE) {
      let sata: Storage[] = []
      let m2: Storage[] = []
      sata.push(...comp.filter(item => item.storageInterface === StorageInterface.SATA));
      m2.push(...comp.filter(item => item.storageInterface === StorageInterface.M2));
      sata.length <= (this.sliderFilters['maxSata'] ?? Number.MAX_VALUE) && sata.length >= (this.sliderFilters['minSata'] ?? 0.00)
        ? this.sliderFilters['minSelectedSata'] = sata.length : this.sliderFilters['minSelectedSata'] = this.sliderFilters['minSata'];
      m2.length <= (this.sliderFilters['maxM2'] ?? Number.MAX_VALUE) && m2.length >= (this.sliderFilters['minM2'] ?? 0.00)
        ? this.sliderFilters['minSelectedM2'] = m2.length : this.sliderFilters['minSelectedM2'] = this.sliderFilters['minM2'];
    }
  }

  initMotherboardFormFilter(): void {
    Object.values(MotherboardFormFactor).forEach(item => {this.motherboardFormFilter[item] = false;});
    let caseComp: Case | null = this.componentsService.getComponentFromLS("case");
    let mobo: Motherboard | null = this.componentsService.getComponentFromLS("motherboard");
    if (caseComp && this.type !== ComponentType.CASE) {
      this.motherboardFormFilter[caseComp.motherboardFormFactor] = true
    } else if (mobo && this.type !== ComponentType.MOTHERBOARD) {
      this.motherboardFormFilter[mobo.formFactor] = true
    } else {
      Object.values(MotherboardFormFactor).forEach(item => {
        this.motherboardFormFilter[item] = true;
      });
    }
  }

  onMoboSocketChange(): Motherboard[]{
    this.motherboardChipsetFilter = {};
    this.memGenFilter = {};
    Object.values(MemoryGeneration).forEach(item => {this.memGenFilter[item] = false;});
    Object.entries(this.socketFilter).forEach(item => {
      if(this.socketFilter[item[0]]){
        this.componentsService.chipsetMap.get(item[0] as Socket)?.forEach(val => {this.motherboardChipsetFilter[val] = true});
        this.componentsService.socketMemMap.get(item[0] as Socket)?.forEach(a => {this.memGenFilter[a] = true;})
      }
    });
    return this.filteredMotherboards || [];
  }

  onMemGenChange(): Memory[]{
    this.memSpeedFilter = {}
    Object.entries(this.memGenFilter).forEach(item => {
      if(this.memGenFilter[item[0]]){
        this.componentsService.memSpeedMap.get(item[0] as MemoryGeneration)?.forEach(val => {this.memSpeedFilter[val.toString()] = true});
      }
    })
    return this.filteredMemories || [];
  }

  initWifi(): void{
    Object.values(WIFI).forEach(item => {this.wifiFilter[item] = true});
  }

  initGPULength(): void{
    let comp: GPU[] | null = this.componentsService.getComponentFromLS("gpus");
    let caseComp: Case | null = this.componentsService.getComponentFromLS("case");
    if(caseComp && this.type !== ComponentType.CASE) {
      if(caseComp.maxCardLength <= (this.sliderFilters['maxLength'] ?? 0.00)){
        this.sliderFilters['maxSelectedLength'] = caseComp.maxCardLength;
      }
    } else if(comp && this.type === ComponentType.CASE){
      let a:number = 0;
      comp.forEach(item => {item.length > a?a = item.length:0;})
      if((a >= (this.sliderFilters['minCardLength'] ?? 0.00)) && (a <= (this.sliderFilters['maxCardLength'] ?? 0.00))) {
        this.sliderFilters['minSelectedCardLength'] = a;
        this.sliderFilters['maxSelectedCardLength'] = this.sliderFilters['maxCardLength'];
      }
    }
  }

  initGPUMem(): void{
    if(this.type === ComponentType.GPU){
      Object.values(GPUMemoryGeneration).forEach(item => {this.memGenFilter[item] = true;})
    }
  }

  addToConfig(name: string, comp: Components) {
    if (name === 'storages') {
      let storages: Storage[] | null = this.componentsService.getComponentFromLS("storages");
      if (storages) {
        storages.push(comp as Storage);
        this.componentsService.storeComponentInLS("storages", storages);
      } else {
        this.componentsService.storeComponentInLS("storages", [comp]);
      }
    } else if (name === 'fans') {
      let fans: Fan[] | null = this.componentsService.getComponentFromLS("fans");
      if (fans) {
        fans.push(comp as Fan);
        this.componentsService.storeComponentInLS("fans", fans);
      } else {
        this.componentsService.storeComponentInLS("fans", [comp]);
      }
    } else if (name === 'gpus') {
      let gpus: GPU[] | null = this.componentsService.getComponentFromLS("gpus");
      if (gpus) {
        gpus.push(comp as GPU);
        this.componentsService.storeComponentInLS("gpus", gpus);
      } else {
        this.componentsService.storeComponentInLS("gpus", [comp]);
      }
    } else if (name === 'memories') {
      let memories: Memory[] | null = this.componentsService.getComponentFromLS("memories");

      if (memories) {
        memories.push(comp as Memory);
        this.componentsService.storeComponentInLS("memories", memories);
        console.log("pushing: ", memories);
      } else {
        this.componentsService.storeComponentInLS("memories", [comp]);
      }
    } else {
      this.componentsService.storeComponentInLS(name, comp);
    }

    this.toPageL('/configurer');
  }

  toPage(page: string, type: number | undefined) {
    this.router.navigate([page, type]);
  }

  toPageL(page: string) {
    this.router.navigate([page]);
  }

  toggleTabs(val: string): void {
    this.tabs[val] = !this.tabs[val];
  }

  getLeftPosition(minSelected: string, min: string, max: string) {
    return (((this.sliderFilters[minSelected] ?? 0.00) - (this.sliderFilters[min] ?? 0.00))
      / ((this.sliderFilters[max] ?? 0.00) - (this.sliderFilters[min] ?? 0.00))) * 100;
  }

  getWidth(minSelected: string, maxSelected: string, min: string, max: string) {
    return (((this.sliderFilters[maxSelected] ?? 0.00) - (this.sliderFilters[minSelected] ?? 0.00)) / ((this.sliderFilters[max] ?? 0.00) - (this.sliderFilters[min] ?? 0.00))) * 100;
  }

  updateSliderFilters(filters: any, key: any, value: any) {
    filters[`min${key}`] = Math.min(filters[`min${key}`] ?? Number.MAX_VALUE, value);
    filters[`max${key}`] = Math.max(filters[`max${key}`] ?? 0.00, value);
  }

  protected readonly ComponentType = ComponentType;
  protected readonly Object = Object;
  protected readonly Socket = Socket;
  protected readonly StorageInterface = StorageInterface;
}
