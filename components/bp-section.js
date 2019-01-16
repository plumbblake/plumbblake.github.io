class Section extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        :host([dark]) section {
            background: var(--black);
        }   
    `;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <section>
                <slot></slot>
            </section>
        `;
  }
}

customElements.define("bp-section", Section);
