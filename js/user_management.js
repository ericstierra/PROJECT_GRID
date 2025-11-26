const form = document.getElementById('addUserForm');
const userTableBody = document.getElementById('userTableBody');

    // Add User Form Submit
  form.addEventListener('submit', function (e) {
  e.preventDefault(0);

const fullName = document.getElementById('fullName').value;
const userType = document.getElementById('userType').value;
const status = document.getElementById('status').value;

      // Create table row
const tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${fullName}</td>
      <td>${userType}</td>
      <td><span class="badge ${status === 'Active' ? 'bg-success' : 'bg-secondary'}">${status}</span></td>
      <td class="action-btns">
      <button class="btn btn-sm btn-warning edit-btn">Edit</button>
        </td>
      `;

      // Append row to table
userTableBody.appendChild(tr);

      // Reset and close modal
form.reset();
const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
modal.hide();
});

// Handle Edit & Delete actions
userTableBody.addEventListener('click', function (e) {


  // Edit Row (Inline Editing)
if (e.target.classList.contains('edit-btn')) {
    const row = e.target.closest('tr');
    const nameCell = row.children[0];
    const roleCell = row.children[1];
    const statusCell = row.children[2];
    const actionCell = row.children[3];

    // Convert cells to inputs
    nameCell.innerHTML = `<input type="text" class="form-control" value="${nameCell.textContent}">`;
    roleCell.innerHTML = `
        <select class="form-select">
            <option ${roleCell.textContent === "Admin" ? "selected" : ""}>Admin</option>
            <option ${roleCell.textContent === "Encoder" ? "selected" : ""}>Encoder</option>
            <option ${roleCell.textContent === "Viewer" ? "selected" : ""}>Viewer</option>
        </select>
    `;
    statusCell.innerHTML = `
        <select class="form-select">
            <option ${statusCell.textContent.trim() === "Active" ? "selected" : ""}>Active</option>
            <option ${statusCell.textContent.trim() === "Inactive" ? "selected" : ""}>Inactive</option>
        </select>
    `;

    // Change Edit button → Save button
    actionCell.innerHTML = `
        <button class="btn btn-sm btn-success save-btn">Save</button>
        <button class="btn btn-sm btn-secondary cancel-btn">Cancel</button>
    `;
}

// Save Edited Row
if (e.target.classList.contains('save-btn')) {
    const row = e.target.closest('tr');
    const nameInput = row.children[0].querySelector('input');
    const roleInput = row.children[1].querySelector('select');
    const statusInput = row.children[2].querySelector('select');
    const actionCell = row.children[3];

    const newName = nameInput.value;
    const newRole = roleInput.value;
    const newStatus = statusInput.value;

    row.children[0].textContent = newName;
    row.children[1].textContent = newRole;

    // Update badge
    row.children[2].innerHTML = `
        <span class="badge ${newStatus === 'Active' ? 'bg-success' : 'bg-secondary'}">
            ${newStatus}
        </span>
    `;

    actionCell.innerHTML = `
        <button class="btn btn-sm btn-primary edit-btn">Edit</button>
    `;
}

// Cancel Editing
if (e.target.classList.contains('cancel-btn')) {
    location.reload(); // simplest way to restore original row
}
}); 