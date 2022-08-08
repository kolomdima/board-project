const defaultUrl = 'http://localhost:3000/cars';
function getResponse(url) {
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    });
}

  function filter(event) {
    let elements  = event.target.elements;
    let url = defaultUrl+'?';
    for (var i = 0, element; element = elements[i++];) {
        if (element.value !== ""){
          url = url + element.name + '='+element.value+'&';  
        }
            
    }
    url = url.substring(0, url.length -1);
    console.log(url);
    getResponse(url);
    
  }
  
  getResponse(defaultUrl);

  //http://localhost:3000/cars?category=tranport&color=red&priceFrom=100
  // 'http://localhost:3000/cars'