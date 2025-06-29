document.addEventListener('DOMContentLoaded', () => {
    let pagina = /*[[${pagina}]]*/ 1;
    let ultima = /*[[${ultima}]]*/ false;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageNumberSpan = document.getElementById('pageNumber');
    const activitiesContainer = document.getElementById('activitiesContainer');

    prevBtn.addEventListener('click', () => {
        if (pagina > 1) {
            pagina--;
            loadPage(pagina);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (ultima) return;
        pagina++;
        loadPage(pagina);
    });

    async function loadPage(page) {
        try {
            const response = await fetch(`/activities/evaluate?nPage=${page}`, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            });
            if (!response.ok) throw new Error('Error de red');

            const html = await response.text();

            activitiesContainer.innerHTML = html;
            pageNumberSpan.textContent = page;
            const ultimaAttr = activitiesContainer.querySelector('[data-ultima]');
            ultima = ultimaAttr ? (ultimaAttr.getAttribute('data-ultima') === 'true') : false;
            prevBtn.disabled = page <= 1;
            nextBtn.disabled = ultima;
        } catch (error) {
            console.error('Error cargando página:', error);
        }
    }
});