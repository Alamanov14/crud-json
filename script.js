const API = "http://localhost:3000/data";

let inpName = document.querySelector("#name");
let inpSurname = document.querySelector("#surName");
let inpPhoto = document.querySelector("#photo");
let inpNumber = document.querySelector("#number");
let inpEmail = document.querySelector("#email");
let btnSave = document.querySelector("#btn-save");
let userDataList = document.querySelector("#list");
console.log(userDataList);

let dataObj = {};
inpName.addEventListener("input", (e) => {
  dataObj.inpName = e.target.value;
});
inpSurname.addEventListener("input", (e) => {
  dataObj.inpSurname = e.target.value;
});
inpPhoto.addEventListener("input", (e) => {
  dataObj.inpPhoto = e.target.value;
});
inpNumber.addEventListener("input", (e) => {
  dataObj.inpNumber = e.target.value;
});
inpEmail.addEventListener("input", (e) => {
  dataObj.inpEmail = e.target.value;
});

async function addData() {
  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(dataObj),
    });
  } catch (error) {
    console.log(error);
  }
  inpName.value = "";
  inpNumber.value = "";
  inpEmail.value = "";
  inpPhoto.value = "";
  inpSurname.value = "";
  getData();
}
btnSave.addEventListener("click", addData);

async function getData() {
  try {
    let res = await fetch(API);
    let todos = await res.json();
    show(todos);
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
}
getData();

function show(newData) {
  userDataList.innerHTML = "";
  newData.forEach((elem) => {
    userDataList.innerHTML += `
        <li>
        <img src= ${elem.inpPhoto}>
        <p> ${elem.inpName}</p>
        <p> ${elem.inpSurname}</p>
        <p> ${elem.inpNumber}</p>
        <p> ${elem.inpEmail}</p>
<div> 
<button onclick="deleteContact(${elem.id})" class="btn btn-danger">delete</button>
<button onclick='editContact(${elem.id})' class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">edit</button>
</div>
        </li>`;
    // console.log(elem.objName);
  });
}
getData();
async function deleteContact(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getData();
  } catch (error) {
    console.log(error);
  }
}
// }
// let inpEditPhoto = document.querySelector(".inp-edit-photo");
// let inpEditName = document.querySelector(".inp-edit-name");
// let inpEditSurename = document.querySelector(".inp-edit-surename");
// let inpEditNumber = document.querySelector(".inp-edit-number");
// let inpEditEmail = document.querySelector(".inp-edit-email");

// let saveBtn = document.querySelector(".save-btn");
// let editModal = document.querySelector("#exampleModal");

// let editedObj = {};

// inpEditPhoto.addEventListener("input", (e) => {
//   editedObj = { ...editedObj, inpPhoto: e.target.value };
// });

// inpEditName.addEventListener("input", (e) => {
//   editedObj = { ...editedObj, inpName: e.target.value };
// });

// inpEditSurename.addEventListener("input", (e) => {
//   editedObj = { ...editedObj, inpSurename: e.target.value };
// });

// inpEditNumber.addEventListener("input", (e) => {
//   editedObj = { ...editedObj, inpNumber: e.target.value };
// });

// inpEditEmail.addEventListener("input", (e) => {
//   editedObj = { ...editedObj, inpEmail: e.target.value };
// });

// async function editContact(id) {
//   try {
//     let res = await fetch(`${API}/${id}`);
//     let objToEdit = await res.json();

//     inpEditPhoto.value = objToEdit.photo;
//     inpEditName.value = objToEdit.name;
//     inpEditSurename.value = objToEdit.surename;
//     inpEditNumber.value = objToEdit.number;
//     inpEditEmail.value = objToEdit.email;

//     saveBtn.setAttribute("id", `${id}`);
//   } catch (error) {
//     console.log(error);
//   }
// }

// saveBtn.addEventListener("click", async (e) => {
//   let id = e.target.id;

//   try {
//     await fetch(`${API}/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json; charset=utf-8" },
//       body: JSON.stringify(editedObj),
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   getData();
//   let modal = bootstrap.Modal.getInstance(editModal);
//   modal.hide();
// });
