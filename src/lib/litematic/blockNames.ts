// Nombre legible en español de cada bloque para la lista de materiales.
// Mismo enfoque que blockColors: exactos frecuentes + familias (tintes, maderas)
// + respaldo que "embellece" el id.

import { baseName } from './blockColors'

const COLOR_ES: Record<string, string> = {
  white: 'blanco', orange: 'naranja', magenta: 'magenta', light_blue: 'azul claro',
  yellow: 'amarillo', lime: 'lima', pink: 'rosa', gray: 'gris', light_gray: 'gris claro',
  cyan: 'cian', purple: 'morado', blue: 'azul', brown: 'marrón', green: 'verde',
  red: 'rojo', black: 'negro',
}
const COLOR_KEYS = Object.keys(COLOR_ES)

// Sufijo (material) -> nombre ES para la familia de tintes
const DYE_MATERIAL_ES: Array<[string, string]> = [
  ['concrete_powder', 'Hormigón en polvo'], ['concrete', 'Hormigón'],
  ['glazed_terracotta', 'Terracota vidriada'], ['terracotta', 'Terracota'],
  ['stained_glass_pane', 'Panel de vidrio tintado'], ['stained_glass', 'Vidrio tintado'],
  ['shulker_box', 'Caja shulker'], ['wool', 'Lana'], ['carpet', 'Alfombra'],
  ['bed', 'Cama'], ['banner', 'Estandarte'], ['candle', 'Vela'],
]

const WOOD_ES: Record<string, string> = {
  oak: 'roble', spruce: 'abeto', birch: 'abedul', jungle: 'jungla', acacia: 'acacia',
  dark_oak: 'roble oscuro', pale_oak: 'roble pálido', mangrove: 'mangle', cherry: 'cerezo',
  bamboo: 'bambú', crimson: 'carmesí', warped: 'distorsionado', poplar: 'álamo',
}
const WOOD_KEYS = Object.keys(WOOD_ES)

// Sufijo (material) -> nombre ES para la familia de maderas. El colgante antes que
// el cartel: es otro ítem (lleva cadenas) y salían dos filas «Cartel de roble».
const WOOD_MATERIAL_ES: Array<[string, string]> = [
  ['pressure_plate', 'Placa de presión'], ['fence_gate', 'Puerta de valla'],
  ['trapdoor', 'Trampilla'], ['planks', 'Tablones'], ['stairs', 'Escaleras'],
  ['slab', 'Losa'], ['fence', 'Valla'], ['door', 'Puerta'], ['button', 'Botón'],
  ['hanging_sign', 'Cartel colgante'], ['sign', 'Cartel'], ['shelf', 'Estante'],
  ['leaves', 'Hojas'], ['sapling', 'Brote'], ['log', 'Tronco'],
  ['wood', 'Madera'], ['stem', 'Tallo'], ['hyphae', 'Hifa'], ['fungus', 'Hongo'],
]

// «Pelado» concuerda con el material, que no siempre es masculino: salía «Madera
// pelado de acacia».
const PELADO_ES: Record<string, string> = {
  log: 'pelado', stem: 'pelado', wood: 'pelada', hyphae: 'pelada',
}

