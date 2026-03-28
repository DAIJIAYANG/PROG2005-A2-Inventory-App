import { Component, OnInit } from '@angular/core';
import { InventoryService, Item } from '../../services/inventory.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  // 绑定表单的数据模型
  currentItem: Item = this.getEmptyItem();
  inventoryList: Item[] = [];
  
  // UI 提示信息
  feedbackMessage: string = '';
  isError: boolean = false;

  // 依赖注入我们的 Service
  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.refreshList();
  }

  // 获取一个空的表单对象
  getEmptyItem(): Item {
    return { id: '', name: '', category: 'Electronics', quantity: 0, price: 0, supplier: '', status: 'In Stock', popular: 'No', comment: '' };
  }

  // 刷新表格数据
  refreshList(): void {
    this.inventoryList = this.inventoryService.getAllItems();
  }

  // 显示提示信息
  showMessage(msg: string, error: boolean = false) {
    this.feedbackMessage = msg;
    this.isError = error;
    setTimeout(() => this.feedbackMessage = '', 3500);
  }

  // 1. 添加商品
  onAdd() {
    if (!this.currentItem.id || !this.currentItem.name || this.currentItem.quantity < 0 || this.currentItem.price < 0) {
      this.showMessage('Please fill all required fields correctly (No negative numbers).', true);
      return;
    }
    const result = this.inventoryService.addItem({ ...this.currentItem });
    if (result.success) {
      this.showMessage(result.message);
      this.currentItem = this.getEmptyItem(); // 清空表单
      this.refreshList();
    } else {
      this.showMessage(result.message, true);
    }
  }

  // 2. 根据名称更新商品 
  onUpdate() {
    if (!this.currentItem.name) {
      this.showMessage('Please enter the exact Item Name to update.', true);
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

  // 3. 根据名称删除商品 
  onDelete() {
    if (!this.currentItem.name) {
      this.showMessage('Please enter the exact Item Name to delete.', true);
      return;
    }
    if (confirm(`WARNING: Are you sure you want to delete "${this.currentItem.name}"?`)) {
      const result = this.inventoryService.deleteItemByName(this.currentItem.name);
      if (result.success) {
        this.showMessage(result.message);
        this.currentItem = this.getEmptyItem();
        this.refreshList();
      } else {
        this.showMessage(result.message, true);
      }
    }
  }
}