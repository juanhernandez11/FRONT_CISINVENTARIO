document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton')?.addEventListener('click', function() {
        window.location.href = 'seleccion-opcion.html';
    });

    document.getElementById('registerButton')?.addEventListener('click', function() {
        window.location.href = 'register.html';
    });

    document.getElementById('addButton')?.addEventListener('click', function() {
        window.location.href = 'create-task.html';
    });

    document.getElementById('logoutButton')?.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });

    document.getElementById('cancelButton')?.addEventListener('click', function() {
        window.location.href = 'dashboard.html';
    });

    // Form Submissions
    document.getElementById('loginForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        alert(`Bienvenido, ${username}!`);
        window.location.href = 'seleccion-opcion.html';
    });

    document.getElementById('registerForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        alert('Registro exitoso!');
        window.location.href = 'login.html';
    });

    document.getElementById('createTaskForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const tipoEquipo = document.getElementById('tipoEquipo').value;
        const marca = document.getElementById('marca').value;
        const modelo = document.getElementById('modelo').value;
        const numeroSerie = document.getElementById('numeroSerie').value;
        const sistemaOperativo = document.getElementById('sistemaOperativo').value;
        const ram = document.getElementById('ram').value;
        const discoDuro = document.getElementById('discoDuro').value;
        const arquitectura = document.getElementById('arquitectura').value;
        const procesadorMarca = document.getElementById('procesadorMarca').value;
        const procesadorModelo = document.getElementById('procesadorModelo').value;
        const procesadorVelocidad = document.getElementById('procesadorVelocidad').value;
        const inventario = document.getElementById('inventario').value;
        const conexionInternet = document.getElementById('conexionInternet').value;
        const tipoIngreso = document.getElementById('tipoIngreso').value;
        const ubicacion = document.getElementById('ubicacion').value;
        const comentarios = document.getElementById('comentarios').value;
        const conexionInternetSwitch = document.getElementById('conexionInternetSwitch').checked;

        // Create task object
        const task = {
            tipoEquipo,
            marca,
            modelo,
            numeroSerie,
            sistemaOperativo,
            ram,
            discoDuro,
            arquitectura,
            procesadorMarca,
            procesadorModelo,
            procesadorVelocidad,
            inventario,
            conexionInternet,
            tipoIngreso,
            ubicacion,
            comentarios,
            conexionInternetSwitch
        };

        // Save to local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        window.location.href = 'dashboard.html';
    });

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tableBody = document.getElementById('itemsTableBody');
    if (tableBody) {
        tasks.forEach((task, index) => {
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${task.tipoEquipo} - ${task.marca} - ${task.modelo}</td>
                <td>
                    <button class="btn btn-info btn-sm viewButton" data-index="${index}">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    <button class="btn btn-warning btn-sm editButton" data-index="${index}">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-sm deleteButton" data-index="${index}">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </td>
            `;
        });

        document.querySelectorAll('.viewButton').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const task = tasks[index];
                alert(JSON.stringify(task, null, 2));
            });
        });

        document.querySelectorAll('.editButton').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const task = tasks[index];
                localStorage.setItem('taskToEdit', JSON.stringify({ task, index }));
                window.location.href = 'edit-task.html';
            });
        });

        document.querySelectorAll('.deleteButton').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                window.location.reload();
            });
        });
    } else {
        console.error('Element with id "itemsTableBody" not found.');
    }

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const filter = searchInput.value.toLowerCase();
            const tableRows = document.getElementById('itemsTableBody').getElementsByTagName('tr');
            Array.from(tableRows).forEach(function(row) {
                const cells = row.getElementsByTagName('td');
                const match = Array.from(cells).some(cell => cell.innerText.toLowerCase().includes(filter));
                row.style.display = match ? '' : 'none';
            });
        });
    }
});
