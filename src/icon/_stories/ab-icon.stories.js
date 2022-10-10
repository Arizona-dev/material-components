// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

// Import component
import AbIcon from '../ab-icon.vue';
import AbIconset from '../ab-iconset.vue';


storiesOf('Material Components|Icon/Icon/ab-icon', module)
  .add('Icon', () => ({
    components: { AbIcon, AbIconset },
    template: `
    <section>
      <ab-icon icon="menu" iconset="icon"></ab-icon>
      <ab-icon icon="arrow-forward" iconset="icon"></ab-icon>
      <ab-icon icon="add" iconset="icon"></ab-icon>
      <ab-icon icon="clear" iconset="icon"></ab-icon>

      <ab-iconset iconset="icon">
        <g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
        <g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
        <g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
        <g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
      </ab-iconset>
    </section>
    `
  }), { info: {} })
  .add('Icon with button', () => ({
    components: { AbIcon, AbIconset },
    template: `
    <section>
      <button><ab-icon icon="menu" iconset="icon"></ab-icon></button>

      <ab-iconset iconset="icon">
        <g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
      </ab-iconset>
    </section>
    `
  }), { info: {} });

storiesOf('Material Components|Icon/Icon/ab-iconset', module)
  .add('Iconset', () => ({
    components: { AbIcon, AbIconset },
    template: `
    <section>
      <ab-iconset iconset="icon">
        <g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
        <g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
        <g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
        <g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
      </ab-iconset>

      <ab-icon icon="add" iconset="icon"></ab-icon>
    </section>
    `
  }), { info: {} });
