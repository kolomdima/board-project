let defaultUrl = 'http://localhost:3000/auth/login'
const toastLiveExample = document.getElementById('liveToast')
const toast = new bootstrap.Toast(toastLiveExample)

function sendLogin(event) {
    let elements  = event.target.elements;
    let logObject = {
        login:elements.login.value,
        password:elements.password.value};
    fetch(defaultUrl, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(logObject),
    }).then((response) => {
        if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
    }).then((data) => {
        if (data.size > 0) {
        console.log(data);
        window.localStorage.token = data.token;
        window.location.href = 'index.html';
        } else {
            throw new Error(response.statusText);
        }

        
        
    }).catch((error) => {
        toast.show();
    })

}