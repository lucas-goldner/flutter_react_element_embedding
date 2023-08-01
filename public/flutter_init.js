window._stateSet = function () {};

window.addEventListener("load", function (ev) {
  let loading = document.querySelector("#loading");
  loading.textContent = "Loading entrypoint...";
  let target = document.querySelector("#flutter_target");
  target.className = "";
  _flutter.loader.loadEntrypoint({
    onEntrypointLoaded: async function (engineInitializer) {
      let appRunner = await engineInitializer.initializeEngine({
        hostElement: target,
      });
      loading.textContent = "Running app...";
      await appRunner.runApp();
    },
  });
});
