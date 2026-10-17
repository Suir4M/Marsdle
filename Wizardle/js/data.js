/* =========================================================
   Données de Wizardle
   ========================================================= */

const GENRES = { H: "Homme", F: "Femme", A: "Aucun" };
const ESPECES = {
  S: "Sorcier",
  M: "Moldu",
  Q: "Cracmol",
  G: "Géant",
  L: "Loup-garou",
  B: "Gobelin",
  V: "Vélane",
  E: "Elfe",
  F: "Fantôme",
  P: "Phénix",
  H: "Hippogriffe",
  A: "Acromentule",
  N: "Serpent",
  U: "Hibou",
  C: "Chien",
  T: "Cerbère",
  Z: "Fléreur",
  O: "Objet enchanté",
  K: "Roi des Serpents"
};
const MAISONS = {
  G: "Gryffondor",
  S: "Serpentard",
  P: "Poufsouffle",
  D: "Serdaigle",
  A: "Aucune"
};
const ROLES = {
  E: "Élève",
  P: "Professeur",
  M: "Mangemort",
  Y: "Ministère",
  O: "Ordre du Phénix",
  F: "Fondateur",
  R: "Rat",
  S: "Soeur",
  A: "Autre"
};


const PERSONNAGES_BRUTS = `
Harry Potter|H|S|G|E/O|1|1980
Hermione Granger|F|S|G|E/O|1|1979
Ron Weasley|H|S|G|E/O|1|1980
Neville Londubat|H|S|G|E|1|1980
Albus Dumbledore|H|S|G|P/O|1|1881
Aberforth Dumbledore|H|S|A|A|1|1884
Minerva McGonagall|F|S|G|P|1|1935
Sibylle Trelawney|F|S|A|P|3|1962
Severus Rogue|H|S|S|P/M/O|1|1960
Rubeus Hagrid|H|S/G|G|P/O|1|1928
Drago Malefoy|H|S|S|E/M|1|1980
Vernon Dursley|H|M|A|A|1|1943
Pétunia Dursley|F|M|A|A|1|1958
Dudley Dursley|H|M|A|A|1|1980
Marge Dursley|F|M|A|A|3|1945
Lord Voldemort|H|S|S|M|1|1926
Quirinus Quirrell|H|S|D|P|1|1957
Fred Weasley|H|S|G|E/O|1|1978
George Weasley|H|S|G|E/O|1|1978
Ginny Weasley|F|S|G|E/O|1|1981
Percy Weasley|H|S|G|E/Y|1|1976
Molly Weasley|F|S|A|O|1|1949
Arthur Weasley|H|S|G|Y/O|2|1950
Olivier Dubois|H|S|G|E|1|1973
Lee Jordan|H|S|G|E|1|1978
Seamus Finnigan|H|S|G|E|1|1980
Dean Thomas|H|S|G|E|1|1980
Parvati Patil|F|S|G|E|1|1980
Padma Patil|F|S|D|E|1|1980
Lavande Brown|F|S|G|E|1|1980
Colin Crivey|H|S|G|E|2|1981
Cédric Diggory|H|S|P|E|3|1977
Amos Diggory|H|S|A|Y|3|1950
Cho Chang|F|S|D|E|3|1979
Luna Lovegood|F|S|D|E|5|1981
Xenophilius Lovegood|H|S|D|A|7|1948
Gilderoy Lockhart|H|S|D|P|2|1964
Dobby|H|E|A|A|2|1930
Kreattur|H|E|A|A|5|1880
Sirius Black|H|S|G|O|3|1959
Remus Lupin|H|S/L|G|P/O|3|1960
Peter Pettigrow|H|S|G|M/O/R|1|1960
James Potter|H|S|G|O|1|1960
Lily Potter|F|S|G|O|1|1960
Cornelius Fudge|H|S|A|Y|2|1930
Kingsley Shacklebolt|H|S|A|Y/O|5|1960
Dolores Ombrage|F|S|S|P/Y|5|1937
Bellatrix Lestrange|F|S|S|M|5|1951
Lucius Malefoy|H|S|S|M|2|1954
Narcissa Malefoy|F|S|A|A|6|1955
Vincent Crabbe|H|S|S|E|1|1980
Gregory Goyle|H|S|S|E|1|1980
Viktor Krum|H|S|A|E|4|1976
Fleur Delacour|F|S/V|A|E/O|4|1977
Barty Croupton Sr|H|S|A|Y|4|1930
Barty Croupton Jr|H|S|A|M/P|4|1962
Igor Karkaroff|H|S|A|M/P|4|1940
Olympe Maxime|F|S/G|A|P|4|1935
Alastor Maugrey|H|S|A|P/Y/O|4|1940
Rita Skeeter|F|S|A|A|4|1951
Nymphadora Tonks|F|S|P|Y/O|5|1973
Horace Slughorn|H|S|S|P|6|1928
Pomona Chourave|F|S|P|P|2|1950
Filius Flitwick|H|S/B|D|P|1|1952
Garrick Ollivander|H|S|A|A|1|1930
Gripsec|H|S/B|A|A|1|1850
Choixpeau Magique|A|O|A|A|1|990
Nagini|F|N|A|M|4|1920
Buck|H|H|A|A|3|1990
Fumseck|H|P|A|A|2|1800
Hedwige|F|U|A|A|1|1980
Touffu|H|T|A|A|1|1975
Aragog|H|A|A|A|2|1942
Basilic|H|A|A|A|2|1000
Crockdur|H|C|A|A|1|1985
Pattenrond|H|Z|A|A|3|1988
Katie Bell|F|S|G|E|1|1979
Fenrir Greyback|H|S/L|A|M|6|1950
Argus Rusard|H|Q|A|A|1|1950
Bill Weasley|H|S|G|O|2|1970
Charlie Weasley|H|S|G|O|2|1972
Nick Quasi-Sans-Tête|H|F|G|A|1|1401
Le Baron Sanglant|H|F|S|A|1|1000
Mimi Geignarde|F|F|D|A|2|1927
Mondingus Fletcher|H|S|A|O|5|1954
Bathilda Tourdesac|F|S|A|A|7|1870
Salazar Serpentard|H|S|S|F|1|990
Godric Gryffondor|H|S|G|F|1|990
Rowena Serdaigle|F|S|D|F|1|990
Helga Poufsouffle|F|S|P|F|1|990
Doud's|F|M|G|S|0|2010
`.trim();

