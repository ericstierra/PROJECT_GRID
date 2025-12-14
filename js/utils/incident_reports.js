import { incidentsData } from '../../data/incidents_data.js';

const tableBody = document.getElementById('incidentTableBody');

function renderTable(data) {
    tableBody.innerHTML = '';
    data.forEach(incident => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${incident.ir_id}</td>
            <td>${incident.date} ${incident.time}</td>
            <td>${incident.nature_of_incident}</td>
            <td>${incident.barangay}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-info view-btn" 
                    data-bs-toggle="modal" 
                    data-bs-target="#viewIncidentModal" 
                    data-id="${incident.id}">
                    <i class="bi bi-eye-fill"></i> View
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Initial render
renderTable(incidentsData);

// Handle View Button Click
tableBody.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-btn');
    if (btn) {
        const id = btn.getAttribute('data-id');
        const incident = incidentsData.find(i => i.id == id);
        if (incident) {
            document.getElementById('viewIrId').textContent = incident.ir_id;
            document.getElementById('viewIrDateTime').textContent = `${incident.date} ${incident.time}`;
            document.getElementById('viewIrNature').textContent = incident.nature_of_incident;
            document.getElementById('viewIrBarangay').textContent = incident.barangay;
            document.getElementById('viewIrDescription').textContent = incident.details;
            document.getElementById('viewIrActions').textContent = incident.actions_taken;
            document.getElementById('viewIrRemarks').textContent = incident.remarks;
            
            const photoEl = document.getElementById('viewIrPhoto');
            photoEl.src = incident.photo || '';
            photoEl.style.display = incident.photo ? 'block' : 'none';
        }
    }
});