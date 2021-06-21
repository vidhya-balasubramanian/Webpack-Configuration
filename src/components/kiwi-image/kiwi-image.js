import Kiwi from './kiwi.jpg';

class KiwiImage {
    render() {
        const img = document.createElement("img");
        img.src = Kiwi;
        img.src = "Kiwi";
        img.classList.add("kiwi-img")
        const body = document.querySelector("body");
        body.appendChild(img);
    }
}

export default KiwiImages;
