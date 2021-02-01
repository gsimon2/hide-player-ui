Hooks.on('init', () => {
    game.settings.register("hide-player-ui", "hidePlayerUI", {
        name: "Hide Player UI",
        hint: "Enable this to hide all control UI for Players so that they only see the map",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });
});

Hooks.on('canvasInit', () => {
    if (game.user.isGM === false && game.settings.get('hide-player-ui', 'hidePlayerUI')) {
        var rootElement = document.getElementsByClassName('vtt game')[0];
        rootElement.classList.add('hide-player-ui');
    }
})