export const isGmOrAssistant = () => {
    if (game.user.isGM) {
        return true;
    }

    const hideForAssistantGM = game.settings.get("hide-player-ui", "hideForAssistantGM");
    const isUserAssistant = game.user.hasRole('ASSISTANT');
    if (hideForAssistantGM && isUserAssistant) {
        return false;
    }

    return isUserAssistant;
}
