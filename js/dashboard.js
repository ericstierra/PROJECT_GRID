document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector("#sidebar");
    const sidebarToggler = document.querySelector("#sidebar-toggle");

    // Expand sidebar by default on larger screens
    if (window.innerWidth > 767.98) {
        sidebar.classList.add("expand");
    }

    if (sidebarToggler) {
        sidebarToggler.addEventListener("click", () => {
            sidebar.classList.toggle("expand");
        });
    }
});