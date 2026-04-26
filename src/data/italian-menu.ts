import type { MenuItemRecord } from "@/types/menu-item";

/**
 * Cardápio inspirado em trattorias e alta cozinha italiana.
 * Fotos dos pratos: Wikimedia Commons (licenças nos respetivos ficheiros) e
 * algumas imagens Unsplash já validadas para o prato indicado.
 */
export const ITALIAN_MENU_ITEMS: MenuItemRecord[] = [
  {
    id: "ant-1",
    name: "Burrata DOP com tomates confit",
    description:
      "Burrata de Andria, tomates cereja assados lentamente com alho e tomilho, pesto de manjericão fresco e focaccia tostada no forno a lenha.",
    price: 52,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Caprese_salad_%283124173496%29.jpg",
    category: "appetizers",
    featured: true,
  },
  {
    id: "ant-2",
    name: "Carpaccio di manzo",
    description:
      "Filé mignon em lâminas quase transparentes, rúcula selvagem, lascas de Grana Padano DOP, alcaparras sicilianas e emulsão de limão siciliano.",
    price: 48,
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Carpaccio_Cipriani.jpg",
    category: "appetizers",
    featured: false,
  },
  {
    id: "ant-3",
    name: "Vitello tonnato",
    description:
      "Clássico piemontês: vitela rosada, molho tonnato caseiro (atum e alcaparras), alcaparras fritas crocantes e folhas de espinafre bebê.",
    price: 46,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/Vitello_tonnato_%286977537544%29.jpg",
    category: "appetizers",
    featured: false,
  },
  {
    id: "ant-4",
    name: "Polpette al sugo",
    description:
      "Almôndegas de blend misto ao ragù napolitano lento (12 h), pecorino e pão de fermentação natural.",
    price: 38,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e7/Spaghetti_with_meatballs_2.jpg",
    category: "appetizers",
    featured: true,
  },
  {
    id: "primi-1",
    name: "Tagliatelle al ragù Bolognese",
    description:
      "Massa fresca cortada à mão, ragù tradicional de emilia com trio de carnes, vinho tinto e leite, finalizado com parmigiano reggiano 24 meses.",
    price: 58,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Tagliatelle_rag%C3%B9_bolognese_01.jpg",
    category: "pasta",
    featured: true,
  },
  {
    id: "primi-2",
    name: "Spaghetti alla carbonara",
    description:
      "Receita romana autêntica: guanciale croccante, ovos, pecorino romano DOP e pimenta preta moída na hora, sem creme.",
    price: 54,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    category: "pasta",
    featured: true,
  },
  {
    id: "primi-3",
    name: "Risotto allo zafferano e midões",
    description:
      "Arroz carnaroli, açafrão de crocus italiano, caldo de peixe lento, midões salteados e limão amalfitano.",
    price: 72,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Risotto_alla_pescatora_2.jpg",
    category: "pasta",
    featured: false,
  },
  {
    id: "primi-4",
    name: "Gnocchi di patate, burro e salvia",
    description:
      "Nhoque aéreo de batata assada, manteiga noisette, sálvia crocante e parmigiano.",
    price: 52,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/86/Gnocchi_di_ricotta_burro_e_salvia.jpg",
    category: "pasta",
    featured: false,
  },
  {
    id: "primi-5",
    name: "Lasagna della nonna",
    description:
      "Camadas de massa fresca, besciamela leve, ragù napolitano e mozzarella fior di latte, gratinação dourada.",
    price: 56,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/18/Lasagna_bolognese%2C_February_2012.jpg",
    category: "pasta",
    featured: false,
  },
  {
    id: "pizza-1",
    name: "Pizza Margherita DOC",
    description:
      "San Marzano, mozzarella di bufala, manjericão, azeite DOP e massa com 48 h de maturação, forno a lenha 400 °C.",
    price: 42,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    category: "pizza",
    featured: true,
  },
  {
    id: "pizza-2",
    name: "Pizza Diavola",
    description:
      "Salame picante calabrês, mozzarella, orégano e azeite, borda levemente carbonizada (cornicione).",
    price: 48,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
    category: "pizza",
    featured: false,
  },
  {
    id: "pizza-3",
    name: "Pizza Tartufata",
    description:
      "Creme de ricota, cogumelos porcini salteados, lâminas de parmigiano e óleo de trufa negra.",
    price: 68,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    category: "pizza",
    featured: true,
  },
  {
    id: "sec-1",
    name: "Ossobuco alla milanese",
    description:
      "Paleta com tutano, gremolata de limão siciliano, acompanha risotto allo zafferano ou polenta cremosa.",
    price: 98,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Ossobuco.jpg",
    category: "main-courses",
    featured: true,
  },
  {
    id: "sec-2",
    name: "Branzino in crosta di sale",
    description:
      "Robalo inteiro em crosta de sal marinho, ervas e citros, desfiado à mesa com azeite prensado a frio.",
    price: 128,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/63/Branzino_al_cartoccio.jpg",
    category: "main-courses",
    featured: false,
  },
  {
    id: "sec-3",
    name: "Bistecca alla fiorentina",
    description:
      "Corte T-bone maturado 35 dias, grelha sobre brasa de carvalho, sal grosso, rúcula e limão, para compartilhar.",
    price: 198,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    category: "main-courses",
    featured: true,
  },
  {
    id: "sec-4",
    name: "Saltimbocca alla romana",
    description:
      "Escalopes de vitela, presunto de parma, sálvia fresca e vinho branco em redução manteigosa.",
    price: 88,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Saltimbocca_alla_Romana.jpg",
    category: "main-courses",
    featured: false,
  },
  {
    id: "side-1",
    name: "Carciofi alla giudia",
    description:
      "Alcachofra romana frita até dourar, crocante por fora, macia por dentro, flor de sal e limão.",
    price: 34,
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Carciofi_alla_Giud%C3%ACa.jpg",
    category: "sides",
    featured: false,
  },
  {
    id: "side-2",
    name: "Patate arrosto all’aglio",
    description:
      "Batatas assadas com alecrim, alho confit e azeite extravirgem monocultivar.",
    price: 28,
    image:
      "https://twicpics.moulinex.it/https://sebplatform.api.groupe-seb.com/statics/ecf063b5-0b88-4747-901c-0b702b7ceba9.jpg?w=1920&fit=scale&twic=v1/quality=70/resize=2000",
    category: "sides",
    featured: false,
  },
  {
    id: "dol-1",
    name: "Tiramisù della casa",
    description:
      "Savoiardi, mascarpone, café espresso italiano e cacau amargo, receita da nonna da chef.",
    price: 32,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Tiramisu_dessert.jpg",
    category: "desserts",
    featured: true,
  },
  {
    id: "dol-2",
    name: "Panna cotta al pistacchio",
    description:
      "Creme sedoso, pistacchio de Bronte DOP e crumble de amêndoas tostadas.",
    price: 28,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/80/Panna_Cotta_with_cream_and_garnish.jpg",
    category: "desserts",
    featured: false,
  },
  {
    id: "dol-3",
    name: "Sfogliatella ricotta e cioccolato",
    description:
      "Folhas crocantes napolitanas recheadas com ricota de bufala e gotas de chocolate amargo.",
    price: 24,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Sfogliatelle_on_plate.jpg",
    category: "desserts",
    featured: false,
  },
  {
    id: "bev-1",
    name: "Negroni classico",
    description:
      "Gin London dry, vermute rosso torinês e Campari, laranja flamejada.",
    price: 36,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Negroni_served_in_Vancouver_BC.jpg",
    category: "drinks",
    featured: true,
  },
  {
    id: "bev-2",
    name: "Spritz al bitter",
    description:
      "Prosecco DOC, bitter select e soda, aperitivo veneziano servido com azeitonas gigantes.",
    price: 32,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Aperol_Spritz_2014a.jpg",
    category: "drinks",
    featured: true,
  },
  {
    id: "bev-3",
    name: "Barolo DOCG (taça)",
    description:
      "Nebbiolo da Langhe, taninos aveludados, cereja negra e especiarias.",
    price: 48,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/St._Magdalener_Classico_Bottle_Glass_Wine_Tasting_Maretsch.jpg",
    category: "drinks",
    featured: false,
  },
  {
    id: "bev-4",
    name: "Limoncello artigianale",
    description:
      "Licor de limão de Amalfi macerado em cascas, servido gelado em copo congelado.",
    price: 22,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Limoncello_Bottles.jpg",
    category: "drinks",
    featured: false,
  },
  {
    id: "pan-1",
    name: "Focaccia mortadella e burrata",
    description:
      "Focaccia genovese azeitonada, mortadella IGP de Bolonha, burrata e pistacchio tritado.",
    price: 44,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Focaccia_Bread_2.jpg",
    category: "sandwiches",
    featured: false,
  },
  {
    id: "spe-1",
    name: "Menu degustação “Viaggio” (7 momenti)",
    description:
      "Jornada pela Itália: antipasto, primo, pesce o carne, contorno, formaggio, dolce, harmonização de vinhos opcional (+R$ 220).",
    price: 328,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    category: "specials",
    featured: true,
  },
  {
    id: "spe-2",
    name: "Cacio e pepe al tavolo",
    description:
      "Espaguete finalizado no queijo pecorino derretido na mesa com pimenta preta moída, teatro gastronómico.",
    price: 78,
    image: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=800&q=80",
    category: "specials",
    featured: true,
  },
];

export const FEATURED_HIGHLIGHT_ITEMS = ITALIAN_MENU_ITEMS.filter((i) => i.featured).slice(
  0,
  6,
);
