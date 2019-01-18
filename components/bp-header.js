class Header extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
            :host {
                display: block;
                width: 100%;
            }
            
            nav {
                padding-top: 32px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 18px;
            }
            
            #home {
                display: block;
                border-radius: 50%;
                overflow: hidden;
                width: 72px;
                height: 72px;
            }

            #flex {
                display: flex;
            }

            #flex > ::slotted(*){
                margin-left: 16px;
            }
        `;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <header>
                <nav>
                    <div id="home"><slot name="home"></slot></div>
                    <div id="flex"><slot></slot></div>
                </nav>
            </header>
        `;
  }
}

customElements.define("bp-header", Header);
