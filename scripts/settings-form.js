import {defaultSettings} from './settings.js';

export class HidePlayerUISettingsForm extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: game.i18n.localize('hide-player-ui.setting-form-title'),
            id: 'hide-player-ui-settings-form',
            template: 'modules/hide-player-ui/templates/settings-form.html',
            width: 500,
            closeOnSubmit: true
        });
    }

    getData(options) {
        return this.reset ? defaultSettings : game.settings.get('hide-player-ui', 'settings');
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('button[name="reset"]').click(this.onReset.bind(this));
        this.reset = false;
    }

    onReset() {
        console.log('reset', defaultSettings)
        this.reset = true;
        this.render();
    }

    _updateObject(events, formData) {
        let settings = mergeObject(game.settings.get('hide-player-ui', 'settings'), formData, {insertKeys: true, insertValues: true});
        game.settings.set('hide-player-ui', 'settings', settings);
    }
};