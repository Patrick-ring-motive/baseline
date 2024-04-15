globalThis.CloudflareCustomJS = true;
void async function(){
  if(!globalThis.declare){
    await import(`https://patrick-ring-motive.github.io/framework/framework.js?${new Date().getTime()}`);
  }
  await DOMInteractive();
  declare(()=>{   
    queryApplyAll('html[window-location*="?ts"] [href]:not([href*="?ts"])',()=>replaceAttribute('href',/(.*)/,'$1?ts'));
  });
  declare(()=>{
    queryApplyAll('html:not([window-location*="?ts"]) .DocsToolbar--tools:not(:has(a[innerText*="Legacy"]))',
                  {prepend:[buildElement('a',{traits:{innerText:'Legacy',href:'https://workers.patrickring.net/workers/?ts'},styles:{'text-decoration':'none','padding-right':'10%'}})]});
  });
}();
