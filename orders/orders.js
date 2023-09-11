$(document).ready(function() {
    // Fetch orders from the server using a GET request
    $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders', function(data) {
        // Display all orders initially
        displayOrders(data);

        // Filter orders based on checkbox selections
        $('input[type="checkbox"]').change(function() {
            const filters = getSelectedFilters();
            const filteredOrders = filterOrders(data, filters);
            displayOrders(filteredOrders);
        });
    });

    // Function to display orders in the table
    function displayOrders(orders) {
        const orderList = $('#order-list');
        orderList.empty();

        orders.forEach(function(order) {
            orderList.append(`
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customerName}</td>
                    <td>${order.orderDate}</td>
                    <td>${order.orderTime}</td>
                    <td>${order.amount}</td>
                    <td>${order.orderStatus}</td>
                </tr>
            `);
        });
    }

    // Function to get selected filters
    function getSelectedFilters() {
        const filters = [];
        $('input[type="checkbox"]:checked').each(function() {
            filters.push($(this).attr('id').replace('filter-', ''));
        });
        return filters;
    }

    // Function to filter orders based on status
    function filterOrders(orders, filters) {
        if (filters.length === 0) {
            return orders; // Return all orders if no filters selected
        } else {
            return orders.filter(function(order) {
                return filters.includes(order.orderStatus.toLowerCase()); // Convert to lowercase for case-insensitive matching
            });
        }
    }
});
