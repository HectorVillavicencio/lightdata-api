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
    document.getElementById("btnCloseBuscarModal").addEventListener("click", () => {
        modalBuscarCliente.style.display = "none";
    });

    //boton de busqueda
    document.getElementById("buscarClienteBtn").addEventListener("click", buscarClientePor);

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



    // Editar al cliente
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

    //busca los clientes por nombre
    async function buscarClientePor() {
        
        const filtroNombre = document.getElementById("buscarClientePorNombre").value.trim();
        
        if (filtroNombre === "") {
            alert("Por favor ingresa un nombre para buscar.");
            return;
        }    
        // Llama a cargarClientes con el nombre como filtro
        cargarClientes(filtroNombre);
    }

    // carga y muestra a los clientes en la tabla
    async function cargarClientes(filtroNombre = "") {
        const url = filtroNombre
            ? `http://localhost:3000/api/clients?nombre=${encodeURIComponent(filtroNombre)}`
            : "http://localhost:3000/api/clients";
    
        const response = await fetch(url);
        const { status, data } = await response.json();
    
        if (status === "OK") {
            const tbody = document.querySelector("#tablaClientes tbody");
            tbody.innerHTML = ""; // Limpia la tabla antes de rellenarla
    
            data.forEach(cliente => {
                const row = document.createElement("tr");
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
                tbody.appendChild(row);
            });
        }
    }

    // abre el modal editar cliente
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
    
    // Elimina un cliente
    window.eliminarCliente = async (id) => {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este cliente?");
        if (confirmDelete) {
            await fetch(`http://localhost:3000/api/clients/${id}`, {
                method: "DELETE",
            });

            cargarClientes();
        }
    };


    // Busca el cliente específico
    window.buscarCliente = async () => {
        const clienteId = document.getElementById("buscarClienteId").value;
        if (clienteId) {
            const response = await fetch(`http://localhost:3000/api/clients/${clienteId}`);
            const { status, data } = await response.json();

            if (status === "OK") {
                document.getElementById("detalleId").innerText = data.id;
                document.getElementById("detalleNombre").innerText = data.nombre;
                document.getElementById("detalleEmail").innerText = data.email;
                document.getElementById("detalleTelefono").innerText = data.telefono;
                document.getElementById("detalleDireccion").innerText = data.direccion;
                modalBuscarCliente.style.display = "flex";
            } else {
                alert("Cliente no encontrado.");
            }
        } else {
            alert("Por favor ingresa un ID válido.");
        }
    };
});