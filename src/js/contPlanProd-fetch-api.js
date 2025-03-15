async function fetchData() {
    try {
        const response = await fetch('https://c4c7ba327e55465a86c249b999398999.api.mockbin.io/');
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

function populateTable(data) {
    const table = document.getElementById('data-table');
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    // Criando os cabeçalhos dos dias (1 a 31)
    const daysInMonth = data[0].valores.length;
    for (let i = 1; i <= daysInMonth; i++) {
        const th = document.createElement('th');
        th.textContent = i;
        thead.appendChild(th);
    }

    // Criando as linhas da tabela
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="sticky">${item.codigoNome}</td>
            <td class="sticky">${item.cliente}</td>
            <td class="sticky">${item.maquina}</td>
        `;
        
        item.valores.forEach(valor => {
            const td = document.createElement('td');
            td.innerHTML = `<label>${valor}</label><br><input type="text" value="">`;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

fetchData();