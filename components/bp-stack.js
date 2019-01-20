class Stack extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        :host {
            display: grid;
            grid-auto-columns: 100%;
            grid-gap: ${this.getAttribute("gap-size") || "var(--spacing-16)"};
        }`;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <slot></slot>
        `;
  }
}

customElements.define("bp-stack", Stack);