const PERSONNAGES = PERSONNAGES_BRUTS.split("\n").map(ligne => {
  const [nom, genre, espece, maison, role, livre, annee] = ligne.split("|");
  return { nom, genre, espece, maison, role, livre: Number(livre), annee: Number(annee) };
});

function trouverPersonnage(nom) {
  return PERSONNAGES.find(personnage => personnage.nom === nom);
}

const CITATIONS = [
  ["Rubeus Hagrid", "Tu es un sorcier, Harry."],
  ["Rubeus Hagrid", "Pas un bon endroit pour s'amuser."],
  ["Albus Dumbledore", "Il faut du courage pour se dresser face à ses ennemis."],
  ["Albus Dumbledore", "Ce sont nos choix qui montrent ce que nous sommes vraiment."],
  ["Albus Dumbledore", "Le bonheur peut être trouvé même dans les moments les plus sombres."],
  ["Severus Rogue", "Vous avez les yeux de votre mère."],
  ["Lord Voldemort", "Il n’y a ni bien ni mal. Il n’y a que le pouvoir."],
  ["Lord Voldemort", "Harry Potter est mort."],
  ["Alastor Maugrey", "Vigilance constante !"],
  ["Dobby", "Dobby est libre !"],
  ["Dobby", "Dobby a fait cela pour Harry Potter !"],
  ["Luna Lovegood", "Tu es aussi sain d’esprit que moi."],
  ["Luna Lovegood", "Les choses que nous perdons ont une façon de revenir vers nous."],
  ["Drago Malefoy", "Mon père en entendra parler !"],
  ["Ron Weasley", "Pourquoi fallait-il que ce soit des araignées ?"],
  ["Hermione Granger", "Vous n’avez donc jamais lu Histoire de Poudlard ?"],
  ["Hermione Granger", "Arrêtez de vous comporter comme des idiots !"],
  ["Sirius Black", "Le monde n’est pas divisé en gentils et en Mangemorts."],
  ["Sirius Black", "Tu ressembles à ton père."],
  ["Dolores Ombrage", "Hem, hem."],
  ["Dolores Ombrage", "Je veux que vous écriviez : je ne dois pas dire de mensonges."],
  ["Bellatrix Lestrange", "J’ai tué Sirius Black !"],
  ["Bellatrix Lestrange", "Je suis le bras du Seigneur des Ténèbres."],
  ["Neville Londubat", "Je suis prêt à mourir pour lui."],
  ["Harry Potter", "Je jure solennellement que mes intentions sont mauvaises."],
  ["Molly Weasley", "Pas ma fille, espèce de garce !"],
  ["Molly Weasley", "Qu’est-ce que tu attends ?"],
  ["Arthur Weasley", "Je suis fasciné par les Moldus."],
  ["Fred Weasley", "Quoi ? Nous sommes célèbres !"],
  ["George Weasley", "On dirait que nous allons devoir changer de métier."],
  ["Remus Lupin", "Ce n’est pas notre ressemblance qui compte, Harry."],
  ["Remus Lupin", "Ce sont les souvenirs heureux qui permettent de produire un Patronus."],
  ["Minerva McGonagall", "Pourquoi est-ce toujours vous trois ?"],
  ["Minerva McGonagall", "Piertotum Locomotor !"],
  ["Gilderoy Lockhart", "Pourquoi personne ne m’a-t-il écrit ?"],
  ["Sibylle Trelawney", "Vous avez le sinistros !"],
  ["Sirius Black", "Tu dois te souvenir que tout le monde n’est pas ton ennemi."],
  ["Nymphadora Tonks", "...pas Dora."],
  ["Nymphadora Tonks", "Je suis maladroite, et alors ?"],
  ["Seamus Finnigan", "Je peux faire exploser des choses."],
  ["Pomona Chourave", "Les plantes peuvent être très dangereuses."],
  ["Horace Slughorn", "Je suis un collectionneur de célébrités."],
  ["Cornelius Fudge", "Je ne veux pas croire à ces absurdités."],
  ["Rita Skeeter", "Les lecteurs veulent savoir."],
  ["Garrick Ollivander", "La baguette choisit le sorcier."],
  ["Gripsec", "Vous êtes un sorcier inhabituel, Potter."],
  ["Dudley Dursley", "36 ! Mais l'année dernière, l'année dernière j'en avais 37 !"],
].map(([nom, citation]) => ({
  personnage: trouverPersonnage(nom),
  citation
})).filter(citation => citation.personnage);


