import {defaultPlayerConfig} from './settings.js';

export class HidePlayerUIPlayerConfigurationForm extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: game.i18n.localize('hide-player-ui.settings-form.hide-personal-ui.title'),
            id: 'hide-player-ui-player-configuration-form',
            template: 'modules/hide-player-ui/templates/player-configuration-form.html',
            width: 500,
            closeOnSubmit: true
        });
    }



    storedData = {
        playerUiOverridden: this.getPlayerUiOverridden(),
        settings: game.settings.get('hide-player-ui', 'settings'),
        playerConfiguration: game.settings.get('hide-player-ui', 'playerConfig')
    };

    getPlayerUiOverridden() {
        const playerName = game.user.data.name;
        var hiddenPlayersList = [];
    
        if (!game.settings.get('hide-player-ui', 'hideForAllPlayers')) {
            try {
                hiddenPlayersList = game.settings.get('hide-player-ui', 'hiddenPlayers').split(',');
            } catch (e) {
                console.error('hide-player-ui: Failed to parse list of players to hide UI for!', e);
            }
        }

        return game.user.isGM === false && (game.settings.get('hide-player-ui', 'hideForAllPlayers') || hiddenPlayersList.includes(playerName));
    }

    getData(options) {
        const moduleSpecificData = {
            renderTokenActionHudOption: game.modules.get('token-action-hud') && game.modules.get('token-action-hud').active,
            renderCustomHotbarOption: game.modules.get('custom-hotbar') && game.modules.get('custom-hotbar').active,
            renderBossBarOption: game.modules.get('bossbar') && game.modules.get('bossbar').active
        };

        const data = mergeObject(moduleSpecificData, this.storedData);
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('button[name="reset"]').click(this.onReset.bind(this));
    }

    onReset() {
        this.storedData.playerConfiguration = JSON.parse(JSON.stringify(defaultPlayerConfig));

        this.render();
    }

    _updateObject(events, formData) {
        let configuration = mergeObject(this.storedData.playerConfiguration, formData, {insertKeys: true, insertValues: true});
        game.settings.set('hide-player-ui', 'playerConfig', configuration);
    }
};

Handlebars.registerHelper('logicalOr', function(v1, v2) {
    return v1 || v2;
});

Handlebars.registerHelper('logicalAnd', function(v1, v2) {
    return v1 && v2;
});

Handlebars.registerHelper('disabled', function(v1) {
    return v1 ? 'disabled' : null;
});