const template = `
  <h1>{{title}}</h1>
`;

const data = {
  title: 'Hello, Handlebars!',
};

const compiledHTML = Handlebars.compile(template)(data);
document.getElementById('output').innerHTML = compiledHTML;
