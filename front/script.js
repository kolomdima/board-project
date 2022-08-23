const toastLiveExample = document.getElementById('liveToast')
const toast = new bootstrap.Toast(toastLiveExample)
const defaultUrl = 'http://localhost:3000/cars';
function getResponse(url) {
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // console.log(data);
        document.getElementById('cards').innerHTML = '';
        data.forEach(element => {
          document.getElementById('cards').innerHTML += (`
          
          <div class="card" id="card-${element._id}">
          <div class="buttons">
              <button class="btn btn-danger" onclick="deleteCar(event, '${element._id}'); event.preventDefault()">Delete</button>
              <button   class="btn btn-warning" onclick="location.href = 'form.html?id=${element._id}', fillCars(event)">Change</button>
          </div>
          
          <a href="card.html?id=${element._id}">
          <img src="car1.png" class="card-img-top car">
          </a>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${element.model} | ${element.condition}</li>
              <li class="list-group-item">${element.country} - ${moment(element.createdAt).format('DD/MM/yy')}</li>
              <li class="list-group-item">${element.year} - ${element.miliage} km</li>
              <li class="list-group-item">${element.price} zl</li> 
            </ul>
          </div>
      </div>`)
        });
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

function deleteCar(event, id) {
  if(!confirm("Are you sure you want to delete?")) {
    return;
  };
  let elements = {};
  fetch('http://localhost:3000/cars/delete/' + id,  {
    method: 'DELETE',
  }).then(() => {
    document.getElementById('card-' + id).remove();
    toast.show();
  });
    
}

 