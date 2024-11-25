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

    //boton de busqueda
    document.getElementById("buscarItemBtn").addEventListener("click", buscarItemPor);





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

       //busca los items por nombre
       async function buscarItemPor() {
        
        const filtroCodigo = document.getElementById("buscarItemPorNombre").value.trim();
        
        if (filtroCodigo === "") {
            alert("Por favor ingresa un codigo para buscar.");
            return;
        }    
        // Llama a cargaritems con el codigo como filtro
        cargarItems(filtroCodigo);
    }

    // Cargar y mostrar ítems en la tabla
    async function cargarItems(filtroCodigo = "") {
        const url = filtroCodigo
            ? `http://localhost:3000/api/items?codigo=${encodeURIComponent(filtroCodigo)}`
            : "http://localhost:3000/api/items";
    
        const response = await fetch(url);
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
                    <td class="border px-4 py-2 text-center">
                        <button class="bg-green-500 text-white px-2 py-1 rounded-md" onclick="editarItem(${item.id})">Editar</button>
                        <button class="bg-red-500 text-white px-2 py-1 rounded-md" onclick="eliminarItem(${item.id})">Eliminar</button>
                    </td>
                `;
            });
        }
    }

    // Elimina un items
    window.eliminarItem = async (id) => {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este cliente?");
        if (confirmDelete) {
            await fetch(`http://localhost:3000/api/items/${id}`, {
                method: "DELETE",
            });
    
            cargarItems();
        }
    };

    // abre el modal editar item
    window.editarItem = async (id) => {
        const response = await fetch(`http://localhost:3000/api/items/${id}`);
        const { status, data } = await response.json();

        if (status === "OK") {
            document.getElementById("editItemId").value = data.id;
            document.getElementById("editCodigo").value = data.codigo;
            document.getElementById("editDescripcion").value = data.descripcion;
            document.getElementById("editPrecio").value = data.precio;
            document.getElementById("editStock").value = data.stock;
            document.getElementById("editHabilitado").value = data.habilitado.toString(); // Convertir a string

            modalEditItem.style.display = "flex";
        }
    };
    
});



    
