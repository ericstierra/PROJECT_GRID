document.addEventListener("DOMContentLoaded", function() {
    const contentArea = document.querySelector(".content");

    // Function to fetch and insert HTML content into a specific placeholder
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

    // Function to load page content into the main content area
    const loadPageContent = async (pageUrl) => {
        if (!contentArea) {
            console.error("Main content area not found.");
            return;
        }
        try {
            const response = await fetch(pageUrl);
            if (!response.ok) {
                throw new Error(`Failed to load page content ${pageUrl}: ${response.status}`);
            }
            const data = await response.text();
            contentArea.innerHTML = data;

            // The new content might have <script> tags. We need to execute them.
            const scripts = contentArea.querySelectorAll("script");
            scripts.forEach(script => {
                const newScript = document.createElement("script");
                newScript.type = script.type; // Preserve script type, e.g., "module"
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.innerHTML = script.innerHTML;
                }
                document.body.appendChild(newScript).remove(); // Append and immediately remove to execute
            });

        } catch (error) {
            console.error('Error loading page content:', error);
            contentArea.innerHTML = `<div class="alert alert-danger">Failed to load page content from ${pageUrl}.</div>`;
        }
    };

    const loadAllComponents = async () => {
        // Load shared components
        await Promise.all([
            loadComponent('_sidebar.html', 'sidebar-container'),
            loadComponent('_navbar.html', 'navbar-container')
        ]);

        // After shared components are loaded, initialize their JS
        initializeSidebarToggler();
        initializeSidebarNavigation();
        
        // Load the default page content (dashboard)
        await loadPageContent('_dashboard_content.html');

        // Dispatch a custom event to let other scripts know the templates are ready.
        document.dispatchEvent(new CustomEvent('templates-loaded'));
    };

    // This function is now needed here because the sidebar toggle button is loaded dynamically
    const initializeSidebarToggler = () => {
        const sidebar = document.querySelector("#sidebar");
        const sidebarToggler = document.querySelector("#sidebar-toggle");

        const handleSidebarState = () => {
            if (sidebar) {
                if (window.innerWidth > 767.98) {
                    sidebar.classList.add("expand");
                } else {
                    sidebar.classList.remove("expand");
                }
            }
        };

        // Initial check
        handleSidebarState();

        // Handle window resize
        window.addEventListener('resize', handleSidebarState);

        if (sidebarToggler && sidebar) {
            sidebarToggler.addEventListener("click", () => {
                sidebar.classList.toggle("expand");
            });
        }
    };

    // This function sets up the navigation logic for sidebar links
    const initializeSidebarNavigation = () => {
        const sidebar = document.getElementById('sidebar-container');
        sidebar.addEventListener('click', function(event) {
            const link = event.target.closest('a.sidebar-link');
            if (link && link.dataset.page) {
                event.preventDefault(); // Prevent default link behavior
                const pageUrl = link.dataset.page;
                // In mobile view, close the sidebar after clicking a link
                if (window.innerWidth <= 767.98) {
                    const sidebarElement = document.querySelector("#sidebar");
                    sidebarElement?.classList.remove("expand");
                }
                loadPageContent(pageUrl);
            }
        });
    };

    loadAllComponents();
});
