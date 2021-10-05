function changeImage(type) {
    let image = document.querySelector("#product-image img");

    let imageSrc = null;

    switch (type) {
        case "arches":
            imageSrc = "images/hoodies/sand-front425.jpg";
            break;
        case "tetons":
            imageSrc = "images/hoodies/teton-black425.jpg";
        default:
            break;
    }

    if (imageSrc != null) {
        image.setAttribute('src', imageSrc);
    }
}