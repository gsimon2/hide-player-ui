import { falseySettings, truthySettings } from "./settings.js";
import { isGmOrAssistant } from "./isGM.js";

export class HidePlayerUIPlayerConfigurationForm extends FormApplication {
   static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
         title: game.i18n.localize(
            "hide-player-ui.settings-form.hide-personal-ui.title"
         ),
         id: "hide-player-ui-player-configuration-form",
         template:
            "modules/hide-player-ui/templates/player-configuration-form.html",
         width: 500,
         closeOnSubmit: true,
      });
   }

   storedData = {
      playerUiOverridden: this.getPlayerUiOverridden(),
      settings: game.settings.get("hide-player-ui", "settings"),
      playerConfiguration: game.user.getFlag("hide-player-ui", "playerConfig"),
   };

   getPlayerUiOverridden() {
      const playerName = game.user.name;
      var hiddenPlayersList = [];

      if (!game.settings.get("hide-player-ui", "hideForAllPlayers")) {
         try {
            hiddenPlayersList = game.settings
               .get("hide-player-ui", "hiddenPlayers")
               .split(",");
         } catch (e) {
            console.error(
               "hide-player-ui: Failed to parse list of players to hide UI for!",
               e
            );
         }
      }

      return (
         !isGmOrAssistant() &&
         (game.settings.get("hide-player-ui", "hideForAllPlayers") ||
            hiddenPlayersList.includes(playerName))
      );
   }

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
      this.storedData.playerConfiguration = { ...falseySettings };
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
         ).length !== checkboxCount;

      this.storedData.playerConfiguration = {
         ...(nextCheckboxValue ? truthySettings : falseySettings),
         customSelectors: formData.customSelectors,
      };

      this.render();
   }

   async _updateObject(events, formData) {
      let configuration = foundry.utils.mergeObject(
         this.storedData.playerConfiguration,
         formData,
         { insertKeys: true, insertValues: true }
      );

      await game.user.setFlag("hide-player-ui", "playerConfig", configuration);
   }
}

Handlebars.registerHelper("logicalOr", function (v1, v2) {
   return v1 || v2;
});

Handlebars.registerHelper("logicalAnd", function (v1, v2) {
   return v1 && v2;
});
