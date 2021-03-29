import {registerSettings} from './settings.js';

Hooks.on('init', () => {
    registerSettings();
});

Hooks.on('ready', () => {
    if (game.user.isGM === false && game.settings.get('hide-player-ui', 'hidePlayerUI')) {
        const settings = game.settings.get('hide-player-ui', 'settings');

        if (settings.hideLogo) {
            hideElement('#logo');
        }

        if (settings.hideNavigation) {
            hideElement('#navigation');
        }

        if (settings.hideControls) {
            hideElement('#controls');
        }

        if (settings.hideSideBar) {
            hideElement('#sidebar');
        }

        if (settings.hidePlayers) {
            hideElement('#players');
        }

        if (settings.hideHotbar) {
            hideElement('#hotbar');
        }

        if (settings.hidePlayerConfig) {
            Hooks.on('renderPlayerConfig', (playerConfig, $html) => {
                $html.addClass('hide-player-ui-hidden');
            });
        }
    }
});

const hideElement = (querySelector) => {
    const element = document.querySelector(`.vtt ${querySelector}`);
    element.classList.add('hide-player-ui-hidden');
};