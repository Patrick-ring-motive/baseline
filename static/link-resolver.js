
void async function LinkResolver(){
  if(globalThis.LinkResolver){console.log('Link Resolver already running');return;}
  globalThis.LinkResolver = 'starting';
  if(!globalThis.declare){
    await import(`https://patrick-ring-motive.github.io/framework/framework.js?${new Date().getTime()}`);
  }
  //await DOMInteractive();
  if(!globalThis.hostTargetList){
      globalThis.hostTargetList = ['www.google.com'];  
  }
    
  
  console.log('Link Resolver started');   
  globalThis.LinkResolverLock
  globalThis.LinkResolver = 'running';
    resolveAll();
    declare(()=>{  
      resolveAll();  
    });
    
    async function resolveAll(){
      cloneStyles();
      transformLinks('href');
      transformLinks('src');
      transformLinks('action');
    }
    
    async function transformLinks(attr){
      
    
      queryApplyAll('['+attr+'^="/"]:not(link,img),['+attr+'^="./"]:not(link,img),['+attr+'^="../"]:not(link,img),['+attr+']:not(link,img,['+attr+'*=":"])',
      (el)=>{
                    el.updateAttribute(attr,el[attr]);
      });
    
      const hostTargetList_length = globalThis.hostTargetList.length;
      for(let i=0;i<hostTargetList_length;i++){
        queryApplyAll('['+attr+'^="https://'+globalThis.hostTargetList[i]+'"]:not(link,img)',
        (el)=>{

          let hash='';
          if(el[attr].includes('#')){hash='#'+el[attr].split('#')[1];}
          let char='?';
          if(el[attr].includes('?')){char='&';}
             el.updateAttribute(attr,
                               el[attr].split('#')[0]
                                  .replace('https://'+globalThis.hostTargetList[i],
                                   window.location.origin)+
                                  char+'hostname='+
                                  globalThis.hostTargetList[i]+
                                  '&referer='+window.location.host+
                                  hash);
        });
    
      }

      if(location.protocol=='https://'){
        queryApplyAll('['+attr+'^="http://"]:not(link,img)',
          (el)=>{
            let char='?';
            if(el[attr].includes('?')){char='&';}
               el.updateAttribute(attr,
                                 el[attr].replaceAll("http://","https://"));
          });
      }
        
    }


  async function cloneStyles(){
      const hostTargetList_length = globalThis.hostTargetList.length;
      for(let i=0;i<hostTargetList_length;i++){
        queryApplyAll('link[href^="https://'+globalThis.hostTargetList[i]+'"]',
        (el)=>{
		  let linkClone = el.cloneNode(true);
          linkClone.setAttribute('clone','clone');
          el.setAttribute('clone','original');
          let hash='';
          if(el['href'].includes('#')){hash='#'+el['href'].split('#')[1];}
          let char='?';
          if(el['href'].includes('?')){char='&';}
             linkClone.setAttribute('href',
                               el['href'].split('#')[0]
                                  .replace('https://'+globalThis.hostTargetList[i],
                                   window.location.origin)+
                                  char+'hostname='+
                                  globalThis.hostTargetList[i]+
                                  '&referer='+window.location.host+
                                  hash);
		  el.after(linkClone);	
        });
    
      }
    
    queryApplyAll('link[href^="/"]:not([clone]),[href^="./"]:not([clone]),link[href^="../"]:not([clone]),link[href]:not([clone],[href*=":"])',
      (el)=>{
          let linkClone = el.cloneNode(true);
          linkClone.setAttribute('clone','clone');
          el.setAttribute('clone','original');
          linkClone.setAttribute('href',el.href);
          el.after(linkClone);
      });
      if(location.protocol=='https://'){
        queryApplyAll('link[href^="http://"]',
          (el)=>{
            let linkClone = el.cloneNode(true);
            linkClone.setAttribute('clone','clone');
            el.setAttribute('clone','original');
            let char='?';
            if(el['href'].includes('?')){char='&';}
               linkClone.setAttribute('href',
                                 el['href'].replaceAll("http://","https://"));
            el.after(linkClone);
          });
      }
  }
    
}();
  
    
