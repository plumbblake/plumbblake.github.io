import "../components/bp-text.js";

class Footer extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
              :host {
                  display: block;
                  width: 100%;
              }
              
              nav {
                  padding: var(--spacing-64) 0; 
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }

              ::slotted(*:not(:first-child)) {
                margin-left: var(--spacing-16);
              }
          `;

    shadowRoot.innerHTML = `
              <style>${styles}</style>
              <bp-text1>
                <footer>
                  <nav>
                      <slot></slot>
                  </nav>
                </footer>
              </bp-text1>
          `;
  }
}

customElements.define("bp-footer", Footer);
