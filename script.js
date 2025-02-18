document.addEventListener('DOMContentLoaded', function(){
    let warning = document.getElementById('warning');
    let warning1 = document.getElementById('warning1');
    let warning2 = document.getElementById('warning2')
    let checar = document.getElementById('checar');
    let academi = document.getElementById('opi');
   
    function updateTime() {
        
        const now = new Date();

        let hour = now.getHours();
        let minutes = now.getMinutes();
        let segundos = now.getSeconds();

        hour = hour < 10 ? "0" + hour : hour;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        segundos = segundos < 10 ? "0" + segundos : segundos;
        document.getElementById("hour").textContent = hour + ":" + minutes + ":" + segundos;
    }
    setInterval(updateTime, 1000);
    updateTime();
   
    checar.onclick = function check(){
     const now = new Date();   
     let hora = now.getHours();
     const opit = academi.value;
     if (hora > 22 || hora < 6){
        warning2.style.display = 'flex';
     }   
     else{
        if (hora > 12 && hora <= 21 &&  opit === 'SmartFit'){
                warning.style.display = 'flex'
        }else if ((hora <= 12 || hora > 21) && opit === 'SmartFit'){
                warning1.style.display = 'flex'
        } else if (hora > 12 && hora <= 21 && opit === 'Xprime') {
                warning.style.display = 'flex';
        } else if ((hora <= 12 || hora > 21) && opit === 'Xprime') {
                warning1.style.display = 'flex';
        }
         } 
                }   

    academi.addEventListener('change', function() {

        warning.style.display = 'none';
        warning1.style.display = 'none';
        warning2.style.display = 'none';
    });
    })
    
    document.addEventListener('DOMContentLoaded', function() {

        document.getElementById('signUpForm').onsubmit = function(e) {  
            e.preventDefault();
            const username = document.getElementById('signupUsername').value;
            const password = document.getElementById('signupPassword').value;
    
            if (localStorage.getItem(username)) {
                alert("User already exists!");
                return;
            }
            const user = { username, password };
            localStorage.setItem(username, JSON.stringify(user));
    
            alert('Signup successful!');
            window.location.href = 'login.html'; 
        };
    
        document.getElementById('loginForm').onsubmit = function(e) {  
            e.preventDefault();
     
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
    
            const storedUser = localStorage.getItem(username);
    
            if (!storedUser) {
                alert('No user found with that username!');
                return;
            }

            const parsedUser = JSON.parse(storedUser);

            if (parsedUser.password === password) {
                alert('Login successful!');
                localStorage.setItem('loggedInUser', username);
                window.location.href = 'index.html';  
                
            } else {
                alert('Incorrect password!');
            }
        };
    });

    document.addEventListener('DOMContentLoaded', function() {

        document.getElementById('loginForm').onsubmit = function(e) {  
            e.preventDefault();
    
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
    
            const storedUser = localStorage.getItem(username);
    
            if (!storedUser) {
                alert('No user found with that username!');
                return;
            }
     
            const parsedUser = JSON.parse(storedUser);

            if (parsedUser.password === password) {
                alert('Login successful!');
                
                localStorage.setItem('loggedInUser', username);
    
                window.location.href = 'index.html'; 
            } else {
                alert('Incorrect password!');
            }
        };
    });
    
   
    
    
    document.addEventListener('DOMContentLoaded', function() {
       
        const loggedInUser = localStorage.getItem('loggedInUser');
    
        if (loggedInUser) {
            const welcome = document.getElementById('Welcome');
            welcome.textContent = `Bem vindo ${loggedInUser}`; 
        } 
    });