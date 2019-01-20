class Section extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        :host([dark]) section {
            background: var(--black);
            color: var(--white);
        }

        section {
            padding: 0 var(--spacing-16);  
        }

        @media (min-width: 37.5rem){
            section {
                padding: 0 var(--spacing-24);
            }
        }
        
        div {
            width: 100%;
            max-width: 58.75rem;
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
