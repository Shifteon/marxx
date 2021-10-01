function blur() {
    let callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("blurred");
            }
            if (!entry.isIntersecting) {
                entry.target.classList.remove("blurred");
            }
        });
    };


    let options = {
        root: null,
        rootMargin: '0px',
        threshold: .75
    }
    let observer = new IntersectionObserver(callback, options);

    let targets = document.querySelectorAll(".content");
    for (target of targets) {
        observer.observe(target);
    }
}

window.addEventListener('load', () => {
    blur();
});