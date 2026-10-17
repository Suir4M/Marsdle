/* =========================================================
   Champ de recherche des personnages / sorts
   ========================================================= */

function creerPicker(
  element,
  onSelect,
  getUsedNames,
  liste = PERSONNAGES,
  placeholder = "Nom d’un personnage…"
) {
  element.innerHTML = `
    <input placeholder="${placeholder}" autocomplete="off">
    <div class="sg"></div>
  `;

  const input = element.querySelector("input");
  const suggestions = element.querySelector(".sg");

  function mettreAJourSuggestions() {
    const recherche = normaliser(input.value);
    suggestions.innerHTML = "";

    if (!recherche) return;

    const nomsUtilises = getUsedNames();

    liste
      .filter(item =>
        normaliser(item.nom).includes(recherche) &&
        !nomsUtilises.includes(item.nom)
      )
      .slice(0, 6)
      .forEach(item => {
        const bouton = document.createElement("button");
        bouton.textContent = item.nom;

        bouton.type = "button";

        bouton.addEventListener("click", () => {
          input.value = "";
          suggestions.innerHTML = "";
          onSelect(item);
        });

        suggestions.append(bouton);
      });
  }


  suggestions.addEventListener("mousedown", event => event.preventDefault());

  input.addEventListener("input", mettreAJourSuggestions);

  input.addEventListener("keydown", event => {
    if (event.key === "Enter" && suggestions.firstChild) {
      suggestions.firstChild.click();
    }
  });
}
