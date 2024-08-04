export const isGmOrAssistant = () => {
    if (game.user.isGM) {
        return true;
    }

    if (game.settings.get("hide-player-ui", "hideForAssistantGM")) {
        return false;
    }

    if (game.user.hasRole('ASSISTANT')) {
        return true;
    }

    return false;
}
