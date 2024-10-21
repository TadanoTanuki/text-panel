document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
            const content = event.target.result;
            displayCSVContent(content);
            displaySidebarHeaders(content); // サイドパネルに見出しを表示
        };

        reader.readAsText(file);
    } else {
        alert('ファイルを選択してください。');
    }
});

function displayCSVContent(content) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // 既存の内容をクリア

    const rows = content.split('\n');
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // ヘッダー行を作成
    const headers = rows[0].split(',');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerText = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // データ行を作成
    rows.slice(1).forEach(row => {
        const tableRow = document.createElement('tr');
        const cells = row.split(',');

        cells.forEach(cell => {
            const td = document.createElement('td');
            td.innerText = cell;
            tableRow.appendChild(td);
        });
        table.appendChild(tableRow);
    });

    outputDiv.appendChild(table);
}

function displaySidebarHeaders(content) {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = ''; // 既存の内容をクリア

    const rows = content.split('\n');
    const headers = rows[0].split(',');

    headers.forEach(header => {
        const h2 = document.createElement('h2');
        h2.innerText = header;
        sidebar.appendChild(h2);
    });
}

let selectedColumns = new Set(); // 選択された列のインデックスを管理するためのセット

document.addEventListener('click', (event) => {
    if (event.target.tagName === 'TH') {
        const thElements = Array.from(document.querySelectorAll('th'));
        const clickedIndex = thElements.indexOf(event.target);

        // 既に選択されている場合は選択解除
        if (selectedColumns.has(clickedIndex)) {
            selectedColumns.delete(clickedIndex);
            clearColumnSelection(clickedIndex);
        } else {
            selectedColumns.add(clickedIndex);
            highlightColumn(clickedIndex);
        }
    }
});

function highlightColumn(index) {
    // 指定された列にハイライトを追加
    const rows = document.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells[index]) {
            cells[index].classList.add('highlight');
        }
    });
}

function clearColumnSelection(index) {
    // 指定された列のハイライトを解除
    const rows = document.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells[index]) {
            cells[index].classList.remove('highlight');
        }
    });
}

document.getElementById('hideColumnButton').addEventListener('click', () => {
    selectedColumns.forEach(index => {
        hideColumn(index);
    });
});

function hideColumn(index) {
    const rows = document.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        if (cells[index]) {
            cells[index].style.display = 'none'; // 列を非表示
        }
    });
}

document.getElementById('showColumnButton').addEventListener('click', () => {
    showAllColumns();
});

function showAllColumns() {
    const rows = document.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        cells.forEach(cell => {
            cell.style.display = ''; // 全ての列を再表示
            cell.classList.remove('highlight'); // ハイライトを解除
        });
    });
    selectedColumns.clear(); // すべての列を再表示後、選択リストをクリア
}

// スタイルの追加（ハイライト用）
const style = document.createElement('style');
style.innerHTML = `
    .highlight {
        background-color: lightyellow;
    }
`;
document.head.appendChild(style);