const EXACT_ES: Record<string, string> = {
  air: 'Aire',
  stone: 'Piedra', granite: 'Granito', diorite: 'Diorita', andesite: 'Andesita',
  polished_granite: 'Granito pulido', polished_diorite: 'Diorita pulida', polished_andesite: 'Andesita pulida',
  cobblestone: 'Adoquín', mossy_cobblestone: 'Adoquín musgoso', stone_bricks: 'Ladrillos de piedra',
  mossy_stone_bricks: 'Ladrillos de piedra musgosos', cracked_stone_bricks: 'Ladrillos de piedra agrietados',
  chiseled_stone_bricks: 'Ladrillos de piedra cincelados', smooth_stone: 'Piedra lisa', bricks: 'Ladrillos',
  deepslate: 'Pizarra profunda', cobbled_deepslate: 'Pizarra profunda adoquinada',
  polished_deepslate: 'Pizarra profunda pulida', deepslate_bricks: 'Ladrillos de pizarra profunda',
  deepslate_tiles: 'Baldosas de pizarra profunda', tuff: 'Toba', calcite: 'Calcita',
  dripstone_block: 'Bloque de espeleotema', bedrock: 'Roca madre', obsidian: 'Obsidiana',
  crying_obsidian: 'Obsidiana llorona', smooth_basalt: 'Basalto liso',
  dirt: 'Tierra', coarse_dirt: 'Tierra estéril', rooted_dirt: 'Tierra con raíces',
  grass_block: 'Bloque de hierba', podzol: 'Podsol', mycelium: 'Micelio', dirt_path: 'Camino de tierra',
  farmland: 'Tierra de cultivo', mud: 'Barro', packed_mud: 'Barro compacto', mud_bricks: 'Ladrillos de barro',
  clay: 'Arcilla', gravel: 'Grava', sand: 'Arena', red_sand: 'Arena roja',
  sandstone: 'Arenisca', smooth_sandstone: 'Arenisca lisa', cut_sandstone: 'Arenisca cortada',
  chiseled_sandstone: 'Arenisca cincelada', red_sandstone: 'Arenisca roja', moss_block: 'Bloque de musgo',
  coal_ore: 'Mena de carbón', deepslate_coal_ore: 'Mena de carbón (pizarra)', iron_ore: 'Mena de hierro',
  deepslate_iron_ore: 'Mena de hierro (pizarra)', copper_ore: 'Mena de cobre',
  deepslate_copper_ore: 'Mena de cobre (pizarra)', gold_ore: 'Mena de oro',
  deepslate_gold_ore: 'Mena de oro (pizarra)', redstone_ore: 'Mena de redstone',
  deepslate_redstone_ore: 'Mena de redstone (pizarra)', emerald_ore: 'Mena de esmeralda',
  deepslate_emerald_ore: 'Mena de esmeralda (pizarra)', lapis_ore: 'Mena de lapislázuli',
  deepslate_lapis_ore: 'Mena de lapislázuli (pizarra)', diamond_ore: 'Mena de diamante',
  deepslate_diamond_ore: 'Mena de diamante (pizarra)', ancient_debris: 'Restos antiguos',
  nether_quartz_ore: 'Mena de cuarzo del Nether', nether_gold_ore: 'Mena de oro del Nether',
  raw_iron_block: 'Bloque de hierro en bruto', raw_copper_block: 'Bloque de cobre en bruto',
  raw_gold_block: 'Bloque de oro en bruto',
  coal_block: 'Bloque de carbón', iron_block: 'Bloque de hierro', copper_block: 'Bloque de cobre',
  gold_block: 'Bloque de oro', redstone_block: 'Bloque de redstone', emerald_block: 'Bloque de esmeralda',
  lapis_block: 'Bloque de lapislázuli', diamond_block: 'Bloque de diamante', netherite_block: 'Bloque de netherita',
  quartz_block: 'Bloque de cuarzo', smooth_quartz: 'Cuarzo liso', quartz_bricks: 'Ladrillos de cuarzo',
  chiseled_quartz_block: 'Bloque de cuarzo cincelado', quartz_pillar: 'Columna de cuarzo',
  amethyst_block: 'Bloque de amatista', budding_amethyst: 'Amatista en gemación',
  redstone: 'Polvo de redstone', redstone_wire: 'Polvo de redstone', redstone_torch: 'Antorcha de redstone',
  redstone_lamp: 'Lámpara de redstone', repeater: 'Repetidor', comparator: 'Comparador',
  observer: 'Observador', piston: 'Pistón', sticky_piston: 'Pistón pegajoso', dropper: 'Soltador',
  dispenser: 'Dispensador', hopper: 'Tolva', lever: 'Palanca', target: 'Diana', tnt: 'TNT',
  slime_block: 'Bloque de slime', honey_block: 'Bloque de miel', note_block: 'Bloque musical',
  observer_block: 'Observador', daylight_detector: 'Sensor de luz solar', lectern: 'Atril',
  rail: 'Raíl', powered_rail: 'Raíl propulsor', detector_rail: 'Raíl detector', activator_rail: 'Raíl activador',
  lightning_rod: 'Pararrayos', sculk_sensor: 'Sensor de sculk', sculk: 'Sculk', sculk_catalyst: 'Catalizador de sculk',
  sculk_shrieker: 'Chillón de sculk',
  chest: 'Cofre', trapped_chest: 'Cofre trampa', barrel: 'Barril', crafting_table: 'Mesa de trabajo',
  furnace: 'Horno', blast_furnace: 'Alto horno', smoker: 'Ahumador', ender_chest: 'Cofre de Ender',
  bookshelf: 'Estantería', composter: 'Compostador', cauldron: 'Caldero', anvil: 'Yunque',
  grindstone: 'Piedra de afilar', smithing_table: 'Mesa de herrería', stonecutter: 'Cortador de piedra',
  loom: 'Telar', cartography_table: 'Mesa de cartografía', fletching_table: 'Mesa de flechería',
  beacon: 'Baliza', conduit: 'Conducto', bell: 'Campana', lodestone: 'Magnetita', respawn_anchor: 'Ancla de reaparición',
  snow: 'Nieve', snow_block: 'Bloque de nieve', powder_snow: 'Nieve polvo', ice: 'Hielo',
  packed_ice: 'Hielo compacto', blue_ice: 'Hielo azul', water: 'Agua', lava: 'Lava',
  netherrack: 'Roca del Nether', nether_bricks: 'Ladrillos del Nether', red_nether_bricks: 'Ladrillos rojos del Nether',
  nether_wart_block: 'Bloque de verruga del Nether', warped_wart_block: 'Bloque de verruga distorsionada',
  soul_sand: 'Arena de almas', soul_soil: 'Tierra de almas', magma_block: 'Bloque de magma',
  glowstone: 'Piedra luminosa', shroomlight: 'Champihongo', basalt: 'Basalto', polished_basalt: 'Basalto pulido',
  blackstone: 'Piedra negra', polished_blackstone: 'Piedra negra pulida',
  polished_blackstone_bricks: 'Ladrillos de piedra negra pulida', gilded_blackstone: 'Piedra negra dorada',
  end_stone: 'Piedra del End', end_stone_bricks: 'Ladrillos de piedra del End', purpur_block: 'Bloque de púrpura',
  purpur_pillar: 'Columna de púrpura', chorus_plant: 'Planta de chorus', chorus_flower: 'Flor de chorus',
  torch: 'Antorcha', soul_torch: 'Antorcha de almas', lantern: 'Farol', soul_lantern: 'Farol de almas',
  sea_lantern: 'Lámpara marina', glass: 'Vidrio', glass_pane: 'Panel de vidrio', tinted_glass: 'Vidrio polarizado',
  pumpkin: 'Calabaza', carved_pumpkin: 'Calabaza tallada', jack_o_lantern: 'Calabaza iluminada',
  melon: 'Sandía', hay_block: 'Bloque de heno', dried_kelp_block: 'Bloque de algas secas',
  sponge: 'Esponja', wet_sponge: 'Esponja húmeda', cactus: 'Cactus', sugar_cane: 'Caña de azúcar',
  vine: 'Enredadera', lily_pad: 'Nenúfar', short_grass: 'Hierba', tall_grass: 'Hierba alta',
  fern: 'Helecho', large_fern: 'Helecho grande', dead_bush: 'Arbusto seco', cobweb: 'Telaraña',
  scaffolding: 'Andamio', spawner: 'Generador de monstruos',
  // Bloques de construcción que caían al respaldo y salían en inglés en la lista
  // de materiales y en las paletas.
  polished_tuff: 'Toba pulida', tuff_bricks: 'Ladrillos de toba',
  chiseled_tuff: 'Toba cincelada', chiseled_tuff_bricks: 'Ladrillos de toba cincelados',
  cracked_deepslate_bricks: 'Ladrillos de pizarra profunda agrietados',
  cracked_deepslate_tiles: 'Baldosas de pizarra profunda agrietadas',
  chiseled_deepslate: 'Pizarra profunda cincelada', reinforced_deepslate: 'Pizarra profunda reforzada',
  cracked_polished_blackstone_bricks: 'Ladrillos de piedra negra pulida agrietados',
  chiseled_polished_blackstone: 'Piedra negra pulida cincelada',
  cut_red_sandstone: 'Arenisca roja cortada', chiseled_red_sandstone: 'Arenisca roja cincelada',
  smooth_red_sandstone: 'Arenisca roja lisa',
  pale_moss_block: 'Bloque de musgo pálido',
  bamboo_mosaic: 'Mosaico de bambú', bamboo_block: 'Bloque de bambú',
  azalea_leaves: 'Hojas de azalea', flowering_azalea_leaves: 'Hojas de azalea en flor',
  bone_block: 'Bloque de huesos', terracotta: 'Terracota',
  honeycomb_block: 'Bloque de panal',
  // Cobre y su oxidación
  exposed_copper: 'Cobre expuesto', weathered_copper: 'Cobre desgastado', oxidized_copper: 'Cobre oxidado',
  cut_copper: 'Cobre cortado', exposed_cut_copper: 'Cobre cortado expuesto',
  weathered_cut_copper: 'Cobre cortado desgastado', oxidized_cut_copper: 'Cobre cortado oxidado',
  chiseled_copper: 'Cobre cincelado', exposed_chiseled_copper: 'Cobre cincelado expuesto',
  weathered_chiseled_copper: 'Cobre cincelado desgastado', oxidized_chiseled_copper: 'Cobre cincelado oxidado',
  copper_grate: 'Rejilla de cobre', exposed_copper_grate: 'Rejilla de cobre expuesta',
  weathered_copper_grate: 'Rejilla de cobre desgastada', oxidized_copper_grate: 'Rejilla de cobre oxidada',
  copper_bulb: 'Bombilla de cobre',
  // Nether y End
  cracked_nether_bricks: 'Ladrillos del Nether agrietados',
  chiseled_nether_bricks: 'Ladrillos del Nether cincelados',
  crimson_nylium: 'Nilio carmesí', warped_nylium: 'Nilio distorsionado',
  resin_block: 'Bloque de resina', resin_bricks: 'Ladrillos de resina',
  chiseled_resin_bricks: 'Ladrillos de resina cincelados',
  // Marino y setas
  prismarine: 'Prismarina', prismarine_bricks: 'Ladrillos de prismarina',
  dark_prismarine: 'Prismarina oscura',
  red_mushroom_block: 'Bloque de seta roja', brown_mushroom_block: 'Bloque de seta marrón',
  mushroom_stem: 'Tallo de seta',
  // Corales (bloque vivo y su versión muerta). Los nombres del juego: el bloque es
  // «Bloque de coral de tubo» y la planta «Coral de tubo» (si no, salían dos filas
  // iguales).
  tube_coral_block: 'Bloque de coral de tubo', brain_coral_block: 'Bloque de coral de cerebro',
  bubble_coral_block: 'Bloque de coral de burbuja', fire_coral_block: 'Bloque de coral de fuego',
  horn_coral_block: 'Bloque de coral de cuerno',
  dead_tube_coral_block: 'Bloque de coral de tubo muerto', dead_brain_coral_block: 'Bloque de coral de cerebro muerto',
  dead_bubble_coral_block: 'Bloque de coral de burbuja muerto', dead_fire_coral_block: 'Bloque de coral de fuego muerto',
  dead_horn_coral_block: 'Bloque de coral de cuerno muerto',
  // Luz y bloques de bicho
  ochre_froglight: 'Ranaluz ocre', verdant_froglight: 'Ranaluz verdeante',
  pearlescent_froglight: 'Ranaluz perlado',
  bee_nest: 'Nido de abejas', beehive: 'Colmena',
  // Utilidad y decoración
  jukebox: 'Tocadiscos', chiseled_bookshelf: 'Estantería cincelada', crafter: 'Fabricador',
  trial_spawner: 'Generador de pruebas', vault: 'Cámara acorazada',
  creaking_heart: 'Corazón del crujiente', frosted_ice: 'Hielo escarchado',
  // Cobre: las bombillas que faltaban
  exposed_copper_bulb: 'Bombilla de cobre expuesta',
  weathered_copper_bulb: 'Bombilla de cobre desgastada',
  oxidized_copper_bulb: 'Bombilla de cobre oxidada',
  // Naturaleza y arqueología (cactus, podzol y sculk ya están arriba: se llaman
  // igual en español, por eso parecen sin traducir).
  suspicious_sand: 'Arena sospechosa', suspicious_gravel: 'Grava sospechosa',
  muddy_mangrove_roots: 'Raíces de mangle embarradas',
  stripped_bamboo_block: 'Bloque de bambú pelado',
  // Cinabrio y azufre (material de construcción nuevo)
  cinnabar: 'Cinabrio', polished_cinnabar: 'Cinabrio pulido',
  cinnabar_bricks: 'Ladrillos de cinabrio', chiseled_cinnabar: 'Cinabrio cincelado',
  sulfur: 'Azufre', potent_sulfur: 'Azufre potente', polished_sulfur: 'Azufre pulido',
  sulfur_bricks: 'Ladrillos de azufre', chiseled_sulfur: 'Azufre cincelado',
  // Lo que más salía en inglés en la lista de materiales (§5 del informe del visor).
  chain: 'Cadena', iron_chain: 'Cadena de hierro', iron_bars: 'Barrotes de hierro', ladder: 'Escalera de mano',
  flower_pot: 'Maceta', end_rod: 'Vara del End', glow_lichen: 'Liquen luminoso',
  iron_door: 'Puerta de hierro', iron_trapdoor: 'Trampilla de hierro',
  copper_door: 'Puerta de cobre', exposed_copper_door: 'Puerta de cobre expuesta',
  weathered_copper_door: 'Puerta de cobre desgastada', oxidized_copper_door: 'Puerta de cobre oxidada',
  copper_trapdoor: 'Trampilla de cobre', exposed_copper_trapdoor: 'Trampilla de cobre expuesta',
  weathered_copper_trapdoor: 'Trampilla de cobre desgastada', oxidized_copper_trapdoor: 'Trampilla de cobre oxidada',
  copper_torch: 'Antorcha de cobre', copper_lantern: 'Farol de cobre',
  // La edad del cobre (1.21.9). Los oxidados salen de estos (ver CON_OXIDO).
  copper_bars: 'Barrotes de cobre', copper_chain: 'Cadena de cobre', copper_chest: 'Cofre de cobre',
  copper_golem_statue: 'Estatua de gólem de cobre',
  string: 'Hilo', tripwire_hook: 'Gancho de cuerda',
  stone_button: 'Botón de piedra', polished_blackstone_button: 'Botón de piedra negra pulida',
  stone_pressure_plate: 'Placa de presión de piedra',
  polished_blackstone_pressure_plate: 'Placa de presión de piedra negra pulida',
  light_weighted_pressure_plate: 'Placa de presión para peso ligero',
  heavy_weighted_pressure_plate: 'Placa de presión para peso pesado',
  campfire: 'Fogata', soul_campfire: 'Fogata de almas',
  chipped_anvil: 'Yunque dañado', damaged_anvil: 'Yunque muy dañado',
  enchanting_table: 'Mesa de encantamientos', brewing_stand: 'Soporte para pociones',
  end_portal_frame: 'Marco del portal del End', dragon_egg: 'Huevo de dragón', dragon_head: 'Cabeza de dragón',
  player_head: 'Cabeza de jugador', zombie_head: 'Cabeza de zombi', creeper_head: 'Cabeza de creeper',
  piglin_head: 'Cabeza de piglin', skeleton_skull: 'Calavera de esqueleto',
  wither_skeleton_skull: 'Calavera de esqueleto wither',
  shulker_box: 'Caja de shulker', decorated_pot: 'Vasija decorada', heavy_core: 'Núcleo denso',
  cake: 'Pastel', candle: 'Vela', sea_pickle: 'Pepino de mar', turtle_egg: 'Huevo de tortuga',
  frogspawn: 'Huevas de rana', sniffer_egg: 'Huevo de sniffer',
  water_bucket: 'Cubo de agua', lava_bucket: 'Cubo de lava', powder_snow_bucket: 'Cubo de nieve polvo',
  sculk_vein: 'Vena de sculk', resin_clump: 'Grumo de resina', pointed_dripstone: 'Espeleotema puntiagudo',
  amethyst_cluster: 'Drusa de amatista', small_amethyst_bud: 'Brote de amatista pequeño',
  medium_amethyst_bud: 'Brote de amatista mediano', large_amethyst_bud: 'Brote de amatista grande',
  // Plantas, semillas y cultivos (lo que se coloca)
  dandelion: 'Diente de león', poppy: 'Amapola', blue_orchid: 'Orquídea azul', allium: 'Allium',
  azure_bluet: 'Rosa azul', red_tulip: 'Tulipán rojo', orange_tulip: 'Tulipán naranja',
  white_tulip: 'Tulipán blanco', pink_tulip: 'Tulipán rosa', oxeye_daisy: 'Margarita',
  cornflower: 'Aciano', lily_of_the_valley: 'Lirio de los valles', wither_rose: 'Rosa marchita',
  sunflower: 'Girasol', lilac: 'Lila', rose_bush: 'Rosal', peony: 'Peonía',
  torchflower: 'Flor de antorcha', pitcher_plant: 'Planta odre', pink_petals: 'Pétalos rosas',
  wildflowers: 'Flores silvestres', leaf_litter: 'Hojarasca', bush: 'Arbusto', firefly_bush: 'Arbusto de luciérnagas',
  short_dry_grass: 'Hierba seca', tall_dry_grass: 'Hierba seca alta', cactus_flower: 'Flor de cactus',
  open_eyeblossom: 'Flor de ojo abierta', closed_eyeblossom: 'Flor de ojo cerrada',
  brown_mushroom: 'Champiñón', red_mushroom: 'Champiñón rojo',
  crimson_roots: 'Raíces carmesíes', warped_roots: 'Raíces distorsionadas', nether_sprouts: 'Brotes del Nether',
  seagrass: 'Hierba marina', tall_seagrass: 'Hierba marina alta', kelp: 'Algas',
  bamboo: 'Bambú', azalea: 'Azalea', flowering_azalea: 'Azalea florida', moss_carpet: 'Alfombra de musgo',
  pale_moss_carpet: 'Alfombra de musgo pálido', pale_hanging_moss: 'Musgo pálido colgante',
  hanging_roots: 'Raíces colgantes', spore_blossom: 'Flor de esporas',
  big_dripleaf: 'Plantaforma grande', small_dripleaf: 'Plantaforma pequeña',
  mangrove_propagule: 'Propágulo de mangle', mangrove_roots: 'Raíces de mangle',
  twisting_vines: 'Enredaderas retorcidas', weeping_vines: 'Enredaderas lloronas',
  glow_berries: 'Bayas luminosas', sweet_berries: 'Bayas dulces', cocoa_beans: 'Granos de cacao',
  wheat_seeds: 'Semillas de trigo', carrot: 'Zanahoria', potato: 'Patata', beetroot_seeds: 'Semillas de remolacha',
  melon_seeds: 'Semillas de sandía', pumpkin_seeds: 'Semillas de calabaza', nether_wart: 'Verruga del Nether',
  torchflower_seeds: 'Semillas de flor de antorcha', pitcher_pod: 'Vaina de planta odre',
  chorus_fruit: 'Fruta de chorus',
  // Corales (planta y gorgonia, que es el abanico)
  tube_coral: 'Coral de tubo', brain_coral: 'Coral de cerebro', bubble_coral: 'Coral de burbuja',
  fire_coral: 'Coral de fuego', horn_coral: 'Coral de cuerno',
  tube_coral_fan: 'Gorgonia de tubo', brain_coral_fan: 'Gorgonia de cerebro',
  bubble_coral_fan: 'Gorgonia de burbuja', fire_coral_fan: 'Gorgonia de fuego',
  horn_coral_fan: 'Gorgonia de cuerno',
  dead_tube_coral: 'Coral de tubo muerto', dead_brain_coral: 'Coral de cerebro muerto', dead_bubble_coral: 'Coral de burbuja muerto',
  dead_fire_coral: 'Coral de fuego muerto', dead_horn_coral: 'Coral de cuerno muerto',
  dead_tube_coral_fan: 'Gorgonia de tubo muerta', dead_brain_coral_fan: 'Gorgonia de cerebro muerta',
  dead_bubble_coral_fan: 'Gorgonia de burbuja muerta', dead_fire_coral_fan: 'Gorgonia de fuego muerta',
  dead_horn_coral_fan: 'Gorgonia de cuerno muerta',
  nether_brick_fence: 'Valla de ladrillos del Nether', calibrated_sculk_sensor: 'Sensor de sculk calibrado',
  dried_ghast: 'Ghast seco',
  golden_dandelion: 'Diente de león dorado', red_shrub: 'Arbusto rojo', shelf_mushroom: 'Políporo',
  sulfur_spike: 'Azufre puntiagudo', straw_bed: 'Cama de paja', grass: 'Hierba',
  // Hojas de álamo de color: empiezan por un color y no son de la familia de tintes.
  orange_poplar_leaves: 'Hojas de álamo naranjas', red_poplar_leaves: 'Hojas de álamo rojas',
  yellow_poplar_leaves: 'Hojas de álamo amarillas',
  ominous_banner: 'Estandarte ominoso',
  // Bloques infestados (con lepisma dentro)
  infested_stone: 'Piedra infestada', infested_cobblestone: 'Roca infestada',
  infested_stone_bricks: 'Ladrillos de piedra infestados', infested_mossy_stone_bricks: 'Ladrillos de piedra musgosos infestados',
  infested_cracked_stone_bricks: 'Ladrillos de piedra agrietados infestados',
  infested_chiseled_stone_bricks: 'Ladrillos de piedra cincelados infestados', infested_deepslate: 'Pizarra profunda infestada',
  // Losas, escaleras y muros que la regla general no saca bien
  petrified_oak_slab: 'Losa de roble petrificada',
  bamboo_mosaic_slab: 'Losa de mosaico de bambú', bamboo_mosaic_stairs: 'Escaleras de mosaico de bambú',
  // Bloques técnicos
  barrier: 'Barrera', light: 'Luz', structure_block: 'Bloque estructural', jigsaw: 'Bloque rompecabezas',
  command_block: 'Bloque de comandos', chain_command_block: 'Bloque de comandos en cadena',
  repeating_command_block: 'Bloque de comandos de repetición',
  test_block: 'Bloque de pruebas', test_instance_block: 'Bloque de caso de prueba',
  // Bloques que no son ítems (el panel del bloque los enseña tal cual): cultivos,
  // tallos, calderos llenos y lo que no se coloca a mano.
  wheat: 'Cultivo de trigo', carrots: 'Zanahorias', potatoes: 'Patatas', beetroots: 'Remolachas',
  melon_stem: 'Tallo de sandía', attached_melon_stem: 'Tallo de sandía unido',
  pumpkin_stem: 'Tallo de calabaza', attached_pumpkin_stem: 'Tallo de calabaza unido',
  torchflower_crop: 'Cultivo de flor de antorcha', pitcher_crop: 'Cultivo de planta odre',
  sweet_berry_bush: 'Arbusto de bayas dulces', cocoa: 'Cacao', kelp_plant: 'Tallo de alga',
  cave_vines: 'Enredaderas de cueva', cave_vines_plant: 'Tallo de enredaderas de cueva',
  twisting_vines_plant: 'Tallo de enredaderas retorcidas', weeping_vines_plant: 'Tallo de enredaderas lloronas',
  bamboo_sapling: 'Esqueje de bambú', big_dripleaf_stem: 'Tallo de plantaforma grande',
  water_cauldron: 'Caldero con agua', lava_cauldron: 'Caldero con lava', powder_snow_cauldron: 'Caldero con nieve polvo',
  candle_cake: 'Pastel con vela', tripwire: 'Hilo trampa', bubble_column: 'Columna de burbujas',
  fire: 'Fuego', soul_fire: 'Fuego de almas', nether_portal: 'Portal del Nether', end_portal: 'Portal del End',
  end_gateway: 'Nexo del End', piston_head: 'Cabeza de pistón', moving_piston: 'Pistón en movimiento',
  structure_void: 'Vacío estructural', cave_air: 'Aire', void_air: 'Aire',
}

