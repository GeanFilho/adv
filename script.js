// --- Configuração ---
const WHATSAPP_NUMBER = "5511999999999"; // SUBSTITUA AQUI

// --- Dados dos Artigos ---
const articlesData = {
    1: {
        category: "Direito Previdenciário",
        title: "Como funciona o BPC/LOAS para autistas?",
        content: `
            <p>O Benefício de Prestação Continuada (BPC/LOAS) é um direito garantido. No caso do autismo (TEA), o enquadramento como deficiência já é pacificado.</p>
            <h3>Requisitos:</h3>
            <ul>
                <li>Laudo Médico atualizado.</li>
                <li>Renda familiar per capita inferior a 1/4 do salário mínimo (pode ser flexibilizado judicialmente).</li>
            </ul>
            <p>Se o INSS negou, nossa equipe pode analisar a viabilidade de uma ação judicial.</p>
        `
    },
    2: {
        category: "Direito Trabalhista",
        title: "Rescisão Indireta: Quando o patrão erra",
        content: `
            <p>A rescisão indireta ocorre quando a empresa comete faltas graves, tornando insustentável a continuidade do trabalho.</p>
            <h3>Principais Motivos:</h3>
            <ul>
                <li>Atraso constante de salários.</li>
                <li>Não recolhimento de FGTS.</li>
                <li>Assédio moral.</li>
            </ul>
            <p>Você pode sair recebendo todos os direitos, como se fosse demitido sem justa causa.</p>
        `
    },
    3: {
        category: "INSS",
        title: "Auxílio Doença negado? Saiba o que fazer",
        content: `
            <p>O indeferimento é comum, mas não é o fim. Muitas vezes o perito do INSS não é especialista na sua doença.</p>
            <h3>Como reverter:</h3>
            <p>A melhor via é a ação judicial, onde um perito de confiança do juiz fará uma nova avaliação imparcial.</p>
        `
    }
};

// --- Menu Mobile ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// --- WhatsApp Helper ---
function redirectToWhatsapp(msg) {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}
document.getElementById('whatsapp-float').addEventListener('click', (e) => {
    e.preventDefault();
    redirectToWhatsapp("Olá, acessei o site e gostaria de falar com um advogado.");
});

// --- Modal Logic ---
const modal = document.getElementById('article-modal');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalContent = document.getElementById('modal-content');
const modalShareBtn = document.getElementById('modal-share-btn');
const closeModal = document.getElementById('close-modal');

document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const data = articlesData[id];
        if(data) {
            modalTitle.innerText = data.title;
            modalCategory.innerText = data.category;
            modalContent.innerHTML = data.content;
            modalShareBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Li o artigo sobre "${data.title}" e tenho dúvida.`;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// --- Calculadoras ---
document.getElementById('form-trabalhista').addEventListener('submit', (e) => {
    e.preventDefault();
    const salario = parseFloat(document.getElementById('salario').value);
    const meses = parseInt(document.getElementById('meses').value);
    // Calculo simples para estimativa
    let total = salario + (salario/12 * meses) + (salario * 0.08 * meses * 1.4); 
    document.getElementById('valor-rescisao').innerText = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    document.getElementById('resultado-trabalhista').classList.remove('hidden');
});

document.getElementById('form-previdencia').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('texto-previdencia').innerText = "Com base na sua idade, é fundamental uma análise de planejamento previdenciário.";
    document.getElementById('resultado-previdencia').classList.remove('hidden');
});