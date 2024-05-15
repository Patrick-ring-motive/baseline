globalThis.CloudflareCustomJS = true;
void async function(){
  globalThis.declare??await import(`https://patrick-ring-motive.github.io/framework/framework.js?${new Date().getTime()}`);
  await DOMInteractive();
  declare(()=>{   
    queryApplyAll('html[window-location*="?ts"] [href]:not([href*="?ts"],[innerText*="Latest"])',()=>replaceAttribute('href',/(.*)/,'$1?ts'));
  });
  declare(()=>{
    queryApplyAll('html:not([window-location*="?ts"]) .DocsToolbar--tools:not(:has(a[innerText*="Legacy"]))',
                  {prepend:[buildElement('a',{traits:{innerText:'Legacy',href:'https://workers.patrickring.net/workers/?ts'},styles:{'text-decoration':'none','padding-right':'10%'}})]});
  });
  declare(()=>{
    queryApplyAll('html[window-location*="?ts"] .DocsToolbar--tools:not(:has(a[innerText*="Latest"]))',
                  {prepend:[buildElement('a',{traits:{innerText:'Latest',href:(location.href.replace('?ts',''))},styles:{'text-decoration':'none','padding-right':'10%',color:'orange'}})]});
  });
  await DOMComplete();
  style('div.DocsToolbar--search',{display:'block'});
}();