const PATRONUS = [
  ["Harry Potter", "Cerf", "images/cerf.jpg"],
  ["James Potter", "Cerf", "images/cerf.jpg"],
  ["Lily Potter", "Biche", "images/biche.jpg"],
  ["Severus Rogue", "Biche", "images/biche.jpg"],
  ["Hermione Granger", "Loutre", "images/loutre.jpg"],
  ["Ron Weasley", "Terrier Jack Russell", "images/chien.jpg"],
  ["Albus Dumbledore", "Phénix", "images/phenix.jpg"],
  ["Aberforth Dumbledore", "Bouc", "images/bouc.jpg"],
  ["Remus Lupin", "Loup", "images/loup.jpg"],
  ["Nymphadora Tonks", "Lièvre & Loup", "images/ll.jpg"],
  ["Minerva McGonagall", "Chat", "images/chatm.jpg"],
  ["Dolores Ombrage", "Chat", "images/chatd.jpg"],
  ["Kingsley Shacklebolt", "Lynx", "images/lynx.jpg"],
  ["Arthur Weasley", "Belette", "images/belette.jpg"],
  ["Cho Chang", "Cygne", "images/cygne.jpg"],
  ["Seamus Finnigan", "Renard", "images/renard.jpg"],
  ["Luna Lovegood", "Lièvre", "images/lievre.jpg"],
  ["Ginny Weasley", "Cheval", "images/cheval.jpg"],
  ["Fred Weasley", "Pie", "images/pie.jpg"],
  ["George Weasley", "Pie", "images/pie.jpg"],
  ["Doud's", "Lapin", "images/lapin.jpg"]
].map(([nom, animal, image]) => ({
  personnage: trouverPersonnage(nom),
  animal,
  image
})).filter(patronus => patronus.personnage);

