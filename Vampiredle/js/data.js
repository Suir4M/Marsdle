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
Roh-roh|Femme|Humain|Rousseau|Brun|0|Soeur
`.trim();
/**
Silas|Homme|Sorcier/Doppelgänger|Aucune|Brun|4|Méchant
Qetsiyah|Femme|Sorcier|Aucune|Brun|4|Méchant
Nadia Petrova|Femme|Vampire/Doppelgänger|Petrova|Brun|5|Méchant
Enzo|Homme|Vampire|Aucune|Brun|5|Allié
Lily Salvatore|Femme|Vampire|Salvatore|Brun|6|Méchant
Kai Parker|Homme|Sorcier|Parker|Brun|6|Méchant
Julian|Homme|Vampire|Aucune|Brun|6|Méchant
 */

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
  ["Roh-roh", "Ma viiiiiie.", ""],
  ["Damon Salvatore", "Salut, frangin !", "Hello, brother !"],
  ["Damon Salvatore", "Transmets mes amitiés aux écureuils.", ""],
  ["Damon Salvatore", "Ce mec c'est witchkipedia.", ""],
  ["Damon Salvatore", "N'importe qui. N'importe quand. N'importe où.", ""],
  ["Damon Salvatore", "J'ai été amoureux, c'est douloureux, inutile, et sur-coté.", ""],
  ["Damon Salvatore", "Quand je tue des gens, ils sont supposés rester morts.", ""],
  ["Damon Salvatore", "Je suis là pour manger de la barbe à papa et te voler ta copine.", ""],
  ["Klaus Mikaelson", "Ne sous-estime pas l'attrait des ténèbres, Stefan, même les cœurs les plus purs y sont attirés.", ""],
  ["Klaus Mikaelson", "J'ai essayé d'arrêter de penser à toi. Et je ne peux pas.", ""],
  ["Klaus Mikaelson", "Et bien ce n'est pas difficile d'être  loyal quand tu es dans l'équipe gagnante.", ""],
  ["Klaus Mikaelson", "La question importante c'est qui je suis", ""],
  ["Stefan Salvatore", "Je suis un vampire... Et voici mon histoire.", ""],
  ["Stefan Salvatore", "Ne flirte pas avec moi, Katherine.", ""],
  ["Stefan Salvatore", "Nous choisissons notre propre chemin. Nos valeurs et nos actions, ils définnissent ce que nous sommes.", ""],
  ["Elena Gilbert", "Nos actes ont toujours des conséquences... Mais il faut qu'on vive avec.", ""],
  ["Elena Gilbert", "La confiance engendre la confiance, on l'obtient quand on l'accorde.", ""],
  ["Elena Gilbert", "Je ne vois pas comment je pourrais être plus en sécurité, j'ai Damon le psychopathe égoïste dans mon camp !", ""],
  ["Elena Gilbert", "C'est ce que t'es en train de faire ? Essayer de me faire te haïr ?", ""],
  ["Katherine Pierce", "Embrasse-moi ou tue moi.", ""],
  ["Katherine Pierce", "Mieux vaut vous que moi.", ""],
  ["Katherine Pierce", "Il est juste à côté de moi. Même si son coeur est à l'autre bout de la pièce.", ""],
  ["Katherine Pierce", "Tu peux les aimer tous les deux, moi je l'ai bien fait.", ""],
  ["Katherine Pierce", "Les gens changent, je ne suis plus la fille que tu pense que je suis.", "People change, I'm not the girl you think I am."],
  ["Tyler Lockwood", "La seule chose que j'aime chez moi, c'est toi.", ""],
  ["Lexi Branson", "Si tu veux être avec quelqu'un pour toujours, il faut vivre pour toujours.", ""],
  ["Isobel Flemming", "Je suis tellement désolée, Elena... d'avoir été une telle déception pour toi.", ""],
  ["Alaric Saltzman","Quelle meilleure cachette que celle dont l'auteur est introuvable ?",""],
  ["Rebekah Mikaelson", "Tais-toi, ou la prochaine chose qui sortira de ta bouche, ce sont tes dents.", ""],
].map(([nom, fr, en]) => ({
  personnage: trouverPersonnage(nom),
  citation: fr,
  original: en || ""
})).filter(citation => citation.personnage);
