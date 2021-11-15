var design = "arches";
var color = "black";
var size = "medium"
var step = 0;

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
} 

function changeImage() {
    let image = document.querySelector("#product-image img");

    let imageSrc = `images/hoodies/${design}_${color}.jpg`;
    image.setAttribute('src', imageSrc);
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

    // let grid = document.querySelector('#product-selection');
    // grid.style.gridTemplateColumns = `repeat(4, 1fr)`;
}

const designs = ["colorado_rockies", "grand_canyon", "huntington_beach", "arches", "tetons", "seattle", "goldengate", "lights", "outline_arches", "outline_tetons", "outline_oldfaithful", "stickers"];
const colors = ["black", "white", "maroon", "sand", "gray"];
// const sizes = ["medium", "large", "xlarge", "xxlarge"];

function callBuild(parent) {
    switch (step) {
        case 0:
            build(designs, "Design", parent);
            document.querySelector("#progress-color").classList.remove('in-progress');
            document.querySelector("#progress-color").classList.remove('filled');
            document.querySelector("#progress-purchase").classList.remove('in-progress');
            document.querySelector("#progress-purchase").classList.remove('filled');
            document.querySelector("#progress-design").classList.remove('filled');
            document.querySelector("#progress-design").classList.add('in-progress');
            step++;
            break;
        case 1:
            isDirty = true;
            build(colors, "Color", parent);
            document.querySelector("#progress-color").classList.add('in-progress');
            document.querySelector("#progress-design").classList.add('filled');
            document.querySelector("#progress-design").classList.remove('in-progress');
            document.querySelector("#progress-purchase").classList.remove('in-progress');
            document.querySelector("#progress-purchase").classList.remove('filled');
            step++;
            break;
        case 2:
            // button.textContent = "Purchase Now";
            document.querySelector("#progress-purchase").classList.add('in-progress');
            document.querySelector("#progress-color").classList.add('filled');
            document.querySelector("#progress-color").classList.remove('in-progress');
            step++;
            break;
        case 3:
            window.open(
                "https://commerce.cashnet.com/IBCBOL",
                '_blank'
            );
            break;
        default:
            break;
    }
}

window.addEventListener('load', () => {
    let parent = document.createElement('section');
    parent.id = "product-selection";

    callBuild(parent);

    // Move to the next step
    let button = document.querySelector('#product-next');
    button.addEventListener("click", () => {
        callBuild(parent)
    });

    let progressDesign = document.querySelector("#progress-design");
    progressDesign.addEventListener('click', () => {
        step = 0;
        callBuild(parent);
    });
    let progressColor = document.querySelector("#progress-color");
    progressColor.addEventListener('click', () => {
        step = 1;
        callBuild(parent);
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