const SORTILEGES = [
  { personnage: { nom: "Expelliarmus", symbole: "✋" }, description: "Fait voler la baguette de l’adversaire hors de sa main." },
  { personnage: { nom: "Lumos", symbole: "💡" }, description: "Fait apparaître une lumière au bout de la baguette." },
  { personnage: { nom: "Nox", symbole: "🌑" }, description: "Éteint la lumière de la baguette." },
  { personnage: { nom: "Accio", symbole: "🧲" }, description: "Attire vers soi un objet situé à distance." },
  { personnage: { nom: "Wingardium Leviosa", symbole: "🪶" }, description: "Fait voler un objet dans les airs." },
  { personnage: { nom: "Alohomora", symbole: "🔓" }, description: "Déverrouille les portes et les serrures simples." },
  { personnage: { nom: "Stupéfix", symbole: "💫" }, description: "Assomme la cible sur le coup." },
  { personnage: { nom: "Protego", symbole: "🛡️" }, description: "Dresse un bouclier invisible contre les sorts adverses." },
  { personnage: { nom: "Expecto Patronum", symbole: "🦌" }, description: "Fait surgir un gardien d’argent qui repousse les Détraqueurs." },
  { personnage: { nom: "Avada Kedavra", symbole: "💀" }, description: "Un des trois impardonnables : il tue instantanément." },
  { personnage: { nom: "Doloris", symbole: "😖" }, description: "Un des trois impardonnables : il inflige une douleur insoutenable." },
  { personnage: { nom: "Impérium", symbole: "🌀" }, description: "Un des trois impardonnables : il soumet la victime à la volonté du sorcier." },
  { personnage: { nom: "Riddikulus", symbole: "🤡" }, description: "Transforme un épouvantard en quelque chose de comique." },
  { personnage: { nom: "Sectumsempra", symbole: "🗡️" }, description: "Entaille profondément la cible comme sous des coups d’épée invisibles." },
  { personnage: { nom: "Obliviate", symbole: "🫥" }, description: "Efface tout ou partie des souvenirs de la cible." },
  { personnage: { nom: "Reparo", symbole: "🔧" }, description: "Répare un objet cassé." },
  { personnage: { nom: "Incendio", symbole: "🔥" }, description: "Fait jaillir des flammes." },
  { personnage: { nom: "Petrificus Totalus", symbole: "🗿" }, description: "Paralyse tout le corps." },
  { personnage: { nom: "Rictusempra", symbole: "😂" }, description: "Provoque un fou rire incontrôlable." },
  { personnage: { nom: "Aguamenti", symbole: "💧" }, description: "Fait jaillir de l’eau de la baguette." },
  { personnage: { nom: "Episkey", symbole: "🩹" }, description: "Soigne les blessures légères." },
  { personnage: { nom: "Reducto", symbole: "💥" }, description: "Pulvérise un obstacle." },
  { personnage: { nom: "Morsmordre", symbole: "☠️" }, description: "Fait apparaître la Marque des Ténèbres dans le ciel." },
  { personnage: { nom: "Levicorpus", symbole: "🙃" }, description: "Suspend la victime en l’air par la cheville." },
  { personnage: { nom: "Confundo", symbole: "😵" }, description: "Plonge la cible dans la confusion." }
];


const POTIONS = [
  { personnage: { nom: "Polynectar", symbole: "🧪" }, description: "Permet de prendre l’apparence d’une autre personne pendant une heure." },
  { personnage: { nom: "Felix Felicis", symbole: "🍀" }, description: "Potion dorée qui porte chance : tout ce qu’on entreprend semble réussir." },
  { personnage: { nom: "Véritaserum", symbole: "🗣️" }, description: "Oblige celui qui en boit à dire la vérité." },
  { personnage: { nom: "Goutte du Mort-vivant", symbole: "💤" }, description: "Plonge le buveur dans un sommeil si profond qu’il semble mort." },
  { personnage: { nom: "Amortentia", symbole: "💘" }, description: "Le plus puissant des philtres d’amour : son odeur varie selon la personne." },
  { personnage: { nom: "Potion Tue-Loup", symbole: "🐺" }, description: "Permet à un loup-garou de garder sa conscience pendant la pleine lune." },
  { personnage: { nom: "Pimentine", symbole: "🌶️" }, description: "Guérit le rhume mais fait sortir de la fumée par les oreilles." },
  { personnage: { nom: "Poussos", symbole: "🦴" }, description: "Fait repousser des os disparus, mais c’est très douloureux." },
  { personnage: { nom: "Essence de dictame", symbole: "🩹" }, description: "Soigne rapidement les blessures et les cicatrices." },
  { personnage: { nom: "Élixir de longue vie", symbole: "⏳" }, description: "Produit à partir de la Pierre philosophale, il rend immortel." },
  { personnage: { nom: "Élixir d’euphorie", symbole: "😄" }, description: "Rend joyeux et fou de joie celui qui en boit." },
  { personnage: { nom: "Filtre de Paix", symbole: "🕊️" }, description: "Apaise l’anxiété et l’agitation." },
  { personnage: { nom: "Potion de Sommeil sans rêve", symbole: "🌙" }, description: "Garantit une nuit de sommeil profond, sans aucun rêve ni cauchemar." },
  { personnage: { nom: "Potion de Vieillissement", symbole: "👴" }, description: "Fait vieillir celui qui la boit" },
  { personnage: { nom: "Potion contre les furoncles", symbole: "🧴" }, description: "Soigne les furoncles" },
  { personnage: { nom: "Potion d’Oubli", symbole: "🫥" }, description: "Fait perdre la mémoire de ce qu’on vient de vivre." },
  { personnage: { nom: "Antidote aux poisons courants", symbole: "💊" }, description: "Neutralise la plupart des poisons commun." },
  { personnage: { nom: "Potion de Désespoir", symbole: "😫"}, description: "Ce poison provoque une souffrance physique atroce, des terreurs, des visions du passé et une soif brûlante et insupportable." }
];
 

