/* =========================================================
   Données de Lotusdle (The White Lotus, saisons 1 à 3)
   ========================================================= */

const GENRES = { H: "Homme", F: "Femme" };

const STATUTS = {
  C: "Client",
  E: "Employé",
  D: "Direction",
  L: "Local",
  A: "Autre"
};

const SAISONS = { 1: "Hawaï", 2: "Sicile", 3: "Thaïlande" };

const ORIGINES = {
  US: "États-Unis",
  HW: "Hawaï",
  GB: "Royaume-Uni",
  IT: "Italie",
  TH: "Thaïlande",
  CA: "Canada",
  RU: "Russie",
  DE: "Allemagne"
};

const DESTINS = { V: "Survit", M: "Meurt" };

/*
 * Format d'une ligne :
 * nom|genre|statut(s)|saison(s)|origine|groupe|destin|âge|acteur
 *
 * - statut et saisons peuvent contenir plusieurs valeurs : "13" = saisons 1 et 3.
 * - le destin est celui de la dernière saison où le personnage apparaît.
 * - l'âge est approximatif (estimé pendant la saison).
 * - le groupe est la famille / le groupe de voyage (Staff, Solo, Locaux sinon).
 */
const PERSONNAGES_BRUTS = `
Armond|H|D|1|US|Staff|M|45|Murray Bartlett
Belinda Lindsey|F|E|13|US|Staff|V|38|Natasha Rothwell
Tanya McQuoid|F|C|12|US|Hunt|M|55|Jennifer Coolidge
Nicole Mossbacher|F|C|1|US|Mossbacher|V|45|Connie Britton
Mark Mossbacher|H|C|1|US|Mossbacher|V|47|Steve Zahn
Olivia Mossbacher|F|C|1|US|Mossbacher|V|19|Sydney Sweeney
Quinn Mossbacher|H|C|1|US|Mossbacher|V|16|Fred Hechinger
Paula|F|C|1|US|Mossbacher|V|20|Brittany O'Grady
Shane Patton|H|C|1|US|Patton|V|31|Jake Lacy
Rachel Patton|F|C|1|US|Patton|V|27|Alexandra Daddario
Kitty Patton|F|C|1|US|Patton|V|62|Molly Shannon
Kai|H|E|1|HW|Staff|V|25|Kekoa Scott Kekumano
Lani|F|E|1|HW|Staff|V|22|Jolene Purdy
Dillon|H|E|1|US|Staff|V|25|Lukas Gage
Greg Hunt|H|C|123|US|Hunt|V|55|Jon Gries
Portia|F|A|2|US|Hunt|V|22|Haley Lu Richardson
Bert Di Grasso|H|C|2|US|Di Grasso|V|80|F. Murray Abraham
Dominic Di Grasso|H|C|2|US|Di Grasso|V|52|Michael Imperioli
Albie Di Grasso|H|C|2|US|Di Grasso|V|21|Adam DiMarco
Daphne Sullivan|F|C|2|US|Sullivan|V|33|Meghann Fahy
Cameron Sullivan|H|C|2|US|Sullivan|V|38|Theo James
Harper Spiller|F|C|2|US|Spiller|V|35|Aubrey Plaza
Ethan Spiller|H|C|2|US|Spiller|V|35|Will Sharpe
Quentin|H|L|2|GB|Locaux|M|60|Tom Hollander
Jack|H|A|2|GB|Solo|V|28|Leo Woodall
Valentina|F|D|2|IT|Staff|V|45|Sabrina Impacciatore
Lucia Greco|F|L|2|IT|Locaux|V|24|Simona Tabasco
Mia|F|L|2|IT|Locaux|V|22|Beatrice Grannò
Rocco|H|E|2|IT|Staff|V|30|Federico Ferrante
Isabella|F|E|2|IT|Staff|V|28|Eleonora Romandini
Rick Hatchett|H|C|3|US|Solo|M|50|Walton Goggins
Chelsea|F|C|3|GB|Solo|M|30|Aimee Lou Wood
Jim Hollinger|H|C|3|US|Hollinger|M|70|Scott Glenn
Sritala Hollinger|F|D|3|TH|Hollinger|V|55|Lek Patravadi
Kate Bohr|F|C|3|US|Amies|V|45|Leslie Bibb
Laurie Duffy|F|C|3|US|Amies|V|47|Carrie Coon
Jaclyn Lemon|F|C|3|US|Amies|V|40|Michelle Monaghan
Timothy Ratliff|H|C|3|US|Ratliff|V|55|Jason Isaacs
Victoria Ratliff|F|C|3|US|Ratliff|V|52|Parker Posey
Saxon Ratliff|H|C|3|US|Ratliff|V|24|Patrick Schwarzenegger
Piper Ratliff|F|C|3|US|Ratliff|V|21|Sarah Catherine Hook
Lochlan Ratliff|H|C|3|US|Ratliff|V|17|Sam Nivola
Zion Lindsey|H|C|3|US|Lindsey|V|22|Nicholas Duvernay
Gaitok|H|E|3|TH|Staff|V|25|Tayme Thapthimthong
Mook|F|E|3|TH|Staff|V|25|Lalisa Manobal
Pornchai|H|E|3|TH|Staff|V|40|Dom Hetrakul
Fabian|H|D|3|DE|Staff|V|40|Christian Friedel
Valentin|H|E|3|RU|Staff|V|30|Arnas Fedaravicius
Chloe|F|C|3|CA|Solo|V|27|Charlotte Le Bon
Frank|H|C|3|US|Solo|V|52|Sam Rockwell
`.trim();

