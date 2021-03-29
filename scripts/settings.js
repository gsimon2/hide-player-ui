import {HidePlayerUISettingsForm} from './settings-form.js';

export const defaultSettings = {
    hideLogo: true,
    hideNavigation: true,
    hideControls: true,
    hideSideBar: true,
    hidePlayers: true,
    hideHotbar: true,
    hidePlayerConfig: true
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

    game.settings.register("hide-player-ui", "hidePlayerUI", {
        name: "Hide Player UI",
        hint: "Enable this to hide all control UI for Players so that they only see the map",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register("hide-player-ui", "settings", {
        name: "Hide Player UI Settings",
        scope: "world",
        default: defaultSettings,
        type: Object,
        config: false
    });
};

