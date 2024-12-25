
export enum ComponentType{
  CASE = "CASE", CPU = "CPU", CPUCOOLER = "CPUCOOLER", FAN = "FAN", GPU = "GPU",
  MEMORY = "MEMORY", MOTHERBOARD = "MOTHERBOARD", PSU = "PSU", STORAGE = "STORAGE"
}

export class Components {
  id?: number;
  name: string;
  quantityStock: number;
  price: number;
  reorderQuantity: number;
  image: string;
  componentType: ComponentType;

  constructor(name:string, quantityStock: number, price:number, reorderQuantity: number, image: string, componentType:ComponentType,){
    this.name = name;
    this.quantityStock = quantityStock;
    this.price = price;
    this.reorderQuantity = reorderQuantity;
    this.image = image;
    this.componentType = componentType;
  }
}

export enum CaseSidepanel{
  MESH = "MESH", GLASS = "GLASS", FULL = "FULL"
}

export enum MotherboardFormFactor{
  ATX = "ATX", mATX = "mATX", ITX = "ITX"
}

export enum PSUFormFactor{
  AT = "AT", ATX = "ATX", ATX3 = "ATX3", SFX = "SFX", SFXL = "SFXL",
  TFX = "TFX", EPS = "EPS", FlexATX = "FlexATX", DTX = "DTX"
}

export class Case extends Components{
  casSidepanel: CaseSidepanel;
  color: string;
  motherboardFormFactor: MotherboardFormFactor;
  maxCoolerHeight: number;
  maxCardLength: number;
  fans80: number;
  fans120: number;
  fans140: number;
  usb2Port: number;
  usb3Gen1Port: number;
  usb3Gen2Port: number;
  usb3Gen2x2Port: number;
  usbTypeCPort: number;
  driveBays35: number;
  driveBays25: number;
  compatiblePSUFormFactors: PSUFormFactor[];

  constructor(name:string, quantityStock: number, price:number, reorderQuantity: number, image: string, type:ComponentType,
              casSidepanel: CaseSidepanel, color: string, formFactor: MotherboardFormFactor, maxCoolerHeight:number, maxCardLength: number,
              fans80:number, fans120:number, fans140:number, usb2Port: number, usb3Gen1Port: number,
              usb3Gen2Port: number, usb3Gen2x2Port: number, usbTypeCPort: number, driveBays35: number, driveBays25: number,
              compatiblePSUFormFactors: PSUFormFactor[]){
    super(name, quantityStock, price, reorderQuantity, image, type);
    this.casSidepanel = casSidepanel;
    this.color = color;
    this.motherboardFormFactor = formFactor;
    this.maxCoolerHeight = maxCoolerHeight;
    this.maxCardLength = maxCardLength;
    this.fans80 = fans80;
    this.fans120 = fans120;
    this.fans140 = fans140;
    this.usb2Port = usb2Port;
    this.usb3Gen1Port = usb3Gen1Port;
    this.usb3Gen2Port = usb3Gen2Port;
    this.usb3Gen2x2Port = usb3Gen2x2Port;
    this.usbTypeCPort = usbTypeCPort;
    this.driveBays35 = driveBays35;
    this.driveBays25 = driveBays25;
    this.compatiblePSUFormFactors = compatiblePSUFormFactors;
  }
}

export enum Socket{
  AM4 = "AM4", AM5 = "AM5", LGA1150 = "LGA1150", LGA1151 = "LGA1151", LGA1155 = "LGA1155", LGA1156 = "LGA1156",
  LGA2011 = "LGA2011", LGA2066 = "LGA2066", LGA1200 = "LGA1200", LGA1700 = "LGA1700", LGA1800 = "LGA1800"
}

export class CPU extends Components{
  clock: number;
  boostClock: number;
  tdp: number;
  cores: number;
  threads: number;
  socket: Socket;
  l2Cache: number;
  l3Cache: number;
  igpu: boolean;
  maxMemory: number;

  constructor(name:string, quantityStock: number, price:number, reorderQuantity: number, image: string, type:ComponentType,
              clock: number, boostClock: number, tdp: number, cores: number, threads: number, socket: Socket,
              l2Cache: number, l3Cache: number, iGPU: boolean, maxMemory: number){
    super(name, quantityStock, price, reorderQuantity, image, type);
    this.clock = clock;
    this.boostClock = boostClock;
    this.tdp = tdp;
    this.cores = cores;
    this.threads = threads;
    this.socket = socket;
    this.l2Cache = l2Cache;
    this.l3Cache = l3Cache;
    this.igpu = iGPU;
    this.maxMemory = maxMemory;
  }
}

export class CPUCooler extends Components{
  fanRPM: number;
  noise: number;
  color: string;
  height: number;
  sockets: Socket[];
  fanless: boolean;
  watercooled: boolean;

  constructor(name:string, quantityStock:number, price:number, reorderQuantity:number, image:string, type:ComponentType,
              fanRPM:number, noise:number,color:string, height:number, sockets:Socket[],
              isFanless:boolean, isWatercooled:boolean){
    super(name, quantityStock, price, reorderQuantity, image, type);
    this.fanRPM = fanRPM;
    this.noise = noise;
    this.height = height;
    this.color = color;
    this.sockets = sockets;
    this.fanless = isFanless;
    this.watercooled = isWatercooled;
  }
}

