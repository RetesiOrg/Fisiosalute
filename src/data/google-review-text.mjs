// Business Profile can include both the original and a Google translation.
export function originalReviewText(comment) {
  const original = /(?:^|\n\s*\n)\(Original(?:e)?\)\s*\n/i.exec(comment);
  if (original) comment = comment.slice(original.index + original[0].length).trim();
  const translated = /\n\s*\n\(Translated by Google\)\s*\n/i.exec(comment);
  if (translated && comment.slice(0, translated.index).trim()) {
    return comment.slice(0, translated.index).trim();
  }
  return comment;
}
