document.addEventListener("DOMContentLoaded", () => {
    const tablaClientes = document.getElementById("tablaClientes").getElementsByTagName("tbody")[0];
    const createForm = document.getElementById("createForm");
    const editForm = document.getElementById("editForm");

    // Modals
    const modalCliente = document.getElementById("modalCliente");
    const modalEditCliente = document.getElementById("modalEditCliente");

    // Abrir y cerrar modales
    document.getElementById("btnCrear").addEventListener("click", () => {
        modalCliente.style.display = "flex";
        createForm.reset();
    });
    document.getElementById("btnCloseCreateModal").addEventListener("click", () => {
        modalCliente.style.display = "none";
    });
    document.getElementById("btnCloseEditModal").addEventListener("click", () => {
        modalEditCliente.style.display = "none";
    });

    // Cargar clientes al iniciar
    cargarClientes();

    // Crear cliente
    createForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nuevoCliente = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            telefono: document.getElementById("telefono").value,
            direccion: document.getElementById("direccion").value
        };

        await fetch("http://localhost:3000/api/clients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoCliente)
        });

        cargarClientes();
        modalCliente.style.display = "none";
    });

    // Editar cliente
    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("editClienteId").value;
        const updatedCliente = {
            nombre: document.getElementById("editNombre").value,
            email: document.getElementById("editEmail").value,
            telefono: document.getElementById("editTelefono").value,
            direccion: document.getElementById("editDireccion").value
        };

        await fetch(`http://localhost:3000/api/clients/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCliente)
        });

        cargarClientes();
        modalEditCliente.style.display = "none";
    });

    // carga y muestra a los clientes en la tabla
    async function cargarClientes() {
        const response = await fetch("http://localhost:3000/api/clients");
        const { status, data } = await response.json();

        if (status === "OK") {
            tablaClientes.innerHTML = "";

            data.forEach(cliente => {
                const row = tablaClientes.insertRow();
                row.innerHTML = `
                    <td class="border px-4 py-2 text-center">${cliente.id}</td>
                    <td class="border px-4 py-2">${cliente.nombre}</td>
                    <td class="border px-4 py-2">${cliente.email}</td>
                    <td class="border px-4 py-2">${cliente.telefono}</td>
                    <td class="border px-4 py-2">${cliente.direccion}</td>
                    <td class="border px-4 py-2 text-center">
                        <button class="bg-green-500 text-white px-2 py-1 rounded-md" onclick="editarCliente(${cliente.id})">Editar</button>
                        <button class="bg-red-500 text-white px-2 py-1 rounded-md" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
                    </td>
                `;
            });
        }
    }

    // abre modal para editar cliente
    window.editarCliente = async (id) => {
        const response = await fetch(`http://localhost:3000/api/clients/${id}`);
        const { status, data } = await response.json();

        if (status === "OK") {
            document.getElementById("editClienteId").value = data.id;
            document.getElementById("editNombre").value = data.nombre;
            document.getElementById("editEmail").value = data.email;
            document.getElementById("editTelefono").value = data.telefono;
            document.getElementById("editDireccion").value = data.direccion;

            modalEditCliente.style.display = "flex";
        }
    };

    // Elimina cliente
    window.eliminarCliente = async (id) => {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este cliente?");
        if (confirmDelete) {
            await fetch(`http://localhost:3000/api/clients/${id}`, {
                method: "DELETE",
            });

            cargarClientes();
        }
    };
});