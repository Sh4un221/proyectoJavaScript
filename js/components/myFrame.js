export class Myframe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const uri = this.getAttribute("uri");
        if (uri) {
            this.render(uri);
        }
    }

    render(uri) {
        const id = uri.split(":").pop();
        this.shadowRoot.innerHTML = `
            <iframe class="spotify-iframe" width="100%" height="99%" src="https://open.spotify.com/embed/album/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        `;
    }

    static get observedAttributes() {
        return ["uri"];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "uri") {
            this.render(newVal);
        }
    }
}