window.onload = function() { handleLoad(); };

function handleLoad() {
    console.log("-------");
    console.log("page loaded");
    console.log("-------");

    document.getElementById("buttonLogin").addEventListener("click", checkLogin);

}

function checkLogin() {
    let username = document.getElementById("inputUsername").value;
    console.log("Username " + username);

    let password = document.getElementById("inputPassword").value;
    console.log("Password " + password);

    if (password != "" && username != "") {
        console.log("Login succesful");
        window.open("myBuddyPage.html", "_self");
    }
}