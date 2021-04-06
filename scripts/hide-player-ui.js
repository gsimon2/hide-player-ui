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

        if (settings.hideNavigation) {
            hideElement('navigation');
        }

        if (settings.hideControls) {
            hideElement('controls');
        }

        if (settings.hideSideBar) {
            hideElement('sidebar');
        }

        if (settings.hidePlayers) {
            hideElement('players');
        }

        if (settings.hideHotbar) {
            hideElement('hotbar');
        }

        if (settings.hidePlayerConfig) {
            Hooks.on('renderPlayerConfig', (playerConfig, $html) => {
                $html.addClass('hide-player-ui-hidden');
            });
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