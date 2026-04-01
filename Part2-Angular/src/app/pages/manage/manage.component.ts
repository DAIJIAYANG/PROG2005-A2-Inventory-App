/**
 * Author: JIAYANG DAI
 * Student ID: 24664639
 * Email: j.dai.12@student.scu.edu.au
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Component responsible for adding, updating, and deleting inventory items.
 */

import { Component, OnInit } from '@angular/core';
import { InventoryService, Item } from '../../services/inventory.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  // Data model bound to the form inputs
  currentItem: Item = this.getEmptyItem();
  
  // Array to store the data for the table view
  inventoryList: Item[] = [];
  
  // Variables to handle UI feedback messages
  feedbackMessage: string = '';
  isError: boolean = false;

  // Inject the InventoryService to manage data
  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    // Load the data into the table when the page is initialized
    this.refreshList();
  }

  // Helper method to reset the form to a blank state
  getEmptyItem(): Item {
    return { 
      id: '', name: '', category: 'Electronics', 
      quantity: 0, price: 0, supplier: '', 
      status: 'In Stock', popular: 'No', comment: '' 
    };
  }

  // Fetch the latest data from the service
  refreshList(): void {
    this.inventoryList = this.inventoryService.getAllItems();
  }

  // Display a temporary feedback message on the screen
  showMessage(msg: string, error: boolean = false) {
    this.feedbackMessage = msg;
    this.isError = error;
    // Auto-hide the message after 3.5 seconds
    setTimeout(() => this.feedbackMessage = '', 3500);
  }

  // Method to add a new item from the form
  onAdd() {
    // Basic validation to prevent empty required fields or negative numbers
    if (!this.currentItem.id || !this.currentItem.name || this.currentItem.quantity < 0 || this.currentItem.price < 0) {
      this.showMessage('Please fill all required fields correctly. No negative numbers allowed.', true);
      return;
    }
    
    // Pass a copy of the currentItem to the service
    const result = this.inventoryService.addItem({ ...this.currentItem });
    
    if (result.success) {
      this.showMessage(result.message);
      this.currentItem = this.getEmptyItem(); // Clear the form on success
      this.refreshList();
    } else {
      this.showMessage(result.message, true);
    }
  }

  // Method to update an existing item (Must be done by exact Item Name)
  onUpdate() {
    if (!this.currentItem.name) {
      this.showMessage('Please enter the exact Item Name to perform an update.', true);
      return;
    }
    
    const result = this.inventoryService.updateItemByName(this.currentItem.name, { ...this.currentItem });
    
    if (result.success) {
      this.showMessage(result.message);
      this.refreshList();
    } else {
      this.showMessage(result.message, true);
    }
  }

  // Method to delete an item (Must be done by exact Item Name)
  onDelete() {
    if (!this.currentItem.name) {
      this.showMessage('Please enter the exact Item Name to delete an item.', true);
      return;
    }
    
    // Require user confirmation before permanently deleting data
    if (confirm(`WARNING: Are you sure you want to delete "${this.currentItem.name}"?`)) {
      const result = this.inventoryService.deleteItemByName(this.currentItem.name);
      
      if (result.success) {
        this.showMessage(result.message);
        this.currentItem = this.getEmptyItem(); // Clear the form after deletion
        this.refreshList();
      } else {
        this.showMessage(result.message, true);
      }
    }
  }
}