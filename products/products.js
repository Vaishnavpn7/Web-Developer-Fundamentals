$(document).ready(function() {
    // Fetch products from the server using a GET request
    $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products', function(data) {
        // Display all products initially
        displayProducts(data);

        // Filter products based on checkbox selections
        $('input[type="checkbox"]').change(function() {
            const filters = getSelectedFilters();
            const filteredProducts = filterProducts(data, filters);
            displayProducts(filteredProducts);
        });
    });

    // Function to display products in the table
    function displayProducts(products) {
        const productList = $('#product-list');
        productList.empty();

        products.forEach(function(product) {
            productList.append(`
                <tr>
                    <td>${product.id}</td>
                    <td>${product.medicineName}</td>
                    <td>${product.medicineBrand}</td>
                    <td>${product.expiryDate}</td>
                    <td>${product.unitPrice}</td>
                    <td>${product.prescriptionRequired ? 'Yes' : 'No'}</td>
                    <td>${product.stock}</td>
                </tr>
            `);
        });
    }

    // Function to get selected filters
    function getSelectedFilters() {
        const filters = [];
        if ($('#filter-expired').prop('checked')) {
            filters.push('expired');
        }
        if ($('#filter-low-stock').prop('checked')) {
            filters.push('low-stock');
        }
        return filters;
    }

    // Function to filter products based on expiry and stock
    function filterProducts(products, filters) {
        return products.filter(function(product) {
            const currentDate = new Date();
            const expiryDate = new Date(product.expiryDate);
            const isExpired = expiryDate < currentDate;
            const isLowStock = product.stock < 100;

            if (filters.includes('expired') && filters.includes('low-stock')) {
                return isExpired && isLowStock;
            } else if (filters.includes('expired')) {
                return isExpired;
            } else if (filters.includes('low-stock')) {
                return isLowStock;
            } else {
                return true; // No filters selected
            }
        });
    }
});
