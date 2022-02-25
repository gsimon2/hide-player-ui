import {registerSettings} from './settings.js';

Hooks.on('init', () => {
    registerSettings();
});

Hooks.on('ready', () => {
    const playerName = game.user.data.name;
    var hiddenPlayersList = [];

    if (!game.settings.get('hide-player-ui', 'hideForAllPlayers')) {
        try {
            hiddenPlayersList = game.settings.get('hide-player-ui', 'hiddenPlayers').split(',');
        } catch (e) {
            console.error('hide-player-ui: Failed to parse list of players to hide UI for!', e);
        }
    }

    const isUiHidenForPlayer = game.user.isGM === false && (game.settings.get('hide-player-ui', 'hideForAllPlayers') || hiddenPlayersList.includes(playerName));
    if (isUiHidenForPlayer) {
        const settings = game.settings.get('hide-player-ui', 'settings');

        if (settings.hideLogo) {
            hideElement('logo');
        }

        if (settings.hideNavigation.complete) {
            hideElement('navigation');
        } else {
            settings.hideNavigation.navToggle && hideElement('navToggle');
            settings.hideNavigation.sceneList && hideElement('sceneList');
            settings.hideNavigation.bossBar && hideElement('bossBar');
        }

        if (settings.hideControls) {
            hideElement('controls');
        }

        if (settings.hideSideBar.complete) {
            hideElement('sidebar');
        } else {
            settings.hideSideBar.chatLog && hideElement('chatLog');
            settings.hideSideBar.combatTracker && hideElement('combatTracker');
            settings.hideSideBar.actorsDirectory && hideElement('actorsDirectory');
            settings.hideSideBar.itemsDirectory && hideElement('itemsDirectory');
            settings.hideSideBar.journalEntries && hideElement('journalEntries');
            settings.hideSideBar.rollableTables && hideElement('rollableTables');
            settings.hideSideBar.audioPlaylists && hideElement('audioPlaylists');
            settings.hideSideBar.compendiumPacks && hideElement('compendiumPacks');
            settings.hideSideBar.gameSettings && hideElement('gameSettings');

            const body = document.querySelector('body');
            body.classList.add(`hide-player-ui-dynamic-sized-sidebar`);

            setFocusToFirstDisplayedTab(settings.hideSideBar);
        }

        if (settings.hidePlayers) {
            hideElement('players');
        }

        if (settings.hideHotbar) {
            hideElement('hotbar');
        }

        if (settings.hidePlayerConfig) {
            hideElement('player-config');
        }

        if (game.modules.get('token-action-hud') && game.modules.get('token-action-hud').active && settings.hideTokenActionHUD) {
            hideElement('token-action-hud');
        }

        if (game.modules.get('custom-hotbar') && game.modules.get('custom-hotbar').active && settings.hideCustomHotbar) {
            const body = document.querySelector('body');
            body.classList.add('hide-token-custom-hotbar');
        }
    }
});

const hideElement = (id) => {
    const body = document.querySelector('body');
    body.classList.add(`hide-player-ui-${id}`);
};

const setFocusToFirstDisplayedTab = (hideSideBarSettings) => {
    if (!hideSideBarSettings.chatLog)
    {
        return;
    }

    for(const [key, value] of Object.entries(hideSideBarSettings)) {
        if (key === "complete") {
            continue;
        }

        if (value === false) {
            switch (key) {
                case 'chatLog':
                    document.querySelector('a[data-tab="chat"]').click();
                    return;
                case 'combatTracker':
                    document.querySelector('a[data-tab="combat"]').click();
                    return;
                case 'actorsDirectory':
                    document.querySelector('a[data-tab="actors"]').click();
                    return;
                case 'itemsDirectory':
                    document.querySelector('a[data-tab="items"]').click();
                    return;
                case 'journalEntries':
                    document.querySelector('a[data-tab="journal"]').click();
                    return;
                case 'rollableTables':
                    document.querySelector('a[data-tab="tables"]').click();
                    return;
                case 'audioPlaylists':
                    document.querySelector('a[data-tab="playlists"]').click();
                    return;
                case 'compendiumPacks':
                    document.querySelector('a[data-tab="compendium"]').click();
                    return;
                case 'gameSettings':
                    document.querySelector('a[data-tab="settings"]').click();
                    return;
            };
        }
    }
}
