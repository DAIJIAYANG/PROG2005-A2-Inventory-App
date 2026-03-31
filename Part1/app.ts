/**
 * Author: JIAYANG DAI
 * Student ID: 24664639
 * Email: j.dai.12@student.scu.edu.au
 * Assignment: PROG2005 Assessment 2 - Part 1
 * Description: TypeScript implementation for the inventory management system.
 * This script handles all CRUD operations and DOM manipulations without using alert().
 */

// 1. Define strict data types and interfaces (TypeScript requirement)
type Category = 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';
type PopularStatus = 'Yes' | 'No';

interface InventoryItem {
    id: string;          // Must be unique
    name: string;        // Primary key for searching, updating, and deleting
    category: Category;
    quantity: number;
    price: number;
    supplier: string;
    status: StockStatus;
    popular: PopularStatus;
    comment?: string;    // Optional field
}

// 2. Initialize local database (Data is stored in memory during the active session only)
let inventoryDB: InventoryItem[] = [];

// 3. Get HTML DOM element references
const msgDiv = document.getElementById('feedbackMessage') as HTMLDivElement;
const tbody = document.getElementById('inventoryBody') as HTMLTableSectionElement;

// Form inputs
const idInput = document.getElementById('itemId') as HTMLInputElement;
const nameInput = document.getElementById('itemName') as HTMLInputElement;
const categorySelect = document.getElementById('itemCategory') as HTMLSelectElement;
const statusSelect = document.getElementById('itemStatus') as HTMLSelectElement;
const qtyInput = document.getElementById('itemQuantity') as HTMLInputElement;
const priceInput = document.getElementById('itemPrice') as HTMLInputElement;
const supplierInput = document.getElementById('itemSupplier') as HTMLInputElement;
const popularSelect = document.getElementById('itemPopular') as HTMLSelectElement;
const commentInput = document.getElementById('itemComment') as HTMLInputElement;

// 4. UI Interaction Functions

// Dynamic feedback mechanism to replace the restricted window.alert()
function showMessage(message: string, isError: boolean = false): void {
    msgDiv.innerHTML = `<div class="${isError ? 'error-msg' : 'success-msg'}">${message}</div>`;
    // Clear the message automatically after 4 seconds
    setTimeout(() => msgDiv.innerHTML = '', 4000); 
}

// Helper function to reset form inputs
function clearForm(): void {
    idInput.value = ''; nameInput.value = ''; qtyInput.value = ''; priceInput.value = '';
    supplierInput.value = ''; commentInput.value = '';
    categorySelect.selectedIndex = 0; statusSelect.selectedIndex = 0; popularSelect.selectedIndex = 0;
}

