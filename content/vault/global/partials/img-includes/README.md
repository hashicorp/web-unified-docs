# Image includes for Vault docs

We use image includes to pair MDX partials that have light and dark themed
images to ensure they always appear together.


## Using an image include

Use the relative path `../../../global/img-includes/<path-to-mdx-file>` to
include light/dark images in a markdown page.

## Creating an image include

1. Create a version of the image that renders well on light-theme pages (white
   background). Light-theme file names must end with `_light` before the file
  type extension.

2. Create a version of the image that renders well on dark-theme pages (black
   background). Dark-theme file names must end with `_dark` before the file
  type extension.

3. Save both images to a location under `/content/vault/<version>/img` for every
   doc version where you intend to use the image.

4. Save a new partial to a location under `/content/vault/global/img-includes`.

5. Copy the template markdown to your new partial and update the text with a
   meaningful alt text and the path to your new image files.


## Image partial template

```markdown
![<alt_text>](<dark_theme_image_path#dark-theme-only)
![<alt_text>](<light_theme_image_path#light-theme-only)
```
