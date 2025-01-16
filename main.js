const instruments = {
    "vent":{
      "bois":{
        "anche":{
            "libre": "Accordéon",
            "simple":{
                "clarinette":{
                    "transposition_sixte_mineur_en_dessous":"Petite clarinette sopranino (lab)",
                    "transposition_tierce_mineur_en_dessous":"Petite clarinette (mib)",
                    "transposition_seconde_en_dessous":"Petite clarinette (ré)",
                    "aucune_transposition":"Clarinette soprano (ut)",
                    "transposition_seconde_majeure_au_dessus":"Clarinette soprano (sib)",
                    "transposition_tierce_mineur_au_dessus":"Clarinette soprano (la)",
                    "transposition_sixte_majeur_au_dessus":"Clarinette alto (mib)",
                    "transposition_octave_et_seconde_majeure_au_dessus":"Clarinette basse",
                    "transposition_octabe_et_sixte_majeure_au_dessus":"Clarinette contre-alto",
                    "transposition_deux_octave_et_seconde_majeure_au_dessus":"Clarinette contrebasse"
                },
                "saxophone":{
                    "transposition_seconde_majeure_au_dessus":"Saxophone soprano",
                    "transposition_sixte_majeure_en_dessous":"Saxophone alto",
                    "transposition_neuvieme_majeure_en_dessous":"Saxophone tenor",
                    "transposition_trezieme_majeure_en_dessous":"Saxophone baryton"
                }
                
            },
            "double": "haubois"
        },
        "embouchure":{
            "multiple":"Flûte de pan",
            "laterale": "Flûte traversière traditionnelle",
            "ronde":"Xun (chinois)",
            "encoche_fixe":"Flûte à encoche",
            "arete_oblique": "Flûte oblique",
            "a_conduit": {
                "tubulaire": {
                    "se_coulisse" : "Flûte à coulisse",
                    "trous_de_jeu" : "Flûte à bec"
                },
                "globulaire" : "Ocarina",
                "sifflet" : "Sifflet à nez"
            }
        }
      },
      "cuivre":{
        "cylindrique":{
            "coulisse":{
                "si_bemol":{
                    "tessiture_aigue":"Trombone soprano",
                    "tessiture_standard":"Trombone tenor",
                    "tessiture_basse" : "Trombone basse"
                },
                "mi_bemol" : "Trombone alto"
            },
            "pistons":{
                "tessiture_aigue":"Trompette",
                "tessiture_basse":"Trombone à pistons"
            }
        },
        "conico_cylindrique":{
            "pistons":{
                "si_bemol": "Euphonium",
                "fa":"Tuba basse",
                "ut":"Contretuba"
            },
            "palettes":"Cor"
        }

      }  
    },
    "percussions":{
        "idiophone" : {
            "frapper" : {
                "métal" : {
                    "hauteur_reglable" :{
                        "avec_resonnateur_tubulaire" : {
                            "horizontale" : "Vibraphone",
                            "verticale" : "Carillon_tubulaire"
                        },
                        "sans_resonnateur_tubulaire" : "Glockenspiel"
                    },
                    "hauteur_fixe":{
                        "percussion_direct" : "Cymbales",
                        "percussion_indirect" : {
                            "baguette_metalique" :"Triangle",
                            "baguette_bois" : "Cloches"
                        }
                    }
                },
                "bois":{
                    "hauteur_reglable":{
                        "avec_resonnateur_tubulaire":"Marimba",
                        "sans_resonnateur_tubulaire" : "Xylophone"
                    },                            
                    "hauteur_fixe" : {
                        "sans_caisse_resonance" : "Claves",
                        "avec_caisse_resonance" : "Woodblock"
                    }
                }
            },
            "secouer": {
                "bois" : "Maracas",
                "metal" : {
                    "bille" : {
                        "exterieur" : "Cabassa",
                        "interieur" : "Shaker"
                    },
                    "cymbalette" : "Tambour de Basque"
                }
            },
            "racler" : {
                "bois_contre_bois" : "Guiro",
                "metal_contre_bois" : "Cabassa"
            }
        }, 
        "membranophone" :{
            "tambours" : {
                "main" : "Congas",
                "baguette" : "Batterie",
                "mailloche" : "Timbales"
            }
        }
    }
}


//const instruments = require("./data.json")

//console.log(instruments)

function getAllInstruments(level) {
    if(typeof level === "string") {
        return [level];
    } else {
        return Object.values(level).flatMap(value => getAllInstruments(value))
    }
}

function findParent(json, level, path = []) {
    //console.log(path);
    for (let key in json){
        if (key === level) {
            path.push(key);
            return path;
        }
        else {
            if (typeof json[key] === "object" && json[key] !== null) {
                res = findParent(json[key], level, path);
                if ((res !== null) && (res.includes(level))) {
                    path.unshift(key);
                    return path
                }
            }
        }
    }
}

function display_parents(level) {
    tab = findParent(instruments, level);
    if (tab === undefined) {
        console.log("No parent found");
    } else {
        const container = document.getElementById("parent-container");
        tab.forEach(element => {
            // Créer un bouton
            const parent = document.createElement("button");
            parent.textContent = element;
            parent.style.margin = "5px";

            // Ajouter un événement clic au bouton
            parent.addEventListener("click", () => {
                while (container.firstChild) {
                    container.firstChild.remove()
                }
                display_parents(element);
            });
        
            // Ajouter le bouton au conteneur
        container.appendChild(parent);
        });
    }
}

display_parents("anche")


function getSubInstrument(json) {
    res = []
    for (let key in json) {
        if (typeof json[key] === "object" && json[key] !== null) {
            res.push(key);
        }
    }
    return res;
}

function displayInstruments(instruments) {
    container = document.querySelector("#instruments-container")

    while (container.firstChild) {
        container.firstChild.remove()
    }

    instruments.forEach(instrument => {
        listItem = document.createElement("li");
        listItem.textContent = instrument;
        container.appendChild(listItem);
    });
}

displayInstruments(getAllInstruments(instruments));