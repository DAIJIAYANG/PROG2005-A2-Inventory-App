import { Component, OnInit } from '@angular/core';
import { InventoryService, Item } from '../../services/inventory.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  searchResults: Item[] = [];
  isSearched: boolean = false;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    // 初始状态下显示所有商品
    this.searchResults = this.inventoryService.getAllItems();
  }

  // 执行搜索
  onSearch(): void {
    this.isSearched = true;
    this.searchResults = this.inventoryService.searchItemsByName(this.searchTerm);
  }

  // 重置搜索
  onReset(): void {
    this.searchTerm = '';
    this.isSearched = false;
    this.searchResults = this.inventoryService.getAllItems();
  }

  // 过滤：仅显示热门商品
  showPopularOnly(): void {
    this.isSearched = true;
    this.searchResults = this.inventoryService.getPopularItems();
  }
}