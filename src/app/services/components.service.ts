import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {
  Case,
  CaseSidepanel,
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
} from '../model/component.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {
  private apiUrl = 'http://localhost:8080/api/public/components';
  constructor(private http: HttpClient) { }
  private refreshComponentsListSource = new Subject<void>();
  refreshUserList$ = this.refreshComponentsListSource.asObservable();

  public compTypes:ComponentType[] = Object.values(ComponentType);
  public sidepanels:CaseSidepanel[] = Object.values(CaseSidepanel);
  public motherboardFormFactors: MotherboardFormFactor[] = Object.values(MotherboardFormFactor);
  public psuFormFactors:PSUFormFactor[] = Object.values(PSUFormFactor);
  public sockets:Socket[] = Object.values(Socket);
  public gpuMemories:GPUMemoryGeneration[] = Object.values(GPUMemoryGeneration);
  public memoryGens:MemoryGeneration[] = Object.values(MemoryGeneration);
  public storageFormFactors:StorageFormFactor[] = Object.values(StorageFormFactor);
  public wifis:WIFI[] = Object.values(WIFI);
  public storageTypes:StorageType[] = Object.values(StorageType);
  public chipsetMap: Map<Socket, MotherboardChipset[]> = new Map([
    [Socket.AM4,[MotherboardChipset.A300, MotherboardChipset.A320, MotherboardChipset.A520, MotherboardChipset.B350, MotherboardChipset.B450, MotherboardChipset.B550,
      MotherboardChipset.X300, MotherboardChipset.X370, MotherboardChipset.X470, MotherboardChipset.X570]],
    [Socket.AM5,[MotherboardChipset.A620, MotherboardChipset.B650, MotherboardChipset.B650E, MotherboardChipset.X670, MotherboardChipset.X670E]],
    [Socket.LGA1150,[MotherboardChipset.H81, MotherboardChipset.B85, MotherboardChipset.H87, MotherboardChipset.Q85, MotherboardChipset.Q87, MotherboardChipset.Z87,
      MotherboardChipset.Z97, MotherboardChipset.H97]],
    [Socket.LGA1151,[MotherboardChipset.H110, MotherboardChipset.B150, MotherboardChipset.Q150, MotherboardChipset.H170, MotherboardChipset.Z170,
      MotherboardChipset.Q170, MotherboardChipset.H310, MotherboardChipset.B360, MotherboardChipset.B365, MotherboardChipset.H370, MotherboardChipset.Q370,
      MotherboardChipset.Z370, MotherboardChipset.Z390]],
    [Socket.LGA1155,[MotherboardChipset.H61, MotherboardChipset.B65, MotherboardChipset.Q65, MotherboardChipset.Q67, MotherboardChipset.H67, MotherboardChipset.P67,
      MotherboardChipset.Z68, MotherboardChipset.B75, MotherboardChipset.Q75, MotherboardChipset.Q77, MotherboardChipset.Z75, MotherboardChipset.Z77]],
    [Socket.LGA1156, [MotherboardChipset.H55, MotherboardChipset.H57, MotherboardChipset.P55, MotherboardChipset.Q57]],
    [Socket.LGA2011, [MotherboardChipset.X79, MotherboardChipset.X99, MotherboardChipset.C602, MotherboardChipset.C604, MotherboardChipset.C606]],
    [Socket.LGA2066, [MotherboardChipset.X299,]],
    [Socket.LGA1200, [MotherboardChipset.H410, MotherboardChipset.H470, MotherboardChipset.B460, MotherboardChipset.B560, MotherboardChipset.Z490,
      MotherboardChipset.Z590, MotherboardChipset.Q470, MotherboardChipset.W480]],
    [Socket.LGA1700, [MotherboardChipset.H610, MotherboardChipset.B660, MotherboardChipset.B760, MotherboardChipset.Z690, MotherboardChipset.Z790,
      MotherboardChipset.W680, MotherboardChipset.Q670]],
    [Socket.LGA1851, [MotherboardChipset.Z890, MotherboardChipset.B880, MotherboardChipset.H870, MotherboardChipset.Q870]]
  ]);
  public memSpeedMap: Map<MemoryGeneration, number[]> = new Map([
    [MemoryGeneration.DDR,[200, 266, 333, 400]],
    [MemoryGeneration.DDR2,[400, 533, 667, 800, 1066, 1200]],
    [MemoryGeneration.DDR3,[1066, 1333, 1600, 1866, 2133, 2400, 2666, 2933]],
    [MemoryGeneration.DDR4,[1600, 1866, 2133, 2400, 2666, 2933, 3200, 3600, 4000, 4266, 4400]],
    [MemoryGeneration.DDR5,[4800, 5200, 5600, 6000, 6400, 7200, 7600, 8400, 8800, 9600]],
  ]);
  public socketMemMap: Map<Socket, MemoryGeneration[]> = new Map([
    [Socket.AM5, [MemoryGeneration.DDR5]],
    [Socket.AM4, [MemoryGeneration.DDR4]],
    [Socket.LGA1150,[MemoryGeneration.DDR3]],
    [Socket.LGA1151,[MemoryGeneration.DDR4]],
    [Socket.LGA1155,[MemoryGeneration.DDR3]],
    [Socket.LGA1156,[MemoryGeneration.DDR3]],
    [Socket.LGA2011,[MemoryGeneration.DDR3]],
    [Socket.LGA2066,[MemoryGeneration.DDR4]],
    [Socket.LGA1200,[MemoryGeneration.DDR4]],
    [Socket.LGA1200,[MemoryGeneration.DDR4]],
    [Socket.LGA1700,[MemoryGeneration.DDR5, MemoryGeneration.DDR4]],
    [Socket.LGA1851,[MemoryGeneration.DDR5]],
  ]);
  public storageFormMap: Map<StorageType, StorageFormFactor[]> = new Map([
    [StorageType.SSD,[StorageFormFactor.M2230, StorageFormFactor.M2242, StorageFormFactor.M2260, StorageFormFactor.M2280, StorageFormFactor.M22110, StorageFormFactor.INCH25]],
    [StorageType.HDD,[StorageFormFactor.INCH35]],
  ]);
  public storageInterfaceMap: Map<StorageType, StorageInterface[]> = new Map([
    [StorageType.SSD,[StorageInterface.M2, StorageInterface.SATA]],
    [StorageType.HDD,[StorageInterface.SATA]],
  ]);
  estimatedWattage: number = 0;

  triggerRefreshUserList() {
    this.refreshComponentsListSource.next();
  }

  getCPUs(): Observable<CPU[]> {
    return this.http.get<CPU[]>(`${this.apiUrl}/cpus`);
  }
  getCases(): Observable<Case[]> {
    return this.http.get<Case[]>(`${this.apiUrl}/cases`);
  }
  getCPUCoolers(): Observable<CPUCooler[]> {
    return this.http.get<CPUCooler[]>(`${this.apiUrl}/cpu-coolers`);
  }
  getFans(): Observable<Fan[]> {
    return this.http.get<Fan[]>(`${this.apiUrl}/fans`);
  }
  getGPUs(): Observable<GPU[]> {
    return this.http.get<GPU[]>(`${this.apiUrl}/gpus`);
  }
  getMemories(): Observable<Memory[]> {
    return this.http.get<Memory[]>(`${this.apiUrl}/memories`);
  }
  getMotherboards(): Observable<Motherboard[]> {
    return this.http.get<Motherboard[]>(`${this.apiUrl}/motherboards`);
  }
  getPSUs(): Observable<PSU[]> {
    return this.http.get<PSU[]>(`${this.apiUrl}/psus`);
  }
  getStorages(): Observable<Storage[]> {
    return this.http.get<Storage[]>(`${this.apiUrl}/storages`);
  }

  getCPUById(id: number): Observable<CPU> {
    return this.http.get<CPU>(`${this.apiUrl}/cpus/${id}`);
  }
  getCaseById(id: number): Observable<Case> {
    return this.http.get<Case>(`${this.apiUrl}/cases/${id}`);
  }
  getCPUCoolerById(id: number): Observable<CPUCooler> {
    return this.http.get<CPUCooler>(`${this.apiUrl}/cpu-coolers/${id}`);
  }
  getFanById(id: number): Observable<Fan> {
    return this.http.get<Fan>(`${this.apiUrl}/fans/${id}`);
  }
  getGPUById(id: number): Observable<GPU> {
    return this.http.get<GPU>(`${this.apiUrl}/gpus/${id}`);
  }
  getMemoryById(id: number): Observable<Memory> {
    return this.http.get<Memory>(`${this.apiUrl}/memories/${id}`);
  }
  getMotherboardById(id: number): Observable<Motherboard> {
    return this.http.get<Motherboard>(`${this.apiUrl}/motherboards/${id}`);
  }
  getPSUById(id: number): Observable<PSU> {
    return this.http.get<PSU>(`${this.apiUrl}/psus/${id}`);
  }
  getStorageById(id: number): Observable<Storage> {
    return this.http.get<Storage>(`${this.apiUrl}/storages/${id}`);
  }

  createCase(comp: Case): Observable<Case> {
    return this.http.post<Case>(`${this.apiUrl}/cases`, comp);
  }
  createCPU(comp: CPU): Observable<CPU> {
    return this.http.post<CPU>(`${this.apiUrl}/cpus`, comp);
  }
  createCPUCooler(comp: CPUCooler): Observable<CPUCooler> {
    return this.http.post<CPUCooler>(`${this.apiUrl}/cpu-coolers`, comp);
  }
  createFan(comp: Fan): Observable<Fan> {
    return this.http.post<Fan>(`${this.apiUrl}/fans`, comp);
  }
  createGPU(comp: GPU): Observable<GPU> {
    return this.http.post<GPU>(`${this.apiUrl}/gpus`, comp);
  }
  createMemory(comp: Memory): Observable<Memory> {
    return this.http.post<Memory>(`${this.apiUrl}/memories`, comp);
  }
  createMotherboard(comp: Motherboard): Observable<Motherboard> {
    return this.http.post<Motherboard>(`${this.apiUrl}/motherboards`, comp);
  }
  createPSU(comp: PSU): Observable<PSU> {
    return this.http.post<PSU>(`${this.apiUrl}/psus`, comp);
  }
  createStorage(comp: Storage): Observable<Storage> {
    return this.http.post<Storage>(`${this.apiUrl}/storages`, comp);
  }

  updateCase(id: number | undefined, comp: Case): Observable<Case>{
    return this.http.put<Case>(`${this.apiUrl}/cases/${id}`, comp);
  }
  updateCPU(id: number | undefined, comp: CPU): Observable<CPU>{
    return this.http.put<CPU>(`${this.apiUrl}/cpus/${id}`, comp);
  }
  updateCPUCooler(id: number | undefined, comp: CPUCooler): Observable<CPUCooler>{
    return this.http.put<CPUCooler>(`${this.apiUrl}/cpu-coolers/${id}`, comp);
  }
  updateFan(id: number | undefined, comp: Fan): Observable<Fan>{
    return this.http.put<Fan>(`${this.apiUrl}/fans/${id}`, comp);
  }
  updateGPU(id: number | undefined, comp: GPU): Observable<GPU>{
    return this.http.put<GPU>(`${this.apiUrl}/gpus/${id}`, comp);
  }
  updateMemory(id: number | undefined, comp: Memory): Observable<Memory>{
    return this.http.put<Memory>(`${this.apiUrl}/memories/${id}`, comp);
  }
  updateMotherboard(id: number | undefined, comp: Motherboard): Observable<Motherboard>{
    return this.http.put<Motherboard>(`${this.apiUrl}/motherboards/${id}`, comp);
  }
  updatePSU(id: number | undefined, comp: PSU): Observable<PSU>{
    return this.http.put<PSU>(`${this.apiUrl}/psus/${id}`, comp);
  }
  updateStorage(id: number | undefined, comp: Storage): Observable<Storage>{
    return this.http.put<Storage>(`${this.apiUrl}/storages/${id}`, comp);
  }

  deleteComponent(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  storeComponentInLS(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getComponentFromLS<T>(key: string): T | null {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) as T : null;
  }
  removeComponentFromLS(key: string): void {
    localStorage.removeItem(key);
  }
}
