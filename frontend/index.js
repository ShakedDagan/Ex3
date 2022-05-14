
const getJSON = async url => {
    const response = await fetch(url);
    if(!response.ok) // check if response worked (no 404 errors etc...)
      throw new Error(response.statusText);
  
    const data = response.json(); // get JSON from the response
    return data; // returns a promise, which resolves to this data value
}
function createSite(url,site) {
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
function deleteSite(url,name) {
    const formData = new FormData();
    formData.append('name', name);

    return fetch(url, {
        method: 'DELETE',
        body: formData
    }).then(response => response.json())
}
const showSite = (parent,siteData)=>{
    const data = document.createElement("div");
        const buttonExit = document.createElement("button");
        buttonExit.innerText = "X";
        buttonExit.onclick = ()=>{
            if(confirm("Are you sure you want to delete this site?"))
                removeSite(data,siteData);
        }
        const name = document.createElement("a");
        name.href = "site.html?site="+siteData;
        name.innerText = siteData;
        data.append(buttonExit,name);
        parent.appendChild(data);
}

const removeSite = (element,siteData)=>{
    deleteSite("http://localhost:3000/sites/"+siteData);
    element.remove();
}

const buildData = (sites)=>{
    const header = document.createElement("div");
    sites.map((site)=>{
        showSite(header,site.name)
    })
    const addItem = document.createElement("div");
    //const addText = document.createElement("input");
    const buttonAdd = document.createElement("button");
    buttonAdd.innerText = "add";
    buttonAdd.onclick = ()=>{
        window.open('form.html','name','width=600,height=500')
        //showSite(header)
        // createSite("http://localhost:3000/sites",
        // {
        //     "name": "פטרה",
        // "state": "ירדן",
        // "town": "פטרה",
        // "year": "800 לפנה\"ס",
        // "data1": "עיר נבטית קדומה המפורסמת בארמונות הקבורה שלה החצובים באבן החול של הרי אדום, ומכאן שמה בעברית 'הסלע האדום'.\nפטרה שוכנת בדרום ירדן, כמאה קמ צפונית לאילת.\nהיא מכונה גם 'העיר הוורודה' בפי התושבים המקומיים בשל גוון המסלע.",
        // "data2": "פטרה מפורסמת כיום בזכות המבנים החצובים במורדות ההר שנשתמרו היטב עד ימינו.\nהידוע מכולם הוא קבר מלכותי מפואר בשם 'אוצר פרעה' (אלחזנה), שלצורך פיסולו הוזמנו אומנים מאלכסנדריה.\nגובהו 33.77 מטר ורוחבו 24.90 מטר, והוא נחצב מלמעלה כלפי מטה.\nאת הרווח שבין העמודים הצדדיים מפארים פסלי ענק של רוכבי סוסים.",
        // "img1":"http://localhost:3000/images/patara_1.jpg",
        // "img2":"http://localhost:3000/images/patara_2.jpg",
        // "img3":"http://localhost:3000/images/patara_3.jpg"
        // })
    }
    addItem.appendChild(buttonAdd);

    document.getElementById("root").append(addItem,header);
}

getJSON("http://localhost:3000/sites").then(data => {
    buildData(data);
}).catch(error => {
console.error(error);
});



