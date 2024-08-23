import { NICORU_BUTTON_ARIA_LABEL, getNicoruColor } from "@/nicoru.js";
import { observeAddedHtmlElements } from "@/observer.js";
import { getReactProps } from "@/react.js";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Comment = any;

// TODO: The English version probably won't work
export const COMMENT_LIST_ELEMENT_MARKER = "コメントリスト";

export const awaitCommentList = (): Promise<HTMLElement> => {
  const { promise, resolve } = Promise.withResolvers<HTMLElement>();
  const disconnect = observeAddedHtmlElements(document, (element) => {
    const commentHeader = [...element.getElementsByTagName("header")].filter(
      (element) => element.textContent?.includes(COMMENT_LIST_ELEMENT_MARKER),
    )[0];

    if (
      !commentHeader ||
      !(commentHeader.nextElementSibling instanceof HTMLElement)
    ) {
      return;
    }

    resolve(commentHeader.nextElementSibling);
    disconnect();
  });

  return promise;
};

export const fixNicoruCount = (
  commentElement: HTMLElement,
  nicoruCount: number,
): void => {
  // Get the nicoru count in the nicoru button
  const countElement = commentElement.querySelector(
    `button[aria-label="${NICORU_BUTTON_ARIA_LABEL}"] > p`,
  );

  if (!countElement) {
    return;
  }

  countElement.textContent = nicoruCount.toString();
};

export const fixCommentContentStyle = (commentElement: HTMLElement): void => {
  const contentElement = commentElement.querySelector(
    `button[aria-label="${NICORU_BUTTON_ARIA_LABEL}"] + p`,
  );

  if (contentElement instanceof HTMLElement) {
    contentElement.style.flex = "1";
  }
};

export const fixCommentBackgroundColor = (
  commentElement: HTMLElement,
  nicoruCount: number,
): void => {
  const color = getNicoruColor(nicoruCount);

  if (!color) {
    return;
  }

  const commentInnerElement = commentElement.children[0];

  if (!(commentInnerElement instanceof HTMLElement)) {
    return;
  }

  commentInnerElement.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.66)`;
};

export const processComment = (commentElement: HTMLElement): void => {
  fixCommentContentStyle(commentElement);

  // Get the nicoru count in the nicoru button
  const count = commentElement.querySelector("button p");

  if (!count) {
    return;
  }

  const props = getReactProps(commentElement);

  if (!props) {
    return;
  }

  const comment = props.children.props.comment;
  const nicoruCount = comment.nicoruCount;

  fixNicoruCount(commentElement, nicoruCount);
  fixCommentBackgroundColor(commentElement, nicoruCount);
};

export const processCommentPopper = (popperElement: HTMLElement): void => {
  const commentElement = popperElement.querySelector(
    `div:has(> div > button[aria-label="${NICORU_BUTTON_ARIA_LABEL}"])`,
  );

  if (!(commentElement instanceof HTMLElement)) {
    return;
  }

  fixCommentContentStyle(commentElement);

  const props = getReactProps(popperElement);

  if (!props) {
    return;
  }

  const comment = props.children.props.comment;

  fixNicoruCount(commentElement, comment.nicoruCount);
};