// Function to render the array data into the HTML table
function renderTable(data: InventoryItem[]): void {
    tbody.innerHTML = ''; 
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 20px;">No items found in database.</td></tr>';
        return;
    }
    
    // Create and append table rows dynamically
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td><td><strong>${item.name}</strong></td><td>${item.category}</td>
            <td>${item.quantity}</td><td>$${item.price.toFixed(2)}</td><td>${item.status}</td><td>${item.popular}</td>
        `;
        tbody.appendChild(tr);
    });
}

// 5. Core Business Logic (CRUD Operations)

// Input validation (checks for empty required fields and negative numbers)
function validateInputs(): boolean {
    if (!idInput.value.trim() || !nameInput.value.trim() || !qtyInput.value || !priceInput.value || !supplierInput.value.trim()) {
        showMessage('Error: All fields except Comment are required!', true);
        return false;
    }
    if (Number(qtyInput.value) < 0 || Number(priceInput.value) < 0) {
        showMessage('Error: Quantity and Price cannot be negative numbers!', true);
        return false;
    }
    return true;
}

// Feature 1: Add a new item
document.getElementById('btnAdd')?.addEventListener('click', () => {
    if (!validateInputs()) return;
    const newId = idInput.value.trim();
    
    // Check if the ID is already used (must be unique)
    if (inventoryDB.some(item => item.id.toLowerCase() === newId.toLowerCase())) {
        showMessage(`Error: Item ID "${newId}" already exists. Please use a different ID.`, true);
        return;
    }
    
    const newItem: InventoryItem = {
        id: newId, 
        name: nameInput.value.trim(), 
        category: categorySelect.value as Category,
        quantity: Number(qtyInput.value), 
        price: Number(priceInput.value),
        supplier: supplierInput.value.trim(), 
        status: statusSelect.value as StockStatus,
        popular: popularSelect.value as PopularStatus, 
        comment: commentInput.value.trim()
    };
    
    inventoryDB.push(newItem);
    showMessage(`Success: Item "${newItem.name}" has been added to the inventory!`);
    clearForm(); 
    renderTable(inventoryDB);
});

// Feature 2: Update an existing item by its exact name
document.getElementById('btnUpdate')?.addEventListener('click', () => {
    const targetName = nameInput.value.trim();
    const index = inventoryDB.findIndex(item => item.name.toLowerCase() === targetName.toLowerCase());
    
    if (index === -1) { 
        showMessage(`Error: Item "${targetName}" not found. Please check the spelling.`, true); 
        return; 
    }
    
    // Update fields if the user provided new inputs
    if (qtyInput.value) inventoryDB[index].quantity = Number(qtyInput.value);
    if (priceInput.value) inventoryDB[index].price = Number(priceInput.value);
    if (supplierInput.value.trim()) inventoryDB[index].supplier = supplierInput.value.trim();
    
    // Always update dropdown selections
    inventoryDB[index].category = categorySelect.value as Category;
    inventoryDB[index].status = statusSelect.value as StockStatus;
    inventoryDB[index].popular = popularSelect.value as PopularStatus;
    
    if (commentInput.value.trim()) inventoryDB[index].comment = commentInput.value.trim();
    
    showMessage(`Success: Item "${targetName}" updated successfully!`);
    clearForm(); 
    renderTable(inventoryDB);
});

// Feature 3: Delete an item by name (requires user confirmation)
document.getElementById('btnDelete')?.addEventListener('click', () => {
    const targetName = nameInput.value.trim();
    const index = inventoryDB.findIndex(item => item.name.toLowerCase() === targetName.toLowerCase());
    
    if (index === -1) { 
        showMessage(`Error: Item "${targetName}" not found.`, true); 
        return; 
    }
    
    // Use window.confirm for safety requirement
    if (window.confirm(`WARNING: Are you sure you want to permanently delete "${targetName}"?`)) {
        inventoryDB.splice(index, 1);
        showMessage(`Success: Item "${targetName}" has been removed.`);
        clearForm(); 
        renderTable(inventoryDB);
    }
});

// Feature 4: Search for items by partial or full name
document.getElementById('btnSearch')?.addEventListener('click', () => {
    const searchName = nameInput.value.trim();
    if (!searchName) { 
        showMessage('Error: Please enter a name to search.', true); 
        return; 
    }
    
    const results = inventoryDB.filter(item => item.name.toLowerCase().includes(searchName.toLowerCase()));
    if (results.length > 0) {
        showMessage(`Search complete: Found ${results.length} matching item(s).`);
    } else {
        showMessage(`No items found matching "${searchName}".`, true);
    }
    renderTable(results);
});

// Feature 5: Reset view to display all items
document.getElementById('btnShowAll')?.addEventListener('click', () => {
    showMessage('Displaying all current items in the inventory.');
    renderTable(inventoryDB);
});

// Feature 6: Filter view to show only popular items
document.getElementById('btnShowPopular')?.addEventListener('click', () => {
    const popularItems = inventoryDB.filter(item => item.popular === 'Yes');
    showMessage(`Filtered view: Displaying ${popularItems.length} popular item(s).`);
    renderTable(popularItems);
});

// Initial render to show empty state when page loads
renderTable(inventoryDB);