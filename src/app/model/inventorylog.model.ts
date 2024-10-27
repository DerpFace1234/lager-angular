import { Component } from './component.model';

export class InventoryLog{
  id?: number;
  component: Component;
  quantityChanged: number;
  timestamp: Date;
  action: string;

  constructor(component: Component, quantityChanged: number, timestamp: Date, action: string){
    this.component = component;
    this.quantityChanged = quantityChanged;
    this.timestamp = timestamp;
    this.action = action;
  }
}
