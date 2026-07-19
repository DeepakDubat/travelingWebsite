document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile Nav Drawer ----
    const menuBtn    = document.getElementById('menuBtn');
    const navDrawer  = document.getElementById('navDrawer');
    const navOverlay = document.getElementById('navOverlay');
    const drawerClose = document.getElementById('drawerClose');

    function openDrawer() {
        navDrawer?.classList.add('open');
        navOverlay?.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
        navDrawer?.classList.remove('open');
        navOverlay?.classList.remove('open');
        document.body.style.overflow = '';
    }

    menuBtn?.addEventListener('click', openDrawer);
    drawerClose?.addEventListener('click', closeDrawer);
    navOverlay?.addEventListener('click', closeDrawer);

    // Close drawer when any nav link is clicked
    document.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // Shared Toast Notification System
    function showToast(message, isSuccess = true) {
        const toast = document.createElement('div');
        const iconPath = isSuccess 
            ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            : 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';

        toast.className = isSuccess ? 'toast' : 'toast toast-error';
        toast.innerHTML = `
            <div class="toast-inner">
                <svg class="toast-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}" />
                </svg>
                <span class="toast-msg">${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 500);
        }, 3500);
    }

    // Destination Toggle Logic
    const toggleButton = document.getElementById('toggleButton');
    const moreDestinations = document.getElementById('moreDestinations');
    const toggleIcon = toggleButton ? toggleButton.querySelector('svg') : null;

    if (toggleButton && moreDestinations) {
        toggleButton.addEventListener('click', () => {
            const isHidden = moreDestinations.classList.contains('hidden');
            if (isHidden) {
                moreDestinations.classList.remove('hidden');
                setTimeout(() => {
                    moreDestinations.style.opacity = '1';
                }, 10);
                toggleButton.querySelector('span').textContent = 'Show Less Destinations';
                if (toggleIcon) toggleIcon.style.transform = 'rotate(180deg)';
            } else {
                moreDestinations.classList.add('hidden');
                toggleButton.querySelector('span').textContent = 'View More Destinations';
                if (toggleIcon) toggleIcon.style.transform = 'rotate(0deg)';
                document.getElementById('Destination').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Packages Toggle Logic
    const viewAllPackagesButton = document.getElementById('viewAllPackagesButton');
    const viewLessPackagesButton = document.getElementById('viewLessPackagesButton');
    const hiddenPackages = document.querySelectorAll('.hidden-packages');

    if (viewAllPackagesButton && viewLessPackagesButton) {
        viewAllPackagesButton.addEventListener('click', () => {
            hiddenPackages.forEach(p => p.classList.remove('hidden'));
            viewAllPackagesButton.classList.add('hidden');
            viewLessPackagesButton.classList.remove('hidden');
        });

        viewLessPackagesButton.addEventListener('click', () => {
            hiddenPackages.forEach(p => p.classList.add('hidden'));
            viewAllPackagesButton.classList.remove('hidden');
            viewLessPackagesButton.classList.add('hidden');
            document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Mock Booking Logic for Links
    const bookButtons = document.querySelectorAll('a[href="#packages"], .package-card a');
    bookButtons.forEach(btn => {
        if (btn.textContent.trim() === 'Book Now' || btn.textContent.trim() === 'Book Journey') {
            btn.addEventListener('click', (e) => {
                if (btn.getAttribute('href') === '#packages') return;
                e.preventDefault();
                showToast('Booking request initialized! We will contact you shortly.');
            });
        }
    });

    // Form Submissions Intercept
    
    // 1. Search Widget
    const searchWidget = document.getElementById('searchWidget');
    if (searchWidget) {
        searchWidget.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = searchWidget.querySelectorAll('input');
            const location = inputs[0].value;
            
            if (!location) {
                showToast('Please enter a destination to search.', false);
                return;
            }

            const btn = searchWidget.querySelector('button');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Searching...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                showToast(`Found 12 Packages for ${location}! Sending you down...`);
                document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        });
    }

    // 2. Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                showToast('Message sent! Our support team will email you within 24 hours.');
                btn.textContent = originalText;
                btn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }

    // 3. Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const btn = newsletterForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Subscribing...';
            btn.disabled = true;

            setTimeout(() => {
                showToast('Successfully subscribed! Exciting travel deals are coming your way.');
                btn.textContent = originalText;
                btn.disabled = false;
                input.value = '';
            }, 1200);
        });
    }
});