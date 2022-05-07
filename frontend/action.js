function createSite(url,formData) {
    // const formData = new FormData();
    // formData.append('name', site.name);
    // formData.append('state', site.state);
    // formData.append('town', site.town);
    // formData.append('year', site.year);
    // formData.append('data1', site.data1);
    // formData.append('data2', site.data2);
    // formData.append('img1', site.img1);
    // formData.append('img2', site.img2);
    // formData.append('img3', site.img3);
    return fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => response.json())
}
function logSubmit(event) {
    event.preventDefault();
    let target   = event.target;
    let formData = {};

    for (let i = 0; i < target.length; i++) {
        formData[target.elements[i].getAttribute("name")] = target.elements[i].value;
    }
    createSite("http://localhost:3000/sites/",formData);
    
  }
  
  const form = document.getElementById('formId');
  form.addEventListener('submit', logSubmit);