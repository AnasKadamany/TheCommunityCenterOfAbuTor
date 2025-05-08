/** login function : */

document.getElementById('login-box').addEventListener('submit',function(event){
    event.preventDefault();

    const username= document.getElementById('user-input').value;
    const password= document.getElementById('pass-input').value;

    const user="Abu Tur Center";
    const pass="CommCen@ATur";

    if(username == user && password == pass){
        window.location.href = 'dashboard.html';
    }
    else{
        alert('Login Failed! Username or Password is wrong.');
    }
});