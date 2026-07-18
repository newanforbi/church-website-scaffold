# Gallery Images

Image files referenced by `lib/gallery-data.ts`:

- `welcome-to-worship.jpg`, `digging-deep.jpg`, `new-month-power.jpg`, `power-night.jpg`, `shiloh-hour.jpg` — service/event flyers, with captions already written.
- `photo-01.jpg` … `photo-29.jpg` — photos pulled from the church's Facebook page. These are small (206×206) Facebook thumbnail exports, so they're fine in the grid but will look soft when enlarged in the lightbox. Swap in higher-resolution originals when available for a crisper full-size view.

To add more images, drop the file here and append an entry to the `galleryImages` array in `lib/gallery-data.ts` (or extend `PHOTO_COUNT` if you're adding more sequentially-named `photo-NN.jpg` files).

Tips:

- JPG or WebP, roughly 1200px on the long edge, keeps page weight down and looks sharp in the lightbox.
- To identify what's in each `photo-NN.jpg`, open it and update its `alt`/`caption` in `lib/gallery-data.ts`.
