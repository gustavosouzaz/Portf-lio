const buttons = document.querySelectorAll(".option-btn");
const continueBtn = document.getElementById("continueBtn");
const errorMessage = document.getElementById("error-message");

const extraInfo = document.getElementById("extra-info");
const empresaInfoInput = document.getElementById("empresa-info");

let selectedOptions = {
  role: null,
  source: null,
  empresaExtra: null  // para guardar o texto da nova aba
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

      // Exibe ou esconde a aba extra só quando for recrutador no grupo role
      if (group === "role") {
        if (button.innerText.toLowerCase() === "recrutador") {
          extraInfo.style.display = "block";
        } else {
          extraInfo.style.display = "none";
          empresaInfoInput.value = "";
          selectedOptions.empresaExtra = null;
        }
      }

    } else {
      selectedOptions[group] = null;

      if (group === "role") {
        extraInfo.style.display = "none";
        empresaInfoInput.value = "";
        selectedOptions.empresaExtra = null;
      }
    }
  });
});

// Atualiza o texto extra no objeto quando o usuário digitar
empresaInfoInput.addEventListener("input", () => {
  selectedOptions.empresaExtra = empresaInfoInput.value.trim();
});

continueBtn.addEventListener("click", () => {
  errorMessage.innerText = "";

  let errors = [];

  if (!selectedOptions.role) {
    errors.push("Escolha se você é visitante ou recrutador.");
  }

  if (!selectedOptions.source) {
    errors.push("Informe como você chegou até aqui.");
  }

  // Aqui não está obrigado, só opcional

  if (errors.length > 0) {
    errorMessage.innerText = errors.join(" ");
  } else {
    console.log("Tudo certo!", selectedOptions);
  }
});
