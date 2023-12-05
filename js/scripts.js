//  UTILITES
class Utils {
  constructor() {}

  static size_dict(d) {
    let c = 0;
    for (let {} in d) ++c;
    return c;
  }

  static delay(func, ms) {
    console.log("sleep");
    setTimeout(() => {
      func();
    }, ms);
  }

  // dark/light mode toggle
  static mode_toggle() {
    if (document.documentElement.getAttribute("data-bs-theme") == "dark") {
      document.documentElement.setAttribute("data-bs-theme", "light");
      let navbar = document.getElementsByClassName(
        "navbar navbar-expand-lg navbar-night bg-night"
      );
      navbar[0].className = "navbar navbar-expand-lg navbar-light bg-light";
      sessionStorage.setItem("darkMode", "OFF");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      let navbar = document.getElementsByClassName(
        "navbar navbar-expand-lg navbar-light bg-light"
      );
      navbar[0].className = "navbar navbar-expand-lg navbar-night bg-night";
      sessionStorage.setItem("darkMode", "ON");
    }
  }

  // check sessionStorage to determine current color mode
  static mode_check() {
    if (sessionStorage.getItem("darkMode") == "ON") {
      this.mode_toggle();
      document.getElementById("flexSwitchCheckDefault").checked = true;
    }
  }

  // delete news on sidebar close to prevent stacking them
  static deleteNews() {
    let newsMenu = document.getElementById("menu");
    let newsCount = newsMenu.getElementsByClassName("col").length;

    let alert = document.getElementById("error-alert");
    if (alert != null) alert.remove();

    for (let i = 0; i < newsCount; i++) {
      let news = document.getElementById("news");
      news.remove();
    }
  }
}

//  REQUESTS
class RequestFactory {
  constructor() {}
  // Send request to API for links to competitions results
  static getResults() {
    const url = "http://127.0.0.1:5000/results/";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
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
      .catch((error) => {
        // TypeError: failed to fetch
        console.error("Error:", error);
        let table = document.getElementById("table-data");
        let errorAlert = document.createElement("div");
        errorAlert.className = "alert alert-danger";
        errorAlert.role = "alert";
        errorAlert.textContent =
          "ERROR: Failed to fetch data from internal server";
        table.appendChild(errorAlert);
      });
  }

