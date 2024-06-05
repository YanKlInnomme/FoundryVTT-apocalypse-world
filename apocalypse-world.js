Hooks.on('init', () => {
  game.settings.register('apocalypse-world', 'settings-override', {
    name: game.i18n.localize("apocalypseWorld.Settings.Title"),
    default: false,
    type: Boolean,
    scope: 'world',
    config: true,
    hint: game.i18n.localize("apocalypseWorld.Settings.Hint"),
    requiresReload: true
  });

  Babele?.get()?.register({
    module: 'apocalypse-world',
    lang: 'fr',
    dir: 'compendium'
  });
});

Hooks.on("renderSettings", (app, html) => {
  const links = {
    shop: {
      title: game.i18n.localize(`APOCALYPSEWORLD.Links.ShopTitle`),
      url: game.i18n.localize(`APOCALYPSEWORLD.Links.ShopURL`),
      iconClass: "fa-solid fa-cart-shopping"
    },
    git: {
      title: game.i18n.localize(`APOCALYPSEWORLD.Links.GitTitle`),
      url: game.i18n.localize(`APOCALYPSEWORLD.Links.GitURL`),
      iconClass: "fab fa-github"
    },
    donation: {
      title: game.i18n.localize(`APOCALYPSEWORLD.Links.DonationTitle`),
      url: game.i18n.localize(`APOCALYPSEWORLD.Links.DonationURL`),
      iconClass: "fa-regular fa-mug-hot fa-bounce"
    }
  };

  const createButton = (text, iconClass, url) => {
    const button = $(`<button><i class="${iconClass}"></i> ${text} <sup><i class="fa-light fa-up-right-from-square"></i></sup></button>`);
    button.on("click", ev => {
      ev.preventDefault();
      window.open(url, "_blank");
    });
    return button;
  };
  
  const addLinkButton = (container, link) => {
    const button = createButton(link.title, link.iconClass, link.url);
    container.append(button);
  };

  const title = game.i18n.localize(`APOCALYPSEWORLD.Links.Title`);
  const lotdSection = $(`<h2>${title}</h2>`);
  html.find("#settings-game").after(lotdSection);

  const lotdDiv = $(`<div></div>`);
  lotdSection.after(lotdDiv);

  addLinkButton(lotdDiv, links.shop);
  addLinkButton(lotdDiv, links.git);
  addLinkButton(lotdDiv, links.donation);
});

