
function create(event) {
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
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(elements),
    })
    return false;
}