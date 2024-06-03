export const isGmOrAssistant = () => {
    const hideForAssistantGM = game.settings.get("hide-player-ui", "hideForAssistantGM");
    const isUserAssistant = game.user.hasRole('ASSISTANT');
    return game.user.isGM && (!hideForAssistantGM || !isUserAssistant);
}