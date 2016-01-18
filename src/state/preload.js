var states = {}; //Global variable

states.PRELOAD = function () {
    canvas.style.backgroundColor = "#101010";
    ctx.textBaseline = "top";
    
    this.text_loading = new Text(this, "CARGANDO...", 704, 320, "pixel", 50, "#FFFFFF", 1, "bold");
    this.text_loading.tween.start([["x", 230]], 45, Tween.modes.EASEOUT);

    assets.load([
        //HUD
        {type: Loader.type.IMAGE, name: "fanta", url: "assets/hud/fanta.png", spritesheet: [7, 1, 0]},
        {type: Loader.type.IMAGE, name: "arrow", url: "assets/hud/arrow.png"},
        {type: Loader.type.IMAGE, name: "heart", url: "assets/hud/heart.png"},
        {type: Loader.type.IMAGE, name: "fantometer", url: "assets/hud/fantometer.png", spritesheet: [10, 2, 16]},
        {type: Loader.type.IMAGE, name: "fantometer_lights", url: "assets/hud/fantometer_lights.png", spritesheet: [7, 1, 0]},
        {type: Loader.type.IMAGE, name: "keyicon_f", url: "assets/hud/keyicon_f.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "pausemenu_menu", url: "assets/hud/pausemenu_menu.png"},
        {type: Loader.type.IMAGE, name: "pausemenu_selector", url: "assets/hud/pausemenu_selector.png"},
        {type: Loader.type.IMAGE, name: "bubble", url: "assets/hud/bubble.png"},
        {type: Loader.type.IMAGE, name: "achievement", url: "assets/hud/achievement.png"},
        //INTRO
        {type: Loader.type.IMAGE, name: "intro_logo", url: "assets/intro/logo.png"},
        //MERIWORLD
        {type: Loader.type.IMAGE, name: "meriworld_background", url: "assets/meriworld/background.png"},
        {type: Loader.type.IMAGE, name: "meriworld_sun", url: "assets/meriworld/sun.png"},
        {type: Loader.type.IMAGE, name: "meriworld_planet", url: "assets/meriworld/planet.png", spritesheet: [2, 2, 0]},
        {type: Loader.type.IMAGE, name: "meriworld_planet_grass", url: "assets/meriworld/planet_grass.png"},
        {type: Loader.type.IMAGE, name: "meriworld_planet_shadow", url: "assets/meriworld/planet_shadow.png"},
        {type: Loader.type.IMAGE, name: "meriworld_planet_texture", url: "assets/meriworld/planet_texture.png"},
        {type: Loader.type.IMAGE, name: "meriworld_logo", url: "assets/meriworld/logo.png"},
        {type: Loader.type.IMAGE, name: "meriworld_dc_small", url: "assets/meriworld/dc_small.png", spritesheet: [8, 1, 0]},
        {type: Loader.type.IMAGE, name: "meriworld_dc_big", url: "assets/meriworld/dc_big.png", spritesheet: [3, 1, 0]},
        {type: Loader.type.IMAGE, name: "meriworld_planet_1", url: "assets/meriworld/planet_1.png", spritesheet: [3, 1, 0]},
        {type: Loader.type.IMAGE, name: "meriworld_planet_2", url: "assets/meriworld/planet_2.png", spritesheet: [3, 1, 0]},
        {type: Loader.type.IMAGE, name: "meriworld_planet_3", url: "assets/meriworld/planet_3.png", spritesheet: [3, 1, 0]},
        {type: Loader.type.IMAGE, name: "meriworld_planet_4", url: "assets/meriworld/planet_4.png", spritesheet: [3, 1, 0]},
        {type: Loader.type.IMAGE, name: "meriworld_roto2", url: "assets/meriworld/roto2.png", spritesheet: [8, 3, 20]},
        {type: Loader.type.IMAGE, name: "meriworld_tags", url: "assets/meriworld/tags.png", spritesheet: [5, 1, 0]},
        //TUTORIAL
        {type: Loader.type.IMAGE, name: "tutorial_background", url: "assets/tutorial/background.png"},
        {type: Loader.type.IMAGE, name: "tutorial_tab", url: "assets/tutorial/tab.png", spritesheet: [1, 2, 0]},
        {type: Loader.type.IMAGE, name: "tutorial_content1", url: "assets/tutorial/content1.png"},
        {type: Loader.type.IMAGE, name: "tutorial_content2", url: "assets/tutorial/content2.png"},
        //TROPHY ROOM
        {type: Loader.type.IMAGE, name: "trophyroom_cristian", url: "assets/trophyroom/cristian.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "trophyroom_cristian_eyes", url: "assets/trophyroom/cristian_eyes.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "trophyroom_cristian_shadow", url: "assets/trophyroom/cristian_shadow.png"},
        {type: Loader.type.IMAGE, name: "trophyroom_background", url: "assets/trophyroom/background.png"},
        {type: Loader.type.IMAGE, name: "trophyroom_display", url: "assets/trophyroom/display.png"},
        {type: Loader.type.IMAGE, name: "trophyroom_trophy1", url: "assets/trophyroom/trophy1.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "trophyroom_trophy2", url: "assets/trophyroom/trophy2.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "trophyroom_trophy3", url: "assets/trophyroom/trophy3.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "trophyroom_trophy4", url: "assets/trophyroom/trophy4.png", spritesheet: [2, 1, 0]},
        //DIFFICULTY
        {type: Loader.type.IMAGE, name: "difficulty_selector", url: "assets/difficulty/selector.png", spritesheet: [4, 1, 0]},
        {type: Loader.type.IMAGE, name: "difficulty_arrow", url: "assets/difficulty/arrow.png", spritesheet: [2, 1, 0]},
        //CREDITS
        {type: Loader.type.IMAGE, name: "credits_background", url: "assets/credits/background.png"},
        {type: Loader.type.IMAGE, name: "credits_clouds", url: "assets/credits/clouds.png"},
        {type: Loader.type.IMAGE, name: "credits_sun", url: "assets/credits/sun.png"},
        {type: Loader.type.IMAGE, name: "credits_road", url: "assets/credits/road.png", spritesheet: [2, 3, 0]},
        {type: Loader.type.IMAGE, name: "credits_streetlights", url: "assets/credits/streetlights.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "credits_city_landscape", url: "assets/credits/city_landscape.png"},
        {type: Loader.type.IMAGE, name: "credits_city_glow", url: "assets/credits/city_glow.png"},
        {type: Loader.type.IMAGE, name: "credits_car", url: "assets/credits/car.png", spritesheet: [2, 4, 0]},
        {type: Loader.type.IMAGE, name: "credits_car_spoiler", url: "assets/credits/car_spoiler.png"},
        {type: Loader.type.IMAGE, name: "credits_car_wheels", url: "assets/credits/car_wheels.png", spritesheet: [1, 2, 0]},
        {type: Loader.type.IMAGE, name: "credits_car_extras", url: "assets/credits/car_extras.png", spritesheet: [3, 1, 0]},
        {type: Loader.type.IMAGE, name: "credits_car_shadow", url: "assets/credits/car_shadow.png"},
        {type: Loader.type.IMAGE, name: "credits_thanks", url: "assets/credits/thanks.png", spritesheet: [1, 2, 0]},
        //NACHO
        {type: Loader.type.IMAGE, name: "nacho", url: "assets/nacho/nacho.png", spritesheet: [7, 6, 40]},
        {type: Loader.type.IMAGE, name: "nacho_shirt", url: "assets/nacho/shirt.png", spritesheet: [5, 1, 0]},
        {type: Loader.type.IMAGE, name: "nacho_shadow", url: "assets/nacho/shadow.png"},
        {type: Loader.type.IMAGE, name: "nacho_sweat", url: "assets/nacho/sweat.png"},
        {type: Loader.type.IMAGE, name: "nacho_fantaground", url: "assets/nacho/fanta_ground.png", spritesheet: [7, 3, 0]},
        //KAREN
        {type: Loader.type.IMAGE, name: "karen", url: "assets/karen/karen.png", spritesheet: [7, 1, 0]},
        {type: Loader.type.IMAGE, name: "karen_shadow", url: "assets/karen/shadow.png"},
        {type: Loader.type.IMAGE, name: "karen_weights", url: "assets/karen/weights.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "karen_hearts", url: "assets/karen/hearts.png", spritesheet: [9, 6, 0]},
        //STAGES
        {type: Loader.type.IMAGE, name: "stage_gimnacho", url: "assets/stages/gimnacho/background.png"},
        {type: Loader.type.IMAGE, name: "stage_office", url: "assets/stages/office/background.png"},
        {type: Loader.type.IMAGE, name: "stage_office_chairs", url: "assets/stages/office/chairs.png"},
        {type: Loader.type.IMAGE, name: "stage_office_working", url: "assets/stages/office/working.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "stage_office_forista_gif", url: "assets/stages/office/forista_gif.png", spritesheet: [10, 8, 0]},
        {type: Loader.type.IMAGE, name: "stage_canmeri", url: "assets/stages/canmeri/background.png"},
        {type: Loader.type.IMAGE, name: "stage_canmeri_people", url: "assets/stages/canmeri/people.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "stage_canmeri_linketo", url: "assets/stages/canmeri/linketo.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "stage_fidelitation", url: "assets/stages/fidelitation/background.png"},
        {type: Loader.type.IMAGE, name: "stage_fidelitation_people", url: "assets/stages/fidelitation/people.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "stage_fidelitation_hirai", url: "assets/stages/fidelitation/hirai.png", spritesheet: [2, 1, 0]},
        {type: Loader.type.IMAGE, name: "stage_fidelitation_spotlight_shadow", url: "assets/stages/fidelitation/spotlight_shadow.png"},
        {type: Loader.type.IMAGE, name: "stage_fidelitation_spotlight_anim", url: "assets/stages/fidelitation/spotlight_anim.png", spritesheet: [3, 1, 0]},
        {type: Loader.type.IMAGE, name: "stage_fidelitation_spotlight_light", url: "assets/stages/fidelitation/spotlight_light.png"},
        //TEXTS
        {type: Loader.type.IMAGE, name: "text_rocosidad", url: "assets/texts/rocosidad.png"},
        {type: Loader.type.IMAGE, name: "text_listo", url: "assets/texts/listo.png", spritesheet: [3, 1, 0]},
        {type: Loader.type.IMAGE, name: "text_ya", url: "assets/texts/ya.png", spritesheet: [3, 1, 0]},
        {type: Loader.type.IMAGE, name: "text_pruebasuperada", url: "assets/texts/pruebasuperada.png", spritesheet: [3, 1, 0]},
        {type: Loader.type.IMAGE, name: "text_tiempoagotado", url: "assets/texts/tiempoagotado.png", spritesheet: [3, 1, 0]},
        {type: Loader.type.IMAGE, name: "text_superrocoso", url: "assets/texts/superrocoso.png", spritesheet: [6, 3, 16]},
        {type: Loader.type.IMAGE, name: "text_megarocoso", url: "assets/texts/megarocoso.png", spritesheet: [6, 3, 16]},
        {type: Loader.type.IMAGE, name: "text_fantarocoso", url: "assets/texts/megafanta.png", spritesheet: [4, 4, 0]},
        {type: Loader.type.IMAGE, name: "text_karencitrometro", url: "assets/texts/karencitrometro.png"},
        {type: Loader.type.IMAGE, name: "text_bonus", url: "assets/texts/bonus.png", spritesheet: [4, 1, 0]},
        {type: Loader.type.IMAGE, name: "text_pressmancuernas", url: "assets/texts/pressmancuernas.png"},
        //SOUNDS
        {type: Loader.type.SOUND, name: "coin1", url: "assets/sounds/coin1.ogg"},
        {type: Loader.type.SOUND, name: "denied", url: "assets/sounds/denied.ogg"},
        {type: Loader.type.SOUND, name: "pausemenu_show", url: "assets/sounds/pausemenu_show.ogg"},
        {type: Loader.type.SOUND, name: "pausemenu_hide", url: "assets/sounds/pausemenu_hide.ogg"},
        {type: Loader.type.SOUND, name: "select", url: "assets/sounds/select.ogg"},
        {type: Loader.type.SOUND, name: "selected", url: "assets/sounds/selected.ogg"},
        {type: Loader.type.SOUND, name: "nacho", url: "assets/sounds/nacho.ogg"},
        {type: Loader.type.SOUND, name: "dc_speak", url: "assets/sounds/dc_speak.ogg"},
        {type: Loader.type.SOUND, name: "dc_shout", url: "assets/sounds/dc_shout.ogg"},
        {type: Loader.type.SOUND, name: "stage_unlock", url: "assets/sounds/stage_unlock.ogg"},
        {type: Loader.type.SOUND, name: "trophy_unlock", url: "assets/sounds/trophy_unlock.ogg"},
        {type: Loader.type.SOUND, name: "horn", url: "assets/sounds/horn.ogg"},
        {type: Loader.type.SOUND, name: "levelup0", url: "assets/sounds/levelup0.ogg"},
        {type: Loader.type.SOUND, name: "levelup1", url: "assets/sounds/levelup1.ogg"},
        {type: Loader.type.SOUND, name: "levelup2", url: "assets/sounds/levelup2.ogg"},
        {type: Loader.type.SOUND, name: "levelup3", url: "assets/sounds/levelup3.ogg"},
        {type: Loader.type.SOUND, name: "difficulty_select", url: "assets/sounds/difficulty_select.ogg"},
        {type: Loader.type.SOUND, name: "difficulty_selected", url: "assets/sounds/difficulty_selected.ogg"},
        {type: Loader.type.SOUND, name: "difficulty_start", url: "assets/sounds/difficulty_start.ogg"},
        {type: Loader.type.SOUND, name: "start", url: "assets/sounds/start.ogg"},
        {type: Loader.type.SOUND, name: "tutorial_show", url: "assets/sounds/tutorial_show.ogg"},
        {type: Loader.type.SOUND, name: "tutorial_tabchange", url: "assets/sounds/tutorial_tabchange.ogg"},
        {type: Loader.type.SOUND, name: "fidelidation_spotlight", url: "assets/sounds/fidelidation_spotlight.ogg"},
        {type: Loader.type.SOUND, name: "fidelidation_crowd", url: "assets/sounds/fidelidation_crowd.ogg"},
        {type: Loader.type.SOUND, name: "fidelidation_surprise", url: "assets/sounds/fidelidation_surprise.ogg"},
        {type: Loader.type.SOUND, name: "scroll", url: "assets/sounds/scroll.ogg"},
        {type: Loader.type.SOUND, name: "karen", url: "assets/sounds/karen.ogg"},
        {type: Loader.type.SOUND, name: "timeout", url: "assets/sounds/timeout.ogg"},
        {type: Loader.type.SOUND, name: "car", url: "assets/sounds/car.ogg"},
        //MUSIC
        {type: Loader.type.SOUND, name: "music1", url: "assets/music/valrens_fight.ogg"},
        {type: Loader.type.SOUND, name: "music2", url: "assets/music/interrupt.ogg"},
        {type: Loader.type.SOUND, name: "music3", url: "assets/music/cyberspace_scape.ogg"},
        {type: Loader.type.SOUND, name: "music4", url: "assets/music/gun_dumb.ogg"},
        {type: Loader.type.SOUND, name: "credits", url: "assets/music/credits.ogg"},
        {type: Loader.type.SOUND, name: "meriworld", url: "assets/music/meriworld.ogg"},
        {type: Loader.type.SOUND, name: "opening", url: "assets/music/opening.ogg"},
        {type: Loader.type.SOUND, name: "trophyroom", url: "assets/music/trophyroom.ogg"},
        {type: Loader.type.SOUND, name: "tutorial", url: "assets/music/tutorial.ogg"},
        //VIDEOS
        {type: Loader.type.VIDEO, name: "opening", url: "assets/videos/opening.webm"},
        {type: Loader.type.VIDEO, name: "start", url: "assets/videos/start.webm"}
    ], this, this.loadProgress);
};

states.PRELOAD.prototype.loadProgress = function (e) {
    if (e.target.src.indexOf("/assets/hud/fanta.png") !== -1) {
        this.fanta = new Sprite(this, assets.image.fanta, -102, 99);
        this.fanta.animation.add("rotating", [0, 1, 2, 3, 4, 5, 6]);
        this.fanta.animation.play("rotating", true, 6);
        this.fanta.tween.start([["x", 280]], 60, Tween.modes.EASEOUT);
    }
};

states.PRELOAD.prototype.update = function () {
    ctx.clearRect(0, 0, 704, 396);
    if (this.fanta !== undefined) {
        if (this.fanta.tween.playing === false && assets.finished) {
            this.text_loading.tween.start([["x", -300]], 45, Tween.modes.EASEIN);
            this.fanta.tween.start([["x", 1300]], 60, Tween.modes.EASEIN, false, function () {
                state = new states.INTRO();
            });
        }
        this.fanta.update();
    }
    this.text_loading.update();
};
