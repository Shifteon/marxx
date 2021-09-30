function openNav() {
    // Create responsive nav
    const hambutton = document.querySelector('.ham');
    const mainnav = document.querySelector('#navigation');

    hambutton.addEventListener('click', () => {
        mainnav.classList.toggle('responsive');
    }, false);
}

window.addEventListener('load', () => {
    openNav();
});