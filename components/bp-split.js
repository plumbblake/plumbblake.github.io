class Split extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const gapSize = this.getAttribute("gap-size") || "var(--spacing-16)";
    const rowGapSize = this.getAttribute("row-gap-size");
    const columnGapSize = this.getAttribute("column-gap-size");

    const styles = `
        :host {
            display: grid;
            grid-auto-columns: 100%;
            margin: calc(-1 * ${rowGapSize ||
              gapSize}) 0 0 calc(-1 * ${columnGapSize || gapSize});
        }

        ::slotted(:first-child), ::slotted(:last-child){
            margin: ${rowGapSize || gapSize} 0 0 ${columnGapSize || gapSize};
        }
          
        @media (min-width: ${this.getAttribute("min")}) {
            :host {
                display: flex;
                flex-wrap: wrap;          
            }

            :host([vertical-center]) {
                align-items: center;
            }
            
            ::slotted(:first-child) {
                flex: 1;
                min-width: ${this.getAttribute("min")};
            }

            ::slotted(:last-child){
                flex: 1;
                min-width: ${this.getAttribute("min")};
            }   
        }
          `;

    shadowRoot.innerHTML = `
              <style>${styles}</style>
              <slot></slot>
          `;
  }
}

customElements.define("bp-split", Split);
