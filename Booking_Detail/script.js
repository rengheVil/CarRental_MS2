document.addEventListener('DOMContentLoaded', () => {
    const profileUpdateButton = document.getElementById("profile-update");

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get carid and customerid from the URL
    const carid = getQueryParam('carid');
    const customerid = getQueryParam('customerid');

    if (profileUpdateButton) {
        profileUpdateButton.addEventListener('click', () => {
            let redirectUrl = '../Profile_Details/profileupdateform.html';
            if (carid && customerid) {
                redirectUrl += `?carid=${carid}&customerid=${customerid}`;
            }
            window.location.href = redirectUrl;
        });
    }
});