export class Fan extends Components{
  size: number;
  rpm: number;
  airflow: number;
  noise: number;
  rgbPresent: boolean;
  pwm4PinPresent: boolean;
  dc3PinPresent: boolean;
  splitterPresent: boolean;
  color: string;

  constructor(name:string, quantityStock:number, price:number, reorderQuantity:number, image:string, type:ComponentType,
              size:number, rpm:number, airflow:number, noise:number, rgbPresent: boolean,
              pwm4PinPresent: boolean, dc3pinPresent: boolean, splitterPresent:boolean, color:string){
    super(name, quantityStock, price, reorderQuantity, image, type);
    this.size = size;
    this.rpm = rpm;
    this.airflow = airflow;
    this.noise = noise;
    this.rgbPresent = rgbPresent;
    this.pwm4PinPresent = pwm4PinPresent;
    this.dc3PinPresent = dc3pinPresent;
    this.splitterPresent = splitterPresent;
    this.color = color;
  }
}

export enum GPUMemoryGeneration{
  GDDR3 = "GDDR3", GDDR4 = "GDDR4", GDDR5 = "GDDR5", GDDR5X = "GGDR5X", GDDR6 = "GDDR6",
  GDDR6X = "GDDR6X", GDDR7 = "GDDR7", HBM = "HBM", HBM2E = "HBM2E", LPDDR = "LPDDR"
}

export class GPU extends Components{
  memory: number;
  memoryGeneration: GPUMemoryGeneration;
  clock: number;
  boostClock: number;
  color: string;
  length: number;
  tdp: number;
  hdmiPorts: number;
  dpPorts: number;
  usbCPorts: number;
  slots: number;

  constructor(name: string, quantityStock: number, price: number, reorderQuantity: number, image: string, type:ComponentType,
              memory: number, memoryGeneration: GPUMemoryGeneration, clock: number, boostClock: number,
              color: string, length: number, tdp: number, hdmiPorts: number, dpPorts: number, usbCPorts: number, slots: number) {
    super(name, quantityStock, price, reorderQuantity, image, type);
    this.memory = memory;
    this.memoryGeneration = memoryGeneration;
    this.clock = clock;
    this.boostClock = boostClock;
    this.color = color;
    this.length = length;
    this.tdp = tdp;
    this.hdmiPorts = hdmiPorts;
    this.dpPorts = dpPorts;
    this.usbCPorts = usbCPorts;
    this.slots = slots;
  }
}

export enum MemoryGeneration{
  DDR = "DDR", DDR2 = "DDR2", DDR3 = "DDR3", DDR4 = "DDR4", DDR5 = "DDR5"
}

export class Memory extends Components{
  memory:number;
  speed:number;
  generation: MemoryGeneration;
  modules:number;
  colors:string;
  latency:number;
  voltage:number;
  heatSpreaders:boolean;

  constructor(name: string, quantityStock: number, price: number, reorderQuantity: number, image: string, type:ComponentType, memory:number,
              speed: number, generation: MemoryGeneration, modules: number, colors: string, latency: number, voltage: number, hasHeatSpreaders: boolean) {
    super(name, quantityStock, price, reorderQuantity, image, type);
    this.memory = memory;
    this.speed = speed;
    this.generation = generation;
    this.modules = modules;
    this.colors = colors;
    this.latency = latency;
    this.voltage = voltage;
    this.heatSpreaders = hasHeatSpreaders;
  }
}

export enum MotherboardChipset{
  A300 = "A300", A320 = "A320", A520 = "A520", B350 = "B350", B450 = "B450", B550 = "B550",
  X300 = "X300", X370 = "X370", X470 = "X470", X570 = "X570", A620 = "A620", B650 = "B650",
  B650E = "B650E", X670 = "X670", X670E = "X670E", H81 = "H81", B85 = "B85", H87 = "H87",
  Q85 = "Q85", Q87 = "Q87", Z87 = "Z87", Z97 = "Z97", H97 = "H97", H110 = "H110", B150 = "B150",
  Q150 = "Q150", H170 = "H170", Z170 = "Z170", Q170 = "Q170", H310 = "H310", B360 = "B360", B365 = "B365",
  H370 = "H370", Q370 = "Q370", Z370 = "Z370", Z390 = "Z390", H61 = "H61", B65 = "B65", Q65 = "Q65",
  Q67 = "Q67", H67 = "H67", P67 = "P67", Z68 = "Z68", B75 = "B75", Q75 = "Q75", Q77 = "Q77", Z75 = "Z75",
  Z77 = "Z77", H55 = "H55", H57 = "H57", P55 = "P55", Q57 = "Q57", X79 = "X79", X99 = "X99",
  C602 = "C602", C604 = "C604", C606 = "C606", X299 = "X299", H410 = "H410", H470 = "H470", B460 = "B460",
  B560 = "B560", Z490 = "Z490", Z590 = "Z590", Q470 = "Q470", W480 = "W480", H610 = "H610", B660 = "B660",
  B760 = "B760", Z690 = "Z690", Z790 = "Z790", W680 = "W680", Q670 = "Q670", Z890 = "Z890", B880 = "B880",
  H870 = "H870", Q870 = "Q870"
}

