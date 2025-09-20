import { world, system, Player } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";
import { QIDB } from "./QIDB.js";

world.afterEvents.worldLoad.subscribe(() => {

    const navigator = new ActionFormData()
        .title("§bNavigator§g§r§i§d")
        .body("Choose your destination")
        .button("Practice", "textures/jsonui/navigator/practice.png")
        .button("Bot Duel", "textures/jsonui/navigator/botduel.png")   
        .button("Cosmetic", "textures/jsonui/navigator/shop.png")
        .button("Settings", "textures/jsonui/navigator/settings.png")
        .button("Kit Editor", "textures/jsonui/navigator/kit.png")

    const practice = new ActionFormData()
        .title("§bPractice§g§r§i§d")
        .body("Choose your practice mode")
        .button("FFA", "textures/jsonui/practice/ffa.png")
        .button("Bridge FFA", "textures/jsonui/practice/bridgeffa.png")
        .button("Speed Bridge", "textures/jsonui/practice/speedbridge.png")
        .button("Clutch", "textures/jsonui/practice/clutch.png")
        .button("Parkour", "textures/jsonui/practice/parkour.png")

    const blockparkour = new ActionFormData()
        .title("§bBlock Parkour")
        .body("Choose your course")
        .button("Course 1")
        .button("Course 2")
        .button("Course 3")
        .button("Course 4")
        .button("Course 5")
        .button("Course 6")
        .button("Course 7")
        .button("Course 8")
        .button("Course 9")
        .button("Course 10")

    const bot = new ActionFormData()
        .title("§bBot Settings§g§r§i§d")
        .body("Choose your bot difficulty")
        .button("Dummy §7[0]", "textures/jsonui/difficulty/dummy.png")
        .button("§aEasy §7[1]", "textures/jsonui/difficulty/easy.png")
        .button("§bMedium §7[2]", "textures/jsonui/difficulty/medium.png")
        .button("§6Hard §7[2.5]", "textures/jsonui/difficulty/hard.png")
        .button("§cGod §7[3]", "textures/jsonui/difficulty/god.png")
        .button("§3Hacker §7[4]", "textures/jsonui/difficulty/hacker.png")

    const duelbotdifficulty = new ActionFormData()
        .title("§bDuel Bot Difficulty§g§r§i§d")
        .body("Choose your bot difficulty")
        .button("Player", "textures/jsonui/difficulty/player.png")
        .button("§aEasy §7[1]", "textures/jsonui/difficulty/easy.png")
        .button("§bMedium §7[2]", "textures/jsonui/difficulty/medium.png")
        .button("§6Hard §7[2.5]", "textures/jsonui/difficulty/hard.png")
        .button("§cGod §7[3]", "textures/jsonui/difficulty/god.png")
        .button("§3Hacker §7[4]", "textures/jsonui/difficulty/hacker.png")

    const bridgeffa = new ActionFormData()
        .title("§bSelect Map")
        .body("Select your favorite map")
        .button("Void")
        .button("House")
        .button("City")
        .button("Graveyard")
        .button("Castle")
        .button("Construction")

    const speedbridge = new ActionFormData()
        .title("§bSpeed Bridge")
        .body("Select your speed bridge mode")
        .button("Short")
        .button("Normal")
        .button("Long")
        .button("Short Diagonal")
        .button("Long Diagonal")
        .button("Stack Up")

    const botduel = new ActionFormData()
        .title("§bBot Duel§g§r§i§d")
        .body("Select your duel queue")
        .button("Nodebuff", "textures/jsonui/duel/nodebuff.png")
        .button("Boxing", "textures/jsonui/duel/boxing.png")
        .button("Sumo", "textures/jsonui/duel/sumo.png")
        .button("Midfight", "textures/jsonui/duel/midfight.png")
        .button("BuildUHC", "textures/jsonui/duel/builduhc.png")
        .button("Gapple", "textures/jsonui/duel/gapple.png")
        .button("Skywars", "textures/jsonui/duel/skywars.png")
        .button("Treasure Wars", "textures/jsonui/duel/treasurewars.png")
        .button("Hallfight", "textures/jsonui/duel/hallfight.png")
        .button("Stickfight", "textures/jsonui/duel/stickfight.png")
        .button("Combo", "textures/jsonui/duel/combo.png")

    const kiteditor = new ActionFormData()
        .title("§bKit Editor§g§r§i§d")
        .body("Select your kit to edit")
        .button("Nodebuff", "textures/jsonui/duel/nodebuff.png")
        .button("Boxing", "textures/jsonui/duel/boxing.png")
        .button("Sumo", "textures/jsonui/duel/sumo.png")
        .button("Midfight", "textures/jsonui/duel/midfight.png")
        .button("BuildUHC", "textures/jsonui/duel/builduhc.png")
        .button("Gapple", "textures/jsonui/duel/gapple.png")
        .button("Skywars", "textures/jsonui/duel/skywars.png")
        .button("Treasure Wars", "textures/jsonui/duel/treasurewars.png")
        .button("Hallfight", "textures/jsonui/duel/hallfight.png")
        .button("Stickfight", "textures/jsonui/duel/stickfight.png")
        .button("Combo", "textures/jsonui/duel/combo.png")

    world.afterEvents.playerSpawn.subscribe(evd=>{
        if (!evd.initialSpawn) return;
        const source = evd.player;
        if (world.getPlayers().length < 2) {
            source.runCommand('scoreboard objectives add bothits dummy');
            source.runCommand('scoreboard objectives add combocount dummy');
        }
        reset(source);
        system.runTimeout(() => {
            source.runCommand("replaceitem entity @s slot.hotbar 4 compass");
        }, 1);
        source.teleport({ x: 0.5, y: 200, z: 0.5 }, {facingLocation: { x: 0.5, y: 200, z: -0.5}}); //add 0.5 to x and z to tp to center of block
        source.runCommand('gamemode a @s')
        source.sendMessage('§3Welcome to §bAmixi Network!');
        source.sendMessage('§3  - Season 6: §bSunset');
        source.sendMessage('§3  - Owners: §bhippox1 & da1');
        source.sendMessage('§3  - Community: §bdiscord.gg/XNfSKUs38D');
        for (const tag in speedbridgeTimers) {
            if (speedbridgeTimers[tag]) {
                if (!world.getPlayers().find(p => p.hasTag(tag) && speedbridgeActive[tag])) {
                    system.clearRun(speedbridgeTimers[tag]);
                    speedbridgeTimers[tag] = null;
                    speedbridgeActive[tag] = false;
                    speedbridgeStartTimes[tag] = null;
                }
            }
        }
    });

    world.afterEvents.itemStartUseOn.subscribe((event) => {
        const { source, itemStack, block } = event
        const positions = [
            { x: block.x, y: block.y, z: block.z },
            { x: block.above().x, y: block.above().y, z: block.above().z },
            { x: block.below().x, y: block.below().y, z: block.below().z },
            { x: block.east().x, y: block.east().y, z: block.east().z },
            { x: block.west().x, y: block.west().y, z: block.west().z },
            { x: block.north().x, y: block.north().y, z: block.north().z },
            { x: block.south().x, y: block.south().y, z: block.south().z }
        ];
        if (itemStack.typeId !== "minecraft:flint_and_steel" && itemStack.typeId !== "minecraft:water_bucket") return;
        switch (itemStack.typeId) {
        case "minecraft:flint_and_steel":
        case "minecraft:water_bucket":
            system.runTimeout(() => {
                source.runCommand('clear @s bucket')
            }, 2);
            system.runTimeout(() => {
                for (const pos of positions) {
                    const placedBlock = source.dimension.getBlock(pos);
                    if (placedBlock && (placedBlock.matches('minecraft:fire') || placedBlock.matches('minecraft:water'))) {
                        source.dimension.setBlockType(pos, "minecraft:air");
                    }
                }
            }, 20);
        break;
        }
    });

    world.afterEvents.itemUse.subscribe((event) => {
        const { source, itemStack } = event
        switch (itemStack.typeId) {
            case "minecraft:ender_pearl":
            if (source.hasTag('nodebuff') && !source.hasTag('cooldown')) {
                source.addTag('cooldown');
                source.runCommand('xp 15L @s');
                for (let i = 1; i <= 15; i++) {
                    system.runTimeout(() => {
                        if (!source.hasTag('duel')) return;
                        source.runCommand("xp -1L @s");
                        if (i === 15) {
                            source.removeTag('cooldown');
                            source.playSound('random.click');
                            source.runCommand('title @s actionbar §aYour cooldown has expired!');
                        }
                    }, i * 20); // 20 ticks per second
                }
            }
            break;
            case "minecraft:ink_sac":
                if (source.hasTag('speedbridge')) resetSpeedbridgeBestTimes(source)
                if (source.hasTag('blockparkour')) resetBlockParkourBestTimes(source)
            break;
            case "minecraft:snowball":
                if (source.getGameMode() === "Creative") return;
                if (source.hasTag('kiteditor') || source.hasTag('duel')) return;
                source.runCommand('give @s snowball 1')
            break;
            case "minecraft:red_dye":
                source.runCommand('gamemode a @s')
                reset(source);
                source.sendMessage("§3Teleporting to the lobby...");
                source.runCommand("execute at @s run kill @e[type=bot:pvp,r=10]")
                system.runTimeout(() => {
                source.runCommand("replaceitem entity @s slot.hotbar 4 compass");
                source.sendMessage("§3You have been teleported to the lobby!");
                source.teleport({ x: 0.5, y: 200, z: 0.5 }, {facingLocation: { x: 0.5, y: 200, z: -0.5}}); //add 0.5 to x and z to tp to center of block
                }, 20);
            break;
            case "minecraft:magma_cream": 
                source.runCommand('scoreboard players set @s combocount 0')
                source.playSound('random.click')
                source.sendMessage("§3Killed all bots in a 100 block radius!");
                source.runCommand("execute at @s run kill @e[type=bot:pvp,r=100]")
            break;        
            case "minecraft:slime_ball":
                source.runCommand("execute at @s run kill @e[type=bot:pvp,r=10]")
                source.runCommand('scoreboard players set @s combocount 0');
                source.playSound('random.click');
                ["hive", "cubecraft", "zeqasumo", "nethergames", "combo", "18java"].forEach(tag => source.removeTag(tag));
                const botTypes = [
                    { name: "Dummy", summon: "bot:dummy" },
                    { name: "Easy", summon: "bot:easy" },
                    { name: "Medium", summon: "bot:medium" },
                    { name: "Hard", summon: "bot:hard" },
                    { name: "God", summon: "bot:god" },
                    { name: "Hacker", summon: "bot:hacker" }
                ];
                const kbTypes = ["hive", "cubecraft", "zeqasumo", "nethergames", "combo", "18java"];
                function capitalize(str) {
                    return str.charAt(0).toUpperCase() + str.slice(1);
                }
                bot.show(source).then(r => {
                    if (r.canceled) return;
                    const botType = botTypes[r.selection];
                    const kbForm = new ActionFormData()
                        .title("§bKnockback Settings§g§r§i§d")
                        .body("Select knockback for both you and the bot")
                        .button("Hive", "textures/jsonui/knockback/hive.png")
                        .button("Cubecraft", "textures/jsonui/knockback/cubecraft.png")
                        .button("Zeqa Sumo", "textures/jsonui/knockback/zeqasumo.png")
                        .button("Nethergames", "textures/jsonui/knockback/nethergames.png")
                        .button("Combo", "textures/jsonui/knockback/combo.png")
                        .button("1.8 Java", "textures/jsonui/knockback/18java.png");
                    kbForm.show(source).then(r2 => {
                        if (r2.canceled) return;
                        const kb = kbTypes[r2.selection];
                        source.runCommand(`execute at @s run summon bot:pvp ~ ~ ~ ~ ~ ${botType.summon}`);
                        system.runTimeout(() => {
                            // Set KB tags for bot
                            kbTypes.forEach(tag => {
                                source.runCommand(`execute at @s run tag @e[type=bot:pvp,r=3] ${kb === tag ? "add" : "remove"} ${tag}`);
                            });
                            // Set KB tags for player
                            kbTypes.forEach(tag => {
                                if (kb === tag) source.addTag(tag);
                                else source.removeTag(tag);
                            });
                            if (source.hasTag('zeqasumo') || source.hasTag('nethergames') || source.hasTag('combo')) {
                                system.runTimeout(() => {
                                    source.playSound("random.anvil_land");
                                    source.sendMessage(`§3You are playing beta version of ${source.getTags().find(tag => ['zeqasumo', 'nethergames', 'combo'].includes(tag))} KB!\nBugs may occur during gameplay!`);
                                }, 20);
                            }
                            source.runCommand("effect @e[type=bot:pvp,r=3] slowness 1 255 true");
                            source.runCommand("replaceitem entity @e[type=bot:pvp,r=3] slot.weapon.mainhand 0 stick");
                            source.sendMessage(`§3You have selected §b${botType.name} §3difficulty for the bot!`);
                            source.sendMessage(`§3Knockback: §b${capitalize(kb)}`);
                        }, 2); // Wait 2 ticks for bot to spawn
                    });
                });
                break;
            case "minecraft:orange_dye":
                const hitsValue = getPlayerHitsTag(source);
                const kbIndex = getPlayerKBIndex(source);
                function getPlayerHitsTag(source) {
                    for (let i = 1; i <= 10; i++) {
                        if (source.hasTag(`hits_${i}`)) return i;
                    }
                }
                function getPlayerKBIndex(source) {
                    if (source.hasTag("defaultkb")) return 0;
                    if (source.hasTag("farkb")) return 1;
                    if (source.hasTag("maxkb")) return 2;
                }
                const configForm = new ModalFormData()
                    .title("§bConfig")
                    .slider("Total Hits", 1, 10, { defaultValue: hitsValue})
                    .dropdown("Knockback Multiplier", ["Default", "Far", "Maximum"], {defaultValueIndex: kbIndex});
                configForm.show(source).then(r => {
                if (r.canceled) return;
                const totalHits = r.formValues[0]; // value from the slider
                const kbIndex = r.formValues[1];
                const kbNames = ["Default", "Far", "Maximum"];
                const kbTags = ["defaultkb", "farkb", "maxkb"]; // Example tags for each KB option
                // Remove all KB tags first
                kbTags.forEach(tag => source.removeTag(tag));
                // Add the selected KB tag
                source.addTag(kbTags[kbIndex]);
                // Remove all possible hit tags (hits_1 to hits_10)
                for (let i = 1; i <= 10; i++) source.removeTag(`hits_${i}`);
                // Add the selected hit tag
                source.addTag(`hits_${totalHits}`);
                const kbValue = kbNames[kbIndex];
                source.sendMessage(`§3Config saved! §bTotal Hits: §f${totalHits}§r,\n §bKnockback Multiplier: §f${kbValue}`);
            });
            break;
            case "minecraft:green_dye":
                startCountdown(source)
            break;
            case "minecraft:blue_dye":
                if (source.getGameMode() === "Adventure") {
                    source.sendMessage("§aYou are now in Creative mode!");
                    source.runCommand("gamemode c @s");
                } else if (source.getGameMode() === "Creative") {
                    source.sendMessage("§aYou are now in Adventure mode!");
                    source.runCommand("gamemode a @s");
                }
            break;
            case "minecraft:compass":
                source.playSound('random.click')
                navigator.show(source).then(r => {
                if (r.canceled) return
                switch (r.selection) {
                    case 0: practice.show(source).then (r => {
                        if (r.canceled) return;
                        switch (r.selection) {
                            case 0: //ffa
                                posx = 500
                                posy = 100
                                posz = 500
                                system.runTimeout(() => {
                                    delblock6x(source, posx, posy, posz)
                                }, 35);
                                source.addTag('ffa')
                                source.removeTag('hub')
                                source.teleport({ x: 500.5, y: 100, z: 500.5 } ) 
                                source.runCommand("clear @s");
                                source.addTag('res')
                                system.runTimeout(() => {
                                    source.playSound('random.click')
                                    source.runCommand("replaceitem entity @s slot.hotbar 0 diamond_sword");
                                    source.runCommand("replaceitem entity @s slot.hotbar 1 snowball 3");
                                    source.runCommand("replaceitem entity @s slot.hotbar 2 fishing_rod");
                                    source.runCommand("replaceitem entity @s slot.hotbar 6 slime_ball");
                                    source.runCommand("replaceitem entity @s slot.hotbar 7 magma_cream");
                                    source.runCommand("replaceitem entity @s slot.hotbar 8 red_dye");
                                }, 40);                            
                            break;
                            case 1: bridgeffa.show(source).then(r => {
                                if (r.canceled) return;
                                teleportToBridgeFFA(source, r.selection);
                            });
                            break;
                            case 2: speedbridge.show(source).then(r => {
                                if (r.canceled) return;
                                if (world.getPlayers().length > 1) {
                                    source.sendMessage("§cSpeedbridge is only available in singleplayer!");
                                    return;
                                }
                                teleportToSpeedbridge(source, r.selection);    
                            });
                            break;
                            case 3: //clutch
                                if (world.getPlayers().length > 1) {
                                    source.sendMessage("§cClutch is only available in singleplayer!");
                                    return;
                                }
                                posx = 2000
                                posy = 100
                                posz = 500
                                world.setDifficulty('Peaceful')
                                source.removeTag('hub')
                                source.addTag('clutch')
                                source.addTag('res')
                                source.runCommand('clear @s')
                                source.runCommand('inputpermission set @s movement disabled')
                                source.teleport({ x: 1998 + 0.5, y: posy, z: 501 + 0.5})
                                system.runTimeout(() => {
                                    source.runCommand('execute at @s run kill @e[type=bot:pvp,r=10]')
                                    delblock6x(source, posx, posy, posz)
                                }, 20);
                                system.runTimeout(() => {
                                    delblock6x(source, posx, posy, posz)
                                    source.runCommand(`summon bot:pvp ${posx} ${posy} ${posz} ~ ~ bot:clutch`)
                                    source.runCommand('inputpermission set @s movement enabled')
                                    source.runCommand('replaceitem entity @s slot.hotbar 0 green_dye')
                                    source.runCommand('replaceitem entity @s slot.hotbar 1 orange_dye')
                                    source.runCommand('replaceitem entity @s slot.hotbar 8 red_dye')
                                    source.addTag('defaultkb')
                                    source.addTag('hits_10')
                                }, 40);
                            break;
                            case 4:  
                                if (world.getPlayers().length > 1) {
                                    source.sendMessage("§cBlock Parkour is only available in singleplayer!");
                                    return;
                                }
                                blockparkour.show(source).then(r => {
                                    if (r.canceled) return;
                                    const courseTags = Object.keys(blockParkourCourses);
                                    const selectedTag = courseTags[r.selection];
                                    teleportToBlockParkourCourse(source, selectedTag);
                                });
                            break;
                        }
                    });                    
                    break;
                    case 1:
                        botduel.show(source).then(async r => {
                            if (r.canceled || world.getPlayers().length > 1) {
                                if (world.getPlayers().length > 1) source.sendMessage("§cBot Duel is only available in singleplayer!");
                                return;
                            }
                            const gamemode = gamemodes[r.selection];
                            const botName = botNames[Math.floor(Math.random() * botNames.length)];
                            source.runCommand('scoreboard objectives add totalhits dummy');

                            // Select bot difficulty
                            const diffForm = await duelbotdifficulty.show(source);
                            if (diffForm.canceled) return;
                            const botTypes = [
                                { name: "Player", summon: "" },
                                { name: "Easy", summon: "easy" },
                                { name: "Medium", summon: "medium" },
                                { name: "Hard", summon: "hard" },
                                { name: "God", summon: "god" },
                                { name: "Hacker", summon: "hacker" }
                            ];
                            const botType = botTypes[diffForm.selection];

                            // Select KB type
                            let kbTypes = gamemode === "combo" ? kbTypesCombo : kbTypesDefault;
                            let kbForm = new ActionFormData()
                                .title("§bDuel Knockback Settings§g§r§i§d")
                                .body(gamemode === "combo" ? "Only Combo KB is available for Combo mode" : "Select the duel knockback settings");
                            kbTypes.forEach(kb => kbForm.button(kb.charAt(0).toUpperCase() + kb.slice(1), `textures/jsonui/knockback/${kb}.png`));
                            const kbResponse = await kbForm.show(source);
                            if (kbResponse.canceled) return;
                            const kbTag = kbTypes[kbResponse.selection];

                            // Prepare player for duel
                            source.runCommand("clear @s");
                            source.removeTag("hub");
                            source.addTag("duel");
                            kbTypes.forEach(tag => source.removeTag(tag));
                            system.runTimeout(() => source.addTag(kbTag), 1);

                            // Select map
                            let mapSet = ["sumo", "stickfight", "treasurewars", "skywars", "hallfight"].includes(gamemode) ? gamemode : "normal";
                            const mapKeys = Object.keys(maps.modes[mapSet]);
                            const randomKey = mapKeys[Math.floor(Math.random() * mapKeys.length)];
                            const mapObj = maps.modes[mapSet][randomKey];
                            source.onScreenDisplay.setActionBar(`§bSelected map: §f${randomKey}`);
                            source.teleport(
                                { x: mapObj.spawn1.x + 0.5, y: mapObj.spawn1.y, z: mapObj.spawn1.z + 0.5 },
                                { facingLocation: { x: mapObj.spawn2.x + 0.5, y: mapObj.spawn2.y, z: mapObj.spawn2.z + 0.5 } }
                            );
                            source.runCommand('inputpermission set @s movement disabled');
                            source.runCommand(`tickingarea add circle ${mapObj.center.x} ${mapObj.center.y} ${mapObj.center.z} 4 duel`);

                            // Countdown logic
                            let countdown = 6;
                            const duelInterval = system.runInterval(() => {
                                countdown--;
                                delblock6x(source, mapObj.center.x, mapObj.center.y, mapObj.center.z);
                                delblock6x(source, mapObj.spawn1.x, mapObj.spawn1.y, mapObj.spawn1.z);
                                delblock6x(source, mapObj.spawn2.x, mapObj.spawn2.y, mapObj.spawn2.z);
                                delblock6xfire(source, mapObj.center.x, mapObj.center.y, mapObj.center.z);
                                delblock6xfire(source, mapObj.spawn1.x, mapObj.spawn1.y, mapObj.spawn1.z);
                                delblock6xfire(source, mapObj.spawn2.x, mapObj.spawn2.y, mapObj.spawn2.z);

                                if (countdown > 0) {
                                    source.playSound("random.click");
                                    source.sendMessage(`§bMatch starting in §f${countdown}...`);
                                    source.runCommand(`tickingarea add circle ${mapObj.center.x} ${mapObj.center.y} ${mapObj.center.z} 4 duel`);
                                    if (countdown > 3) {
                                        ["bot:pvp", "bot:treasure", "bot:bottreasure"].forEach(type => {
                                            source.dimension.getEntities({ type }).forEach(entity => {
                                                const dist = Math.sqrt(
                                                    Math.pow(entity.location.x - source.location.x, 2) +
                                                    Math.pow(entity.location.y - source.location.y, 2) +
                                                    Math.pow(entity.location.z - source.location.z, 2)
                                                );
                                                if (dist <= 100) entity.remove();
                                            });
                                        });
                                    }
                                } else {
                                    system.clearRun(duelInterval);
                                    gamemodes.forEach(tag => source.removeTag(tag));
                                    source.addTag(gamemode);
                                    source.playSound("firework.blast");
                                    source.sendMessage(`§bOpponent: §f${botName} \n§bDifficulty: §f${botType.name} \n§f${kbTag} §bKB`);
                                    source.runCommand('inputpermission set @s movement enabled');
                                    if (["zeqasumo", "nethergames", "combo"].some(tag => source.hasTag(tag))) {
                                        system.runTimeout(() => {
                                            source.playSound("random.anvil_land");
                                            source.sendMessage(`§3You are playing beta version of ${source.getTags().find(tag => ["zeqasumo", "nethergames", "combo"].includes(tag))} KB!\nBugs may occur during gameplay!`);
                                        }, 20);
                                    }
                                    loadKitForPlayer(source, gamemode);
                                    system.runTimeout(() => replaceBucketsForDuel(source), 2);
                                }
                            }, 20);

                            // Summon bot after 60 ticks
                            system.runTimeout(() => {
                                const summonCmd = botType.summon === "" ?
                                    `summon bot:pvp ${mapObj.spawn2.x} ${mapObj.spawn2.y} ${mapObj.spawn2.z}` :
                                    `summon bot:pvp ${mapObj.spawn2.x} ${mapObj.spawn2.y} ${mapObj.spawn2.z} ~ ~ bot:${botType.summon}`;
                                source.runCommand(summonCmd);

                                // Treasurewars extra entities
                                if (gamemode === "treasurewars") {
                                    source.dimension.spawnEntity("bot:treasure", {
                                        x: mapObj.treasure1.x + 0.5,
                                        y: mapObj.treasure1.y,
                                        z: mapObj.treasure1.z + 0.5
                                    });
                                    source.dimension.spawnEntity("bot:bottreasure", {
                                        x: mapObj.treasure2.x + 0.5,
                                        y: mapObj.treasure2.y,
                                        z: mapObj.treasure2.z + 0.5
                                    });
                                }

                                // Wait 2 ticks, then find the bot and set up
                                system.runTimeout(() => {
                                    const { botEntity } = getClosestBotEntity(source);
                                    if (!botEntity) return;
                                    botEntity.addEffect("slowness", 50, { amplifier: 255, showParticles: false });
                                    botEntity.nameTag = botName;
                                    gamemodes.forEach(tag => {
                                        source.removeTag(tag);
                                        botEntity.removeTag(tag);
                                    });
                                    system.runTimeout(() => {
                                        source.addTag(gamemode);
                                        botEntity.addTag(gamemode);
                                    }, 1);

                                    // Equip bot armor/weapons
                                    const botArmorSets = {
                                        nodebuff:   { helmet: "diamond_helmet", chest: "diamond_chestplate", legs: "diamond_leggings", boots: "diamond_boots", weapon: "diamond_sword" },
                                        boxing:     { helmet: null, chest: null, legs: null, boots: null, weapon: "diamond_sword" },
                                        sumo:       { helmet: null, chest: null, legs: null, boots: null, weapon: "stick" },
                                        midfight:   { helmet: "diamond_helmet", chest: "diamond_chestplate", legs: "diamond_leggings", boots: "diamond_boots", weapon: "diamond_sword" },
                                        builduhc:   { helmet: "diamond_helmet", chest: "diamond_chestplate", legs: "diamond_leggings", boots: "diamond_boots", weapon: "diamond_sword" },
                                        gapple:     { helmet: "iron_helmet", chest: "iron_chestplate", legs: "iron_leggings", boots: "iron_boots", weapon: "iron_sword" },
                                        skywars:    { helmet: "diamond_helmet", chest: "iron_chestplate", legs: "diamond_leggings", boots: "diamond_boots", weapon: "diamond_sword" },
                                        treasurewars:{ helmet: "chainmail_helmet", chest: "chainmail_chestplate", legs: "iron_leggings", boots: "iron_boots", weapon: "iron_sword" },
                                        hallfight:  { helmet: "chainmail_helmet", chest: "chainmail_chestplate", legs: null, boots: null, weapon: "stone_sword" },
                                        stickfight: { helmet: null, chest: null, legs: null, boots: null, weapon: "stick" },
                                        combo:      { helmet: "diamond_helmet", chest: "diamond_chestplate", legs: "diamond_leggings", boots: "diamond_boots", weapon: "diamond_sword" }
                                    };
                                    const armorSet = botArmorSets[gamemode];
                                    if (armorSet) {
                                        if (armorSet.helmet) botEntity.runCommand(`replaceitem entity @s slot.armor.head 1 ${armorSet.helmet}`);
                                        if (armorSet.chest)  botEntity.runCommand(`replaceitem entity @s slot.armor.chest 1 ${armorSet.chest}`);
                                        if (armorSet.legs)   botEntity.runCommand(`replaceitem entity @s slot.armor.legs 1 ${armorSet.legs}`);
                                        if (armorSet.boots)  botEntity.runCommand(`replaceitem entity @s slot.armor.feet 1 ${armorSet.boots}`);
                                        if (armorSet.weapon) botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 ${armorSet.weapon}`);
                                    }
                                    kbTypes.forEach(tag => botEntity.removeTag(tag));
                                    system.runTimeout(() => {
                                        botEntity.addTag(kbTag);
                                        botEntity.addTag('duel');
                                        if (botType.summon) botEntity.addTag(botType.summon);
                                        if (botType.name === "Player") botEntity.addTag("player");
                                        source.runCommand('scoreboard players set @s totalhits 0');
                                        source.runCommand(`scoreboard players set ${botName} totalhits 0`);
                                    }, 1);

                                    // Effects and scoreboard setup
                                    if (gamemode === "skywars") source.addEffect("absorption", 99999, { amplifier: 0, showParticles: false });
                                    if (gamemode === "nodebuff") {
                                        source.addEffect("speed", 99999, { amplifier: 0, showParticles: false });
                                        botEntity.addEffect("speed", 99999, { amplifier: 0, showParticles: false });
                                    }
                                    if (gamemode === "treasurewars") {
                                        treasurewarsSpawns.set(source.name, {
                                            source: { x: mapObj.spawn1.x + 0.5, y: mapObj.spawn1.y, z: mapObj.spawn1.z + 0.5 },
                                            bot: { x: mapObj.spawn2.x + 0.5, y: mapObj.spawn2.y, z: mapObj.spawn2.z + 0.5 }
                                        });
                                        source.addTag("respawn");
                                        botEntity.addTag("respawn");
                                        source.runCommand(`spawnpoint @s ${mapObj.spawn1.x} ${mapObj.spawn1.y} ${mapObj.spawn1.z}`);
                                    }
                                    if (["sumo", "boxing", "stickfight"].includes(gamemode)) {
                                        source.addTag("res");
                                        botEntity.addTag("res");
                                    }
                                    if (gamemode === "boxing") source.runCommand('scoreboard objectives setdisplay sidebar totalhits');
                                    if (["sumo", "midfight", "stickfight"].includes(gamemode)) {
                                        duelScoreSpawns.set(source.name, {
                                            source: { x: mapObj.spawn1.x + 0.5, y: mapObj.spawn1.y, z: mapObj.spawn1.z + 0.5 },
                                            bot: { x: mapObj.spawn2.x + 0.5, y: mapObj.spawn2.y, z: mapObj.spawn2.z + 0.5 }
                                        });
                                        source.runCommand('scoreboard objectives add duel_score dummy');
                                        source.runCommand('scoreboard players set @s duel_score 0');
                                        source.runCommand(`scoreboard players set ${botName} duel_score 0`);
                                        source.runCommand('scoreboard objectives setdisplay sidebar duel_score');
                                    }
                                }, 2);
                            }, 60);
                        });
                        break;
                    case 2: // Shop (now Cosmetic Collection)
                    const cosmeticCollection = new ActionFormData()
                        .title("§bCosmetic Collection§g§r§i§d")
                        .body("Select your cosmetic category")
                        .button("Hit Particle", "textures/jsonui/shop/hit_particle.png")
                        .button("Trail Particle", "textures/jsonui/shop/trail_particle.png")
                        .button("Kill Effect", "textures/jsonui/shop/kill_effect.png");
                    cosmeticCollection.show(source).then(r => {
                        if (r.canceled) return;
                        // Cosmetic lists with image paths
                        const hitParticles = [
                            { name: "Crits", tag: "hit_crits"},
                            { name: "Angry Villager", tag: "hit_angry"},
                            { name: "Smoke", tag: "hit_smoke"},
                            { name: "Ice Smoke", tag: "hit_ice"},
                            { name: "Roar", tag: "hit_roar"},
                            { name: "Blaze", tag: "hit_blaze"},
                            { name: "Blue Blaze", tag: "hit_blueblaze"}
                        ];
                        const trailParticles = [
                            { name: "Dust", tag: "trail_dust"},
                            { name: "Note", tag: "trail_note"},
                            { name: "Spark", tag: "trail_spark"},
                            { name: "Infested", tag: "trail_infested"},
                            { name: "Cherry", tag: "trail_cherry"},
                            { name: "Soul", tag: "trail_soul"},
                            { name: "Heart", tag: "trail_heart"},
                            { name: "Growth", tag: "trail_growth"},
                            { name: "Totem Pop", tag: "trail_totem"},
                            { name: "Cursed Effect", tag: "trail_cursed"},
                            { name: "Eternal Flame", tag: "trail_flame"}
                        ];
                        const killEffects = [
                            { name: "Blood Kill", tag: "death_blood"},
                            { name: "Lightning Kill", tag: "death_lightning"},
                            { name: "Firework Rocket", tag: "death_firework"},
                            { name: "Lava Eruption", tag: "death_lava"},
                            { name: "Omen", tag: "death_omen"},
                            { name: "Sonic Boom", tag: "death_sonic"},
                            { name: "Shriek", tag: "death_shriek"},
                            { name: "Black Blood", tag: "death_blackblood"},
                            { name: "Breeze Explosion", tag: "death_breeze"},
                            { name: "Growth", tag: "death_growth"}
                        ];
                        // Helper for single selection
                        function selectSingle(player, list, selectedTag) {
                            const item = list.find(i => i.tag === selectedTag);
                            if (!item) return;
                            if (player.hasTag(selectedTag)) {
                                player.removeTag(selectedTag);
                                player.sendMessage(`§bDisabled: §r${item.name}`);
                            } else {
                                list.forEach(i => player.removeTag(i.tag));
                                player.addTag(selectedTag);
                                player.sendMessage(`§bSelected: §r${item.name}`);
                            }
                        }
                        // Helper for multi selection
                        function toggleMulti(player, tag, list) {
                            const item = list.find(i => i.tag === tag);
                            if (!item) return;
                            if (player.hasTag(tag)) {
                                player.removeTag(tag);
                                player.sendMessage(`§bDisabled: §r${item.name}`);
                            } else {
                                player.addTag(tag);
                                player.sendMessage(`§bSelected: §r${item.name}`);
                            }
                        }
                        // Cosmetic selection logic
                        switch (r.selection) {
                            case 0: // Hit Particle
                                const hitForm = new ActionFormData().title("§bHit Particle");
                                hitForm.body("Select a hit particle effect");
                                hitParticles.forEach(item => {
                                    const isSelected = source.hasTag(item.tag);
                                    hitForm.button(isSelected ? `§3§o${item.name}§r` : item.name);
                                });
                                hitForm.show(source).then(res => {
                                    if (res.canceled) return;
                                    selectSingle(source, hitParticles, hitParticles[res.selection].tag);
                                });
                                break;
                            case 1: // Trail Particle
                                const trailForm = new ActionFormData().title("§bTrail Particle");
                                trailForm.body("Select a trail particle effect");
                                trailParticles.forEach(item => {
                                    const isSelected = source.hasTag(item.tag);
                                    trailForm.button(isSelected ? `§b§o${item.name}§r` : item.name);
                                });
                                trailForm.show(source).then(res => {
                                    if (res.canceled) return;
                                    selectSingle(source, trailParticles, trailParticles[res.selection].tag);
                                });
                                break;
                            case 2: // Kill Effect (multi-select)
                                const killForm = new ActionFormData().title("§bKill Effect");
                                killForm.body("Select multiple kill effects to toggle");
                                killEffects.forEach(item => {
                                    const isSelected = source.hasTag(item.tag);
                                    killForm.button(isSelected ? `§b§o${item.name}§r` : item.name);
                                });
                                killForm.show(source).then(res => {
                                    if (res.canceled) return;
                                    const item = killEffects[res.selection];
                                    toggleMulti(source, item.tag, killEffects); // Pass killEffects as 'list'
                                });
                                break;
                            }
                        });
                    break;
                    case 3: {
                        const toggles = [
                            { tag: "cps", idx: 2 },
                            { tag: "hit", idx: 3 },
                            { tag: "reach", idx: 4 },
                            { tag: "bright", idx: 5, effect: "night_vision", effectProps: { duration: 999999, amplifier: 255, showParticles: false } },
                            { tag: "jumpreset", idx: 6 },
                            { tag: "botstap", idx: 7 },
                            { tag: "rightcps", idx: 8 }
                        ];
                        let form = new ModalFormData()
                            .title("§bSettings")
                            .dropdown("Select Time", ["Day", "Noon", "Sunset", "Night", "Midnight"])
                            .dropdown("Select Weather", ["Clear", "Rain"])
                            .toggle("CPS Counter", { defaultValue: source.hasTag("cps") })
                            .toggle("Combo Counter", { defaultValue: source.hasTag("hit") })
                            .toggle("Reach Counter", { defaultValue: source.hasTag("reach") })
                            .toggle("Full Brightness", { defaultValue: source.hasTag("bright") })
                            .toggle("Bot Jump Resetting (Advanced)", { defaultValue: source.hasTag("jumpreset") })
                            .toggle("Bot S-tapping", { defaultValue: source.hasTag("botstap") })
                            .toggle("Block Stats (BridgeFFA)", { defaultValue: source.hasTag("rightcps") });

                        form.show(source).then(r => {
                            if (r.canceled) return;
                            source.sendMessage("§3Settings have been updated!");

                            toggles.forEach(({ tag, idx, effect, effectProps }) => {
                                if (r.formValues[idx]) {
                                    source.addTag(tag);
                                    if (effect) source.addEffect(effect, effectProps.duration, effectProps);
                                } else {
                                    source.removeTag(tag);
                                    if (effect) source.removeEffect(effect);
                                }
                            });

                            // Time
                            const timeCmds = [
                                "time set 1000",    // Day
                                "time set 6000",    // Noon
                                "time set 12000",   // Sunset
                                "time set 15000",   // Night
                                "time set 18000"    // Midnight
                            ];
                            source.runCommand(timeCmds[r.formValues[0]]);

                            // Weather
                            const weatherCmds = ["weather clear", "weather rain"];
                            source.runCommand(weatherCmds[r.formValues[1]]);
                        });
                        break;
                    }
                    case 4: //kit editor
                        kiteditor.show(source).then (r => {
                            if (r.canceled) return;
                            if (world.getPlayers().length > 1) {
                                source.sendMessage("§cKit Editor is only available in singleplayer!");
                                return;
                            }
                            source.addTag('kiteditor')
                            source.teleport({ x: 1000.5, y: 102, z: -5500 + 0.5 }, {facingLocation: { x: 1002 + 0.5, y: 102, z: -5493 + 0.5}})
                            system.runTimeout(() => {
                                source.sendMessage('§3Interact with §bAnvil §3to §bSave kit!')
                                source.sendMessage('§3Interact with §bGrindstone §3to §bReset kit!')
                                source.playSound('random.orb')
                            }, 1);
                            const gamemodes = ['nodebuff', 'boxing', 'sumo', 'midfight', 'builduhc', 'gapple', 'skywars', 'treasurewars', 'hallfight', 'stickfight', 'combo'];
                            // Remove all gamemode tags first
                            for (const tag of gamemodes) {source.removeTag(tag);}
                            // Add the selected gamemode tag
                            if (r.selection >= 0 && r.selection < gamemodes.length) {
                                source.addTag(gamemodes[r.selection]);
                                // Load kit based on gamemode
                                loadKitForPlayer(source, gamemodes[r.selection]);
                            }
                        })
                    break;
                }
            }
        ); break;
        }
    });

    const activeCooldowns = new Map();

    const kbSettings = {
        hive:        { height: 0.37, adjust: 3.93, stap: 1.9, hori: 0.59, verti: 0.41 },
        cubecraft:   { height: 0.35, adjust: 2.5, stap: 1.1, hori: 0.71, verti: 0.40 },
        zeqasumo:    { height: 0.35, adjust: 4.09, stap: 1.5, hori: 0.46, verti: 0.37 },
        nethergames: { height: 0.34, adjust: 4.07, stap: 1.5, hori: 0.49, verti: 0.35 },
        combo:       { height: null, adjust: 4.7, stap: 1.2, hori: 0.13, verti: null },
        "18java":    { height: 0.3, adjust: 3.5, stap: 1.5, hori: 1.21, verti: 0.35 },
        clutch:      { hori: 0.61, verti: 0.42 }
    };

    world.afterEvents.entityHitEntity.subscribe((data) => {
        const { hitEntity, damagingEntity } = data;
        let hitCooldown = 0;
        if (!(hitEntity.hasTag("zeqasumo") || hitEntity.hasTag("nethergames") || hitEntity.hasTag("combo"))) return;
        hitCooldown = hitEntity.hasTag("combo") ? 2 : 7;
        if (activeCooldowns.has(hitEntity)) return;

        const options = { cause: "selfDestruct", damagingEntity };
        if (damagingEntity.typeId === "bot:pvp") {
            hitEntity.applyDamage(hitEntity.hasTag('res') ? 0.00000000001 : 0.45, options);
        } else if (damagingEntity.typeId === "minecraft:player") {
            hitEntity.applyDamage(0.00000000001, options);
        }

        const timeoutHandle = system.runTimeout(() => {
            activeCooldowns.delete(hitEntity);
        }, hitCooldown);
        activeCooldowns.set(hitEntity, timeoutHandle);
    });

    world.afterEvents.entityHurt.subscribe((data) => {
        const { damageSource, hurtEntity, damage } = data;
        if (!damageSource.damagingEntity || !hurtEntity) return;

        const attackloc = damageSource.damagingEntity.location;
        const hurtloc = hurtEntity.location;
        const x = hurtloc.x - attackloc.x;
        const z = hurtloc.z - attackloc.z;
        const y = hurtloc.y - attackloc.y;
        const magnitude = Math.sqrt(x * x + z * z) || 1;
        const newx = x / magnitude;
        const newz = z / magnitude;
        const random = Math.floor(Math.random() * 100);

        // Bot knockback
        if (["bot:pvp", "bot:treasure", "bot:bottreasure"].includes(hurtEntity.typeId)) {
            let kbType = Object.keys(kbSettings).find(tag => hurtEntity.hasTag(tag));
            let { height = 0, adjust = 9999, stap = 1 } = kbSettings[kbType] || {};
            if (kbType === "combo") {
                height = y >= 2 ? 0.05 : 0.22;
                adjust = 4.7;
            }
            if (damage !== 0) {
                if (["hive", "cubecraft", "18java"].some(tag => damageSource.damagingEntity.hasTag(tag))) {
                    damageSource.damagingEntity.addEffect("weakness", 9, { amplifier: 255, showParticles: false });
                }
                if (["zeqasumo", "nethergames", "combo"].some(tag => damageSource.damagingEntity.hasTag(tag))) {
                    damageSource.damagingEntity.addEffect("weakness", 6, { amplifier: 255, showParticles: false });
                }
            }
            damageSource.damagingEntity.runCommand('scoreboard players add @s combocount 1');
            stap = damageSource.damagingEntity.hasTag("botstap") && random < 60 && kbSettings[kbType]?.stap ? kbSettings[kbType].stap : 1;
            let ground = 1;
            if (damageSource.damagingEntity.hasTag('jumpreset')) {
                ground = hurtEntity.isOnGround ? 99999 : 1;
                if (hurtEntity.isOnGround) adjust *= -15000;
            }
            hurtEntity.clearVelocity();
            hurtEntity.applyImpulse({ x: (newx / adjust) * stap / ground, y: height, z: (newz / adjust) * stap / ground });
            return;
        }

        // Player knockback
        if (hurtEntity.typeId === "minecraft:player") {
            let kbType = Object.keys(kbSettings).find(tag => hurtEntity.hasTag(tag));
            let { hori = 0, verti = 0 } = kbSettings[kbType] || {};
            if (kbType === "combo") {
                hori = 0.13;
                verti = y < 2 ? 0.23 : 0.11;
            }
            let multiply = 1;
            if (hurtEntity.hasTag('clutch')) {
                if (hurtEntity.hasTag('defaultkb')) multiply = 1;
                else if (hurtEntity.hasTag('farkb')) multiply = 1.5;
                else if (hurtEntity.hasTag('maxkb')) multiply = 2;
                if (damageSource.damagingEntity.typeId === "bot:pvp") {
                    hurtEntity.runCommand('scoreboard players add @s bothits 1');
                    damageSource.damagingEntity.teleport({ x: damageSource.damagingEntity.location.x, y: 200, z: damageSource.damagingEntity.location.z });
                    for (let i = 1; i <= 10; i++) {
                        if (hurtEntity.hasTag(`hits_${i}`)) {
                            let score = 0;
                            try { score = world.scoreboard.getObjective("bothits").getScore(hurtEntity); } catch {}
                            if (score >= i) {
                                world.setDifficulty('Peaceful');
                                system.runTimeout(() => {
                                    hurtEntity.teleport({ x: 1998.5, y: 100, z: 501.5 });
                                    delblock6x(hurtEntity, 2000, 100, 500);
                                    hurtEntity.runCommand('clear @s');
                                    hurtEntity.runCommand('replaceitem entity @s slot.hotbar 0 green_dye');
                                    hurtEntity.runCommand('replaceitem entity @s slot.hotbar 1 orange_dye');
                                    hurtEntity.runCommand('replaceitem entity @s slot.hotbar 8 red_dye');
                                }, 60);
                                hurtEntity.playSound("random.click");
                                hurtEntity.runCommand('scoreboard players set @s bothits 0');
                                system.runTimeout(() => {
                                    hurtEntity.runCommand('execute at @s run kill @e[type=bot:pvp]');
                                }, 1);
                                system.runTimeout(() => {
                                    hurtEntity.runCommand(`summon bot:pvp 2000 100 500 ~ ~ bot:clutch`);
                                }, 2);
                            }
                            break;
                        }
                    }
                }
            }
            let adjusthori = 1, adjustverti = 1;
            if (damageSource.damagingEntity.typeId === "bot:pvp") {
                hurtEntity.runCommand('scoreboard players set @s combocount 0');
                if (damageSource.damagingEntity.hasTag('18java')) {
                    damageSource.damagingEntity.addEffect("slowness", 2, { amplifier: 3, showParticles: false });
                }
                if (damageSource.damagingEntity.hasTag('nodebuff') && hurtEntity.hasTag('cubecraft')) {
                    damageSource.damagingEntity.addEffect("speed", 2, { amplifier: 1, showParticles: false });
                }
            } else if (damageSource.damagingEntity.typeId === "minecraft:player") {
                damageSource.damagingEntity.runCommand('scoreboard players add @s combocount 1');
                damageSource.damagingEntity.addEffect("weakness", 9, { amplifier: 255, showParticles: false });
                adjusthori = 0.75;
                adjustverti = 0.95;
            }
            hurtEntity.applyKnockback(
                { x: newx * hori * multiply * adjusthori, z: newz * hori * multiply * adjusthori },
                verti * adjustverti
            );
        }
    });

    world.afterEvents.projectileHitBlock.subscribe((data) => {
        const hitBlock = data.getBlockHit();
        const { projectile } = data;
        if (projectile.typeId === "minecraft:splash_potion" || projectile.typeId === "minecraft:snowball") return;
        if (hitBlock.typeId === "minecraft:air") return; // Ignore air blocks
        if (projectile.typeId === "minecraft:arrow" || projectile.typeId === "minecraft:fishing_hook") {
            projectile.remove(); // Remove the projectile after hitting a block
        }
    });

    world.afterEvents.projectileHitEntity.subscribe((data) => {
        const hitEntity = data.getEntityHit().entity
        const { projectile, source: projectileSource } = data
        if (projectile.typeId === "minecraft:splash_potion") return; // Ignore splash potions
        const options = {
            cause: "selfDestruct",
            damagingEntity: projectileSource
        };
            if (hitEntity.typeId === "bot:pvp") {
                if (projectile.typeId === "minecraft:splash_potion") return; // Ignore splash potions
                if (projectile.typeId === "minecraft:ender_pearl") return;
                system.runTimeout(() => {
                    projectileSource.playSound('random.orb')
                    hitEntity.applyDamage(0.000000000001, options)
                }, 1)
            }
            if (hitEntity.typeId === "minecraft:player") {
                //if (projectile.typeId === "minecraft:splash_potion") return; // Ignore splash potions
                if (!projectileSource.typeId === "bot:pvp") {
                    projectileSource.playSound('random.orb')
                }
                hitEntity.applyDamage(0.000000000001, options)
                hitEntity.runCommand('scoreboard players set @s combocount 0')
            }
        if (projectile.typeId === "minecraft:fishing_hook") {
            system.runTimeout(() => {
                projectile.remove();
            }, 0.95);
        }
    });

    world.beforeEvents.playerInteractWithBlock.subscribe((data) => {
        const interactblock = data.block
        if (data.player.hasTag("kiteditor") && (interactblock.permutation.matches('minecraft:grindstone') || interactblock.permutation.matches('minecraft:anvil'))) return;
        if (blockedBlocks.some(type => interactblock.permutation.matches(type))) {
            data.cancel = true;
            return;
        }
    });

    world.afterEvents.entitySpawn.subscribe(ev => {
        const entity = ev.entity;
        if (!entity) return;
        const allowedTypes = [
            "minecraft:player",
            "bot:pvp",
            "bot:block",
            "bot:treasure",
            "bot:bottreasure",
            "minecraft:ender_pearl",
            "minecraft:splash_potion",
            "minecraft:arrow",
            "minecraft:fishing_hook",
            "minecraft:snowball",
            "minecraft:lightning_bolt",
            "minecraft:fireworks_rocket",
            "minecraft:item"
        ];
        if (!allowedTypes.includes(entity.typeId)) {
            entity.remove();
        }
        if (entity.typeId === "minecraft:item") {
            const players = world.getPlayers();
            if (players.length === 0) return;
            let nearestPlayer = players[0];
            let minDist = Infinity;
            for (const player of players) {
                const dx = player.location.x - entity.location.x;
                const dy = player.location.y - entity.location.y;
                const dz = player.location.z - entity.location.z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < minDist) {
                    minDist = dist;
                    nearestPlayer = player;
                }
            }
            entity.teleport(nearestPlayer.location);
        }
    });

    world.beforeEvents.itemUse.subscribe((data) => {
        const { source, itemStack } = data
        if (source.hasTag("kiteditor")) {
            data.cancel = true;
        }
        if (source.hasTag('cooldown') && itemStack.typeId === "minecraft:ender_pearl") {
            data.cancel = true;
            //source.sendMessage("§cYou are on cooldown!");
        }
        if (source.hasTag('bridgeffa') || source.hasTag('speedbridge')) {
            if (itemStack.typeId !== "bot:block" && itemStack.typeId !== "minecraft:ink_sac" && itemStack.typeId !== "minecraft:red_dye" && itemStack.typeId !== "minecraft:blue_dye") {
                data.cancel = true;
            }
        }
    });

    world.afterEvents.playerInteractWithBlock.subscribe(ev => {
        const source = ev.player;
        const block = ev.block;
        const gamemode = getGamemodeTag(source);
        if (!source.hasTag('kiteditor')) return;
        if (!block) return;

        // Detect block type for action
        let action = null;
        if (block.permutation.matches('minecraft:anvil')) action = "save";
        //else if (block.permutation.matches('minecraft:stone_button')) action = "load";
        else if (block.permutation.matches('minecraft:grindstone')) action = "delete";
        else return; // Not a relevant block
        if (!gamemode) {
            source.sendMessage("§cYou don't have a gamemode tag.");
            return;
        }

        // --- Save kit ---
        if (action === "save") {
            const inv = source.getComponent("inventory").container;
            const equipment = source.getComponent("equippable");
            const items = [];
            for (let i = 0; i < inv.size; i++) items.push(inv.getItem(i));
            const slots = ["Head", "Chest", "Legs", "Feet", "Offhand"];
            for (let i = 0; i < slots.length; i++) items.push(equipment.getEquipment(slots[i]));

            if (source.hasTag("op")) {
                db.set(`default_${gamemode}`, items);
                source.sendMessage(`§aDefault kit for ${gamemode} saved!`);
            } else {
                db.set(`${sanitizeKey(source.name)}_${gamemode}`, items);
                source.sendMessage(`§aYour kit for ${gamemode} saved!`);
            }
            system.runTimeout(() => source.runCommand('clear @s'), 1);
            reset(source);
            system.runTimeout(() => {        
                source.runCommand("execute at @s run kill @e[type=bot:pvp,r=10]")
                source.runCommand("replaceitem entity @s slot.hotbar 4 compass")
                source.teleport({ x: 0.5, y: 200, z: 0.5 }, {facingLocation: { x: 0.5, y: 200, z: -0.5}})
            }, 2);
            return;
        }

        // --- Load kit ---
        if (action === "load") {
            loadKitForPlayer(source, gamemode);
            return;
        }

        // --- Delete kit ---
        if (action === "delete") {
            const key = `${sanitizeKey(source.name)}_${gamemode}`;
            if (db.has(key)) {
                db.delete(key);
                source.sendMessage(`§aYour kit for ${gamemode} has been deleted!`);
            } else {
                source.sendMessage(`§cYou don't have a personal kit for ${gamemode} to delete.`);
            }
            system.runTimeout(() => source.runCommand('clear @s'), 1);
            reset(source);
            system.runTimeout(() => {        
                source.runCommand("execute at @s run kill @e[type=bot:pvp,r=10]")
                source.runCommand("replaceitem entity @s slot.hotbar 4 compass")
                source.teleport({ x: 0.5, y: 200, z: 0.5 }, {facingLocation: { x: 0.5, y: 200, z: -0.5}})
            }, 2);
            return;
        }
    });

    world.beforeEvents.playerBreakBlock.subscribe(data => {
        if (!data.block) return;
        if (data.block.permutation.matches('bot:block')) return;
        const source = data.player;
        if (source.hasTag('op')) return;
        if (source.getGameMode() === "Creative") {
            data.cancel = true;
        }
    });

    world.afterEvents.playerPlaceBlock.subscribe(data => {
        if (!data.block) return;
        if (data.player.hasTag('op')) return;
        const blocklocx = data.block.x
        const blocklocy = data.block.y
        const blocklocz = data.block.z
        if (data.block.permutation.matches('bot:block')) {
            if (!data.player.hasTag("duel")) {
                detecttogiveblock(data.player)
            }
        }
        if (data.player.hasTag("kiteditor")) {
            data.player.runCommand(`setblock ${blocklocx} ${blocklocy} ${blocklocz} air`)
            give1block(data.player);
            return;
        }
        if (!data.player.hasTag("kiteditor")) {
            if (data.player.hasTag("duel") || data.player.hasTag("bridgeffa")) {
                if (data.player.location.y > 110 || data.player.location.y < 80) {
                    data.player.runCommand(`setblock ${blocklocx} ${blocklocy} ${blocklocz} air`)
                }
                system.runTimeout(() => {        
                    data.player.runCommand(`setblock ${blocklocx} ${blocklocy} ${blocklocz} air`)
                }, 70);
            }
            if (data.player.hasTag("bridgeffa") || data.player.hasTag("clutch")) {
                if (data.player.hasTag('bridgeffa')) {
                    const current = playerFFABlocks.get(data.player) || 0;
                    playerFFABlocks.set(data.player, current + 1);
                }
                if (!data.block.permutation.matches('bot:block')) {
                    data.player.runCommand(`setblock ${blocklocx} ${blocklocy} ${blocklocz} air`);
                }
                const clickInfo = { timestamp: Date.now() };
                const playerClicks = rightClicks.get(data.player) || [];
                playerClicks.push(clickInfo);
                rightClicks.set(data.player, playerClicks);
            }
            if (data.player.hasTag("speedbridge")) {
                if (!data.block.permutation.matches('bot:block')) {
                    data.player.runCommand(`setblock ${blocklocx} ${blocklocy} ${blocklocz} air`);
                }
                if (data.block.permutation.matches('bot:block')) {
                    const tags = [
                        'speedbridge1', 'speedbridge2', 'speedbridge3', 'speedbridge4', 'speedbridge5', 'speedbridge6'
                    ];
                    for (const tag of tags) {
                        if (data.player.hasTag(tag)) {
                            const clickInfo = { timestamp: Date.now() };
                            const playerClicks = rightClicks.get(data.player) || [];
                            playerClicks.push(clickInfo);
                            rightClicks.set(data.player, playerClicks);
                            if (!speedbridgeActive[tag]) {
                                speedbridgeStartTimes[tag] = Date.now();
                                speedbridgeActive[tag] = true;
                                data.player.playSound('random.click')
                                data.player.runCommand('clear @s red_dye')
                                data.player.runCommand('clear @s blue_dye')
                                data.player.runCommand('clear @s ink_sac')
                                data.player.removeTag('flying')
                                speedbridgeTimers[tag] = system.runInterval(() => {
                                    const elapsed = ((Date.now() - speedbridgeStartTimes[tag]) / 1000).toFixed(2);
                                    data.player.runCommand(`title @s actionbar §bTime: §f${elapsed}`);
                                }, 1);
                            }
                            break;
                        }
                    }
                } if (!data.block.permutation.matches('bot:block')) return;
            }
            if (data.player.hasTag("blockparkour")) {
                if (!data.block.permutation.matches('bot:block')) {
                    data.player.runCommand(`setblock ${blocklocx} ${blocklocy} ${blocklocz} air`);
                }
                // Check for block parkour course tags
                for (const tag in blockParkourActive) {
                    if (data.player.hasTag(tag) && !blockParkourActive[tag] && data.block.permutation.matches('bot:block')) {
                        blockParkourStartTimes[tag] = Date.now();
                        blockParkourActive[tag] = true;
                        data.player.playSound('random.click');
                        data.player.removeTag('flying');
                        data.player.runCommand("clear @s ink_sac");
                        data.player.runCommand("clear @s blue_dye");
                        data.player.runCommand("clear @s red_dye");
                        blockParkourTimers[tag] = system.runInterval(() => {
                            const elapsed = ((Date.now() - blockParkourStartTimes[tag]) / 1000).toFixed(2);
                            data.player.runCommand(`title @s actionbar §bTime: §f${elapsed}`);
                        }, 1);
                        break;
                    }
                }
                if (!data.block.permutation.matches('bot:block')) return;
            }
        }
    })

    world.afterEvents.entityHitEntity.subscribe(function ({ damagingEntity }) {
        if (!(damagingEntity instanceof Player)) return;
        const clickInfo = { timestamp: Date.now() };
        const playerClicks = clicks.get(damagingEntity) || [];
        playerClicks.push(clickInfo);
        clicks.set(damagingEntity, playerClicks);
        const something = world.afterEvents.entityHurt.subscribe(({ hurtEntity, damageSource }) => {
        //if (!damageSource.damagingEntity.typeId === "minecraft:player") return;
            if (damageSource.damagingEntity === undefined || hurtEntity === undefined) return;
            const attackloc = damageSource.damagingEntity.location
            const hurtloc = hurtEntity.location
            const direction = {
                x: hurtloc.x - attackloc.x,
                y: hurtloc.y - attackloc.y,
                z: hurtloc.z - attackloc.z
            };
            function distance(direction) {
                var direction = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2) + Math.pow(direction.z, 2));
                var num = Math.abs(Math.ceil((direction - 0.8) * 10) / 10);
                if (num <= 1) {
                    num = 1;
                } else if (num <= 1.5) {
                    num = 1.5;
                } else if (num <= 2) {
                    num = 2;
                } else if (num <= 2.5) {
                    num = 2.5;
                } else {
                    num = 3;
                }
                return num;
            };
            if (damageSource.damagingEntity.typeId !== "minecraft:player") return;
            const combo = world.scoreboard.getObjective("combocount");
            const combocounter = combo.getScore(damageSource.damagingEntity);
            const hasCps = damageSource.damagingEntity.hasTag("cps");
            const hasReach = damageSource.damagingEntity.hasTag("reach");
            const hasHit = damageSource.damagingEntity.hasTag("hit");
            let actionbarMsg = "";
            if (hasCps && !hasReach && !hasHit) {
                actionbarMsg = `§bCPS:§r ${getPlayerCPS(damageSource.damagingEntity)}`;
            } else if (!hasCps && hasReach && !hasHit) {
                actionbarMsg = `§bReach:§r ${distance(direction)}`;
            } else if (!hasCps && !hasReach && hasHit) {
                actionbarMsg = `§bCombo:§r ${combocounter}`;
            } else if (hasCps && hasReach && !hasHit) {
                actionbarMsg = `§bCPS:§r ${getPlayerCPS(damageSource.damagingEntity)} §8| §bReach:§r ${distance(direction)}`;
            } else if (!hasCps && hasReach && hasHit) {
                actionbarMsg = `§bCombo:§r ${combocounter} §8| §bReach:§r ${distance(direction)}`;
            } else if (hasCps && !hasReach && hasHit) {
                actionbarMsg = `§bCPS:§r ${getPlayerCPS(damageSource.damagingEntity)} §8| §bCombo:§r ${combocounter}`;
            } else if (hasCps && hasReach && hasHit) {
                actionbarMsg = `§bCPS:§r ${getPlayerCPS(damageSource.damagingEntity)} §8| §bCombo:§r ${combocounter} §8| §bReach:§r ${distance(direction)}`;
            }
            if (actionbarMsg) {
                damageSource.damagingEntity.runCommand(`title @s actionbar ${actionbarMsg}`);
            }
            world.afterEvents.entityHurt.unsubscribe(something);
        });
    });

    try {
            world.getDynamicProperty("speedbridgeBestTimes");
        } catch {
            world.setDynamicProperty("speedbridgeBestTimes", JSON.stringify(speedbridgeBestTimes));
        }
        // Load best times from storage
        const saved = world.getDynamicProperty("speedbridgeBestTimes");
        if (saved) {
            Object.assign(speedbridgeBestTimes, JSON.parse(saved));
        }

    try {
        world.getDynamicProperty("blockParkourBestTimes");
    } catch {
        world.setDynamicProperty("blockParkourBestTimes", JSON.stringify(blockParkourBestTimes));
    }
    const savedbp = world.getDynamicProperty("blockParkourBestTimes");
    if (savedbp) {
        Object.assign(blockParkourBestTimes, JSON.parse(savedbp));
    }

    const duelGamemodeMaxHits = {
        nodebuff: 120,
        boxing: 100,
        midfight: 17,
        builduhc: 50,
        gapple: 30,
        skywars: 25,
        treasurewars: 8,
        hallfight: 8,
        combo: 200
    };

    world.afterEvents.entityHurt.subscribe((data) => {
        const { hurtEntity, damageSource } = data;
        if (damageSource.damagingEntity === undefined || hurtEntity === undefined) return;
        if (hurtEntity.typeId === 'bot:pvp' && damageSource.damagingEntity.typeId === "minecraft:player") {
            // handle hit particle
            const hitParticleTags = [
                { tag: "hit_crits", particle: "minecraft:critical_hit_emitter" },
                { tag: "hit_angry", particle: "minecraft:villager_angry" },
                { tag: "hit_smoke", particle: "minecraft:egg_destroy_emitter" },
                { tag: "hit_ice", particle: "minecraft:ice_evaporation_emitter" },
                { tag: "hit_roar", particle: "minecraft:knockback_roar_particle" },
                { tag: "hit_blaze", particle: "minecraft:trial_spawner_detection" },
                { tag: "hit_blueblaze", particle: "minecraft:trial_spawner_detection_ominous" }
            ];
            for (const { tag, particle } of hitParticleTags) {
                if (damageSource.damagingEntity.hasTag(tag)) {
                    hurtEntity.dimension.spawnParticle(particle, hurtEntity.getHeadLocation());
                    break; // Only one effect per hit
                }
            }
        }
    });

    world.afterEvents.entityHurt.subscribe((data) => {
        const { hurtEntity, damageSource } = data;
        const cause = damageSource.cause;
        if (hurtEntity.typeId === 'bot:pvp') {
            if (cause === 'fireTick') {
                for (const source of world.getPlayers()) {
                    if (source.hasTag('duel')) {
                        const {minDist, botEntity, botName} = getClosestBotEntity(source);
                        const gamemode = getGamemodeTag(source);
                        source.runCommand('scoreboard players add @s totalhits 1');
                        if (!botEntity || !botName) return;
                        const scoreplayer = world.scoreboard.getObjective("totalhits").getScore(source);
                        if (scoreplayer % 8 === 0 && scoreplayer !== 48) {
                            boteatsgapple(source, botEntity);
                        }
                        if (scoreplayer >= duelGamemodeMaxHits[gamemode]) {
                            handlePlayerWin(source, botEntity, gamemode);
                        }
                    }
                }
            }
        }
    });

    world.afterEvents.entityHurt.subscribe((data) => {
        const { hurtEntity, damageSource, damage } = data;
        const EPSILON = 1e-10; // Small value to compare floating point numbers
        if (damageSource.damagingEntity === undefined || hurtEntity === undefined || hurtEntity.typeId === "bot:bottreasure" || hurtEntity.typeId === "bot:treasure") return;
        for (const source of world.getPlayers()) {
            if (source && source.hasTag('duel')) {
                let gamemode = null;
                for (const mode in duelGamemodeMaxHits) {
                    if (hurtEntity.hasTag(mode)) {
                        gamemode = mode;
                    }
                }
                if (gamemode !== "treasurewars") {
                    source.runCommand(`spawnpoint @s ${source.location.x} ${source.location.y} ${source.location.z}`);
                }
                const { minDist, botEntity, botName } = getClosestBotEntity(source);
                if (!botEntity || !botName) return;
                const random = Math.floor(Math.random() * 100);
                if (hurtEntity.typeId === "bot:pvp" && damageSource.damagingEntity.typeId === "minecraft:player") {
                    if (source.hasTag('zeqasumo') || source.hasTag('nethergames') || source.hasTag('combo')) {
                        const heldItem = source.getComponent("minecraft:inventory").container.getItem(source.selectedSlotIndex)
                        if (!heldItem || !swordAndPickaxeIds.includes(heldItem.typeId)) return; // Only count if holding sword or pickaxe
                        if (Math.abs(damage - 0.00000000001) < EPSILON) {
                            source.runCommand(`scoreboard players add @s totalhits 1`);
                        } 
                    } else {
                        if (damage > 0) {
                            source.runCommand(`scoreboard players add @s totalhits 1`);
                        }
                    }
                }
                if (damageSource.damagingEntity.typeId === "bot:pvp" && hurtEntity.typeId === "minecraft:player" && hurtEntity.hasTag("boxing")) {
                    if (source.hasTag('zeqasumo') || source.hasTag('nethergames')) {
                        if (Math.abs(damage - 0.00000000001) < EPSILON) {
                            damageSource.damagingEntity.runCommand(`scoreboard players add "${botName}" totalhits 1`);
                        }
                    } else {
                        damageSource.damagingEntity.runCommand(`scoreboard players add "${botName}" totalhits 1`);
                    }
                }
                if (!gamemode) return;
                // Get current score
                let scorebot = world.scoreboard.getObjective("totalhits").getScore(botName);
                let scoreplayer = world.scoreboard.getObjective("totalhits").getScore(source);
                //logic bot
                if (scoreplayer > 0) {
                    // Helper for "zeqasumo" and "nethergames" damage check
                    const isSpecialKB = source.hasTag('zeqasumo') || source.hasTag('nethergames');
                    const isPlayer = damageSource.damagingEntity.typeId === "minecraft:player";

                    // Helper for gapple eating logic
                    function shouldEatGapple(score, mod, max, isPlayer, isSpecialKB, damage) {
                        return score % mod === 0 && score !== max && isPlayer && (isSpecialKB ? Math.abs(damage - 0.00000000001) < EPSILON : damage > 0);
                    }

                    switch (gamemode) {
                        case "nodebuff":
                            if (shouldEatGapple(scoreplayer, 7, 119, isPlayer, isSpecialKB, damage)) {
                                potting(source, botEntity);
                            }
                            if (random <= 10 && !botEntity.hasTag('pearl')) botpearl(source, botEntity);
                            break;

                        case "midfight":
                            const obj = world.scoreboard.getObjective("duel_score");
                            if (!obj) return;
                            if (scoreplayer >= duelGamemodeMaxHits[gamemode]) {
                                source.runCommand('scoreboard players set @s totalhits 0');
                                source.runCommand(`scoreboard players add @s duel_score 1`);
                                increaseDuelScore(source, botEntity);
                            }
                            break;

                        case "builduhc":
                            if (isPlayer) {
                                if (random >= 70 && random <= 77) placeBlocksBetweenSourceAndBot(source, botEntity);
                                if (shouldEatGapple(scoreplayer, 8, 48, isPlayer, isSpecialKB, damage)) {
                                    boteatsgapple(source, botEntity);
                                }
                            }
                            if (random <= 5) setFireAtSource(source, botEntity);
                            if (random >= 32 && random <= 40) botrod(source, botEntity);
                            break;

                        case "gapple":
                            if (shouldEatGapple(scoreplayer, 7, 28, isPlayer, isSpecialKB, damage)) {
                                boteatsgapple(source, botEntity);
                            }
                            break;

                        case "skywars":
                            if (scoreplayer === 10 && isPlayer && (isSpecialKB ? Math.abs(damage - 0.00000000001) < EPSILON : damage > 0)) {
                                boteatsgapple(source, botEntity);
                            }
                            if (isPlayer && random >= 25 && random <= 30) placeBlocksBetweenSourceAndBot(source, botEntity);
                            if (random <= 3) { botEntity.addTag('pearl'); botpearl(source, botEntity); }
                            if (random >= 10 && random <= 16) keepBlockUnderBotEntity(source, botEntity);
                            break;

                        case "treasurewars":
                            const spawnpos = treasurewarsSpawns.get(source.name).bot;
                            if (scoreplayer >= duelGamemodeMaxHits[gamemode]) {
                                if (botEntity.hasTag('respawn')) {
                                    source.playSound('random.orb');
                                    botEntity.teleport(spawnpos);
                                    source.runCommand('scoreboard players set @s totalhits 0');
                                } else {
                                    handlePlayerWin(source, botEntity, gamemode);
                                }
                            }
                            if (isPlayer) {
                                if (random <= 5) keepBlockUnderBotEntity(source, botEntity);
                                if (random >= 26 && random <= 30) placeBlocksBetweenSourceAndBot(source, botEntity);
                            }
                            break;

                        case "hallfight":
                            if (isPlayer && random <= 10) placeBlocksBetweenSourceAndBot(source, botEntity);
                            break;

                        case "stickfight":
                            if (isPlayer && random <= 10) placeBlocksBetweenSourceAndBot(source, botEntity);
                            if (isPlayer && random >= 30 && random <= 40) keepBlockUnderBotEntity(source, botEntity);
                            break;

                        case "combo":
                            if (scoreplayer % 30 === 0 && scoreplayer !== 180 && isPlayer && Math.abs(damage - 0.00000000001) < EPSILON) {
                                boteatsgapple(source, botEntity);
                            }
                            break;
                    }

                    // Universal win checks (except midfight and treasurewars)
                    if (gamemode !== "midfight" && gamemode !== "treasurewars") {
                        if (gamemode === "boxing" && scorebot >= duelGamemodeMaxHits[gamemode]) {
                            source.runCommand('gamemode spectator @s');
                            handleBotWin(source, botEntity, botName, gamemode);
                        }
                        if (scoreplayer >= duelGamemodeMaxHits[gamemode]) {
                            handlePlayerWin(source, botEntity, gamemode);
                        }
                    }
                }
            }
        }
    });

    world.afterEvents.entityDie.subscribe((data) => {
        const { deadEntity } = data;
        if (deadEntity.typeId === "minecraft:player" || deadEntity.typeId === "bot:treasure" || deadEntity.typeId === "bot:bottreasure") {
            const {minDist, botEntity, botName} = getClosestBotEntity(deadEntity);
            if (deadEntity.typeId === "minecraft:player") {
                if (deadEntity.typeId === "minecraft:player") {
                    deadEntity.runCommand('gamemode spectator @s');
                    const game = getGamemodeTag(deadEntity);
                    if (game === 'midfight') {
                        deadEntity.runCommand('scoreboard players set @s totalhits 0');
                        deadEntity.runCommand(`scoreboard players add ${botName} duel_score 1`);
                        increaseDuelScore(deadEntity, botEntity);
                        system.runTimeout(() => {
                            const spawn = duelScoreSpawns.get(deadEntity.name).source;
                            deadEntity.runCommand('gamemode adventure @s');
                            deadEntity.teleport(spawn);
                        }, 60);
                    }
                    if (game === 'treasurewars') {
                        if (deadEntity.hasTag('respawn')) {
                            const mode = getGamemodeTag(deadEntity);
                            const spawnpos = treasurewarsSpawns.get(deadEntity.name).source;
                            if (spawnpos) {
                                system.runTimeout(() => {
                                    deadEntity.teleport(spawnpos);
                                    deadEntity.runCommand('gamemode adventure @s');
                                }, 5);
                                system.runTimeout(() => {
                                    deadEntity.playSound('random.orb');
                                    deadEntity.runCommand('clear @s');
                                    system.runTimeout(() => {
                                        loadKitForPlayer(deadEntity, mode);
                                    }, 1);
                                }, 6);
                            }
                        }
                        else {
                            deadEntity.runCommand('gamemode spectator @s')
                            handleBotWin(deadEntity, botEntity, botName, game);
                        }
                    }
                }
            }
            for (const source of world.getPlayers()) {
                if (!source.hasTag('duel')) return;
                if (deadEntity.typeId === "bot:bottreasure") {
                    source.sendMessage(`§3You have destroyed §b${botName}'s treasure!`);
                    source.spawnParticle("minecraft:huge_explosion_emitter", {x: deadEntity.location.x, y: deadEntity.location.y, z: deadEntity.location.z});
                    source.playSound('random.explode');
                    botEntity.removeTag('respawn');
                    system.runTimeout(() => {
                        deadEntity.remove();
                    }, 18);
                }
                if (deadEntity.typeId === "bot:treasure") {
                    source.sendMessage(`§3Your treasure §bhas been destroyed!`);
                    source.spawnParticle("minecraft:huge_explosion_emitter", {x: deadEntity.location.x, y: deadEntity.location.y, z: deadEntity.location.z});
                    source.playSound('random.explode');
                    source.removeTag('respawn');
                    source.runCommand('title @s title §cTreasure Destroyed!');
                    source.runCommand('title @s subtitle You can no longer respawn!');
                    source.playSound('mob.enderdragon.growl');
                    system.runTimeout(() => {
                        deadEntity.remove();
                    }, 18);
                }
            }
        }
        if (deadEntity.typeId === "bot:pvp") {
            system.runTimeout(() => {
                deadEntity.remove();
            }, 18);
        }
    });

const botNames = [
    "qZAlex", "Blazeyy", "Creepx", "DaisyPvP", "iEcho", "Frozt", "Gh0stz", "H3roXD", "ivyyz", "JadeCombo",
    "TryKnight", "Lunq", "MagmaTap", "NovaStrafe", "VoidOak", "xPixeL", "Quartzz", "RexClutch", "SkyF4ll", "TigerZz",
    "Ultr4", "Vexity", "Wolfyy", "XenoStomps", "YetiAim", "Zanezz", "BoltXD", "Ch4se", "DashL", "EmberPvP",
    "FlintQZ", "Galezz", "HawkCPS", "Indiqo", "J1nx", "Kqii", "LeafZtap", "MossStrafe", "Nashyy", "0rion",
    "P1per", "Qwill", "Runekit", "Sagery", "Thornx", "V1olet", "W1sp", "Xndr", "Yaraa", "ZephyrQz",
    "Tapzy", "Strqfe", "Ztapz", "ComboVibe", "Cr1tLuv", "Voidzy", "Ez0r", "SweatL0rd", "Refillah", "Clutchyy",
    "ZDropz", "xBl1nk", "iTryHard", "Dragzz", "Aimbow", "BlockTap", "HitRegz", "Soupy", "0MGCombo", "Jitzz",
    "Z0idPvP", "K1tap", "Wtapz", "Bridgerr", "Trapzyy", "Sn0wzz", "S4feFall", "Clickzy", "Delayzz", "Flickrr",
    "Redstoned", "Sharpyy", "Neth3rPvP", "zButterfly", "NoDebuffz", "IceCombo", "Cqllout", "Critix", "SkyTapp", "ZyxPvP",
    "Sweatyy", "xLagzz", "Kqtch", "StormDrop", "Axetapz", "Nolagg", "RefillMC", "qBooster", "LowHartz", "YTStrqfe",
    "VoidWarpz", "TapLord", "Evadez", "Flickah", "Combownz", "ZoomPvP", "zDroppy", "Rekitten", "iSn4pz", "TrySpammer",
    "Nod3lay", "Sw1ngs", "AxelPvP", "MeltCombo", "PingSpiker", "RageQz", "FireStrqfe", "Gl1tchyy", "Knockbackz", "WtapV2",
    "FpsDr0p", "zPotter", "x0verlay", "xPots", "Revzz", "DragClutch", "SweatMode", "TapSense", "IcePingz", "zMissed",
    "BotDueler", "StackTapz", "HitzBox", "RodZz", "DelayCraft", "Cr1tic", "PotChug", "LagSoup", "AimSpammer", "FlickTap",
    "Bl0ckz", "QueueSkip", "FakeCombo", "Cr4cktap", "TapShift", "ClickSpree", "0vercombo", "YawPvP", "H0tkeyz", "qAimz",
    "BunnyClutch", "VoidSoup", "HitMiss", "BowSnipe", "N0Speed", "Tappyz", "BridgeQz", "PearlTap", "VoidGlide", "zFpsLag",
    "SpeedWtap", "RageCrit", "FallingTap", "Slammyy", "Clickburst", "BoostPvP", "TabFake", "Stomperz", "xHideNSeek", "LagBacked",
    "TapBl1tz", "SweatyQt", "Sniperzz", "YTLocked", "ComboSn4p", "FpsOverz", "PreGap", "Laggerz", "Van1shTap", "AimPadd",
    "GhostHits", "EvadePvP", "LateRefill", "Dragxy", "SafeBridge", "DreamSniper", "SpammerBot", "AxeTapz", "SoupyGod", "TNTCrit",
    "RefillEz", "AltFinder", "0verHealed", "YTRefill", "MouseTap", "Gl1dezz", "xRunnerr", "ComboKey", "F1ntap", "iGhosted"
];
const gamemodes = ['nodebuff', 'boxing', 'sumo', 'midfight', 'builduhc', 'gapple', 'skywars', 'treasurewars', 'hallfight', 'stickfight', 'combo'];
const kbTypesDefault = ["hive", "cubecraft", "zeqasumo", "nethergames", "18java"];
const kbTypesCombo = ["combo"];

});

const clicks = new Map();
export function getPlayerCPS(player) {
    const currentTime = Date.now();
    const playerClicks = clicks.get(player) || [];
    const recentClicks = playerClicks.filter(({ timestamp }) => currentTime - 1000 < timestamp);
    clicks.set(player, recentClicks);
    return recentClicks.length;
};

let trailTickCounter = 0;
const lastTrailPosition = new Map();
const trailParticleTags = [
    { tag: "trail_dust", particle: "minecraft:dust_plume" },
    { tag: "trail_note", particle: "minecraft:note_particle" },
    { tag: "trail_spark", particle: "minecraft:basic_flame_particle" },
    { tag: "trail_infested", particle: "minecraft:infested_emitter" },
    { tag: "trail_cherry", particle: "minecraft:cherry_leaves_particle" },
    { tag: "trail_soul", particle: "minecraft:soul_particle" },
    { tag: "trail_heart", particle: "minecraft:heart_particle" },
    { tag: "trail_growth", particle: "minecraft:crop_growth_emitter" },
    { tag: "trail_totem", particle: "minecraft:totem_particle" },
    { tag: "trail_cursed", particle: "minecraft:mobspell_emitter" },
    { tag: "trail_flame", particle: "minecraft:mobflame_single" }
];

//everything for checking all time
system.runInterval(() => {
    trailTickCounter++;
    const players = world.getPlayers();
    for (const source of players) {
        const gameMode = source.getGameMode();
        const isSpectator = gameMode === 'Spectator';

        // Trails (every 5 ticks)
        if (trailTickCounter % 5 === 0 && trailTickCounter !== 0 && !isSpectator) {
            trailTickCounter = 0;
            const playerKey = source.name;
            const currPos = source.location;
            const lastPos = lastTrailPosition.get(playerKey);
            const moved = !lastPos || Math.abs(lastPos.x - currPos.x) > 0.01 || Math.abs(lastPos.y - currPos.y) > 0.01 || Math.abs(lastPos.z - currPos.z) > 0.01;
            if (moved) {
                for (const { tag, particle } of trailParticleTags) {
                    if (source.hasTag(tag)) {
                        const spawnPos = tag === "trail_cherry"
                            ? { x: currPos.x, y: currPos.y + 1, z: currPos.z }
                            : currPos;
                        source.spawnParticle(particle, spawnPos);
                        break;
                    }
                }
                lastTrailPosition.set(playerKey, { x: currPos.x, y: currPos.y, z: currPos.z });
            }
        }

        // Effects
        if (source.hasTag('res')) {
            source.addEffect("regeneration", 2, { amplifier: 255, showParticles: false });
            source.addEffect("resistance", 2, { amplifier: 255, showParticles: false });
        } else {
            source.removeEffect("resistance");
        }
        source.addEffect("saturation", 2, { amplifier: 255, showParticles: false });

        // Duel logic
        if (source.hasTag('duel')) {
            const mode = getGamemodeTag(source);
            const { botEntity, botName } = getClosestBotEntity(source);
            if (!botEntity || !botName) continue;

            if (isSpectator) {
                if (botEntity.hasTag('duel') && mode !== 'midfight' && mode !== 'treasurewars' && !source.hasTag('respawn')) {
                    handleBotWin(source, botEntity, botName, mode);
                }
                continue;
            }

            switch (mode) {
                case 'sumo':
                case 'stickfight':
                    if (source.location.y <= 96) {
                        source.runCommand(`scoreboard players add ${botName} duel_score 1`);
                        increaseDuelScore(source, botEntity);
                    }
                    if (botEntity.location.y <= 96) {
                        source.runCommand(`scoreboard players add @s duel_score 1`);
                        increaseDuelScore(source, botEntity);
                    }
                    break;
                case 'treasurewars':
                    if (treasurewarsSpawns.has(source.name)) {
                        if (source.location.y < 95) {
                            if (source.hasTag("respawn")) {
                                source.playSound('random.orb');
                                const spawn = treasurewarsSpawns.get(source.name).source;
                                source.teleport(spawn);
                                source.addEffect("instant_health", 2, { amplifier: 255, showParticles: false });
                                source.runCommand('clear @s');
                                system.runTimeout(() => {
                                    loadKitForPlayer(source, mode);
                                }, 1);
                            } else {
                                handleBotWin(source, botEntity, botName, mode);
                            }
                        }
                        if (botEntity.location.y < 95) {
                            if (botEntity.hasTag("respawn")) {
                                const spawn = treasurewarsSpawns.get(source.name).bot;
                                botEntity.teleport(spawn);
                                source.playSound('random.orb');
                                source.runCommand('scoreboard players set @s totalhits 0');
                            } else {
                                handlePlayerWin(source, botEntity, mode);
                            }
                        }
                    }
                    break;
                case 'skywars':
                    if (source.location.y < 70) handleBotWin(source, botEntity, botName, mode);
                    if (botEntity.location.y < 70) handlePlayerWin(source, botEntity, mode);
                    break;
            }
            continue;
        }

        // Non-duel logic
        if (source.isFlying && (source.hasTag('speedbridge') || source.hasTag('blockparkour'))) {
            source.addTag('flying');
        }
        if (source.hasTag('hub')) {
            source.addEffect("weakness", 2, { amplifier: 255, showParticles: false });
        }
        if (source.hasTag("bridgeffa")) {
            if (source.hasTag('rightcps')) {
                const totalblocks = playerFFABlocks.get(source) ?? 0;
                const rcps = getPlayerRightCPS(source);
                source.onScreenDisplay.setActionBar(`§bBlocks: §r${totalblocks} §8| §bRCPS:§r ${rcps}`);
            }
            if (source.location.y < 85) {
                source.playSound("random.click");
                source.runCommand('clear @s');
                source.runCommand('scoreboard players set @s totalffablocks 0');
                system.runTimeout(() => {
                    giveblock(source);
                    source.runCommand('give @s diamond_pickaxe 1 0 {"minecraft:can_destroy":{"blocks":["bot:block"]}}');
                    source.runCommand("replaceitem entity @s slot.hotbar 7 blue_dye");
                    source.runCommand("replaceitem entity @s slot.hotbar 8 red_dye");
                }, 1);
                handleBridgeFFARespawn(source);
            }
        }
        if (source.hasTag('speedbridge')) {
            if (source.location.y < 85) handleSpeedbridgeReset(source);
            for (const tag of ['speedbridge1', 'speedbridge2', 'speedbridge3', 'speedbridge4', 'speedbridge5', 'speedbridge6']) {
                if (source.hasTag(tag) && speedbridgeActive[tag]) {
                    const blockBelow = source.dimension.getBlock({
                        x: Math.floor(source.location.x),
                        y: Math.floor(source.location.y) - 1,
                        z: Math.floor(source.location.z)
                    });
                    const blockBelow2 = source.dimension.getBlock({
                        x: Math.floor(source.location.x),
                        y: Math.floor(source.location.y) - 2,
                        z: Math.floor(source.location.z)
                    });
                    if ((blockBelow && blockBelow.permutation.matches('minecraft:gold_block')) ||
                        (blockBelow2 && blockBelow2.permutation.matches('minecraft:gold_block'))) {
                        handleSpeedbridgeFinish(source, tag);
                    }
                }
            }
        }
        if (source.hasTag('blockparkour')) {
            for (const tag in blockParkourActive) {
                // Timer Start
                if (source.hasTag(tag) && !blockParkourActive[tag]) {
                    let foundCoal = false;
                    for (let i = 1; i <= 5; i++) {
                        const blockBelow = source.dimension.getBlock({
                            x: Math.floor(source.location.x),
                            y: Math.floor(source.location.y) - i,
                            z: Math.floor(source.location.z)
                        });
                        if (blockBelow && blockBelow.permutation.matches('minecraft:coal_block')) {
                            foundCoal = true;
                            break;
                        }
                    }
                    if (foundCoal) {
                        blockParkourStartTimes[tag] = Date.now();
                        blockParkourActive[tag] = true;
                        source.playSound('random.click');
                        source.removeTag('flying');
                        source.runCommand("clear @s ink_sac");
                        source.runCommand("clear @s blue_dye");
                        source.runCommand("clear @s red_dye");
                        blockParkourTimers[tag] = system.runInterval(() => {
                            const elapsed = ((Date.now() - blockParkourStartTimes[tag]) / 1000).toFixed(2);
                            source.runCommand(`title @s actionbar §bTime: §f${elapsed}`);
                        }, 1);
                    }
                }
                // Timer Finish
                if (source.hasTag(tag) && blockParkourActive[tag]) {
                    for (let i = 1; i <= 2; i++) {
                        const blockBelow = source.dimension.getBlock({
                            x: Math.floor(source.location.x),
                            y: Math.floor(source.location.y) - i,
                            z: Math.floor(source.location.z)
                        });
                        if (blockBelow && blockBelow.permutation.matches('minecraft:gold_block')) {
                            handleBlockParkourFinish(source, tag);
                            break;
                        }
                    }
                }
                // Respawn Logic
                if (source.hasTag(tag) && source.location.y < 85) {
                    handleBlockParkourRespawn(source);
                }
            }
        }
        if (source.location.y < 0) {
            handleRespawnTeleport(source);
        }
    }
}, 1);

//all functions and stuff
function reset(source) {
    playerFFABlocks.delete(source);
    treasurewarsSpawns.delete(source.name);
    rightClicks.delete(source);
    clicks.delete(source);
    lastTrailPosition.delete(source.name);
    fireloc.delete(source.name);
    duelScoreSpawns.delete(source.name);
    const tags = [
            'speedbridge1', 'speedbridge2', 'speedbridge3',
            'speedbridge4', 'speedbridge5', 'speedbridge6'
        ];
    for (const tag of tags) {
        if (source.hasTag(tag) && speedbridgeActive[tag]) {
            if (speedbridgeTimers[tag]) {
                system.clearRun(speedbridgeTimers[tag]);
                speedbridgeTimers[tag] = null;
            }
            speedbridgeActive[tag] = false;
            speedbridgeStartTimes[tag] = null;
        }
    }
    const blockParkourTags = [
        'course1', 'course2', 'course3', 'course4', 'course5',
        'course6', 'course7', 'course8', 'course9', 'course10'
    ];
    for (const tag of blockParkourTags) {
        if (source.hasTag(tag) && blockParkourActive[tag]) {
            if (blockParkourTimers[tag]) {
                system.clearRun(blockParkourTimers[tag]);
                blockParkourTimers[tag] = null;
            }
            blockParkourActive[tag] = false;
            blockParkourStartTimes[tag] = null;
        }
    }
    if (world.getPlayers().length < 2) {
        source.runCommand('scoreboard objectives remove duel_score');
        source.runCommand('scoreboard objectives remove totalhits');
        source.runCommand('tickingarea remove duel');
    }
    world.setDifficulty('Easy');
    playerFFABlocks.set(source, 0);
    source.runCommand('xp -20L @s');
    source.removeTag('cooldown');
    source.runCommand(`spawnpoint @s 0 200 0`);
    const effects = source.getEffects();
    for (const effect of effects) {
        if (effect.typeId !== "minecraft:night_vision") {
            source.removeEffect(effect.typeId);
        }
    }
    source.removeTag('blockparkour');
    source.removeTag('course1');
    source.removeTag('course2');
    source.removeTag('course3');
    source.removeTag('course4');
    source.removeTag('course5');
    source.removeTag('course6');
    source.removeTag('course7');
    source.removeTag('course8');
    source.removeTag('course9');
    source.removeTag('course10');
    source.removeTag('respawn');
    source.removeTag('op');
    source.removeTag('flying');
    source.removeTag('duel');
    source.removeTag('kiteditor');
    source.removeTag('nodebuff');
    source.removeTag('boxing');
    source.removeTag('sumo');
    source.removeTag('midfight');
    source.removeTag('builduhc');
    source.removeTag('gapple');
    source.removeTag('skywars');
    source.removeTag('treasurewars');
    source.removeTag('hallfight');
    source.removeTag('stickfight');
    source.removeTag('combo');
    source.removeTag('hits_1');
    source.removeTag('hits_2');
    source.removeTag('hits_3');
    source.removeTag('hits_4');
    source.removeTag('hits_5');
    source.removeTag('hits_6');
    source.removeTag('hits_7');
    source.removeTag('hits_8');
    source.removeTag('hits_9');
    source.removeTag('hits_10');
    source.removeTag('defaultkb');
    source.removeTag('farkb');
    source.removeTag('maxkb');
    source.removeTag('ffa');
    source.removeTag('clutch');
    source.removeTag('speedbridge');
    source.removeTag('speedbridge1');
    source.removeTag('speedbridge2');
    source.removeTag('speedbridge3');
    source.removeTag('speedbridge4');
    source.removeTag('speedbridge5');
    source.removeTag('speedbridge6');    
    source.removeTag("bridgeffa");
    source.removeTag('bridge0');
    source.removeTag('bridge1');
    source.removeTag('bridge2');
    source.removeTag('bridge3');
    source.removeTag('bridge4');
    source.removeTag('bridge5');
    source.playSound('random.click');
    source.removeTag('res');
    source.removeTag("hive");
    source.removeTag("cubecraft");
    source.removeTag("zeqasumo");
    source.removeTag("nethergames");
    source.removeTag("combo");
    source.removeTag("18java");
    source.runCommand("clear @s");
    source.addTag('hub');
    system.runTimeout(() => {
        source.runCommand('scoreboard players set @s bothits 0');
        source.runCommand('scoreboard players set @s combocount 0');
        source.runCommand('scoreboard players set @s totalffablocks 0');
        source.runCommand('scoreboard players set @s rightcps 0');
        source.addEffect('instant_health', 2, { amplifier: 255, showParticles: false });
    }, 40);
    source.addEffect('instant_health', 2, { amplifier: 255, showParticles: false });
    source.addEffect('resistance', 5, { amplifier: 255, showParticles: false });    
}

const maps = {
    "modes": {
        "normal": {
            "Temple": {
                "center": { x: -500, y: 100, z: 500 },
                "spawn1": { x: -500, y: 100, z: 537 },
                "spawn2": { x: -500, y: 102, z: 463 }
            },
            "Village": {
                "center": { x: -500, y: 100, z: 1500 },
                "spawn1": { x: -500, y: 100, z: 1537 },
                "spawn2": { x: -500, y: 100, z: 1463 }
            },
            "Bridges": {
                "center": { x: -500, y: 100, z: 2500 },
                "spawn1": { x: -500, y: 100, z: 2537 },
                "spawn2": { x: -500, y: 100, z: 2463 }
            },
            "Infinity": {
                "center": { x: -500, y: 100, z: 3500 },
                "spawn1": { x: -500, y: 100, z: 3537 },
                "spawn2": { x: -500, y: 100, z: 3463 }
            },
            "Wood": {
                "center": { x: -500, y: 100, z: 4500 },
                "spawn1": { x: -500, y: 100, z: 4537 },
                "spawn2": { x: -500, y: 100, z: 4463 }
            },
            "Hell": {
                "center": { x: -1500, y: 100, z: 500 },
                "spawn1": { x: -1500, y: 100, z: 537 },
                "spawn2": { x: -1500, y: 100, z: 463 }
            },
            "Sunflower": {
                "center": { x: -1500, y: 100, z: 1500 },
                "spawn1": { x: -1500, y: 100, z: 1537 },
                "spawn2": { x: -1500, y: 100, z: 1463 }
            },
            "Wasteland": {
                "center": { x: -1500, y: 100, z: 2500 },
                "spawn1": { x: -1500, y: 100, z: 2537 },
                "spawn2": { x: -1500, y: 100, z: 2463 }
            },
            "Swamp": {
                "center": { x: -1500, y: 100, z: 3500 },
                "spawn1": { x: -1500, y: 100, z: 3537 },
                "spawn2": { x: -1500, y: 100, z: 3463 }
            },
            "Ocean": {
                "center": { x: -1500, y: 100, z: 4500 },
                "spawn1": { x: -1500, y: 100, z: 4537 },
                "spawn2": { x: -1500, y: 100, z: 4463 }
            },
            "Mushroom": {
                "center": { x: -2500, y: 100, z: 500 },
                "spawn1": { x: -2500, y: 100, z: 537 },
                "spawn2": { x: -2500, y: 100, z: 463 }
            },
            "Village": {
                "center": { x: -2500, y: 100, z: 1500 },
                "spawn1": { x: -2500, y: 100, z: 1537 },
                "spawn2": { x: -2500, y: 100, z: 1463 }
            },
            "Mystic": {
                "center": { x: -2500, y: 100, z: 2500 },
                "spawn1": { x: -2500, y: 100, z: 2537 },
                "spawn2": { x: -2500, y: 100, z: 2463 }
            },
            "Rural": {
                "center": { x: -2500, y: 100, z: 3500 },
                "spawn1": { x: -2500, y: 100, z: 3537 },
                "spawn2": { x: -2500, y: 100, z: 3463 }
            },
            "Frozen": {
                "center": { x: -2500, y: 100, z: 4500 },
                "spawn1": { x: -2500, y: 100, z: 4537 },
                "spawn2": { x: -2500, y: 100, z: 4463 }
            },
            "Champion": {
                "center": { x: -3500, y: 100, z: 500 },
                "spawn1": { x: -3500, y: 100, z: 537 },
                "spawn2": { x: -3500, y: 100, z: 463 }
            },
            "Waterfall": {
                "center": { x: -3500, y: 100, z: 1500 },
                "spawn1": { x: -3500, y: 100, z: 1537 },
                "spawn2": { x: -3500, y: 100, z: 1463 }
            },
            "Plains": {
                "center": { x: -3500, y: 100, z: 2500 },
                "spawn1": { x: -3500, y: 100, z: 2537 },
                "spawn2": { x: -3500, y: 100, z: 2463 }
            },
            "Lonely": {
                "center": { x: -3500, y: 100, z: 3500 },
                "spawn1": { x: -3500, y: 100, z: 3537 },
                "spawn2": { x: -3500, y: 100, z: 3463 }
            },
            "L1ech": {
                "center": { x: -3500, y: 100, z: 4500 },
                "spawn1": { x: -3500, y: 100, z: 4537 },
                "spawn2": { x: -3500, y: 100, z: 4463 }
            }
        },
        "sumo": {
            "Egypt": {
                "center": { x: 3000, y: 100, z: -3000 },
                "spawn1": { x: 2995, y: 100, z: -3000 },
                "spawn2": { x: 3005, y: 100, z: -3000 }
            },
            "Cliffside": {
                "center": { x: 3000, y: 100, z: -2000 },
                "spawn1": { x: 2995, y: 100, z: -2000 },
                "spawn2": { x: 3005, y: 100, z: -2000 }
            },
            "Mountain": {
                "center": { x: 3000, y: 100, z: -1000 },
                "spawn1": { x: 2995, y: 100, z: -1000 },
                "spawn2": { x: 3005, y: 100, z: -1000 }
            },
            "Redridge": {
                "center": { x: 2000, y: 100, z: -3000 },
                "spawn1": { x: 2000, y: 100, z: -2996 },
                "spawn2": { x: 2000, y: 100, z: -3004 }
            },
            "Sunveil": {
                "center": { x: 2000, y: 100, z: -2000 },
                "spawn1": { x: 2000, y: 100, z: -1996 },
                "spawn2": { x: 2000, y: 100, z: -2004 }
            },
            "Duskhaven": {
                "center": { x: 2000, y: 100, z: -1000 },
                "spawn1": { x: 2000, y: 100, z: -996 },
                "spawn2": { x: 2000, y: 100, z: -1004 }
            },
            "Blossomia": {
                "center": { x: 1000, y: 100, z: -3000 },
                "spawn1": { x: 1000, y: 100, z: -2996 },
                "spawn2": { x: 1000, y: 100, z: -3004 }
            },
            "Ashrend": {
                "center": { x: 1000, y: 100, z: -2000 },
                "spawn1": { x: 996, y: 100, z: -2000 },
                "spawn2": { x: 1004, y: 100, z: -2000 }
            },
            "Ironspire": {
                "center": { x: 1000, y: 100, z: -1000 },
                "spawn1": { x: 1000, y: 100, z: -996 },
                "spawn2": { x: 1000, y: 100, z: -1004 }
            }
        },
        "stickfight": {
            "Heaven": {
                "center": { x: 4000, y: 100, z: -4000 },
                "spawn1": { x: 3986, y: 100, z: -4000 },
                "spawn2": { x: 4014, y: 100, z: -4000 }
            },
            "Skydredge": {
                "center": { x: 4000, y: 100, z: -2500 },
                "spawn1": { x: 3990, y: 100, z: -2500 },
                "spawn2": { x: 4010, y: 100, z: -2500 }
            },
            "Urban": {
                "center": { x: 4000, y: 100, z: -1000 },
                "spawn1": { x: 3990, y: 100, z: -1000 },
                "spawn2": { x: 4010, y: 100, z: -1000 }
            }
        },
        "treasurewars": {
            "Space": {
                "center": { x: -1000, y: 100, z: -6000 },
                "spawn1": { x: -1019, y: 100, z: -6000 },
                "spawn2": { x: -982, y: 100, z: -6000 },
                "treasure1": { x: -1024, y: 100, z: -6000 },
                "treasure2": { x: -977, y: 100, z: -6000 }
            },
            "Villa": {
                "center": { x: -2000, y: 100, z: -6000 },
                "spawn1": { x: -2000, y: 100, z: -6018 },
                "spawn2": { x: -2000, y: 100, z: -5981 },
                "treasure1": { x: -2004, y: 100, z: -6024 },
                "treasure2": { x: -1996, y: 100, z: -5975 }
            },
            "Kingdom": {
                "center": { x: -2000, y: 100, z: -5000 },
                "spawn1": { x: -2017, y: 99, z: -5000 },
                "spawn2": { x: -1982, y: 99, z: -5000 },
                "treasure1": { x: -2023, y: 99, z: -5000 },
                "treasure2": { x: -1976, y: 99, z: -5000 }
            },
            "Mansion": {
                "center": { x: -2000, y: 100, z: -4000 },
                "spawn1": { x: -2000, y: 100, z: -3983 },
                "spawn2": { x: -2000, y: 100, z: -4017 },
                "treasure1": { x: -2000, y: 100, z: -3977 },
                "treasure2": { x: -2000, y: 100, z: -4023 }
            },
            "Penguin": {
                "center": { x: -2000, y: 100, z: -3000 },
                "spawn1": { x: -2020, y: 100, z: -3000 },
                "spawn2": { x: -1982, y: 100, z: -3000 },
                "treasure1": { x: -2025, y: 100, z: -3006 },
                "treasure2": { x: -1977, y: 100, z: -3006 }
            }
        },
        "skywars": {
            "Spiral": {
                "center": { x: -1000, y: 100, z: -5000 },
                "spawn1": { x: -998, y: 103, z: -5033 },
                "spawn2": { x: -1002, y: 103, z: -4967 }
            },
            "Asia": {
                "center": { x: -1000, y: 100, z: -4000 },
                "spawn1": { x: -999, y: 101, z: -4058 },
                "spawn2": { x: -1001, y: 101, z: -3942 }
            },
            "Complex": {
                "center": { x: -1000, y: 100, z: -3000 },
                "spawn1": { x: -1025, y: 101, z: -3031 },
                "spawn2": { x: -975, y: 101, z: -2969 }
            },
            "Mine": {
                "center": { x: -1000, y: 100, z: -2000 },
                "spawn1": { x: -978, y: 96, z: -2030 },
                "spawn2": { x: -1022, y: 96, z: -1970 }
            },
            "Aquatic": {
                "center": { x: -1000, y: 100, z: -1000 },
                "spawn1": { x: -962, y: 97, z: -1000 },
                "spawn2": { x: -1038, y: 97, z: -1000 }
            },
            "Mid": {
                "center": { x: -2000, y: 100, z: -1000 },
                "spawn1": { x: -1986, y: 108, z: -1024 },
                "spawn2": { x: -2014, y: 108, z: -976 }
            },
            "Toxin": {
                "center": { x: -2000, y: 100, z: -2000 },
                "spawn1": { x: -1975, y: 100, z: -1989 },
                "spawn2": { x: -2027, y: 100, z: -2011 }
            },
            "Spring": {
                "center": { x: -3000, y: 100, z: -2000 },
                "spawn1": { x: -3033, y: 104, z: -2033 },
                "spawn2": { x: -2967, y: 104, z: -1967 }
            },
            "Fame": {
                "center": { x: -4000, y: 100, z: -2000 },
                "spawn1": { x: -3988, y: 103, z: -2036 },
                "spawn2": { x: -4012, y: 103, z: -1964 }
            },
            "Flower": {
                "center": { x: -5000, y: 100, z: -2000 },
                "spawn1": { x: -5032, y: 103, z: -2032 },
                "spawn2": { x: -4968, y: 103, z: -1968 }
            }
        },
        "hallfight": {
            "China": {
                "center": { x: -3000, y: 100, z: -1000 },
                "spawn1": { x: -3012, y: 100, z: -1000 },
                "spawn2": { x: -2988, y: 100, z: -1000 }
            },
            "Medieval": {
                "center": { x: -4000, y: 100, z: -1000 },
                "spawn1": { x: -4012, y: 100, z: -1000 },
                "spawn2": { x: -3988, y: 100, z: -1000 }
            },
            "Nether": {
                "center": { x: -5000, y: 100, z: -1000 },
                "spawn1": { x: -5012, y: 100, z: -1000 },
                "spawn2": { x: -4988, y: 100, z: -1000 }
            },
            "Aquamarine": {
                "center": { x: -5000, y: 100, z: 0 },
                "spawn1": { x: -5012, y: 100, z: 0 },
                "spawn2": { x: -4988, y: 100, z: 0 }
            },
            "Future": {
                "center": { x: -5000, y: 100, z: 1000 },
                "spawn1": { x: -5012, y: 100, z: 1000 },
                "spawn2": { x: -4988, y: 100, z: 1000 }
            }
        }
    }
}

const playerFFABlocks = new Map();

const treasurewarsSpawns = new Map();

const rightClicks = new Map();

function getPlayerRightCPS(player) {
    const currentTime = Date.now();
    const playerClicks = rightClicks.get(player) || [];
    const recentClicks = playerClicks.filter(({ timestamp }) => currentTime - 1000 < timestamp);
    rightClicks.set(player, recentClicks);
    return recentClicks.length;
}

function resetSpeedbridgeBestTimes(source) {
    source.sendMessage('§3Reset time!')
    source.playSound('random.click');
    for (const key in speedbridgeBestTimes) {
        speedbridgeBestTimes[key] = null;
    }
    saveSpeedbridgeBestTimes();
}

function resetBlockParkourBestTimes(source) {
    source.sendMessage('§3Reset time!');
    source.playSound('random.click');
    for (const key in blockParkourBestTimes) {
        blockParkourBestTimes[key] = null;
    }
    saveBlockParkourBestTimes();
}

function saveSpeedbridgeBestTimes() {
    world.setDynamicProperty("speedbridgeBestTimes", JSON.stringify(speedbridgeBestTimes));
}

function delblock6x(source, posx, posy, posz) {
    // Each entry: [dx, dz, xLength, zLength]
    const areas = [
        [0, 0, 32, 32], [32, 0, 32, 32], [64, 0, 32, 32], [0, 32, 32, 32], [32, 32, 32, 32], [64, 32, 32, 32], [0, 64, 32, 32], [32, 64, 32, 32], [64, 64, 32, 32],
        [-32, 0, 32, 32], [-64, 0, 32, 32], [-96, 0, 32, 32], [0, -32, 32, 32], [-32, -32, 32, 32], [-64, -32, 32, 32], [0, -64, 32, 32], [-32, -64, 32, 32], [-64, -64, 32, 32],
        [32, -32, 32, 32], [64, -32, 32, 32], [96, -32, 32, 32], [32, -64, 32, 32], [64, -64, 32, 32], [96, -64, 32, 32],
        [-32, 32, 32, 32], [-64, 32, 32, 32], [-96, 32, 32, 32], [-32, 64, 32, 32], [-64, 64, 32, 32], [-96, 64, 32, 32]
    ];
    for (const [dx, dz, xLen, zLen] of areas) {
        // Below
        source.runCommand(`fill ${posx + dx} ${posy} ${posz + dz} ${posx + dx + xLen} ${posy - 25} ${posz + dz + zLen} air replace bot:block`);
        // Above
        source.runCommand(`fill ${posx + dx} ${posy} ${posz + dz} ${posx + dx + xLen} ${posy + 25} ${posz + dz + zLen} air replace bot:block`);
    }
}

function delblock6xfire(source, posx, posy, posz) {
    // Each entry: [dx, dz, xLength, zLength]
    const areas = [
        [0, 0, 32, 32], [32, 0, 32, 32], [64, 0, 32, 32], [0, 32, 32, 32], [32, 32, 32, 32], [64, 32, 32, 32], [0, 64, 32, 32], [32, 64, 32, 32], [64, 64, 32, 32],
        [-32, 0, 32, 32], [-64, 0, 32, 32], [-96, 0, 32, 32], [0, -32, 32, 32], [-32, -32, 32, 32], [-64, -32, 32, 32], [0, -64, 32, 32], [-32, -64, 32, 32], [-64, -64, 32, 32],
        [32, -32, 32, 32], [64, -32, 32, 32], [96, -32, 32, 32], [32, -64, 32, 32], [64, -64, 32, 32], [96, -64, 32, 32],
        [-32, 32, 32, 32], [-64, 32, 32, 32], [-96, 32, 32, 32], [-32, 64, 32, 32], [-64, 64, 32, 32], [-96, 64, 32, 32]
    ];
    for (const [dx, dz, xLen, zLen] of areas) {
        // Below
        source.runCommand(`fill ${posx + dx} ${posy} ${posz + dz} ${posx + dx + xLen} ${posy - 25} ${posz + dz + zLen} air replace fire`);
        // Above
        source.runCommand(`fill ${posx + dx} ${posy} ${posz + dz} ${posx + dx + xLen} ${posy + 25} ${posz + dz + zLen} air replace fire`);
    }
}

function startCountdown(source, seconds = 6) {
    let count = seconds;
    source.runCommand('clear @s')
    const interval = system.runInterval(() => {
        source.runCommand('give @s red_sandstone 1')
        source.playSound('random.click')
        source.runCommand(`title @s actionbar §bCountdown: §f${count - 1}`);
        count--;
        if (count === 0) {
            source.runCommand('clear @s red_sandstone')
            giveblock(source)
            world.setDifficulty('Easy')
            source.playSound('firework.blast')
            source.runCommand(`title @s actionbar §aClutch!`);
            system.clearRun(interval);
        }
    }, 20); // 20 ticks = 1 second
}

const speedbridgeTags = [
    { tag: 'speedbridge1', posx: 999, posy: 85, posz: 2000, facing: { x: 1000.5, y: 100, z: 2000.5 } },
    { tag: 'speedbridge2', posx: 999, posy: 85, posz: 2500, facing: { x: 1000.5, y: 100, z: 2500.5 } },
    { tag: 'speedbridge3', posx: 999, posy: 85, posz: 3000, facing: { x: 1000.5, y: 100, z: 3000.5 } },
    { tag: 'speedbridge4', posx: 1999, posy: 85, posz: 1999, facing: { x: 2001.5, y: 100, z: 2001.5 } },
    { tag: 'speedbridge5', posx: 1999, posy: 85, posz: 3501, facing: { x: 2001.5, y: 100, z: 3499.5 } },
    { tag: 'speedbridge6', posx: 999, posy: 85, posz: 3500, facing: { x: 1000.5, y: 100, z: 3500.5 } }
];

const speedbridgeNames = {
    speedbridge1: "Short",
    speedbridge2: "Normal",
    speedbridge3: "Long",
    speedbridge4: "Short Diagonal",
    speedbridge5: "Long Diagonal",
    speedbridge6: "Stack Up"
};

let posx = 0
let posy = 0
let posz = 0

let speedbridgeTimers = {
    speedbridge1: null, speedbridge2: null, speedbridge3: null,
    speedbridge4: null, speedbridge5: null, speedbridge6: null
};
let speedbridgeStartTimes = {
    speedbridge1: null, speedbridge2: null, speedbridge3: null,
    speedbridge4: null, speedbridge5: null, speedbridge6: null
};
let speedbridgeActive = {
    speedbridge1: false, speedbridge2: false, speedbridge3: false,
    speedbridge4: false, speedbridge5: false, speedbridge6: false
};
let speedbridgeBestTimes = {
    speedbridge1: null, speedbridge2: null, speedbridge3: null,
    speedbridge4: null, speedbridge5: null, speedbridge6: null
};

let blockParkourTimers = {
    course1: null, course2: null, course3: null, course4: null, course5: null,
    course6: null, course7: null, course8: null, course9: null, course10: null
};
let blockParkourStartTimes = {
    course1: null, course2: null, course3: null, course4: null, course5: null,
    course6: null, course7: null, course8: null, course9: null, course10: null
};
let blockParkourActive = {
    course1: false, course2: false, course3: false, course4: false, course5: false,
    course6: false, course7: false, course8: false, course9: false, course10: false
};
let blockParkourBestTimes = {
    course1: null, course2: null, course3: null, course4: null, course5: null,
    course6: null, course7: null, course8: null, course9: null, course10: null
};

// Save best times
function saveBlockParkourBestTimes() {
    world.setDynamicProperty("blockParkourBestTimes", JSON.stringify(blockParkourBestTimes));
}

const blockedBlocks = [
  'minecraft:chest', 'minecraft:ender_chest', 'minecraft:barrel', 'minecraft:crafting_table', "minecraft:jukebox",
  'minecraft:trapped_chest', 'minecraft:furnace', 'minecraft:hopper', 'minecraft:brewing_stand', "minecraft:smithing_table",
  'minecraft:blast_furnace', 'minecraft:smoker', 'minecraft:grindstone', 'minecraft:trapdoor',
  'minecraft:spruce_trapdoor', 'minecraft:birch_trapdoor', 'minecraft:jungle_trapdoor', 'minecraft:acacia_trapdoor',
  'minecraft:dark_oak_trapdoor', 'minecraft:fence_gate', 'minecraft:spruce_fence_gate', 'minecraft:birch_fence_gate',
  'minecraft:jungle_fence_gate', 'minecraft:acacia_fence_gate', 'minecraft:dark_oak_fence_gate', 'minecraft:wooden_door',
  'minecraft:spruce_door', 'minecraft:birch_door', 'minecraft:jungle_door', 'minecraft:acacia_door',
  'minecraft:dark_oak_door', 'minecraft:daylight_detector', 'minecraft:daylight_detector_inverted', 'minecraft:anvil'
];

// BridgeFFA config
const bridgeFFAMaps = [
    {
        tag: 'bridge0',
        name: 'Void',
        pos: { x: 3500, y: 100, z: 2500 },
        tp: { x: 3500.5, y: 100, z: 2500.5 },
        facing: { x: 3500.5, y: 100, z: 2500.5 }
    },
    {
        tag: 'bridge1',
        name: 'House',
        pos: { x: 3000, y: 100, z: -5979 },
        tp: { x: 3000.5, y: 100, z: -5999.5 },
        facing: { x: 3000.5, y: 100, z: -5998.5 }
    },
    {
        tag: 'bridge2',
        name: 'City',
        pos: { x: 2981, y: 100, z: -4477 },
        tp: { x: 3000.5, y: 100, z: -4499.5 },
        facing: { x: 2998.5, y: 100, z: -4496.5 }
    },
    {
        tag: 'bridge3',
        name: 'Graveyard',
        pos: { x: 1976, y: 100, z: -5979 },
        tp: { x: 2000.5, y: 100, z: -5999.5 },
        facing: { x: 1997.5, y: 100, z: -5997.5 }
    },
    {
        tag: 'bridge4',
        name: 'Castle',
        pos: { x: 2000, y: 100, z: -4479 },
        tp: { x: 2000.5, y: 100, z: -4499.5 },
        facing: { x: 2000.5, y: 100, z: -4498.5 }
    },
    {
        tag: 'bridge5',
        name: 'Construction',
        pos: { x: 4000, y: 100, z: -5979 },
        tp: { x: 4000.5, y: 100, z: -5999.5 },
        facing: { x: 4000.5, y: 100, z: -5998.5 }
    }
];

// Speedbridge config
const speedbridgeConfigs = [
    {
        tag: 'speedbridge1',
        pos: { x: 999, y: 85, z: 2000 },
        tp: { x: 999.5, y: 100, z: 2000.5 },
        facing: { x: 1000.5, y: 100, z: 2000.5 }
    },
    {
        tag: 'speedbridge2',
        pos: { x: 999, y: 85, z: 2500 },
        tp: { x: 999.5, y: 100, z: 2500.5 },
        facing: { x: 1000.5, y: 100, z: 2500.5 }
    },
    {
        tag: 'speedbridge3',
        pos: { x: 999, y: 85, z: 3000 },
        tp: { x: 999.5, y: 100, z: 3000.5 },
        facing: { x: 1000.5, y: 100, z: 3000.5 }
    },
    {
        tag: 'speedbridge4',
        pos: { x: 1999, y: 85, z: 1999 },
        tp: { x: 1999.5, y: 100, z: 1999.5 },
        facing: { x: 2001.5, y: 100, z: 2001.5 }
    },
    {
        tag: 'speedbridge5',
        pos: { x: 1999, y: 85, z: 3501 },
        tp: { x: 1999.5, y: 100, z: 3501.5 },
        facing: { x: 2000.5, y: 100, z: 3500.5 }
    },
    {
        tag: 'speedbridge6',
        pos: { x: 999, y: 85, z: 3500 },
        tp: { x: 999.5, y: 100, z: 3500.5 },
        facing: { x: 1000.5, y: 100, z: 3500.5 }
    }
];

// Helper function for BridgeFFA
function teleportToBridgeFFA(source, mapIndex) {
    const map = bridgeFFAMaps[mapIndex];
    if (!map) return;
    source.runCommand('inputpermission set @s movement disabled');
    source.addTag(map.tag);
    source.runCommand('clear @s');
    system.runTimeout(() => {
        world.sendMessage(`§b${source.name} §3is joining BridgeFFA Map §b${map.name}!`);
        delblock6x(source, map.pos.x, map.pos.y, map.pos.z);
    }, 20);
    system.runTimeout(() => {
        delblock6x(source, map.pos.x, map.pos.y, map.pos.z);
        source.runCommand('inputpermission set @s movement enabled');
        source.addTag('bridgeffa');
        source.playSound('random.click');
        giveblock(source);
        source.runCommand('give @s diamond_pickaxe 1 0 {"minecraft:can_destroy":{"blocks":["bot:block"]}}');
        source.runCommand("replaceitem entity @s slot.hotbar 7 blue_dye");
        source.runCommand("replaceitem entity @s slot.hotbar 8 red_dye");
    }, 40);
    source.teleport(map.tp, { facingLocation: map.facing });
    source.runCommand('scoreboard players set @s totalffablocks 0');
}

// Helper function for Speedbridge
function teleportToSpeedbridge(source, configIndex) {
    const config = speedbridgeConfigs[configIndex];
    if (!config) return;
    source.runCommand('inputpermission set @s movement disabled');
    system.runTimeout(() => {
        delblock6x(source, config.pos.x, config.pos.y, config.pos.z);
        delblock6x(source, config.pos.x, config.pos.y - 20, config.pos.z);
        delblock6x(source, config.pos.x, config.pos.y + 20, config.pos.z);
    }, 20);
    system.runTimeout(() => {
        delblock6x(source, config.pos.x, config.pos.y, config.pos.z);
        delblock6x(source, config.pos.x, config.pos.y - 20, config.pos.z);
        delblock6x(source, config.pos.x, config.pos.y + 20, config.pos.z);
        source.runCommand('inputpermission set @s movement enabled');
        giveblock(source);
        source.runCommand("replaceitem entity @s slot.hotbar 6 ink_sac");
        source.runCommand("replaceitem entity @s slot.hotbar 7 blue_dye");
        source.runCommand("replaceitem entity @s slot.hotbar 8 red_dye");
    }, 40);
    source.runCommand('clear @s');
    source.addTag('speedbridge');
    source.addTag(config.tag);
    source.teleport(config.tp, { facingLocation: config.facing });
}

const blockParkourCourses = {
    course1: {
        tag: 'course1',
        tp: { x: 3009.5, y: 96, z: 1001.5 },
        facing: { x: 3009.5, y: 96, z: 1002.5 },
        clear: { x: 3009.5, y: 100, z: 1047.5 }
    },
    course2: {
        tag: 'course2',
        tp: { x: 3008.5, y: 96, z: 2001.5 },
        facing: { x: 3008.5, y: 96, z: 2002.5 },
        clear: { x: 3008.5, y: 100, z: 2064.5 }
    },
    course3: {
        tag: 'course3',
        tp: { x: 3010.5, y: 96, z: 3001.5 },
        facing: { x: 3010.5, y: 96, z: 3002.5 },
        clear: { x: 3013.5, y: 100, z: 3071.5 }
    },
    course4: {
        tag: 'course4',
        tp: { x: 3009.5, y: 96, z: 4001.5 },
        facing: { x: 3009.5, y: 96, z: 4002.5 },
        clear: { x: 3010.5, y: 100, z: 4058.5 }
    },
    course5: {
        tag: 'course5',
        tp: { x: 3008.5, y: 96, z: 5001.5 },
        facing: { x: 3008.5, y: 96, z: 5002.5 },
        clear: { x: 3006.5, y: 100, z: 5067.5 }
    },
    course6: {
        tag: 'course6',
        tp: { x: 4009.5, y: 96, z: 1001.5 },
        facing: { x: 4009.5, y: 96, z: 1002.5 },
        clear: { x: 4007.5, y: 100, z: 1063.5 }
    },
    course7: {
        tag: 'course7',
        tp: { x: 4009.5, y: 96, z: 2001.5 },
        facing: { x: 4009.5, y: 96, z: 2002.5 },
        clear: { x: 4008.5, y: 100, z: 2062.5 }
    },
    course8: {
        tag: 'course8',
        tp: { x: 4008.5, y: 96, z: 3001.5 },        
        facing: { x: 4008.5, y: 96, z: 3002.5 },
        clear: { x: 4006.5, y: 100, z: 3066.5 }
    },
    course9: {
        tag: 'course9',
        tp: { x: 4007.5, y: 96, z: 4001.5 },
        facing: { x: 4007.5, y: 96, z: 4002.5 },
        clear: { x: 4006.5, y: 100, z: 4056.5 }
    },
    course10: {
        tag: 'course10',
        tp: { x: 4003.5, y: 96, z: 5001.5 },
        facing: { x: 4004.5, y: 96, z: 5002.5 },
        clear: { x: 4046.5, y: 100, z: 5049.5 }
    }
};

function teleportToBlockParkourCourse(player, courseTag) {
    const course = blockParkourCourses[courseTag];
    if (!course) {
        player.sendMessage("§cInvalid parkour course!");
        return;
    }
    // Remove all course tags first
    Object.values(blockParkourCourses).forEach(c => player.removeTag(c.tag));
    // Add the selected tag
    player.runCommand('clear @s');
    player.addTag('blockparkour');
    player.addTag(course.tag);
    // Teleport player
    player.teleport(course.tp, { facingLocation: course.facing });
    player.runCommand('inputpermission set @s movement disabled');
    // Clear blocks
    system.runTimeout(() => {
        delblock6x(player, course.tp.x, course.tp.y, course.tp.z);
        delblock6x(player, course.clear.x, course.clear.y, course.clear.z);
        player.runCommand('inputpermission set @s movement enabled');
        giveblock(player);
        player.runCommand("replaceitem entity @s slot.hotbar 6 ink_sac");
        player.runCommand("replaceitem entity @s slot.hotbar 7 blue_dye");
        player.runCommand("replaceitem entity @s slot.hotbar 8 red_dye");
    }, 40);
    
}

const messages = [
"GG easy",
"Too easy",
"Get good",
"Better luck next time",
"GG bro",
"Outplayed",
"Nice try",
"EZ clap",
"Try harder",
"Stay mad",
"Ratio",
"No chance",
"Too slow",
"You tried",
"GG no re",
"Outclassed",
"Better player wins",
"EZ W",
"GGs only",
"Cant touch this",
"Skill issue",
"Big skill diff",
"Cry more",
"Too smooth",
"Clean fight",
"Cant stop me",
"Next!",
"That was fun",
"Stay salty",
"Just better",
"EZ dubs",
"Learn PvP",
"GG well played",
"That was quick",
"Good fight",
"Whos next?",
"GG have a good one",
"Kept it clean",
"Back to the lobby",
"Out-geared? Nope",
"Youre done",
"Too clean",
"Combo king",
"Keep practicing",
"You need aim",
"GG cya",
"Pathetic",
"Not even close",
"Flawless",
"Destroyed",
"Full combo",
"Click faster next time",
"Hands too slow",
"You lagging or just bad?",
"Was that your best?",
"Guess who wins?",
"Pure skill",
"Nothing personal",
"GG nice hacks (joking)",
"Trash talk over",
"Better ping AND better aim",
"Big brain plays",
"1v1 me again",
"Predictable moves",
"That reach though (sarcasm)",
"Wanna rematch?",
"Too OP for you",
"GG nerd",
"Built different",
"Speedrun victory",
"Stay pressed",
"Back to the queue",
"Who taught you to fight?",
"That armor didnt help",
"Gear check failed",
"Even your hacks cant help",
"Done like dinner",
"Clean sweep",
"Gapple wasted",
"Block hit master",
"Double click harder next time",
"Watch and learn",
"Combo god strikes again",
"Too fast for you",
"Bow skills unmatched",
"Rod god in action",
"Aim trainer needed",
"Youre free",
"Zero resistance",
"GG next victim",
"Feels good",
"Stay mad kid",
"Evened the score",
"You blink you lose",
"Why even try?",
"Clicking simulator champ",
"Rod + W-tap easy",
"High CPS wins",
"Should I go easy next time?",
"Too calculated",
"Respect the craft",
"Minecraft PvP legend",
"Just skill no luck",
"Precision gaming",
"Cant keep up",
"Sharpness + brain",
"Clap clap",
"Go practice on Hypixel",
"Speed bridging wont save you",
"Wombo combo",
"Fly back to spawn",
"Armor broken so are you",
"PvP tutorial failed",
"That wasnt fair… to you",
"GG uninstall?",
"Learn to rod",
"Even your gapples cried",
"Clicking 14 CPS? Cute",
"Dont blink",
"Rod hit repeat",
"The combo was personal",
"ELO mine now",
"Newbie detected",
"That knockback tho!",
"Bridge warrior defeated",
"Hit reg on point",
"GG take notes",
"Youre my warm-up",
"Pro gamer moment",
"Nice cape shame about skills",
"I trained for this",
"Victory royale? Wrong game",
"Timing beats strength",
"Out of gapples? Yikes",
"Only took half a heart",
"Efficiency 100%",
"Rod spam worked huh?",
"Clutch city",
"Couldnt touch me",
"Fast hands win",
"Thought you had me? Nope",
"I love this map",
"Your CPS hurts you",
"GG now cry in lobby",
"Call that PvP?",
"Swipe and delete",
"TikTok-worthy fight",
"Cant combo like me",
"GG dont rage quit",
"Keep grinding",
"Domination complete",
"Who trained you?",
"PvP boss online",
"Hit reg too smooth",
"Pure destruction",
"Perfect fight",
"EZ gapple munch",
"Sword sharp skills sharper",
"GG flawless victory",
"My clicks scare you",
"Aim diff",
"Outplayed mentally and mechanically",
"200 IQ moves",
"Block clutch > you",
"GG peace out",
"Screenshot that combo",
"The bridge is mine",
"Youre laggy AND bad",
"Ping advantage? Nope",
"Best rods in the game",
"Imagine losing that",
"Hypixel duel champ",
"Rod hit prediction 100%",
"PvP clinic in session",
"GG spectate me next",
"Clean rods dirty hits",
"You touched grass yet?",
"Stay offline",
"Delete Minecraft",
"Just uninstall bro",
"Ranked points mine",
"Rod control insane",
"Out strafed",
"Hitbox abused",
"Good fight I guess",
"Need mouse upgrade?",
"Combod into another dimension",
"PvP sensei wins",
"CPS flex",
"W-tap supreme",
"Thought you had reach?",
"LOL GG easy",
"Rod timing flawless",
"Just a warm-up win",
"Daily W secured",
"PvP mastery shown",
"Queue next loser",
"GG nice skin tho",
"Rod spam OP",
"Victory never felt so smooth",
"Victory is mine",
"Too strong",
"Learn to combo",
"Unstoppable",
"Big W",
"Say goodbye",
"Was that PvP?",
"Why so slow?",
"Just built different",
"Destroyed again",
"PvP monster",
"GG uninstall Minecraft",
"PvP legend here",
"You fought well but lost",
"Back to the lobby kid",
"That was light work",
"Free win",
"Practice more noob",
"PvP god strikes",
"You got smoked",
"Skills over luck",
"Was that your plan?",
"Next please",
"Im the king of PvP",
"Youre done kid",
"Thanks for the win",
"Out of your league",
"Not even warmed up",
"Learn to aim",
"Learn to rod kid",
"That was nasty",
"Get on my level",
"PvP on point",
"You cant stop me",
"Sharpness wins",
"Brain + speed",
"No mistakes made",
"Perfect execution",
"Flawless victory",
"Zero hits taken",
"Smooth as butter",
"Too quick for you",
"You need lessons",
"Gapples wasted again",
"Combos too strong",
"Womboed hard",
"Another win",
"Click harder kid",
"You blink you die",
"No escape for you",
"Too much for you",
"Lost in seconds",
"Hands faster than yours",
"Say goodnight",
"One sided fight",
"No resistance at all",
"Stay crying",
"PvP sense unmatched",
"Back to practice",
"Combo artist",
"Timing perfect",
"Strafes too clean",
"You looked lost",
"Outclassed badly",
"Destroyed your ego",
"Learn the game",
"Mouse too slow",
"Clicked into oblivion",
"Big CPS difference",
"PvP wizard",
"Sent you flying",
"Thats a wrap",
"Better than you thought",
"Domination mode",
"Over before it started",
"No gapples can save you",
"Armor didnt matter",
"Strafe lord here",
"Mouse warrior wins",
"Was that max effort?",
"You got schooled",
"Combo so smooth",
"Keyboard dance champ",
"W taps all day",
"Destroyed like blocks",
"Hitbox abused hard",
"Learn the meta",
"Stay humble kid",
"PvP runs in my veins",
"Hands made of steel",
"Mind games win",
"Predictable moves beaten",
"You got rolled",
"Rolling through lobbies",
"No cap all skill",
"Clutch master wins",
"Bridge gone youre gone",
"Rod spammer supreme",
"Cant rod like me",
"Mouse control 100%",
"Block hitting pro",
"Big ELO incoming",
"Points mine again",
"Clicked faster kid",
"Gapples useless",
"PvP machine",
"Sent back to queue",
"PvP not for you",
"Too much speed",
"Click click boom",
"GG stay salty",
"You need better ping",
"Ping no excuse",
"Your reach failed",
"Rod king forever",
"GG rage quit?",
"Quit while you can",
"Never stood a chance",
"Destroyer of hopes",
"Free elo farm",
"Lobby waiting for you",
"GG comeback never",
"One combo and done",
"Touch grass after this",
"Unmatched timing",
"Out of your depth",
"PvP all day",
"Hands sweating?",
"Mouse broken yet?",
"Your tears taste good",
"No gapple clutch",
"W tapping life",
"Combo faster next time",
"Should be illegal",
"You cant react",
"Predict and punish",
"Sent packing",
"Back to bedrock",
"Lost your crown",
"Ill take that W",
"Say hello to defeat",
"Strafe to success",
"Smooth strafing",
"No gear advantage here",
"Lost fair and square",
"Speed demons win",
"Click like your life depends",
"Master of rods",
"No mercy given",
"PvP factory running",
"Easier than parkour",
"Clicks per second too high",
"W key abuse works",
"Had no clue",
"Read like a book",
"You panicked hard",
"Full control fight",
"Better block hits",
"Lost before you swung",
"Your combo dream died",
"Eat gapples faster next time",
"No eating allowed",
"One more win",
"Too accurate",
"Aim locked in",
"Sharp aim sharp sword",
"Clutch combos only",
"Combos raining",
"Storm of hits",
"Mouse workout done",
"Too predictable",
"Cant handle pressure",
"You melted",
"Armor shredded",
"Another gapple wasted",
"Gapple gobbler loses",
"PvP surgeon at work",
"No sloppy hits here",
"Only crits",
"Critical thinking wins",
"Game sense over power",
"GG and goodbye",
"Im the final boss",
"No level can save you",
"PvP fundamentals win",
"Get schooled nerd",
"Book of combos opened",
"Playing chess you playing checkers",
"Read your mind",
"Mind games OP",
"Brain and brawn combo",
"Perfect strafes",
"Circle strafe champion",
"Lost in circles",
"Dizzy yet?",
"Footwork clean",
"Click rhythm unmatched",
"PvP rhythm game master",
"Sent flying like elytra",
"Take off to spawn",
"No fall damage here",
"Ground control flawless",
"Hotbar god",
"Inventory management OP",
"Rod hotkey on fire",
"Reflex too quick",
"Reaction speed insane",
"Frame perfect clicks",
"No lag excuses",
"Server delay cant save you",
"Ping difference denied",
"Rod to win ratio 100%",
"Projectile god",
"Bow accuracy 10/10",
"Sniper shots landed",
"Arrow storm incoming",
"Gapple denied",
"Healing denied",
"Combo interruptions pro",
"Cancel healing",
"No regen for you",
"Zero hope left",
"GG keep dreaming",
"Upgrade your mouse",
"Upgrade your brain",
"Upgrade your strafe",
"Get lessons kid",
"Free coaching after this",
"Sensei PvP speaking",
"Observe and learn",
"Study my moves",
"Replay that loss",
"Upload to YouTube",
"PvP montage material",
"Another clip secured",
"Highlight reel fight",
"Too cinematic",
"GG cinematic fight",
"Clips for TikTok",
"Famous for losing",
"Stars for me",
"Rank grind easy",
"Leaderboards mine",
"Top 10 player energy",
"Lobby champ energy",
"No hacks just skill",
"Skill issues exposed",
"Ratio skill issue",
"PvP era belongs to me",
"History repeats I win",
"Lost in milliseconds",
"Blink and gone",
"Fastest duel ever",
"Speed PvP unlocked",
"Lightning reflex mode",
"Hyper mode engaged",
"PvP ultra instinct",
"Anime fight energy",
"Full focus fight",
"Zen PvP vibes",
"PvP god awakening",
"Stay humble after loss",
"Lesson delivered",
"Combo lesson 101",
"First class defeat",
"Premium loss package",
"Enjoy the defeat",
"Compliments from winner",
"GG student",
"Teacher always wins",
"Learn the hard way",
"Final exam failed",
"Study more nerd",
"Homework on combos",
"Assignment due now",
"Lost with zero style",
"Lost with style points to me",
"Flex score 100",
"PvP flex mode",
"Leaderboard flex",
"No grind no glory",
"Grind harder kid",
"Better training needed",
"Lost to raw skill",
"Skill farm continues",
"Lobby filling fast",
"PvP never sleeps",
"Victory streak continues",
"Hot streak mode",
"Combo meter maxed",
"Max combo damage",
"Ultimate PvP form",
"Boss fight complete",
"Boss win easy",
"Elite player confirmed",
"GG mortal",
"PvP immortal strikes",
"Never losing today",
"Perfect day streak",
"Win secured again",
"PvP marathon on",
"Click marathon champion",
"Click energy infinite",
"Mouse durability test",
"Mouse crying",
"Keyboard dancing",
"Keys screaming",
"GG broken setup?",
"Fix your settings",
"Hotkey faster",
"Inventory shuffle pro",
"Rod timing insane",
"Fishing rod gamer",
"Hooks of doom",
"No hook escape",
"Hook and hit cycle",
"Rod trick wins",
"Old school PvP vibes",
"Classic combo style",
"New meta mastered",
"Meta breaker here",
"Trendsetter PvP",
"OG PvPer energy",
"PvP since alpha",
"Veteran gamer wins",
"Young blood schooled",
"Experience beats youth",
"Years of PvP training",
"PvP monk powers",
"Mind clear combos hit",
"Inner peace outer combos",
"Strafing meditation",
"Clicks aligned with chakra",
"PvP enlightenment reached",
"GG grasshopper",
"Sensei bows",
"Lesson complete",
"Queue the next victim",
"Next in line",
"Lining up Ls",
"Lobby of losers waiting",
"Ticket for defeat taken",
"PvP train unstoppable",
"Express train to spawn",
"Ride the L train",
"Another ticket punched",
"Punching tickets and kids",
"PvP conductor here",
"Next stop defeat",
"Schedule full of wins",
"PvP grind schedule busy",
"Lost your appointment",
"PvP booked solid",
"VIP win service",
"Premium PvP delivery",
"Win delivered hot",
"Fresh L served",
"L to go bag ready",
"L combo meal",
"Supersized combo L",
"GG value meal",
"PvP chef cooking",
"Cooking up combos",
"Served hot defeat",
"Extra crispy hits",
"GG fried you",
"PvP grill master",
"Barbecue time",
"Roasted and toasted",
"Extra salt served",
"Stay salty deluxe",
"Salt overload",
"PvP seasoning applied",
"Spicy combo attack",
"Burn level max",
"Combos on fire",
"Too hot to handle",
"PvP inferno active",
"Combos blazing",
"Flames of victory",
"GG fire dance",
"Smoke from combos",
"Opponent burned out",
"Ashes to lobby",
"Lobby dust remains",
"Respawn ashes",
"GG phoenix rise me",
"Always rising winner",
"Legend never dies",
"PvP eternal"
]

const swordAndPickaxeIds = [
    "minecraft:wooden_sword",
    "minecraft:stone_sword",
    "minecraft:iron_sword",
    "minecraft:golden_sword",
    "minecraft:diamond_sword",
    "minecraft:netherite_sword",
    "minecraft:wooden_pickaxe",
    "minecraft:stone_pickaxe",
    "minecraft:iron_pickaxe",
    "minecraft:golden_pickaxe",
    "minecraft:diamond_pickaxe",
    "minecraft:netherite_pickaxe"
];

const db = new QIDB("kits");

function handleRespawnTeleport(source) {
    if (source.hasTag('hub')) {
        reset(source);
        system.runTimeout(() => {
            source.runCommand("replaceitem entity @s slot.hotbar 4 compass");
        }, 1);
        source.teleport({ x: 0.5, y: 200, z: 0.5 }, { facingLocation: { x: 0.5, y: 200, z: -0.5 } });
    }
    if (source.hasTag('kiteditor')) {
        source.teleport({ x: 1000.5, y: 102, z: -5499.5 }, { facingLocation: { x: 1002.5, y: 102, z: -5493.5 } });
    }
    if (source.hasTag('clutch')) {
        source.teleport({ x: 1998.5, y: 100, z: 501.5 });
    }
}

function handleBridgeFFARespawn(source) {
    playerFFABlocks.set(source, 0);
    const bridgeTags = [
        { tag: "bridge0", pos: { x: 3500.5, y: 100, z: 2500.5 }, facing: { x: 3500.5, y: 100, z: 2500.5 } },

        { tag: "bridge1", pos: { x: 3000.5, y: 100, z: -5999.5 }, facing: { x: 3000.5, y: 100, z: -5998.5 } },
        { tag: "bridge2", pos: { x: 3000.5, y: 100, z: -4499.5 }, facing: { x: 2998.5, y: 100, z: -4496.5 } },
        { tag: "bridge3", pos: { x: 2000.5, y: 100, z: -5999.5 }, facing: { x: 1997.5, y: 100, z: -5997.5 } },
        { tag: "bridge4", pos: { x: 2000.5, y: 100, z: -4499.5 }, facing: { x: 2000.5, y: 100, z: -4498.5 } },
        { tag: "bridge5", pos: { x: 4000.5, y: 100, z: -5999.5 }, facing: { x: 4000.5, y: 100, z: -5998.5 } }
    ];
    for (const { tag, pos, facing } of bridgeTags) {
        if (source.hasTag(tag)) {
            source.teleport(pos, { facingLocation: facing });
            break;
        }
    }
}

function handleSpeedbridgeReset(source) {
    const tags = [
        'speedbridge1', 'speedbridge2', 'speedbridge3',
        'speedbridge4', 'speedbridge5', 'speedbridge6'
    ];
    for (const tag of tags) {
        if (source.hasTag(tag) && speedbridgeActive[tag]) {
            if (speedbridgeTimers[tag]) {
                system.clearRun(speedbridgeTimers[tag]);
                speedbridgeTimers[tag] = null;
            }
            speedbridgeActive[tag] = false;
            speedbridgeStartTimes[tag] = null;
        }
    }
    source.runCommand(`title @s actionbar §cReset run!`);
    source.playSound("random.click");
    source.runCommand('clear @s');
    giveblock(source);
    system.runTimeout(() => {
        source.runCommand(`title @s actionbar §cReset run!`);
        source.runCommand("replaceitem entity @s slot.hotbar 6 ink_sac");
        source.runCommand("replaceitem entity @s slot.hotbar 7 blue_dye");
        source.runCommand("replaceitem entity @s slot.hotbar 8 red_dye");
        for (const { tag, posx, posy, posz, facing } of speedbridgeTags) {
            if (source.hasTag(tag)) {
                delblock6x(source, posx, posy, posz);
                source.teleport({ x: posx + 0.5, y: 100, z: posz + 0.5 }, { facingLocation: facing });
                break;
            }
        }
    }, 1);
}

function handleBlockParkourRespawn(source) {
    const blockParkourTags = Object.keys(blockParkourCourses);
    for (const tag of blockParkourTags) {
        if (source.hasTag(tag)) {
            // Clear timer if running
            if (blockParkourTimers[tag]) {
                system.clearRun(blockParkourTimers[tag]);
                blockParkourTimers[tag] = null;
            }
            blockParkourActive[tag] = false;
            blockParkourStartTimes[tag] = null;
            source.runCommand(`title @s actionbar §cReset run!`);
            source.playSound("random.click");
            source.runCommand('clear @s');
            // Teleport to course start
            const course = blockParkourCourses[tag];
            if (course) {
                delblock6x(source, course.tp.x, course.tp.y, course.tp.z);
                source.teleport(course.tp, { facingLocation: course.facing });
                system.runTimeout(() => {
                    source.runCommand("replaceitem entity @s slot.hotbar 6 ink_sac");
                    source.runCommand("replaceitem entity @s slot.hotbar 7 blue_dye");
                    source.runCommand("replaceitem entity @s slot.hotbar 8 red_dye");
                    giveblock(source);
                    source.runCommand(`title @s actionbar §cReset run!`);
                }, 1);
            }
            break;
        }
    }
}

function handleSpeedbridgeFinish(source, tag) {
    source.runCommand('clear @s');
    if (speedbridgeTimers[tag]) {
        system.clearRun(speedbridgeTimers[tag]);
        speedbridgeTimers[tag] = null;
    }
    speedbridgeActive[tag] = false;
    const elapsed = ((Date.now() - speedbridgeStartTimes[tag]) / 1000);
    const displayElapsed = elapsed.toFixed(2);
    const compareElapsed = parseFloat(elapsed.toFixed(3));
    const bridgeName = speedbridgeNames[tag] || tag;
    const isFlying = source.hasTag('flying');
    if (isFlying) {
        source.playSound('random.anvil_land');
        source.onScreenDisplay.setTitle("§cFly detected!");
        source.sendMessage("§cFly detected!");
        speedbridgeStartTimes[tag] = null;
    } else {
        if (speedbridgeBestTimes[tag] === null || compareElapsed < speedbridgeBestTimes[tag]) {
            speedbridgeBestTimes[tag] = compareElapsed;
            saveSpeedbridgeBestTimes();
            source.playSound('firework.blast');
            source.playSound('random.screenshot');
            source.spawnParticle('minecraft:knockback_roar_particle', source.getHeadLocation());
            system.runTimeout(() => {
                source.playSound('firework.blast');
                source.spawnParticle('minecraft:knockback_roar_particle', source.getHeadLocation());
            }, 15);
            system.runTimeout(() => {
                source.playSound('firework.blast');
                source.spawnParticle('minecraft:knockback_roar_particle', source.getHeadLocation());
            }, 30);
            system.runTimeout(() => {
                source.playSound('firework.blast');
                source.spawnParticle('minecraft:knockback_roar_particle', source.getHeadLocation());
            }, 45);
            source.onScreenDisplay.setTitle(`§bNew Record: §f${displayElapsed}`);
            source.sendMessage(`§bNew Record §3for §b${bridgeName}: §f${displayElapsed}`);
            source.sendMessage(`§3Actual Time: §f${speedbridgeBestTimes[tag].toFixed(3)}`);
        } else {
            source.playSound('random.orb');
            source.sendMessage(`§3Time to finish §b${bridgeName}§b: §f${displayElapsed}`);
            source.sendMessage(`§bBest Time: §f${speedbridgeBestTimes[tag].toFixed(2)} §7(${speedbridgeBestTimes[tag].toFixed(3)})`);
        }
    }
    for (const { tag: t, posx, posy, posz, facing } of speedbridgeTags) {
        if (source.hasTag(t)) {
            source.removeTag('speedbridge');
            system.runTimeout(() => {
                source.runCommand("replaceitem entity @s slot.hotbar 6 ink_sac");
                source.runCommand("replaceitem entity @s slot.hotbar 7 blue_dye");
                source.runCommand("replaceitem entity @s slot.hotbar 8 red_dye");
                giveblock(source);
                delblock6x(source, posx, posy, posz);
                source.addTag('speedbridge');
                source.teleport({ x: posx + 0.5, y: 100, z: posz + 0.5 }, { facingLocation: facing });
            }, 45);
            source.removeTag('flying');
            break;
        }
    }
}

function handleBlockParkourFinish(source, tag) {
    source.runCommand('clear @s');
    if (blockParkourTimers[tag]) {
        system.clearRun(blockParkourTimers[tag]);
        blockParkourTimers[tag] = null;
    }
    blockParkourActive[tag] = false;
    const elapsed = ((Date.now() - blockParkourStartTimes[tag]) / 1000);
    const displayElapsed = elapsed.toFixed(2);
    const compareElapsed = parseFloat(elapsed.toFixed(3));
    const isFlying = source.hasTag('flying');
    if (isFlying) {
        source.playSound('random.anvil_land');
        source.onScreenDisplay.setTitle("§cFly detected!");
        source.sendMessage("§cFly detected!");
        blockParkourStartTimes[tag] = null;
    } else {
        if (blockParkourBestTimes[tag] === null || compareElapsed < blockParkourBestTimes[tag]) {
            blockParkourBestTimes[tag] = compareElapsed;
            saveBlockParkourBestTimes();
            source.playSound('firework.blast');
            source.playSound('random.screenshot');
            source.spawnParticle('minecraft:knockback_roar_particle', source.getHeadLocation());
            system.runTimeout(() => {
                source.playSound('firework.blast');
                source.spawnParticle('minecraft:knockback_roar_particle', source.getHeadLocation());
            }, 15);
            system.runTimeout(() => {
                source.playSound('firework.blast');
                source.spawnParticle('minecraft:knockback_roar_particle', source.getHeadLocation());
            }, 30);
            system.runTimeout(() => {
                source.playSound('firework.blast');
                source.spawnParticle('minecraft:knockback_roar_particle', source.getHeadLocation());
            }, 45);
            source.onScreenDisplay.setTitle(`§bNew Record: §f${displayElapsed}`);
            source.sendMessage(`§bNew Record §3for §b${tag}: §f${displayElapsed}`);
            source.sendMessage(`§3Actual Time: §f${blockParkourBestTimes[tag].toFixed(3)}`);
        } else {
            source.playSound('random.orb');
            source.sendMessage(`§3Time to finish §b${tag}§b: §f${displayElapsed}`);
            source.sendMessage(`§bBest Time: §f${blockParkourBestTimes[tag].toFixed(2)} §7(${blockParkourBestTimes[tag].toFixed(3)})`);
        }
    }
    // Teleport back to course start and refill blocks
    const course = blockParkourCourses[tag];
    if (course) {
        source.removeTag('blockparkour');
        system.runTimeout(() => {
            delblock6x(source, course.tp.x, course.tp.y, course.tp.z);
            source.teleport(course.tp, { facingLocation: course.facing });
            source.runCommand("replaceitem entity @s slot.hotbar 6 ink_sac");
            source.runCommand("replaceitem entity @s slot.hotbar 7 blue_dye");
            source.runCommand("replaceitem entity @s slot.hotbar 8 red_dye");
            giveblock(source);
            source.addTag('blockparkour');
        }, 45);
        source.removeTag('flying');
    }
}

// Helper to get the player's gamemode tag
function getGamemodeTag(player) {
    if (player.hasTag("nodebuff")) return "nodebuff";
    if (player.hasTag("boxing")) return "boxing";
    if (player.hasTag("sumo")) return "sumo";
    if (player.hasTag("midfight")) return "midfight";
    if (player.hasTag("builduhc")) return "builduhc";
    if (player.hasTag("gapple")) return "gapple";
    if (player.hasTag("skywars")) return "skywars";
    if (player.hasTag("treasurewars")) return "treasurewars";
    if (player.hasTag("hallfight")) return "hallfight";
    if (player.hasTag("stickfight")) return "stickfight";
    if (player.hasTag("combo")) return "combo";
    return null;
}

function getClosestBotEntity(source) {
    if (!source || !source.dimension) return { minDist: Infinity, botEntity: null, botName: null };
    let botEntity = null;
    let botName = null;
    let minDist = Infinity;
    const entities = source.dimension.getEntities ? source.dimension.getEntities({ type: "bot:pvp" }) : [];
    for (const entity of entities) {
        if (!entity || !entity.location) continue;
        const dx = entity.location.x - source.location.x;
        const dz = entity.location.z - source.location.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < minDist) {
            minDist = dist;
            botEntity = entity;
        }
        if (botEntity) {
            botName = botEntity.nameTag;
        }
    }
    return { minDist, botEntity, botName };
}

// Helper to set a player's inventory from an array of ItemStacks
function setInventory(player, items) {
    const inv = player.getComponent("inventory").container;
    const equipment = player.getComponent("equippable");
    let idx = 0;
    // Restore main inventory
    for (let i = 0; i < inv.size; i++, idx++) {
        inv.setItem(i, items[idx] || undefined);
    }
    // Restore armor and offhand using equippable
    const slots = ["Head", "Chest", "Legs", "Feet", "Offhand"];
    for (let i = 0; i < slots.length; i++, idx++) {
        equipment.setEquipment(slots[i], items[idx] || undefined);
    }
}

function triggerDeathEffects(player, location, dimension) {
    // Firework ring
    let ticks = 0;
    if (player.hasTag("death_firework")) {
        for (let i = 0; i < 8; i++) {
            const angle = (2 * Math.PI * i) / 8;
            const fx = location.x + Math.cos(angle) * 2;
            const fz = location.z + Math.sin(angle) * 2;
            dimension.spawnEntity("minecraft:fireworks_rocket", { x: fx, y: location.y, z: fz });
        }
    }
    // Lightning effect
    if (player.hasTag("death_lightning")) {
        dimension.spawnEntity("minecraft:lightning_bolt", location);
    }
    // Blood effect
    if (player.hasTag("death_blood")) {
        player.playSound('random.pop');
        player.runCommand(`setblock ${location.x} ${location.y + 1} ${location.z} redstone_block`);
        player.runCommand(`fill ${location.x} ${location.y + 1} ${location.z} ${location.x} ${location.y + 1} ${location.z} air destroy`);
    }
    // Growth effect
    if (player.hasTag("death_growth")) {
        dimension.spawnParticle("minecraft:crop_growth_area_emitter", location);
        player.playSound('item.bone_meal.use');
    }
    // Lava effect
    if (player.hasTag("death_lava")) {
        const interval = system.runInterval(() => {
            dimension.spawnParticle("minecraft:lava_particle", location);
            player.playSound("liquid.lavapop");
            ticks++;
            if (ticks >= 40) system.clearRun(interval);
        }, 1);
    }
    // Omen effect
    if (player.hasTag("death_omen")) {
        const interval = system.runInterval(() => {
            dimension.spawnParticle("minecraft:raid_omen_emitter", location);
            ticks++;
            if (ticks >= 40) system.clearRun(interval);
        }, 1);
        player.playSound('apply_effect.raid_omen');
    }
    // Shriek effect
    if (player.hasTag("death_shriek")) {
        dimension.spawnParticle("minecraft:shriek_particle", location);
        player.playSound('shriek.sculk_shrieker');
    }
    // Mace effect
    if (player.hasTag("death_blackblood")) {
        dimension.spawnParticle("minecraft:smash_ground_particle_center", location);
        player.playSound('mace.smash_ground')
    }
    // Breeze effect
    if (player.hasTag("death_breeze")) {
        dimension.spawnParticle("minecraft:breeze_wind_explosion_emitter", location);
        player.playSound('breeze_wind_charge.burst');
    }
    // Sonic Boom effect
    if (player.hasTag("death_sonic")) {
        system.runTimeout(() => {
            dimension.spawnParticle("minecraft:sonic_explosion", location);
        }, 5);
        player.playSound('mob.warden.sonic_boom');
    }
}

// Usage example:
// triggerDeathEffects(source, source.location, source.dimension);
// or for bot death:
// triggerDeathEffects(player, botEntity.location, botEntity.dimension);

function handleBotWin(source, botEntity, botName, gamemode) {
    if (!["sumo", "stickfight", "midfight"].includes(gamemode) && !source.hasTag('duel')) return;
    source.sendMessage(`§bMatch Result §3for §b${gamemode}:\n§3Winner: §b${botName} §7| §3Loser: §b${source.nameTag}`);
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    system.runTimeout(() => {
        source.playSound('random.click');
        source.sendMessage(`<${botName}> ${randomMsg}`);
    }, 30);
    source.addTag('hub');
    source.removeTag('duel');
    if (botEntity) {
        system.runTimeout(() => {
            botEntity.remove();
        }, 70);
        system.runTimeout(() => {
            source.runCommand('tickingarea remove duel');
        }, 75);
        triggerDeathEffects(source, source.location, source.dimension);
    }
    source.runCommand('title @s title §cDefeated!');
    source.runCommand(`title @s subtitle §c${botName} §rwon the match!`);
    source.playSound('random.anvil_break');
    source.runCommand('scoreboard objectives remove totalhits');
    source.runCommand('gamemode spectator @s');
    system.runTimeout(() => {
        reset(source);
        source.runCommand("title @s subtitle §bClearing map...");
        source.runCommand("execute at @s run kill @e[type=bot:pvp,r=10]");
        system.runTimeout(() => {
            source.runCommand('gamemode a @s');
            source.runCommand("replaceitem entity @s slot.hotbar 4 compass");
            source.teleport({ x: 0.5, y: 200, z: 0.5 }, {facingLocation: { x: 0.5, y: 200, z: -0.5}}); //add 0.5 to x and z to tp to center of block
            }, 20);
    }, 80);
}

function handlePlayerWin(source, botEntity, gamemode) {
    if (!["sumo", "stickfight", "midfight"].includes(gamemode) && !source.hasTag('duel')) return;
    system.runTimeout(() => {
        source.runCommand('tickingarea remove duel');
    }, 75);
    source.sendMessage(`§bMatch Result §3for §b${gamemode}:\n§3Winner: §b${source.nameTag} §7| §3Loser: §b${botEntity.nameTag}`);
    source.addTag('hub');
    source.removeTag('duel');
    source.addEffect('instant_health', 5, { amplifier: 255, showParticles: false });
    source.addEffect('fire_resistance', 5, { amplifier: 255, showParticles: false });
    triggerDeathEffects(source, botEntity.location, botEntity.dimension);
    botEntity.kill();
    source.runCommand('clear @s')
    source.runCommand('title @s title §aVictory!');
    source.runCommand(`title @s subtitle §a${source.nameTag} §rwon the match!`);
    source.playSound('random.orb');
    source.runCommand('scoreboard objectives remove totalhits');
    system.runTimeout(() => {
        reset(source);
        source.runCommand("title @s subtitle §bClearing map...");
        source.runCommand('gamemode a @s');
        source.runCommand("execute at @s run kill @e[type=bot:pvp,r=10]");
        system.runTimeout(() => {
            source.runCommand("replaceitem entity @s slot.hotbar 4 compass");
            source.teleport({ x: 0.5, y: 200, z: 0.5 }, {facingLocation: { x: 0.5, y: 200, z: -0.5}}); //add 0.5 to x and z to tp to center of block
            }, 20);
    }, 80);
}

function potting(source, botEntity) {
    const location = {
        x: botEntity.location.x,
        y: botEntity.location.y + 2,
        z: botEntity.location.z
    }
    botEntity.setRotation({x: source.getRotation().x + 180, y: source.getRotation().y + 120})
    botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 splash_potion 1 22`)
    system.runTimeout(() => {
        //source.runCommand(`structure load pvp:pot ${location.x} ${location.y} ${location.z}`)
        source.runCommand(`summon splash_potion ${location.x} ${location.y} ${location.z}`)
    }, 2);
    system.runTimeout(() => {
        //source.runCommand(`structure load pvp:pot ${location.x} ${location.y} ${location.z}`)
        source.runCommand(`summon splash_potion ${location.x} ${location.y} ${location.z}`)
    }, 4);
    system.runTimeout(() => {
        botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 diamond_sword`)
    }, 7);
}

function botpearl(source, botEntity) {
    if (!botEntity) return;
    // if (!botEntity.hasTag('pearl')) return;
    system.runTimeout(() => {
        botEntity.addTag('pearl');
    }, 2)
    const playerloc = {
        x: source.location.x,
        y: source.location.y,
        z: source.location.z
    }
    const options = {
        cause: "selfDestruct",
        damagingEntity: botEntity
    };
    botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ender_pearl`)
    system.runTimeout(() => {
        if (!botEntity) return;
        source.playSound('mob.endermen.portal')
        botEntity.runCommand(`tp @s ${playerloc.x} ${playerloc.y} ${playerloc.z}`);
        source.applyDamage(0.00000000001, options);
        botEntity.dimension.spawnParticle('mob_portal', playerloc);
    }, 3);
    system.runTimeout(() => {
        if (!botEntity) return;
        botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 diamond_sword`);
    }, 5);
    system.runTimeout(() => {
        if (!botEntity) return;
        botEntity.removeTag('pearl');
    }, 260);
}

function isWithin3x3Area(center, pos) {
    return (
        Math.abs(pos.x - Math.floor(center.x)) < 1 &&
        Math.abs(pos.y - Math.floor(center.y)) < 1 &&
        Math.abs(pos.z - Math.floor(center.z)) < 1
    );
}

function placeBlocksBetweenSourceAndBot(source, botEntity) {
    const {minDist} = getClosestBotEntity(source);
    const gamemode = getGamemodeTag(source);
    if (!botEntity) return;
    if (minDist > 6) return;
    botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 andesite`);
    const start = source.location;
    const end = botEntity.location;
    const blockCount = Math.floor(Math.random() * 11) + 5; // 5 to 15
    const blocksPlaced = [];
    // Generate random t values and sort them for a random pattern along the line
    const tValues = Array.from({ length: blockCount }, () => Math.random()).sort((a, b) => a - b);
    tValues.forEach((t, i) => {
        system.runTimeout(() => {
            // Add some random offset for more randomness
            const offset = () => (Math.random() - 0.5) * 1.5;
            const x = start.x + (end.x - start.x) * t + offset();
            const y = start.y + (end.y - start.y) * t + offset() + 1;
            const z = start.z + (end.z - start.z) * t + offset();
            const blockPos = {
                x: Math.floor(x),
                y: Math.floor(y),
                z: Math.floor(z)
            };
            if (
                !isWithin3x3Area(start, blockPos) &&
                !isWithin3x3Area(end, blockPos) &&
                blockPos !== source.getHeadLocation() &&
                blockPos !== botEntity.getHeadLocation()
            ) {
                const block = source.dimension.getBlock(blockPos);
                if (block && block.matches('minecraft:air')) {
                    source.dimension.setBlockType(blockPos, "bot:block");
                    source.playSound('dig.stone');
                    blocksPlaced.push(blockPos);
                }
            }
            // After last block is placed, give back sword
            if (i === tValues.length - 1) {
                system.runTimeout(() => {
                    if (!botEntity) return;
                    if (gamemode === 'treasurewars') {
                        botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 iron_sword`);
                    }
                    if (gamemode === 'hallfight') {
                        botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 stone_sword`);
                    }
                    if (gamemode === 'stickfight') { 
                        botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 stick`);
                    } 
                    if (gamemode !== 'treasurewars' && gamemode !== 'hallfight' && gamemode !== 'stickfight') {
                        botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 diamond_sword`);
                    }
                }, 2);
            }
        }, i * 2);
    });
    // Remove all placed blocks after 5 seconds (100 ticks)
    system.runTimeout(() => {
        for (const pos of blocksPlaced) {
            const block = source.dimension.getBlock(pos);
            if (block && block.matches("bot:block")) {
                source.dimension.setBlockType(pos, "minecraft:air");
                source.playSound('dig.stone');
            }
        }
    }, 80);
}

function keepBlockUnderBotEntity(source, botEntity) {
    if (!botEntity) return;
    const gmode = getGamemodeTag(source);
    let ticks = 0;
    botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 andesite`);
    const placedBlocks = [];
    const interval = system.runInterval(() => {
        ticks++;
        if (ticks < 80) {
            if (!botEntity) return;
            const below = {
                x: Math.floor(botEntity.location.x),
                y: Math.floor(botEntity.location.y) - 1,
                z: Math.floor(botEntity.location.z)
            };
            const block = botEntity.dimension.getBlock(below);
            if (block && block.matches("minecraft:air")) {
                botEntity.dimension.setBlockType(below, "bot:block");
                source.playSound('dig.stone');
                placedBlocks.push({ ...below });
            }
        }
        if (ticks === 80) {
            if (!botEntity) return;
            if (gmode === 'treasurewars') {
                botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 iron_sword`);
            }
            if (gmode === 'hallfight') {
                botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 stone_sword`);
            }
            if (gmode === 'stickfight') { 
                botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 stick`);
            } 
            if (gmode !== 'treasurewars' && gmode !== 'hallfight' && gmode !== 'stickfight') {
                botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 diamond_sword`);
            }
            system.clearRun(interval);
            for (const pos of placedBlocks) {
                const block = botEntity.dimension.getBlock(pos);
                if (block && block.matches("bot:block")) {
                    botEntity.dimension.setBlockType(pos, "minecraft:air");
                    source.playSound('dig.stone');
                }
            }
        }
    }, 1);
}

function setFireAtSource(source, botEntity) {
    const {minDist} = getClosestBotEntity(source);
    if (minDist > 4) return;
    if (!source) return;
    if (!botEntity) return;
    fireloc.set(source.name, {
        source: { x: source.location.x, y: source.location.y, z: source.location.z },
    });
    botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 flint_and_steel`);
    const pos = fireloc.get(source.name).source;
    system.runTimeout(() => {
        source.playSound('fire.ignite');
        source.dimension.setBlockType(pos, "minecraft:fire");
        system.runTimeout(() => {
            const block = source.dimension.getBlock(pos);
            if (block && block.matches("minecraft:fire")) {
                source.dimension.setBlockType(pos, "minecraft:air");
            }
        }, 25);
        system.runTimeout(() => {
            if (!botEntity) return;
            botEntity.removeTag('fire');
            botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 diamond_sword`);
        }, 5);
    }, 5);
}

function boteatsgapple (source, botEntity) {
    if (!botEntity) return;
    const game = getGamemodeTag(source);
    botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 golden_apple`);
    botEntity.addEffect('slowness', 32, { amplifier: 2, showParticles: false });
    for (let i = 4; i <= 28; i += 4) {
        system.runTimeout(() => {
            source.playSound('random.eat');
        }, i);
    }
    system.runTimeout(() => {
        if (!botEntity) return;
        if (game === "gapple") {
            botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 iron_sword`);
        } else {
            botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 1 diamond_sword`);
        }
    }, 32);
}

function botrod (source, botEntity) {
    const {minDist} = getClosestBotEntity(source);
    if (minDist > 4) return;
    if (!botEntity) return;
    const options = {
        cause: "selfDestruct",
        damagingEntity: botEntity
    };
    botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 fishing_rod`)
    system.runTimeout(() => {
        if (!botEntity) return;
        source.playSound('random.bow')
        source.applyDamage(0.000000000001, options);
    }, 3);
    system.runTimeout(() => {
        if (!botEntity) return;
        botEntity.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 diamond_sword`);
    }, 6);
}

const fireloc = new Map();

// Store duel spawns for sumo, midfight, stickfight
const duelScoreSpawns = new Map(); // key: player.name, value: { source: {x,y,z}, bot: {x,y,z} }

// Score targets for each mode
const duelScoreTargets = {
    sumo: 4,
    midfight: 3,
    stickfight: 3
};

function increaseDuelScore(source, botEntity) {
    if (!source.hasTag('duel')) return;
    source.removeTag('duel')
    const {minDist, botName, botEntity: bot} = getClosestBotEntity(source);
    const mode = getGamemodeTag(source);
    if (mode !== "sumo" && mode !== "midfight" && mode !== "stickfight") return;
    const obj = world.scoreboard.getObjective("duel_score");
    if (!obj) return;
    // Teleport both to spawn with countdown and input lock
    const spawns = duelScoreSpawns.get(source.name);
    if (obj.getScore(source) < duelScoreTargets[mode] && obj.getScore(botName) < duelScoreTargets[mode]) {
        system.runTimeout(() => {
            source.playSound('random.orb');
        }, 2);
        if (spawns) {
            source.runCommand('clear @s')
            source.addEffect("instant_health", 2, { amplifier: 255, showParticles: false });
            source.teleport(spawns.source, { facingLocation: spawns.bot });
            botEntity.teleport(spawns.bot);
            // Disable player input and give bot slowness
            source.runCommand('inputpermission set @s movement disabled');
            botEntity.addEffect("slowness", 110, { amplifier: 255, showParticles: false });
            let countdown = 6;
            const interval = system.runInterval(() => {
                countdown--;
                if (countdown > 0) {
                    source.runCommand(`title @s actionbar §3Starting in §b${countdown}`);
                    //source.runCommand(`title @s subtitle §b${source.name}: §3${obj.getScore(source)} §f- §b${botName}: §3${obj.getScore(botName)}`);
                    source.playSound('random.click');
                    source.runCommand('clear @s');
                }
                if (countdown === 0) {
                    system.clearRun(interval);
                    source.runCommand(`title @s actionbar §bGo!`);
                    source.runCommand('inputpermission set @s movement enabled');
                    source.playSound('firework.blast');
                    source.addTag('duel');
                    loadKitForPlayer(source, mode);
                }
            }, 20);
        }
    }
    // Check win
    if (obj.getScore(source) >= duelScoreTargets[mode]) {
        handlePlayerWin(source, botEntity, mode);
        duelScoreSpawns.delete(source.name);
        try { world.scoreboard.removeObjective(`duel_score`); } catch {}
    } else if (obj.getScore(botName) >= duelScoreTargets[mode]) {
        handleBotWin(source, botEntity, botName, mode);
        duelScoreSpawns.delete(source.name);
        try { world.scoreboard.removeObjective(`duel_score`); } catch {}
    }
}

function sanitizeKey(str) {
    return String(str).replace(/[^A-Za-z0-9_]/g, "_");
}

function loadKitForPlayer(source, gamemode) {
    let kit = [];
    if (db.has(`${sanitizeKey(source.name)}_${gamemode}`)) {
        kit = db.get(`${sanitizeKey(source.name)}_${gamemode}`);
    } else if (db.has(`default_${gamemode}`)) {
        kit = db.get(`default_${gamemode}`);
    }
    setInventory(source, kit);
}





































































































































function detecttogiveblock (source) {
if (source.getGameMode() === "Creative") return;
source.runCommand('execute as @a[hasitem={item=bot:block,quantity=2}] run give @s bot:block 62 0 {"minecraft:can_place_on": {"blocks": ["bot:block", "acacia_button", "acacia_door", "acacia_double_slab", "acacia_fence", "acacia_fence_gate", "acacia_hanging_sign", "acacia_leaves", "acacia_log", "acacia_pressure_plate", "acacia_sapling", "acacia_slab", "acacia_stairs", "acacia_standing_sign", "acacia_trapdoor", "acacia_wall_sign", "acacia_wood", "activator_rail", "air", "allium", "allow", "amethyst_block", "amethyst_cluster", "ancient_debris", "andesite", "andesite_double_slab", "andesite_slab", "andesite_stairs", "andesite_wall", "anvil", "azalea", "azalea_leaves", "azalea_leaves_flowered", "azure_bluet", "bamboo", "bamboo_block", "bamboo_button", "bamboo_door", "bamboo_double_slab", "bamboo_fence", "bamboo_fence_gate", "bamboo_hanging_sign", "bamboo_mosaic", "bamboo_mosaic_double_slab", "bamboo_mosaic_slab", "bamboo_mosaic_stairs", "bamboo_planks", "bamboo_pressure_plate", "bamboo_sapling", "bamboo_slab", "bamboo_stairs", "bamboo_standing_sign", "bamboo_trapdoor", "bamboo_wall_sign", "barrel", "basalt", "beacon", "bed", "bedrock", "bee_nest", "beehive", "beetroot", "bell", "big_dripleaf", "birch_button", "birch_door", "birch_double_slab", "birch_fence", "birch_fence_gate", "birch_hanging_sign", "birch_leaves", "birch_log", "birch_pressure_plate", "birch_sapling", "birch_slab", "birch_stairs", "birch_standing_sign", "birch_trapdoor", "birch_wall_sign", "birch_wood", "black_candle", "black_candle_cake", "black_carpet", "black_concrete", "black_concrete_powder", "black_glazed_terracotta", "black_shulker_box", "black_stained_glass", "black_stained_glass_pane", "black_terracotta", "black_wool", "blackstone", "blackstone_double_slab", "blackstone_slab", "blackstone_stairs", "blackstone_wall", "blast_furnace", "blue_candle", "blue_candle_cake", "blue_carpet", "blue_concrete", "blue_concrete_powder", "blue_glazed_terracotta", "blue_ice", "blue_orchid", "blue_shulker_box", "blue_stained_glass", "blue_stained_glass_pane", "blue_terracotta", "blue_wool", "bone_block", "bookshelf", "border_block", "brain_coral", "brain_coral_block", "brain_coral_fan", "brain_coral_wall_fan", "brewing_stand", "brick_block", "brick_double_slab", "brick_slab", "brick_stairs", "brick_wall", "brown_candle", "brown_candle_cake", "brown_carpet", "brown_concrete", "brown_concrete_powder", "brown_glazed_terracotta", "brown_mushroom", "brown_mushroom_block", "brown_shulker_box", "brown_stained_glass", "brown_stained_glass_pane", "brown_terracotta", "brown_wool", "bubble_column", "bubble_coral", "bubble_coral_block", "bubble_coral_fan", "bubble_coral_wall_fan", "budding_amethyst", "cactus", "cake", "calcite", "calibrated_sculk_sensor", "camera", "campfire", "candle", "candle_cake", "carpet", "carrots", "cartography_table", "carved_pumpkin", "cauldron", "cave_vines", "cave_vines_body_with_berries", "cave_vines_head_with_berries", "chain", "chain_command_block", "cherry_button", "cherry_door", "cherry_double_slab", "cherry_fence", "cherry_fence_gate", "cherry_hanging_sign", "cherry_leaves", "cherry_log", "cherry_planks", "cherry_pressure_plate", "cherry_sapling", "cherry_slab", "cherry_stairs", "cherry_standing_sign", "cherry_trapdoor", "cherry_wall_sign", "cherry_wood", "chest", "chipped_anvil", "chiseled_bookshelf", "chiseled_copper", "chiseled_deepslate", "chiseled_nether_bricks", "chiseled_polished_blackstone", "chiseled_quartz_block", "chiseled_red_sandstone", "chiseled_resin_bricks", "chiseled_sandstone", "chiseled_stone_bricks", "chiseled_tuff", "chiseled_tuff_bricks", "chorus_flower", "chorus_plant", "clay", "closed_eyeblossom", "coal_block", "coal_ore", "coarse_dirt", "cobbled_deepslate", "cobbled_deepslate_double_slab", "cobbled_deepslate_slab", "cobbled_deepslate_stairs", "cobbled_deepslate_wall", "cobblestone", "cobblestone_double_slab", "cobblestone_slab", "cobblestone_wall", "cocoa", "command_block", "composter", "concrete", "concretePowder", "conduit", "copper_block", "copper_bulb", "copper_door", "copper_grate", "copper_ore", "copper_trapdoor", "coral", "coral_block", "coral_fan", "coral_fan_dead", "coral_fan_hang", "coral_fan_hang2", "coral_fan_hang3", "cornflower", "cracked_deepslate_bricks", "cracked_deepslate_tiles", "cracked_nether_bricks", "cracked_polished_blackstone_bricks", "cracked_stone_bricks", "crafter", "crafting_table", "creaking_heart", "creeper_head", "crimson_button", "crimson_door", "crimson_double_slab", "crimson_fence", "crimson_fence_gate", "crimson_fungus", "crimson_hanging_sign", "crimson_hyphae", "crimson_nylium", "crimson_planks", "crimson_pressure_plate", "crimson_roots", "crimson_slab", "crimson_stairs", "crimson_standing_sign", "crimson_stem", "crimson_trapdoor", "crimson_wall_sign", "crying_obsidian", "cut_copper", "cut_copper_slab", "cut_copper_stairs", "cut_red_sandstone", "cut_red_sandstone_slab", "cut_sandstone", "cut_sandstone_slab", "cyan_candle", "cyan_candle_cake", "cyan_carpet", "cyan_concrete", "cyan_concrete_powder", "cyan_glazed_terracotta", "cyan_shulker_box", "cyan_stained_glass", "cyan_stained_glass_pane", "cyan_terracotta", "cyan_wool", "damaged_anvil", "dandelion", "dark_oak_button", "dark_oak_door", "dark_oak_double_slab", "dark_oak_fence", "dark_oak_fence_gate", "dark_oak_hanging_sign", "dark_oak_leaves", "dark_oak_log", "dark_oak_pressure_plate", "dark_oak_sapling", "dark_oak_slab", "dark_oak_stairs", "dark_oak_trapdoor", "dark_oak_wood", "dark_prismarine", "dark_prismarine_double_slab", "dark_prismarine_slab", "dark_prismarine_stairs", "darkoak_standing_sign", "darkoak_wall_sign", "daylight_detector", "daylight_detector_inverted", "dead_brain_coral", "dead_brain_coral_block", "dead_brain_coral_fan", "dead_brain_coral_wall_fan", "dead_bubble_coral", "dead_bubble_coral_block", "dead_bubble_coral_fan", "dead_bubble_coral_wall_fan", "dead_fire_coral", "dead_fire_coral_block", "dead_fire_coral_fan", "dead_fire_coral_wall_fan", "dead_horn_coral", "dead_horn_coral_block", "dead_horn_coral_fan", "dead_horn_coral_wall_fan", "dead_tube_coral", "dead_tube_coral_block", "dead_tube_coral_fan", "dead_tube_coral_wall_fan", "deadbush", "decorated_pot", "deepslate", "deepslate_brick_double_slab", "deepslate_brick_slab", "deepslate_brick_stairs", "deepslate_brick_wall", "deepslate_bricks", "deepslate_coal_ore", "deepslate_copper_ore", "deepslate_diamond_ore", "deepslate_emerald_ore", "deepslate_gold_ore", "deepslate_iron_ore", "deepslate_lapis_ore", "deepslate_redstone_ore", "deepslate_tile_double_slab", "deepslate_tile_slab", "deepslate_tile_stairs", "deepslate_tile_wall", "deepslate_tiles", "deny", "deprecated_anvil", "deprecated_purpur_block_1", "deprecated_purpur_block_2", "detector_rail", "diamond_block", "diamond_ore", "diorite", "diorite_double_slab", "diorite_slab", "diorite_stairs", "diorite_wall", "dirt", "dirt_with_roots", "dispenser", "double_cut_copper_slab", "double_plant", "double_stone_slab", "double_stone_slab2", "double_stone_slab3", "double_stone_slab4", "double_wooden_slab", "dragon_egg", "dragon_head", "dried_kelp_block", "dripstone_block", "dropper", "emerald_block", "emerald_ore", "enchanting_table", "end_brick_stairs", "end_bricks", "end_gateway", "end_portal", "end_portal_frame", "end_rod", "end_stone", "end_stone_brick_double_slab", "end_stone_brick_slab", "end_stone_brick_wall", "ender_chest", "exposed_chiseled_copper", "exposed_copper", "exposed_copper_bulb", "exposed_copper_door", "exposed_copper_grate", "exposed_copper_trapdoor", "exposed_cut_copper", "exposed_cut_copper_slab", "exposed_cut_copper_stairs", "exposed_double_cut_copper_slab", "farmland", "fence", "fence_gate", "fern", "fire", "fire_coral", "fire_coral_block", "fire_coral_fan", "fire_coral_wall_fan", "fletching_table", "flower_pot", "flowering_azalea", "flowing_lava", "flowing_water", "frame", "frog_spawn", "frosted_ice", "furnace", "gilded_blackstone", "glass", "glass_pane", "glow_frame", "glow_lichen", "glowingobsidian", "glowstone", "gold_block", "gold_ore", "golden_rail", "granite", "granite_double_slab", "granite_slab", "granite_stairs", "granite_wall", "grass", "grass_path", "gravel", "gray_candle", "gray_candle_cake", "gray_carpet", "gray_concrete", "gray_concrete_powder", "gray_glazed_terracotta", "gray_shulker_box", "gray_stained_glass", "gray_stained_glass_pane", "gray_terracotta", "gray_wool", "green_candle", "green_candle_cake", "green_carpet", "green_concrete", "green_concrete_powder", "green_glazed_terracotta", "green_shulker_box", "green_stained_glass", "green_stained_glass_pane", "green_terracotta", "green_wool", "grindstone", "hanging_roots", "hardened_clay", "hay_block", "heavy_core", "heavy_weighted_pressure_plate", "honey_block", "honeycomb_block", "hopper", "horn_coral", "horn_coral_block", "horn_coral_fan", "horn_coral_wall_fan", "ice", "infested_chiseled_stone_bricks", "infested_cobblestone", "infested_cracked_stone_bricks", "infested_deepslate", "infested_mossy_stone_bricks", "infested_stone", "infested_stone_bricks", "info_update", "info_update2", "invisibleBedrock", "iron_bars", "iron_block", "iron_door", "iron_ore", "iron_trapdoor", "jigsaw", "jukebox", "jungle_button", "jungle_door", "jungle_double_slab", "jungle_fence", "jungle_fence_gate", "jungle_hanging_sign", "jungle_leaves", "jungle_log", "jungle_pressure_plate", "jungle_sapling", "jungle_slab", "jungle_stairs", "jungle_standing_sign", "jungle_trapdoor", "jungle_wall_sign", "jungle_wood", "kelp", "ladder", "lantern", "lapis_block", "lapis_ore", "large_amethyst_bud", "large_fern", "lava", "lava_cauldron", "leaves", "leaves2", "lectern", "lever", "light_block", "light_block_0", "light_block_1", "light_block_10", "light_block_11", "light_block_12", "light_block_13", "light_block_14", "light_block_15", "light_block_2", "light_block_3", "light_block_4", "light_block_5", "light_block_6", "light_block_7", "light_block_8", "light_block_9", "light_blue_candle", "light_blue_candle_cake", "light_blue_carpet", "light_blue_concrete", "light_blue_concrete_powder", "light_blue_glazed_terracotta", "light_blue_shulker_box", "light_blue_stained_glass", "light_blue_stained_glass_pane", "light_blue_terracotta", "light_blue_wool", "light_gray_candle", "light_gray_candle_cake", "light_gray_carpet", "light_gray_concrete", "light_gray_concrete_powder", "light_gray_shulker_box", "light_gray_stained_glass", "light_gray_stained_glass_pane", "light_gray_terracotta", "light_gray_wool", "light_weighted_pressure_plate", "lightning_rod", "lilac", "lily_of_the_valley", "lime_candle", "lime_candle_cake", "lime_carpet", "lime_concrete", "lime_concrete_powder", "lime_glazed_terracotta", "lime_shulker_box", "lime_stained_glass", "lime_stained_glass_pane", "lime_terracotta", "lime_wool", "lit_blast_furnace", "lit_deepslate_redstone_ore", "lit_furnace", "lit_pumpkin", "lit_redstone_lamp", "lit_redstone_ore", "lit_smoker", "lodestone", "log", "log2", "loom", "magenta_candle", "magenta_candle_cake", "magenta_carpet", "magenta_concrete", "magenta_concrete_powder", "magenta_glazed_terracotta", "magenta_shulker_box", "magenta_stained_glass", "magenta_stained_glass_pane", "magenta_terracotta", "magenta_wool", "magma", "mangrove_button", "mangrove_door", "mangrove_double_slab", "mangrove_fence", "mangrove_fence_gate", "mangrove_hanging_sign", "mangrove_leaves", "mangrove_log", "mangrove_planks", "mangrove_pressure_plate", "mangrove_propagule", "mangrove_roots", "mangrove_slab", "mangrove_stairs", "mangrove_standing_sign", "mangrove_trapdoor", "mangrove_wall_sign", "mangrove_wood", "medium_amethyst_bud", "melon_block", "melon_stem", "mob_spawner", "monster_egg", "moss_block", "moss_carpet", "mossy_cobblestone", "mossy_cobblestone_double_slab", "mossy_cobblestone_slab", "mossy_cobblestone_stairs", "mossy_cobblestone_wall", "mossy_stone_brick_slab", "mossy_stone_brick_stairs", "mossy_stone_brick_wall", "mossy_stone_bricks", "movingBlock", "mud", "mud_brick_double_slab", "mud_brick_slab", "mud_brick_stairs", "mud_brick_wall", "mud_bricks", "muddy_mangrove_roots", "mushroom_stem", "mycelium", "nether_brick", "nether_brick_double_slab", "nether_brick_fence", "nether_brick_slab", "nether_brick_stairs", "nether_brick_wall", "nether_gold_ore", "nether_sprouts", "nether_wart", "nether_wart_block", "netherite_block", "netherrack", "netherreactor", "normal_stone_slab", "normal_stone_stairs", "noteblock", "oak_double_slab", "oak_fence", "oak_hanging_sign", "oak_leaves", "oak_log", "oak_sapling", "oak_slab", "oak_stairs", "oak_wood", "observer", "obsidian", "ochre_froglight", "open_eyeblossom", "orange_candle", "orange_candle_cake", "orange_carpet", "orange_concrete", "orange_concrete_powder", "orange_glazed_terracotta", "orange_shulker_box", "orange_stained_glass", "orange_stained_glass_pane", "orange_terracotta", "orange_tulip", "orange_wool", "oxeye_daisy", "oxidized_chiseled_copper", "oxidized_copper", "oxidized_copper_bulb", "oxidized_copper_door", "oxidized_copper_grate", "oxidized_copper_trapdoor", "oxidized_cut_copper", "oxidized_cut_copper_slab", "oxidized_cut_copper_stairs", "oxidized_double_cut_copper_slab", "packed_ice", "packed_mud", "pale_hanging_moss", "pale_moss_block", "pale_moss_carpet", "pale_oak_button", "pale_oak_door", "pale_oak_double_slab", "pale_oak_fence", "pale_oak_fence_gate", "pale_oak_hanging_sign", "pale_oak_leaves", "pale_oak_log", "pale_oak_planks", "pale_oak_pressure_plate", "pale_oak_sapling", "pale_oak_slab", "pale_oak_stairs", "pale_oak_standing_sign", "pale_oak_trapdoor", "pale_oak_wall_sign", "pale_oak_wood", "pearlescent_froglight", "peony", "petrified_oak_double_slab", "petrified_oak_slab", "piglin_head", "pink_candle", "pink_candle_cake", "pink_carpet", "pink_concrete", "pink_concrete_powder", "pink_glazed_terracotta", "pink_petals", "pink_shulker_box", "pink_stained_glass", "pink_stained_glass_pane", "pink_terracotta", "pink_tulip", "pink_wool", "piston", "pistonArmCollision", "pitcher_crop", "pitcher_plant", "planks", "player_head", "podzol", "pointed_dripstone", "polished_andesite", "polished_andesite_double_slab", "polished_andesite_slab", "polished_andesite_stairs", "polished_basalt", "polished_blackstone", "polished_blackstone_brick_double_slab", "polished_blackstone_brick_slab", "polished_blackstone_brick_stairs", "polished_blackstone_brick_wall", "polished_blackstone_bricks", "polished_blackstone_button", "polished_blackstone_double_slab", "polished_blackstone_pressure_plate", "polished_blackstone_slab", "polished_blackstone_stairs", "polished_blackstone_wall", "polished_deepslate", "polished_deepslate_double_slab", "polished_deepslate_slab", "polished_deepslate_stairs", "polished_deepslate_wall", "polished_diorite", "polished_diorite_double_slab", "polished_diorite_slab", "polished_diorite_stairs", "polished_granite", "polished_granite_double_slab", "polished_granite_slab", "polished_granite_stairs", "polished_tuff", "polished_tuff_double_slab", "polished_tuff_slab", "polished_tuff_stairs", "polished_tuff_wall", "poppy", "portal", "potatoes", "powder_snow", "powered_comparator", "powered_repeater", "prismarine", "prismarine_brick_double_slab", "prismarine_brick_slab", "prismarine_bricks", "prismarine_bricks_stairs", "prismarine_double_slab", "prismarine_slab", "prismarine_stairs", "prismarine_wall", "pumpkin", "pumpkin_stem", "purple_candle", "purple_candle_cake", "purple_carpet", "purple_concrete", "purple_concrete_powder", "purple_glazed_terracotta", "purple_shulker_box", "purple_stained_glass", "purple_stained_glass_pane", "purple_terracotta", "purple_wool", "purpur_block", "purpur_double_slab", "purpur_pillar", "purpur_slab", "purpur_stairs", "quartz_block", "quartz_bricks", "quartz_double_slab", "quartz_ore", "quartz_pillar", "quartz_slab", "quartz_stairs", "rail", "raw_copper_block", "raw_gold_block", "raw_iron_block", "red_candle", "red_candle_cake", "red_carpet", "red_concrete", "red_concrete_powder", "red_flower", "red_glazed_terracotta", "red_mushroom", "red_mushroom_block", "red_nether_brick", "red_nether_brick_double_slab", "red_nether_brick_slab", "red_nether_brick_stairs", "red_nether_brick_wall", "red_sand", "red_sandstone", "red_sandstone_double_slab", "red_sandstone_slab", "red_sandstone_stairs", "red_sandstone_wall", "red_shulker_box", "red_stained_glass", "red_stained_glass_pane", "red_terracotta", "red_tulip", "red_wool", "redstone_block", "redstone_lamp", "redstone_ore", "redstone_torch", "redstone_wire", "reeds", "reinforced_deepslate", "repeating_command_block", "reserved6", "resin_block", "resin_brick_double_slab", "resin_brick_slab", "resin_brick_stairs", "resin_brick_wall", "resin_bricks", "resin_clump", "respawn_anchor", "rose_bush", "sand", "sandstone", "sandstone_double_slab", "sandstone_slab", "sandstone_stairs", "sandstone_wall", "sapling", "scaffolding", "sculk", "sculk_catalyst", "sculk_sensor", "sculk_shrieker", "sculk_vein", "seaLantern", "sea_pickle", "seagrass", "short_grass", "shroomlight", "shulker_box", "silver_glazed_terracotta", "skeleton_skull", "skull", "slime", "small_amethyst_bud", "small_dripleaf_block", "smithing_table", "smoker", "smooth_basalt", "smooth_quartz", "smooth_quartz_slab", "smooth_quartz_stairs", "smooth_red_sandstone", "smooth_red_sandstone_double_slab", "smooth_red_sandstone_slab", "smooth_red_sandstone_stairs", "smooth_sandstone", "smooth_sandstone_double_slab", "smooth_sandstone_slab", "smooth_sandstone_stairs", "smooth_stone", "smooth_stone_double_slab", "smooth_stone_slab", "sniffer_egg", "snow", "snow_layer", "soul_campfire", "soul_fire", "soul_lantern", "soul_sand", "soul_soil", "soul_torch", "sponge", "spore_blossom", "spruce_button", "spruce_door", "spruce_double_slab", "spruce_fence", "spruce_fence_gate", "spruce_hanging_sign", "spruce_leaves", "spruce_log", "spruce_pressure_plate", "spruce_sapling", "spruce_slab", "spruce_stairs", "spruce_standing_sign", "spruce_trapdoor", "spruce_wall_sign", "spruce_wood", "stained_glass", "stained_glass_pane", "stained_hardened_clay", "standing_banner", "standing_sign", "stickyPistonArmCollision", "sticky_piston", "stone", "stone_brick_double_slab", "stone_brick_slab", "stone_brick_stairs", "stone_brick_wall", "stone_bricks", "stone_button", "stone_pressure_plate", "stone_slab", "stone_slab2", "stone_slab3", "stone_slab4", "stone_stairs", "stonebrick", "stonecutter", "stonecutter_block", "stripped_acacia_log", "stripped_acacia_wood", "stripped_bamboo_block", "stripped_birch_log", "stripped_birch_wood", "stripped_cherry_log", "stripped_cherry_wood", "stripped_crimson_hyphae", "stripped_crimson_stem", "stripped_dark_oak_log", "stripped_dark_oak_wood", "stripped_jungle_log", "stripped_jungle_wood", "stripped_mangrove_log", "stripped_mangrove_wood", "stripped_oak_log", "stripped_oak_wood", "stripped_pale_oak_log", "stripped_pale_oak_wood", "stripped_spruce_log", "stripped_spruce_wood", "stripped_warped_hyphae", "stripped_warped_stem", "structure_block", "structure_void", "sunflower", "suspicious_gravel", "suspicious_sand", "sweet_berry_bush", "tall_grass", "tallgrass", "target", "tinted_glass", "tnt", "torch", "torchflower", "torchflower_crop", "trapdoor", "trapped_chest", "trial_spawner", "tripWire", "tripwire_hook", "tube_coral", "tube_coral_block", "tube_coral_fan", "tube_coral_wall_fan", "tuff", "tuff_brick_double_slab", "tuff_brick_slab", "tuff_brick_stairs", "tuff_brick_wall", "tuff_bricks", "tuff_double_slab", "tuff_slab", "tuff_stairs", "tuff_wall", "turtle_egg", "twisting_vines", "undyed_shulker_box", "unlit_redstone_torch", "unpowered_comparator", "unpowered_repeater", "vault", "verdant_froglight", "vine", "wall_banner", "wall_sign", "warped_button", "warped_door", "warped_double_slab", "warped_fence", "warped_fence_gate", "warped_fungus", "warped_hanging_sign", "warped_hyphae", "warped_nylium", "warped_planks", "warped_pressure_plate", "warped_roots", "warped_slab", "warped_stairs", "warped_standing_sign", "warped_stem", "warped_trapdoor", "warped_wall_sign", "warped_wart_block", "water", "waterlily", "waxed_chiseled_copper", "waxed_copper", "waxed_copper_bulb", "waxed_copper_door", "waxed_copper_grate", "waxed_copper_trapdoor", "waxed_cut_copper", "waxed_cut_copper_slab", "waxed_cut_copper_stairs", "waxed_double_cut_copper_slab", "waxed_exposed_chiseled_copper", "waxed_exposed_copper", "waxed_exposed_copper_bulb", "waxed_exposed_copper_door", "waxed_exposed_copper_grate", "waxed_exposed_copper_trapdoor", "waxed_exposed_cut_copper", "waxed_exposed_cut_copper_slab", "waxed_exposed_cut_copper_stairs", "waxed_exposed_double_cut_copper_slab", "waxed_oxidized_chiseled_copper", "waxed_oxidized_copper", "waxed_oxidized_copper_bulb", "waxed_oxidized_copper_door", "waxed_oxidized_copper_grate", "waxed_oxidized_copper_trapdoor", "waxed_oxidized_cut_copper", "waxed_oxidized_cut_copper_slab", "waxed_oxidized_cut_copper_stairs", "waxed_oxidized_double_cut_copper_slab", "waxed_weathered_chiseled_copper", "waxed_weathered_copper", "waxed_weathered_copper_bulb", "waxed_weathered_copper_door", "waxed_weathered_copper_grate", "waxed_weathered_copper_trapdoor", "waxed_weathered_cut_copper", "waxed_weathered_cut_copper_slab", "waxed_weathered_cut_copper_stairs", "waxed_weathered_double_cut_copper_slab", "weathered_chiseled_copper", "weathered_copper", "weathered_copper_bulb", "weathered_copper_door", "weathered_copper_grate", "weathered_copper_trapdoor", "weathered_cut_copper", "weathered_cut_copper_slab", "weathered_cut_copper_stairs", "weathered_double_cut_copper_slab", "web", "weeping_vines", "wet_sponge", "wheat", "white_candle", "white_candle_cake", "white_carpet", "white_concrete", "white_concrete_powder", "white_glazed_terracotta", "white_shulker_box", "white_stained_glass", "white_stained_glass_pane", "white_terracotta", "white_tulip", "white_wool", "wither_rose", "wither_skeleton_skull", "wood", "wooden_button", "wooden_door", "wooden_pressure_plate", "wooden_slab", "wool", "yellow_candle", "yellow_candle_cake", "yellow_carpet", "yellow_concrete", "yellow_concrete_powder", "yellow_flower", "yellow_glazed_terracotta", "yellow_shulker_box", "yellow_stained_glass", "yellow_stained_glass_pane", "yellow_terracotta", "yellow_wool", "zombie_head"]}}')
}

function giveblock (source) {
source.runCommand('give @s bot:block 64 0 {"minecraft:can_place_on": {"blocks": ["bot:block", "acacia_button", "acacia_door", "acacia_double_slab", "acacia_fence", "acacia_fence_gate", "acacia_hanging_sign", "acacia_leaves", "acacia_log", "acacia_pressure_plate", "acacia_sapling", "acacia_slab", "acacia_stairs", "acacia_standing_sign", "acacia_trapdoor", "acacia_wall_sign", "acacia_wood", "activator_rail", "air", "allium", "allow", "amethyst_block", "amethyst_cluster", "ancient_debris", "andesite", "andesite_double_slab", "andesite_slab", "andesite_stairs", "andesite_wall", "anvil", "azalea", "azalea_leaves", "azalea_leaves_flowered", "azure_bluet", "bamboo", "bamboo_block", "bamboo_button", "bamboo_door", "bamboo_double_slab", "bamboo_fence", "bamboo_fence_gate", "bamboo_hanging_sign", "bamboo_mosaic", "bamboo_mosaic_double_slab", "bamboo_mosaic_slab", "bamboo_mosaic_stairs", "bamboo_planks", "bamboo_pressure_plate", "bamboo_sapling", "bamboo_slab", "bamboo_stairs", "bamboo_standing_sign", "bamboo_trapdoor", "bamboo_wall_sign", "barrel", "basalt", "beacon", "bed", "bedrock", "bee_nest", "beehive", "beetroot", "bell", "big_dripleaf", "birch_button", "birch_door", "birch_double_slab", "birch_fence", "birch_fence_gate", "birch_hanging_sign", "birch_leaves", "birch_log", "birch_pressure_plate", "birch_sapling", "birch_slab", "birch_stairs", "birch_standing_sign", "birch_trapdoor", "birch_wall_sign", "birch_wood", "black_candle", "black_candle_cake", "black_carpet", "black_concrete", "black_concrete_powder", "black_glazed_terracotta", "black_shulker_box", "black_stained_glass", "black_stained_glass_pane", "black_terracotta", "black_wool", "blackstone", "blackstone_double_slab", "blackstone_slab", "blackstone_stairs", "blackstone_wall", "blast_furnace", "blue_candle", "blue_candle_cake", "blue_carpet", "blue_concrete", "blue_concrete_powder", "blue_glazed_terracotta", "blue_ice", "blue_orchid", "blue_shulker_box", "blue_stained_glass", "blue_stained_glass_pane", "blue_terracotta", "blue_wool", "bone_block", "bookshelf", "border_block", "brain_coral", "brain_coral_block", "brain_coral_fan", "brain_coral_wall_fan", "brewing_stand", "brick_block", "brick_double_slab", "brick_slab", "brick_stairs", "brick_wall", "brown_candle", "brown_candle_cake", "brown_carpet", "brown_concrete", "brown_concrete_powder", "brown_glazed_terracotta", "brown_mushroom", "brown_mushroom_block", "brown_shulker_box", "brown_stained_glass", "brown_stained_glass_pane", "brown_terracotta", "brown_wool", "bubble_column", "bubble_coral", "bubble_coral_block", "bubble_coral_fan", "bubble_coral_wall_fan", "budding_amethyst", "cactus", "cake", "calcite", "calibrated_sculk_sensor", "camera", "campfire", "candle", "candle_cake", "carpet", "carrots", "cartography_table", "carved_pumpkin", "cauldron", "cave_vines", "cave_vines_body_with_berries", "cave_vines_head_with_berries", "chain", "chain_command_block", "cherry_button", "cherry_door", "cherry_double_slab", "cherry_fence", "cherry_fence_gate", "cherry_hanging_sign", "cherry_leaves", "cherry_log", "cherry_planks", "cherry_pressure_plate", "cherry_sapling", "cherry_slab", "cherry_stairs", "cherry_standing_sign", "cherry_trapdoor", "cherry_wall_sign", "cherry_wood", "chest", "chipped_anvil", "chiseled_bookshelf", "chiseled_copper", "chiseled_deepslate", "chiseled_nether_bricks", "chiseled_polished_blackstone", "chiseled_quartz_block", "chiseled_red_sandstone", "chiseled_resin_bricks", "chiseled_sandstone", "chiseled_stone_bricks", "chiseled_tuff", "chiseled_tuff_bricks", "chorus_flower", "chorus_plant", "clay", "closed_eyeblossom", "coal_block", "coal_ore", "coarse_dirt", "cobbled_deepslate", "cobbled_deepslate_double_slab", "cobbled_deepslate_slab", "cobbled_deepslate_stairs", "cobbled_deepslate_wall", "cobblestone", "cobblestone_double_slab", "cobblestone_slab", "cobblestone_wall", "cocoa", "command_block", "composter", "concrete", "concretePowder", "conduit", "copper_block", "copper_bulb", "copper_door", "copper_grate", "copper_ore", "copper_trapdoor", "coral", "coral_block", "coral_fan", "coral_fan_dead", "coral_fan_hang", "coral_fan_hang2", "coral_fan_hang3", "cornflower", "cracked_deepslate_bricks", "cracked_deepslate_tiles", "cracked_nether_bricks", "cracked_polished_blackstone_bricks", "cracked_stone_bricks", "crafter", "crafting_table", "creaking_heart", "creeper_head", "crimson_button", "crimson_door", "crimson_double_slab", "crimson_fence", "crimson_fence_gate", "crimson_fungus", "crimson_hanging_sign", "crimson_hyphae", "crimson_nylium", "crimson_planks", "crimson_pressure_plate", "crimson_roots", "crimson_slab", "crimson_stairs", "crimson_standing_sign", "crimson_stem", "crimson_trapdoor", "crimson_wall_sign", "crying_obsidian", "cut_copper", "cut_copper_slab", "cut_copper_stairs", "cut_red_sandstone", "cut_red_sandstone_slab", "cut_sandstone", "cut_sandstone_slab", "cyan_candle", "cyan_candle_cake", "cyan_carpet", "cyan_concrete", "cyan_concrete_powder", "cyan_glazed_terracotta", "cyan_shulker_box", "cyan_stained_glass", "cyan_stained_glass_pane", "cyan_terracotta", "cyan_wool", "damaged_anvil", "dandelion", "dark_oak_button", "dark_oak_door", "dark_oak_double_slab", "dark_oak_fence", "dark_oak_fence_gate", "dark_oak_hanging_sign", "dark_oak_leaves", "dark_oak_log", "dark_oak_pressure_plate", "dark_oak_sapling", "dark_oak_slab", "dark_oak_stairs", "dark_oak_trapdoor", "dark_oak_wood", "dark_prismarine", "dark_prismarine_double_slab", "dark_prismarine_slab", "dark_prismarine_stairs", "darkoak_standing_sign", "darkoak_wall_sign", "daylight_detector", "daylight_detector_inverted", "dead_brain_coral", "dead_brain_coral_block", "dead_brain_coral_fan", "dead_brain_coral_wall_fan", "dead_bubble_coral", "dead_bubble_coral_block", "dead_bubble_coral_fan", "dead_bubble_coral_wall_fan", "dead_fire_coral", "dead_fire_coral_block", "dead_fire_coral_fan", "dead_fire_coral_wall_fan", "dead_horn_coral", "dead_horn_coral_block", "dead_horn_coral_fan", "dead_horn_coral_wall_fan", "dead_tube_coral", "dead_tube_coral_block", "dead_tube_coral_fan", "dead_tube_coral_wall_fan", "deadbush", "decorated_pot", "deepslate", "deepslate_brick_double_slab", "deepslate_brick_slab", "deepslate_brick_stairs", "deepslate_brick_wall", "deepslate_bricks", "deepslate_coal_ore", "deepslate_copper_ore", "deepslate_diamond_ore", "deepslate_emerald_ore", "deepslate_gold_ore", "deepslate_iron_ore", "deepslate_lapis_ore", "deepslate_redstone_ore", "deepslate_tile_double_slab", "deepslate_tile_slab", "deepslate_tile_stairs", "deepslate_tile_wall", "deepslate_tiles", "deny", "deprecated_anvil", "deprecated_purpur_block_1", "deprecated_purpur_block_2", "detector_rail", "diamond_block", "diamond_ore", "diorite", "diorite_double_slab", "diorite_slab", "diorite_stairs", "diorite_wall", "dirt", "dirt_with_roots", "dispenser", "double_cut_copper_slab", "double_plant", "double_stone_slab", "double_stone_slab2", "double_stone_slab3", "double_stone_slab4", "double_wooden_slab", "dragon_egg", "dragon_head", "dried_kelp_block", "dripstone_block", "dropper", "emerald_block", "emerald_ore", "enchanting_table", "end_brick_stairs", "end_bricks", "end_gateway", "end_portal", "end_portal_frame", "end_rod", "end_stone", "end_stone_brick_double_slab", "end_stone_brick_slab", "end_stone_brick_wall", "ender_chest", "exposed_chiseled_copper", "exposed_copper", "exposed_copper_bulb", "exposed_copper_door", "exposed_copper_grate", "exposed_copper_trapdoor", "exposed_cut_copper", "exposed_cut_copper_slab", "exposed_cut_copper_stairs", "exposed_double_cut_copper_slab", "farmland", "fence", "fence_gate", "fern", "fire", "fire_coral", "fire_coral_block", "fire_coral_fan", "fire_coral_wall_fan", "fletching_table", "flower_pot", "flowering_azalea", "flowing_lava", "flowing_water", "frame", "frog_spawn", "frosted_ice", "furnace", "gilded_blackstone", "glass", "glass_pane", "glow_frame", "glow_lichen", "glowingobsidian", "glowstone", "gold_block", "gold_ore", "golden_rail", "granite", "granite_double_slab", "granite_slab", "granite_stairs", "granite_wall", "grass", "grass_path", "gravel", "gray_candle", "gray_candle_cake", "gray_carpet", "gray_concrete", "gray_concrete_powder", "gray_glazed_terracotta", "gray_shulker_box", "gray_stained_glass", "gray_stained_glass_pane", "gray_terracotta", "gray_wool", "green_candle", "green_candle_cake", "green_carpet", "green_concrete", "green_concrete_powder", "green_glazed_terracotta", "green_shulker_box", "green_stained_glass", "green_stained_glass_pane", "green_terracotta", "green_wool", "grindstone", "hanging_roots", "hardened_clay", "hay_block", "heavy_core", "heavy_weighted_pressure_plate", "honey_block", "honeycomb_block", "hopper", "horn_coral", "horn_coral_block", "horn_coral_fan", "horn_coral_wall_fan", "ice", "infested_chiseled_stone_bricks", "infested_cobblestone", "infested_cracked_stone_bricks", "infested_deepslate", "infested_mossy_stone_bricks", "infested_stone", "infested_stone_bricks", "info_update", "info_update2", "invisibleBedrock", "iron_bars", "iron_block", "iron_door", "iron_ore", "iron_trapdoor", "jigsaw", "jukebox", "jungle_button", "jungle_door", "jungle_double_slab", "jungle_fence", "jungle_fence_gate", "jungle_hanging_sign", "jungle_leaves", "jungle_log", "jungle_pressure_plate", "jungle_sapling", "jungle_slab", "jungle_stairs", "jungle_standing_sign", "jungle_trapdoor", "jungle_wall_sign", "jungle_wood", "kelp", "ladder", "lantern", "lapis_block", "lapis_ore", "large_amethyst_bud", "large_fern", "lava", "lava_cauldron", "leaves", "leaves2", "lectern", "lever", "light_block", "light_block_0", "light_block_1", "light_block_10", "light_block_11", "light_block_12", "light_block_13", "light_block_14", "light_block_15", "light_block_2", "light_block_3", "light_block_4", "light_block_5", "light_block_6", "light_block_7", "light_block_8", "light_block_9", "light_blue_candle", "light_blue_candle_cake", "light_blue_carpet", "light_blue_concrete", "light_blue_concrete_powder", "light_blue_glazed_terracotta", "light_blue_shulker_box", "light_blue_stained_glass", "light_blue_stained_glass_pane", "light_blue_terracotta", "light_blue_wool", "light_gray_candle", "light_gray_candle_cake", "light_gray_carpet", "light_gray_concrete", "light_gray_concrete_powder", "light_gray_shulker_box", "light_gray_stained_glass", "light_gray_stained_glass_pane", "light_gray_terracotta", "light_gray_wool", "light_weighted_pressure_plate", "lightning_rod", "lilac", "lily_of_the_valley", "lime_candle", "lime_candle_cake", "lime_carpet", "lime_concrete", "lime_concrete_powder", "lime_glazed_terracotta", "lime_shulker_box", "lime_stained_glass", "lime_stained_glass_pane", "lime_terracotta", "lime_wool", "lit_blast_furnace", "lit_deepslate_redstone_ore", "lit_furnace", "lit_pumpkin", "lit_redstone_lamp", "lit_redstone_ore", "lit_smoker", "lodestone", "log", "log2", "loom", "magenta_candle", "magenta_candle_cake", "magenta_carpet", "magenta_concrete", "magenta_concrete_powder", "magenta_glazed_terracotta", "magenta_shulker_box", "magenta_stained_glass", "magenta_stained_glass_pane", "magenta_terracotta", "magenta_wool", "magma", "mangrove_button", "mangrove_door", "mangrove_double_slab", "mangrove_fence", "mangrove_fence_gate", "mangrove_hanging_sign", "mangrove_leaves", "mangrove_log", "mangrove_planks", "mangrove_pressure_plate", "mangrove_propagule", "mangrove_roots", "mangrove_slab", "mangrove_stairs", "mangrove_standing_sign", "mangrove_trapdoor", "mangrove_wall_sign", "mangrove_wood", "medium_amethyst_bud", "melon_block", "melon_stem", "mob_spawner", "monster_egg", "moss_block", "moss_carpet", "mossy_cobblestone", "mossy_cobblestone_double_slab", "mossy_cobblestone_slab", "mossy_cobblestone_stairs", "mossy_cobblestone_wall", "mossy_stone_brick_slab", "mossy_stone_brick_stairs", "mossy_stone_brick_wall", "mossy_stone_bricks", "movingBlock", "mud", "mud_brick_double_slab", "mud_brick_slab", "mud_brick_stairs", "mud_brick_wall", "mud_bricks", "muddy_mangrove_roots", "mushroom_stem", "mycelium", "nether_brick", "nether_brick_double_slab", "nether_brick_fence", "nether_brick_slab", "nether_brick_stairs", "nether_brick_wall", "nether_gold_ore", "nether_sprouts", "nether_wart", "nether_wart_block", "netherite_block", "netherrack", "netherreactor", "normal_stone_slab", "normal_stone_stairs", "noteblock", "oak_double_slab", "oak_fence", "oak_hanging_sign", "oak_leaves", "oak_log", "oak_sapling", "oak_slab", "oak_stairs", "oak_wood", "observer", "obsidian", "ochre_froglight", "open_eyeblossom", "orange_candle", "orange_candle_cake", "orange_carpet", "orange_concrete", "orange_concrete_powder", "orange_glazed_terracotta", "orange_shulker_box", "orange_stained_glass", "orange_stained_glass_pane", "orange_terracotta", "orange_tulip", "orange_wool", "oxeye_daisy", "oxidized_chiseled_copper", "oxidized_copper", "oxidized_copper_bulb", "oxidized_copper_door", "oxidized_copper_grate", "oxidized_copper_trapdoor", "oxidized_cut_copper", "oxidized_cut_copper_slab", "oxidized_cut_copper_stairs", "oxidized_double_cut_copper_slab", "packed_ice", "packed_mud", "pale_hanging_moss", "pale_moss_block", "pale_moss_carpet", "pale_oak_button", "pale_oak_door", "pale_oak_double_slab", "pale_oak_fence", "pale_oak_fence_gate", "pale_oak_hanging_sign", "pale_oak_leaves", "pale_oak_log", "pale_oak_planks", "pale_oak_pressure_plate", "pale_oak_sapling", "pale_oak_slab", "pale_oak_stairs", "pale_oak_standing_sign", "pale_oak_trapdoor", "pale_oak_wall_sign", "pale_oak_wood", "pearlescent_froglight", "peony", "petrified_oak_double_slab", "petrified_oak_slab", "piglin_head", "pink_candle", "pink_candle_cake", "pink_carpet", "pink_concrete", "pink_concrete_powder", "pink_glazed_terracotta", "pink_petals", "pink_shulker_box", "pink_stained_glass", "pink_stained_glass_pane", "pink_terracotta", "pink_tulip", "pink_wool", "piston", "pistonArmCollision", "pitcher_crop", "pitcher_plant", "planks", "player_head", "podzol", "pointed_dripstone", "polished_andesite", "polished_andesite_double_slab", "polished_andesite_slab", "polished_andesite_stairs", "polished_basalt", "polished_blackstone", "polished_blackstone_brick_double_slab", "polished_blackstone_brick_slab", "polished_blackstone_brick_stairs", "polished_blackstone_brick_wall", "polished_blackstone_bricks", "polished_blackstone_button", "polished_blackstone_double_slab", "polished_blackstone_pressure_plate", "polished_blackstone_slab", "polished_blackstone_stairs", "polished_blackstone_wall", "polished_deepslate", "polished_deepslate_double_slab", "polished_deepslate_slab", "polished_deepslate_stairs", "polished_deepslate_wall", "polished_diorite", "polished_diorite_double_slab", "polished_diorite_slab", "polished_diorite_stairs", "polished_granite", "polished_granite_double_slab", "polished_granite_slab", "polished_granite_stairs", "polished_tuff", "polished_tuff_double_slab", "polished_tuff_slab", "polished_tuff_stairs", "polished_tuff_wall", "poppy", "portal", "potatoes", "powder_snow", "powered_comparator", "powered_repeater", "prismarine", "prismarine_brick_double_slab", "prismarine_brick_slab", "prismarine_bricks", "prismarine_bricks_stairs", "prismarine_double_slab", "prismarine_slab", "prismarine_stairs", "prismarine_wall", "pumpkin", "pumpkin_stem", "purple_candle", "purple_candle_cake", "purple_carpet", "purple_concrete", "purple_concrete_powder", "purple_glazed_terracotta", "purple_shulker_box", "purple_stained_glass", "purple_stained_glass_pane", "purple_terracotta", "purple_wool", "purpur_block", "purpur_double_slab", "purpur_pillar", "purpur_slab", "purpur_stairs", "quartz_block", "quartz_bricks", "quartz_double_slab", "quartz_ore", "quartz_pillar", "quartz_slab", "quartz_stairs", "rail", "raw_copper_block", "raw_gold_block", "raw_iron_block", "red_candle", "red_candle_cake", "red_carpet", "red_concrete", "red_concrete_powder", "red_flower", "red_glazed_terracotta", "red_mushroom", "red_mushroom_block", "red_nether_brick", "red_nether_brick_double_slab", "red_nether_brick_slab", "red_nether_brick_stairs", "red_nether_brick_wall", "red_sand", "red_sandstone", "red_sandstone_double_slab", "red_sandstone_slab", "red_sandstone_stairs", "red_sandstone_wall", "red_shulker_box", "red_stained_glass", "red_stained_glass_pane", "red_terracotta", "red_tulip", "red_wool", "redstone_block", "redstone_lamp", "redstone_ore", "redstone_torch", "redstone_wire", "reeds", "reinforced_deepslate", "repeating_command_block", "reserved6", "resin_block", "resin_brick_double_slab", "resin_brick_slab", "resin_brick_stairs", "resin_brick_wall", "resin_bricks", "resin_clump", "respawn_anchor", "rose_bush", "sand", "sandstone", "sandstone_double_slab", "sandstone_slab", "sandstone_stairs", "sandstone_wall", "sapling", "scaffolding", "sculk", "sculk_catalyst", "sculk_sensor", "sculk_shrieker", "sculk_vein", "seaLantern", "sea_pickle", "seagrass", "short_grass", "shroomlight", "shulker_box", "silver_glazed_terracotta", "skeleton_skull", "skull", "slime", "small_amethyst_bud", "small_dripleaf_block", "smithing_table", "smoker", "smooth_basalt", "smooth_quartz", "smooth_quartz_slab", "smooth_quartz_stairs", "smooth_red_sandstone", "smooth_red_sandstone_double_slab", "smooth_red_sandstone_slab", "smooth_red_sandstone_stairs", "smooth_sandstone", "smooth_sandstone_double_slab", "smooth_sandstone_slab", "smooth_sandstone_stairs", "smooth_stone", "smooth_stone_double_slab", "smooth_stone_slab", "sniffer_egg", "snow", "snow_layer", "soul_campfire", "soul_fire", "soul_lantern", "soul_sand", "soul_soil", "soul_torch", "sponge", "spore_blossom", "spruce_button", "spruce_door", "spruce_double_slab", "spruce_fence", "spruce_fence_gate", "spruce_hanging_sign", "spruce_leaves", "spruce_log", "spruce_pressure_plate", "spruce_sapling", "spruce_slab", "spruce_stairs", "spruce_standing_sign", "spruce_trapdoor", "spruce_wall_sign", "spruce_wood", "stained_glass", "stained_glass_pane", "stained_hardened_clay", "standing_banner", "standing_sign", "stickyPistonArmCollision", "sticky_piston", "stone", "stone_brick_double_slab", "stone_brick_slab", "stone_brick_stairs", "stone_brick_wall", "stone_bricks", "stone_button", "stone_pressure_plate", "stone_slab", "stone_slab2", "stone_slab3", "stone_slab4", "stone_stairs", "stonebrick", "stonecutter", "stonecutter_block", "stripped_acacia_log", "stripped_acacia_wood", "stripped_bamboo_block", "stripped_birch_log", "stripped_birch_wood", "stripped_cherry_log", "stripped_cherry_wood", "stripped_crimson_hyphae", "stripped_crimson_stem", "stripped_dark_oak_log", "stripped_dark_oak_wood", "stripped_jungle_log", "stripped_jungle_wood", "stripped_mangrove_log", "stripped_mangrove_wood", "stripped_oak_log", "stripped_oak_wood", "stripped_pale_oak_log", "stripped_pale_oak_wood", "stripped_spruce_log", "stripped_spruce_wood", "stripped_warped_hyphae", "stripped_warped_stem", "structure_block", "structure_void", "sunflower", "suspicious_gravel", "suspicious_sand", "sweet_berry_bush", "tall_grass", "tallgrass", "target", "tinted_glass", "tnt", "torch", "torchflower", "torchflower_crop", "trapdoor", "trapped_chest", "trial_spawner", "tripWire", "tripwire_hook", "tube_coral", "tube_coral_block", "tube_coral_fan", "tube_coral_wall_fan", "tuff", "tuff_brick_double_slab", "tuff_brick_slab", "tuff_brick_stairs", "tuff_brick_wall", "tuff_bricks", "tuff_double_slab", "tuff_slab", "tuff_stairs", "tuff_wall", "turtle_egg", "twisting_vines", "undyed_shulker_box", "unlit_redstone_torch", "unpowered_comparator", "unpowered_repeater", "vault", "verdant_froglight", "vine", "wall_banner", "wall_sign", "warped_button", "warped_door", "warped_double_slab", "warped_fence", "warped_fence_gate", "warped_fungus", "warped_hanging_sign", "warped_hyphae", "warped_nylium", "warped_planks", "warped_pressure_plate", "warped_roots", "warped_slab", "warped_stairs", "warped_standing_sign", "warped_stem", "warped_trapdoor", "warped_wall_sign", "warped_wart_block", "water", "waterlily", "waxed_chiseled_copper", "waxed_copper", "waxed_copper_bulb", "waxed_copper_door", "waxed_copper_grate", "waxed_copper_trapdoor", "waxed_cut_copper", "waxed_cut_copper_slab", "waxed_cut_copper_stairs", "waxed_double_cut_copper_slab", "waxed_exposed_chiseled_copper", "waxed_exposed_copper", "waxed_exposed_copper_bulb", "waxed_exposed_copper_door", "waxed_exposed_copper_grate", "waxed_exposed_copper_trapdoor", "waxed_exposed_cut_copper", "waxed_exposed_cut_copper_slab", "waxed_exposed_cut_copper_stairs", "waxed_exposed_double_cut_copper_slab", "waxed_oxidized_chiseled_copper", "waxed_oxidized_copper", "waxed_oxidized_copper_bulb", "waxed_oxidized_copper_door", "waxed_oxidized_copper_grate", "waxed_oxidized_copper_trapdoor", "waxed_oxidized_cut_copper", "waxed_oxidized_cut_copper_slab", "waxed_oxidized_cut_copper_stairs", "waxed_oxidized_double_cut_copper_slab", "waxed_weathered_chiseled_copper", "waxed_weathered_copper", "waxed_weathered_copper_bulb", "waxed_weathered_copper_door", "waxed_weathered_copper_grate", "waxed_weathered_copper_trapdoor", "waxed_weathered_cut_copper", "waxed_weathered_cut_copper_slab", "waxed_weathered_cut_copper_stairs", "waxed_weathered_double_cut_copper_slab", "weathered_chiseled_copper", "weathered_copper", "weathered_copper_bulb", "weathered_copper_door", "weathered_copper_grate", "weathered_copper_trapdoor", "weathered_cut_copper", "weathered_cut_copper_slab", "weathered_cut_copper_stairs", "weathered_double_cut_copper_slab", "web", "weeping_vines", "wet_sponge", "wheat", "white_candle", "white_candle_cake", "white_carpet", "white_concrete", "white_concrete_powder", "white_glazed_terracotta", "white_shulker_box", "white_stained_glass", "white_stained_glass_pane", "white_terracotta", "white_tulip", "white_wool", "wither_rose", "wither_skeleton_skull", "wood", "wooden_button", "wooden_door", "wooden_pressure_plate", "wooden_slab", "wool", "yellow_candle", "yellow_candle_cake", "yellow_carpet", "yellow_concrete", "yellow_concrete_powder", "yellow_flower", "yellow_glazed_terracotta", "yellow_shulker_box", "yellow_stained_glass", "yellow_stained_glass_pane", "yellow_terracotta", "yellow_wool", "zombie_head"]}}');
}

function give1block (source) {
if (source.getGameMode() === "Creative") return;
source.runCommand('give @s bot:block 1 0 {"minecraft:can_place_on": {"blocks": ["bot:block", "acacia_button", "acacia_door", "acacia_double_slab", "acacia_fence", "acacia_fence_gate", "acacia_hanging_sign", "acacia_leaves", "acacia_log", "acacia_pressure_plate", "acacia_sapling", "acacia_slab", "acacia_stairs", "acacia_standing_sign", "acacia_trapdoor", "acacia_wall_sign", "acacia_wood", "activator_rail", "air", "allium", "allow", "amethyst_block", "amethyst_cluster", "ancient_debris", "andesite", "andesite_double_slab", "andesite_slab", "andesite_stairs", "andesite_wall", "anvil", "azalea", "azalea_leaves", "azalea_leaves_flowered", "azure_bluet", "bamboo", "bamboo_block", "bamboo_button", "bamboo_door", "bamboo_double_slab", "bamboo_fence", "bamboo_fence_gate", "bamboo_hanging_sign", "bamboo_mosaic", "bamboo_mosaic_double_slab", "bamboo_mosaic_slab", "bamboo_mosaic_stairs", "bamboo_planks", "bamboo_pressure_plate", "bamboo_sapling", "bamboo_slab", "bamboo_stairs", "bamboo_standing_sign", "bamboo_trapdoor", "bamboo_wall_sign", "barrel", "basalt", "beacon", "bed", "bedrock", "bee_nest", "beehive", "beetroot", "bell", "big_dripleaf", "birch_button", "birch_door", "birch_double_slab", "birch_fence", "birch_fence_gate", "birch_hanging_sign", "birch_leaves", "birch_log", "birch_pressure_plate", "birch_sapling", "birch_slab", "birch_stairs", "birch_standing_sign", "birch_trapdoor", "birch_wall_sign", "birch_wood", "black_candle", "black_candle_cake", "black_carpet", "black_concrete", "black_concrete_powder", "black_glazed_terracotta", "black_shulker_box", "black_stained_glass", "black_stained_glass_pane", "black_terracotta", "black_wool", "blackstone", "blackstone_double_slab", "blackstone_slab", "blackstone_stairs", "blackstone_wall", "blast_furnace", "blue_candle", "blue_candle_cake", "blue_carpet", "blue_concrete", "blue_concrete_powder", "blue_glazed_terracotta", "blue_ice", "blue_orchid", "blue_shulker_box", "blue_stained_glass", "blue_stained_glass_pane", "blue_terracotta", "blue_wool", "bone_block", "bookshelf", "border_block", "brain_coral", "brain_coral_block", "brain_coral_fan", "brain_coral_wall_fan", "brewing_stand", "brick_block", "brick_double_slab", "brick_slab", "brick_stairs", "brick_wall", "brown_candle", "brown_candle_cake", "brown_carpet", "brown_concrete", "brown_concrete_powder", "brown_glazed_terracotta", "brown_mushroom", "brown_mushroom_block", "brown_shulker_box", "brown_stained_glass", "brown_stained_glass_pane", "brown_terracotta", "brown_wool", "bubble_column", "bubble_coral", "bubble_coral_block", "bubble_coral_fan", "bubble_coral_wall_fan", "budding_amethyst", "cactus", "cake", "calcite", "calibrated_sculk_sensor", "camera", "campfire", "candle", "candle_cake", "carpet", "carrots", "cartography_table", "carved_pumpkin", "cauldron", "cave_vines", "cave_vines_body_with_berries", "cave_vines_head_with_berries", "chain", "chain_command_block", "cherry_button", "cherry_door", "cherry_double_slab", "cherry_fence", "cherry_fence_gate", "cherry_hanging_sign", "cherry_leaves", "cherry_log", "cherry_planks", "cherry_pressure_plate", "cherry_sapling", "cherry_slab", "cherry_stairs", "cherry_standing_sign", "cherry_trapdoor", "cherry_wall_sign", "cherry_wood", "chest", "chipped_anvil", "chiseled_bookshelf", "chiseled_copper", "chiseled_deepslate", "chiseled_nether_bricks", "chiseled_polished_blackstone", "chiseled_quartz_block", "chiseled_red_sandstone", "chiseled_resin_bricks", "chiseled_sandstone", "chiseled_stone_bricks", "chiseled_tuff", "chiseled_tuff_bricks", "chorus_flower", "chorus_plant", "clay", "closed_eyeblossom", "coal_block", "coal_ore", "coarse_dirt", "cobbled_deepslate", "cobbled_deepslate_double_slab", "cobbled_deepslate_slab", "cobbled_deepslate_stairs", "cobbled_deepslate_wall", "cobblestone", "cobblestone_double_slab", "cobblestone_slab", "cobblestone_wall", "cocoa", "command_block", "composter", "concrete", "concretePowder", "conduit", "copper_block", "copper_bulb", "copper_door", "copper_grate", "copper_ore", "copper_trapdoor", "coral", "coral_block", "coral_fan", "coral_fan_dead", "coral_fan_hang", "coral_fan_hang2", "coral_fan_hang3", "cornflower", "cracked_deepslate_bricks", "cracked_deepslate_tiles", "cracked_nether_bricks", "cracked_polished_blackstone_bricks", "cracked_stone_bricks", "crafter", "crafting_table", "creaking_heart", "creeper_head", "crimson_button", "crimson_door", "crimson_double_slab", "crimson_fence", "crimson_fence_gate", "crimson_fungus", "crimson_hanging_sign", "crimson_hyphae", "crimson_nylium", "crimson_planks", "crimson_pressure_plate", "crimson_roots", "crimson_slab", "crimson_stairs", "crimson_standing_sign", "crimson_stem", "crimson_trapdoor", "crimson_wall_sign", "crying_obsidian", "cut_copper", "cut_copper_slab", "cut_copper_stairs", "cut_red_sandstone", "cut_red_sandstone_slab", "cut_sandstone", "cut_sandstone_slab", "cyan_candle", "cyan_candle_cake", "cyan_carpet", "cyan_concrete", "cyan_concrete_powder", "cyan_glazed_terracotta", "cyan_shulker_box", "cyan_stained_glass", "cyan_stained_glass_pane", "cyan_terracotta", "cyan_wool", "damaged_anvil", "dandelion", "dark_oak_button", "dark_oak_door", "dark_oak_double_slab", "dark_oak_fence", "dark_oak_fence_gate", "dark_oak_hanging_sign", "dark_oak_leaves", "dark_oak_log", "dark_oak_pressure_plate", "dark_oak_sapling", "dark_oak_slab", "dark_oak_stairs", "dark_oak_trapdoor", "dark_oak_wood", "dark_prismarine", "dark_prismarine_double_slab", "dark_prismarine_slab", "dark_prismarine_stairs", "darkoak_standing_sign", "darkoak_wall_sign", "daylight_detector", "daylight_detector_inverted", "dead_brain_coral", "dead_brain_coral_block", "dead_brain_coral_fan", "dead_brain_coral_wall_fan", "dead_bubble_coral", "dead_bubble_coral_block", "dead_bubble_coral_fan", "dead_bubble_coral_wall_fan", "dead_fire_coral", "dead_fire_coral_block", "dead_fire_coral_fan", "dead_fire_coral_wall_fan", "dead_horn_coral", "dead_horn_coral_block", "dead_horn_coral_fan", "dead_horn_coral_wall_fan", "dead_tube_coral", "dead_tube_coral_block", "dead_tube_coral_fan", "dead_tube_coral_wall_fan", "deadbush", "decorated_pot", "deepslate", "deepslate_brick_double_slab", "deepslate_brick_slab", "deepslate_brick_stairs", "deepslate_brick_wall", "deepslate_bricks", "deepslate_coal_ore", "deepslate_copper_ore", "deepslate_diamond_ore", "deepslate_emerald_ore", "deepslate_gold_ore", "deepslate_iron_ore", "deepslate_lapis_ore", "deepslate_redstone_ore", "deepslate_tile_double_slab", "deepslate_tile_slab", "deepslate_tile_stairs", "deepslate_tile_wall", "deepslate_tiles", "deny", "deprecated_anvil", "deprecated_purpur_block_1", "deprecated_purpur_block_2", "detector_rail", "diamond_block", "diamond_ore", "diorite", "diorite_double_slab", "diorite_slab", "diorite_stairs", "diorite_wall", "dirt", "dirt_with_roots", "dispenser", "double_cut_copper_slab", "double_plant", "double_stone_slab", "double_stone_slab2", "double_stone_slab3", "double_stone_slab4", "double_wooden_slab", "dragon_egg", "dragon_head", "dried_kelp_block", "dripstone_block", "dropper", "emerald_block", "emerald_ore", "enchanting_table", "end_brick_stairs", "end_bricks", "end_gateway", "end_portal", "end_portal_frame", "end_rod", "end_stone", "end_stone_brick_double_slab", "end_stone_brick_slab", "end_stone_brick_wall", "ender_chest", "exposed_chiseled_copper", "exposed_copper", "exposed_copper_bulb", "exposed_copper_door", "exposed_copper_grate", "exposed_copper_trapdoor", "exposed_cut_copper", "exposed_cut_copper_slab", "exposed_cut_copper_stairs", "exposed_double_cut_copper_slab", "farmland", "fence", "fence_gate", "fern", "fire", "fire_coral", "fire_coral_block", "fire_coral_fan", "fire_coral_wall_fan", "fletching_table", "flower_pot", "flowering_azalea", "flowing_lava", "flowing_water", "frame", "frog_spawn", "frosted_ice", "furnace", "gilded_blackstone", "glass", "glass_pane", "glow_frame", "glow_lichen", "glowingobsidian", "glowstone", "gold_block", "gold_ore", "golden_rail", "granite", "granite_double_slab", "granite_slab", "granite_stairs", "granite_wall", "grass", "grass_path", "gravel", "gray_candle", "gray_candle_cake", "gray_carpet", "gray_concrete", "gray_concrete_powder", "gray_glazed_terracotta", "gray_shulker_box", "gray_stained_glass", "gray_stained_glass_pane", "gray_terracotta", "gray_wool", "green_candle", "green_candle_cake", "green_carpet", "green_concrete", "green_concrete_powder", "green_glazed_terracotta", "green_shulker_box", "green_stained_glass", "green_stained_glass_pane", "green_terracotta", "green_wool", "grindstone", "hanging_roots", "hardened_clay", "hay_block", "heavy_core", "heavy_weighted_pressure_plate", "honey_block", "honeycomb_block", "hopper", "horn_coral", "horn_coral_block", "horn_coral_fan", "horn_coral_wall_fan", "ice", "infested_chiseled_stone_bricks", "infested_cobblestone", "infested_cracked_stone_bricks", "infested_deepslate", "infested_mossy_stone_bricks", "infested_stone", "infested_stone_bricks", "info_update", "info_update2", "invisibleBedrock", "iron_bars", "iron_block", "iron_door", "iron_ore", "iron_trapdoor", "jigsaw", "jukebox", "jungle_button", "jungle_door", "jungle_double_slab", "jungle_fence", "jungle_fence_gate", "jungle_hanging_sign", "jungle_leaves", "jungle_log", "jungle_pressure_plate", "jungle_sapling", "jungle_slab", "jungle_stairs", "jungle_standing_sign", "jungle_trapdoor", "jungle_wall_sign", "jungle_wood", "kelp", "ladder", "lantern", "lapis_block", "lapis_ore", "large_amethyst_bud", "large_fern", "lava", "lava_cauldron", "leaves", "leaves2", "lectern", "lever", "light_block", "light_block_0", "light_block_1", "light_block_10", "light_block_11", "light_block_12", "light_block_13", "light_block_14", "light_block_15", "light_block_2", "light_block_3", "light_block_4", "light_block_5", "light_block_6", "light_block_7", "light_block_8", "light_block_9", "light_blue_candle", "light_blue_candle_cake", "light_blue_carpet", "light_blue_concrete", "light_blue_concrete_powder", "light_blue_glazed_terracotta", "light_blue_shulker_box", "light_blue_stained_glass", "light_blue_stained_glass_pane", "light_blue_terracotta", "light_blue_wool", "light_gray_candle", "light_gray_candle_cake", "light_gray_carpet", "light_gray_concrete", "light_gray_concrete_powder", "light_gray_shulker_box", "light_gray_stained_glass", "light_gray_stained_glass_pane", "light_gray_terracotta", "light_gray_wool", "light_weighted_pressure_plate", "lightning_rod", "lilac", "lily_of_the_valley", "lime_candle", "lime_candle_cake", "lime_carpet", "lime_concrete", "lime_concrete_powder", "lime_glazed_terracotta", "lime_shulker_box", "lime_stained_glass", "lime_stained_glass_pane", "lime_terracotta", "lime_wool", "lit_blast_furnace", "lit_deepslate_redstone_ore", "lit_furnace", "lit_pumpkin", "lit_redstone_lamp", "lit_redstone_ore", "lit_smoker", "lodestone", "log", "log2", "loom", "magenta_candle", "magenta_candle_cake", "magenta_carpet", "magenta_concrete", "magenta_concrete_powder", "magenta_glazed_terracotta", "magenta_shulker_box", "magenta_stained_glass", "magenta_stained_glass_pane", "magenta_terracotta", "magenta_wool", "magma", "mangrove_button", "mangrove_door", "mangrove_double_slab", "mangrove_fence", "mangrove_fence_gate", "mangrove_hanging_sign", "mangrove_leaves", "mangrove_log", "mangrove_planks", "mangrove_pressure_plate", "mangrove_propagule", "mangrove_roots", "mangrove_slab", "mangrove_stairs", "mangrove_standing_sign", "mangrove_trapdoor", "mangrove_wall_sign", "mangrove_wood", "medium_amethyst_bud", "melon_block", "melon_stem", "mob_spawner", "monster_egg", "moss_block", "moss_carpet", "mossy_cobblestone", "mossy_cobblestone_double_slab", "mossy_cobblestone_slab", "mossy_cobblestone_stairs", "mossy_cobblestone_wall", "mossy_stone_brick_slab", "mossy_stone_brick_stairs", "mossy_stone_brick_wall", "mossy_stone_bricks", "movingBlock", "mud", "mud_brick_double_slab", "mud_brick_slab", "mud_brick_stairs", "mud_brick_wall", "mud_bricks", "muddy_mangrove_roots", "mushroom_stem", "mycelium", "nether_brick", "nether_brick_double_slab", "nether_brick_fence", "nether_brick_slab", "nether_brick_stairs", "nether_brick_wall", "nether_gold_ore", "nether_sprouts", "nether_wart", "nether_wart_block", "netherite_block", "netherrack", "netherreactor", "normal_stone_slab", "normal_stone_stairs", "noteblock", "oak_double_slab", "oak_fence", "oak_hanging_sign", "oak_leaves", "oak_log", "oak_sapling", "oak_slab", "oak_stairs", "oak_wood", "observer", "obsidian", "ochre_froglight", "open_eyeblossom", "orange_candle", "orange_candle_cake", "orange_carpet", "orange_concrete", "orange_concrete_powder", "orange_glazed_terracotta", "orange_shulker_box", "orange_stained_glass", "orange_stained_glass_pane", "orange_terracotta", "orange_tulip", "orange_wool", "oxeye_daisy", "oxidized_chiseled_copper", "oxidized_copper", "oxidized_copper_bulb", "oxidized_copper_door", "oxidized_copper_grate", "oxidized_copper_trapdoor", "oxidized_cut_copper", "oxidized_cut_copper_slab", "oxidized_cut_copper_stairs", "oxidized_double_cut_copper_slab", "packed_ice", "packed_mud", "pale_hanging_moss", "pale_moss_block", "pale_moss_carpet", "pale_oak_button", "pale_oak_door", "pale_oak_double_slab", "pale_oak_fence", "pale_oak_fence_gate", "pale_oak_hanging_sign", "pale_oak_leaves", "pale_oak_log", "pale_oak_planks", "pale_oak_pressure_plate", "pale_oak_sapling", "pale_oak_slab", "pale_oak_stairs", "pale_oak_standing_sign", "pale_oak_trapdoor", "pale_oak_wall_sign", "pale_oak_wood", "pearlescent_froglight", "peony", "petrified_oak_double_slab", "petrified_oak_slab", "piglin_head", "pink_candle", "pink_candle_cake", "pink_carpet", "pink_concrete", "pink_concrete_powder", "pink_glazed_terracotta", "pink_petals", "pink_shulker_box", "pink_stained_glass", "pink_stained_glass_pane", "pink_terracotta", "pink_tulip", "pink_wool", "piston", "pistonArmCollision", "pitcher_crop", "pitcher_plant", "planks", "player_head", "podzol", "pointed_dripstone", "polished_andesite", "polished_andesite_double_slab", "polished_andesite_slab", "polished_andesite_stairs", "polished_basalt", "polished_blackstone", "polished_blackstone_brick_double_slab", "polished_blackstone_brick_slab", "polished_blackstone_brick_stairs", "polished_blackstone_brick_wall", "polished_blackstone_bricks", "polished_blackstone_button", "polished_blackstone_double_slab", "polished_blackstone_pressure_plate", "polished_blackstone_slab", "polished_blackstone_stairs", "polished_blackstone_wall", "polished_deepslate", "polished_deepslate_double_slab", "polished_deepslate_slab", "polished_deepslate_stairs", "polished_deepslate_wall", "polished_diorite", "polished_diorite_double_slab", "polished_diorite_slab", "polished_diorite_stairs", "polished_granite", "polished_granite_double_slab", "polished_granite_slab", "polished_granite_stairs", "polished_tuff", "polished_tuff_double_slab", "polished_tuff_slab", "polished_tuff_stairs", "polished_tuff_wall", "poppy", "portal", "potatoes", "powder_snow", "powered_comparator", "powered_repeater", "prismarine", "prismarine_brick_double_slab", "prismarine_brick_slab", "prismarine_bricks", "prismarine_bricks_stairs", "prismarine_double_slab", "prismarine_slab", "prismarine_stairs", "prismarine_wall", "pumpkin", "pumpkin_stem", "purple_candle", "purple_candle_cake", "purple_carpet", "purple_concrete", "purple_concrete_powder", "purple_glazed_terracotta", "purple_shulker_box", "purple_stained_glass", "purple_stained_glass_pane", "purple_terracotta", "purple_wool", "purpur_block", "purpur_double_slab", "purpur_pillar", "purpur_slab", "purpur_stairs", "quartz_block", "quartz_bricks", "quartz_double_slab", "quartz_ore", "quartz_pillar", "quartz_slab", "quartz_stairs", "rail", "raw_copper_block", "raw_gold_block", "raw_iron_block", "red_candle", "red_candle_cake", "red_carpet", "red_concrete", "red_concrete_powder", "red_flower", "red_glazed_terracotta", "red_mushroom", "red_mushroom_block", "red_nether_brick", "red_nether_brick_double_slab", "red_nether_brick_slab", "red_nether_brick_stairs", "red_nether_brick_wall", "red_sand", "red_sandstone", "red_sandstone_double_slab", "red_sandstone_slab", "red_sandstone_stairs", "red_sandstone_wall", "red_shulker_box", "red_stained_glass", "red_stained_glass_pane", "red_terracotta", "red_tulip", "red_wool", "redstone_block", "redstone_lamp", "redstone_ore", "redstone_torch", "redstone_wire", "reeds", "reinforced_deepslate", "repeating_command_block", "reserved6", "resin_block", "resin_brick_double_slab", "resin_brick_slab", "resin_brick_stairs", "resin_brick_wall", "resin_bricks", "resin_clump", "respawn_anchor", "rose_bush", "sand", "sandstone", "sandstone_double_slab", "sandstone_slab", "sandstone_stairs", "sandstone_wall", "sapling", "scaffolding", "sculk", "sculk_catalyst", "sculk_sensor", "sculk_shrieker", "sculk_vein", "seaLantern", "sea_pickle", "seagrass", "short_grass", "shroomlight", "shulker_box", "silver_glazed_terracotta", "skeleton_skull", "skull", "slime", "small_amethyst_bud", "small_dripleaf_block", "smithing_table", "smoker", "smooth_basalt", "smooth_quartz", "smooth_quartz_slab", "smooth_quartz_stairs", "smooth_red_sandstone", "smooth_red_sandstone_double_slab", "smooth_red_sandstone_slab", "smooth_red_sandstone_stairs", "smooth_sandstone", "smooth_sandstone_double_slab", "smooth_sandstone_slab", "smooth_sandstone_stairs", "smooth_stone", "smooth_stone_double_slab", "smooth_stone_slab", "sniffer_egg", "snow", "snow_layer", "soul_campfire", "soul_fire", "soul_lantern", "soul_sand", "soul_soil", "soul_torch", "sponge", "spore_blossom", "spruce_button", "spruce_door", "spruce_double_slab", "spruce_fence", "spruce_fence_gate", "spruce_hanging_sign", "spruce_leaves", "spruce_log", "spruce_pressure_plate", "spruce_sapling", "spruce_slab", "spruce_stairs", "spruce_standing_sign", "spruce_trapdoor", "spruce_wall_sign", "spruce_wood", "stained_glass", "stained_glass_pane", "stained_hardened_clay", "standing_banner", "standing_sign", "stickyPistonArmCollision", "sticky_piston", "stone", "stone_brick_double_slab", "stone_brick_slab", "stone_brick_stairs", "stone_brick_wall", "stone_bricks", "stone_button", "stone_pressure_plate", "stone_slab", "stone_slab2", "stone_slab3", "stone_slab4", "stone_stairs", "stonebrick", "stonecutter", "stonecutter_block", "stripped_acacia_log", "stripped_acacia_wood", "stripped_bamboo_block", "stripped_birch_log", "stripped_birch_wood", "stripped_cherry_log", "stripped_cherry_wood", "stripped_crimson_hyphae", "stripped_crimson_stem", "stripped_dark_oak_log", "stripped_dark_oak_wood", "stripped_jungle_log", "stripped_jungle_wood", "stripped_mangrove_log", "stripped_mangrove_wood", "stripped_oak_log", "stripped_oak_wood", "stripped_pale_oak_log", "stripped_pale_oak_wood", "stripped_spruce_log", "stripped_spruce_wood", "stripped_warped_hyphae", "stripped_warped_stem", "structure_block", "structure_void", "sunflower", "suspicious_gravel", "suspicious_sand", "sweet_berry_bush", "tall_grass", "tallgrass", "target", "tinted_glass", "tnt", "torch", "torchflower", "torchflower_crop", "trapdoor", "trapped_chest", "trial_spawner", "tripWire", "tripwire_hook", "tube_coral", "tube_coral_block", "tube_coral_fan", "tube_coral_wall_fan", "tuff", "tuff_brick_double_slab", "tuff_brick_slab", "tuff_brick_stairs", "tuff_brick_wall", "tuff_bricks", "tuff_double_slab", "tuff_slab", "tuff_stairs", "tuff_wall", "turtle_egg", "twisting_vines", "undyed_shulker_box", "unlit_redstone_torch", "unpowered_comparator", "unpowered_repeater", "vault", "verdant_froglight", "vine", "wall_banner", "wall_sign", "warped_button", "warped_door", "warped_double_slab", "warped_fence", "warped_fence_gate", "warped_fungus", "warped_hanging_sign", "warped_hyphae", "warped_nylium", "warped_planks", "warped_pressure_plate", "warped_roots", "warped_slab", "warped_stairs", "warped_standing_sign", "warped_stem", "warped_trapdoor", "warped_wall_sign", "warped_wart_block", "water", "waterlily", "waxed_chiseled_copper", "waxed_copper", "waxed_copper_bulb", "waxed_copper_door", "waxed_copper_grate", "waxed_copper_trapdoor", "waxed_cut_copper", "waxed_cut_copper_slab", "waxed_cut_copper_stairs", "waxed_double_cut_copper_slab", "waxed_exposed_chiseled_copper", "waxed_exposed_copper", "waxed_exposed_copper_bulb", "waxed_exposed_copper_door", "waxed_exposed_copper_grate", "waxed_exposed_copper_trapdoor", "waxed_exposed_cut_copper", "waxed_exposed_cut_copper_slab", "waxed_exposed_cut_copper_stairs", "waxed_exposed_double_cut_copper_slab", "waxed_oxidized_chiseled_copper", "waxed_oxidized_copper", "waxed_oxidized_copper_bulb", "waxed_oxidized_copper_door", "waxed_oxidized_copper_grate", "waxed_oxidized_copper_trapdoor", "waxed_oxidized_cut_copper", "waxed_oxidized_cut_copper_slab", "waxed_oxidized_cut_copper_stairs", "waxed_oxidized_double_cut_copper_slab", "waxed_weathered_chiseled_copper", "waxed_weathered_copper", "waxed_weathered_copper_bulb", "waxed_weathered_copper_door", "waxed_weathered_copper_grate", "waxed_weathered_copper_trapdoor", "waxed_weathered_cut_copper", "waxed_weathered_cut_copper_slab", "waxed_weathered_cut_copper_stairs", "waxed_weathered_double_cut_copper_slab", "weathered_chiseled_copper", "weathered_copper", "weathered_copper_bulb", "weathered_copper_door", "weathered_copper_grate", "weathered_copper_trapdoor", "weathered_cut_copper", "weathered_cut_copper_slab", "weathered_cut_copper_stairs", "weathered_double_cut_copper_slab", "web", "weeping_vines", "wet_sponge", "wheat", "white_candle", "white_candle_cake", "white_carpet", "white_concrete", "white_concrete_powder", "white_glazed_terracotta", "white_shulker_box", "white_stained_glass", "white_stained_glass_pane", "white_terracotta", "white_tulip", "white_wool", "wither_rose", "wither_skeleton_skull", "wood", "wooden_button", "wooden_door", "wooden_pressure_plate", "wooden_slab", "wool", "yellow_candle", "yellow_candle_cake", "yellow_carpet", "yellow_concrete", "yellow_concrete_powder", "yellow_flower", "yellow_glazed_terracotta", "yellow_shulker_box", "yellow_stained_glass", "yellow_stained_glass_pane", "yellow_terracotta", "yellow_wool", "zombie_head"]}}');
}

//give @p bot:block 64 0 {"minecraft:can_place_on": {"blocks": ["bot:block", "acacia_button", "acacia_door", "acacia_double_slab", "acacia_fence", "acacia_fence_gate", "acacia_hanging_sign", "acacia_leaves", "acacia_log", "acacia_pressure_plate", "acacia_sapling", "acacia_slab", "acacia_stairs", "acacia_standing_sign", "acacia_trapdoor", "acacia_wall_sign", "acacia_wood", "activator_rail", "air", "allium", "allow", "amethyst_block", "amethyst_cluster", "ancient_debris", "andesite", "andesite_double_slab", "andesite_slab", "andesite_stairs", "andesite_wall", "anvil", "azalea", "azalea_leaves", "azalea_leaves_flowered", "azure_bluet", "bamboo", "bamboo_block", "bamboo_button", "bamboo_door", "bamboo_double_slab", "bamboo_fence", "bamboo_fence_gate", "bamboo_hanging_sign", "bamboo_mosaic", "bamboo_mosaic_double_slab", "bamboo_mosaic_slab", "bamboo_mosaic_stairs", "bamboo_planks", "bamboo_pressure_plate", "bamboo_sapling", "bamboo_slab", "bamboo_stairs", "bamboo_standing_sign", "bamboo_trapdoor", "bamboo_wall_sign", "barrel", "basalt", "beacon", "bed", "bedrock", "bee_nest", "beehive", "beetroot", "bell", "big_dripleaf", "birch_button", "birch_door", "birch_double_slab", "birch_fence", "birch_fence_gate", "birch_hanging_sign", "birch_leaves", "birch_log", "birch_pressure_plate", "birch_sapling", "birch_slab", "birch_stairs", "birch_standing_sign", "birch_trapdoor", "birch_wall_sign", "birch_wood", "black_candle", "black_candle_cake", "black_carpet", "black_concrete", "black_concrete_powder", "black_glazed_terracotta", "black_shulker_box", "black_stained_glass", "black_stained_glass_pane", "black_terracotta", "black_wool", "blackstone", "blackstone_double_slab", "blackstone_slab", "blackstone_stairs", "blackstone_wall", "blast_furnace", "blue_candle", "blue_candle_cake", "blue_carpet", "blue_concrete", "blue_concrete_powder", "blue_glazed_terracotta", "blue_ice", "blue_orchid", "blue_shulker_box", "blue_stained_glass", "blue_stained_glass_pane", "blue_terracotta", "blue_wool", "bone_block", "bookshelf", "border_block", "brain_coral", "brain_coral_block", "brain_coral_fan", "brain_coral_wall_fan", "brewing_stand", "brick_block", "brick_double_slab", "brick_slab", "brick_stairs", "brick_wall", "brown_candle", "brown_candle_cake", "brown_carpet", "brown_concrete", "brown_concrete_powder", "brown_glazed_terracotta", "brown_mushroom", "brown_mushroom_block", "brown_shulker_box", "brown_stained_glass", "brown_stained_glass_pane", "brown_terracotta", "brown_wool", "bubble_column", "bubble_coral", "bubble_coral_block", "bubble_coral_fan", "bubble_coral_wall_fan", "budding_amethyst", "cactus", "cake", "calcite", "calibrated_sculk_sensor", "camera", "campfire", "candle", "candle_cake", "carpet", "carrots", "cartography_table", "carved_pumpkin", "cauldron", "cave_vines", "cave_vines_body_with_berries", "cave_vines_head_with_berries", "chain", "chain_command_block", "cherry_button", "cherry_door", "cherry_double_slab", "cherry_fence", "cherry_fence_gate", "cherry_hanging_sign", "cherry_leaves", "cherry_log", "cherry_planks", "cherry_pressure_plate", "cherry_sapling", "cherry_slab", "cherry_stairs", "cherry_standing_sign", "cherry_trapdoor", "cherry_wall_sign", "cherry_wood", "chest", "chipped_anvil", "chiseled_bookshelf", "chiseled_copper", "chiseled_deepslate", "chiseled_nether_bricks", "chiseled_polished_blackstone", "chiseled_quartz_block", "chiseled_red_sandstone", "chiseled_resin_bricks", "chiseled_sandstone", "chiseled_stone_bricks", "chiseled_tuff", "chiseled_tuff_bricks", "chorus_flower", "chorus_plant", "clay", "closed_eyeblossom", "coal_block", "coal_ore", "coarse_dirt", "cobbled_deepslate", "cobbled_deepslate_double_slab", "cobbled_deepslate_slab", "cobbled_deepslate_stairs", "cobbled_deepslate_wall", "cobblestone", "cobblestone_double_slab", "cobblestone_slab", "cobblestone_wall", "cocoa", "command_block", "composter", "concrete", "concretePowder", "conduit", "copper_block", "copper_bulb", "copper_door", "copper_grate", "copper_ore", "copper_trapdoor", "coral", "coral_block", "coral_fan", "coral_fan_dead", "coral_fan_hang", "coral_fan_hang2", "coral_fan_hang3", "cornflower", "cracked_deepslate_bricks", "cracked_deepslate_tiles", "cracked_nether_bricks", "cracked_polished_blackstone_bricks", "cracked_stone_bricks", "crafter", "crafting_table", "creaking_heart", "creeper_head", "crimson_button", "crimson_door", "crimson_double_slab", "crimson_fence", "crimson_fence_gate", "crimson_fungus", "crimson_hanging_sign", "crimson_hyphae", "crimson_nylium", "crimson_planks", "crimson_pressure_plate", "crimson_roots", "crimson_slab", "crimson_stairs", "crimson_standing_sign", "crimson_stem", "crimson_trapdoor", "crimson_wall_sign", "crying_obsidian", "cut_copper", "cut_copper_slab", "cut_copper_stairs", "cut_red_sandstone", "cut_red_sandstone_slab", "cut_sandstone", "cut_sandstone_slab", "cyan_candle", "cyan_candle_cake", "cyan_carpet", "cyan_concrete", "cyan_concrete_powder", "cyan_glazed_terracotta", "cyan_shulker_box", "cyan_stained_glass", "cyan_stained_glass_pane", "cyan_terracotta", "cyan_wool", "damaged_anvil", "dandelion", "dark_oak_button", "dark_oak_door", "dark_oak_double_slab", "dark_oak_fence", "dark_oak_fence_gate", "dark_oak_hanging_sign", "dark_oak_leaves", "dark_oak_log", "dark_oak_pressure_plate", "dark_oak_sapling", "dark_oak_slab", "dark_oak_stairs", "dark_oak_trapdoor", "dark_oak_wood", "dark_prismarine", "dark_prismarine_double_slab", "dark_prismarine_slab", "dark_prismarine_stairs", "darkoak_standing_sign", "darkoak_wall_sign", "daylight_detector", "daylight_detector_inverted", "dead_brain_coral", "dead_brain_coral_block", "dead_brain_coral_fan", "dead_brain_coral_wall_fan", "dead_bubble_coral", "dead_bubble_coral_block", "dead_bubble_coral_fan", "dead_bubble_coral_wall_fan", "dead_fire_coral", "dead_fire_coral_block", "dead_fire_coral_fan", "dead_fire_coral_wall_fan", "dead_horn_coral", "dead_horn_coral_block", "dead_horn_coral_fan", "dead_horn_coral_wall_fan", "dead_tube_coral", "dead_tube_coral_block", "dead_tube_coral_fan", "dead_tube_coral_wall_fan", "deadbush", "decorated_pot", "deepslate", "deepslate_brick_double_slab", "deepslate_brick_slab", "deepslate_brick_stairs", "deepslate_brick_wall", "deepslate_bricks", "deepslate_coal_ore", "deepslate_copper_ore", "deepslate_diamond_ore", "deepslate_emerald_ore", "deepslate_gold_ore", "deepslate_iron_ore", "deepslate_lapis_ore", "deepslate_redstone_ore", "deepslate_tile_double_slab", "deepslate_tile_slab", "deepslate_tile_stairs", "deepslate_tile_wall", "deepslate_tiles", "deny", "deprecated_anvil", "deprecated_purpur_block_1", "deprecated_purpur_block_2", "detector_rail", "diamond_block", "diamond_ore", "diorite", "diorite_double_slab", "diorite_slab", "diorite_stairs", "diorite_wall", "dirt", "dirt_with_roots", "dispenser", "double_cut_copper_slab", "double_plant", "double_stone_slab", "double_stone_slab2", "double_stone_slab3", "double_stone_slab4", "double_wooden_slab", "dragon_egg", "dragon_head", "dried_kelp_block", "dripstone_block", "dropper", "emerald_block", "emerald_ore", "enchanting_table", "end_brick_stairs", "end_bricks", "end_gateway", "end_portal", "end_portal_frame", "end_rod", "end_stone", "end_stone_brick_double_slab", "end_stone_brick_slab", "end_stone_brick_wall", "ender_chest", "exposed_chiseled_copper", "exposed_copper", "exposed_copper_bulb", "exposed_copper_door", "exposed_copper_grate", "exposed_copper_trapdoor", "exposed_cut_copper", "exposed_cut_copper_slab", "exposed_cut_copper_stairs", "exposed_double_cut_copper_slab", "farmland", "fence", "fence_gate", "fern", "fire", "fire_coral", "fire_coral_block", "fire_coral_fan", "fire_coral_wall_fan", "fletching_table", "flower_pot", "flowering_azalea", "flowing_lava", "flowing_water", "frame", "frog_spawn", "frosted_ice", "furnace", "gilded_blackstone", "glass", "glass_pane", "glow_frame", "glow_lichen", "glowingobsidian", "glowstone", "gold_block", "gold_ore", "golden_rail", "granite", "granite_double_slab", "granite_slab", "granite_stairs", "granite_wall", "grass", "grass_path", "gravel", "gray_candle", "gray_candle_cake", "gray_carpet", "gray_concrete", "gray_concrete_powder", "gray_glazed_terracotta", "gray_shulker_box", "gray_stained_glass", "gray_stained_glass_pane", "gray_terracotta", "gray_wool", "green_candle", "green_candle_cake", "green_carpet", "green_concrete", "green_concrete_powder", "green_glazed_terracotta", "green_shulker_box", "green_stained_glass", "green_stained_glass_pane", "green_terracotta", "green_wool", "grindstone", "hanging_roots", "hardened_clay", "hay_block", "heavy_core", "heavy_weighted_pressure_plate", "honey_block", "honeycomb_block", "hopper", "horn_coral", "horn_coral_block", "horn_coral_fan", "horn_coral_wall_fan", "ice", "infested_chiseled_stone_bricks", "infested_cobblestone", "infested_cracked_stone_bricks", "infested_deepslate", "infested_mossy_stone_bricks", "infested_stone", "infested_stone_bricks", "info_update", "info_update2", "invisibleBedrock", "iron_bars", "iron_block", "iron_door", "iron_ore", "iron_trapdoor", "jigsaw", "jukebox", "jungle_button", "jungle_door", "jungle_double_slab", "jungle_fence", "jungle_fence_gate", "jungle_hanging_sign", "jungle_leaves", "jungle_log", "jungle_pressure_plate", "jungle_sapling", "jungle_slab", "jungle_stairs", "jungle_standing_sign", "jungle_trapdoor", "jungle_wall_sign", "jungle_wood", "kelp", "ladder", "lantern", "lapis_block", "lapis_ore", "large_amethyst_bud", "large_fern", "lava", "lava_cauldron", "leaves", "leaves2", "lectern", "lever", "light_block", "light_block_0", "light_block_1", "light_block_10", "light_block_11", "light_block_12", "light_block_13", "light_block_14", "light_block_15", "light_block_2", "light_block_3", "light_block_4", "light_block_5", "light_block_6", "light_block_7", "light_block_8", "light_block_9", "light_blue_candle", "light_blue_candle_cake", "light_blue_carpet", "light_blue_concrete", "light_blue_concrete_powder", "light_blue_glazed_terracotta", "light_blue_shulker_box", "light_blue_stained_glass", "light_blue_stained_glass_pane", "light_blue_terracotta", "light_blue_wool", "light_gray_candle", "light_gray_candle_cake", "light_gray_carpet", "light_gray_concrete", "light_gray_concrete_powder", "light_gray_shulker_box", "light_gray_stained_glass", "light_gray_stained_glass_pane", "light_gray_terracotta", "light_gray_wool", "light_weighted_pressure_plate", "lightning_rod", "lilac", "lily_of_the_valley", "lime_candle", "lime_candle_cake", "lime_carpet", "lime_concrete", "lime_concrete_powder", "lime_glazed_terracotta", "lime_shulker_box", "lime_stained_glass", "lime_stained_glass_pane", "lime_terracotta", "lime_wool", "lit_blast_furnace", "lit_deepslate_redstone_ore", "lit_furnace", "lit_pumpkin", "lit_redstone_lamp", "lit_redstone_ore", "lit_smoker", "lodestone", "log", "log2", "loom", "magenta_candle", "magenta_candle_cake", "magenta_carpet", "magenta_concrete", "magenta_concrete_powder", "magenta_glazed_terracotta", "magenta_shulker_box", "magenta_stained_glass", "magenta_stained_glass_pane", "magenta_terracotta", "magenta_wool", "magma", "mangrove_button", "mangrove_door", "mangrove_double_slab", "mangrove_fence", "mangrove_fence_gate", "mangrove_hanging_sign", "mangrove_leaves", "mangrove_log", "mangrove_planks", "mangrove_pressure_plate", "mangrove_propagule", "mangrove_roots", "mangrove_slab", "mangrove_stairs", "mangrove_standing_sign", "mangrove_trapdoor", "mangrove_wall_sign", "mangrove_wood", "medium_amethyst_bud", "melon_block", "melon_stem", "mob_spawner", "monster_egg", "moss_block", "moss_carpet", "mossy_cobblestone", "mossy_cobblestone_double_slab", "mossy_cobblestone_slab", "mossy_cobblestone_stairs", "mossy_cobblestone_wall", "mossy_stone_brick_slab", "mossy_stone_brick_stairs", "mossy_stone_brick_wall", "mossy_stone_bricks", "movingBlock", "mud", "mud_brick_double_slab", "mud_brick_slab", "mud_brick_stairs", "mud_brick_wall", "mud_bricks", "muddy_mangrove_roots", "mushroom_stem", "mycelium", "nether_brick", "nether_brick_double_slab", "nether_brick_fence", "nether_brick_slab", "nether_brick_stairs", "nether_brick_wall", "nether_gold_ore", "nether_sprouts", "nether_wart", "nether_wart_block", "netherite_block", "netherrack", "netherreactor", "normal_stone_slab", "normal_stone_stairs", "noteblock", "oak_double_slab", "oak_fence", "oak_hanging_sign", "oak_leaves", "oak_log", "oak_sapling", "oak_slab", "oak_stairs", "oak_wood", "observer", "obsidian", "ochre_froglight", "open_eyeblossom", "orange_candle", "orange_candle_cake", "orange_carpet", "orange_concrete", "orange_concrete_powder", "orange_glazed_terracotta", "orange_shulker_box", "orange_stained_glass", "orange_stained_glass_pane", "orange_terracotta", "orange_tulip", "orange_wool", "oxeye_daisy", "oxidized_chiseled_copper", "oxidized_copper", "oxidized_copper_bulb", "oxidized_copper_door", "oxidized_copper_grate", "oxidized_copper_trapdoor", "oxidized_cut_copper", "oxidized_cut_copper_slab", "oxidized_cut_copper_stairs", "oxidized_double_cut_copper_slab", "packed_ice", "packed_mud", "pale_hanging_moss", "pale_moss_block", "pale_moss_carpet", "pale_oak_button", "pale_oak_door", "pale_oak_double_slab", "pale_oak_fence", "pale_oak_fence_gate", "pale_oak_hanging_sign", "pale_oak_leaves", "pale_oak_log", "pale_oak_planks", "pale_oak_pressure_plate", "pale_oak_sapling", "pale_oak_slab", "pale_oak_stairs", "pale_oak_standing_sign", "pale_oak_trapdoor", "pale_oak_wall_sign", "pale_oak_wood", "pearlescent_froglight", "peony", "petrified_oak_double_slab", "petrified_oak_slab", "piglin_head", "pink_candle", "pink_candle_cake", "pink_carpet", "pink_concrete", "pink_concrete_powder", "pink_glazed_terracotta", "pink_petals", "pink_shulker_box", "pink_stained_glass", "pink_stained_glass_pane", "pink_terracotta", "pink_tulip", "pink_wool", "piston", "pistonArmCollision", "pitcher_crop", "pitcher_plant", "planks", "player_head", "podzol", "pointed_dripstone", "polished_andesite", "polished_andesite_double_slab", "polished_andesite_slab", "polished_andesite_stairs", "polished_basalt", "polished_blackstone", "polished_blackstone_brick_double_slab", "polished_blackstone_brick_slab", "polished_blackstone_brick_stairs", "polished_blackstone_brick_wall", "polished_blackstone_bricks", "polished_blackstone_button", "polished_blackstone_double_slab", "polished_blackstone_pressure_plate", "polished_blackstone_slab", "polished_blackstone_stairs", "polished_blackstone_wall", "polished_deepslate", "polished_deepslate_double_slab", "polished_deepslate_slab", "polished_deepslate_stairs", "polished_deepslate_wall", "polished_diorite", "polished_diorite_double_slab", "polished_diorite_slab", "polished_diorite_stairs", "polished_granite", "polished_granite_double_slab", "polished_granite_slab", "polished_granite_stairs", "polished_tuff", "polished_tuff_double_slab", "polished_tuff_slab", "polished_tuff_stairs", "polished_tuff_wall", "poppy", "portal", "potatoes", "powder_snow", "powered_comparator", "powered_repeater", "prismarine", "prismarine_brick_double_slab", "prismarine_brick_slab", "prismarine_bricks", "prismarine_bricks_stairs", "prismarine_double_slab", "prismarine_slab", "prismarine_stairs", "prismarine_wall", "pumpkin", "pumpkin_stem", "purple_candle", "purple_candle_cake", "purple_carpet", "purple_concrete", "purple_concrete_powder", "purple_glazed_terracotta", "purple_shulker_box", "purple_stained_glass", "purple_stained_glass_pane", "purple_terracotta", "purple_wool", "purpur_block", "purpur_double_slab", "purpur_pillar", "purpur_slab", "purpur_stairs", "quartz_block", "quartz_bricks", "quartz_double_slab", "quartz_ore", "quartz_pillar", "quartz_slab", "quartz_stairs", "rail", "raw_copper_block", "raw_gold_block", "raw_iron_block", "red_candle", "red_candle_cake", "red_carpet", "red_concrete", "red_concrete_powder", "red_flower", "red_glazed_terracotta", "red_mushroom", "red_mushroom_block", "red_nether_brick", "red_nether_brick_double_slab", "red_nether_brick_slab", "red_nether_brick_stairs", "red_nether_brick_wall", "red_sand", "red_sandstone", "red_sandstone_double_slab", "red_sandstone_slab", "red_sandstone_stairs", "red_sandstone_wall", "red_shulker_box", "red_stained_glass", "red_stained_glass_pane", "red_terracotta", "red_tulip", "red_wool", "redstone_block", "redstone_lamp", "redstone_ore", "redstone_torch", "redstone_wire", "reeds", "reinforced_deepslate", "repeating_command_block", "reserved6", "resin_block", "resin_brick_double_slab", "resin_brick_slab", "resin_brick_stairs", "resin_brick_wall", "resin_bricks", "resin_clump", "respawn_anchor", "rose_bush", "sand", "sandstone", "sandstone_double_slab", "sandstone_slab", "sandstone_stairs", "sandstone_wall", "sapling", "scaffolding", "sculk", "sculk_catalyst", "sculk_sensor", "sculk_shrieker", "sculk_vein", "seaLantern", "sea_pickle", "seagrass", "short_grass", "shroomlight", "shulker_box", "silver_glazed_terracotta", "skeleton_skull", "skull", "slime", "small_amethyst_bud", "small_dripleaf_block", "smithing_table", "smoker", "smooth_basalt", "smooth_quartz", "smooth_quartz_slab", "smooth_quartz_stairs", "smooth_red_sandstone", "smooth_red_sandstone_double_slab", "smooth_red_sandstone_slab", "smooth_red_sandstone_stairs", "smooth_sandstone", "smooth_sandstone_double_slab", "smooth_sandstone_slab", "smooth_sandstone_stairs", "smooth_stone", "smooth_stone_double_slab", "smooth_stone_slab", "sniffer_egg", "snow", "snow_layer", "soul_campfire", "soul_fire", "soul_lantern", "soul_sand", "soul_soil", "soul_torch", "sponge", "spore_blossom", "spruce_button", "spruce_door", "spruce_double_slab", "spruce_fence", "spruce_fence_gate", "spruce_hanging_sign", "spruce_leaves", "spruce_log", "spruce_pressure_plate", "spruce_sapling", "spruce_slab", "spruce_stairs", "spruce_standing_sign", "spruce_trapdoor", "spruce_wall_sign", "spruce_wood", "stained_glass", "stained_glass_pane", "stained_hardened_clay", "standing_banner", "standing_sign", "stickyPistonArmCollision", "sticky_piston", "stone", "stone_brick_double_slab", "stone_brick_slab", "stone_brick_stairs", "stone_brick_wall", "stone_bricks", "stone_button", "stone_pressure_plate", "stone_slab", "stone_slab2", "stone_slab3", "stone_slab4", "stone_stairs", "stonebrick", "stonecutter", "stonecutter_block", "stripped_acacia_log", "stripped_acacia_wood", "stripped_bamboo_block", "stripped_birch_log", "stripped_birch_wood", "stripped_cherry_log", "stripped_cherry_wood", "stripped_crimson_hyphae", "stripped_crimson_stem", "stripped_dark_oak_log", "stripped_dark_oak_wood", "stripped_jungle_log", "stripped_jungle_wood", "stripped_mangrove_log", "stripped_mangrove_wood", "stripped_oak_log", "stripped_oak_wood", "stripped_pale_oak_log", "stripped_pale_oak_wood", "stripped_spruce_log", "stripped_spruce_wood", "stripped_warped_hyphae", "stripped_warped_stem", "structure_block", "structure_void", "sunflower", "suspicious_gravel", "suspicious_sand", "sweet_berry_bush", "tall_grass", "tallgrass", "target", "tinted_glass", "tnt", "torch", "torchflower", "torchflower_crop", "trapdoor", "trapped_chest", "trial_spawner", "tripWire", "tripwire_hook", "tube_coral", "tube_coral_block", "tube_coral_fan", "tube_coral_wall_fan", "tuff", "tuff_brick_double_slab", "tuff_brick_slab", "tuff_brick_stairs", "tuff_brick_wall", "tuff_bricks", "tuff_double_slab", "tuff_slab", "tuff_stairs", "tuff_wall", "turtle_egg", "twisting_vines", "undyed_shulker_box", "unlit_redstone_torch", "unpowered_comparator", "unpowered_repeater", "vault", "verdant_froglight", "vine", "wall_banner", "wall_sign", "warped_button", "warped_door", "warped_double_slab", "warped_fence", "warped_fence_gate", "warped_fungus", "warped_hanging_sign", "warped_hyphae", "warped_nylium", "warped_planks", "warped_pressure_plate", "warped_roots", "warped_slab", "warped_stairs", "warped_standing_sign", "warped_stem", "warped_trapdoor", "warped_wall_sign", "warped_wart_block", "water", "waterlily", "waxed_chiseled_copper", "waxed_copper", "waxed_copper_bulb", "waxed_copper_door", "waxed_copper_grate", "waxed_copper_trapdoor", "waxed_cut_copper", "waxed_cut_copper_slab", "waxed_cut_copper_stairs", "waxed_double_cut_copper_slab", "waxed_exposed_chiseled_copper", "waxed_exposed_copper", "waxed_exposed_copper_bulb", "waxed_exposed_copper_door", "waxed_exposed_copper_grate", "waxed_exposed_copper_trapdoor", "waxed_exposed_cut_copper", "waxed_exposed_cut_copper_slab", "waxed_exposed_cut_copper_stairs", "waxed_exposed_double_cut_copper_slab", "waxed_oxidized_chiseled_copper", "waxed_oxidized_copper", "waxed_oxidized_copper_bulb", "waxed_oxidized_copper_door", "waxed_oxidized_copper_grate", "waxed_oxidized_copper_trapdoor", "waxed_oxidized_cut_copper", "waxed_oxidized_cut_copper_slab", "waxed_oxidized_cut_copper_stairs", "waxed_oxidized_double_cut_copper_slab", "waxed_weathered_chiseled_copper", "waxed_weathered_copper", "waxed_weathered_copper_bulb", "waxed_weathered_copper_door", "waxed_weathered_copper_grate", "waxed_weathered_copper_trapdoor", "waxed_weathered_cut_copper", "waxed_weathered_cut_copper_slab", "waxed_weathered_cut_copper_stairs", "waxed_weathered_double_cut_copper_slab", "weathered_chiseled_copper", "weathered_copper", "weathered_copper_bulb", "weathered_copper_door", "weathered_copper_grate", "weathered_copper_trapdoor", "weathered_cut_copper", "weathered_cut_copper_slab", "weathered_cut_copper_stairs", "weathered_double_cut_copper_slab", "web", "weeping_vines", "wet_sponge", "wheat", "white_candle", "white_candle_cake", "white_carpet", "white_concrete", "white_concrete_powder", "white_glazed_terracotta", "white_shulker_box", "white_stained_glass", "white_stained_glass_pane", "white_terracotta", "white_tulip", "white_wool", "wither_rose", "wither_skeleton_skull", "wood", "wooden_button", "wooden_door", "wooden_pressure_plate", "wooden_slab", "wool", "yellow_candle", "yellow_candle_cake", "yellow_carpet", "yellow_concrete", "yellow_concrete_powder", "yellow_flower", "yellow_glazed_terracotta", "yellow_shulker_box", "yellow_stained_glass", "yellow_stained_glass_pane", "yellow_terracotta", "yellow_wool", "zombie_head"]}}

const parseIndex = i => i < 9 ? { type: "slot.hotbar", slot: i } : { type: "slot.inventory", slot: i - 9 };
function replaceBucketsForDuel(player) {
    if (!player.hasTag("duel")) return;
    const inv = player.getComponent("inventory").container;
    const waterBucketSlots = [];
    const flintSteelSlots = [];
    for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        if (!item) continue;
        if (item.typeId === "minecraft:water_bucket") {
            waterBucketSlots.push(i);
        }
        if (item.typeId === "minecraft:flint_and_steel") {
            flintSteelSlots.push(i);
        }
    }
    player.runCommand('clear @s water_bucket');
    player.runCommand('clear @s flint_and_steel');
    for (const i of waterBucketSlots) {
        const pI = parseIndex(i);
        system.runTimeout(() => {
            player.runCommand(`replaceitem entity @s ${pI.type} ${pI.slot} water_bucket 1 0 {"minecraft:can_place_on": {"blocks": ["bot:block", "acacia_button", "acacia_door", "acacia_double_slab", "acacia_fence", "acacia_fence_gate", "acacia_hanging_sign", "acacia_leaves", "acacia_log", "acacia_pressure_plate", "acacia_sapling", "acacia_slab", "acacia_stairs", "acacia_standing_sign", "acacia_trapdoor", "acacia_wall_sign", "acacia_wood", "activator_rail", "air", "allium", "allow", "amethyst_block", "amethyst_cluster", "ancient_debris", "andesite", "andesite_double_slab", "andesite_slab", "andesite_stairs", "andesite_wall", "anvil", "azalea", "azalea_leaves", "azalea_leaves_flowered", "azure_bluet", "bamboo", "bamboo_block", "bamboo_button", "bamboo_door", "bamboo_double_slab", "bamboo_fence", "bamboo_fence_gate", "bamboo_hanging_sign", "bamboo_mosaic", "bamboo_mosaic_double_slab", "bamboo_mosaic_slab", "bamboo_mosaic_stairs", "bamboo_planks", "bamboo_pressure_plate", "bamboo_sapling", "bamboo_slab", "bamboo_stairs", "bamboo_standing_sign", "bamboo_trapdoor", "bamboo_wall_sign", "barrel", "basalt", "beacon", "bed", "bedrock", "bee_nest", "beehive", "beetroot", "bell", "big_dripleaf", "birch_button", "birch_door", "birch_double_slab", "birch_fence", "birch_fence_gate", "birch_hanging_sign", "birch_leaves", "birch_log", "birch_pressure_plate", "birch_sapling", "birch_slab", "birch_stairs", "birch_standing_sign", "birch_trapdoor", "birch_wall_sign", "birch_wood", "black_candle", "black_candle_cake", "black_carpet", "black_concrete", "black_concrete_powder", "black_glazed_terracotta", "black_shulker_box", "black_stained_glass", "black_stained_glass_pane", "black_terracotta", "black_wool", "blackstone", "blackstone_double_slab", "blackstone_slab", "blackstone_stairs", "blackstone_wall", "blast_furnace", "blue_candle", "blue_candle_cake", "blue_carpet", "blue_concrete", "blue_concrete_powder", "blue_glazed_terracotta", "blue_ice", "blue_orchid", "blue_shulker_box", "blue_stained_glass", "blue_stained_glass_pane", "blue_terracotta", "blue_wool", "bone_block", "bookshelf", "border_block", "brain_coral", "brain_coral_block", "brain_coral_fan", "brain_coral_wall_fan", "brewing_stand", "brick_block", "brick_double_slab", "brick_slab", "brick_stairs", "brick_wall", "brown_candle", "brown_candle_cake", "brown_carpet", "brown_concrete", "brown_concrete_powder", "brown_glazed_terracotta", "brown_mushroom", "brown_mushroom_block", "brown_shulker_box", "brown_stained_glass", "brown_stained_glass_pane", "brown_terracotta", "brown_wool", "bubble_column", "bubble_coral", "bubble_coral_block", "bubble_coral_fan", "bubble_coral_wall_fan", "budding_amethyst", "cactus", "cake", "calcite", "calibrated_sculk_sensor", "camera", "campfire", "candle", "candle_cake", "carpet", "carrots", "cartography_table", "carved_pumpkin", "cauldron", "cave_vines", "cave_vines_body_with_berries", "cave_vines_head_with_berries", "chain", "chain_command_block", "cherry_button", "cherry_door", "cherry_double_slab", "cherry_fence", "cherry_fence_gate", "cherry_hanging_sign", "cherry_leaves", "cherry_log", "cherry_planks", "cherry_pressure_plate", "cherry_sapling", "cherry_slab", "cherry_stairs", "cherry_standing_sign", "cherry_trapdoor", "cherry_wall_sign", "cherry_wood", "chest", "chipped_anvil", "chiseled_bookshelf", "chiseled_copper", "chiseled_deepslate", "chiseled_nether_bricks", "chiseled_polished_blackstone", "chiseled_quartz_block", "chiseled_red_sandstone", "chiseled_resin_bricks", "chiseled_sandstone", "chiseled_stone_bricks", "chiseled_tuff", "chiseled_tuff_bricks", "chorus_flower", "chorus_plant", "clay", "closed_eyeblossom", "coal_block", "coal_ore", "coarse_dirt", "cobbled_deepslate", "cobbled_deepslate_double_slab", "cobbled_deepslate_slab", "cobbled_deepslate_stairs", "cobbled_deepslate_wall", "cobblestone", "cobblestone_double_slab", "cobblestone_slab", "cobblestone_wall", "cocoa", "command_block", "composter", "concrete", "concretePowder", "conduit", "copper_block", "copper_bulb", "copper_door", "copper_grate", "copper_ore", "copper_trapdoor", "coral", "coral_block", "coral_fan", "coral_fan_dead", "coral_fan_hang", "coral_fan_hang2", "coral_fan_hang3", "cornflower", "cracked_deepslate_bricks", "cracked_deepslate_tiles", "cracked_nether_bricks", "cracked_polished_blackstone_bricks", "cracked_stone_bricks", "crafter", "crafting_table", "creaking_heart", "creeper_head", "crimson_button", "crimson_door", "crimson_double_slab", "crimson_fence", "crimson_fence_gate", "crimson_fungus", "crimson_hanging_sign", "crimson_hyphae", "crimson_nylium", "crimson_planks", "crimson_pressure_plate", "crimson_roots", "crimson_slab", "crimson_stairs", "crimson_standing_sign", "crimson_stem", "crimson_trapdoor", "crimson_wall_sign", "crying_obsidian", "cut_copper", "cut_copper_slab", "cut_copper_stairs", "cut_red_sandstone", "cut_red_sandstone_slab", "cut_sandstone", "cut_sandstone_slab", "cyan_candle", "cyan_candle_cake", "cyan_carpet", "cyan_concrete", "cyan_concrete_powder", "cyan_glazed_terracotta", "cyan_shulker_box", "cyan_stained_glass", "cyan_stained_glass_pane", "cyan_terracotta", "cyan_wool", "damaged_anvil", "dandelion", "dark_oak_button", "dark_oak_door", "dark_oak_double_slab", "dark_oak_fence", "dark_oak_fence_gate", "dark_oak_hanging_sign", "dark_oak_leaves", "dark_oak_log", "dark_oak_pressure_plate", "dark_oak_sapling", "dark_oak_slab", "dark_oak_stairs", "dark_oak_trapdoor", "dark_oak_wood", "dark_prismarine", "dark_prismarine_double_slab", "dark_prismarine_slab", "dark_prismarine_stairs", "darkoak_standing_sign", "darkoak_wall_sign", "daylight_detector", "daylight_detector_inverted", "dead_brain_coral", "dead_brain_coral_block", "dead_brain_coral_fan", "dead_brain_coral_wall_fan", "dead_bubble_coral", "dead_bubble_coral_block", "dead_bubble_coral_fan", "dead_bubble_coral_wall_fan", "dead_fire_coral", "dead_fire_coral_block", "dead_fire_coral_fan", "dead_fire_coral_wall_fan", "dead_horn_coral", "dead_horn_coral_block", "dead_horn_coral_fan", "dead_horn_coral_wall_fan", "dead_tube_coral", "dead_tube_coral_block", "dead_tube_coral_fan", "dead_tube_coral_wall_fan", "deadbush", "decorated_pot", "deepslate", "deepslate_brick_double_slab", "deepslate_brick_slab", "deepslate_brick_stairs", "deepslate_brick_wall", "deepslate_bricks", "deepslate_coal_ore", "deepslate_copper_ore", "deepslate_diamond_ore", "deepslate_emerald_ore", "deepslate_gold_ore", "deepslate_iron_ore", "deepslate_lapis_ore", "deepslate_redstone_ore", "deepslate_tile_double_slab", "deepslate_tile_slab", "deepslate_tile_stairs", "deepslate_tile_wall", "deepslate_tiles", "deny", "deprecated_anvil", "deprecated_purpur_block_1", "deprecated_purpur_block_2", "detector_rail", "diamond_block", "diamond_ore", "diorite", "diorite_double_slab", "diorite_slab", "diorite_stairs", "diorite_wall", "dirt", "dirt_with_roots", "dispenser", "double_cut_copper_slab", "double_plant", "double_stone_slab", "double_stone_slab2", "double_stone_slab3", "double_stone_slab4", "double_wooden_slab", "dragon_egg", "dragon_head", "dried_kelp_block", "dripstone_block", "dropper", "emerald_block", "emerald_ore", "enchanting_table", "end_brick_stairs", "end_bricks", "end_gateway", "end_portal", "end_portal_frame", "end_rod", "end_stone", "end_stone_brick_double_slab", "end_stone_brick_slab", "end_stone_brick_wall", "ender_chest", "exposed_chiseled_copper", "exposed_copper", "exposed_copper_bulb", "exposed_copper_door", "exposed_copper_grate", "exposed_copper_trapdoor", "exposed_cut_copper", "exposed_cut_copper_slab", "exposed_cut_copper_stairs", "exposed_double_cut_copper_slab", "farmland", "fence", "fence_gate", "fern", "fire", "fire_coral", "fire_coral_block", "fire_coral_fan", "fire_coral_wall_fan", "fletching_table", "flower_pot", "flowering_azalea", "flowing_lava", "flowing_water", "frame", "frog_spawn", "frosted_ice", "furnace", "gilded_blackstone", "glass", "glass_pane", "glow_frame", "glow_lichen", "glowingobsidian", "glowstone", "gold_block", "gold_ore", "golden_rail", "granite", "granite_double_slab", "granite_slab", "granite_stairs", "granite_wall", "grass", "grass_path", "gravel", "gray_candle", "gray_candle_cake", "gray_carpet", "gray_concrete", "gray_concrete_powder", "gray_glazed_terracotta", "gray_shulker_box", "gray_stained_glass", "gray_stained_glass_pane", "gray_terracotta", "gray_wool", "green_candle", "green_candle_cake", "green_carpet", "green_concrete", "green_concrete_powder", "green_glazed_terracotta", "green_shulker_box", "green_stained_glass", "green_stained_glass_pane", "green_terracotta", "green_wool", "grindstone", "hanging_roots", "hardened_clay", "hay_block", "heavy_core", "heavy_weighted_pressure_plate", "honey_block", "honeycomb_block", "hopper", "horn_coral", "horn_coral_block", "horn_coral_fan", "horn_coral_wall_fan", "ice", "infested_chiseled_stone_bricks", "infested_cobblestone", "infested_cracked_stone_bricks", "infested_deepslate", "infested_mossy_stone_bricks", "infested_stone", "infested_stone_bricks", "info_update", "info_update2", "invisibleBedrock", "iron_bars", "iron_block", "iron_door", "iron_ore", "iron_trapdoor", "jigsaw", "jukebox", "jungle_button", "jungle_door", "jungle_double_slab", "jungle_fence", "jungle_fence_gate", "jungle_hanging_sign", "jungle_leaves", "jungle_log", "jungle_pressure_plate", "jungle_sapling", "jungle_slab", "jungle_stairs", "jungle_standing_sign", "jungle_trapdoor", "jungle_wall_sign", "jungle_wood", "kelp", "ladder", "lantern", "lapis_block", "lapis_ore", "large_amethyst_bud", "large_fern", "lava", "lava_cauldron", "leaves", "leaves2", "lectern", "lever", "light_block", "light_block_0", "light_block_1", "light_block_10", "light_block_11", "light_block_12", "light_block_13", "light_block_14", "light_block_15", "light_block_2", "light_block_3", "light_block_4", "light_block_5", "light_block_6", "light_block_7", "light_block_8", "light_block_9", "light_blue_candle", "light_blue_candle_cake", "light_blue_carpet", "light_blue_concrete", "light_blue_concrete_powder", "light_blue_glazed_terracotta", "light_blue_shulker_box", "light_blue_stained_glass", "light_blue_stained_glass_pane", "light_blue_terracotta", "light_blue_wool", "light_gray_candle", "light_gray_candle_cake", "light_gray_carpet", "light_gray_concrete", "light_gray_concrete_powder", "light_gray_shulker_box", "light_gray_stained_glass", "light_gray_stained_glass_pane", "light_gray_terracotta", "light_gray_wool", "light_weighted_pressure_plate", "lightning_rod", "lilac", "lily_of_the_valley", "lime_candle", "lime_candle_cake", "lime_carpet", "lime_concrete", "lime_concrete_powder", "lime_glazed_terracotta", "lime_shulker_box", "lime_stained_glass", "lime_stained_glass_pane", "lime_terracotta", "lime_wool", "lit_blast_furnace", "lit_deepslate_redstone_ore", "lit_furnace", "lit_pumpkin", "lit_redstone_lamp", "lit_redstone_ore", "lit_smoker", "lodestone", "log", "log2", "loom", "magenta_candle", "magenta_candle_cake", "magenta_carpet", "magenta_concrete", "magenta_concrete_powder", "magenta_glazed_terracotta", "magenta_shulker_box", "magenta_stained_glass", "magenta_stained_glass_pane", "magenta_terracotta", "magenta_wool", "magma", "mangrove_button", "mangrove_door", "mangrove_double_slab", "mangrove_fence", "mangrove_fence_gate", "mangrove_hanging_sign", "mangrove_leaves", "mangrove_log", "mangrove_planks", "mangrove_pressure_plate", "mangrove_propagule", "mangrove_roots", "mangrove_slab", "mangrove_stairs", "mangrove_standing_sign", "mangrove_trapdoor", "mangrove_wall_sign", "mangrove_wood", "medium_amethyst_bud", "melon_block", "melon_stem", "mob_spawner", "monster_egg", "moss_block", "moss_carpet", "mossy_cobblestone", "mossy_cobblestone_double_slab", "mossy_cobblestone_slab", "mossy_cobblestone_stairs", "mossy_cobblestone_wall", "mossy_stone_brick_slab", "mossy_stone_brick_stairs", "mossy_stone_brick_wall", "mossy_stone_bricks", "movingBlock", "mud", "mud_brick_double_slab", "mud_brick_slab", "mud_brick_stairs", "mud_brick_wall", "mud_bricks", "muddy_mangrove_roots", "mushroom_stem", "mycelium", "nether_brick", "nether_brick_double_slab", "nether_brick_fence", "nether_brick_slab", "nether_brick_stairs", "nether_brick_wall", "nether_gold_ore", "nether_sprouts", "nether_wart", "nether_wart_block", "netherite_block", "netherrack", "netherreactor", "normal_stone_slab", "normal_stone_stairs", "noteblock", "oak_double_slab", "oak_fence", "oak_hanging_sign", "oak_leaves", "oak_log", "oak_sapling", "oak_slab", "oak_stairs", "oak_wood", "observer", "obsidian", "ochre_froglight", "open_eyeblossom", "orange_candle", "orange_candle_cake", "orange_carpet", "orange_concrete", "orange_concrete_powder", "orange_glazed_terracotta", "orange_shulker_box", "orange_stained_glass", "orange_stained_glass_pane", "orange_terracotta", "orange_tulip", "orange_wool", "oxeye_daisy", "oxidized_chiseled_copper", "oxidized_copper", "oxidized_copper_bulb", "oxidized_copper_door", "oxidized_copper_grate", "oxidized_copper_trapdoor", "oxidized_cut_copper", "oxidized_cut_copper_slab", "oxidized_cut_copper_stairs", "oxidized_double_cut_copper_slab", "packed_ice", "packed_mud", "pale_hanging_moss", "pale_moss_block", "pale_moss_carpet", "pale_oak_button", "pale_oak_door", "pale_oak_double_slab", "pale_oak_fence", "pale_oak_fence_gate", "pale_oak_hanging_sign", "pale_oak_leaves", "pale_oak_log", "pale_oak_planks", "pale_oak_pressure_plate", "pale_oak_sapling", "pale_oak_slab", "pale_oak_stairs", "pale_oak_standing_sign", "pale_oak_trapdoor", "pale_oak_wall_sign", "pale_oak_wood", "pearlescent_froglight", "peony", "petrified_oak_double_slab", "petrified_oak_slab", "piglin_head", "pink_candle", "pink_candle_cake", "pink_carpet", "pink_concrete", "pink_concrete_powder", "pink_glazed_terracotta", "pink_petals", "pink_shulker_box", "pink_stained_glass", "pink_stained_glass_pane", "pink_terracotta", "pink_tulip", "pink_wool", "piston", "pistonArmCollision", "pitcher_crop", "pitcher_plant", "planks", "player_head", "podzol", "pointed_dripstone", "polished_andesite", "polished_andesite_double_slab", "polished_andesite_slab", "polished_andesite_stairs", "polished_basalt", "polished_blackstone", "polished_blackstone_brick_double_slab", "polished_blackstone_brick_slab", "polished_blackstone_brick_stairs", "polished_blackstone_brick_wall", "polished_blackstone_bricks", "polished_blackstone_button", "polished_blackstone_double_slab", "polished_blackstone_pressure_plate", "polished_blackstone_slab", "polished_blackstone_stairs", "polished_blackstone_wall", "polished_deepslate", "polished_deepslate_double_slab", "polished_deepslate_slab", "polished_deepslate_stairs", "polished_deepslate_wall", "polished_diorite", "polished_diorite_double_slab", "polished_diorite_slab", "polished_diorite_stairs", "polished_granite", "polished_granite_double_slab", "polished_granite_slab", "polished_granite_stairs", "polished_tuff", "polished_tuff_double_slab", "polished_tuff_slab", "polished_tuff_stairs", "polished_tuff_wall", "poppy", "portal", "potatoes", "powder_snow", "powered_comparator", "powered_repeater", "prismarine", "prismarine_brick_double_slab", "prismarine_brick_slab", "prismarine_bricks", "prismarine_bricks_stairs", "prismarine_double_slab", "prismarine_slab", "prismarine_stairs", "prismarine_wall", "pumpkin", "pumpkin_stem", "purple_candle", "purple_candle_cake", "purple_carpet", "purple_concrete", "purple_concrete_powder", "purple_glazed_terracotta", "purple_shulker_box", "purple_stained_glass", "purple_stained_glass_pane", "purple_terracotta", "purple_wool", "purpur_block", "purpur_double_slab", "purpur_pillar", "purpur_slab", "purpur_stairs", "quartz_block", "quartz_bricks", "quartz_double_slab", "quartz_ore", "quartz_pillar", "quartz_slab", "quartz_stairs", "rail", "raw_copper_block", "raw_gold_block", "raw_iron_block", "red_candle", "red_candle_cake", "red_carpet", "red_concrete", "red_concrete_powder", "red_flower", "red_glazed_terracotta", "red_mushroom", "red_mushroom_block", "red_nether_brick", "red_nether_brick_double_slab", "red_nether_brick_slab", "red_nether_brick_stairs", "red_nether_brick_wall", "red_sand", "red_sandstone", "red_sandstone_double_slab", "red_sandstone_slab", "red_sandstone_stairs", "red_sandstone_wall", "red_shulker_box", "red_stained_glass", "red_stained_glass_pane", "red_terracotta", "red_tulip", "red_wool", "redstone_block", "redstone_lamp", "redstone_ore", "redstone_torch", "redstone_wire", "reeds", "reinforced_deepslate", "repeating_command_block", "reserved6", "resin_block", "resin_brick_double_slab", "resin_brick_slab", "resin_brick_stairs", "resin_brick_wall", "resin_bricks", "resin_clump", "respawn_anchor", "rose_bush", "sand", "sandstone", "sandstone_double_slab", "sandstone_slab", "sandstone_stairs", "sandstone_wall", "sapling", "scaffolding", "sculk", "sculk_catalyst", "sculk_sensor", "sculk_shrieker", "sculk_vein", "seaLantern", "sea_pickle", "seagrass", "short_grass", "shroomlight", "shulker_box", "silver_glazed_terracotta", "skeleton_skull", "skull", "slime", "small_amethyst_bud", "small_dripleaf_block", "smithing_table", "smoker", "smooth_basalt", "smooth_quartz", "smooth_quartz_slab", "smooth_quartz_stairs", "smooth_red_sandstone", "smooth_red_sandstone_double_slab", "smooth_red_sandstone_slab", "smooth_red_sandstone_stairs", "smooth_sandstone", "smooth_sandstone_double_slab", "smooth_sandstone_slab", "smooth_sandstone_stairs", "smooth_stone", "smooth_stone_double_slab", "smooth_stone_slab", "sniffer_egg", "snow", "snow_layer", "soul_campfire", "soul_fire", "soul_lantern", "soul_sand", "soul_soil", "soul_torch", "sponge", "spore_blossom", "spruce_button", "spruce_door", "spruce_double_slab", "spruce_fence", "spruce_fence_gate", "spruce_hanging_sign", "spruce_leaves", "spruce_log", "spruce_pressure_plate", "spruce_sapling", "spruce_slab", "spruce_stairs", "spruce_standing_sign", "spruce_trapdoor", "spruce_wall_sign", "spruce_wood", "stained_glass", "stained_glass_pane", "stained_hardened_clay", "standing_banner", "standing_sign", "stickyPistonArmCollision", "sticky_piston", "stone", "stone_brick_double_slab", "stone_brick_slab", "stone_brick_stairs", "stone_brick_wall", "stone_bricks", "stone_button", "stone_pressure_plate", "stone_slab", "stone_slab2", "stone_slab3", "stone_slab4", "stone_stairs", "stonebrick", "stonecutter", "stonecutter_block", "stripped_acacia_log", "stripped_acacia_wood", "stripped_bamboo_block", "stripped_birch_log", "stripped_birch_wood", "stripped_cherry_log", "stripped_cherry_wood", "stripped_crimson_hyphae", "stripped_crimson_stem", "stripped_dark_oak_log", "stripped_dark_oak_wood", "stripped_jungle_log", "stripped_jungle_wood", "stripped_mangrove_log", "stripped_mangrove_wood", "stripped_oak_log", "stripped_oak_wood", "stripped_pale_oak_log", "stripped_pale_oak_wood", "stripped_spruce_log", "stripped_spruce_wood", "stripped_warped_hyphae", "stripped_warped_stem", "structure_block", "structure_void", "sunflower", "suspicious_gravel", "suspicious_sand", "sweet_berry_bush", "tall_grass", "tallgrass", "target", "tinted_glass", "tnt", "torch", "torchflower", "torchflower_crop", "trapdoor", "trapped_chest", "trial_spawner", "tripWire", "tripwire_hook", "tube_coral", "tube_coral_block", "tube_coral_fan", "tube_coral_wall_fan", "tuff", "tuff_brick_double_slab", "tuff_brick_slab", "tuff_brick_stairs", "tuff_brick_wall", "tuff_bricks", "tuff_double_slab", "tuff_slab", "tuff_stairs", "tuff_wall", "turtle_egg", "twisting_vines", "undyed_shulker_box", "unlit_redstone_torch", "unpowered_comparator", "unpowered_repeater", "vault", "verdant_froglight", "vine", "wall_banner", "wall_sign", "warped_button", "warped_door", "warped_double_slab", "warped_fence", "warped_fence_gate", "warped_fungus", "warped_hanging_sign", "warped_hyphae", "warped_nylium", "warped_planks", "warped_pressure_plate", "warped_roots", "warped_slab", "warped_stairs", "warped_standing_sign", "warped_stem", "warped_trapdoor", "warped_wall_sign", "warped_wart_block", "water", "waterlily", "waxed_chiseled_copper", "waxed_copper", "waxed_copper_bulb", "waxed_copper_door", "waxed_copper_grate", "waxed_copper_trapdoor", "waxed_cut_copper", "waxed_cut_copper_slab", "waxed_cut_copper_stairs", "waxed_double_cut_copper_slab", "waxed_exposed_chiseled_copper", "waxed_exposed_copper", "waxed_exposed_copper_bulb", "waxed_exposed_copper_door", "waxed_exposed_copper_grate", "waxed_exposed_copper_trapdoor", "waxed_exposed_cut_copper", "waxed_exposed_cut_copper_slab", "waxed_exposed_cut_copper_stairs", "waxed_exposed_double_cut_copper_slab", "waxed_oxidized_chiseled_copper", "waxed_oxidized_copper", "waxed_oxidized_copper_bulb", "waxed_oxidized_copper_door", "waxed_oxidized_copper_grate", "waxed_oxidized_copper_trapdoor", "waxed_oxidized_cut_copper", "waxed_oxidized_cut_copper_slab", "waxed_oxidized_cut_copper_stairs", "waxed_oxidized_double_cut_copper_slab", "waxed_weathered_chiseled_copper", "waxed_weathered_copper", "waxed_weathered_copper_bulb", "waxed_weathered_copper_door", "waxed_weathered_copper_grate", "waxed_weathered_copper_trapdoor", "waxed_weathered_cut_copper", "waxed_weathered_cut_copper_slab", "waxed_weathered_cut_copper_stairs", "waxed_weathered_double_cut_copper_slab", "weathered_chiseled_copper", "weathered_copper", "weathered_copper_bulb", "weathered_copper_door", "weathered_copper_grate", "weathered_copper_trapdoor", "weathered_cut_copper", "weathered_cut_copper_slab", "weathered_cut_copper_stairs", "weathered_double_cut_copper_slab", "web", "weeping_vines", "wet_sponge", "wheat", "white_candle", "white_candle_cake", "white_carpet", "white_concrete", "white_concrete_powder", "white_glazed_terracotta", "white_shulker_box", "white_stained_glass", "white_stained_glass_pane", "white_terracotta", "white_tulip", "white_wool", "wither_rose", "wither_skeleton_skull", "wood", "wooden_button", "wooden_door", "wooden_pressure_plate", "wooden_slab", "wool", "yellow_candle", "yellow_candle_cake", "yellow_carpet", "yellow_concrete", "yellow_concrete_powder", "yellow_flower", "yellow_glazed_terracotta", "yellow_shulker_box", "yellow_stained_glass", "yellow_stained_glass_pane", "yellow_terracotta", "yellow_wool", "zombie_head"]}}`);
        }, 2);
    }
    for (const i of flintSteelSlots) {
        const pI = parseIndex(i);
        system.runTimeout(() => {
            player.runCommand(`replaceitem entity @s ${pI.type} ${pI.slot} flint_and_steel 1 70 {"minecraft:can_place_on": {"blocks": ["bot:block", "acacia_button", "acacia_door", "acacia_double_slab", "acacia_fence", "acacia_fence_gate", "acacia_hanging_sign", "acacia_leaves", "acacia_log", "acacia_pressure_plate", "acacia_sapling", "acacia_slab", "acacia_stairs", "acacia_standing_sign", "acacia_trapdoor", "acacia_wall_sign", "acacia_wood", "activator_rail", "air", "allium", "allow", "amethyst_block", "amethyst_cluster", "ancient_debris", "andesite", "andesite_double_slab", "andesite_slab", "andesite_stairs", "andesite_wall", "anvil", "azalea", "azalea_leaves", "azalea_leaves_flowered", "azure_bluet", "bamboo", "bamboo_block", "bamboo_button", "bamboo_door", "bamboo_double_slab", "bamboo_fence", "bamboo_fence_gate", "bamboo_hanging_sign", "bamboo_mosaic", "bamboo_mosaic_double_slab", "bamboo_mosaic_slab", "bamboo_mosaic_stairs", "bamboo_planks", "bamboo_pressure_plate", "bamboo_sapling", "bamboo_slab", "bamboo_stairs", "bamboo_standing_sign", "bamboo_trapdoor", "bamboo_wall_sign", "barrel", "basalt", "beacon", "bed", "bedrock", "bee_nest", "beehive", "beetroot", "bell", "big_dripleaf", "birch_button", "birch_door", "birch_double_slab", "birch_fence", "birch_fence_gate", "birch_hanging_sign", "birch_leaves", "birch_log", "birch_pressure_plate", "birch_sapling", "birch_slab", "birch_stairs", "birch_standing_sign", "birch_trapdoor", "birch_wall_sign", "birch_wood", "black_candle", "black_candle_cake", "black_carpet", "black_concrete", "black_concrete_powder", "black_glazed_terracotta", "black_shulker_box", "black_stained_glass", "black_stained_glass_pane", "black_terracotta", "black_wool", "blackstone", "blackstone_double_slab", "blackstone_slab", "blackstone_stairs", "blackstone_wall", "blast_furnace", "blue_candle", "blue_candle_cake", "blue_carpet", "blue_concrete", "blue_concrete_powder", "blue_glazed_terracotta", "blue_ice", "blue_orchid", "blue_shulker_box", "blue_stained_glass", "blue_stained_glass_pane", "blue_terracotta", "blue_wool", "bone_block", "bookshelf", "border_block", "brain_coral", "brain_coral_block", "brain_coral_fan", "brain_coral_wall_fan", "brewing_stand", "brick_block", "brick_double_slab", "brick_slab", "brick_stairs", "brick_wall", "brown_candle", "brown_candle_cake", "brown_carpet", "brown_concrete", "brown_concrete_powder", "brown_glazed_terracotta", "brown_mushroom", "brown_mushroom_block", "brown_shulker_box", "brown_stained_glass", "brown_stained_glass_pane", "brown_terracotta", "brown_wool", "bubble_column", "bubble_coral", "bubble_coral_block", "bubble_coral_fan", "bubble_coral_wall_fan", "budding_amethyst", "cactus", "cake", "calcite", "calibrated_sculk_sensor", "camera", "campfire", "candle", "candle_cake", "carpet", "carrots", "cartography_table", "carved_pumpkin", "cauldron", "cave_vines", "cave_vines_body_with_berries", "cave_vines_head_with_berries", "chain", "chain_command_block", "cherry_button", "cherry_door", "cherry_double_slab", "cherry_fence", "cherry_fence_gate", "cherry_hanging_sign", "cherry_leaves", "cherry_log", "cherry_planks", "cherry_pressure_plate", "cherry_sapling", "cherry_slab", "cherry_stairs", "cherry_standing_sign", "cherry_trapdoor", "cherry_wall_sign", "cherry_wood", "chest", "chipped_anvil", "chiseled_bookshelf", "chiseled_copper", "chiseled_deepslate", "chiseled_nether_bricks", "chiseled_polished_blackstone", "chiseled_quartz_block", "chiseled_red_sandstone", "chiseled_resin_bricks", "chiseled_sandstone", "chiseled_stone_bricks", "chiseled_tuff", "chiseled_tuff_bricks", "chorus_flower", "chorus_plant", "clay", "closed_eyeblossom", "coal_block", "coal_ore", "coarse_dirt", "cobbled_deepslate", "cobbled_deepslate_double_slab", "cobbled_deepslate_slab", "cobbled_deepslate_stairs", "cobbled_deepslate_wall", "cobblestone", "cobblestone_double_slab", "cobblestone_slab", "cobblestone_wall", "cocoa", "command_block", "composter", "concrete", "concretePowder", "conduit", "copper_block", "copper_bulb", "copper_door", "copper_grate", "copper_ore", "copper_trapdoor", "coral", "coral_block", "coral_fan", "coral_fan_dead", "coral_fan_hang", "coral_fan_hang2", "coral_fan_hang3", "cornflower", "cracked_deepslate_bricks", "cracked_deepslate_tiles", "cracked_nether_bricks", "cracked_polished_blackstone_bricks", "cracked_stone_bricks", "crafter", "crafting_table", "creaking_heart", "creeper_head", "crimson_button", "crimson_door", "crimson_double_slab", "crimson_fence", "crimson_fence_gate", "crimson_fungus", "crimson_hanging_sign", "crimson_hyphae", "crimson_nylium", "crimson_planks", "crimson_pressure_plate", "crimson_roots", "crimson_slab", "crimson_stairs", "crimson_standing_sign", "crimson_stem", "crimson_trapdoor", "crimson_wall_sign", "crying_obsidian", "cut_copper", "cut_copper_slab", "cut_copper_stairs", "cut_red_sandstone", "cut_red_sandstone_slab", "cut_sandstone", "cut_sandstone_slab", "cyan_candle", "cyan_candle_cake", "cyan_carpet", "cyan_concrete", "cyan_concrete_powder", "cyan_glazed_terracotta", "cyan_shulker_box", "cyan_stained_glass", "cyan_stained_glass_pane", "cyan_terracotta", "cyan_wool", "damaged_anvil", "dandelion", "dark_oak_button", "dark_oak_door", "dark_oak_double_slab", "dark_oak_fence", "dark_oak_fence_gate", "dark_oak_hanging_sign", "dark_oak_leaves", "dark_oak_log", "dark_oak_pressure_plate", "dark_oak_sapling", "dark_oak_slab", "dark_oak_stairs", "dark_oak_trapdoor", "dark_oak_wood", "dark_prismarine", "dark_prismarine_double_slab", "dark_prismarine_slab", "dark_prismarine_stairs", "darkoak_standing_sign", "darkoak_wall_sign", "daylight_detector", "daylight_detector_inverted", "dead_brain_coral", "dead_brain_coral_block", "dead_brain_coral_fan", "dead_brain_coral_wall_fan", "dead_bubble_coral", "dead_bubble_coral_block", "dead_bubble_coral_fan", "dead_bubble_coral_wall_fan", "dead_fire_coral", "dead_fire_coral_block", "dead_fire_coral_fan", "dead_fire_coral_wall_fan", "dead_horn_coral", "dead_horn_coral_block", "dead_horn_coral_fan", "dead_horn_coral_wall_fan", "dead_tube_coral", "dead_tube_coral_block", "dead_tube_coral_fan", "dead_tube_coral_wall_fan", "deadbush", "decorated_pot", "deepslate", "deepslate_brick_double_slab", "deepslate_brick_slab", "deepslate_brick_stairs", "deepslate_brick_wall", "deepslate_bricks", "deepslate_coal_ore", "deepslate_copper_ore", "deepslate_diamond_ore", "deepslate_emerald_ore", "deepslate_gold_ore", "deepslate_iron_ore", "deepslate_lapis_ore", "deepslate_redstone_ore", "deepslate_tile_double_slab", "deepslate_tile_slab", "deepslate_tile_stairs", "deepslate_tile_wall", "deepslate_tiles", "deny", "deprecated_anvil", "deprecated_purpur_block_1", "deprecated_purpur_block_2", "detector_rail", "diamond_block", "diamond_ore", "diorite", "diorite_double_slab", "diorite_slab", "diorite_stairs", "diorite_wall", "dirt", "dirt_with_roots", "dispenser", "double_cut_copper_slab", "double_plant", "double_stone_slab", "double_stone_slab2", "double_stone_slab3", "double_stone_slab4", "double_wooden_slab", "dragon_egg", "dragon_head", "dried_kelp_block", "dripstone_block", "dropper", "emerald_block", "emerald_ore", "enchanting_table", "end_brick_stairs", "end_bricks", "end_gateway", "end_portal", "end_portal_frame", "end_rod", "end_stone", "end_stone_brick_double_slab", "end_stone_brick_slab", "end_stone_brick_wall", "ender_chest", "exposed_chiseled_copper", "exposed_copper", "exposed_copper_bulb", "exposed_copper_door", "exposed_copper_grate", "exposed_copper_trapdoor", "exposed_cut_copper", "exposed_cut_copper_slab", "exposed_cut_copper_stairs", "exposed_double_cut_copper_slab", "farmland", "fence", "fence_gate", "fern", "fire", "fire_coral", "fire_coral_block", "fire_coral_fan", "fire_coral_wall_fan", "fletching_table", "flower_pot", "flowering_azalea", "flowing_lava", "flowing_water", "frame", "frog_spawn", "frosted_ice", "furnace", "gilded_blackstone", "glass", "glass_pane", "glow_frame", "glow_lichen", "glowingobsidian", "glowstone", "gold_block", "gold_ore", "golden_rail", "granite", "granite_double_slab", "granite_slab", "granite_stairs", "granite_wall", "grass", "grass_path", "gravel", "gray_candle", "gray_candle_cake", "gray_carpet", "gray_concrete", "gray_concrete_powder", "gray_glazed_terracotta", "gray_shulker_box", "gray_stained_glass", "gray_stained_glass_pane", "gray_terracotta", "gray_wool", "green_candle", "green_candle_cake", "green_carpet", "green_concrete", "green_concrete_powder", "green_glazed_terracotta", "green_shulker_box", "green_stained_glass", "green_stained_glass_pane", "green_terracotta", "green_wool", "grindstone", "hanging_roots", "hardened_clay", "hay_block", "heavy_core", "heavy_weighted_pressure_plate", "honey_block", "honeycomb_block", "hopper", "horn_coral", "horn_coral_block", "horn_coral_fan", "horn_coral_wall_fan", "ice", "infested_chiseled_stone_bricks", "infested_cobblestone", "infested_cracked_stone_bricks", "infested_deepslate", "infested_mossy_stone_bricks", "infested_stone", "infested_stone_bricks", "info_update", "info_update2", "invisibleBedrock", "iron_bars", "iron_block", "iron_door", "iron_ore", "iron_trapdoor", "jigsaw", "jukebox", "jungle_button", "jungle_door", "jungle_double_slab", "jungle_fence", "jungle_fence_gate", "jungle_hanging_sign", "jungle_leaves", "jungle_log", "jungle_pressure_plate", "jungle_sapling", "jungle_slab", "jungle_stairs", "jungle_standing_sign", "jungle_trapdoor", "jungle_wall_sign", "jungle_wood", "kelp", "ladder", "lantern", "lapis_block", "lapis_ore", "large_amethyst_bud", "large_fern", "lava", "lava_cauldron", "leaves", "leaves2", "lectern", "lever", "light_block", "light_block_0", "light_block_1", "light_block_10", "light_block_11", "light_block_12", "light_block_13", "light_block_14", "light_block_15", "light_block_2", "light_block_3", "light_block_4", "light_block_5", "light_block_6", "light_block_7", "light_block_8", "light_block_9", "light_blue_candle", "light_blue_candle_cake", "light_blue_carpet", "light_blue_concrete", "light_blue_concrete_powder", "light_blue_glazed_terracotta", "light_blue_shulker_box", "light_blue_stained_glass", "light_blue_stained_glass_pane", "light_blue_terracotta", "light_blue_wool", "light_gray_candle", "light_gray_candle_cake", "light_gray_carpet", "light_gray_concrete", "light_gray_concrete_powder", "light_gray_shulker_box", "light_gray_stained_glass", "light_gray_stained_glass_pane", "light_gray_terracotta", "light_gray_wool", "light_weighted_pressure_plate", "lightning_rod", "lilac", "lily_of_the_valley", "lime_candle", "lime_candle_cake", "lime_carpet", "lime_concrete", "lime_concrete_powder", "lime_glazed_terracotta", "lime_shulker_box", "lime_stained_glass", "lime_stained_glass_pane", "lime_terracotta", "lime_wool", "lit_blast_furnace", "lit_deepslate_redstone_ore", "lit_furnace", "lit_pumpkin", "lit_redstone_lamp", "lit_redstone_ore", "lit_smoker", "lodestone", "log", "log2", "loom", "magenta_candle", "magenta_candle_cake", "magenta_carpet", "magenta_concrete", "magenta_concrete_powder", "magenta_glazed_terracotta", "magenta_shulker_box", "magenta_stained_glass", "magenta_stained_glass_pane", "magenta_terracotta", "magenta_wool", "magma", "mangrove_button", "mangrove_door", "mangrove_double_slab", "mangrove_fence", "mangrove_fence_gate", "mangrove_hanging_sign", "mangrove_leaves", "mangrove_log", "mangrove_planks", "mangrove_pressure_plate", "mangrove_propagule", "mangrove_roots", "mangrove_slab", "mangrove_stairs", "mangrove_standing_sign", "mangrove_trapdoor", "mangrove_wall_sign", "mangrove_wood", "medium_amethyst_bud", "melon_block", "melon_stem", "mob_spawner", "monster_egg", "moss_block", "moss_carpet", "mossy_cobblestone", "mossy_cobblestone_double_slab", "mossy_cobblestone_slab", "mossy_cobblestone_stairs", "mossy_cobblestone_wall", "mossy_stone_brick_slab", "mossy_stone_brick_stairs", "mossy_stone_brick_wall", "mossy_stone_bricks", "movingBlock", "mud", "mud_brick_double_slab", "mud_brick_slab", "mud_brick_stairs", "mud_brick_wall", "mud_bricks", "muddy_mangrove_roots", "mushroom_stem", "mycelium", "nether_brick", "nether_brick_double_slab", "nether_brick_fence", "nether_brick_slab", "nether_brick_stairs", "nether_brick_wall", "nether_gold_ore", "nether_sprouts", "nether_wart", "nether_wart_block", "netherite_block", "netherrack", "netherreactor", "normal_stone_slab", "normal_stone_stairs", "noteblock", "oak_double_slab", "oak_fence", "oak_hanging_sign", "oak_leaves", "oak_log", "oak_sapling", "oak_slab", "oak_stairs", "oak_wood", "observer", "obsidian", "ochre_froglight", "open_eyeblossom", "orange_candle", "orange_candle_cake", "orange_carpet", "orange_concrete", "orange_concrete_powder", "orange_glazed_terracotta", "orange_shulker_box", "orange_stained_glass", "orange_stained_glass_pane", "orange_terracotta", "orange_tulip", "orange_wool", "oxeye_daisy", "oxidized_chiseled_copper", "oxidized_copper", "oxidized_copper_bulb", "oxidized_copper_door", "oxidized_copper_grate", "oxidized_copper_trapdoor", "oxidized_cut_copper", "oxidized_cut_copper_slab", "oxidized_cut_copper_stairs", "oxidized_double_cut_copper_slab", "packed_ice", "packed_mud", "pale_hanging_moss", "pale_moss_block", "pale_moss_carpet", "pale_oak_button", "pale_oak_door", "pale_oak_double_slab", "pale_oak_fence", "pale_oak_fence_gate", "pale_oak_hanging_sign", "pale_oak_leaves", "pale_oak_log", "pale_oak_planks", "pale_oak_pressure_plate", "pale_oak_sapling", "pale_oak_slab", "pale_oak_stairs", "pale_oak_standing_sign", "pale_oak_trapdoor", "pale_oak_wall_sign", "pale_oak_wood", "pearlescent_froglight", "peony", "petrified_oak_double_slab", "petrified_oak_slab", "piglin_head", "pink_candle", "pink_candle_cake", "pink_carpet", "pink_concrete", "pink_concrete_powder", "pink_glazed_terracotta", "pink_petals", "pink_shulker_box", "pink_stained_glass", "pink_stained_glass_pane", "pink_terracotta", "pink_tulip", "pink_wool", "piston", "pistonArmCollision", "pitcher_crop", "pitcher_plant", "planks", "player_head", "podzol", "pointed_dripstone", "polished_andesite", "polished_andesite_double_slab", "polished_andesite_slab", "polished_andesite_stairs", "polished_basalt", "polished_blackstone", "polished_blackstone_brick_double_slab", "polished_blackstone_brick_slab", "polished_blackstone_brick_stairs", "polished_blackstone_brick_wall", "polished_blackstone_bricks", "polished_blackstone_button", "polished_blackstone_double_slab", "polished_blackstone_pressure_plate", "polished_blackstone_slab", "polished_blackstone_stairs", "polished_blackstone_wall", "polished_deepslate", "polished_deepslate_double_slab", "polished_deepslate_slab", "polished_deepslate_stairs", "polished_deepslate_wall", "polished_diorite", "polished_diorite_double_slab", "polished_diorite_slab", "polished_diorite_stairs", "polished_granite", "polished_granite_double_slab", "polished_granite_slab", "polished_granite_stairs", "polished_tuff", "polished_tuff_double_slab", "polished_tuff_slab", "polished_tuff_stairs", "polished_tuff_wall", "poppy", "portal", "potatoes", "powder_snow", "powered_comparator", "powered_repeater", "prismarine", "prismarine_brick_double_slab", "prismarine_brick_slab", "prismarine_bricks", "prismarine_bricks_stairs", "prismarine_double_slab", "prismarine_slab", "prismarine_stairs", "prismarine_wall", "pumpkin", "pumpkin_stem", "purple_candle", "purple_candle_cake", "purple_carpet", "purple_concrete", "purple_concrete_powder", "purple_glazed_terracotta", "purple_shulker_box", "purple_stained_glass", "purple_stained_glass_pane", "purple_terracotta", "purple_wool", "purpur_block", "purpur_double_slab", "purpur_pillar", "purpur_slab", "purpur_stairs", "quartz_block", "quartz_bricks", "quartz_double_slab", "quartz_ore", "quartz_pillar", "quartz_slab", "quartz_stairs", "rail", "raw_copper_block", "raw_gold_block", "raw_iron_block", "red_candle", "red_candle_cake", "red_carpet", "red_concrete", "red_concrete_powder", "red_flower", "red_glazed_terracotta", "red_mushroom", "red_mushroom_block", "red_nether_brick", "red_nether_brick_double_slab", "red_nether_brick_slab", "red_nether_brick_stairs", "red_nether_brick_wall", "red_sand", "red_sandstone", "red_sandstone_double_slab", "red_sandstone_slab", "red_sandstone_stairs", "red_sandstone_wall", "red_shulker_box", "red_stained_glass", "red_stained_glass_pane", "red_terracotta", "red_tulip", "red_wool", "redstone_block", "redstone_lamp", "redstone_ore", "redstone_torch", "redstone_wire", "reeds", "reinforced_deepslate", "repeating_command_block", "reserved6", "resin_block", "resin_brick_double_slab", "resin_brick_slab", "resin_brick_stairs", "resin_brick_wall", "resin_bricks", "resin_clump", "respawn_anchor", "rose_bush", "sand", "sandstone", "sandstone_double_slab", "sandstone_slab", "sandstone_stairs", "sandstone_wall", "sapling", "scaffolding", "sculk", "sculk_catalyst", "sculk_sensor", "sculk_shrieker", "sculk_vein", "seaLantern", "sea_pickle", "seagrass", "short_grass", "shroomlight", "shulker_box", "silver_glazed_terracotta", "skeleton_skull", "skull", "slime", "small_amethyst_bud", "small_dripleaf_block", "smithing_table", "smoker", "smooth_basalt", "smooth_quartz", "smooth_quartz_slab", "smooth_quartz_stairs", "smooth_red_sandstone", "smooth_red_sandstone_double_slab", "smooth_red_sandstone_slab", "smooth_red_sandstone_stairs", "smooth_sandstone", "smooth_sandstone_double_slab", "smooth_sandstone_slab", "smooth_sandstone_stairs", "smooth_stone", "smooth_stone_double_slab", "smooth_stone_slab", "sniffer_egg", "snow", "snow_layer", "soul_campfire", "soul_fire", "soul_lantern", "soul_sand", "soul_soil", "soul_torch", "sponge", "spore_blossom", "spruce_button", "spruce_door", "spruce_double_slab", "spruce_fence", "spruce_fence_gate", "spruce_hanging_sign", "spruce_leaves", "spruce_log", "spruce_pressure_plate", "spruce_sapling", "spruce_slab", "spruce_stairs", "spruce_standing_sign", "spruce_trapdoor", "spruce_wall_sign", "spruce_wood", "stained_glass", "stained_glass_pane", "stained_hardened_clay", "standing_banner", "standing_sign", "stickyPistonArmCollision", "sticky_piston", "stone", "stone_brick_double_slab", "stone_brick_slab", "stone_brick_stairs", "stone_brick_wall", "stone_bricks", "stone_button", "stone_pressure_plate", "stone_slab", "stone_slab2", "stone_slab3", "stone_slab4", "stone_stairs", "stonebrick", "stonecutter", "stonecutter_block", "stripped_acacia_log", "stripped_acacia_wood", "stripped_bamboo_block", "stripped_birch_log", "stripped_birch_wood", "stripped_cherry_log", "stripped_cherry_wood", "stripped_crimson_hyphae", "stripped_crimson_stem", "stripped_dark_oak_log", "stripped_dark_oak_wood", "stripped_jungle_log", "stripped_jungle_wood", "stripped_mangrove_log", "stripped_mangrove_wood", "stripped_oak_log", "stripped_oak_wood", "stripped_pale_oak_log", "stripped_pale_oak_wood", "stripped_spruce_log", "stripped_spruce_wood", "stripped_warped_hyphae", "stripped_warped_stem", "structure_block", "structure_void", "sunflower", "suspicious_gravel", "suspicious_sand", "sweet_berry_bush", "tall_grass", "tallgrass", "target", "tinted_glass", "tnt", "torch", "torchflower", "torchflower_crop", "trapdoor", "trapped_chest", "trial_spawner", "tripWire", "tripwire_hook", "tube_coral", "tube_coral_block", "tube_coral_fan", "tube_coral_wall_fan", "tuff", "tuff_brick_double_slab", "tuff_brick_slab", "tuff_brick_stairs", "tuff_brick_wall", "tuff_bricks", "tuff_double_slab", "tuff_slab", "tuff_stairs", "tuff_wall", "turtle_egg", "twisting_vines", "undyed_shulker_box", "unlit_redstone_torch", "unpowered_comparator", "unpowered_repeater", "vault", "verdant_froglight", "vine", "wall_banner", "wall_sign", "warped_button", "warped_door", "warped_double_slab", "warped_fence", "warped_fence_gate", "warped_fungus", "warped_hanging_sign", "warped_hyphae", "warped_nylium", "warped_planks", "warped_pressure_plate", "warped_roots", "warped_slab", "warped_stairs", "warped_standing_sign", "warped_stem", "warped_trapdoor", "warped_wall_sign", "warped_wart_block", "water", "waterlily", "waxed_chiseled_copper", "waxed_copper", "waxed_copper_bulb", "waxed_copper_door", "waxed_copper_grate", "waxed_copper_trapdoor", "waxed_cut_copper", "waxed_cut_copper_slab", "waxed_cut_copper_stairs", "waxed_double_cut_copper_slab", "waxed_exposed_chiseled_copper", "waxed_exposed_copper", "waxed_exposed_copper_bulb", "waxed_exposed_copper_door", "waxed_exposed_copper_grate", "waxed_exposed_copper_trapdoor", "waxed_exposed_cut_copper", "waxed_exposed_cut_copper_slab", "waxed_exposed_cut_copper_stairs", "waxed_exposed_double_cut_copper_slab", "waxed_oxidized_chiseled_copper", "waxed_oxidized_copper", "waxed_oxidized_copper_bulb", "waxed_oxidized_copper_door", "waxed_oxidized_copper_grate", "waxed_oxidized_copper_trapdoor", "waxed_oxidized_cut_copper", "waxed_oxidized_cut_copper_slab", "waxed_oxidized_cut_copper_stairs", "waxed_oxidized_double_cut_copper_slab", "waxed_weathered_chiseled_copper", "waxed_weathered_copper", "waxed_weathered_copper_bulb", "waxed_weathered_copper_door", "waxed_weathered_copper_grate", "waxed_weathered_copper_trapdoor", "waxed_weathered_cut_copper", "waxed_weathered_cut_copper_slab", "waxed_weathered_cut_copper_stairs", "waxed_weathered_double_cut_copper_slab", "weathered_chiseled_copper", "weathered_copper", "weathered_copper_bulb", "weathered_copper_door", "weathered_copper_grate", "weathered_copper_trapdoor", "weathered_cut_copper", "weathered_cut_copper_slab", "weathered_cut_copper_stairs", "weathered_double_cut_copper_slab", "web", "weeping_vines", "wet_sponge", "wheat", "white_candle", "white_candle_cake", "white_carpet", "white_concrete", "white_concrete_powder", "white_glazed_terracotta", "white_shulker_box", "white_stained_glass", "white_stained_glass_pane", "white_terracotta", "white_tulip", "white_wool", "wither_rose", "wither_skeleton_skull", "wood", "wooden_button", "wooden_door", "wooden_pressure_plate", "wooden_slab", "wool", "yellow_candle", "yellow_candle_cake", "yellow_carpet", "yellow_concrete", "yellow_concrete_powder", "yellow_flower", "yellow_glazed_terracotta", "yellow_shulker_box", "yellow_stained_glass", "yellow_stained_glass_pane", "yellow_terracotta", "yellow_wool", "zombie_head"]}}`);
        }, 2)
    }
}
