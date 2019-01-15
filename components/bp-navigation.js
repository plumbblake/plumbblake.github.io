class Navigation extends HTMLElement {
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });

        const styles = `:host {
            display: block;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
        }`

        shadowRoot.innerHTML = `
            <style>${styles}</style>
            <nav>
                <slot id="home" name="home"></slot>
                <slot name="site-links"</slot>
            </nav>
        `;
    }
}

customElements.define("bp-navigation", Navigation);