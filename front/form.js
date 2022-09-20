
let id = '';
const toastLiveExample = document.getElementById('liveToast')
const toast = new bootstrap.Toast(toastLiveExample)
const toastLiveWrong = document.getElementById('wrongToast')
const wrongToast = new bootstrap.Toast(toastLiveWrong)

if(location.href.split('?id=').length > 1) {
    
    id  = location.href.split('?id=')[1];
    const defaultUrl = 'http://localhost:3000/cars?_id='+id;
    function getResponse(url) {
    fetch(url)
    .then((response) => {
        if (response.ok){
        return response.json();
        } else {
        throw new Error(response.statusText);
        }
    })
    .then((data) => {
        let submitForm   = document.forms['mainForm'];
        submitForm.elements.createbutton.innerText = 'Update';
        for (let i = 0; i < submitForm.elements.length; ++i) {
            submitForm.elements[i].value = data.data[0][submitForm.elements[i].name];
        }   
    });
    };
    getResponse(defaultUrl);
    
}
function create(event) {
    if(id == '') {
    let elements = {};
    // Array.from(event.target.elements).forEach(function(element){
    //     elements[element.name] = element.value
    // });
    let elementsData  = event.target.elements;
    for (var i = 0, element; element = elementsData[i++];) {
        if (element.type == 'number') {
            elements[element.name] = +element.value; 
        } else {
        elements[element.name] = element.value;     
        }    
    }
   
    fetch('http://localhost:3000/cars/add', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': window.localStorage.token
        },
        body: JSON.stringify(elements),
    }).then((response) => {
        if (response.ok){
            return response.json();
            } else {
            throw new Error(response.statusText);
            }
    }).then((data) => {
        window.location.href = window.location.href + '?id=' + data._id;
        toast.show();
        
    }).catch((error) => {
        wrongToast.show();
    });
    return false;
} else {
    let elements = {};
    // Array.from(event.target.elements).forEach(function(element){
    //     elements[element.name] = element.value
    // });
    let elementsData  = event.target.elements;
    for (var i = 0, element; element = elementsData[i++];) {
        if (element.type == 'number') {
            elements[element.name] = +element.value; 
        } else {
        elements[element.name] = element.value;     
        }    
    }
   
    fetch('http://localhost:3000/cars/put/'+id, {
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': window.localStorage.token
        },
        body: JSON.stringify(elements),
    }).then((response) => {
        if (response.ok){
        toast.show();
        } else {
            throw new Error(response.statusText);
        }
    }).catch((error) => {
        wrongToast.show();
    });
    return false;
}
}
