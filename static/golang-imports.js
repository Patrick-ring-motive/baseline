
void async function ImportResources(){
  if(globalThis.ImportResourcesRunning){return;}
  globalThis.ImportResourcesRunning=true;
  
  if(!globalThis.declare){
    await import(`https://patrick-ring-motive.github.io/framework/framework.js?${new Date().getTime()}`);
  }
  await DOMInteractive();

  if(!select('link[href^="https://patrick-ring-motive.github.io/baseline/static/golang.css"]')){
    body().appendChild(buildElement('link',{attr:{href:"https://patrick-ring-motive.github.io/baseline/static/golang.css",rel:"stylesheet"}}));
  }

  if(!globalThis.LinkResolver){
    import('https://patrick-ring-motive.github.io/baseline/static/link-resolver.js');
  }
  
}();
