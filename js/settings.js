   let count = 0;

    function openForm() {
        document.getElementById("overlay").style.display = "flex";
    }

    function closeForm() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("barangayName").value = "";
    }


    function saveBarangay() {
        const name = document.getElementById("barangayName").value;

        if (name.trim() === "") {
            alert("Please enter barangay name.");
            return;
        }

        count++;

        const table = document.getElementById("barangayTable");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${count}</td>
            <td>${name}</td>
        `;

        table.appendChild(row);

        closeForm();
    }

    function addBarangay() {
    const input = document.getElementById("barangayInput");
    const name = input.value.trim();

    if (name === "") {
        alert("Please enter barangay name.");
        return;
    }

    const list = document.getElementById("barangayList");

    const item = document.createElement("div");
    item.className = "barangay-item";

    item.innerHTML = `
        <span>${name}</span>
        <div class="icons">
            <button class="icon-btn">✏️</button>
            <button class="icon-btn">🗑️</button>
        </div>
    `;

    list.appendChild(item);
    input.value = "";
}