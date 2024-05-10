class MyFrame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (this.getAttribute("uri")) {
            const uriParts = this.getAttribute("uri").split(":");
            const albumId = uriParts[2];
            this.shadowRoot.innerHTML = `
                <iframe class="spotify-iframe" width="100%" height="99%" src="https://open.spotify.com/embed/album/${albumId}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            `;
        }
    }
    static get observedAttributes() {
        return ["uri"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "uri" && oldValue !== newValue) {
            const uriParts = newValue.split(":");
            const albumId = uriParts[2];
            this.shadowRoot.innerHTML = `
                <iframe class="spotify-iframe" width="100%" height="99%" src="https://open.spotify.com/embed/album/${albumId}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            `;
        }
    }
}
customElements.define("my-frame", MyFrame);