const LIEUX = [
  { personnage: { nom: "Poudlard", symbole: "🏰" }, indice: "L’école de sorcellerie écossaise, divisée en quatre maisons." },
  { personnage: { nom: "Pré-au-Lard", symbole: "🏘️" }, indice: "Le seul village entièrement sorcier de Grande-Bretagne, accessible dès la troisième année." },
  { personnage: { nom: "Chemin de Traverse", symbole: "🛍️" }, indice: "Rue commerçante cachée de Londres : baguettes, chaudrons, balais…" },
  { personnage: { nom: "Gringotts", symbole: "🏦" }, indice: "La banque des sorciers, tenue par les gobelins et gardée par un dragon." },
  { personnage: { nom: "Le Terrier", symbole: "🏠" }, indice: "Maison bancale de la famille Weasley, près d’Ottery St Catchpole." },
  { personnage: { nom: "12 Square Grimmaurd", symbole: "🏚️" }, indice: "Au numéro 12, ancienne demeure des Black, devenue quartier général de l’Ordre du Phénix." },
  { personnage: { nom: "Chaudron Baveur", symbole: "🍺" }, indice: "Pub londonien qui cache l’entrée du Chemin de Traverse." },
  { personnage: { nom: "Ministère de la Magie", symbole: "🏛️" }, indice: "Siège du gouvernement sorcier, caché sous Londres et accessible par une cabine téléphonique." },
  { personnage: { nom: "Azkaban", symbole: "⛓️" }, indice: "Prison des sorciers, gardée par les Détraqueurs, sur une île de la mer du Nord." },
  { personnage: { nom: "Forêt Interdite", symbole: "🌲" }, indice: "Forêt sombre en bordure de l’école, peuplée de centaures et d’acromentules." },
  { personnage: { nom: "Salle sur Demande", symbole: "🚪" }, indice: "Pièce cachée au septième étage qui se transforme selon les besoins de celui qui la cherche." },
  { personnage: { nom: "Chambre des Secrets", symbole: "🐍" }, indice: "Salle secrète sous l’école où dort un monstre légendaire." },
  { personnage: { nom: "Cabane hurlante", symbole: "👻" }, indice: "Maison réputée la plus hantée de Grande-Bretagne, reliée à l’école par un passage secret." },
  { personnage: { nom: "Voie 9¾", symbole: "🚂" }, indice: "Quai caché de la gare de King’s Cross, d’où part le train pour l’école." },
  { personnage: { nom: "Les Trois Balais", symbole: "🍻" }, indice: "Auberge chaleureuse célèbre pour sa Bièraubeurre." },
  { personnage: { nom: "Tête de Sanglier", symbole: "🐗" }, indice: "Taverne louche tenue par le frère de Dumbledore." },
  { personnage: { nom: "Honeydukes", symbole: "🍬" }, indice: "Confiserie où l’on trouve Chocogrenouilles et Dragées surprises." },
  { personnage: { nom: "Fleury et Bott", symbole: "📚" }, indice: "Librairie du Chemin de Traverse." },
  { personnage: { nom: "Chez Ollivander", symbole: "🪄" }, indice: "Boutique de baguettes magiques, ouverte depuis 382 avant J.-C." },
  { personnage: { nom: "Godric’s Hollow", symbole: "🏡" }, indice: "Village où vivaient les Potter, théâtre de la mort de Lily et James." },
  { personnage: { nom: "Manoir Malefoy", symbole: "🏰" }, indice: "Demeure de la famille Malefoy, utilisée comme quartier général par Voldemort." },
  { personnage: { nom: "Privet Drive", symbole: "🏘️" }, indice: "Rue de banlieue où Harry grandit chez son oncle et sa tante." },
  { personnage: { nom: "Salle des Prophéties", symbole: "🔮" }, indice: "Salle du département des mystères qui recense de nombreuses prédictions." },
  { personnage: { nom: "Salle de la Mort", symbole: "💀" }, indice: "Salle du département des mystères où Sirius a été tué." },
  { personnage: { nom: "Nurmengard", symbole: "🔒" }, indice: "Prison de Grindelwald, surmontée de la devise « Pour le plus grand bien »." },
  { personnage: { nom: "Grande Salle", symbole: "🍽️" }, indice: "Salle des repas de l’école, au plafond enchanté qui reflète le ciel." }
];
 
