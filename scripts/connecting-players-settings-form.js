import { truthySettings, falseySettings } from "./settings.js";

export class HideConnectingPlayerUISettingsForm extends FormApplication {
   static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
         title: game.i18n.localize(
            "hide-player-ui.settings-form.hide-connecting-players-ui.title"
         ),
         id: "hide-player-ui-settings-form",
         template: "modules/hide-player-ui/templates/settings-form.html",
         width: 500,
         closeOnSubmit: true,
      });
   }

   storedData = game.settings.get("hide-player-ui", "settings");

   getData(options) {
      const moduleSpecificData = {
         renderTokenActionHudOption:
            game.modules.get("token-action-hud") &&
            game.modules.get("token-action-hud").active,
         renderCustomHotbarOption:
            game.modules.get("custom-hotbar") &&
            game.modules.get("custom-hotbar").active,
         renderBossBarOption:
            game.modules.get("bossbar") && game.modules.get("bossbar").active,
         // Foundry logo no longer shown in UI starting v13
         renderFoundryLogoOption: parseInt(game.version, 10) <= 12,
      };

      const data = foundry.utils.mergeObject(
         moduleSpecificData,
         this.storedData
      );
      return data;
   }

   activateListeners(html) {
      super.activateListeners(html);
      html.find('button[name="reset"]').click(this.onReset.bind(this));
      html
         .find('button[name="toggleAllCheckboxes"]')
         .click(this.onToggleCheckboxes.bind(this));
   }

   onReset() {
      this.storedData = { ...truthySettings };
      this.render();
   }

   onToggleCheckboxes() {
      const formData = Object.fromEntries(new FormData(this.form));
      const formDataWithoutCustomSelectors = { ...formData };
      delete formDataWithoutCustomSelectors.customSelectors;
      const checkboxCount = this.form.querySelectorAll(
         'input[type="checkbox"]'
      ).length;

      const nextCheckboxValue =
         Object.values(formDataWithoutCustomSelectors).filter(
            (val) => val == "on"
         ).length === 0;

      this.storedData = {
         ...(nextCheckboxValue ? truthySettings : falseySettings),
         customSelectors: formData.customSelectors,
      };

      this.render();
   }

   _updateObject(events, formData) {
      let settings = foundry.utils.mergeObject(this.storedData, formData, {
         insertKeys: true,
         insertValues: true,
      });
      game.settings.set("hide-player-ui", "settings", settings);
   }
}
