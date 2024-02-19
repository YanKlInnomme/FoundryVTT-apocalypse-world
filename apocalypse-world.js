Hooks.on("renderSettings", (app, html) => {
  const links = {
    shop: {
      title: game.i18n.localize(`APOCALYPSEWORLD.Links.ShopTitle`),
      url: game.i18n.localize(`APOCALYPSEWORLD.Links.ShopURL`)
    },
    git: {
      title: game.i18n.localize(`APOCALYPSEWORLD.Links.GitTitle`),
      url: game.i18n.localize(`APOCALYPSEWORLD.Links.GitURL`)
    },
    donation: {
      title: game.i18n.localize(`APOCALYPSEWORLD.Links.DonationTitle`),
      url: game.i18n.localize(`APOCALYPSEWORLD.Links.DonationURL`)
    }
  };

  const createButton = (text, iconClass) => {
    return $(`<button><i class="${iconClass}"></i> ${text} <sup><i class="fa-light fa-up-right-from-square"></i></sup></button>`);
  };

  const addButtonClickListener = (button, url) => {
    button.on("click", ev => {
      ev.preventDefault();
      window.open(url, "_blank");
    });
  };

  const addLinkButton = (container, link) => {
    const button = createButton(link.title, link.iconClass);
    container.append(button);
    addButtonClickListener(button, link.url);
  };

  let title = game.i18n.localize(`APOCALYPSEWORLD.Links.Title`);
  let lotdSection = $(`<h2>${title}</h2>`);
  html.find("#settings-game").after(lotdSection);

  let lotdDiv = $(`<div></div>`);
  lotdSection.after(lotdDiv);

  addLinkButton(lotdDiv, { title: links.shop.title, url: links.shop.url, iconClass: "fa-solid fa-cart-shopping" });
  addLinkButton(lotdDiv, { title: links.git.title, url: links.git.url, iconClass: "fab fa-github" });
  addLinkButton(lotdDiv, { title: links.donation.title, url: links.donation.url, iconClass: "fa-regular fa-mug-hot fa-bounce" });
});