const BOIS={
  H : "Houx",
  V : "Vigne",
  S : "Saule",
  C : "Cerisier",
  I : "If",
  A : "Aubépine",
  O : "Orme",
  N : "Noyer",
  F : "Frêne",
  M : "Charme",
  R : "Bois de Rose",
  P : "Sapin",
  B : "Bouleau",
  G : "Châtaigner",
  Y : "Cyprès",
  U : "Aulne",
  D : "Cèdre",
  T : "Noisetier"
};

const COEUR={
  P : "Plume de Phénix",
  V : "Ventricule de Dragon",
  C : "Crin de Licorne",
  X : "Cheveu de Vélane"
};

/* Du moins souple au plus souple (sert aux flèches ↑ ↓ du mode Baguette) */
const ORDRE_SOUPLESSE = [
  "Cassante",
  "Très Rigide",
  "Rigide",
  "Légèrement Souple",
  "Souple",
  "Très Souple"
];

const BAGUETTES = [
  ["Harry Potter", "houx", "plume de phénix", 27.5, "Très Souple"],
  ["Hermione Granger", "vigne", "ventricule de dragon", 27.3, "Légèrement Souple"],
  ["Ron Weasley", "saule", "crin de licorne", 35, "Souple"],
  ["Neville Londubat", "cerisier", "crin de licorne", 33.02, "Rigide"],
  ["Lord Voldemort", "if", "plume de phénix", 33.75, "Très Rigide"],
  ["Drago Malefoy", "aubépine", "crin de licorne", 25, "Souple"],
  ["Lucius Malefoy", "orme", "ventricule de dragon", 45.72, "Très Souple"],
  ["Bellatrix Lestrange", "noyer", "ventricule de dragon", 31.8, "Rigide"],
  ["Cédric Diggory", "frêne", "crin de licorne", 30.5, "Souple"],
  ["Viktor Krum", "charme", "ventricule de dragon", 25.5, "Très Rigide"],
  ["Fleur Delacour", "bois de rose", "cheveu de vélane", 23.75, "Très Rigide"],
  ["Minerva McGonagall", "sapin", "ventricule de dragon", 23.75, "Rigide"],
  ["Dolores Ombrage", "bouleau", "ventricule de dragon", 20.32, "Très Rigide"],
  ["Peter Pettigrow", "châtaignier", "ventricule de dragon", 23, "Cassante"],
  ["Sibylle Trelawney", "noisetier", "crin de licorne", 23.75, "Très Souple"],
  ["Horace Slughorn", "cèdre", "ventricule de dragon", 26, "Souple"],
  ["Quirinus Quirrell", "aulne", "crin de licorne", 22.5, "Souple"],
  ["Garrick Ollivander", "charme", "ventricule de dragon", 31.875, "Légèrement Souple"],
  ["Remus Lupin", "cyprès", "crin de licorne", 25.75, "Souple"],
  ["Gilderoy Lockhart", "cerisier", "ventricule de dragon", 22.5, "Légèrement Souple"],
  ["Doud's", "sureau", "crin de sombral", 38, "Rigide"],
].map(([nom, bois, coeur, longueur, souplesse]) => ({
  personnage: trouverPersonnage(nom),
  bois,
  coeur,
  longueur,
  souplesse
})).filter(baguette => baguette.personnage);

const PATRONUS_PAR_PERSONNAGE = Object.fromEntries(
  PATRONUS.map(patronus => [patronus.personnage.nom, patronus.animal])
);

function patronusDe(personnage) {
  return PATRONUS_PAR_PERSONNAGE[personnage.nom] || "Aucun";
}