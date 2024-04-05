async function addProduct() {
    const price = document.getElementById('price').value;
    const productName = document.getElementById('product-name').value;
    const category = document.getElementById('category').value;

    if (!price || !productName || !category) {
      alert('Please fill all fields');
      return;
    }

    const payload = {
      price,
      productName
    };

    try {
      const response = await fetch('https://crudcrud.com/api/1f744dbc21ba472c92cdd91b6e0c0c52/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        displayProduct(data, category);
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function displayProduct(product, category) {
    const productElement = document.createElement('div');
    productElement.className = 'product-item';
    productElement.innerHTML = `
      <span class="product-name">${product.productName}</span>
      <span class="product-price">${product.price}</span>
      <button onclick="deleteProduct('${product._id}', '${category}')">Delete</button>
    `;

    const productList = document.getElementById(`${category}-list`);
    productList.appendChild(productElement);
  }

  async function deleteProduct(productId, category) {
    try {
        const response = await fetch(`https://crudcrud.com/api/1f744dbc21ba472c92cdd91b6e0c0c52/products/${productId}`, {
          method: 'DELETE'
        });
    
        if (response.ok) {
          const productElement = document.querySelector(`#${category}-list .product-item[data-id="${productId}"]`);
          if (productElement) {
            productElement.remove();
          } else {
            alert('Product element not found');
          }
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }