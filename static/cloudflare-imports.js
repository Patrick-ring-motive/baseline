
void async function ImportResources(){
  if(globalThis.ImportResourcesRunning){return;}
  globalThis.ImportResourcesRunning=true;
  globalThis.CloudflareCustomJS??import("https://patrick-ring-motive.github.io/baseline/static/cloudflare-custom.js");
  globalThis.declare??await import(`https://patrick-ring-motive.github.io/framework/framework.js?${new Date().getTime()}`);
  await DOMInteractive();
  if(!select('link[href^="https://patrick-ring-motive.github.io/baseline/static/cloudflare-custom.css"]')){
    body().appendChild(buildElement('link',{attr:{href:"https://patrick-ring-motive.github.io/baseline/static/cloudflare-custom.css",rel:"stylesheet"}}));
  }
  globalThis.LinkResolver??import('https://patrick-ring-motive.github.io/baseline/static/link-resolver.js');
  await DOMComplete();
  style('div.DocsToolbar--search',{display:'block'});
}();
