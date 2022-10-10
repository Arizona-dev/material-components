// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

// Import component
import AbSelect from '../ab-select.vue';

const html = strings => strings.raw[0];

storiesOf('Material Components|Form/Select/ab-select', module)
  .add('Select', () => ({
    components: { AbSelect },
    data() {
      return {
        name: ''
      };
    },
    template: html`
      <section>
        <ab-select class="mandatory" label="Label" v-model="name">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </ab-select>
        <br>{{name}}
      </section>
    `
  }), { info: {} })
  .add('Select - Allow emtpy', () => ({
    components: { AbSelect },
    data() {
      return {
        name: ''
      };
    },
    template: html`
      <section>
        <ab-select label="Label" v-model="name" :allow-empty="true">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </ab-select>
        <br>{{name}}
      </section>
    `
  }), { info: {} })
  .add('Select - Selected', () => ({
    components: { AbSelect },
    data() {
      return {
        name: '3'
      };
    },
    template: html`
      <section>
        <ab-select label="Label" v-model="name" :allow-empty="true">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </ab-select>
        <br>{{name}}
      </section>
    `
  }), { info: {} })
  .add('Select - disabled', () => ({
    components: { AbSelect },
    data() {
      return {
        name: ''
      };
    },
    template: html`
      <section>
        <ab-select label="Label" v-model="name" :allow-empty="false" disabled>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </ab-select>
        <br>{{name}}
      </section>
    `
  }), { info: {} });
