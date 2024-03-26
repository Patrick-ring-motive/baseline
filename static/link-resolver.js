
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
    
      queryApplyAll('['+attr+'^="http://"]:not(link,img)',
        (el)=>{
          let char='?';
          if(el[attr].includes('?')){char='&';}
             el.updateAttribute(attr,
                               el[attr].replaceAll("http://","https://"));
        });

        
    }
    
    
}();
  
    
