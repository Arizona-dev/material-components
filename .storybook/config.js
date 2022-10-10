import { addParameters, configure, addDecorator } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';

import theme from './theme';
import '../assets/styles/main.css';

addParameters({
  options: {
    theme: theme,
  },
});

addDecorator(withInfo);

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