  // Send request to API for google news
  static getNews() {
    const url = "http://127.0.0.1:5000/news/";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const json_news = data;
        console.log(json_news);

        // json_news[key][0] - news title
        // json_news[key][1] - publish date
        // json_news[key][2] - news image

        let newsMenu = document.getElementById("menu");

        for (let k in json_news) {
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
      .catch((error) => {
        // TypeError: failed to fetch
        console.error("Error:", error);
        let table = document.getElementById("menu");
        let errorAlert = document.createElement("div");
        errorAlert.className = "alert alert-danger";
        errorAlert.role = "alert";
        errorAlert.id = "error-alert";
        errorAlert.textContent =
          "ERROR: Failed to fetch data from internal server";
        table.appendChild(errorAlert);
      });
  }

  // get Funfacts from JSON file
  static getFunfacts() {
    const url = "http://127.0.0.1:5000/funfacts/";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const json_funfacts = data;
        let mainContent = document.getElementById("main-content");
        let funfact = document.createElement("div");
        let funfactTitle = document.createElement("h4");
        funfactTitle.className = "funfact";
        funfactTitle.textContent = "Did you know?";
        funfact.appendChild(funfactTitle);
        let funfactContent = document.createElement("h6");
        funfactContent.className = "text-muted funfact";
        funfactContent.id = "Funfact";
        funfactContent.textContent =
          json_funfacts[
            Math.floor(Math.random() * Utils.size_dict(json_funfacts))
          ];
        funfact.appendChild(funfactContent);
        mainContent.appendChild(funfact);
      })
      .catch((error) => {
        // TypeError: failed to fetch
        console.error("Error:", error);
        let mainContent = document.getElementById("main-content");
        let errorAlert = document.createElement("div");
        errorAlert.className = "alert alert-danger";
        errorAlert.role = "alert";
        errorAlert.id = "error-alert";
        errorAlert.textContent =
          "ERROR: Failed to fetch data from internal server";
        mainContent.appendChild(errorAlert);
      });
  }

  // get Hills from JSON file
  static getHills() {
    const url = "http://127.0.0.1:5000/hills/";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const json_hills = data;
        for (let k in json_hills) {
          let accordion = document.getElementById("accordion");
          let card = document.createElement("div");
          card.className = "card";
          let cardHeader = document.createElement("div");
          cardHeader.className = "card-header";
          cardHeader.id = "heading" + k;
          let cardHeaderContent = document.createElement("h5");
          cardHeaderContent.className = "mb-0";
          let cardHeaderButton = document.createElement("button");
          cardHeaderButton.className = "btn";
          cardHeaderButton.setAttribute("data-bs-toggle", "collapse");
          cardHeaderButton.setAttribute("data-bs-target", "#collapse" + k);
          cardHeaderButton.setAttribute("aria-expanded", "true");
          cardHeaderButton.setAttribute("aria-controls", "collapse" + k);
          cardHeaderButton.textContent = json_hills[k]["name"];
          cardHeaderContent.appendChild(cardHeaderButton);
          cardHeader.appendChild(cardHeaderContent);
          card.appendChild(cardHeader);

          let cardOuter = document.createElement("div");
          cardOuter.id = "collapse" + k;
          if (parseInt(k) + 1 == Utils.size_dict(json_hills))
            cardOuter.className = "collapse show";
          else cardOuter.className = "collapse";
          cardOuter.setAttribute("aria-labelledby", "heading" + k);
          cardOuter.setAttribute("data-bs-parent", "#accordion");
          let cardBody = document.createElement("div");
          cardBody.className = "card-body";
          let cardImg = document.createElement("img");
          cardImg.src = json_hills[k]["img"];
          cardImg.alt = json_hills[k]["name"];
          cardImg.className = "img-fluid";
          cardBody.appendChild(cardImg);
          let cardRow = document.createElement("div");
          cardRow.className = "row";
          let cardCol_1 = document.createElement("div");
          cardCol_1.className = "col";

          // record
          let record = document.createElement("div");
          record.className = "record";
          let recordLabel = document.createElement("b");
          recordLabel.textContent = "Hill record: ";
          let recordValue = document.createElement("span");
          recordValue.textContent = json_hills[k]["record"];
          record.appendChild(recordLabel);
          record.appendChild(recordValue);
          cardCol_1.appendChild(record);
          // HS point
          let hs = document.createElement("div");
          hs.className = "hs";
          let hsLabel = document.createElement("b");
          hsLabel.textContent = "HS point: ";
          let hsValue = document.createElement("span");
          hsValue.textContent = json_hills[k]["hs"];
          hs.appendChild(hsLabel);
          hs.appendChild(hsValue);
          cardCol_1.appendChild(hs);
          // Construction year
          let constrYear = document.createElement("div");
          constrYear.className = "construction-year";
          let constrYearLabel = document.createElement("b");
          constrYearLabel.textContent = "Construction year: ";
          let constrYearValue = document.createElement("span");
          constrYearValue.textContent = json_hills[k]["construction_year"];
          constrYear.appendChild(constrYearLabel);
          constrYear.appendChild(constrYearValue);
          cardCol_1.appendChild(constrYear);
          // Table angle
          let tableAngle = document.createElement("div");
          tableAngle.className = "table-angle";
          let tableAngleLabel = document.createElement("b");
          tableAngleLabel.textContent = "Table angle: ";
          let tableAngleValue = document.createElement("span");
          tableAngleValue.textContent = json_hills[k]["table_angle"];
          tableAngle.appendChild(tableAngleLabel);
          tableAngle.appendChild(tableAngleValue);
          cardCol_1.appendChild(tableAngle);
          // Inrun length
          let inrunLength = document.createElement("div");
          inrunLength.className = "inrun-length";
          let inrunLengthLabel = document.createElement("b");
          inrunLengthLabel.textContent = "Inrun length: ";
          let inrunLengthValue = document.createElement("span");
          inrunLengthValue.textContent = json_hills[k]["inrun_length"];
          inrunLength.appendChild(inrunLengthLabel);
          inrunLength.appendChild(inrunLengthValue);
          cardCol_1.appendChild(inrunLength);
          // Average speed
          let avgSpeed = document.createElement("div");
          avgSpeed.className = "average-spd";
          let avgSpeedLabel = document.createElement("b");
          avgSpeedLabel.textContent = "Average speed: ";
          let avgSpeedValue = document.createElement("span");
          avgSpeedValue.textContent = json_hills[k]["average_spd"];
          avgSpeed.appendChild(avgSpeedLabel);
          avgSpeed.appendChild(avgSpeedValue);
          cardCol_1.appendChild(avgSpeed);
          cardRow.appendChild(cardCol_1);

          let cardCol_2 = document.createElement("div");
          cardCol_2.className = "col";

          // Town
          let town = document.createElement("div");
          town.className = "town";
          let townLabel = document.createElement("b");
          townLabel.textContent = "Town: ";
          let townValue = document.createElement("span");
          townValue.textContent = json_hills[k]["town"];
          town.appendChild(townLabel);
          town.appendChild(townValue);
          cardCol_2.appendChild(town);
          // K-point
          let K = document.createElement("div");
          K.className = "K";
          let KLabel = document.createElement("b");
          KLabel.textContent = "K-point:";
          let KValue = document.createElement("span");
          KValue.textContent = json_hills[k]["K"];
          K.appendChild(KLabel);
          K.appendChild(KValue);
          cardCol_2.appendChild(K);
          // Hills in town
          let hillsTown = document.createElement("div");
          hillsTown.className = "hills-in-town";
          let hillsTownLabel = document.createElement("b");
          hillsTownLabel.textContent = "Hills in town: ";
          let hillsTownValue = document.createElement("span");
          hillsTownValue.textContent = json_hills[k]["hills_in_town"];
          hillsTown.appendChild(hillsTownLabel);
          hillsTown.appendChild(hillsTownValue);
          cardCol_2.appendChild(hillsTown);
          // Table height
          let tableHeight = document.createElement("div");
          tableHeight.className = "table-height";
          let tableHeightLabel = document.createElement("b");
          tableHeightLabel.textContent = "Table height: ";
          let tableHeightValue = document.createElement("span");
          tableHeightValue.textContent = json_hills[k]["table_height"];
          tableHeight.appendChild(tableHeightLabel);
          tableHeight.appendChild(tableHeightValue);
          cardCol_2.appendChild(tableHeight);
          // Landing area angle
          let landingArea = document.createElement("div");
          landingArea.className = "landing-area-angle";
          let landingAreaLabel = document.createElement("b");
          landingAreaLabel.textContent = "Landing area angle: ";
          let landingAreaValue = document.createElement("span");
          landingAreaValue.textContent = json_hills[k]["landing_area_angle"];
          landingArea.appendChild(landingAreaLabel);
          landingArea.appendChild(landingAreaValue);
          cardCol_2.appendChild(landingArea);
          // Stadion capacity
          let stadionCap = document.createElement("div");
          stadionCap.className = "stadion-capacity";
          let stadionCapLabel = document.createElement("b");
          stadionCapLabel.textContent = "Stadion capacity: ";
          let stadionCapValue = document.createElement("span");
          stadionCapValue.textContent = json_hills[k]["stadion_capacity"];
          stadionCap.appendChild(stadionCapLabel);
          stadionCap.appendChild(stadionCapValue);
          cardCol_2.appendChild(stadionCap);
          cardRow.appendChild(cardCol_2);

          cardBody.appendChild(cardRow);
          cardOuter.appendChild(cardBody);
          card.appendChild(cardOuter);
          accordion.appendChild(card);
        }
      })
      .catch((error) => {
        // TypeError: failed to fetch
        console.error("Error:", error);
        let mainContent = document.getElementById("accordion");
        let errorAlert = document.createElement("div");
        errorAlert.className = "alert alert-danger";
        errorAlert.role = "alert";
        errorAlert.id = "error-alert";
        errorAlert.textContent =
          "ERROR: Failed to fetch data from internal server";
        mainContent.appendChild(errorAlert);
      });
  }
}

// PAGE ANIMATIONS
class Animations {
  constructor() {}
  static funfactEmerge() {
    const title = document.querySelector(".funfact");
    const funfact = document.querySelector(".text-muted.funfact");
    title.classList.add("emerge");
    setTimeout(() => {
      funfact.classList.add("emerge");
    }, 1000);
  }
}
