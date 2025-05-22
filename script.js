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

    // Desmarca todos do mesmo grupo
    document.querySelectorAll(`.option-btn[data-group="${group}"]`)
      .forEach(btn => btn.classList.remove("selected"));

    if (!alreadySelected) {
      button.classList.add("selected");
      selectedOptions[group] = button.innerText;

      if (group === "role") {
        if (button.innerText.toLowerCase().includes("recrutador")) {
          // Mostrar com animação
          extraInfo.style.maxHeight = "200px";
          extraInfo.style.opacity = "1";
          extraInfo.style.paddingTop = "15px";
          extraInfo.style.paddingBottom = "15px";
        } else {
          // Esconder com animação
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

extraInfo.classList.add("show"); // para mostrar
extraInfo.classList.remove("show"); // para esconder


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
    console.log("Tudo certo!", selectedOptions);
  }
});

const firebaseConfig = {
  apiKey: "xxxx",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "xxxx",
  appId: "xxxx"
};
