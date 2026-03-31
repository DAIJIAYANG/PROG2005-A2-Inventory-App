/**
 * Author: JIAYANG DAI
 * Student ID: 24664639
 * Email: j.dai.12@student.scu.edu.au
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Component to handle searching and filtering operations for the inventory.
 */

import { Component, OnInit } from '@angular/core';
import { InventoryService, Item } from '../../services/inventory.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // Two-way bound to the search input field
  searchTerm: string = '';
  // Array to hold the filtered items to display in the view
  searchResults: Item[] = [];
  // Tracks whether a search or filter has been actively applied
  isSearched: boolean = false;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    // Load and display all items initially before any search is performed
    this.searchResults = this.inventoryService.getAllItems();
  }

  // Execute search based on the user's input string
  onSearch(): void {
    this.isSearched = true;
    this.searchResults = this.inventoryService.searchItemsByName(this.searchTerm);
  }

  // Clear the search input and reset the table to show the full database
  onReset(): void {
    this.searchTerm = '';
    this.isSearched = false;
    this.searchResults = this.inventoryService.getAllItems();
  }

  // Quick filter feature to show only items marked as popular
  showPopularOnly(): void {
    this.isSearched = true;
    this.searchResults = this.inventoryService.getPopularItems();
  }
}