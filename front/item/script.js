document.addEventListener("DOMContentLoaded", () => {
    const tablaItems = document.getElementById("tablaItems").getElementsByTagName("tbody")[0];
    const createForm = document.getElementById("createForm");
    const editForm = document.getElementById("editForm");

    // Modales
    const modalItem = document.getElementById("modalItem");
    const modalEditItem = document.getElementById("modalEditItem");

    // Abrir y cerrar modales
    document.getElementById("btnCrear").addEventListener("click", () => {
        modalItem.style.display = "flex";
        createForm.reset();
    });
    document.getElementById("btnCloseCreateModal").addEventListener("click", () => {
        modalItem.style.display = "none";
    });
    document.getElementById("btnCloseEditModal").addEventListener("click", () => {
        modalEditItem.style.display = "none";
    });

    document.getElementById("btnCloseBuscarModal").addEventListener("click", () => {
        modalBuscarCliente.style.display = "none";
    });




    // Cargar ítems al iniciar
    cargarItems();

    // Crear ítem
    createForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nuevoItem = {
            codigo: document.getElementById("codigo").value,
            descripcion: document.getElementById("descripcion").value,
            precio: parseFloat(document.getElementById("precio").value),
            stock: parseInt(document.getElementById("stock").value)
        };

        await fetch("http://localhost:3000/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoItem)
        });

        cargarItems();
        modalItem.style.display = "none";
    });

    // Editar ítem
    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("editItemId").value;
        const updatedItem = {
            codigo: document.getElementById("editCodigo").value,
            descripcion: document.getElementById("editDescripcion").value,
            precio: parseFloat(document.getElementById("editPrecio").value),
            stock: parseInt(document.getElementById("editStock").value),
            habilitado: document.getElementById("editHabilitado").value === "true" 
        };

        await fetch(`http://localhost:3000/api/items/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedItem)
        });

        cargarItems();
        modalEditItem.style.display = "none";
    });

    // Cargar y mostrar ítems en la tabla
    async function cargarItems() {
        const response = await fetch("http://localhost:3000/api/items");
        const { status, data } = await response.json();

        if (status === "OK") {
            tablaItems.innerHTML = "";

            data.forEach(item => {
                const row = tablaItems.insertRow();
                row.innerHTML = `
                    <td class="border px-4 py-2 text-center">${item.id}</td>
                    <td class="border px-4 py-2">${item.codigo}</td>
                    <td class="border px-4 py-2">${item.descripcion}</td>
                    <td class="border px-4 py-2">${item.precio}</td>
                    <td class="border px-4 py-2">${item.stock}</td>
                    <td class="border px-4 py-2">${item.habilitado ? "Sí" : "No"}</td>
                    <td class="border px-4 py-2">
                        <button class="btn btn-edit" data-id="${item.id}">Editar</button>
                        <button class="btn btn-delete" data-id="${item.id}">Eliminar</button>
                    </td>
                `;

                // Botón de editar
                row.querySelector(".btn-edit").addEventListener("click", () => {
                    abrirModalEditar(item);
                });

                // Botón de eliminar
                row.querySelector(".btn-delete").addEventListener("click", async () => {
                    await fetch(`http://localhost:3000/api/items/${item.id}`, {
                        method: "DELETE"
                    });
                    cargarItems();
                });
            });
        }
    }

    // Abrir modal para editar
    function abrirModalEditar(item) {
        modalEditItem.style.display = "flex";
        document.getElementById("editItemId").value = item.id;
        document.getElementById("editCodigo").value = item.codigo;
        document.getElementById("editDescripcion").value = item.descripcion;
        document.getElementById("editPrecio").value = item.precio;
        document.getElementById("editStock").value = item.stock;
        document.getElementById("editHabilitado").value = item.habilitado.toString(); // Convertir a string
    }

    // Buscar item específico
    window.buscarItem = async () => {
        const id = document.getElementById("buscarItemId").value;
        if (id) {
            const response = await fetch(`http://localhost:3000/api/items/${id}`);
            const { status, data } = await response.json();

            if (status === "OK") {
                document.getElementById("detalleId").innerText = data.id;
                document.getElementById("detalleCodigo").innerText = data.codigo;
                document.getElementById("detalleDescripcion").innerText = data.descripcion;
                document.getElementById("detallePrecio").innerText = data.precio;
                document.getElementById("detalleStock").innerText = data.stock;
                document.getElementById("detalleHabilitado").innerText = data.habilitado.toString();
                modalBuscarCliente.style.display = "flex";
            } else {
                alert("Cliente no encontrado.");
            }
        } else {
            alert("Por favor ingresa un ID válido.");
        }
    };





});
