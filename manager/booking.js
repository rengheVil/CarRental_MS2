// Retrieve stored data from localStorage
const paymentdetails = JSON.parse(localStorage.getItem('payments')) || [];
const payCustomer = JSON.parse(localStorage.getItem('customers')) || [];
const Profileupdatecustomers = JSON.parse(localStorage.getItem('userProfileData')) || [];
const lastCarDetail = JSON.parse(localStorage.getItem('lastCarDetail')) || [];

function createBookings() {
    const currentDate = new Date().toISOString(); 

    let bookings = JSON.parse(localStorage.getItem('bookingData')) || [];

    if (true) {
        bookings = paymentdetails.map(payment => {
            const customer = payCustomer.find(c => c.id === payment.customerId);
            const profileUpdateCustomer = Profileupdatecustomers.find(c => c.id === payment.customerId);
            const car = lastCarDetail; 

            const bookingid = `BK-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`; // Unique Booking ID

            return {
                bookingId: bookingid, 
                bookingDate: currentDate,
                customerid: customer?.id,
                name: customer?.name,
                rentalCarId: payment?.rentalCarId,
                email: customer?.email,
                phone: customer?.phone,
                address: profileUpdateCustomer?.address,
                licenseNumber: profileUpdateCustomer?.licenseNumber,
                carModel: car?.model,
                paymentStatus: payment?.paymentstatus,
                proofType: profileUpdateCustomer?.proofType,
                proofNumber: profileUpdateCustomer?.proofNumber,
                statusText: payment?.statusText || "Pending", 

                vehicleDetails: {
                    brand: car?.brand,
                    model: car?.model,
                    fuel: car?.fuel,
                    seats: car?.seats,
                    price: payment?.totalPrice,
                    Advancepayment: payment?.paymentamount,
                    availableFrom: payment?.startDate,
                    availableTo: payment?.endDate
                }
            };
        });

        localStorage.setItem('bookingData', JSON.stringify(bookings));
    }
}

createBookings();

const bookingRequestsTable = document.getElementById('booking-requests');

function renderBookings() {
    bookingRequestsTable.innerHTML = '';

    const bookings = JSON.parse(localStorage.getItem('bookingData')) || []; // Retrieve bookings from localStorage
    bookings.forEach((booking, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.bookingId}</td> <!-- Display Booking ID -->
            <td>${new Date(booking.bookingDate).toLocaleDateString()}</td> <!-- Display Booking Date -->
            <td>${booking.customerid}</td>
            <td>${booking.rentalCarId}</td>
            <td>${booking.vehicleDetails.Advancepayment}</td>
            <td>${booking.vehicleDetails.availableFrom}</td>
            <td>${booking.vehicleDetails.availableTo}</td>
            <td>${booking.statusText}</td>
            <td>
                <button class="view-details" data-index="${index}">View</button>
                <button class="approve" data-index="${index}" ${booking.statusText === 'Approved' ? 'disabled' : ''}>Approve</button>
                <button class="reject" data-index="${index}" ${booking.statusText === 'Rejected' ? 'disabled' : ''}>Reject</button>
            </td>
            <td>
                <button class="rent-button" data-index="${index}">Rental</button>
            </td>
        `;
        bookingRequestsTable.appendChild(row);
    });
}

// Modal functionality
const modal = document.getElementById('myModal');
const closeModal = document.getElementsByClassName('close')[0];

function showBookingDetails(index) {
    const booking = JSON.parse(localStorage.getItem('bookingData'))[index]; // Get the correct booking
    document.getElementById('bookingId').innerText = booking.bookingId;
    document.getElementById('bookingDate').innerText = booking.bookingDate;
    document.getElementById('customerid').innerText = booking.customerid;
    document.getElementById('name').innerText = booking.name;
    document.getElementById('rentalCarId').innerText = booking.rentalCarId;
    document.getElementById('email').innerText = booking.email;
    document.getElementById('phone').innerText = booking.phone;
    document.getElementById('address').innerText = booking.address;
    document.getElementById('license-number').innerText = booking.licenseNumber;

    document.getElementById('paymentAmount').innerText = booking.vehicleDetails.Advancepayment;
    document.getElementById('paymentStatus').innerText = booking.paymentStatus;
    document.getElementById('proof-number').innerText = booking.proofNumber;
    document.getElementById('proof-type').innerText = booking.proofType;
    document.getElementById('brand').innerText = booking.vehicleDetails.brand;
    document.getElementById('model').innerText = booking.vehicleDetails.model;
    document.getElementById('fuel').innerText = booking.vehicleDetails.fuel;
    document.getElementById('seats').innerText = booking.vehicleDetails.seats;
    document.getElementById('price').innerText = booking.vehicleDetails.price;
    document.getElementById('availableFrom').innerText = booking.vehicleDetails.availableFrom;
    document.getElementById('availableTo').innerText = booking.vehicleDetails.availableTo;

    modal.style.display = "block"; 
}

closeModal.onclick = function () {
    modal.style.display = "none"; 
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none"; 
    }
}

const rentalModal = document.getElementById('rentalModal');
const closeRentalModal = document.getElementsByClassName('close-rental-modal')[0];

function showRentalModal(index) {
    const booking = JSON.parse(localStorage.getItem('bookingData'))[index]; 
    document.getElementById('rentalStartDate').value = ''; 
    document.getElementById('halfPayment').value = ''; 
    rentalModal.style.display = "block"; 
}

closeRentalModal.onclick = function () {
    rentalModal.style.display = "none"; // Close rental modal
}

document.getElementById('confirmRental').addEventListener('click', function() {
    const rentalStartDate = document.getElementById('rentalStartDate').value;
    const halfPayment = document.getElementById('halfPayment').value;

    if (rentalStartDate && halfPayment) {
        alert(`Rental confirmed from ${rentalStartDate} with half payment of $${halfPayment}`);
        const newBooking = {
            
        }
        booking.push()
        
        // Close the modal
        rentalModal.style.display = "none";
    } else {
        alert("Please fill in all fields.");
    }
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('view-details')) {
        const index = event.target.getAttribute('data-index');
        showBookingDetails(index);
    }

    if (event.target.classList.contains('approve')) {
        const index = event.target.getAttribute('data-index');
        
        const bookings = JSON.parse(localStorage.getItem('bookingData'));
        bookings[index].statusText = "Approved";
        
        localStorage.setItem('bookingData', JSON.stringify(bookings));

        renderBookings();

        alert(`Approved booking for ${bookings[index].name}.`);
    }

    if (event.target.classList.contains('reject')) {
        const index = event.target.getAttribute('data-index');
        
        const bookings = JSON.parse(localStorage.getItem('bookingData'));
        bookings[index].statusText = "Rejected";

        localStorage.setItem('bookingData', JSON.stringify(bookings));

        renderBookings();

        alert(`Rejected booking for ${bookings[index].name}.`);
    }

    if (event.target.classList.contains('rent-button')) {
        const index = event.target.getAttribute('data-index');
        showRentalModal(index); // Show rental modal
    }
});

renderBookings();
