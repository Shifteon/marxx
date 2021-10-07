var design = "arches";
var color = "black";
var step = 1;

function setDesign(value) {
    design = value;
    changeImage();
}

function setColor(value) {
    color = value;
    changeImage();
}

function changeImage() {
    let image = document.querySelector("#product-image img");

    let imageSrc = `images/hoodies/${design}_${color}.jpg`;
    image.setAttribute('src', imageSrc);
}

function build(values, type, parent) {
    const main = document.querySelector('#hoodie-main');
    const button = document.querySelector('#product-next');
    parent.innerHTML = "";

    for (value of values) {
        let content = document.createElement('label');
        content.innerHTML =`
        <input type="radio" name="test" value="${value}" oninput="set${type}(this.value)" checked>
        <img src="images/designs/${value}.jpg">`;

        parent.appendChild(content);
    }

    main.insertBefore(parent, button);
}

const designs = ["arches", "dunes", "goldengate", "tetons"];
const colors = ["black", "white", "maroon", "sand"];

window.addEventListener('load', () => {
    let parent = document.createElement('section');
    parent.id = "product-selection";

    build(designs, "Design", parent);

    let button = document.querySelector('#product-next');
    button.addEventListener("click", () => {
        switch (step) {
            case 1:
                build(colors, "Color", parent);
                document.querySelector("#progress-color").classList.add('filled')
                step++;
                break;
            default:
                break;
        }
    });
});