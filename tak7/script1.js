document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let isValid = true;

    
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'L\'adresse email n\'est pas valide.';
        isValid = false;
    }

    
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
        isValid = false;
    }

    if (isValid) {
        
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/dashboard'; 
            } else {
                alert('Erreur de connexion : ' + data.message);
            }
        })
        .catch(error => console.error('Erreur:', error));
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
