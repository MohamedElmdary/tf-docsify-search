interface IHooks {
  ready(fn: () => void): void;
}

function tfSearchPlugin(configs: any) {
  return (hooks: IHooks) => {
    hooks.ready(() => {
      console.log("ready");
    });
  };
}
