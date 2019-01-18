class Footer extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
              :host {
                  display: block;
                  width: 100%;
              }
              
              nav {
                  padding: 64px 0; 
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 18px;
              }

              ::slotted(*:not(:first-child)) {
                margin-left: 16px;
              }
          `;

    shadowRoot.innerHTML = `
              <style>${styles}</style>
              <footer>
                  <nav>
                      <slot></slot>
                  </nav>
              </footer>
          `;
  }
}

customElements.define("bp-footer", Footer);