Hooks.once('pbtaSheetConfig', () => {
  let failurelabel = game.i18n.localize("PBTA.failure");
  let partiallabel = game.i18n.localize("PBTA.partial");
  let successlabel = game.i18n.localize("PBTA.success");
  let cool = game.i18n.localize("APOCALYPSEWORLD.Stats.Cool");
  let hard = game.i18n.localize("APOCALYPSEWORLD.Stats.Hard");
  let hot = game.i18n.localize("APOCALYPSEWORLD.Stats.Hot");
  let sharp = game.i18n.localize("APOCALYPSEWORLD.Stats.Sharp");
  let weird = game.i18n.localize("APOCALYPSEWORLD.Stats.Weird");
  let harmlabel = game.i18n.localize("APOCALYPSEWORLD.Harm.Label");
  let harmdescription = game.i18n.localize("APOCALYPSEWORLD.Harm.Description");
  let harmoptionslabel = game.i18n.localize("APOCALYPSEWORLD.Harm.Options.Label");
  let harmoption1 = game.i18n.localize("APOCALYPSEWORLD.Harm.Options.1");
  let harmoption2 = game.i18n.localize("APOCALYPSEWORLD.Harm.Options.2");
  let harmoption3 = game.i18n.localize("APOCALYPSEWORLD.Harm.Options.3");
  let harmoption4 = game.i18n.localize("APOCALYPSEWORLD.Harm.Options.4");
  let speciallabel = game.i18n.localize("APOCALYPSEWORLD.Special.Label");
  let highlightlabel = game.i18n.localize("APOCALYPSEWORLD.Highlight.Label");
  let holdlabel = game.i18n.localize("APOCALYPSEWORLD.Hold.Label");
  let armorlabel = game.i18n.localize("APOCALYPSEWORLD.Armor.Label");
  let xplabel = game.i18n.localize("APOCALYPSEWORLD.XP.Label");
  let xpdescription = game.i18n.localize("APOCALYPSEWORLD.XP.Description");
  let hxlabel = game.i18n.localize("APOCALYPSEWORLD.Hx.Label");
  let improvementlabel = game.i18n.localize("APOCALYPSEWORLD.Improvement.Label");
  let looklabel = game.i18n.localize("APOCALYPSEWORLD.Look.Label");
  let movetypesbasic = game.i18n.localize("APOCALYPSEWORLD.MoveTypes.Basic");
  let movetypesbattle = game.i18n.localize("APOCALYPSEWORLD.MoveTypes.Battle");
  let movetypesroadwar = game.i18n.localize("APOCALYPSEWORLD.MoveTypes.RoadWar");
  let movetypesclass = game.i18n.localize("APOCALYPSEWORLD.MoveTypes.Class");
  let movetypesperipheral = game.i18n.localize("APOCALYPSEWORLD.MoveTypes.Peripheral");
  let equipmenttypesgear = game.i18n.localize("APOCALYPSEWORLD.EquipmentTypes.Gear");
  let equipmenttypesbarter = game.i18n.localize("APOCALYPSEWORLD.EquipmentTypes.Barter");


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
  }
  game.pbta.sheetConfig = {
    "rollFormula": "2d6",
    "rollResults": {
      "failure": {
        "start": null,
        "end": 6,
        "label": failurelabel
      },
      "partial": {
        "start": 7,
        "end": 9,
        "label": partiallabel
      },
      "success": {
        "start": 10,
        "end": 12,
        "label": successlabel
      }
    },
    "actorTypes": {
      "character": {
        "stats": {
          "cool": {
            "label": cool,
            "value": 0
          },
          "hard": {
            "label": hard,
            "value": 0
          },
          "hot": {
            "label": hot,
            "value": 0
          },
          "sharp": {
            "label": sharp,
            "value": 0
          },
          "weird": {
            "label": weird,
            "value": 0
          }
        },
        "attrTop": {
          "harm": {
            "label": harmlabel,
            "description": harmdescription,
            "customLabel": false,
            "userLabel": false,
            "type": "Clock",
            "value": 0,
            "max": 6,
            "steps": [
              false,
              false,
              false,
              false,
              false,
              false
            ]
          },
          "harmConditions": {
            "label": harmoptionslabel,
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "ListMany",
            "condition": false,
            "options": {
              "0": {
                "label": harmoption1,
                "value": false
              },
              "1": {
                "label": harmoption2,
                "value": false
              },
              "2": {
                "label": harmoption3,
                "value": false
              },
              "3": {
                "label": harmoption4,
                "value": false
              }
            }
          },
          "special": {
            "label": speciallabel,
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "LongText",
            "value": ""
          },
          "highlight": {
            "label": highlightlabel,
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "ListMany",
            "condition": false,
            "options": {
              "0": {
                "label": cool,
                "value": false
              },
              "1": {
                "label": hard,
                "value": false
              },
              "2": {
                "label": hot,
                "value": false
              },
              "3": {
                "label": sharp,
                "value": false
              },
              "4": {
                "label": weird,
                "value": false
              }
            }
          },
        },
        "attrLeft": {
          "hold": {
            "label": holdlabel,
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "Resource",
            "value": 0,
            "max": 0
          },
          "armor": {
            "label": armorlabel,
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "Number",
            "value": 0
          },
          "xp": {
            "label": xplabel,
            "description": xpdescription,
            "customLabel": false,
            "userLabel": false,
            "type": "Xp",
            "value": 0,
            "max": 5,
            "steps": [
              false,
              false,
              false,
              false,
              false
            ]
          },
          "hx": {
            "label": hxlabel,
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "LongText",
            "value": ""
          },
          "improvement": {
            "label": improvementlabel,
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "LongText",
            "value": ""
          },
          "look": {
            "label": looklabel,
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "LongText",
            "value": ""
          }
        },
        "moveTypes": {
          "basic": {
            "label": movetypesbasic,
            "moves": []
          },
          "battle": {
            "label": movetypesbattle,
            "moves": []
          },
          "road-war": {
            "label": movetypesroadwar,
            "moves": []
          },
          "class": {
            "label": movetypesclass,
            "moves": []
          },
          "peripheral": {
            "label": movetypesperipheral,
            "moves": []
          }
        },
        "equipmentTypes": {
          "gear": {
            "label": equipmenttypesgear,
            "mouvements": []
          },
          "barter": {
            "label": equipmenttypesbarter,
            "mouvements": []
          }
        }
      },
      "npc": {
        "attrTop": {
          "harm": {
            "label": "Dommage",
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "Ressource",
            "value": 0,
            "max": 0
          },
          "genre": {
            "label": "Genre",
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "Texte",
            "value": ""
          },
          "age": {
            "label": "Âge",
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "Texte",
            "value": ""
          }
        },
        "attrLeft": {
          "look": {
            "label": "Apparence",
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "LongText",
            "value": ""
          },
          "conduite": {
            "label": "Conduite",
            "description": null,
            "customLabel": false,
            "userLabel": false,
            "type": "LongText",
            "value": ""
          }
        },
        "moveTypes": {
          "mc": {
            "label": "Actions du MJ",
            "moves": []
          }
        }
      }
    }
  };
});
