import { HidePlayerUISettingsForm } from "./settings-form.js";
import { HidePlayerUIPlayerConfigurationForm } from "./player-configuration-form.js";

export const defaultSettings = {
   hideLogo: true,
   hideNavigation: {
      complete: true,
      navToggle: true,
      sceneList: true,
      bossBar: true,
   },
   hideControls: true,
   hideSideBar: {
      complete: true,
      chatLog: true,
      combatTracker: true,
      scenesDirectory: true,
      actorsDirectory: true,
      itemsDirectory: true,
      journalEntries: true,
      rollableTables: true,
      cardStacks: true,
      audioPlaylists: true,
      compendiumPacks: true,
      gameSettings: true,
   },
   hidePlayers: true,
   hideHotbar: true,
   hidePlayerConfig: true,
   hideTokenHUD: false,
   hideTokenActionHUD: true,
   hideCustomHotbar: true,
};

export const defaultPlayerConfig = {
   hideLogo: false,
   hideNavigation: {
      complete: false,
      navToggle: false,
      sceneList: false,
      bossBar: false,
   },
   hideControls: false,
   hideSideBar: {
      complete: false,
      chatLog: false,
      combatTracker: false,
      scenesDirectory: false,
      actorsDirectory: false,
      itemsDirectory: false,
      journalEntries: false,
      rollableTables: false,
      cardStacks: false,
      audioPlaylists: false,
      compendiumPacks: false,
      gameSettings: false,
   },
   hidePlayers: false,
   hideHotbar: false,
   hidePlayerConfig: false,
   hideTokenHUD: false,
   hideTokenActionHUD: false,
   hideCustomHotbar: false,
};

export const registerSettings = () => {
   game.settings.registerMenu(
      "hide-player-ui",
      "hide-player-ui-player-configuration",
      {
         name: "hide-player-ui.settings-form.hide-personal-ui.title",
         label: "hide-player-ui.settings-form.hide-personal-ui.title",
         hint: "hide-player-ui.settings-form.hide-personal-ui.hint",
         icon: "fas fa-cogs",
         type: HidePlayerUIPlayerConfigurationForm,
         restricted: false,
      }
   );

   game.settings.registerMenu("hide-player-ui", "hide-player-ui", {
      name: "hide-player-ui.settings-form.hide-connecting-players-ui.title",
      label: "hide-player-ui.settings-form.hide-connecting-players-ui.title",
      hint: "hide-player-ui.settings-form.hide-connecting-players-ui.hint",
      icon: "fas fa-cogs",
      type: HidePlayerUISettingsForm,
      restricted: true,
   });

   game.settings.register("hide-player-ui", "settings", {
      name: "Hide Player UI Settings",
      scope: "world",
      default: defaultSettings,
      type: Object,
      config: false,
   });

   game.settings.register("hide-player-ui", "playerConfig", {
      name: "Hide Player UI Configuration",
      scope: "client",
      default: defaultPlayerConfig,
      type: Object,
      config: false,
   });

   game.settings.register("hide-player-ui", "hideForAllPlayers", {
      name: "hide-player-ui.settings.hide-for-all-players.name",
      hint: "hide-player-ui.settings.hide-for-all-players.hint",
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
   });

   game.settings.register("hide-player-ui", "hideForAssistantGM", {
      name: "hide-player-ui.settings.hide-for-assisstant-gm.name",
      hint: "hide-player-ui.settings.hide-for-assisstant-gm.hint",
      scope: "world",
      config: true,
      default: false,
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
