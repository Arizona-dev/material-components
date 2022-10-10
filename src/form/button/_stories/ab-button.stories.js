// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

// Import component
import AbButton from '../ab-button.vue';

// Import doc
import doc from './ab-button.md';

import './stories.css';

storiesOf('Material Components|Form/Button/ab-button', module)
  .add('Button', () => ({
    components: { AbButton },
    template: `
      <section class="default">
        <ab-button>Button</ab-button>
      </section>
    `
  }), { info: { summary: doc } })
  .add('Button - Primary', () => ({
    components: { AbButton },
    template: `
      <section>
        <ab-button class="primary">Button</ab-button>
      </section>
    `
  }), { info: { summary: doc } })
  .add('Button - Secondary', () => ({
    components: { AbButton },
    template: `
      <section>
        <ab-button class="secondary">Button</ab-button>
      </section>
    `
  }), { info: { summary: doc } })
  .add('Button - White', () => ({
    components: { AbButton },
    template: `
      <section>
        <ab-button class="white">Button</ab-button>
      </section>
    `
  }), { info: { summary: doc } })
  .add('Button - Danger', () => ({
    components: { AbButton },
    template: `
      <section>
        <ab-button class="danger">Button</ab-button>
      </section>
    `
  }), { info: { summary: doc } });