export enum StorageFormFactor{
  M2230 = "M2230", M2242 = "M2242", M2260 = "M2260", M2280 = "M2280",
  M22110 = "M22110", INCH25 = "INCH25", INCH35 = "INCH35"
}

export enum WIFI{
  NONE = "NONE",WIFI4 = "WIFI4", WIFI5 = "WIFI5", WIFI6 = "WIFI6", WIFI6E = "WIFI6E", WIFI7 = "WIFI7"
}

export class Motherboard extends Components{
  socket: Socket;
  formFactor: MotherboardFormFactor;
  motherboardChipset: MotherboardChipset;
  memoryGeneration: MemoryGeneration;
  memorySlots: number;
  memorySpeeds: number[];
  pciex16: number;
  pciex8: number;
  pciex4: number;
  pciex1: number;
  storageFormFactors: StorageFormFactor[];
  sata: number;
  usb2Header: number;
  usb3Gen1Header: number;
  usb3Gen2Header: number;
  usb3Gen2x2Header: number;
  usbTypeCHeader: number;
  wifi: WIFI;
  raidSupported: boolean;

  constructor(name: string, quantityStock: number, price: number, reorderQuantity: number, image: string, type:ComponentType,
              socket: Socket, formFactor: MotherboardFormFactor, motherboardChipset: MotherboardChipset, memoryGeneration: MemoryGeneration, memorySlots: number, memorySpeeds: number[], pciex16: number, pciex8: number, pciex4: number, pciex1: number, storageFormfactos: StorageFormFactor[], sata: number, usb2Header: number, usb3Gen1Header: number, usb3Gen2Header: number, usb3Gen2x2Header: number, usbTypeCHeader: number, wifi: WIFI, raidSupported: boolean) {
    super(name, quantityStock, price, reorderQuantity, image, type);
    this.socket = socket;
    this.formFactor = formFactor;
    this.motherboardChipset = motherboardChipset;
    this.memoryGeneration = memoryGeneration;
    this.memorySlots = memorySlots;
    this.memorySpeeds = memorySpeeds;
    this.pciex16 = pciex16;
    this.pciex8 = pciex8;
    this.pciex4 = pciex4;
    this.pciex1 = pciex1;
    this.storageFormFactors = storageFormfactos;
    this.sata = sata;
    this.usb2Header = usb2Header;
    this.usb3Gen1Header = usb3Gen1Header;
    this.usb3Gen2Header = usb3Gen2Header;
    this.usb3Gen2x2Header = usb3Gen2x2Header;
    this.usbTypeCHeader = usbTypeCHeader;
    this.wifi = wifi;
    this.raidSupported = raidSupported;
  }
}

export class PSU extends Components{
  wattage: number;
  efficiency: number;
  formFactor: PSUFormFactor;
  pcie6Pins: number;
  eps8Pins: number;
  sataConnectors: number;
  molex4Pins: number;
  hpr12vPresent: boolean;
  modular: boolean;
  color: string;

  constructor(name: string, quantityStock: number, price: number, reorderQuantity: number, image: string, type:ComponentType,
              wattage: number, efficiency: number, formFactor: PSUFormFactor, pcie6Pins: number, eps8Pins: number, sataConnectors: number, molex4Pins: number, hpr12vPresent: boolean, modular: boolean, color: string) {
    super(name, quantityStock, price, reorderQuantity, image, type);
    this.wattage = wattage;
    this.efficiency = efficiency;
    this.formFactor = formFactor;
    this.pcie6Pins = pcie6Pins;
    this.eps8Pins = eps8Pins;
    this.sataConnectors = sataConnectors;
    this.molex4Pins = molex4Pins;
    this.hpr12vPresent = hpr12vPresent;
    this.modular = modular;
    this.color = color;
  }
}

export enum StorageType{
  SSD = "SSD", HDD = "HDD"
}

export enum StorageInterface{
  SATA = "SATA", M2 = "M2", PCIe = "PCIE", U2 = "U2", mSATA = "MSATA"
}

export class Storage extends Components{
  storageType: StorageType;
  capacity: number;
  storageInterface: StorageInterface;
  storageformFactor: StorageFormFactor;
  heatSink: boolean;

  constructor(name: string, quantityStock: number, price: number, reorderQuantity: number, image: string, type:ComponentType,
              storageType: StorageType, capacity: number, storageInterface: StorageInterface, storageformFactor: StorageFormFactor, withHeatSink: boolean) {
    super(name, quantityStock, price, reorderQuantity, image, type);
    this.storageType = storageType;
    this.capacity = capacity;
    this.storageInterface = storageInterface;
    this.storageformFactor = storageformFactor;
    this.heatSink = withHeatSink;
  }
}
