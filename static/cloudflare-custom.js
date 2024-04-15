globalThis.CloudflareCustomJS = true;
void async function(){
  if(!globalThis.declare){
    await import(`https://patrick-ring-motive.github.io/framework/framework.js?${new Date().getTime()}`);
  }
  await DOMInteractive();
  declare(()=>{   
    queryApplyAll('html[window-location*="?ts"] [href]:not([href*="?ts"])',()=>replaceAttribute('href',/(.*)/,'$1?ts'));
  });
}();
