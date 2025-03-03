function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

// ✅ Add Expenditure
async function addExpenditure() {
    let month = document.getElementById("expMonth").value;
    let type = document.getElementById("expType").value;
    let amount = document.getElementById("expAmount").value;

    await fetch("/addExpenditure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month, type, amount })
    });

    alert("Expenditure added!");
    loadExpenditure(); // Refresh list
}

// ✅ Add Income
async function addIncome() {
    let month = document.getElementById("incMonth").value;
    let type = document.getElementById("incType").value;
    let amount = document.getElementById("incAmount").value;

    await fetch("/addIncome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month, type, amount })
    });

    alert("Income added!");
    loadIncome(); // Refresh list
}

// ✅ Add Family Member
async function addFamily() {
    let name = document.getElementById("famName").value;
    let occupation = document.getElementById("famOccupation").value;
    let studies = document.getElementById("famStudies").value;
    let age = document.getElementById("famAge").value;

    await fetch("/addFamily", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, occupation, studies, age })
    });

    alert("Family member added!");
    loadFamily(); // Refresh list
}

// ✅ Load Expenditures
async function loadExpenditure() {
    let response = await fetch("/getExpenditure");
    let data = await response.json();
    let list = document.getElementById("expList");
    list.innerHTML = "";
    data.forEach(item => {
        list.innerHTML += `<li>${item.month} - ${item.type}: ₹${item.amount}</li>`;
    });
}

// ✅ Load Income
async function loadIncome() {
    let response = await fetch("/getIncome");
    let data = await response.json();
    let list = document.getElementById("incList");
    list.innerHTML = "";
    data.forEach(item => {
        list.innerHTML += `<li>${item.month} - ${item.type}: ₹${item.amount}</li>`;
    });
}

// ✅ Load Family Members
async function loadFamily() {
    let response = await fetch("/getFamily");
    let data = await response.json();
    let list = document.getElementById("famList");
    list.innerHTML = "";
    data.forEach(item => {
        list.innerHTML += `<li>${item.name}, ${item.occupation}, ${item.studies}, Age: ${item.age}</li>`;
    });
}

// Load data when the page opens
document.addEventListener("DOMContentLoaded", () => {
    loadExpenditure();
    loadIncome();
    loadFamily();
});
