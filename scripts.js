document.querySelector('form').addEventListener('submit', function(event) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Harap isi semua bidang.');
        event.preventDefault();
    }
});
