const API_BASE = 'http://localhost:3000/api';

// Tab Logic
document.querySelectorAll('.nav-links li').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.nav-links li').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const target = tab.getAttribute('data-tab');
        document.getElementById(target).classList.add('active');
    });
});

// Fetch & Render Organic Data (Crop-wise)
let allCrops = [];
async function fetchOrganicData() {
    try {
        const res = await fetch(`${API_BASE}/organic-data`);
        const result = await res.json();
        allCrops = result.crops;
        renderCrops(allCrops);
    } catch (e) {
        console.error("Failed to fetch crop data", e);
    }
}

function renderCrops(cropsToRender) {
    const pestGrid = document.getElementById('pesticides-grid');
    const fertGrid = document.getElementById('fertilizers-grid');
    
    let pestHTML = '';
    let fertHTML = '';

    cropsToRender.forEach(crop => {
        pestHTML += `<div class="data-card">
            <h3>${crop.name}</h3>
            <p><strong>Prone Diseases:</strong> ${crop.diseases}</p>
            <p><strong>Organic Solutions:</strong> ${crop.solutions}</p>
        </div>`;
        
        fertHTML += `<div class="data-card">
            <h3>${crop.name}</h3>
            <p><strong>Best Manures:</strong> ${crop.manures}</p>
        </div>`;
    });

    pestGrid.innerHTML = pestHTML;
    fertGrid.innerHTML = fertHTML;
}

// Search Logic
document.getElementById('search-pesticides').addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    renderCrops(allCrops.filter(c => c.name.toLowerCase().includes(val)));
    document.getElementById('search-fertilizers').value = val; // Sync searches
});

document.getElementById('search-fertilizers').addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    renderCrops(allCrops.filter(c => c.name.toLowerCase().includes(val)));
    document.getElementById('search-pesticides').value = val; // Sync searches
});

// Gov Schemes
async function fetchSchemes() {
    try {
        const res = await fetch(`${API_BASE}/schemes`);
        const result = await res.json();
        const schemesGrid = document.getElementById('schemes-grid');
        schemesGrid.innerHTML = result.data.map(s => `
            <div class="data-card">
                <h3>${s.name}</h3>
                <p>${s.description}</p>
                <a href="${s.link}" target="_blank">Learn More →</a>
            </div>
        `).join('');
    } catch (e) { console.error("Failed schemes", e); }
}

// Initialization
fetchOrganicData();
fetchSchemes();
