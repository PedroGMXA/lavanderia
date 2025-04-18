document.addEventListener('DOMContentLoaded', function() {
    const menuToggleButton = document.querySelector('.menu-toggle-button');
    const dashboardContainer = document.querySelector('.dashboard-container');
    const menuCollapsed = localStorage.getItem('menuCollapsed') === 'true';

    if (menuCollapsed) {
        dashboardContainer.classList.add('collapsed');
    }

    menuToggleButton.addEventListener('click', function() {
        dashboardContainer.classList.toggle('collapsed');
        localStorage.setItem('menuCollapsed', dashboardContainer.classList.contains('collapsed'));
    });

    cargarServicios();
    cargarClientes();
});

function cargarServicios() {
    fetch('/api/servicios')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tablaBody = document.querySelector('#data-list-heading + .list-controls + table tbody');
            tablaBody.innerHTML = '';

            data.forEach(servicio => {
                const row = tablaBody.insertRow();
                row.insertCell().textContent = servicio.folio;
                row.insertCell().textContent = servicio.fecha;
                row.insertCell().textContent = servicio.cliente;
                const estadoCell = row.insertCell();
                estadoCell.textContent = servicio.estado;
                estadoCell.className = `status ${servicio.estado.toLowerCase()}`;
                row.insertCell().innerHTML = '<a href="#"><i class="fas fa-eye"></i> Ver</a>';
            });
        })
        .catch(error => {
            console.error('Error al obtener los servicios:', error);
            const tablaBody = document.querySelector('#data-list-heading + .list-controls + table tbody');
            tablaBody.innerHTML = '<tr><td colspan="5">Error al cargar los datos.</td></tr>';
        });
}

function cargarClientes() {
    fetch('/api/clientes')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tablaBody = document.querySelector('#clientes-table tbody');
            tablaBody.innerHTML = '';

            data.forEach(cliente => {
                const row = tablaBody.insertRow();
                row.insertCell().textContent = cliente.codigo;
                row.insertCell().textContent = cliente.nombre;
                row.insertCell().textContent = cliente.email;
            });
        })
        .catch(error => {
            console.error('Error al obtener los clientes:', error);
            const tablaBody = document.querySelector('#clientes-table tbody');
            tablaBody.innerHTML = '<tr><td colspan="3">Error al cargar los clientes.</td></tr>';
        });
}