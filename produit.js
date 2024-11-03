document.addEventListener('DOMContentLoaded', function() {
    const addItemForm = document.getElementById('addItemForm');
    const categoryField = document.getElementById('categoryField');
    const productLinkField = document.getElementById('productLinkField');
    const dataBody = document.getElementById('dataBody');

    // Fonction pour charger les données depuis le local storage
    function loadSavedData() {
        const savedItems = JSON.parse(localStorage.getItem('items')) || [];
        savedItems.forEach(item => {
            if (item.category && item.productLink) {
                appendRowToTable(item.category, item.productLink);
            }
        });
    }

    // Fonction pour ajouter une ligne au tableau
    function appendRowToTable(category, productLink) {
        const row = document.createElement('tr');

        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;

        const productCell = document.createElement('td');
        const linkElement = document.createElement('a');
        linkElement.href = productLink;
        linkElement.textContent = productLink;
        linkElement.target = '_blank'; // Ouvrir le lien dans un nouvel onglet
        productCell.appendChild(linkElement);

        row.appendChild(categoryCell);
        row.appendChild(productCell);

        dataBody.appendChild(row);
    }

    // Fonction pour enregistrer les données dans le local storage
    function saveTableData() {
        const rows = dataBody.querySelectorAll('tr');
        const items = Array.from(rows).map(row => {
            const cells = row.querySelectorAll('td');
            const category = cells[0].textContent.trim();
            const productLink = cells[1].querySelector('a').href.trim();
            return {
                category,
                productLink
            };
        }).filter(item => item.category && item.productLink); // Filtrer les entrées vides

        localStorage.setItem('items', JSON.stringify(items));
    }

    // Événement de soumission du formulaire
    addItemForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire

        const category = categoryField.value.trim();
        const productLink = productLinkField.value.trim();

        if (category && productLink) {
            appendRowToTable(category, productLink);
            saveTableData(); // Enregistre les données dans le local storage
            addItemForm.reset(); // Réinitialise le formulaire
        }
    });

    // Charge les données au chargement de la page
    loadSavedData();
});