/**
 * Author: JIAYANG DAI
 * Student ID: 24664639
 * Email: j.dai.12@student.scu.edu.au
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: This service manages the inventory data in memory for the session.
 */

import { Injectable } from '@angular/core';

// 定义和 Part 1 类似的数据接口
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
  // 仅在浏览器会话中保存数据的数组
  private inventoryDB: Item[] = [];

  constructor() { 
    // 初始化时可以放一条假数据方便测试，这很符合学生的开发习惯
    this.inventoryDB.push({
      id: 'ITEM001',
      name: 'MacBook Pro',
      category: 'Electronics',
      quantity: 10,
      price: 1999.99,
      supplier: 'Apple Inc.',
      status: 'In Stock',
      popular: 'Yes',
      comment: 'Sample data'
    });
  }

  // 获取所有商品
  getAllItems(): Item[] {
    return this.inventoryDB;
  }

  // 获取热门商品
  getPopularItems(): Item[] {
    return this.inventoryDB.filter(item => item.popular === 'Yes');
  }

  // 添加商品：检查 ID 是否唯一
  addItem(newItem: Item): { success: boolean, message: string } {
    const exists = this.inventoryDB.some(i => i.id.toLowerCase() === newItem.id.toLowerCase());
    if (exists) {
      return { success: false, message: 'Item ID already exists!' };
    }
    this.inventoryDB.push(newItem);
    return { success: true, message: 'Item added successfully!' };
  }

  // 更新商品：作业要求必须通过名称更新
  updateItemByName(targetName: string, updatedData: Item): { success: boolean, message: string } {
    const index = this.inventoryDB.findIndex(i => i.name.toLowerCase() === targetName.toLowerCase());
    if (index !== -1) {
      // 保留原来的 ID，更新其他数据
      updatedData.id = this.inventoryDB[index].id; 
      this.inventoryDB[index] = updatedData;
      return { success: true, message: `Item "${targetName}" updated successfully!` };
    }
    return { success: false, message: `Item "${targetName}" not found.` };
  }

  // 删除商品：作业要求必须通过名称删除
  deleteItemByName(targetName: string): { success: boolean, message: string } {
    const index = this.inventoryDB.findIndex(i => i.name.toLowerCase() === targetName.toLowerCase());
    if (index !== -1) {
      this.inventoryDB.splice(index, 1);
      return { success: true, message: `Item "${targetName}" deleted successfully!` };
    }
    return { success: false, message: `Item "${targetName}" not found.` };
  }

  // 搜索商品：通过名称模糊搜索
  searchItemsByName(searchTerm: string): Item[] {
    if (!searchTerm) {
      return this.inventoryDB; // 如果搜索词为空，返回全部
    }
    return this.inventoryDB.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}