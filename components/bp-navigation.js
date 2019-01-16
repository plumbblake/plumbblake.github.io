class Navigation extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
            :host {
                display: block;
                width: 100%;
                max-width: 940px;
                margin: 0 auto;
            }
            
            nav {
                padding: 32px 16px; 
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
            <nav>
                <div id="home"><slot name="home"></slot></div>
                <div id="flex"><slot></slot></div>
            </nav>
        `;
  }
}

customElements.define("bp-navigation", Navigation);
