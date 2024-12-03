function load() {
  checkErrors();
}

async function checkErrors() {
  let errors = getCookie("readback");
  const waitForDOMContentLoaded = () => {
    return new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  };

  if (errors != undefined && errors.includes("error-")) {
    await waitForDOMContentLoaded();
    showPopup(decodeURIComponent(errors.replace("error-", "")), "error");
    deleteCookie("readback");
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function deleteCookie(name, path = "/", domain = "") {
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};`;

  if (domain) {
    cookieString += ` domain=${domain};`;
  }

  document.cookie = cookieString;
}


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