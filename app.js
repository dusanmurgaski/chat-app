import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

// DOM
let ulChatList = document.querySelector("ul");
let sbmitUsername = document.querySelector("#formUsername");
let usernameInput = document.querySelector("#inputUsername");
let sbmit = document.querySelector("#formMessage");
let poruka = document.querySelector("#inputMessage");
let navRooms = document.querySelector("nav");
let promenaBojeInput = document.querySelector("#promenaBojeInput");
let promenaBojeDugme = document.querySelector("#promenaBojeDugme");

// Citamo iz lokalne memorije informacije o usernameu ukoliko postoji
let room = () => {
  if (localStorage.room) {
    return localStorage.room;
  } else {
    return "general";
  }
};
function username() {
  if (localStorage.username) {
    return localStorage.username;
  } else {
    return "anonymus";
  }
}
function color() {
  if (localStorage.boja) {
    return localStorage.room;
  } else {
    return "white";
  }
}

// Kreiramo objekat klase Chatroom
let chatroom2 = new Chatroom(room(), username(), color());
// Kreiranje objekta klase ChatUI za prikaz elemenata na stranici
let chatUI1 = new ChatUI(ulChatList);

// Kada se ucitava prvi put stranica ispisujemo cetove na njoj
chatroom2.getChats((data) => {
  chatUI1.templateLI(data);
});

// Kada se klikne dugme promeni ime
sbmitUsername.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = usernameInput.value;
  let nameLength = name.length;
  if (nameLength < 2 || nameLength > 10 || !name.replace(/\s/g, "").length) {
    alert("Lose unet username");
  } else {
    chatroom2.updateUsername(name);
    sbmitUsername.reset();
    let pUsername = document.createElement("p");
    pUsername.style.fontSize = "20px";
    pUsername.textContent = `Odabrani username je: ${name}`;
    triSek.appendChild(pUsername);
    document.getElementById("triSek").className += " hidden";
    setTimeout(function () {
      let deleting = document.getElementById("triSek");
      deleting.parentNode.removeChild(deleting);
    }, 3000);
  }
});

// kada se pritisne poslati poruku polsati poruku

sbmit.addEventListener("submit", (e) => {
  e.preventDefault();
  let por = poruka.value;
  if (!por.replace(/\s/g, "").length) {
    alert("prazna poruka");
  } else {
    chatroom2
      .addChat(por)
      .then(() => sbmit.reset())
      .catch((error) => console.log(error));
  }
});

// Promena sobe
navRooms.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    //1. izbrisati sve poruke sa ekrana
    chatUI1.clearUl();
    //2. Pozvati promenu sobe
  }
  chatroom2.updateRoom(e.target.id);
  //3. Prikazati cetove
  chatroom2.getChats((data) => {
    chatUI1.templateLI(data);
  });
  localStorage.setItem("room", e.target.id);
});

ulChatList.addEventListener("click", (e) => {
  if (e.target.tagName == "I") {
    let porukaZaBrisanje = e.target.getAttribute("name");
    let ul = e.target.parentElement.parentElement.parentElement;
    let li = e.target.parentElement.parentElement;
    ul.removeChild(li);
    db.collection("chats")
      .where("message", "==", porukaZaBrisanje)
      .where("username", "==", `${username()}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((data) => {
          db.collection("chats").doc(`${data.id}`).delete();
        });
      })
      .catch((err) => console.log(err));
  }
});

promenaBojeDugme.addEventListener("click", (e) => {
  e.preventDefault();
  setTimeout(function () {
    document.body.style.background = promenaBojeInput.value;
  }, 1000);

  console.log(promenaBojeInput);
});
