document.addEventListener("DOMContentLoaded", () => {
    const tablaPedidos = document.getElementById("tablaPedidos").getElementsByTagName("tbody")[0];
    const createOrderForm = document.getElementById("createOrderForm");

    // Modales
    const modalPedido = document.getElementById("modalPedido");
    

    // Abrir y cerrar modales
    document.getElementById("btnCrearPedido").addEventListener("click", () => {
        modalPedido.style.display = "flex";
        createOrderForm.reset();
        document.getElementById("itemsContainer").innerHTML = `
            <h3>Items</h3>
            <div class="item">
                <input type="text" class="itemId" placeholder="ID item" required>
                <input type="number" class="itemStock" placeholder="Stock" required>
            </div>
        `;
    });
    document.getElementById("btnCloseCreateModalPedido").addEventListener("click", () => {
        modalPedido.style.display = "none";
    });
    document.getElementById("btnCloseBuscarModal").addEventListener("click", () => {
        modalBuscarCliente.style.display = "none";
    });
    document.getElementById("btnCloseBuscarModalItem").addEventListener("click", () => {
        modalBuscarItem.style.display = "none";
    });


    // Crear pedido
    createOrderForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const clienteId = document.getElementById("clienteId").value;
        const items = Array.from(document.querySelectorAll(".item")).map(item => ({
            id: item.querySelector(".itemId").value,
            stock: parseInt(item.querySelector(".itemStock").value)
        }));

        const nuevoPedido = {
            clienteId: clienteId,
            items: items
        };

        await fetch("http://localhost:3000/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoPedido)
        });

        cargarPedidos();
        modalPedido.style.display = "none";
    });

    // Cargar y mostrar pedidos en la tabla
    async function cargarPedidos() {
        const response = await fetch("http://localhost:3000/api/order");
        const { status, data } = await response.json();

        if (status === "OK") {
            tablaPedidos.innerHTML = "";

            data.forEach(pedido => {
                const row = tablaPedidos.insertRow();
                row.innerHTML = `
                    <td class="border px-4 py-2 text-center">${pedido.id}</td>
                    <td class="border px-4 py-2 text-center">
                        <button class="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600" onclick="buscarCliente(${pedido.clienteId})">ver cliente</button>
                    </td>
                    <td class="border px-4 py-2">${pedido.clienteId}</td>
                    <td class="border px-4 py-2">${pedido.items.map(item => `ID: <button class="bg-white text-black px-2 py-1 rounded-md hover:bg-green-500" onclick="buscarItem(${item.id})">
                  ${item.id}
               </button>, Stock: ${item.stock}`).join('<br>')}</td>
                    <td class="border px-4 py-2">${new Date(pedido.createdAt).toLocaleString()}</td>
                    
                        
                    </td>
                `;

                
            });
        }
    }

    // Cargar pedidos al iniciar
    cargarPedidos();

    // Agregar item al formulario
    document.getElementById("btnAgregarItem").addEventListener("click", () => {
        const newItemDiv = document.createElement("div");
        newItemDiv.className = "item";
        newItemDiv.innerHTML = `
            <input type="text" class="itemId" placeholder="ID Ítem" required>
            <input type="number" class="itemStock" placeholder="Stock" required>
        `;
        document.getElementById("itemsContainer").appendChild(newItemDiv);
    });

     // Buscar pedido específico
     window.buscarPedido = async () => {
        const id = document.getElementById("buscarPedidoId").value;
        if (id) {
            try {
                const response = await fetch(`http://localhost:3000/api/order/${id}`);
                const { status, data } = await response.json();
    
                if (status === "OK") {
                    document.getElementById("detalleId").innerText = data.id;
                    document.getElementById("detalleClienteId").innerText = data.clienteId; 
                    document.getElementById("detalleItems").innerHTML = data.items.map(item => `ID: ${item.id}, Stock: ${item.stock}`).join('<br>'); 
                    document.getElementById("detalleFechaCreacion").innerText = new Date(data.createdAt).toLocaleString(); 
                    modalBuscarCliente.style.display = "flex";
                } else {
                    alert("Pedido no encontrado.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Ocurrió un error al buscar el pedido.");
            }
        } else {
            alert("Por favor ingresa un ID válido.");
        }
    };

     // Busca el cliente específico
    window.buscarCliente = async (clienteId) => {
        const cliente = clienteId;
        if (cliente) {
            const response = await fetch(`http://localhost:3000/api/clients/${cliente}`);
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


     // Buscar item específico
     window.buscarItem = async (id) => {
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
                modalBuscarItem.style.display = "flex";
            } else {
                alert("Item no encontrado.");
            }
        } else {
            alert("Por favor ingresa un ID válido.");
        }
    };



});
