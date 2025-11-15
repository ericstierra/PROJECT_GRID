const form = document.getElementById('addUserForm');
const userTableBody = document.getElementById('userTableBody');

    // Add User Form Submit
  form.addEventListener('submit', function (e) {
  e.preventDefault();

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
      <button class="btn btn-sm btn-danger delete-btn">Delete</button>
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
if (e.target.classList.contains('delete-btn')) {
e.target.closest('tr').remove();
}

if (e.target.classList.contains('edit-btn')) {
const row = e.target.closest('tr');
const nameCell = row.children[0];
const roleCell = row.children[1];
const statusCell = row.children[2];

        // Ask for new details
const newName = prompt("Edit Full Name:", nameCell.textContent);
const newRole = prompt("Edit Role (Admin, Encoder, Viewer):", roleCell.textContent);
const newStatus = prompt("Edit Status (Active / Inactive):", statusCell.textContent);

if (newName && newRole && newStatus) {
nameCell.textContent = newName;
roleCell.textContent = newRole;
statusCell.innerHTML = `<span class="badge ${newStatus === 'Active' ? 'bg-success' : 'bg-secondary'}">${newStatus}</span>`;
}
}
});
