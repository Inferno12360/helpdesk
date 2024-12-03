/**
 * @param {string} message
 * @param {"success"|"error"}  type
 */
function showPopup(message, type) {
  const popup = document.createElement("div");
  popup.id = "popup";
  const body = document.getElementsByTagName("body")[0];
  body.appendChild(popup);

  popup.textContent = message;
  popup.className = "";
  popup.classList.add(type);
  popup.style.display = "block";
  popup.style.opacity = "1";
  popup.style.transform = "translateY(0)";

  setTimeout(() => {
    popup.style.opacity = "0";
    popup.style.transform = "translateY(-20px)";
  }, 5000);

  setTimeout(() => {
    popup.style.display = "none";
    body.removeChild(document.getElementById("popup"));
  }, 6000);
}


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

checkSession();
function checkSession() {

  const session = getCookie("sessionid");
  if (session == undefined) {
    window.location.href = "/helpdesk/Page/index.html";
  }

  const decodedData = new TextDecoder().decode(Uint8Array.from(atob(decodeURIComponent(session)), c => c.charCodeAt(0)));
  if (!decodedData.includes("Mitarbeiter")) {
    window.location.href = "/helpdesk/Page/index.html";
  }


}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function postAsync(url, data) {
  return new Promise((resolve, reject) => {
    $.post(url, data, function (response) {
      resolve(response['data']);
    }).fail(function (error) {
      reject(error);
    });
  });
}