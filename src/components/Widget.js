class Widget extends HTMLElement {
  constructor() {
    super();

    this.repoDetails = null;
    
    this.name = this.getAttribute("name");
    this.endpoint = `https://api.github.com/repos/${this.name}`;
    this.innerHTML = `<h1>Loading</h1>`;
  }
  async getDetails() {
    return await fetch(this.endpoint, { mode: "cors" }).then(res => res.json());
  }
  async connectedCallback() {
    let repo = await this.getDetails();
    this.repoDetails = repo;
    this.initShadowDOM();
  }

  initShadowDOM() {
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = this.template;
  }
  get template() {
    const repo = this.repoDetails;
  
    // if we get an error message let's show that back to the user
    if (repo.message) {
      return `<div class="Card Card--error">Error: ${repo.message}</div>`
    } else {
      return `
      <div class="Card">
        <aside>
          <img width="48" height="48" class="Avatar" src="${repo.owner.avatar_url}" alt="Profile picture for ${repo.owner.login}" />
        </aside>
        <header>
          <h2 class="Card__title">${repo.full_name}</h2>
          <span class="Card__meta">${repo.description}</span>
        </header>
      </div>
      `
    }
  }
}

export default Widget;
