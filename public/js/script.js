document.getElementById('placementForm').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !email || !phone) {
        alert('All fields are required!');
        event.preventDefault(); // Prevent form submission
    } else {
        alert('Form is being submitted!');
    }
});
