import SiteV1 from './SiteV1';
import Changelog from './Changelog';

const App = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('page') === 'changelog') return <Changelog/>;
  return <SiteV1/>;
};

export default App;
