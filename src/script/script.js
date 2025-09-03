const API_URL = "https://levino-email-classifier.onrender.com"; //"http://127.0.0.1:8000";
const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const fileNameArea = document.getElementById("fileNameArea");
const inputTexteArea = document.getElementById("emailText");
const submitButton = document.getElementById("submit-btn");
const loading = document.getElementById("loading");
const responseCard = document.getElementById("responseCard");
const copyButton = document.getElementById("copyButton");

function classify() {
    console.log("classify");
    
    showLoading();
    clearResult();
    if(fileInput.files.length) {
        classificarArquivo();
    }else {
        classificarTexto();
    }
}

function showLoading() {
    console.log("showLoading")
    loading.style.display = "block";
    responseCard.style.display = "block";
}

function hideLoading() {
    loading.style.display = "none"
}

async function classificarTexto() {
    console.log("classificarTexto")
    
    const texto = inputTexteArea.value;

    const response = await fetch(`${API_URL}/process_email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: texto })
    });

    const data = await response.json();
    showResult(data);
}

async function classificarArquivo() {
    console.log("classificarArquivo");
    
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files[0].type !== "text/plain" && fileInput.files[0].type !== "application/pdf") {
        hideLoading();
        return alert("Selecione um arquivo .pdf ou .txt!");
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const response = await fetch(`${API_URL}/process_file`, {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    showResult(data);
}

function showResult(data) {
    console.log("showResult");
    
    
    clearfield();
    document.getElementById("categoria").textContent = data.categoria;
    document.getElementById("resposta").textContent = data.resposta;
    document.getElementById("resultado").style.display = "block";
    copyButton.style.display = "block";

    if (data.texto_extraido) {
        document.getElementById("details").style.display = "block";
        document.getElementById("textoExtraido").textContent = data.texto_extraido;
    }
}

function clearResult() {
    console.log("clearResult");

    document.getElementById("categoria").textContent = "";
    document.getElementById("resposta").textContent = "";
    document.getElementById("resultado").style.display = "none";
    document.getElementById("details").style.display = "none";
    document.getElementById("textoExtraido").textContent = "";
    copyButton.style.display = "none";
}

uploadArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    if (fileInput.files.length) {
        fileName.textContent = "📂 " + fileInput.files[0].name;
        inputTexteArea.setAttribute("disabled", "");
        fileNameArea.style.display = "block";
        submitButton.removeAttribute("disabled");
    }
});

uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
    if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        fileName.textContent = "📂 " + e.dataTransfer.files[0].name;
    }
    inputTexteArea.value = ""
    inputTexteArea.setAttribute("disabled", "");
    fileNameArea.style.display = "block";
    submitButton.disabled = false;
});

inputTexteArea.addEventListener("input", ()=> {
    if(inputTexteArea.value.trim() !== "") {
        submitButton.disabled = false;
    }else{
        submitButton.disabled = true;
    }
})

function copyResponse() {
    navigator.clipboard.writeText(document.getElementById("resposta").textContent)
}

function clearFile() {
    console.log("clearFile");
    
    fileInput.value = "";
    fileName.textContent = "";
    fileNameArea.style.display = "none";
    inputTexteArea.removeAttribute("disabled");
    submitButton.disabled = true;
}

function clearfield(){
    console.log("clearField");
    
    inputTexteArea.value = "";
    loading.style.display = "none"
    clearFile()
}