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
                <input type="text" class="itemId" placeholder="ID Ítem" required>
                <input type="number" class="itemStock" placeholder="Stock" required>
            </div>
        `;
    });
    document.getElementById("btnCloseCreateModalPedido").addEventListener("click", () => {
        modalPedido.style.display = "none";
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
                    <td class="border px-4 py-2">${pedido.clienteId}</td>
                    <td class="border px-4 py-2">${pedido.items.map(item => `ID: ${item.id}, Stock: ${item.stock}`).join('<br>')}</td>
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

    



});
