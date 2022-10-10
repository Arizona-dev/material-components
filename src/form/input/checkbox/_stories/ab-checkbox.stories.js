// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

// Import component
import AbCheckbox from '../ab-checkbox.vue';
// Import doc
import doc from './ab-checkbox.md';

storiesOf('Material Components|Form/Input/Checkbox/ab-checkbox', module)
  .add('Checkbox - Left', () => ({
    components: { AbCheckbox },
    template: `
      <section class="demo">
        <ab-checkbox>My label</ab-checkbox>
      </section>
    `
  }), { info: { summary: doc } })
  .add('Checkbox - right', () => ({
    components: { AbCheckbox },
    template: `
      <section class="demo">
        <ab-checkbox position="right">My label</ab-checkbox>
      </section>
    `
  }), { info: { summary: doc } });