Hooks.once('pbtaSheetConfig', () => {
  const highlightlabel = game.i18n.localize("APOCALYPSEWORLD.Highlight.Label");
  const failurelabel = game.i18n.localize("PBTA.failure");
  const partiallabel = game.i18n.localize("PBTA.partial");
  const successlabel = game.i18n.localize("PBTA.success");
  const stats = ["Cool", "Hard", "Hot", "Sharp", "Weird"];
  const harmoptions = ["1", "2", "3", "4"];
  const movetypes = ["Basic", "Battle", "RoadWar", "Class", "Peripheral"];
  const equipmenttypes = ["Gear", "Barter"];
  const kindoptions = ["1", "2", "3", "4", "5", "6", "7"];

  game.settings.set('pbta', 'sheetConfigOverride', true);
  game.pbta.tagConfigOverride = {
    general: '[{"value":"feu"}]',
    actor: {
      all: '[{"value":"personne"}]',
      character: '[{"value":"larbin"}]'
    },
    item: {
      all: '[{"value":"consommable"}]',
      move: '[{"value":"épée"}]'
    }
  };
  game.pbta.sheetConfig = {
    rollFormula: "2d6",
    statToggle: {
      label: highlightlabel,
      modifier: 0
    },
    rollResults: {
      failure: {
        start: null,
        end: 6,
        label: failurelabel
      },
      partial: {
        start: 7,
        end: 9,
        label: partiallabel
      },
      success: {
        start: 10,
        end: 12,
        label: successlabel
      }
    },
    actorTypes: {
      character: {
        stats: Object.fromEntries(stats.map(stat => [stat.toLowerCase(), { label: game.i18n.localize(`APOCALYPSEWORLD.Stats.${stat}`), value: 0 }])),
        attrTop: {
          harm: {
            label: game.i18n.localize("APOCALYPSEWORLD.Harm.Label"),
            description: game.i18n.localize("APOCALYPSEWORLD.Harm.Description"),
            customLabel: false,
            userLabel: false,
            type: "Clock",
            value: 0,
            max: 6,
            steps: Array(6).fill(false)
          },
          harmConditions: {
            label: game.i18n.localize("APOCALYPSEWORLD.Harm.Options.Label"),
            description: null,
            customLabel: false,
            userLabel: false,
            type: "ListMany",
            condition: false,
            options: Object.fromEntries(harmoptions.map(option => [option, { label: game.i18n.localize(`APOCALYPSEWORLD.Harm.Options.${option}`), value: false }])),
          },
          special: {
            label: game.i18n.localize("APOCALYPSEWORLD.Special.Label"),
            description: null,
            customLabel: false,
            userLabel: false,
            type: "LongText",
            value: ""
          },
          hx: {
            label: game.i18n.localize("APOCALYPSEWORLD.Hx.Label"),
            description: null,
            customLabel: false,
            userLabel: false,
            type: "LongText",
            value: ""
          },
        },
        attrLeft: {
          hold: {
            label: game.i18n.localize("APOCALYPSEWORLD.Hold.Label"),
            description: null,
            customLabel: false,
            userLabel: false,
            type: "Resource",
            value: 0,
            max: 0
          },
          armor: {
            label: game.i18n.localize("APOCALYPSEWORLD.Armor.Label"),
            description: null,
            customLabel: false,
            userLabel: false,
            type: "Number",
            value: 0
          },
          xp: {
            label: game.i18n.localize("APOCALYPSEWORLD.XP.Label"),
            description: game.i18n.localize("APOCALYPSEWORLD.XP.Description"),
            customLabel: false,
            userLabel: false,
            type: "Xp",
            value: 0,
            max: 5,
            steps: Array(5).fill(false)
          },
          improvement: {
            label: game.i18n.localize("APOCALYPSEWORLD.Improvement.Label"),
            description: null,
            customLabel: false,
            userLabel: false,
            type: "LongText",
            value: ""
          },
          look: {
            label: game.i18n.localize("APOCALYPSEWORLD.Look.Label"),
            description: null,
            customLabel: false,
            userLabel: false,
            type: "LongText",
            value: ""
          }
        },

        moveTypes: Object.fromEntries(movetypes.map(type => {
          let creationValue = true;
          if (type.toLowerCase() === "class") {
              creationValue = false;
          }
          return [type.toLowerCase(), { 
              label: game.i18n.localize(`APOCALYPSEWORLD.MoveTypes.${type}`), 
              moves: [], 
              creation: creationValue 
          }];
       })),
      
        equipmentTypes: Object.fromEntries(equipmenttypes.map(type => [type.toLowerCase(), { label: game.i18n.localize(`APOCALYPSEWORLD.EquipmentTypes.${type}`), mouvements: [] }]))
      },
      npc: {
        attrTop: {
          impulse: {
            label: game.i18n.localize("APOCALYPSEWORLD.Impulse.Label"),
            description: null,
            customLabel: false,
            userLabel: false,
            type: "LongText",
            value: ""
          },
          stake: {
            label: game.i18n.localize("APOCALYPSEWORLD.Stake.Label"),
            description: null,
            customLabel: false,
            userLabel: false,
            type: "LongText",
            value: ""
          },
          connectedthreats: {
            label: game.i18n.localize("APOCALYPSEWORLD.ConnectedThreats.Label"),
            description: null,
            customLabel: false,
            userLabel: false,
            type: "LongText",
            value: ""
          }
        },
        attrLeft: {
          countdown: {
            label: game.i18n.localize("APOCALYPSEWORLD.Countdown.Label"),
            description: null,
            customLabel: false,
            userLabel: false,
            type: "Resource",
            value: 0,
            max: 0
          },
          kind: {
            label: game.i18n.localize("APOCALYPSEWORLD.Kind.Options.Label"),
            description: null,
            customLabel: false,
            userLabel: false,
            type: "ListOne",
            default: 0,
            condition: false,
            options: Object.fromEntries(kindoptions.map(option => [option, { label: game.i18n.localize(`APOCALYPSEWORLD.Kind.Options.${option}`), value: false }])),
          }
        },
        moveTypes: {
          threat: {
            label: game.i18n.localize("APOCALYPSEWORLD.MoveTypes.Threat"),
            moves: []
          }
        },
        equipmentTypes: Object.fromEntries(equipmenttypes.map(type => [type.toLowerCase(), { label: game.i18n.localize(`APOCALYPSEWORLD.EquipmentTypes.${type}`), mouvements: [] }]))
      }
    }
  };

  Hooks.once('ready', async function() {
    try {
      const overrideSettings = await game.settings.get('apocalypse-world', 'settings-override');
    
      if (!overrideSettings) {
        await game.settings.set('pbta', 'hideRollMode', true);
        await game.settings.set('pbta', 'hideUses', true);
      }
    } catch (error) {
      console.error("Error accessing apocalypse-world settings:", error);
    }
  });
});
