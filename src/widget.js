/* globals WebFont, jsonp */

(function() {

    var html = document.getElementsByTagName('html')[0];
    html.className = html.className.replace('no-js', 'js');

    WebFont.load({
        google: {
            families: [
                'Source+Sans+Pro:300,400,700:latin',
                'Raleway:500,600,700:latin'
            ]
        }
    });

    var head = document.getElementsByTagName('head')[0];
    var jsonpScript = document.createElement('script');
    jsonpScript.src = 'https://selz.com/embed/itemdata?itemurl=http://selz.co/1rvbgi3&callback=callback';

    var blocks = {};
    [
        'container',
        'image',
        'details',
        'buy-button'
    ].forEach(function(bemBlockName) {
        blocks[bemBlockName] = document.querySelector('.sw-' + bemBlockName);
    });

    var elems = {};
    [
        'title',
        'regular-price',
        'discount-price',
        'availability',
        'percent-discount',
        'percent-discount-number',
        'cards',
        'paypal'
    ].forEach(function(bemElementName) {
        elems[bemElementName] = document.querySelector('[class*="__' + bemElementName + '"]');
    });

    // Depending on the context, it might be prudent to generate the callback
    // function name dynamically to avoid conflicts with other JSONP requests.
    window.callback = function(itemData) {

        console.log(itemData);

        elems.title.innerHTML = itemData.Title;
        elems['regular-price'].innerHTML = itemData.RegularPrice

        var priceNumberRegExp,
            regularPriceNumber,
            discountPriceNumber,
            discountPercentString;

        // I'm not 100% sure if this is the way the API represents a discounted
        // state. If this were a real project, I would ask.
        if (itemData.Price !== itemData.RegularPrice) {
            elems['regular-price'].classList.add('sw-summary__regular-price--discounted');
            elems['discount-price'].innerHTML = itemData.Price;
            elems['discount-price'].classList.remove('sw-summary__discount-price--hidden');
            // In an ideal world, this would be calculated on the API side and
            // there would be a localized "off" string to go with it.
            priceNumberRegExp = /\d*\.?\d+/;
            regularPriceNumber = Number(itemData.RegularPrice.match(priceNumberRegExp)[0]);
            discountPriceNumber = Number(itemData.Price.match(priceNumberRegExp)[0]);
            discountPercentString = Math.round((regularPriceNumber - discountPriceNumber) / regularPriceNumber * 100).toString() + '%';
            elems['percent-discount-number'].innerHTML = discountPercentString;
            elems['percent-discount'].classList.remove('sw-summary__percent-discount--hidden');
        }

        elems.availability.innerHTML = itemData.QuantityLeft + ' ' + itemData.Resources.QuantityLeft;

        var productImageElem = document.createElement('img');

        // https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/
        productImageElem.setAttribute('src', itemData.FeaturedImage.Small);
        productImageElem.setAttribute('srcset', [
            itemData.FeaturedImage.Medium + ' 240w',
            itemData.FeaturedImage.Large + ' 480w',
            itemData.FeaturedImage.Grande + ' 600w',
            itemData.FeaturedImage.MuchoGrande + ' 1000w'
        ].join(', '));

        productImageElem.setAttribute('alt', itemData.Title);
        blocks.image.appendChild(productImageElem);

        blocks.details.innerHTML = itemData.Description;

        // The URL implies this should be opened in a modal, but that's outside
        // the scope of this test.
        blocks['buy-button'].innerHTML = itemData.Resources.LinkText;
        blocks['buy-button'].setAttribute('href', itemData.CheckoutUrl);
        blocks['buy-button'].classList.remove('sw-buy-button--loading');

        var spriteRequest = new XMLHttpRequest();
        spriteRequest.addEventListener('load', function() {
            var spriteContainer = document.createElement('div');
            spriteContainer.classList.add('sw-sprite');
            spriteContainer.innerHTML = this.responseText;
            document.body.insertBefore(spriteContainer, document.body.childNodes[0]);
        });
        spriteRequest.open('GET', itemData.SpriteUrl);
        spriteRequest.send();

        if (itemData.CardProcessingEnabled) {
            elems.cards.classList.remove('sw-footer__cards--hidden')
        }

        if (itemData.PayPalProcessingEnabled) {
            elems.paypal.classList.remove('sw-footer__paypal--hidden');
        }

        // Clean up
        head.removeChild(jsonpScript);
        delete window.callback;

    };

    head.appendChild(jsonpScript);

})();
