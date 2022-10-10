// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

// Import component
import AbInput from '../ab-input.vue';
import AbIcon from '../../../../icon/ab-icon.vue';
import AbIconset from '../../../../icon/ab-iconset.vue';
import AbDropdownInput from '../ab-dropdown-input.vue';

// Import doc
import text from './ab-input.text.md';
import password from './ab-input.password.md';
import dropdownInput from './ab-dropdown-input.md';

import './stories.css';

const html = strings => strings.join();

storiesOf('Material Components|Form/Input/Text/ab-input', module)
  .add('Text', () => ({
    components: { AbInput },
    data() {
      return {
        name: 'Activbrowser'
      };
    },
    template: `
      <section>
        <ab-input label="Label" type="text" v-model.trim="name"></ab-input>
        <h1>Title : {{ name }}</h1>
      </section>
    `
  }), { info: { summary: text } })
  .add('Text with error', () => ({
    components: { AbInput },
    data() {
      return {
        name: 'Activbrowser'
      };
    },
    template: `
      <section>
        <ab-input label="Label" type="text" v-model.trim="name" :error="true" error-message="This field has an error"></ab-input>
        <h1>Title : {{ name }}</h1>
      </section>
    `
  }), { info: { summary: text } })
  .add('Text - required', () => ({
    components: { AbInput },
    data() {
      return {
        name: 'Activbrowser'
      };
    },
    template: `
      <section>
        <ab-input label="Label" type="text" v-model.trim="name" required></ab-input>
        <h1>Title : {{ name }}</h1>
      </section>
    `
  }), { info: { summary: text } })
  .add('Password', () => ({
    components: { AbInput, AbIcon, AbIconset },
    data() {
      return {
        password: 'mySecretPassword'
      };
    },
    template: `
      <section>
        <ab-input label="Password" type="password" v-model.trim="password" password-reveal iconset="password"></ab-input>
        <ab-iconset iconset="password">
          <g id="eye">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.14074 12C2.25003 12.1889 2.39492 12.4296 2.57441 12.7075C3.03543 13.4213 3.71817 14.3706 4.60454 15.3161C6.39552 17.2264 8.89951 19 12 19C15.1005 19 17.6045 17.2264 19.3955 15.3161C20.2818 14.3706 20.9646 13.4213 21.4256 12.7075C21.6051 12.4296 21.75 12.1889 21.8593 12C21.75 11.8111 21.6051 11.5704 21.4256 11.2925C20.9646 10.5787 20.2818 9.6294 19.3955 8.68394C17.6045 6.77356 15.1005 5 12 5C8.89951 5 6.39552 6.77356 4.60454 8.68394C3.71817 9.6294 3.03543 10.5787 2.57441 11.2925C2.39492 11.5704 2.25003 11.8111 2.14074 12ZM23 12C23.8944 11.5528 23.8943 11.5524 23.8941 11.5521L23.8925 11.5489L23.889 11.542L23.8777 11.5198C23.8681 11.5013 23.8546 11.4753 23.8372 11.4424C23.8025 11.3767 23.752 11.2832 23.686 11.166C23.5542 10.9316 23.3601 10.6015 23.1057 10.2075C22.5979 9.42131 21.8432 8.3706 20.8545 7.31606C18.8955 5.22644 15.8995 3 12 3C8.10049 3 5.10448 5.22644 3.14546 7.31606C2.15683 8.3706 1.40207 9.42131 0.894336 10.2075C0.63985 10.6015 0.445792 10.9316 0.313971 11.166C0.248023 11.2832 0.19754 11.3767 0.162753 11.4424C0.145357 11.4753 0.131875 11.5013 0.122338 11.5198L0.11099 11.542L0.107539 11.5489L0.10637 11.5512C0.106186 11.5516 0.105573 11.5528 1 12L0.105573 11.5528C-0.0351909 11.8343 -0.0351909 12.1657 0.105573 12.4472L1 12C0.105573 12.4472 0.105389 12.4468 0.105573 12.4472L0.107539 12.4511L0.11099 12.458L0.122338 12.4802C0.131875 12.4987 0.145357 12.5247 0.162753 12.5576C0.19754 12.6233 0.248023 12.7168 0.313971 12.834C0.445792 13.0684 0.63985 13.3985 0.894336 13.7925C1.40207 14.5787 2.15683 15.6294 3.14546 16.6839C5.10448 18.7736 8.10049 21 12 21C15.8995 21 18.8955 18.7736 20.8545 16.6839C21.8432 15.6294 22.5979 14.5787 23.1057 13.7925C23.3601 13.3985 23.5542 13.0684 23.686 12.834C23.752 12.7168 23.8025 12.6233 23.8372 12.5576C23.8546 12.5247 23.8681 12.4987 23.8777 12.4802L23.889 12.458L23.8925 12.4511L23.8936 12.4488C23.8938 12.4484 23.8944 12.4472 23 12ZM23 12L23.8944 12.4472C24.0352 12.1657 24.0348 11.8336 23.8941 11.5521L23 12Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10ZM8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z"/>
          </g>
          <g id="eye-close">
            <path d="M12 21C4.5 21 0.3 12.8 0.1 12.4C-1.49012e-08 12.1 -1.49012e-08 11.8 0.1 11.5C1.4 9.1 3.2 7 5.5 5.3C5.9 4.9 6.5 5 6.9 5.5C7.2 5.9 7.2 6.6 6.7 6.9C4.8 8.3 3.3 10 2.1 12C3 13.6 6.6 19 12 19C13.9 19 15.8 18.3 17.3 17.1C17.7 16.8 18.4 16.9 18.7 17.3C19 17.7 18.9 18.4 18.5 18.7C16.7 20.2 14.4 21 12 21ZM20.8 16.2C20.6 16.2 20.3 16.1 20.2 16C19.8 15.6 19.7 15 20.1 14.6C20.8 13.8 21.4 13 21.9 12.1C21 10.5 17.4 5.1 12 5.1C11.4 5.1 10.7 5.2 10.1 5.3C9.6 5.3 9.1 5 8.9 4.5C8.7 4 9.1 3.4 9.6 3.3C10.4 3.1 11.2 3 12 3C19.5 3 23.7 11.2 23.9 11.6C24 11.9 24 12.2 23.9 12.5C23.3 13.7 22.5 14.8 21.6 15.9C21.4 16.1 21.1 16.2 20.8 16.2ZM11.9 16.1C10.9 16.1 9.9 15.7 9.2 15C8.4 14.3 8 13.3 7.9 12.2C7.9 11.1 8.2 10.1 9 9.3C9.1 9.2 9.1 9.2 9.2 9.1C9.6 8.7 10.2 8.7 10.6 9.1C11 9.5 11 10.1 10.6 10.5L10.5 10.6C10.1 11 9.9 11.5 10 12C10 12.5 10.2 13 10.6 13.4C11.4 14.2 12.7 14.1 13.4 13.3C13.8 12.9 14.4 12.9 14.8 13.3C15.2 13.7 15.2 14.3 14.8 14.7C14.1 15.6 13 16.1 11.9 16.1Z"/>
            <path d="M23 24C22.7 24 22.5 23.9 22.3 23.7L0.3 1.7C-0.1 1.3 -0.1 0.7 0.3 0.3C0.7 -0.1 1.3 -0.1 1.7 0.3L23.7 22.3C24.1 22.7 24.1 23.3 23.7 23.7C23.5 23.9 23.3 24 23 24Z"/>
          </g>
        </ab-iconset>
      </section>
    `
  }), { info: { summary: password, source: false } });

