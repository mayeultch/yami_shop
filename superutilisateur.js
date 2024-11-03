document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('tableBody');
    const blocks = JSON.parse(localStorage.getItem('blocks')) || [];


    const blocksTable = document.getElementById('blocksTable');
    blocksTable.style.width = '90%';
    blocksTable.style.margin = 'auto';
    blocksTable.style.marginBottom = '40px';
    blocksTable.style.border = '2px solid #ccc';
    blocksTable.style.borderRadius = '10px';
    blocksTable.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    blocksTable.style.backgroundColor = '#f9f9f9';
    blocksTable.style.fontFamily = 'Arial, sans-serif';
    blocksTable.style.fontSize = '14px';

    function renderTable() {
        tableBody.innerHTML = '';

        blocks.forEach((block, index) => {
            const tableRow = document.createElement('tr');

            
            tableRow.style.borderBottom = '1px solid #ddd';

            
            const svgCell = document.createElement('td');
            const svg = document.createElement('div');
            svg.innerHTML = block.svg;
            svg.setAttribute('style', 'color: blue; max-width: 80px; max-height: 80px; overflow: hidden; margin: auto;');
            svgCell.appendChild(svg);
            svgCell.style.padding = '10px';
            svgCell.style.textAlign = 'center';
            svgCell.style.wordBreak = 'break-word';

            
            const linkTextCell = document.createElement('td');
            linkTextCell.textContent = block.linkText;
            linkTextCell.setAttribute('style', 'font-size: 18px; color: #2c8279;');
            linkTextCell.style.padding = '10px';
            linkTextCell.style.textAlign = 'center';
            linkTextCell.style.wordBreak = 'break-word';

            
            const linkHrefCell = document.createElement('td');
            const link = document.createElement('a');
            link.href = block.linkHref;
            link.textContent = block.linkHref;
            link.setAttribute('style', 'color: #2c8279; text-decoration: underline;');
            linkHrefCell.appendChild(link);
            linkHrefCell.style.padding = '10px';
            linkHrefCell.style.textAlign = 'center';
            linkHrefCell.style.wordBreak = 'break-word';

            //(Edit and Save)
            const actionsCell = document.createElement('td');
            actionsCell.setAttribute('style', 'text-align: center; padding: 10px;');

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.style.padding = '5px 10px';
            editButton.style.marginRight = '5px';
            editButton.style.cursor = 'pointer';
            editButton.style.borderRadius = '5px';
            editButton.style.border = '1px solid #ccc';
            editButton.style.backgroundColor = '#e7e7e7';
            editButton.addEventListener('click', function() {
                editBlock(index);
            });

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.style.padding = '5px 10px';
            saveButton.style.cursor = 'pointer';
            saveButton.style.borderRadius = '5px';
            saveButton.style.border = '1px solid #ccc';
            saveButton.style.backgroundColor = '#4CAF50';
            saveButton.style.color = '#fff';
            saveButton.style.display = 'none';
            saveButton.addEventListener('click', function() {
                saveBlock(index);
            });

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(saveButton);

            
            tableRow.appendChild(svgCell);
            tableRow.appendChild(linkTextCell);
            tableRow.appendChild(linkHrefCell);
            tableRow.appendChild(actionsCell);

            tableBody.appendChild(tableRow);

            // Edit Function
            function editBlock(index) {
                svg.innerHTML = `<textarea style="width: 100%; height: 100%;">${blocks[index].svg}</textarea>`;
                linkTextCell.innerHTML = `<input type="text" value="${blocks[index].linkText}" style="width: 100%;">`;
                linkHrefCell.innerHTML = `<input type="url" value="${blocks[index].linkHref}" style="width: 100%;">`;
                editButton.style.display = 'none';
                saveButton.style.display = 'inline-block';
            }

            // Save Function
            function saveBlock(index) {
                const newSVG = svg.querySelector('textarea').value;
                const newLinkText = linkTextCell.querySelector('input').value;
                const newLinkHref = linkHrefCell.querySelector('input').value;

                blocks[index] = { svg: newSVG, linkText: newLinkText, linkHref: newLinkHref };
                localStorage.setItem('blocks', JSON.stringify(blocks));

                renderTable();
            }
        });
    }

    function handleResize() {
        const tableCells = tableBody.querySelectorAll('td');
        tableCells.forEach(cell => {
            cell.style.maxWidth = '200px';
            cell.style.overflow = 'hidden';
            cell.style.textOverflow = 'ellipsis';
        });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    renderTable(); 
});
