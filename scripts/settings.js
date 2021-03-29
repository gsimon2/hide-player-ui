import {HidePlayerUISettingsForm} from './settings-form.js';

export const defaultSettings = {
    hideLogo: true,
    hideNavigation: true,
    hideControls: true,
    hideSideBar: true,
    hidePlayers: true,
    hideHotbar: true,
    hidePlayerConfig: true,
    hideTokenActionHUD: true,
    hideCustomHotbar: true
};

export const registerSettings = () => {
    game.settings.registerMenu("hide-player-ui", "hide-player-ui", {
        name: "hide-player-ui.setting-form-title",
        label: "hide-player-ui.setting-form-title",
        hint: "hide-player-ui.setting-form-hint",
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
        name: "hide-player-ui.hide-for-all-players-name",
        hint: "hide-player-ui.hide-for-all-players-hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register("hide-player-ui", "hiddenPlayers", {
        name: "hide-player-ui.hidden-players-name",
        hint: "hide-player-ui.hidden-players-hint",
        scope: "world",
        config: true,
        default: "",
        type: String,
    });
};

