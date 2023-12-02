// Send request to API for links to competitions results
function getResults() {
    const url='http://127.0.0.1:5000/results/';
    fetch(url)
    .then(response => response.json())  
    .then(data => {
        const json_links = data;
        console.log(json_links);
        
        let table = document.getElementById("results-table");

        for (let k in json_links) {
            let row = table.insertRow(-1);

            let c1 = row.insertCell(0);
            let c2 = row.insertCell(1);

            // Link to competition results
            var hyperlink = document.createElement("td");
            hyperlink.setAttribute("class", "btn");
            hyperlink.setAttribute("onclick", "location.href='" + k + "'");
            hyperlink.textContent = json_links[k][0];
            
            c1.appendChild(hyperlink);
            c2.innerText = json_links[k][1];
            
        }
    })
    .catch(error => {
        // TypeError: failed to fetch
        console.error('Error:', error);
        let table = document.getElementById("table-data");
        let errorAlert = document.createElement("div");
        errorAlert.className = "alert alert-danger";
        errorAlert.role = "alert";
        errorAlert.textContent = "ERROR: Failed to fetch data from internal server";
        table.appendChild(errorAlert);
    })
}

// Send request to API for google news
function getNews() {
    const url='http://127.0.0.1:5000/news/';
    fetch(url)
    .then(response => response.json())  
    .then(data => {
        const json_news = data;
        console.log(json_news);

        // json_news[key][0] - news title
        // json_news[key][1] - publish date
        // json_news[key][2] - news image

        let newsMenu = document.getElementById("menu");
        
        for(let k in json_news) {
            let newsCol = document.createElement("div");
            newsCol.className = "col";
            newsCol.id = "news";

            let newsCard = document.createElement("div");
            newsCard.className = "card";

            let newsLink = document.createElement("a");
            newsLink.href = k;

            let newsImg = document.createElement("img");
            newsImg.className = "card-img-top";
            newsImg.src = json_news[k][2];
            newsImg.alt = "Card image cap";

            newsLink.appendChild(newsImg);
            newsCard.appendChild(newsLink);

            let cardBody = document.createElement("div");
            cardBody.className = "card-body";
            
            let newsTitle = document.createElement("h5");
            newsTitle.className = "card-title";
            newsTitle.textContent = json_news[k][0];
            cardBody.appendChild(newsTitle);

            let newsDate = document.createElement("p");
            newsDate.className = "card-text";
            let smallText = document.createElement("small");
            smallText.className = "text-muted";
            smallText.textContent = json_news[k][1];
            newsDate.appendChild(smallText);
            cardBody.appendChild(newsDate);

            newsCard.appendChild(cardBody);
            
            newsCol.appendChild(newsCard);

            newsMenu.appendChild(newsCol);
        }
    })
    .catch(error => {
        // TypeError: failed to fetch
        console.error('Error:', error);
        let table = document.getElementById("menu");
        let errorAlert = document.createElement("div");
        errorAlert.className = "alert alert-danger";
        errorAlert.role = "alert";
        errorAlert.id = "error-alert";
        errorAlert.textContent = "ERROR: Failed to fetch data from internal server";
        table.appendChild(errorAlert);
    })
}

// delete news on sidebar close to prevent stacking them
function deleteNews() {
    let newsMenu = document.getElementById("menu");
    let newsCount = newsMenu.getElementsByClassName("col").length;

    let alert = document.getElementById("error-alert");
    if(alert != null)
        alert.remove();

    for(let i = 0; i < newsCount; i++) {
        let news = document.getElementById("news");
        news.remove();
    }
}