// Plantas en maceta que no se llaman como su planta sin "potted_".
const POT_ES: Record<string, string> = { azalea_bush: 'azalea', flowering_azalea_bush: 'flowering_azalea' }
// Variantes de pared (solo bloques): «Antorcha en pared», «Cartel de roble en
// pared». Los estandartes no: van con su color («Estandarte · rojo»).
const PARED = /^(.+)_wall_(torch|sign|hanging_sign|head|skull|fan)$/

// Cobre de la 1.21.9 con sus grados de oxidación: el grado va detrás y concuerda
// con el cobre, como en el juego («Cofre de cobre expuesto», «Pararrayos oxidado»).
const OXIDO_ES: Record<string, string> = { exposed: 'expuesto', weathered: 'desgastado', oxidized: 'oxidado' }
const CON_OXIDO = new Set(['copper_bars', 'copper_chain', 'copper_chest', 'copper_golem_statue', 'copper_lantern', 'lightning_rod'])

// Losas, escaleras y muros: "Losa de" + el material en minúscula ("Losa de
// ladrillos de piedra"). Las de madera y las de color ya salen por su familia.
const SHAPE_ES: Array<[string, string]> = [['_slab', 'Losa de'], ['_stairs', 'Escaleras de'], ['_wall', 'Muro de']]
// Materiales que no se llaman como su bloque (quartz_slab es de "cuarzo", no de
// "bloque de cuarzo").
const SHAPE_MAT_ES: Record<string, string> = { quartz: 'cuarzo', purpur: 'púrpura', stone_brick: 'ladrillos de piedra' }

