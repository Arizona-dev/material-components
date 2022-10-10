// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

// Import component
import MultipleSelect from '../multiple-select.vue';

// Import doc
import doc from './multiple-select.md';

// Synthax coloration
const html = strings => strings.raw[0];

storiesOf('Material Components|Form/Select/multiple-select', module)
  .add('Single select', () => ({
    components: { MultipleSelect },
    data() {
      return {
        selected: null,
        data: [
          { value: 0, label: 'Label 0', name: 'Plop 0' },
          { value: 1, label: 'Label 1', name: 'Plop 1' },
          { value: 2, label: 'Label 2', name: 'Plop 2' },
          { value: 3, label: 'Label 3', name: 'Plop 3' },
          { value: 4, label: 'Label 4', name: 'Plop 4' },
          { value: 5, label: 'Label 5', name: 'Plop 5' },
          { value: 6, label: 'Label 6', name: 'Plop 6' },
          { value: 7, label: 'Label 7', name: 'Plop 7' },
          { value: 8, label: 'Label 8', name: 'Plop 8' },
          { value: 9, label: 'Label 9', name: 'Plop 9' },
        ]
      };
    },
    methods: {
      plop({ label, name }) {
        return `${name} – ${label}`;
      }
    },
    mounted() {
      // eslint-disable-next-line prefer-destructuring
      this.selected = this.data.find(el => el.value === 2);
    },
    template: html`
      <section>
        <multiple-select
          placeholder="Search for labels"
          :allow-empty="true"
          :multiple="false"
          :options="data"
          track-by="value"
          label="label"
          select-label="Test"
          required
          :custom-label="plop"
          v-model="selected">
        </multiple-select>
        <br>
        <p>Selected : {{ selected ? selected.label : null }}</p>
      </section>
    `
  }), { info: { summary: doc } })
  .add('Custom template', () => ({
    components: { MultipleSelect },
    data() {
      return {
        selected: null,
        data: [
          { value: 0, label: 'Label 0', name: 'Plop 0' },
          { value: 1, label: 'Label 1', name: 'Plop 1' },
          { value: 2, label: 'Label 2', name: 'Plop 2' },
          { value: 3, label: 'Label 3', name: 'Plop 3' },
          { value: 4, label: 'Label 4', name: 'Plop 4' },
          { value: 5, label: 'Label 5', name: 'Plop 5' },
          { value: 6, label: 'Label 6', name: 'Plop 6' },
          { value: 7, label: 'Label 7', name: 'Plop 7' },
          { value: 8, label: 'Label 8', name: 'Plop 8' },
          { value: 9, label: 'Label 9', name: 'Plop 9' },
        ]
      };
    },
    methods: {
      plop(e) {
        console.log(e);
      }
    },
    mounted() {
    },
    template: html`
      <section>
        <multiple-select
          placeholder="Search for labels"
          :allow-empty="true"
          :multiple="false"
          :options="data"
          track-by="value"
          label="label"
          select-label="Test"
          required
          v-model="selected">
          <template slot="singleLabel" slot-scope="props">
            <img class="option__image" src="https://via.placeholder.com/150" alt="No Man’s Sky">
          </template>
          <template slot="option" slot-scope="{ props }">
            <div style="display: flex; align-items: center;">
              <img class="option__image" src="https://via.placeholder.com/150" alt="No Man’s Sky">
              <div>{{ props }}</div>
            </div>
          </template>
        </multiple-select>
        <br>
        <p>Selected : {{ selected ? selected.label : null }}</p>
      </section>
    `
  }), { info: { summary: doc } })
  .add('Single select with listeners', () => ({
    components: { MultipleSelect },
    data() {
      return {
        selectFired: false,
        selected: null,
        data: [
          { value: 0, label: 'Label 0', name: 'Plop 0' },
          { value: 1, label: 'Label 1', name: 'Plop 1' },
          { value: 2, label: 'Label 2', name: 'Plop 2' },
          { value: 3, label: 'Label 3', name: 'Plop 3' },
          { value: 4, label: 'Label 4', name: 'Plop 4' },
          { value: 5, label: 'Label 5', name: 'Plop 5' },
          { value: 6, label: 'Label 6', name: 'Plop 6' },
          { value: 7, label: 'Label 7', name: 'Plop 7' },
          { value: 8, label: 'Label 8', name: 'Plop 8' },
          { value: 9, label: 'Label 9', name: 'Plop 9' },
        ]
      };
    },
    methods: {
      plop({ label, name }) {
        return `${name} – ${label}`;
      },
      select(value, id) {
        this.selectFired = true;
      }
    },
    mounted() {
      // eslint-disable-next-line prefer-destructuring
      this.selected = this.data.find(el => el.value === 2);
    },
    template: html`
      <section>
        <multiple-select
          v-model="selected"
          placeholder="Search for labels"
          :allow-empty="true"
          :multiple="false"
          :options="data"
          track-by="value"
          label="label"
          select-label="Test"
          required
          :custom-label="plop"
          @select="select">
        </multiple-select>
        <br>
        <p>Selected : {{ selected ? selected.label : null }}</p>
        <p v-if="selectFired">Select event fired !</p>
        <p>{{ selectFired }}</p>
      </section>
    `
  }), { info: { summary: doc } })
  .add('Select error', () => ({
    components: { MultipleSelect },
    data() {
      return {
        selected: null,
        data: []
      };
    },
    template: html`
      <section>
        <multiple-select
          placeholder="Search for labels"
          :allow-empty="true"
          :multiple="false"
          :options="data"
          track-by="value"
          label="label"
          select-label="Test"
          required
          :error="true"
          v-model="selected">
        </multiple-select>
      </section>
    `
  }), { info: { summary: doc } })
  .add('Single disabled', () => ({
    components: { MultipleSelect },
    data() {
      return {
        selected: null,
        data: [
          { value: 0, label: 'Label 0' },
          { value: 1, label: 'Label 1' },
          { value: 2, label: 'Label 2' },
          { value: 3, label: 'Label 3' },
          { value: 4, label: 'Label 4' },
          { value: 5, label: 'Label 5' },
          { value: 6, label: 'Label 6' },
          { value: 7, label: 'Label 7' },
          { value: 8, label: 'Label 8' },
          { value: 9, label: 'Label 9' },
        ]
      };
    },
    mounted() {
      // eslint-disable-next-line prefer-destructuring
      this.selected = this.data.find(el => el.value === 2);
    },
    template: html`
      <section>
        <multiple-select
          placeholder="Search for labels"
          :allow-empty="true"
          :multiple="false"
          :options="data"
          track-by="value"
          label="label"
          select-label="Test"
          disabled
          required
          v-model="selected">
        </multiple-select>
        <br>
        <p>Selected : {{ selected ? selected.label : null }}</p>
      </section>
    `
  }), { info: { summary: doc } })
  .add('Multiple select', () => ({
    components: { MultipleSelect },
    data() {
      return {
        selected: null,
        data: [
          { value: 0, label: 'Label 0' },
          { value: 1, label: 'Label 1' },
          { value: 2, label: 'Label 2' },
          { value: 3, label: 'Label 3' },
          { value: 4, label: 'Label 4' },
          { value: 5, label: 'Label 5' },
          { value: 6, label: 'Label 6' },
          { value: 7, label: 'Label 7' },
          { value: 8, label: 'Label 8' },
          { value: 9, label: 'Label 9' },
        ]
      };
    },
    methods: {
      limitText: count => `and ${count} element${count > 1 ? 's' : ''} selected`
    },
    template: html`
      <section>
        <multiple-select
          placeholder="Search for labels"
          :allow-empty="true"
          :multiple="true"
          :options="data"
          track-by="value"
          label="label"
          :limit="1"
          :limit-text="limitText"
          v-model="selected">
        </multiple-select>
        <br>
        <p>Selected : {{ selected ? selected.map(item => item ? item.label : null).join(', ') : null }}</p>
      </section>
    `
  }), { info: { summary: doc } })
  .add('Multiple pre-selected', () => ({
    components: { MultipleSelect },
    data() {
      return {
        selected: null,
        data: [
          { value: 0, label: 'Label 0' },
          { value: 1, label: 'Label 1' },
          { value: 2, label: 'Label 2' },
          { value: 3, label: 'Label 3' },
          { value: 4, label: 'Label 4' },
          { value: 5, label: 'Label 5' },
          { value: 6, label: 'Label 6' },
          { value: 7, label: 'Label 7' },
          { value: 8, label: 'Label 8' },
          { value: 9, label: 'Label 9' },
        ]
      };
    },
    mounted() {
      // eslint-disable-next-line prefer-destructuring
      this.selected = [ this.data[0] ];
    },
    methods: {
      limitText: count => `and ${count} element${count > 1 ? 's' : ''} selected`
    },
    template: html`
      <section>
        <multiple-select
          placeholder="Search for labels"
          :allow-empty="true"
          :multiple="true"
          :options="data"
          track-by="value"
          label="label"
          :limit="1"
          :limit-text="limitText"
          v-model="selected">
        </multiple-select>
        <br>
        <p>Selected : {{ selected ? selected.map(item => item ? item.label : null).join(', ') : null }}</p>
      </section>
    `
  }), { info: { summary: doc } });
