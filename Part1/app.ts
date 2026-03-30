/**
 * Author: JIAYANG DAI
 * Student ID: 24664639
 * Email: j.dai.12@student.scu.edu.au
 * Assignment: PROG2005 Assessment 2 - Part 1
 */

// 1. 定义严格的数据类型
type Category = 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';
type PopularStatus = 'Yes' | 'No';

interface InventoryItem {
    id: string;          // 必须唯一
    name: string;        // 用于搜索、更新、删除的关键字段
    category: Category;
    quantity: number;
    price: number;
    supplier: string;
    status: StockStatus;
    popular: PopularStatus;
    comment?: string;    // 可选
}

// 2. 初始化本地数据库
let inventoryDB: InventoryItem[] = [];

// 3. 获取 HTML DOM 元素
const msgDiv = document.getElementById('feedbackMessage') as HTMLDivElement;
const tbody = document.getElementById('inventoryBody') as HTMLTableSectionElement;

const idInput = document.getElementById('itemId') as HTMLInputElement;
const nameInput = document.getElementById('itemName') as HTMLInputElement;
const categorySelect = document.getElementById('itemCategory') as HTMLSelectElement;
const statusSelect = document.getElementById('itemStatus') as HTMLSelectElement;
const qtyInput = document.getElementById('itemQuantity') as HTMLInputElement;
const priceInput = document.getElementById('itemPrice') as HTMLInputElement;
const supplierInput = document.getElementById('itemSupplier') as HTMLInputElement;
const popularSelect = document.getElementById('itemPopular') as HTMLSelectElement;
const commentInput = document.getElementById('itemComment') as HTMLInputElement;

// 4. UI 交互功能 (动态消息反馈机制)
function showMessage(message: string, isError: boolean = false): void {
    msgDiv.innerHTML = `<div class="${isError ? 'error-msg' : 'success-msg'}">${message}</div>`;
    setTimeout(() => msgDiv.innerHTML = '', 4000); 
}

function clearForm(): void {
    idInput.value = ''; nameInput.value = ''; qtyInput.value = ''; priceInput.value = '';
    supplierInput.value = ''; commentInput.value = '';
    categorySelect.selectedIndex = 0; statusSelect.selectedIndex = 0; popularSelect.selectedIndex = 0;
}

function renderTable(data: InventoryItem[]): void {
    tbody.innerHTML = ''; 
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 20px;">No items found.</td></tr>';
        return;
    }
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td><td><strong>${item.name}</strong></td><td>${item.category}</td>
            <td>${item.quantity}</td><td>$${item.price.toFixed(2)}</td><td>${item.status}</td><td>${item.popular}</td>
        `;
        tbody.appendChild(tr);
    });
}

// 数据验证
function validateInputs(): boolean {
    if (!idInput.value.trim() || !nameInput.value.trim() || !qtyInput.value || !priceInput.value || !supplierInput.value.trim()) {
        showMessage('Error: All fields except Comment are required!', true);
        return false;
    }
    if (Number(qtyInput.value) < 0 || Number(priceInput.value) < 0) {
        showMessage('Error: Quantity and Price cannot be negative!', true);
        return false;
    }
    return true;
}

// 功能 1：添加商品
document.getElementById('btnAdd')?.addEventListener('click', () => {
    if (!validateInputs()) return;
    const newId = idInput.value.trim();
    if (inventoryDB.some(item => item.id.toLowerCase() === newId.toLowerCase())) {
        showMessage(`Error: Item ID "${newId}" already exists!`, true);
        return;
    }
    const newItem: InventoryItem = {
        id: newId, name: nameInput.value.trim(), category: categorySelect.value as Category,
        quantity: Number(qtyInput.value), price: Number(priceInput.value),
        supplier: supplierInput.value.trim(), status: statusSelect.value as StockStatus,
        popular: popularSelect.value as PopularStatus, comment: commentInput.value.trim()
    };
    inventoryDB.push(newItem);
    showMessage(`Success: Item added successfully!`);
    clearForm(); renderTable(inventoryDB);
});

// 功能 2：更新商品
document.getElementById('btnUpdate')?.addEventListener('click', () => {
    const targetName = nameInput.value.trim();
    const index = inventoryDB.findIndex(item => item.name.toLowerCase() === targetName.toLowerCase());
    if (index === -1) { showMessage(`Error: Item not found.`, true); return; }
    
    if (qtyInput.value) inventoryDB[index].quantity = Number(qtyInput.value);
    if (priceInput.value) inventoryDB[index].price = Number(priceInput.value);
    if (supplierInput.value.trim()) inventoryDB[index].supplier = supplierInput.value.trim();
    inventoryDB[index].category = categorySelect.value as Category;
    inventoryDB[index].status = statusSelect.value as StockStatus;
    inventoryDB[index].popular = popularSelect.value as PopularStatus;
    
    showMessage(`Success: Item updated!`);
    clearForm(); renderTable(inventoryDB);
});

// 功能 3：删除商品
document.getElementById('btnDelete')?.addEventListener('click', () => {
    const targetName = nameInput.value.trim();
    const index = inventoryDB.findIndex(item => item.name.toLowerCase() === targetName.toLowerCase());
    if (index === -1) { showMessage(`Error: Item not found.`, true); return; }
    
    if (window.confirm(`Are you sure you want to delete "${targetName}"?`)) {
        inventoryDB.splice(index, 1);
        showMessage(`Success: Item deleted.`);
        clearForm(); renderTable(inventoryDB);
    }
});

// 功能 4：搜索商品
document.getElementById('btnSearch')?.addEventListener('click', () => {
    const searchName = nameInput.value.trim();
    const results = inventoryDB.filter(item => item.name.toLowerCase().includes(searchName.toLowerCase()));
    results.length > 0 ? showMessage(`Found ${results.length} item(s).`) : showMessage(`No items found.`, true);
    renderTable(results);
});

// 功能 5 & 6：显示全部与显示热门
document.getElementById('btnShowAll')?.addEventListener('click', () => { renderTable(inventoryDB); });
document.getElementById('btnShowPopular')?.addEventListener('click', () => {
    renderTable(inventoryDB.filter(item => item.popular === 'Yes'));
});

renderTable(inventoryDB);