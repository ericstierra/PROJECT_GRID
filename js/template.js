document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and insert HTML content
    const loadComponent = async (url, placeholderId) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
            }
            const data = await response.text();
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = data;
            }
        } catch (error) {
            console.error('Error loading component:', error);
            const placeholder = document.getElementById(placeholderId);
            if(placeholder) {
                placeholder.innerHTML = `<div class="alert alert-danger">Failed to load component from ${url}. Please check the file path and ensure you are running this from a web server.</div>`;
            }
        }
    };

    const loadAllComponents = async () => {
        // Assuming pages are in a 'pages' subdirectory, these paths are relative to the HTML file.
        await Promise.all([
            loadComponent('_sidebar.html', 'sidebar-container'),
            loadComponent('_navbar.html', 'navbar-container')
        ]);

        // All components are loaded, now initialize scripts that depend on them.
        initializeSidebarToggler();

        // Dispatch a custom event to let other scripts know the templates are ready.
        document.dispatchEvent(new CustomEvent('templates-loaded'));
    };

    // This function is now needed here because the sidebar toggle button is loaded dynamically
    const initializeSidebarToggler = () => {
        const sidebar = document.querySelector("#sidebar");
        const sidebarToggler = document.querySelector("#sidebar-toggle");

        // Check if sidebar exists and is not already expanded on mobile
        if (sidebar && window.innerWidth > 767.98 && !sidebar.classList.contains('expand')) {
            sidebar.classList.add("expand");
        }

        if (sidebarToggler && sidebar) {
            sidebarToggler.addEventListener("click", () => {
                sidebar.classList.toggle("expand");
            });
        }
    };

    loadAllComponents();
});
