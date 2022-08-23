let id = '';

if(location.href.split('?id=').length > 1) {
    
    id  = location.href.split('?id=')[1];
    const defaultUrl = 'http://localhost:3000/cars?_id='+id;
    function getResponse(url) {
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let dataColection   = document.querySelectorAll('table span');
        console.log(dataColection);
        for (let i = 0; i < dataColection.length; ++i) {
            dataColection[i].innerText = data[0][dataColection[i].id];
        };
        document.getElementById('createdAt').innerText = moment(data[0]['createdAt']).format('DD/MM/yy');    
        document.getElementById('story').innerText = data[0].story;
        document.getElementById('description').innerText = data[0].model + ' ' + data[0].year;
    });
    };
    getResponse(defaultUrl);
    
}