function shapeName(base: string): string | null {
  for (const [suf, label] of SHAPE_ES) {
    if (!base.endsWith(suf)) continue
    const mat = base.slice(0, -suf.length)
    const n = SHAPE_MAT_ES[mat] ?? EXACT_ES[mat] ?? EXACT_ES[mat + 's'] ?? EXACT_ES[mat + '_block']
    // Solo la primera letra en minúscula: "Ladrillos del Nether" → "ladrillos del Nether".
    if (n) return `${label} ${n.charAt(0).toLowerCase()}${n.slice(1)}`
  }
  return null
}

export function displayName(name: string): string {
  const base = baseName(name)

  const exact = EXACT_ES[base]
  if (exact) return exact

  // Cobre encerado: el mismo nombre, encerado.
  if (base.startsWith('waxed_')) return `${displayName(base.slice(6))} (encerado)`

  // Maceta con planta y variantes de pared (en la lista de materiales no salen:
  // cuentan como maceta y planta, o como su ítem).
  if (base.startsWith('potted_')) {
    const p = base.slice(7)
    const n = displayName(POT_ES[p] ?? p)
    return `Maceta con ${n.charAt(0).toLowerCase()}${n.slice(1)}`
  }
  if (base === 'wall_torch') return 'Antorcha en pared'
  const pared = PARED.exec(base)
  if (pared) return `${displayName(`${pared[1]}_${pared[2]}`)} en pared`

  const ox = /^(exposed|weathered|oxidized)_(.+)$/.exec(base)
  if (ox && CON_OXIDO.has(ox[2])) return `${EXACT_ES[ox[2]]} ${OXIDO_ES[ox[1]]}`

  // Familia de tintes. Las losas y escaleras de lana u hormigón, con su forma
  // delante («Losa de lana · blanco»): salían igual que el bloque.
  for (const c of COLOR_KEYS) {
    if (base === c || base.startsWith(c + '_')) {
      let suffix = base.slice(c.length + 1)
      let forma = ''
      for (const [suf, label] of SHAPE_ES) if (suffix.endsWith(suf)) { suffix = suffix.slice(0, -suf.length); forma = label; break }
      for (const [key, label] of DYE_MATERIAL_ES) {
        if (suffix.includes(key)) return forma ? `${forma} ${label.toLowerCase()} · ${COLOR_ES[c]}` : `${label} · ${COLOR_ES[c]}`
      }
    }
  }

  // Familia de maderas
  const stripped = base.startsWith('stripped_')
  const woodBase = stripped ? base.slice('stripped_'.length) : base
  for (const w of WOOD_KEYS) {
    if (woodBase === w || woodBase.startsWith(w + '_')) {
      const suffix = woodBase.slice(w.length + 1)
      for (const [key, label] of WOOD_MATERIAL_ES) {
        if (suffix.includes(key)) {
          const mat = stripped && PELADO_ES[key] ? `${label} ${PELADO_ES[key]}` : label
          return `${mat} de ${WOOD_ES[w]}`
        }
      }
    }
  }

  return shapeName(base) ?? prettify(base)
}

function prettify(base: string): string {
  const s = base.replace(/_/g, ' ')
  return s.charAt(0).toUpperCase() + s.slice(1)
}
