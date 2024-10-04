function initializeRentalHistory() {


    // Store rental history in localStorage if not already present
    if (!localStorage.getItem('rentalHistory')) {
        const rentalHistory = localStorage.setItem('rentalHistory', JSON.stringify(rentalHistory)) ||
            [
                {
                    id: "1",
                    customerName: "rengheson",
                    carModel: "BMW",
                    rentalStartDate: '2024-09-25',
                    rentalEndDate: '2024-10-02',
                    returnDate: '2024-10-05',
                    advance: '50',
                    status: 'Pending'

                  
                    
                },
                {
                    id: "2",
                    customerName: "dilakshan",
                    carModel: "BMW",
                    rentalStartDate: '2024-09-26',
                    rentalEndDate: '2024-10-06',
                    returnDate: '2024-10-08',
                    advance: '50',
                    status: 'Pending'
                }
            ];

    }
}

function fetchRentalHistory() {
    const rentalHistory = JSON.parse(localStorage.getItem('rentalHistory'));
    const rentalHistoryTableBody = document.getElementById('RentalTable').querySelector('tbody');
    rentalHistoryTableBody.innerHTML = ''; // Clear table

    rentalHistory.forEach(record => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = record.id;
        row.appendChild(idCell);


        const customerNameCell = document.createElement('td');
        customerNameCell.textContent = record.customerName;
        row.appendChild(customerNameCell);

        // const customerNameCell = document.createElement('td');
        // customerNameCell.textContent = record.customerName;
        // row.appendChild(customerNameCell);

        const carModelCell = document.createElement('td');
        carModelCell.textContent = record.carModel;
        row.appendChild(carModelCell);

        const rentalStartDateCell = document.createElement('td');
        rentalStartDateCell.textContent = new Date(record.rentalStartDate).toLocaleDateString();
        row.appendChild(rentalStartDateCell);

        const rentalEndDateCell = document.createElement('td');
        rentalEndDateCell.textContent = new Date(record.rentalEndDate).toLocaleDateString();
        row.appendChild(rentalEndDateCell);

        const returnDateCell = document.createElement('td');
        returnDateCell.textContent = record.returnDate ? new Date(record.returnDate).toLocaleDateString() : 'Not Returned';
        row.appendChild(returnDateCell);

        const advanceCell = document.createElement('td');
        advanceCell.textContent = record.advance;
        row.appendChild(advanceCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = record.status || 'Pending';
        row.appendChild(statusCell);

        const actionCell = document.createElement('td');
        const returnButton = document.createElement('button');
        returnButton.textContent = 'Returned';
        returnButton.classList.add('return-btn');
        returnButton.addEventListener('click', () => {
            showConditionModal(record);
        });
        actionCell.appendChild(returnButton);
        row.appendChild(actionCell);

        rentalHistoryTableBody.appendChild(row);
    });
}

function showConditionModal(record) {
    const modal = document.getElementById('conditionModal');
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `<p>Details for Rent ID: ${record.id}</p><p>Condition: Excellent</p>`;
    modal.classList.add('active');
}

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('conditionModal').classList.remove('active');
});

// Initialize and load rental history from localStorage on page load
window.onload = function () {
    initializeRentalHistory();
    fetchRentalHistory();
};
