const logoForm = document.getElementById('logoForm');
const logo = document.getElementById('logo');

logoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Retrieve user input and send it to the server to generate the SVG
    const formData = new FormData(logoForm);
    const response = await fetch('/generate-logo', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const svgContent = await response.text();
        logo.innerHTML = svgContent;
    } else {
        console.error('Error generating the logo:', response.status, response.statusText);
    }
});