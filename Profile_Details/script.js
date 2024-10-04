document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profile-form");
    const licenseFrontInput = document.getElementById("license-front");
    const licenseBackInput = document.getElementById("license-back");
    const licenseFrontPreview = document.getElementById("licenseFrontPreview");
    const licenseBackPreview = document.getElementById("licenseBackPreview");
    const notificationDiv = document.querySelector(".notification");

    // Get carid and customerid from the URL
    const carid = getQueryParam('carid');
    const customerid = getQueryParam('customerid');

    // Load profile data for the matching customer
    loadProfileData();

    // Event listener for license front image upload preview
    licenseFrontInput.addEventListener("change", function () {
        previewImage(licenseFrontInput, licenseFrontPreview);
    });

    // Event listener for license back image upload preview
    licenseBackInput.addEventListener("change", function () {
        previewImage(licenseBackInput, licenseBackPreview);
    });

    // Handle form submission
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();
        saveProfileData();
        showNotification("Profile updated successfully!");
    });

    // Preview selected image
    function previewImage(inputElement, previewElement) {
        const file = inputElement.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            previewElement.style.display = "block";
            previewElement.src = e.target.result;
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    // Generate a unique ID for each profile
    function generateUniqueId() {
        return `id-${Date.now()}-${Math.floor(Math.random() * 100)}`;
    }

    // Save profile data to localStorage
    function saveProfileData() {
        let userData = JSON.parse(localStorage.getItem("userProfileData")) || [];

        // Validate required fields
        if (!document.getElementById("name").value) {
            showNotification("Name is required!");
            return;
        }

        // Prepare profile data
        const status = (licenseFrontInput.files[0] && licenseBackInput.files[0]) ? "Pending" : "Documents upload pending";
        let customerDetailsArray = JSON.parse(localStorage.getItem('customers')) || [];
        const selectedCustomer = customerDetailsArray.find(customer => customer.id == customerid);
        const profileData = {
            id: customerid || generateUniqueId(),
            name: selectedCustomer ? selectedCustomer.name : "",
            email: selectedCustomer ? selectedCustomer.email : "",
            phone: selectedCustomer ? selectedCustomer.phone : "",
            address: document.getElementById("address").value || "",
            postalCode: document.getElementById("postal-code").value || "",
            licenseNumber: document.getElementById("license-number").value || "",
            proofType: document.getElementById("proof-type").value || "",
            proofNumber: document.getElementById("proof-number").value || "",
            status: status
        };

        // Replace or add new profile data
        const existingProfileIndex = userData.findIndex(profile => profile.id === customerid);
        if (existingProfileIndex !== -1) {
            userData[existingProfileIndex] = profileData;  // Update existing profile
        } else {
            userData.push(profileData);  // Add new profile
        }

        // Save to localStorage
        try {
            localStorage.setItem("userProfileData", JSON.stringify(userData));

            // Save images if present
            if (licenseFrontInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    localStorage.setItem("licenseFrontImage", e.target.result);
                };
                reader.readAsDataURL(licenseFrontInput.files[0]);
            }

            if (licenseBackInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    localStorage.setItem("licenseBackImage", e.target.result);
                };
                reader.readAsDataURL(licenseBackInput.files[0]);
            }

        } catch (error) {
            showNotification("Error saving profile data!");
            console.error("Error saving to localStorage", error);
        }
    }

    // Load profile data from localStorage
    function loadProfileData() {
        const storedProfileData = JSON.parse(localStorage.getItem("userProfileData"));

        if (storedProfileData && storedProfileData.length > 0) {
            const currentProfile = storedProfileData.find(profile => profile.id === customerid);

            if (currentProfile) {
                document.getElementById("name").value = currentProfile.name || "";
                document.getElementById("email").value = currentProfile.email || "";
                document.getElementById("phone").value = currentProfile.phone || "";
                document.getElementById("address").value = currentProfile.address || "";
                document.getElementById("postal-code").value = currentProfile.postalCode || "";
                document.getElementById("license-number").value = currentProfile.licenseNumber || "";
                document.getElementById("proof-type").value = currentProfile.proofType || "";
                document.getElementById("proof-number").value = currentProfile.proofNumber || "";

                const verificationStatusSpan = document.querySelector(".verification-status .status");
                verificationStatusSpan.textContent = currentProfile.status || "Unknown";

                // Redirect if the profile is verified
                if (currentProfile.status === "Verified") {
                    window.location.href = `../Verified_Customer/Verified_Customer.html?carid=${carid}&customerid=${customerid}`;
                }
            } else {
                console.log("No matching profile found for this customer.");
            }
        }

        // Load and display license images if available
        const storedLicenseFrontImage = localStorage.getItem("licenseFrontImage");
        if (storedLicenseFrontImage) {
            licenseFrontPreview.src = storedLicenseFrontImage;
            licenseFrontPreview.style.display = "block";
        }

        const storedLicenseBackImage = localStorage.getItem("licenseBackImage");
        if (storedLicenseBackImage) {
            licenseBackPreview.src = storedLicenseBackImage;
            licenseBackPreview.style.display = "block";
        }
    }

    // Show notification message
    function showNotification(message) {
        notificationDiv.textContent = message;
        notificationDiv.style.display = "block";

        setTimeout(() => {
            notificationDiv.style.display = "none";
        }, 5000);
    }

    // Toggle user dropdown
    document.querySelector('.user-dropdown').addEventListener('click', function () {
        const content = document.querySelector('.user-dropdown-content');
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });

    // Function to get query parameters from the URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
});
