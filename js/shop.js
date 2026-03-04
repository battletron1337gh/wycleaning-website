// Shop page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // Additional shop functionality if needed
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message (in real implementation, send to server)
            alert('Bedankt voor je inschrijving! Je ontvangt binnenkort onze nieuwsbrief.');
            this.reset();
        });
    }
});