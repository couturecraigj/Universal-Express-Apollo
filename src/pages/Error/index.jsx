import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "error" */ './Error')
);
