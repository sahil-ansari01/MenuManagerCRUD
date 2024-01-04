const choosePriceIn = document.getElementById("choose-price");
const chooseDishIn = document.getElementById("choose-dish");
const chooseTableIn = document.getElementById("choose-table");
const form = document.getElementById("form");
const tableOneUl = document.querySelector(".table-one-ul");
const tableTwoUl = document.querySelector(".table-two-ul");
const tableThreeUl = document.querySelector(".table-three-ul");

document.addEventListener("DOMContentLoaded", () => {
  // Assume you have an endpoint for fetching orders
  axios
    .get("https://crudcrud.com/api/0015f77762bf43ba902a39b3dc93dde3/orders")
    .then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        const order = res.data[i];
        showOrder(order);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const order = {
    price: choosePriceIn.value,
    dish: chooseDishIn.value,
    table: chooseTableIn.value,
  };

  // Assume you have an endpoint for adding orders
  axios
    .post("https://crudcrud.com/api/0015f77762bf43ba902a39b3dc93dde3/orders", order)
    .then((result) => {
      console.log(result);
      createOrder(order);
      clearFields();
    })
    .catch((err) => {
      console.log(err);
    });
});

function clearFields() {
  choosePriceIn.value = "";
  chooseDishIn.value = "";
  chooseTableIn.value = "table1"; // Reset to the default value
}

function showOrder(order) {
  createOrder(order);
}

function createOrder(order) {
  const li = document.createElement("li");
  li.className = "list-item";
  const liTextNode = document.createTextNode(`${order.dish} - $${order.price}`);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn btn-danger delete-btn";

  deleteBtn.addEventListener("click", () => {
    // Assume you have an endpoint for deleting orders
    axios
      .delete(`https://crudcrud.com/api/0015f77762bf43ba902a39b3dc93dde3/orders/${order._id}`)
      .then((res) => {
        console.log(res);
        li.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  li.appendChild(liTextNode);
  li.appendChild(deleteBtn);

  switch (order.table) {
    case "table1":
      tableOneUl.appendChild(li);
      break;
    case "table2":
      tableTwoUl.appendChild(li);
      break;
    case "table3":
      tableThreeUl.appendChild(li);
      break;
    default:
      // Handle default case or error
      break;
  }
}
