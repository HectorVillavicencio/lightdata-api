document.addEventListener("DOMContentLoaded", () => {
    const tablaClientes = document.getElementById("tablaClientes").getElementsByTagName("tbody")[0];
    const clientForm = document.getElementById("clientForm");

    // Cargar clientes al iniciar
    cargarClientes();

    // Agregar cliente al enviar el formulario
    document.getElementById("btnCreate").addEventListener("click", async (e) => {
        e.preventDefault();

        // Obtener los valores del formulario
        const nuevoCliente = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            telefono: document.getElementById("telefono").value,
            direccion: document.getElementById("direccion").value,
        };

        // Enviar datos al servidor
        await fetch("http://localhost:3000/api/clients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoCliente)
        });

        // Recargar la tabla
        cargarClientes();
        clientForm.reset();
    });

    // Función para cargar y mostrar clientes en la tabla
    async function cargarClientes() {
        const response = await fetch("http://localhost:3000/api/clients");
        const { status, data } = await response.json();

        // Verificar si la solicitud fue exitosa
        if (status === "OK") {
            tablaClientes.innerHTML = ""; // Limpiar la tabla

            // Agregar cada cliente a la tabla
            data.forEach(cliente => {
                const row = tablaClientes.insertRow();
                row.innerHTML = `
                    <td class="border px-4 py-2 text-center">${cliente.id}</td>
                    <td class="border px-4 py-2">${cliente.nombre}</td>
                    <td class="border px-4 py-2">${cliente.email}</td>
                    <td class="border px-4 py-2">${cliente.telefono}</td>
                    <td class="border px-4 py-2">${cliente.direccion}</td>
                    <td class="border px-4 py-2 text-center">
                        <button class="text-blue-500" onclick="editarCliente('${cliente.id}')">Editar</button>
                        <button class="text-red-500" onclick="borrarCliente('${cliente.id}')">Borrar</button>
                    </td>
                `;
            });
        }
    }

    // Función para borrar cliente
    window.borrarCliente = async (id) => {
        await fetch(`http://localhost:3000/api/clients/${id}`, {
            method: "DELETE"
        });
        cargarClientes();
    };

    // Función para editar cliente
    window.editarCliente = async (id) => {
        const cliente = await (await fetch(`http://localhost:3000/api/clients/${id}`)).json();
        document.getElementById("nombre").value = cliente.nombre;
        document.getElementById("email").value = cliente.email;
        document.getElementById("telefono").value = cliente.telefono;
        document.getElementById("direccion").value = cliente.direccion;

        // Guardar cambios en el formulario
        document.getElementById("btnCreate").addEventListener("click", async () => {
            await fetch(`http://localhost:3000/api/clients/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: document.getElementById("nombre").value,
                    email: document.getElementById("email").value,
                    telefono: document.getElementById("telefono").value,
                    direccion: document.getElementById("direccion").value
                })
            });
            cargarClientes();
        });
    };
});