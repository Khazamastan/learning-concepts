class Developer {
  constructor({ name, primaryStack, yearsExperience, skills, available }) {
    this.name = name;
    this.primaryStack = primaryStack;
    this.yearsExperience = yearsExperience;
    this.skills = skills;
    this.available = available;
  }
}

export class DeveloperBuilder {
  #state = {
    name: 'Anonymous',
    primaryStack: 'Full-stack',
    yearsExperience: 0,
    skills: new Set(),
    available: false,
  };

  setName(name) {
    this.#state.name = name;
    return this;
  }

  setPrimaryStack(stack) {
    this.#state.primaryStack = stack;
    return this;
  }

  setYearsExperience(years) {
    this.#state.yearsExperience = Number(years);
    return this;
  }

  addSkill(...skills) {
    skills.forEach((skill) => this.#state.skills.add(skill));
    return this;
  }

  setAvailability(flag) {
    this.#state.available = Boolean(flag);
    return this;
  }

  reset() {
    this.#state = {
      name: 'Anonymous',
      primaryStack: 'Full-stack',
      yearsExperience: 0,
      skills: new Set(),
      available: false,
    };
    return this;
  }

  build() {
    const developer = new Developer({
      ...this.#state,
      skills: Array.from(this.#state.skills),
    });
    this.reset();
    return developer;
  }
}
