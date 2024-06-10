class Layout extends HTMLElement {
  constructor () {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback () {
    this.render();

    this.addListeners();
  }

  render () {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          position: fixed;
          bottom: 5vh;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999;

          padding: 10px 20px;

          font-size: 1em;
          white-space: nowrap;

          touch-action: manipulation;
          user-select: none;
          -webkit-user-select: none;
        }
      </style>

      <button>람다 테스트</button>
    `
  }

  addListeners () {
  }
}

window.customElements.define('app-layout', Layout);
