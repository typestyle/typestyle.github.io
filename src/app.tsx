import { setupPage, normalize } from 'typestyle/csx';
normalize();
setupPage('#root');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cp from './components';


const docs: {
  title: string
  link: string
  content: string
}[] = [
    {
      title: "The guide to maintainable CSS",
      link: 'intro',
      content: require('./docs/intro.md')
    },
    {
      title: "Basic tips",
      link: 'css',
      content: require('./docs/css.md')
    },
    {
      title: "Page Setup",
      link: 'page',
      content: require('./docs/page.md')
    }
  ];

ReactDOM.render(<cp.Content>
  <cp.Header />
  <cp.ContentVerticalMargined style={{ padding: '10px' }}>

    {/** The github links */}
    <cp.ContentVerticalMargined>
      <cp.ContentVerticalCentered>
        <iframe src="https://ghbtns.com/github-btn.html?user=typestyle&repo=typestyle&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
      </cp.ContentVerticalCentered>

      <cp.ContentVerticalCentered style={{ color: cp.colors.text }}>
        This project is powered by github 🌟s, and they are much appreciated 🌹
      </cp.ContentVerticalCentered>
    </cp.ContentVerticalMargined>

    {
      docs.map(doc => {
        return (
          <cp.PageSection key={doc.link} title={doc.title} link={doc.link}>
            <cp.MarkDown markdown={doc.content} />
          </cp.PageSection>
        );
      })
    }

  </cp.ContentVerticalMargined>

</cp.Content>, document.getElementById('root'));