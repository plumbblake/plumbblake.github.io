class Grid extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
          :host {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(9.4rem, 1fr));
              grid-gap: ${this.getAttribute("gap-size") || "var(--spacing-8)"};
          }`;

    shadowRoot.innerHTML = `
              <style>${styles}</style>
              <slot></slot>
          `;
  }
}

customElements.define("bp-grid", Grid);
