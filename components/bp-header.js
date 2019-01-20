import "../components/bp-text.js";

class Header extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
            :host {
                display: block;
                width: 100%;
            }
            
            nav {
                padding-top: var(--spacing-32);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            #home {
                display: block;
                border-radius: 50%;
                overflow: hidden;
                width: 4.5rem;
                height: 4.5rem;
            }

            #flex {
                display: flex;
            }

            #flex > ::slotted(*){
                margin-left: var(--spacing-16);
            }
        `;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <bp-text1>
                <header>
                    <nav>
                        <div id="home"><slot name="home"></slot></div>
                        <div id="flex"><slot></slot></div>
                    </nav>
                </header>
            </bp-text1>
        `;
  }
}

customElements.define("bp-header", Header);
