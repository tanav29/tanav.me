type MediaRange = {
  type: string;
  subtype: string;
  quality: number;
  order: number;
};

function parseAccept(accept: string): MediaRange[] {
  return accept.split(",").flatMap((entry, order) => {
    const [mediaType, ...parameters] = entry.trim().toLowerCase().split(";");
    const [type, subtype] = mediaType.trim().split("/");
    if (!type || !subtype) return [];

    const q = parameters.find((parameter) => parameter.trim().startsWith("q="));
    const quality = q ? Number(q.trim().slice(2)) : 1;
    if (!Number.isFinite(quality) || quality < 0 || quality > 1) return [];

    return [{ type, subtype, quality, order }];
  });
}

function preferenceFor(mediaType: string, ranges: MediaRange[]) {
  const [type, subtype] = mediaType.split("/");
  return ranges.reduce<{ quality: number; specificity: number; order: number } | null>(
    (best, range) => {
      const specificity =
        range.type === type && range.subtype === subtype
          ? 2
          : range.type === type && range.subtype === "*"
            ? 1
            : range.type === "*" && range.subtype === "*"
              ? 0
              : -1;
      if (specificity < 0) return best;
      const candidate = { quality: range.quality, specificity, order: range.order };
      if (
        !best ||
        candidate.quality > best.quality ||
        (candidate.quality === best.quality && candidate.specificity > best.specificity) ||
        (candidate.quality === best.quality && candidate.specificity === best.specificity && candidate.order < best.order)
      ) return candidate;
      return best;
    },
    null,
  );
}

/** Selects the representation according to RFC 9110 Accept preference rules. */
export function negotiateRepresentation(accept: string | null): "html" | "markdown" | "not-acceptable" {
  if (!accept?.trim()) return "html";

  const ranges = parseAccept(accept);
  const markdown = preferenceFor("text/markdown", ranges);
  const html = preferenceFor("text/html", ranges);
  const markdownQ = markdown?.quality ?? 0;
  const htmlQ = html?.quality ?? 0;

  if (markdownQ === 0 && htmlQ === 0) return "not-acceptable";
  if (markdownQ > htmlQ) return "markdown";
  if (htmlQ > markdownQ) return "html";
  if (markdownQ === 0) return "not-acceptable";
  // At the same quality, an explicit/specific Markdown request wins.
  if ((markdown?.specificity ?? -1) > (html?.specificity ?? -1)) return "markdown";
  if ((html?.specificity ?? -1) > (markdown?.specificity ?? -1)) return "html";
  return (markdown?.order ?? Infinity) < (html?.order ?? Infinity) ? "markdown" : "html";
}
