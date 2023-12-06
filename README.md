<h1 align="center">Ski Jumping Hub :ski:</h1>
<h4 align="center">This is a project designed to be a simple hub for ski jumping fans - informing about newest results and news from ski jumping world.</h4>

---

<p align="center">
  <a  href="#Design">Design</a> •
  <a href="#Tools and dependecies">Tools and dependecies</a> •
  <a href="#How to run it?">How to run it?</a> •
  <a href="#Sources">Sources</a>
</p>

---


## Design

#### How does it work?

Ski Jumping Hub is a web-app designed to bring different informations about ski-jumping events and news from various sites and put them together in a simple, responsive HUB.

| Frontend  | Backend ||
| :-------------: | :-------------: | :-------------------------- |
|[![My Skills](https://skillicons.dev/icons?i=js)](https://skillicons.dev)|[![My Skills](https://skillicons.dev/icons?i=python)](https://skillicons.dev)| My backend side of project is scraping data from various pages about ski jumping and JSON databases using BeautifulSoup library, then procceses it and sends through its FLASK endpoints. Then frontend side is catching this data using AJAX asynchronous requests and puts it into HTML page, with all the graphic style that Bootstrap provides and JS animations. |

#### Project files structure
```
│   API.py              // Backend API for handling 
│   funfacts.json       // Main page "funfacts" JSON database
│   hills.json          // Hills page JSON database
│   index.html          // Main page
│   package.json        // JEST configure JSON package
│   
│   
├───css
│       styles.css      // Custom CSS styles (mainly for animations and night-mode)
│
├───html
│       hills.html      // Hills page
│       results.html    // Results page
│
├───img                 // Pages illustrations and favicon
│       icon.png
│       SJHUB1.jpg
│       SJHUB2.jpg
│       SJHUB3.jpg
│       SJHUB4.jpg
│       SJHUB5.jpg
│       SJHUB6.jpg
│
├───js                  // JS scripts for webapp
│       scripts.js
├───tests               // scripts.js test class
       scripts.test.js
```

#### UML Diagrams

![component_diagram drawio](https://github.com/Onarix/Ski-Jumping-HUB/assets/84595060/cff4791b-4742-4ee4-8d18-5df9f6c185e4)

![adasdasd drawio (1)](https://github.com/Onarix/Ski-Jumping-HUB/assets/84595060/09d1dd89-16a7-4c94-97c3-44b1619db3dc)


## Tools and dependecies

| **Frontend Technologies**  | **Description**                                           |
| -------------------------   | --------------------------                                |
| HTML5                      | Structure and content for web application.           |
| CSS (Bootstrap)                        | Styling to create a visually appealing and user-friendly design. |
| JavaScript (JS)            | Dynamic functionality and real-time interactions.       |
| AJAX     | Asynchronous requests for data retrieval, improving the user experience. |
| JEST     | Testing script.js functions, to make sure they work alright. |

| **Backend Dependencies**  | **Description**                                           |
| -------------------------   | --------------------------                                |
| Mozilla WebAPI Session Storage | Storage and management of session-specific data on the client-side, ensuring a smooth user experience. |
| Beautful Soup (BS4) | Used to scrape important informations from other sources        |
| FLASK CORS | Webapp framework, used to send data between backend and frontend, with CORS extention to make cross-origin AJAX possible.      |

## How to run it?
To run the project, you need these components to be installed on your device:
* Python libraries:
    - FLASK
    - CORS
    - BS4 (BeautifulSoup)
    - requests
* Any web browser

To run the project, you have to download the source code from repo. Next step is to run the flask server locally, so the backend will be able to send information to web-app: 
```
// Type this command in project directory to start flask server locally:
python -m flask --app API run
```
Then, you just have to run the index.html file on your web browser (and make sure you have your JavaScript turned on!).

## Sources
Web sites I scraped informations from:
| **Content**  | **Page**                                           |
| -------------------------  | --------------------------                                |
| news and hills pictures |skijumping.pl|
| competitions results |fis-ski.com|
| news | news.google.com|
