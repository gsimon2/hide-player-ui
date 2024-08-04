export const isGmOrAssistant = () => {
    // If the user is the GM, then automatically return, no need to check any settings.
    if (game.user.isGM) {
        return true;
    }

    // The user might be an assistant, but the GM might want to hide menus from the assistant
    const hideForAssistantGM = game.settings.get("hide-player-ui", "hideForAssistantGM");
    if (hideForAssistantGM) {
        return false;
    }

    // Else If the user is an assistant, all good.
    const isUserAssistant = game.user.hasRole('ASSISTANT');
    if (isUserAssistant) {
        return true;
    }

    // Else, it is a player.
    return false;
}
