const buttons = document.querySelectorAll(".option-btn");
const continueBtn = document.getElementById("continueBtn");
const errorMessage = document.getElementById("error-message");

const roleOptions = document.getElementById("role-options");
const extraInfo = document.createElement("div");
extraInfo.id = "extra-info";
extraInfo.style.maxHeight = "0";
extraInfo.style.opacity = "0";
extraInfo.style.overflow = "hidden";
extraInfo.style.paddingTop = "0";
extraInfo.style.paddingBottom = "0";
extraInfo.style.transition = "max-height 0.5s ease, opacity 0.5s ease, padding 0.5s ease";
extraInfo.style.marginTop = "20px";
extraInfo.style.background = "#f0f8ff";
extraInfo.style.borderRadius = "10px";
extraInfo.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
extraInfo.style.maxWidth = "400px";
extraInfo.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
extraInfo.style.color = "#333";
extraInfo.innerHTML = `
  <label for="empresa-info" style="display:block; font-weight:600; margin-bottom:8px;">
    Se possível, poderia informar a empresa ou RH que está interessado?
  </label>
  <input 
    type="text" 
    id="empresa-info" 
    placeholder="Nome da empresa ou RH" 
    style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; font-size:1rem;"
  />
`;
roleOptions.insertAdjacentElement('afterend', extraInfo);

const empresaInfoInput = document.getElementById("empresa-info");

let selectedOptions = {
  role: null,
  source: null,
  empresaExtra: null
};

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const group = button.getAttribute("data-group");
    const alreadySelected = button.classList.contains("selected");

    document.querySelectorAll(`.option-btn[data-group="${group}"]`)
      .forEach(btn => btn.classList.remove("selected"));

    if (!alreadySelected) {
      button.classList.add("selected");
      selectedOptions[group] = button.innerText;

      if (group === "role") {
        if (button.innerText.toLowerCase().includes("recrutador")) {
          extraInfo.style.maxHeight = "200px";
          extraInfo.style.opacity = "1";
          extraInfo.style.paddingTop = "15px";
          extraInfo.style.paddingBottom = "15px";
        } else {
          extraInfo.style.maxHeight = "0";
          extraInfo.style.opacity = "0";
          extraInfo.style.paddingTop = "0";
          extraInfo.style.paddingBottom = "0";
          empresaInfoInput.value = "";
          selectedOptions.empresaExtra = null;
        }
      }
    } else {
      selectedOptions[group] = null;

      if (group === "role") {
        extraInfo.style.maxHeight = "0";
        extraInfo.style.opacity = "0";
        extraInfo.style.paddingTop = "0";
        extraInfo.style.paddingBottom = "0";
        empresaInfoInput.value = "";
        selectedOptions.empresaExtra = null;
      }
    }
  });
});

empresaInfoInput.addEventListener("input", () => {
  selectedOptions.empresaExtra = empresaInfoInput.value.trim();
});

extraInfo.classList.add("show");
extraInfo.classList.remove("show");

const firebaseConfig = {
  apiKey: "AIzaSyAVA8qHv3GaZm1Hjg5-1o-i6K4NKc8Ken8",
  authDomain: "meu-portfolio-67950.firebaseapp.com",
  projectId: "meu-portfolio-67950",
  storageBucket: "meu-portfolio-67950.firebasestorage.app",
  messagingSenderId: "303938424529",
  appId: "1:303938424529:web:c8a53db54d4349f7fdfff0",
  measurementId: "G-DLY2187FEN"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ Mantém apenas um listener no botão
continueBtn.addEventListener("click", () => {
  errorMessage.innerText = "";

  let errors = [];

  if (!selectedOptions.role) {
    errors.push("Escolha se você é visitante ou recrutador.");
  }

  if (!selectedOptions.source) {
    errors.push("Informe como você chegou até aqui.");
  }

  if (errors.length > 0) {
    errorMessage.innerText = errors.join(" ");
  } else {
    db.collection("visitas").add({
      role: selectedOptions.role,
      source: selectedOptions.source,
      empresaExtra: selectedOptions.empresaExtra || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log("Dados salvos com sucesso!", selectedOptions);

      // ✅ Redireciona após salvar com sucesso
      window.location.href = "inicial.html"; 

    })
    .catch((error) => {
      console.error("Erro ao salvar dados: ", error);
      errorMessage.innerText = "Erro ao salvar os dados. Tente novamente.";
    });
  }
});
