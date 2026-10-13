/* =========================================================
   Données de Vampiredle : The Vampire Diaries
   =========================================================

   Format d'une ligne :
   nom|genre|espèce|famille|cheveux|saison|rôle

   - genre   : Homme / Femme
   - espèce  : Humain, Vampire, Sorcier, Loup-garou, Hybride, Doppelgänger
               (plusieurs valeurs séparées par "/", ex. "Humain/Vampire")
   - famille : nom de famille ("Aucune" si le personnage n'en a pas)
   - cheveux : Brun, Blond ou Noir
   - saison  : saison de la première apparition (1 à 8)
   - rôle    : Héros, Allié ou Méchant

   ⚠ Données écrites de mémoire : vérifie-les et corrige-les à ta guise.
   ========================================================= */

const PERSONNAGES_BRUTS = `
Elena Gilbert|Femme|Humain/Vampire/Doppelgänger|Gilbert|Brun|1|Héros
Stefan Salvatore|Homme|Vampire|Salvatore|Brun|1|Héros
Damon Salvatore|Homme|Vampire|Salvatore|Noir|1|Héros
Bonnie Bennett|Femme|Sorcier|Bennett|Brun|1|Héros
Caroline Forbes|Femme|Humain/Vampire|Forbes|Blond|1|Héros
Matt Donovan|Homme|Humain|Donovan|Blond|1|Allié
Tyler Lockwood|Homme|Loup-garou/Hybride|Lockwood|Brun|1|Allié
Jeremy Gilbert|Homme|Humain|Gilbert|Brun|1|Allié
Alaric Saltzman|Homme|Humain/Vampire|Saltzman|Brun|2|Allié
Jenna Sommers|Femme|Humain|Sommers|Brun|1|Allié
Vicki Donovan|Femme|Humain/Vampire|Donovan|Blond|1|Allié
Liz Forbes|Femme|Humain|Forbes|Blond|1|Allié
Carol Lockwood|Femme|Humain|Lockwood|Brun|1|Allié
Mason Lockwood|Homme|Loup-garou|Lockwood|Brun|1|Méchant
Sheila Bennett|Femme|Sorcier|Bennett|Brun|1|Allié
Abby Bennett|Femme|Sorcier|Bennett|Brun|2|Allié
Lexi Branson|Femme|Vampire|Branson|Blond|1|Allié
Rosemary|Femme|Vampire|Aucune|Brun|1|Allié
Trevor|Homme|Vampire|Aucune|Brun|1|Méchant
Katherine Pierce|Femme|Vampire/Doppelgänger|Petrova|Brun|1|Méchant
Isobel Flemming|Femme|Humain/Vampire|Flemming|Brun|1|Méchant
John Gilbert|Homme|Humain|Gilbert|Brun|1|Méchant
Giuseppe Salvatore|Homme|Humain|Salvatore|Brun|1|Méchant
Klaus Mikaelson|Homme|Vampire/Loup-garou/Hybride|Mikaelson|Blond|2|Méchant
Elijah Mikaelson|Homme|Vampire|Mikaelson|Brun|2|Allié
Rebekah Mikaelson|Femme|Vampire|Mikaelson|Blond|2|Allié
Kol Mikaelson|Homme|Vampire|Mikaelson|Brun|3|Méchant
Esther Mikaelson|Femme|Sorcier|Mikaelson|Brun|3|Méchant
Silas|Homme|Sorcier/Doppelgänger|Aucune|Brun|4|Méchant
Qetsiyah|Femme|Sorcier|Aucune|Brun|4|Méchant
Nadia Petrova|Femme|Vampire/Doppelgänger|Petrova|Brun|5|Méchant
Enzo|Homme|Vampire|Aucune|Brun|5|Allié
Lily Salvatore|Femme|Vampire|Salvatore|Brun|6|Méchant
Kai Parker|Homme|Sorcier|Parker|Brun|6|Méchant
Julian|Homme|Vampire|Aucune|Brun|6|Méchant
Roh-roh|Femme|Humain|Rousseau|Brun|0|Soeur
`.trim();

const PERSONNAGES = PERSONNAGES_BRUTS.split("\n").map(ligne => {
  const [nom, genre, espece, famille, cheveux, saison, role] = ligne.split("|");
  return { nom, genre, espece, famille, cheveux, saison: Number(saison), role };
});

function trouverPersonnage(nom) {
  return PERSONNAGES.find(personnage => personnage.nom === nom);
}

/*
 * Citations : ["Nom exact du personnage", "Réplique en français.", "Original line (optionnel)"]
 * Le mode Citation s'active tout seul dès qu'au moins 3 personnages différents
 * ont une réplique.
 */
const CITATIONS = [
  "Roh-roh", "Ma viiiiiie", ""
].map(([nom, fr, en]) => ({
  personnage: trouverPersonnage(nom),
  citation: fr,
  original: en || ""
})).filter(citation => citation.personnage);
