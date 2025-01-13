const navlogo = document.getElementById('navAnchor');

const profileImg = document.getElementById('profilePic');
const usernameEl = document.querySelectorAll('.username'); // Zmieniamy na querySelectorAll, żeby chwycić wszystkie elementy z klasą "username"
const email = document.getElementById('e-mail'); 
const password = document.getElementById('password');

const profiletype = localStorage.getItem('profileType');

if (profiletype === 'user') {
    navlogo.href = 'dashboard-user.html'; 

    usernameEl.forEach(element => {
        element.innerText = 'user01';
    });
    profileImg.src = "../images/client1.jpg";
    email.innerText = 'user01@mail.com';
    password.innerText = 'qwerty123';

} else if (profiletype === 'shelter') {
    navlogo.href = 'dashboard-shelter.html';
    
    usernameEl.forEach(element => {
        element.innerText = 'shelter01';
    });
    profileImg.src = "../images/shelter2.jpg";
    email.innerText = 'shelter01@mail.com';
    password.innerText = 'qwerty123567890';
}
