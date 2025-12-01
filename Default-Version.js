// ==UserScript==
// @name         MooMoo.io Texture-Pack Manager
// @namespace    http://tampermonkey.net/
// @version      2025-11-29
// @description  https://github.com/RaZoshi
// @author       razoshi
// @match        *://*.moomoo.io/*
// @match        *://*moomoo.io/*
// @match        *://*moomootwo.cloud/*
// @match        *://*old.moomootwo.cloud/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=moomoo.io
// @grant        none
// ==/UserScript==

/*
    Author: RaZoshi
    Version: 2025-11-29
    GitHub: https://github.com/RaZoshi
*/

(function() {
    'use strict';

    let resourcePack = {
        pack: "Default"
    };

    const packs = [
        { name: "Default", icon: "https://i.imgur.com/fBgDIOZ.png", desc: "Default Game's Textures" },
        { name: "Old Textures", icon: "https://i.imgur.com/29vGQfg.png", desc: "Murka's Texture Pack" },
        { name: "The Warrior Chronicles", icon: "https://i.imgur.com/MJWtX3o.png", desc: "eXistenZ's Texture Pack" },
        { name: "Red Dragon", icon: "https://i.imgur.com/tMGhbhN.png", desc: "eXistenZ's Texture Pack" },
        { name: "The Black Swordsman", icon: "https://i.imgur.com/7vXJpkE.png", desc: "eXistenZ's Texture Pack" },
        { name: "RSD Pack", icon: "https://i.imgur.com/xkD5fsY.png", desc: "R0YqL & RoTama's Texture Pack" },
        { name: "Short Giraffe Pack", icon: "https://i.imgur.com/lNGLdjM.png", desc: "Short Giraffe's Texture Pack" },
        { name: "Ship Of War Pack", icon: "https://i.imgur.com/eXiXYIR.png", desc: "Ship Of War's Texture Pack" },
    ];

    resourcePack.pack = packs[0].name;

    var sfTexturesHats = {
        6: "https://i.imgur.com/fRxZdbG.png",
        7: "https://i.imgur.com/nKZTSaJ.png",
        40: "https://i.imgur.com/FdQ6VB1.png",
        31: "https://i.imgur.com/VUf94nW.png",
        42: "https://u.cubeupload.com/Game_player/giraffeheat.png",
        12: "https://i.imgur.com/Cbp76dH.png",
        20: 'https://u.cubeupload.com/ShOrT_GiRaFfE/samuraitp.png',
        53: "https://i.imgur.com/y66dlBd.png#ANTI-WORK",
        "53_top": "https://imgur.com/Xk9EgYW#ANTI-WORK"
    };

    var rsdTexturesHats = {
        40: "http://i.imgur.com/yp9hwJp.png",
        6: "http://i.imgur.com/L6L0Q0l.png",
        7: "http://i.imgur.com/wqG2CBb.png",
        12: "http://i.imgur.com/eQxzyTD.png",
        1: "http://i.imgur.com/ZeKh57w.png",
        51: "http://i.imgur.com/d1s1LpB.png",
        31: "http://i.imgur.com/eLz8PZC.png",
        50: "http://i.imgur.com/q9JlWrd.png",
        11: "http://i.imgur.com/EbrAqWU.png",
        "11_p": "http://i.imgur.com/EbrAqWU.png",
        15: "http://i.imgur.com/4Ti0G4R.png",
        20: "http://i.imgur.com/BdPQwfF.png",
        22: "http://i.imgur.com/CoeJltc.png",
        53: "http://i.imgur.com/uQvWtke.png",
        "53_p": "http://i.imgur.com/uQvWtke.png"
    };

    var rsdTexturesAccessories = {
        19: "http://i.imgur.com/SWdR4eY.png",
        13: "http://i.imgur.com/zgR1rYf.png",
        18: "http://i.imgur.com/T5oPBsc.png",
    };

    var rsdTexturesWeapons = {
        "samurai_1_g": "https://i.imgur.com/XtLvPYc.png",
        "samurai_1_d": "https://i.imgur.com/cHSvjlv.png",

        "sword_1_g": "https://i.imgur.com/HmjnnXn.png",
        "sword_1_d": "https://i.imgur.com/34rr2qm.png",

        "spear_1_g": "https://i.imgur.com/fCjPvei.png",
        "spear_1_d": "https://i.imgur.com/jjNYCTZ.png",
        "spear_1_r": "https://i.imgur.com/QomIDrJ.png",

        "great_axe_1_d": "https://i.imgur.com/vzlwkVK.png",
        "great_axe_1_r": "https://i.imgur.com/9oszeGa.png",

        "axe_1_d": "https://i.imgur.com/enUNTMp.png",
        "axe_1_r": "https://i.imgur.com/9KKLdVE.png",

        "dagger_1_d": "https://i.imgur.com/2ZUdMQF.png",
        "dagger_1_r": "https://i.imgur.com/Hqp9vxh.png",

        "hammer_1_g": "https://i.imgur.com/X8u4rXd.png",
        "hammer_1_d": "https://i.imgur.com/LHkSv0v.png",
        "hammer_1_r": "https://i.imgur.com/3Me1GWc.png",

        "great_hammer_1_d": "https://i.imgur.com/KmmT14q.png",
        "great_hammer_1_r": "https://i.imgur.com/tmWLmIU.png",

        "bat_1_r": "https://i.imgur.com/zOITPq2.png",
    };

    var theWarriorChroniclesTexturesHats = {
        7: "https://i.imgur.com/8xB1Q3u.png",
        12: "https://i.imgur.com/VSUId2s.png",
        13: "https://i.imgur.com/EwkbsHN.png",
        11: "https://i.imgur.com/0lnD8LH.png",
        "11_p": "https://i.imgur.com/0lnD8LH.png",
        "11_top": "https://i.imgur.com/s7Cxc9y.png",
        9: "https://i.imgur.com/1nY34aL.png",
        18: "https://i.imgur.com/in5H6vw.png",
        40: "https://i.imgur.com/lKGtlDF.png",
        6: "https://i.imgur.com/kD6iYN8.png",
        20: "https://i.imgur.com/rSNEDel.png",
        23: "https://i.imgur.com/B9AcmcN.png",
        15: "https://i.imgur.com/w3AD2BJ.png",
        8: "https://i.imgur.com/kf8yAC2.png",
    };

    var theWarriorChroniclesTexturesAccessories = {
        21: "https://i.imgur.com/eikGSfv.png",
        13: "https://i.imgur.com/Qyxy7IB.png",
    };

    var theWarriorChroniclesTexturesWeapons = {
        "samurai_1_g": "https://i.imgur.com/XtLvPYc.png",
        "samurai_1_d": "https://i.imgur.com/cHSvjlv.png",

        "sword_1_g": "https://i.imgur.com/HmjnnXn.png",
        "sword_1_d": "https://i.imgur.com/34rr2qm.png",

        "spear_1_g": "https://i.imgur.com/fCjPvei.png",
        "spear_1_d": "https://i.imgur.com/jjNYCTZ.png",
        "spear_1_r": "https://i.imgur.com/QomIDrJ.png",

        "great_axe_1_d": "https://i.imgur.com/vzlwkVK.png",
        "great_axe_1_r": "https://i.imgur.com/9oszeGa.png",

        "axe_1_d": "https://i.imgur.com/enUNTMp.png",
        "axe_1_r": "https://i.imgur.com/9KKLdVE.png",

        "dagger_1_d": "https://i.imgur.com/2ZUdMQF.png",
        "dagger_1_r": "https://i.imgur.com/Hqp9vxh.png",

        "hammer_1_g": "https://i.imgur.com/X8u4rXd.png",
        "hammer_1_d": "https://i.imgur.com/LHkSv0v.png",
        "hammer_1_r": "https://i.imgur.com/3Me1GWc.png",

        "great_hammer_1_d": "https://i.imgur.com/KmmT14q.png",
        "great_hammer_1_r": "https://i.imgur.com/tmWLmIU.png",

        "bat_1_r": "https://i.imgur.com/zOITPq2.png",
    };

    var redDragonTexturesHats = {
        7: "https://i.imgur.com/vAOzlyY.png",
        12: "https://i.imgur.com/VSUId2s.png",
        13: "https://i.imgur.com/EwkbsHN.png",
        11: "https://i.imgur.com/yfqME8H.png",
        "11_p": "https://i.imgur.com/yfqME8H.png",
        "11_top": "https://i.imgur.com/s7Cxc9y.png",
        9: "https://i.imgur.com/gJY7sM6.png",
        18: "https://i.imgur.com/in5H6vw.png",
        40: "https://i.imgur.com/pe3Yx3F.png",
        6: "https://i.imgur.com/vM9Ri8g.png",
        20: "https://i.imgur.com/JbUPrtp.png",
        23: "https://i.imgur.com/JPMqgSc.png",
        15: "https://i.imgur.com/YRQ8Ybq.png",
        8: "https://i.imgur.com/uYgDtcZ.png",
        26: "https://i.imgur.com/2PsUgEL.png",
        52: "https://i.imgur.com/hmJrVQz.png",
    };

    var redDragonTexturesAccessories = {
        21: "https://i.imgur.com/4ddZert.png",
        18: "https://i.imgur.com/0rmN7L9.png",
        19: "https://i.imgur.com/sULkUZT.png",
    };

    var redDragonTexturesWeapons = {
        "samurai_1_g": "https://i.imgur.com/QKBc2ou.png",
        "samurai_1_d": "https://i.imgur.com/4ZxIJQM.png",
        "samurai_1_r": "https://i.imgur.com/vxLZW0S.png",

        "sword_1_g": "https://i.imgur.com/wOTr8TG.png",
        "sword_1_d": "https://i.imgur.com/h5jqSRp.png",
        "sword_1_r": "https://i.imgur.com/V9dzAbF.png",

        "spear_1_g": "https://i.imgur.com/jKDdyvc.png",
        "spear_1_d": "https://i.imgur.com/HSWcyku.png",
        "spear_1_r": "https://i.imgur.com/UY7SV7j.png",

        "great_axe_1_d": "https://i.imgur.com/aAJyHBB.png",
        "great_axe_1_r": "https://i.imgur.com/UZ2HcQw.png",

        "axe_1_d": "https://i.imgur.com/OU5os0h.png",
        "axe_1_r": "https://i.imgur.com/kr8H9g7.png",

        "dagger_1_d": "https://i.imgur.com/ROTb7Ks.png",
        "dagger_1_r": "https://i.imgur.com/CDAmjux.png",

        "hammer_1_g": "https://i.imgur.com/WPWU8zC.png",
        "hammer_1_d": "https://i.imgur.com/WPWU8zC.png",
        "hammer_1_r": "https://i.imgur.com/oRXUfW8.png",

        "great_hammer_1_d": "https://i.imgur.com/Fg93gj3.png",
        "great_hammer_1_r": "https://i.imgur.com/tmUzurk.png",

        "bat_1_g": "https://i.imgur.com/ivLPh10.png",
        "bat_1_d": "https://i.imgur.com/phXTNsa.png",
        "bat_1_r": "https://i.imgur.com/6ayjbIz.png",

        "stick_1_g": "https://i.imgur.com/NOaBBRd.png",
        "stick_1_d": "https://i.imgur.com/H5wGqQR.png",
        "stick_1_r": "https://i.imgur.com/uTDGDDy.png",

        "bow_1_d": "https://i.imgur.com/qu7HHT5.png",
        "bow_1_r": "https://i.imgur.com/Oneg3oF.png",

        "crossbow_1_d": "https://i.imgur.com/TRqDlgX.png",
        "crossbow_1_r": "https://i.imgur.com/EVesBtw.png",

        "crossbow_2_d": "https://i.imgur.com/DVjCdwI.png",
        "crossbow_2_r": "https://i.imgur.com/z4CyaXk.png",

        "musket_1_g": "https://i.imgur.com/mAW9JAW.png",
        "musket_1_d": "https://i.imgur.com/jwH99zm.png",
        "musket_1_r": "https://i.imgur.com/jPE54IT.png",

        "shield_1_d": "https://i.imgur.com/hSqLP3t.png",
        "shield_1_r": "https://i.imgur.com/SNFV2dc.png",

        "grab_1_g": "https://i.imgur.com/DRzBdFX.png",
        "grab_1_d": "https://i.imgur.com/7kbtWfk.png",
        "grab_1_r": "https://i.imgur.com/wV42LEE.png",
    };

    var theBlackSwordsmanTexturesHats = {
        7: "https://i.imgur.com/8xB1Q3u.png",
        12: "https://i.imgur.com/VSUId2s.png",
        13: "https://i.imgur.com/EwkbsHN.png",
        11: "https://i.imgur.com/Gu3ZJlY.png",
        "11_p": "https://i.imgur.com/NCkyBlK.png",
        "11_top": "https://i.imgur.com/zWJTlbI.png",
        9: "https://i.imgur.com/1nY34aL.png",
        18: "https://i.imgur.com/in5H6vw.png",
        40: "https://i.imgur.com/lKGtlDF.png",
        6: "https://i.imgur.com/kD6iYN8.png",
        20: "https://i.imgur.com/34ESjYy.png",
        23: "https://i.imgur.com/B9AcmcN.png",
        15: "https://i.imgur.com/YRQ8Ybq.png",
        8: "https://i.imgur.com/WHJch5H.png",
        14: "https://i.imgur.com/V4l7o1h.png",
        "14_p": "https://i.imgur.com/836PpI0.png",
        "14_top": "https://i.imgur.com/zWJTlbI.png",
        31: "https://i.imgur.com/JPMqgSc.png",
    };

    var theBlackSwordsmanTexturesAccessories = {
        21: "https://i.imgur.com/tuw16mP.png",
        18: "https://i.imgur.com/sRGXKvJ.png",
        19: "https://i.imgur.com/XWW0RJV.png",
    };

    var theBlackSwordsmanTexturesWeapons = {
        "samurai_1_g": "https://i.imgur.com/XtLvPYc.png",
        "samurai_1_d": "https://i.imgur.com/PUTTmVS.png",

        "sword_1_g": "https://i.imgur.com/HmjnnXn.png",
        "sword_1_d": "https://i.imgur.com/nzy3kz1.png",

        "spear_1_g": "https://i.imgur.com/fCjPvei.png",
        "spear_1_d": "https://i.imgur.com/mcI9MTd.png",

        "great_axe_1_d": "https://i.imgur.com/HjgV9p5.png",

        "axe_1_d": "https://i.imgur.com/AbVX635.png",

        "dagger_1_d": "https://i.imgur.com/ROTb7Ks.png",

        "hammer_1_d": "https://i.imgur.com/0XKpSVI.png",

        "great_hammer_1_d": "https://i.imgur.com/CVCwqES.png",

        "bow_1_d": "https://i.imgur.com/Dgv1gZm.png",

        "crossbow_1_d": "https://i.imgur.com/R2awlGz.png",

        "crossbow_2_d": "https://i.imgur.com/7PJOAk0.png",

        "shield_1_g": "https://i.imgur.com/zYP8eVL.png",
        "shield_1_d": "https://i.imgur.com/n571biC.png",
    };

    var theBlackSwordsmanTexturesAnimals = {
        "bull_1": "https://i.imgur.com/aLkviQu.png",
        "bull_2": "https://i.imgur.com/Qq0ysR4.png",
        "wolf_1": "https://i.imgur.com/zLAZWOH.png",
        "cow_1": "https://i.imgur.com/FycnCNU.png",
        "pig_1": "https://i.imgur.com/QHtrTlY.png",
        "chicken_1": "https://i.imgur.com/UtBEmai.png",
    };

    var oldTexturesHats = {
        7: "https://i.postimg.cc/zGnZNZNG/Bull-Helmet-V2.png",
        58: "https://i.postimg.cc/B67RpJTM/Bushido-Armor.png",
        26: "https://i.postimg.cc/t40Q8RLc/Barbarian-Armor.png",
        12: "https://i.postimg.cc/BQPfhPwD/Booster-V2.png",
        22: "https://i.postimg.cc/5t3hHB6c/Emp-Helmet.png",
        13: "https://i.postimg.cc/BvqyGjNm/Medic-Gear-V2.png",
        11: "https://i.postimg.cc/7PFqrNzX/Spike-V2.png",
        "11_p": "https://i.postimg.cc/7PFqrNzX/Spike-V2.png",
        "11_top": "",
        9: "https://i.postimg.cc/g0N7cGTm/Miner.png",
        4: "https://i.postimg.cc/Tw14pBzm/Ranger-Hat.png",
        18: "https://i.postimg.cc/RhjyrGbt/Explorer-Hat-V2.png",
        40: "https://i.imgur.com/foDF6AI.png",
        6: "https://i.postimg.cc/662BPP8y/Soldier-Helmet.png",
        20: "https://i.postimg.cc/Dmkjp08d/Samurai-Hat.png",
        23: "https://i.postimg.cc/WpHP6wST/Anti-Venom-Gear.png",
        15: "https://i.postimg.cc/pXKRWnYv/Winter-Cap.png",
        8: "https://i.postimg.cc/XJYT9rCr/Bummel-Hat.png",
    };

    var oldTexturesAccessories = {
        21: "",
        13: "",
    };

    var oldTexturesWeapons = {
        "samurai_1_g": "",
        "samurai_1_d": "https://i.imgur.com/2iI0aj8.png",
        "samurai_1_r": "https://i.imgur.com/q32l8gQ.png",

        "sword_1_g": "",
        "sword_1_d": "https://i.imgur.com/7NYsXJf.png",
        "sword_1_r": "https://i.imgur.com/swBWjlg.png",

        "spear_1_g": "",
        "spear_1_d": "https://i.imgur.com/veyLcv4.png",
        "spear_1_r": "https://i.imgur.com/QomIDrJ.png",

        "great_axe_1_g": "",
        "great_axe_1_d": "https://i.imgur.com/hfJTh4R.png",
        "great_axe_1_r": "https://i.imgur.com/9oszeGa.png",

        "axe_1_g": "",
        "axe_1_d": "https://i.imgur.com/tE1FOnb.png",
        "axe_1_r": "https://i.imgur.com/9KKLdVE.png",

        "dagger_1_g": "",
        "dagger_1_d": "https://i.imgur.com/2ZUdMQF.png",
        "dagger_1_r": "https://i.imgur.com/Hqp9vxh.png",

        "hammer_1_g": "https://i.imgur.com/X8u4rXd.png",
        "hammer_1_d": "https://i.imgur.com/LHkSv0v.png",
        "hammer_1_r": "https://i.imgur.com/3Me1GWc.png",

        "great_hammer_1_g": "",
        "great_hammer_1_d": "https://i.imgur.com/KmmT14q.png",
        "great_hammer_1_r": "https://i.imgur.com/tmWLmIU.png",

        "bat_1_g": "",
        "bat_1_d": "",
        "bat_1_r": "https://i.imgur.com/zOITPq2.png",

        "stick_1_g": "",
        "stick_1_d": "",
        "stick_1_r": "",
    };

    var shipOfWarTexturesHats = {
        40: "https://i.imgur.com/lKGtlDF.png",
        6: "https://i.imgur.com/2NXcXU8.png",
        7: "https://i.imgur.com/8xB1Q3u.png",
        12: "https://i.imgur.com/VSUId2s.png",
        9: "https://i.imgur.com/1nY34aL.png",
        23: "https://i.imgur.com/B9AcmcN.png",
        16: "https://i.imgur.com/WHJch5H.png",
        31: "https://i.imgur.com/JPMqgSc.png",
        15: "https://i.imgur.com/YRQ8Ybq.png",
        21: "https://i.imgur.com/npW40IC.png",
        13: "https://i.imgur.com/EwkbsHN.png",
        11: "https://i.imgur.com/Gu3ZJlY.png",
        18: "https://i.imgur.com/in5H6vw.png",
        20: "https://i.imgur.com/0jqsSgS.png",
        "11_p": "https://i.imgur.com/NCkyBlK.png",
        "14_p": "https://i.imgur.com/836PpI0.png",
        14: "https://i.imgur.com/V4l7o1h.png",
        "14_top": "https://i.imgur.com/zWJTlbI.png",
        53: "https://i.imgur.com/1xuvr4N.png",
        "53_top": "https://i.imgur.com/1xuvr4N.png",
    };

    var shipOfWarTexturesAccessories = {
        21: "https://i.imgur.com/tuw16mP.png",
        18: "https://i.imgur.com/0rmN7L9.png",
        19: "https://i.imgur.com/Qyxy7IB.png"
    };

    function getTexturePackImg(id, type) {
        if (resourcePack.pack == "Old Textures") {
            if (oldTexturesHats[id] && type == "hat") {
                return oldTexturesHats[id];
            } else if (oldTexturesAccessories[id] && type == "acc") {
                return oldTexturesAccessories[id];
            } else if (oldTexturesWeapons[id] && type == "weapons") {
                return oldTexturesWeapons[id];
            }
        } else if (resourcePack.pack == "RSD Pack") {
            if (rsdTexturesHats[id] && type == "hat") {
                return rsdTexturesHats[id];
            } else if (rsdTexturesAccessories[id] && type == "acc") {
                return rsdTexturesAccessories[id];
            } else if (rsdTexturesWeapons[id] && type == "weapons") {
                return rsdTexturesWeapons[id];
            }
        } else if (resourcePack.pack == "Short Giraffe Pack") {
            if (sfTexturesHats[id] && type == "hat") {
                return sfTexturesHats[id];
            }
        } else if (resourcePack.pack == "The Warrior Chronicles") {
            if (theWarriorChroniclesTexturesHats[id] && type == "hat") {
                return theWarriorChroniclesTexturesHats[id];
            } else if (theWarriorChroniclesTexturesAccessories[id] && type == "acc") {
                return theWarriorChroniclesTexturesAccessories[id];
            } else if (theWarriorChroniclesTexturesWeapons[id] && type == "weapons") {
                return theWarriorChroniclesTexturesWeapons[id];
            }
        } else if (resourcePack.pack == "Red Dragon") {
            if (redDragonTexturesHats[id] && type == "hat") {
                return redDragonTexturesHats[id];
            } else if (redDragonTexturesAccessories[id] && type == "acc") {
                return redDragonTexturesAccessories[id];
            } else if (redDragonTexturesWeapons[id] && type == "weapons") {
                return redDragonTexturesWeapons[id];
            }
        } else if (resourcePack.pack == "The Black Swordsman") {
            if (theBlackSwordsmanTexturesHats[id] && type == "hat") {
                return theBlackSwordsmanTexturesHats[id];
            } else if (theBlackSwordsmanTexturesAccessories[id] && type == "acc") {
                return theBlackSwordsmanTexturesAccessories[id];
            } else if (theBlackSwordsmanTexturesWeapons[id] && type == "weapons") {
                return theBlackSwordsmanTexturesWeapons[id];
            } else if (theBlackSwordsmanTexturesAnimals[id] && type == "animals") {
                return theBlackSwordsmanTexturesAnimals[id];
            }
        } else if (resourcePack.pack == "Ship Of War Pack") {
            if (shipOfWarTexturesHats[id] && type == "hat") {
                return shipOfWarTexturesHats[id];
            } else if (shipOfWarTexturesAccessories[id] && type == "acc") {
                return shipOfWarTexturesAccessories[id];
            }
        } else {
            if (type == "acc") {
                return ".././img/accessories/access_" + id + ".png";
            } else if (type == "hat") {
                return ".././img/hats/hat_" + id + ".png";
            } else if (type == "animals") {
                return ".././img/animals/" + id + ".png";
            } else {
                return ".././img/weapons/" + id + ".png";
            }
        }
    }

    const overlay = document.createElement("div");
    overlay.id = "rpOverlay";
    overlay.style = `
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0);
    display: none;
    z-index: 9999;
    justify-content: center;
    align-items: center;
    `;

    const panel = document.createElement("div");
    panel.style = `
    width: 50%;
    height: 65%;
    background: rgba(20,20,20,0);
    border-radius: 8px;
    display: flex;
    gap: 30px;
    padding: 10px;
    color: #fff;
    font-family: sans-serif;
    font-size: 22px;
    box-sizing: border-box;
    `;

    const leftCol = document.createElement("div");
    leftCol.style = `
    flex: 1;
    background: rgba(0,0,0,0.25);
    border-radius: 6px;
    backdrop-filter: blur(15px);
    padding: 10px;
    overflow-y: auto;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    `;

    const rightCol = document.createElement("div");
    rightCol.style = `
    flex: 1;
    background: rgba(0,0,0,0.25);
    border-radius: 6px;
    backdrop-filter: blur(15px);
    padding: 10px;
    overflow-y: auto;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    `;

    const leftTitle = document.createElement("div");
    leftTitle.textContent = "Texture Packs";
    leftTitle.style.marginBottom = "10px";
    leftTitle.style.fontSize = "20px";

    const rightTitle = document.createElement("div");
    rightTitle.textContent = "Selected Pack";
    rightTitle.style.marginBottom = "10px";
    rightTitle.style.fontSize = "20px";

    const leftList = document.createElement("div");
    const rightSlot = document.createElement("div");

    leftCol.appendChild(leftTitle);
    leftCol.appendChild(leftList);
    rightCol.appendChild(rightTitle);
    rightCol.appendChild(rightSlot);

    panel.appendChild(leftCol);
    panel.appendChild(rightCol);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    function createPackElement(pack, clickable) {
        const wrap = document.createElement("div");
        wrap.style = `
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        margin-bottom: 6px;
        background: rgba(0,0,0,0.25);
        border-radius: 4px;
        `;

        if (clickable) {
            wrap.style.cursor = "pointer";
            wrap.onmouseenter = () => wrap.style.background = "rgba(0,0,0,0.30)";
            wrap.onmouseleave = () => wrap.style.background = "rgba(0,0,0,0.25)";
            wrap.onclick = () => {
                resourcePack.pack = pack.name;
                renderPacks();
                updatePacks();
                console.log(pack.name, " | ", resourcePack.pack);
            };
        }

        const img = document.createElement("img");
        img.src = pack.icon;
        img.style.width = "48px";
        img.style.height = "48px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "4px";
        img.style.boxShadow = "0 0 5px rgba(0,0,0,0.8)";

        const textBox = document.createElement("div");
        textBox.style.display = "flex";
        textBox.style.flexDirection = "column";

        const title = document.createElement("div");
        title.textContent = pack.name;
        title.style.fontSize = "16px";

        const desc = document.createElement("div");
        desc.textContent = pack.desc;
        desc.style.fontSize = "16px";
        desc.style.opacity = "0.8";

        textBox.appendChild(title);
        textBox.appendChild(desc);

        wrap.appendChild(img);
        wrap.appendChild(textBox);
        return wrap;
    }

    function renderPacks() {
        leftList.innerHTML = "";
        rightSlot.innerHTML = "";

        const current = packs.find(p => p.name === resourcePack.pack);

        packs.forEach(p => {
            if (p.name === resourcePack.pack) return;
            leftList.appendChild(createPackElement(p, true));
        });

        if (current) {
            rightSlot.appendChild(createPackElement(current, false));
        }
    }

    renderPacks();

    window.addEventListener("keydown", e => {
        if (e.code === "KeyO" && "chatbox" !== document.activeElement.id.toLowerCase()) {
            const shown = overlay.style.display === "flex";
            overlay.style.display = shown ? "none" : "flex";
        }
    });

    const imageDesc = Object.getOwnPropertyDescriptor(Image.prototype, "src");
    const loadedImages = new Map();

    Object.defineProperty(Image.prototype, "src", {
        get() {
            return imageDesc.get?.call(this);
        },
        set(value) {
            const originalValue = value;
            const paths = {
                "/hats/": {type: "hat", prefix: "hat_"},
                "/accessories/": {type: "acc", prefix: "access_"},
                "/weapons/": {type: "weapons", prefix: "/weapons/"},
                "/animals/": {type: "animals", prefix: "/animals/"},
            };

            let type = "";
            let id = "";

            for (const [path, {type: t, prefix}] of Object.entries(paths)) {
                if (value.includes(path)) {
                    type = t;
                    id = value.split(prefix)[1]?.replace(".png", "") || "";
                    if (type === "hat" && id.includes("_")) {
                        const parts = id.split("_");
                        id = parts[0] + "_" + parts[1];
                    }
                    break;
                }
            }

            if (id && type) {
                const newSrc = getTexturePackImg(id, type);
                if (newSrc) {
                    value = newSrc;
                    loadedImages.set(this, { original: originalValue, type, id });
                }
            }

            return imageDesc.set?.call(this, value);
        },
        configurable: true,
    });

    function updatePacks() {
        loadedImages.forEach((info, imgElement) => {
            const newSrc = getTexturePackImg(info.id, info.type);
            if (newSrc && newSrc !== "") {
                imgElement.src = newSrc;
            }
        });
    }
})();
