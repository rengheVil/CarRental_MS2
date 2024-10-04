document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.querySelector(".close-button");
    const loginInfo = document.querySelector(".login-info");
    const loginForm = document.querySelector(".login-form");
    const registerLink = document.getElementById("registerLink");

    closeButton.addEventListener("click", () => {
        loginInfo.style.display = "none";
    });

    function encryption(password) {
        return btoa(password); 
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const carId = getQueryParam('carid');

    if (carId) {
        registerLink.href = `../Customer_Register/Register.html?carid=${carId}`;
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const customers = JSON.parse(localStorage.getItem('customers')) || [];
      

        const nic = document.getElementById("nic").value.trim();
        const password = encryption(document.getElementById("password").value);

        if (!nic || !password) {
            document.getElementById('demo1').innerHTML = "NIC or Password cannot be empty.";
            return;
        }

        let customer = customers.find(c => c.nic === nic && c.password === password);
        if (customer) {
            document.getElementById('demo1').innerHTML = "Login successful!";
            document.getElementById('logincontinue').style.display = "none";
            document.getElementById('deleteX').style.display = "none";

            const loggedUser = { "nic": customer.nic, "password": customer.password };
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

            const userProfileData = JSON.parse(localStorage.getItem('userProfileData')) || [];
            

            let uProfileData = userProfileData.find(p => p.id === customer.id);
            console.log(uProfileData);
            

            if (carId === null) {
                
                window.location.href = `../Landing_Page/index.html`;  

            }
            else {
                window.location.href = `../Booking_Detail/booking-summary.html?carid=${carId}&customerid=${customer.id}`;
            }
            if (uProfileData.status === "Verified") {
              window.location.href = `../Verified_Customer/Verified_Customer.html?carid=${carId}&customerid=${customer.id}`;
          
            } else {
                window.location.href = `../Booking_Detail/booking-summary.html?carid=${carId}&customerid=${customer.id}`;
            }
            
        } else {
            document.getElementById('demo1').innerHTML = "Incorrect NIC or password.";
            document.getElementById('logincontinue').style.display = "none";
            document.getElementById('deleteX').style.display = "none";
        }

        event.target.reset();
    });
});
