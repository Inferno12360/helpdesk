/**
 *
 *
 * @param {string} url
 * @param {string} containerId
 */
function loadTemplate(url, containerId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById(containerId);
            const container2 = document.createElement("div");
            container2.innerHTML = data;
            container.insertBefore(container2, container.firstChild)

        })
        .catch(error => console.error('Error loading the template:', error));
}

function load() {
    let nav = loadTemplate("./template/navbar.html", "nav");
    let footer = loadTemplate("./template/footer.html", "footer");
}