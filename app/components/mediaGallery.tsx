'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { MediaItem } from "../../lib/media";

type Filter = "all" | "image" | "video";

const FILTER_LABELS: Record<Filter, string> = {
  all: "All",
  image: "Photos",
  video: "Videos",
};

export function MediaGallery({ items, title }: { items: MediaItem[]; title: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);

  const trigger = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const photos = items.filter((i) => i.type === "image").length;
  const videos = items.length - photos;
  const hasBoth = photos > 0 && videos > 0;

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.type === filter)),
    [items, filter]
  );
  const total = visible.length;
  const current = active !== null ? visible[active] : null;
  const isOpen = current !== null;

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + total) % total)),
    [total]
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const opener = trigger.current;

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [isOpen, close, go]);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || total < 2) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
  };

  return (
    <div className="media-gallery">
      <div className="media-head">
        <p className="media-summary">
          {photos > 0 && `${photos} photo${photos > 1 ? "s" : ""}`}
          {hasBoth && " and "}
          {videos > 0 && `${videos} video${videos > 1 ? "s" : ""}`}
        </p>

        {hasBoth && (
          <div className="media-tabs" role="group" aria-label="Filter media">
            {(Object.keys(FILTER_LABELS) as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                className="media-tab"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="media-grid">
        {visible.map((item, i) => (
          <button
            key={item.url}
            type="button"
            className={`media-tile ${i === 0 && total >= 4 ? "media-tile--feature" : ""}`}
            aria-label={`Open ${item.type} ${item.label}`}
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setActive(i);
            }}
          >
            {item.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.url} alt={`${title} — ${item.label}`} loading="lazy" decoding="async" />
            ) : (
              <>
                {/* #t=0.1 makes browsers paint a still frame as the thumbnail */}
                <video src={`${item.url}#t=0.1`} preload="metadata" muted playsInline tabIndex={-1} />
                <span className="media-play" aria-hidden="true">
                  <Play size={20} fill="currentColor" />
                </span>
              </>
            )}
            <span className="media-caption">{item.label}</span>
          </button>
        ))}
      </div>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} media viewer`}>
          <div className="lightbox-bar">
            <span className="lightbox-count">
              {(active ?? 0) + 1} / {total}
            </span>
            <span className="lightbox-name">{current.label}</span>
            <button ref={closeBtn} type="button" className="lightbox-btn" aria-label="Close viewer" onClick={close}>
              <X size={20} />
            </button>
          </div>

          <div
            className="lightbox-stage"
            onClick={(e) => e.target === e.currentTarget && close()}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={onTouchEnd}
          >
            {total > 1 && (
              <button
                type="button"
                className="lightbox-btn lightbox-nav lightbox-nav--prev"
                aria-label="Previous"
                onClick={() => go(-1)}
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {current.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={current.url} className="lightbox-media" src={current.url} alt={`${title} — ${current.label}`} />
            ) : (
              <video key={current.url} className="lightbox-media" src={current.url} controls autoPlay playsInline />
            )}

            {total > 1 && (
              <button
                type="button"
                className="lightbox-btn lightbox-nav lightbox-nav--next"
                aria-label="Next"
                onClick={() => go(1)}
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}