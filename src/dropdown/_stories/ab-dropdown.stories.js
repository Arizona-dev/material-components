// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

// Import component
import AbDropdown from '../ab-dropdown.vue';

import AbIcon from '../../icon/ab-icon.vue';
import AbIconset from '../../icon/ab-iconset.vue';

// Import doc
import doc from './ab-dropdown.md';

import './stories.css';

storiesOf('Material Components|Dropdown/ab-dropdown', module)
  .add('Dropdown - left', () => ({
    components: { AbDropdown },
    template: `
      <section class="demo">
        <ab-dropdown position="left">
          <template slot="button"><button>button</button></template>
          <template slot="list">
            <ul>
              <li class="item">Plop 1</li>
              <li class="item">Plop 2</li>
              <li class="item">Plop 3</li>
            </ul>
          </template>
        </ab-dropdown>
      </section>
    `
  }), { info: {} })
  .add('Dropdown - right', () => ({
    components: { AbDropdown },
    template: `
      <section class="demo">
        <ab-dropdown position="right">
          <template slot="button"><button>button</button></template>
          <template slot="list">
            <ul>
              <li class="item">Plop 1</li>
              <li class="item">Plop 2</li>
              <li class="item">Plop 3</li>
            </ul>
          </template>
        </ab-dropdown>
      </section>
    `
  }), { info: {} })
  .add('With icon', () => ({
    components: { AbDropdown, AbIcon, AbIconset },
    template: `
      <section class="demo">
        <ab-dropdown position="left">
          <template slot="button"><button>button</button></template>
          <template slot="list">
            <ul>
              <li><a class="item" href="https://www.google.com"><ab-icon icon="home"></ab-icon>Google</a></li>
            </ul>
          </template>
        </ab-dropdown>
        <ab-iconset>
          <g id="home"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g>
        </ab-iconset>
      </section>
    `
  }), { info: { summary: doc } });
