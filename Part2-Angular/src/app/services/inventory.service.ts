/**
 * Author: JIAYANG DAI
 * Student ID: 24664639
 * Email: j.dai.12@student.scu.edu.au
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: This service acts as the central state management for the inventory data. 
 * It stores data in memory for the active browser session.
 */

import { Injectable } from '@angular/core';

// Data model interface mirroring the requirements from Part 1
export interface Item {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  supplier: string;
  status: string;
  popular: string;
  comment?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // In-memory array acting as our local database for the session
  private inventoryDB: Item[] = [];

  constructor() { 
    // Add a dummy item on initialization for easier testing and demonstration
    this.inventoryDB.push({
      id: 'ITEM001',
      name: 'MacBook Pro',
      category: 'Electronics',
      quantity: 10,
      price: 1999.99,
      supplier: 'Apple Inc.',
      status: 'In Stock',
      popular: 'Yes',
      comment: 'Sample initial data'
    });
  }

  // Retrieve the full inventory list
  getAllItems(): Item[] {
    return this.inventoryDB;
  }

  // Filter and return only items marked as popular
  getPopularItems(): Item[] {
    return this.inventoryDB.filter(item => item.popular === 'Yes');
  }

  // Add a new item, ensuring the Item ID is unique before insertion
  addItem(newItem: Item): { success: boolean, message: string } {
    const exists = this.inventoryDB.some(i => i.id.toLowerCase() === newItem.id.toLowerCase());
    
    if (exists) {
      return { success: false, message: 'Error: Item ID already exists! Please use a unique ID.' };
    }
    
    this.inventoryDB.push(newItem);
    return { success: true, message: 'Success: Item added to inventory!' };
  }

  // Update an existing item using its exact Name as the key (as per assessment requirements)
  updateItemByName(targetName: string, updatedData: Item): { success: boolean, message: string } {
    const index = this.inventoryDB.findIndex(i => i.name.toLowerCase() === targetName.toLowerCase());
    
    if (index !== -1) {
      // Preserve the original ID in case it was accidentally altered in the form
      updatedData.id = this.inventoryDB[index].id; 
      this.inventoryDB[index] = updatedData;
      return { success: true, message: `Success: Item "${targetName}" updated!` };
    }
    
    return { success: false, message: `Error: Item "${targetName}" not found.` };
  }

  // Delete an item using its exact Name as the key (as per assessment requirements)
  deleteItemByName(targetName: string): { success: boolean, message: string } {
    const index = this.inventoryDB.findIndex(i => i.name.toLowerCase() === targetName.toLowerCase());
    
    if (index !== -1) {
      this.inventoryDB.splice(index, 1);
      return { success: true, message: `Success: Item "${targetName}" deleted permanently!` };
    }
    
    return { success: false, message: `Error: Item "${targetName}" not found.` };
  }

  // Search for items containing the search term in their name (case-insensitive)
  searchItemsByName(searchTerm: string): Item[] {
    if (!searchTerm) {
      return this.inventoryDB; // Return all items if the search box is empty
    }
    
    return this.inventoryDB.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}