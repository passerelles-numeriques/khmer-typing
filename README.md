# khmer-typing

> Learn Khmer Typing with a Visual Keyboard and games

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/khmer-typing)

A free and open source cross platform and a progressive web application (you can install it on ChromeOS):
 - Online and PWA: https://khmer-typing.passerellesnumeriques.org/
 - Snapcraft https://snapcraft.io/khmer-typing
 - Windows Store (coming soon)
 - Portable Windows Application (see releases tab)

#### Build

``` bash
# install dependencies
yarn install

# build application for the web
yarn run build:web

# build electron application for production
yarn run build

# lint all JS/Vue component files in `src/`
npm run lint

```

---

#### Docker image

The web application is a client side only VueJS SPA. You can run build and a small docker image running nginx on port 80 with the sample Docker file provided:

    docker build -t typing_image .
    docker run -p 80:80 typing_image

And then open your browser on http://localhost/

## Credits

- Icon by **icon lauk** https://www.iconfinder.com/andhikairfani - Attribution 3.0 Unported (CC BY 3.0)
- NIDA Keyboard layout by **Kiensvay** https://commons.wikimedia.org/wiki/File:Khmer_unicode_NiDA_layout.svg Attribution 3.0 Unported (CC BY 3.0)
- Texts in Khmer are copy with the authorization of the authors from Wapatao website: https://wapatoa.com/km/
