//API key: d728a6e44887606acf25b66f03b1fe4df3a59437

var query = "election"

$(document).ready( function() {

	
	//https://access.alchemyapi.com/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=12&q.enriched.url.enrichedTitle.keywords.keyword.text=election&return=enriched.url.url,enriched.url.title,enriched.url.text&apikey=d728a6e44887606acf25b66f03b1fe4df3a59437

	getData(query);

	$('#explore').submit(function(e) {
		e.preventDefault();
		var query=$('#query').val();
		$('#article-list').empty();
		$('#query').val("");
		$('.search').show();
		$('#query-text').text(query);
		getData(query);
	});

});

function displayArticle(articleData) {
	
	var article = $('.article:last');
	//set Title and link
	var title = article.find('a');
	title.attr('href', articleData.source.enriched.url.url);
	//console.log(articleData.source.enriched.url.url);
	title.text(articleData.source.enriched.url.title);
	//console.log(articleData.source.enriched.url.title);

	//add text snippet
	var snippet = article.find('p');
	snippet.text(articleData.source.enriched.url.text);

	//add related keyword tags

	//add keyword links to spawn new search

	newArticle = $('#article-list').append('<div class="col-md-3 col-sm-4 article"><h3><a href="" target="_blank"></a></h3><p></p></div>');
	return newArticle;

}

function getData (query) {
	
	$.getJSON('https://access.alchemyapi.com/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=12&q.enriched.url.enrichedTitle.keywords.keyword.text='+query+'&return=enriched.url.url,enriched.url.title,enriched.url.text&apikey=d728a6e44887606acf25b66f03b1fe4df3a59437', function(data){
    	
    	if (data.status=="OK") {


    	console.log(data);
    	var articleData = data.result.docs;
		for (i=0; i<articleData.length; i++) {
			displayArticle(articleData[i]);
		};

		}

		else {
			var error = data.statusInfo;
			alert('The application was unable to retrieve data from the server because: '+data.statusInfo+'. Please try again later.');
		}
  	});
}

