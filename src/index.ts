import {
  awaitCommentList,
  processComment,
  processCommentPopper,
} from "@/comment.js";
import { observeAddedHtmlElements } from "@/observer.js";

const main = async (): Promise<void> => {
  const commentList = await awaitCommentList();

  observeAddedHtmlElements(commentList, (element) => {
    if ("index" in element.dataset) {
      // comment

      processComment(element);
    } else if (element.classList.contains("z_forward")) {
      // comment popper

      processCommentPopper(element);
    }
  });
};

main();
