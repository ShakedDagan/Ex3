
const getJSON = async url => {
    const response = await fetch(url);
    if(!response.ok) // check if response worked (no 404 errors etc...)
      throw new Error(response.statusText);
  
    const data = response.json(); // get JSON from the response
    return data; // returns a promise, which resolves to this data value
}
const buildData = (site)=>{
    document.getElementById("name").innerText = site.name;
    const stats = document.getElementById("stats");
    stats.value = "ארץ: " + site.state + "\n" + "עיר: " + site.town + "\n" + "תאריך בנייה: " + site.year;
    document.getElementById("text1").innerText = site.data1;
    document.getElementById("text2").innerText = site.data2;
    document.getElementById("img1").src = site.img1;
    document.getElementById("img2").src = site.img2;
    document.getElementById("img3").src = site.img3;
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const code = urlParams.get('site')
console.log(code)
getJSON("http://localhost:3000/sites/"+code).then(data => {
    buildData(data[0]);
}).catch(error => {
console.error(error);
});