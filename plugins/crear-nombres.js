// Generador avanzado de nicks con muchos tipos de letra Unicode y también variantes con símbolos decorativos
// By Copilot & Fer280809

const fuentes = [
    { name: "Negrita", map: { A:"𝗔",B:"𝗕",C:"𝗖",D:"𝗗",E:"𝗘",F:"𝗙",G:"𝗚",H:"𝗛",I:"𝗜",J:"𝗝",K:"𝗞",L:"𝗟",M:"𝗠",N:"𝗡",O:"𝗢",P:"𝗣",Q:"𝗤",R:"𝗥",S:"𝗦",T:"𝗧",U:"𝗨",V:"𝗩",W:"𝗪",X:"𝗫",Y:"𝗬",Z:"𝗭",a:"𝗮",b:"𝗯",c:"𝗰",d:"𝗱",e:"𝗲",f:"𝗳",g:"𝗴",h:"𝗵",i:"𝗶",j:"𝗷",k:"𝗸",l:"𝗹",m:"𝗺",n:"𝗻",o:"𝗼",p:"𝗽",q:"𝗾",r:"𝗿",s:"𝘀",t:"𝘁",u:"𝘂",v:"𝘃",w:"𝘄",x:"𝘅",y:"𝘆",z:"𝘇" }},
    { name: "Cursiva", map: { A:"𝐴",B:"𝐵",C:"𝐶",D:"𝐷",E:"𝐸",F:"𝐹",G:"𝐺",H:"𝐻",I:"𝐼",J:"𝐽",K:"𝐾",L:"𝐿",M:"𝑀",N:"𝑁",O:"𝑂",P:"𝑃",Q:"𝑄",R:"𝑅",S:"𝑆",T:"𝑇",U:"𝑈",V:"𝑉",W:"𝑊",X:"𝑋",Y:"𝑌",Z:"𝑍",a:"𝑎",b:"𝑏",c:"𝑐",d:"𝑑",e:"𝑒",f:"𝑓",g:"𝑔",h:"ℎ",i:"𝑖",j:"𝑗",k:"𝑘",l:"𝑙",m:"𝑚",n:"𝑛",o:"𝑜",p:"𝑝",q:"𝑞",r:"𝑟",s:"𝑠",t:"𝑡",u:"𝑢",v:"𝑣",w:"𝑤",x:"𝑥",y:"𝑦",z:"𝑧" }},
    { name: "Negrita Cursiva", map: { A:"𝑨",B:"𝑩",C:"𝑪",D:"𝑫",E:"𝑬",F:"𝑭",G:"𝑮",H:"𝑯",I:"𝑰",J:"𝑱",K:"𝑲",L:"𝑳",M:"𝑴",N:"𝑵",O:"𝑶",P:"𝑷",Q:"𝑸",R:"𝑹",S:"𝑺",T:"𝑻",U:"𝑼",V:"𝑽",W:"𝑾",X:"𝑿",Y:"𝒀",Z:"𝒁",a:"𝒂",b:"𝒃",c:"𝒄",d:"𝒅",e:"𝒆",f:"𝒇",g:"𝒈",h:"𝒉",i:"𝒊",j:"𝒋",k:"𝒌",l:"𝒍",m:"𝒎",n:"𝒏",o:"𝒐",p:"𝒑",q:"𝒒",r:"𝒓",s:"𝒔",t:"𝒕",u:"𝒖",v:"𝒗",w:"𝒘",x:"𝒙",y:"𝒚",z:"𝒛" }},
    { name: "Monoespaciada", map: { A:"𝙰",B:"𝙱",C:"𝙲",D:"𝙳",E:"𝙴",F:"𝙵",G:"𝙶",H:"𝙷",I:"𝙸",J:"𝙹",K:"𝙺",L:"𝙻",M:"𝙼",N:"𝙽",O:"𝙾",P:"𝙿",Q:"𝚀",R:"𝚁",S:"𝚂",T:"𝚃",U:"𝚄",V:"𝚅",W:"𝚆",X:"𝚇",Y:"𝚈",Z:"𝚉",a:"𝚊",b:"𝚋",c:"𝚌",d:"𝚍",e:"𝚎",f:"𝚏",g:"𝚐",h:"𝚑",i:"𝚒",j:"𝚓",k:"𝚔",l:"𝚕",m:"𝚖",n:"𝚗",o:"𝚘",p:"𝚙",q:"𝚚",r:"𝚛",s:"𝚜",t:"𝚝",u:"𝚞",v:"𝚟",w:"𝚠",x:"𝚡",y:"𝚢",z:"𝚣" }},
    { name: "Doble línea", map: { A:"𝔸",B:"𝔹",C:"ℂ",D:"𝔻",E:"𝔼",F:"𝔽",G:"𝔾",H:"ℍ",I:"𝕀",J:"𝕁",K:"𝕂",L:"𝕃",M:"𝕄",N:"ℕ",O:"𝕆",P:"ℙ",Q:"ℚ",R:"ℝ",S:"𝕊",T:"𝕋",U:"𝕌",V:"𝕍",W:"𝕎",X:"𝕏",Y:"𝕐",Z:"ℤ",a:"𝕒",b:"𝕓",c:"𝕔",d:"𝕕",e:"𝕖",f:"𝕗",g:"𝕘",h:"𝕙",i:"𝕚",j:"𝕛",k:"𝕜",l:"𝕝",m:"𝕞",n:"𝕟",o:"𝕠",p:"𝕡",q:"𝕢",r:"𝕣",s:"𝕤",t:"𝕥",u:"𝕦",v:"𝕧",w:"𝕨",x:"𝕩",y:"𝕪",z:"𝕫" }},
    { name: "Gótica", map: { A:"𝔄",B:"𝔅",C:"ℭ",D:"𝔇",E:"𝔈",F:"𝔉",G:"𝔊",H:"ℌ",I:"ℑ",J:"𝔍",K:"𝔎",L:"𝔏",M:"𝔐",N:"𝔑",O:"𝔒",P:"𝔓",Q:"𝔔",R:"ℜ",S:"𝔖",T:"𝔗",U:"𝔘",V:"𝔙",W:"𝔚",X:"𝔛",Y:"𝔜",Z:"ℨ",a:"𝔞",b:"𝔟",c:"𝔠",d:"𝔡",e:"𝔢",f:"𝔣",g:"𝔤",h:"𝔥",i:"𝔦",j:"𝔧",k:"𝔨",l:"𝔩",m:"𝔪",n:"𝔫",o:"𝔬",p:"𝔭",q:"𝔮",r:"𝔯",s:"𝔰",t:"𝔱",u:"𝔲",v:"𝔳",w:"𝔴",x:"𝔵",y:"𝔶",z:"𝔷" }},
    { name: "Gótica Negrita", map: { A:"𝕬",B:"𝕭",C:"𝕮",D:"𝕯",E:"𝕰",F:"𝕱",G:"𝕲",H:"𝕳",I:"𝕴",J:"𝕵",K:"𝕶",L:"𝕷",M:"𝕸",N:"𝕹",O:"𝕺",P:"𝕻",Q:"𝕼",R:"𝕽",S:"𝕾",T:"𝕿",U:"𝖀",V:"𝖁",W:"𝖂",X:"𝖃",Y:"𝖄",Z:"𝖅",a:"𝖆",b:"𝖇",c:"𝖈",d:"𝖉",e:"𝖊",f:"𝖋",g:"𝖌",h:"𝖍",i:"𝖎",j:"𝖏",k:"𝖐",l:"𝖑",m:"𝖒",n:"𝖓",o:"𝖔",p:"𝖕",q:"𝖖",r:"𝖗",s:"𝖘",t:"𝖙",u:"𝖚",v:"𝖛",w:"𝖜",x:"𝖝",y:"𝖞",z:"𝖟" }},
    { name: "Fullwidth", map: { A:"Ａ",B:"Ｂ",C:"Ｃ",D:"Ｄ",E:"Ｅ",F:"Ｆ",G:"Ｇ",H:"Ｈ",I:"Ｉ",J:"Ｊ",K:"Ｋ",L:"Ｌ",M:"Ｍ",N:"Ｎ",O:"Ｏ",P:"Ｐ",Q:"Ｑ",R:"Ｒ",S:"Ｓ",T:"Ｔ",U:"Ｕ",V:"Ｖ",W:"Ｗ",X:"Ｘ",Y:"Ｙ",Z:"Ｚ",a:"ａ",b:"ｂ",c:"ｃ",d:"ｄ",e:"ｅ",f:"ｆ",g:"ｇ",h:"ｈ",i:"ｉ",j:"ｊ",k:"ｋ",l:"ｌ",m:"ｍ",n:"ｎ",o:"ｏ",p:"ｐ",q:"ｑ",r:"ｒ",s:"ｓ",t:"ｔ",u:"ｕ",v:"ｖ",w:"ｗ",x:"ｘ",y:"ｙ",z:"ｚ" }},
    { name: "Subrayada", map: Object.fromEntries("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("").map(l => [l, l + "\u0332"])) },
    { name: "Tachada", map: Object.fromEntries("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("").map(l => [l, l + "\u0336"])) },
    { name: "Subíndice", map: { A:"ₐ",E:"ₑ",H:"ₕ",I:"ᵢ",J:"ⱼ",K:"ₖ",L:"ₗ",M:"ₘ",N:"ₙ",O:"ₒ",P:"ₚ",R:"ᵣ",S:"ₛ",T:"ₜ",U:"ᵤ",V:"ᵥ",X:"ₓ",a:"ₐ",e:"ₑ",h:"ₕ",i:"ᵢ",j:"ⱼ",k:"ₖ",l:"ₗ",m:"ₘ",n:"ₙ",o:"ₒ",p:"ₚ",r:"ᵣ",s:"ₛ",t:"ₜ",u:"ᵤ",v:"ᵥ",x:"ₓ"} },
    { name: "Superíndice", map: { A:"ᴬ",B:"ᴮ",D:"ᴰ",E:"ᴱ",G:"ᴳ",H:"ᴴ",I:"ᴵ",J:"ᴶ",K:"ᴷ",L:"ᴸ",M:"ᴹ",N:"ᴺ",O:"ᴼ",P:"ᴾ",R:"ᴿ",T:"ᵀ",U:"ᵁ",V:"ⱽ",W:"ᵂ",a:"ᵃ",b:"ᵇ",c:"ᶜ",d:"ᵈ",e:"ᵉ",f:"ᶠ",g:"ᵍ",h:"ʰ",i:"ⁱ",j:"ʲ",k:"ᵏ",l:"ˡ",m:"ᵐ",n:"ⁿ",o:"ᵒ",p:"ᵖ",r:"ʳ",s:"ˢ",t:"ᵗ",u:"ᵘ",v:"ᵛ",w:"ʷ",x:"ˣ",y:"ʸ",z:"ᶻ" }},
    { name: "Pequeña", map: { A:"ᴀ",B:"ʙ",C:"ᴄ",D:"ᴅ",E:"ᴇ",F:"ꜰ",G:"ɢ",H:"ʜ",I:"ɪ",J:"ᴊ",K:"ᴋ",L:"ʟ",M:"ᴍ",N:"ɴ",O:"ᴏ",P:"ᴘ",Q:"ǫ",R:"ʀ",S:"s",T:"ᴛ",U:"ᴜ",V:"ᴠ",W:"ᴡ",X:"x",Y:"ʏ",Z:"ᴢ",a:"ᴀ",b:"ʙ",c:"ᴄ",d:"ᴅ",e:"ᴇ",f:"ꜰ",g:"ɢ",h:"ʜ",i:"ɪ",j:"ᴊ",k:"ᴋ",l:"ʟ",m:"ᴍ",n:"ɴ",o:"ᴏ",p:"ᴘ",q:"ǫ",r:"ʀ",s:"s",t:"ᴛ",u:"ᴜ",v:"ᴠ",w:"ᴡ",x:"x",y:"ʏ",z:"ᴢ" }},
    { name: "Invertida", map: Object.fromEntries("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("").map((l, i) => [l, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("").reverse()[i]])) },
    // Ahora, variantes con símbolos decorativos (no solo letras):
    ...Array.from({length: 20}, (_, i) => {
        // Usamos decoradores emoji/símbolo para simular más "tipos de letra"
        const base = [
          "★","✦","✧","✪","✩","✫","✭","✯","✰","❂",
          "❇","❈","❉","❊","❖","⟆","⟅","⚝","⚚","⚛"
        ];
        let deco = base[i % base.length];
        let map = {};
        for (let c of "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz") map[c] = deco + c + deco;
        return { name: `Simbolo ${i+1} ${deco}`, map };
    })
  ];
  
  const decoradores = [
    { name: "Clásico", pre: "『", post: "』" },
    { name: "Espadas", pre: "༒", post: "༒" },
    { name: "Rey", pre: "♛", post: "♛" },
    { name: "Estrella", pre: "★", post: "★" },
    { name: "Corazón", pre: "❥", post: "❥" },
    { name: "Flor", pre: "✿", post: "✿" },
    { name: "Check", pre: "", post: "✓" },
    { name: "Random", pre: "亗", post: "亗" },
    { name: "Flecha", pre: "➤", post: "" },
    { name: "Ninja", pre: "ツ", post: "" },
    { name: "Gato", pre: "ฅ^•ﻌ•^ฅ", post: "" },
    { name: "Círculo", pre: "⬤", post: "⬤" },
    { name: "Rayo", pre: "⚡", post: "⚡" },
    { name: "Corona", pre: "👑", post: "👑" },
    { name: "Alien", pre: "👽", post: "👾" },
    { name: "Fuego", pre: "🔥", post: "🔥" },
    { name: "Música", pre: "🎵", post: "🎶" },
    { name: "Dragón", pre: "🐉", post: "🐲" },
    { name: "Flor2", pre: "🌸", post: "🌺" },
  ];
  
  function aFuente(text, map) {
    return text.split('').map(l => map[l] || l).join('');
  }
  
  let handler = async (m, { args, command }) => {
    if (!args[0]) {
      let fuentesList = fuentes.map((f, i) => `${i+1}. ${f.name}`).join('\n');
      let decoList = decoradores.map((d, i) => `${i+1}. ${d.name}`).join('\n');
      return m.reply(
  `✨ *Generador avanzado de nombres y nicks*
  
  Ejemplo:
  !${command} Shadow 2 8
  
  Primer número = tipo de letra, segundo = decorador opcional.
  
  *Tipos de letra:*
  ${fuentesList}
  
  *Decoradores:*
  ${decoList}
  
  Si solo pones el nombre, recibes muchas variantes aleatorias.
  `
      );
    }
  
    let base = args[0];
    let fuenteIdx = (parseInt(args[1]) || Math.floor(Math.random()*fuentes.length)) - 1;
    let decoIdx = (parseInt(args[2]) || Math.floor(Math.random()*decoradores.length)) - 1;
  
    fuenteIdx = Math.max(0, Math.min(fuenteIdx, fuentes.length-1));
    decoIdx = Math.max(0, Math.min(decoIdx, decoradores.length-1));
  
    let fuente = fuentes[fuenteIdx];
    let decorador = decoradores[decoIdx];
  
    let principal = decorador.pre + aFuente(base, fuente.map) + decorador.post;
  
    // Variantes extra creativas
    let extras = [];
    for (let i = 0; i < 8; i++) {
      let randFuente = fuentes[Math.floor(Math.random()*fuentes.length)];
      let randDeco = decoradores[Math.floor(Math.random()*decoradores.length)];
      extras.push(randDeco.pre + aFuente(base, randFuente.map) + randDeco.post);
    }
    // Bonus: reversa, todo mayus, todo minus, espaciado
    extras.push(base.split('').reverse().join(''));
    extras.push(base.toUpperCase());
    extras.push(base.toLowerCase());
    extras.push(base.split('').join(' '));
  
    let msg = `✨ *Tu nombre creativo:*\n${principal}\n\n*Otras variantes:*\n- `+extras.join('\n- ');
    m.reply(msg);
  };
  
  handler.help = ['nombre <texto> [tipoLetra] [decorador]'];
  handler.tags = ['tools', 'fun', 'nick'];
  handler.command = ['nombre','nombres','nick','nickname','crearnick','creanombre'];
  export default handler;