const PERSONNAGES = PERSONNAGES_BRUTS.split("\n").map(ligne => {
  const [nom, genre, statut, saisons, origine, groupe, destin, age, acteur] = ligne.split("|");
  return { nom, genre, statut, saisons, origine, groupe, destin, age: Number(age), acteur };
});

function trouverPersonnage(nom) {
  return PERSONNAGES.find(personnage => personnage.nom === nom);
}

/*
 * Citations : [personnage, traduction française, version originale (optionnelle)]
 *
 * Les répliques ci-dessous viennent de citations publiées (Elite Daily pour
 * Tanya, comptes rendus d'épisodes pour Daphne et Belinda) ; les traductions
 * françaises sont libres.
 *
 * Le mode Citation s'active tout seul dès qu'au moins 3 personnages
 * différents ont une réplique. Pour en ajouter, copie une ligne et change
 * le nom (il doit être écrit exactement comme dans la liste ci-dessus).
 */
const CITATIONS = [
  ["Tanya McQuoid", "Ne passez pas votre vie à courir après des hommes émotionnellement indisponibles.", "Don't spend your life chasing emotionally unavailable men."],
  ["Tanya McQuoid", "Au cœur de l’oignon, Belinda, il n’y a qu’une alcoolique complètement cinglée.", "At the core of the onion, Belinda, is just a straight-up alcoholic lunatic."],
  ["Tanya McQuoid", "Ce sont des gays haut de gamme !", "These are some high-end gays!"],
  ["Tanya McQuoid", "Ma vie amoureuse est une ruine.", "My love life is a ruin."],
  ["Tanya McQuoid", "Je n’ai que quatre mains.", "I only have four hands."],
  ["Tanya McQuoid", "Je suis quelqu’un de très dépendant, et je suis profondément, profondément peu sûre de moi.", "I'm a very needy person, and I am deeply, deeply insecure."],
  ["Tanya McQuoid", "Ces gays ! Ils essaient de me tuer !", "These gays! They're trying to murder me!"],
  ["Tanya McQuoid", "Oh mon dieu, suis-je en train de donner ma mère à manger aux poissons ?", "Oh my god, am I feeding my mother to the fishes?"],
  ["Daphne Sullivan", "Je regarde beaucoup de Dateline.", "I do a lot of Dateline."],
  ["Daphne Sullivan", "Tu n’as pas besoin de tout savoir pour aimer quelqu’un.", "You don't have to know everything to love someone."],
  ["Belinda Lindsey", "Un conseil ? Je n’en ai plus.", "My advice? I'm all out."],
  ["Armond", "Et nous, on est leurs méchantes mamans qui leur refusent leur chambre avec vue sur l’ananas.", "And we are their mean mummies, denying them their pineapple room."],
  ["Armond", "J'ai assuré pour le dîner !", "I nailed dinner !"],
  ["Victoria Ratliff", "Je ne pense pas qu'à cet âge, je suis faite pour vivre une vie inconfortable.", "I just don't think, at this age, that I'm meant to live an uncomfortable life."],
  ["Victoria Ratliff", "Si cet homme étrange veut avoir mon bébé, il ferait mieux d'être le meilleur bouddhiste de Chine. ", "If that strange man is going to have my baby, he'd better be the best Buddhist in China."],
  ["Chelsea", "Sortir avec toi serait une expérience vide de sens. Parce que je le sais. Parce que tu n'as pas d'âme.", "Dating you would be a meaningless experience. Because I know it. Because you have no soul."],
].map(([nom, fr, en]) => ({
  personnage: trouverPersonnage(nom),
  citation: fr,
  original: en || ""
})).filter(citation => citation.personnage);
