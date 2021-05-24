import {HidePlayerUISettingsForm} from './settings-form.js';

export const defaultSettings = {
    hideLogo: true,
    hideNavigation: true,
    hideControls: true,
    hideSideBar: {
        complete: true,
        chatLog: false,
        combatTracker: false,
        actorsDirectory: false,
        itemsDirectory: false,
        journalEntries: false,
        rollableTables: false,
        audioPlaylists: false,
        compendiumPacks: false,
        gameSettings: false
    },
    hidePlayers: true,
    hideHotbar: true,
    hidePlayerConfig: true,
    hideTokenActionHUD: true,
    hideCustomHotbar: true
};

export const registerSettings = () => {
    game.settings.registerMenu("hide-player-ui", "hide-player-ui", {
        name: "hide-player-ui.settings-form.title",
        label: "hide-player-ui.settings-form.title",
        hint: "hide-player-ui.settings-form.hint",
        icon: "fas fa-cogs",
        type: HidePlayerUISettingsForm,
        restricted: true
    });

    game.settings.register("hide-player-ui", "settings", {
        name: "Hide Player UI Settings",
        scope: "world",
        default: defaultSettings,
        type: Object,
        config: false
    });

    game.settings.register("hide-player-ui", "hideForAllPlayers", {
        name: "hide-player-ui.settings.hide-for-all-players.name",
        hint: "hide-player-ui.settings.hide-for-all-players.hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register("hide-player-ui", "hiddenPlayers", {
        name: "hide-player-ui.settings.hidden-players.name",
        hint: "hide-player-ui.settings.hidden-players.hint",
        scope: "world",
        config: true,
        default: "",
        type: String,
    });
};

