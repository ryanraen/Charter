function submitForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    // Send data to the backend
    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email })
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the backend
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}