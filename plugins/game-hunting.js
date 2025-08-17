let handler = async (m, { conn, command, usedPrefix, args }) => {
    // Initialize user data if it doesn't exist
    if (!global.db.data.users[m.sender].hunting) {
      global.db.data.users[m.sender].hunting = {
        weapon: 0, // 0: No weapon, 1: Basic weapon, 2: Advanced weapon
        animals: {
          common: 0,
          uncommon: 0,
          rare: 0,
          epic: 0,
          legendary: 0,
        },
      };
    }
  
    const userHuntingData = global.db.data.users[m.sender].hunting;
  
    const animalPrices = {
      common: 15,
      uncommon: 30,
      rare: 60,
      epic: 120,
      legendary: 300,
    };
  
    const weaponPrices = {
      basic: 750,
      advanced: 2000,
    };
  
    const weaponNames = {
      0: "Sin arma",
      1: "Arma básica",
      2: "Arma avanzada",
    };
  
    const animalNames = {
      common: "Animal común",
      uncommon: "Animal poco común",
      rare: "Animal raro",
      epic: "Animal épico",
      legendary: "Animal legendario",
    };
  
    const helpMessage = `
  ${emoji} *Comandos de Caza*
  
  *${usedPrefix}cazar*
  > 🏹 Intenta cazar un animal.
  
  *${usedPrefix}inventarioanimal*
  > 🎒 Muestra tu inventario de caza.
  
  *${usedPrefix}venderanimal <tipo> <cantidad>*
  > 💰 Vende tus animales.
  > Tipos: común, poco común, raro, épico, legendario.
  > Ejemplo: *${usedPrefix}venderanimal común 5*
  
  *${usedPrefix}comprararma <objeto>*
  > 🛍️ Compra un arma de caza.
  > Objetos: básica, avanzada.
  > Ejemplo: *${usedPrefix}comprararma básica*
  
  *${usedPrefix}verarma*
  > 🏹 Muestra tu arma actual.
  
  *${usedPrefix}ayudacaza*
  > ❓ Muestra este menú de ayuda.
    `;
  
    const inventoryMessage = `
  ${emoji} *Inventario de Caza de ${m.name}*
  
  🏹 Arma: ${weaponNames[userHuntingData.weapon]}
  🐾 Animales:
    - Común: ${userHuntingData.animals.common}
    - Poco común: ${userHuntingData.animals.uncommon}
    - Raro: ${userHuntingData.animals.rare}
    - Épico: ${userHuntingData.animals.epic}
    - Legendario: ${userHuntingData.animals.legendary}
    `;
  
    const weaponMessage = `
  ${emoji} *Tu arma actual es:* ${weaponNames[userHuntingData.weapon]}
    `;
  
    switch (command) {
      case "cazar":
      case "caza":
        if (userHuntingData.weapon === 0) {
          return m.reply(`${emoji} Necesitas comprar un arma de caza primero. Usa *${usedPrefix}comprararma básica*`);
        }
  
        const animalType = getAnimal(userHuntingData.weapon);
        userHuntingData.animals[animalType]++;
        const animalName = animalNames[animalType];
        m.reply(`${emoji} ¡Has cazado un ${animalName}!`);
        break;
  
      case "inventarioanimal":
        m.reply(inventoryMessage);
        break;
  
      case "venderanimal":
        if (args.length < 2) {
          return m.reply(`${emoji} Debes especificar el tipo de animal y la cantidad. Ejemplo: *${usedPrefix}venderanimal común 5*`);
        }
        const sellType = args[0].toLowerCase();
        const sellAmount = parseInt(args[1]);
  
        if (!animalPrices[sellType]) {
          return m.reply(`${emoji} Tipo de animal inválido. Los tipos válidos son: común, poco común, raro, épico, legendario.`);
        }
  
        if (isNaN(sellAmount) || sellAmount <= 0) {
          return m.reply(`${emoji} La cantidad debe ser un número mayor que cero.`);
        }
  
        if (userHuntingData.animals[sellType] < sellAmount) {
          return m.reply(`${emoji} No tienes suficientes animales de tipo ${sellType} para vender.`);
        }
  
        userHuntingData.animals[sellType] -= sellAmount;
        const totalEarned = animalPrices[sellType] * sellAmount;
        global.db.data.users[m.sender].money += totalEarned;
        m.reply(`${emoji} Has vendido ${sellAmount} ${animalNames[sellType]} por ${totalEarned} ${moneda}.`);
        break;
  
      case "comprararma":
        if (args.length < 1) {
          return m.reply(`${emoji} Debes especificar qué quieres comprar. Ejemplo: *${usedPrefix}comprararma básica*`);
        }
        const buyType = args[0].toLowerCase();
        if (buyType === "básica" || buyType === "basica") {
          if (userHuntingData.weapon >= 1) {
            return m.reply(`${emoji} Ya tienes un arma de caza.`);
          }
          if (global.db.data.users[m.sender].money < weaponPrices.basic) {
            return m.reply(`${emoji} No tienes suficiente ${moneda} para comprar un arma básica. Cuesta ${weaponPrices.basic} ${moneda}.`);
          }
          // Deduct the cost of the weapon
          global.db.data.users[m.sender].money -= weaponPrices.basic;
          userHuntingData.weapon = 1;
          m.reply(`${emoji} Has comprado un arma básica por ${weaponPrices.basic} ${moneda}.`);
        } else if (buyType === "avanzada") {
          if (userHuntingData.weapon >= 2) {
            return m.reply(`${emoji} Ya tienes un arma avanzada.`);
          }
          if (userHuntingData.weapon < 1) {
            return m.reply(`${emoji} Necesitas comprar primero un arma básica.`);
          }
          if (global.db.data.users[m.sender].money < weaponPrices.advanced) {
            return m.reply(`${emoji} No tienes suficiente ${moneda} para comprar un arma avanzada. Cuesta ${weaponPrices.advanced} ${moneda}.`);
          }
          // Deduct the cost of the weapon
          global.db.data.users[m.sender].money -= weaponPrices.advanced;
          userHuntingData.weapon = 2;
          m.reply(`${emoji} Has comprado un arma avanzada por ${weaponPrices.advanced} ${moneda}.`);
        } else {
          m.reply(`${emoji} Objeto inválido. Los objetos disponibles son: básica, avanzada.`);
        }
        break;
  
      case "verarma":
        m.reply(weaponMessage);
        break;
  
      case "ayudacaza":
        m.reply(helpMessage);
        break;
  
      default:
        break;
    }
  };
  
  handler.help = ["cazar", "inventarioanimal", "venderanimal", "comprararma", "verarma", "ayudacaza"];
  handler.tags = ["game", "economy"];
  handler.command = ["cazar", "caza", "inventarioanimal", "venderanimal", "comprararma", "verarma", "ayudacaza"];
  handler.register = true;
  
  export default handler;
  
  function getAnimal(weaponLevel) {
    const random = Math.random();
    if (weaponLevel === 1) {
      // Basic weapon
      if (random < 0.6) return "common"; // 60%
      if (random < 0.85) return "uncommon"; // 25%
      if (random < 0.95) return "rare"; // 10%
      return "epic"; // 5%
    } else if (weaponLevel === 2) {
      // Advanced weapon
      if (random < 0.4) return "common"; // 40%
      if (random < 0.7) return "uncommon"; // 30%
      if (random < 0.9) return "rare"; // 20%
      if (random < 0.98) return "epic"; // 8%
      return "legendary"; // 2%
    } else {
      return "common";
    }
  }

  