
// Make an API request to fetch the GitHub repositories
const xhr = new XMLHttpRequest();
const url = `https://api.github.com/users/${"afshanbhutto"}/repos?per_page=999`;
xhr.open("GET", url, true);

xhr.onload = function () {
  const data = JSON.parse(this.response);

  // Specify the project names you want to display
  const selectedProjects = [
    "CRC-Generator",
    "FoodieGo",
    "Weather-App",
    "Todo-app-with-Login-Logout-functionality",
    "Real-Estate-Website",
    "Your-online-Expense-Chart",
    "Github-Filter-List",
    "FilesDragDropTask",
    "Air-Quality-Index-Analysis-using-Machine-Learning",
    "Color-Identification-In-Images-For-Monochromacy",
    "React--AddUsers-App",
    "Toggle-Theme",
    "DocumentationPage",
  ];

  // Filter the data to get only the selected projects
  const filteredData = data.filter((repo) =>
    selectedProjects.includes(repo.name)
  );

  // Sort filteredData based on the order in selectedProjects
  filteredData.sort((a, b) => {
    return selectedProjects.indexOf(a.name) - selectedProjects.indexOf(b.name);
  });

  // Display the projects in the correct order
  for (let i in filteredData) {
    let ul = document.getElementById("userRepos");
    ul.classList.add("list-inline");
    let li = document.createElement("li");
    li.classList.add("list-inline-item");

    li.innerHTML = `
        <li class="col-sm-0 card" style="margin-top:25px; padding:20px; width:250px; height:300px">
          <div class="scrollable-content" style="overflow-y: auto; height: 100%;">
            <p><strong>Project:</strong> <a href="${filteredData[i].html_url}" target="_blank"><h4>${filteredData[i].name}</h4></a></p>
            <p><strong>Description:</strong> ${filteredData[i].description}</p>
            <p><strong>Languages:</strong> <span id="lang-${i}">Loading...</span></p>
          </div>
        </li>
      `;
    ul.appendChild(li);
    // Fetch languages for each repository
    fetchLanguages(filteredData[i], i);
  }
};
xhr.send();

// Function to fetch languages used in each repository
function fetchLanguages(repo, index) {
  const langUrl = repo.languages_url;
  fetch(langUrl)
    .then((response) => response.json())
    .then((languages) => {
      let langList = Object.keys(languages).join(", ");
      if (!langList) langList = "No languages detected";
      document.getElementById(`lang-${index}`).textContent = langList;
    })
    .catch((error) => {
      console.log("Error fetching languages:", error);
      document.getElementById(`lang-${index}`).textContent =
        "Error fetching languages";
    });
}

window.addEventListener("scroll", function () {
  var scroll = document.querySelector(".scrollTop");
  scroll.classList.toggle("active", window.scrollY > 500);
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
