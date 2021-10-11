var design = "arches";
var color = "black";
var size = "medium"
var step = 1;

var isDirty = false;

function setDesign(value) {
    design = value;
    changeImage();
}

function setColor(value) {
    color = value;
    changeImage();
}

function setSize(value) {
    size = value;
    overlaySize();
} 

function changeImage() {
    let image = document.querySelector("#product-image img");

    let imageSrc = `images/hoodies/${design}_${color}.jpg`;
    image.setAttribute('src', imageSrc);
}

function overlaySize() {
    return;
}

// Create the radios for people to select
function build(values, type, parent) {
    const main = document.querySelector('#hoodie-main');
    const button = document.querySelector('#product-next');

    parent.innerHTML = "";

    for (value of values) {
        let content = document.createElement('label');
        if (value == "arches") {
            content.innerHTML =`
            <input type="radio" name="test" value="${value}" oninput="set${type}(this.value)" checked>
            <img src="images/designs/${value}.jpg">`;
        } else {
            content.innerHTML =`
            <input type="radio" name="test" value="${value}" oninput="set${type}(this.value)">
            <img src="images/designs/${value}.jpg">`;
        }

        parent.appendChild(content);
    }

    main.insertBefore(parent, button);

    let grid = document.querySelector('#product-selection');
    grid.style.gridTemplateColumns = `repeat(${values.length}, 1fr)`;
}

const designs = ["arches", "dunes", "goldengate", "tetons"];
const colors = ["black", "white", "maroon", "sand"];
const sizes = ["medium", "large", "xlarge", "xxlarge"];

window.addEventListener('load', () => {
    let parent = document.createElement('section');
    parent.id = "product-selection";

    build(designs, "Design", parent);

    // Move to the next step
    let button = document.querySelector('#product-next');
    button.addEventListener("click", () => {
        switch (step) {
            case 1:
                isDirty = true;
                build(colors, "Color", parent);
                document.querySelector("#progress-color").classList.add('in-progress');
                document.querySelector("#progress-design").classList.add('filled');
                document.querySelector("#progress-design").classList.remove('in-progress');
                step++;
                break;
            case 2:
                build(sizes, "Size", parent);
                document.querySelector("#progress-size").classList.add('in-progress');
                document.querySelector("#progress-color").classList.add('filled');
                document.querySelector("#progress-color").classList.remove('in-progress');
            default:
                break;
        }
    });
});

// Confirm if they want to leave
window.addEventListener("beforeunload", (e) => {
    if (isDirty) {
        var confirmationMessage = 'It looks like you have been editing something. '
        + 'If you leave before saving, your changes will be lost.';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.   
    }
});