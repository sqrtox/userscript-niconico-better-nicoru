export type ObserverCallback = (htmlElement: HTMLElement) => void;

export type Disconnect = () => void;

export const observeAddedHtmlElements = (
  target: Node,
  callback: ObserverCallback,
): Disconnect => {
  let observer: MutationObserver | undefined = new MutationObserver(
    (records) => {
      for (const record of records) {
        if (record.type !== "childList") {
          continue;
        }

        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) {
            continue;
          }

          callback(node);
        }
      }
    },
  );

  observer.observe(target, {
    childList: true,
    subtree: true,
  });

  return () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };
};
