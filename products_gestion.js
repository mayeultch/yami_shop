let products = JSON.parse(localStorage.getItem('products')) || [];
let currentIndex = null;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-table')) {
        displayProducts();
    }
});

function displayProducts() {
    const productTableBody = document.querySelector('#product-table tbody');
    productTableBody.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;"></td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>€${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>€${product.totalCost.toFixed(2)}</td>
            <td>
                <button onclick="openModal(${index})">Modifier</button>
                <button onclick="deleteProduct(${index})">Supprimer</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });
}

function openModal(index) {
    const product = products[index];
    document.getElementById('edit-name').value = product.name;
    document.getElementById('edit-description').value = product.description;
    document.getElementById('edit-price').value = product.price;
    document.getElementById('edit-stock').value = product.stock;
    document.getElementById('edit-image').value = product.image;

    currentIndex = index;
    document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
    currentIndex = null;
}

function saveProduct() {
    const name = document.getElementById('edit-name').value;
    const description = document.getElementById('edit-description').value;
    const price = parseFloat(document.getElementById('edit-price').value);
    const stock = parseInt(document.getElementById('edit-stock').value);
    const image = document.getElementById('edit-image').value;
    const totalCost = price * stock;

    if (currentIndex !== null) {
        products[currentIndex] = { name, description, price, stock, image, totalCost };
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        closeModal();
    }
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}
