export type MenuItemDetails = {
  ingredients: string[];
  allergens: string[];
  dietary?: string[];
};

const DETAILS: Record<string, MenuItemDetails> = {
  "ant-1": {
    ingredients: ["Burrata", "tomate-cereja", "alho", "tomilho", "manjericão", "focaccia"],
    allergens: ["Leite", "Glúten"],
    dietary: ["Vegetariano"],
  },
  "ant-2": {
    ingredients: ["Filé mignon", "rúcula", "Grana Padano", "alcaparras", "limão siciliano"],
    allergens: ["Leite"],
  },
  "ant-3": {
    ingredients: ["Vitela", "atum", "alcaparras", "espinafre"],
    allergens: ["Peixe", "Ovos"],
  },
  "ant-4": {
    ingredients: ["Carne bovina", "carne suína", "molho de tomate", "pecorino", "pão"],
    allergens: ["Leite", "Glúten"],
  },
  "primi-1": {
    ingredients: ["Massa fresca", "carne bovina", "carne suína", "vinho tinto", "leite", "Parmigiano Reggiano"],
    allergens: ["Glúten", "Ovos", "Leite"],
  },
  "primi-2": {
    ingredients: ["Espaguete", "guanciale", "ovos", "pecorino romano", "pimenta-preta"],
    allergens: ["Glúten", "Ovos", "Leite"],
  },
  "primi-3": {
    ingredients: ["Arroz carnaroli", "açafrão", "caldo de peixe", "frutos do mar", "limão"],
    allergens: ["Peixe", "Frutos do mar"],
  },
  "primi-4": {
    ingredients: ["Batata", "manteiga", "sálvia", "Parmigiano"],
    allergens: ["Leite"],
    dietary: ["Vegetariano"],
  },
  "primi-5": {
    ingredients: ["Massa fresca", "béchamel", "ragù", "mozzarella"],
    allergens: ["Glúten", "Ovos", "Leite"],
  },
  "pizza-1": {
    ingredients: ["Tomate San Marzano", "mozzarella de búfala", "manjericão", "azeite", "massa de longa fermentação"],
    allergens: ["Glúten", "Leite"],
    dietary: ["Vegetariano"],
  },
  "pizza-2": {
    ingredients: ["Salame picante", "mozzarella", "orégano", "azeite", "massa de longa fermentação"],
    allergens: ["Glúten", "Leite"],
  },
  "pizza-3": {
    ingredients: ["Ricota", "cogumelos porcini", "Parmigiano", "trufa negra", "massa de longa fermentação"],
    allergens: ["Glúten", "Leite"],
    dietary: ["Vegetariano"],
  },
  "sec-1": {
    ingredients: ["Ossobuco", "tutano", "limão siciliano", "ervas", "risotto ou polenta"],
    allergens: [],
  },
  "sec-2": {
    ingredients: ["Robalo", "sal marinho", "ervas", "cítricos", "azeite"],
    allergens: ["Peixe"],
  },
  "sec-3": {
    ingredients: ["T-bone maturado", "rúcula", "limão", "sal grosso"],
    allergens: [],
  },
  "sec-4": {
    ingredients: ["Vitela", "presunto de Parma", "sálvia", "vinho branco", "manteiga"],
    allergens: ["Leite"],
  },
  "side-1": {
    ingredients: ["Alcachofra", "limão", "flor de sal"],
    allergens: [],
    dietary: ["Vegetariano", "Vegano"],
  },
  "side-2": {
    ingredients: ["Batata", "alecrim", "alho confit", "azeite extravirgem"],
    allergens: [],
    dietary: ["Vegetariano", "Vegano"],
  },
  "dol-1": {
    ingredients: ["Savoiardi", "mascarpone", "café espresso", "cacau"],
    allergens: ["Glúten", "Ovos", "Leite"],
    dietary: ["Vegetariano"],
  },
  "dol-2": {
    ingredients: ["Creme", "pistache", "amêndoas"],
    allergens: ["Leite", "Oleaginosas"],
    dietary: ["Vegetariano"],
  },
  "dol-3": {
    ingredients: ["Massa folhada", "ricota", "chocolate amargo"],
    allergens: ["Glúten", "Leite"],
    dietary: ["Vegetariano"],
  },
  "bev-1": {
    ingredients: ["Gin", "vermute rosso", "Campari", "laranja"],
    allergens: [],
    dietary: ["Contém álcool"],
  },
  "bev-2": {
    ingredients: ["Prosecco", "bitter", "soda", "azeitonas"],
    allergens: [],
    dietary: ["Contém álcool"],
  },
  "bev-3": {
    ingredients: ["Vinho Barolo DOCG"],
    allergens: ["Sulfitos"],
    dietary: ["Contém álcool"],
  },
  "bev-4": {
    ingredients: ["Licor de limão Amalfi"],
    allergens: [],
    dietary: ["Contém álcool"],
  },
  "pan-1": {
    ingredients: ["Focaccia", "mortadela", "burrata", "pistache"],
    allergens: ["Glúten", "Leite", "Oleaginosas"],
  },
  "spe-1": {
    ingredients: ["Menu em sete etapas com seleção variável da cozinha"],
    allergens: ["Consulte a equipe sobre alergênicos de cada etapa"],
  },
  "spe-2": {
    ingredients: ["Espaguete", "pecorino", "pimenta-preta"],
    allergens: ["Glúten", "Leite"],
    dietary: ["Vegetariano"],
  },
};

const EMPTY_DETAILS: MenuItemDetails = {
  ingredients: [],
  allergens: [],
};

export function getMenuItemDetails(id: string): MenuItemDetails {
  return DETAILS[id] ?? EMPTY_DETAILS;
}
