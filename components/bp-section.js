class Section extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        :host([dark]) section {
            background: var(--black);
            color: var(--white);
        }

        section {
            padding: 0 16px;  
        }

        @media (min-width: 600px){
            section {
                padding: 0 24px;
            }
        }
        
        div {
            width: 100%;
            max-width: 940px;
            margin: 0 auto;
        } 
    `;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <section>
                <div>
                    <slot></slot>
                </div>
            </section>
        `;
  }
}

customElements.define("bp-section", Section);
