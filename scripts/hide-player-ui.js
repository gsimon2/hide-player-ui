import { registerSettings } from "./settings.js";
import { isGM } from "./isGM.js";

Hooks.on("init", () => {
   registerSettings();
});

Hooks.on("ready", () => {
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

   const isPlayerUiOverridden =
      !isGM() &&
      (game.settings.get("hide-player-ui", "hideForAllPlayers") ||
         hiddenPlayersList.includes(playerName));
   const settings = game.settings.get("hide-player-ui", "settings");
   const playerConfig = game.settings.get("hide-player-ui", "playerConfig");

   if (playerConfig.hideLogo || (isPlayerUiOverridden && settings.hideLogo)) {
      hideElement("logo");
   }

   if (
      playerConfig.hideNavigation.complete ||
      (isPlayerUiOverridden && settings.hideNavigation.complete)
   ) {
      hideElement("navigation");
   } else {
      (playerConfig.hideNavigation.navToggle ||
         (isPlayerUiOverridden && settings.hideNavigation.navToggle)) &&
         hideElement("navToggle");
      (playerConfig.hideNavigation.sceneList ||
         (isPlayerUiOverridden && settings.hideNavigation.sceneList)) &&
         hideElement("sceneList");
      (playerConfig.hideNavigation.bossBar ||
         (isPlayerUiOverridden && settings.hideNavigation.bossBar)) &&
         hideElement("bossBar");
   }

   if (
      playerConfig.hideControls ||
      (isPlayerUiOverridden && settings.hideControls)
   ) {
      hideElement("controls");
   }

   if (
      playerConfig.hideSideBar.complete ||
      (isPlayerUiOverridden && settings.hideSideBar.complete)
   ) {
      hideElement("sidebar");
   } else {
      (playerConfig.hideSideBar.chatLog ||
         (isPlayerUiOverridden && settings.hideSideBar.chatLog)) &&
         hideElement("chatLog");
      (playerConfig.hideSideBar.combatTracker ||
         (isPlayerUiOverridden && settings.hideSideBar.combatTracker)) &&
         hideElement("combatTracker");
      (playerConfig.hideSideBar.actorsDirectory ||
         (isPlayerUiOverridden && settings.hideSideBar.actorsDirectory)) &&
         hideElement("actorsDirectory");
      (playerConfig.hideSideBar.itemsDirectory ||
         (isPlayerUiOverridden && settings.hideSideBar.itemsDirectory)) &&
         hideElement("itemsDirectory");
      (playerConfig.hideSideBar.journalEntries ||
         (isPlayerUiOverridden && settings.hideSideBar.journalEntries)) &&
         hideElement("journalEntries");
      (playerConfig.hideSideBar.rollableTables ||
         (isPlayerUiOverridden && settings.hideSideBar.rollableTables)) &&
         hideElement("rollableTables");
      (playerConfig.hideSideBar.cardStacks ||
         (isPlayerUiOverridden && settings.hideSideBar.cardStacks)) &&
         hideElement("cardStacks");
      (playerConfig.hideSideBar.audioPlaylists ||
         (isPlayerUiOverridden && settings.hideSideBar.audioPlaylists)) &&
         hideElement("audioPlaylists");
      (playerConfig.hideSideBar.compendiumPacks ||
         (isPlayerUiOverridden && settings.hideSideBar.compendiumPacks)) &&
         hideElement("compendiumPacks");
      (playerConfig.hideSideBar.gameSettings ||
         (isPlayerUiOverridden && settings.hideSideBar.gameSettings)) &&
         hideElement("gameSettings");

      const body = document.querySelector("body");
      body.classList.add(`hide-player-ui-dynamic-sized-sidebar`);

      let sidebarSettings = {};
      for (const [key, value] of Object.entries(settings.hideSideBar)) {
         sidebarSettings[key] = value || playerConfig.hideSideBar[key];
      }

      setFocusToFirstDisplayedTab(sidebarSettings);
   }

   if (
      playerConfig.hidePlayers ||
      (isPlayerUiOverridden && settings.hidePlayers)
   ) {
      hideElement("players");
   }

   if (
      playerConfig.hideHotbar ||
      (isPlayerUiOverridden && settings.hideHotbar)
   ) {
      hideElement("hotbar");
   }

   if (
      playerConfig.hidePlayerConfig ||
      (isPlayerUiOverridden && settings.hidePlayerConfig)
   ) {
      hideElement("player-config");
   }

   if (
      playerConfig.hideTokenHUD ||
      (isPlayerUiOverridden && settings.hideTokenHUD)
   ) {
      hideElement("token-hud");
   }

   if (
      game.modules.get("token-action-hud") &&
      game.modules.get("token-action-hud").active
   ) {
      if (
         playerConfig.hideTokenActionHUD ||
         (isPlayerUiOverridden && settings.hideTokenActionHUD)
      ) {
         hideElement("token-action-hud");
      }
   }

   if (
      game.modules.get("custom-hotbar") &&
      game.modules.get("custom-hotbar").active
   ) {
      if (
         playerConfig.hideCustomHotbar ||
         (isPlayerUiOverridden && settings.hideCustomHotbar)
      ) {
         const body = document.querySelector("body");
         body.classList.add("hide-token-custom-hotbar");
      }
   }
});

const hideElement = (id) => {
   const body = document.querySelector("body");
   body.classList.add(`hide-player-ui-${id}`);
};

const setFocusToFirstDisplayedTab = (hideSideBarSettings) => {
   if (!hideSideBarSettings.chatLog) {
      return;
   }

   for (const [key, value] of Object.entries(hideSideBarSettings)) {
      if (key === "complete") {
         continue;
      }

      if (value === false) {
         switch (key) {
            case "chatLog":
               document.querySelector('a[data-tab="chat"]').click();
               return;
            case "combatTracker":
               document.querySelector('a[data-tab="combat"]').click();
               return;
            case "actorsDirectory":
               document.querySelector('a[data-tab="actors"]').click();
               return;
            case "itemsDirectory":
               document.querySelector('a[data-tab="items"]').click();
               return;
            case "journalEntries":
               document.querySelector('a[data-tab="journal"]').click();
               return;
            case "rollableTables":
               document.querySelector('a[data-tab="tables"]').click();
               return;
            case "audioPlaylists":
               document.querySelector('a[data-tab="playlists"]').click();
               return;
            case "compendiumPacks":
               document.querySelector('a[data-tab="compendium"]').click();
               return;
            case "gameSettings":
               document.querySelector('a[data-tab="settings"]').click();
               return;
         }
      }
   }
};
