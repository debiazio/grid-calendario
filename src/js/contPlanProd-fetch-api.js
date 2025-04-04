// Função para buscar os dados da API
async function fetchData() {
    try {
        const response = await fetch('https://4c7d08aad3f145b29449c068cb7e9814.api.mockbin.io/');
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

// Função para popular a tabela com os dados
function populateTable(data) {
    const table = document.getElementById('data-table');
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');

    thead.innerHTML = '';
    tbody.innerHTML = '';

    if (!data || data.length === 0) {
        console.warn('Nenhum dado recebido.');
        return;
    }

    const { mes, ano, diasemana } = data[0];

    // Atualiza o título MÊS/ANO
    const tituloMes = document.querySelector('.titulo-mes h2');
    tituloMes.textContent = `MÊS/ANO: ${mes}/${ano}`;

    // Identificar finais de semana (domingo e sábado que vem antes dele)
    const weekendIndexes = new Set();
    diasemana.forEach((dia, index) => {
        if (dia === 'D') {
            weekendIndexes.add(index); // domingo
            if (index > 0 && diasemana[index - 1] === 'S') {
                weekendIndexes.add(index - 1); // sábado antes do domingo
            }
        }
    });

    // Cabeçalho principal (números dos dias)
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th class="sticky"><div class="label">CÓDIGO / NOME</div></th>
        <th class="sticky"><div class="label">CLIENTE</div></th>
        <th class="sticky"><div class="label">MÁQ. INJ.</div></th>
    `;

    for (let i = 1; i <= diasemana.length; i++) {
        const th = document.createElement('th');
        th.textContent = i;

        if (weekendIndexes.has(i - 1)) {
            th.classList.add('weekend');
        }

        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);

    // Linha com iniciais dos dias da semana
    const weekDayRow = document.createElement('tr');
    weekDayRow.innerHTML = `
        <th class="sticky"></th>
        <th class="sticky"></th>
        <th class="sticky"></th>
    `;

    diasemana.forEach((dia, index) => {
        const th = document.createElement('th');
        th.textContent = dia;

        if (weekendIndexes.has(index)) {
            th.classList.add('weekend');
        }

        weekDayRow.appendChild(th);
    });

    thead.appendChild(weekDayRow);

    // Corpo da tabela
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="sticky">${item.codigoproduto} / ${item.codigosecundarioproduto}</td>
            <td class="sticky">${item.cliente}</td>
            <td class="sticky">${item.equipamento || '-'}</td>
        `;

        for (let i = 0; i < diasemana.length; i++) {
            const td = document.createElement('td');
            const realizado = item.realizado[i] !== undefined ? item.realizado[i] : '';
            const produzido = item.produzido[i] !== undefined ? item.produzido[i] : '';

            td.innerHTML = `
                <label class="realizado">${realizado}</label><br>
                <label>${produzido}</label>
            `;

            if (weekendIndexes.has(i)) {
                td.classList.add('weekend');
            }

            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    });
}

// Chama a função fetchData para buscar os dados da API
fetchData();
