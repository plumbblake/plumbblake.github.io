class Hero extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `:host {
            margin: 0 auto;
            width: 100%;
            max-width: 940px;
            max-height: 625px;
            height: 100vw;
            display: block;
            color: var(--white);
            font-weight: 400;
            font-size: 3.125rem;
            padding: 16px;
            text-align: center;
        }
    `;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <slot></slot>
        `;
  }
}

customElements.define("bp-hero", Hero);
