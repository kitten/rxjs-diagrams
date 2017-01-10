import { configure } from '@kadira/storybook';

const stories = require.context('../src', true, /\.stories\.jsx?$/);
configure(() => stories.keys().forEach((filename) => stories(filename)), module);

