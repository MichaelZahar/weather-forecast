import React from 'react';
import AddCity from '../containers/AddCity';
import EditLink from '../containers/EditLink';

import '../../styles/footer.styl';

export default () => (
  <section className="footer">
    <EditLink />
    <AddCity />
  </section>
);
