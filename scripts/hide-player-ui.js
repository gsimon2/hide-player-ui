import { registerSettings, falseySettings } from "./settings.js";
import { isGmOrAssistant } from "./isGM.js";

const isSelectorValid = (selector) => {
   try {
      document.createDocumentFragment().querySelector(selector);
   } catch {
      return false;
   }
   return true;
};

const handleCustomSelectors = (selectorText) => {
   const selectors = selectorText.split(";").map((s) => s.trim());

   // In version 13 the sheet href migrated from "hide-player-ui" to "foundry2"
   const styleSheet = [...document.styleSheets].find((sheet) =>
      sheet.href.includes("hide-player-ui") || sheet.href.includes('foundry2')
   );

   selectors
      .filter((s) => s.length)
      .forEach((selector) => {
         if (isSelectorValid(selector)) {
            styleSheet.insertRule(`${selector} { display: none !important}`, 0);
         } else {
            console.error(
               `hide-player-ui: ${selector} is not a valid CSS selector.`
            );
         }
      });
};

Hooks.on("init", () => {
   registerSettings();
});

Hooks.on("ready", async () => {
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
      !isGmOrAssistant() &&
      (game.settings.get("hide-player-ui", "hideForAllPlayers") ||
         hiddenPlayersList.includes(playerName));
   const settings = game.settings.get("hide-player-ui", "settings");

   let playerConfig = game.user.getFlag("hide-player-ui", "playerConfig");
   if (!playerConfig) {
      playerConfig = JSON.parse(JSON.stringify(falseySettings));
      await game.user.setFlag("hide-player-ui", "playerConfig", playerConfig);
   }

   if (isPlayerUiOverridden && settings.customSelectors) {
      handleCustomSelectors(settings.customSelectors);
   }
   if (playerConfig.customSelectors) {
      handleCustomSelectors(playerConfig.customSelectors);
   }

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
      (playerConfig.hideSideBar.chatInput ||
         (isPlayerUiOverridden && settings.hideSideBar.chatInput)) &&
         hideElement("chatInput");
      (playerConfig.hideSideBar.combatTracker ||
         (isPlayerUiOverridden && settings.hideSideBar.combatTracker)) &&
         hideElement("combatTracker");
      (playerConfig.hideSideBar.scenesDirectory ||
         (isPlayerUiOverridden && settings.hideSideBar.scenesDirectory)) &&
         hideElement("scenesDirectory");
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
      (playerConfig.hideSideBar.macros ||
         (isPlayerUiOverridden && settings.hideSideBar.macros)) &&
         hideElement("macros");
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
         sidebarSettings[key] =
            (isPlayerUiOverridden && value) || playerConfig.hideSideBar[key];
      }

      setFocusToFirstDisplayedTab(sidebarSettings);

      // If all tabs are hidden in the side bar, also hide the expand toggle
      if (Object.entries(sidebarSettings).filter(([key]) => key !== 'complete').every(([,value]) => value === true)) {
         hideElement('sidebarToggle')
      }
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
   try {
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
                  document.querySelector('button[data-tab="chat"]').click();
                  return;
               case "combatTracker":
                  document.querySelector('button[data-tab="combat"]').click();
                  return;
               case "scenesDirectory":
                  document.querySelector('button[data-tab="scenes"]').click();
                  return;
               case "actorsDirectory":
                  document.querySelector('button[data-tab="actors"]').click();
                  return;
               case "itemsDirectory":
                  document.querySelector('button[data-tab="items"]').click();
                  return;
               case "journalEntries":
                  document.querySelector('button[data-tab="journal"]').click();
                  return;
               case "rollableTables":
                  document.querySelector('button[data-tab="tables"]').click();
                  return;
               case "cardStacks":
                  document.querySelector('button[data-tab="cards"]').click();
                  return;
               case "macros":
                  document.querySelector('button[data-tab="macros"]').click();
                  return;
               case "audioPlaylists":
                  document
                     .querySelector('button[data-tab="playlists"]')
                     .click();
                  return;
               case "compendiumPacks":
                  document
                     .querySelector('button[data-tab="compendium"]')
                     .click();
                  return;
               case "gameSettings":
                  document.querySelector('button[data-tab="settings"]').click();
                  return;
            }
         }

         // Close the side bar if we opened it while changing the default tab
         if (Object.entries(hideSideBarSettings).length) {
            document
               .querySelector('#sidebar button[data-tooltip="Collapse"]')
               .click();
         }
      }
   } catch {}
};