storiesOf('Material Components|Form/Input/Text/ab-dropdown-input', module)
  .add('Simple dropdown input', () => ({
    components: { AbDropdownInput },
    data() {
      return {
        list: [ ...Array(20).keys() ].map(v => `Plop ${v}`),
        selected: null
      };
    },
    methods: {
      handleCreate(value) {
        this.list.push(value);
      }
    },
    template: html`
      <section>
        <ab-dropdown-input
          v-model="selected"
          label="Label"
          :options="list"
          @create:new="handleCreate"
        >
        </ab-dropdown-input>
        <br>
        Value : {{ selected }}
      </section>
    `
  }), { info: { summary: dropdownInput, source: false } })
  .add('Custom template dropdown input', () => ({
    components: { AbDropdownInput },
    data() {
      return {
        list: [ ...Array(20).keys() ].map(v => `Plop ${v}`),
        selected: null
      };
    },
    methods: {
      handleCreate(value) {
        this.list.push(value);
      }
    },
    template: html`
      <section>
        <ab-dropdown-input
          v-model="selected"
          label="Label"
          :options="list"
          @create:new="handleCreate"
          v-slot="{ option }"
        >
          <div style="background: dodgerblue; color: black;">{{ option.item }}</div>
        </ab-dropdown-input>
        <br>
        Value : {{ selected }}
      </section>
    `
  }), { info: { summary: dropdownInput, source: false } })
  .add('Simple dropdown with error', () => ({
    components: { AbDropdownInput },
    data() {
      return {
        list: [ ...Array(20).keys() ].map(v => `Plop ${v}`),
        selected: null
      };
    },
    methods: {
      handleCreate(value) {
        this.list.push(value);
      }
    },
    template: html`
      <section>
        <ab-dropdown-input
          v-model="selected"
          label="Label"
          :options="list"
          :error="true"
          error-message="This field has an error"
          @create:new="handleCreate"
        >
        </ab-dropdown-input>
        <br>
        Value : {{ selected }}
      </section>
    `
  }), { info: { summary: dropdownInput, source: false } })
  .add('Dropdown input with object', () => ({
    components: { AbDropdownInput },
    data() {
      return {
        list: [ ...Array(20).keys() ].map(v => ({ label: `Plop ${v}`, id: v })),
        selected: { label: 'Plop 2', id: 2 }
      };
    },
    methods: {
      handleCreate(value) {
        this.list.push({ label: value, id: this.list.length });
      }
    },
    template: html`
      <section>
        <ab-dropdown-input
          v-model="selected"
          label="Label"
          :options="list"
          label-property="label"
          value-property="id"
          :config="{ keys: ['id', 'label'] }"
          @create:new="handleCreate"
        >
        </ab-dropdown-input>
        <br>
        Value : {{ selected ? selected.label : '' }}
      </section>
    `
  }), { info: { summary: dropdownInput, source: false } })
  .add('Dropdown input with object and placeholder', () => ({
    components: { AbDropdownInput },
    data() {
      return {
        list: [ ...Array(20).keys() ].map(v => ({ label: `Plop ${v}`, id: v })),
        selected: { label: 'Plop 2', id: 2 }
      };
    },
    methods: {
      handleCreate(value) {
        this.list.push({ label: value, id: this.list.length });
      }
    },
    template: html`
      <section>
        <ab-dropdown-input
          v-model="selected"
          label="Label"
          :options="list"
          label-property="label"
          value-property="id"
          placeholder="Select placeholder"
          :config="{ keys: ['id', 'label'] }"
          @create:new="handleCreate"
        >
        </ab-dropdown-input>
        <br>
        Value : {{ selected ? selected.label : '' }}
      </section>
    `
  }), { info: { summary: dropdownInput, source: false } })
  .add('Dropdown input with object and placeholder and disabled create', () => ({
    components: { AbDropdownInput },
    data() {
      return {
        list: [ ...Array(20).keys() ].map(v => ({ label: `Plop ${v}`, id: v })),
        selected: { label: 'Plop 2', id: 2 }
      };
    },
    methods: {
      handleCreate(value) {
        this.list.push({ label: value, id: this.list.length });
      }
    },
    template: html`
      <section>
        <ab-dropdown-input
          v-model="selected"
          label="Label"
          :options="list"
          label-property="label"
          value-property="id"
          placeholder="Select placeholder"
          :create="false"
          :config="{ keys: ['id', 'label'] }"
          @create:new="handleCreate"
        >
        </ab-dropdown-input>
        <br>
        Value : {{ selected ? selected.label : '' }}
      </section>
    `
  }), { info: { summary: dropdownInput, source: false } })
  .add('Disabled', () => ({
    components: { AbDropdownInput },
    template: html`
      <section>
        <ab-dropdown-input
          v-model="selected"
          label="Label"
          disabled
        >
        </ab-dropdown-input>
      </section>
    `
  }), { info: { summary: dropdownInput, source: false } });
