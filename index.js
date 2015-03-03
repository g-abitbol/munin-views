function getUrl(string, baseurl){
    if(!string.startsWith('http://') && ! string.startsWith('http://')){
        string=baseurl+''+string
    }
    return string
}

function getLink(string, baseurl){
    return getUrl(string, baseurl).replace(/-(.*)$/, '.html')
}

function loadPage(page){
    console.log('loadPage '+page);
    $.getJSON(page+'.json', function(result){
        var menu='';
        var main='';
        var baseimgurl='';
        var baselinkurl='';
        
        // For each JSON element
        $.each(result, function(catid, cat){
            if(catid === 'baseimgurl'){
                baseimgurl = cat;
                return true;
            }
            if(catid === 'baselinkurl'){
                baselinkurl = cat;
                return true;
            }

            // Add to the left menu
            menu += '<li class="nav-sidebar-item" id="'+catid+'"><a >'+cat.title+'</a></li>';

            // Add to main div
            main += '<div class="row" id="main-'+catid+'" class="hidden">';
            main += '    <h1 class="page-header">'+cat.title+'</h1>';
            if (cat.desc !== undefined) { main += '    <div class="page-subtitle"><span class="text-muted">'+cat.desc+'</span></div>' }

            // Add all graphs to the main div
            $.each(cat.content, function(index, svalue) {
                main += '        <div class="col-md-6 image">';
                if( Object.prototype.toString.call( svalue ) === '[object String]' ) {
                    main += '<a href="'+getLink(svalue, baselinkurl)+'"><img src="'+getUrl(svalue, baseimgurl)+'" class="img-responsive"></a>';
                }else{
                    var link = svalue.link
                    if (link === undefined) { getLink(svalue, baselinkurl) }
                    main += '<a href="'+link+'"><img src="'+getUrl(svalue.image, baseimgurl)+'" class="img-responsive"></a>';
                    if (svalue.label !== undefined) { main += '<h4>'+svalue.label+'</h4>'; };
                    if (svalue.text !== undefined) { main += '<span class="text-muted">'+svalue.text+'</span>'; };
                }
                main += '        </div>';
            });
            main += '</div>';
        });

        $('.nav-sidebar').html(menu);
        $('.main').html(main);
    });
}


