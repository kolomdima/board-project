const toastLiveExample = document.getElementById('liveToast')
const toast = new bootstrap.Toast(toastLiveExample)
const toastLiveWrong = document.getElementById('wrongToast')
const wrongToast = new bootstrap.Toast(toastLiveWrong)
const defaultUrl = 'http://localhost:3000/cars';
let filtrUrl = defaultUrl;
let currentSortingKey = {
  name:'createdAt',
  order:-1
}
const sortingKeys = {
  priceAZ:{
    name:'price',
    order:1
  },
  priceZA:{
    name:'price',
    order:-1
  },
  yearAZ:{
    name:'year',
    order:1
  },
  yearZA:{
    name:'year',
    order:-1
  },
  milliageAZ:{
    name:'miliage',
    order:1
  },
  milliageZA:{
    name:'miliage',
    order:-1
  }
}
function getResponse(url) {
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let hiddenClass = 'hidden';
        if (localStorage.token) {
          hiddenClass = '';
        }
        
        document.getElementById('cards').innerHTML = '';
        data.data.forEach(element => {
          document.getElementById('cards').innerHTML += (`
          
          <div class="card" id="card-${element._id}">
          <div class="buttons ${hiddenClass}">
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
        let lim = Math.ceil(data.size / 8);
        let liElements = '';
          for (let i=1; i<=lim; i++) {
            liElements += `<li class="page-item"><a class="page-link" onclick="paginationFiltr(${i})">${i}</a></li>`;
          }
        document.getElementById('paginator').innerHTML = (`<nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          ${liElements}
          </ul>        
        </nav> `);
    });
    // console.log(document.getElementsByClassName('buttons'));
    // if (!localStorage.token) {
    // [...document.getElementsByClassName('buttons')].forEach((element)=> {
    //   element.classList.add('hidden');
    // });
    // } else {
    //   [...document.getElementsByClassName('buttons')].forEach((element)=> {
    //     element.classList.remove('hidden');
    //   });
    // }
    if (!localStorage.token) {
      document.getElementsByClassName('add-car')[0].classList.add('hidden');   
      document.getElementsByClassName('logout')[0].classList.add('hidden');
    } else {
      document.getElementsByClassName('add-car')[0].classList.remove('hidden');
      document.getElementsByClassName('login')[0].innerHTML = 'default@email.com'; 
      document.getElementsByClassName('logout')[0].classList.remove('hidden');
      
    }
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
    filtrUrl = url;
    currentSortingKey = {
      name:'createdAt',
      order:-1
    }
    getResponse(url);
    
  }

  function paginationFiltr (page) {
    let url = '';
    if (filtrUrl.indexOf('?') > -1) {
      url = filtrUrl + '&page=' + page;
    } else {
      url = filtrUrl + '?page=' + page;
    }
    url += '&sortBy=' + currentSortingKey.name + '&order=' + currentSortingKey.order;
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
    headers: {token:window.localStorage.token}
  }).then((response) => {
    if (response.ok){
    document.getElementById('card-' + id).remove();
    toast.show();
    } else {
      throw new Error(response.statusText);
    }
  }).catch((error) => {
    wrongToast.show();
});
    
}

function sortCars(event) {
  
  let url = '';
  if (filtrUrl.indexOf('?') > -1) {
    url = filtrUrl + '&sortBy=' + sortingKeys[event.target.value].name + '&order=' + sortingKeys[event.target.value].order;
  } else {
    url = filtrUrl + '?sortBy=' + sortingKeys[event.target.value].name + '&order=' + sortingKeys[event.target.value].order;
  };
  currentSortingKey = sortingKeys[event.target.value];
  getResponse(url);
}

function logout() {
  localStorage.removeItem('token');
  
  window.location.href = 'index.html';
}

 