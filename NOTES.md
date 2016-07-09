## Why widget.scss is empty

I spent a little bit of time creating a responsive design based on the [Sydney WordPress theme](https://wordpress.org/themes/sydney/). That design is implemented in a local branch. I can demo it for you, but I’m not including it in this pull request because it’s a complete shot in the dark. It’s also, to be perfectly frank, a level of spec work that I’m not comfortable with. I’ve done as much research as I can based on your website and the job description, but I still have a lot to learn about you, your customers, what you need, and what the context for the design is. The quality and consistency of the work you get from the person you hire—be it me or someone else—will be determined as much by the relationship you build with them as their innate skills.

## What else I did and why

### Lorem ipsum content

This is placeholder content rendered as gray blocks (rather than text) by CSS until the real content is loaded. This text could be rendered by JavaScript if we want to avoid it showing up in search engine results.

### Jade

Jade is like Emmett except the shorthand syntax doesn’t *generate* source code, it *is* the source code. The ideal setup from a front-end development perspective is to use something like React, but that’s a pretty heavy dependency for a dynamically loaded widget with very little state to manage. We can use whatever templating is appropriate for the project at hand.

### Lack of a “sold out” state

This wasn’t requested in README.md, but I wanted to make sure you knew I saw that in the API and would ordinarily have designed and written something to handle it.

### BEM class names

OOCSS, BEM, SMACSS, Atomic, PostCSS... so many choices! I went with BEM for clarity, but I’m not married to it. There’s a minor performance hit from the verbosity. If the elements live in an isolated iframe, Atomic CSS might make more sense.

### npm scripts

I’ve used grunt, gulp and even makefiles way back in the day. For most purposes, npm scripts keep things simple.

### polyfill.io

polyfill.io is a ES5 polyfill-as-a-serivce created by FTLabs and hosted on a CDN. For evergreen, standards-compliant browsers, the performance cost is negligible since the response is basically empty. The further the browser is from modern standards, the bigger the performance penalty. The chief drawback of using it is that if it goes down, the experience in older browsers is likely to be buggy. The more reliable option is to penalize all browsers with a one-size-fits-all polyfill.

### Web Font Loader

We can use vanilla CSS to load Google Fonts, but if we want control of FOUT, we have to use a loader. This is solution co-developed by Google and Adobe TypeKit is the de facto standard lib for web fonts.

## Tested browsers

* Chrome
* Safari
* Mobile Safari
* Firefox
* Opera

I usually include IE and at least one Android browser in browser tests, but I don’t have the appropriate VMs installed on this computer at the moment.
